import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import { suppliers, products } from '../data/mockData';
import { TrendingUp, Users, Building2, ShoppingBag, ShieldCheck, CheckCircle2, Award, Percent, Plus, Edit3, Trash2, ArrowUpRight, Search, Settings } from 'lucide-react';

export const AdminPanel: React.FC = () => {
  const { orders } = useUser();
  const [activeSubTab, setActiveSubTab] = useState<'resumen' | 'aprobaciones' | 'categorias' | 'rewards'>('resumen');
  
  // Simulated admin configurations
  const [rewardsConfig, setRewardsConfig] = useState({
    earnRate: 1.0,
    welcomePoints: 500,
    referralPoints: 1000,
    pointValue: 0.10,
    plusThreshold: 1000,
    proThreshold: 3000,
    eliteThreshold: 8000
  });

  // Simulated pending suppliers
  const [pendingSuppliers, setPendingSuppliers] = useState([
    { id: 'p_s1', name: 'Dental Sur Import S.A.C.', location: 'Arequipa', RUC: '20509876543', category: 'Ortodoncia & Implantes', contact: 'Dr. Hugo Benavides' },
    { id: 'p_s2', name: 'Dentales del Centro', location: 'Huancayo', RUC: '20601289456', category: 'Operatoria & Instrumental', contact: 'Ing. Carlos Ramos' },
    { id: 'p_s3', name: 'Lima Dental Distribuidora', location: 'Lima Cercado', RUC: '20405678123', category: 'Equipamiento & Esterilización', contact: 'Sra. Patricia Wong' }
  ]);

  // Master categories list state
  const [categories, setCategories] = useState([
    { name: 'Operatoria', count: 8 },
    { name: 'Endodoncia', count: 9 },
    { name: 'Ortodoncia', count: 5 },
    { name: 'Cirugía', count: 5 },
    { name: 'Implantología', count: 4 },
    { name: 'Bioseguridad', count: 4 },
    { name: 'Instrumental', count: 4 },
    { name: 'Equipamiento', count: 4 },
    { name: 'Esterilización', count: 4 },
    { name: 'Odontología digital', count: 2 }
  ]);

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [newCatName, setNewCatName] = useState('');

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Calculations for dashboard
  const totalGMV = orders.reduce((sum, o) => sum + o.total, 0) + 120000; // adding baseline history
  const totalCommissions = totalGMV * 0.05; // 5% flat commission fee
  const averageTicket = totalGMV / (orders.length + 95); // averaging ticket
  
  const handleApproveSupplier = (id: string, name: string) => {
    setPendingSuppliers(prev => prev.filter(s => s.id !== id));
    triggerToast(`¡Proveedor "${name}" aprobado! Se le envió su cuenta de acceso B2B.`);
  };

  const handleRejectSupplier = (id: string, name: string) => {
    setPendingSuppliers(prev => prev.filter(s => s.id !== id));
    triggerToast(`Proveedor "${name}" rechazado de la plataforma.`);
  };

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatName.trim()) return;
    setCategories([...categories, { name: newCatName.trim(), count: 0 }]);
    setNewCatName('');
    triggerToast('Nueva categoría maestra creada en el catálogo.');
  };

  const handleDeleteCategory = (name: string) => {
    if (window.confirm(`¿Seguro que deseas eliminar la categoría "${name}"?`)) {
      setCategories(prev => prev.filter(c => c.name !== name));
      triggerToast('Categoría maestra eliminada.');
    }
  };

  const handleSaveRewardsConfig = (e: React.FormEvent) => {
    e.preventDefault();
    triggerToast('Configuración del programa OneRewards actualizada correctamente.');
  };

  return (
    <div className="space-y-6 animate-fade-in relative">
      {/* Toast alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-zinc-950 dark:bg-zinc-50 dark:text-zinc-950 text-white border border-zinc-800 px-4 py-3 rounded-xl shadow-2xl text-xs font-bold flex items-center gap-2 animate-fade-in">
          <CheckCircle2 size={15} className="text-emerald-500" />
          {toastMessage}
        </div>
      )}

      {/* Admin Panel Header */}
      <div className="p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#0c0c0f] shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-1.5 flex-1">
          <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-2 py-0.5 rounded uppercase tracking-wider">
            CONSOLA DE ADMINISTRADOR DE ONESHOP
          </span>
          <h1 className="text-xl font-bold text-zinc-950 dark:text-white flex items-center gap-2">
            Administración General
          </h1>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Supervisa el GMV de la plataforma, comisiones generadas, solicitudes de nuevos proveedores y configuraciones de fidelización.
          </p>
        </div>

        {/* Sub-tab selection */}
        <div className="flex bg-zinc-100 dark:bg-zinc-900 rounded-lg p-1 text-xs shrink-0 self-start md:self-auto">
          {[
            { id: 'resumen', label: 'Resumen Métricas' },
            { id: 'aprobaciones', label: 'Aprobar Proveedores' },
            { id: 'categorias', label: 'Categorías Catálogo' },
            { id: 'rewards', label: 'Configuración OneRewards' }
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

      {/* RESUMEN TAB */}
      {activeSubTab === 'resumen' && (
        <div className="space-y-6">
          {/* Key Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#0c0c0f] shadow-sm flex flex-col justify-between">
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">Volumen Bruto (GMV)</span>
              <div className="text-xl font-bold tracking-tight text-zinc-950 dark:text-white mt-3 font-mono">
                S/. {totalGMV.toLocaleString('es-PE', { minimumFractionDigits: 2 })}
              </div>
              <p className="text-[10px] text-zinc-400 mt-1">Transacciones totales canalizadas</p>
            </div>

            <div className="p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#0c0c0f] shadow-sm flex flex-col justify-between">
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">Comisión Recaudada (5%)</span>
              <div className="text-xl font-bold tracking-tight text-zinc-950 dark:text-white mt-3 font-mono text-blue-600 dark:text-blue-400">
                S/. {totalCommissions.toLocaleString('es-PE', { minimumFractionDigits: 2 })}
              </div>
              <p className="text-[10px] text-zinc-400 mt-1">Ingresos netos de la plataforma</p>
            </div>

            <div className="p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#0c0c0f] shadow-sm flex flex-col justify-between">
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">Ticket Promedio Orden</span>
              <div className="text-xl font-bold tracking-tight text-zinc-950 dark:text-white mt-3 font-mono">
                S/. {averageTicket.toLocaleString('es-PE', { minimumFractionDigits: 2 })}
              </div>
              <p className="text-[10px] text-zinc-400 mt-1">Gasto consolidado por compra</p>
            </div>

            <div className="p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#0c0c0f] shadow-sm flex flex-col justify-between">
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">Ahorro Generado a Dentistas</span>
              <div className="text-xl font-bold tracking-tight text-zinc-950 dark:text-white mt-3 text-emerald-500 font-mono">
                S/. 14,580.00
              </div>
              <p className="text-[10px] text-zinc-400 mt-1">Por comparativas y equivalencias</p>
            </div>
          </div>

          {/* User count & searches stats */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Registered Users */}
            <div className="p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#0c0c0f] shadow-sm space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 pb-2 border-b border-zinc-100 dark:border-zinc-900">
                Usuarios Registrados
              </h3>
              
              <div className="divide-y divide-zinc-100 dark:divide-zinc-900 text-xs">
                <div className="py-2.5 flex justify-between">
                  <span className="text-zinc-500">Clínicas Dentales activas</span>
                  <span className="font-bold text-zinc-900 dark:text-white">45 clínicas</span>
                </div>
                <div className="py-2.5 flex justify-between">
                  <span className="text-zinc-500">Proveedores Odontológicos activos</span>
                  <span className="font-bold text-zinc-900 dark:text-white">10 distribuidores</span>
                </div>
                <div className="py-2.5 flex justify-between">
                  <span className="text-zinc-500">Puntos OneRewards acumulados totales</span>
                  <span className="font-bold text-amber-600">54,320 pts</span>
                </div>
                <div className="py-2.5 flex justify-between">
                  <span className="text-zinc-500">Puntos canjeados en descuentos</span>
                  <span className="font-bold text-zinc-600">12,400 pts</span>
                </div>
              </div>
            </div>

            {/* Searches statistics */}
            <div className="lg:col-span-2 p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#0c0c0f] shadow-sm space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 pb-2 border-b border-zinc-100 dark:border-zinc-900">
                Términos Más Buscados e Incidencias de Búsqueda
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
                <div>
                  <h4 className="font-bold text-zinc-800 dark:text-zinc-300 mb-2">Búsquedas Más Frecuentes</h4>
                  <ul className="space-y-1.5 font-mono text-[11px] text-zinc-600 dark:text-zinc-400">
                    <li className="flex justify-between"><span>1. "resina filtek z350"</span> <span className="font-bold text-zinc-800 dark:text-zinc-200">145 búsq.</span></li>
                    <li className="flex justify-between"><span>2. "guantes nitrilo m"</span> <span className="font-bold text-zinc-800 dark:text-zinc-200">98 búsq.</span></li>
                    <li className="flex justify-between"><span>3. "necesito todo para endodoncia"</span> <span className="font-bold text-zinc-800 dark:text-zinc-200">64 búsq.</span></li>
                    <li className="flex justify-between"><span>4. "turbina de alta velocidad"</span> <span className="font-bold text-zinc-800 dark:text-zinc-200">48 búsq.</span></li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold text-rose-500 mb-2">Consultas Sin Resultados (Alerta Catálogo)</h4>
                  <ul className="space-y-1.5 font-mono text-[11px] text-zinc-600 dark:text-zinc-400">
                    <li className="flex justify-between"><span>1. "resina inyectable bulk"</span> <span className="font-bold text-rose-500">12 fallos</span></li>
                    <li className="flex justify-between"><span>2. "limas reciprocantes blue"</span> <span className="font-bold text-rose-500">8 fallos</span></li>
                    <li className="flex justify-between"><span>3. "fresa carburo esferica 014"</span> <span className="font-bold text-rose-500">5 fallos</span></li>
                    <li className="flex justify-between"><span>4. "camara intraoral inalambrica"</span> <span className="font-bold text-rose-500">3 fallos</span></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* APROBACIONES TAB */}
      {activeSubTab === 'aprobaciones' && (
        <div className="p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#0c0c0f] shadow-sm space-y-4">
          <div className="pb-2 border-b border-zinc-100 dark:border-zinc-900">
            <h2 className="text-sm font-bold text-zinc-950 dark:text-white">Solicitudes de Proveedores Pendientes</h2>
            <p className="text-[11px] text-zinc-400 mt-0.5">Valida el RUC y los datos de contacto antes de aprobar su integración al catálogo.</p>
          </div>

          <div className="space-y-4">
            {pendingSuppliers.map((sup) => (
              <div 
                key={sup.id} 
                className="p-4 rounded-xl border border-zinc-150 dark:border-zinc-900 bg-zinc-50/20 dark:bg-zinc-950/20 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-xs"
              >
                <div className="space-y-1">
                  <h4 className="font-bold text-zinc-900 dark:text-white text-sm">{sup.name}</h4>
                  <p className="text-[10px] text-zinc-500">
                    RUC: <span className="font-mono text-zinc-700 dark:text-zinc-300 font-bold">{sup.RUC}</span> • Ubicación: {sup.location}
                  </p>
                  <p className="text-[10px] text-zinc-500">
                    Especialidad: {sup.category} • Contacto comercial: <span className="font-semibold text-zinc-700 dark:text-zinc-350">{sup.contact}</span>
                  </p>
                </div>

                <div className="flex gap-2 shrink-0">
                  <button
                    onClick={() => handleRejectSupplier(sup.id, sup.name)}
                    className="px-3 py-1.5 border border-rose-200 hover:bg-rose-50 text-rose-600 rounded-lg text-xs font-semibold cursor-pointer"
                  >
                    Rechazar
                  </button>
                  <button
                    onClick={() => handleApproveSupplier(sup.id, sup.name)}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-3 py-1.5 rounded-lg text-xs transition-colors shadow-sm cursor-pointer"
                  >
                    Aprobar Ingreso
                  </button>
                </div>
              </div>
            ))}
            {pendingSuppliers.length === 0 && (
              <p className="text-center py-10 text-zinc-400 text-xs">No hay nuevas solicitudes de ingreso de proveedores odontológicos.</p>
            )}
          </div>
        </div>
      )}

      {/* CATEGORIAS TAB */}
      {activeSubTab === 'categorias' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-xs">
          
          {/* Categories list (2 cols) */}
          <div className="lg:col-span-2 p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#0c0c0f] shadow-sm space-y-4">
            <h2 className="text-sm font-bold text-zinc-950 dark:text-white pb-2 border-b border-zinc-100 dark:border-zinc-900">
              Categorías Maestras del Catálogo
            </h2>

            <div className="border border-zinc-200 dark:border-zinc-850 rounded-xl bg-white dark:bg-zinc-950 overflow-hidden divide-y divide-zinc-150 dark:divide-zinc-900">
              {categories.map((c) => (
                <div key={c.name} className="p-3 flex justify-between items-center">
                  <div>
                    <span className="font-bold text-zinc-900 dark:text-zinc-200">{c.name}</span>
                    <span className="text-[10px] text-zinc-450 block">{c.count} productos activos</span>
                  </div>
                  <button
                    onClick={() => handleDeleteCategory(c.name)}
                    disabled={c.count > 0}
                    className="p-1.5 hover:bg-rose-50 text-zinc-400 hover:text-rose-600 rounded disabled:opacity-30 disabled:hover:bg-transparent cursor-pointer"
                    title={c.count > 0 ? "No se puede borrar una categoría con productos activos" : "Eliminar"}
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Add Category Form (1 col) */}
          <div className="p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#0c0c0f] shadow-sm space-y-4 self-start">
            <h3 className="font-bold text-zinc-850 dark:text-zinc-200">Añadir Nueva Categoría</h3>
            
            <form onSubmit={handleAddCategory} className="space-y-4">
              <div className="space-y-1">
                <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-400">Nombre de la Categoría</label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Ortodoncia Estética"
                  value={newCatName}
                  onChange={(e) => setNewCatName(e.target.value)}
                  className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-2 text-xs text-zinc-850 dark:text-zinc-250 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-lg transition-colors flex items-center justify-center gap-1 shadow-sm cursor-pointer text-xs"
              >
                <Plus size={14} />
                Crear Categoría
              </button>
            </form>
          </div>
        </div>
      )}

      {/* REWARDS CONFIG TAB */}
      {activeSubTab === 'rewards' && (
        <div className="p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#0c0c0f] shadow-sm space-y-6">
          <div className="pb-2 border-b border-zinc-100 dark:border-zinc-900">
            <h2 className="text-sm font-bold text-zinc-950 dark:text-white">Ajustes del Programa OneRewards</h2>
            <p className="text-[11px] text-zinc-400 mt-0.5">Controla la tasa de acumulación de puntos, bonos de bienvenida e incentivos de referidos.</p>
          </div>

          <form onSubmit={handleSaveRewardsConfig} className="space-y-6 text-xs max-w-2xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-400">Puntos Emitidos por S/. 1.00 Gastado</label>
                <input
                  type="number"
                  step="0.1"
                  required
                  value={rewardsConfig.earnRate}
                  onChange={(e) => setRewardsConfig(prev => ({ ...prev, earnRate: Number(e.target.value) }))}
                  className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded p-2 text-zinc-850 dark:text-zinc-200"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-400">Bono Puntos de Bienvenida (Registro)</label>
                <input
                  type="number"
                  required
                  value={rewardsConfig.welcomePoints}
                  onChange={(e) => setRewardsConfig(prev => ({ ...prev, welcomePoints: Number(e.target.value) }))}
                  className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded p-2 text-zinc-850 dark:text-zinc-200"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-400">Puntos por Referencia Exitosa</label>
                <input
                  type="number"
                  required
                  value={rewardsConfig.referralPoints}
                  onChange={(e) => setRewardsConfig(prev => ({ ...prev, referralPoints: Number(e.target.value) }))}
                  className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded p-2 text-zinc-850 dark:text-zinc-200"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-400">Valor de Descuento por 1 Punto (S/.)</label>
                <input
                  type="number"
                  step="0.01"
                  required
                  value={rewardsConfig.pointValue}
                  onChange={(e) => setRewardsConfig(prev => ({ ...prev, pointValue: Number(e.target.value) }))}
                  className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded p-2 text-zinc-850 dark:text-zinc-200"
                />
              </div>
            </div>

            <div className="space-y-3 pt-3 border-t border-zinc-100 dark:border-zinc-900">
              <h3 className="font-bold text-zinc-800 dark:text-zinc-200">Límites de Puntos para Niveles (Suscripción)</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-1">
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-400">Mínimo para Plus (pts)</label>
                  <input
                    type="number"
                    value={rewardsConfig.plusThreshold}
                    onChange={(e) => setRewardsConfig(prev => ({ ...prev, plusThreshold: Number(e.target.value) }))}
                    className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded p-2 text-zinc-850 dark:text-zinc-200"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-400">Mínimo para Pro (pts)</label>
                  <input
                    type="number"
                    value={rewardsConfig.proThreshold}
                    onChange={(e) => setRewardsConfig(prev => ({ ...prev, proThreshold: Number(e.target.value) }))}
                    className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded p-2 text-zinc-850 dark:text-zinc-200"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-400">Mínimo para Elite (pts)</label>
                  <input
                    type="number"
                    value={rewardsConfig.eliteThreshold}
                    onChange={(e) => setRewardsConfig(prev => ({ ...prev, eliteThreshold: Number(e.target.value) }))}
                    className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded p-2 text-zinc-850 dark:text-zinc-200"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end border-t border-zinc-100 dark:border-zinc-900 pt-4">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-2.5 rounded-lg text-xs transition-colors shadow-sm flex items-center gap-1.5 cursor-pointer"
              >
                <Settings size={14} />
                Guardar Configuración
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
