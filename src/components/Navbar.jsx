import React from 'react'
import { Menu, Phone, Calendar } from 'lucide-react'
import { SchedulingService } from '../services/schedulingService'

const Navbar = ({ onAdminLogin }) => {
    const bookingAction = SchedulingService.getBookingAction();

    return (
        <nav className="glass" style={{
            position: 'sticky',
            top: 0,
            zIndex: 1000,
            padding: '1rem 0'
        }}>
            <div className="container" style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <div className="logo" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <img src="https://www.cmdelvalle.cl/assets/img/logo.png?1.0.4" alt="Logo" style={{ height: '50px' }} />
                    <div style={{ width: '1px', height: '24px', background: 'rgba(0,0,0,0.1)' }} />
                    <span style={{ fontWeight: '700', color: 'var(--primary)', fontSize: '1.1rem' }}>Centro Médico Del Valle</span>
                </div>

                <div style={{ display: 'flex', gap: '2.5rem', alignItems: 'center' }}>
                    <ul style={{ display: 'flex', gap: '2rem', fontWeight: '500' }}>
                        <li><a href="#hero">Inicio</a></li>
                        <li><a href="#services">Servicios</a></li>
                        <li><a href="#nosotros">Nosotros</a></li>
                        <li><button onClick={onAdminLogin} style={{ background: 'none', border: 'none', cursor: 'pointer', fontWeight: '500', color: 'var(--text-muted)' }}>Admin</button></li>
                    </ul>
                    <a href={bookingAction.payload}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-primary"
                        style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Calendar size={18} />
                        Agendar Hora
                    </a>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
