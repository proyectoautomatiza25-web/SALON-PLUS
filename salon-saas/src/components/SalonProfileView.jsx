import React, { useState } from 'react';
import { useSalonStore } from '../store';
import { Save, MapPin, Phone, Mail, Globe, Clock, Camera } from 'lucide-react';

const SalonProfileView = () => {
    const { businessName } = useSalonStore();

    // Local state for form (in a real app, this would sync to store/backend)
    const [profile, setProfile] = useState({
        name: businessName,
        address: 'Av. Providencia 1234, Santiago',
        phone: '+56 9 1234 5678',
        email: 'contacto@salonplus.cl',
        website: 'www.salonplus.cl',
        description: 'Especialistas en coloración y cuidado capilar.',
        hours: {
            mon_fri: '09:00 - 20:00',
            sat: '10:00 - 18:00',
            sun: 'Cerrado'
        }
    });

    const handleChange = (e) => {
        setProfile({ ...profile, [e.target.name]: e.target.value });
    };

    const handleSave = (e) => {
        e.preventDefault();
        alert('Perfil del Salón actualizado exitosamente.');
    };

    return (
        <div className="h-full flex flex-col bg-white rounded-2xl shadow-sm overflow-hidden animate-in fade-in zoom-in-95 duration-300">
            {/* Header */}
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-white sticky top-0 z-10">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800">Perfil del Salón</h2>
                    <p className="text-slate-500 text-sm mt-1">Configura la información pública de tu negocio.</p>
                </div>
                <button
                    onClick={handleSave}
                    className="flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-6 py-2.5 rounded-xl font-bold shadow-lg shadow-primary/30 transition-all hover:scale-105"
                >
                    <Save size={20} /> Guardar Cambios
                </button>
            </div>

            <div className="flex-1 overflow-y-auto p-8">
                <div className="max-w-4xl mx-auto space-y-8">

                    {/* Branding Section */}
                    <section className="bg-slate-50 rounded-2xl p-6 border border-gray-100">
                        <h3 className="text-lg font-bold text-slate-800 mb-4 border-b border-gray-200 pb-2">Identidad de Marca</h3>
                        <div className="flex gap-8 items-start">
                            {/* Logo Upload Simulation */}
                            <div className="flex flex-col items-center gap-3">
                                <div className="w-32 h-32 bg-white rounded-2xl border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400 hover:border-primary hover:text-primary transition-colors cursor-pointer group">
                                    <Camera size={32} className="group-hover:scale-110 transition-transform" />
                                </div>
                                <span className="text-xs font-semibold text-gray-500">Logo del Salón</span>
                            </div>

                            <div className="flex-1 space-y-4">
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-1">Nombre del Negocio</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={profile.name}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-1">Descripción Corta</label>
                                    <textarea
                                        name="description"
                                        value={profile.description}
                                        onChange={handleChange}
                                        rows="3"
                                        className="w-full px-4 py-2 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
                                    />
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Contact Info */}
                    <section className="bg-slate-50 rounded-2xl p-6 border border-gray-100">
                        <h3 className="text-lg font-bold text-slate-800 mb-4 border-b border-gray-200 pb-2">Información de Contacto</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-1 flex items-center gap-2"><MapPin size={16} /> Dirección</label>
                                <input
                                    type="text"
                                    name="address"
                                    value={profile.address}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-1 flex items-center gap-2"><Phone size={16} /> Teléfono</label>
                                <input
                                    type="text"
                                    name="phone"
                                    value={profile.phone}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-1 flex items-center gap-2"><Mail size={16} /> Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={profile.email}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-1 flex items-center gap-2"><Globe size={16} /> Sitio Web</label>
                                <input
                                    type="text"
                                    name="website"
                                    value={profile.website}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                />
                            </div>
                        </div>
                    </section>

                    {/* Hours */}
                    <section className="bg-slate-50 rounded-2xl p-6 border border-gray-100">
                        <h3 className="text-lg font-bold text-slate-800 mb-4 border-b border-gray-200 pb-2">Horarios de Atención</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-1 flex items-center gap-2"><Clock size={16} /> Lunes a Viernes</label>
                                <input
                                    type="text"
                                    value={profile.hours.mon_fri}
                                    onChange={(e) => setProfile({ ...profile, hours: { ...profile.hours, mon_fri: e.target.value } })}
                                    className="w-full px-4 py-2 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-1 flex items-center gap-2"><Clock size={16} /> Sábados</label>
                                <input
                                    type="text"
                                    value={profile.hours.sat}
                                    onChange={(e) => setProfile({ ...profile, hours: { ...profile.hours, sat: e.target.value } })}
                                    className="w-full px-4 py-2 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-1 flex items-center gap-2"><Clock size={16} /> Domingos</label>
                                <input
                                    type="text"
                                    value={profile.hours.sun}
                                    onChange={(e) => setProfile({ ...profile, hours: { ...profile.hours, sun: e.target.value } })}
                                    className="w-full px-4 py-2 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                />
                            </div>
                        </div>
                    </section>

                </div>
            </div>
        </div>
    );
};

export default SalonProfileView;
