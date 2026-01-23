import React from 'react';
import { BarChart as ReBarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, Users, Calendar, CheckCircle, XCircle } from 'lucide-react';

const COLORS = {
    confirmed: '#3b82f6',
    attended: '#10b981',
    pending: '#eab308',
    no_show: '#ef4444',
    cancelled: '#94a3b8',
    suspended: '#f97316',
    block: '#1e293b'
};

const StatCard = ({ title, value, subtitle, icon: Icon, color, trend }) => (
    <div className="bento-card" style={{
        padding: '30px',
        background: '#fff',
        borderLeft: `4px solid ${color}`,
        position: 'relative',
        overflow: 'hidden'
    }}>
        <div style={{ position: 'absolute', top: '20px', right: '20px', opacity: 0.1 }}>
            <Icon size={80} color={color} />
        </div>
        <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: '600', marginBottom: '8px' }}>
                {title}
            </div>
            <div style={{ fontSize: '2.5rem', fontWeight: '900', color: color, marginBottom: '8px' }}>
                {value}
            </div>
            {subtitle && (
                <div style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: '600' }}>
                    {subtitle}
                </div>
            )}
        </div>
    </div>
);

const Dashboard = ({ stats }) => {
    const channelData = Object.entries(stats.patientsByChannel || {}).map(([name, value]) => ({
        name,
        value,
        percentage: ((value / stats.totalPatients) * 100).toFixed(1)
    }));

    const statusData = Object.entries(stats.appointmentsByStatus || {}).map(([status, count]) => ({
        name: status,
        value: count,
        color: COLORS[status] || '#cbd5e1'
    }));

    return (
        <div style={{ padding: '40px' }}>
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '25px',
                marginBottom: '40px'
            }}>
                <StatCard
                    title="Pacientes Activos"
                    value={stats.activePatients}
                    subtitle="Registrados en el sistema"
                    icon={Users}
                    color="#10b981"
                />
                <StatCard
                    title="Citas Confirmadas"
                    value={stats.confirmedAppointments}
                    subtitle="Listas para hoy"
                    icon={CheckCircle}
                    color="#3b82f6"
                />
                <StatCard
                    title="Citas Atendidas"
                    value={stats.attendedAppointments}
                    subtitle="Este mes"
                    icon={Calendar}
                    color="#8b5cf6"
                />
                <StatCard
                    title="Tasa Ausentismo"
                    value={`${stats.noShowRate}%`}
                    subtitle="Pacientes que no llegaron"
                    icon={XCircle}
                    color="#ef4444"
                />
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))',
                gap: '30px',
                marginBottom: '40px'
            }}>
                <div className="bento-card" style={{ padding: '30px', background: '#fff' }}>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: '800', marginBottom: '20px' }}>Pacientes por Canal</h3>
                    <div style={{ height: '300px' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={channelData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={100}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {channelData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={['#3b82f6', '#10b981', '#f59e0b', '#ec4899'][index % 4]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="bento-card" style={{ padding: '30px', background: '#fff' }}>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: '800', marginBottom: '20px' }}>Estado de Citas</h3>
                    <div style={{ height: '300px' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <ReBarChart data={statusData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                                <YAxis axisLine={false} tickLine={false} />
                                <Tooltip cursor={{ fill: '#f8fafc' }} />
                                <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                                    {statusData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Bar>
                            </ReBarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
