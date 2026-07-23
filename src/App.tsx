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
  Menu, LogOut, Package, Award, Settings, CheckCircle2, ChevronRight
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
  
  const { cartItems, recommendations, cartTotals } = useCart();
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
    <div className="min-h-screen bg-zinc-50 dark:bg-[#09090b] text-zinc-900 dark:text-zinc-50 flex flex-col transition-colors duration-300">
      
      {/* 1. DOUBLE-ROW FIXED HEADER */}
      <header className="w-full bg-white dark:bg-[#0c0c0f] border-b border-zinc-200 dark:border-zinc-800 sticky top-0 z-40">
        
        {/* ROW 1: Branding, Main Search, Actions & Accounts */}
        <div className="max-w-[1440px] mx-auto px-6 py-3 flex justify-between items-center gap-4">
          
          {/* Logo & Platform ID */}
          <div 
            onClick={() => setViewMode('landing')}
            className="flex items-center gap-2 cursor-pointer hover:opacity-90 shrink-0"
          >
            <div className="w-7 h-7 rounded bg-blue-600 flex items-center justify-center text-white font-extrabold text-base shadow-sm">
              O
            </div>
            <span className="text-base font-black tracking-tight text-zinc-950 dark:text-white">OneShop</span>
            <span className="text-[8px] uppercase font-bold tracking-widest bg-zinc-100 dark:bg-zinc-850 text-zinc-500 dark:text-zinc-400 px-1 py-0.5 rounded border border-zinc-200 dark:border-zinc-800">
              B2B
            </span>
          </div>

          {/* Large Central Search Bar */}
          <form onSubmit={handleHeaderSearch} className="flex-1 max-w-xl hidden md:block">
            <div className="relative flex items-center bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 py-1.5 focus-within:ring-2 focus-within:ring-blue-500/30 transition-all">
              <Search className="text-zinc-400 mr-2 shrink-0" size={16} />
              <input
                id="headerSearch"
                type="text"
                placeholder="Busca un producto, marca, proveedor o describe lo que necesitas..."
                className="w-full bg-transparent border-none text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none placeholder-zinc-400"
              />
              <button 
                type="submit" 
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-3 py-1 rounded-lg text-[10px] transition-colors cursor-pointer"
              >
                Buscar
              </button>
            </div>
          </form>

          {/* Quick Actions (Notifications, Favorites, Cart, Account menu) */}
          <div className="flex items-center gap-3 shrink-0">
            <ThemeToggle />

            {/* Favorites Icon */}
            <button 
              onClick={() => {
                if (user.role === 'comprador') {
                  setActiveTab('buscar');
                  setSearchInitialQuery('');
                  triggerToast('Cargando lista de favoritos...');
                }
              }}
              className="relative p-2 hover:bg-zinc-100 dark:hover:bg-zinc-850 rounded-lg text-zinc-500 dark:text-zinc-400 cursor-pointer transition-colors"
              title="Favoritos"
            >
              <Heart size={16} />
              {favoritesCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white font-mono text-[8px] font-black px-1 py-0.2 rounded-full">
                  {favoritesCount}
                </span>
              )}
            </button>

            {/* Notifications Icon with Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setShowNotificationMenu(!showNotificationMenu)}
                className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-850 rounded-lg text-zinc-500 dark:text-zinc-400 cursor-pointer transition-colors"
                title="Notificaciones"
              >
                <Bell size={16} />
                <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
              </button>

              {showNotificationMenu && (
                <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-[#0c0c0f] border border-zinc-200 dark:border-zinc-850 rounded-xl shadow-xl p-3 z-50 text-xs text-zinc-650 dark:text-zinc-400 space-y-2">
                  <div className="flex justify-between items-center pb-1.5 border-b border-zinc-100 dark:border-zinc-900">
                    <span className="font-bold text-zinc-900 dark:text-white">Notificaciones</span>
                    <button onClick={() => setShowNotificationMenu(false)} className="text-[10px] text-blue-500">Marcar leídas</button>
                  </div>
                  <div className="space-y-2">
                    <div className="p-2 rounded hover:bg-zinc-50 dark:hover:bg-zinc-900">
                      <p className="font-semibold text-zinc-900 dark:text-white">¡Ahorro Disponible!</p>
                      <p className="text-[10px] text-zinc-400 mt-0.5">Optimiza tu carrito de compras y ahorra S/. 185 en Dental Express.</p>
                    </div>
                    <div className="p-2 rounded hover:bg-zinc-50 dark:hover:bg-zinc-900">
                      <p className="font-semibold text-zinc-900 dark:text-white">Pedido Despachado</p>
                      <p className="text-[10px] text-zinc-400 mt-0.5">OdontoImport envió los insumos del pedido ORD-9811.</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Shopping Cart Icon in Header */}
            {user.role === 'comprador' && (
              <button 
                onClick={() => setActiveTab('carrito')}
                className="relative p-2 bg-zinc-50 hover:bg-zinc-100 dark:bg-zinc-900 dark:hover:bg-zinc-850 border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-600 dark:text-zinc-300 cursor-pointer transition-all flex items-center gap-1.5"
              >
                <ShoppingCart size={16} />
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
                className="flex items-center gap-1.5 p-1 hover:bg-zinc-150/40 dark:hover:bg-zinc-800/40 rounded-lg cursor-pointer transition-colors"
              >
                <div className="w-7 h-7 rounded-full bg-blue-600/10 text-blue-600 border border-blue-200/20 flex items-center justify-center font-bold text-xs uppercase">
                  {user.role === 'comprador' ? 'CC' : user.role === 'proveedor' ? 'PV' : 'AD'}
                </div>
                <ChevronDown size={14} className="text-zinc-400" />
              </button>

              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-[#0c0c0f] border border-zinc-200 dark:border-zinc-850 rounded-xl shadow-xl p-3 z-50 text-xs">
                  <div className="pb-2 border-b border-zinc-100 dark:border-zinc-900">
                    <p className="font-bold text-zinc-900 dark:text-white">
                      {user.role === 'comprador' ? user.clinicName : user.role === 'proveedor' ? 'DentMax Supply' : 'Admin Platform'}
                    </p>
                    <p className="text-[10px] text-zinc-400">{user.role === 'comprador' ? `RUC ${user.ruc}` : 'Acceso Autorizado'}</p>
                  </div>
                  
                  {/* Selector de Roles */}
                  <div className="py-2 space-y-1">
                    <span className="text-[9px] uppercase font-bold text-zinc-450 block px-2">Cambiar Rol (MVP)</span>
                    <button 
                      onClick={() => { setRole('comprador'); setActiveTab('resumen'); setShowUserMenu(false); }}
                      className={`w-full text-left px-2 py-1.5 rounded hover:bg-zinc-50 dark:hover:bg-zinc-900 font-medium ${user.role === 'comprador' ? 'text-blue-500 font-bold' : 'text-zinc-600 dark:text-zinc-450'}`}
                    >
                      Comprador (Odontólogo/Clínica)
                    </button>
                    <button 
                      onClick={() => { setRole('proveedor'); setSupplierId('s1'); setActiveTab('proveedorPanel'); setShowUserMenu(false); }}
                      className={`w-full text-left px-2 py-1.5 rounded hover:bg-zinc-50 dark:hover:bg-zinc-900 font-medium ${user.role === 'proveedor' ? 'text-blue-500 font-bold' : 'text-zinc-600 dark:text-zinc-450'}`}
                    >
                      Proveedor (Dental Express)
                    </button>
                    <button 
                      onClick={() => { setRole('administrador'); setActiveTab('adminPanel'); setShowUserMenu(false); }}
                      className={`w-full text-left px-2 py-1.5 rounded hover:bg-zinc-50 dark:hover:bg-zinc-900 font-medium ${user.role === 'administrador' ? 'text-blue-500 font-bold' : 'text-zinc-600 dark:text-zinc-450'}`}
                    >
                      Administrador (OneShop)
                    </button>
                  </div>
                  
                  <div className="pt-1.5 border-t border-zinc-100 dark:border-zinc-900">
                    <button 
                      onClick={() => { setViewMode('landing'); setShowUserMenu(false); }}
                      className="w-full text-left px-2 py-1.5 rounded hover:bg-rose-50 text-rose-500 font-semibold flex items-center gap-1.5"
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
          <div className="w-full border-t border-zinc-150 dark:border-zinc-900 bg-zinc-50/50 dark:bg-zinc-950/20 text-xs font-semibold text-zinc-600 dark:text-zinc-400">
            <div className="max-w-[1440px] mx-auto px-6 py-2 flex items-center gap-6 overflow-x-auto justify-between md:justify-start">
              
              {/* Dropdowns */}
              <div className="flex gap-4">
                {/* Comprar por Categoría */}
                <div className="relative">
                  <button 
                    onClick={() => { setShowCategoryMenu(!showCategoryMenu); setShowSupplierMenu(false); setShowBrandMenu(false); }}
                    className="hover:text-blue-600 flex items-center gap-1 cursor-pointer"
                  >
                    Categorías <ChevronDown size={12} />
                  </button>
                  {showCategoryMenu && (
                    <div className="absolute left-0 mt-2.5 w-48 bg-white dark:bg-[#0c0c0f] border border-zinc-200 dark:border-zinc-850 rounded-xl shadow-xl p-2 z-50 space-y-1">
                      {categoriesList.map(cat => (
                        <button
                          key={cat}
                          onClick={() => {
                            setActiveTab('buscar');
                            setSearchInitialQuery(cat);
                            setShowCategoryMenu(false);
                          }}
                          className="w-full text-left px-2.5 py-1.5 text-xs hover:bg-zinc-50 dark:hover:bg-zinc-900 rounded-md text-zinc-700 dark:text-zinc-300 transition-colors"
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
                    className="hover:text-blue-600 flex items-center gap-1 cursor-pointer"
                  >
                    Proveedores <ChevronDown size={12} />
                  </button>
                  {showSupplierMenu && (
                    <div className="absolute left-0 mt-2.5 w-52 bg-white dark:bg-[#0c0c0f] border border-zinc-200 dark:border-zinc-850 rounded-xl shadow-xl p-2 z-50 space-y-1">
                      {suppliers.map(sup => (
                        <button
                          key={sup.id}
                          onClick={() => {
                            setActiveTab('buscar');
                            setSearchInitialQuery(sup.name);
                            setShowSupplierMenu(false);
                          }}
                          className="w-full text-left px-2.5 py-1.5 text-xs hover:bg-zinc-50 dark:hover:bg-zinc-900 rounded-md text-zinc-700 dark:text-zinc-300 transition-colors"
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
                    className="hover:text-blue-600 flex items-center gap-1 cursor-pointer"
                  >
                    Marcas <ChevronDown size={12} />
                  </button>
                  {showBrandMenu && (
                    <div className="absolute left-0 mt-2.5 w-44 bg-white dark:bg-[#0c0c0f] border border-zinc-200 dark:border-zinc-850 rounded-xl shadow-xl p-2 z-50 space-y-1 max-h-60 overflow-y-auto">
                      {brandsList.map(brand => (
                        <button
                          key={brand}
                          onClick={() => {
                            setActiveTab('buscar');
                            setSearchInitialQuery(brand);
                            setShowBrandMenu(false);
                          }}
                          className="w-full text-left px-2.5 py-1.5 text-xs hover:bg-zinc-50 dark:hover:bg-zinc-900 rounded-md text-zinc-700 dark:text-zinc-300 transition-colors"
                        >
                          {brand}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Navigation tabs shortcut */}
              <div className="h-4 w-px bg-zinc-200 dark:bg-zinc-800 hidden md:block" />

              <div className="flex gap-4">
                <button onClick={() => { setActiveTab('buscar'); setSearchInitialQuery(''); }} className={`hover:text-zinc-950 dark:hover:text-white cursor-pointer ${activeTab === 'buscar' ? 'text-blue-500 font-bold' : ''}`}>Ver productos</button>
                <button onClick={() => { setActiveTab('buscar'); setSearchInitialQuery('Filtek'); }} className="hover:text-zinc-950 dark:hover:text-white cursor-pointer">Más vendidos</button>
                <button onClick={() => { setActiveTab('buscar'); setSearchInitialQuery('anestesia'); }} className="hover:text-zinc-950 dark:hover:text-white cursor-pointer text-emerald-600 dark:text-emerald-500">Promociones</button>
                <button onClick={() => setActiveTab('kits')} className={`hover:text-zinc-950 dark:hover:text-white cursor-pointer ${activeTab === 'kits' ? 'text-blue-500 font-bold' : ''}`}>Kits Inteligentes</button>
                <button onClick={() => setActiveTab('asistente')} className={`hover:text-zinc-950 dark:hover:text-white cursor-pointer flex items-center gap-0.5 ${activeTab === 'asistente' ? 'text-blue-500 font-bold' : ''}`}><Sparkles size={11} className="text-blue-500" /> Ayúdame a comprar</button>
                <button onClick={() => setActiveTab('recompensas')} className={`hover:text-zinc-950 dark:hover:text-white cursor-pointer flex items-center gap-0.5 text-amber-600 dark:text-amber-500 ${activeTab === 'recompensas' ? 'font-bold' : ''}`}><Star size={11} className="fill-amber-500 stroke-amber-500" /> OneRewards</button>
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
                                    const { addToCart: add } = useCart();
                                    add(selectedProduct, l, 1);
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
