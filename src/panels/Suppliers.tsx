import React, { useState } from 'react';
import { suppliers, products, listings, type Supplier, type Product, type ProductListing } from '../data/mockData';
import { useCart } from '../context/CartContext';
import { Star, MapPin, Calendar, Truck, ArrowLeft, ShoppingCart, Percent, Compass } from 'lucide-react';

interface Props {
  onSelectProduct: (product: Product) => void;
}

export const Suppliers: React.FC<Props> = ({ onSelectProduct }) => {
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null);
  const { addToCart } = useCart();

  // Find products sold by a supplier
  const getSupplierCatalog = (supplierId: string) => {
    const supplierListings = listings.filter(l => l.supplierId === supplierId);
    return supplierListings.map(l => {
      const product = products.find(p => p.id === l.productId)!;
      return { product, listing: l };
    });
  };

  const handleAddToCart = (product: Product, listing: ProductListing) => {
    addToCart(product, listing, 1);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {!selectedSupplier ? (
        // SUPPLIERS GRID VIEW
        <>
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-zinc-950 dark:text-white">Proveedores Asociados</h1>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              OneShop consolida catálogos de distribuidores oficiales autorizados en el Perú. Revisa su calificación y cobertura de marcas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {suppliers.map(s => {
              const catalogCount = listings.filter(l => l.supplierId === s.id).length;

              return (
                <div
                  key={s.id}
                  onClick={() => setSelectedSupplier(s)}
                  className="p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#0c0c0f] shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
                >
                  <div>
                    {/* Header */}
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-blue-600/10 text-blue-600 flex items-center justify-center font-bold text-sm border border-blue-200/30">
                          {s.logo}
                        </div>
                        <div>
                          <h3 className="text-sm font-bold text-zinc-950 dark:text-white">{s.name}</h3>
                          <span className="text-[10px] text-zinc-400 flex items-center gap-1 mt-0.5">
                            <MapPin size={11} /> {s.location}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-0.5 text-xs text-amber-500 font-semibold bg-amber-50 dark:bg-amber-950/20 px-2 py-0.5 rounded">
                        <Star size={12} className="fill-amber-400 stroke-amber-400" />
                        {s.rating.toFixed(1)}
                        <span className="text-[10px] text-zinc-400 font-normal">({s.reviewCount})</span>
                      </div>
                    </div>

                    <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-4 leading-relaxed line-clamp-2">
                      {s.description}
                    </p>

                    {/* Stats strip */}
                    <div className="flex gap-4 mt-4 text-[10px] font-medium text-zinc-400 uppercase tracking-wider pb-3 border-b border-zinc-100 dark:border-zinc-900">
                      <span className="flex items-center gap-1">
                        <Truck size={12} className="text-zinc-500" /> {s.avgDeliveryHours}h entrega
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar size={12} className="text-zinc-500" /> Est. {s.established}
                      </span>
                      <span className="font-semibold text-blue-600 dark:text-blue-400">
                        {catalogCount} productos
                      </span>
                    </div>

                    {/* Distributed Brands */}
                    <div className="mt-3 flex flex-wrap gap-1">
                      {s.brands.map((b, idx) => (
                        <span key={idx} className="text-[9px] bg-zinc-100 dark:bg-zinc-900 text-zinc-500 px-1.5 py-0.5 rounded">
                          {b}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Active promo */}
                  {s.promotions.length > 0 && (
                    <div className="mt-4 p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/10 border border-emerald-200/40 dark:border-emerald-900/20 text-emerald-700 dark:text-emerald-400 text-[10px] font-semibold flex items-center gap-1.5">
                      <Percent size={12} />
                      <span className="truncate">{s.promotions[0]}</span>
                    </div>
                  )}

                </div>
              );
            })}
          </div>
        </>
      ) : (
        // SUPPLIER PROFILE CATALOG VIEW
        <div className="space-y-6 animate-fade-in">
          {/* Back button */}
          <button
            onClick={() => setSelectedSupplier(null)}
            className="inline-flex items-center gap-1 text-xs font-semibold text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors cursor-pointer"
          >
            <ArrowLeft size={14} /> Volver a proveedores
          </button>

          {/* Supplier Info Header Panel */}
          <div className="p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#0c0c0f] shadow-sm flex flex-col md:flex-row md:justify-between md:items-center gap-6">
            <div className="flex gap-4 items-start">
              <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center font-black text-lg border border-blue-500 shadow-md">
                {selectedSupplier.logo}
              </div>
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-3">
                  <h2 className="text-base font-bold text-zinc-950 dark:text-white">{selectedSupplier.name}</h2>
                  <div className="flex items-center gap-0.5 text-xs text-amber-500 font-semibold">
                    <Star size={13} className="fill-amber-400 stroke-amber-400" />
                    {selectedSupplier.rating.toFixed(1)}
                    <span className="text-[10px] text-zinc-400 font-normal">({selectedSupplier.reviewCount} reviews)</span>
                  </div>
                </div>
                <p className="text-[11px] text-zinc-500 dark:text-zinc-400 max-w-xl">{selectedSupplier.description}</p>
                <div className="flex flex-wrap gap-4 text-[10px] text-zinc-400 mt-2">
                  <span>Ubicación: <strong className="text-zinc-600 dark:text-zinc-300 font-semibold">{selectedSupplier.location}</strong></span>
                  <span>Establecido: <strong className="text-zinc-600 dark:text-zinc-300 font-semibold">{selectedSupplier.established}</strong></span>
                  <span>Mínimo compra: <strong className="text-zinc-600 dark:text-zinc-300 font-semibold">S/. {selectedSupplier.minOrder}</strong></span>
                </div>
              </div>
            </div>

            {/* Delivery card badge */}
            <div className="p-3.5 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-850 flex items-center gap-3 self-start md:self-auto">
              <Truck className="text-blue-500" size={18} />
              <div>
                <span className="text-[9px] uppercase font-bold text-zinc-400">Entrega Promedio</span>
                <div className="text-xs font-black text-zinc-900 dark:text-white">{selectedSupplier.avgDeliveryHours} Horas</div>
              </div>
            </div>
          </div>

          {/* Active promotions checklist */}
          {selectedSupplier.promotions.length > 0 && (
            <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/10 border border-emerald-200/50 dark:border-emerald-800/30">
              <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">Promociones Activas</span>
              <ul className="mt-2 space-y-1.5">
                {selectedSupplier.promotions.map((promo, idx) => (
                  <li key={idx} className="text-xs text-emerald-800 dark:text-emerald-400 flex items-center gap-1.5">
                    <Percent size={13} className="shrink-0 text-emerald-600 dark:text-emerald-400" />
                    <span>{promo}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Catalog products grid */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400">Catálogo de productos ({getSupplierCatalog(selectedSupplier.id).length})</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {getSupplierCatalog(selectedSupplier.id).map(({ product, listing }) => (
                <div
                  key={listing.id}
                  className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#0c0c0f] hover:border-zinc-300 dark:hover:border-zinc-700 transition-all flex justify-between items-center group"
                >
                  <div 
                    onClick={() => onSelectProduct(product)}
                    className="space-y-1 cursor-pointer flex-1 pr-3"
                  >
                    <span className="text-[9px] font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/10 px-1.5 py-0.5 rounded uppercase">
                      {product.category}
                    </span>
                    <h4 className="text-xs font-bold text-zinc-950 dark:text-white mt-1 group-hover:text-blue-600 transition-colors truncate">
                      {product.name}
                    </h4>
                    <p className="text-[10px] text-zinc-400 truncate">{product.brand} • {product.description}</p>
                    <div className="flex gap-2 text-[10px] text-zinc-400 pt-1">
                      <span>Stock: <strong className={listing.stock > 0 ? 'text-emerald-500' : 'text-rose-500'}>{listing.stock > 0 ? `${listing.stock} uds` : 'Sin stock'}</strong></span>
                      {listing.warrantyMonths > 0 && <span>Garantía: <strong>{listing.warrantyMonths} meses</strong></span>}
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-2.5">
                    <span className="text-sm font-black text-zinc-950 dark:text-white font-mono">
                      S/. {listing.price.toFixed(2)}
                    </span>
                    <button
                      onClick={() => handleAddToCart(product, listing)}
                      disabled={listing.stock === 0}
                      className="bg-blue-600 hover:bg-blue-700 disabled:bg-zinc-200 dark:disabled:bg-zinc-850 disabled:text-zinc-400 text-white rounded-lg px-2.5 py-1.5 text-xs font-semibold shadow-sm transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <ShoppingCart size={12} />
                      Añadir
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
