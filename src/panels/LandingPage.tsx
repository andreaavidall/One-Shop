import React, { useState, useEffect } from 'react';
import { 
  Search, Sparkles, Building2, ShieldCheck, Zap, ArrowRight, Star, HelpCircle, 
  Layers, CheckCircle2, ChevronRight, Truck, MapPin, Upload, FileText, 
  FileSpreadsheet, Users, Percent, Gift, ChevronDown, Award, Sparkle
} from 'lucide-react';
import { ThemeToggle } from '../components/ThemeToggle';
import { products, listings, suppliers } from '../data/mockData';

interface LandingPageProps {
  onStartShopping: (initialQuery?: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onStartShopping }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [heroCarouselIndex, setHeroCarouselIndex] = useState(0);
  
  // Interactive Assistant demo state
  const [assistantDemoStep, setAssistantDemoStep] = useState(0); // 0: initial, 1: processing, 2: results
  
  // OneScan drag and drop simulation states
  const [dragActive, setDragActive] = useState(false);
  const [scanFile, setScanFile] = useState<string | null>(null);
  const [scanStatus, setScanStatus] = useState<'idle' | 'scanning' | 'done'>('idle');

  // Cart Optimizer demo state
  const [isOptimizedDemo, setIsOptimizedDemo] = useState(false);

  // FAQ Accordion state
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  // Auto-play Hero comparison cards
  useEffect(() => {
    const timer = setInterval(() => {
      setHeroCarouselIndex(prev => (prev === 0 ? 1 : 0));
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onStartShopping(searchQuery);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      triggerScan(e.dataTransfer.files[0].name);
    }
  };

  const triggerScan = (fileName: string) => {
    setScanFile(fileName);
    setScanStatus('scanning');
    setTimeout(() => {
      setScanStatus('done');
    }, 2500);
  };

  // 10 categories matching specification
  const featuredCategories = [
    { id: 'cat1', name: 'Operatoria', desc: 'Resinas, adhesivos y lámparas de fotocurado.', count: 12 },
    { id: 'cat2', name: 'Endodoncia', desc: 'Limas, cementos obturadores y localizadores.', count: 15 },
    { id: 'cat3', name: 'Ortodoncia', desc: 'Brackets, arcos y aditamentos correctivos.', count: 9 },
    { id: 'cat4', name: 'Cirugía', desc: 'Fórceps, elevadores, suturas y hemostáticos.', count: 7 },
    { id: 'cat5', name: 'Implantología', desc: 'Pilares, tornillos de cicatrización y fresas.', count: 6 },
    { id: 'cat6', name: 'Bioseguridad', desc: 'Mascarillas, guantes, barreras y desinfectantes.', count: 14 },
    { id: 'cat7', name: 'Instrumental', desc: 'Exploradores, pinzas, espejos y curetas.', count: 11 },
    { id: 'cat8', name: 'Equipamiento', desc: 'Turbinas de alta, micromotores y ultrasonidos.', count: 8 },
    { id: 'cat9', name: 'Odontología digital', desc: 'Escaners intraorales y resinas 3D.', count: 4 },
    { id: 'cat10', name: 'Esterilización', desc: 'Autoclaves, selladoras e indicadores químicos.', count: 5 }
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900 transition-colors duration-300 font-sans selection:bg-blue-105 selection:text-blue-800">
      
      {/* ---------------- SECTION 0: NAVBAR ---------------- */}
      <header className="sticky top-0 z-50 w-full border-b border-slate-100 bg-white/95 backdrop-blur-md">
        <div className="max-w-[1400px] mx-auto px-6 py-3.5 flex justify-between items-center gap-4">
          {/* Logo */}
          <div onClick={() => onStartShopping()} className="flex items-center gap-2 cursor-pointer select-none">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-black text-lg shadow-sm">
              O
            </div>
            <span className="text-lg font-black tracking-tight text-blue-600 font-sans">OneShop</span>
            <span className="text-[9px] uppercase font-bold tracking-widest bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded border border-blue-100">
              B2B
            </span>
          </div>

          {/* Location for guest user */}
          <div className="hidden lg:flex items-center gap-1.5 text-xs text-slate-500">
            <MapPin size={15} className="text-blue-600" />
            <div className="flex flex-col text-left">
              <span className="text-[10px] text-slate-400 font-medium leading-none">Entrega en</span>
              <span className="font-semibold text-slate-700 leading-tight">Lima, Perú</span>
            </div>
          </div>

          {/* Search bar inside header for instant navigation */}
          <form onSubmit={handleSearchSubmit} className="flex-1 max-w-md hidden md:block">
            <div className="relative flex items-center bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 focus-within:ring-2 focus-within:ring-blue-500/25 focus-within:border-blue-500 transition-all">
              <Search className="text-slate-400 mr-2 shrink-0" size={15} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Busca resinas, brackets, guantes o describe..."
                className="w-full bg-transparent border-none text-xs text-slate-900 focus:outline-none placeholder-slate-400"
              />
            </div>
          </form>

          {/* Action links */}
          <div className="flex items-center gap-4 shrink-0">
            <ThemeToggle />
            <button 
              onClick={() => onStartShopping('recompensas')}
              className="text-xs font-semibold text-amber-600 hover:text-amber-700 flex items-center gap-1 cursor-pointer transition-colors"
            >
              <Star size={13} className="fill-amber-500 text-amber-500" />
              OneRewards
            </button>
            <button 
              onClick={() => onStartShopping()} 
              className="text-xs font-bold text-slate-600 hover:text-slate-900 cursor-pointer transition-colors"
            >
              Iniciar sesión
            </button>
            <button 
              onClick={() => onStartShopping()} 
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded-xl text-xs transition-all shadow-sm hover:shadow-md cursor-pointer"
            >
              Crear cuenta
            </button>
          </div>
        </div>
      </header>

      {/* ---------------- SECTION 1: HERO ---------------- */}
      <section className="relative pt-12 pb-24 overflow-hidden bg-gradient-to-b from-blue-50/30 to-white">
        {/* Subtle decorative background detail */}
        <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-blue-50 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          {/* Column Left */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-55 text-blue-700 text-[10px] font-bold uppercase tracking-wider border border-blue-100">
              <Sparkles size={11} className="text-blue-500 animate-pulse" />
              Compras inteligentes para clínicas odontológicas
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-slate-950 leading-[1.1] font-sans">
              Todo lo que tu clínica necesita, <br />
              <span className="text-blue-600">en un solo lugar.</span>
            </h1>

            <p className="text-sm md:text-base text-slate-500 max-w-xl leading-relaxed">
              OneShop reúne los productos de múltiples proveedores para que compares alternativas, completes tu lista de compra y compres de forma más inteligente en una transacción unificada.
            </p>

            {/* Large Search Input */}
            <form onSubmit={handleSearchSubmit} className="max-w-xl">
              <div className="relative p-1.5 rounded-2xl bg-white border border-slate-250 shadow-md hover:shadow-lg focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500 transition-all flex items-center gap-2">
                <div className="flex items-center gap-2 pl-3 flex-1">
                  <Search className="text-slate-400" size={18} />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Busca un producto, una marca o describe lo que necesitas..."
                    className="bg-transparent border-none text-xs w-full focus:outline-none text-slate-900 placeholder-slate-400"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-5 py-2.5 rounded-xl text-xs transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
                >
                  Buscar
                </button>
              </div>
            </form>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 pt-2">
              <button
                onClick={() => onStartShopping()}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer text-xs"
              >
                Comenzar gratis
                <ArrowRight size={14} />
              </button>
              <button
                onClick={() => onStartShopping('')}
                className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-semibold px-6 py-3 rounded-xl transition-all cursor-pointer text-xs"
              >
                Explorar productos
              </button>
            </div>
          </div>

          {/* Column Right: Interactive Floating Composition */}
          <div className="lg:col-span-5 flex items-center justify-center relative min-h-[380px] md:min-h-[420px]">
            
            {/* Card 1: Same product, different suppliers */}
            {heroCarouselIndex === 0 && (
              <div className="w-full max-w-sm rounded-2xl border border-slate-100 bg-white shadow-xl p-5 space-y-4 animate-fade-in absolute">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[9px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded uppercase">Comparación de Proveedores</span>
                    <h3 className="text-xs font-bold text-slate-950 mt-1.5">Resina Filtek Z350 XT Body A2</h3>
                    <p className="text-[10px] text-slate-400">Marca: 3M ESPE • Jeringa 4g</p>
                  </div>
                  <div className="w-9 h-9 rounded-lg bg-slate-50 flex items-center justify-center font-bold text-[9px] text-slate-500 border border-slate-100">
                    3M
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="p-2.5 rounded-xl border border-emerald-100 bg-emerald-50/15 flex justify-between items-center text-xs">
                    <div>
                      <h4 className="font-semibold text-slate-900">DentMarket</h4>
                      <span className="text-[9px] text-slate-400 flex items-center gap-1"><Truck size={10} /> Entrega en 2 días</span>
                    </div>
                    <div className="text-right">
                      <span className="font-mono font-bold text-slate-900 block">S/. 139.00</span>
                      <span className="text-[8px] font-bold text-emerald-600 bg-emerald-50 px-1 py-0.2 rounded">MÁS ECONÓMICO</span>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-xl border border-blue-100 bg-blue-50/15 flex justify-between items-center text-xs">
                    <div>
                      <h4 className="font-semibold text-slate-900">ProDental Supply</h4>
                      <span className="text-[9px] text-slate-400 flex items-center gap-1"><Truck size={10} /> Entrega HOY</span>
                    </div>
                    <div className="text-right">
                      <span className="font-mono font-bold text-slate-900 block">S/. 152.00</span>
                      <span className="text-[8px] font-bold text-blue-600 bg-blue-50 px-1 py-0.2 rounded">ENTREGA HOY</span>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-xl border border-slate-150 flex justify-between items-center text-xs">
                    <div>
                      <h4 className="font-semibold text-slate-900">Dental Express</h4>
                      <span className="text-[9px] text-slate-400 flex items-center gap-1"><Truck size={10} /> Entrega mañana</span>
                    </div>
                    <div className="text-right">
                      <span className="font-mono font-bold text-slate-955 block">S/. 145.00</span>
                      <span className="text-[8px] text-slate-400 block">Opción regular</span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center text-[10px] text-slate-400 pt-1 border-t border-slate-50">
                  <span>Ahorro máximo: S/. 13.00</span>
                  <span className="text-blue-600 font-bold flex items-center gap-0.5 cursor-pointer" onClick={() => onStartShopping('Filtek')}>
                    Comparar todo <ArrowRight size={10} />
                  </span>
                </div>
              </div>
            )}

            {/* Card 2: Combined Shopping Proposal */}
            {heroCarouselIndex === 1 && (
              <div className="w-full max-w-sm rounded-2xl border border-slate-100 bg-white shadow-xl p-5 space-y-4 animate-fade-in absolute">
                <div>
                  <span className="text-[9px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded uppercase">Optimización Inteligente</span>
                  <h3 className="text-xs font-bold text-slate-950 mt-1.5">Lista: Endodoncia e Instrumental</h3>
                  <p className="text-[10px] text-slate-400">Generando combinaciones automáticas...</p>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="p-2 border border-slate-100 rounded-xl bg-slate-50 flex flex-col justify-between">
                    <span className="text-[8px] font-bold text-slate-400 block uppercase">Económica</span>
                    <span className="text-xs font-mono font-bold text-slate-900 mt-1">S/. 1,840</span>
                    <span className="text-[7.5px] font-semibold text-emerald-600 block mt-0.5">Ahorra 18%</span>
                  </div>

                  <div className="p-2 border border-blue-200 rounded-xl bg-blue-50/50 flex flex-col justify-between relative">
                    <span className="absolute -top-1.5 left-1/2 -translate-x-1/2 text-[6.5px] bg-blue-600 text-white font-bold px-1 rounded-full uppercase">Valor</span>
                    <span className="text-[8px] font-bold text-blue-600 block uppercase mt-1">Recomendada</span>
                    <span className="text-xs font-mono font-bold text-slate-900 mt-0.5">S/. 2,120</span>
                    <span className="text-[7.5px] font-semibold text-blue-600 block mt-0.5">Calidad/Precio</span>
                  </div>

                  <div className="p-2 border border-amber-200 rounded-xl bg-amber-50/30 flex flex-col justify-between">
                    <span className="text-[8px] font-bold text-amber-600 block uppercase">Premium</span>
                    <span className="text-xs font-mono font-bold text-slate-900 mt-1">S/. 2,650</span>
                    <span className="text-[7.5px] font-semibold text-slate-500 block mt-0.5">Hu-Friedy / W&H</span>
                  </div>
                </div>

                <div className="space-y-1.5 text-[10px] text-slate-650 bg-slate-50 p-2.5 rounded-xl border border-slate-100 text-left">
                  <div className="flex justify-between font-bold">
                    <span>Proveedor sugerido</span>
                    <span>Subtotal</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Dental Express (Operatoria)</span>
                    <span className="font-mono">S/. 1,450.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>BioDental (Guantes/Masc.)</span>
                    <span className="font-mono">S/. 390.00</span>
                  </div>
                </div>

                <button 
                  onClick={() => onStartShopping('endodoncia')}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-[10px] font-bold transition-colors cursor-pointer shadow-sm"
                >
                  Ver propuesta sugerida
                </button>
              </div>
            )}

            {/* Slider Dots */}
            <div className="absolute bottom-2 flex gap-1.5">
              <button 
                onClick={() => setHeroCarouselIndex(0)} 
                className={`w-2 h-2 rounded-full cursor-pointer transition-all ${heroCarouselIndex === 0 ? 'bg-blue-600 w-4' : 'bg-slate-250'}`} 
              />
              <button 
                onClick={() => setHeroCarouselIndex(1)} 
                className={`w-2 h-2 rounded-full cursor-pointer transition-all ${heroCarouselIndex === 1 ? 'bg-blue-600 w-4' : 'bg-slate-250'}`} 
              />
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- SECTION 2: BÚSQUEDAS RÁPIDAS ---------------- */}
      <section className="py-6 border-b border-slate-100 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 flex flex-wrap items-center justify-start gap-2">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mr-2">Búsquedas rápidas:</span>
          {[
            'Resina compuesta', 'Guantes de nitrilo', 'Limas endodónticas', 
            'Brackets Roth', 'Lámpara LED', 'Instrumental básico', 'Esterilización clase B'
          ].map((tag) => (
            <button
              key={tag}
              onClick={() => onStartShopping(tag)}
              className="px-3.5 py-1.5 text-xs rounded-xl bg-slate-50 hover:bg-blue-50 hover:text-blue-600 border border-slate-200 hover:border-blue-200 text-slate-655 transition-all cursor-pointer font-medium"
            >
              {tag}
            </button>
          ))}
        </div>
      </section>

      {/* ---------------- SECTION 3: INDICADORES DE CONFIANZA ---------------- */}
      <section className="py-8 bg-slate-50/50 border-b border-slate-100">
        <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="space-y-1">
            <h4 className="text-2xl md:text-3xl font-black text-slate-900 font-mono">10+</h4>
            <p className="text-[10px] uppercase font-bold text-slate-450 tracking-wider">Distribuidores conectados</p>
          </div>
          <div className="space-y-1">
            <h4 className="text-2xl md:text-3xl font-black text-slate-900 font-mono">5,000+</h4>
            <p className="text-[10px] uppercase font-bold text-slate-455 tracking-wider">Productos disponibles</p>
          </div>
          <div className="space-y-1">
            <h4 className="text-2xl md:text-3xl font-black text-emerald-600 font-mono">S/. 185</h4>
            <p className="text-[10px] uppercase font-bold text-slate-455 tracking-wider">Ahorro promedio por lista</p>
          </div>
          <div className="space-y-1">
            <h4 className="text-2xl md:text-3xl font-black text-blue-600 font-mono">250+</h4>
            <p className="text-[10px] uppercase font-bold text-slate-455 tracking-wider">Clínicas registradas en Lima</p>
          </div>
        </div>
      </section>

      {/* ---------------- SECTION 4: MÁS VENDIDOS ---------------- */}
      <section className="py-16 bg-white">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="flex justify-between items-end mb-10">
            <div>
              <span className="text-[9px] font-bold text-blue-600 uppercase tracking-widest block mb-1">Favoritos de las clínicas</span>
              <h2 className="text-2xl font-bold text-slate-955">Productos más vendidos</h2>
            </div>
            <button 
              onClick={() => onStartShopping('Filtek')} 
              className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer transition-colors"
            >
              Ver todos <ArrowRight size={14} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.slice(0, 4).map((p) => {
              const prodListings = listings.filter(l => l.productId === p.id && l.stock > 0);
              const prices = prodListings.map(l => l.price);
              const minPrice = prices.length > 0 ? Math.min(...prices) : 150.0;
              const maxPrice = prices.length > 0 ? Math.max(...prices) : 180.0;
              const supplierCount = prodListings.length;

              return (
                <div key={p.id} className="p-5 rounded-2xl border border-slate-200 bg-white hover:shadow-md hover:border-blue-200 transition-all flex flex-col justify-between text-left group">
                  <div className="space-y-3">
                    <div className="h-32 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-450 font-black text-sm uppercase relative overflow-hidden">
                      {p.brand.slice(0, 3)}
                      <span className="absolute bottom-2 right-2 text-[8px] bg-slate-100 text-slate-500 px-1 rounded font-normal font-sans">
                        En stock: {prodListings.reduce((sum, l) => sum + l.stock, 0)}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">{p.brand}</span>
                      <h4 className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1">{p.name}</h4>
                      <p className="text-[10px] text-slate-500 line-clamp-2 leading-relaxed">{p.description}</p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 mt-4 space-y-3">
                    <div className="flex justify-between items-end">
                      <div>
                        <span className="text-[9px] text-slate-400 block font-medium">Desde</span>
                        <span className="font-mono text-sm font-bold text-slate-950">S/. {minPrice.toFixed(2)}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-[8.5px] text-slate-500 block">{supplierCount} proveedores</span>
                        <span className="text-[8px] font-bold text-emerald-600 block bg-emerald-50 px-1.5 py-0.5 rounded mt-0.5">Ahorra hasta S/. {(maxPrice - minPrice).toFixed(2)}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => onStartShopping(p.name)}
                      className="w-full bg-slate-50 hover:bg-blue-600 hover:text-white border border-slate-200 hover:border-blue-600 py-2 rounded-xl text-[10.5px] font-bold text-slate-700 transition-all cursor-pointer"
                    >
                      Comparar opciones
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------------- SECTION 5: CATEGORÍAS DESTACADAS ---------------- */}
      <section className="py-16 bg-slate-50/50 border-t border-b border-slate-100">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-[9px] font-bold text-blue-600 uppercase tracking-widest block mb-1">Navegación especializada</span>
            <h2 className="text-2xl font-bold text-slate-950 font-sans">Explora nuestro catálogo odontológico</h2>
            <p className="text-xs text-slate-500 mt-2">Encuentra todo el abanico clínico e instrumental agrupado y clasificado técnicamente en español.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {featuredCategories.map((c) => (
              <div 
                key={c.id} 
                onClick={() => onStartShopping(c.name)}
                className="p-5 rounded-2xl border border-slate-205 bg-white hover:border-blue-300 hover:shadow-sm transition-all cursor-pointer flex flex-col justify-between text-left"
              >
                <div>
                  <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 mb-4">
                    <Building2 size={18} />
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 mb-1">{c.name}</h4>
                  <p className="text-[10px] text-slate-450 line-clamp-2 leading-relaxed">{c.desc}</p>
                </div>
                <span className="text-[9px] font-bold text-blue-600 mt-4 block bg-blue-50/50 px-2 py-0.5 rounded self-start">
                  {c.count} marcas
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- SECTION 6: ASISTENTE INTELIGENTE ---------------- */}
      <section className="py-20 bg-white">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Col Info */}
            <div className="lg:col-span-5 space-y-6 text-left">
              <span className="text-[9px] font-bold text-blue-600 uppercase tracking-widest block">Compra Inteligente con IA</span>
              <h2 className="text-3xl font-black text-slate-950 tracking-tight leading-[1.1] font-sans">
                Dinos qué necesitas. <br />
                <span className="text-blue-600">OneShop arma la compra.</span>
              </h2>
              <p className="text-xs text-slate-500 leading-relaxed font-sans">
                Nuestra plataforma interpreta requerimientos complejos expresados en lenguaje natural, identifica insumos clínicos equivalentes y genera tres propuestas comparativas al instante.
              </p>

              <div className="space-y-3 text-xs">
                <div className="flex gap-2.5 items-start">
                  <CheckCircle2 className="text-blue-600 shrink-0 mt-0.5" size={16} />
                  <div>
                    <h5 className="font-bold text-slate-900">Lectura clínica</h5>
                    <p className="text-[10px] text-slate-500">Comprende términos como "endodoncia", "operatoria" y las cantidades requeridas.</p>
                  </div>
                </div>
                <div className="flex gap-2.5 items-start">
                  <CheckCircle2 className="text-blue-600 shrink-0 mt-0.5" size={16} />
                  <div>
                    <h5 className="font-bold text-slate-900">Búsqueda multi-distribuidor</h5>
                    <p className="text-[10px] text-slate-500">Inspecciona y junta productos de varios catálogos a la vez.</p>
                  </div>
                </div>
                <div className="flex gap-2.5 items-start">
                  <CheckCircle2 className="text-blue-600 shrink-0 mt-0.5" size={16} />
                  <div>
                    <h5 className="font-bold text-slate-900">Filtro de sustitutos clínicos</h5>
                    <p className="text-[10px] text-slate-500">Compara marcas caras con genéricos homologados del mercado odontológico.</p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => onStartShopping('asistente')}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-5 py-3 rounded-xl text-xs shadow-md transition-all flex items-center gap-1.5 cursor-pointer animate-soft-pulse"
              >
                <Sparkles size={14} />
                Ayúdame a comprar
              </button>
            </div>

            {/* Right Col Interactive AI Demo */}
            <div className="lg:col-span-7 p-6 rounded-2xl border border-slate-200 bg-slate-50/50 shadow-inner space-y-4">
              <div className="bg-white border border-slate-200 rounded-xl p-4 space-y-3 shadow-sm text-left">
                <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Consultar Asistente B2B</span>
                  <span className="text-[9px] bg-blue-50 text-blue-600 font-bold px-1.5 py-0.5 rounded flex items-center gap-0.5"><Sparkle size={10} /> Online</span>
                </div>
                
                {/* Simulated Input */}
                <div className="p-3 bg-slate-50 border border-slate-100 rounded-lg text-xs italic text-slate-705">
                  "Necesito materiales para realizar 20 endodoncias con un presupuesto de S/4,000"
                </div>

                {/* Progress simulator */}
                {assistantDemoStep === 0 && (
                  <button 
                    onClick={() => {
                      setAssistantDemoStep(1);
                      setTimeout(() => setAssistantDemoStep(2), 2000);
                    }}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <Sparkles size={13} /> Generar propuestas
                  </button>
                )}

                {assistantDemoStep === 1 && (
                  <div className="flex items-center justify-center gap-2 py-4 text-xs font-semibold text-slate-500">
                    <div className="w-4 h-4 rounded-full border-2 border-blue-600 border-t-transparent animate-spin" />
                    <span>Buscando limas, cementos y biocerámicos en 10 proveedores peruanos...</span>
                  </div>
                )}

                {assistantDemoStep === 2 && (
                  <div className="space-y-3 animate-fade-in text-xs">
                    <div className="p-2.5 bg-emerald-50/30 border border-emerald-200 text-emerald-800 text-[10.5px] rounded-lg">
                      ¡Propuestas listas! He consolidado y dividido los insumos de <strong>Dental Express y BioDental</strong>.
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div className="p-2.5 rounded-lg border border-slate-200 bg-white">
                        <span className="text-[8px] font-bold text-slate-400 block uppercase">Económica</span>
                        <span className="text-xs font-mono font-bold text-slate-905 block mt-1">S/. 2,890.00</span>
                        <span className="text-[7.5px] text-emerald-600 block mt-0.5">Limas Woodpecker</span>
                      </div>

                      <div className="p-2.5 rounded-lg border border-blue-200 bg-blue-50/35 relative">
                        <span className="absolute -top-1.5 right-1.5 text-[6px] bg-blue-600 text-white font-bold px-1 rounded-full uppercase">Mejor relación</span>
                        <span className="text-[8px] font-bold text-blue-600 block uppercase">Recomendada</span>
                        <span className="text-xs font-mono font-bold text-slate-905 block mt-0.5">S/. 3,250.00</span>
                        <span className="text-[7.5px] text-blue-600 block mt-0.5">ProTaper / Angelus</span>
                      </div>

                      <div className="p-2.5 rounded-lg border border-slate-200 bg-white">
                        <span className="text-[8px] font-bold text-slate-400 block uppercase">Premium</span>
                        <span className="text-xs font-mono font-bold text-slate-905 block mt-1">S/. 3,980.00</span>
                        <span className="text-[7.5px] text-slate-500 block mt-0.5">Dentsply / Maillefer</span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button 
                        onClick={() => {
                          setAssistantDemoStep(0);
                        }}
                        className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 py-1.5 rounded-lg text-[10px] font-semibold transition-colors cursor-pointer"
                      >
                        Reiniciar Demo
                      </button>
                      <button 
                        onClick={() => onStartShopping('endodoncia')}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-1.5 rounded-lg text-[10px] font-bold transition-colors cursor-pointer flex items-center justify-center gap-1"
                      >
                        Comprar propuesta <ArrowRight size={10} />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- SECTION 7: SUBIR COTIZACIÓN (OneScan) ---------------- */}
      <section className="py-16 bg-slate-50/50 border-t border-b border-slate-100">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column interactive dropzone */}
            <div className="lg:col-span-6">
              <div 
                onDragEnter={handleDrag}
                onDragOver={handleDrag}
                onDragLeave={handleDrag}
                onDrop={handleDrop}
                className={`p-10 rounded-2xl border-2 border-dashed bg-white shadow-sm flex flex-col items-center justify-center transition-all ${
                  dragActive ? 'border-blue-600 bg-blue-50/10' : 'border-slate-300 hover:border-blue-500'
                }`}
              >
                <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 mb-4">
                  <Upload size={24} className="text-blue-600" />
                </div>
                <h4 className="text-sm font-bold text-slate-900 font-sans">Sube tu cotización o factura anterior</h4>
                <p className="text-[10px] text-slate-450 mt-1 max-w-xs text-center">
                  Arrastra tu archivo PDF, fotografía, captura de pantalla o Excel (.csv, .xlsx) aquí para que OneScan lo analice.
                </p>

                <div className="mt-6 flex flex-wrap gap-2 justify-center">
                  <button 
                    onClick={() => triggerScan('cotizacion_dental_ruiz.pdf')}
                    className="px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-[10px] text-slate-650 font-bold transition-all cursor-pointer flex items-center gap-1"
                  >
                    <FileText size={12} className="text-red-500" />
                    Cargar PDF de muestra
                  </button>
                  <button 
                    onClick={() => triggerScan('lista_resinas_ortodoncia.csv')}
                    className="px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-[10px] text-slate-650 font-bold transition-all cursor-pointer flex items-center gap-1"
                  >
                    <FileSpreadsheet size={12} className="text-emerald-500" />
                    Cargar Excel de muestra
                  </button>
                </div>

                {/* Scan Status Simulator */}
                {scanStatus === 'scanning' && (
                  <div className="w-full mt-6 space-y-2 animate-fade-in">
                    <div className="flex justify-between items-center text-[10px] font-bold text-slate-500">
                      <span>Analizando `{scanFile}`...</span>
                      <span>45%</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-600 w-[45%] animate-pulse" />
                    </div>
                  </div>
                )}

                {scanStatus === 'done' && (
                  <div className="w-full mt-6 p-4.5 rounded-xl border border-emerald-250 bg-emerald-50/15 text-left text-xs space-y-3 animate-fade-in">
                    <div className="flex justify-between items-center pb-2 border-b border-emerald-100">
                      <span className="font-bold text-emerald-800">¡Análisis Completado de `{scanFile}`!</span>
                      <span className="text-[9.5px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded font-black font-mono">100% OK</span>
                    </div>
                    <div className="space-y-1 text-[10px] text-slate-650">
                      <p>• Encontrados en catálogo: <strong>5 de 6 productos</strong>.</p>
                      <p>• Propuesta sugerida ahorra: <strong className="text-emerald-600 font-mono">S/. 190.00 (15.5%)</strong>.</p>
                      <p className="text-slate-455 italic">• 1 producto no reconocido (sugerimos ver alternativa de brackets Morelli).</p>
                    </div>
                    <button 
                      onClick={() => onStartShopping('cotizacion')}
                      className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-lg text-[10.5px] font-bold transition-colors cursor-pointer text-center"
                    >
                      Ver Carrito Optimizado Analizado
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column details */}
            <div className="lg:col-span-6 space-y-6 text-left">
              <span className="text-[9px] font-bold text-blue-600 uppercase tracking-widest block">Función Exclusiva OneScan</span>
              <h2 className="text-3xl font-black text-slate-955 tracking-tight leading-[1.1] font-sans">
                Sube tu cotización. <br />
                <span className="text-blue-600">Comparamos y mejoramos.</span>
              </h2>
              <p className="text-xs text-slate-500 leading-relaxed font-sans">
                Olvídate de buscar código por código. Nuestro sistema inteligente OneScan procesa documentos de la competencia, mapea nombres con nuestro catálogo unificado y estructura las mejores ofertas del mercado.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-sm space-y-1">
                  <h5 className="font-bold text-slate-900">Consolidación</h5>
                  <p className="text-[10px] text-slate-500 font-sans">Mapea variadas marcas a sus equivalencias exactas.</p>
                </div>
                <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-sm space-y-1">
                  <h5 className="font-bold text-slate-900">Reconocimiento</h5>
                  <p className="text-[10px] text-slate-500 font-sans">Identifica cantidades escritas a mano o capturas.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- SECTION 8: CÓMO FUNCIONA ---------------- */}
      <section className="py-20 bg-white">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="text-center max-w-xl mx-auto mb-16">
            <span className="text-[9px] font-bold text-blue-600 uppercase tracking-widest block mb-1">Paso a paso</span>
            <h2 className="text-2xl font-bold text-slate-950 font-sans">Cómo funciona OneShop B2B</h2>
            <p className="text-xs text-slate-500 mt-2">Nuestra plataforma simplifica el reabastecimiento en Lima y provincias de forma 100% digital.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            {[
              { num: '01', title: 'Busca o describe tu insumo', desc: 'Usa el buscador unificado para productos maestros o describe tu lista procedimental en el asistente.' },
              { num: '02', title: 'Compara marcas y proveedores', desc: 'El sistema despliega en paralelo la matriz de precios, stock real y tiempos de despacho.' },
              { num: '03', title: 'Elige tu propuesta sugerida', desc: 'Selecciona la cotización económica, recomendada o premium según tu presupuesto.' },
              { num: '04', title: 'Compra y monitorea entregas', desc: 'Realizas un solo pago centralizado. Dividimos el pedido a cada distribuidor y rastreamos la entrega.' }
            ].map((s, idx) => (
              <div key={idx} className="relative flex flex-col items-start p-6 rounded-2xl border border-slate-100 bg-slate-50/30 text-left">
                <span className="text-5xl font-black text-blue-600/10 font-mono leading-none">{s.num}</span>
                <h4 className="text-xs font-bold text-slate-900 mt-4 mb-2">{s.title}</h4>
                <p className="text-[10.5px] text-slate-550 leading-relaxed font-sans">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- SECTION 9: OPTIMIZADOR DE CARRITO ---------------- */}
      <section className="py-16 bg-slate-50/50 border-t border-b border-slate-100">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Col Info */}
            <div className="lg:col-span-6 space-y-6 text-left">
              <span className="text-[9px] font-bold text-blue-600 uppercase tracking-widest block">Ahorro en Despacho y Logística</span>
              <h2 className="text-3xl font-black text-slate-955 tracking-tight leading-[1.1] font-sans">
                Optimización en un clic. <br />
                <span className="text-blue-600">Menos proveedores, más ahorro.</span>
              </h2>
              <p className="text-xs text-slate-500 leading-relaxed font-sans">
                Cada proveedor cobra envíos diferentes y tiene mínimos de compra. OneShop recalcula tu carrito dividiendo estratégicamente los artículos para consolidar envíos y sugerir alternativas que reduzcan el costo final automáticamente.
              </p>

              <div className="flex gap-4 text-xs font-semibold">
                <div className="p-3 bg-white border border-slate-200 rounded-xl flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <span>Consolidación de envíos</span>
                </div>
                <div className="p-3 bg-white border border-slate-200 rounded-xl flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                  <span>Sustitución por menor costo</span>
                </div>
              </div>
            </div>

            {/* Right Col Interactive Optimizer Simulator */}
            <div className="lg:col-span-6 p-6 rounded-2xl border border-slate-205 bg-white shadow-md text-left space-y-5">
              <div className="flex justify-between items-center pb-2.5 border-b border-slate-100">
                <h4 className="text-xs font-bold text-slate-900">Demostración del Optimizador</h4>
                <button 
                  onClick={() => setIsOptimizedDemo(!isOptimizedDemo)}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-3 py-1.5 rounded-lg text-[10px] transition-colors cursor-pointer shadow-sm animate-pulse"
                >
                  {isOptimizedDemo ? 'Ver Carrito Inicial' : '¡Aplicar Optimización!'}
                </button>
              </div>

              {/* Slider Before/After */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <span className="text-[8.5px] uppercase font-bold text-slate-400">Antes (Inicial)</span>
                  <div className="p-4 rounded-xl border border-slate-100 bg-slate-50 flex flex-col justify-between">
                    <span className="text-[10px] text-slate-450">Costo total</span>
                    <span className="text-lg font-mono font-bold text-slate-900 mt-1">S/. 2,450.00</span>
                    <span className="text-[8px] text-slate-400 mt-1 block">4 proveedores diferentes</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="text-[8.5px] uppercase font-bold text-slate-400">Después (Optimizado)</span>
                  <div className="p-4 rounded-xl border border-emerald-100 bg-emerald-50/10 flex flex-col justify-between">
                    <span className="text-[10px] text-slate-450">Costo total</span>
                    <span className="text-lg font-mono font-bold text-emerald-600 mt-1">S/. 2,265.00</span>
                    <span className="text-[8px] font-bold text-emerald-600 mt-1 block bg-emerald-50 px-1 py-0.2 rounded self-start">Ahorras S/. 185.00</span>
                  </div>
                </div>
              </div>

              {/* Explanatory text */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-[10.5px] text-slate-650 leading-relaxed font-sans">
                {isOptimizedDemo ? (
                  <p>✔ <strong>¡Ahorro Aplicado!</strong> Cambiamos las resinas de ProDental a DentMarket (mismo producto, -S/. 13 por unidad) y redujimos de 4 a 2 proveedores, disminuyendo costos de flete.</p>
                ) : (
                  <p>💡 Haz clic en el botón de arriba para ver cómo recalculamos la distribución para maximizar tu ahorro en costo total.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- SECTION 10: ONEREWARDS ---------------- */}
      <section className="py-20 bg-gradient-to-r from-amber-50/15 via-white to-amber-50/10">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="p-8 md:p-12 rounded-3xl border border-amber-200 bg-white shadow-xl flex flex-col md:flex-row justify-between items-center gap-8 text-left">
            <div className="space-y-5 max-w-xl">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-50 text-amber-700 text-[9.5px] font-bold uppercase tracking-wider border border-amber-100">
                <Star size={11} className="fill-amber-500 text-amber-500" />
                Programa de fidelidad odontológico
              </span>
              <h2 className="text-3xl font-black text-slate-955 leading-none font-sans">
                Gana puntos en cada compra. <br />
                <span className="text-amber-600">Conoce OneRewards.</span>
              </h2>
              <p className="text-xs text-slate-500 leading-relaxed font-sans">
                Acumula 1 punto por cada sol gastado en OneShop. Utiliza tus puntos acumulados como descuento directo en caja durante el checkout o desbloquea beneficios exclusivos al subir de nivel: Essential, Plus, Pro y Elite.
              </p>

              <div className="grid grid-cols-2 gap-4 text-xs text-slate-600">
                <div className="flex gap-2 items-center">
                  <div className="w-2 h-2 rounded-full bg-amber-500" />
                  <span>S/. 1 de descuento por 100 pts</span>
                </div>
                <div className="flex gap-2 items-center">
                  <div className="w-2 h-2 rounded-full bg-amber-500" />
                  <span>Envíos gratis en niveles Pro/Elite</span>
                </div>
              </div>
            </div>

            <div className="shrink-0 space-y-4 text-center md:text-right w-full md:w-auto">
              <div className="p-6 rounded-2xl bg-amber-50/20 border border-amber-100 flex flex-col items-center justify-center md:items-end">
                <span className="text-[10px] text-slate-400 font-bold uppercase">Premio de Bienvenida</span>
                <span className="text-3xl font-black text-amber-600 mt-1 font-mono">+500 pts</span>
                <span className="text-[9px] text-slate-500 mt-1">Con tu primer registro verificado</span>
              </div>
              <button
                onClick={() => onStartShopping('recompensas')}
                className="w-full md:w-auto bg-amber-600 hover:bg-amber-700 text-white font-bold px-6 py-3 rounded-xl text-xs shadow-md transition-colors cursor-pointer"
              >
                Conocer OneRewards
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- SECTION 11: PARA PROVEEDORES ---------------- */}
      <section className="py-16 bg-white border-t border-b border-slate-100">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Col Info */}
            <div className="lg:col-span-6 space-y-6 text-left">
              <span className="text-[9px] font-bold text-blue-600 uppercase tracking-widest block">Consola para Distribuidores</span>
              <h2 className="text-3xl font-black text-slate-955 tracking-tight leading-[1.1] font-sans">
                Llega a clínicas que ya <br />
                <span className="text-blue-600">están listas para comprar.</span>
              </h2>
              <p className="text-xs text-slate-500 leading-relaxed font-sans">
                ¿Distribuyes materiales o equipamiento dental en el Perú? Registra tu catálogo en OneShop para sumarte a la red de comparación y recibir órdenes de compra listas para despacho.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-655">
                <div className="space-y-1 p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <h5 className="font-bold text-slate-900">Sincronización fácil</h5>
                  <p className="text-[9.5px] text-slate-500 font-sans">Importa tus listados de stock y precios con archivo Excel/CSV.</p>
                </div>
                <div className="space-y-1 p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <h5 className="font-bold text-slate-900">Comisión de venta</h5>
                  <p className="text-[9.5px] text-slate-500 font-sans">Paga una comisión del 5% únicamente cuando vendes un producto.</p>
                </div>
              </div>

              <button 
                onClick={() => onStartShopping('proveedorPanel')}
                className="bg-slate-950 hover:bg-slate-800 text-white font-bold px-5 py-3 rounded-xl text-xs transition-colors cursor-pointer"
              >
                Vender en OneShop
              </button>
            </div>

            {/* Right Col Illustration/Mock Panel */}
            <div className="lg:col-span-6 p-6 rounded-2xl border border-slate-200 bg-slate-50 shadow-inner">
              <div className="p-5 rounded-xl border border-slate-250 bg-white text-left space-y-4 shadow-sm">
                <div className="flex justify-between items-center pb-2 border-b border-slate-100 text-xs font-sans">
                  <span className="font-bold text-slate-900">Consola del Distribuidor (Simulador)</span>
                  <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded">Activo</span>
                </div>

                <div className="grid grid-cols-3 gap-2.5 text-center text-xs font-sans">
                  <div className="p-2 bg-slate-50 rounded-lg">
                    <span className="text-[8px] text-slate-450 block uppercase">Ventas mes</span>
                    <span className="font-bold font-mono text-slate-900 block mt-0.5">S/. 12,480</span>
                  </div>
                  <div className="p-2 bg-slate-50 rounded-lg">
                    <span className="text-[8px] text-slate-450 block uppercase">Pedidos</span>
                    <span className="font-bold font-mono text-slate-900 block mt-0.5">14 recibidos</span>
                  </div>
                  <div className="p-2 bg-slate-50 rounded-lg">
                    <span className="text-[8px] text-slate-450 block uppercase">Comisión (5%)</span>
                    <span className="font-bold font-mono text-blue-600 block mt-0.5">S/. 624</span>
                  </div>
                </div>

                <div className="space-y-1.5 text-[10px] text-slate-655 bg-slate-50 p-2.5 rounded-lg border border-slate-100 font-sans">
                  <p className="font-bold text-slate-800">Actualizar Stock Express:</p>
                  <p>Arrastra tu lista de stock para actualizar precios al instante en Lima.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- SECTION 12: TESTIMONIOS ---------------- */}
      <section className="py-20 bg-white">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="text-center max-w-xl mx-auto mb-16">
            <span className="text-[9px] font-bold text-blue-600 uppercase tracking-widest block mb-1">Casos de Éxito</span>
            <h2 className="text-2xl font-bold text-slate-950 font-sans">Testimonios de clínicas odontológicas</h2>
            <p className="text-xs text-slate-500 mt-2">Dr. Alejandro, Dra. Andrea y otros profesionales nos prefieren para optimizar sus tiempos.</p>
            <span className="inline-block bg-slate-100 text-slate-500 text-[8.5px] px-2 py-0.5 rounded-full mt-2 font-medium">Contenido Demostrativo durante el MVP</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                text: "Antes perdíamos horas cotizando y comprando resinas con un proveedor, instrumental con otro y autoclaves en otra tienda. Con OneShop compramos todo en 5 minutos y nos ahorramos un 12% en la primera gran orden.",
                author: "Dr. Alejandro Ruiz",
                role: "Director de Clínica Dental OdonTo Ruiz",
                rating: 5
              },
              {
                text: "La funcionalidad de optimización inteligente del carrito es increíble. Te avisa si el mismo producto está más barato con otro proveedor o te sugiere una marca alternativa equivalente. Una genialidad.",
                author: "Dra. Andrea Dávila",
                role: "Odontóloga Independiente",
                rating: 5
              },
              {
                text: "Equipar nuestro segundo consultorio fue sumamente fácil con el Asistente AI. Le escribimos nuestro presupuesto de S/. 20,000 y nos armó tres propuestas detalladas de inmediato. Compramos la propuesta de Valor y llegó perfecto.",
                author: "Magaly Altamirano",
                role: "Administradora de DentalPlus Lima",
                rating: 5
              }
            ].map((t, idx) => (
              <div key={idx} className="p-6 rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition-all text-left flex flex-col justify-between">
                <div>
                  <div className="flex gap-0.5 text-amber-400 mb-4">
                    {[...Array(t.rating)].map((_, i) => <Star key={i} size={15} className="fill-amber-400 stroke-amber-400" />)}
                  </div>
                  <p className="text-xs text-slate-655 italic leading-relaxed mb-6 font-sans">"{t.text}"</p>
                </div>
                <div>
                  <h5 className="text-xs font-bold text-slate-900 font-sans">{t.author}</h5>
                  <p className="text-[10px] text-slate-400 font-sans">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- SECTION 13: PREGUNTAS FRECUENTES ---------------- */}
      <section className="py-20 bg-slate-50/50 border-t border-b border-slate-100">
        <div className="max-w-[800px] mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-[9px] font-bold text-blue-600 uppercase tracking-widest block mb-1 font-sans">Dudas comunes</span>
            <h2 className="text-2xl font-bold text-slate-955 font-sans">Preguntas frecuentes</h2>
          </div>

          <div className="space-y-4">
            {[
              { 
                q: "¿Cómo funciona OneShop?", 
                a: "OneShop reúne los catálogos e inventarios en stock de múltiples proveedores y distribuidores dentales en una sola plataforma. Te permite buscar, comparar precios, stock y tiempos de entrega para consolidar tu pedido en un solo carrito de compras." 
              },
              { 
                q: "¿Puedo comprar a varios proveedores a la vez?", 
                a: "Sí. OneShop te permite comprar productos de proveedores diferentes desde un solo carrito y en una sola transacción. Nosotros nos encargamos de dividir y enrutar las órdenes de compra correspondientes a cada almacén." 
              },
              { 
                q: "¿Cómo se entregan los pedidos?", 
                a: "Cada distribuidor despacha sus respectivos productos de acuerdo con sus propios plazos logísticos (expresados en horas en la plataforma). Sin embargo, OneShop centraliza el seguimiento logístico para que monitorees el avance en un stepper visual consolidado." 
              },
              { 
                q: "¿OneShop es gratis?", 
                a: "Sí, registrarse y buscar en OneShop es completamente gratuito para odontólogos y clínicas. No cobramos comisiones adicionales sobre el precio de lista de los distribuidores." 
              },
              { 
                q: "¿Cómo se comparan los productos?", 
                a: "Puedes comparar de dos modos: mismo producto físico entre varios proveedores, o alternativas equivalentes de diferentes marcas. Para esto último, la plataforma incluye una advertencia técnica clínica para que verifiques detalles antes del uso quirúrgico." 
              },
              { 
                q: "¿Qué sucede si un proveedor no tiene stock?", 
                a: "Si un proveedor se queda temporalmente sin stock de un producto seleccionado, el sistema te alertará automáticamente y te sugerirá el stock disponible del mismo producto con otro distribuidor o una alternativa equivalente." 
              },
              { 
                q: "¿Cómo funcionan los puntos OneRewards?", 
                a: "Acumulas puntos con cada compra realizada en OneShop. Estos puntos se pueden canjear en el checkout para obtener un descuento directo (100 puntos = S/. 1.00 de descuento) o canjearlos por cupones de envío gratis." 
              },
              { 
                q: "¿Puedo subir una cotización?", 
                a: "Sí. Nuestra función OneScan analiza cotizaciones en PDF, imágenes o planillas de Excel para extraer los productos maestros, mapear equivalencias y generar propuestas optimizadas con el mejor precio disponible." 
              }
            ].map((faq, i) => {
              const isOpen = expandedFaq === i;
              return (
                <div key={i} className="rounded-xl border border-slate-200 bg-white overflow-hidden text-left shadow-sm">
                  <button 
                    onClick={() => setExpandedFaq(isOpen ? null : i)}
                    className="w-full px-5 py-4 flex justify-between items-center text-xs font-bold text-slate-900 hover:bg-slate-50 transition-colors text-left"
                  >
                    <span className="flex items-center gap-2 font-sans">
                      <HelpCircle size={15} className="text-blue-600 shrink-0" />
                      {faq.q}
                    </span>
                    <ChevronDown size={14} className={`text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-4 pt-1.5 text-xs text-slate-500 leading-relaxed border-t border-slate-50 animate-fade-in pl-11 font-sans">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------------- SECTION 14: CTA FINAL ---------------- */}
      <section className="py-20 bg-blue-600 text-white text-center relative overflow-hidden">
        {/* Abstract background blobs */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.12),transparent_60%)]" />
        
        <div className="max-w-[1400px] mx-auto px-6 space-y-6 relative z-10">
          <h2 className="text-3xl md:text-4xl font-black tracking-tight leading-none font-sans">
            Empieza a comprar de forma más inteligente.
          </h2>
          <p className="text-sm text-blue-100 max-w-xl mx-auto font-sans">
            Únete hoy de forma gratuita a OneShop. Centraliza tus catálogos, optimiza tus fletes y empieza a ganar puntos de recompensa en Lima y provincias.
          </p>

          <div className="flex justify-center gap-4 pt-2">
            <button 
              onClick={() => onStartShopping()}
              className="bg-white hover:bg-blue-50 text-blue-600 font-bold px-6 py-3 rounded-xl text-xs transition-all shadow-md cursor-pointer"
            >
              Crear cuenta gratis
            </button>
            <button 
              onClick={() => onStartShopping('')}
              className="bg-blue-700 hover:bg-blue-800 text-white font-semibold px-6 py-3 rounded-xl border border-blue-550 text-xs transition-all cursor-pointer"
            >
              Explorar productos
            </button>
          </div>
        </div>
      </section>

      {/* ---------------- SECTION 15: FOOTER ---------------- */}
      <footer className="bg-slate-50 border-t border-slate-200 text-slate-600">
        <div className="max-w-[1400px] mx-auto px-6 py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-8 text-left text-xs">
            <div className="md:col-span-2 space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center text-white font-black text-sm">
                  O
                </div>
                <span className="text-base font-black text-slate-900">OneShop</span>
              </div>
              <p className="text-slate-450 leading-relaxed max-w-xs font-sans">
                Plataforma B2B que reúne y optimiza el reabastecimiento de insumos, materiales y tecnología odontológica en todo el territorio nacional.
              </p>
            </div>

            <div>
              <h5 className="font-bold text-slate-900 uppercase tracking-wider mb-4 font-sans">Productos</h5>
              <ul className="space-y-2 text-slate-455 font-sans">
                <li><button onClick={() => onStartShopping('resina')} className="hover:text-blue-600 cursor-pointer">Resinas compuestas</button></li>
                <li><button onClick={() => onStartShopping('guantes')} className="hover:text-blue-600 cursor-pointer">Guantes y bioseguridad</button></li>
                <li><button onClick={() => onStartShopping('limas')} className="hover:text-blue-600 cursor-pointer">Limas rotatorias</button></li>
                <li><button onClick={() => onStartShopping('brackets')} className="hover:text-blue-600 cursor-pointer">Ortodoncia y brackets</button></li>
              </ul>
            </div>

            <div>
              <h5 className="font-bold text-slate-900 uppercase tracking-wider mb-4 font-sans">Plataforma</h5>
              <ul className="space-y-2 text-slate-455 font-sans">
                <li><button onClick={() => onStartShopping()} className="hover:text-blue-600 cursor-pointer">Buscador Inteligente</button></li>
                <li><button onClick={() => onStartShopping('asistente')} className="hover:text-blue-600 cursor-pointer">Asistente AI</button></li>
                <li><button onClick={() => onStartShopping('kits')} className="hover:text-blue-600 cursor-pointer">Kits por procedimiento</button></li>
                <li><button onClick={() => onStartShopping('recompensas')} className="hover:text-blue-600 cursor-pointer">Programa OneRewards</button></li>
              </ul>
            </div>

            <div>
              <h5 className="font-bold text-slate-900 uppercase tracking-wider mb-4 font-sans">Para Socios</h5>
              <ul className="space-y-2 text-slate-455 font-sans">
                <li><button onClick={() => onStartShopping('proveedorPanel')} className="hover:text-blue-600 cursor-pointer">Vender en OneShop</button></li>
                <li><button onClick={() => onStartShopping('adminPanel')} className="hover:text-blue-600 cursor-pointer">Consola Administrador</button></li>
                <li><a href="#" className="hover:text-blue-600">Documentación API</a></li>
                <li><a href="#" className="hover:text-blue-600">Comisiones B2B</a></li>
              </ul>
            </div>

            <div>
              <h5 className="font-bold text-slate-900 uppercase tracking-wider mb-4 font-sans">Soporte & Legal</h5>
              <ul className="space-y-2 text-slate-455 font-sans">
                <li><a href="#" className="hover:text-blue-600">Centro de ayuda</a></li>
                <li><a href="#" className="hover:text-blue-600">Contacto de soporte</a></li>
                <li><a href="#" className="hover:text-blue-600">Términos de servicio</a></li>
                <li><a href="#" className="hover:text-blue-600">Políticas de privacidad</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-12 border-t border-slate-200 mt-12 flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] text-slate-400 font-sans">
            <span>&copy; 2026 OneShop Inc. Todos los derechos reservados.</span>
            <span>Ubicación fiscal: Av. Larco 450, Miraflores, Lima, Perú. Teléfono: +51 (1) 480-0234.</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
