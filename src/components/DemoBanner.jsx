import React, { useState, useEffect } from 'react'
import { AlertCircle, X, Sparkles } from 'lucide-react'

const DemoBanner = ({ daysRemaining = 14, onUpgrade }) => {
    const [visible, setVisible] = useState(true)

    if (!visible) return null

    const isExpiringSoon = daysRemaining <= 3

    return (
        <div style={{
            background: isExpiringSoon
                ? 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)'
                : 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
            color: 'white',
            padding: '1rem 2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            position: 'relative',
            zIndex: 1000
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1 }}>
                <div style={{
                    background: 'rgba(255,255,255,0.2)',
                    padding: '8px',
                    borderRadius: '12px',
                    display: 'flex'
                }}>
                    {isExpiringSoon ? <AlertCircle size={24} /> : <Sparkles size={24} />}
                </div>
                <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: '800', fontSize: '1.1rem', marginBottom: '0.2rem' }}>
                        {isExpiringSoon ? '⚠️ Tu demo está por expirar' : '🎯 Estás en Modo DEMO'}
                    </div>
                    <div style={{ fontSize: '0.9rem', opacity: 0.95 }}>
                        {isExpiringSoon
                            ? `Solo te quedan ${daysRemaining} día${daysRemaining !== 1 ? 's' : ''} de acceso completo`
                            : `Tienes ${daysRemaining} días restantes de prueba gratuita`
                        }
                    </div>
                </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <button
                    onClick={onUpgrade}
                    style={{
                        background: 'white',
                        color: isExpiringSoon ? '#ef4444' : '#3b82f6',
                        border: 'none',
                        padding: '0.8rem 2rem',
                        borderRadius: '12px',
                        fontWeight: '800',
                        fontSize: '0.95rem',
                        cursor: 'pointer',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                        transition: 'all 0.3s ease',
                        whiteSpace: 'nowrap'
                    }}
                    onMouseEnter={(e) => {
                        e.target.style.transform = 'scale(1.05)'
                    }}
                    onMouseLeave={(e) => {
                        e.target.style.transform = 'scale(1)'
                    }}
                >
                    Actualizar a Plan Completo
                </button>
                <button
                    onClick={() => setVisible(false)}
                    style={{
                        background: 'rgba(255,255,255,0.2)',
                        border: 'none',
                        padding: '8px',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        display: 'flex',
                        color: 'white',
                        transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                        e.target.style.background = 'rgba(255,255,255,0.3)'
                    }}
                    onMouseLeave={(e) => {
                        e.target.style.background = 'rgba(255,255,255,0.2)'
                    }}
                >
                    <X size={20} />
                </button>
            </div>
        </div>
    )
}

export default DemoBanner
