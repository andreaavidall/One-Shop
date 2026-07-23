import React, { useState } from 'react';
import { useCart, type CartItem } from '../context/CartContext';
import { useUser } from '../context/UserContext';
import { type Product, type ProductListing, type Supplier } from '../data/mockData';
import { ShoppingBag, Trash2, ArrowRight, ShieldCheck, Truck, Sparkles, AlertCircle, CheckCircle2, ChevronRight, Award, Receipt } from 'lucide-react';

interface Props {
  onNavigate: (tab: string) => void;
  onSelectProduct: (product: Product) => void;
}

export const Cart: React.FC<Props> = ({ onNavigate, onSelectProduct }) => {
  const { 
    cartItems, 
    updateQuantity, 
    removeFromCart, 
    clearCart,
    recommendations, 
    applyOptimization, 
    applyAllOptimizations, 
    cartTotals 
  } = useCart();

  const { user, createOrder } = useUser();

  const [checkoutComplete, setCheckoutComplete] = useState(false);
  const [lastCreatedOrder, setLastCreatedOrder] = useState<any | null>(null);
  const [shippingInfo, setShippingInfo] = useState({ 
    ruc: user.ruc || '', 
    razonSocial: user.clinicName || '', 
    direccion: user.address || '' 
  });
  const [paymentMethod, setPaymentMethod] = useState<string>('Tarjeta de Crédito');
  
  // Rewards integration state
  const [useRewards, setUseRewards] = useState(false);
  const [pointsToRedeem, setPointsToRedeem] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Group items by supplier
  const groupedItems = cartItems.reduce((acc, item) => {
    const sId = item.supplier.id;
    if (!acc[sId]) {
      acc[sId] = {
        supplier: item.supplier,
        items: []
      };
    }
    acc[sId].items.push(item);
    return acc;
  }, {} as Record<string, { supplier: Supplier; items: CartItem[] }>);

  // S/. 15 shipping fee per supplier, free if subtotal >= 500
  const supplierShippingFees = Object.values(groupedItems).map(group => {
    const subtotal = group.items.reduce((sum, item) => sum + (item.listing.price * item.quantity), 0);
    const fee = subtotal >= 500 ? 0 : 15;
    return { supplierId: group.supplier.id, supplierName: group.supplier.name, fee };
  });

  const totalShippingFee = supplierShippingFees.reduce((sum, s) => sum + s.fee, 0);
  const subtotalCost = cartItems.reduce((sum, item) => sum + (item.listing.price * item.quantity), 0);

  // Max points user can redeem (multiples of 100, up to either user's points or subtotal cost)
  const pointsRate = 100; // 100 points = S/. 1.00
  const maxPossibleDiscount = subtotalCost;
  const maxPointsAffordable = Math.min(
    user.points, 
    Math.floor(maxPossibleDiscount * pointsRate)
  );
  // Round down to nearest 100 points
  const maxPointsToUse = Math.floor(maxPointsAffordable / 100) * 100;

  const discountValue = (pointsToRedeem / pointsRate);
  const totalToPay = subtotalCost - discountValue + totalShippingFee;

  // Handle points toggle change
  const handleRewardsToggle = (checked: boolean) => {
    setUseRewards(checked);
    if (checked) {
      setPointsToRedeem(maxPointsToUse);
    } else {
      setPointsToRedeem(0);
    }
  };

  // Handle slider points adjustment
  const handlePointsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Math.floor(Number(e.target.value) / 100) * 100;
    setPointsToRedeem(val);
  };

  // Handle checkout simulation
  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!shippingInfo.ruc || !shippingInfo.razonSocial || !shippingInfo.direccion) {
      alert('Por favor, complete todos los campos de facturación.');
      return;
    }
    
    setIsSubmitting(true);
    
    setTimeout(() => {
      // Create the order inside UserContext
      const newOrder = createOrder(
        cartItems,
        {
          ruc: shippingInfo.ruc,
          razonSocial: shippingInfo.razonSocial,
          address: shippingInfo.direccion
        },
        paymentMethod,
        useRewards ? pointsToRedeem : 0,
        useRewards ? discountValue : 0
      );

      setLastCreatedOrder(newOrder);
      setIsSubmitting(false);
      setCheckoutComplete(true);
      clearCart();
    }, 2000);
  };

  if (checkoutComplete && lastCreatedOrder) {
    return (
      <div className="max-w-xl mx-auto py-12 px-6 animate-fade-in space-y-6">
        <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto border border-emerald-250/30">
          <CheckCircle2 size={32} />
        </div>
        
        <div className="text-center space-y-2">
          <h2 className="text-xl font-bold text-zinc-950 dark:text-white">¡Compra Consolidada Exitosa!</h2>
          <p className="text-xs text-zinc-550 dark:text-zinc-400 max-w-sm mx-auto">
            Hemos registrado tu pedido. OneShop dividió la orden automáticamente por proveedor y coordinó sus despachos individuales.
          </p>
        </div>

        {/* Order specs breakdown */}
        <div className="p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#0c0c0f] shadow-sm space-y-4">
          <div className="flex justify-between items-center text-xs pb-3 border-b border-zinc-100 dark:border-zinc-900 font-mono">
            <span className="text-zinc-400">PEDIDO CONSOLIDADO:</span>
            <span className="font-bold text-zinc-900 dark:text-white">{lastCreatedOrder.id}</span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between text-zinc-500">
              <span>Razón Social / RUC:</span>
              <span className="font-bold text-zinc-800 dark:text-zinc-200">{lastCreatedOrder.clinicName} (RUC {lastCreatedOrder.clinicRuc})</span>
            </div>
            <div className="flex justify-between text-zinc-500">
              <span>Dirección Despacho:</span>
              <span className="font-bold text-zinc-800 dark:text-zinc-200">{lastCreatedOrder.address}</span>
            </div>
            <div className="flex justify-between text-zinc-500">
              <span>Método Pago:</span>
              <span className="font-bold text-zinc-800 dark:text-zinc-200">{lastCreatedOrder.paymentMethod}</span>
            </div>
          </div>

          {/* Suborders breakdown */}
          <div className="space-y-3 pt-3 border-t border-zinc-100 dark:border-zinc-900">
            <h4 className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Despachos por Proveedor ({lastCreatedOrder.suborders.length})</h4>
            
            <div className="space-y-2">
              {lastCreatedOrder.suborders.map((sub: any, idx: number) => (
                <div key={idx} className="p-3 bg-zinc-50 dark:bg-zinc-900/50 rounded-lg border border-zinc-150/40 dark:border-zinc-800 text-[10px] flex justify-between items-center">
                  <div>
                    <h5 className="font-bold text-zinc-800 dark:text-zinc-200">{sub.supplierName}</h5>
                    <p className="text-[9px] text-zinc-400">{sub.items.length} artículos en despacho</p>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[8.5px] font-bold uppercase tracking-wider bg-blue-50 text-blue-700 dark:bg-blue-950/20 dark:text-blue-400">
                    {sub.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-zinc-100 dark:border-zinc-900 flex justify-between text-xs font-bold text-zinc-950 dark:text-white font-mono">
            <span>Puntos OneRewards Ganados:</span>
            <span className="text-emerald-500">+{lastCreatedOrder.pointsEarned} pts</span>
          </div>

          {lastCreatedOrder.discountApplied > 0 && (
            <div className="flex justify-between text-xs font-bold text-zinc-950 dark:text-white font-mono">
              <span>Descuento por Canje:</span>
              <span className="text-rose-500">- S/. {lastCreatedOrder.discountApplied.toFixed(2)}</span>
            </div>
          )}

          <div className="flex justify-between text-xs font-bold text-zinc-950 dark:text-white font-mono">
            <span>Total Pagado:</span>
            <span className="text-base font-black">S/. {lastCreatedOrder.total.toFixed(2)}</span>
          </div>

        </div>

        <div className="flex gap-3 justify-center">
          <button
            onClick={() => onNavigate('pedidos')}
            className="px-4 py-2.5 border border-zinc-250 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-lg text-xs font-semibold hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors cursor-pointer"
          >
            Seguimiento de Envío
          </button>
          <button
            onClick={() => {
              setCheckoutComplete(false);
              setLastCreatedOrder(null);
              onNavigate('resumen');
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-5 py-2.5 rounded-lg text-xs transition-colors shadow-sm cursor-pointer"
          >
            Ir al Dashboard
          </button>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="max-w-md mx-auto text-center py-16 px-4 space-y-4">
        <div className="w-12 h-12 rounded-xl bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center mx-auto text-zinc-400">
          <ShoppingBag size={24} />
        </div>
        <div className="space-y-1">
          <h2 className="text-sm font-bold text-zinc-800 dark:text-zinc-200">Tu carrito está vacío</h2>
          <p className="text-xs text-zinc-400">
            Explora el buscador inteligente o nuestros kits procedimentales para comenzar a comprar.
          </p>
        </div>
        <button
          onClick={() => onNavigate('buscar')}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg text-xs transition-colors cursor-pointer"
        >
          Explorar Productos
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in text-xs">
      
      {/* Left Column: Cart items grouped by supplier (2 cols) */}
      <div className="lg:col-span-2 space-y-6">
        
        {/* Smart optimization banner */}
        {recommendations.length > 0 && (
          <div className="p-5 rounded-xl bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800/40 space-y-3 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-full blur-xl pointer-events-none" />
            <div className="flex gap-3">
              <Sparkles className="text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" size={18} />
              <div>
                <h3 className="text-xs font-bold text-blue-950 dark:text-blue-250 uppercase tracking-wider">
                  ¡Optimizaciones de Ahorro Disponibles!
                </h3>
                <p className="text-[11px] text-blue-700 dark:text-blue-400 mt-1 leading-relaxed">
                  Detectamos alternativas de compra equivalentes o con otros proveedores que reducen tus costos manteniendo la misma calidad de insumos.
                </p>
                <div className="mt-3 flex flex-wrap items-center gap-4 text-xs font-mono font-bold">
                  <span className="text-zinc-500 dark:text-zinc-400 line-through">S/. {cartTotals.originalTotal.toFixed(2)}</span>
                  <span className="text-zinc-950 dark:text-white">S/. {cartTotals.optimizedTotal.toFixed(2)}</span>
                  <span className="text-emerald-500 bg-emerald-50 dark:bg-emerald-950/20 px-2 py-0.5 rounded font-sans">Ahorro: S/. {cartTotals.savings.toFixed(2)}</span>
                </div>
              </div>
            </div>
            
            <div className="flex gap-2 justify-end pt-2 border-t border-blue-200/50 dark:border-blue-800/30">
              <button
                onClick={applyAllOptimizations}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded-lg text-[11px] transition-all shadow-sm cursor-pointer"
              >
                Aplicar Optimización Completa
              </button>
            </div>
          </div>
        )}

        {/* Grouped items by Supplier cards */}
        {Object.values(groupedItems).map(({ supplier, items }) => {
          const supplierSubtotal = items.reduce((sum, item) => sum + (item.listing.price * item.quantity), 0);
          const shippingFee = supplierSubtotal >= 500 ? 0 : 15;

          return (
            <div 
              key={supplier.id}
              className="p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#0c0c0f] shadow-sm"
            >
              {/* Supplier banner */}
              <div className="flex justify-between items-center mb-4 pb-2 border-b border-zinc-100 dark:border-zinc-900">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded bg-blue-600/10 text-blue-600 flex items-center justify-center font-bold text-[10px] border border-blue-200/20">
                    {supplier.logo}
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-zinc-950 dark:text-white">{supplier.name}</h3>
                    <span className="text-[9px] text-zinc-455">{supplier.location}</span>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-[10px] font-semibold text-zinc-400">
                  <span className="flex items-center gap-1"><Truck size={12} /> {supplier.avgDeliveryHours}h de entrega</span>
                  <span>Envío: <strong className="text-zinc-655 dark:text-zinc-300 font-bold">{shippingFee === 0 ? 'Gratis' : 'S/. 15.00'}</strong></span>
                </div>
              </div>

              {/* Items in supplier group */}
              <div className="divide-y divide-zinc-150 dark:divide-zinc-900">
                {items.map(item => {
                  const itemKey = `${item.product.id}_${item.listing.supplierId}`;
                  const rec = recommendations.find(r => r.itemId === itemKey);

                  return (
                    <div key={item.product.id} className="py-4 space-y-3">
                      <div className="flex justify-between items-start gap-4">
                        <div className="space-y-0.5">
                          <h4 
                            className="text-xs font-bold text-zinc-900 dark:text-white hover:text-blue-500 cursor-pointer"
                            onClick={() => onSelectProduct(item.product)}
                          >
                            {item.product.name}
                          </h4>
                          <p className="text-[10px] text-zinc-400">{item.product.brand} • {item.listing.condition}</p>
                        </div>

                        <div className="flex items-center gap-4 shrink-0">
                          {/* Quantity control */}
                          <div className="flex items-center border border-zinc-200 dark:border-zinc-800 rounded-lg overflow-hidden bg-zinc-50 dark:bg-zinc-950">
                            <button
                              onClick={() => updateQuantity(item.product.id, item.listing.supplierId, item.quantity - 1)}
                              className="px-2.5 py-1 text-xs hover:bg-zinc-100 dark:hover:bg-zinc-900 cursor-pointer text-zinc-500"
                            >
                              -
                            </button>
                            <span className="px-2 font-mono text-xs font-semibold text-zinc-805 dark:text-zinc-200">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.product.id, item.listing.supplierId, item.quantity + 1)}
                              className="px-2.5 py-1 text-xs hover:bg-zinc-100 dark:hover:bg-zinc-900 cursor-pointer text-zinc-500"
                            >
                              +
                            </button>
                          </div>

                          {/* Item Subtotal price */}
                          <span className="font-mono text-xs font-bold text-zinc-950 dark:text-white min-w-[70px] text-right">
                            S/. {(item.listing.price * item.quantity).toFixed(2)}
                          </span>

                          {/* Delete item button */}
                          <button
                            onClick={() => removeFromCart(item.product.id, item.listing.supplierId)}
                            className="p-1.5 hover:bg-rose-50 dark:hover:bg-rose-955/20 hover:text-rose-600 text-zinc-400 rounded transition-colors cursor-pointer"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </div>

                      {/* Recommend box inline */}
                      {rec && (
                        <div className="p-3 rounded-lg bg-[#fcfcfd] dark:bg-[#0c0c0f] border border-zinc-150 dark:border-zinc-900 flex justify-between items-center text-[10px] text-zinc-500 shadow-sm">
                          <div className="flex items-center gap-2 pr-3">
                            <Sparkles className="text-blue-500 shrink-0" size={12} />
                            <span className="leading-relaxed">
                              {rec.type === 'supplier_switch' 
                                ? `Proveedor alternativo: ${rec.better.supplier.name} lo vende por S/. ${rec.better.listing.price.toFixed(2)}`
                                : `Resina equivalente: ${rec.better.product.name} de ${rec.better.supplier.name} por S/. ${rec.better.listing.price.toFixed(2)}`
                              }
                            </span>
                          </div>
                          <button
                            onClick={() => applyOptimization(rec.id)}
                            className="text-blue-600 dark:text-blue-400 font-bold hover:underline shrink-0 cursor-pointer"
                          >
                            Cambiar y ahorrar S/. {(rec.savingsPerUnit * item.quantity).toFixed(2)}
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Right Column: Checkout Billing Form and Summary (1 col) */}
      <div className="space-y-6">
        
        {/* Pricing Summary */}
        <div className="p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#0c0c0f] shadow-sm space-y-4">
          <h2 className="text-sm font-bold text-zinc-950 dark:text-white pb-2 border-b border-zinc-100 dark:border-zinc-900">
            Resumen de Compra
          </h2>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between text-zinc-500">
              <span>Costo total productos</span>
              <span className="font-mono font-semibold text-zinc-800 dark:text-zinc-200">
                S/. {subtotalCost.toFixed(2)}
              </span>
            </div>
            
            <div className="flex justify-between text-zinc-500">
              <span>Gastos de envío ({cartTotals.supplierCount} envíos)</span>
              <span className="font-mono font-semibold text-zinc-800 dark:text-zinc-200">
                {totalShippingFee === 0 ? 'Gratis' : `S/. ${totalShippingFee.toFixed(2)}`}
              </span>
            </div>

            {/* OneRewards Points Discount Widget */}
            {user.points >= 100 && (
              <div className="pt-2.5 pb-1 border-t border-zinc-100 dark:border-zinc-900 space-y-3">
                <label className="flex items-center gap-2 font-bold text-amber-600 dark:text-amber-500 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={useRewards}
                    onChange={(e) => handleRewardsToggle(e.target.checked)}
                    className="rounded text-amber-600 border-amber-300 focus:ring-amber-500"
                  />
                  <Award size={14} className="fill-amber-500/20" />
                  <span>¿Canjear puntos OneRewards?</span>
                </label>

                {useRewards && (
                  <div className="p-3 bg-amber-50/20 dark:bg-amber-950/10 border border-amber-200/50 dark:border-amber-900/30 rounded-lg space-y-2">
                    <div className="flex justify-between text-[10px] text-zinc-500">
                      <span>Saldo: {user.points} pts</span>
                      <span className="font-bold text-amber-600">{pointsToRedeem} pts = S/. {discountValue.toFixed(2)} dcto</span>
                    </div>
                    
                    <input
                      type="range"
                      min={0}
                      max={maxPointsToUse}
                      step={100}
                      value={pointsToRedeem}
                      onChange={handlePointsChange}
                      className="w-full bg-amber-100 dark:bg-amber-900 h-1.5 rounded-lg cursor-pointer accent-amber-500"
                    />
                    
                    <p className="text-[9px] text-zinc-400">Canjeas en tramos de 100 puntos (100 pts = S/. 1.00 de descuento).</p>
                  </div>
                )}
              </div>
            )}

            {useRewards && discountValue > 0 && (
              <div className="flex justify-between text-emerald-500 font-bold font-mono">
                <span>Descuento OneRewards</span>
                <span>- S/. {discountValue.toFixed(2)}</span>
              </div>
            )}

            <div className="pt-3 border-t border-zinc-100 dark:border-zinc-900 flex justify-between items-center text-sm font-bold text-zinc-950 dark:text-white">
              <span>Total a Pagar</span>
              <span className="font-mono text-base font-black">
                S/. {totalToPay.toFixed(2)}
              </span>
            </div>
          </div>
          
          <div className="p-3 bg-zinc-50 dark:bg-zinc-900/50 rounded-lg text-[10px] text-zinc-400 leading-normal flex gap-2">
            <Receipt className="text-blue-500 shrink-0 mt-0.5" size={13} />
            <span>
              Tus transacciones están protegidas. Recibirás comprobantes fiscales electrónicos separados de forma automática por cada proveedor dental.
            </span>
          </div>
        </div>

        {/* Billing Checkout Form */}
        <div className="p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#0c0c0f] shadow-sm">
          <h2 className="text-sm font-bold text-zinc-950 dark:text-white pb-2 mb-4 border-b border-zinc-100 dark:border-zinc-900">
            Datos de Facturación
          </h2>

          <form onSubmit={handleCheckoutSubmit} className="space-y-4">
            <div className="space-y-1">
              <label htmlFor="ruc" className="block text-[10px] font-bold uppercase tracking-wider text-zinc-500">Número RUC</label>
              <input
                id="ruc"
                type="text"
                required
                maxLength={11}
                pattern="\d{11}"
                value={shippingInfo.ruc}
                onChange={(e) => setShippingInfo(prev => ({ ...prev, ruc: e.target.value.replace(/\D/g, '') }))}
                placeholder="Ej. 20601234567"
                className="w-full bg-white dark:bg-[#09090b] border border-zinc-200 dark:border-zinc-800 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 text-zinc-800 dark:text-zinc-200"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="razonSocial" className="block text-[10px] font-bold uppercase tracking-wider text-zinc-500">Razón Social / Razón Comercial</label>
              <input
                id="razonSocial"
                type="text"
                required
                value={shippingInfo.razonSocial}
                onChange={(e) => setShippingInfo(prev => ({ ...prev, razonSocial: e.target.value }))}
                placeholder="Ej. Clinica Dental San Rafael S.A.C."
                className="w-full bg-white dark:bg-[#09090b] border border-zinc-200 dark:border-zinc-800 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 text-zinc-800 dark:text-zinc-200"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="direccion" className="block text-[10px] font-bold uppercase tracking-wider text-zinc-500">Dirección de Entrega</label>
              <input
                id="direccion"
                type="text"
                required
                value={shippingInfo.direccion}
                onChange={(e) => setShippingInfo(prev => ({ ...prev, direccion: e.target.value }))}
                placeholder="Ej. Av. Arequipa 1234, Lince, Lima"
                className="w-full bg-white dark:bg-[#09090b] border border-zinc-200 dark:border-zinc-800 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 text-zinc-800 dark:text-zinc-200"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="payment" className="block text-[10px] font-bold uppercase tracking-wider text-zinc-500">Método de Pago</label>
              <select
                id="payment"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-full bg-white dark:bg-[#09090b] border border-zinc-200 dark:border-zinc-800 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 text-zinc-800 dark:text-zinc-200"
              >
                <option value="Tarjeta de Crédito">Tarjeta de Crédito / Débito (Visa, MC)</option>
                <option value="Yape">Yape / Plin</option>
                <option value="Transferencia BCP">Transferencia Bancaria BCP (Pago Efectivo)</option>
                <option value="Crédito B2B 30 días">Crédito B2B 30 días (Sujeto a evaluación)</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-zinc-950 hover:bg-zinc-850 dark:bg-white dark:hover:bg-zinc-200 text-white dark:text-zinc-950 font-bold py-2.5 rounded-lg text-xs transition-colors flex items-center justify-center gap-1.5 shadow-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <span className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  Procesando Pedido...
                </>
              ) : (
                <>
                  Confirmar y Pagar Consolidado
                  <ArrowRight size={13} />
                </>
              )}
            </button>
          </form>
        </div>

      </div>

    </div>
  );
};
