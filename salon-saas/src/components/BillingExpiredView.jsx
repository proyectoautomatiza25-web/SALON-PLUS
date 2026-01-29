import React, { useState } from 'react';
import { Check, Shield, Zap, CreditCard, PlayCircle } from 'lucide-react';
import { useSalonStore } from '../store';

const BillingExpiredView = () => {
    const { activateSubscription, businessName } = useSalonStore();
    const [processing, setProcessing] = useState(false);

    // URL forzada para consistencia
    const API_URL = 'https://authentic-tenderness-production-a8bc.up.railway.app';
    const { auth } = useSalonStore();

    // Real Mercado Pago Subscripción
    const handleSubscribe = async () => {
        setProcessing(true);
        try {
            const res = await fetch(`${API_URL}/api/billing/create-subscription?plan_id=default`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${auth.token}`,
                    'Content-Type': 'application/json'
                }
            });
            const data = await res.json();

            if (data.url) {
                // Redirigir a Mercado Pago
                window.location.href = data.url;
            } else {
                throw new Error(data.detail || "No se pudo generar el link de pago.");
            }
        } catch (err) {
            console.error(err);
            alert("Error al conectar con Mercado Pago: " + err.message);
            setProcessing(false);
        }
    };


    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900 text-white p-6 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500 rounded-full blur-3xl"></div>
            </div>

            <div className="z-10 max-w-4xl w-full text-center">
                <div className="mb-8">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-red-500 to-orange-500 rounded-2xl mb-6 shadow-lg shadow-red-500/20">
                        <Shield size={40} className="text-white" />
                    </div>
                    <h1 className="text-4xl font-extrabold mb-4 tracking-tight">Tu periodo de prueba ha terminado</h1>
                    <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto">
                        Hola <b>{businessName}</b>, esperamos que hayas disfrutado SalonPlus. Para continuar gestionando tu salón y no perder tus datos, selecciona un plan.
                    </p>
                </div>

                {/* Pricing Card (Single Plan) */}
                <div className="max-w-md mx-auto">
                    <div className="bg-gradient-to-br from-blue-900 to-slate-800 rounded-2xl p-8 border border-blue-500 relative transform hover:scale-105 transition-all duration-300 shadow-2xl shadow-blue-900/50">
                        <div className="absolute top-0 right-0 bg-blue-500 text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">TODO INCLUIDO</div>
                        <h3 className="text-xl font-bold text-white mb-2">Suscripción SalonPlus</h3>
                        <div className="text-4xl font-extrabold mb-6">$29.990<span className="text-lg text-blue-200 font-normal">/mes</span></div>
                        <ul className="text-left space-y-4 mb-8 text-blue-100">
                            <li className="flex items-center gap-3"><Check size={18} className="text-blue-300" /> Agenda y Citas ilimitadas</li>
                            <li className="flex items-center gap-3"><Check size={18} className="text-blue-300" /> Gestión de Profesionales</li>
                            <li className="flex items-center gap-3"><Check size={18} className="text-blue-300" /> Control de Inventario</li>
                            <li className="flex items-center gap-3"><Check size={18} className="text-blue-300" /> Reportes Financieros</li>
                            <li className="flex items-center gap-3"><Check size={18} className="text-blue-300" /> Soporte Prioritario WhatsApp</li>
                        </ul>
                        <button
                            onClick={() => handleSubscribe()}
                            disabled={processing}
                            className="w-full py-4 rounded-xl font-bold bg-blue-500 hover:bg-blue-400 text-white transition-colors flex items-center justify-center gap-2 shadow-lg"
                        >
                            {processing ? 'Procesando...' : <><Zap size={20} /> Activar Suscripción</>}
                        </button>
                    </div>
                </div>

                <div className="mt-12 text-sm text-slate-500 flex items-center justify-center gap-4">
                    <span className="flex items-center gap-2"><CreditCard size={14} /> Pagos seguros vía Mercado Pago</span>
                    <span className="flex items-center gap-2"><PlayCircle size={14} /> Cancela cuando quieras</span>
                </div>
            </div>
        </div>
    );
};

export default BillingExpiredView;
