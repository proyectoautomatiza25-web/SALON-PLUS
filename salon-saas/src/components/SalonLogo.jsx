import React from 'react';

const SalonLogo = ({ className = "h-10" }) => (
    <div className={`flex items-center gap-3 ${className}`}>
        {/* Icono Gráfico (Red/Automización + Belleza) */}
        <svg viewBox="0 0 100 100" className="h-[42px] w-auto overflow-visible">
            <defs>
                <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FB923C" /> {/* Orange-400 */}
                    <stop offset="50%" stopColor="#F472B6" /> {/* Pink-400 */}
                    <stop offset="100%" stopColor="#7C3AED" /> {/* Violet-600 */}
                </linearGradient>
            </defs>

            {/* Conexiones */}
            <g opacity="0.6">
                <path d="M50 50 L20 20" stroke="url(#logoGradient)" strokeWidth="3" strokeLinecap="round" />
                <path d="M50 50 L80 20" stroke="url(#logoGradient)" strokeWidth="3" strokeLinecap="round" />
                <path d="M50 50 L20 80" stroke="url(#logoGradient)" strokeWidth="3" strokeLinecap="round" />
                <path d="M50 50 L80 80" stroke="url(#logoGradient)" strokeWidth="3" strokeLinecap="round" />
                <path d="M50 50 L50 15" stroke="url(#logoGradient)" strokeWidth="3" strokeLinecap="round" />
                <path d="M50 50 L50 85" stroke="url(#logoGradient)" strokeWidth="3" strokeLinecap="round" />
                <path d="M50 50 L15 50" stroke="url(#logoGradient)" strokeWidth="3" strokeLinecap="round" />
                <path d="M50 50 L85 50" stroke="url(#logoGradient)" strokeWidth="3" strokeLinecap="round" />
            </g>

            {/* Nodos Externa */}
            <circle cx="20" cy="20" r="5" fill="#F472B6" />
            <circle cx="80" cy="20" r="7" fill="#FB923C" />
            <circle cx="20" cy="80" r="7" fill="#7C3AED" />
            <circle cx="80" cy="80" r="5" fill="#F472B6" />

            <circle cx="50" cy="15" r="4" fill="#FB923C" />
            <circle cx="50" cy="85" r="4" fill="#7C3AED" />
            <circle cx="15" cy="50" r="4" fill="#F472B6" />
            <circle cx="85" cy="50" r="4" fill="#FB923C" />

            {/* Nodo Central (Nucleo) */}
            <circle cx="50" cy="50" r="14" fill="white" stroke="url(#logoGradient)" strokeWidth="3" />
            <circle cx="50" cy="50" r="7" fill="url(#logoGradient)" />
        </svg>

        {/* Texto Logotipo */}
        <div className="flex flex-col justify-center">
            <h1 className="text-2xl font-serif font-black tracking-tighter text-slate-800 leading-none">
                Salon<span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary italic">Plus</span>
            </h1>
            <span className="text-[9px] font-bold tracking-[0.15em] text-slate-400 uppercase">
                by Automatiza Sur
            </span>
        </div>
    </div>
);

export default SalonLogo;
