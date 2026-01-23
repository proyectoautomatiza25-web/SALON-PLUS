import React, { useState } from 'react';
import { Mail, Send, Users, Calendar, CheckCircle, Clock, XCircle } from 'lucide-react';
import { useSaaSStore } from './store';

const CampaignsManager = () => {
    const { patients, campaigns, addCampaign, sendCampaign } = useSaaSStore();
    const [showNewCampaign, setShowNewCampaign] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        subject: '',
        message: '',
        type: 'email',
        recipients: 'all'
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const recipients = formData.recipients === 'all' ? patients : [];
        addCampaign({
            ...formData,
            recipients
        });
        setFormData({ name: '', subject: '', message: '', type: 'email', recipients: 'all' });
        setShowNewCampaign(false);
    };

    const getCampaignStatusColor = (status) => {
        switch (status) {
            case 'sent': return '#10b981';
            case 'draft': return '#f59e0b';
            case 'scheduled': return '#3b82f6';
            default: return '#94a3b8';
        }
    };

    const getCampaignStatusIcon = (status) => {
        switch (status) {
            case 'sent': return <CheckCircle size={16} />;
            case 'draft': return <Clock size={16} />;
            case 'scheduled': return <Calendar size={16} />;
            default: return <XCircle size={16} />;
        }
    };

    return (
        <div style={styles.container}>
            <header style={styles.header}>
                <div>
                    <h1 style={styles.title}>
                        <Mail size={32} style={{ marginRight: '15px' }} />
                        Campañas de Marketing
                    </h1>
                    <p style={styles.subtitle}>
                        Gestiona tus campañas de email y WhatsApp para mantener contacto con tus pacientes
                    </p>
                </div>
                <button
                    className="btn-primary"
                    style={{ background: 'var(--primary-gradient)', borderRadius: '14px' }}
                    onClick={() => setShowNewCampaign(!showNewCampaign)}
                >
                    {showNewCampaign ? 'Cancelar' : '✨ Nueva Campaña'}
                </button>
            </header>

            {/* New Campaign Form */}
            {showNewCampaign && (
                <div className="bento-card" style={styles.formCard}>
                    <h3 style={styles.formTitle}>Crear Nueva Campaña</h3>
                    <form onSubmit={handleSubmit} style={styles.form}>
                        <div style={styles.formRow}>
                            <div style={styles.formGroup}>
                                <label style={styles.label}>Nombre de la Campaña</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    placeholder="Ej: Recordatorio Navidad 2026"
                                    style={styles.input}
                                    required
                                />
                            </div>
                            <div style={styles.formGroup}>
                                <label style={styles.label}>Tipo de Campaña</label>
                                <select
                                    value={formData.type}
                                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                    style={styles.select}
                                >
                                    <option value="email">📧 Email</option>
                                    <option value="whatsapp">💬 WhatsApp</option>
                                </select>
                            </div>
                        </div>

                        {formData.type === 'email' && (
                            <div style={styles.formGroup}>
                                <label style={styles.label}>Asunto del Email</label>
                                <input
                                    type="text"
                                    value={formData.subject}
                                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                    placeholder="Asunto del correo"
                                    style={styles.input}
                                    required
                                />
                            </div>
                        )}

                        <div style={styles.formGroup}>
                            <label style={styles.label}>Mensaje</label>
                            <textarea
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                placeholder="Escribe tu mensaje aquí..."
                                style={styles.textarea}
                                rows={6}
                                required
                            />
                            <div style={styles.charCount}>
                                {formData.message.length} caracteres
                            </div>
                        </div>

                        <div style={styles.formGroup}>
                            <label style={styles.label}>Destinatarios</label>
                            <select
                                value={formData.recipients}
                                onChange={(e) => setFormData({ ...formData, recipients: e.target.value })}
                                style={styles.select}
                            >
                                <option value="all">Todos los pacientes ({patients.length})</option>
                                <option value="active">Solo pacientes activos</option>
                                <option value="custom">Selección personalizada</option>
                            </select>
                        </div>

                        <div style={styles.formActions}>
                            <button
                                type="button"
                                onClick={() => setShowNewCampaign(false)}
                                style={styles.btnSecondary}
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                className="btn-primary"
                                style={{ background: 'var(--primary-gradient)', borderRadius: '10px' }}
                            >
                                Crear Campaña
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Campaigns List */}
            <div style={styles.campaignsList}>
                <h3 style={styles.sectionTitle}>Campañas Creadas ({campaigns.length})</h3>

                {campaigns.length === 0 ? (
                    <div className="bento-card" style={styles.emptyState}>
                        <Mail size={64} color="#cbd5e1" />
                        <h3 style={{ color: '#64748b', marginTop: '20px' }}>No hay campañas creadas</h3>
                        <p style={{ color: '#94a3b8', marginTop: '10px' }}>
                            Crea tu primera campaña para comenzar a comunicarte con tus pacientes
                        </p>
                    </div>
                ) : (
                    <div style={styles.campaignsGrid}>
                        {campaigns.map((campaign) => (
                            <div key={campaign.id} className="bento-card" style={styles.campaignCard}>
                                <div style={styles.campaignHeader}>
                                    <div style={styles.campaignType}>
                                        {campaign.type === 'email' ? '📧' : '💬'} {campaign.type.toUpperCase()}
                                    </div>
                                    <div style={{
                                        ...styles.campaignStatus,
                                        background: getCampaignStatusColor(campaign.status) + '20',
                                        color: getCampaignStatusColor(campaign.status)
                                    }}>
                                        {getCampaignStatusIcon(campaign.status)}
                                        <span style={{ marginLeft: '5px' }}>
                                            {campaign.status === 'sent' ? 'Enviada' :
                                                campaign.status === 'draft' ? 'Borrador' :
                                                    'Programada'}
                                        </span>
                                    </div>
                                </div>

                                <h4 style={styles.campaignName}>{campaign.name}</h4>
                                {campaign.subject && (
                                    <p style={styles.campaignSubject}>
                                        <strong>Asunto:</strong> {campaign.subject}
                                    </p>
                                )}
                                <p style={styles.campaignMessage}>
                                    {campaign.message.substring(0, 100)}
                                    {campaign.message.length > 100 && '...'}
                                </p>

                                <div style={styles.campaignFooter}>
                                    <div style={styles.campaignInfo}>
                                        <Users size={14} />
                                        <span>{campaign.recipients?.length || patients.length} destinatarios</span>
                                    </div>
                                    <div style={styles.campaignInfo}>
                                        <Calendar size={14} />
                                        <span>{new Date(campaign.createdAt).toLocaleDateString('es-CL')}</span>
                                    </div>
                                </div>

                                {campaign.status === 'draft' && (
                                    <button
                                        onClick={() => sendCampaign(campaign.id)}
                                        style={styles.btnSend}
                                    >
                                        <Send size={16} />
                                        Enviar Ahora
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <style>{`
                .bento-card {
                    background: white;
                    border-radius: 20px;
                    box-shadow: 0 1px 3px rgba(0,0,0,0.05);
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                }
                .bento-card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 20px 40px rgba(0,0,0,0.1);
                }
                .btn-primary {
                    padding: 12px 24px;
                    border: none;
                    font-weight: 700;
                    cursor: pointer;
                    transition: all 0.3s;
                    color: white;
                }
                .btn-primary:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 10px 30px rgba(0,0,0,0.2);
                }
            `}</style>
        </div>
    );
};

const styles = {
    container: {
        padding: '40px',
        background: 'var(--bg-app)',
        minHeight: 'calc(100vh - 80px)'
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: '40px',
        flexWrap: 'wrap',
        gap: '20px'
    },
    title: {
        fontSize: '2.5rem',
        fontWeight: '900',
        background: 'var(--primary-gradient)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        display: 'flex',
        alignItems: 'center',
        marginBottom: '10px'
    },
    subtitle: {
        color: '#64748b',
        fontSize: '1rem'
    },
    formCard: {
        padding: '30px',
        marginBottom: '40px'
    },
    formTitle: {
        fontSize: '1.5rem',
        fontWeight: '800',
        color: '#1e293b',
        marginBottom: '25px'
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px'
    },
    formRow: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '20px'
    },
    formGroup: {
        display: 'flex',
        flexDirection: 'column',
        gap: '8px'
    },
    label: {
        fontSize: '0.9rem',
        fontWeight: '700',
        color: '#475569'
    },
    input: {
        padding: '12px 16px',
        borderRadius: '10px',
        border: '1px solid #e2e8f0',
        fontSize: '0.95rem',
        fontWeight: '600',
        outline: 'none',
        transition: 'all 0.2s'
    },
    select: {
        padding: '12px 16px',
        borderRadius: '10px',
        border: '1px solid #e2e8f0',
        fontSize: '0.95rem',
        fontWeight: '600',
        outline: 'none',
        cursor: 'pointer'
    },
    textarea: {
        padding: '12px 16px',
        borderRadius: '10px',
        border: '1px solid #e2e8f0',
        fontSize: '0.95rem',
        fontWeight: '500',
        outline: 'none',
        resize: 'vertical',
        fontFamily: 'inherit'
    },
    charCount: {
        fontSize: '0.75rem',
        color: '#94a3b8',
        textAlign: 'right'
    },
    formActions: {
        display: 'flex',
        gap: '15px',
        justifyContent: 'flex-end',
        marginTop: '10px'
    },
    btnSecondary: {
        padding: '12px 24px',
        borderRadius: '10px',
        border: '1px solid #e2e8f0',
        background: 'white',
        fontWeight: '700',
        cursor: 'pointer',
        transition: 'all 0.2s'
    },
    campaignsList: {
        marginTop: '40px'
    },
    sectionTitle: {
        fontSize: '1.3rem',
        fontWeight: '800',
        color: '#1e293b',
        marginBottom: '20px'
    },
    emptyState: {
        padding: '80px 40px',
        textAlign: 'center'
    },
    campaignsGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
        gap: '25px'
    },
    campaignCard: {
        padding: '25px',
        display: 'flex',
        flexDirection: 'column',
        gap: '15px'
    },
    campaignHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    campaignType: {
        fontSize: '0.75rem',
        fontWeight: '800',
        color: '#64748b',
        padding: '6px 12px',
        background: '#f1f5f9',
        borderRadius: '8px'
    },
    campaignStatus: {
        display: 'flex',
        alignItems: 'center',
        fontSize: '0.75rem',
        fontWeight: '700',
        padding: '6px 12px',
        borderRadius: '8px'
    },
    campaignName: {
        fontSize: '1.2rem',
        fontWeight: '800',
        color: '#1e293b'
    },
    campaignSubject: {
        fontSize: '0.85rem',
        color: '#475569'
    },
    campaignMessage: {
        fontSize: '0.85rem',
        color: '#64748b',
        lineHeight: '1.6'
    },
    campaignFooter: {
        display: 'flex',
        gap: '20px',
        paddingTop: '15px',
        borderTop: '1px solid #f1f5f9'
    },
    campaignInfo: {
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        fontSize: '0.75rem',
        color: '#94a3b8'
    },
    btnSend: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        padding: '12px',
        background: '#10b981',
        color: 'white',
        border: 'none',
        borderRadius: '10px',
        fontWeight: '700',
        cursor: 'pointer',
        transition: 'all 0.2s',
        marginTop: '10px'
    }
};

export default CampaignsManager;
