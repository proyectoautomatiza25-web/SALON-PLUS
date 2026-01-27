import { useEffect, useState } from 'react';
import api from '../services/api';
import Layout from '../components/Layout';

export default function Productos() {
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProductos = async () => {
            try {
                const response = await api.get('/productos/ranking?top=50');
                setProductos(response.data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchProductos();
    }, []);

    return (
        <Layout>
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Ranking de Productos</h2>
                <p className="text-gray-500">Top productos por ingresos generados</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Producto</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Categoría</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Unidades Vendidas</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Ingreso Total</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {loading ? (
                            <tr><td colSpan="4" className="px-6 py-4 text-center">Cargando...</td></tr>
                        ) : productos.length === 0 ? (
                            <tr><td colSpan="4" className="px-6 py-4 text-center text-gray-400">No hay datos</td></tr>
                        ) : (
                            productos.map((prod) => (
                                <tr key={prod.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{prod.nombre}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{prod.categoria}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900">{prod.ventas_totales}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-bold text-green-600">
                                        ${parseFloat(prod.ingresos_totales).toLocaleString('es-CL')}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </Layout>
    );
}
