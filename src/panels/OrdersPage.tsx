import React, { useState } from 'react';
import { useUser, type Order, type OrderSub } from '../context/UserContext';
import { useCart } from '../context/CartContext';
import { products, listings, suppliers } from '../data/mockData';
import { ShoppingBag, ChevronDown, ChevronUp, Download, MessageSquare, RefreshCw, AlertTriangle, Truck, Calendar, DollarSign, CheckCircle2 } from 'lucide-react';

export const OrdersPage: React.FC = () => {
  const { orders } = useUser();
  const { addToCart } = useCart();
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showSupportModal, setShowSupportModal] = useState(false);
  const [selectedOrderSupport, setSelectedOrderSupport] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const toggleExpandOrder = (id: string) => {
    setExpandedOrderId(prev => (prev === id ? null : id));
  };

  const handleDownloadReceipt = (orderId: string) => {
    triggerToast(`Descargando comprobante fiscal de compra consolidada para ${orderId}...`);
  };

  const handleReportProblem = (orderId: string) => {
    setSelectedOrderSupport(orderId);
    setShowSupportModal(true);
  };

  const handleRepeatPurchase = (order: Order) => {
    // Add all items in order back to cart
    let addedCount = 0;
    order.suborders.forEach(sub => {
      sub.items.forEach(item => {
        // Find matching product in mock database
        const prod = products.find(p => p.name === item.productName);
        if (prod) {
          // Find supplier listing
          const list = listings.find(l => l.productId === prod.id && l.supplierId === sub.supplierId);
          if (list) {
            addToCart(prod, list, item.quantity);
            addedCount++;
          }
        }
      });
    });

    if (addedCount > 0) {
      triggerToast(`¡Se añadieron ${addedCount} productos del pedido ${order.id} al carrito!`);
    } else {
      triggerToast('No se pudieron volver a comprar los productos (sin stock o descontinuados).');
    }
  };

  const getStatusStyle = (status: Order['status']) => {
    switch (status) {
      case 'Confirmado':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      case 'Preparando':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400';
      case 'Enviado':
        return 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400';
      case 'Entregado':
        return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400';
      case 'Cancelado':
        return 'bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-400';
      default:
        return 'bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-300';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in relative">
      {/* Toast alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-zinc-950 dark:bg-zinc-50 dark:text-zinc-950 text-white border border-zinc-800 px-4 py-3 rounded-xl shadow-2xl text-xs font-bold flex items-center gap-2 animate-fade-in">
          <CheckCircle2 size={15} className="text-emerald-500" />
          {toastMessage}
        </div>
      )}

      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold tracking-tight text-zinc-950 dark:text-white">Mis Pedidos</h1>
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          Revisa el historial de compras de la clínica. Los pedidos consolidan artículos de múltiples proveedores con despachos independientes.
        </p>
      </div>

      {orders.length === 0 ? (
        <div className="p-12 text-center border border-zinc-200 dark:border-zinc-800 rounded-xl bg-white dark:bg-[#0c0c0f]">
          <ShoppingBag className="mx-auto text-zinc-400 mb-2" size={32} />
          <h3 className="text-sm font-bold text-zinc-800 dark:text-zinc-200">Aún no has realizado pedidos</h3>
          <p className="text-xs text-zinc-400 mt-1 max-w-xs mx-auto">
            Todas tus compras consolidadas aparecerán aquí con seguimiento individual por cada proveedor dental.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => {
            const isExpanded = expandedOrderId === order.id;

            return (
              <div 
                key={order.id} 
                className="border border-zinc-200 dark:border-zinc-800 rounded-xl bg-white dark:bg-[#0c0c0f] overflow-hidden shadow-sm hover:border-zinc-300 transition-all"
              >
                {/* Order Row Header */}
                <div 
                  onClick={() => toggleExpandOrder(order.id)}
                  className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer hover:bg-zinc-50/50 dark:hover:bg-zinc-900/10 transition-all"
                >
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 flex-1">
                    <div>
                      <span className="text-[9px] uppercase font-bold text-zinc-400 block">CÓDIGO PEDIDO</span>
                      <span className="font-mono font-bold text-xs text-zinc-900 dark:text-zinc-150">{order.id}</span>
                    </div>
                    
                    <div>
                      <span className="text-[9px] uppercase font-bold text-zinc-400 block">FECHA COMPRA</span>
                      <span className="text-xs font-semibold text-zinc-800 dark:text-zinc-300">{order.date}</span>
                    </div>

                    <div>
                      <span className="text-[9px] uppercase font-bold text-zinc-400 block">PROVEEDORES / ARTÍCULOS</span>
                      <span className="text-xs font-semibold text-zinc-800 dark:text-zinc-300">
                        {order.supplierCount} {order.supplierCount === 1 ? 'proveedor' : 'proveedores'} • {order.itemsCount} uds
                      </span>
                    </div>

                    <div>
                      <span className="text-[9px] uppercase font-bold text-zinc-400 block">ESTADO GENERAL</span>
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold inline-block mt-0.5 ${getStatusStyle(order.status)}`}>
                        {order.status}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between md:justify-end gap-6 pt-3 md:pt-0 border-t md:border-t-0 border-zinc-100 dark:border-zinc-900">
                    <div className="text-right">
                      <span className="text-[9px] uppercase font-bold text-zinc-400 block">Monto Consolidado</span>
                      <span className="font-mono text-sm font-black text-zinc-950 dark:text-white">S/. {order.total.toFixed(2)}</span>
                    </div>
                    
                    <span className="text-zinc-400 shrink-0">
                      {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </span>
                  </div>
                </div>

                {/* Expanded Details Panel */}
                {isExpanded && (
                  <div className="p-5 bg-zinc-50/50 dark:bg-zinc-950/20 border-t border-zinc-150/80 dark:border-zinc-900 space-y-6">
                    {/* Operations banner */}
                    <div className="flex flex-wrap gap-2 justify-between items-center bg-white dark:bg-zinc-950 p-3 rounded-lg border border-zinc-150/40 dark:border-zinc-900 text-xs">
                      <div className="text-zinc-500">
                        Puntos acumulados: <span className="font-mono font-bold text-emerald-500">+{order.pointsEarned} pts</span>
                        {order.discountApplied > 0 && (
                          <span className="ml-3 text-zinc-400">
                            (Descuento de S/. {order.discountApplied.toFixed(2)} por canje de {order.pointsUsed} pts)
                          </span>
                        )}
                      </div>
                      
                      <div className="flex gap-2">
                        <button 
                          onClick={() => handleDownloadReceipt(order.id)}
                          className="px-2.5 py-1.5 rounded border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900 text-zinc-600 dark:text-zinc-300 font-semibold flex items-center gap-1 cursor-pointer"
                        >
                          <Download size={13} />
                          Comprobante
                        </button>
                        <button 
                          onClick={() => handleRepeatPurchase(order)}
                          className="px-2.5 py-1.5 rounded bg-blue-600 hover:bg-blue-700 text-white font-semibold flex items-center gap-1 cursor-pointer"
                        >
                          <RefreshCw size={13} />
                          Volver a comprar
                        </button>
                        <button 
                          onClick={() => handleReportProblem(order.id)}
                          className="px-2.5 py-1.5 rounded border border-rose-200 hover:bg-rose-50 text-rose-600 font-semibold flex items-center gap-1 cursor-pointer"
                        >
                          <AlertTriangle size={13} />
                          Reportar
                        </button>
                      </div>
                    </div>

                    {/* Suborders split by supplier */}
                    <div className="space-y-4">
                      <h4 className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Seguimiento por Proveedor</h4>
                      
                      {order.suborders.map((sub, idx) => (
                        <div key={idx} className="bg-white dark:bg-[#0c0c0f] border border-zinc-150 dark:border-zinc-900 rounded-xl p-4 space-y-4 shadow-sm">
                          {/* Suborder Header */}
                          <div className="flex justify-between items-center pb-2 border-b border-zinc-100 dark:border-zinc-900">
                            <div>
                              <h5 className="font-bold text-xs text-zinc-900 dark:text-zinc-200">{sub.supplierName}</h5>
                              <p className="text-[10px] text-zinc-400">Despacho y logística directa del proveedor</p>
                            </div>
                            <span className={`px-2.5 py-0.5 rounded text-[9px] font-bold uppercase ${
                              sub.status === 'Entregado' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/20 dark:text-emerald-400' : 'bg-blue-50 text-blue-800 dark:bg-blue-950/20 dark:text-blue-400'
                            }`}>
                              {sub.status}
                            </span>
                          </div>

                          {/* Tracking stepper */}
                          <div className="space-y-2">
                            <div className="flex justify-between items-center text-[10px] text-zinc-400 font-medium">
                              <span className={sub.trackingStep >= 1 ? 'text-blue-600 dark:text-blue-400 font-bold' : ''}>Confirmado</span>
                              <span className={sub.trackingStep >= 2 ? 'text-blue-600 dark:text-blue-400 font-bold' : ''}>Preparando</span>
                              <span className={sub.trackingStep >= 4 ? 'text-blue-600 dark:text-blue-400 font-bold' : ''}>En Camino</span>
                              <span className={sub.trackingStep >= 5 ? 'text-emerald-500 font-bold' : ''}>Entregado</span>
                            </div>
                            <div className="w-full h-1.5 bg-zinc-100 dark:bg-zinc-900 rounded-full flex justify-between overflow-hidden">
                              <div 
                                className={`h-full rounded-full transition-all duration-300 ${
                                  sub.status === 'Entregado' ? 'bg-emerald-500' : 'bg-blue-600'
                                }`}
                                style={{
                                  width: `${
                                    sub.trackingStep === 1 ? '10%' :
                                    sub.trackingStep === 2 ? '40%' :
                                    sub.trackingStep === 4 ? '75%' :
                                    sub.trackingStep === 5 ? '100%' : '0%'
                                  }`
                                }}
                              />
                            </div>
                          </div>

                          {/* Items listing inside this sub-order */}
                          <div className="divide-y divide-zinc-100 dark:divide-zinc-900">
                            {sub.items.map((item, itemIdx) => (
                              <div key={itemIdx} className="py-2.5 flex justify-between items-center text-xs">
                                <div>
                                  <h6 className="font-bold text-zinc-800 dark:text-zinc-200">{item.productName}</h6>
                                  <p className="text-[10px] text-zinc-400">Marca: {item.brand} • Cantidad: {item.quantity}</p>
                                </div>
                                <span className="font-mono text-zinc-900 dark:text-zinc-100 font-bold">
                                  S/. {(item.price * item.quantity).toFixed(2)}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Support report modal */}
      {showSupportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-[#0c0c0f] border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-2xl max-w-md w-full overflow-hidden">
            <div className="px-6 py-4 bg-zinc-50 dark:bg-zinc-950 border-b border-zinc-100 dark:border-zinc-900 flex justify-between items-center">
              <h3 className="text-xs font-bold text-zinc-900 dark:text-white uppercase tracking-wider">Reportar Incidencia</h3>
              <button 
                onClick={() => setShowSupportModal(false)}
                className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 text-xs font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>
            
            <div className="p-6 space-y-4 text-xs">
              <p className="text-zinc-500 leading-relaxed">
                ¿Tienes un inconveniente con el pedido <strong className="text-zinc-900 dark:text-white">{selectedOrderSupport}</strong>? 
                Enviaremos una solicitud de revisión de manera automática al proveedor involucrado y te responderemos en un máximo de 4 horas.
              </p>

              <div className="space-y-1.5">
                <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-400">Tipo de Problema</label>
                <select className="w-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg p-2.5 text-xs text-zinc-700 dark:text-zinc-300">
                  <option>Demora en el despacho de entrega</option>
                  <option>Producto equivocado o incompleto</option>
                  <option>Material dañado o defectuoso</option>
                  <option>Error en los datos de la factura</option>
                  <option>Otro inconveniente</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-400">Descripción detallada</label>
                <textarea 
                  rows={4}
                  placeholder="Describe de la manera más clara el incidente para agilizar la solución..."
                  className="w-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg p-2.5 text-xs text-zinc-700 dark:text-zinc-300 focus:outline-none"
                />
              </div>
            </div>

            <div className="px-6 py-4 bg-zinc-50 dark:bg-zinc-950 border-t border-zinc-100 dark:border-zinc-900 flex justify-end gap-3">
              <button
                onClick={() => setShowSupportModal(false)}
                className="px-4 py-2 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-lg text-xs font-semibold hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors cursor-pointer"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  setShowSupportModal(false);
                  triggerToast('¡Incidencia enviada al equipo de soporte y al proveedor!');
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded-lg text-xs transition-colors shadow-sm cursor-pointer"
              >
                Enviar Reporte
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
