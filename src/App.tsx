import React, { useState } from 'react';
import { CartProvider, useCart } from './context/CartContext';
import { UserProvider, useUser } from './context/UserContext';
import { LandingPage } from './panels/LandingPage';
import { Dashboard } from './panels/Dashboard';
import { SmartSearch } from './panels/SmartSearch';
import { AIAssistant } from './panels/AIAssistant';
import { Kits } from './panels/Kits';
import { Suppliers } from './panels/Suppliers';
import { Cart } from './panels/Cart';
import { OneRewardsCenter } from './panels/OneRewardsCenter';
import { OrdersPage } from './panels/OrdersPage';
import { SupplierPanel } from './panels/SupplierPanel';
import { AdminPanel } from './panels/AdminPanel';
import { type Product, type Supplier, products, listings, suppliers } from './data/mockData';
import { ThemeToggle } from './components/ThemeToggle';
import { 
  LayoutGrid, Search, Sparkles, Box, Building2, ShoppingCart, 
  ShieldCheck, Info, X, Star, Bell, Heart, User, ChevronDown, 
  Menu, LogOut, Package, Award, Settings, CheckCircle2, ChevronRight, MapPin
} from 'lucide-react';

const AppContent: React.FC = () => {
  const [viewMode, setViewMode] = useState<'landing' | 'app'>('landing');
  const [activeTab, setActiveTab] = useState<string>('resumen');
  const [searchInitialQuery, setSearchInitialQuery] = useState<string>('');
  
  // Header dropdown states
  const [showCategoryMenu, setShowCategoryMenu] = useState(false);
  const [showSupplierMenu, setShowSupplierMenu] = useState(false);
  const [showBrandMenu, setShowBrandMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotificationMenu, setShowNotificationMenu] = useState(false);
  
  // Product Detail Modal state
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  // Favorites list state (mock count)
  const [favoritesCount, setFavoritesCount] = useState(3);
  
  const { cartItems, recommendations, cartTotals, addToCart } = useCart();
  const { user, setRole, setSupplierId } = useUser();

  const handleStartShopping = (query?: string) => {
    setViewMode('app');
    if (query) {
      setActiveTab('buscar');
      setSearchInitialQuery(query);
    } else {
      setActiveTab('resumen');
      setSearchInitialQuery('');
    }
  };

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleSelectSupplierFromProduct = (supplier: Supplier) => {
    setActiveTab('proveedores');
    setSelectedProduct(null);
  };

  const handleHeaderSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const queryInput = (e.currentTarget.elements.namedItem('headerSearch') as HTMLInputElement).value;
    if (queryInput.trim()) {
      setViewMode('app');
      setActiveTab('buscar');
      setSearchInitialQuery(queryInput);
    }
  };

  // Get categories and brands for menu lists
  const categoriesList = Array.from(new Set(products.map(p => p.category)));
  const brandsList = Array.from(new Set(products.map(p => p.brand)));

  // Define tabs list depending on active role
  const getMenuItems = () => {
    if (user.role === 'comprador') {
      return [
        { id: 'resumen', label: 'Resumen Clínicas', icon: <LayoutGrid size={15} /> },
        { id: 'buscar', label: 'Búsqueda Inteligente', icon: <Search size={15} /> },
        { id: 'asistente', label: 'Ayúdame a comprar', icon: <Sparkles size={15} />, highlight: true },
        { id: 'kits', label: 'Kits Procedimentales', icon: <Box size={15} /> },
        { id: 'proveedores', label: 'Proveedores', icon: <Building2 size={15} /> },
        { id: 'pedidos', label: 'Mis Pedidos', icon: <Package size={15} /> },
        { id: 'recompensas', label: 'OneRewards', icon: <Award size={15} />, rewards: true },
        { id: 'carrito', label: 'Carrito', icon: <ShoppingCart size={15} />, badge: cartItems.length }
      ];
    } else if (user.role === 'proveedor') {
      return [
        { id: 'proveedorPanel', label: 'Consola Proveedor', icon: <Building2 size={15} />, highlight: true }
      ];
    } else {
      return [
        { id: 'adminPanel', label: 'Consola Administrador', icon: <Settings size={15} />, highlight: true }
      ];
    }
  };

  const menuItems = getMenuItems();

  if (viewMode === 'landing') {
    return <LandingPage onStartShopping={handleStartShopping} />;
  }

  const activeProductListings = selectedProduct 
    ? listings.filter(l => l.productId === selectedProduct.id)
    : [];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-50 flex flex-col transition-colors duration-300">
      
      {/* 1. DOUBLE-ROW FIXED HEADER */}
      <header className="w-full bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-40 shadow-sm">
        
        {/* ROW 1: Branding, Delivery Location, Main Search, Actions & Accounts */}
        <div className="max-w-[1440px] mx-auto px-6 py-3 flex justify-between items-center gap-6">
          
          {/* Logo & Platform ID */}
          <div 
            onClick={() => setViewMode('landing')}
            className="flex items-center gap-2 cursor-pointer hover:opacity-90 shrink-0"
          >
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-extrabold text-base shadow-sm">
              O
            </div>
            <span className="text-lg font-black tracking-tight text-slate-900 dark:text-white">OneShop</span>
            <span className="text-[9px] uppercase font-bold tracking-widest bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-1.5 py-0.5 rounded border border-blue-100 dark:border-blue-805">
              B2B
            </span>
          </div>

          {/* Delivery Location Indicator */}
          <div className="hidden lg:flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 shrink-0">
            <MapPin size={15} className="text-blue-600" />
            <div className="flex flex-col">
              <span className="text-[10px] text-slate-400 font-medium leading-none font-sans">Entregar en</span>
              <span className="font-semibold text-slate-700 dark:text-slate-200 leading-tight">Miraflores, Lima</span>
            </div>
          </div>

          {/* Large Central Search Bar */}
          <form onSubmit={handleHeaderSearch} className="flex-1 max-w-lg hidden md:block">
            <div className="relative flex items-center bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500 transition-all">
              <Search className="text-slate-400 mr-2 shrink-0" size={16} />
              <input
                id="headerSearch"
                type="text"
                placeholder="Busca un producto, marca, proveedor o describe lo que necesitas..."
                className="w-full bg-transparent border-none text-xs text-slate-950 dark:text-slate-50 focus:outline-none placeholder-slate-400"
              />
              <button 
                type="submit" 
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-3 py-1 rounded-lg text-xs transition-colors cursor-pointer"
              >
                Buscar
              </button>
            </div>
          </form>

          {/* Quick Actions (Theme, Rewards, Favorites, Cart, Account menu) */}
          <div className="flex items-center gap-4 shrink-0">
            <ThemeToggle />

            {/* OneRewards Points Quick Link */}
            {user.role === 'comprador' && (
              <button
                onClick={() => setActiveTab('recompensas')}
                className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-amber-205 bg-amber-50/50 hover:bg-amber-100/50 text-amber-700 dark:border-amber-800 dark:bg-amber-950/20 dark:text-amber-400 text-xs font-semibold transition-colors cursor-pointer"
                title="Centro de Recompensas OneRewards"
              >
                <Star size={14} className="fill-amber-500 text-amber-500" />
                <span className="font-mono">{user.points} pts</span>
              </button>
            )}

            {/* Favorites Icon */}
            <button 
              onClick={() => {
                if (user.role === 'comprador') {
                  setActiveTab('buscar');
                  setSearchInitialQuery('');
                  triggerToast('Cargando lista de favoritos...');
                }
              }}
              className="relative p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl text-slate-500 dark:text-slate-400 cursor-pointer transition-colors"
              title="Favoritos"
            >
              <Heart size={18} className="hover:text-rose-500 transition-colors" />
              {favoritesCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-500 text-white font-mono text-[9px] font-black px-1.5 py-0.2 rounded-full leading-none">
                  {favoritesCount}
                </span>
              )}
            </button>

            {/* Notifications Icon with Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setShowNotificationMenu(!showNotificationMenu)}
                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl text-slate-500 dark:text-slate-400 cursor-pointer transition-colors"
                title="Notificaciones"
              >
                <Bell size={18} />
                <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
              </button>

              {showNotificationMenu && (
                <div className="absolute right-0 mt-2.5 w-72 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-850 rounded-xl shadow-lg p-3.5 z-50 text-xs text-slate-600 dark:text-slate-350 space-y-2.5">
                  <div className="flex justify-between items-center pb-2 border-b border-slate-100 dark:border-slate-800">
                    <span className="font-bold text-slate-900 dark:text-white">Notificaciones</span>
                    <button onClick={() => setShowNotificationMenu(false)} className="text-[10px] text-blue-600 hover:underline">Marcar leídas</button>
                  </div>
                  <div className="space-y-2">
                    <div className="p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 border border-transparent hover:border-slate-100 dark:hover:border-slate-700 transition-colors">
                      <p className="font-semibold text-slate-900 dark:text-white">¡Ahorro Disponible!</p>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">Optimiza tu carrito de compras y ahorra S/. 185 en Dental Express.</p>
                    </div>
                    <div className="p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 border border-transparent hover:border-slate-100 dark:hover:border-slate-700 transition-colors">
                      <p className="font-semibold text-slate-900 dark:text-white">Pedido Despachado</p>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">OdontoImport envió los insumos del pedido ORD-9811.</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Shopping Cart Icon in Header */}
            {user.role === 'comprador' && (
              <button 
                onClick={() => setActiveTab('carrito')}
                className="relative p-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-xl text-slate-700 dark:text-slate-200 cursor-pointer transition-all flex items-center gap-1.5"
              >
                <ShoppingCart size={18} />
                {cartItems.length > 0 && (
                  <span className="bg-blue-600 text-white font-mono text-[9px] px-1.5 py-0.5 rounded-full font-bold">
                    {cartItems.length}
                  </span>
                )}
              </button>
            )}

            {/* User Dropdown / Role Selector in Header */}
            <div className="relative">
              <button 
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-1.5 p-1 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl cursor-pointer transition-colors"
              >
                <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-extrabold text-xs uppercase shadow-sm">
                  {user.role === 'comprador' ? 'CC' : user.role === 'proveedor' ? 'PV' : 'AD'}
                </div>
                <div className="hidden lg:flex flex-col items-start pr-1 text-left">
                  <span className="text-[10px] text-slate-400 leading-none">Mi Cuenta</span>
                  <span className="text-[11px] font-bold text-slate-700 dark:text-slate-200 truncate max-w-[100px] leading-tight">
                    {user.role === 'comprador' ? user.clinicName : user.role === 'proveedor' ? 'Proveedor' : 'Admin'}
                  </span>
                </div>
                <ChevronDown size={14} className="text-slate-400" />
              </button>

              {showUserMenu && (
                <div className="absolute right-0 mt-2.5 w-60 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-850 rounded-xl shadow-lg p-3.5 z-50 text-xs text-slate-700 dark:text-slate-355 space-y-2">
                  <div className="pb-2.5 border-b border-slate-100 dark:border-slate-800">
                    <p className="font-bold text-slate-900 dark:text-white">
                      {user.role === 'comprador' ? user.clinicName : user.role === 'proveedor' ? 'Dental Express Consola' : 'Administrador General'}
                    </p>
                    <p className="text-[10px] text-slate-400 mt-0.5">{user.role === 'comprador' ? `RUC ${user.ruc}` : 'Acceso administrativo'}</p>
                  </div>
                  
                  {/* Selector de Roles */}
                  <div className="py-1 space-y-1">
                    <span className="text-[9px] uppercase font-bold text-slate-450 block px-2 tracking-wider">Cambiar Rol (MVP)</span>
                    <button 
                      onClick={() => { setRole('comprador'); setActiveTab('resumen'); setShowUserMenu(false); }}
                      className={`w-full text-left px-2 py-1.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-850 font-medium transition-colors ${user.role === 'comprador' ? 'text-blue-600 font-bold bg-blue-50/55 dark:bg-blue-900/10' : 'text-slate-600 dark:text-slate-400'}`}
                    >
                      Comprador (Odontólogo/Clínica)
                    </button>
                    <button 
                      onClick={() => { setRole('proveedor'); setSupplierId('s1'); setActiveTab('proveedorPanel'); setShowUserMenu(false); }}
                      className={`w-full text-left px-2 py-1.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-850 font-medium transition-colors ${user.role === 'proveedor' ? 'text-blue-600 font-bold bg-blue-50/55 dark:bg-blue-900/10' : 'text-slate-600 dark:text-slate-400'}`}
                    >
                      Proveedor (Dental Express)
                    </button>
                    <button 
                      onClick={() => { setRole('administrador'); setActiveTab('adminPanel'); setShowUserMenu(false); }}
                      className={`w-full text-left px-2 py-1.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-850 font-medium transition-colors ${user.role === 'administrador' ? 'text-blue-600 font-bold bg-blue-50/55 dark:bg-blue-900/10' : 'text-slate-650 dark:text-slate-400'}`}
                    >
                      Administrador (OneShop)
                    </button>
                  </div>
                  
                  <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                    <button 
                      onClick={() => { setViewMode('landing'); setShowUserMenu(false); }}
                      className="w-full text-left px-2 py-1.5 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/20 text-rose-600 dark:text-rose-400 font-bold flex items-center gap-1.5 transition-colors"
                    >
                      <LogOut size={13} />
                      Cerrar Sesión
                    </button>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>

        {/* ROW 2: Categories, Suppliers, Brands Drops & Navigation Links */}
        {user.role === 'comprador' && (
          <div className="w-full border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-xs font-semibold text-slate-600 dark:text-slate-400">
            <div className="max-w-[1440px] mx-auto px-6 py-2.5 flex items-center gap-6 overflow-x-auto justify-between md:justify-start">
              
              {/* Dropdowns */}
              <div className="flex gap-4 shrink-0">
                {/* Comprar por Categoría */}
                <div className="relative">
                  <button 
                    onClick={() => { setShowCategoryMenu(!showCategoryMenu); setShowSupplierMenu(false); setShowBrandMenu(false); }}
                    className="hover:text-blue-600 flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    Categorías <ChevronDown size={12} />
                  </button>
                  {showCategoryMenu && (
                    <div className="absolute left-0 mt-2.5 w-52 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-lg p-2 z-50 space-y-1">
                      {categoriesList.map(cat => (
                        <button
                          key={cat}
                          onClick={() => {
                            setActiveTab('buscar');
                            setSearchInitialQuery(cat);
                            setShowCategoryMenu(false);
                          }}
                          className="w-full text-left px-3 py-2 text-xs hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg text-slate-700 dark:text-slate-350 transition-colors"
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Comprar por Proveedor */}
                <div className="relative">
                  <button 
                    onClick={() => { setShowSupplierMenu(!showSupplierMenu); setShowCategoryMenu(false); setShowBrandMenu(false); }}
                    className="hover:text-blue-600 flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    Proveedores <ChevronDown size={12} />
                  </button>
                  {showSupplierMenu && (
                    <div className="absolute left-0 mt-2.5 w-56 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-lg p-2 z-50 space-y-1">
                      {suppliers.map(sup => (
                        <button
                          key={sup.id}
                          onClick={() => {
                            setActiveTab('buscar');
                            setSearchInitialQuery(sup.name);
                            setShowSupplierMenu(false);
                          }}
                          className="w-full text-left px-3 py-2 text-xs hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg text-slate-700 dark:text-slate-350 transition-colors"
                        >
                          {sup.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Comprar por Marca */}
                <div className="relative">
                  <button 
                    onClick={() => { setShowBrandMenu(!showBrandMenu); setShowCategoryMenu(false); setShowSupplierMenu(false); }}
                    className="hover:text-blue-600 flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    Marcas <ChevronDown size={12} />
                  </button>
                  {showBrandMenu && (
                    <div className="absolute left-0 mt-2.5 w-48 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-lg p-2 z-50 space-y-1 max-h-60 overflow-y-auto">
                      {brandsList.map(brand => (
                        <button
                          key={brand}
                          onClick={() => {
                            setActiveTab('buscar');
                            setSearchInitialQuery(brand);
                            setShowBrandMenu(false);
                          }}
                          className="w-full text-left px-3 py-2 text-xs hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg text-slate-700 dark:text-slate-355 transition-colors"
                        >
                          {brand}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Navigation tabs shortcut */}
              <div className="h-4 w-px bg-slate-200 dark:bg-slate-700 hidden md:block shrink-0" />

              <div className="flex gap-5 overflow-x-auto py-1 scrollbar-none">
                <button 
                  onClick={() => { setActiveTab('buscar'); setSearchInitialQuery(''); }} 
                  className={`hover:text-slate-950 dark:hover:text-white cursor-pointer shrink-0 transition-colors ${activeTab === 'buscar' && !searchInitialQuery ? 'text-blue-600 font-bold' : ''}`}
                >
                  Todos los productos
                </button>
                <button 
                  onClick={() => { setActiveTab('buscar'); setSearchInitialQuery('Filtek'); }} 
                  className="hover:text-slate-950 dark:hover:text-white cursor-pointer shrink-0 transition-colors"
                >
                  Más vendidos
                </button>
                <button 
                  onClick={() => { setActiveTab('buscar'); setSearchInitialQuery('anestesia'); }} 
                  className="hover:text-slate-950 dark:hover:text-white cursor-pointer shrink-0 text-emerald-600 dark:text-emerald-500 transition-colors"
                >
                  Promociones
                </button>
                <button 
                  onClick={() => setActiveTab('kits')} 
                  className={`hover:text-slate-950 dark:hover:text-white cursor-pointer shrink-0 transition-colors ${activeTab === 'kits' ? 'text-blue-600 font-bold' : ''}`}
                >
                  Kits
                </button>
                <button 
                  onClick={() => setActiveTab('asistente')} 
                  className={`hover:text-slate-950 dark:hover:text-white cursor-pointer shrink-0 flex items-center gap-0.5 transition-colors ${activeTab === 'asistente' ? 'text-blue-600 font-bold' : ''}`}
                >
                  <Sparkles size={12} className="text-blue-500" /> Ayúdame a comprar
                </button>
                <button 
                  onClick={() => { setActiveTab('buscar'); setSearchInitialQuery('cotizacion'); }}
                  className="hover:text-slate-950 dark:hover:text-white cursor-pointer shrink-0 transition-colors"
                >
                  Subir cotización
                </button>
                <button 
                  onClick={() => { setRole('proveedor'); setSupplierId('s1'); setActiveTab('proveedorPanel'); }}
                  className="hover:text-slate-950 dark:hover:text-white cursor-pointer shrink-0 transition-colors"
                >
                  Para proveedores
                </button>
              </div>

            </div>
          </div>
        )}
      </header>

      {/* 2. MAIN APPLICATION CONTENT SHELL */}
      <div className="flex-1 flex max-w-[1440px] w-full mx-auto">
        
        {/* Sidebar Nav */}
        <aside className="w-56 border-r border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#0c0c0f] flex flex-col justify-between shrink-0 h-[calc(100vh-100px)] sticky top-24 z-30">
          <div className="flex-1 flex flex-col min-h-0 pt-4 px-3 space-y-1.5">
            <span className="text-[9px] uppercase font-bold text-zinc-400 px-3 tracking-wider block mb-2">Panel Operativo</span>
            
            {menuItems.map(item => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    if (item.id !== 'buscar') setSearchInitialQuery('');
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-950 dark:text-white font-bold'
                      : 'text-zinc-500 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-900/20'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className={item.highlight ? 'text-blue-500' : 'text-zinc-400'}>
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                  </div>
                  
                  {item.badge !== undefined && item.badge > 0 && (
                    <span className="bg-blue-600 text-white font-mono text-[9px] px-1.5 py-0.5 rounded-full font-bold">
                      {item.badge}
                    </span>
                  )}
                  {item.rewards && (
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Quick stats under sidebar */}
          {user.role === 'comprador' && (
            <div className="p-4 border-t border-zinc-100 dark:border-zinc-900 bg-zinc-50/50 dark:bg-zinc-900/10 space-y-2">
              <div className="flex justify-between items-center text-[10px] text-zinc-400">
                <span>Puntos:</span>
                <span className="font-bold text-amber-600 font-mono">{user.points} pts</span>
              </div>
              <div className="text-[10px] text-zinc-500 flex flex-col gap-0.5">
                <span>Ahorro este mes:</span>
                <span className="font-bold text-emerald-500 font-mono">S/. {user.savingsThisMonth.toFixed(2)}</span>
              </div>
            </div>
          )}
        </aside>

        {/* Dynamic Panels Body */}
        <main className="flex-1 p-6 overflow-y-auto">
          {/* Active optimizations pill inline */}
          {recommendations.length > 0 && activeTab !== 'carrito' && user.role === 'comprador' && (
            <div className="mb-6">
              <button
                onClick={() => setActiveTab('carrito')}
                className="bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/15 border border-blue-200 dark:border-blue-800/30 text-blue-700 dark:text-blue-400 rounded-xl px-4 py-2 text-xs font-semibold flex items-center justify-between w-full transition-all cursor-pointer animate-soft-pulse"
              >
                <span className="flex items-center gap-1.5">
                  <Sparkles size={13} className="text-blue-500 animate-spin-slow" />
                  <span>¡Optimizaciones de ahorro listas! Compra lo mismo a menor costo y ahorra hasta <strong>S/. {cartTotals.savings.toFixed(2)}</strong></span>
                </span>
                <ChevronRight size={13} />
              </button>
            </div>
          )}

          {activeTab === 'resumen' && (
            <Dashboard 
              onNavigate={setActiveTab} 
              onSelectProduct={handleSelectProduct}
              onSelectSupplier={handleSelectSupplierFromProduct}
            />
          )}
          {activeTab === 'buscar' && (
            <SmartSearch 
              initialQuery={searchInitialQuery} 
              onSelectProduct={handleSelectProduct}
              onNavigate={setActiveTab}
            />
          )}
          {activeTab === 'asistente' && (
            <AIAssistant 
              onSelectProduct={handleSelectProduct}
              onNavigate={setActiveTab}
            />
          )}
          {activeTab === 'kits' && (
            <Kits 
              onSelectProduct={handleSelectProduct}
              onNavigate={setActiveTab}
            />
          )}
          {activeTab === 'proveedores' && (
            <Suppliers 
              onSelectProduct={handleSelectProduct}
            />
          )}
          {activeTab === 'pedidos' && (
            <OrdersPage />
          )}
          {activeTab === 'recompensas' && (
            <OneRewardsCenter />
          )}
          {activeTab === 'carrito' && (
            <Cart 
              onNavigate={setActiveTab}
              onSelectProduct={handleSelectProduct}
            />
          )}
          {activeTab === 'proveedorPanel' && (
            <SupplierPanel />
          )}
          {activeTab === 'adminPanel' && (
            <AdminPanel />
          )}
        </main>

      </div>

      {/* 3. PRODUCT DETAIL & COMPARISON MODAL */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-end bg-zinc-950/50 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-[#0c0c0f] border-l border-zinc-200 dark:border-zinc-800 w-full max-w-2xl h-full shadow-2xl flex flex-col justify-between overflow-hidden animate-slide-in">
            
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-zinc-100 dark:border-zinc-900 flex justify-between items-center shrink-0">
              <div>
                <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/10 px-1.5 py-0.5 rounded uppercase tracking-wider">
                  {selectedProduct.category}
                </span>
                <h2 className="text-sm font-bold text-zinc-950 dark:text-white mt-2">{selectedProduct.name}</h2>
              </div>
              <button
                onClick={() => setSelectedProduct(null)}
                className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 p-2 text-sm font-bold cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto flex-1 space-y-6">
              
              {/* Product overview banner */}
              <div className="flex gap-5 items-start">
                <div className="w-20 h-20 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800 flex items-center justify-center shrink-0 text-zinc-400 font-extrabold text-sm uppercase">
                  {selectedProduct.brand.slice(0, 3)}
                </div>
                <div className="space-y-1">
                  <h4 className="text-xs text-zinc-400">Marca: <strong className="text-zinc-700 dark:text-zinc-200 font-semibold">{selectedProduct.brand}</strong></h4>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">{selectedProduct.description}</p>
                </div>
              </div>

              {/* Price comparison matrix */}
              <div className="space-y-3">
                <h4 className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1">
                  <Building2 size={13} />
                  Comparación de Precios de Proveedores
                </h4>
                <div className="border border-zinc-200 dark:border-zinc-800 rounded-xl bg-white dark:bg-zinc-950 overflow-hidden shadow-sm">
                  {listings.filter(l => l.productId === selectedProduct.id).length > 0 ? (
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="border-b border-zinc-200 dark:border-zinc-800 text-zinc-400 font-medium">
                          <th className="py-2.5 px-3">Proveedor</th>
                          <th className="py-2.5 px-3">Condición</th>
                          <th className="py-2.5 px-3">Calificación</th>
                          <th className="py-2.5 px-3">Entrega</th>
                          <th className="py-2.5 px-3">Precio</th>
                          <th className="py-2.5 px-3 text-right">Acción</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-100 dark:divide-zinc-900">
                        {listings.filter(l => l.productId === selectedProduct.id).map(l => {
                          const sup = suppliers.find(s => s.id === l.supplierId)!;
                          return (
                            <tr key={l.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-900/40">
                              <td className="py-3 px-3 font-semibold text-zinc-900 dark:text-zinc-150">
                                <div>{sup.name}</div>
                                <span className="text-[9px] text-zinc-450 font-normal">{sup.location}</span>
                              </td>
                              <td className="py-3 px-3 text-zinc-500">
                                <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-zinc-100 dark:bg-zinc-800">{l.condition}</span>
                              </td>
                              <td className="py-3 px-3 font-semibold flex items-center gap-0.5 text-amber-500 mt-2.5">
                                <Star size={11} className="fill-amber-400 stroke-amber-400" />
                                {l.rating.toFixed(1)}
                              </td>
                              <td className="py-3 px-3 text-zinc-500">{l.deliveryHours}h</td>
                              <td className="py-3 px-3 font-mono font-bold text-zinc-950 dark:text-white">S/. {l.price.toFixed(2)}</td>
                              <td className="py-3 px-3 text-right">
                                <button
                                  onClick={() => {
                                    addToCart(selectedProduct, l, 1);
                                    setSelectedProduct(null);
                                  }}
                                  disabled={l.stock === 0}
                                  className="bg-blue-600 hover:bg-blue-700 disabled:bg-zinc-200 text-white rounded px-2.5 py-1 text-[10px] font-semibold cursor-pointer shadow-sm"
                                >
                                  {l.stock === 0 ? 'Sin stock' : 'Añadir'}
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  ) : (
                    <div className="p-4 text-center text-zinc-400 text-xs">Sin stock con proveedores asociados.</div>
                  )}
                </div>
              </div>

              {/* Equivalence warning message */}
              <div className="p-3 bg-[#fdfcf7] dark:bg-[#12110c] border border-amber-250/20 dark:border-amber-900/30 rounded-xl text-[10px] text-amber-800 dark:text-amber-500 leading-normal">
                <strong>Aviso de Equivalencias:</strong> Las sugerencias de equivalencias y marcas alternativas se asocian de acuerdo con la categoría maestra y especificaciones técnicas. Verifica los detalles clínicos antes de la aplicación quirúrgica.
              </div>

              {/* Alternative Brands Suggestion Grid */}
              <div className="space-y-3">
                <h4 className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1">
                  <Star size={13} />
                  Marcas Equivalentes Recomendadas
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {products
                    .filter(p => p.category === selectedProduct.category && p.id !== selectedProduct.id)
                    .slice(0, 2)
                    .map(altProd => {
                      const altList = listings.filter(l => l.productId === altProd.id && l.stock > 0);
                      const minPrice = altList.length > 0 ? Math.min(...altList.map(l => l.price)) : null;

                      return (
                        <div 
                          key={altProd.id}
                          onClick={() => setSelectedProduct(altProd)}
                          className="p-3 rounded-xl border border-zinc-150 dark:border-zinc-900 bg-white dark:bg-zinc-950 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all flex gap-3 cursor-pointer"
                        >
                          <div className="w-10 h-10 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200/50 flex items-center justify-center text-zinc-400 font-bold text-[10px] uppercase">
                            {altProd.brand.slice(0, 2)}
                          </div>
                          <div className="space-y-0.5 overflow-hidden">
                            <h5 className="font-bold text-zinc-900 dark:text-white truncate">{altProd.name}</h5>
                            <p className="text-[10px] text-zinc-400 truncate">{altProd.brand}</p>
                            {minPrice && <span className="text-[10px] text-emerald-600 font-mono font-bold">Desde S/. {minPrice.toFixed(2)}</span>}
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>

              {/* Technical Specifications */}
              <div className="space-y-3">
                <h4 className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1">
                  <Info size={13} />
                  Especificaciones Técnicas
                </h4>
                <div className="border border-zinc-200 dark:border-zinc-800 rounded-xl bg-zinc-50/50 dark:bg-zinc-900/20 divide-y divide-zinc-250/20 overflow-hidden">
                  {Object.entries(selectedProduct.specifications).map(([key, val]) => (
                    <div key={key} className="p-3 flex justify-between gap-4 text-xs">
                      <span className="text-zinc-400 font-medium">{key}</span>
                      <span className="text-zinc-800 dark:text-zinc-200 text-right">{val}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 bg-zinc-50 dark:bg-zinc-950 border-t border-zinc-100 dark:border-zinc-900 shrink-0">
              <button
                onClick={() => setSelectedProduct(null)}
                className="w-full text-center py-2.5 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-850 rounded-lg text-xs font-bold text-zinc-700 dark:text-zinc-300 transition-colors cursor-pointer"
              >
                Cerrar Detalles
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

// Global helper toast message
let triggerToast: (msg: string) => void = () => {};

export const App: React.FC = () => {
  const [toastText, setToastText] = useState<string | null>(null);

  triggerToast = (msg: string) => {
    setToastText(msg);
    setTimeout(() => setToastText(null), 3000);
  };

  return (
    <UserProvider>
      <CartProvider>
        <AppContent />
        {toastText && (
          <div className="fixed bottom-6 right-6 z-50 bg-zinc-950 dark:bg-zinc-50 dark:text-zinc-950 text-white border border-zinc-800 px-4 py-3 rounded-xl shadow-2xl text-xs font-bold flex items-center gap-2 animate-fade-in">
            <CheckCircle2 size={15} className="text-emerald-500" />
            {toastText}
          </div>
        )}
      </CartProvider>
    </UserProvider>
  );
};

export default App;
