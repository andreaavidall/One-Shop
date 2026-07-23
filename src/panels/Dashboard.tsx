import React from 'react';
import { products, suppliers, type Product, type Supplier } from '../data/mockData';
import { useCart } from '../context/CartContext';
import { useUser } from '../context/UserContext';
import { TrendingUp, Clock, ArrowUpRight, ArrowRight, Star, ShoppingBag, Eye, Compass, Building2, Gift } from 'lucide-react';

interface DashboardProps {
  onNavigate: (tab: string) => void;
  onSelectProduct: (product: Product) => void;
  onSelectSupplier: (supplier: Supplier) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onNavigate, onSelectProduct, onSelectSupplier }) => {
  const { cartTotals } = useCart();
  const { user, orders } = useUser();

  // Calculate actual statistics from orders
  const totalSpent = orders.reduce((sum, o) => sum + o.total, 0);
  const totalSavings = user.savingsThisMonth;
  const activeOrdersCount = orders.filter(o => o.status !== 'Entregado' && o.status !== 'Cancelado').length;

  const stats = [
    { 
      label: 'Compras Totales (Consolidadas)', 
      value: `S/. ${totalSpent.toLocaleString('es-PE', { minimumFractionDigits: 2 })}`, 
      icon: <ShoppingBag className="text-blue-500" size={16} />, 
      trend: `${orders.length} pedidos registrados` 
    },
    { 
      label: 'Ahorro Inteligente Directo', 
      value: `S/. ${totalSavings.toLocaleString('es-PE', { minimumFractionDigits: 2 })}`, 
      icon: <TrendingUp className="text-emerald-500" size={16} />, 
      trend: 'Por equivalencias y canjes', 
      isGreen: true 
    },
    { 
      label: 'Órdenes Activas', 
      value: `${activeOrdersCount} despachos`, 
      icon: <Clock className="text-amber-500" size={16} />, 
      trend: activeOrdersCount > 0 ? 'En preparación/camino' : 'Todo entregado' 
    }
  ];

  // Recommended products based on rating
  const recommendedProducts = products.slice(0, 4);
  const recentProducts = products.slice(5, 9);

  return (
    <div className="space-y-8 animate-fade-in text-xs">
      {/* Welcome header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-950 dark:text-white">Resumen Operativo</h1>
          <p className="text-xs text-zinc-505 dark:text-zinc-400 mt-1">
            Bienvenido de nuevo, <strong className="text-zinc-900 dark:text-zinc-100 font-bold">{user.clinicName}</strong>. RUC: {user.ruc}.
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
              <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">{s.label}</span>
              <div className="w-7 h-7 rounded-lg bg-zinc-50 dark:bg-zinc-900 flex items-center justify-center border border-zinc-200/50 dark:border-zinc-800">
                {s.icon}
              </div>
            </div>
            <div>
              <div className="text-xl font-bold tracking-tight text-zinc-950 dark:text-white font-mono">{s.value}</div>
              <div className={`text-[10px] font-medium mt-1 ${s.isGreen ? 'text-emerald-500' : 'text-zinc-400 dark:text-zinc-500'}`}>
                {s.trend}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main split grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left side: Orders and Recommendations (2 cols) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Order tracking */}
          <div className="p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#0c0c0f] shadow-sm">
            <div className="flex justify-between items-center mb-4 pb-2 border-b border-zinc-105 dark:border-zinc-900">
              <h2 className="text-sm font-bold text-zinc-955 dark:text-white flex items-center gap-1.5">
                <Clock size={16} className="text-zinc-500" />
                Seguimiento de Pedidos Recientes
              </h2>
              <button 
                onClick={() => onNavigate('pedidos')}
                className="text-xs font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 flex items-center gap-0.5"
              >
                Ver todo
                <ArrowUpRight size={14} />
              </button>
            </div>
            
            <div className="space-y-4">
              {orders.slice(0, 2).map(order => (
                <div key={order.id} className="p-4 rounded-lg bg-zinc-50/50 dark:bg-zinc-900/40 border border-zinc-100 dark:border-zinc-900 flex justify-between items-center text-xs">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-zinc-900 dark:text-zinc-100">{order.id}</span>
                      <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold ${
                        order.status === 'Confirmado' ? 'bg-blue-50 text-blue-800 dark:bg-blue-950/20 dark:text-blue-400' :
                        order.status === 'Preparando' ? 'bg-amber-50 text-amber-800 dark:bg-amber-950/20 dark:text-amber-400' :
                        order.status === 'Enviado' ? 'bg-indigo-50 text-indigo-800 dark:bg-indigo-950/20 dark:text-indigo-400' :
                        order.status === 'Entregado' ? 'bg-emerald-50 text-emerald-800 dark:bg-emerald-950/20 dark:text-emerald-400' :
                        'bg-zinc-100 text-zinc-805 dark:bg-zinc-900 dark:text-zinc-400'
                      }`}>
                        {order.status}
                      </span>
                    </div>
                    <p className="text-[10px] text-zinc-400">{order.date} • {order.itemsCount} productos ({order.supplierCount} {order.supplierCount === 1 ? 'proveedor' : 'proveedores'})</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-zinc-900 dark:text-white font-mono">S/. {order.total.toFixed(2)}</span>
                    <button 
                      onClick={() => onNavigate('pedidos')}
                      className="block text-[10px] font-semibold text-blue-500 hover:text-blue-600 mt-1 cursor-pointer"
                    >
                      Ver detalles
                    </button>
                  </div>
                </div>
              ))}
              {orders.length === 0 && (
                <p className="text-center py-6 text-zinc-400">No has registrado pedidos todavía.</p>
              )}
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
                  <div className="w-12 h-12 rounded-lg bg-zinc-50 dark:bg-zinc-900 flex items-center justify-center shrink-0 border border-zinc-200/50 dark:border-zinc-800 text-zinc-400 font-bold text-xs uppercase">
                    {p.brand.slice(0, 3)}
                  </div>
                  <div className="space-y-0.5 overflow-hidden">
                    <span className="text-[9px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">{p.category}</span>
                    <h4 className="text-xs font-bold text-zinc-900 dark:text-white truncate group-hover:text-blue-600 transition-colors">{p.name}</h4>
                    <p className="text-[10px] text-zinc-450 truncate">{p.brand}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right side: Fav Suppliers and Loyalty status (1 col) */}
        <div className="space-y-6">
          
          {/* Loyalty status widget */}
          <div className="p-5 rounded-xl border border-amber-200/60 dark:border-amber-900/30 bg-[#fdfcf7] dark:bg-[#12110c] shadow-sm space-y-4">
            <h2 className="text-sm font-bold text-amber-800 dark:text-amber-400 flex items-center gap-1.5 pb-2 border-b border-amber-100/50 dark:border-zinc-900">
              <Gift size={16} />
              Programa OneRewards
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-zinc-550 dark:text-zinc-400">Puntos acumulados:</span>
                <span className="font-mono font-bold text-amber-600 text-sm">{user.points} PTS</span>
              </div>
              <p className="text-[10px] text-zinc-500 dark:text-zinc-400 leading-normal">
                Canjeables por descuentos fiscales de <strong>S/. {(user.points / 100).toFixed(2)}</strong> directamente en tu siguiente checkout.
              </p>
              <button
                onClick={() => onNavigate('recompensas')}
                className="w-full text-center py-2 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-lg transition-colors cursor-pointer"
              >
                Ver Centro de Canjes
              </button>
            </div>
          </div>

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
