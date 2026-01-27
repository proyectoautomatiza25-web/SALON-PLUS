import React, { useState, Fragment } from 'react';
import { useSalonStore } from '../store';
import { Scissors, Calendar, BarChart, CheckCircle, ArrowRight, User } from 'lucide-react';

const LandingPage = () => {
    const { login } = useSalonStore();
    const [email, setEmail] = useState('');
    const [emailSent, setEmailSent] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleLogin = (e) => {
        e.preventDefault();
        if (email) {
            setLoading(true);
            // Simulate API call to send email
            setTimeout(() => {
                setLoading(false);
                setEmailSent(true);
                // In a real app, the backend sends the email. 
                // Here we simulate the "Magic Link" arrival via a toast or just changing UI.
            }, 1500);
        }
    };

    const confirmMagicLink = () => {
        login(email);
    };

    return (
        <div className="min-h-screen bg-slate-900 text-white font-sans selection:bg-pink-500 selection:text-white">

            {/* Navbar */}
            <nav className="container mx-auto px-6 py-6 flex justify-between items-center">
                <div className="flex items-center gap-2 text-2xl font-bold tracking-tighter">
                    <div className="w-8 h-8 bg-gradient-to-tr from-pink-500 to-indigo-500 rounded-lg flex items-center justify-center">
                        <Scissors size={20} className="text-white" />
                    </div>
                    SalonPlus
                </div>
                <div className="hidden md:flex gap-8 text-sm font-medium text-slate-300">
                    <a href="#features" className="hover:text-white transition-colors">Características</a>
                    <a href="#pricing" className="hover:text-white transition-colors">Precios</a>
                    <a href="#" className="hover:text-white transition-colors">Soporte</a>
                </div>
                <button
                    onClick={() => document.getElementById('login-form').scrollIntoView({ behavior: 'smooth' })}
                    className="px-5 py-2 rounded-full border border-slate-700 hover:bg-slate-800 transition-all font-medium text-sm"
                >
                    Acceso Clientes
                </button>
            </nav>

            {/* Hero Section */}
            <section className="container mx-auto px-6 py-20 md:py-32 flex flex-col md:flex-row items-center gap-16">
                <div className="md:w-1/2 space-y-8">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-bold uppercase tracking-wider border border-indigo-500/20">
                        <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
                        Nuevo SaaS para Chile
                    </div>
                    <h1 className="text-5xl md:text-7xl font-extrabold leading-tight tracking-tight">
                        Gestiona tu <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-indigo-500">Salón</span> de forma inteligente.
                    </h1>
                    <p className="text-xl text-slate-400 max-w-lg leading-relaxed">
                        Agenda, Inventario, Caja y Marketing en un solo lugar. Diseñado para estilistas, barberos y centros de estética.
                    </p>

                    {/* Login Form (Magic Link Style) */}
                    {!emailSent ? (
                        <form onSubmit={handleLogin} id="login-form" className="bg-slate-800/50 p-2 rounded-2xl border border-slate-700/50 flex flex-col sm:flex-row gap-2 max-w-md backdrop-blur-sm">
                            <input
                                type="email"
                                placeholder="tucorreo@empresa.com"
                                className="bg-transparent text-white px-4 py-3 outline-none flex-1 placeholder:text-slate-500"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <button
                                type="submit"
                                disabled={loading}
                                className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-indigo-500/20 flex items-center justify-center gap-2 whitespace-nowrap disabled:opacity-50"
                            >
                                {loading ? 'Enviando...' : <Fragment>Ingresar Gratis <ArrowRight size={18} /></Fragment>}
                            </button>
                        </form>
                    ) : (
                        <div className="bg-green-500/10 p-6 rounded-2xl border border-green-500/30 max-w-md animate-fade-in-up">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white shadow-lg shadow-green-900/20">
                                    <CheckCircle size={24} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg text-white">¡Correo Enviado!</h3>
                                    <p className="text-slate-400 text-sm">Revisa tu bandeja de entrada en <strong>{email}</strong></p>
                                </div>
                            </div>
                            <div className="bg-slate-900/50 p-4 rounded-xl text-center">
                                <p className="text-xs text-slate-500 uppercase tracking-wider font-bold mb-2">Simulación de Demo</p>
                                <button
                                    onClick={confirmMagicLink}
                                    className="w-full py-3 bg-white text-slate-900 font-bold rounded-lg hover:bg-slate-200 transition-colors flex items-center justify-center gap-2"
                                >
                                    Abrir "Link Mágico" <ArrowRight size={16} />
                                </button>
                            </div>
                        </div>
                    )}

                    {!emailSent && (
                        <p className="text-xs text-slate-500 pl-2">
                            * Sin tarjeta de crédito requerida. 7 días de prueba gratis.
                        </p>
                    )}
                </div>

                {/* Hero Image / Mockup - High Value Preview */}
                <div className="md:w-1/2 relative perspective-1000">
                    <div className="absolute inset-0 bg-gradient-to-tr from-pink-500/20 to-indigo-500/20 rounded-full blur-3xl -z-10"></div>

                    {/* Simulated App Window */}
                    <div className="relative bg-slate-900 rounded-2xl border border-slate-700 shadow-2xl overflow-hidden transform rotate-y-6 rotate-x-3 hover:rotate-0 transition-all duration-700 w-full h-[500px] flex flex-col">

                        {/* Fake Browser Header */}
                        <div className="h-8 bg-slate-800 border-b border-slate-700 flex items-center px-4 gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-500"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                            <div className="w-3 h-3 rounded-full bg-green-500"></div>
                            <div className="ml-4 px-3 py-1 bg-slate-900 rounded-md text-[10px] text-slate-500 font-mono w-48 text-center flex items-center justify-center gap-1">
                                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span> app.salonplus.cl
                            </div>
                        </div>

                        {/* Simulated Dashboard Content */}
                        <div className="flex-1 p-6 bg-slate-900 flex flex-col gap-6 font-sans">

                            {/* KPI Row */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 relative overflow-hidden group">
                                    <div className="absolute right-0 top-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                                        <BarChart size={48} className="text-indigo-500" />
                                    </div>
                                    <h4 className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">Ventas Hoy</h4>
                                    <div className="text-2xl font-bold text-white flex items-end gap-2">
                                        $184.990
                                        <span className="text-xs text-green-400 font-bold bg-green-400/10 px-1 rounded mb-1">+12%</span>
                                    </div>
                                </div>
                                <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 relative overflow-hidden group">
                                    <div className="absolute right-0 top-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                                        <Calendar size={48} className="text-pink-500" />
                                    </div>
                                    <h4 className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">Citas Hoy</h4>
                                    <div className="text-2xl font-bold text-white flex items-end gap-2">
                                        12 <span className="text-sm font-normal text-slate-400">agendadas</span>
                                    </div>
                                </div>
                            </div>

                            {/* Active Queue List */}
                            <div className="flex-1 bg-slate-800 rounded-xl border border-slate-700 overflow-hidden flex flex-col">
                                <div className="p-4 border-b border-slate-700 flex justify-between items-center bg-slate-800/50">
                                    <h5 className="font-bold text-sm text-slate-300">Próximas Citas (En vivo)</h5>
                                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]"></span>
                                </div>
                                <div className="p-2 space-y-2">
                                    {/* Item 1 */}
                                    <div className="flex items-center gap-3 p-3 bg-slate-700/30 rounded-lg border border-slate-700/50 hover:bg-slate-700/50 transition-colors">
                                        <div className="text-xs font-bold text-slate-400 w-10 text-right">09:30</div>
                                        <div className="w-8 h-8 rounded-full bg-pink-500 flex items-center justify-center text-xs font-bold text-white ring-2 ring-slate-800">VM</div>
                                        <div className="flex-1 min-w-0">
                                            <div className="text-sm font-bold text-white truncate">Valentina Muñoz</div>
                                            <div className="text-xs text-pink-400 truncate">Balayage + Corte (3h)</div>
                                        </div>
                                        <div className="px-2 py-1 bg-green-500/10 text-green-400 text-[10px] font-bold rounded border border-green-500/20 uppercase">Confirmada</div>
                                    </div>

                                    {/* Item 2 */}
                                    <div className="flex items-center gap-3 p-3 bg-slate-700/30 rounded-lg border border-slate-700/50 hover:bg-slate-700/50 transition-colors">
                                        <div className="text-xs font-bold text-slate-400 w-10 text-right">11:00</div>
                                        <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-xs font-bold text-white ring-2 ring-slate-800">CL</div>
                                        <div className="flex-1 min-w-0">
                                            <div className="text-sm font-bold text-white truncate">Carolina Lagos</div>
                                            <div className="text-xs text-blue-400 truncate">Perfilado Cejas</div>
                                        </div>
                                        <div className="px-2 py-1 bg-yellow-500/10 text-yellow-500 text-[10px] font-bold rounded border border-yellow-500/20 uppercase">Pendiente</div>
                                    </div>

                                    {/* Item 3 */}
                                    <div className="flex items-center gap-3 p-3 bg-slate-700/30 rounded-lg border border-slate-700/50 hover:bg-slate-700/50 transition-colors">
                                        <div className="text-xs font-bold text-slate-400 w-10 text-right">12:15</div>
                                        <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-xs font-bold text-white ring-2 ring-slate-800">FP</div>
                                        <div className="flex-1 min-w-0">
                                            <div className="text-sm font-bold text-white truncate">Fernanda Pizarro</div>
                                            <div className="text-xs text-purple-400 truncate">Manicure Permanente</div>
                                        </div>
                                        <div className="px-2 py-1 bg-green-500/10 text-green-400 text-[10px] font-bold rounded border border-green-500/20 uppercase">Confirmada</div>
                                    </div>
                                </div>
                            </div>

                            {/* Floating Toast Notification */}
                            <div className="absolute bottom-6 right-6 bg-slate-800 border border-slate-600 shadow-xl rounded-lg p-3 flex items-center gap-3 animate-bounce">
                                <div className="bg-green-500 p-1.5 rounded-full text-white">
                                    <CheckCircle size={12} />
                                </div>
                                <div className="text-xs">
                                    <p className="font-bold text-white">Nueva Reserva Online</p>
                                    <p className="text-slate-400">Hace 2 minutos</p>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section id="features" className="py-24 bg-slate-950">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold mb-4">Todo lo que necesitas</h2>
                        <p className="text-slate-400">Deja de usar papel y lápiz. Pásate a la nube.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { icon: Calendar, title: "Agenda Online", desc: "Tus clientes reservan 24/7 sin llamarte." },
                            { icon: User, title: "Ficha de Clientes", desc: "Historial de servicios, deuda y preferencias." },
                            { icon: BarChart, title: "Finanzas Claras", desc: "Reportes de ventas, comisiones y caja diaria." }
                        ].map((feature, i) => (
                            <div key={i} className="bg-slate-900 p-8 rounded-2xl border border-slate-800 hover:border-pink-500/50 transition-colors group">
                                <feature.icon size={32} className="text-slate-500 group-hover:text-pink-500 mb-6 transition-colors" />
                                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                                <p className="text-slate-400 text-sm leading-relaxed">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 border-t border-slate-800 text-center text-slate-500 text-sm">
                <p>© 2026 SalonPlus by Automatiza Sur. Todos los derechos reservados.</p>
            </footer>

        </div>
    );
};

export default LandingPage;
