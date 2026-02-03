import React, { useState } from 'react';
import { Mail, Lock, User, Briefcase, ChevronRight, Layout } from 'lucide-react';

const Login = ({ onLogin }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        onLogin(credentials);
    };

    return (
        <div style={styles.container}>
            {/* Background elements */}
            <div style={styles.bgBlob1} />
            <div style={styles.bgBlob2} />

            <div style={styles.loginCard} className="glass-panel animate-slide">
                <div style={styles.header}>
                    <div style={styles.logo}>
                        <Layout size={32} color="var(--primary)" />
                        <span style={styles.logoText}>Agenda<span style={{ color: 'var(--secondary)' }}>Plus</span></span>
                    </div>
                    <h2 style={styles.welcomeText}>{isLogin ? '¡Bienvenido de nuevo!' : 'Crea tu cuenta SaaS'}</h2>
                    <p style={styles.subText}>{isLogin ? 'Ingresa a tu panel de gestión médica' : 'Empieza a digitalizar tu consulta hoy'}</p>
                </div>

                <div style={styles.tabContainer}>
                    <button
                        style={{ ...styles.tab, borderBottom: isLogin ? '2px solid var(--primary)' : 'none', color: isLogin ? 'var(--primary)' : 'var(--text-muted)' }}
                        onClick={() => setIsLogin(true)}
                    >
                        Iniciar Sesión
                    </button>
                    <button
                        style={{ ...styles.tab, borderBottom: !isLogin ? '2px solid var(--primary)' : 'none', color: !isLogin ? 'var(--primary)' : 'var(--text-muted)' }}
                        onClick={() => setIsLogin(false)}
                    >
                        Registrar Centro
                    </button>
                </div>

                <form onSubmit={handleSubmit} style={styles.form}>
                    {!isLogin && (
                        <div style={styles.inputGroup}>
                            <label style={styles.label}>Nombre del Centro / Profesional</label>
                            <div style={styles.inputWrapper}>
                                <Briefcase size={20} style={styles.icon} />
                                <input type="text" placeholder="Centro Médico del Valle" style={styles.input} />
                            </div>
                        </div>
                    )}

                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Correo Electrónico</label>
                        <div style={styles.inputWrapper}>
                            <Mail size={20} style={styles.icon} />
                            <input
                                type="email"
                                value={credentials.email}
                                onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                                placeholder="tu@email.com"
                                style={styles.input}
                                required
                            />
                        </div>
                    </div>

                    <div style={styles.inputGroup}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <label style={styles.label}>Contraseña</label>
                            {isLogin && <a href="#" style={styles.forgotPass}>¿Olvidaste tu contraseña?</a>}
                        </div>
                        <div style={styles.inputWrapper}>
                            <Lock size={20} style={styles.icon} />
                            <input
                                type="password"
                                value={credentials.password}
                                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                                placeholder="••••••••"
                                style={styles.input}
                                required
                            />
                        </div>
                    </div>

                    <button type="submit" className="btn-primary" style={styles.submitBtn}>
                        {isLogin ? 'Entrar al Panel' : 'Crear mi Cuenta'}
                        <ChevronRight size={20} />
                    </button>
                </form>

                <div style={styles.footer}>
                    <p style={styles.footerText}>
                        Al ingresar, aceptas nuestros <a href="#">Términos de Servicio</a> y <a href="#">Política de Privacidad</a>.
                    </p>
                </div>
            </div>

            <div style={styles.statsPanel}>
                <div style={styles.statsCard} className="glass-panel">
                    <div style={styles.statsIcon}><User color="white" /></div>
                    <div>
                        <div style={styles.statsValue}>+500</div>
                        <div style={styles.statsLabel}>Centros Médicos activos</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const styles = {
    container: {
        height: '100vh',
        width: '100vw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#f1f5f9',
        position: 'relative',
        overflow: 'hidden'
    },
    bgBlob1: {
        position: 'absolute',
        top: '-10%',
        left: '-5%',
        width: '40vw',
        height: '40vw',
        background: 'radial-gradient(circle, rgba(0,73,117,0.1) 0%, rgba(255,255,255,0) 70%)',
        borderRadius: '50%',
        zIndex: 0
    },
    bgBlob2: {
        position: 'absolute',
        bottom: '-10%',
        right: '-5%',
        width: '30vw',
        height: '30vw',
        background: 'radial-gradient(circle, rgba(16,185,129,0.05) 0%, rgba(255,255,255,0) 70%)',
        borderRadius: '50%',
        zIndex: 0
    },
    loginCard: {
        width: '100%',
        maxWidth: '480px',
        padding: '40px',
        borderRadius: '24px',
        position: 'relative',
        zIndex: 1
    },
    header: {
        textAlign: 'center',
        marginBottom: '32px'
    },
    logo: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '12px',
        marginBottom: '20px'
    },
    logoText: {
        fontSize: '1.8rem',
        fontWeight: '900',
        color: 'var(--primary)'
    },
    welcomeText: {
        fontSize: '1.5rem',
        fontWeight: '800',
        color: '#1e293b',
        marginBottom: '8px'
    },
    subText: {
        color: '#64748b',
        fontSize: '0.95rem'
    },
    tabContainer: {
        display: 'flex',
        marginBottom: '32px',
        borderBottom: '1px solid #e2e8f0'
    },
    tab: {
        flex: 1,
        padding: '12px',
        background: 'none',
        border: 'none',
        fontWeight: '700',
        cursor: 'pointer',
        fontSize: '0.9rem'
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '24px'
    },
    inputGroup: {
        display: 'flex',
        flexDirection: 'column',
        gap: '8px'
    },
    label: {
        fontSize: '0.85rem',
        fontWeight: '700',
        color: '#475569'
    },
    inputWrapper: {
        position: 'relative',
        display: 'flex',
        alignItems: 'center'
    },
    icon: {
        position: 'absolute',
        left: '16px',
        color: '#94a3b8'
    },
    input: {
        width: '100%',
        padding: '14px 16px 14px 48px',
        borderRadius: '12px',
        border: '1.5px solid #e2e8f0',
        background: 'white',
        fontSize: '1rem',
        outline: 'none',
        transition: 'border-color 0.2s'
    },
    forgotPass: {
        fontSize: '0.8rem',
        color: 'var(--primary)',
        fontWeight: '600',
        textDecoration: 'none'
    },
    submitBtn: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        padding: '16px',
        marginTop: '8px'
    },
    footer: {
        marginTop: '32px',
        textAlign: 'center'
    },
    footerText: {
        fontSize: '0.8rem',
        color: '#94a3b8',
        lineHeight: '1.5'
    },
    statsPanel: {
        position: 'absolute',
        bottom: '40px',
        left: '40px',
        zIndex: 1
    },
    statsCard: {
        padding: '20px',
        borderRadius: '20px',
        display: 'flex',
        alignItems: 'center',
        gap: '16px'
    },
    statsIcon: {
        width: '40px',
        height: '40px',
        background: 'var(--primary)',
        borderRadius: '12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    statsValue: {
        fontWeight: '900',
        fontSize: '1.2rem',
        color: '#1e293b'
    },
    statsLabel: {
        fontSize: '0.75rem',
        color: '#64748b',
        fontWeight: '600'
    }
};

export default Login;
