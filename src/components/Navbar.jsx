import React from 'react'
import { Calendar, Sparkles } from 'lucide-react'

const Navbar = ({ onAdminLogin }) => {
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
                    <div style={{
                        background: 'linear-gradient(135deg, var(--primary) 0%, #00a8a8 100%)',
                        width: '50px',
                        height: '50px',
                        borderRadius: '14px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.8rem',
                        boxShadow: '0 4px 12px rgba(0, 158, 157, 0.3)'
                    }}>
                        📅
                    </div>
                    <div style={{ width: '1px', height: '24px', background: 'rgba(0,0,0,0.1)' }} />
                    <div>
                        <div style={{ fontWeight: '900', color: 'var(--primary)', fontSize: '1.3rem', lineHeight: '1' }}>Agenda Plus</div>
                        <div style={{ fontSize: '0.75rem', color: '#4a5568', fontWeight: '600' }}>by Automatiza Sur</div>
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '2.5rem', alignItems: 'center' }}>
                    <ul style={{ display: 'flex', gap: '2rem', fontWeight: '500' }}>
                        <li><a href="#hero">Inicio</a></li>
                        <li><a href="#features">Funcionalidades</a></li>
                        <li><a href="#pricing">Precios</a></li>
                    </ul>
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                        {/* Botón Admin - Para clientes que ya pagaron */}
                        <button
                            onClick={onAdminLogin}
                            className="btn-outline"
                            style={{
                                padding: '0.7rem 1.5rem',
                                fontWeight: '600',
                                fontSize: '0.95rem'
                            }}
                        >
                            Acceso Clientes
                        </button>
                        {/* Botón Demo - Para prueba gratuita */}
                        <a href="#demo"
                            className="btn btn-primary"
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                padding: '0.7rem 1.5rem'
                            }}>
                            <Sparkles size={18} />
                            Prueba Gratis
                        </a>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
