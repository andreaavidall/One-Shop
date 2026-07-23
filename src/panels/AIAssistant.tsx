import React, { useState } from 'react';
import { generateProposalsForItems, type Proposal, type Product, type ProductListing, type Supplier, products, listings, suppliers } from '../data/mockData';
import { useCart } from '../context/CartContext';
import { Sparkles, Send, Bot, User, ShoppingCart, Check, Info, Award, ShieldAlert, ArrowRight, RefreshCw, X, Star } from 'lucide-react';

interface Props {
  onSelectProduct: (product: Product) => void;
  onNavigate: (tab: string) => void;
}

interface Message {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  proposals?: { economy: Proposal; value: Proposal; premium: Proposal };
}

export const AIAssistant: React.FC<Props> = ({ onSelectProduct, onNavigate }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm1',
      sender: 'bot',
      text: '¡Hola! Soy tu Asistente Inteligente de Compras de OneShop. Escribe lo que necesitas para tu clínica y analizaré la mejor combinación de productos y proveedores del mercado.\n\nPor ejemplo: "Voy a abrir mi primera clínica", "Quiero empezar a hacer implantes", o "Tengo un presupuesto de S/. 20,000 para equipar un consultorio".'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const { loadProposal } = useCart();

  // Substitution state
  const [showSwapModal, setShowSwapModal] = useState(false);
  const [swapTargetMsgId, setSwapTargetMsgId] = useState<string | null>(null);
  const [swapTargetType, setSwapTargetType] = useState<'economy' | 'value' | 'premium' | null>(null);
  const [swapItemIdx, setSwapItemIdx] = useState<number | null>(null);

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    // Add user message
    const userMsg: Message = { id: Date.now().toString(), sender: 'user', text };
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI thinking and outputting proposals
    setTimeout(() => {
      let botResponseText = '';
      let activeProposals: { economy: Proposal; value: Proposal; premium: Proposal } | undefined;

      const cleanText = text.toLowerCase();

      if (cleanText.includes('implante') || cleanText.includes('implantología')) {
        botResponseText = 'Entendido. Para empezar a hacer implantes dentales, necesitas un kit quirúrgico base, implantes cónicos de titanio, anestesia local reforzada, agujas y consumibles estériles de bioseguridad. Analicé el catálogo de OrthoSupply, DentMax y BioDent para armar tus propuestas:';
        activeProposals = generateProposalsForItems([
          { productName: 'Implante Dental Titanio Cono Morse Alvim', quantity: 5 },
          { productName: 'Anestesia Octocaine Lidocaína 2% (Caja x 50)', quantity: 1 },
          { productName: 'Agujas Dentales Desechables Terumo 30G Cortas', quantity: 1 },
          { productName: 'Guantes de Nitrilo BioClean (Caja x 100)', quantity: 3 }
        ]);
      } else if (cleanText.includes('abrir') || cleanText.includes('equipamiento') || cleanText.includes('equipar') || cleanText.includes('presupuesto') || cleanText.includes('20,000') || cleanText.includes('15,000')) {
        botResponseText = 'Excelente. He analizado el equipamiento clínico necesario para inaugurar un consultorio dental básico (Autoclave de 21L Clase B, compresora de aire libre de aceite y silenciosa, turbinas de alta velocidad y micromotor de mesa). Aquí tienes las mejores combinaciones optimizadas entre DentalTech y DentMax:';
        activeProposals = generateProposalsForItems([
          { productName: 'Autoclave Digital 21 Litros Clase B', quantity: 1 },
          { productName: 'Compresora Dental Libre de Aceite 1.5 HP', quantity: 1 },
          { productName: 'Turbina Dental Alegra TE-97 (B2)', quantity: 2 },
          { productName: 'Micromotor Eléctrico Strong 204', quantity: 1 }
        ]);
      } else {
        // Default to general clinic restocking
        botResponseText = 'He preparado una cotización mensual completa de reabastecimiento en insumos odontológicos, mezclando proveedores de bioseguridad, consumibles de anestesia y materiales de impresión rápida:';
        activeProposals = generateProposalsForItems([
          { productName: 'Guantes de Nitrilo BioClean (Caja x 100)', quantity: 5 },
          { productName: 'Mascarillas Quirúrgicas de 3 pliegues (Caja x 50)', quantity: 2 },
          { productName: 'Anestesia Octocaine Lidocaína 2% (Caja x 50)', quantity: 1 },
          { productName: 'Agujas Dentales Desechables Terumo 30G Cortas', quantity: 1 },
          { productName: 'Alginato Kromopan Cromático de Fraguado Rápido', quantity: 2 }
        ]);
      }

      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: botResponseText,
        proposals: activeProposals
      }]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSelectProposal = (proposal: Proposal) => {
    const proposalItems = proposal.items.map(item => ({
      product: item.product,
      listing: item.listing,
      supplier: item.supplier
    }));
    loadProposal(proposalItems);
    onNavigate('carrito');
  };

  // Open Swap Item Dialog
  const handleOpenSwap = (msgId: string, type: 'economy' | 'value' | 'premium', itemIdx: number) => {
    setSwapTargetMsgId(msgId);
    setSwapTargetType(type);
    setSwapItemIdx(itemIdx);
    setShowSwapModal(true);
  };

  // Perform item substitution within the message's proposal state
  const handleReplaceItem = (newProduct: Product, newListing: ProductListing) => {
    if (!swapTargetMsgId || !swapTargetType || swapItemIdx === null) return;

    const newSupplier = suppliers.find(s => s.id === newListing.supplierId)!;

    setMessages(prevMessages => 
      prevMessages.map(msg => {
        if (msg.id !== swapTargetMsgId || !msg.proposals) return msg;

        const currentProposals = msg.proposals;
        const currentProp = currentProposals[swapTargetType];
        
        // Build updated items list
        const updatedItems = [...currentProp.items];
        
        // Keep track of old item price to recalculate cost differences
        const oldCost = updatedItems[swapItemIdx].listing.price;
        const newCost = newListing.price;

        updatedItems[swapItemIdx] = {
          product: newProduct,
          listing: newListing,
          supplier: newSupplier,
          reason: 'Sustituido por el odontólogo'
        };

        const updatedProp: Proposal = {
          ...currentProp,
          items: updatedItems,
          totalCost: currentProp.totalCost - oldCost + newCost
        };

        return {
          ...msg,
          proposals: {
            ...currentProposals,
            [swapTargetType]: updatedProp
          }
        };
      })
    );

    setShowSwapModal(false);
    setSwapTargetMsgId(null);
    setSwapTargetType(null);
    setSwapItemIdx(null);
  };

  // Get options for swapping: other products in same category or alternative brand listings
  const getSwapOptions = () => {
    if (!swapTargetMsgId || !swapTargetType || swapItemIdx === null) return [];
    const targetMsg = messages.find(m => m.id === swapTargetMsgId);
    if (!targetMsg || !targetMsg.proposals) return [];
    
    const activeItem = targetMsg.proposals[swapTargetType].items[swapItemIdx];
    const category = activeItem.product.category;

    // Find all listings of products in the same category that are NOT the active item
    const options: { product: Product; listing: ProductListing; supplier: Supplier }[] = [];

    products
      .filter(p => p.category === category)
      .forEach(prod => {
        listings
          .filter(l => l.productId === prod.id && l.stock > 0 && l.id !== activeItem.listing.id)
          .forEach(list => {
            const sup = suppliers.find(s => s.id === list.supplierId)!;
            options.push({ product: prod, listing: list, supplier: sup });
          });
      });

    return options;
  };

  const swapOptionsList = getSwapOptions();
  
  // Find current swap target item name for display
  const getSwapTargetItemName = () => {
    if (!swapTargetMsgId || !swapTargetType || swapItemIdx === null) return '';
    const targetMsg = messages.find(m => m.id === swapTargetMsgId);
    return targetMsg?.proposals?.[swapTargetType]?.items[swapItemIdx]?.product.name || '';
  };

  return (
    <div className="h-[calc(100vh-140px)] flex flex-col justify-between bg-white dark:bg-[#0c0c0f] border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden shadow-sm relative">
      
      {/* Assistant Header */}
      <div className="px-5 py-4 border-b border-zinc-100 dark:border-zinc-900 bg-zinc-50/50 dark:bg-zinc-900/10 flex justify-between items-center shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-blue-600/10 text-blue-600 flex items-center justify-center border border-blue-200/30">
            <Sparkles size={16} />
          </div>
          <div>
            <h2 className="text-xs font-bold text-zinc-900 dark:text-white uppercase tracking-wider">Ayúdame a comprar</h2>
            <p className="text-[10px] text-zinc-400">Inteligencia Artificial para optimización de presupuestos odontológicos</p>
          </div>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 p-5 overflow-y-auto space-y-6">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-3 max-w-4xl ${msg.sender === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'}`}
          >
            {/* Avatar */}
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border ${
              msg.sender === 'user'
                ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border-zinc-200 dark:border-zinc-700'
                : 'bg-blue-600/10 text-blue-600 border-blue-200/30'
            }`}>
              {msg.sender === 'user' ? <User size={14} /> : <Bot size={14} />}
            </div>

            {/* Bubble */}
            <div className="space-y-4 flex-1">
              <div className={`p-4 rounded-xl text-xs leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-blue-600 text-white font-medium rounded-tr-none'
                  : 'bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-900 text-zinc-800 dark:text-zinc-200 rounded-tl-none whitespace-pre-line'
              }`}>
                {msg.text}
              </div>

              {/* RENDER PROPOSALS IF ATTACHED */}
              {msg.proposals && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4">
                  {(['economy', 'value', 'premium'] as const).map((type) => {
                    const prop = msg.proposals![type];
                    const details = {
                      economy: { badge: '💰 Económica', border: 'border-emerald-500/20 dark:border-emerald-500/10', headerBg: 'bg-emerald-500/5', btnBg: 'bg-emerald-600 hover:bg-emerald-700 text-white' },
                      value: { badge: '🏆 Calidad-Precio', border: 'border-blue-500/30 dark:border-blue-500/20', headerBg: 'bg-blue-600/5', btnBg: 'bg-blue-600 hover:bg-blue-700 text-white' },
                      premium: { badge: '👑 Premium', border: 'border-purple-500/20 dark:border-purple-500/10', headerBg: 'bg-purple-500/5', btnBg: 'bg-purple-600 hover:bg-purple-700 text-white' }
                    }[type];

                    return (
                      <div
                        key={type}
                        className={`rounded-xl border ${details.border} bg-white dark:bg-[#0c0c0f] shadow-sm flex flex-col justify-between overflow-hidden`}
                      >
                        {/* Proposal Card Header */}
                        <div className={`p-4 ${details.headerBg} border-b border-zinc-100 dark:border-zinc-900`}>
                          <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">{details.badge}</span>
                          <h4 className="text-base font-black text-zinc-950 dark:text-white mt-2 font-mono">
                            S/. {prop.totalCost.toFixed(2)}
                          </h4>
                          {prop.estimatedSavings > 0 && (
                            <span className="text-[9px] font-semibold text-emerald-500 bg-emerald-50 dark:bg-emerald-950/20 px-2 py-0.5 rounded mt-1.5 inline-block">
                              Ahorro: S/. {prop.estimatedSavings}
                            </span>
                          )}
                        </div>

                        {/* Proposal Items list */}
                        <div className="p-4 flex-1 space-y-3">
                          {prop.items.map((item, idx) => (
                            <div key={idx} className="flex justify-between items-start text-[10px] border-b border-zinc-50 dark:border-zinc-900/50 pb-2 last:border-b-0 last:pb-0">
                              <div className="pr-2 overflow-hidden">
                                <h5 className="font-bold text-zinc-900 dark:text-zinc-100 truncate max-w-[120px]">{item.product.name}</h5>
                                <span className="text-zinc-400 block truncate">{item.supplier.name}</span>
                                
                                {/* Substitución link */}
                                <button
                                  onClick={() => handleOpenSwap(msg.id, type, idx)}
                                  className="text-[9px] text-blue-500 hover:underline flex items-center gap-0.5 font-bold mt-1 cursor-pointer"
                                >
                                  <RefreshCw size={8} /> Sustituir
                                </button>
                              </div>
                              <span className="font-mono font-semibold text-zinc-900 dark:text-white shrink-0">
                                S/. {item.listing.price.toFixed(2)}
                              </span>
                            </div>
                          ))}
                        </div>

                        {/* Action footer */}
                        <div className="p-4 bg-zinc-50/50 dark:bg-zinc-900/20 border-t border-zinc-100 dark:border-zinc-900">
                          <button
                            onClick={() => handleSelectProposal(prop)}
                            className={`w-full py-2 rounded-lg text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-1.5 cursor-pointer ${details.btnBg}`}
                          >
                            <ShoppingCart size={13} />
                            Comprar Propuesta
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Typing indicator */}
        {isTyping && (
          <div className="flex gap-3 max-w-4xl mr-auto">
            <div className="w-8 h-8 rounded-lg bg-blue-600/10 text-blue-600 flex items-center justify-center shrink-0 border border-blue-200/30">
              <Bot size={14} />
            </div>
            <div className="bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-900 p-4 rounded-xl rounded-tl-none flex items-center gap-1 shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        )}
      </div>

      {/* Input controls footer */}
      <div className="p-4 border-t border-zinc-100 dark:border-zinc-900 bg-zinc-50/20 dark:bg-[#0c0c0f]/40 flex flex-col gap-3 shrink-0">
        {/* Suggestion prompt tags */}
        <div className="flex flex-wrap gap-2">
          {[
            'Quiero empezar a hacer implantes',
            'Tengo S/15,000 para equipar un consultorio',
            'Necesito abastecer mi clínica este mes'
          ].map((tag, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(tag)}
              className="px-2.5 py-1 rounded bg-zinc-100 dark:bg-zinc-800 text-[10px] text-zinc-650 dark:text-zinc-350 border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors cursor-pointer"
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Input box */}
        <div className="flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend(inputValue)}
            placeholder="Describe tus necesidades clínicas para cotizar..."
            className="flex-1 bg-white dark:bg-[#09090b] border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          />
          <button
            onClick={() => handleSend(inputValue)}
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-4 py-2 text-xs font-bold transition-all shadow-md shadow-blue-500/10 cursor-pointer flex items-center justify-center shrink-0"
          >
            <Send size={14} />
          </button>
        </div>
      </div>

      {/* SWAP ALTERNATIVE ITEM MODAL */}
      {showSwapModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/50 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-[#0c0c0f] border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-2xl max-w-md w-full overflow-hidden">
            <div className="px-6 py-4 bg-zinc-50 dark:bg-zinc-950 border-b border-zinc-100 dark:border-zinc-900 flex justify-between items-center">
              <div>
                <h3 className="text-xs font-bold text-zinc-900 dark:text-white uppercase tracking-wider">Sustituir Producto de Propuesta</h3>
                <p className="text-[10px] text-zinc-400 mt-0.5">Sustituto de: "{getSwapTargetItemName()}"</p>
              </div>
              <button 
                onClick={() => setShowSwapModal(false)}
                className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 text-xs font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="p-6 overflow-y-auto max-h-[50vh] space-y-3 text-xs">
              {swapOptionsList.length > 0 ? (
                swapOptionsList.map((opt, idx) => (
                  <div
                    key={idx}
                    onClick={() => handleReplaceItem(opt.product, opt.listing)}
                    className="p-3 border border-zinc-150 dark:border-zinc-850 hover:border-blue-500/35 rounded-xl flex justify-between items-center gap-3 cursor-pointer hover:bg-zinc-50/50 transition-all"
                  >
                    <div className="overflow-hidden">
                      <h4 className="font-bold text-zinc-800 dark:text-zinc-200 truncate">{opt.product.name}</h4>
                      <p className="text-[10px] text-zinc-450 truncate">Marca: {opt.product.brand} • Prov: {opt.supplier.name}</p>
                    </div>
                    <span className="font-mono font-bold text-zinc-950 dark:text-white shrink-0">
                      S/. {opt.listing.price.toFixed(2)}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-center py-6 text-zinc-400">No hay productos alternativos en stock para esta categoría.</p>
              )}
            </div>

            <div className="px-6 py-4 bg-zinc-50 dark:bg-zinc-950 border-t border-zinc-100 dark:border-zinc-900 flex justify-end">
              <button
                onClick={() => setShowSwapModal(false)}
                className="px-4 py-2 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-lg text-xs font-semibold hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors cursor-pointer"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
