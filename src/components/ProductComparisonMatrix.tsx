import React from 'react';
import { type Product, type ProductListing, suppliers } from '../data/mockData';
import { useCart } from '../context/CartContext';
import { ShieldCheck, Truck, Star, Award, DollarSign, ShoppingCart } from 'lucide-react';

interface Props {
  product: Product;
  listings: ProductListing[];
  onAdded?: () => void;
}

export const ProductComparisonMatrix: React.FC<Props> = ({ product, listings, onAdded }) => {
  const { addToCart } = useCart();

  if (listings.length === 0) {
    return (
      <div className="p-6 text-center text-zinc-500 dark:text-zinc-400">
        No hay proveedores con stock disponible para este producto en este momento.
      </div>
    );
  }

  // Identify badges
  // 1. Cheapest (Cheapest price in stock)
  const sortedByPrice = [...listings].sort((a, b) => a.price - b.price);
  const cheapestListingId = sortedByPrice[0]?.id;

  // 2. Fastest delivery
  const sortedByDelivery = [...listings].sort((a, b) => a.deliveryHours - b.deliveryHours);
  const fastestListingId = sortedByDelivery[0]?.id;

  // 3. Best supplier rating
  const sortedByRating = [...listings].sort((a, b) => b.rating - a.rating);
  const bestRatingListingId = sortedByRating[0]?.id;

  // 4. Best choice (Calculated rating vs price vs delivery)
  // Score = rating * 3 - price / 50 - delivery / 12
  const scoredListings = listings.map(l => {
    const score = (l.rating * 5) - (l.price / 80) - (l.deliveryHours / 12) + (l.warrantyMonths / 6);
    return { ...l, score };
  });
  const bestChoiceListingId = [...scoredListings].sort((a, b) => b.score - a.score)[0]?.id;

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse text-sm">
        <thead>
          <tr className="border-b border-zinc-200 dark:border-zinc-800 text-zinc-400 dark:text-zinc-500 font-medium">
            <th className="py-3 px-4 font-semibold text-xs uppercase tracking-wider">Proveedor</th>
            <th className="py-3 px-4 font-semibold text-xs uppercase tracking-wider">Garantía / Condición</th>
            <th className="py-3 px-4 font-semibold text-xs uppercase tracking-wider">Calificación</th>
            <th className="py-3 px-4 font-semibold text-xs uppercase tracking-wider">Entrega</th>
            <th className="py-3 px-4 font-semibold text-xs uppercase tracking-wider">Precio</th>
            <th className="py-3 px-4 font-semibold text-xs uppercase tracking-wider">Destacado</th>
            <th className="py-3 px-4 font-semibold text-xs uppercase tracking-wider text-right">Acción</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-100 dark:divide-zinc-900">
          {listings.map(l => {
            const supplier = suppliers.find(s => s.id === l.supplierId)!;
            const isCheapest = l.id === cheapestListingId;
            const isFastest = l.id === fastestListingId;
            const isBestRating = l.id === bestRatingListingId;
            const isBestChoice = l.id === bestChoiceListingId;

            return (
              <tr key={l.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors">
                <td className="py-3.5 px-4 font-medium text-zinc-900 dark:text-zinc-100">
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold">{supplier.name}</span>
                    <span className="text-[11px] text-zinc-500">{supplier.location}</span>
                  </div>
                </td>
                <td className="py-3.5 px-4 text-zinc-600 dark:text-zinc-300">
                  <div className="flex items-center gap-1.5">
                    <span className={`px-1.5 py-0.5 rounded text-[10px] font-semibold ${
                      l.condition === 'Nuevo' 
                        ? 'bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300'
                        : 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400'
                    }`}>
                      {l.condition}
                    </span>
                    {l.warrantyMonths > 0 ? (
                      <span className="text-xs flex items-center gap-1 text-zinc-500">
                        <ShieldCheck size={13} className="text-emerald-500" />
                        {l.warrantyMonths}m
                      </span>
                    ) : (
                      <span className="text-xs text-zinc-400">Sin garantía</span>
                    )}
                  </div>
                </td>
                <td className="py-3.5 px-4 text-zinc-600 dark:text-zinc-300">
                  <div className="flex items-center gap-1">
                    <Star size={13} className="fill-amber-400 stroke-amber-400" />
                    <span className="font-semibold text-xs">{l.rating.toFixed(1)}</span>
                    <span className="text-[10px] text-zinc-400">({supplier.reviewCount})</span>
                  </div>
                </td>
                <td className="py-3.5 px-4 text-zinc-600 dark:text-zinc-300">
                  <div className="flex items-center gap-1">
                    <Truck size={13} className="text-zinc-400" />
                    <span>{l.deliveryHours}h</span>
                  </div>
                </td>
                <td className="py-3.5 px-4 font-mono font-bold text-zinc-950 dark:text-white">
                  S/. {l.price.toFixed(2)}
                </td>
                <td className="py-3.5 px-4">
                  <div className="flex flex-wrap gap-1 max-w-[150px]">
                    {isBestChoice && (
                      <span className="inline-flex items-center gap-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                        <Award size={10} /> Mejor opción
                      </span>
                    )}
                    {isCheapest && (
                      <span className="inline-flex items-center gap-0.5 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                        <DollarSign size={10} /> Más económico
                      </span>
                    )}
                    {isFastest && !isBestChoice && (
                      <span className="inline-flex items-center gap-0.5 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                        <Truck size={10} /> Más rápido
                      </span>
                    )}
                  </div>
                </td>
                <td className="py-3.5 px-4 text-right">
                  <button
                    onClick={() => {
                      addToCart(product, l, 1);
                      if (onAdded) onAdded();
                    }}
                    disabled={l.stock === 0}
                    className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 disabled:bg-zinc-200 dark:disabled:bg-zinc-800 disabled:text-zinc-400 text-white rounded-lg px-3 py-1.5 text-xs font-semibold shadow-sm transition-colors cursor-pointer"
                  >
                    <ShoppingCart size={13} />
                    {l.stock === 0 ? 'Sin Stock' : 'Añadir'}
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
