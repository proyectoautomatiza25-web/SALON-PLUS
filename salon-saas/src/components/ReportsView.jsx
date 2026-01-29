import React from 'react';
import { BarChart, Activity, TrendingUp, PieChart as PieIcon } from 'lucide-react';

const ReportsView = () => {
    return (
        <div className="h-full flex flex-col bg-slate-50 rounded-2xl p-6 overflow-y-auto animate-in fade-in zoom-in-95 font-sans">
            <div className="mb-8 flex justify-between items-end">
                <div>
                    <h2 className="text-3xl font-bold text-slate-800">Reportes y Analítica</h2>
                    <p className="text-slate-500">Visualiza el rendimiento financiero y operativo.</p>
                </div>
                <div>
                    <select className="bg-white border border-gray-200 px-4 py-2 rounded-xl text-sm font-bold text-slate-600 outline-none focus:ring-2 focus:ring-primary/20">
                        <option>Este Mes</option>
                        <option>Mes Pasado</option>
                        <option>Este Año</option>
                    </select>
                </div>
            </div>

            {/* Charts Grid - Simulated */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">

                {/* Chart 1 */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                    <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2"><BarChart size={20} className="text-primary" /> Ingresos Mensuales</h3>
                    <div className="h-64 flex items-end justify-between gap-2 px-4">
                        {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
                            <div key={i} className="w-full bg-slate-100 rounded-t-lg relative group">
                                <div
                                    className="absolute bottom-0 w-full bg-primary rounded-t-lg transition-all duration-500 hover:bg-primary-dark"
                                    style={{ height: `${h}%` }}
                                ></div>
                                <div className="opacity-0 group-hover:opacity-100 absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs px-2 py-1 rounded transition-opacity">
                                    ${(h * 15000).toLocaleString('es-CL')}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-between mt-4 text-xs text-slate-400 font-bold uppercase">
                        <span>Lun</span><span>Mar</span><span>Mié</span><span>Jue</span><span>Vie</span><span>Sáb</span><span>Dom</span>
                    </div>
                </div>

                {/* Chart 2 */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                    <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2"><PieIcon size={20} className="text-secondary" /> Distribución de Servicios</h3>
                    <div className="h-64 flex items-center justify-center">
                        <div className="w-48 h-48 rounded-full border-[16px] border-slate-100 relative border-l-primary border-t-secondary border-r-blue-400">
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-2xl font-bold text-slate-800">450</span>
                                <span className="text-xs text-slate-400 uppercase font-bold">Servicios</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center gap-6 mt-4">
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                            <div className="w-3 h-3 rounded-full bg-primary"></div> Corte
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                            <div className="w-3 h-3 rounded-full bg-secondary"></div> Color
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                            <div className="w-3 h-3 rounded-full bg-blue-400"></div> Manicure
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default ReportsView;
