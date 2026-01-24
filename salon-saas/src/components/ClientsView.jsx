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
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-white">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800">Clientes</h2>
                    <p className="text-slate-500 text-sm mt-1">Gestiona tu base de datos de clientes y su historial.</p>
                </div>

                <div className="flex gap-4">
                    <div className="relative group">
                        <Search className="absolute left-3 top-2.5 text-slate-400 group-focus-within:text-primary transition-colors" size={20} />
                        <input
                            type="text"
                            placeholder="Buscar cliente..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="bg-slate-50 border border-slate-200 pl-10 pr-4 py-2.5 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary w-64 transition-all"
                        />
                    </div>
                    <button
                        onClick={handleNew}
                        className="flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-5 py-2.5 rounded-xl font-semibold shadow-lg shadow-primary/30 transition-all hover:scale-105 active:scale-95"
                    >
                        <Plus size={20} /> Nuevo Cliente
                    </button>
                </div>
            </div>

            {/* Content Table */}
            <div className="flex-1 overflow-auto p-6">
                <div className="w-full">
                    {/* Table Header */}
                    <div className="grid grid-cols-12 gap-4 px-4 py-3 bg-slate-50 rounded-lg text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                        <div className="col-span-4">Cliente</div>
                        <div className="col-span-3">Contacto</div>
                        <div className="col-span-3">Última Visita</div>
                        <div className="col-span-2 text-right">Acciones</div>
                    </div>

                    {/* Table Body */}
                    <div className="space-y-2">
                        {filteredClients.map((client) => (
                            <div key={client.id} className="grid grid-cols-12 gap-4 px-4 py-4 items-center bg-white border border-slate-100 rounded-xl hover:shadow-md hover:border-primary/20 transition-all group cursor-pointer" onClick={() => handleEdit(client)}>

                                {/* Name Column */}
                                <div className="col-span-4 flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-100 to-pink-100 text-primary font-bold flex items-center justify-center text-lg shadow-sm border border-white">
                                        {client.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-slate-800 text-base">{client.name}</h3>
                                        <span className="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-700 font-medium">Activo</span>
                                    </div>
                                </div>

                                {/* Contact Column */}
                                <div className="col-span-3 space-y-1">
                                    <div className="flex items-center gap-2 text-sm text-slate-600">
                                        <Phone size={14} className="text-slate-400" /> {client.phone}
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-slate-600">
                                        <Mail size={14} className="text-slate-400" /> {client.email}
                                    </div>
                                </div>

                                {/* Last Visit Column */}
                                <div className="col-span-3 text-sm text-slate-600 flex items-center gap-2.5">
                                    <div className="p-2 bg-slate-50 rounded-lg text-slate-400">
                                        <Calendar size={18} />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-slate-700">
                                            {format(new Date(client.lastVisit), 'd MMMM, yyyy', { locale: es })}
                                        </p>
                                        <p className="text-xs text-slate-400">hace 2 semanas</p>
                                    </div>
                                </div>

                                {/* Actions Column */}
                                <div className="col-span-2 flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button
                                        onClick={(e) => { e.stopPropagation(); handleEdit(client); }}
                                        className="p-2 text-slate-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
                                        title="Editar"
                                    >
                                        <Edit size={18} />
                                    </button>
                                    <button
                                        onClick={(e) => { e.stopPropagation(); handleDelete(client.id); }}
                                        className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                        title="Eliminar"
                                    >
                                        <Trash2 size={18} />
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
