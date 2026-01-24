import React from 'react'
import { Check, Sparkles } from 'lucide-react'

const Pricing = () => {
    return (
        <section id="pricing" className="section container" style={{ paddingBottom: '12rem' }}>
            <div style={{ textAlign: 'center', marginBottom: '7rem' }}>
                <h6 style={{
                    color: 'var(--primary)',
                    fontWeight: '900',
                    letterSpacing: '3px',
                    textTransform: 'uppercase',
                    marginBottom: '1.5rem',
                    fontSize: '1rem'
                }}>
                    Precio Simple y Transparente
                </h6>
                <h2 style={{
                    fontSize: '4rem',
                    fontWeight: '900',
                    color: '#1a2a2a',
                    letterSpacing: '-1.5px',
                    marginBottom: '1.5rem'
                }}>
                    Todo lo que necesitas en <span className="gradient-text">un solo plan</span>
                </h2>
                <p style={{
                    color: '#4a5568',
                    fontSize: '1.25rem',
                    maxWidth: '700px',
                    margin: '0 auto'
                }}>
                    Sin sorpresas, sin costos ocultos. Acceso completo a todas las funcionalidades.
                </p>
            </div>

            {/* Plan Único Destacado */}
            <div style={{
                maxWidth: '900px',
                margin: '0 auto',
                background: 'white',
                borderRadius: '40px',
                padding: '4rem',
                border: '3px solid var(--primary)',
                boxShadow: '0 40px 80px -20px rgba(0, 158, 157, 0.3)',
                position: 'relative',
                overflow: 'hidden'
            }}>
                {/* Badge Popular */}
                <div style={{
                    position: 'absolute',
                    top: '30px',
                    right: '-40px',
                    background: 'var(--gradient-primary)',
                    color: 'white',
                    padding: '8px 60px',
                    fontSize: '0.8rem',
                    fontWeight: '800',
                    transform: 'rotate(45deg)',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    boxShadow: '0 4px 12px rgba(0, 158, 157, 0.4)'
                }}>
                    Recomendado
                </div>

                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <div style={{
                        width: '90px',
                        height: '90px',
                        background: 'rgba(0, 158, 157, 0.1)',
                        borderRadius: '24px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 2rem',
                        color: 'var(--primary)'
                    }}>
                        <Sparkles size={40} />
                    </div>

                    <h3 style={{
                        fontSize: '2.5rem',
                        fontWeight: '900',
                        marginBottom: '1rem',
                        color: '#1a2a2a'
                    }}>
                        Agenda Plus Completo
                    </h3>

                    <p style={{
                        color: '#4a5568',
                        fontSize: '1.1rem',
                        marginBottom: '2.5rem',
                        maxWidth: '600px',
                        margin: '0 auto 2.5rem'
                    }}>
                        La solución completa para modernizar tu centro médico
                    </p>

                    <div style={{ marginBottom: '3rem' }}>
                        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: '12px' }}>
                            <span style={{
                                fontSize: '5rem',
                                fontWeight: '900',
                                color: 'var(--primary)',
                                lineHeight: '1'
                            }}>
                                $49.990
                            </span>
                            <div style={{ textAlign: 'left' }}>
                                <div style={{
                                    fontSize: '1.3rem',
                                    color: '#4a5568',
                                    fontWeight: '600'
                                }}>
                                    /mes
                                </div>
                                <div style={{
                                    fontSize: '0.9rem',
                                    color: '#94a3b8'
                                }}>
                                    + IVA
                                </div>
                            </div>
                        </div>
                    </div>

                    <div style={{
                        background: 'rgba(16, 185, 129, 0.1)',
                        padding: '1.5rem',
                        borderRadius: '16px',
                        marginBottom: '3rem'
                    }}>
                        <p style={{
                            color: '#10b981',
                            fontWeight: '700',
                            fontSize: '1.1rem',
                            margin: 0
                        }}>
                            ✨ Prueba gratis por 14 días • Sin tarjeta de crédito
                        </p>
                    </div>
                </div>

                {/* Features en 2 columnas */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '1.5rem 3rem',
                    marginBottom: '3rem'
                }}>
                    {[
                        'Pacientes ilimitados',
                        'Profesionales ilimitados',
                        'Agenda inteligente completa',
                        'CRM médico avanzado',
                        'Campañas Email y WhatsApp',
                        'Dashboard con analytics',
                        'Reportes y estadísticas',
                        'Recordatorios automáticos',
                        'Gestión de citas y estados',
                        'Historial clínico digital',
                        'Integraciones avanzadas',
                        'Soporte prioritario',
                        'Actualizaciones incluidas',
                        'SSL y seguridad incluida',
                        'Backup automático diario',
                        'Capacitación inicial'
                    ].map((feature, idx) => (
                        <div key={idx} style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            color: '#475569',
                            fontSize: '1rem'
                        }}>
                            <div style={{
                                backgroundColor: '#10b98115',
                                borderRadius: '50%',
                                padding: '5px',
                                display: 'flex',
                                flexShrink: 0
                            }}>
                                <Check size={18} color="#10b981" strokeWidth={3} />
                            </div>
                            {feature}
                        </div>
                    ))}
                </div>

                {/* CTA */}
                <div style={{ textAlign: 'center' }}>
                    <a
                        href="#demo"
                        className="btn"
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '12px',
                            padding: '1.5rem 4rem',
                            background: 'var(--gradient-primary)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '20px',
                            fontWeight: '800',
                            fontSize: '1.2rem',
                            cursor: 'pointer',
                            textDecoration: 'none',
                            boxShadow: '0 15px 35px -10px rgba(0, 158, 157, 0.5)',
                            transition: 'all 0.3s ease'
                        }}
                    >
                        <Sparkles size={24} />
                        Comenzar Prueba Gratis
                    </a>
                    <p style={{
                        marginTop: '1.5rem',
                        color: '#94a3b8',
                        fontSize: '0.95rem'
                    }}>
                        No se requiere tarjeta de crédito • Cancela cuando quieras
                    </p>
                </div>
            </div>

            {/* Sección de garantía */}
            <div style={{
                textAlign: 'center',
                marginTop: '5rem',
                padding: '3rem',
                background: 'rgba(0, 158, 157, 0.05)',
                borderRadius: '24px',
                border: '1px solid rgba(0, 158, 157, 0.1)'
            }}>
                <h3 style={{
                    fontSize: '1.8rem',
                    fontWeight: '800',
                    marginBottom: '1rem',
                    color: '#1a2a2a'
                }}>
                    ¿Necesitas más información?
                </h3>
                <p style={{
                    color: '#4a5568',
                    fontSize: '1.1rem',
                    marginBottom: '2rem',
                    maxWidth: '600px',
                    margin: '0 auto 2rem'
                }}>
                    Agenda una llamada con nuestro equipo y descubre cómo Agenda Plus puede transformar tu centro médico.
                </p>
                <a
                    href="mailto:contacto@automatizasur.cl"
                    className="btn btn-outline"
                    style={{
                        padding: '1.2rem 3rem',
                        fontSize: '1.1rem',
                        fontWeight: '700'
                    }}
                >
                    Contactar Ventas
                </a>
            </div>
        </section>
    )
}

export default Pricing
