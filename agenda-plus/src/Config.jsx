import React, { useState } from 'react';
import {
    Settings, MessageSquare, Mail, Bell, Shield,
    CreditCard, Globe, Save, RefreshCcw, CheckCircle2
} from 'lucide-react';
import { useSaaSStore } from './store';

const Config = () => {
    const { config, setConfig } = useSaaSStore();
    const [activeTab, setActiveTab] = useState('general');
    const [saved, setSaved] = useState(false);

    const handleSave = () => {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
    };

    const tabs = [
        { id: 'general', label: 'General', icon: Settings },
        { id: 'notifications', label: 'Notificaciones', icon: Bell },
        { id: 'payments', label: 'Pagos y Facturación', icon: CreditCard },
        { id: 'security', label: 'Seguridad', icon: Shield }
    ];

    return (
        <div style={{ padding: '40px' }}>
            <header style={styles.header}>
                <div>
                    <h1 style={{ fontSize: '2rem', fontWeight: '900', color: 'var(--primary)' }}>Configuración del Sistema</h1>
                    <p style={{ color: '#64748b', fontWeight: '600' }}>Personaliza tu plataforma Agenda Plus para que se adapte a tu flujo de trabajo.</p>
                </div>
                <button className="btn-primary" onClick={handleSave} style={{ minWidth: '150px' }}>
                    {saved ? <CheckCircle2 size={20} /> : <Save size={20} />}
                    <span>{saved ? 'Guardado' : 'Guardar Cambios'}</span>
                </button>
            </header>

            <div style={styles.configLayout}>
                <aside style={styles.tabsCol}>
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            style={{
                                ...styles.tabBtn,
                                background: activeTab === tab.id ? '#fff' : 'transparent',
                                borderLeft: activeTab === tab.id ? '4px solid var(--primary)' : '4px solid transparent',
                                color: activeTab === tab.id ? 'var(--primary)' : '#94a3b8'
                            }}
                        >
                            <tab.icon size={20} />
                            <span>{tab.label}</span>
                        </button>
                    ))}
                </aside>

                <main style={styles.contentCol}>
                    <div className="glass-panel animate-slide" style={styles.contentCard}>
                        {activeTab === 'general' && (
                            <div style={styles.formSection}>
                                <h3 style={styles.sectionTitle}>Ajustes Generales de la Clínica</h3>
                                <div style={styles.inputGroup}>
                                    <label>Nombre del Centro Médico</label>
                                    <input type="text" defaultValue="Centro Médico Del Valle" style={styles.input} />
                                </div>
                                <div style={styles.inputGroup}>
                                    <label>Dirección Principal</label>
                                    <input type="text" defaultValue="Av. Principal 123, Providencia" style={styles.input} />
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                                    <div style={styles.inputGroup}>
                                        <label>Email de Contacto</label>
                                        <input type="email" defaultValue="contacto@cmdelvalle.cl" style={styles.input} />
                                    </div>
                                    <div style={styles.inputGroup}>
                                        <label>Teléfono Oficial</label>
                                        <input type="text" defaultValue="+56 9 1234 5678" style={styles.input} />
                                    </div>
                                </div>
                                <div style={styles.inputGroup}>
                                    <label>Sitio Web</label>
                                    <input type="text" defaultValue="https://cmdelvalle.cl" style={styles.input} />
                                </div>
                                <div style={styles.inputGroup}>
                                    <label>Moneda del Sistema</label>
                                    <select style={styles.input}>
                                        <option>CLP - Peso Chileno</option>
                                        <option>USD - Dólar Americano</option>
                                        <option>EUR - Euro</option>
                                    </select>
                                </div>
                            </div>
                        )}

                        {activeTab === 'notifications' && (
                            <div style={styles.formSection}>
                                <h3 style={styles.sectionTitle}>Configuración de Notificaciones (Reservo Pro Style)</h3>
                                <div style={styles.toggleRow}>
                                    <div>
                                        <h4 style={styles.toggleLabel}>Recordatorios por WhatsApp</h4>
                                        <p style={styles.toggleDesc}>Envío automático 24h antes de la cita.</p>
                                    </div>
                                    <input type="checkbox" defaultChecked />
                                </div>
                                <div style={styles.toggleRow}>
                                    <div>
                                        <h4 style={styles.toggleLabel}>Confirmación por Email</h4>
                                        <p style={styles.toggleDesc}>Enviar email de confirmación al reservar.</p>
                                    </div>
                                    <input type="checkbox" defaultChecked />
                                </div>
                                <div style={styles.toggleRow}>
                                    <div>
                                        <h4 style={styles.toggleLabel}>Notificaciones para el Staff</h4>
                                        <p style={styles.toggleDesc}>Avisar al profesional cuando reserven con él.</p>
                                    </div>
                                    <input type="checkbox" />
                                </div>

                                <div style={{ ...styles.inputGroup, marginTop: '30px' }}>
                                    <label>Mensaje Predeterminado WhatsApp (Citas)</label>
                                    <textarea
                                        rows={4}
                                        style={styles.input}
                                        defaultValue="Hola {paciente}, recordamos tu cita para mañana a las {hora} con el/la {doctor} en Centro Médico Del Valle. Favor confirmar asistencia aquí: {link}"
                                    />
                                </div>
                            </div>
                        )}

                        {activeTab === 'payments' && (
                            <div style={styles.formSection}>
                                <h3 style={styles.sectionTitle}>Plataformas de Pago e Impuestos</h3>
                                <div style={styles.toggleRow}>
                                    <div>
                                        <h4 style={styles.toggleLabel}>Webpay Plus (Simulado)</h4>
                                        <p style={styles.toggleDesc}>Habilitar pagos con tarjetas al agendar online.</p>
                                    </div>
                                    <input type="checkbox" />
                                </div>
                                <div style={styles.toggleRow}>
                                    <div>
                                        <h4 style={styles.toggleLabel}>Integración Boleta Electrónica</h4>
                                        <p style={styles.toggleDesc}>Generar boletas automáticamente con SII.</p>
                                    </div>
                                    <input type="checkbox" />
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '30px' }}>
                                    <div style={styles.inputGroup}>
                                        <label>IVA (%)</label>
                                        <input type="number" defaultValue="19" style={styles.input} />
                                    </div>
                                    <div style={styles.inputGroup}>
                                        <label>Retención Honorarios (%)</label>
                                        <input type="number" defaultValue="13.75" style={styles.input} />
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'security' && (
                            <div style={styles.formSection}>
                                <h3 style={styles.sectionTitle}>Privacidad e HIPAA Compliance</h3>
                                <div style={styles.toggleRow}>
                                    <div>
                                        <h4 style={styles.toggleLabel}>Doble Factor de Autenticación (2FA)</h4>
                                        <p style={styles.toggleDesc}>Aumenta la seguridad del acceso de los doctores.</p>
                                    </div>
                                    <button className="btn-primary" style={{ background: '#f8fafc', color: 'var(--primary)', border: '1px solid #e2e8f0' }}>Configurar</button>
                                </div>
                                <div style={styles.toggleRow}>
                                    <div>
                                        <h4 style={styles.toggleLabel}>Auditoría de Acceso</h4>
                                        <p style={styles.toggleDesc}>Registra quién y cuándo vio cada ficha médica.</p>
                                    </div>
                                    <input type="checkbox" defaultChecked />
                                </div>
                                <div style={{ marginTop: '30px', padding: '20px', background: '#fff5f5', borderRadius: '12px', border: '1px solid #fed7d7' }}>
                                    <h4 style={{ color: '#c53030', marginBottom: '10px' }}>Zona de Peligro</h4>
                                    <p style={{ fontSize: '0.85rem', color: '#7b3434', marginBottom: '15px' }}>Eliminar todos los datos de la cuenta permanentemente.</p>
                                    <button style={{ background: '#c53030', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '8px', fontWeight: '800', cursor: 'pointer' }}>
                                        Eliminar Organización
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
};

const styles = {
    header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' },
    configLayout: { display: 'grid', gridTemplateColumns: '280px 1fr', gap: '40px' },
    tabsCol: { display: 'flex', flexDirection: 'column', gap: '10px' },
    tabBtn: {
        display: 'flex',
        alignItems: 'center',
        gap: '15px',
        padding: '15px 20px',
        borderRadius: '16px',
        border: 'none',
        cursor: 'pointer',
        fontSize: '1rem',
        fontWeight: '700',
        textAlign: 'left',
        transition: 'all 0.2s'
    },
    contentCol: {},
    contentCard: { padding: '40px', background: '#fff' },
    formSection: { display: 'flex', flexDirection: 'column', gap: '25px' },
    sectionTitle: { fontSize: '1.2rem', fontWeight: '900', color: '#1e293b', marginBottom: '10px' },
    inputGroup: { display: 'flex', flexDirection: 'column', gap: '8px' },
    label: { fontSize: '0.9rem', fontWeight: '800', color: '#64748b' },
    input: { padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #e2e8f0', fontSize: '1rem', outline: 'none', transition: 'all 0.2s', ':focus': { borderColor: 'var(--primary)', boxShadow: '0 0 0 4px rgba(0,73,117,0.1)' } },
    toggleRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '20px', borderBottom: '1px solid #f1f5f9' },
    toggleLabel: { fontSize: '1rem', fontWeight: '800', color: '#1e293b' },
    toggleDesc: { fontSize: '0.85rem', color: '#94a3b8', fontWeight: '600' }
};

export default Config;
