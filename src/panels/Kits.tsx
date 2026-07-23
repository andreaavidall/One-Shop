import React, { useState } from 'react';
import { kits, type Kit, generateProposalsForItems, type Proposal, type Product } from '../data/mockData';
import { useCart } from '../context/CartContext';
import { ShoppingCart, Check, Info, Award, Calendar, Layers, ShieldCheck, ChevronRight } from 'lucide-react';

interface Props {
  onSelectProduct: (product: Product) => void;
  onNavigate: (tab: string) => void;
}

export const Kits: React.FC<Props> = ({ onSelectProduct, onNavigate }) => {
  const [selectedKit, setSelectedKit] = useState<Kit | null>(null);
  const [kitProposals, setKitProposals] = useState<{ economy: Proposal; value: Proposal; premium: Proposal } | null>(null);
  const [activeType, setActiveType] = useState<'economy' | 'value' | 'premium'>('value');
  const { loadProposal } = useCart();

  const handleSelectKit = (kit: Kit) => {
    setSelectedKit(kit);
    const requirements = kit.items.map(item => ({
      productName: item.productName,
      quantity: item.quantity
    }));
    const generated = generateProposalsForItems(requirements);
    setKitProposals(generated);
    setActiveType('value'); // reset default to best value
  };

  const handleBuyKit = (proposal: Proposal) => {
    const proposalItems = proposal.items.map(item => ({
      product: item.product,
      listing: item.listing,
      supplier: item.supplier
    }));
    loadProposal(proposalItems);
    onNavigate('carrito');
    setSelectedKit(null);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold tracking-tight text-zinc-950 dark:text-white">Kits Procedimentales</h1>
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          Kits completos estructurados por especialidad dental. Cada kit cuenta con versiones económica, estándar y premium, optimizadas entre múltiples proveedores.
        </p>
      </div>

      {/* Kits grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {kits.map(kit => (
          <div
            key={kit.id}
            className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#0c0c0f] shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col justify-between"
          >
            <div className="p-5 flex-1">
              <div className="w-10 h-10 rounded-lg bg-blue-600/10 text-blue-600 flex items-center justify-center font-bold text-sm border border-blue-200/30 mb-4 uppercase">
                {kit.name.slice(7, 9)}
              </div>
              <h3 className="text-sm font-bold text-zinc-900 dark:text-white mb-2">{kit.name}</h3>
              <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-relaxed mb-4">{kit.description}</p>
              
              <div className="space-y-2">
                <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Productos incluidos:</span>
                <ul className="space-y-1">
                  {kit.items.slice(0, 3).map((item, idx) => (
                    <li key={idx} className="text-[10px] text-zinc-600 dark:text-zinc-300 flex items-center gap-1.5">
                      <Check size={11} className="text-emerald-500 shrink-0" />
                      <span className="truncate">{item.productName} (x{item.quantity})</span>
                    </li>
                  ))}
                  {kit.items.length > 3 && (
                    <li className="text-[10px] text-zinc-400 font-semibold pl-4">
                      + {kit.items.length - 3} productos adicionales
                    </li>
                  )}
                </ul>
              </div>
            </div>

            <div className="p-5 bg-zinc-50/50 dark:bg-zinc-900/20 border-t border-zinc-100 dark:border-zinc-900">
              <button
                onClick={() => handleSelectKit(kit)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold py-2 rounded-lg transition-colors flex items-center justify-center gap-1 cursor-pointer shadow-sm"
              >
                Configurar Kit
                <ChevronRight size={13} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Kit Detail Modal / Drawer overlay */}
      {selectedKit && kitProposals && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/50 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-[#0c0c0f] border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col justify-between">
            
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-zinc-100 dark:border-zinc-900 flex justify-between items-start">
              <div>
                <h2 className="text-base font-bold text-zinc-950 dark:text-white">{selectedKit.name}</h2>
                <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5">{selectedKit.description}</p>
              </div>
              <button
                onClick={() => setSelectedKit(null)}
                className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 text-sm font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto flex-1 space-y-6">
              
              {/* Proposal Selector Pills */}
              <div className="grid grid-cols-3 gap-2">
                {(['economy', 'value', 'premium'] as const).map(type => {
                  const prop = kitProposals[type];
                  const isActive = activeType === type;
                  const details = {
                    economy: { label: '💰 Económica', border: 'border-emerald-500', active: 'bg-emerald-50/50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400' },
                    value: { label: '🏆 Recomendada', border: 'border-blue-500', active: 'bg-blue-50/50 dark:bg-blue-950/20 text-blue-600 dark:text-blue-400' },
                    premium: { label: '👑 Premium', border: 'border-purple-500', active: 'bg-purple-50/50 dark:bg-purple-950/20 text-purple-600 dark:text-purple-400' }
                  }[type];

                  return (
                    <button
                      key={type}
                      onClick={() => setActiveType(type)}
                      className={`py-3 px-4 rounded-xl border text-center transition-all cursor-pointer ${
                        isActive 
                          ? `${details.active} border-blue-600 dark:border-blue-400 font-bold shadow-sm` 
                          : 'border-zinc-200 dark:border-zinc-800 bg-zinc-50/20 text-zinc-500 hover:bg-zinc-50'
                      }`}
                    >
                      <span className="text-[10px] uppercase font-bold tracking-wider">{details.label}</span>
                      <div className="text-xs font-mono mt-1 font-extrabold">S/. {prop.totalCost.toFixed(2)}</div>
                    </button>
                  );
                })}
              </div>

              {/* Items Breakdown list */}
              <div className="space-y-4">
                <h4 className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">Desglose de productos</h4>
                <div className="border border-zinc-200 dark:border-zinc-800 rounded-xl divide-y divide-zinc-100 dark:divide-zinc-900 bg-white dark:bg-zinc-950 overflow-hidden">
                  {kitProposals[activeType].items.map((item, idx) => {
                    const req = selectedKit.items.find(r => 
                      item.product.name.toLowerCase().includes(r.productName.toLowerCase()) || 
                      item.product.category.toLowerCase() === r.productName.toLowerCase()
                    );
                    const quantity = req ? req.quantity : 1;

                    return (
                      <div key={idx} className="p-3.5 flex justify-between items-center text-xs">
                        <div>
                          <h5 
                            className="font-bold text-zinc-900 dark:text-white hover:text-blue-500 cursor-pointer"
                            onClick={() => onSelectProduct(item.product)}
                          >
                            {item.product.name}
                          </h5>
                          <span className="text-[10px] text-zinc-400">{item.product.brand} • Cantidad: {quantity}</span>
                        </div>
                        <div className="flex items-center gap-6">
                          <div className="text-right">
                            <span className="text-[9px] uppercase font-bold text-zinc-400 block">Proveedor</span>
                            <span className="font-semibold text-zinc-700 dark:text-zinc-300">{item.supplier.name}</span>
                          </div>
                          <span className="font-mono font-bold text-zinc-900 dark:text-white text-right min-w-[70px]">
                            S/. {(item.listing.price * quantity).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 bg-zinc-50 dark:bg-zinc-950 border-t border-zinc-100 dark:border-zinc-900 flex justify-between items-center shrink-0">
              <div className="text-xs text-zinc-500">
                {kitProposals[activeType].estimatedSavings > 0 && (
                  <span className="text-emerald-500 font-bold">✓ Ahorras S/. {kitProposals[activeType].estimatedSavings} con esta configuración</span>
                )}
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setSelectedKit(null)}
                  className="px-4 py-2 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-lg text-xs font-semibold hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  onClick={() => handleBuyKit(kitProposals[activeType])}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded-lg text-xs transition-colors flex items-center gap-1.5 shadow-sm cursor-pointer"
                >
                  <ShoppingCart size={13} />
                  Comprar Kit Completo (S/. {kitProposals[activeType].totalCost.toFixed(2)})
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
