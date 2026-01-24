import React, { useState, useEffect } from 'react';
import { X, User, Palette, Check, Trash2, Briefcase } from 'lucide-react';
import { useSalonStore } from '../store';

const StylistModal = ({ isOpen, onClose, initialData }) => {
    const { addStylist, updateStylist, removeStylist } = useSalonStore();

    // Preset colors for stylists
    const colorOptions = [
        '#fcd34d', '#fca5a5', '#6ee7b7', '#93c5fd',
        '#f472b6', '#a78bfa', '#fb923c', '#cbd5e1'
    ];

    const [formData, setFormData] = useState({
        id: null,
        name: '',
        specialty: '',
        color: '#fcd34d',
        active: true
    });

    useEffect(() => {
        if (isOpen) {
            if (initialData) {
                setFormData({
                    id: initialData.id,
                    name: initialData.name || '',
                    specialty: initialData.specialty || '',
                    color: initialData.color || '#fcd34d',
                    active: initialData.active !== undefined ? initialData.active : true
                });
            } else {
                setFormData({
                    id: null,
                    name: '',
                    specialty: '',
                    color: colorOptions[Math.floor(Math.random() * colorOptions.length)],
                    active: true
                });
            }
        }
    }, [isOpen, initialData]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const stylistData = {
            id: formData.id || Date.now(),
            name: formData.name,
            specialty: formData.specialty,
            color: formData.color,
            active: formData.active
        };

        if (formData.id) {
            updateStylist(stylistData);
        } else {
            addStylist(stylistData);
        }
        onClose();
    };

    const handleDelete = () => {
        if (formData.id && window.confirm('¿Eliminar estilista? Se mantendrán sus citas históricas pero no aparecerá en el calendario.')) {
            removeStylist(formData.id);
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
                        {isEditing ? 'Editar Estilista' : 'Nuevo Estilista'}
                    </h2>
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors p-1 hover:bg-slate-200 rounded-full">
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-5">

                    {/* Name */}
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Nombre</label>
                        <div className="relative">
                            <User className="absolute left-3 top-3 text-slate-400" size={18} />
                            <input
                                type="text"
                                required
                                placeholder="Ej. Michel"
                                value={formData.name}
                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                            />
                        </div>
                    </div>

                    {/* Specialty */}
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Especialidad</label>
                        <div className="relative">
                            <Briefcase className="absolute left-3 top-3 text-slate-400" size={18} />
                            <input
                                type="text"
                                required
                                placeholder="Ej. Colorista"
                                value={formData.specialty}
                                onChange={e => setFormData({ ...formData, specialty: e.target.value })}
                                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                            />
                        </div>
                    </div>

                    {/* Color Picker */}
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-3">Color en Calendario</label>
                        <div className="flex flex-wrap gap-3">
                            {colorOptions.map(c => (
                                <button
                                    key={c}
                                    type="button"
                                    onClick={() => setFormData({ ...formData, color: c })}
                                    className={`w-8 h-8 rounded-full border-2 transition-all ${formData.color === c ? 'border-primary scale-110 shadow-md' : 'border-transparent hover:scale-110'}`}
                                    style={{ backgroundColor: c }}
                                >
                                    {formData.color === c && <Check size={14} className="text-white mx-auto" />}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="flex gap-3 pt-4">
                        {isEditing && (
                            <button
                                type="button"
                                onClick={handleDelete}
                                className="px-4 py-3 bg-red-50 text-red-500 border border-red-100 font-semibold rounded-xl hover:bg-red-100 transition-all"
                                title="Eliminar"
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
                            className="flex-1 px-4 py-3 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-xl shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:scale-[1.02] active:scale-[0.98] transition-all"
                        >
                            {isEditing ? 'Guardar' : 'Crear'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default StylistModal;
