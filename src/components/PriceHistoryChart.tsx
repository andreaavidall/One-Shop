import React from 'react';

interface PriceHistoryProps {
  basePrice: number;
}

export const PriceHistoryChart: React.FC<PriceHistoryProps> = ({ basePrice }) => {
  // Generate slightly fluctuating prices over 6 months based on base price
  const generateHistory = (price: number) => {
    const seed = [1.02, 0.98, 1.05, 0.95, 1.01, 1.0];
    const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'];
    return seed.map((factor, i) => ({
      month: months[i],
      price: Math.round(price * factor)
    }));
  };

  const data = generateHistory(basePrice);
  const prices = data.map(d => d.price);
  
  const minPrice = Math.min(...prices) * 0.95;
  const maxPrice = Math.max(...prices) * 1.05;
  const range = maxPrice - minPrice;

  // Map values to SVG coordinate box (width: 400, height: 120)
  const svgWidth = 400;
  const svgHeight = 100;
  const padding = 20;

  const points = data.map((d, i) => {
    const x = padding + (i * (svgWidth - padding * 2)) / (data.length - 1);
    const y = svgHeight - padding - ((d.price - minPrice) * (svgHeight - padding * 2)) / range;
    return { x, y, ...d };
  });

  const pathD = points.reduce((path, pt, i) => {
    return i === 0 ? `M ${pt.x} ${pt.y}` : `${path} L ${pt.x} ${pt.y}`;
  }, '');

  // For filling the gradient area below the line
  const fillD = `${pathD} L ${points[points.length - 1].x} ${svgHeight - padding} L ${points[0].x} ${svgHeight - padding} Z`;

  return (
    <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#0c0c0f]">
      <div className="flex justify-between items-center mb-2">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Historial de Precios (6 meses)</h4>
        <span className="text-xs text-emerald-500 dark:text-emerald-400 font-medium">Estable</span>
      </div>
      <div className="relative">
        <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-24 overflow-visible">
          <defs>
            <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          <line x1={padding} y1={padding} x2={svgWidth - padding} y2={padding} stroke="#e4e4e7" strokeDasharray="3" className="dark:stroke-zinc-800" />
          <line x1={padding} y1={svgHeight - padding} x2={svgWidth - padding} y2={svgHeight - padding} stroke="#e4e4e7" strokeDasharray="3" className="dark:stroke-zinc-800" />

          {/* Area below curve */}
          <path d={fillD} fill="url(#chartGradient)" />

          {/* Line curve */}
          <path d={pathD} fill="none" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" />

          {/* Data points */}
          {points.map((pt, i) => (
            <g key={i} className="group/dot cursor-pointer">
              <circle
                cx={pt.x}
                cy={pt.y}
                r="4"
                className="fill-blue-500 stroke-white dark:stroke-zinc-900 stroke-2 hover:r-6 transition-all duration-150"
              />
              {/* Tooltip on hover */}
              <foreignObject
                x={pt.x - 35}
                y={pt.y - 32}
                width="70"
                height="26"
                className="opacity-0 group-hover/dot:opacity-100 transition-opacity duration-150 pointer-events-none"
              >
                <div className="bg-zinc-950 text-white text-[10px] py-0.5 rounded text-center shadow-md font-mono">
                  S/. {pt.price}
                </div>
              </foreignObject>
            </g>
          ))}
        </svg>
      </div>

      <div className="flex justify-between mt-1 px-4 text-[10px] font-medium text-zinc-400 dark:text-zinc-500">
        {data.map((d, i) => (
          <span key={i}>{d.month}</span>
        ))}
      </div>
    </div>
  );
};
