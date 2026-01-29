import React, { useState } from 'react'
import { Sparkles, Mail, User, Building2, Phone, ArrowRight, CheckCircle } from 'lucide-react'
import { sendDemoWelcomeEmail } from '../services/emailService'

const DemoRegistration = ({ onClose, onSuccess }) => {
    const [step, setStep] = useState(1) // 1: form, 2: success
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        centerName: ''
    })
    const [loading, setLoading] = useState(false)
    const [emailSent, setEmailSent] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        // Generar credenciales de demo
        const demoCredentials = {
            email: formData.email,
            password: 'Demo' + Math.random().toString(36).substring(2, 10).toUpperCase(),
            demoExpiresIn: 14,
            createdAt: new Date().toISOString()
        }

        // Guardar en localStorage
        localStorage.setItem('demoCredentials', JSON.stringify(demoCredentials))

        // Enviar email de bienvenida
        const emailResult = await sendDemoWelcomeEmail({
            name: formData.name,
            email: formData.email,
            centerName: formData.centerName,
            password: demoCredentials.password
        })

        setEmailSent(emailResult.success)
        setLoading(false)
        setStep(2)
    }

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    if (step === 2) {
        return (
            <div style={{
                position: 'fixed',
                inset: 0,
                background: 'rgba(15, 23, 42, 0.7)',
                backdropFilter: 'blur(8px)',
                zIndex: 10000,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '20px'
            }} onClick={onClose}>
                <div
                    className="fade-in-up"
                    style={{
                        background: 'white',
                        width: '100%',
                        maxWidth: '550px',
                        borderRadius: '32px',
                        padding: '3rem',
                        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                        textAlign: 'center'
                    }}
                    onClick={e => e.stopPropagation()}
                >
                    <div style={{
                        width: '80px',
                        height: '80px',
                        background: 'rgba(16, 185, 129, 0.1)',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 2rem',
                        color: '#10b981'
                    }}>
                        <CheckCircle size={40} />
                    </div>

                    <h2 style={{
                        fontSize: '2.5rem',
                        fontWeight: '900',
                        color: '#1a2a2a',
                        marginBottom: '1rem'
                    }}>
                        ¡Tu Demo está Lista! 🎉
                    </h2>

                    <p style={{
                        color: '#4a5568',
                        fontSize: '1.1rem',
                        marginBottom: '2.5rem',
                        lineHeight: '1.6'
                    }}>
                        {emailSent
                            ? <span>Hemos enviado un email a <strong>{formData.email}</strong> con tus credenciales.</span>
                            : <span style={{ color: '#009E9D' }}><strong>¡IMPORTANTE!</strong> Guarda estas credenciales ahora mismo.</span>}
                    </p>

                    <div style={{
                        background: 'rgba(0, 158, 157, 0.05)',
                        padding: '2rem',
                        borderRadius: '20px',
                        marginBottom: '2.5rem',
                        border: '1px solid rgba(0, 158, 157, 0.1)'
                    }}>
                        <h3 style={{
                            fontSize: '1.2rem',
                            fontWeight: '800',
                            color: '#1a2a2a',
                            marginBottom: '1rem'
                        }}>
                            Tus Credenciales de Acceso:
                        </h3>
                        <div style={{
                            background: 'white',
                            padding: '1.5rem',
                            borderRadius: '12px',
                            marginBottom: '1rem',
                            textAlign: 'left'
                        }}>
                            <div style={{ marginBottom: '1rem' }}>
                                <div style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.3rem' }}>Email:</div>
                                <div style={{ fontSize: '1rem', fontWeight: '700', color: '#1a2a2a' }}>{formData.email}</div>
                            </div>
                            <div>
                                <div style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.3rem' }}>Contraseña temporal:</div>
                                <div style={{ fontSize: '1rem', fontWeight: '700', color: '#1a2a2a', fontFamily: 'monospace' }}>
                                    {JSON.parse(localStorage.getItem('demoCredentials') || '{}').password}
                                </div>
                            </div>
                        </div>
                        <p style={{
                            fontSize: '0.9rem',
                            color: '#10b981',
                            fontWeight: '600',
                            margin: 0
                        }}>
                            ✨ Tienes 14 días de acceso completo
                        </p>
                    </div>

                    <div style={{ display: 'flex', gap: '1rem', flexDirection: 'column' }}>
                        <button
                            onClick={() => {
                                onSuccess()
                                onClose()
                            }}
                            style={{
                                width: '100%',
                                padding: '1.3rem',
                                background: 'var(--gradient-primary)',
                                color: 'white',
                                border: 'none',
                                borderRadius: '16px',
                                fontWeight: '800',
                                fontSize: '1.1rem',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '10px',
                                boxShadow: '0 10px 20px -5px rgba(0, 158, 157, 0.4)'
                            }}
                        >
                            Acceder al Demo <ArrowRight size={20} />
                        </button>
                        <button
                            onClick={onClose}
                            style={{
                                padding: '1rem',
                                background: 'transparent',
                                color: '#94a3b8',
                                border: 'none',
                                fontWeight: '600',
                                cursor: 'pointer'
                            }}
                        >
                            Cerrar
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(15, 23, 42, 0.7)',
            backdropFilter: 'blur(8px)',
            zIndex: 10000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            overflowY: 'auto'
        }} onClick={onClose}>
            <div
                className="fade-in-up"
                style={{
                    background: 'white',
                    width: '100%',
                    maxWidth: '480px',
                    maxHeight: '85vh',
                    overflowY: 'auto',
                    borderRadius: '24px',
                    padding: '2rem',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                    margin: 'auto'
                }}
                onClick={e => e.stopPropagation()}
            >
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <div style={{
                        width: '60px',
                        height: '60px',
                        background: 'rgba(0, 158, 157, 0.1)',
                        borderRadius: '16px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 1rem',
                        color: 'var(--primary)'
                    }}>
                        <Sparkles size={30} />
                    </div>
                    <h2 style={{
                        fontSize: '2rem',
                        fontWeight: '900',
                        color: '#1a2a2a',
                        marginBottom: '0.5rem'
                    }}>
                        Comienza tu Prueba Gratis
                    </h2>
                    <p style={{
                        color: '#4a5568',
                        fontSize: '0.95rem'
                    }}>
                        14 días de acceso completo • Sin tarjeta de crédito
                    </p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        {/* Nombre */}
                        <div>
                            <label style={{
                                display: 'block',
                                marginBottom: '0.5rem',
                                fontWeight: '600',
                                color: '#1a2a2a',
                                fontSize: '0.95rem'
                            }}>
                                Nombre Completo *
                            </label>
                            <div style={{ position: 'relative' }}>
                                <User size={20} style={{
                                    position: 'absolute',
                                    left: '1rem',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    color: '#94a3b8'
                                }} />
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    placeholder="Dr. Juan Pérez"
                                    style={{
                                        width: '100%',
                                        padding: '1rem 1rem 1rem 3rem',
                                        border: '2px solid #e2e8f0',
                                        borderRadius: '12px',
                                        fontSize: '1rem',
                                        transition: 'all 0.3s ease',
                                        outline: 'none'
                                    }}
                                    onFocus={(e) => e.target.style.borderColor = 'var(--primary)'}
                                    onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div>
                            <label style={{
                                display: 'block',
                                marginBottom: '0.5rem',
                                fontWeight: '600',
                                color: '#1a2a2a',
                                fontSize: '0.95rem'
                            }}>
                                Email Profesional *
                            </label>
                            <div style={{ position: 'relative' }}>
                                <Mail size={20} style={{
                                    position: 'absolute',
                                    left: '1rem',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    color: '#94a3b8'
                                }} />
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    placeholder="doctor@centromedico.cl"
                                    style={{
                                        width: '100%',
                                        padding: '1rem 1rem 1rem 3rem',
                                        border: '2px solid #e2e8f0',
                                        borderRadius: '12px',
                                        fontSize: '1rem',
                                        transition: 'all 0.3s ease',
                                        outline: 'none'
                                    }}
                                    onFocus={(e) => e.target.style.borderColor = 'var(--primary)'}
                                    onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                                />
                            </div>
                        </div>

                        {/* Teléfono */}
                        <div>
                            <label style={{
                                display: 'block',
                                marginBottom: '0.5rem',
                                fontWeight: '600',
                                color: '#1a2a2a',
                                fontSize: '0.95rem'
                            }}>
                                Teléfono *
                            </label>
                            <div style={{ position: 'relative' }}>
                                <Phone size={20} style={{
                                    position: 'absolute',
                                    left: '1rem',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    color: '#94a3b8'
                                }} />
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required
                                    placeholder="+56 9 1234 5678"
                                    style={{
                                        width: '100%',
                                        padding: '1rem 1rem 1rem 3rem',
                                        border: '2px solid #e2e8f0',
                                        borderRadius: '12px',
                                        fontSize: '1rem',
                                        transition: 'all 0.3s ease',
                                        outline: 'none'
                                    }}
                                    onFocus={(e) => e.target.style.borderColor = 'var(--primary)'}
                                    onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                                />
                            </div>
                        </div>

                        {/* Centro Médico */}
                        <div>
                            <label style={{
                                display: 'block',
                                marginBottom: '0.5rem',
                                fontWeight: '600',
                                color: '#1a2a2a',
                                fontSize: '0.95rem'
                            }}>
                                Nombre del Centro Médico *
                            </label>
                            <div style={{ position: 'relative' }}>
                                <Building2 size={20} style={{
                                    position: 'absolute',
                                    left: '1rem',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    color: '#94a3b8'
                                }} />
                                <input
                                    type="text"
                                    name="centerName"
                                    value={formData.centerName}
                                    onChange={handleChange}
                                    required
                                    placeholder="Centro Médico Ejemplo"
                                    style={{
                                        width: '100%',
                                        padding: '1rem 1rem 1rem 3rem',
                                        border: '2px solid #e2e8f0',
                                        borderRadius: '12px',
                                        fontSize: '1rem',
                                        transition: 'all 0.3s ease',
                                        outline: 'none'
                                    }}
                                    onFocus={(e) => e.target.style.borderColor = 'var(--primary)'}
                                    onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                                />
                            </div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            width: '100%',
                            marginTop: '2rem',
                            padding: '1.3rem',
                            background: loading ? '#94a3b8' : 'var(--gradient-primary)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '16px',
                            fontWeight: '800',
                            fontSize: '1.1rem',
                            cursor: loading ? 'not-allowed' : 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '10px',
                            boxShadow: loading ? 'none' : '0 10px 20px -5px rgba(0, 158, 157, 0.4)',
                            transition: 'all 0.3s ease'
                        }}
                    >
                        {loading ? (
                            <>Creando tu cuenta demo...</>
                        ) : (
                            <>
                                <Sparkles size={20} />
                                Crear Cuenta Demo Gratis
                            </>
                        )}
                    </button>

                    <p style={{
                        textAlign: 'center',
                        marginTop: '1.5rem',
                        fontSize: '0.85rem',
                        color: '#94a3b8'
                    }}>
                        Al registrarte, aceptas nuestros términos y condiciones
                    </p>
                </form>
            </div>
        </div>
    )
}

export default DemoRegistration
