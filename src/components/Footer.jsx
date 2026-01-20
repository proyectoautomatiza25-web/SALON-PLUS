import React from 'react'
import { Instagram, Facebook, Mail, MapPin, Phone } from 'lucide-react'

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
                    <img src="https://www.cmdelvalle.cl/assets/img/logo.png?1.0.4" alt="Logo" style={{ height: '50px', marginBottom: '1.5rem' }} />
                    <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                        Dedicados a brindar atención médica de calidad con calidez humana en Puerto Montt.
                    </p>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <a href="https://www.instagram.com/centromedicodelvallepm/" target="_blank" className="btn-outline" style={{ padding: '10px', borderRadius: '50%' }}><Instagram size={20} /></a>
                        <a href="https://www.facebook.com/centromedicodelvallepm" target="_blank" className="btn-outline" style={{ padding: '10px', borderRadius: '50%' }}><Facebook size={20} /></a>
                    </div>
                </div>

                <div>
                    <h4 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '1.5rem' }}>Contacto</h4>
                    <ul style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <li style={{ display: 'flex', gap: '10px', alignItems: 'center', color: 'var(--text-muted)' }}>
                            <MapPin size={20} style={{ color: 'var(--primary)' }} />
                            Av. Sargento Silva 381, Puerto Montt
                        </li>
                        <li style={{ display: 'flex', gap: '10px', alignItems: 'center', color: 'var(--text-muted)' }}>
                            <Phone size={20} style={{ color: 'var(--primary)' }} />
                            +56 975912621
                        </li>
                        <li style={{ display: 'flex', gap: '10px', alignItems: 'center', color: 'var(--text-muted)' }}>
                            <Mail size={20} style={{ color: 'var(--primary)' }} />
                            contacto@cmdelvalle.cl
                        </li>
                    </ul>
                </div>

                <div>
                    <h4 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '1.5rem' }}>Horario</h4>
                    <ul style={{ display: 'flex', flexDirection: 'column', gap: '1rem', color: 'var(--text-muted)' }}>
                        <li style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span>Lunes - Viernes:</span>
                            <span>08:00 - 20:00</span>
                        </li>
                        <li style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span>Sábado:</span>
                            <span>09:00 - 14:00</span>
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
                © {new Date().getFullYear()} Centro Médico del Valle. Todos los derechos reservados.
            </div>
        </footer>
    )
}

export default Footer
