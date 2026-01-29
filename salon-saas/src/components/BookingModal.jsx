import React, { useState, useEffect } from 'react';
import { X, Calendar, Clock, User, Scissors, Check, Trash2 } from 'lucide-react';
import { useSalonStore } from '../store';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

const BookingModal = ({ isOpen, onClose, initialData }) => {
    const { clients, stylists, services, addAppointment, updateAppointment, removeAppointment, updateAppointmentStatus } = useSalonStore();

    // Form State
    const [formData, setFormData] = useState({
        id: null,
        clientId: '',
        stylistId: '',
        serviceId: '',
        date: '',
        time: '',
        notes: '',
        status: 'pending'
    });

    // Populate form with initial data when modal opens
    useEffect(() => {
        if (isOpen && initialData) {

            // Check if we are editing an existing appointment (it has an ID)
            const isEditing = !!initialData.id;

            let foundServiceId = '';
            if (isEditing) {
                // Try to match service by name or other heuristic since we only stored title
                const service = services.find(s => s.name === initialData.title);
                if (service) foundServiceId = service.id;
            }

            setFormData({
                id: initialData.id || null,
                clientId: initialData.clientId || (initialData.clientName ? clients.find(c => c.name === initialData.clientName)?.id : ''),
                stylistId: initialData.resourceId || '',
                serviceId: foundServiceId || '',
                date: initialData.start ? format(initialData.start, 'yyyy-MM-dd') : '',
                time: initialData.start ? format(initialData.start, 'HH:mm') : '',
                notes: initialData.notes || '',
                status: initialData.status || 'pending'
            });
        }
    }, [isOpen, initialData, services, clients]);

    const handleStatusChange = (newStatus) => {
        if (formData.id) {
            updateAppointmentStatus(formData.id, newStatus);
            onClose();
        }
    };

    // ... handleSubmit ...
    const handleSubmit = (e) => {
        e.preventDefault();

        const client = clients.find(c => c.id === parseInt(formData.clientId));
        const service = services.find(s => s.id === parseInt(formData.serviceId));
        const stylist = stylists.find(s => s.id === parseInt(formData.stylistId));

        if (!client || !service || !stylist) return;

        // Construct dates
        const startDateTime = new Date(`${formData.date}T${formData.time}`);
        const endDateTime = new Date(startDateTime.getTime() + service.duration * 60000);

        const appointmentData = {
            id: formData.id || Date.now(),
            stylistId: stylist.id,
            clientId: client.id,
            clientName: client.name,
            title: service.name,
            start: startDateTime,
            end: endDateTime,
            status: formData.status, // Preserve or utilize status
            price: service.price,
            notes: formData.notes
        };

        if (formData.id) {
            updateAppointment(appointmentData);
        } else {
            addAppointment(appointmentData);
        }

        onClose();
    };

    const handleDelete = () => {
        if (formData.id) {
            if (window.confirm('¿Estás seguro de eliminar esta cita?')) {
                removeAppointment(formData.id);
                onClose();
            }
        }
    }

    if (!isOpen) return null;

    const selectedService = services.find(s => s.id === parseInt(formData.serviceId));
    const isEditing = !!formData.id;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-900/40 backdrop-blur-sm transition-all">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[95vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-200">

                {/* Header */}
                <div className="bg-slate-50 border-b border-slate-100 p-5 flex justify-between items-center">
                    <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                        <Calendar className="text-primary" size={24} />
                        {isEditing ? 'Editar Cita' : 'Nueva Cita'}
                    </h2>
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors p-1 hover:bg-slate-200 rounded-full">
                        <X size={20} />
                    </button>
                </div>

                {/* Status Toolbar (Only Editing) */}
                {isEditing && (
                    <div className="bg-slate-50 px-6 pb-4 border-b border-slate-100 flex gap-2 justify-center">
                        <button type="button" onClick={() => handleStatusChange('attended')} className={`px-3 py-1 rounded-full text-xs font-bold border transition-colors ${formData.status === 'attended' ? 'bg-green-600 text-white border-green-600' : 'bg-white text-green-700 border-green-200 hover:bg-green-50'}`}>
                            ✅ Atendido
                        </button>
                        <button type="button" onClick={() => handleStatusChange('no_show')} className={`px-3 py-1 rounded-full text-xs font-bold border transition-colors ${formData.status === 'no_show' ? 'bg-red-600 text-white border-red-600' : 'bg-white text-red-700 border-red-200 hover:bg-red-50'}`}>
                            ❌ Ausente
                        </button>
                        <button type="button" onClick={() => handleStatusChange('confirmed')} className={`px-3 py-1 rounded-full text-xs font-bold border transition-colors ${formData.status === 'confirmed' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-blue-700 border-blue-200 hover:bg-blue-50'}`}>
                            📅 Confirmado
                        </button>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="p-6 space-y-5">

                    {/* Client Selection */}
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Cliente</label>
                        <div className="relative">
                            <User className="absolute left-3 top-3 text-slate-400" size={18} />
                            <select
                                required
                                value={formData.clientId}
                                onChange={e => setFormData({ ...formData, clientId: e.target.value })}
                                disabled={isEditing}
                                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all appearance-none disabled:bg-slate-100 disabled:text-slate-500"
                            >
                                <option value="">Seleccionar Cliente</option>
                                {clients.map(c => (
                                    <option key={c.id} value={c.id}>{c.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Service & Stylist Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">Servicio</label>
                            <div className="relative">
                                <Scissors className="absolute left-3 top-3 text-slate-400" size={18} />
                                <select
                                    required
                                    value={formData.serviceId}
                                    onChange={e => setFormData({ ...formData, serviceId: e.target.value })}
                                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all appearance-none"
                                >
                                    <option value="">Servicio...</option>
                                    {services.map(s => (
                                        <option key={s.id} value={s.id}>{s.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">Estilista</label>
                            <select
                                required
                                value={formData.stylistId}
                                onChange={e => setFormData({ ...formData, stylistId: e.target.value })}
                                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                            >
                                <option value="">Estilista...</option>
                                {stylists.map(s => (
                                    <option key={s.id} value={s.id}>{s.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Date & Time Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">Fecha</label>
                            <input
                                type="date"
                                required
                                value={formData.date}
                                onChange={e => setFormData({ ...formData, date: e.target.value })}
                                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">Hora</label>
                            <div className="relative">
                                <Clock className="absolute left-3 top-3 text-slate-400" size={18} />
                                <input
                                    type="time"
                                    required
                                    value={formData.time}
                                    onChange={e => setFormData({ ...formData, time: e.target.value })}
                                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Summary Card */}
                    {selectedService && (
                        <div className="bg-primary/5 border border-primary/10 rounded-xl p-4 flex justify-between items-center text-sm">
                            <div>
                                <span className="block text-primary font-bold">{selectedService.name}</span>
                                <span className="text-slate-500">{selectedService.duration} min • {stylists.find(s => s.id === parseInt(formData.stylistId))?.name || 'Sin estilista'}</span>
                            </div>
                            <div className="text-right">
                                <span className="block text-lg font-bold text-slate-800">${selectedService.price.toLocaleString('es-CL')}</span>
                            </div>
                        </div>
                    )}

                    {/* Footer Actions */}
                    <div className="flex gap-3 pt-2">
                        {isEditing && (
                            <button
                                type="button"
                                onClick={handleDelete}
                                className="px-4 py-3 bg-red-50 text-red-500 border border-red-100 font-semibold rounded-xl hover:bg-red-100 transition-all"
                                title="Eliminar Cita"
                            >
                                <Trash2 size={20} />
                            </button>
                        )}
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-4 py-3 bg-white border border-slate-200 text-slate-600 font-semibold rounded-xl hover:bg-slate-50 transition-all"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="flex-1 px-4 py-3 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-xl shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex justify-center items-center gap-2"
                        >
                            <Check size={20} />
                            {isEditing ? 'Guardar Cambios' : 'Confirmar Cita'}
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default BookingModal;
