import React, { createContext, useContext, useState, useEffect } from 'react';
import { type Supplier, suppliers } from '../data/mockData';

export interface PointsTransaction {
  id: string;
  date: string;
  points: number;
  description: string;
  type: 'earn' | 'redeem';
}

export interface OrderSub {
  supplierId: string;
  supplierName: string;
  status: 'Confirmado' | 'Preparando' | 'Enviado' | 'Entregado' | 'Cancelado';
  trackingStep: number; // 1-5
  items: {
    productName: string;
    brand: string;
    quantity: number;
    price: number;
  }[];
}

export interface Order {
  id: string;
  date: string;
  total: number;
  status: 'Confirmado' | 'Preparando' | 'Enviado' | 'Entregado' | 'Cancelado';
  itemsCount: number;
  supplierCount: number;
  pointsEarned: number;
  pointsUsed: number;
  discountApplied: number;
  suborders: OrderSub[];
  clinicRuc: string;
  clinicName: string;
  address: string;
  paymentMethod: string;
}

export interface UserProfile {
  role: 'comprador' | 'proveedor' | 'administrador';
  clinicName: string;
  ruc: string;
  address: string;
  points: number;
  savingsThisMonth: number;
  referralCode: string;
  referredCount: number;
  supplierId?: string; // set if role is 'proveedor'
}

interface UserContextType {
  user: UserProfile;
  orders: Order[];
  pointsHistory: PointsTransaction[];
  setRole: (role: 'comprador' | 'proveedor' | 'administrador') => void;
  updateClinicInfo: (name: string, ruc: string, address: string) => void;
  addPoints: (amount: number, reason: string) => void;
  redeemPoints: (amount: number, discountValue: number) => boolean;
  createOrder: (
    items: { product: any; listing: any; supplier: any; quantity: number }[],
    shippingInfo: { ruc: string; razonSocial: string; address: string },
    paymentMethod: string,
    pointsUsed: number,
    discountApplied: number
  ) => Order;
  updateOrderStatus: (orderId: string, supplierId: string, newStatus: OrderSub['status']) => void;
  setSupplierId: (id: string) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile>({
    role: 'comprador',
    clinicName: 'Clínica Dental Central',
    ruc: '20601234567',
    address: 'Av. Larco 450, Miraflores, Lima',
    points: 2450,
    savingsThisMonth: 340,
    referralCode: 'https://oneshop.pe/ref/clinicacentral',
    referredCount: 2,
    supplierId: 's1' // default supplier is Dental Express
  });

  const [orders, setOrders] = useState<Order[]>([
    {
      id: 'ORD-9832',
      date: '17 de Julio, 2026',
      total: 1840.00,
      status: 'Preparando',
      itemsCount: 5,
      supplierCount: 2,
      pointsEarned: 184,
      pointsUsed: 0,
      discountApplied: 0,
      clinicRuc: '20601234567',
      clinicName: 'Clínica Dental Central',
      address: 'Av. Larco 450, Miraflores, Lima',
      paymentMethod: 'Tarjeta de Crédito',
      suborders: [
        {
          supplierId: 's1',
          supplierName: 'Dental Express Perú',
          status: 'Preparando',
          trackingStep: 2,
          items: [
            { productName: 'Resina Filtek Z350 XT Body A2', brand: '3M ESPE', quantity: 2, price: 145.00 },
            { productName: 'Adhesivo Single Bond Universal', brand: '3M ESPE', quantity: 1, price: 185.00 }
          ]
        },
        {
          supplierId: 's5',
          supplierName: 'BioDental',
          status: 'Confirmado',
          trackingStep: 1,
          items: [
            { productName: 'Guantes de Nitrilo BioClean (Caja x 100)', brand: 'BioClean', quantity: 10, price: 24.50 },
            { productName: 'Mascarillas Quirúrgicas de 3 pliegues (Caja x 50)', brand: 'BioClean', quantity: 4, price: 8.50 }
          ]
        }
      ]
    },
    {
      id: 'ORD-9811',
      date: '12 de Julio, 2026',
      total: 580.00,
      status: 'Entregado',
      itemsCount: 3,
      supplierCount: 1,
      pointsEarned: 58,
      pointsUsed: 100,
      discountApplied: 10.00,
      clinicRuc: '20601234567',
      clinicName: 'Clínica Dental Central',
      address: 'Av. Larco 450, Miraflores, Lima',
      paymentMethod: 'Yape',
      suborders: [
        {
          supplierId: 's4',
          supplierName: 'OdontoImport',
          status: 'Entregado',
          trackingStep: 5,
          items: [
            { productName: 'Limas Rotatorias ProTaper Gold F2 (25mm)', brand: 'Maillefer', quantity: 2, price: 250.00 },
            { productName: 'Hipoclorito de Sodio al 5.25%', brand: 'BioClean', quantity: 2, price: 45.00 }
          ]
        }
      ]
    }
  ]);

  const [pointsHistory, setPointsHistory] = useState<PointsTransaction[]>([
    { id: 't1', date: '2026-07-01', points: 500, description: 'Bono de bienvenida', type: 'earn' },
    { id: 't2', date: '2026-07-05', points: 100, description: 'Perfil de clínica completado', type: 'earn' },
    { id: 't3', date: '2026-07-10', points: 1000, description: 'Referido completó primera compra (Dr. Marcos Valenzuela)', type: 'earn' },
    { id: 't4', date: '2026-07-12', points: -100, description: 'Descuento aplicado en pedido ORD-9811', type: 'redeem' },
    { id: 't5', date: '2026-07-12', points: 58, description: 'Puntos acumulados en pedido ORD-9811', type: 'earn' },
    { id: 't6', date: '2026-07-17', points: 184, description: 'Puntos acumulados en pedido ORD-9832', type: 'earn' }
  ]);

  // Load from local storage
  useEffect(() => {
    const savedUser = localStorage.getItem('oneshop_user');
    const savedOrders = localStorage.getItem('oneshop_orders');
    const savedHistory = localStorage.getItem('oneshop_points_history');

    if (savedUser) setUser(JSON.parse(savedUser));
    if (savedOrders) setOrders(JSON.parse(savedOrders));
    if (savedHistory) setPointsHistory(JSON.parse(savedHistory));
  }, []);

  // Save to local storage
  const saveState = (updatedUser: UserProfile, updatedOrders: Order[], updatedHistory: PointsTransaction[]) => {
    setUser(updatedUser);
    setOrders(updatedOrders);
    setPointsHistory(updatedHistory);
    localStorage.setItem('oneshop_user', JSON.stringify(updatedUser));
    localStorage.setItem('oneshop_orders', JSON.stringify(updatedOrders));
    localStorage.setItem('oneshop_points_history', JSON.stringify(updatedHistory));
  };

  const setRole = (role: UserProfile['role']) => {
    saveState({ ...user, role }, orders, pointsHistory);
  };

  const setSupplierId = (supplierId: string) => {
    saveState({ ...user, supplierId }, orders, pointsHistory);
  };

  const updateClinicInfo = (name: string, ruc: string, address: string) => {
    saveState({ ...user, clinicName: name, ruc, address }, orders, pointsHistory);
  };

  const addPoints = (amount: number, reason: string) => {
    const newTx: PointsTransaction = {
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      points: amount,
      description: reason,
      type: amount >= 0 ? 'earn' : 'redeem'
    };
    const updatedHistory = [newTx, ...pointsHistory];
    const updatedUser = { ...user, points: user.points + amount };
    saveState(updatedUser, orders, updatedHistory);
  };

  const redeemPoints = (amount: number, discountValue: number) => {
    if (user.points < amount) return false;
    addPoints(-amount, `Canje por descuento de S/. ${discountValue.toFixed(2)}`);
    return true;
  };

  const createOrder = (
    items: { product: any; listing: any; supplier: any; quantity: number }[],
    shippingInfo: { ruc: string; razonSocial: string; address: string },
    paymentMethod: string,
    pointsUsed: number,
    discountApplied: number
  ) => {
    // Group by supplier
    const grouped = items.reduce((acc, item) => {
      const sId = item.supplier.id;
      if (!acc[sId]) {
        acc[sId] = {
          supplierId: sId,
          supplierName: item.supplier.name,
          status: 'Confirmado' as const,
          trackingStep: 1,
          items: []
        };
      }
      acc[sId].items.push({
        productName: item.product.name,
        brand: item.product.brand,
        quantity: item.quantity,
        price: item.listing.price
      });
      return acc;
    }, {} as Record<string, OrderSub>);

    // Total products cost
    const itemsTotal = items.reduce((sum, item) => sum + (item.listing.price * item.quantity), 0);
    // Flat delivery cost per supplier (15) unless subtotal >= 500
    const supplierKeys = Object.keys(grouped);
    let shippingCost = 0;
    supplierKeys.forEach(key => {
      const subtotal = grouped[key].items.reduce((s, it) => s + (it.price * it.quantity), 0);
      if (subtotal < 500) {
        shippingCost += 15;
      }
    });

    const totalOrderCost = itemsTotal - discountApplied + shippingCost;
    // S/. 1 = 1 point
    const pointsEarned = Math.round(itemsTotal);

    const newOrder: Order = {
      id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toLocaleDateString('es-PE', { day: 'numeric', month: 'long', year: 'numeric' }),
      total: totalOrderCost,
      status: 'Confirmado',
      itemsCount: items.reduce((s, i) => s + i.quantity, 0),
      supplierCount: supplierKeys.length,
      pointsEarned,
      pointsUsed,
      discountApplied,
      clinicRuc: shippingInfo.ruc,
      clinicName: shippingInfo.razonSocial,
      address: shippingInfo.address,
      paymentMethod,
      suborders: Object.values(grouped)
    };

    const updatedOrders = [newOrder, ...orders];
    const updatedUser = { 
      ...user, 
      points: user.points - pointsUsed + pointsEarned,
      savingsThisMonth: user.savingsThisMonth + (discountApplied > 0 ? discountApplied : 0)
    };

    // Build points history updates
    const earnedTx: PointsTransaction = {
      id: `tx-e-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      points: pointsEarned,
      description: `Puntos acumulados en pedido ${newOrder.id}`,
      type: 'earn'
    };

    let updatedHistory = [earnedTx, ...pointsHistory];
    if (pointsUsed > 0) {
      const usedTx: PointsTransaction = {
        id: `tx-u-${Date.now()}`,
        date: new Date().toISOString().split('T')[0],
        points: -pointsUsed,
        description: `Descuento de S/. ${discountApplied.toFixed(2)} en pedido ${newOrder.id}`,
        type: 'redeem'
      };
      updatedHistory = [usedTx, ...updatedHistory];
    }

    saveState(updatedUser, updatedOrders, updatedHistory);
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, supplierId: string, newStatus: OrderSub['status']) => {
    const updatedOrders = orders.map(order => {
      if (order.id !== orderId) return order;

      const updatedSuborders = order.suborders.map(sub => {
        if (sub.supplierId !== supplierId) return sub;
        
        let step = 1;
        if (newStatus === 'Preparando') step = 2;
        if (newStatus === 'Enviado') step = 4;
        if (newStatus === 'Entregado') step = 5;
        if (newStatus === 'Cancelado') step = 0;

        return { ...sub, status: newStatus, trackingStep: step };
      });

      // Recalculate main order status based on suborders
      let orderStatus: Order['status'] = 'Confirmado';
      if (updatedSuborders.every(s => s.status === 'Entregado')) {
        orderStatus = 'Entregado';
      } else if (updatedSuborders.some(s => s.status === 'Cancelado') && updatedSuborders.every(s => s.status === 'Cancelado' || s.status === 'Entregado')) {
        orderStatus = 'Cancelado';
      } else if (updatedSuborders.some(s => s.status === 'Enviado')) {
        orderStatus = 'Enviado';
      } else if (updatedSuborders.some(s => s.status === 'Preparando')) {
        orderStatus = 'Preparando';
      }

      return { ...order, status: orderStatus, suborders: updatedSuborders };
    });

    saveState(user, updatedOrders, pointsHistory);
  };

  return (
    <UserContext.Provider value={{
      user,
      orders,
      pointsHistory,
      setRole,
      updateClinicInfo,
      addPoints,
      redeemPoints,
      createOrder,
      updateOrderStatus,
      setSupplierId
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
