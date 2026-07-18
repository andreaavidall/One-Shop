import React, { useState, useEffect } from 'react';
import { products, listings, suppliers, type Product, type ProductListing, type Supplier, generateProposalsForItems, type Proposal } from '../data/mockData';
import { useCart } from '../context/CartContext';
import { Search, Sparkles, AlertCircle, ShoppingCart, Info, Check, ShieldAlert, Award, ArrowRight, DollarSign } from 'lucide-react';

interface Props {
  initialQuery?: string;
  onSelectProduct: (product: Product) => void;
  onNavigate: (tab: string) => void;
}

interface BundleRequirement {
  name: string;
  items: { productName: string; quantity: number }[];
  explanation: string;
}

export const SmartSearch: React.FC<Props> = ({ initialQuery = '', onSelectProduct, onNavigate }) => {
  const [query, setQuery] = useState(initialQuery);
  const { loadProposal } = useCart();

  // Search States
  const [isBundleQuery, setIsBundleQuery] = useState(false);
  const [bundleInfo, setBundleInfo] = useState<BundleRequirement | null>(null);
  const [proposals, setProposals] = useState<{ economy: Proposal; value: Proposal; premium: Proposal } | null>(null);
  const [activeProposalType, setActiveProposalType] = useState<'economy' | 'value' | 'premium'>('value');
  const [keywordResults, setKeywordResults] = useState<Product[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    if (initialQuery) {
      handleSearch(initialQuery);
    }
  }, [initialQuery]);

  // Concept dictionary mapping human queries to lists of items
  const resolveConceptualQuery = (text: string): BundleRequirement | null => {
    const cleanText = text.toLowerCase();
    
    if (cleanText.includes('endodoncia') || cleanText.includes(' conducto')) {
      return {
        name: 'Paquete de Endodoncia Rotatoria Completo',
        explanation: 'Identificamos que necesitas insumos para endodoncia. Compilamos equipos rotatorios, limas, selladores y aislantes.',
        items: [
          { productName: 'Limas Rotatorias ProTaper Gold F2 (25mm)', quantity: 2 },
          { productName: 'Cemento Sellador AH Plus Jet', quantity: 1 },
          { productName: 'Conos de Gutapercha ProTaper Gold F2', quantity: 1 },
          { productName: 'Hipoclorito de Sodio al 5.25%', quantity: 2 },
          { productName: 'Dique de Goma Nic Tone Azul', quantity: 1 },
          { productName: 'Motor de Endodoncia Endo Radar Plus', quantity: 1 },
          { productName: 'Localizador de Ápices Woodpex III Plus', quantity: 1 }
        ]
      };
    }
    
    if (cleanText.includes('abrir') || cleanText.includes('consultorio') || cleanText.includes('equipar') || cleanText.includes('clínica nueva') || cleanText.includes('15,000') || cleanText.includes('20,000')) {
      return {
        name: 'Paquete de Equipamiento Clínico Base',
        explanation: 'Encontramos que estás equipando un consultorio nuevo. Listamos autoclave, compresora, turbinas de alta velocidad y pulidor.',
        items: [
          { productName: 'Autoclave Digital 21 Litros Clase B', quantity: 1 },
          { productName: 'Compresora Dental Libre de Aceite 1.5 HP', quantity: 1 },
          { productName: 'Turbina Dental Alegra TE-97 (B2)', quantity: 2 },
          { productName: 'Micromotor Eléctrico Strong 204', quantity: 1 }
        ]
      };
    }
    
    if (cleanText.includes('ortodoncia') || cleanText.includes('bracket') || cleanText.includes('arco')) {
      return {
        name: 'Paquete de Ortodoncia Inicial',
        explanation: 'Requerimiento de ortodoncia resuelto. Seleccionamos brackets y arcos metálicos de alineación.',
        items: [
          { productName: 'Brackets Metálicos Roth .022', quantity: 5 },
          { productName: 'Arcos de Nitinol Redondos .014 Superelásticos', quantity: 4 }
        ]
      };
    }

    if (cleanText.includes('abastecer') || cleanText.includes('mes') || cleanText.includes('insumos') || cleanText.includes('consumibles')) {
      return {
        name: 'Paquete de Abastecimiento Mensual de Insumos',
        explanation: 'Compilamos consumibles, bioseguridad, anestésicos y material de impresión esenciales para el flujo de pacientes diario.',
        items: [
          { productName: 'Guantes de Nitrilo BioClean (Caja x 100)', quantity: 10 },
          { productName: 'Mascarillas Quirúrgicas de 3 pliegues (Caja x 50)', quantity: 4 },
          { productName: 'Anestesia Octocaine Lidocaína 2% (Caja x 50)', quantity: 2 },
          { productName: 'Agujas Dentales Desechables Terumo 30G Cortas', quantity: 2 },
          { productName: 'Alginato Kromopan Cromático de Fraguado Rápido', quantity: 3 }
        ]
      };
    }

    return null;
  };

  const handleSearch = (searchVal: string) => {
    if (!searchVal.trim()) return;
    setHasSearched(true);
    
    // Check if it is a conceptual query
    const bundleRes = resolveConceptualQuery(searchVal);
    
    if (bundleRes) {
      setIsBundleQuery(true);
      setBundleInfo(bundleRes);
      const generated = generateProposalsForItems(bundleRes.items);
      setProposals(generated);
      setKeywordResults([]);
    } else {
      // Traditional search
      setIsBundleQuery(false);
      setBundleInfo(null);
      setProposals(null);
      
      const filtered = products.filter(
        p => p.name.toLowerCase().includes(searchVal.toLowerCase()) ||
             p.brand.toLowerCase().includes(searchVal.toLowerCase()) ||
             p.category.toLowerCase().includes(searchVal.toLowerCase()) ||
             p.description.toLowerCase().includes(searchVal.toLowerCase())
      );
      setKeywordResults(filtered);
    }
  };

  const handleBuyProposal = (proposal: Proposal) => {
    const proposalItems = proposal.items.map(item => ({
      product: item.product,
      listing: item.listing,
      supplier: item.supplier
    }));
    loadProposal(proposalItems);
    onNavigate('carrito');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Search Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold tracking-tight text-zinc-950 dark:text-white">Búsqueda Inteligente</h1>
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          Usa nuestro motor de búsqueda B2B. Acepta consultas tradicionales y requerimientos complejos como "Todo para una endodoncia".
        </p>
      </div>

      {/* Main search bar */}
      <div className="p-2 rounded-xl bg-white dark:bg-[#0c0c0f] border border-zinc-200 dark:border-zinc-800 shadow-sm flex items-center gap-2">
        <div className="flex items-center gap-2 pl-3 flex-1">
          <Search className="text-zinc-400" size={18} />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch(query)}
            placeholder='Escribe "resina", "turbina" o un requerimiento como "Necesito abastecer mi clínica este mes"...'
            className="bg-transparent border-none text-xs w-full focus:outline-none text-zinc-900 dark:text-zinc-100 placeholder-zinc-400"
          />
        </div>
        <button
          onClick={() => handleSearch(query)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg text-xs transition-colors cursor-pointer"
        >
          Buscar
        </button>
      </div>

      {/* Quick suggestions */}
      {!hasSearched && (
        <div className="p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#0c0c0f] text-center">
          <Sparkles className="mx-auto text-blue-500 mb-2 animate-soft-pulse" size={24} />
          <h3 className="text-sm font-bold text-zinc-800 dark:text-zinc-200">¿Qué estás buscando hoy?</h3>
          <p className="text-[11px] text-zinc-400 mt-1 max-w-md mx-auto">
            Puedes buscar insumos individuales o escribir una consulta conceptual para cotizar múltiples marcas y distribuidores en lote.
          </p>
          <div className="flex flex-wrap justify-center gap-2 mt-4">
            {['Resina Filtek', 'Limas Rotatorias', 'Necesito todo para una endodoncia', 'Tengo S/15,000 para equipar'].map((tag, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setQuery(tag);
                  handleSearch(tag);
                }}
                className="px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/60 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-xs text-zinc-600 dark:text-zinc-300 transition-all cursor-pointer"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* RENDER BUNDLE CONCEPT RESULTS */}
      {isBundleQuery && bundleInfo && proposals && (
        <div className="space-y-6">
          {/* Header information */}
          <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-900/10 border border-blue-200/50 dark:border-blue-800/30 flex gap-3">
            <Sparkles className="text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" size={18} />
            <div>
              <h3 className="text-xs font-bold text-blue-800 dark:text-blue-300 uppercase tracking-wider">{bundleInfo.name}</h3>
              <p className="text-[11px] text-blue-700 dark:text-blue-400 mt-1 leading-relaxed">{bundleInfo.explanation}</p>
            </div>
          </div>

          {/* Proposal Tabs Selector */}
          <div className="grid grid-cols-3 gap-3">
            {(['economy', 'value', 'premium'] as const).map(type => {
              const prop = proposals[type];
              const isActive = activeProposalType === type;
              const details = {
                economy: { label: 'Económica', bg: 'hover:border-emerald-500/30', border: 'border-emerald-500', text: 'text-emerald-500', icon: '💰' },
                value: { label: 'Calidad-Precio', bg: 'hover:border-blue-500/30', border: 'border-blue-500', text: 'text-blue-500', icon: '🏆' },
                premium: { label: 'Premium', bg: 'hover:border-purple-500/30', border: 'border-purple-500', text: 'text-purple-500', icon: '👑' }
              }[type];

              return (
                <button
                  key={type}
                  onClick={() => setActiveProposalType(type)}
                  className={`p-4 rounded-xl border text-left transition-all cursor-pointer relative overflow-hidden ${
                    isActive 
                      ? `${details.border} bg-white dark:bg-[#0c0c0f] shadow-sm` 
                      : 'border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-[#0c0c0f]/20 opacity-70 hover:opacity-100'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">OPCIÓN {details.icon}</span>
                    {isActive && (
                      <span className="w-2 h-2 rounded-full bg-blue-600" />
                    )}
                  </div>
                  <h3 className="text-sm font-bold text-zinc-900 dark:text-white mt-1">{details.label}</h3>
                  <div className="mt-3 flex justify-between items-end">
                    <span className="text-base font-black text-zinc-950 dark:text-white font-mono">S/. {prop.totalCost.toFixed(2)}</span>
                    <span className="text-[9px] font-medium text-emerald-500">Ahorras S/. {prop.estimatedSavings}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Proposal Details */}
          <div className="p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#0c0c0f] shadow-sm">
            <div className="flex justify-between items-center mb-6 pb-3 border-b border-zinc-100 dark:border-zinc-900">
              <div>
                <h3 className="text-sm font-bold text-zinc-900 dark:text-white">Detalle de la {proposals[activeProposalType].name}</h3>
                <p className="text-[10px] text-zinc-400 mt-1">Mezcla optimizada de proveedores para maximizar tu ahorro.</p>
              </div>
              <button
                onClick={() => handleBuyProposal(proposals[activeProposalType])}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded-lg text-xs transition-colors flex items-center gap-1.5 shadow-sm cursor-pointer"
              >
                <ShoppingCart size={14} />
                Cargar esta Propuesta al Carrito
              </button>
            </div>

            <div className="divide-y divide-zinc-100 dark:divide-zinc-900">
              {proposals[activeProposalType].items.map((item, idx) => {
                const req = bundleInfo.items.find(r => 
                  item.product.name.toLowerCase().includes(r.productName.toLowerCase()) || 
                  item.product.category.toLowerCase() === r.productName.toLowerCase()
                );
                const quantity = req ? req.quantity : 1;

                return (
                  <div key={idx} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                    <div className="space-y-0.5">
                      <h4 className="font-bold text-zinc-900 dark:text-white hover:text-blue-500 cursor-pointer" onClick={() => onSelectProduct(item.product)}>
                        {item.product.name}
                      </h4>
                      <p className="text-[10px] text-zinc-400">
                        Marca: <span className="font-medium text-zinc-600 dark:text-zinc-300">{item.product.brand}</span> • Cantidad: <span className="font-medium text-zinc-600 dark:text-zinc-300">{quantity}</span>
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-4">
                      {/* Chosen supplier */}
                      <div className="text-left sm:text-right">
                        <span className="text-[9px] uppercase font-bold text-zinc-400">Proveedor</span>
                        <div className="font-semibold text-zinc-800 dark:text-zinc-200">{item.supplier.name}</div>
                      </div>

                      {/* Reason */}
                      <div className="px-2.5 py-1 rounded bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 max-w-[200px]">
                        <span className="text-[9px] text-zinc-400 block font-bold uppercase">Motivo selección</span>
                        <span className="text-[10px] text-zinc-500 leading-tight">{item.reason}</span>
                      </div>

                      {/* Price */}
                      <div className="text-left sm:text-right font-mono font-bold text-zinc-950 dark:text-white min-w-[70px]">
                        S/. {(item.listing.price * quantity).toFixed(2)}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Proposal Footer Totals */}
            <div className="mt-6 pt-5 border-t border-zinc-100 dark:border-zinc-900 flex justify-between items-center bg-zinc-50/50 dark:bg-zinc-900/20 p-4 rounded-lg">
              <div className="text-xs text-zinc-500 dark:text-zinc-400">
                Entrega máxima estimada: <span className="font-semibold text-zinc-800 dark:text-zinc-200">{proposals[activeProposalType].shippingDaysMax} días</span>
              </div>
              <div className="text-right space-y-1">
                <span className="text-[10px] uppercase font-bold text-zinc-400">Total Compra Optimizado</span>
                <div className="text-lg font-black text-zinc-950 dark:text-white font-mono">
                  S/. {proposals[activeProposalType].totalCost.toFixed(2)}
                </div>
                {proposals[activeProposalType].estimatedSavings > 0 && (
                  <div className="text-[10px] font-bold text-emerald-500 flex items-center gap-0.5 justify-end">
                    <Check size={10} /> Ahorro estimado de S/. {proposals[activeProposalType].estimatedSavings}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* KEYWORD RESULTS LIST */}
      {!isBundleQuery && hasSearched && (
        <div className="space-y-4">
          <div className="flex justify-between items-center pb-2 border-b border-zinc-200 dark:border-zinc-800">
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
              Resultados de búsqueda ({keywordResults.length})
            </h3>
          </div>

          {keywordResults.length === 0 ? (
            <div className="p-12 text-center border border-zinc-200 dark:border-zinc-800 rounded-xl bg-white dark:bg-[#0c0c0f]">
              <AlertCircle className="mx-auto text-zinc-400 mb-2" size={24} />
              <h3 className="text-sm font-bold text-zinc-800 dark:text-zinc-200">No encontramos resultados</h3>
              <p className="text-xs text-zinc-400 mt-1 max-w-xs mx-auto">
                Intenta con otros términos, revisa la ortografía o intenta buscar una especialidad completa.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {keywordResults.map(p => {
                // Find cheapest in stock listing to display starting price
                const prodListings = listings.filter(l => l.productId === p.id && l.stock > 0);
                const sortedListings = [...prodListings].sort((a, b) => a.price - b.price);
                const startPrice = sortedListings[0]?.price;
                const suppliersCount = new Set(prodListings.map(l => l.supplierId)).size;

                return (
                  <div
                    key={p.id}
                    onClick={() => onSelectProduct(p)}
                    className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#0c0c0f] hover:border-zinc-300 dark:hover:border-zinc-700 transition-all flex gap-4 cursor-pointer group"
                  >
                    <div className="w-16 h-16 rounded-lg bg-zinc-100 dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800 flex items-center justify-center shrink-0 text-zinc-400 font-black uppercase text-xs">
                      {p.brand.slice(0, 3)}
                    </div>
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start gap-2">
                          <span className="text-[9px] font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/10 px-1.5 py-0.5 rounded uppercase">
                            {p.category}
                          </span>
                          <span className="text-[10px] text-zinc-400 font-medium">
                            {suppliersCount} {suppliersCount === 1 ? 'proveedor' : 'proveedores'}
                          </span>
                        </div>
                        <h4 className="text-xs font-bold text-zinc-950 dark:text-white mt-1.5 group-hover:text-blue-600 transition-colors truncate">
                          {p.name}
                        </h4>
                        <p className="text-[10px] text-zinc-400 mt-0.5 truncate">{p.brand} • {p.description}</p>
                      </div>
                      
                      <div className="mt-3 flex justify-between items-end">
                        <span className="text-[10px] text-zinc-400">Desde</span>
                        <span className="text-sm font-black text-zinc-950 dark:text-white font-mono">
                          {startPrice ? `S/. ${startPrice.toFixed(2)}` : 'Sin Stock'}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
