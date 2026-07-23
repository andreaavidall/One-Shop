import React, { useState } from 'react';
import { useUser, type OrderSub, type Order } from '../context/UserContext';
import { listings, products, suppliers, type Product, type ProductListing } from '../data/mockData';
import { TrendingUp, ShoppingBag, Eye, Percent, CheckCircle2, Award, Clipboard, Edit3, Trash2, Plus, ArrowRight, ShieldCheck, Clock, FileSpreadsheet, Upload } from 'lucide-react';

export const SupplierPanel: React.FC = () => {
  const { user, orders, updateOrderStatus } = useUser();
  const [activeSubTab, setActiveSubTab] = useState<'resumen' | 'pedidos' | 'catalogo' | 'csv'>('resumen');
  
  // Find current supplier details
  const supplierId = user.supplierId || 's1';
  const supplier = suppliers.find(s => s.id === supplierId) || suppliers[0];

  // Inline catalog state
  const [supplierListings, setSupplierListings] = useState<ProductListing[]>(
    listings.filter(l => l.supplierId === supplierId)
  );
  
  // States for add / edit catalog items
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<ProductListing | null>(null);
  const [formData, setFormData] = useState({
    productId: products[0].id,
    price: 150.00,
    stock: 20,
    deliveryHours: 24,
    warrantyMonths: 12,
    condition: 'Nuevo' as 'Nuevo' | 'Reacondicionado'
  });

  // CSV paste state
  const [csvText, setCsvText] = useState(
    `SKU,Precio,Stock,EntregaHoras,GarantiaMeses\np1,141.50,45,24,0\np2,118.00,20,24,0\np3,179.00,30,12,0\np6,255.00,25,24,0\np16,25.90,300,24,0`
  );

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Find incoming orders matching this supplier
  const supplierOrders = orders.filter(o => o.suborders.some(s => s.supplierId === supplierId));

  // Calc metrics
  const totalSales = supplierOrders
    .filter(o => o.status !== 'Cancelado')
    .reduce((sum, o) => {
      const sub = o.suborders.find(s => s.supplierId === supplierId)!;
      const subtotal = sub.items.reduce((s, i) => s + (i.price * i.quantity), 0);
      return sum + subtotal;
    }, 0);

  const totalCommissions = totalSales * 0.05; // 5% platform commission

  const handleStatusChange = (orderId: string, newStatus: OrderSub['status']) => {
    updateOrderStatus(orderId, supplierId, newStatus);
    triggerToast(`Pedido ${orderId} actualizado a "${newStatus}"`);
  };

  const handleSaveListing = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingItem) {
      // Editing existing
      const updated = supplierListings.map(l => {
        if (l.id === editingItem.id) {
          return {
            ...l,
            price: Number(formData.price),
            stock: Number(formData.stock),
            deliveryHours: Number(formData.deliveryHours),
            warrantyMonths: Number(formData.warrantyMonths),
            condition: formData.condition
          };
        }
        return l;
      });
      setSupplierListings(updated);
      triggerToast('Producto del catálogo actualizado correctamente.');
    } else {
      // Adding new
      const exists = supplierListings.some(l => l.productId === formData.productId);
      if (exists) {
        triggerToast('Este producto ya existe en tu catálogo. Edítalo en la lista.');
        return;
      }
      const newListing: ProductListing = {
        id: `l_${Date.now()}`,
        productId: formData.productId,
        supplierId,
        price: Number(formData.price),
        stock: Number(formData.stock),
        deliveryHours: Number(formData.deliveryHours),
        warrantyMonths: Number(formData.warrantyMonths),
        condition: formData.condition,
        rating: 4.5
      };
      setSupplierListings([newListing, ...supplierListings]);
      triggerToast('Producto añadido al catálogo de forma exitosa.');
    }
    setShowForm(false);
    setEditingItem(null);
  };

  const handleDeleteListing = (id: string) => {
    if (window.confirm('¿Está seguro de que desea eliminar este producto de su catálogo?')) {
      setSupplierListings(prev => prev.filter(l => l.id !== id));
      triggerToast('Producto retirado del catálogo.');
    }
  };

  const handleEditClick = (item: ProductListing) => {
    setEditingItem(item);
    setFormData({
      productId: item.productId,
      price: item.price,
      stock: item.stock,
      deliveryHours: item.deliveryHours,
      warrantyMonths: item.warrantyMonths,
      condition: item.condition
    });
    setShowForm(true);
  };

  const handleAddNewClick = () => {
    setEditingItem(null);
    setFormData({
      productId: products[0].id,
      price: 100.00,
      stock: 50,
      deliveryHours: 24,
      warrantyMonths: 0,
      condition: 'Nuevo'
    });
    setShowForm(true);
  };

  const handleImportCSV = () => {
    const lines = csvText.trim().split('\n');
    if (lines.length <= 1) {
      triggerToast('El contenido CSV está vacío o mal formateado.');
      return;
    }

    let updatedCount = 0;
    let addedCount = 0;

    const newListings = [...supplierListings];

    for (let i = 1; i < lines.length; i++) {
      const parts = lines[i].split(',');
      if (parts.length < 3) continue;

      const prodId = parts[0].trim();
      const price = Number(parts[1]);
      const stock = Number(parts[2]);
      const delivery = Number(parts[3] || 24);
      const warranty = Number(parts[4] || 0);

      const existsIdx = newListings.findIndex(l => l.productId === prodId);
      if (existsIdx > -1) {
        newListings[existsIdx] = {
          ...newListings[existsIdx],
          price,
          stock,
          deliveryHours: delivery,
          warrantyMonths: warranty
        };
        updatedCount++;
      } else {
        // Only add if product exists in global product catalog
        if (products.some(p => p.id === prodId)) {
          newListings.push({
            id: `l_csv_${i}_${Date.now()}`,
            productId: prodId,
            supplierId,
            price,
            stock,
            deliveryHours: delivery,
            warrantyMonths: warranty,
            condition: 'Nuevo',
            rating: 4.5
          });
          addedCount++;
        }
      }
    }

    setSupplierListings(newListings);
    triggerToast(`¡Importación CSV exitosa! Actualizados: ${updatedCount}, Creados: ${addedCount} productos.`);
  };

  return (
    <div className="space-y-6 animate-fade-in relative">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-zinc-950 dark:bg-zinc-50 dark:text-zinc-950 text-white border border-zinc-800 px-4 py-3 rounded-xl shadow-2xl text-xs font-bold flex items-center gap-2 animate-fade-in">
          <CheckCircle2 size={15} className="text-emerald-500" />
          {toastMessage}
        </div>
      )}

      {/* Supplier Panel Header */}
      <div className="p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#0c0c0f] shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-1.5 flex-1">
          <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-2 py-0.5 rounded uppercase tracking-wider">
            PANEL DE SOCIO PROVEEDOR
          </span>
          <h1 className="text-xl font-bold text-zinc-950 dark:text-white flex items-center gap-2">
            <span className="w-6 h-6 rounded bg-blue-600 text-white font-black text-xs flex items-center justify-center">
              {supplier.logo}
            </span>
            {supplier.name}
          </h1>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Administra tus pedidos pendientes, actualiza el stock/precios de tu catálogo y gestiona tu logística de despachos para Lima.
          </p>
        </div>

        {/* Sub-tab selection pill */}
        <div className="flex bg-zinc-100 dark:bg-zinc-900 rounded-lg p-1 text-xs shrink-0 self-start md:self-auto">
          {[
            { id: 'resumen', label: 'Resumen' },
            { id: 'pedidos', label: 'Pedidos Recibidos' },
            { id: 'catalogo', label: 'Mi Catálogo' },
            { id: 'csv', label: 'Importación CSV' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id as any)}
              className={`px-3 py-1.5 rounded-md font-semibold transition-all cursor-pointer ${
                activeSubTab === tab.id
                  ? 'bg-white dark:bg-zinc-800 text-zinc-950 dark:text-white shadow-sm font-bold'
                  : 'text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* RENDER RESUMEN TAB */}
      {activeSubTab === 'resumen' && (
        <div className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#0c0c0f] shadow-sm flex flex-col justify-between">
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">Volumen Ventas (Mes)</span>
              <div className="text-xl font-bold tracking-tight text-zinc-950 dark:text-white mt-3 font-mono">
                S/. {totalSales.toLocaleString('es-PE', { minimumFractionDigits: 2 })}
              </div>
              <p className="text-[10px] text-zinc-400 mt-1">Órdenes consolidadas finalizadas</p>
            </div>

            <div className="p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#0c0c0f] shadow-sm flex flex-col justify-between">
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">Pedidos Pendientes</span>
              <div className="text-xl font-bold tracking-tight text-zinc-950 dark:text-white mt-3 font-mono">
                {supplierOrders.filter(o => o.status !== 'Entregado' && o.status !== 'Cancelado').length} órdenes
              </div>
              <p className="text-[10px] text-zinc-400 mt-1">Requieren empaque o envío</p>
            </div>

            <div className="p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#0c0c0f] shadow-sm flex flex-col justify-between">
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">Comisiones Acumuladas (5%)</span>
              <div className="text-xl font-bold tracking-tight text-zinc-950 dark:text-white mt-3 font-mono">
                S/. {totalCommissions.toLocaleString('es-PE', { minimumFractionDigits: 2 })}
              </div>
              <p className="text-[10px] text-zinc-400 mt-1">Comisión cobrada por OneShop</p>
            </div>

            <div className="p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#0c0c0f] shadow-sm flex flex-col justify-between">
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">Productos sin Stock</span>
              <div className="text-xl font-bold tracking-tight text-zinc-950 dark:text-white mt-3 font-mono text-rose-500">
                {supplierListings.filter(l => l.stock === 0).length} productos
              </div>
              <p className="text-[10px] text-zinc-400 mt-1">Desactivados temporalmente</p>
            </div>
          </div>

          {/* Quick lists split */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Urgent Orders (2 cols) */}
            <div className="lg:col-span-2 p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#0c0c0f] shadow-sm space-y-4">
              <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-400 pb-2 border-b border-zinc-100 dark:border-zinc-900">
                Pedidos Pendientes de Preparación
              </h2>
              
              <div className="space-y-3">
                {supplierOrders.filter(o => o.status !== 'Entregado' && o.status !== 'Cancelado').slice(0, 3).map((order) => {
                  const sub = order.suborders.find(s => s.supplierId === supplierId)!;
                  const orderSubtotal = sub.items.reduce((s, i) => s + (i.price * i.quantity), 0);

                  return (
                    <div key={order.id} className="p-4 rounded-lg bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-900 flex justify-between items-center text-xs">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-zinc-900 dark:text-zinc-150">{order.id}</span>
                          <span className="text-[10px] text-zinc-400">{order.date}</span>
                        </div>
                        <p className="text-[10px] text-zinc-500 mt-1">
                          Cliente: <span className="font-semibold text-zinc-800 dark:text-zinc-200">{order.clinicName}</span> • Items: {sub.items.length}
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="font-mono font-bold text-zinc-900 dark:text-white">S/. {orderSubtotal.toFixed(2)}</span>
                        <button
                          onClick={() => setActiveSubTab('pedidos')}
                          className="bg-blue-50 text-blue-600 font-bold px-2 py-1 rounded text-[10px] hover:bg-blue-100 transition-colors cursor-pointer"
                        >
                          Atender →
                        </button>
                      </div>
                    </div>
                  );
                })}
                {supplierOrders.length === 0 && (
                  <p className="text-center py-6 text-zinc-400 text-xs">No tienes pedidos pendientes de atención en este momento.</p>
                )}
              </div>
            </div>

            {/* Out of Stock Alerts (1 col) */}
            <div className="p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#0c0c0f] shadow-sm space-y-4">
              <h2 className="text-xs font-bold uppercase tracking-wider text-rose-500 pb-2 border-b border-zinc-100 dark:border-zinc-900">
                Alertas de Stock Crítico
              </h2>

              <div className="space-y-3">
                {supplierListings.filter(l => l.stock <= 5).slice(0, 4).map((listing) => {
                  const prod = products.find(p => p.id === listing.productId)!;
                  return (
                    <div key={listing.id} className="flex justify-between items-center text-xs">
                      <div className="overflow-hidden">
                        <h4 className="font-bold text-zinc-800 dark:text-zinc-200 truncate">{prod.name}</h4>
                        <span className="text-[9px] text-zinc-400">{prod.brand}</span>
                      </div>
                      <span className={`font-semibold shrink-0 ${listing.stock === 0 ? 'text-rose-500 font-bold' : 'text-amber-500'}`}>
                        {listing.stock === 0 ? 'Sin stock' : `${listing.stock} uds`}
                      </span>
                    </div>
                  );
                })}
                {supplierListings.filter(l => l.stock <= 5).length === 0 && (
                  <p className="text-center py-6 text-zinc-400 text-xs">Inventario saludable. Todos tus productos tienen stock.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* RENDER PEDIDOS TAB */}
      {activeSubTab === 'pedidos' && (
        <div className="p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#0c0c0f] shadow-sm space-y-4">
          <h2 className="text-sm font-bold text-zinc-950 dark:text-white pb-2 border-b border-zinc-100 dark:border-zinc-900">
            Pedidos Recibidos de Clínicas
          </h2>

          <div className="space-y-4">
            {supplierOrders.map((order) => {
              const sub = order.suborders.find(s => s.supplierId === supplierId)!;
              const subtotal = sub.items.reduce((s, i) => s + (i.price * i.quantity), 0);

              return (
                <div key={order.id} className="p-4 rounded-xl border border-zinc-150 dark:border-zinc-900 bg-zinc-50/20 dark:bg-zinc-950/20 space-y-4">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-zinc-100 dark:border-zinc-900 pb-2.5 text-xs">
                    <div>
                      <span className="font-mono font-bold text-zinc-900 dark:text-zinc-150 text-sm">{order.id}</span>
                      <p className="text-[10px] text-zinc-400">Cliente: <span className="font-semibold text-zinc-800 dark:text-zinc-200">{order.clinicName} (RUC {order.clinicRuc})</span></p>
                      <p className="text-[10px] text-zinc-400">Destino: <span className="font-semibold text-zinc-800 dark:text-zinc-200">{order.address}</span></p>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="text-left md:text-right">
                        <span className="text-[9px] uppercase font-bold text-zinc-400 block">Sub-pedido Total</span>
                        <span className="font-mono font-bold text-zinc-950 dark:text-white text-sm">S/. {subtotal.toFixed(2)}</span>
                      </div>
                      
                      {/* Update status dropdown */}
                      <select
                        value={sub.status}
                        onChange={(e) => handleStatusChange(order.id, e.target.value as any)}
                        className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded px-2.5 py-1 text-xs font-semibold text-zinc-700 dark:text-zinc-300 focus:outline-none"
                      >
                        <option value="Confirmado">Confirmado</option>
                        <option value="Preparando">Preparando</option>
                        <option value="Enviado">Enviado</option>
                        <option value="Entregado">Entregado</option>
                        <option value="Cancelado">Cancelado</option>
                      </select>
                    </div>
                  </div>

                  {/* Suborder Items */}
                  <div className="divide-y divide-zinc-100 dark:divide-zinc-900 text-xs">
                    {sub.items.map((item, itemIdx) => (
                      <div key={itemIdx} className="py-2 flex justify-between items-center">
                        <div>
                          <span className="font-semibold text-zinc-800 dark:text-zinc-200">{item.productName}</span>
                          <p className="text-[10px] text-zinc-400">{item.brand} • Cantidad: {item.quantity}</p>
                        </div>
                        <span className="font-mono font-bold text-zinc-900 dark:text-white">S/. {(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
            {supplierOrders.length === 0 && (
              <p className="text-center py-10 text-zinc-400 text-xs">No has recibido pedidos a través de OneShop aún.</p>
            )}
          </div>
        </div>
      )}

      {/* RENDER CATALOG TAB */}
      {activeSubTab === 'catalogo' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center pb-2 border-b border-zinc-200 dark:border-zinc-800">
            <h2 className="text-sm font-bold text-zinc-950 dark:text-white">Gestión de Catálogo de Productos</h2>
            <button
              onClick={handleAddNewClick}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-3 py-1.5 rounded-lg text-xs transition-all flex items-center gap-1 cursor-pointer"
            >
              <Plus size={14} /> Añadir Producto
            </button>
          </div>

          {/* Form Modal/Section inside page */}
          {showForm && (
            <form onSubmit={handleSaveListing} className="p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950/20 space-y-4 text-xs">
              <h3 className="font-bold text-zinc-900 dark:text-white text-xs">
                {editingItem ? 'Editar Parámetros de Catálogo' : 'Añadir Nuevo Producto a mi Catálogo'}
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {!editingItem && (
                  <div className="space-y-1">
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-400">Seleccionar Producto Maestro</label>
                    <select
                      value={formData.productId}
                      onChange={(e) => setFormData(prev => ({ ...prev, productId: e.target.value }))}
                      className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded p-2 text-xs text-zinc-800 dark:text-zinc-200"
                    >
                      {products.map(p => (
                        <option key={p.id} value={p.id}>{p.name} ({p.brand})</option>
                      ))}
                    </select>
                  </div>
                )}

                <div className="space-y-1">
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-400">Precio (S/.)</label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData(prev => ({ ...prev, price: Number(e.target.value) }))}
                    className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded p-2 text-xs text-zinc-850 dark:text-zinc-200"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-400">Stock Disponible</label>
                  <input
                    type="number"
                    min="0"
                    required
                    value={formData.stock}
                    onChange={(e) => setFormData(prev => ({ ...prev, stock: Number(e.target.value) }))}
                    className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded p-2 text-xs text-zinc-850 dark:text-zinc-200"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-400">Tiempo de Despacho (Horas)</label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={formData.deliveryHours}
                    onChange={(e) => setFormData(prev => ({ ...prev, deliveryHours: Number(e.target.value) }))}
                    className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded p-2 text-xs text-zinc-850 dark:text-zinc-200"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-400">Garantía (Meses)</label>
                  <input
                    type="number"
                    min="0"
                    required
                    value={formData.warrantyMonths}
                    onChange={(e) => setFormData(prev => ({ ...prev, warrantyMonths: Number(e.target.value) }))}
                    className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded p-2 text-xs text-zinc-850 dark:text-zinc-200"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-400">Condición del Material</label>
                  <select
                    value={formData.condition}
                    onChange={(e) => setFormData(prev => ({ ...prev, condition: e.target.value as any }))}
                    className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded p-2 text-xs text-zinc-850 dark:text-zinc-200"
                  >
                    <option value="Nuevo">Nuevo</option>
                    <option value="Reacondicionado">Reacondicionado</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-2 justify-end">
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingItem(null);
                  }}
                  className="px-4 py-2 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-lg text-xs font-semibold hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded-lg text-xs transition-colors shadow-sm cursor-pointer"
                >
                  {editingItem ? 'Guardar Cambios' : 'Añadir al Catálogo'}
                </button>
              </div>
            </form>
          )}

          {/* Catalog items table */}
          <div className="border border-zinc-200 dark:border-zinc-850 rounded-xl bg-white dark:bg-[#0c0c0f] overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-zinc-50 dark:bg-zinc-900/50 border-b border-zinc-200 dark:border-zinc-850 text-zinc-400 font-semibold uppercase tracking-wider">
                    <th className="py-3 px-4">Producto</th>
                    <th className="py-3 px-4">Categoría</th>
                    <th className="py-3 px-4 text-center">Stock</th>
                    <th className="py-3 px-4">Entrega</th>
                    <th className="py-3 px-4">Garantía</th>
                    <th className="py-3 px-4 text-right">Precio</th>
                    <th className="py-3 px-4 text-right">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-150 dark:divide-zinc-900">
                  {supplierListings.map((list) => {
                    const prod = products.find(p => p.id === list.productId)!;
                    return (
                      <tr key={list.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-950/20 transition-colors">
                        <td className="py-3 px-4 font-semibold text-zinc-900 dark:text-zinc-200">
                          <div>
                            <span className="text-xs font-bold block">{prod.name}</span>
                            <span className="text-[10px] text-zinc-400">{prod.brand} • {list.condition}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-zinc-500">{prod.category}</td>
                        <td className="py-3 px-4 text-center">
                          <span className={`font-mono font-bold ${list.stock === 0 ? 'text-rose-500' : 'text-zinc-700 dark:text-zinc-300'}`}>
                            {list.stock} uds
                          </span>
                        </td>
                        <td className="py-3 px-4 text-zinc-500 flex items-center gap-1 mt-2.5">
                          <Clock size={12} className="text-zinc-400" /> {list.deliveryHours}h
                        </td>
                        <td className="py-3 px-4 text-zinc-500">
                          {list.warrantyMonths > 0 ? (
                            <span className="flex items-center gap-1 text-emerald-500 font-medium">
                              <ShieldCheck size={12} /> {list.warrantyMonths}m
                            </span>
                          ) : 'Sin garantía'}
                        </td>
                        <td className="py-3 px-4 text-right font-mono font-bold text-zinc-950 dark:text-white">
                          S/. {list.price.toFixed(2)}
                        </td>
                        <td className="py-3 px-4 text-right space-x-1.5 shrink-0">
                          <button
                            onClick={() => handleEditClick(list)}
                            className="p-1 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500 hover:text-zinc-900 rounded cursor-pointer inline-flex"
                          >
                            <Edit3 size={13} />
                          </button>
                          <button
                            onClick={() => handleDeleteListing(list.id)}
                            className="p-1 hover:bg-rose-50 dark:hover:bg-rose-950/30 text-zinc-400 hover:text-rose-600 rounded cursor-pointer inline-flex"
                          >
                            <Trash2 size={13} />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* RENDER CSV IMPORT TAB */}
      {activeSubTab === 'csv' && (
        <div className="p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#0c0c0f] shadow-sm space-y-6">
          <div className="space-y-1">
            <h2 className="text-sm font-bold text-zinc-950 dark:text-white flex items-center gap-1.5">
              <FileSpreadsheet size={16} className="text-blue-500" />
              Importar Catálogo por Lote (CSV)
            </h2>
            <p className="text-[11px] text-zinc-400">
              Carga masivamente tu lista de precios y stock. Si el producto ya está en tu catálogo, actualizará sus valores. Si no, lo agregará a tu inventario.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-xs">
            {/* Left side inputs (2 cols) */}
            <div className="lg:col-span-2 space-y-4">
              <div className="space-y-1.5">
                <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-400">Formato del CSV (Texto Plano)</label>
                <textarea
                  rows={8}
                  value={csvText}
                  onChange={(e) => setCsvText(e.target.value)}
                  className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-3 font-mono text-[10px] text-zinc-700 dark:text-zinc-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div className="flex justify-end">
                <button
                  onClick={handleImportCSV}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2.5 rounded-lg text-xs transition-colors flex items-center gap-1.5 shadow-sm cursor-pointer"
                >
                  <Upload size={14} />
                  Procesar Importación
                </button>
              </div>
            </div>

            {/* Format Instructions (1 col) */}
            <div className="p-4 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-150 dark:border-zinc-900 space-y-3">
              <h4 className="font-bold text-zinc-800 dark:text-zinc-200">Instrucciones de Formato</h4>
              <p className="text-zinc-500 leading-normal text-[10px]">
                El archivo debe incluir una fila de cabecera con los siguientes nombres exactos separados por comas:
              </p>
              <code className="block p-2 bg-white dark:bg-zinc-900 rounded border border-zinc-200 dark:border-zinc-800 font-mono text-[9px]">
                SKU,Precio,Stock,EntregaHoras,GarantiaMeses
              </code>
              <p className="text-zinc-500 leading-normal text-[10px]">
                El campo <strong className="text-zinc-700 dark:text-zinc-300">SKU</strong> representa el identificador maestro del producto en OneShop (ej. <code className="font-mono">p1</code>, <code className="font-mono">p2</code>, etc.).
              </p>
              <div className="p-3 bg-blue-50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/30 rounded text-[9px] text-blue-800 dark:text-blue-400 leading-normal flex gap-1.5">
                <ShieldCheck className="shrink-0" size={13} />
                <span>Solo se procesarán códigos SKU válidos en el catálogo de OneShop. Las líneas con SKU incorrectos serán ignoradas.</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
