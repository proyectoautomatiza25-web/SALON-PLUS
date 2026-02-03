import React, { useState } from 'react';
import {
    Settings, MessageSquare, Mail, Bell, Shield,
    CreditCard, Globe, Save, RefreshCcw, CheckCircle2,
    Database, Download, Upload, Trash2
} from 'lucide-react';
import { useSaaSStore } from './store';

const Config = ({ currentProfId }) => {
    const { config, setConfig, bulkImportPatients } = useSaaSStore();
    const [activeTab, setActiveTab] = useState('general');
    const [saved, setSaved] = useState(false);
    const [importing, setImporting] = useState(false);
    const [importResult, setImportResult] = useState(null);

    const handleSave = () => {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
    };

    const handleMockImport = () => {
        setImporting(true);
        // Simulating heavy data processing
        setTimeout(() => {
            const mockPatients = [
                {
                    name: "Maria González", rut: "15.678.901-2", email: "maria.g@mail.com", phone: "+56966554433", prevision: "Isapre Colmena", category: "Frecuente",
                    history: [{ date: "2025-11-12", doctor: "Reservo Import", reason: "Migración Masiva", observation: "Paciente migrada de Reservo con historial completo." }]
                },
                {
                    name: "Carlos Ruiz", rut: "18.123.456-7", email: "carlos.r@mail.com", phone: "+56999887766", prevision: "Fonasa", category: "Crónico",
                    history: [{ date: "2025-10-05", doctor: "Reservo Import", reason: "Antigüedad Clinica", observation: "Control de hipertensión migrado." }]
                },
                {
                    name: "Ana Morales", rut: "20.987.654-3", email: "ana.m@mail.com", phone: "+56977889900", prevision: "Fonasa", category: "General",
                    history: []
                }
            ];
            const count = bulkImportPatients(mockPatients, currentProfId);
            setImporting(false);
            setImportResult(`${count} pacientes importados con éxito para tu perfil profesional.`);
        }, 2000);
    };

    const tabs = [
        { id: 'general', label: 'General', icon: Settings },
        { id: 'notifications', label: 'Notificaciones', icon: Bell },
        { id: 'payments', label: 'Pagos y Facturación', icon: CreditCard },
        { id: 'migration', label: 'Migración y Datos', icon: Database },
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

                        {activeTab === 'migration' && (
                            <div style={styles.formSection}>
                                <h3 style={styles.sectionTitle}>Importación Masiva desde Reservo / Otros</h3>
                                <div style={styles.importBox}>
                                    <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                                        <div style={{ ...styles.iconBadge, background: '#e0f2fe', color: '#0369a1' }}>
                                            <Upload size={32} />
                                        </div>
                                        <div style={{ flex: 1 }}>
                                            <h4 style={{ fontWeight: '800', marginBottom: '8px' }}>Cargar Archivo de Migración</h4>
                                            <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '20px' }}>
                                                Agenda Plus detecta automáticamente el formato de Reservo, Medilink o Agendapro. Solo arrastra tu archivo JSON o Excel aquí.
                                            </p>
                                            <div style={styles.dropZone} onClick={() => document.getElementById('file-upload').click()}>
                                                <Database size={24} style={{ marginBottom: '10px', opacity: 0.3 }} />
                                                <p style={{ fontSize: '0.85rem', fontWeight: '700' }}>Arrastra tu base de datos aquí</p>
                                                <p style={{ fontSize: '0.7rem', color: '#94a3b8' }}>o haz clic para seleccionar archivo</p>
                                                <input
                                                    id="file-upload"
                                                    type="file"
                                                    style={{ display: 'none' }}
                                                    onChange={(e) => alert(`Archivo "${e.target.files[0].name}" detectado. Listo para migración.`)}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div style={{ marginTop: '30px', borderTop: '1px solid #f1f5f9', paddingTop: '20px' }}>
                                        <h4 style={{ fontWeight: '800', marginBottom: '15px' }}>Opciones de Transferencia</h4>
                                        <div style={styles.toggleRow}>
                                            <div>
                                                <h4 style={styles.toggleLabel}>Sincronizar Historial Clínico</h4>
                                                <p style={styles.toggleDesc}>Incluir todas las evoluciones previas en la nueva ficha.</p>
                                            </div>
                                            <input type="checkbox" defaultChecked />
                                        </div>
                                        <div style={styles.toggleRow}>
                                            <div>
                                                <h4 style={styles.toggleLabel}>Importar Pagos Pendientes</h4>
                                                <p style={styles.toggleDesc}>Cargar deudas actuales para cobro inmediato.</p>
                                            </div>
                                            <input type="checkbox" defaultChecked />
                                        </div>

                                        <div style={{ marginTop: '30px' }}>
                                            <button
                                                className="btn-primary"
                                                onClick={handleMockImport}
                                                disabled={importing}
                                                style={{
                                                    width: '100%',
                                                    justifyContent: 'center',
                                                    padding: '25px',
                                                    fontSize: '1.1rem',
                                                    background: importing ? '#94a3b8' : 'var(--primary-gradient)',
                                                    boxShadow: '0 15px 30px rgba(0,73,117,0.2)'
                                                }}
                                            >
                                                {importing ? <RefreshCcw size={20} className="animate-spin" /> : <Download size={20} />}
                                                <span>{importing ? 'Sincronizando con Servidores...' : 'CARGAR Y PROCESAR BASE DE DATOS'}</span>
                                            </button>
                                            {importResult && (
                                                <div style={{ marginTop: '15px', padding: '20px', background: '#dcfce7', color: '#166534', borderRadius: '12px', fontSize: '1rem', fontWeight: '800', textAlign: 'center', border: '2px solid #bbf7d0' }}>
                                                    {importResult}
                                                </div>
                                            )}
                                        </div>
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
    toggleDesc: { fontSize: '0.85rem', color: '#94a3b8', fontWeight: '600' },
    importBox: { padding: '20px', borderRadius: '20px', border: '1.5px dashed #e2e8f0', background: '#f8fafc' },
    iconBadge: { width: '64px', height: '64px', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' },
    dropZone: { border: '2px dashed #cbd5e1', borderRadius: '16px', padding: '30px', textAlign: 'center', cursor: 'pointer', transition: 'all 0.2s', background: '#fff' }
};

export default Config;
