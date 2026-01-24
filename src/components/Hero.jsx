import React from 'react'
import { ArrowRight, CheckCircle2, Zap, TrendingUp, Users, Calendar } from 'lucide-react'

const Hero = () => {
    return (
        <section id="hero" className="section container" style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            alignItems: 'center',
            gap: '4rem',
            paddingTop: '6rem',
            paddingBottom: '8rem'
        }}>
            <div className="fade-in-up">
                <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '10px',
                    backgroundColor: 'rgba(0, 158, 157, 0.1)',
                    padding: '0.6rem 1.2rem',
                    borderRadius: '50px',
                    color: 'var(--primary)',
                    fontSize: '0.95rem',
                    fontWeight: '700',
                    marginBottom: '2rem',
                    border: '1px solid rgba(0, 158, 157, 0.2)'
                }}>
                    <Zap size={18} />
                    Automatiza Sur - Tecnología Médica Inteligente
                </div>
                <h1 style={{
                    fontSize: '4.5rem',
                    lineHeight: '1.1',
                    marginBottom: '2rem',
                    fontWeight: '900',
                    color: '#1a2a2a',
                    letterSpacing: '-1.5px'
                }}>
                    Gestiona tu Centro Médico con <span className="gradient-text">Agenda Plus</span>
                </h1>
                <p style={{
                    fontSize: '1.3rem',
                    color: '#4a5568',
                    marginBottom: '3.5rem',
                    maxWidth: '600px',
                    lineHeight: '1.8',
                    fontWeight: '450'
                }}>
                    La plataforma SaaS completa para centros médicos modernos. Gestión de pacientes, agendamiento inteligente, campañas automatizadas y análisis en tiempo real.
                </p>

                {/* Features Grid */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '1.5rem',
                    marginBottom: '3rem'
                }}>
                    {[
                        { icon: <Calendar size={20} />, text: 'Agenda Inteligente' },
                        { icon: <Users size={20} />, text: 'CRM Médico' },
                        { icon: <TrendingUp size={20} />, text: 'Analytics Avanzado' },
                        { icon: <Zap size={20} />, text: 'Automatización' }
                    ].map((feature, idx) => (
                        <div key={idx} style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            color: '#1a2a2a',
                            fontWeight: '600'
                        }}>
                            <div style={{
                                backgroundColor: 'rgba(0, 158, 157, 0.1)',
                                padding: '8px',
                                borderRadius: '10px',
                                color: 'var(--primary)',
                                display: 'flex'
                            }}>
                                {feature.icon}
                            </div>
                            {feature.text}
                        </div>
                    ))}
                </div>

                <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
                    <a href="#demo" className="btn btn-primary" style={{ padding: '1.3rem 3rem' }}>
                        Solicitar Demo <ArrowRight size={22} />
                    </a>
                    <a href="#features" className="btn btn-outline" style={{ padding: '1.3rem 3rem' }}>
                        Ver Funcionalidades
                    </a>
                </div>

                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    marginTop: '4rem',
                    padding: '1rem 1.5rem',
                    background: 'rgba(0, 158, 157, 0.05)',
                    borderRadius: '16px',
                    borderLeft: '4px solid var(--primary)'
                }}>
                    <CheckCircle2 size={24} color="var(--primary)" />
                    <div>
                        <p style={{ fontWeight: '700', color: '#1a2a2a', fontSize: '1.05rem' }}>Implementación en 24 horas</p>
                        <p style={{ color: '#4a5568', fontSize: '0.95rem' }}>Sin instalación, 100% en la nube</p>
                    </div>
                </div>
            </div>

            <div className="fade-in-up" style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '2rem'
            }}>
                {/* Dashboard Preview con imagen real */}
                <div style={{
                    position: 'relative',
                    width: '100%',
                    borderRadius: '32px',
                    overflow: 'hidden',
                    boxShadow: '0 40px 80px rgba(0, 50, 50, 0.15)',
                    border: '8px solid white',
                    background: 'white'
                }}>
                    <img
                        src="/dashboard-preview.png"
                        alt="Dashboard Agenda Plus - Vista previa"
                        style={{
                            width: '100%',
                            height: 'auto',
                            display: 'block'
                        }}
                    />
                </div>

                {/* Stats Row */}
                <div style={{
                    display: 'flex',
                    gap: '2rem',
                    alignItems: 'center',
                    background: 'white',
                    padding: '1.5rem 2.5rem',
                    borderRadius: '100px',
                    boxShadow: '0 15px 35px rgba(0,0,0,0.08)',
                    border: '1px solid rgba(0,0,0,0.03)',
                    width: '100%',
                    justifyContent: 'space-around'
                }}>
                    {[
                        { value: '500+', label: 'Centros Médicos' },
                        { value: '99.9%', label: 'Uptime' },
                        { value: '24/7', label: 'Soporte' }
                    ].map((stat, idx) => (
                        <div key={idx} style={{ textAlign: 'center' }}>
                            <div style={{
                                fontSize: '2rem',
                                fontWeight: '900',
                                color: 'var(--primary)',
                                marginBottom: '0.3rem'
                            }}>{stat.value}</div>
                            <div style={{
                                fontSize: '0.9rem',
                                color: '#4a5568',
                                fontWeight: '600'
                            }}>{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Hero
