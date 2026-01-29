import React from 'react'
import { Instagram, Linkedin, Mail, MapPin, Phone } from 'lucide-react'

const Footer = () => {
    return (
        <footer style={{
            backgroundColor: '#f8f9fa',
            padding: '5rem 0 2rem 0',
            borderTop: '1px solid #eee'
        }}>
            <div className="container" style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '4rem'
            }}>
                <div>
                    <div style={{
                        background: 'linear-gradient(135deg, var(--primary) 0%, #00a8a8 100%)',
                        width: '50px',
                        height: '50px',
                        borderRadius: '14px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.8rem',
                        marginBottom: '1.5rem',
                        boxShadow: '0 4px 12px rgba(0, 158, 157, 0.3)'
                    }}>
                        📅
                    </div>
                    <h3 style={{ fontWeight: '900', fontSize: '1.3rem', marginBottom: '0.5rem' }}>Agenda Plus</h3>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
                        La plataforma SaaS líder para centros médicos en Chile. Automatiza, gestiona y crece.
                    </p>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <a href="https://www.instagram.com/automatizasur/" target="_blank" className="btn-outline" style={{ padding: '10px', borderRadius: '50%' }}><Instagram size={20} /></a>
                        <a href="https://www.linkedin.com/company/automatizasur/" target="_blank" className="btn-outline" style={{ padding: '10px', borderRadius: '50%' }}><Linkedin size={20} /></a>
                    </div>
                </div>

                <div>
                    <h4 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '1.5rem' }}>Producto</h4>
                    <ul style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <li><a href="#features" style={{ color: 'var(--text-muted)' }}>Funcionalidades</a></li>
                        <li><a href="#pricing" style={{ color: 'var(--text-muted)' }}>Precios</a></li>
                        <li><a href="#demo" style={{ color: 'var(--text-muted)' }}>Solicitar Demo</a></li>
                        <li><a href="#casos" style={{ color: 'var(--text-muted)' }}>Casos de Éxito</a></li>
                    </ul>
                </div>

                <div>
                    <h4 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '1.5rem' }}>Contacto</h4>
                    <ul style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <li style={{ display: 'flex', gap: '10px', alignItems: 'center', color: 'var(--text-muted)' }}>
                            <Mail size={20} style={{ color: 'var(--primary)' }} />
                            contacto@automatizasur.cl
                        </li>
                        <li style={{ display: 'flex', gap: '10px', alignItems: 'center', color: 'var(--text-muted)' }}>
                            <Phone size={20} style={{ color: 'var(--primary)' }} />
                            +56 9 XXXX XXXX
                        </li>
                        <li style={{ display: 'flex', gap: '10px', alignItems: 'center', color: 'var(--text-muted)' }}>
                            <MapPin size={20} style={{ color: 'var(--primary)' }} />
                            Puerto Montt, Chile
                        </li>
                    </ul>
                </div>
            </div>

            <div style={{
                textAlign: 'center',
                paddingTop: '4rem',
                marginTop: '2rem',
                borderTop: '1px solid #eee',
                color: 'var(--text-muted)',
                fontSize: '0.9rem'
            }}>
                © {new Date().getFullYear()} Automatiza Sur - Agenda Plus. Todos los derechos reservados.
            </div>
        </footer>
    )
}

export default Footer
