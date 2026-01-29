import React, { useState } from 'react';
import { useSalonStore } from '../store';
import { Search, ShoppingCart, Trash2, Plus, Minus, CreditCard, Banknote, User } from 'lucide-react';

const CheckoutView = () => {
    const { services, products, clients } = useSalonStore();
    const [cart, setCart] = useState([]);
    const [selectedClient, setSelectedClient] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('all');

    // Combine services and products for search
    const allItems = [
        ...services.map(s => ({ ...s, type: 'service', displayCategory: 'Servicio' })),
        ...products.map(p => ({ ...p, type: 'product', displayCategory: p.category }))
    ];

    const filteredItems = allItems.filter(item =>
        (categoryFilter === 'all' ||
            (categoryFilter === 'services' && item.type === 'service') ||
            (categoryFilter === 'products' && item.type === 'product')) &&
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const addToCart = (item) => {
        const existingItem = cart.find(i => i.id === item.id && i.type === item.type);
        if (existingItem) {
            setCart(cart.map(i => i.id === item.id && i.type === item.type ? { ...i, qty: i.qty + 1 } : i));
        } else {
            setCart([...cart, { ...item, qty: 1 }]);
        }
    };

    const updateQty = (id, type, delta) => {
        setCart(cart.map(item => {
            if (item.id === id && item.type === type) {
                const newQty = item.qty + delta;
                return newQty > 0 ? { ...item, qty: newQty } : item;
            }
            return item;
        }));
    };

    const removeFromCart = (id, type) => {
        setCart(cart.filter(item => !(item.id === id && item.type === type)));
    };

    const total = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

    return (
        <div className="h-full flex gap-6 bg-slate-50 p-6 overflow-hidden">

            {/* Left Side: Product/Service Catalog */}
            <div className="flex-1 flex flex-col bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                {/* Header & Filter */}
                <div className="p-4 border-b border-gray-100 space-y-4">
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-bold text-gray-800">Catálogo</h2>
                        <div className="flex bg-gray-100 p-1 rounded-lg">
                            {['all', 'services', 'products'].map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setCategoryFilter(cat)}
                                    className={`px-3 py-1.5 text-xs font-semibold rounded-md capitalize transition-all ${categoryFilter === cat ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500 hover:text-gray-800'}`}
                                >
                                    {cat === 'all' ? 'Todos' : cat === 'services' ? 'Servicios' : 'Productos'}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="relative">
                        <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Buscar servicio o producto..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-slate-50 border border-gray-200 pl-10 pr-4 py-2 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all"
                        />
                    </div>
                </div>

                {/* Grid */}
                <div className="flex-1 overflow-y-auto p-4 grid grid-cols-2 lg:grid-cols-3 gap-3">
                    {filteredItems.map((item, idx) => (
                        <div
                            key={`${item.type}-${item.id}`}
                            onClick={() => addToCart(item)}
                            className="group relative bg-white border border-gray-100 rounded-xl p-3 hover:shadow-md hover:border-blue-200 transition-all cursor-pointer flex flex-col justify-between"
                        >
                            <div>
                                <div className="text-[10px] font-bold tracking-wider text-gray-400 uppercase mb-1">{item.displayCategory}</div>
                                <h3 className="font-semibold text-gray-700 leading-tight text-sm mb-2 group-hover:text-blue-600 transition-colors">{item.name}</h3>
                            </div>
                            <div className="flex justify-between items-end mt-2">
                                <span className="font-bold text-gray-900">${item.price.toLocaleString('es-CL')}</span>
                                <button className="bg-gray-50 text-blue-600 p-1.5 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                    <Plus size={14} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Right Side: Cart / Checkout */}
            <div className="w-[380px] flex flex-col bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                {/* Client Selector */}
                <div className="p-4 bg-gray-50 border-b border-gray-200">
                    <div className="relative">
                        <User className="absolute left-3 top-3 text-gray-400" size={18} />
                        <select
                            value={selectedClient}
                            onChange={(e) => setSelectedClient(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 outline-none focus:ring-2 focus:ring-blue-100"
                        >
                            <option value="">Seleccionar Cliente (Público General)</option>
                            {clients.map(c => (
                                <option key={c.id} value={c.id}>{c.name}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Cart Items */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                    {cart.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-gray-300">
                            <ShoppingCart size={48} className="mb-2 opacity-50" />
                            <p className="font-medium text-sm">El carrito está vacío</p>
                        </div>
                    ) : (
                        cart.map((item) => (
                            <div key={`${item.type}-${item.id}`} className="flex items-center gap-3 bg-white p-2 rounded-lg border border-gray-50 hover:bg-gray-50 transition-colors">
                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-xs ${item.type === 'service' ? 'bg-blue-400' : 'bg-pink-400'}`}>
                                    {item.qty}x
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4 className="font-semibold text-gray-800 text-sm truncate">{item.name}</h4>
                                    <p className="text-xs text-gray-500">${item.price.toLocaleString('es-CL')}</p>
                                </div>
                                <div className="flex flex-col items-end gap-1">
                                    <span className="font-bold text-gray-700 text-sm">${(item.price * item.qty).toLocaleString('es-CL')}</span>
                                    <div className="flex items-center bg-gray-100 rounded-md">
                                        <button onClick={() => updateQty(item.id, item.type, -1)} className="p-1 hover:text-red-500"><Minus size={12} /></button>
                                        <button onClick={() => removeFromCart(item.id, item.type)} className="p-1 text-gray-300 hover:text-red-500 ml-1"><Trash2 size={12} /></button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Summary & Pay */}
                <div className="p-5 bg-gray-50 border-t border-gray-200 space-y-4">
                    <div className="space-y-2 text-sm">
                        <div className="flex justify-between text-gray-500">
                            <span>Subtotal</span>
                            <span>${total.toLocaleString('es-CL')}</span>
                        </div>
                        <div className="flex justify-between text-gray-500">
                            <span>Descuento</span>
                            <span>$0</span>
                        </div>
                        <div className="flex justify-between text-xl font-bold text-gray-900 pt-2 border-t border-gray-200">
                            <span>Total</span>
                            <span>${total.toLocaleString('es-CL')}</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <button className="flex flex-col items-center justify-center py-3 bg-white border border-gray-200 rounded-xl text-gray-600 hover:bg-green-50 hover:border-green-200 hover:text-green-700 transition-all">
                            <Banknote size={20} className="mb-1" />
                            <span className="text-xs font-bold">Efectivo</span>
                        </button>
                        <button className="flex flex-col items-center justify-center py-3 bg-white border border-gray-200 rounded-xl text-gray-600 hover:bg-blue-50 hover:border-blue-200 hover:text-blue-700 transition-all">
                            <CreditCard size={20} className="mb-1" />
                            <span className="text-xs font-bold">Tarjeta</span>
                        </button>
                    </div>

                    <button
                        onClick={() => {
                            if (window.confirm(`¿Confirmar pago de $${total.toLocaleString('es-CL')}?`)) {
                                alert('¡Pago procesado con éxito!');
                                setCart([]);
                                setSelectedClient('');
                            }
                        }}
                        className="w-full py-4 bg-[#1e1b4b] text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={cart.length === 0}
                    >
                        Procesar Pago
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CheckoutView;
