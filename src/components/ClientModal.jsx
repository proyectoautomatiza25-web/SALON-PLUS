import React, { useState, useEffect } from 'react';
import { X, User, Phone, Mail, Check, Trash2, Calendar } from 'lucide-react';
import { useSalonStore } from '../store';

const ClientModal = ({ isOpen, onClose, initialData }) => {
    const { addClient, updateClient, removeClient } = useSalonStore();

    const [formData, setFormData] = useState({
        id: null,
        name: '',
        phone: '',
        email: '',
        lastVisit: ''
    });

    useEffect(() => {
        if (isOpen) {
            if (initialData) {
                setFormData({
                    id: initialData.id,
                    name: initialData.name || '',
                    phone: initialData.phone || '',
                    email: initialData.email || '',
                    lastVisit: initialData.lastVisit || new Date().toISOString().split('T')[0]
                });
            } else {
                setFormData({
                    id: null,
                    name: '',
                    phone: '',
                    email: '',
                    lastVisit: new Date().toISOString().split('T')[0]
                });
            }
        }
    }, [isOpen, initialData]);

    const [loading, setLoading] = useState(false);

    // ... useEffect ...

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const clientData = {
            id: formData.id, // Only send ID if editing, otherwise it's null and backend handles or store handles
            name: formData.name,
            phone: formData.phone,
            email: formData.email,
            lastVisit: formData.lastVisit
        };

        try {
            if (formData.id) {
                await updateClient(clientData);
            } else {
                await addClient(clientData);
            }
            onClose();
        } catch (error) {
            console.error(error);
            alert("Error al guardar cliente. Revisa si el correo ya existe o intenta de nuevo.");
        } finally {
            setLoading(false);
        }
    };

    // ... handleDelete ...

    // ... render ...
    <button
        type="submit"
        disabled={loading}
        className="flex-1 px-4 py-3 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-xl shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex justify-center items-center gap-2 disabled:opacity-70"
    >
        {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Check size={20} />}
        {loading ? 'Guardando...' : (isEditing ? 'Guardar' : 'Crear Cliente')}
    </button>

    const handleDelete = () => {
        if (formData.id && window.confirm('¿Estás seguro de eliminar este cliente?')) {
            removeClient(formData.id);
            onClose();
        }
    };

    if (!isOpen) return null;

    const isEditing = !!formData.id;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm transition-all">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">

                {/* Header */}
                <div className="bg-slate-50 border-b border-slate-100 p-5 flex justify-between items-center">
                    <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                        <User className="text-primary" size={24} />
                        {isEditing ? 'Editar Cliente' : 'Nuevo Cliente'}
                    </h2>
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors p-1 hover:bg-slate-200 rounded-full">
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-5">

                    {/* Name */}
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Nombre Completo</label>
                        <div className="relative">
                            <User className="absolute left-3 top-3 text-slate-400" size={18} />
                            <input
                                type="text"
                                required
                                placeholder="Ej. Ana Pérez"
                                value={formData.name}
                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                            />
                        </div>
                    </div>

                    {/* Phone */}
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Teléfono</label>
                        <div className="relative">
                            <Phone className="absolute left-3 top-3 text-slate-400" size={18} />
                            <input
                                type="tel"
                                required
                                placeholder="+56 9 1234 5678"
                                value={formData.phone}
                                onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                            />
                        </div>
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Email</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-3 text-slate-400" size={18} />
                            <input
                                type="email"
                                placeholder="correo@ejemplo.com"
                                value={formData.email}
                                onChange={e => setFormData({ ...formData, email: e.target.value })}
                                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                            />
                        </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="flex gap-3 pt-2">
                        {isEditing && (
                            <button
                                type="button"
                                onClick={handleDelete}
                                className="px-4 py-3 bg-red-50 text-red-500 border border-red-100 font-semibold rounded-xl hover:bg-red-100 transition-all"
                                title="Eliminar Cliente"
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
                            disabled={loading}
                            className="flex-1 px-4 py-3 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-xl shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex justify-center items-center gap-2 disabled:opacity-70"
                        >
                            {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Check size={20} />}
                            {loading ? 'Guardando...' : (isEditing ? 'Guardar' : 'Crear Cliente')}
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default ClientModal;
