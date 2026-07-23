import React, { useState, useEffect } from 'react';
import { Search, Sparkles, Building2, ShieldCheck, Zap, ArrowRight, Star, HelpCircle, Layers, CheckCircle2, ChevronRight, Truck } from 'lucide-react';
import { ThemeToggle } from '../components/ThemeToggle';

interface LandingPageProps {
  onStartShopping: (initialQuery?: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onStartShopping }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [carouselIndex, setCarouselIndex] = useState(0);

  // Automatic slide rotation for the right hero card carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCarouselIndex(prev => (prev === 0 ? 1 : 0));
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onStartShopping(searchQuery);
    } else {
      onStartShopping();
    }
  };

  const categories = [
    { name: 'Operatoria', count: '15 productos', desc: 'Resinas, adhesivos y lámparas' },
    { name: 'Endodoncia', count: '22 productos', desc: 'Limas, localizadores y cementos' },
    { name: 'Ortodoncia', count: '10 productos', desc: 'Brackets, arcos y accesorios' },
    { name: 'Cirugía', count: '14 productos', desc: 'Fórceps, elevadores y suturas' },
    { name: 'Implantes', count: '8 productos', desc: 'Tornillos, pilares y kits' },
    { name: 'Bioseguridad', count: '18 productos', desc: 'Esterilización y desechables' },
    { name: 'Equipamiento', count: '12 productos', desc: 'Turbinas, compresoras y motores' },
    { name: 'Consumibles', count: '25 productos', desc: 'Agujas, eyectores y algodones' }
  ];

  const benefits = [
    {
      icon: <Search className="text-blue-500" size={24} />,
      title: 'Búsqueda Unificada',
      desc: 'Encuentra insumos y equipos entre decenas de proveedores dentales al mismo tiempo.'
    },
    {
      icon: <Layers className="text-purple-500" size={24} />,
      title: 'Comparador Inteligente',
      desc: 'Compara precios, stock, tiempos de entrega y condiciones de garantía de forma automática.'
    },
    {
      icon: <Sparkles className="text-amber-500" size={24} />,
      title: 'Recomendaciones con IA',
      desc: 'Optimiza tu presupuesto con propuestas a tu medida o alternativas más económicas recomendadas por IA.'
    },
    {
      icon: <Zap className="text-emerald-500" size={24} />,
      title: 'Carrito Multi-Proveedor',
      desc: 'Compra a múltiples empresas en un solo flujo de pago unificado. Nosotros organizamos la logística.'
    }
  ];

  const steps = [
    { num: '01', title: 'Busca tu material o sube tu lista', desc: 'Usa el buscador para productos individuales o escribe requerimientos completos como "Todo para una endodoncia".' },
    { num: '02', title: 'Compara las opciones del mercado', desc: 'Visualiza qué distribuidores tienen stock, quién ofrece mejor precio y quién entrega más rápido.' },
    { num: '03', title: 'Optimiza tu compra', desc: 'El sistema reorganiza tu carrito dividiendo los productos entre los mejores proveedores para maximizar tu ahorro.' },
    { num: '04', title: 'Recibe todo en tu clínica', desc: 'Realiza un solo pago. Procesamos la compra con cada proveedor y coordinamos el despacho consolidado.' }
  ];

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-[#09090b] text-zinc-900 dark:text-zinc-50 transition-colors duration-300">
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 w-full border-b border-zinc-200/85 dark:border-zinc-800/80 bg-white/80 dark:bg-[#09090b]/80 backdrop-blur-md">
        <div className="max-w-[1400px] mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-black text-lg shadow-md shadow-blue-500/20">
              O
            </div>
            <span className="text-lg font-black tracking-tight bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent">
              OneShop
            </span>
            <span className="text-[10px] uppercase font-bold tracking-widest bg-zinc-100 dark:bg-zinc-800 text-zinc-650 dark:text-zinc-350 px-1.5 py-0.5 rounded ml-1 border border-zinc-200 dark:border-zinc-700">
              B2B
            </span>
          </div>

          <div className="flex items-center gap-4">
            <ThemeToggle />
            <button
              onClick={() => onStartShopping()}
              className="text-xs font-bold text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer"
            >
              Iniciar Sesión
            </button>
            <button
              onClick={() => onStartShopping()}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded-lg text-xs transition-colors shadow-sm cursor-pointer"
            >
              Acceso Clínicas
            </button>
          </div>
        </div>
      </header>

      {/* 2-COLUMN HERO SECTION */}
      <section className="relative pt-12 pb-20 overflow-hidden">
        {/* Decorative Gradients */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[130px] pointer-events-none" />
        
        <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          
          {/* COLUMN LEFT: Info and Value Prop */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 text-[10px] font-bold uppercase tracking-wider border border-blue-200/50 dark:border-blue-900/30">
              <Sparkles size={11} className="animate-spin-slow" />
              Creado para odontólogos y clínicas
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-zinc-950 dark:text-white leading-[1.1]">
              Todo lo que tu clínica necesita, <br />
              <span className="bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent">en un solo lugar.</span>
            </h1>

            <p className="text-sm md:text-base text-zinc-500 dark:text-zinc-400 max-w-xl leading-relaxed">
              OneShop reúne productos de múltiples proveedores odontológicos para que puedas comparar alternativas, ahorrar dinero y completar tus compras sin visitar diferentes tiendas.
            </p>

            {/* Smart Search box */}
            <form onSubmit={handleSearchSubmit} className="max-w-xl">
              <div className="relative p-1.5 rounded-2xl bg-white dark:bg-[#0c0c0f] border border-zinc-200 dark:border-zinc-800 shadow-lg flex items-center gap-2 focus-within:ring-2 focus-within:ring-blue-500/30 transition-all">
                <div className="flex items-center gap-2 pl-3 flex-1">
                  <Search className="text-zinc-400" size={18} />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder='Busca "Resina Filtek", "Guantes" o "Necesito todo para una endodoncia"...'
                    className="bg-transparent border-none text-xs w-full focus:outline-none text-zinc-900 dark:text-zinc-100 placeholder-zinc-400"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2.5 rounded-xl text-xs transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
                >
                  Buscar
                </button>
              </div>
              
              {/* Quick suggestions chips */}
              <div className="flex flex-wrap gap-1.5 mt-3 text-[10px] text-zinc-450 dark:text-zinc-500">
                <span className="font-semibold text-zinc-500 pt-0.5">Búsquedas rápidas:</span>
                {['Resina compuesta', 'Guantes de nitrilo', 'Limas endodónticas', 'Lámpara de fotocurado'].map((tag, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setSearchQuery(tag);
                      onStartShopping(tag);
                    }}
                    className="px-2 py-0.5 rounded bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-800 border border-zinc-200/50 dark:border-zinc-800 text-zinc-650 dark:text-zinc-350 transition-colors cursor-pointer"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </form>

            <div className="flex gap-4 pt-2">
              <button
                onClick={() => onStartShopping()}
                className="bg-zinc-950 hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-200 text-white dark:text-zinc-950 font-bold px-5 py-3 rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer text-xs"
              >
                Comenzar gratis
                <ArrowRight size={14} />
              </button>
              <button
                onClick={() => onStartShopping()}
                className="bg-white hover:bg-zinc-50 dark:bg-zinc-900 dark:hover:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-800 font-semibold px-5 py-3 rounded-xl transition-all cursor-pointer text-xs"
              >
                Explorar productos
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-zinc-250/30 dark:border-zinc-800/50">
              <div className="flex items-center gap-1.5 text-[10px] font-bold text-zinc-500">
                <Building2 size={14} className="text-blue-500" />
                <span>Múltiples Proveedores</span>
              </div>
              <div className="flex items-center gap-1.5 text-[10px] font-bold text-zinc-500">
                <ShieldCheck size={14} className="text-emerald-500" />
                <span>Compra Segura</span>
              </div>
              <div className="flex items-center gap-1.5 text-[10px] font-bold text-zinc-500">
                <Layers size={14} className="text-purple-500" />
                <span>Precios Comparados</span>
              </div>
              <div className="flex items-center gap-1.5 text-[10px] font-bold text-zinc-500">
                <Star size={14} className="text-amber-500" />
                <span>Soporte Local</span>
              </div>
            </div>

          </div>

          {/* COLUMN RIGHT: Animated comparison cards */}
          <div className="lg:col-span-5 flex items-center justify-center relative min-h-[360px] md:min-h-[400px]">
            
            {/* Carousel Item 1: Product comparison (Multiple suppliers) */}
            {carouselIndex === 0 && (
              <div className="w-full max-w-sm rounded-2xl border border-zinc-250/60 dark:border-zinc-800 bg-white dark:bg-[#0c0c0f] shadow-xl p-5 space-y-4 animate-scale-in absolute">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[9px] font-bold text-blue-600 bg-blue-50 dark:bg-blue-900/10 px-2 py-0.5 rounded uppercase">Mismo Producto, Diferentes Proveedores</span>
                    <h3 className="text-xs font-bold text-zinc-950 dark:text-white mt-2">Resina Filtek Z350 XT Body A2</h3>
                    <p className="text-[10px] text-zinc-400">Marca: 3M ESPE • Jeringa 4g</p>
                  </div>
                  <div className="w-10 h-10 rounded-lg bg-zinc-50 dark:bg-zinc-900 flex items-center justify-center font-bold text-[10px] uppercase text-zinc-450 border border-zinc-200/50">
                    3M
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="p-3 rounded-lg border border-emerald-500/20 bg-emerald-50/10 dark:bg-emerald-950/5 flex justify-between items-center text-xs">
                    <div>
                      <h4 className="font-semibold text-zinc-900 dark:text-zinc-200">DentMarket</h4>
                      <span className="text-[9px] text-zinc-400 flex items-center gap-1"><Truck size={10} /> Entrega en 2 días</span>
                    </div>
                    <div className="text-right">
                      <span className="font-mono font-bold text-zinc-950 dark:text-white">S/. 139.00</span>
                      <span className="text-[8px] font-bold text-emerald-500 block">MÁS ECONÓMICO</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-lg border border-blue-500/20 bg-blue-50/10 dark:bg-blue-950/5 flex justify-between items-center text-xs">
                    <div>
                      <h4 className="font-semibold text-zinc-900 dark:text-zinc-200">ProDental Supply</h4>
                      <span className="text-[9px] text-zinc-400 flex items-center gap-1"><Truck size={10} /> Entrega HOY</span>
                    </div>
                    <div className="text-right">
                      <span className="font-mono font-bold text-zinc-950 dark:text-white">S/. 152.00</span>
                      <span className="text-[8px] font-bold text-blue-500 block">ENTREGA MÁS RÁPIDA</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-lg border border-zinc-200 dark:border-zinc-800 flex justify-between items-center text-xs">
                    <div>
                      <h4 className="font-semibold text-zinc-900 dark:text-zinc-200">Dental Express Perú</h4>
                      <span className="text-[9px] text-zinc-400 flex items-center gap-1"><Truck size={10} /> Entrega mañana</span>
                    </div>
                    <div className="text-right">
                      <span className="font-mono font-bold text-zinc-950 dark:text-white">S/. 145.00</span>
                      <span className="text-[8px] font-bold text-zinc-400 block">MEJOR OPCIÓN</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Carousel Item 2: Product equivalences (Different brands) */}
            {carouselIndex === 1 && (
              <div className="w-full max-w-sm rounded-2xl border border-zinc-250/60 dark:border-zinc-800 bg-white dark:bg-[#0c0c0f] shadow-xl p-5 space-y-4 animate-scale-in absolute">
                <div className="space-y-1">
                  <span className="text-[9px] font-bold text-purple-600 bg-purple-50 dark:bg-purple-900/10 px-2 py-0.5 rounded uppercase">Comparativa de Equivalencias</span>
                  <h3 className="text-xs font-bold text-zinc-950 dark:text-white">Necesidad: "Resina Compuesta Universal"</h3>
                  <p className="text-[9px] text-zinc-400">Te sugerimos alternativas clínicas según categoría y características técnicas.</p>
                </div>

                <div className="space-y-2">
                  <div className="p-2.5 rounded-lg border border-zinc-150 dark:border-zinc-850 flex justify-between items-center text-xs">
                    <div>
                      <h4 className="font-bold text-zinc-900 dark:text-zinc-200">3M Filtek Z350 XT</h4>
                      <p className="text-[9px] text-zinc-450">Marca: 3M ESPE • Nanotubos</p>
                    </div>
                    <span className="font-mono font-bold text-zinc-950 dark:text-white">S/. 145.00</span>
                  </div>

                  <div className="p-2.5 rounded-lg border border-zinc-150 dark:border-zinc-850 flex justify-between items-center text-xs">
                    <div>
                      <h4 className="font-bold text-zinc-900 dark:text-zinc-200">Tokuyama Omnichroma</h4>
                      <p className="text-[9px] text-zinc-450">Marca: Coltene • Inteligente</p>
                    </div>
                    <span className="font-mono font-bold text-zinc-950 dark:text-white">S/. 158.00</span>
                  </div>

                  <div className="p-2.5 rounded-lg border border-zinc-150 dark:border-zinc-850 flex justify-between items-center text-xs">
                    <div>
                      <h4 className="font-bold text-zinc-900 dark:text-zinc-200">Ultradent Forma</h4>
                      <p className="text-[9px] text-zinc-450">Marca: Coltene • Nanohíbrida</p>
                    </div>
                    <span className="font-mono font-bold text-zinc-950 dark:text-white">S/. 129.00</span>
                  </div>
                </div>

                <div className="p-2 bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200/25 text-[8.5px] text-amber-700 dark:text-amber-500 leading-tight rounded-md">
                  Aviso: Verifica las especificaciones antes de comprar. Las equivalencias son sugerencias de ayuda.
                </div>
              </div>
            )}

            {/* Slider Dots */}
            <div className="absolute bottom-2 flex gap-1.5">
              <button 
                onClick={() => setCarouselIndex(0)} 
                className={`w-2 h-2 rounded-full cursor-pointer transition-all ${carouselIndex === 0 ? 'bg-blue-600 w-4' : 'bg-zinc-300 dark:bg-zinc-700'}`} 
              />
              <button 
                onClick={() => setCarouselIndex(1)} 
                className={`w-2 h-2 rounded-full cursor-pointer transition-all ${carouselIndex === 1 ? 'bg-blue-600 w-4' : 'bg-zinc-300 dark:bg-zinc-700'}`} 
              />
            </div>
            
          </div>

        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 border-t border-zinc-200 dark:border-zinc-900 bg-white dark:bg-[#0c0c0f]/30">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight mb-4 text-zinc-950 dark:text-white">Una experiencia de compra B2B moderna</h2>
            <p className="text-zinc-500 dark:text-zinc-400 max-w-xl mx-auto text-sm">
              Diseñado para odontólogos y clínicas que valoran su tiempo y dinero. OneShop conecta la oferta dispersa en una sola plataforma premium.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {benefits.map((b, i) => (
              <div key={i} className="p-6 rounded-2xl border border-zinc-200/60 dark:border-zinc-800 bg-white dark:bg-[#0c0c0f] shadow-sm hover:shadow-md hover:border-blue-500/20 dark:hover:border-blue-500/10 transition-all">
                <div className="w-12 h-12 rounded-xl bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center mb-6">
                  {b.icon}
                </div>
                <h3 className="text-base font-bold text-zinc-950 dark:text-white mb-2">{b.title}</h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 border-t border-zinc-200 dark:border-zinc-900">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight mb-4 text-zinc-950 dark:text-white">Cómo funciona</h2>
            <p className="text-zinc-500 dark:text-zinc-400 max-w-xl mx-auto text-sm">
              Conectamos el stock de los proveedores más importantes de Lima para que tú solo tengas que hacer un clic.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            {steps.map((s, i) => (
              <div key={i} className="relative flex flex-col items-start p-6 bg-transparent">
                <div className="text-5xl font-black text-blue-500/15 mb-4 font-mono leading-none">{s.num}</div>
                <h3 className="text-base font-bold text-zinc-950 dark:text-white mb-2">{s.title}</h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Grid Section */}
      <section className="py-20 border-t border-zinc-200 dark:border-zinc-900 bg-white dark:bg-[#0c0c0f]/30">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold tracking-tight mb-2 text-zinc-950 dark:text-white">Explora por Categorías</h2>
              <p className="text-zinc-500 dark:text-zinc-400 text-sm">Encuentra insumos clínicos, instrumental especializado y equipamiento digital.</p>
            </div>
            <button
              onClick={() => onStartShopping()}
              className="text-sm font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 flex items-center gap-1.5 cursor-pointer"
            >
              Ver todas las categorías
              <ArrowRight size={16} />
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((c, i) => (
              <div
                key={i}
                onClick={() => onStartShopping(c.name)}
                className="p-5 rounded-2xl border border-zinc-200/60 dark:border-zinc-800 bg-white dark:bg-[#0c0c0f] hover:border-blue-500/30 dark:hover:border-blue-500/20 hover:shadow-sm transition-all cursor-pointer"
              >
                <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-2 py-0.5 rounded">
                  {c.count}
                </span>
                <h3 className="text-base font-bold text-zinc-950 dark:text-white mt-4 mb-1">{c.name}</h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 border-t border-zinc-200 dark:border-zinc-900">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight mb-4 text-zinc-950 dark:text-white">Lo que opinan nuestros usuarios</h2>
            <p className="text-zinc-500 dark:text-zinc-400 max-w-xl mx-auto text-sm">Clínicas dentales e independientes optimizan sus compras con nosotros.</p>
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
              <div key={idx} className="p-6 rounded-2xl border border-zinc-200/60 dark:border-zinc-800 bg-white dark:bg-[#0c0c0f] shadow-sm">
                <div className="flex gap-0.5 text-amber-400 mb-4">
                  {[...Array(t.rating)].map((_, i) => <Star key={i} size={16} className="fill-amber-400 stroke-amber-400" />)}
                </div>
                <p className="text-xs text-zinc-600 dark:text-zinc-300 italic leading-relaxed mb-6">"{t.text}"</p>
                <div>
                  <h4 className="text-sm font-bold text-zinc-950 dark:text-white">{t.author}</h4>
                  <p className="text-[11px] text-zinc-400">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20 border-t border-zinc-200 dark:border-zinc-900 bg-white dark:bg-[#0c0c0f]/30">
        <div className="max-w-[800px] mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight mb-4 text-zinc-950 dark:text-white">Preguntas frecuentes</h2>
            <p className="text-zinc-500 dark:text-zinc-400 text-sm">Resuelve tus dudas rápidas sobre el funcionamiento de OneShop.</p>
          </div>

          <div className="space-y-6">
            {[
              { q: "¿OneShop vende los productos de forma directa?", a: "No. Actuamos como un agregador e integrador de catálogo inteligente. Conectamos los almacenes de los proveedores y distribuidores dentales autorizados de todo el país, permitiendo que visualices y compres todo desde un solo flujo unificado." },
              { q: "¿Cómo se gestionan los envíos si compro a proveedores distintos?", a: "Nuestra plataforma divide automáticamente la compra. Cada proveedor despacha sus productos según su propia logística. Sin embargo, OneShop centraliza el seguimiento para que puedas monitorear todas tus entregas desde tu panel personal." },
              { q: "¿Los precios incluyen IGV y factura?", a: "Sí, todos los precios mostrados incluyen impuestos de ley. En el checkout puedes ingresar tus datos de facturación (RUC y Razón Social) y recibirás las facturas directamente emitidas por cada proveedor respectivo." },
              { q: "¿Tiene algún costo registrarse como clínica?", a: "Registrarse y buscar es completamente gratuito. Tampoco cobramos comisiones adicionales sobre el precio de lista de los proveedores. Obtenemos nuestros ingresos de acuerdos directos de distribución mayorista." }
            ].map((faq, i) => (
              <div key={i} className="p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#0c0c0f]">
                <h4 className="text-sm font-bold text-zinc-950 dark:text-white flex items-start gap-2">
                  <HelpCircle className="text-blue-500 shrink-0 mt-0.5" size={16} />
                  {faq.q}
                </h4>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2.5 pl-6 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-200 dark:border-zinc-900 bg-white dark:bg-[#09090b]">
        <div className="max-w-[1400px] mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-blue-600 flex items-center justify-center text-white font-black text-sm">O</div>
                <span className="text-base font-black tracking-tight text-zinc-950 dark:text-white">OneShop</span>
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                Plataforma B2B inteligente que consolida toda la oferta odontológica en el mercado nacional en un solo lugar.
              </p>
            </div>
            
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-3">Plataforma</h4>
              <ul className="space-y-2 text-xs text-zinc-500 dark:text-zinc-400">
                <li><button onClick={() => onStartShopping()} className="hover:text-blue-500 cursor-pointer">Buscador Inteligente</button></li>
                <li><button onClick={() => onStartShopping()} className="hover:text-blue-500 cursor-pointer">Asistente AI</button></li>
                <li><button onClick={() => onStartShopping()} className="hover:text-blue-500 cursor-pointer">Kits Completos</button></li>
                <li><button onClick={() => onStartShopping()} className="hover:text-blue-500 cursor-pointer">Directorio Proveedores</button></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-3">Soporte</h4>
              <ul className="space-y-2 text-xs text-zinc-500 dark:text-zinc-400">
                <li><a href="#" className="hover:text-blue-500">Centro de ayuda</a></li>
                <li><a href="#" className="hover:text-blue-500">Políticas de devolución</a></li>
                <li><a href="#" className="hover:text-blue-500">Términos del servicio</a></li>
                <li><a href="#" className="hover:text-blue-500">Contacto</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-3">Contacto</h4>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                ventas@oneshop.pe <br />
                +51 (1) 480-0234 <br />
                Av. Larco 450, Miraflores, Lima
              </p>
            </div>
          </div>

          <div className="pt-8 border-t border-zinc-100 dark:border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-4">
            <span className="text-[11px] text-zinc-400">&copy; 2026 OneShop Inc. Todos los derechos reservados.</span>
            <span className="text-[11px] text-zinc-400">Desarrollado con altos estándares de seguridad B2B.</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
