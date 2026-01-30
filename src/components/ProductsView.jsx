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
            <div className="p-4 md:p-6 border-b border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center bg-white gap-4">
                <div>
                    <h2 className="text-xl md:text-2xl font-bold text-slate-800">Catálogo e Inventario</h2>
                    <p className="text-slate-500 text-xs md:text-sm mt-1">Gestiona tus servicios y productos de venta.</p>
                </div>

                <div className="relative group w-full sm:w-64">
                    <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
                    <input
                        type="text"
                        placeholder={activeTab === 'services' ? "Buscar servicio..." : "Buscar producto..."}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 pl-10 pr-4 py-2 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                    />
                </div>
            </div>

            {activeTab === 'products' && (
                <div className="mt-4 md:mt-0 flex gap-2">
                    <label className="flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-xl font-semibold shadow-lg shadow-emerald-500/30 transition-all active:scale-95 cursor-pointer">
                        <Package size={18} /> <span className="text-sm">Importar Excel</span>
                        <input
                            type="file"
                            accept=".xlsx, .xls"
                            className="hidden"
                            onChange={async (e) => {
                                const file = e.target.files[0];
                                if (!file) return;

                                try {
                                    const XLSX = await import("xlsx");
                                    const data = await file.arrayBuffer();
                                    const workbook = XLSX.read(data);
                                    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
                                    const json = XLSX.utils.sheet_to_json(worksheet);

                                    // Auto-map columns helper
                                    const mapProduct = (row) => ({
                                        name: row['Nombre'] || row['Producto'] || row['Servicio'] || 'Sin Nombre',
                                        price: row['Precio'] || row['Valor'] || 0,
                                        stock: row['Stock'] || row['Cantidad'] || 0,
                                        category: row['Categoria'] || row['Tipo'] || 'General'
                                    });

                                    let count = 0;
                                    for (const row of json) {
                                        const product = mapProduct(row);
                                        // Add one by one
                                        if (product.name) {
                                            useSalonStore.getState().addProduct(product);
                                            count++;
                                        }
                                    }
                                    alert(`Se importaron ${count} productos correctamente.`);
                                } catch (err) {
                                    console.error(err);
                                    alert("Error al leer el archivo Excel. Asegúrate de tener columnas como 'Nombre', 'Precio', 'Stock'.");
                                }
                            }}
                        />
                    </label>
                </div>
            )}


            <div className="flex gap-2">
                <button
                    onClick={() => {
                        setSelectedItem(null);
                        activeTab === 'services' ? setShowServiceModal(true) : setShowProductModal(true);
                    }}
                    className="hidden sm:flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-xl font-semibold shadow-lg shadow-primary/30 transition-all active:scale-95"
                >
                    <Plus size={18} /> <span className="text-sm">{activeTab === 'services' ? 'Nuevo Servicio' : 'Nuevo Producto'}</span>
                </button>
            </div>
            {/* Modals */}
            {showServiceModal && <ServiceModal isOpen={showServiceModal} onClose={() => setShowServiceModal(false)} initialData={selectedItem} />}
            {showProductModal && <ProductModal isOpen={showProductModal} onClose={() => setShowProductModal(false)} initialData={selectedItem} />}
        </div>
    );
};

export default ProductsView;
