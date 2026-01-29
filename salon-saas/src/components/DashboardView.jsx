import React from 'react';
import { useSalonStore } from '../store';
import { TrendingUp, Users, Calendar, DollarSign, Clock, ArrowUpRight, Activity } from 'lucide-react';

const DashboardView = () => {
    const { appointments, clients, stylists, services } = useSalonStore();

    // Basic Stats Calculation
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const todayAppointments = appointments.filter(a => {
        const apptDate = new Date(a.start);
        return apptDate.getDate() === today.getDate() &&
            apptDate.getMonth() === today.getMonth() &&
            apptDate.getFullYear() === today.getFullYear();
    });

    const pendingAppointments = appointments.filter(a => a.status === 'pending');

    // Simulate some sales data
    const totalSales = 1250000; // Hardcoded for demo
    const monthlyGrowth = 12.5;

    return (
        <div className="h-full flex flex-col bg-slate-50/50 rounded-2xl overflow-y-auto animate-in fade-in zoom-in-95 duration-300 font-sans">

            {/* Header */}
            <div className="mb-4 md:mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-slate-800">Bienvenido, Admin</h2>
                <p className="text-sm md:text-base text-slate-500">Aquí está el resumen de tu salón para hoy.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">

                {/* Card 1: Sales */}
                <div className="bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-2 md:p-3 bg-indigo-50 text-indigo-600 rounded-xl">
                            <DollarSign size={20} />
                        </div>
                        <span className="flex items-center text-green-500 bg-green-50 px-2 py-1 rounded-lg text-xs font-bold">
                            +{monthlyGrowth}% <ArrowUpRight size={12} className="ml-1" />
                        </span>
                    </div>
                    <div>
                        <span className="block text-slate-500 text-xs md:text-sm font-medium mb-1">Ventas Totales</span>
                        <h3 className="text-xl md:text-2xl font-bold text-slate-800">${totalSales.toLocaleString('es-CL')}</h3>
                    </div>
                </div>

                {/* Card 2: Appointments */}
                <div className="bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-2 md:p-3 bg-pink-50 text-pink-600 rounded-xl">
                            <Calendar size={20} />
                        </div>
                    </div>
                    <div>
                        <span className="block text-slate-500 text-xs md:text-sm font-medium mb-1">Citas Hoy</span>
                        <h3 className="text-xl md:text-2xl font-bold text-slate-800">{todayAppointments.length}</h3>
                    </div>
                </div>

                {/* Card 3: Clients */}
                <div className="bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-2 md:p-3 bg-blue-50 text-blue-600 rounded-xl">
                            <Users size={20} />
                        </div>
                    </div>
                    <div>
                        <span className="block text-slate-500 text-xs md:text-sm font-medium mb-1">Clientes Activos</span>
                        <h3 className="text-xl md:text-2xl font-bold text-slate-800">{clients.length}</h3>
                    </div>
                </div>

                {/* Card 4: Staff */}
                <div className="bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-2 md:p-3 bg-orange-50 text-orange-600 rounded-xl">
                            <Activity size={20} />
                        </div>
                    </div>
                    <div>
                        <span className="block text-slate-500 text-xs md:text-sm font-medium mb-1">Profesionales</span>
                        <h3 className="text-xl md:text-2xl font-bold text-slate-800">{stylists.length}</h3>
                    </div>
                </div>
            </div>

            {/* Split Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Recent Activity / Appointments */}
                <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-bold text-slate-800">Citas Recientes</h3>
                        <button className="text-sm text-primary font-semibold hover:underline">Ver todo</button>
                    </div>

                    <div className="space-y-4">
                        {appointments.slice(0, 5).map(appt => (
                            <div key={appt.id} className="flex items-center justify-between p-3 md:p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
                                <div className="flex items-center gap-3 md:gap-4 flex-1 min-w-0">
                                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white border border-slate-200 flex items-center justify-center font-bold text-slate-600 text-xs md:text-sm shrink-0">
                                        {appt.clientName.substring(0, 2).toUpperCase()}
                                    </div>
                                    <div className="min-w-0">
                                        <h4 className="font-bold text-slate-800 text-sm md:text-base truncate">{appt.clientName}</h4>
                                        <p className="text-[10px] md:text-xs text-slate-500 truncate">{appt.title}</p>
                                    </div>
                                </div>
                                <div className="text-right ml-2 shrink-0">
                                    <span className="block text-xs md:text-sm font-bold text-slate-700">
                                        {new Date(appt.start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </span>
                                    <span className={`inline-block px-1.5 py-0.5 rounded-full text-[9px] md:text-[10px] font-bold uppercase ${appt.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                                        appt.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-500'
                                        }`}>
                                        {appt.status}
                                    </span>
                                </div>
                            </div>
                        ))}
                        {appointments.length === 0 && (
                            <div className="text-center py-8 text-slate-400">No hay citas registradas.</div>
                        )}
                    </div>
                </div>

                {/* Top Services */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                    <h3 className="text-lg font-bold text-slate-800 mb-6">Servicios Populares</h3>
                    <div className="space-y-6">
                        {services.slice(0, 4).map((service, index) => (
                            <div key={service.id}>
                                <div className="flex justify-between text-sm font-medium text-slate-700 mb-1">
                                    <span>{service.name}</span>
                                    <span>{90 - (index * 15)}%</span> {/* Fake stat */}
                                </div>
                                <div className="w-full bg-slate-100 rounded-full h-2">
                                    <div
                                        className="bg-primary h-2 rounded-full"
                                        style={{ width: `${90 - (index * 15)}%`, opacity: 1 - (index * 0.15) }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-8 pt-6 border-t border-slate-100">
                        <UpgradeCard />
                    </div>
                </div>

            </div>
        </div>
    );
};

const UpgradeCard = () => {
    const { getTrialStatus, auth } = useSalonStore();
    const { isPaying, daysLeft } = getTrialStatus();
    const [loading, setLoading] = React.useState(false);
    const API_URL = 'https://authentic-tenderness-production-a8bc.up.railway.app';

    if (isPaying) return null;

    const handleUpgrade = async () => {
        setLoading(true);
        try {
            const res = await fetch(`${API_URL}/api/billing/create-subscription`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${auth.token}`,
                    'Content-Type': 'application/json'
                }
            });
            const data = await res.json();
            if (data.url) {
                window.location.href = data.url;
            } else {
                alert("No se pudo generar el link de pago.");
            }
        } catch (e) {
            alert("Error al conectar con Mercado Pago.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-gradient-to-br from-[#1e1b4b] to-[#4338ca] rounded-xl p-6 text-white text-center shadow-lg transform hover:scale-[1.02] transition-all">
            <h4 className="font-bold text-xl mb-1">¡Pásate a Pro!</h4>
            <p className="text-white/80 text-xs mb-4">
                Te quedan {daysLeft} días de prueba. Activa hoy y asegura tu precio especial.
            </p>
            <button
                onClick={handleUpgrade}
                disabled={loading}
                className="w-full bg-white text-[#1e1b4b] py-2.5 rounded-lg font-bold text-sm shadow-md hover:bg-slate-50 transition-colors flex items-center justify-center gap-2"
            >
                {loading ? 'Cargando...' : 'Suscribirme con Mercado Pago'}
            </button>
            <div className="mt-3 flex justify-center gap-2 opacity-60">
                <img src="https://logodownload.org/wp-content/uploads/2019/06/mercado-pago-logo.png" className="h-4 object-contain contrast-0 brightness-200" alt="Mercado Pago" />
            </div>
        </div>
    );
};


export default DashboardView;
