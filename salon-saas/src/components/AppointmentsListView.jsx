import React from 'react';
import { useSalonStore } from '../store';
import { Calendar, Clock, MapPin } from 'lucide-react';

const AppointmentsListView = () => {
    const { appointments, stylists } = useSalonStore();

    // Sort by date desc
    const sortedApps = [...appointments].sort((a, b) => new Date(b.start) - new Date(a.start));

    return (
        <div className="h-full flex flex-col bg-white rounded-2xl shadow-sm overflow-hidden animate-in fade-in zoom-in-95">
            <div className="p-6 border-b border-gray-100">
                <h2 className="text-2xl font-bold text-slate-800">Historial de Citas</h2>
                <p className="text-slate-500 text-sm mt-1">Lista completa de todas las citas agendadas.</p>
            </div>

            <div className="flex-1 overflow-auto p-4">
                <div className="space-y-3">
                    {sortedApps.map(appt => {
                        const stylist = stylists.find(s => s.id === appt.stylistId);
                        const date = new Date(appt.start);

                        return (
                            <div key={appt.id} className="bg-slate-50 border border-slate-100 rounded-xl p-4 flex justify-between items-center hover:bg-white hover:shadow-md transition-all">
                                <div className="flex items-center gap-4">
                                    <div className="flex flex-col items-center justify-center bg-white border border-gray-200 rounded-lg w-14 h-14 p-1">
                                        <span className="text-xs font-bold text-red-500 uppercase">{date.toLocaleDateString('es-CL', { month: 'short' })}</span>
                                        <span className="text-xl font-bold text-slate-800">{date.getDate()}</span>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-800">{appt.title}</h4>
                                        <p className="text-sm text-slate-500 flex items-center gap-2">
                                            <span>{appt.clientName}</span>
                                            <span className="w-1 h-1 bg-slate-400 rounded-full"></span>
                                            <span>con {stylist?.name || 'Stylist'}</span>
                                        </p>
                                    </div>
                                </div>

                                <div className="text-right">
                                    <div className="text-sm font-bold text-slate-700 flex items-center justify-end gap-1">
                                        <Clock size={14} className="text-slate-400" /> {date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </div>
                                    <span className={`inline-block mt-1 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase ${appt.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                                            appt.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-500'
                                        }`}>
                                        {appt.status}
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default AppointmentsListView;
