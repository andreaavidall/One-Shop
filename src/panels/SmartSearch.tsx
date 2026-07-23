import React, { useState, useEffect, useRef } from 'react';
import { products, listings, suppliers, type Product, type ProductListing, type Supplier, generateProposalsForItems, type Proposal } from '../data/mockData';
import { useCart } from '../context/CartContext';
import { 
  Search, Sparkles, AlertCircle, ShoppingCart, Info, Check, ShieldAlert, 
  Award, ArrowRight, Heart, Star, SlidersHorizontal, ChevronDown, CheckCircle2,
  AlertTriangle, Filter, Eye, Truck, RefreshCw, Building2, ShieldCheck
} from 'lucide-react';

interface Props {
  initialQuery?: string;
  onSelectProduct: (product: Product) => void;
  onNavigate: (tab: string) => void;
}

interface BundleRequirement {
  name: string;
  items: { productName: string; quantity: number; category?: string }[];
  explanation: string;
}

export const SmartSearch: React.FC<Props> = ({ initialQuery = '', onSelectProduct, onNavigate }) => {
  const [query, setQuery] = useState(initialQuery);
  const { addToCart, loadProposal } = useCart();
  const autocompleteRef = useRef<HTMLDivElement>(null);

  // Search States
  const [isBundleQuery, setIsBundleQuery] = useState(false);
  const [bundleInfo, setBundleInfo] = useState<BundleRequirement | null>(null);
  const [proposals, setProposals] = useState<{ economy: Proposal; value: Proposal; premium: Proposal } | null>(null);
  const [activeProposalType, setActiveProposalType] = useState<'economy' | 'value' | 'premium'>('value');
  const [filteredResults, setFilteredResults] = useState<Product[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  
  // Autocomplete prediction dropdown
  const [isFocused, setIsFocused] = useState(false);
  const [predictions, setPredictions] = useState<{
    products: Product[];
    categories: string[];
    brands: string[];
    suppliers: Supplier[];
    needs: string[];
  }>({ products: [], categories: [], brands: [], suppliers: [], needs: [] });

  // Wide query questionnaire
  const [isWideQuery, setIsWideQuery] = useState(false);
  const [questionAnswers, setQuestionAnswers] = useState({
    procedure: 'operatoria',
    budget: 'S/. 1,000',
    patients: '10',
    preference: 'ahorrar'
  });

  // Filters Sidebar States
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [selectedBrand, setSelectedBrand] = useState<string>('todos');
  const [selectedSupplier, setSelectedSupplier] = useState<string>('todos');
  const [maxPriceFilter, setMaxPriceFilter] = useState<number>(50000);
  const [onlyInStock, setOnlyInStock] = useState<boolean>(false);
  const [maxDeliveryHours, setMaxDeliveryHours] = useState<number>(48);
  const [minRating, setMinRating] = useState<number>(0);
  const [onlyNew, setOnlyNew] = useState<boolean>(false);
  const [freeShippingOnly, setFreeShippingOnly] = useState<boolean>(false);

  // Sorting
  const [sortBy, setSortBy] = useState<'recomendados' | 'precio_bajo' | 'precio_alto' | 'entrega' | 'reputacion' | 'ahorro'>('recomendados');

  // Favorites click list
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});
  const [toastText, setToastText] = useState<string | null>(null);

  // Modal Comparison Detail
  const [comparingProduct, setComparingProduct] = useState<Product | null>(null);
  const [comparingSupplierList, setComparingSupplierList] = useState<ProductListing[]>([]);

  useEffect(() => {
    if (initialQuery) {
      setQuery(initialQuery);
      handleSearch(initialQuery);
    }
  }, [initialQuery]);

  // Handle autocomplete predictions
  useEffect(() => {
    if (!query.trim()) {
      setPredictions({ products: [], categories: [], brands: [], suppliers: [], needs: [] });
      return;
    }
    const clean = query.toLowerCase();

    // Match products
    const matchedProds = products.filter(p => p.name.toLowerCase().includes(clean)).slice(0, 3);
    
    // Match categories
    const allCategories = Array.from(new Set(products.map(p => p.category)));
    const matchedCats = allCategories.filter(c => c.toLowerCase().includes(clean)).slice(0, 2);

    // Match brands
    const allBrands = Array.from(new Set(products.map(p => p.brand)));
    const matchedBrands = allBrands.filter(b => b.toLowerCase().includes(clean)).slice(0, 2);

    // Match suppliers
    const matchedSups = suppliers.filter(s => s.name.toLowerCase().includes(clean)).slice(0, 2);

    // Match needs
    const allNeeds = [
      'Necesito todo para realizar una endodoncia',
      'Quiero abrir un consultorio odontológico',
      'Necesito materiales para operatoria',
      'Tengo un presupuesto de S/5,000 para ortodoncia',
      'Necesito reabastecer mi clínica este mes'
    ];
    const matchedNeeds = allNeeds.filter(n => n.toLowerCase().includes(clean)).slice(0, 2);

    setPredictions({
      products: matchedProds,
      categories: matchedCats,
      brands: matchedBrands,
      suppliers: matchedSups,
      needs: matchedNeeds
    });
  }, [query]);

  // Close autocomplete on click outside
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (autocompleteRef.current && !autocompleteRef.current.contains(e.target as Node)) {
        setIsFocused(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const triggerToast = (msg: string) => {
    setToastText(msg);
    setTimeout(() => setToastText(null), 3000);
  };

  const resolveConceptualQuery = (text: string): BundleRequirement | null => {
    const cleanText = text.toLowerCase();
    
    if (cleanText.includes('endodoncia') || cleanText.includes('conducto')) {
      return {
        name: 'Necesito todo para realizar una endodoncia',
        explanation: 'Encontramos insumos de alta precisión para endodoncia: localizador, motor, limas rotatorias de NiTi, conos y biocerámicos.',
        items: [
          { productName: 'Limas Rotatorias ProTaper Gold F2 (25mm)', category: 'Endodoncia', quantity: 2 },
          { productName: 'Cemento Sellador AH Plus Jet', category: 'Endodoncia', quantity: 1 },
          { productName: 'Conos de Gutapercha ProTaper Gold F2', category: 'Endodoncia', quantity: 1 },
          { productName: 'Hipoclorito de Sodio al 5.25%', category: 'Endodoncia', quantity: 2 },
          { productName: 'Dique de Goma Nic Tone Azul', category: 'Endodoncia', quantity: 1 },
          { productName: 'Motor de Endodoncia Endo Radar Plus', category: 'Endodoncia', quantity: 1 },
          { productName: 'Localizador de Ápices Woodpex III Plus', category: 'Endodoncia', quantity: 1 },
          { productName: 'Cemento MTA Repair HP', category: 'Endodoncia', quantity: 1 }
        ]
      };
    }
    
    if (cleanText.includes('abrir') || cleanText.includes('clínica') || cleanText.includes('consultorio') || cleanText.includes('equipar')) {
      return {
        name: 'Quiero equipar un consultorio odontológico',
        explanation: 'Paquete de equipamiento pesado y tecnología intraoral recomendado para la apertura de una clínica dental.',
        items: [
          { productName: 'Autoclave Digital 21 Litros Clase B', category: 'Esterilización', quantity: 1 },
          { productName: 'Compresora Dental Libre de Aceite 1.5 HP', category: 'Equipamiento', quantity: 1 },
          { productName: 'Turbina Dental Alegra TE-97 (B2)', category: 'Equipamiento', quantity: 2 },
          { productName: 'Micromotor Eléctrico Strong 204', category: 'Equipamiento', quantity: 1 },
          { productName: 'Escáner Intraoral Medit i700', category: 'Odontología digital', quantity: 1 }
        ]
      };
    }

    if (cleanText.includes('operatoria') || cleanText.includes('materiales para operatoria') || cleanText.includes('operatoria dental')) {
      return {
        name: 'Necesito materiales para operatoria',
        explanation: 'Materiales compuestos y adhesivos restauradores para restauraciones directas e indirectas de composite.',
        items: [
          { productName: 'Resina Filtek Z350 XT Body A2', category: 'Operatoria', quantity: 4 },
          { productName: 'Resina Filtek Z250 Microval A2', category: 'Operatoria', quantity: 2 },
          { productName: 'Adhesivo Single Bond Universal', category: 'Operatoria', quantity: 1 },
          { productName: 'Grabador Ácido Ultra-Etch', category: 'Operatoria', quantity: 2 },
          { productName: 'Lámpara de Fotocurado Led-D', category: 'Operatoria', quantity: 1 }
        ]
      };
    }
    
    if (cleanText.includes('ortodoncia') || cleanText.includes('presupuesto')) {
      return {
        name: 'Presupuesto de Ortodoncia',
        explanation: 'Insumos clínicos para tratamiento de ortodoncia Roth, incluyendo adhesivos Transbond y arcos.',
        items: [
          { productName: 'Brackets Metálicos Roth .022', category: 'Ortodoncia', quantity: 5 },
          { productName: 'Arcos de Nitinol Redondos .014 Superelásticos', category: 'Ortodoncia', quantity: 8 },
          { productName: 'Tubos Bucales de Cementación Simple Molar', category: 'Ortodoncia', quantity: 5 },
          { productName: 'Elásticos Intermaxilares 1/8 Medio', category: 'Ortodoncia', quantity: 3 },
          { productName: 'Adhesivo Transbond XT para Brackets', category: 'Ortodoncia', quantity: 1 }
        ]
      };
    }

    if (cleanText.includes('abastecer') || cleanText.includes('reabastecer') || cleanText.includes('mes') || cleanText.includes('clínica este mes')) {
      return {
        name: 'Reabastecer mi clínica este mes',
        explanation: 'Insumos de barrera, anestésicos y materiales de impresión rápida de alto consumo en consultorios.',
        items: [
          { productName: 'Guantes de Nitrilo BioClean (Caja x 100)', category: 'Bioseguridad', quantity: 8 },
          { productName: 'Mascarillas Quirúrgicas de 3 pliegues (Caja x 50)', category: 'Bioseguridad', quantity: 4 },
          { productName: 'Jabón Antiséptico Germikil', category: 'Bioseguridad', quantity: 1 },
          { productName: 'Anestesia Octocaine Lidocaína 2% (Caja x 50)', category: 'Anestesia', quantity: 2 },
          { productName: 'Agujas Dentales Desechables Terumo 30G Cortas', category: 'Consumibles', quantity: 2 },
          { productName: 'Alginato Kromopan Cromático de Fraguado Rápido', category: 'Materiales de impresión', quantity: 3 }
        ]
      };
    }

    return null;
  };

  const handleSearch = (searchVal: string) => {
    if (!searchVal.trim()) return;
    setQuery(searchVal);
    setHasSearched(true);
    setIsFocused(false);

    // Reset filters
    setSelectedCategory('todos');
    setSelectedBrand('todos');
    setSelectedSupplier('todos');
    setMaxPriceFilter(50000);
    setOnlyInStock(false);
    setMaxDeliveryHours(48);
    setMinRating(0);
    setOnlyNew(false);
    setFreeShippingOnly(false);

    // Is it conceptual?
    const conceptual = resolveConceptualQuery(searchVal);
    if (conceptual) {
      setIsBundleQuery(true);
      setIsWideQuery(false);
      setBundleInfo(conceptual);
      const generated = generateProposalsForItems(conceptual.items);
      setProposals(generated);
      setFilteredResults([]);
    } else {
      setIsBundleQuery(false);
      setProposals(null);
      setBundleInfo(null);

      // Check if query is very wide (e.g. resina, guantes, lampara, endodoncia)
      const cleanVal = searchVal.toLowerCase().trim();
      const wideKeywords = ['resina', 'guantes', 'lampara', 'limas', 'instrumental', 'equipamiento', 'bioseguridad'];
      if (wideKeywords.includes(cleanVal)) {
        setIsWideQuery(true);
      } else {
        setIsWideQuery(false);
      }

      // Filter products
      const match = products.filter(
        p => p.name.toLowerCase().includes(cleanVal) ||
             p.brand.toLowerCase().includes(cleanVal) ||
             p.category.toLowerCase().includes(cleanVal) ||
             p.description.toLowerCase().includes(cleanVal)
      );
      setFilteredResults(match);
    }
  };

  const handleApplyQuestionnaire = () => {
    setIsWideQuery(false);
    // Custom filter based on wide question
    // E.g., if procedure is Operatoria, filter by Category: Operatoria
    // If preference is Ahorrar, sort by Menor Precio
    let categoryFilter = 'todos';
    if (questionAnswers.procedure === 'operatoria') categoryFilter = 'Operatoria';
    if (questionAnswers.procedure === 'endodoncia') categoryFilter = 'Endodoncia';
    if (questionAnswers.procedure === 'ortodoncia') categoryFilter = 'Ortodoncia';
    
    setSelectedCategory(categoryFilter);
    if (questionAnswers.preference === 'ahorrar') {
      setSortBy('precio_bajo');
    } else {
      setSortBy('recomendados');
    }
    triggerToast('Búsqueda refinada según tus preferencias.');
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

  const handleAddToFavorites = (productId: string, name: string) => {
    setFavorites(prev => {
      const isFav = !prev[productId];
      triggerToast(isFav ? `¡${name} añadido a tus Favoritos!` : `¡${name} retirado de tus Favoritos!`);
      return { ...prev, [productId]: isFav };
    });
  };

  const handleOpenCompare = (product: Product, list: ProductListing[]) => {
    setComparingProduct(product);
    setComparingSupplierList(list);
  };

  const handleQuickAddCheapest = (product: Product, listingsList: ProductListing[]) => {
    const cheapest = [...listingsList]
      .filter(l => l.stock > 0)
      .sort((a, b) => a.price - b.price)[0];
    if (cheapest) {
      addToCart(product, cheapest, 1);
      triggerToast(`¡${product.name} (cheapest) añadido al carrito!`);
    } else {
      triggerToast('Sin stock en este momento.');
    }
  };

  // APPLY SIDEBAR FILTERS AND SORTING TO PRODUCTS
  const getProcessedProducts = () => {
    let list = [...filteredResults];

    // Filter category
    if (selectedCategory !== 'todos') {
      list = list.filter(p => p.category === selectedCategory);
    }
    // Filter brand
    if (selectedBrand !== 'todos') {
      list = list.filter(p => p.brand === selectedBrand);
    }

    // Listings details filters
    list = list.filter(p => {
      const pListings = listings.filter(l => l.productId === p.id);
      if (pListings.length === 0) return false;

      // Price filter
      const minPrice = Math.min(...pListings.map(l => l.price));
      if (minPrice > maxPriceFilter) return false;

      // Stock filter
      if (onlyInStock) {
        const inStock = pListings.some(l => l.stock > 0);
        if (!inStock) return false;
      }

      // Delivery hours
      const minDelivery = Math.min(...pListings.map(l => l.deliveryHours));
      if (minDelivery > maxDeliveryHours) return false;

      // Rating
      const maxRating = Math.max(...pListings.map(l => l.rating));
      if (maxRating < minRating) return false;

      // Condition
      if (onlyNew) {
        const hasNew = pListings.some(l => l.condition === 'Nuevo');
        if (!hasNew) return false;
      }

      // Supplier
      if (selectedSupplier !== 'todos') {
        const sellsIt = pListings.some(l => l.supplierId === selectedSupplier);
        if (!sellsIt) return false;
      }

      // Free shipping
      if (freeShippingOnly) {
        // Mock free shipping: if price >= 500, free shipping
        const hasFree = pListings.some(l => l.price >= 500);
        if (!hasFree) return false;
      }

      return true;
    });

    // SORTING LOGIC
    if (sortBy === 'precio_bajo') {
      list.sort((a, b) => {
        const pA = Math.min(...listings.filter(l => l.productId === a.id).map(l => l.price));
        const pB = Math.min(...listings.filter(l => l.productId === b.id).map(l => l.price));
        return pA - pB;
      });
    } else if (sortBy === 'precio_alto') {
      list.sort((a, b) => {
        const pA = Math.min(...listings.filter(l => l.productId === a.id).map(l => l.price));
        const pB = Math.min(...listings.filter(l => l.productId === b.id).map(l => l.price));
        return pB - pA;
      });
    } else if (sortBy === 'entrega') {
      list.sort((a, b) => {
        const dA = Math.min(...listings.filter(l => l.productId === a.id).map(l => l.deliveryHours));
        const dB = Math.min(...listings.filter(l => l.productId === b.id).map(l => l.deliveryHours));
        return dA - dB;
      });
    } else if (sortBy === 'reputacion') {
      list.sort((a, b) => {
        const rA = Math.max(...listings.filter(l => l.productId === a.id).map(l => l.rating));
        const rB = Math.max(...listings.filter(l => l.productId === b.id).map(l => l.rating));
        return rB - rA;
      });
    } else if (sortBy === 'ahorro') {
      // Sort by savings: products with the biggest price gap between suppliers
      list.sort((a, b) => {
        const pricesA = listings.filter(l => l.productId === a.id).map(l => l.price);
        const pricesB = listings.filter(l => l.productId === b.id).map(l => l.price);
        const diffA = pricesA.length > 1 ? Math.max(...pricesA) - Math.min(...pricesA) : 0;
        const diffB = pricesB.length > 1 ? Math.max(...pricesB) - Math.min(...pricesB) : 0;
        return diffB - diffA;
      });
    }

    return list;
  };

  const processedProducts = getProcessedProducts();

  return (
    <div className="space-y-6 animate-fade-in relative">
      {/* Toast Alert */}
      {toastText && (
        <div className="fixed bottom-6 right-6 z-50 bg-zinc-950 dark:bg-zinc-50 dark:text-zinc-950 text-white border border-zinc-800 px-4 py-3 rounded-xl shadow-2xl text-xs font-bold flex items-center gap-2 animate-fade-in">
          <CheckCircle2 size={15} className="text-emerald-500" />
          {toastText}
        </div>
      )}

      {/* Search and Autocomplete Input */}
      <div className="relative" ref={autocompleteRef}>
        <div className="p-2 rounded-xl bg-white dark:bg-[#0c0c0f] border border-zinc-200 dark:border-zinc-800 shadow-sm flex items-center gap-2 focus-within:ring-2 focus-within:ring-blue-500/30 transition-all">
          <div className="flex items-center gap-2 pl-3 flex-1">
            <Search className="text-zinc-400" size={18} />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch(query)}
              placeholder='Busca un producto, marca, proveedor o describe lo que necesitas...'
              className="bg-transparent border-none text-xs w-full focus:outline-none text-zinc-900 dark:text-zinc-100 placeholder-zinc-400"
            />
          </div>
          <button
            onClick={() => handleSearch(query)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded-lg text-xs transition-colors cursor-pointer"
          >
            Buscar
          </button>
        </div>

        {/* Autocomplete Predictions Dropdown */}
        {isFocused && (predictions.products.length > 0 || predictions.categories.length > 0 || predictions.brands.length > 0 || predictions.suppliers.length > 0 || predictions.needs.length > 0) && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-[#0c0c0f] border border-zinc-200 dark:border-zinc-850 rounded-xl shadow-xl p-4 z-50 divide-y divide-zinc-100 dark:divide-zinc-900 space-y-3 text-xs">
            {/* Needs */}
            {predictions.needs.length > 0 && (
              <div className="pt-2.5 first:pt-0">
                <span className="text-[9px] uppercase font-bold text-zinc-400 tracking-wider block mb-1">Necesidades sugeridas</span>
                {predictions.needs.map(need => (
                  <button
                    key={need}
                    onClick={() => handleSearch(need)}
                    className="w-full text-left py-1 px-2 rounded hover:bg-zinc-50 dark:hover:bg-zinc-900 text-blue-600 dark:text-blue-450 font-bold block"
                  >
                    {need}
                  </button>
                ))}
              </div>
            )}
            
            {/* Products */}
            {predictions.products.length > 0 && (
              <div className="pt-2.5 first:pt-0">
                <span className="text-[9px] uppercase font-bold text-zinc-400 tracking-wider block mb-1">Productos</span>
                {predictions.products.map(prod => (
                  <button
                    key={prod.id}
                    onClick={() => handleSearch(prod.name)}
                    className="w-full text-left py-1.5 px-2 rounded hover:bg-zinc-50 dark:hover:bg-zinc-900 text-zinc-800 dark:text-zinc-200 font-semibold flex justify-between items-center"
                  >
                    <span>{prod.name}</span>
                    <span className="text-[9px] text-zinc-400 uppercase">{prod.brand}</span>
                  </button>
                ))}
              </div>
            )}

            {/* Categories & Brands */}
            {(predictions.categories.length > 0 || predictions.brands.length > 0) && (
              <div className="pt-2.5 first:pt-0 flex gap-6">
                {predictions.categories.length > 0 && (
                  <div className="flex-1">
                    <span className="text-[9px] uppercase font-bold text-zinc-400 tracking-wider block mb-1">Categorías</span>
                    {predictions.categories.map(cat => (
                      <button
                        key={cat}
                        onClick={() => handleSearch(cat)}
                        className="w-full text-left py-1 px-2 rounded hover:bg-zinc-50 dark:hover:bg-zinc-900 text-zinc-700 dark:text-zinc-300 font-medium block"
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                )}
                {predictions.brands.length > 0 && (
                  <div className="flex-1">
                    <span className="text-[9px] uppercase font-bold text-zinc-400 tracking-wider block mb-1">Marcas</span>
                    {predictions.brands.map(brand => (
                      <button
                        key={brand}
                        onClick={() => handleSearch(brand)}
                        className="w-full text-left py-1 px-2 rounded hover:bg-zinc-50 dark:hover:bg-zinc-900 text-zinc-700 dark:text-zinc-300 font-medium block"
                      >
                        {brand}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* RENDER BUNDLE CONCEPT RESULTS */}
      {isBundleQuery && bundleInfo && proposals && (
        <div className="space-y-6">
          <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-900/10 border border-blue-200/50 dark:border-blue-800/30 flex gap-3">
            <Sparkles className="text-blue-600 dark:text-blue-400 shrink-0 mt-0.5 animate-spin-slow" size={18} />
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
                economy: { label: '💰 Económica', border: 'border-emerald-500', icon: '💰' },
                value: { label: '🏆 Recomendada', border: 'border-blue-500', icon: '🏆' },
                premium: { label: '👑 Premium', border: 'border-purple-500', icon: '👑' }
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
                    {prop.estimatedSavings > 0 && <span className="text-[9px] font-medium text-emerald-500">Ahorras S/. {prop.estimatedSavings}</span>}
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

      {/* CLARIFYING QUESTIONNAIRE FOR WIDE QUERIES */}
      {isWideQuery && (
        <div className="p-5 rounded-xl border border-amber-200 dark:border-amber-900/35 bg-[#fdfcf7] dark:bg-[#12110c] space-y-4">
          <div className="flex gap-2">
            <AlertCircle className="text-amber-500 shrink-0" size={18} />
            <div>
              <h3 className="text-xs font-bold text-amber-800 dark:text-amber-400 uppercase tracking-wider">Búsqueda amplia detectada</h3>
              <p className="text-[11px] text-amber-700 dark:text-amber-500 mt-0.5 leading-relaxed">
                Tu búsqueda de "{query}" tiene múltiples aristas. Para ofrecerte la mejor propuesta de OneShop, por favor dinos:
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
            <div className="space-y-1.5">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-500">¿Qué procedimiento realizarás?</label>
              <select 
                value={questionAnswers.procedure}
                onChange={(e) => setQuestionAnswers(prev => ({ ...prev, procedure: e.target.value }))}
                className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded p-2 text-xs"
              >
                <option value="operatoria">Operatoria y Estética</option>
                <option value="endodoncia">Endodoncia de Conducto</option>
                <option value="ortodoncia">Ortodoncia Roth</option>
                <option value="cirugia">Cirugía Oral</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-500">¿Cuál es tu presupuesto?</label>
              <select 
                value={questionAnswers.budget}
                onChange={(e) => setQuestionAnswers(prev => ({ ...prev, budget: e.target.value }))}
                className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded p-2 text-xs"
              >
                <option value="S/. 500">Hasta S/. 500</option>
                <option value="S/. 1,000">S/. 500 a S/. 2,000</option>
                <option value="S/. 5,000">S/. 2,000 a S/. 10,000</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-500">¿Cuántos pacientes atenderás?</label>
              <select 
                value={questionAnswers.patients}
                onChange={(e) => setQuestionAnswers(prev => ({ ...prev, patients: e.target.value }))}
                className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded p-2 text-xs"
              >
                <option value="5">Flujo bajo (1-5 pac/mes)</option>
                <option value="10">Flujo medio (5-20 pac/mes)</option>
                <option value="50">Flujo alto (+20 pac/mes)</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-500">¿Qué prefieres prioritariamente?</label>
              <select 
                value={questionAnswers.preference}
                onChange={(e) => setQuestionAnswers(prev => ({ ...prev, preference: e.target.value }))}
                className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded p-2 text-xs"
              >
                <option value="ahorrar">Ahorro Máximo (Económico)</option>
                <option value="premium">Calidad Premium (Marcas Líderes)</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end pt-2 border-t border-amber-250/20">
            <button
              onClick={handleApplyQuestionnaire}
              className="bg-amber-500 hover:bg-amber-600 text-white font-bold px-4 py-1.5 rounded-lg text-xs transition-colors flex items-center gap-1 cursor-pointer shadow-sm"
            >
              Aplicar Refinamiento
              <ArrowRight size={13} />
            </button>
          </div>
        </div>
      )}

      {/* KEYWORD RESULTS LIST WITH FILTERS SIDEBAR */}
      {!isBundleQuery && hasSearched && (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          
          {/* SIDEBAR FILTERS (1 col) */}
          <aside className="p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#0c0c0f] shadow-sm space-y-5 text-xs self-start">
            <div className="flex justify-between items-center pb-2 border-b border-zinc-100 dark:border-zinc-900">
              <h3 className="font-bold text-zinc-900 dark:text-white flex items-center gap-1.5">
                <Filter size={14} className="text-zinc-400" />
                Filtros de Búsqueda
              </h3>
              <button 
                onClick={() => {
                  setSelectedCategory('todos');
                  setSelectedBrand('todos');
                  setSelectedSupplier('todos');
                  setMaxPriceFilter(50000);
                  setOnlyInStock(false);
                  setMaxDeliveryHours(48);
                  setMinRating(0);
                  setOnlyNew(false);
                  setFreeShippingOnly(false);
                }}
                className="text-[10px] text-blue-500 font-bold hover:underline"
              >
                Limpiar
              </button>
            </div>

            {/* Category Filter */}
            <div className="space-y-1.5">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-400">Categoría</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-850 rounded p-2 text-xs"
              >
                <option value="todos">Todas las categorías</option>
                {Array.from(new Set(products.map(p => p.category))).map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Brand Filter */}
            <div className="space-y-1.5">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-400">Marca</label>
              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-850 rounded p-2 text-xs"
              >
                <option value="todos">Todas las marcas</option>
                {Array.from(new Set(products.map(p => p.brand))).map(brand => (
                  <option key={brand} value={brand}>{brand}</option>
                ))}
              </select>
            </div>

            {/* Supplier Filter */}
            <div className="space-y-1.5">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-400">Proveedor</label>
              <select
                value={selectedSupplier}
                onChange={(e) => setSelectedSupplier(e.target.value)}
                className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-850 rounded p-2 text-xs"
              >
                <option value="todos">Todos los proveedores</option>
                {suppliers.map(s => (
                  <option key={s.id} value={s.id}>{s.name}</option>
                ))}
              </select>
            </div>

            {/* Max Price Filter Slider */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                <span>Precio Máximo</span>
                <span className="font-mono text-zinc-700 dark:text-zinc-300 font-bold">S/. {maxPriceFilter}</span>
              </div>
              <input
                type="range"
                min="10"
                max="50000"
                step="50"
                value={maxPriceFilter}
                onChange={(e) => setMaxPriceFilter(Number(e.target.value))}
                className="w-full bg-zinc-200 dark:bg-zinc-800 h-1 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            {/* Checklist Filters */}
            <div className="space-y-2.5 pt-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={onlyInStock}
                  onChange={(e) => setOnlyInStock(e.target.checked)}
                  className="rounded text-blue-600 border-zinc-300 dark:border-zinc-700 focus:ring-blue-500"
                />
                <span className="text-zinc-650 dark:text-zinc-400 font-medium">Solo en Stock disponible</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={onlyNew}
                  onChange={(e) => setOnlyNew(e.target.checked)}
                  className="rounded text-blue-600 border-zinc-300 dark:border-zinc-700 focus:ring-blue-500"
                />
                <span className="text-zinc-650 dark:text-zinc-400 font-medium">Solo productos Nuevos</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={freeShippingOnly}
                  onChange={(e) => setFreeShippingOnly(e.target.checked)}
                  className="rounded text-blue-600 border-zinc-300 dark:border-zinc-700 focus:ring-blue-500"
                />
                <span className="text-zinc-650 dark:text-zinc-400 font-medium">Envío Gratis (compra min)</span>
              </label>
            </div>

            {/* Delivery filter */}
            <div className="space-y-1.5">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-400">Tiempo de Entrega</label>
              <select
                value={maxDeliveryHours}
                onChange={(e) => setMaxDeliveryHours(Number(e.target.value))}
                className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-850 rounded p-2 text-xs"
              >
                <option value={48}>Hasta 48 horas (Todos)</option>
                <option value={24}>En 24 horas (Mañana)</option>
                <option value={12}>En 12 horas (Mismo día)</option>
              </select>
            </div>

            {/* Rating filter */}
            <div className="space-y-1.5">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-400">Calificación del Vendedor</label>
              <select
                value={minRating}
                onChange={(e) => setMinRating(Number(e.target.value))}
                className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-850 rounded p-2 text-xs"
              >
                <option value={0}>Cualquiera</option>
                <option value={4.5}>4.5 estrellas o más</option>
                <option value={4.0}>4.0 estrellas o más</option>
              </select>
            </div>

          </aside>

          {/* GRID OF RESULTS (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            
            {/* Sorterm Row */}
            <div className="flex justify-between items-center pb-2 border-b border-zinc-200 dark:border-zinc-800 text-xs">
              <span className="font-semibold text-zinc-500">
                Mostrando {processedProducts.length} resultados para "{query}"
              </span>

              <div className="flex items-center gap-2">
                <span className="text-zinc-400">Ordenar por:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-transparent border-none font-bold text-blue-600 dark:text-blue-400 focus:outline-none"
                >
                  <option value="recomendados">Recomendados</option>
                  <option value="precio_bajo">Menor precio</option>
                  <option value="precio_alto">Mayor precio</option>
                  <option value="entrega">Entrega más rápida</option>
                  <option value="reputacion">Mejor calificación</option>
                  <option value="ahorro">Mayor ahorro</option>
                </select>
              </div>
            </div>

            {processedProducts.length === 0 ? (
              <div className="p-12 text-center border border-zinc-200 dark:border-zinc-800 rounded-xl bg-white dark:bg-[#0c0c0f] space-y-4">
                <AlertTriangle className="mx-auto text-zinc-400" size={28} />
                <div className="space-y-1">
                  <h3 className="text-sm font-bold text-zinc-800 dark:text-zinc-200">No encontramos ese producto exacto</h3>
                  <p className="text-xs text-zinc-400 max-w-xs mx-auto">
                    No encontramos "{query}", pero te sugerimos alternativas que podrían cubrir la misma necesidad:
                  </p>
                </div>
                
                {/* Fallback alternative items suggestion */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-md mx-auto pt-3">
                  {products.slice(0, 2).map(alt => (
                    <div 
                      key={alt.id}
                      onClick={() => handleSearch(alt.name)}
                      className="p-3 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-left cursor-pointer hover:border-blue-500/20"
                    >
                      <h4 className="font-bold text-zinc-800 dark:text-zinc-200">{alt.name}</h4>
                      <p className="text-[10px] text-zinc-400">{alt.brand} • {alt.category}</p>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {processedProducts.map(p => {
                  const prodListings = listings.filter(l => l.productId === p.id && l.stock > 0);
                  const sortedListings = [...prodListings].sort((a, b) => a.price - b.price);
                  const startPrice = sortedListings[0]?.price;
                  const suppliersCount = new Set(prodListings.map(l => l.supplierId)).size;
                  
                  // Calculate savings percentage if multiple vendors exist
                  let savingsPercentage = 0;
                  if (prodListings.length > 1) {
                    const maxPrice = Math.max(...prodListings.map(l => l.price));
                    const minPrice = Math.min(...prodListings.map(l => l.price));
                    if (maxPrice > minPrice) {
                      savingsPercentage = Math.round(((maxPrice - minPrice) / maxPrice) * 100);
                    }
                  }

                  // Determine labels
                  const isLowStock = prodListings.some(l => l.stock > 0 && l.stock <= 5);
                  const isCheapest = startPrice && startPrice <= 50;

                  return (
                    <div
                      key={p.id}
                      className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#0c0c0f] shadow-sm flex flex-col justify-between gap-4 relative group"
                    >
                      {/* Favorite star */}
                      <button
                        onClick={() => handleAddToFavorites(p.id, p.name)}
                        className="absolute top-4 right-4 text-zinc-300 hover:text-amber-500 cursor-pointer"
                      >
                        <Star 
                          size={16} 
                          className={favorites[p.id] ? 'fill-amber-400 stroke-amber-400 text-amber-500' : 'text-zinc-300'} 
                        />
                      </button>

                      <div className="flex gap-4">
                        {/* Image slot */}
                        <div className="w-16 h-16 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-150 flex items-center justify-center shrink-0 text-zinc-400 font-extrabold text-xs uppercase">
                          {p.brand.slice(0, 3)}
                        </div>

                        <div className="flex-1 min-w-0 space-y-1">
                          <div className="flex flex-wrap items-center gap-1.5">
                            <span className="text-[9px] font-bold text-blue-600 dark:text-blue-400 bg-blue-50/70 dark:bg-blue-900/10 px-1.5 py-0.5 rounded uppercase">
                              {p.category}
                            </span>
                            
                            {savingsPercentage > 0 && (
                              <span className="text-[9px] font-bold text-emerald-500 bg-emerald-50 dark:bg-emerald-950/20 px-1.5 py-0.5 rounded">
                                Ahorro {savingsPercentage}%
                              </span>
                            )}
                          </div>
                          
                          <h4 
                            onClick={() => onSelectProduct(p)}
                            className="text-xs font-bold text-zinc-950 dark:text-white group-hover:text-blue-600 transition-colors cursor-pointer truncate"
                          >
                            {p.name}
                          </h4>
                          <p className="text-[10px] text-zinc-400 truncate">{p.brand} • {p.description}</p>
                          
                          <div className="flex flex-wrap gap-x-3 gap-y-1 pt-1 text-[10px] text-zinc-400 font-medium">
                            <span className="flex items-center gap-0.5"><Building2 size={11} /> {suppliersCount} {suppliersCount === 1 ? 'proveedor' : 'proveedores'}</span>
                            <span className="flex items-center gap-0.5"><Truck size={11} /> {sortedListings[0] ? `${sortedListings[0].deliveryHours}h entrega` : ''}</span>
                          </div>
                        </div>
                      </div>

                      {/* Card Footer Actions */}
                      <div className="flex justify-between items-end pt-2 border-t border-zinc-100 dark:border-zinc-900">
                        <div>
                          <span className="text-[9px] text-zinc-400 block">Desde</span>
                          <span className="font-mono text-sm font-black text-zinc-950 dark:text-white">
                            {startPrice ? `S/. ${startPrice.toFixed(2)}` : 'Sin Stock'}
                          </span>
                        </div>

                        <div className="flex gap-2">
                          <button
                            onClick={() => handleOpenCompare(p, prodListings)}
                            className="px-2.5 py-1.5 border border-zinc-200 dark:border-zinc-800 text-zinc-650 dark:text-zinc-300 rounded-lg text-[10px] font-bold hover:bg-zinc-50 transition-colors cursor-pointer"
                          >
                            Comparar Opciones
                          </button>
                          
                          <button
                            onClick={() => handleQuickAddCheapest(p, prodListings)}
                            disabled={!startPrice}
                            className="bg-blue-600 hover:bg-blue-700 disabled:bg-zinc-250 text-white rounded-lg px-2.5 py-1.5 text-[10px] font-bold transition-all shadow-sm flex items-center gap-1 cursor-pointer"
                          >
                            <ShoppingCart size={11} /> Añadir
                          </button>
                        </div>
                      </div>

                    </div>
                  );
                })}
              </div>
            )}

          </div>

        </div>
      )}

      {/* MODAL / DRAWER COMPARISON TABLE */}
      {comparingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/50 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-[#0c0c0f] border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-2xl max-w-3xl w-full max-h-[85vh] overflow-hidden flex flex-col justify-between">
            
            {/* Header */}
            <div className="px-6 py-4 border-b border-zinc-150 dark:border-zinc-900 flex justify-between items-start">
              <div>
                <span className="text-[9px] font-bold text-blue-600 bg-blue-50 dark:bg-blue-900/10 px-2 py-0.5 rounded uppercase">Comparador de Precios</span>
                <h3 className="text-sm font-bold text-zinc-900 dark:text-white mt-1.5">{comparingProduct.name}</h3>
                <p className="text-[10px] text-zinc-400">Comparativa del mismo producto entre los proveedores de la red OneShop.</p>
              </div>
              <button 
                onClick={() => setComparingProduct(null)} 
                className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 text-xs font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Matrix comparison table */}
            <div className="p-6 overflow-y-auto flex-1">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-zinc-200 dark:border-zinc-800 text-zinc-400 font-semibold pb-2">
                    <th className="py-2.5 px-3">Proveedor</th>
                    <th className="py-2.5 px-3">Condición</th>
                    <th className="py-2.5 px-3">Garantía</th>
                    <th className="py-2.5 px-3">Calificación</th>
                    <th className="py-2.5 px-3">Despacho</th>
                    <th className="py-2.5 px-3">Precio</th>
                    <th className="py-2.5 px-3 text-right">Acción</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100 dark:divide-zinc-900">
                  {comparingSupplierList.map(l => {
                    const sup = suppliers.find(s => s.id === l.supplierId)!;
                    return (
                      <tr key={l.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-950/20">
                        <td className="py-3.5 px-3 font-semibold text-zinc-800 dark:text-zinc-200">
                          <div>{sup.name}</div>
                          <span className="text-[9px] text-zinc-450 font-normal">{sup.location}</span>
                        </td>
                        <td className="py-3.5 px-3">
                          <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-zinc-100 dark:bg-zinc-800 text-zinc-650 dark:text-zinc-350">{l.condition}</span>
                        </td>
                        <td className="py-3.5 px-3 text-zinc-500">
                          {l.warrantyMonths > 0 ? (
                            <span className="flex items-center gap-0.5 text-emerald-500 font-medium"><ShieldCheck size={12} /> {l.warrantyMonths}m</span>
                          ) : 'Sin garantía'}
                        </td>
                        <td className="py-3.5 px-3 font-semibold text-amber-500 flex items-center gap-0.5 mt-2.5">
                          <Star size={11} className="fill-amber-400 stroke-amber-400" />
                          {l.rating.toFixed(1)}
                        </td>
                        <td className="py-3.5 px-3 text-zinc-500">{l.deliveryHours}h</td>
                        <td className="py-3.5 px-3 font-mono font-bold text-zinc-950 dark:text-white">S/. {l.price.toFixed(2)}</td>
                        <td className="py-3.5 px-3 text-right">
                          <button
                            onClick={() => {
                              addToCart(comparingProduct, l, 1);
                              setComparingProduct(null);
                              triggerToast(`¡${comparingProduct.name} de ${sup.name} añadido!`);
                            }}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-2.5 py-1 rounded text-[10px] transition-colors cursor-pointer shadow-sm"
                          >
                            Seleccionar
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 bg-zinc-50 dark:bg-zinc-950 border-t border-zinc-150 dark:border-zinc-900 flex justify-end">
              <button 
                onClick={() => setComparingProduct(null)}
                className="px-4 py-2 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-lg text-xs font-semibold hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors cursor-pointer"
              >
                Cerrar Comparador
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
