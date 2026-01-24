import React, { useState } from 'react';
import { useSalonStore } from '../store';
import { Search, Plus, User, Edit, Trash2 } from 'lucide-react';
import StylistModal from './StylistModal';

const StaffView = () => {
    const { stylists, removeStylist } = useSalonStore();
    const [searchTerm, setSearchTerm] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [selectedStylist, setSelectedStylist] = useState(null);

    const filteredStylists = stylists.filter(s =>
        s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.specialty.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleEdit = (stylist) => {
        setSelectedStylist(stylist);
        setShowModal(true);
    };

    const handleDelete = (id) => {
        if (window.confirm('¿Eliminar estilista?')) {
            removeStylist(id);
        }
    };

    const handleNew = () => {
        setSelectedStylist(null);
        setShowModal(true);
    };

    return (
        <div className="h-full flex flex-col bg-white rounded-2xl shadow-sm overflow-hidden animate-in fade-in zoom-in-95 duration-300">
            {/* Header */}
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-white">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800">Equipo de Trabajo</h2>
                    <p className="text-slate-500 text-sm mt-1">Gestiona los estilistas y profesionales del salón.</p>
                </div>

                <div className="flex gap-4">
                    <div className="relative group">
                        <Search className="absolute left-3 top-2.5 text-slate-400" size={20} />
                        <input
                            type="text"
                            placeholder="Buscar estilista..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="bg-slate-50 border border-slate-200 pl-10 pr-4 py-2.5 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 w-64 transition-all"
                        />
                    </div>
                    <button
                        onClick={handleNew}
                        className="flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-5 py-2.5 rounded-xl font-semibold shadow-lg shadow-primary/30 transition-all hover:scale-105"
                    >
                        <Plus size={20} /> Nuevo Estilista
                    </button>
                </div>
            </div>

            {/* Grid Content */}
            <div className="p-6 overflow-y-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredStylists.map((stylist) => (
                        <div key={stylist.id} className="bg-white border border-gray-100 rounded-2xl p-5 hover:shadow-lg transition-all group flex flex-col relative overflow-hidden">
                            {/* Color Tag */}
                            <div className="absolute top-0 left-0 w-full h-1" style={{ backgroundColor: stylist.color }}></div>

                            <div className="flex items-start gap-4 mb-4">
                                <div
                                    className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-md border-4 border-white"
                                    style={{ backgroundColor: stylist.color }}
                                >
                                    {stylist.name.substring(0, 2).toUpperCase()}
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-800 text-lg">{stylist.name}</h3>
                                    <p className="text-slate-500 text-sm font-medium">{stylist.specialty}</p>
                                    <span className={`inline-block mt-1 px-2 py-0.5 text-[10px] font-bold rounded-full uppercase ${stylist.active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                                        {stylist.active ? 'Activo' : 'Inactivo'}
                                    </span>
                                </div>
                            </div>

                            <div className="mt-auto flex gap-2 pt-4 border-t border-gray-50">
                                <button
                                    onClick={() => handleEdit(stylist)}
                                    className="flex-1 py-2 bg-gray-50 text-slate-600 rounded-lg font-medium text-sm hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
                                >
                                    <Edit size={16} /> Editar
                                </button>
                                <button
                                    onClick={() => handleDelete(stylist.id)}
                                    className="px-3 py-2 bg-red-50 text-red-500 rounded-lg hover:bg-red-100 transition-colors"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <StylistModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                initialData={selectedStylist}
            />
        </div>
    );
};

export default StaffView;
