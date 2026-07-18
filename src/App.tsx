import React, { useState } from 'react';
import { CartProvider, useCart } from './context/CartContext';
import { LandingPage } from './panels/LandingPage';
import { Dashboard } from './panels/Dashboard';
import { SmartSearch } from './panels/SmartSearch';
import { AIAssistant } from './panels/AIAssistant';
import { Kits } from './panels/Kits';
import { Suppliers } from './panels/Suppliers';
import { Cart } from './panels/Cart';
import { type Product, type ProductListing, type Supplier, products, listings } from './data/mockData';
import { ProductComparisonMatrix } from './components/ProductComparisonMatrix';
import { PriceHistoryChart } from './components/PriceHistoryChart';
import { ThemeToggle } from './components/ThemeToggle';
import { LayoutGrid, Search, Sparkles, Box, Building2, ShoppingCart, ShieldCheck, Info, X, Star } from 'lucide-react';

const AppContent: React.FC = () => {
  const [viewMode, setViewMode] = useState<'landing' | 'app'>('landing');
  const [activeTab, setActiveTab] = useState<string>('resumen');
  const [searchInitialQuery, setSearchInitialQuery] = useState<string>('');
  
  // Product Detail Modal state
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  const { cartItems, recommendations, cartTotals } = useCart();

  const handleStartShopping = (query?: string) => {
    setViewMode('app');
    if (query) {
      setActiveTab('buscar');
      setSearchInitialQuery(query);
    } else {
      setActiveTab('resumen');
      setSearchInitialQuery('');
    }
  };

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleSelectSupplierFromProduct = (supplier: Supplier) => {
    // Navigate to suppliers tab and set active supplier profile
    // But since it's cleaner, we can navigate directly
    setActiveTab('proveedores');
    setSelectedProduct(null);
  };

  const menuItems = [
    { id: 'resumen', label: 'Resumen', icon: <LayoutGrid size={15} /> },
    { id: 'buscar', label: 'Búsqueda Inteligente', icon: <Search size={15} /> },
    { id: 'asistente', label: 'Ayúdame a comprar', icon: <Sparkles size={15} />, highlight: true },
    { id: 'kits', label: 'Kits Procedimentales', icon: <Box size={15} /> },
    { id: 'proveedores', label: 'Proveedores', icon: <Building2 size={15} /> },
    { id: 'carrito', label: 'Carrito', icon: <ShoppingCart size={15} />, badge: cartItems.length }
  ];

  if (viewMode === 'landing') {
    return <LandingPage onStartShopping={handleStartShopping} />;
  }

  // Find listings for currently selected product in modal
  const activeProductListings = selectedProduct 
    ? listings.filter(l => l.productId === selectedProduct.id)
    : [];

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-[#09090b] text-zinc-900 dark:text-zinc-50 flex transition-colors duration-300">
      
      {/* Sidebar Navigation */}
      <aside className="w-64 border-r border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#0c0c0f] flex flex-col justify-between shrink-0 h-screen sticky top-0 z-40">
        <div className="flex-1 flex flex-col min-h-0">
          
          {/* Sidebar Logo Header */}
          <div 
            onClick={() => setViewMode('landing')}
            className="px-6 py-5 border-b border-zinc-150 dark:border-zinc-900 flex items-center justify-between cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-900/30 transition-colors"
          >
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded bg-blue-600 flex items-center justify-center text-white font-extrabold text-base shadow-sm">
                O
              </div>
              <span className="text-base font-black tracking-tight text-zinc-900 dark:text-white">OneShop</span>
            </div>
            <span className="text-[9px] uppercase font-bold text-zinc-400 border border-zinc-200 dark:border-zinc-800 px-1 rounded">B2B</span>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 px-4 py-4 space-y-1.5 overflow-y-auto">
            {menuItems.map(item => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    if (item.id !== 'buscar') setSearchInitialQuery('');
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-950 dark:text-white font-bold'
                      : 'text-zinc-500 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-900/20 hover:text-zinc-850 dark:hover:text-zinc-200'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className={item.highlight ? 'text-blue-500' : 'text-zinc-400 dark:text-zinc-500'}>
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                  </div>
                  
                  {/* Badge or Sparkle indicator */}
                  {item.badge !== undefined && item.badge > 0 ? (
                    <span className="bg-blue-600 text-white font-mono text-[9px] px-1.5 py-0.5 rounded-full font-bold">
                      {item.badge}
                    </span>
                  ) : item.highlight ? (
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-soft-pulse" />
                  ) : null}
                </button>
              );
            })}
          </nav>

        </div>

        {/* Sidebar Footer User Info & Toggler */}
        <div className="p-4 border-t border-zinc-150 dark:border-zinc-900 bg-zinc-50/50 dark:bg-zinc-900/10 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div className="w-8 h-8 rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center font-bold text-xs uppercase text-zinc-600 dark:text-zinc-300">
              CC
            </div>
            <div className="overflow-hidden">
              <h4 className="text-[11px] font-bold text-zinc-900 dark:text-white truncate">Clínica Central</h4>
              <p className="text-[9px] text-zinc-400 truncate">RUC 20601234567</p>
            </div>
          </div>
          <ThemeToggle />
        </div>
      </aside>

      {/* Main Shell Dashboard Content */}
      <main className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto">
        
        {/* Header Breadcrumbs & Cart Indicator */}
        <header className="px-6 py-4 border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-[#09090b]/80 backdrop-blur-md sticky top-0 z-30 flex justify-between items-center shrink-0">
          <div className="flex items-center gap-1.5 text-xs text-zinc-400 font-medium">
            <span className="hover:text-zinc-600 cursor-pointer" onClick={() => setViewMode('landing')}>OneShop</span>
            <span>/</span>
            <span className="text-zinc-900 dark:text-zinc-100 font-bold capitalize">
              {menuItems.find(m => m.id === activeTab)?.label}
            </span>
          </div>

          <div className="flex items-center gap-4">
            {/* Active optimizations pill inside header */}
            {recommendations.length > 0 && activeTab !== 'carrito' && (
              <button
                onClick={() => setActiveTab('carrito')}
                className="bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/15 border border-blue-200 dark:border-blue-800/30 text-blue-700 dark:text-blue-400 rounded-full px-3 py-1 text-[10px] font-bold flex items-center gap-1.5 transition-all cursor-pointer animate-soft-pulse"
              >
                <Sparkles size={11} />
                ¡Ahorro de S/. {cartTotals.savings.toFixed(2)} disponible!
              </button>
            )}
            
            <div 
              onClick={() => setActiveTab('carrito')}
              className="relative p-2 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-lg text-zinc-500 dark:text-zinc-400 cursor-pointer transition-colors"
            >
              <ShoppingCart size={16} />
              {cartItems.length > 0 && (
                <span className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-blue-600" />
              )}
            </div>
          </div>
        </header>

        {/* Content body wrapper */}
        <div className="max-w-[1400px] w-full mx-auto p-6 flex-1">
          {activeTab === 'resumen' && (
            <Dashboard 
              onNavigate={setActiveTab} 
              onSelectProduct={handleSelectProduct}
              onSelectSupplier={handleSelectSupplierFromProduct}
            />
          )}
          {activeTab === 'buscar' && (
            <SmartSearch 
              initialQuery={searchInitialQuery} 
              onSelectProduct={handleSelectProduct}
              onNavigate={setActiveTab}
            />
          )}
          {activeTab === 'asistente' && (
            <AIAssistant 
              onSelectProduct={handleSelectProduct}
              onNavigate={setActiveTab}
            />
          )}
          {activeTab === 'kits' && (
            <Kits 
              onSelectProduct={handleSelectProduct}
              onNavigate={setActiveTab}
            />
          )}
          {activeTab === 'proveedores' && (
            <Suppliers 
              onSelectProduct={handleSelectProduct}
            />
          )}
          {activeTab === 'carrito' && (
            <Cart 
              onNavigate={setActiveTab}
              onSelectProduct={handleSelectProduct}
            />
          )}
        </div>
      </main>

      {/* Product Detail Modal overlay */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-end bg-zinc-950/50 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-[#0c0c0f] border-l border-zinc-200 dark:border-zinc-800 w-full max-w-2xl h-full shadow-2xl flex flex-col justify-between overflow-hidden animate-slide-in">
            
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-zinc-100 dark:border-zinc-900 flex justify-between items-center shrink-0">
              <div>
                <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/10 px-1.5 py-0.5 rounded uppercase tracking-wider">
                  {selectedProduct.category}
                </span>
                <h2 className="text-sm font-bold text-zinc-950 dark:text-white mt-2">{selectedProduct.name}</h2>
              </div>
              <button
                onClick={() => setSelectedProduct(null)}
                className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 p-2 text-sm font-bold cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto flex-1 space-y-6">
              
              {/* Product overview banner */}
              <div className="flex gap-5 items-start">
                <div className="w-20 h-20 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800 flex items-center justify-center shrink-0 text-zinc-400 font-extrabold text-sm uppercase">
                  {selectedProduct.brand.slice(0, 3)}
                </div>
                <div className="space-y-1">
                  <h4 className="text-xs text-zinc-400">Marca: <strong className="text-zinc-700 dark:text-zinc-200 font-semibold">{selectedProduct.brand}</strong></h4>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">{selectedProduct.description}</p>
                </div>
              </div>

              {/* Price comparison matrix */}
              <div className="space-y-3">
                <h4 className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1">
                  <Building2 size={13} />
                  Comparación de Precios de Proveedores
                </h4>
                <div className="border border-zinc-200 dark:border-zinc-800 rounded-xl bg-white dark:bg-zinc-950 overflow-hidden shadow-sm">
                  <ProductComparisonMatrix 
                    product={selectedProduct} 
                    listings={activeProductListings} 
                    onAdded={() => setSelectedProduct(null)}
                  />
                </div>
              </div>

              {/* Specifications */}
              <div className="space-y-3">
                <h4 className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1">
                  <Info size={13} />
                  Especificaciones Técnicas
                </h4>
                <div className="border border-zinc-200 dark:border-zinc-800 rounded-xl bg-zinc-50/50 dark:bg-zinc-900/20 divide-y divide-zinc-250/20 overflow-hidden">
                  {Object.entries(selectedProduct.specifications).map(([key, val]) => (
                    <div key={key} className="p-3 flex justify-between gap-4 text-xs">
                      <span className="text-zinc-400 font-medium">{key}</span>
                      <span className="text-zinc-800 dark:text-zinc-200 text-right">{val}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price History Chart */}
              {activeProductListings.length > 0 && (
                <div className="space-y-3">
                  <PriceHistoryChart basePrice={activeProductListings[0].price} />
                </div>
              )}

              {/* Compatible accessories */}
              {selectedProduct.compatibleWith && selectedProduct.compatibleWith.length > 0 && (
                <div className="space-y-3">
                  <h4 className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1">
                    <ShieldCheck size={13} />
                    Productos Compatibles / Recomendados
                  </h4>
                  <div className="space-y-2">
                    {selectedProduct.compatibleWith.map((compName, idx) => {
                      const compProd = products.find(p => p.name === compName);
                      return (
                        <div 
                          key={idx}
                          onClick={() => {
                            if (compProd) setSelectedProduct(compProd);
                          }}
                          className={`p-3 rounded-lg border border-zinc-150 dark:border-zinc-900 bg-zinc-50/30 dark:bg-zinc-950 flex justify-between items-center text-xs ${compProd ? 'hover:bg-zinc-50 hover:border-zinc-250 cursor-pointer' : ''}`}
                        >
                          <span className="font-semibold text-zinc-800 dark:text-zinc-200">{compName}</span>
                          {compProd && <span className="text-[10px] text-blue-500 hover:underline">Ver producto →</span>}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 bg-zinc-50 dark:bg-zinc-950 border-t border-zinc-100 dark:border-zinc-900 shrink-0">
              <button
                onClick={() => setSelectedProduct(null)}
                className="w-full text-center py-2.5 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-850 rounded-lg text-xs font-bold text-zinc-700 dark:text-zinc-300 transition-colors cursor-pointer"
              >
                Cerrar Detalles
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export const App: React.FC = () => {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
};

export default App;
