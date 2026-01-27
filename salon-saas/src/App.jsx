import React, { useState } from 'react';
import CalendarView from './components/CalendarView';
import ClientsView from './components/ClientsView';
import CheckoutView from './components/CheckoutView';
import StaffView from './components/StaffView';
import ProductsView from './components/ProductsView';
import SalonProfileView from './components/SalonProfileView';
import DashboardView from './components/DashboardView';
import ReportsView from './components/ReportsView';
import AppointmentsListView from './components/AppointmentsListView';
import BillingExpiredView from './components/BillingExpiredView';
import LandingPage from './components/LandingPage';
import { useSalonStore } from './store';
import { Calendar, Users, ShoppingBag, PieChart, Menu, Bell, Clock, AlertTriangle } from 'lucide-react';
import SalonLogo from './components/SalonLogo';

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const { subscription, expireDemo, auth } = useSalonStore();

  // 1. Auth Check
  if (!auth.isAuthenticated) {
    return <LandingPage />;
  }

  // 2. Trial Status Check
  const now = new Date();
  const trialEnd = new Date(subscription.trialEnd);
  const isExpired = subscription.planType === 'demo' && !subscription.active && now > trialEnd;
  const daysLeft = Math.ceil((trialEnd - now) / (1000 * 60 * 60 * 24));
  const isOnTrial = subscription.planType === 'demo' && !subscription.active && !isExpired;

  if (isExpired) {
    return <BillingExpiredView />;
  }

  // Salonist-like menu items (Español)
  const menuItems = [
    { id: 'home', icon: <div className="p-1"><Calendar size={20} /></div>, label: 'Inicio' },
    { id: 'quicksale', icon: <ShoppingBag size={20} />, label: 'Venta Rápida' },
    { id: 'calendar', icon: <Calendar size={20} />, label: 'Calendario' },
    { id: 'staff', icon: <Users size={20} />, label: 'Equipo' },
    { id: 'products', icon: <ShoppingBag size={20} />, label: 'Productos' },
    { id: 'clients', icon: <Users size={20} />, label: 'Clientes' },
    { id: 'online', icon: <Users size={20} />, label: 'Perfil Online' },
    { id: 'catalogue', icon: <ShoppingBag size={20} />, label: 'Catálogo' },
    { id: 'appointments', icon: <Calendar size={20} />, label: 'Citas' },
    { id: 'reports', icon: <PieChart size={20} />, label: 'Reportes' },
  ];

  return (
    <div className="flex h-screen bg-white font-sans text-slate-900 overflow-hidden">

      {/* --- Sidebar (Salonist Style) --- */}
      <aside className="w-[100px] bg-[#0b1120] flex flex-col z-20 shadow-xl text-white flex-shrink-0">
        {/* Logo Icon Area */}
        <div className="h-16 flex items-center justify-center border-b border-gray-800">
          <div className="text-2xl font-serif font-bold tracking-tighter">S</div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-2 custom-scrollbar">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex flex-col items-center justify-center gap-1.5 py-4 px-1 transition-all duration-200 border-l-4 ${activeTab === item.id
                ? 'bg-[#3b82f6] border-[#60a5fa]' // Blue active state
                : 'border-transparent text-gray-400 hover:text-white hover:bg-white/5'
                }`}
            >
              <span className={`${activeTab === item.id ? 'text-white' : ''}`}>
                {item.icon}
              </span>
              <span className="text-[10px] uppercase font-semibold tracking-wide text-center leading-tight max-w-full px-1">{item.label}</span>
            </button>
          ))}
        </nav>
      </aside>

      {/* --- Main Content Area --- */}
      <main className="flex-1 flex flex-col min-w-0 bg-slate-50 relative">

        {/* TRIAL BANNER */}
        {isOnTrial && (
          <div className="bg-indigo-600 text-white text-sm py-1 px-4 flex justify-between items-center z-20">
            <div className="flex items-center gap-2">
              <Clock size={14} />
              <span className="font-medium">Modo Demo: Quedan {daysLeft} días de prueba gratuita.</span>
            </div>
            <button onClick={expireDemo} className="text-indigo-200 hover:text-white text-xs underline">Simular Vencimiento</button>
          </div>
        )}

        {/* Top Header */}
        <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-6 z-10 shadow-sm">
          {/* Left: Hamburger & Brand */}
          <div className="flex items-center gap-4">
            <button className="text-gray-500 hover:text-gray-800"><Menu size={24} /></button>
            <SalonLogo />
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center text-xs font-bold ring-2 ring-pink-50">ES</div>
            <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
              <Bell size={22} />
              <span className="absolute top-1.5 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
            </button>
            <div className="w-9 h-9 rounded-full bg-[#1e1b4b] text-white flex items-center justify-center font-bold shadow-md">M</div>
          </div>
        </header>

        {/* Dynamic Content */}
        <div className="flex-1 p-6 overflow-hidden">

          {activeTab === 'home' && <DashboardView />}

          {activeTab === 'calendar' && <CalendarView />}

          {activeTab === 'clients' && <ClientsView />}

          {activeTab === 'staff' && <StaffView />}

          {(activeTab === 'products' || activeTab === 'catalogue') && <ProductsView />}

          {(activeTab === 'quicksale' || activeTab === 'checkout') && <CheckoutView />}

          {activeTab === 'online' && <SalonProfileView />}

          {activeTab === 'reports' && <ReportsView />}

          {activeTab === 'appointments' && <AppointmentsListView />}

        </div>

      </main>
    </div>
  );
}

export default App;
