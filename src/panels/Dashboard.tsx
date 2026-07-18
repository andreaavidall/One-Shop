import React from 'react';
import { products, suppliers, type Product, type Supplier } from '../data/mockData';
import { useCart } from '../context/CartContext';
import { TrendingUp, Clock, ArrowUpRight, ArrowRight, Star, ShoppingBag, Eye, Compass, Building2 } from 'lucide-react';

interface DashboardProps {
  onNavigate: (tab: string) => void;
  onSelectProduct: (product: Product) => void;
  onSelectSupplier: (supplier: Supplier) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onNavigate, onSelectProduct, onSelectSupplier }) => {
  const { cartTotals } = useCart();

  // Mock statistics
  const stats = [
    { label: 'Compras Totales (Mes)', value: 'S/. 12,450.00', icon: <ShoppingBag className="text-blue-500" size={16} />, trend: '+14% vs mes anterior' },
    { label: 'Ahorro Inteligente Acumulado', value: `S/. ${cartTotals.savings > 0 ? (1240 + cartTotals.savings).toFixed(2) : '1,240.00'}`, icon: <TrendingUp className="text-emerald-500" size={16} />, trend: 'Optimizaciones de proveedor', isGreen: true },
    { label: 'Órdenes Activas', value: '3 pedidos', icon: <Clock className="text-amber-500" size={16} />, trend: '1 en camino hoy' }
  ];

  // Recommended products based on rating
  const recommendedProducts = products.slice(0, 4);
  const recentProducts = products.slice(5, 9);

  // Active deliveries mock tracker
  const activeOrders = [
    { id: 'ORD-9832', date: '17 de Julio, 2026', items: 5, total: 'S/. 1,840.00', status: 'En Tránsito', supplier: 'DentMax Peru + BioDent' },
    { id: 'ORD-9811', date: '12 de Julio, 2026', items: 3, total: 'S/. 580.00', status: 'Entregado', supplier: 'OdontoImport' }
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Welcome header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-950 dark:text-white">Resumen Operativo</h1>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
            Bienvenido de nuevo, Clínica Dental Central. Revisa tus pedidos y optimizaciones de ahorro.
          </p>
        </div>
        <button
          onClick={() => onNavigate('buscar')}
          className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg px-3.5 py-2 text-xs transition-colors shadow-sm cursor-pointer"
        >
          <Compass size={14} />
          Nueva Búsqueda
        </button>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((s, i) => (
          <div key={i} className="p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#0c0c0f] shadow-sm flex flex-col justify-between">
            <div className="flex justify-between items-start mb-4">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">{s.label}</span>
              <div className="w-7 h-7 rounded-lg bg-zinc-50 dark:bg-zinc-900 flex items-center justify-center border border-zinc-200/50 dark:border-zinc-800">
                {s.icon}
              </div>
            </div>
            <div>
              <div className="text-xl font-bold tracking-tight text-zinc-950 dark:text-white">{s.value}</div>
              <div className={`text-[10px] font-medium mt-1 ${s.isGreen ? 'text-emerald-500' : 'text-zinc-400 dark:text-zinc-500'}`}>
                {s.trend}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main split grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left side: Orders and Suppliers (2 cols) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Order tracking */}
          <div className="p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#0c0c0f] shadow-sm">
            <div className="flex justify-between items-center mb-4 pb-2 border-b border-zinc-100 dark:border-zinc-900">
              <h2 className="text-sm font-bold text-zinc-950 dark:text-white flex items-center gap-1.5">
                <Clock size={16} className="text-zinc-500" />
                Seguimiento de Pedidos Recientes
              </h2>
              <button className="text-xs font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 flex items-center gap-0.5">
                Ver todo
                <ArrowUpRight size={14} />
              </button>
            </div>
            
            <div className="space-y-4">
              {activeOrders.map(order => (
                <div key={order.id} className="p-4 rounded-lg bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-900 flex justify-between items-center">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-zinc-900 dark:text-zinc-100">{order.id}</span>
                      <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                        order.status === 'En Tránsito' 
                          ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400' 
                          : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400'
                      }`}>
                        {order.status}
                      </span>
                    </div>
                    <p className="text-[10px] text-zinc-400">{order.date} • {order.items} productos ({order.supplier})</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-zinc-900 dark:text-white font-mono">{order.total}</span>
                    <button className="block text-[10px] font-semibold text-blue-500 hover:text-blue-600 mt-1">Ver detalles</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick recommendations grid */}
          <div className="p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#0c0c0f] shadow-sm">
            <div className="flex justify-between items-center mb-4 pb-2 border-b border-zinc-100 dark:border-zinc-900">
              <h2 className="text-sm font-bold text-zinc-950 dark:text-white flex items-center gap-1.5">
                <Star size={16} className="text-zinc-500" />
                Recomendados para tu Especialidad
              </h2>
              <button 
                onClick={() => onNavigate('buscar')}
                className="text-xs font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 flex items-center gap-0.5"
              >
                Ver catálogo
                <ArrowRight size={14} />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {recommendedProducts.map(p => (
                <div 
                  key={p.id}
                  onClick={() => onSelectProduct(p)}
                  className="p-3.5 rounded-xl border border-zinc-100 dark:border-zinc-900 hover:border-zinc-200 dark:hover:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900/30 transition-all flex gap-3 cursor-pointer group"
                >
                  <div className="w-12 h-12 rounded-lg bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center shrink-0 border border-zinc-200/50 dark:border-zinc-800 text-zinc-400 font-bold text-xs uppercase">
                    {p.brand.slice(0, 3)}
                  </div>
                  <div className="space-y-0.5 overflow-hidden">
                    <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">{p.category}</span>
                    <h4 className="text-xs font-bold text-zinc-900 dark:text-white truncate group-hover:text-blue-600 transition-colors">{p.name}</h4>
                    <p className="text-[10px] text-zinc-400 truncate">{p.brand}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right side: Fav Suppliers and Viewed (1 col) */}
        <div className="space-y-6">
          {/* Favorite suppliers */}
          <div className="p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#0c0c0f] shadow-sm">
            <h2 className="text-sm font-bold text-zinc-950 dark:text-white mb-4 flex items-center gap-1.5 pb-2 border-b border-zinc-100 dark:border-zinc-900">
              <Building2 size={16} className="text-zinc-500" />
              Proveedores Destacados
            </h2>

            <div className="space-y-3">
              {suppliers.slice(0, 3).map(s => (
                <div 
                  key={s.id} 
                  onClick={() => onSelectSupplier(s)}
                  className="flex items-center justify-between p-2.5 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-900/40 cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-600/10 text-blue-600 flex items-center justify-center font-bold text-xs border border-blue-200/30">
                      {s.logo}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-zinc-900 dark:text-white">{s.name}</h4>
                      <p className="text-[10px] text-zinc-400">{s.avgDeliveryHours}h promedio de entrega</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-0.5 text-xs text-amber-500 font-semibold">
                    <Star size={12} className="fill-amber-400 stroke-amber-400" />
                    {s.rating.toFixed(1)}
                  </div>
                </div>
              ))}
            </div>
            
            <button
              onClick={() => onNavigate('proveedores')}
              className="w-full mt-4 text-center py-2 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-800/80 rounded-lg text-xs font-semibold text-zinc-700 dark:text-zinc-300 transition-colors cursor-pointer"
            >
              Ver todos los proveedores
            </button>
          </div>

          {/* Vistos recientemente */}
          <div className="p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#0c0c0f] shadow-sm">
            <h2 className="text-sm font-bold text-zinc-950 dark:text-white mb-4 flex items-center gap-1.5 pb-2 border-b border-zinc-100 dark:border-zinc-900">
              <Eye size={16} className="text-zinc-500" />
              Vistos Recientemente
            </h2>

            <div className="space-y-3">
              {recentProducts.map(p => (
                <div 
                  key={p.id}
                  onClick={() => onSelectProduct(p)}
                  className="flex items-center gap-3 p-1.5 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-900/40 cursor-pointer transition-colors"
                >
                  <div className="w-8 h-8 rounded-lg bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center shrink-0 text-[10px] font-bold text-zinc-400 uppercase">
                    {p.brand.slice(0, 2)}
                  </div>
                  <div className="overflow-hidden">
                    <h4 className="text-xs font-bold text-zinc-900 dark:text-white truncate">{p.name}</h4>
                    <p className="text-[10px] text-zinc-400">{p.brand}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
