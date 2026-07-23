import React, { useState, useEffect } from 'react';
import { useUser } from '../context/UserContext';
import { Award, Star, Share2, Clipboard, ArrowRight, CheckCircle2, History, ChevronRight, Gift, Percent, HelpCircle } from 'lucide-react';

export const OneRewardsCenter: React.FC = () => {
  const { user, pointsHistory, addPoints } = useUser();
  const [copied, setCopied] = useState(false);
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Check if it's the clinic's first time visiting the center to show a welcome modal
  useEffect(() => {
    const hasSeenWelcome = localStorage.getItem('oneshop_seen_rewards_welcome');
    if (!hasSeenWelcome) {
      setShowWelcomeModal(true);
      localStorage.setItem('oneshop_seen_rewards_welcome', 'true');
    }
  }, []);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(user.referralCode);
    setCopied(true);
    showToast('¡Enlace de referido copiado al portapapeles!');
    setTimeout(() => setCopied(false), 2000);
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Determine Tier and thresholds
  const getTierDetails = (points: number) => {
    if (points <= 1000) {
      return {
        name: 'Essential',
        nextName: 'Plus',
        min: 0,
        max: 1000,
        progress: (points / 1000) * 100,
        color: 'text-zinc-500 border-zinc-200 bg-zinc-50 dark:bg-zinc-950 dark:border-zinc-800',
        badgeColor: 'bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300',
        benefits: ['Acumulación base (1 punto por S/. 1 gastado)', 'Acceso al catálogo unificado', 'Soporte estándar']
      };
    } else if (points <= 3000) {
      return {
        name: 'Plus',
        nextName: 'Pro',
        min: 1000,
        max: 3000,
        progress: ((points - 1000) / 2000) * 100,
        color: 'text-blue-600 border-blue-200 bg-blue-50/20 dark:border-blue-900/20 dark:bg-blue-950/10',
        badgeColor: 'bg-blue-50 text-blue-700 dark:bg-blue-950/35 dark:text-blue-400',
        benefits: ['Acumulación acelerada (1.1x puntos)', 'S/. 5 de descuento en todos los envíos', 'Acceso a kits procedimentales estándar']
      };
    } else if (points <= 8000) {
      return {
        name: 'Pro',
        nextName: 'Elite',
        min: 3000,
        max: 8000,
        progress: ((points - 3000) / 5000) * 100,
        color: 'text-amber-600 border-amber-200 bg-amber-50/20 dark:border-amber-900/20 dark:bg-amber-950/10',
        badgeColor: 'bg-amber-50 text-amber-700 dark:bg-amber-950/35 dark:text-amber-400',
        benefits: ['Acumulación avanzada (1.2x puntos)', 'Envío gratis en compras mayores a S/. 200', 'Acceso anticipado a promociones y CyberDent']
      };
    } else {
      return {
        name: 'Elite',
        nextName: 'Máximo',
        min: 8000,
        max: 20000,
        progress: 100,
        color: 'text-purple-600 border-purple-200 bg-purple-50/20 dark:border-purple-900/20 dark:bg-purple-950/10',
        badgeColor: 'bg-purple-50 text-purple-700 dark:bg-purple-950/35 dark:text-purple-400',
        benefits: ['Multiplicador máximo (1.5x puntos)', 'Envío gratis garantizado en todas las compras', 'Soporte prioritario 24/7 con ejecutivo dedicado']
      };
    }
  };

  const tier = getTierDetails(user.points);
  const monetaryValue = user.points * 0.10; // S/. 0.10 per point (10 points = S/. 1.00)

  const rewardCoupons = [
    { id: 'c1', title: 'Cupón de Descuento S/. 20', pointsCost: 2000, desc: 'Ahorro directo en tu próximo pedido consolidado. Compra mínima de S/. 200.', value: 20 },
    { id: 'c2', title: 'Envío Gratis Dental Express', pointsCost: 500, desc: 'Omite el costo de envío de Dental Express en tu siguiente compra de cualquier monto.', value: 15 },
    { id: 'c3', title: 'Cupón de Descuento S/. 50', pointsCost: 4500, desc: 'Ahorro directo en tu próximo pedido consolidado. Compra mínima de S/. 400.', value: 50 },
    { id: 'c4', title: 'Campaña Duplica Puntos (24h)', pointsCost: 1000, desc: 'Activa la acumulación al doble (2x puntos) en todas las compras realizadas en las siguientes 24 horas.', value: 0 }
  ];

  const handleRedeem = (couponName: string, cost: number) => {
    if (user.points < cost) {
      showToast('No tienes suficientes puntos para canjear este premio.');
      return;
    }
    // Perform simulated redemption
    addPoints(-cost, `Canjeado: ${couponName}`);
    showToast(`¡Cupón "${couponName}" canjeado con éxito! Se aplicará automáticamente en tu checkout.`);
  };

  return (
    <div className="space-y-8 animate-fade-in relative">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-zinc-950 dark:bg-zinc-50 dark:text-zinc-950 text-white border border-zinc-800 px-4 py-3 rounded-xl shadow-2xl text-xs font-bold flex items-center gap-2 animate-fade-in">
          <CheckCircle2 size={15} className="text-emerald-500" />
          {toastMessage}
        </div>
      )}

      {/* Recompensas Cream Hero Panel */}
      <div className="relative rounded-2xl border border-amber-200/60 dark:border-amber-900/30 bg-[#fdfcf7] dark:bg-[#12110c] p-6 overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm">
        <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/5 dark:bg-amber-400/5 rounded-full blur-2xl pointer-events-none" />
        <div className="space-y-3 relative z-10 flex-1">
          <span className="inline-flex items-center gap-1 bg-amber-100/50 dark:bg-amber-950/20 text-amber-700 dark:text-amber-400 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">
            <Star size={11} className="fill-amber-500 stroke-amber-500" />
            PROGRAMA DE LEALTAD
          </span>
          <h1 className="text-2xl md:text-3xl font-black text-zinc-900 dark:text-amber-100 font-mono tracking-tight">OneRewards</h1>
          <p className="text-xs text-zinc-600 dark:text-zinc-400 max-w-xl leading-relaxed">
            Consigue puntos automáticos con cada insumo y equipo que adquiera tu clínica en la plataforma. Canjea descuentos directos en caja o consolida envíos gratis.
          </p>
        </div>
        
        {/* Points Display Badge */}
        <div className="p-5 rounded-xl bg-white dark:bg-[#0c0c0f] border border-amber-100 dark:border-zinc-800 shadow-md min-w-[200px] text-center space-y-1 relative z-10 self-start md:self-auto">
          <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 block">Puntos Disponibles</span>
          <div className="text-3xl font-black text-amber-600 font-mono">{user.points.toLocaleString()} <span className="text-xs text-zinc-400">PTS</span></div>
          <p className="text-[10px] text-zinc-400 font-semibold border-t border-zinc-100 dark:border-zinc-900 pt-1">
            Equivalente a S/. {monetaryValue.toFixed(2)} en descuentos
          </p>
        </div>
      </div>

      {/* Tier Status Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Progress & Current Tier (2 cols) */}
        <div className="lg:col-span-2 p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#0c0c0f] shadow-sm space-y-6">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-sm font-bold text-zinc-950 dark:text-white">Estado de Nivel de Clínica</h2>
              <p className="text-[11px] text-zinc-400 mt-0.5">El volumen de compras anuales determina los beneficios de tu clínica.</p>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-bold border uppercase tracking-wider ${tier.badgeColor}`}>
              NIVEL {tier.name}
            </span>
          </div>

          {/* Tier Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-zinc-500 font-semibold">
              <span>{user.points} pts acumulados</span>
              {tier.name !== 'Elite' ? (
                <span>Faltan {tier.max - user.points} pts para nivel {tier.nextName}</span>
              ) : (
                <span>Nivel máximo alcanzado</span>
              )}
            </div>
            <div className="w-full h-3 rounded-full bg-zinc-100 dark:bg-zinc-900 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-amber-500 to-amber-600 rounded-full transition-all duration-500"
                style={{ width: `${tier.progress}%` }}
              />
            </div>
            <div className="flex justify-between text-[9px] font-bold text-zinc-400 uppercase tracking-widest pt-1">
              <span>Essential (0)</span>
              <span>Plus (1K)</span>
              <span>Pro (3K)</span>
              <span>Elite (8K)</span>
            </div>
          </div>

          {/* Tier Benefits */}
          <div className="space-y-3 pt-3 border-t border-zinc-100 dark:border-zinc-900">
            <h3 className="text-xs font-bold text-zinc-800 dark:text-zinc-200 flex items-center gap-1.5">
              <Award size={15} className="text-amber-500" />
              Beneficios Activos del Nivel
            </h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
              {tier.benefits.map((benefit, i) => (
                <li key={i} className="flex items-center gap-2 text-zinc-600 dark:text-zinc-300">
                  <CheckCircle2 size={13} className="text-emerald-500 shrink-0" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Clinical Referrals Card (1 col) */}
        <div className="p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#0c0c0f] shadow-sm flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <h2 className="text-sm font-bold text-zinc-950 dark:text-white flex items-center gap-1.5">
              <Share2 size={16} className="text-blue-500" />
              Recomienda y Gana
            </h2>
            <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-relaxed">
              Comparte tu enlace de referido con otros odontólogos. Gana <strong className="text-amber-600 font-bold font-mono">1,000 puntos</strong> (S/. 100 de descuento) automáticamente cuando realicen su primera compra.
            </p>
          </div>

          <div className="space-y-3">
            <div className="relative">
              <input
                type="text"
                readOnly
                value={user.referralCode}
                className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-850 rounded-lg pl-3 pr-10 py-2.5 text-[10px] font-mono text-zinc-600 dark:text-zinc-300 focus:outline-none"
              />
              <button
                onClick={copyToClipboard}
                className="absolute right-1 top-1 p-1.5 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 rounded-md text-zinc-500 cursor-pointer"
                title="Copiar Enlace"
              >
                <Clipboard size={14} />
              </button>
            </div>
            
            <div className="flex justify-between items-center text-[10px] text-zinc-400 font-semibold uppercase tracking-wider bg-zinc-50 dark:bg-zinc-950 p-2.5 rounded-lg border border-zinc-150/40 dark:border-zinc-900">
              <span>Clínicas recomendadas:</span>
              <span className="font-bold text-zinc-900 dark:text-white font-mono text-xs">{user.referredCount} registradas</span>
            </div>
          </div>
        </div>

      </div>

      {/* Rewards Catalog */}
      <div className="space-y-4">
        <div className="flex justify-between items-center pb-2 border-b border-zinc-200 dark:border-zinc-800">
          <h2 className="text-sm font-bold text-zinc-950 dark:text-white flex items-center gap-1.5">
            <Gift size={16} className="text-zinc-500" />
            Centro de Canjes OneRewards
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {rewardCoupons.map((coupon) => {
            const canAfford = user.points >= coupon.pointsCost;
            return (
              <div 
                key={coupon.id} 
                className={`p-4 rounded-xl border bg-white dark:bg-[#0c0c0f] shadow-sm flex justify-between items-center gap-4 transition-all hover:shadow-md ${
                  canAfford 
                    ? 'border-zinc-200 dark:border-zinc-850' 
                    : 'border-zinc-100 dark:border-zinc-900 opacity-70'
                }`}
              >
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-1.5">
                    <span className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-500 flex items-center justify-center border border-amber-200/20">
                      <Percent size={15} />
                    </span>
                    <div>
                      <h4 className="text-xs font-bold text-zinc-950 dark:text-white">{coupon.title}</h4>
                      <span className="text-[10px] text-amber-600 font-mono font-bold">{coupon.pointsCost} puntos</span>
                    </div>
                  </div>
                  <p className="text-[10px] text-zinc-500 dark:text-zinc-400 leading-normal">{coupon.desc}</p>
                </div>
                
                <button
                  onClick={() => handleRedeem(coupon.title, coupon.pointsCost)}
                  disabled={!canAfford}
                  className={`px-3 py-2 rounded-lg text-[10px] font-bold transition-all shrink-0 cursor-pointer ${
                    canAfford 
                      ? 'bg-amber-500 hover:bg-amber-600 text-white shadow-sm' 
                      : 'bg-zinc-100 text-zinc-400 dark:bg-zinc-900 dark:text-zinc-600 disabled:cursor-not-allowed'
                  }`}
                >
                  Canjear
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Points History Ledger */}
      <div className="space-y-4">
        <h2 className="text-sm font-bold text-zinc-950 dark:text-white flex items-center gap-1.5 pb-2 border-b border-zinc-200 dark:border-zinc-800">
          <History size={16} className="text-zinc-500" />
          Historial de Puntos
        </h2>

        <div className="border border-zinc-200 dark:border-zinc-850 rounded-xl bg-white dark:bg-[#0c0c0f] overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-zinc-50 dark:bg-zinc-900/50 border-b border-zinc-200 dark:border-zinc-850 text-zinc-400 font-semibold">
                  <th className="py-2.5 px-4">Fecha</th>
                  <th className="py-2.5 px-4">Concepto / Transacción</th>
                  <th className="py-2.5 px-4 text-right">Puntos</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-150 dark:divide-zinc-900">
                {pointsHistory.map((tx) => (
                  <tr key={tx.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-950/20 transition-colors">
                    <td className="py-3 px-4 text-zinc-400 font-mono">{tx.date}</td>
                    <td className="py-3 px-4 font-semibold text-zinc-800 dark:text-zinc-200">{tx.description}</td>
                    <td className={`py-3 px-4 text-right font-mono font-bold ${
                      tx.type === 'earn' ? 'text-emerald-500' : 'text-rose-500'
                    }`}>
                      {tx.points > 0 ? `+${tx.points}` : tx.points}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Welcome Modal */}
      {showWelcomeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#fcfcfd] dark:bg-[#0c0c0f] border border-amber-200/50 dark:border-amber-900/30 rounded-2xl shadow-2xl max-w-md w-full overflow-hidden animate-scale-in">
            <div className="px-6 py-5 bg-[#fdfcf7] dark:bg-[#12110c] border-b border-amber-100/50 dark:border-zinc-900 flex justify-between items-center">
              <h3 className="text-sm font-black text-amber-700 dark:text-amber-400 uppercase tracking-widest flex items-center gap-1">
                <Star size={16} className="fill-amber-500 stroke-amber-500" />
                Programa OneRewards
              </h3>
              <button 
                onClick={() => setShowWelcomeModal(false)}
                className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 text-xs font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>
            
            <div className="p-6 space-y-4 text-xs">
              <div className="space-y-1">
                <h4 className="font-bold text-zinc-900 dark:text-white text-sm">¡Bienvenido a los beneficios exclusivos!</h4>
                <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed">
                  Tu clínica ya es parte de OneRewards. A partir de ahora, todas tus compras acumulan saldo canjeable.
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex gap-2">
                  <CheckCircle2 size={16} className="text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-bold text-zinc-800 dark:text-zinc-200">Gana puntos en cada compra</h5>
                    <p className="text-[10px] text-zinc-500 dark:text-zinc-400">Consigue 1 punto por cada S/. 1 invertido en insumos y equipamiento.</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <CheckCircle2 size={16} className="text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-bold text-zinc-800 dark:text-zinc-200">Descuentos directos en caja</h5>
                    <p className="text-[10px] text-zinc-500 dark:text-zinc-400">Utiliza tus puntos en cualquier checkout para descontar el total de la compra.</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <CheckCircle2 size={16} className="text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-bold text-zinc-800 dark:text-zinc-200">Refiere clínicas y gana</h5>
                    <p className="text-[10px] text-zinc-500 dark:text-zinc-400">Comparte tu enlace y acumula 1,000 puntos en cuanto tu recomendado haga su primera orden.</p>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-zinc-150/40 dark:border-zinc-900 text-[10px] text-zinc-400 leading-normal">
                Nota: Los puntos tienen vigencia de 12 meses, no son canjeables por efectivo y aplican a compras dentro de la plataforma.
              </div>
            </div>

            <div className="px-6 py-4 bg-zinc-50 dark:bg-zinc-950 border-t border-zinc-150/40 dark:border-zinc-900 flex justify-end gap-3">
              <button
                onClick={() => setShowWelcomeModal(false)}
                className="bg-amber-500 hover:bg-amber-600 text-white font-bold px-4 py-2 rounded-lg text-xs transition-colors shadow-sm cursor-pointer"
              >
                Entendido, ¡empecemos!
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
