import React from 'react';
import { BarChart, Bar, PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, Users, Calendar, AlertCircle, CheckCircle, XCircle, Clock } from 'lucide-react';

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
        background: 'white',
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
                <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                    {subtitle}
                </div>
            )}
            {trend && (
                <div style={{
                    marginTop: '10px',
                    fontSize: '0.75rem',
                    color: trend > 0 ? '#10b981' : '#ef4444',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px'
                }}>
                    <TrendingUp size={14} />
                    {trend > 0 ? '+' : ''}{trend}% vs mes anterior
                </div>
            )}
        </div>
    </div>
);

const Dashboard = ({ stats }) => {
    // Prepare data for charts
    const channelData = Object.entries(stats.patientsByChannel || {}).map(([name, value]) => ({
        name,
        value,
        percentage: ((value / stats.totalPatients) * 100).toFixed(1)
    }));

    const statusData = Object.entries(stats.appointmentsByStatus || {}).map(([status, count]) => ({
        name: status === 'confirmed' ? 'Confirmado' :
            status === 'attended' ? 'Atendido' :
                status === 'pending' ? 'Pendiente' :
                    status === 'no_show' ? 'No llegó' :
                        status === 'cancelled' ? 'Cancelado' :
                            status === 'suspended' ? 'Suspendido' : 'Bloqueo',
        value: count,
        percentage: ((count / (stats.confirmedAppointments + stats.pendingAppointments + stats.attendedAppointments + stats.noShowAppointments)) * 100).toFixed(1),
        color: COLORS[status]
    }));

    const professionalData = (stats.appointmentsByProfessional || []).filter(p => p.count > 0);

    return (
        <div style={{ padding: '40px', background: 'var(--bg-app)', minHeight: 'calc(100vh - 80px)' }}>
            <header style={{ marginBottom: '40px' }}>
                <h1 style={{
                    fontSize: '2.5rem',
                    fontWeight: '900',
                    background: 'var(--primary-gradient)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    marginBottom: '10px'
                }}>
                    Dashboard Personalizado
                </h1>
                <p style={{ color: '#64748b', fontSize: '1rem' }}>
                    Análisis completo de tu operación médica
                </p>
            </header>

            {/* Key Metrics */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '25px',
                marginBottom: '40px'
            }}>
                <StatCard
                    title="Pacientes Activos"
                    value={stats.activePatients}
                    subtitle="Últimos 30 días"
                    icon={Users}
                    color="#10b981"
                    trend={12}
                />
                <StatCard
                    title="Citas Confirmadas"
                    value={stats.confirmedAppointments}
                    subtitle="Pendientes de atención"
                    icon={CheckCircle}
                    color="#3b82f6"
                />
                <StatCard
                    title="Citas Atendidas"
                    value={stats.attendedAppointments}
                    subtitle="Este período"
                    icon={Calendar}
                    color="#10b981"
                />
                <StatCard
                    title="Tasa de Ausentismo"
                    value={`${stats.noShowRate}%`}
                    subtitle={`${stats.noShowAppointments} no llegaron`}
                    icon={XCircle}
                    color="#ef4444"
                />
            </div>

            {/* Charts Grid */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))',
                gap: '30px',
                marginBottom: '40px'
            }}>
                {/* Patients by Channel */}
                <div className="bento-card" style={{ padding: '30px', background: 'white' }}>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: '800', marginBottom: '20px', color: '#1e293b' }}>
                        Nuevos Pacientes por Canal
                    </h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={channelData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={({ name, percentage }) => `${name}: ${percentage}%`}
                                outerRadius={100}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {channelData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={['#3b82f6', '#10b981', '#f59e0b', '#ec4899', '#8b5cf6'][index % 5]} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                    <div style={{ marginTop: '20px', fontSize: '0.85rem', color: '#64748b' }}>
                        <strong>Total:</strong> {stats.totalPatients} pacientes registrados
                    </div>
                </div>

                {/* Appointments by Status */}
                <div className="bento-card" style={{ padding: '30px', background: 'white' }}>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: '800', marginBottom: '20px', color: '#1e293b' }}>
                        Citas por Estado
                    </h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={statusData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={({ name, percentage }) => `${name}: ${percentage}%`}
                                outerRadius={100}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {statusData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                {/* Appointments by Professional */}
                <div className="bento-card" style={{ padding: '30px', background: 'white', gridColumn: 'span 2' }}>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: '800', marginBottom: '20px', color: '#1e293b' }}>
                        Citas Atendidas por Profesional
                    </h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={professionalData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="count" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                    <div style={{
                        marginTop: '20px',
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                        gap: '15px'
                    }}>
                        {professionalData.map((prof, idx) => (
                            <div key={idx} style={{
                                padding: '15px',
                                background: '#f8fafc',
                                borderRadius: '12px',
                                borderLeft: '3px solid #3b82f6'
                            }}>
                                <div style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: '5px' }}>
                                    {prof.name}
                                </div>
                                <div style={{ fontSize: '1.5rem', fontWeight: '800', color: '#1e293b' }}>
                                    {prof.count}
                                </div>
                                <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>
                                    {prof.percentage}% del total
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Additional Stats */}
            <div className="bento-card" style={{ padding: '30px', background: 'white' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: '800', marginBottom: '20px', color: '#1e293b' }}>
                    Estado de Resultados
                </h3>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                    gap: '20px'
                }}>
                    <div style={{ padding: '20px', background: '#f0fdf4', borderRadius: '12px' }}>
                        <div style={{ fontSize: '0.85rem', color: '#15803d', marginBottom: '8px' }}>
                            💰 Ingresos Totales
                        </div>
                        <div style={{ fontSize: '2rem', fontWeight: '900', color: '#15803d' }}>
                            ${stats.totalSales?.toLocaleString('es-CL')}
                        </div>
                        <div style={{ fontSize: '0.75rem', color: '#4ade80', marginTop: '5px' }}>
                            Basado en citas atendidas
                        </div>
                    </div>
                    <div style={{ padding: '20px', background: '#eff6ff', borderRadius: '12px' }}>
                        <div style={{ fontSize: '0.85rem', color: '#1e40af', marginBottom: '8px' }}>
                            📨 Notificaciones Enviadas
                        </div>
                        <div style={{ fontSize: '2rem', fontWeight: '900', color: '#1e40af' }}>
                            {stats.notificationsSent}
                        </div>
                        <div style={{ fontSize: '0.75rem', color: '#60a5fa', marginTop: '5px' }}>
                            WhatsApp + Email
                        </div>
                    </div>
                    <div style={{ padding: '20px', background: '#fef3c7', borderRadius: '12px' }}>
                        <div style={{ fontSize: '0.85rem', color: '#92400e', marginBottom: '8px' }}>
                            👨‍⚕️ Profesionales Activos
                        </div>
                        <div style={{ fontSize: '2rem', fontWeight: '900', color: '#92400e' }}>
                            {stats.activeProfessionals}
                        </div>
                        <div style={{ fontSize: '0.75rem', color: '#fbbf24', marginTop: '5px' }}>
                            En operación
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                .bento-card {
                    border-radius: 20px;
                    box-shadow: 0 1px 3px rgba(0,0,0,0.05);
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                }
                .bento-card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 20px 40px rgba(0,0,0,0.1);
                }
            `}</style>
        </div>
    );
};

export default Dashboard;
