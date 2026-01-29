import React, { useState } from 'react';
import { Shield, Zap, CreditCard, PlayCircle, Loader2 } from 'lucide-react';
import { useSalonStore } from '../store';

const BillingExpiredView = () => {
    const { businessName } = useSalonStore();
    const [processing, setProcessing] = useState(false);

    const handleFlowContact = () => {
        setProcessing(true);
        // Próximamente integración con Flow
        setTimeout(() => {
            window.open('https://wa.me/56999999999?text=Hola,%20necesito%20activar%20mi%20suscripción%20de%20Salon%20Plus%20con%20Flow', '_blank');
            setProcessing(false);
        }, 1000);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900 text-white p-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500 rounded-full blur-3xl"></div>
            </div>

            <div className="z-10 max-w-4xl w-full text-center">
                <div className="mb-8">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-2xl mb-6 shadow-lg shadow-indigo-500/20">
                        <Shield size={40} className="text-white" />
                    </div>
                    <h1 className="text-4xl font-extrabold mb-4 tracking-tight">Tu periodo de prueba ha terminado</h1>
                    <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto">
                        Hola <b>{businessName}</b>, para continuar gestionando tu salón, activa tu plan hoy mismo. Estamos actualizando nuestro sistema de pagos para ofrecerte una mejor experiencia.
                    </p>
                </div>

                <div className="max-w-md mx-auto">
                    <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-8 border border-slate-700 relative shadow-2xl">
                        <div className="absolute top-0 right-0 bg-indigo-500 text-[10px] font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg uppercase tracking-widest">Plan Pro</div>
                        <h3 className="text-xl font-bold text-white mb-2">Suscripción SalonPlus</h3>
                        <div className="text-4xl font-extrabold mb-6">$29.990<span className="text-lg text-slate-400 font-normal">/mes</span></div>

                        <div className="bg-slate-800/50 rounded-2xl p-4 mb-8 text-sm text-slate-300 border border-slate-700">
                            <p className="mb-2">⚠️ <b>Aviso:</b> El sistema de pagos manual se está activando.</p>
                            <p>Haz clic abajo para contactar a soporte y activar tu cuenta vía <b>Flow</b> o Transferencia.</p>
                        </div>

                        <button
                            onClick={handleFlowContact}
                            disabled={processing}
                            className="w-full py-4 rounded-xl font-bold bg-indigo-600 hover:bg-indigo-500 text-white transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-900/40"
                        >
                            {processing ? <Loader2 className="animate-spin" size={20} /> : <><Zap size={20} /> Hablar con Soporte (Flow)</>}
                        </button>
                    </div>
                </div>

                <div className="mt-12 text-sm text-slate-500 flex items-center justify-center gap-6">
                    <span className="flex items-center gap-2 font-medium bg-slate-800 px-3 py-1 rounded-full text-slate-400">
                        <CreditCard size={14} /> Pagos vía Flow - Próximamente
                    </span>
                    <span className="flex items-center gap-2 font-medium bg-slate-800 px-3 py-1 rounded-full text-slate-400">
                        <PlayCircle size={14} /> Cancela cuando quieras
                    </span>
                </div>
            </div>
        </div>
    );
};

export default BillingExpiredView;
