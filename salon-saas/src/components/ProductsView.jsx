import React, { useState } from 'react';
import { useSalonStore } from '../store';
import { Search, Plus, Package, Scissors, Edit, Trash2, Tag, DollarSign, Clock } from 'lucide-react';

// Sub-component for Service Modal
const ServiceModal = ({ isOpen, onClose, initialData }) => {
    const { addService, updateService, removeService } = useSalonStore();
    const [formData, setFormData] = useState(initialData || { name: '', duration: 60, price: 0, color: '#f472b6' });

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (initialData?.id) {
            updateService({ ...formData, id: initialData.id });
        } else {
            addService(formData);
        }
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-sm p-6 animate-in fade-in zoom-in-95">
                <h3 className="text-lg font-bold mb-4">{initialData ? 'Editar Servicio' : 'Nuevo Servicio'}</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="text-xs font-bold text-gray-500 uppercase">Nombre</label>
                        <input className="w-full border rounded-lg p-2 mt-1" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} required />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-xs font-bold text-gray-500 uppercase">Duración (min)</label>
                            <input type="number" className="w-full border rounded-lg p-2 mt-1" value={formData.duration} onChange={e => setFormData({ ...formData, duration: parseInt(e.target.value) })} required />
                        </div>
                        <div>
                            <label className="text-xs font-bold text-gray-500 uppercase">Precio</label>
                            <input type="number" className="w-full border rounded-lg p-2 mt-1" value={formData.price} onChange={e => setFormData({ ...formData, price: parseInt(e.target.value) })} required />
                        </div>
                    </div>
                    <div>
                        <label className="text-xs font-bold text-gray-500 uppercase">Color</label>
                        <input type="color" className="w-full h-10 rounded-lg mt-1 cursor-pointer" value={formData.color} onChange={e => setFormData({ ...formData, color: e.target.value })} />
                    </div>
                    <div className="flex gap-2 pt-2">
                        <button type="button" onClick={onClose} className="flex-1 py-2 border rounded-lg hover:bg-gray-50">Cancelar</button>
                        <button type="submit" className="flex-1 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Guardar</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

// Sub-component for Product Modal
const ProductModal = ({ isOpen, onClose, initialData }) => {
    const { addProduct, updateProduct, removeProduct } = useSalonStore();
    const [formData, setFormData] = useState(initialData || { name: '', price: 0, stock: 0, category: '' });

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (initialData?.id) {
            updateProduct({ ...formData, id: initialData.id });
        } else {
            addProduct(formData);
        }
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-sm p-6 animate-in fade-in zoom-in-95">
                <h3 className="text-lg font-bold mb-4">{initialData ? 'Editar Producto' : 'Nuevo Producto'}</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="text-xs font-bold text-gray-500 uppercase">Nombre</label>
                        <input className="w-full border rounded-lg p-2 mt-1" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} required />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-xs font-bold text-gray-500 uppercase">Precio</label>
                            <input type="number" className="w-full border rounded-lg p-2 mt-1" value={formData.price} onChange={e => setFormData({ ...formData, price: parseInt(e.target.value) })} required />
                        </div>
                        <div>
                            <label className="text-xs font-bold text-gray-500 uppercase">Stock</label>
                            <input type="number" className="w-full border rounded-lg p-2 mt-1" value={formData.stock} onChange={e => setFormData({ ...formData, stock: parseInt(e.target.value) })} required />
                        </div>
                    </div>
                    <div>
                        <label className="text-xs font-bold text-gray-500 uppercase">Categoría</label>
                        <input className="w-full border rounded-lg p-2 mt-1" value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })} />
                    </div>
                    <div className="flex gap-2 pt-2">
                        <button type="button" onClick={onClose} className="flex-1 py-2 border rounded-lg hover:bg-gray-50">Cancelar</button>
                        <button type="submit" className="flex-1 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Guardar</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const ProductsView = () => {
    const { services, products, removeService, removeProduct } = useSalonStore();
    const [activeTab, setActiveTab] = useState('services'); // 'services' or 'products'
    const [searchTerm, setSearchTerm] = useState('');

    // Modal State
    const [showServiceModal, setShowServiceModal] = useState(false);
    const [showProductModal, setShowProductModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const filteredServices = services.filter(s => s.name.toLowerCase().includes(searchTerm.toLowerCase()));
    const filteredProducts = products.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <div className="h-full flex flex-col bg-white rounded-2xl shadow-sm overflow-hidden animate-in fade-in zoom-in-95 duration-300">
            {/* Header */}
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-white">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800">Catálogo e Inventario</h2>
                    <p className="text-slate-500 text-sm mt-1">Gestiona tus servicios y productos de venta.</p>
                </div>

                <div className="flex gap-4">
                    <div className="relative group">
                        <Search className="absolute left-3 top-2.5 text-slate-400" size={20} />
                        <input
                            type="text"
                            placeholder={activeTab === 'services' ? "Buscar servicio..." : "Buscar producto..."}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="bg-slate-50 border border-slate-200 pl-10 pr-4 py-2.5 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 w-64 transition-all"
                        />
                    </div>
                    <button
                        onClick={() => {
                            setSelectedItem(null);
                            activeTab === 'services' ? setShowServiceModal(true) : setShowProductModal(true);
                        }}
                        className="flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-5 py-2.5 rounded-xl font-semibold shadow-lg shadow-primary/30 transition-all hover:scale-105"
                    >
                        <Plus size={20} /> {activeTab === 'services' ? 'Nuevo Servicio' : 'Nuevo Producto'}
                    </button>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-gray-100">
                <button
                    onClick={() => setActiveTab('services')}
                    className={`flex-1 py-4 text-sm font-bold uppercase tracking-wide transition-all border-b-2 ${activeTab === 'services' ? 'border-primary text-primary bg-primary/5' : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'}`}
                >
                    <div className="flex items-center justify-center gap-2">
                        <Scissors size={18} /> Servicios
                    </div>
                </button>
                <button
                    onClick={() => setActiveTab('products')}
                    className={`flex-1 py-4 text-sm font-bold uppercase tracking-wide transition-all border-b-2 ${activeTab === 'products' ? 'border-primary text-primary bg-primary/5' : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'}`}
                >
                    <div className="flex items-center justify-center gap-2">
                        <Package size={18} /> Productos (Inventario)
                    </div>
                </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 bg-slate-50">
                {activeTab === 'services' ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredServices.map(service => (
                            <div key={service.id} className="bg-white p-4 rounded-xl border border-gray-100 hover:shadow-md transition-all flex justify-between group">
                                <div className="flex gap-4">
                                    <div className="w-12 h-12 rounded-lg flex items-center justify-center text-white shadow-sm" style={{ backgroundColor: service.color }}>
                                        <Scissors size={20} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-800">{service.name}</h4>
                                        <div className="flex items-center gap-3 text-xs text-gray-500 mt-1">
                                            <span className="flex items-center gap-1"><Clock size={12} /> {service.duration} min</span>
                                            <span className="flex items-center gap-1"><DollarSign size={12} /> {service.price.toLocaleString('es-CL')}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button onClick={() => { setSelectedItem(service); setShowServiceModal(true); }} className="p-1.5 text-blue-500 hover:bg-blue-50 rounded-lg"><Edit size={16} /></button>
                                    <button onClick={() => { if (window.confirm('¿Borrar?')) removeService(service.id); }} className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg"><Trash2 size={16} /></button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredProducts.map(product => (
                            <div key={product.id} className="bg-white p-4 rounded-xl border border-gray-100 hover:shadow-md transition-all flex justify-between group">
                                <div className="flex gap-4">
                                    <div className="w-12 h-12 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center shadow-sm">
                                        <Package size={20} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-800">{product.name}</h4>
                                        <div className="flex items-center gap-3 text-xs text-gray-500 mt-1">
                                            <span className="flex items-center gap-1"><Tag size={12} /> {product.category}</span>
                                            <span className="flex items-center gap-1 text-emerald-600 font-bold bg-emerald-50 px-1.5 py-0.5 rounded">Stock: {product.stock}</span>
                                        </div>
                                        <div className="mt-1 font-bold text-sm text-gray-900">${product.price.toLocaleString('es-CL')}</div>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button onClick={() => { setSelectedItem(product); setShowProductModal(true); }} className="p-1.5 text-blue-500 hover:bg-blue-50 rounded-lg"><Edit size={16} /></button>
                                    <button onClick={() => { if (window.confirm('¿Borrar?')) removeProduct(product.id); }} className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg"><Trash2 size={16} /></button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Modals */}
            {showServiceModal && <ServiceModal isOpen={showServiceModal} onClose={() => setShowServiceModal(false)} initialData={selectedItem} />}
            {showProductModal && <ProductModal isOpen={showProductModal} onClose={() => setShowProductModal(false)} initialData={selectedItem} />}
        </div>
    );
};

export default ProductsView;
