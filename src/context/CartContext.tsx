import React, { createContext, useContext, useState, useEffect } from 'react';
import { type Product, type ProductListing, type Supplier, products, listings, suppliers } from '../data/mockData';

export interface CartItem {
  product: Product;
  listing: ProductListing;
  supplier: Supplier;
  quantity: number;
}

export interface OptimizationRecommendation {
  id: string;
  type: 'supplier_switch' | 'product_switch';
  itemId: string; // productId_supplierId
  current: {
    product: Product;
    listing: ProductListing;
    supplier: Supplier;
  };
  better: {
    product: Product;
    listing: ProductListing;
    supplier: Supplier;
  };
  savingsPerUnit: number;
  explanation: string;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product, listing: ProductListing, quantity?: number) => void;
  removeFromCart: (productId: string, supplierId: string) => void;
  updateQuantity: (productId: string, supplierId: string, quantity: number) => void;
  clearCart: () => void;
  loadProposal: (proposalItems: { product: Product; listing: ProductListing; supplier: Supplier }[]) => void;
  recommendations: OptimizationRecommendation[];
  applyOptimization: (recommendationId: string) => void;
  applyAllOptimizations: () => void;
  cartTotals: {
    originalTotal: number;
    optimizedTotal: number;
    savings: number;
    supplierCount: number;
  };
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [recommendations, setRecommendations] = useState<OptimizationRecommendation[]>([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('oneshop_cart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (e) {
        console.error('Error parsing cart from localStorage', e);
      }
    }
  }, []);

  // Save cart to localStorage on change
  useEffect(() => {
    localStorage.setItem('oneshop_cart', JSON.stringify(cartItems));
    calculateRecommendations();
  }, [cartItems]);

  const addToCart = (product: Product, listing: ProductListing, quantity = 1) => {
    setCartItems(prev => {
      const existingIdx = prev.findIndex(
        item => item.product.id === product.id && item.listing.supplierId === listing.supplierId
      );

      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx].quantity += quantity;
        return updated;
      } else {
        const supplier = suppliers.find(s => s.id === listing.supplierId)!;
        return [...prev, { product, listing, supplier, quantity }];
      }
    });
  };

  const removeFromCart = (productId: string, supplierId: string) => {
    setCartItems(prev => prev.filter(item => !(item.product.id === productId && item.listing.supplierId === supplierId)));
  };

  const updateQuantity = (productId: string, supplierId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, supplierId);
      return;
    }
    setCartItems(prev =>
      prev.map(item =>
        item.product.id === productId && item.listing.supplierId === supplierId
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const loadProposal = (proposalItems: { product: Product; listing: ProductListing; supplier: Supplier }[]) => {
    // Clear and load proposal items (default quantity = 1)
    const newItems = proposalItems.map(item => ({
      product: item.product,
      listing: item.listing,
      supplier: item.supplier,
      quantity: 1
    }));
    setCartItems(newItems);
  };

  // Optimization scan
  const calculateRecommendations = () => {
    const recs: OptimizationRecommendation[] = [];

    cartItems.forEach(item => {
      const allProductListings = listings.filter(l => l.productId === item.product.id && l.stock > 0);
      
      // 1. Supplier Switch Optimization (same product, cheaper vendor)
      const cheaperListing = [...allProductListings].sort((a, b) => a.price - b.price)[0];
      if (cheaperListing && cheaperListing.price < item.listing.price) {
        const betterSupplier = suppliers.find(s => s.id === cheaperListing.supplierId)!;
        recs.push({
          id: `sup_${item.product.id}_${item.listing.supplierId}`,
          type: 'supplier_switch',
          itemId: `${item.product.id}_${item.listing.supplierId}`,
          current: { product: item.product, listing: item.listing, supplier: item.supplier },
          better: { product: item.product, listing: cheaperListing, supplier: betterSupplier },
          savingsPerUnit: item.listing.price - cheaperListing.price,
          explanation: `Cambiamos el proveedor de este producto a ${betterSupplier.name} para obtener el precio más bajo.`
        });
        return; // Skip product switch if supplier switch is already found
      }

      // 2. Product Switch Optimization (equivalent product, cheaper price)
      // E.g., if user has Filtek Z350 (p1), we can suggest Filtek Z250 (p2) in the Operatoria category
      if (item.product.category === 'Operatoria' && item.product.id === 'p1') {
        const altProduct = products.find(p => p.id === 'p2')!; // Z250
        const altListings = listings.filter(l => l.productId === altProduct.id && l.stock > 0);
        const bestAltListing = [...altListings].sort((a, b) => a.price - b.price)[0];
        
        if (bestAltListing && bestAltListing.price < item.listing.price) {
          const betterSupplier = suppliers.find(s => s.id === bestAltListing.supplierId)!;
          recs.push({
            id: `prod_${item.product.id}_${item.listing.supplierId}`,
            type: 'product_switch',
            itemId: `${item.product.id}_${item.listing.supplierId}`,
            current: { product: item.product, listing: item.listing, supplier: item.supplier },
            better: { product: altProduct, listing: bestAltListing, supplier: betterSupplier },
            savingsPerUnit: item.listing.price - bestAltListing.price,
            explanation: `Sustituimos por la resina equivalente Filtek Z250 de ${betterSupplier.name}, reduciendo costos sin sacrificar calidad.`
          });
        }
      }
    });

    setRecommendations(recs);
  };

  const applyOptimization = (recommendationId: string) => {
    const rec = recommendations.find(r => r.id === recommendationId);
    if (!rec) return;

    setCartItems(prev => {
      // Find the current item
      const itemIdx = prev.findIndex(
        item => item.product.id === rec.current.product.id && item.listing.supplierId === rec.current.listing.supplierId
      );
      if (itemIdx === -1) return prev;

      const updated = [...prev];
      const currentQty = updated[itemIdx].quantity;

      // Check if the target item already exists in the cart
      const existingTargetIdx = prev.findIndex(
        item => item.product.id === rec.better.product.id && item.listing.supplierId === rec.better.listing.supplierId
      );

      if (existingTargetIdx > -1 && existingTargetIdx !== itemIdx) {
        // Merge them
        updated[existingTargetIdx].quantity += currentQty;
        // Remove the old one
        return updated.filter((_, idx) => idx !== itemIdx);
      } else {
        // Just replace details
        updated[itemIdx] = {
          product: rec.better.product,
          listing: rec.better.listing,
          supplier: rec.better.supplier,
          quantity: currentQty
        };
        return updated;
      }
    });
  };

  const applyAllOptimizations = () => {
    recommendations.forEach(rec => {
      applyOptimization(rec.id);
    });
  };

  // Calculations
  const originalTotal = cartItems.reduce((sum, item) => sum + (item.listing.price * item.quantity), 0);
  
  // Calculate what total would be with all recommendations applied
  const savings = recommendations.reduce((sum, rec) => {
    const cartItem = cartItems.find(
      item => item.product.id === rec.current.product.id && item.listing.supplierId === rec.current.listing.supplierId
    );
    const qty = cartItem ? cartItem.quantity : 1;
    return sum + (rec.savingsPerUnit * qty);
  }, 0);

  const optimizedTotal = originalTotal - savings;
  
  // Count unique suppliers in cart
  const uniqueSuppliers = new Set(cartItems.map(item => item.listing.supplierId));

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      loadProposal,
      recommendations,
      applyOptimization,
      applyAllOptimizations,
      cartTotals: {
        originalTotal,
        optimizedTotal,
        savings,
        supplierCount: uniqueSuppliers.size
      }
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
