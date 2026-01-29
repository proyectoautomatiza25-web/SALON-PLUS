import React, { useState } from 'react';
import { useSalonStore } from '../store';
import { Search, Plus, Phone, Mail, Calendar, Edit, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import ClientModal from './ClientModal';

const ClientsView = () => {
    const { clients, removeClient } = useSalonStore();
    const [searchTerm, setSearchTerm] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [selectedClient, setSelectedClient] = useState(null);

    const filteredClients = clients.filter(client =>
        client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.phone.includes(searchTerm) ||
        client.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleEdit = (client) => {
        setSelectedClient(client);
        setShowModal(true);
    };

    const handleDelete = (id) => {
        if (window.confirm('¿Eliminar cliente?')) {
            removeClient(id);
        }
    };

    const handleNew = () => {
        setSelectedClient(null);
        setShowModal(true);
    }

    return (
        <div className="h-full flex flex-col bg-white rounded-2xl shadow-sm overflow-hidden animate-in fade-in zoom-in-95 duration-300">
            {/* Header */}
            <div className="p-4 md:p-6 border-b border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center bg-white gap-4">
                <div>
                    <h2 className="text-xl md:text-2xl font-bold text-slate-800">Clientes</h2>
                    <p className="text-slate-500 text-xs md:text-sm mt-1">Gestiona tu base de datos de clientes y su historial.</p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                    <div className="relative group w-full sm:w-64">
                        <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
                        <input
                            type="text"
                            placeholder="Buscar cliente..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200 pl-10 pr-4 py-2 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                        />
                    </div>
                    <button
                        onClick={handleNew}
                        className="flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-xl font-semibold shadow-lg shadow-primary/30 transition-all active:scale-95"
                    >
                        <Plus size={18} /> <span className="text-sm">Nuevo Cliente</span>
                    </button>
                </div>
            </div>

            {/* Content Table / Cards */}
            <div className="flex-1 overflow-auto p-4 md:p-6">
                <div className="w-full">
                    {/* Table Header (Desktop only) */}
                    <div className="hidden md:grid grid-cols-12 gap-4 px-4 py-3 bg-slate-50 rounded-lg text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                        <div className="col-span-4">Cliente</div>
                        <div className="col-span-3">Contacto</div>
                        <div className="col-span-3">Última Visita</div>
                        <div className="col-span-2 text-right">Acciones</div>
                    </div>

                    {/* Body */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-3 md:gap-2">
                        {filteredClients.map((client) => (
                            <div key={client.id} className="flex flex-col md:grid md:grid-cols-12 gap-3 md:gap-4 px-4 py-4 md:items-center bg-white border border-slate-100 rounded-xl hover:shadow-md hover:border-primary/20 transition-all group cursor-pointer" onClick={() => handleEdit(client)}>

                                {/* Name Column */}
                                <div className="md:col-span-4 flex items-center gap-3">
                                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-purple-100 to-pink-100 text-primary font-bold flex items-center justify-center text-sm md:text-lg shadow-sm border border-white">
                                        {client.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-slate-800 text-sm md:text-base">{client.name}</h3>
                                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-green-100 text-green-700 font-medium">Activo</span>
                                    </div>
                                </div>

                                {/* Contact Column */}
                                <div className="md:col-span-3 space-y-1">
                                    <div className="flex items-center gap-2 text-xs md:text-sm text-slate-600">
                                        <Phone size={12} className="text-slate-400" /> {client.phone}
                                    </div>
                                    <div className="flex items-center gap-2 text-xs md:text-sm text-slate-600 truncate">
                                        <Mail size={12} className="text-slate-400" /> {client.email}
                                    </div>
                                </div>

                                {/* Last Visit Column */}
                                <div className="md:col-span-3 text-xs md:text-sm text-slate-600 flex items-center gap-2.5">
                                    <div className="p-2 bg-slate-50 rounded-lg text-slate-400 hidden md:block">
                                        <Calendar size={18} />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-slate-700">
                                            {format(new Date(client.lastVisit), 'd MMMM, yyyy', { locale: es })}
                                        </p>
                                        <p className="text-[10px] text-slate-400 md:hidden">Última visita</p>
                                    </div>
                                </div>

                                {/* Actions Column */}
                                <div className="md:col-span-2 flex justify-end gap-2 md:opacity-0 md:group-hover:opacity-100 transition-opacity border-t md:border-t-0 pt-2 md:pt-0 mt-1 md:mt-0">
                                    <button
                                        onClick={(e) => { e.stopPropagation(); handleEdit(client); }}
                                        className="p-2 text-slate-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors flex items-center gap-1 md:block"
                                    >
                                        <Edit size={16} md:size={18} /> <span className="text-[10px] md:hidden font-bold">Editar</span>
                                    </button>
                                    <button
                                        onClick={(e) => { e.stopPropagation(); handleDelete(client.id); }}
                                        className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors flex items-center gap-1 md:block"
                                    >
                                        <Trash2 size={16} md:size={18} /> <span className="text-[10px] md:hidden font-bold">Eliminar</span>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <ClientModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                initialData={selectedClient}
            />
        </div>
    );
};

export default ClientsView;
