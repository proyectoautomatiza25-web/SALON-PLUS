import { useEffect, useState } from 'react';
import api from '../services/api';
import Layout from '../components/Layout';
import { format } from 'date-fns';

export default function Ventas() {
    const [ventas, setVentas] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchVentas = async () => {
            try {
                const response = await api.get('/ventas/');
                setVentas(response.data);
            } catch (error) {
                console.error("Error fetching ventas");
            } finally {
                setLoading(false);
            }
        };
        fetchVentas();
    }, []);

    return (
        <Layout>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Historial de Ventas</h2>
                <div className="flex gap-2">
                    <input
                        type="file"
                        id="csv-upload"
                        className="hidden"
                        accept=".xlsx,.csv"
                        onChange={async (e) => {
                            const file = e.target.files[0];
                            if (!file) return;

                            const formData = new FormData();
                            formData.append('file', file);

                            try {
                                setLoading(true); // Reusa estado loading de la tabla
                                await api.post('/ventas/upload-csv', formData, {
                                    headers: { 'Content-Type': 'multipart/form-data' }
                                });
                                alert('Ventas importadas exitosamente!');
                                // Recargar ventas
                                const response = await api.get('/ventas/');
                                setVentas(response.data);
                            } catch (err) {
                                console.error(err);
                                alert('Error al importar: ' + (err.response?.data?.detail || err.message));
                            } finally {
                                setLoading(false);
                                e.target.value = ''; // Limpiar input
                            }
                        }}
                    />
                    <label
                        htmlFor="csv-upload"
                        className="bg-green-600 cursor-pointer text-white px-4 py-2 rounded-lg hover:bg-green-700 text-sm font-medium flex items-center gap-2"
                    >
                        📂 Importar Excel Fudo
                    </label>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Canal</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pago</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mesero</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {loading ? (
                            <tr><td colSpan="6" className="px-6 py-4 text-center">Cargando...</td></tr>
                        ) : ventas.length === 0 ? (
                            <tr><td colSpan="6" className="px-6 py-4 text-center text-gray-400">No hay ventas registradas</td></tr>
                        ) : (
                            ventas.map((venta) => (
                                <tr key={venta.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {format(new Date(venta.fecha), 'dd/MM/yyyy HH:mm')}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 capitalize">{venta.canal}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">{venta.metodo_pago}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{venta.mesero || '-'}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${venta.estado === 'cerrada' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                            {venta.estado}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-bold text-gray-900">
                                        ${parseFloat(venta.importe_total).toLocaleString('es-CL')}
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
