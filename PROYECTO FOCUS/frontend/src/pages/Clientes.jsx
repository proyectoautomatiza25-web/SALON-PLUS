import { useEffect, useState } from 'react';
import api from '../services/api';
import Layout from '../components/Layout';
import { User } from 'lucide-react';

export default function Clientes() {
    const [clientes, setClientes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchClientes = async () => {
            try {
                const response = await api.get('/clientes/top?top=50');
                setClientes(response.data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchClientes();
    }, []);

    return (
        <Layout>
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Mejores Clientes</h2>
                <p className="text-gray-500">Clientes ordenados por gasto total histórico</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {loading ? (
                    <div className="col-span-3 text-center py-10">Cargando...</div>
                ) : clientes.length === 0 ? (
                    <div className="col-span-3 text-center py-10 text-gray-400">No hay clientes registrados</div>
                ) : (
                    clientes.map((cliente) => (
                        <div key={cliente.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex items-start space-x-4">
                            <div className="bg-blue-100 p-3 rounded-full">
                                <User className="h-6 w-6 text-blue-600" />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-lg font-bold text-gray-900">{cliente.nombre}</h3>
                                <p className="text-sm text-gray-500">{cliente.email || 'Sin email'}</p>
                                <div className="mt-4 flex justify-between items-center text-sm">
                                    <span className="text-gray-500">Pedidos: <span className="font-semibold text-gray-700">{cliente.pedidos_totales}</span></span>
                                    <span className="text-blue-600 font-bold bg-blue-50 px-2 py-1 rounded">
                                        ${parseFloat(cliente.gasto_total).toLocaleString('es-CL')}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </Layout>
    );
}
