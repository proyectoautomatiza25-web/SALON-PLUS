import React from 'react'
import { Users, Calendar, TrendingUp, Mail, BarChart3, Zap, ArrowRight } from 'lucide-react'

const featureList = [
    {
        title: 'Gestión de Pacientes',
        desc: 'CRM médico completo con fichas digitales, historial clínico y seguimiento personalizado.',
        icon: <Users size={35} />,
        color: '#E0F2F1'
    },
    {
        title: 'Agendamiento Inteligente',
        desc: 'Calendario visual, reservas online, recordatorios automáticos y gestión de disponibilidad.',
        icon: <Calendar size={35} />,
        color: '#FFF3E0'
    },
    {
        title: 'Analytics Avanzado',
        desc: 'Dashboard con métricas en tiempo real, reportes personalizados y análisis de tendencias.',
        icon: <TrendingUp size={35} />,
        color: '#F3E5F5'
    },
    {
        title: 'Campañas Automatizadas',
        desc: 'Email y WhatsApp masivos, segmentación de pacientes y seguimiento de campañas.',
        icon: <Mail size={35} />,
        color: '#E3F2FD'
    },
    {
        title: 'Reportes y Estadísticas',
        desc: 'Visualización de KPIs, tasa de ausentismo, ingresos y rendimiento por profesional.',
        icon: <BarChart3 size={35} />,
        color: '#F1F8E9'
    },
    {
        title: 'Integraciones',
        desc: 'Conecta con WhatsApp, Email, pagos online y sistemas de facturación electrónica.',
        icon: <Zap size={35} />,
        color: '#FFEBEE'
    }
]

const Services = () => {
    return (
        <section id="features" className="section container" style={{ paddingBottom: '12rem' }}>
            <div style={{ textAlign: 'center', marginBottom: '7rem' }}>
                <h6 style={{ color: 'var(--primary)', fontWeight: '900', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '1.5rem', fontSize: '1rem' }}>
                    Funcionalidades Completas
                </h6>
                <h2 style={{ fontSize: '4rem', fontWeight: '900', color: '#1a2a2a', letterSpacing: '-1.5px' }}>
                    Todo lo que necesitas en <span className="gradient-text">Una Plataforma</span>
                </h2>
                <p style={{ marginTop: '1.5rem', color: '#4a5568', fontSize: '1.25rem', maxWidth: '700px', margin: '1.5rem auto 0' }}>
                    Agenda Plus integra todas las herramientas esenciales para modernizar tu centro médico.
                </p>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))',
                gap: '3rem'
            }}>
                {featureList.map((feature, index) => (
                    <div key={index} className="glass" style={{
                        padding: '3.5rem',
                        borderRadius: '40px',
                        transition: 'var(--transition)',
                        cursor: 'pointer',
                        border: '2px solid rgba(255,255,255,0.5)',
                        position: 'relative',
                        overflow: 'hidden'
                    }}>
                        <div style={{
                            backgroundColor: feature.color,
                            width: '90px',
                            height: '90px',
                            borderRadius: '24px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'var(--primary)',
                            marginBottom: '2.5rem',
                            boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.05)'
                        }}>
                            {feature.icon}
                        </div>
                        <h3 style={{ fontSize: '1.9rem', fontWeight: '900', marginBottom: '1.2rem', color: '#1a2a2a' }}>{feature.title}</h3>
                        <p style={{ color: '#4a5568', marginBottom: '2.5rem', lineHeight: '1.7', fontSize: '1.15rem', fontWeight: '500' }}>{feature.desc}</p>
                        <div style={{
                            color: 'var(--primary)',
                            fontWeight: '800',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            fontSize: '1.1rem'
                        }}>
                            Ver Detalles <ArrowRight size={20} />
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default Services
