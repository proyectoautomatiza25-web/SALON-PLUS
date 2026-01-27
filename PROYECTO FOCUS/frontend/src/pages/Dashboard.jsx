import { useEffect, useState } from 'react';
import api from '../services/api';
import Layout from '../components/Layout';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { DollarSign, ShoppingBag, Users, TrendingUp } from 'lucide-react';

export default function Dashboard() {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await api.get('/dashboard/resumen?dias=30');
                setStats(response.data);
            } catch (error) {
                console.error("Error fetching stats", error);
                // Fallback fake data for visual demo if API fails (or is empty)
                setStats({
                    ventas_total: 0,
                    cantidad_ventas: 0,
                    ticket_promedio: 0,
                    ventas_por_canal: [],
                    top_productos: [],
                    top_clientes: []
                });
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    if (loading) return <Layout><div className="flex justify-center items-center h-full">Cargando...</div></Layout>;

    return (
        <Layout>
            <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-800">Resumen General</h2>
                <p className="text-gray-500">Últimos 30 días</p>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center">
                    <div className="p-3 bg-blue-100 rounded-full mr-4">
                        <DollarSign className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 font-medium">Ventas Totales</p>
                        <p className="text-2xl font-bold text-gray-900">${stats.ventas_total.toLocaleString('es-CL')}</p>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center">
                    <div className="p-3 bg-green-100 rounded-full mr-4">
                        <ShoppingBag className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 font-medium">Transacciones</p>
                        <p className="text-2xl font-bold text-gray-900">{stats.cantidad_ventas}</p>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center">
                    <div className="p-3 bg-purple-100 rounded-full mr-4">
                        <TrendingUp className="h-6 w-6 text-purple-600" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 font-medium">Ticket Promedio</p>
                        <p className="text-2xl font-bold text-gray-900">${Math.round(stats.ticket_promedio).toLocaleString('es-CL')}</p>
                    </div>
                </div>
            </div>

            {/* Charts & Tables */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                {/* Ventas por Canal */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-lg font-bold text-gray-800 mb-4">Ventas por Canal</h3>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={stats.ventas_por_canal}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="canal" axisLine={false} tickLine={false} />
                                <YAxis axisLine={false} tickLine={false} />
                                <Tooltip
                                    formatter={(value) => [`$${value.toLocaleString('es-CL')}`, 'Venta']}
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                />
                                <Bar dataKey="total" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Top Productos */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-lg font-bold text-gray-800 mb-4">Top 5 Productos</h3>
                    <div className="overflow-x-auto">
                        <table className="min-w-full">
                            <thead>
                                <tr className="border-b border-gray-100">
                                    <th className="py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Producto</th>
                                    <th className="py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Ingreso Total</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {stats.top_productos.length > 0 ? (
                                    stats.top_productos.map((prod, idx) => (
                                        <tr key={idx}>
                                            <td className="py-3 text-sm text-gray-700">{prod.nombre}</td>
                                            <td className="py-3 text-sm text-gray-900 font-semibold text-right">${prod.total.toLocaleString('es-CL')}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr><td colSpan="2" className="py-4 text-center text-gray-400">Sin datos</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </Layout>
    );
}
