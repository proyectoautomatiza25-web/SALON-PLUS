import React, { useState } from 'react';
import { useKingdomStore } from './store';
import QRCode from 'react-qr-code';

// ========== WALLET SCREEN ==========
const WalletScreen = ({ onNavigate }) => {
  const { user } = useKingdomStore();

  // Generar ID único para el QR (en producción vendría del backend)
  const qrData = JSON.stringify({
    userId: 'KCF-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
    userName: user.name,
    balance: user.balance,
    points: user.points,
    timestamp: Date.now()
  });

  return (
    <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark pb-24">
      {/* TopAppBar */}
      <div className="flex items-center bg-background-light dark:bg-background-dark p-4 pb-2 justify-between sticky top-0 z-10">
        <div className="flex size-12 shrink-0 items-center">
          <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border-2 border-primary"
            style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&q=80")' }}>
          </div>
        </div>
        <div className="flex flex-col flex-1 px-3">
          <p className="text-xs font-medium text-coffee-gold uppercase tracking-wider">Hola, {user.name}</p>
          <h2 className="text-coffee-dark dark:text-white text-lg font-bold leading-tight tracking-[-0.015em]">Kingdom Wallet</h2>
        </div>
        <div className="flex w-12 items-center justify-end">
          <button className="flex cursor-pointer items-center justify-center rounded-xl h-10 w-10 bg-white/50 dark:bg-white/10 text-coffee-dark dark:text-white">
            <span className="material-symbols-outlined">notifications</span>
          </button>
        </div>
      </div>

      {/* Wallet Card Section - MODERNIZED */}
      <div className="p-4">
        <div className="relative group">
          {/* Glow effect */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-primary via-yellow-500 to-primary rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-300"></div>

          <div className="relative flex flex-col items-stretch justify-start rounded-2xl shadow-2xl bg-white/90 dark:bg-zinc-800/90 backdrop-blur-md overflow-hidden border border-zinc-100/50 dark:border-zinc-700/50">
            <div className="w-full bg-center bg-no-repeat aspect-[16/7] bg-cover relative overflow-hidden"
              style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1511920170033-f8396924c348?w=600&q=80")' }}>
              <div className="absolute inset-0 bg-gradient-to-t from-coffee-dark/90 via-coffee-dark/40 to-transparent"></div>
              {/* Animated shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 transform translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
              <div className="absolute bottom-4 left-4">
                <span className="text-white/90 text-[10px] font-bold tracking-[0.2em] uppercase drop-shadow-lg">{user.level}</span>
              </div>
              <div className="absolute top-4 right-4">
                <span className="material-symbols-outlined text-primary text-2xl drop-shadow-lg fill-1">verified</span>
              </div>
            </div>
            <div className="flex w-full grow flex-col items-stretch justify-center gap-1 py-5 px-5 bg-gradient-to-br from-white/50 to-transparent dark:from-zinc-800/50">
              <p className="text-coffee-gold text-xs font-bold uppercase tracking-widest">Saldo Disponible</p>
              <div className="flex items-baseline gap-2">
                <span className="text-coffee-dark dark:text-white text-4xl font-extrabold tracking-tighter drop-shadow-sm">${user.balance.toFixed(2)}</span>
                <span className="text-coffee-gold text-sm font-medium">USD</span>
              </div>
              <div className="flex items-center gap-3 justify-between mt-3">
                <p className="text-coffee-gold text-sm font-medium leading-normal flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm fill-1">stars</span>
                  {user.points.toLocaleString()} puntos
                </p>
                <button
                  onClick={() => onNavigate('recargar')}
                  className="flex min-w-[100px] cursor-pointer items-center justify-center rounded-xl h-10 px-4 bg-gradient-to-r from-primary to-yellow-500 text-coffee-dark text-sm font-bold shadow-lg shadow-primary/30 hover:shadow-primary/50 hover:scale-105 active:scale-95 transition-all duration-200">
                  <span className="truncate">Recargar</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Loyalty Progress Section - MODERNIZED */}
      <div className="px-4 mt-2">
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-400 via-primary to-yellow-500 rounded-2xl blur opacity-10 group-hover:opacity-20 transition duration-300"></div>

          <div className="relative bg-white/80 dark:bg-zinc-800/50 backdrop-blur-sm rounded-2xl p-5 border border-zinc-200/50 dark:border-zinc-700/50 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-coffee-dark dark:text-white text-md font-bold leading-tight flex items-center gap-2">
                <span className="material-symbols-outlined text-orange-600 fill-1">workspace_premium</span>
                {user.loyaltyLevel}
              </h3>
              <span className="bg-gradient-to-r from-green-500 to-emerald-500 text-white text-[10px] px-3 py-1.5 rounded-full font-bold uppercase shadow-md flex items-center gap-1">
                <span className="size-1.5 bg-white rounded-full animate-pulse"></span>
                Socio Activo
              </span>
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex gap-6 justify-between items-end">
                <p className="text-coffee-dark dark:text-zinc-300 text-sm font-medium leading-normal">Hacia: <span className="text-primary font-bold">Grano de Oro</span></p>
                <p className="text-coffee-dark dark:text-zinc-400 text-xs font-bold leading-normal">{user.loyaltyProgress} / {user.loyaltyTarget} pts</p>
              </div>
              <div className="relative rounded-full bg-zinc-200 dark:bg-zinc-700 h-3 overflow-hidden shadow-inner">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
                <div
                  className="h-full rounded-full bg-gradient-to-r from-primary via-yellow-500 to-primary shadow-[0_0_12px_rgba(242,185,13,0.6)] transition-all duration-1000 ease-out"
                  style={{ width: `${(user.loyaltyProgress / user.loyaltyTarget) * 100}%` }}>
                </div>
              </div>
              <p className="text-coffee-gold text-xs font-medium leading-normal italic flex items-center gap-1.5">
                <span className="material-symbols-outlined text-sm fill-1">auto_awesome</span>
                ¡Solo te faltan {user.loyaltyTarget - user.loyaltyProgress} puntos para el siguiente nivel!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Scan Section (Main Action) - MODERNIZED */}
      <div className="mt-8 mb-4 flex flex-col items-center">
        <h3 className="text-coffee-dark dark:text-white tracking-tight text-xl font-extrabold px-4 text-center pb-2">Pagar y Acumular</h3>
        <p className="text-coffee-gold text-sm text-center mb-6">Muestra este código al barista en caja</p>

        {/* Modern QR Card with Glassmorphism */}
        <div className="relative group">
          {/* Glow effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-primary via-yellow-500 to-primary rounded-3xl blur-lg opacity-30 group-hover:opacity-50 transition duration-500 animate-pulse"></div>

          {/* Main QR Container */}
          <div className="relative bg-white dark:bg-zinc-900 p-8 rounded-3xl shadow-2xl border-2 border-primary/30 backdrop-blur-sm">
            {/* Animated gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-yellow-500/5 rounded-3xl"></div>

            {/* QR Code Container */}
            <div className="relative bg-white dark:bg-zinc-50 rounded-2xl p-6 shadow-inner">
              {/* Real QR Code */}
              <div className="relative">
                <QRCode
                  value={qrData}
                  size={200}
                  level="H"
                  fgColor="#1c180d"
                  bgColor="#ffffff"
                  className="w-full h-auto"
                />

                {/* Center Logo Overlay */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="bg-white dark:bg-white p-3 rounded-xl shadow-lg border-2 border-primary">
                    <span className="material-symbols-outlined text-primary text-4xl font-bold fill-1">coffee</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative scan corners - MODERNIZED */}
            <div className="absolute -top-2 -left-2 w-8 h-8 border-t-4 border-l-4 border-primary rounded-tl-lg"></div>
            <div className="absolute -top-2 -right-2 w-8 h-8 border-t-4 border-r-4 border-primary rounded-tr-lg"></div>
            <div className="absolute -bottom-2 -left-2 w-8 h-8 border-b-4 border-l-4 border-primary rounded-bl-lg"></div>
            <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-4 border-r-4 border-primary rounded-br-lg"></div>

            {/* Status Indicator */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <div className="bg-green-500 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg flex items-center gap-2 animate-pulse">
                <span className="size-2 bg-white rounded-full"></span>
                Código Activo
              </div>
            </div>
          </div>
        </div>

        {/* Action Button - MODERNIZED */}
        <button className="mt-8 flex items-center gap-2 text-coffee-dark dark:text-white font-bold text-sm bg-white/80 dark:bg-zinc-800/80 backdrop-blur-md px-6 py-3 rounded-full shadow-lg border border-zinc-200 dark:border-zinc-700 hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200">
          <span className="material-symbols-outlined text-primary">history</span>
          Ver historial de transacciones
        </button>
      </div>

      {/* Quick Actions Grid */}
      <div className="px-4 py-6 grid grid-cols-3 gap-4">
        <div className="flex flex-col items-center gap-2 cursor-pointer active:scale-95 transition-transform" onClick={() => onNavigate('canjear')}>
          <div className="size-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
            <span className="material-symbols-outlined text-2xl">redeem</span>
          </div>
          <span className="text-[11px] font-bold text-coffee-gold uppercase">Canjear</span>
        </div>
        <div className="flex flex-col items-center gap-2 cursor-pointer active:scale-95 transition-transform" onClick={() => onNavigate('menu')}>
          <div className="size-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
            <span className="material-symbols-outlined text-2xl">local_cafe</span>
          </div>
          <span className="text-[11px] font-bold text-coffee-gold uppercase">Menú</span>
        </div>
        <div className="flex flex-col items-center gap-2 cursor-pointer active:scale-95 transition-transform" onClick={() => onNavigate('ubicacion')}>
          <div className="size-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
            <span className="material-symbols-outlined text-2xl">location_on</span>
          </div>
          <span className="text-[11px] font-bold text-coffee-gold uppercase">Tiendas</span>
        </div>
      </div>
    </div>
  );
};

// ========== PERFIL SCREEN ==========
const PerfilScreen = ({ onNavigate }) => {
  const { user } = useKingdomStore();

  return (
    <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark pb-24">
      {/* Header */}
      <div className="flex items-center p-4 justify-between bg-white dark:bg-zinc-900 border-b border-zinc-100 dark:border-zinc-800">
        <button onClick={() => onNavigate('wallet')} className="flex items-center justify-center size-10">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h2 className="text-lg font-bold">Mi Perfil</h2>
        <button className="flex items-center justify-center size-10">
          <span className="material-symbols-outlined">settings</span>
        </button>
      </div>

      {/* Profile Card */}
      <div className="flex flex-col items-center py-8 bg-white dark:bg-zinc-900">
        <div className="relative">
          <div className="size-24 rounded-full bg-gradient-to-br from-orange-300 to-orange-500 flex items-center justify-center">
            <span className="text-4xl font-bold text-white">CR</span>
          </div>
          <div className="absolute bottom-0 right-0 size-8 bg-primary rounded-full border-4 border-white dark:border-zinc-900 flex items-center justify-center">
            <span className="material-symbols-outlined text-sm text-coffee-dark">edit</span>
          </div>
        </div>
        <h3 className="text-xl font-bold mt-4">Carlos Ruiz</h3>
        <p className="text-primary text-sm font-bold">Gold Member</p>
        <p className="text-zinc-500 text-xs mt-1">Miembro desde Octubre 2023</p>
      </div>

      {/* Puntos de Fidelidad */}
      <div className="px-4 py-4 bg-white dark:bg-zinc-900 border-t border-zinc-100 dark:border-zinc-800">
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-bold">Cosecha tus puntos</h4>
          <span className="text-primary text-sm font-bold">{user.stamps} / {user.stampsTarget} GRANOS</span>
        </div>
        <div className="grid grid-cols-5 gap-2 mb-3">
          {[...Array(user.stampsTarget)].map((_, i) => (
            <div key={i} className={`aspect-square rounded-full border-2 flex items-center justify-center ${i < user.stamps ? 'bg-primary border-primary' : 'bg-zinc-100 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700'}`}>
              <span className="material-symbols-outlined text-lg" style={{ color: i < user.stamps ? '#1c180d' : '#d1d5db' }}>coffee</span>
            </div>
          ))}
        </div>
        <div className="bg-orange-50 dark:bg-orange-900/20 p-3 rounded-lg flex items-center justify-between">
          <p className="text-xs font-bold text-coffee-dark dark:text-white">¡Casi listo! Faltan {user.stampsTarget - user.stamps} granos para tu café gratis.</p>
          <button onClick={() => onNavigate('canjear')} className="bg-primary text-coffee-dark px-4 py-2 rounded-lg text-xs font-bold whitespace-nowrap">Ver premios</button>
        </div>
      </div>

      {/* Mis Favoritos */}
      <div className="px-4 py-4 mt-2">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-bold text-lg">Mis Favoritos</h4>
          <button className="text-primary text-sm font-semibold">Ver todos</button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden shadow-sm">
            <div className="relative">
              <img src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&q=80" className="w-full h-32 object-cover" alt="Flat White" />
              <button className="absolute top-2 right-2 size-8 bg-white/90 rounded-full flex items-center justify-center">
                <span className="material-symbols-outlined text-red-500 fill-1">favorite</span>
              </button>
            </div>
            <div className="p-3">
              <h5 className="font-bold text-sm">Flat White</h5>
              <p className="text-xs text-zinc-500">Leche de Avena</p>
              <div className="flex items-center justify-between mt-2">
                <span className="text-primary font-bold">$4.500</span>
                <button className="size-7 bg-primary rounded-lg flex items-center justify-center">
                  <span className="material-symbols-outlined text-sm text-coffee-dark">shopping_cart</span>
                </button>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden shadow-sm">
            <div className="relative">
              <img src="https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=400&q=80" className="w-full h-32 object-cover" alt="Cold Brew" />
              <button className="absolute top-2 right-2 size-8 bg-white/90 rounded-full flex items-center justify-center">
                <span className="material-symbols-outlined text-red-500 fill-1">favorite</span>
              </button>
            </div>
            <div className="p-3">
              <h5 className="font-bold text-sm">Cold Brew</h5>
              <p className="text-xs text-zinc-500">Single Origin</p>
              <div className="flex items-center justify-between mt-2">
                <span className="text-primary font-bold">$3.800</span>
                <button className="size-7 bg-primary rounded-lg flex items-center justify-center">
                  <span className="material-symbols-outlined text-sm text-coffee-dark">shopping_cart</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cuenta Section */}
      <div className="px-4 py-4 mt-2">
        <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-3">Cuenta</h4>
        <div className="bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden divide-y divide-zinc-100 dark:divide-zinc-800">
          <button className="flex items-center justify-between p-4 w-full hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary">person</span>
              <div className="text-left">
                <p className="font-bold text-sm">Configuración de cuenta</p>
                <p className="text-xs text-zinc-500">Información personal y seguridad</p>
              </div>
            </div>
            <span className="material-symbols-outlined text-zinc-400">chevron_right</span>
          </button>
          <button className="flex items-center justify-between p-4 w-full hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary">credit_card</span>
              <div className="text-left">
                <p className="font-bold text-sm">Métodos de pago</p>
                <p className="text-xs text-zinc-500">Visa •••• 4242</p>
              </div>
            </div>
            <span className="material-symbols-outlined text-zinc-400">chevron_right</span>
          </button>
          <button className="flex items-center justify-between p-4 w-full hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary">receipt_long</span>
              <div className="text-left">
                <p className="font-bold text-sm">Historial de pedidos</p>
                <p className="text-xs text-zinc-500">Ver tus compras anteriores</p>
              </div>
            </div>
            <span className="material-symbols-outlined text-zinc-400">chevron_right</span>
          </button>
          <button className="flex items-center justify-between p-4 w-full hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors text-red-500">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined">logout</span>
              <p className="font-bold text-sm">Cerrar sesión</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

// ========== MENU SCREEN ==========
const MenuScreen = ({ onNavigate }) => {
  const { menu, addToCart } = useKingdomStore();
  const [selectedCategory, setSelectedCategory] = useState('Todos');

  const categories = ['Todos', 'Café', 'Repostería', 'Sándwiches'];

  const filteredMenu = selectedCategory === 'Todos'
    ? menu
    : menu.filter(item => item.category === selectedCategory);

  return (
    <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark pb-24">
      {/* Header */}
      <div className="flex items-center p-4 justify-between bg-white dark:bg-zinc-900 border-b border-zinc-100 dark:border-zinc-800 sticky top-0 z-10">
        <button onClick={() => onNavigate('wallet')} className="flex items-center justify-center size-10">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h2 className="text-lg font-bold">Menú</h2>
        <button className="flex items-center justify-center size-10">
          <span className="material-symbols-outlined">search</span>
        </button>
      </div>

      {/* Categories */}
      <div className="flex gap-2 px-4 py-4 overflow-x-auto hide-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all ${selectedCategory === cat ? 'bg-primary text-coffee-dark shadow-md' : 'bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400'}`}>
            {cat}
          </button>
        ))}
      </div>

      {/* Product List */}
      <div className="px-4 space-y-3">
        {filteredMenu.map(item => (
          <div key={item.id} className="bg-white dark:bg-zinc-900 rounded-2xl p-4 flex items-center gap-4 shadow-sm">
            <img src={item.image} className="w-20 h-20 rounded-xl object-cover" alt={item.name} />
            <div className="flex-1">
              <h4 className="font-bold text-base">{item.name}</h4>
              <p className="text-xs text-zinc-500 mt-1">{item.desc}</p>
              <p className="text-primary font-bold mt-2">${item.price.toFixed(2)}</p>
            </div>
            <button
              onClick={() => addToCart(item)}
              className="size-10 bg-primary rounded-lg flex items-center justify-center text-white active:scale-95 transition-transform">
              <span className="material-symbols-outlined">add</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

// ========== CANJEAR SCREEN ==========
const CanjearScreen = ({ onNavigate }) => {
  const rewards = [
    { id: 1, name: 'Cappuccino', desc: 'Taza mediana 12oz', points: 50, image: 'https://images.unsplash.com/photo-1534778101976-62847782c213?w=400&q=80' },
    { id: 2, name: 'Cheesecake', desc: 'Sabor New York', points: 80, image: 'https://images.unsplash.com/photo-1524351199678-941a58a3df50?w=400&q=80' },
    { id: 3, name: 'Cold Brew', desc: '24hr de 24h', points: 60, image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=400&q=80' },
    { id: 4, name: 'Bolsa Blend 500g', desc: 'Origen Selección', points: 250, image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&q=80', disabled: true },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark pb-24">
      {/* Header */}
      <div className="flex items-center p-4 justify-between bg-white dark:bg-zinc-900 border-b border-zinc-100 dark:border-zinc-800">
        <button onClick={() => onNavigate('wallet')} className="flex items-center justify-center size-10">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h2 className="text-lg font-bold">Canjear Puntos</h2>
        <button className="flex items-center justify-center size-10">
          <span className="material-symbols-outlined">history</span>
        </button>
      </div>

      {/* Puntos Disponibles Card */}
      <div className="m-4 bg-orange-50 dark:bg-orange-900/20 rounded-2xl p-6 border border-orange-200 dark:border-orange-800">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">Puntos Disponibles</p>
            <p className="text-4xl font-extrabold text-primary">150 <span className="text-base">pts</span></p>
          </div>
          <span className="material-symbols-outlined text-5xl text-primary opacity-20">loyalty</span>
        </div>
        <div className="mt-3 h-1 bg-zinc-200 dark:bg-zinc-700 rounded-full overflow-hidden">
          <div className="h-full bg-primary rounded-full" style={{ width: '30%' }}></div>
        </div>
        <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-2">Estás a 50 pts de tu próximo nivel Gold</p>
      </div>

      {/* Categorías */}
      <div className="flex gap-2 px-4 overflow-x-auto hide-scrollbar pb-4">
        {['Todo', 'Bebidas', 'Repostería', 'Granos'].map((cat, i) => (
          <button key={i} className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap ${i === 0 ? 'bg-primary text-coffee-dark' : 'bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400'}`}>
            {cat}
          </button>
        ))}
      </div>

      {/* Premios para ti */}
      <div className="px-4 py-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold">Premios para ti</h3>
          <button className="text-primary text-sm font-semibold">Ver todos</button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {rewards.map(reward => (
            <div key={reward.id} className="bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden shadow-sm relative">
              <div className="relative">
                <img src={reward.image} className="w-full h-32 object-cover" alt={reward.name} />
                <div className="absolute top-2 right-2 bg-coffee-dark text-white text-xs font-bold px-2 py-1 rounded-full">
                  {reward.points} pts
                </div>
              </div>
              <div className="p-3">
                <h5 className="font-bold text-sm">{reward.name}</h5>
                <p className="text-xs text-zinc-500 mb-3">{reward.desc}</p>
                <button
                  disabled={reward.disabled}
                  className={`w-full py-2 rounded-lg text-sm font-bold ${reward.disabled ? 'bg-zinc-200 dark:bg-zinc-800 text-zinc-400' : 'bg-primary text-coffee-dark active:scale-95'} transition-transform`}>
                  {reward.disabled ? `Faltan ${reward.points - 150} pts` : 'Canjear'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ========== RECARGAR SCREEN ==========
const RecargarScreen = ({ onNavigate }) => {
  const [amount, setAmount] = useState(20000);
  const [selectedCard, setSelectedCard] = useState('visa');

  return (
    <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark">
      {/* Header */}
      <div className="flex items-center p-4 justify-between bg-white dark:bg-zinc-900 border-b border-zinc-100 dark:border-zinc-800">
        <button onClick={() => onNavigate('wallet')} className="flex items-center justify-center size-10">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h2 className="text-lg font-bold">Recargar Billetera</h2>
        <div className="size-10"></div>
      </div>

      {/* Saldo Actual */}
      <div className="flex flex-col items-center py-8 bg-white dark:bg-zinc-900">
        <p className="text-sm text-zinc-500 mb-2">Saldo actual</p>
        <p className="text-4xl font-extrabold">$12.500</p>
      </div>

      {/* Monto a recargar */}
      <div className="px-4 py-6">
        <h3 className="text-lg font-bold mb-4">¿Cuánto deseas recargar?</h3>
        <div className="mb-4">
          <label className="text-sm font-medium text-zinc-600 dark:text-zinc-400 mb-2 block">Monto a recargar</label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl font-bold text-zinc-400">$</span>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full pl-10 pr-4 py-4 text-2xl font-bold bg-white dark:bg-zinc-900 border-2 border-zinc-200 dark:border-zinc-700 rounded-2xl focus:border-primary focus:outline-none"
            />
          </div>
        </div>
        <div className="flex gap-2">
          {[5000, 10000, 20000].map(val => (
            <button
              key={val}
              onClick={() => setAmount(val)}
              className={`flex-1 py-3 rounded-full text-sm font-bold border-2 transition-all ${amount === val ? 'bg-blue-500 text-white border-blue-500' : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700'}`}>
              ${val.toLocaleString()}
            </button>
          ))}
        </div>
      </div>

      {/* Método de Pago */}
      <div className="px-4 py-4">
        <h3 className="text-lg font-bold mb-4">Método de Pago</h3>
        <div className="space-y-3">
          <button
            onClick={() => setSelectedCard('visa')}
            className={`w-full p-4 rounded-2xl border-2 flex items-center justify-between transition-all ${selectedCard === 'visa' ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900'}`}>
            <div className="flex items-center gap-3">
              <div className="size-12 bg-zinc-100 dark:bg-zinc-800 rounded-lg flex items-center justify-center">
                <span className="material-symbols-outlined text-blue-600">credit_card</span>
              </div>
              <div className="text-left">
                <p className="font-bold">Visa •••• 4242</p>
                <p className="text-xs text-zinc-500">Expira 12/26</p>
              </div>
            </div>
            {selectedCard === 'visa' && (
              <span className="material-symbols-outlined text-blue-500 fill-1">check_circle</span>
            )}
          </button>
          <button
            onClick={() => setSelectedCard('mastercard')}
            className={`w-full p-4 rounded-2xl border-2 flex items-center justify-between transition-all ${selectedCard === 'mastercard' ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900'}`}>
            <div className="flex items-center gap-3">
              <div className="size-12 bg-zinc-100 dark:bg-zinc-800 rounded-lg flex items-center justify-center">
                <span className="material-symbols-outlined text-orange-600">credit_card</span>
              </div>
              <div className="text-left">
                <p className="font-bold">Mastercard •••• 8890</p>
                <p className="text-xs text-zinc-500">Expira 05/25</p>
              </div>
            </div>
            {selectedCard === 'mastercard' && (
              <span className="material-symbols-outlined text-blue-500 fill-1">check_circle</span>
            )}
          </button>
          <button className="w-full p-4 rounded-2xl border-2 border-dashed border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 flex items-center justify-center gap-2 text-blue-600 font-bold">
            <span className="material-symbols-outlined">add</span>
            Añadir nuevo método de pago
          </button>
        </div>
      </div>

      {/* Resumen */}
      <div className="px-4 py-6 mt-auto">
        <div className="bg-zinc-50 dark:bg-zinc-900 rounded-2xl p-4 mb-4">
          <div className="flex justify-between mb-2">
            <span className="text-sm text-zinc-600 dark:text-zinc-400">Saldo actual</span>
            <span className="font-bold">$12.500</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-sm text-zinc-600 dark:text-zinc-400">Recarga</span>
            <span className="font-bold text-green-600">+${amount.toLocaleString()}</span>
          </div>
          <div className="border-t border-zinc-200 dark:border-zinc-700 my-3"></div>
          <div className="flex justify-between">
            <span className="font-bold">Nuevo balance proyectado</span>
            <span className="text-2xl font-extrabold text-blue-600">${(12500 + amount).toLocaleString()}</span>
          </div>
        </div>
        <div className="flex items-center justify-center gap-2 text-xs text-zinc-500 mb-4">
          <span className="material-symbols-outlined text-sm">lock</span>
          Transacción segura y encriptada
        </div>
        <button className="w-full py-4 bg-blue-600 text-white font-bold rounded-2xl text-lg active:scale-95 transition-transform">
          Cargar Saldo
        </button>
      </div>
    </div>
  );
};

// ========== UBICACION SCREEN ==========
const UbicacionScreen = ({ onNavigate }) => {
  return (
    <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark pb-24">
      {/* Header */}
      <div className="flex items-center p-4 justify-between bg-white dark:bg-zinc-900 border-b border-zinc-100 dark:border-zinc-800">
        <button onClick={() => onNavigate('wallet')} className="flex items-center justify-center size-10">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h2 className="text-lg font-bold">Ubicación y Contacto</h2>
        <div className="size-10"></div>
      </div>

      {/* Mapa */}
      <div className="relative h-64 bg-zinc-200 dark:bg-zinc-800">
        <img src="https://api.mapbox.com/styles/v1/mapbox/light-v11/static/pin-s+f2b90d(-70.6483,-33.4489)/-70.6483,-33.4489,13,0/600x300@2x?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw"
          className="w-full h-full object-cover" alt="Mapa" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="size-12 bg-primary rounded-full flex items-center justify-center shadow-lg">
            <span className="material-symbols-outlined text-2xl text-coffee-dark">location_on</span>
          </div>
        </div>
      </div>

      {/* Info de la tienda */}
      <div className="bg-white dark:bg-zinc-900 p-6 -mt-8 mx-4 rounded-2xl shadow-lg relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold">Kingdom Coffee</h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">Barra de especialidad y Tostaduria</p>
          </div>
          <span className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
            <span className="size-2 bg-green-500 rounded-full"></span>
            ABIERTO
          </span>
        </div>
        <button className="w-full bg-primary text-coffee-dark font-bold py-4 rounded-xl flex items-center justify-center gap-2 mb-4 active:scale-95 transition-transform">
          <span className="material-symbols-outlined">navigation</span>
          Cómo llegar
        </button>
        <p className="text-xs text-zinc-500 text-center">ABRIR EN GOOGLE MAPS O WAZE</p>
      </div>

      {/* Dirección */}
      <div className="px-4 py-4">
        <div className="bg-white dark:bg-zinc-900 rounded-2xl p-4 flex items-start gap-3">
          <div className="size-10 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-primary">home</span>
          </div>
          <div>
            <h4 className="font-bold mb-1">Cardenal Caro 588</h4>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">Rancagua, Región de O'Higgins</p>
          </div>
        </div>
      </div>

      {/* Horarios */}
      <div className="px-4 py-4">
        <div className="bg-white dark:bg-zinc-900 rounded-2xl p-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="size-10 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center">
              <span className="material-symbols-outlined text-primary">schedule</span>
            </div>
            <div>
              <h4 className="font-bold">Horarios de atención</h4>
              <p className="text-sm text-red-600 dark:text-red-400">Cierra a las 20:00 hoy</p>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-zinc-600 dark:text-zinc-400">Lunes - Viernes</span>
              <span className="font-bold">08:30 - 20:00</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-zinc-600 dark:text-zinc-400">Sábados</span>
              <span className="font-bold">09:30 - 19:00</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-zinc-600 dark:text-zinc-400">Domingos</span>
              <span className="font-bold text-red-600 dark:text-red-400">Cerrado</span>
            </div>
          </div>
        </div>
      </div>

      {/* Ponte en contacto */}
      <div className="px-4 py-4">
        <h4 className="font-bold mb-4">Ponte en contacto</h4>
        <div className="grid grid-cols-2 gap-3">
          <button className="bg-green-500 text-white p-4 rounded-2xl flex flex-col items-center gap-2 active:scale-95 transition-transform">
            <span className="material-symbols-outlined text-3xl">chat</span>
            <span className="font-bold text-sm">WhatsApp</span>
          </button>
          <button className="bg-orange-500 text-white p-4 rounded-2xl flex flex-col items-center gap-2 active:scale-95 transition-transform">
            <span className="material-symbols-outlined text-3xl">call</span>
            <span className="font-bold text-sm">Llamar</span>
          </button>
        </div>
        <div className="grid grid-cols-3 gap-3 mt-3">
          <button className="bg-white dark:bg-zinc-900 p-4 rounded-2xl flex flex-col items-center gap-2 active:scale-95 transition-transform">
            <span className="material-symbols-outlined text-2xl text-pink-600">photo_camera</span>
            <span className="text-xs font-bold text-zinc-600 dark:text-zinc-400">INSTAGRAM</span>
          </button>
          <button className="bg-white dark:bg-zinc-900 p-4 rounded-2xl flex flex-col items-center gap-2 active:scale-95 transition-transform">
            <span className="material-symbols-outlined text-2xl text-blue-600">language</span>
            <span className="text-xs font-bold text-zinc-600 dark:text-zinc-400">WEBSITE</span>
          </button>
          <button className="bg-white dark:bg-zinc-900 p-4 rounded-2xl flex flex-col items-center gap-2 active:scale-95 transition-transform">
            <span className="material-symbols-outlined text-2xl text-blue-700">thumb_up</span>
            <span className="text-xs font-bold text-zinc-600 dark:text-zinc-400">FACEBOOK</span>
          </button>
        </div>
      </div>
    </div>
  );
};

// ========== RETOS SCREEN ==========
const RetosScreen = ({ onNavigate }) => {
  return (
    <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark pb-24">
      <div className="flex items-center p-4 justify-between bg-white dark:bg-zinc-900 border-b border-zinc-100 dark:border-zinc-800">
        <button onClick={() => onNavigate('wallet')} className="flex items-center justify-center size-10">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h2 className="text-lg font-bold">Retos Kingdom</h2>
        <button className="flex items-center justify-center size-10">
          <span className="material-symbols-outlined">help_outline</span>
        </button>
      </div>

      <div className="p-4">
        <div className="bg-primary/10 rounded-xl p-6 border border-primary/20">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium">Puntos Acumulados</p>
            <span className="material-symbols-outlined text-primary fill-1">stars</span>
          </div>
          <p className="text-primary text-3xl font-bold mt-2">1,250 pts</p>
        </div>
      </div>

      <div className="px-4">
        <h3 className="text-xl font-bold mb-4">Desafíos del Mes</h3>
        <div className="space-y-4">
          <div className="bg-white dark:bg-zinc-900 rounded-xl overflow-hidden shadow-sm">
            <img src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&q=80" className="w-full h-32 object-cover" alt="Trifecta Semanal" />
            <div className="p-4">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className="font-bold text-lg">Trifecta Semanal</h4>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">Visítanos 3 veces esta semana</p>
                </div>
                <span className="bg-primary/10 text-primary text-sm font-bold px-2 py-1 rounded">+50 pts</span>
              </div>
              <div className="flex justify-between text-xs font-bold mb-2">
                <span>Progreso</span>
                <span>2 / 3 visitas</span>
              </div>
              <div className="w-full bg-zinc-200 dark:bg-zinc-700 h-2.5 rounded-full overflow-hidden">
                <div className="bg-primary h-full" style={{ width: '66%' }}></div>
              </div>
              <button className="mt-4 w-full bg-primary text-coffee-dark font-bold py-2 rounded-lg">Ver detalles</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ========== NIVELES SCREEN ==========
const NivelesScreen = ({ onNavigate }) => {
  return (
    <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark pb-24">
      <div className="flex items-center p-4 justify-between bg-white dark:bg-zinc-900 border-b border-zinc-100 dark:border-zinc-800">
        <button onClick={() => onNavigate('wallet')} className="flex items-center justify-center size-10">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h2 className="text-lg font-bold">Niveles y Beneficios</h2>
        <div className="size-10"></div>
      </div>

      <div className="flex flex-col items-center py-8">
        <div className="size-32 rounded-full bg-gradient-to-br from-orange-300 to-orange-500 flex items-center justify-center border-4 border-white dark:border-zinc-900 shadow-lg">
          <span className="material-symbols-outlined text-6xl text-white">workspace_premium</span>
        </div>
        <h3 className="text-2xl font-bold mt-4">Hola, Café Lover</h3>
        <div className="mt-2 flex items-center gap-2 px-3 py-1 bg-orange-100 dark:bg-orange-900/30 rounded-full">
          <span className="material-symbols-outlined text-orange-600 text-sm">workspace_premium</span>
          <p className="text-orange-600 text-sm font-semibold uppercase tracking-wider">Grano de Bronce</p>
        </div>
      </div>

      <div className="px-4">
        <div className="bg-white dark:bg-zinc-900 p-5 rounded-xl shadow-sm">
          <div className="flex justify-between items-end mb-3">
            <div>
              <p className="text-sm font-medium">Próximo objetivo</p>
              <p className="text-primary text-lg font-bold">Grano de Plata</p>
            </div>
            <p className="text-sm font-bold">350 <span className="text-zinc-500 font-normal">/ 500 granos</span></p>
          </div>
          <div className="h-3 w-full rounded-full bg-zinc-200 dark:bg-zinc-700 overflow-hidden">
            <div className="h-full rounded-full bg-primary" style={{ width: '70%' }}></div>
          </div>
          <p className="text-zinc-500 text-xs mt-2">¡Te faltan solo 150 granos para subir de nivel!</p>
        </div>
      </div>

      <div className="px-4 py-6">
        <h2 className="text-2xl font-bold mb-2">Tu camino Kingdom</h2>
        <p className="text-zinc-500 text-sm mb-6">Desbloquea recompensas exclusivas mientras avanzas.</p>

        <div className="space-y-6">
          <div className="bg-white dark:bg-zinc-900 rounded-xl p-5 border-l-4 border-orange-600 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-bold">Grano de Bronce</h3>
                <p className="text-orange-600 text-sm font-medium">Nivel Inicial • 0 - 499 granos</p>
              </div>
              <span className="material-symbols-outlined text-orange-600">check_circle</span>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="size-8 rounded-lg bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-orange-600">
                  <span className="material-symbols-outlined text-lg">cake</span>
                </div>
                <p className="text-sm">Café de regalo en tu cumpleaños</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="size-8 rounded-lg bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-orange-600">
                  <span className="material-symbols-outlined text-lg">sell</span>
                </div>
                <p className="text-sm">10% dto. en tu primera compra</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-zinc-900 rounded-xl p-5 border-l-4 border-zinc-400 shadow-sm opacity-70">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-bold">Grano de Plata</h3>
                <p className="text-zinc-500 text-sm font-medium">Desde 500 granos</p>
              </div>
              <span className="material-symbols-outlined text-zinc-400">lock</span>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="size-8 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-500">
                  <span className="material-symbols-outlined text-lg">add_circle</span>
                </div>
                <p className="text-sm">Shot de espresso extra gratis</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Bottom Navigation Component
const BottomNav = ({ activeScreen, onNavigate }) => {
  const { cart } = useKingdomStore();
  const tabs = [
    { id: 'wallet', label: 'Inicio', icon: 'home' },
    { id: 'wallet', label: 'Wallet', icon: 'account_balance_wallet' },
    { id: 'menu', label: 'Tienda', icon: 'shopping_bag' },
    { id: 'perfil', label: 'Perfil', icon: 'person' },
  ];

  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md border-t border-zinc-200 dark:border-zinc-800 px-6 py-3 flex justify-between items-center z-50">
      {tabs.map(tab => (
        <button
          key={tab.label}
          onClick={() => onNavigate(tab.id)}
          className={`flex flex-col items-center gap-1 transition-colors ${activeScreen === tab.id ? 'text-primary' : 'text-zinc-400'}`}>
          <span className={`material-symbols-outlined ${activeScreen === tab.id ? 'fill-1' : ''}`}>{tab.icon}</span>
          <span className="text-[10px] font-bold">{tab.label}</span>
        </button>
      ))}
    </div>
  );
};

// Main App Component
function App() {
  const [activeScreen, setActiveScreen] = useState('wallet');

  const renderScreen = () => {
    switch (activeScreen) {
      case 'wallet':
        return <WalletScreen onNavigate={setActiveScreen} />;
      case 'perfil':
        return <PerfilScreen onNavigate={setActiveScreen} />;
      case 'menu':
        return <MenuScreen onNavigate={setActiveScreen} />;
      case 'canjear':
        return <CanjearScreen onNavigate={setActiveScreen} />;
      case 'recargar':
        return <RecargarScreen onNavigate={setActiveScreen} />;
      case 'ubicacion':
        return <UbicacionScreen onNavigate={setActiveScreen} />;
      case 'retos':
        return <RetosScreen onNavigate={setActiveScreen} />;
      case 'niveles':
        return <NivelesScreen onNavigate={setActiveScreen} />;
      default:
        return <WalletScreen onNavigate={setActiveScreen} />;
    }
  };

  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-coffee-dark dark:text-white antialiased min-h-screen">
      <div className="relative flex min-h-screen w-full flex-col max-w-[480px] mx-auto overflow-x-hidden shadow-2xl">
        {renderScreen()}
        <BottomNav activeScreen={activeScreen} onNavigate={setActiveScreen} />
      </div>
    </div>
  );
}

export default App;
