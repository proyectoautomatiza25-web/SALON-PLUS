import React, { useState } from 'react';
import WhatsAppService from './services/whatsappService';
import EmailService from './services/emailService';

const IntegrationsConfig = ({ config, onUpdateConfig }) => {
    const [localConfig, setLocalConfig] = useState(config);
    const [testResult, setTestResult] = useState(null);

    const handleSave = () => {
        onUpdateConfig(localConfig);
        alert('Configuración guardada exitosamente');
    };

    const handleTestWhatsApp = async () => {
        const whatsappService = new WhatsAppService(localConfig);
        const result = await whatsappService.sendMessage(
            localConfig.whatsappNumber,
            '🧪 Mensaje de prueba desde Centro Médico Del Valle. Si recibes esto, la integración funciona correctamente!',
            'test'
        );
        setTestResult(result);
    };

    const handleTestEmail = async () => {
        const emailService = new EmailService(localConfig);
        const result = await emailService.sendEmail(
            localConfig.emailSender,
            'Test de Integración - Centro Médico Del Valle',
            '<h1>Prueba Exitosa</h1><p>Si recibes este correo, la integración está funcionando correctamente.</p>',
            'test'
        );
        setTestResult(result);
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Configuración de Integraciones</h1>
            <p style={styles.subtitle}>Conecta WhatsApp y Email para notificaciones automáticas</p>

            <div style={styles.grid}>
                {/* WhatsApp Configuration */}
                <div className="bento-card" style={styles.card}>
                    <div style={styles.cardHeader}>
                        <h2>💬 WhatsApp Business</h2>
                        <label style={styles.toggle}>
                            <input
                                type="checkbox"
                                checked={localConfig.whatsappEnabled}
                                onChange={(e) => setLocalConfig({ ...localConfig, whatsappEnabled: e.target.checked })}
                            />
                            <span style={styles.toggleSlider}></span>
                        </label>
                    </div>

                    <div style={styles.formGroup}>
                        <label style={styles.label}>Número de WhatsApp Business</label>
                        <input
                            type="text"
                            style={styles.input}
                            value={localConfig.whatsappNumber}
                            onChange={(e) => setLocalConfig({ ...localConfig, whatsappNumber: e.target.value })}
                            placeholder="+56912345678"
                        />
                    </div>

                    <div style={styles.formGroup}>
                        <label style={styles.label}>Twilio Account SID</label>
                        <input
                            type="text"
                            style={styles.input}
                            value={localConfig.twilioAccountSid || ''}
                            onChange={(e) => setLocalConfig({ ...localConfig, twilioAccountSid: e.target.value })}
                            placeholder="ACxxxxxxxxxxxxxxxxxxxxx"
                        />
                    </div>

                    <div style={styles.formGroup}>
                        <label style={styles.label}>Twilio Auth Token</label>
                        <input
                            type="password"
                            style={styles.input}
                            value={localConfig.twilioAuthToken || ''}
                            onChange={(e) => setLocalConfig({ ...localConfig, twilioAuthToken: e.target.value })}
                            placeholder="••••••••••••••••"
                        />
                    </div>

                    <button
                        className="btn-primary"
                        style={{ width: '100%', background: '#10b981' }}
                        onClick={handleTestWhatsApp}
                    >
                        Probar Conexión WhatsApp
                    </button>

                    <div style={styles.infoBox}>
                        <strong>📚 Cómo configurar:</strong>
                        <ol style={{ margin: '10px 0', paddingLeft: '20px', fontSize: '0.85rem' }}>
                            <li>Crea una cuenta en <a href="https://www.twilio.com" target="_blank">Twilio</a></li>
                            <li>Activa WhatsApp Business API</li>
                            <li>Copia tu Account SID y Auth Token</li>
                            <li>Pega las credenciales aquí y prueba</li>
                        </ol>
                    </div>
                </div>

                {/* Email Configuration */}
                <div className="bento-card" style={styles.card}>
                    <div style={styles.cardHeader}>
                        <h2>📧 Email (SMTP)</h2>
                        <label style={styles.toggle}>
                            <input
                                type="checkbox"
                                checked={localConfig.emailEnabled}
                                onChange={(e) => setLocalConfig({ ...localConfig, emailEnabled: e.target.checked })}
                            />
                            <span style={styles.toggleSlider}></span>
                        </label>
                    </div>

                    <div style={styles.formGroup}>
                        <label style={styles.label}>Email Remitente</label>
                        <input
                            type="email"
                            style={styles.input}
                            value={localConfig.emailSender}
                            onChange={(e) => setLocalConfig({ ...localConfig, emailSender: e.target.value })}
                            placeholder="notificaciones@cmdelvalle.cl"
                        />
                    </div>

                    <div style={styles.formGroup}>
                        <label style={styles.label}>Servidor SMTP</label>
                        <input
                            type="text"
                            style={styles.input}
                            value={localConfig.smtpHost || 'smtp.gmail.com'}
                            onChange={(e) => setLocalConfig({ ...localConfig, smtpHost: e.target.value })}
                            placeholder="smtp.gmail.com"
                        />
                    </div>

                    <div style={styles.formGroup}>
                        <label style={styles.label}>Puerto SMTP</label>
                        <input
                            type="number"
                            style={styles.input}
                            value={localConfig.smtpPort || 587}
                            onChange={(e) => setLocalConfig({ ...localConfig, smtpPort: e.target.value })}
                            placeholder="587"
                        />
                    </div>

                    <div style={styles.formGroup}>
                        <label style={styles.label}>Usuario SMTP</label>
                        <input
                            type="text"
                            style={styles.input}
                            value={localConfig.smtpUser || ''}
                            onChange={(e) => setLocalConfig({ ...localConfig, smtpUser: e.target.value })}
                            placeholder="tu-email@gmail.com"
                        />
                    </div>

                    <div style={styles.formGroup}>
                        <label style={styles.label}>Contraseña SMTP</label>
                        <input
                            type="password"
                            style={styles.input}
                            value={localConfig.smtpPass || ''}
                            onChange={(e) => setLocalConfig({ ...localConfig, smtpPass: e.target.value })}
                            placeholder="••••••••••••••••"
                        />
                    </div>

                    <button
                        className="btn-primary"
                        style={{ width: '100%', background: '#6366f1' }}
                        onClick={handleTestEmail}
                    >
                        Probar Conexión Email
                    </button>

                    <div style={styles.infoBox}>
                        <strong>📚 Proveedores recomendados:</strong>
                        <ul style={{ margin: '10px 0', paddingLeft: '20px', fontSize: '0.85rem' }}>
                            <li>Gmail (smtp.gmail.com:587)</li>
                            <li>SendGrid (smtp.sendgrid.net:587)</li>
                            <li>Mailgun (smtp.mailgun.org:587)</li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Test Result */}
            {testResult && (
                <div className="bento-card" style={{ ...styles.resultCard, borderLeft: testResult.success ? '5px solid #10b981' : '5px solid #f43f5e', marginTop: '30px' }}>
                    <h3>{testResult.success ? '✅ Prueba Exitosa' : '❌ Error en la Prueba'}</h3>
                    <pre style={styles.resultPre}>{JSON.stringify(testResult, null, 2)}</pre>
                </div>
            )}

            {/* Save Button */}
            <div style={{ display: 'flex', gap: '15px', marginTop: '30px' }}>
                <button
                    className="btn-primary"
                    style={{ flex: 1, padding: '15px', fontSize: '1.1rem' }}
                    onClick={handleSave}
                >
                    💾 Guardar Configuración
                </button>
            </div>
        </div>
    );
};

const styles = {
    container: { padding: '40px', maxWidth: '1200px', margin: '0 auto' },
    title: { fontSize: '2.5rem', fontWeight: '900', marginBottom: '10px', letterSpacing: '-1.5px' },
    subtitle: { color: '#64748b', marginBottom: '40px' },
    grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' },
    card: { padding: '30px' },
    cardHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', paddingBottom: '20px', borderBottom: '2px solid #f1f5f9' },
    formGroup: { marginBottom: '20px' },
    label: { display: 'block', fontWeight: '700', marginBottom: '8px', fontSize: '0.9rem', color: '#1e293b' },
    input: { width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '1rem', fontFamily: 'inherit' },
    toggle: { position: 'relative', display: 'inline-block', width: '60px', height: '30px' },
    toggleSlider: { position: 'absolute', cursor: 'pointer', top: 0, left: 0, right: 0, bottom: 0, background: '#cbd5e0', borderRadius: '30px', transition: '0.4s' },
    infoBox: { background: '#f8fafc', padding: '20px', borderRadius: '12px', marginTop: '20px', fontSize: '0.9rem', lineHeight: '1.6' },
    resultCard: { padding: '20px' },
    resultPre: { background: '#1e293b', color: '#10b981', padding: '15px', borderRadius: '8px', overflow: 'auto', fontSize: '0.85rem' }
};

export default IntegrationsConfig;
