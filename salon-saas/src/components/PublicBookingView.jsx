import React, { useState, useEffect } from 'react';
import { api } from '../api';
import { Calendar, Clock, User, Scissors, CheckCircle, ArrowLeft, Send } from 'lucide-react';

const PublicBookingView = ({ slug }) => {
    const [salonInfo, setSalonInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [step, setStep] = useState(1); // 1: Service, 2: Stylist, 3: Date/Time, 4: Client Info, 5: Success
    const [bookingData, setBookingData] = useState({
        serviceId: '',
        stylistId: '',
        date: '',
        time: '',
        clientName: '',
        clientPhone: '',
        clientEmail: '',
        notes: ''
    });

    const [error, setError] = useState(null);

    useEffect(() => {
        if (slug) {
            fetchSalonInfo();
        }
    }, [slug]);

    const fetchSalonInfo = async () => {
        try {
            const info = await api.getPublicSalonInfo(slug);
            setSalonInfo(info);
            setLoading(false);
        } catch (e) {
            setError("No pudimos encontrar el salón solicitado.");
            setLoading(false);
        }
    };

    const handleBooking = async () => {
        try {
            setLoading(true);
            const startDateTime = new Date(`${bookingData.date}T${bookingData.time}`);
            const payload = {
                stylist_id: bookingData.stylistId,
                service_id: bookingData.serviceId,
                start_time: startDateTime.toISOString(),
                client_name: bookingData.clientName,
                client_phone: bookingData.clientPhone,
                client_email: bookingData.clientEmail || null,
                notes: bookingData.notes
            };
            await api.publicBook(slug, payload);
            setStep(5);
        } catch (e) {
            setError(e.message || "Error al procesar la reserva.");
        } finally {
            setLoading(false);
        }
    };

    if (loading && step === 1) return (
        <div className="h-screen flex flex-col items-center justify-center bg-slate-50 p-6 text-center">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-slate-500 font-medium">Buscando salón...</p>
        </div>
    );

    if (error && !salonInfo) return (
        <div className="h-screen flex flex-col items-center justify-center p-6 text-center bg-white">
            <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-6">
                <Scissors size={32} className="rotate-45" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">¡Ups! Algo salió mal</h2>
            <p className="text-slate-500 mb-8 max-w-xs">{error}</p>
            <button
                onClick={() => window.location.href = '/'}
                className="bg-primary text-white px-8 py-3 rounded-2xl font-bold shadow-lg"
            >
                Ir a Inicio
            </button>
        </div>
    );

    const selectedService = salonInfo?.services.find(s => s.id === bookingData.serviceId);

    return (
        <div className="min-h-screen bg-slate-50 font-sans">
            {/* Header Area */}
            <div className="bg-white border-b border-gray-100 p-4 sticky top-0 z-10 shadow-sm">
                <div className="max-w-md mx-auto flex items-center gap-3">
                    {step > 1 && step < 5 && (
                        <button onClick={() => setStep(step - 1)} className="p-2 -ml-2 text-slate-500 hover:bg-slate-50 rounded-full transition-colors">
                            <ArrowLeft size={20} />
                        </button>
                    )}
                    <div className="flex-1">
                        <h1 className="font-bold text-slate-800 text-lg line-clamp-1">{salonInfo?.business_name || 'Agendar Cita'}</h1>
                        {step < 5 && (
                            <div className="flex items-center gap-1.5 mt-0.5">
                                <div className="flex-1 h-1 bg-slate-100 rounded-full overflow-hidden">
                                    <div className="h-full bg-primary transition-all duration-300" style={{ width: `${(step / 4) * 100}%` }}></div>
                                </div>
                                <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider shrink-0">{step} de 4</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="max-w-md mx-auto p-4 md:p-6 pb-24">
                {/* Step 1: Select Service */}
                {step === 1 && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
                        <h2 className="text-2xl font-extrabold text-slate-800 mb-6">¿Qué servicio necesitas?</h2>
                        <div className="space-y-3">
                            {salonInfo?.services.map(service => (
                                <button
                                    key={service.id}
                                    onClick={() => { setBookingData({ ...bookingData, serviceId: service.id }); setStep(2); }}
                                    className="w-full bg-white p-4 rounded-2xl border border-slate-200 hover:border-primary/50 transition-all text-left flex items-center gap-4 group active:scale-[0.98] shadow-sm hover:shadow-md"
                                >
                                    <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white shrink-0 shadow-sm group-hover:scale-110 transition-transform" style={{ backgroundColor: service.color }}>
                                        <Scissors size={20} />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-bold text-slate-800">{service.name}</h3>
                                        <div className="flex items-center gap-3 text-[11px] text-slate-500 mt-1">
                                            <span className="flex items-center gap-1 bg-slate-50 px-2 py-0.5 rounded-full"><Clock size={10} /> {service.duration} min</span>
                                            <span className="font-bold text-primary">${service.price.toLocaleString('es-CL')}</span>
                                        </div>
                                    </div>
                                </button>
                            ))}
                            {salonInfo?.services.length === 0 && (
                                <div className="text-center py-12 text-slate-400 italic">No hay servicios disponibles por ahora.</div>
                            )}
                        </div>
                    </div>
                )}

                {/* Step 2: Select Stylist */}
                {step === 2 && (
                    <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                        <h2 className="text-2xl font-extrabold text-slate-800 mb-2">¿Con quién quieres atenderte?</h2>
                        <p className="text-xs font-bold text-primary uppercase mb-6">{selectedService?.name}</p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {salonInfo?.stylists.map(stylist => (
                                <button
                                    key={stylist.id}
                                    onClick={() => { setBookingData({ ...bookingData, stylistId: stylist.id }); setStep(3); }}
                                    className="bg-white p-5 rounded-2xl border border-slate-200 text-center flex flex-col items-center gap-3 transition-all active:scale-[0.98] shadow-sm hover:shadow-md hover:border-primary/30 group"
                                >
                                    <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-slate-50 shadow-md group-hover:border-primary/20 transition-all">
                                        {stylist.avatar ? (
                                            <img src={stylist.avatar} className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-white font-bold text-2xl" style={{ backgroundColor: stylist.color }}>
                                                {stylist.name.substring(0, 2).toUpperCase()}
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex flex-col">
                                        <h3 className="font-bold text-slate-800 text-base">{stylist.name}</h3>
                                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-1">{stylist.specialty || 'Profesional'}</p>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Step 3: Date & Time */}
                {step === 3 && (
                    <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                        <h2 className="text-2xl font-extrabold text-slate-800 mb-6">Elige el momento</h2>

                        <div className="space-y-6">
                            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                                <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-3">Fecha de la cita</label>
                                <input
                                    type="date"
                                    min={new Date().toISOString().split('T')[0]}
                                    value={bookingData.date}
                                    onChange={(e) => setBookingData({ ...bookingData, date: e.target.value })}
                                    className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl font-bold text-slate-700 outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                                />
                            </div>

                            {bookingData.date && (
                                <div className="space-y-4">
                                    <label className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-widest px-1">Horarios disponibles</label>
                                    <div className="grid grid-cols-3 gap-3">
                                        {['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '15:00', '15:30', '16:00', '16:30', '17:00'].map(hour => (
                                            <button
                                                key={hour}
                                                onClick={() => { setBookingData({ ...bookingData, time: hour }); setStep(4); }}
                                                className={`p-4 rounded-xl font-bold text-sm transition-all active:scale-95 shadow-sm
                                                    ${bookingData.time === hour ? 'bg-primary text-white' : 'bg-white text-slate-700 border border-slate-200 hover:border-primary/50'}
                                                `}
                                            >
                                                {hour}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Step 4: Client Info */}
                {step === 4 && (
                    <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                        <h2 className="text-2xl font-extrabold text-slate-800 mb-2">Finalizar Reserva</h2>
                        <p className="text-slate-500 text-sm mb-6">Por favor ingresa tus datos para confirmar.</p>

                        <form onSubmit={(e) => { e.preventDefault(); handleBooking(); }} className="space-y-4">
                            <div className="space-y-1">
                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1">Nombre Completo</label>
                                <input
                                    placeholder="Ej: Juan Pérez"
                                    required
                                    value={bookingData.clientName}
                                    onChange={e => setBookingData({ ...bookingData, clientName: e.target.value })}
                                    className="w-full p-4 bg-white border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1">WhatsApp / Celular</label>
                                    <input
                                        placeholder="Ej: +56 9 1234 5678"
                                        required
                                        type="tel"
                                        value={bookingData.clientPhone}
                                        onChange={e => setBookingData({ ...bookingData, clientPhone: e.target.value })}
                                        className="w-full p-4 bg-white border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1">Email</label>
                                    <input
                                        placeholder="Ej: juan@mail.com"
                                        type="email"
                                        value={bookingData.clientEmail}
                                        onChange={e => setBookingData({ ...bookingData, clientEmail: e.target.value })}
                                        className="w-full p-4 bg-white border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                                    />
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1">Notas adicionales (opcional)</label>
                                <textarea
                                    placeholder="¿Algún detalle que debamos saber?"
                                    value={bookingData.notes}
                                    onChange={e => setBookingData({ ...bookingData, notes: e.target.value })}
                                    className="w-full p-4 bg-white border border-slate-200 rounded-2xl outline-none h-24 focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                                />
                            </div>

                            {error && (
                                <div className="bg-red-50 text-red-500 p-4 rounded-xl text-sm font-medium flex items-center gap-2 border border-red-100">
                                    <Clock size={16} /> {error}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-primary py-5 rounded-2xl text-white font-bold text-lg shadow-xl shadow-primary/30 flex items-center justify-center gap-3 active:scale-[0.98] transition-all disabled:opacity-50 mt-4 group"
                            >
                                {loading ? (
                                    <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                                ) : (
                                    <>Confirmar Reserva <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /></>
                                )}
                            </button>
                        </form>
                    </div>
                )}

                {/* Step 5: Success */}
                {step === 5 && (
                    <div className="text-center py-12 animate-in mb-8">
                        <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl relative">
                            <CheckCircle size={56} />
                            <div className="absolute inset-0 bg-green-400 rounded-full animate-ping opacity-20"></div>
                        </div>

                        <h2 className="text-3xl font-extrabold text-slate-800 mb-3">¡Reserva Lista!</h2>
                        <p className="text-slate-500 mb-10 px-6 font-medium leading-relaxed">
                            Tu cita para <span className="text-slate-800 font-bold">{selectedService?.name}</span> ha sido agendada con éxito para el <span className="text-primary font-bold">{bookingData.date}</span> a las <span className="text-primary font-bold">{bookingData.time}</span>.
                        </p>

                        <div className="space-y-3">
                            <button
                                onClick={() => window.location.reload()}
                                className="w-full bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold shadow-lg active:scale-95 transition-all"
                            >
                                Finalizar
                            </button>
                            <button
                                onClick={() => setStep(1)}
                                className="w-full bg-white border border-slate-200 text-slate-500 px-8 py-4 rounded-2xl font-bold active:scale-95 transition-all"
                            >
                                Hacer otra reserva
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Simple Footer */}
            <div className="max-w-md mx-auto py-8 text-center border-t border-slate-200/50 mt-12 bg-white/50">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center justify-center gap-2">
                    Powered by <span className="text-primary tracking-normal lowercase">salonplus.cl</span>
                </p>
            </div>
        </div>
    );
};

export default PublicBookingView;
