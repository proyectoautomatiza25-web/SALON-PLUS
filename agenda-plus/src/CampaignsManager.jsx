import React, { useState } from 'react';
import { Mail, Send, Users, Calendar, CheckCircle, Clock } from 'lucide-react';
import { useSaaSStore } from './store';

const CampaignsManager = () => {
    const { patients, campaigns, addCampaign, sendCampaign } = useSaaSStore();
    const [showNew, setShowNew] = useState(false);
    const [form, setForm] = useState({ name: '', subject: '', message: '', type: 'email' });

    const handleSubmit = (e) => {
        e.preventDefault();
        addCampaign(form);
        setForm({ name: '', subject: '', message: '', type: 'email' });
        setShowNew(false);
    };

    return (
        <div style={{ padding: '40px' }}>
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
                <h1 style={{ fontSize: '2rem', fontWeight: '900', color: 'var(--primary)' }}>Marketing & Campañas</h1>
                <button
                    className="btn-primary"
                    style={{ background: showNew ? '#ef4444' : 'var(--primary-gradient)' }}
                    onClick={() => setShowNew(!showNew)}
                >
                    {showNew ? 'Cancelar' : '✨ Nueva Campaña'}
                </button>
            </header>

            {showNew && (
                <div className="bento-card animate-slide" style={{ padding: '30px', marginBottom: '40px' }}>
                    <form onSubmit={handleSubmit} style={styles.form}>
                        <div style={styles.row}>
                            <div style={styles.group}>
                                <label style={styles.label}>Nombre de Campaña</label>
                                <input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Ej: Promo Verano" style={styles.input} required />
                            </div>
                            <div style={styles.group}>
                                <label style={styles.label}>Tipo</label>
                                <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })} style={styles.input}>
                                    <option value="email">📧 Email</option>
                                    <option value="whatsapp">💬 WhatsApp</option>
                                </select>
                            </div>
                        </div>
                        {form.type === 'email' && (
                            <div style={styles.group}>
                                <label style={styles.label}>Asunto</label>
                                <input type="text" value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })} style={styles.input} required />
                            </div>
                        )}
                        <div style={styles.group}>
                            <label style={styles.label}>Mensaje</label>
                            <textarea value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} style={styles.textarea} rows={5} required />
                        </div>
                        <button type="submit" className="btn-primary" style={{ width: '100%' }}>Crear Campaña</button>
                    </form>
                </div>
            )}

            <div style={styles.grid}>
                {campaigns.length === 0 ? (
                    <div style={styles.empty}>
                        <Mail size={48} color="#cbd5e1" />
                        <p style={{ color: '#94a3b8', marginTop: '15px', fontWeight: '600' }}>No hay campañas activas</p>
                    </div>
                ) : (
                    campaigns.map(c => (
                        <div key={c.id} className="bento-card" style={styles.card}>
                            <div style={styles.cardHeader}>
                                <span style={styles.badge}>{c.type.toUpperCase()}</span>
                                <span style={{ ...styles.badge, background: c.status === 'sent' ? '#d1fae5' : '#fef3c7', color: c.status === 'sent' ? '#065f46' : '#92400e' }}>
                                    {c.status === 'sent' ? <CheckCircle size={12} /> : <Clock size={12} />}
                                    <span style={{ marginLeft: '5px' }}>{c.status === 'sent' ? 'Enviada' : 'Borrador'}</span>
                                </span>
                            </div>
                            <h3 style={styles.cardTitle}>{c.name}</h3>
                            <p style={styles.cardText}>{c.message.substring(0, 100)}...</p>
                            <div style={styles.cardFooter}>
                                <div style={styles.stat}><Users size={14} /> <span>{patients.length} pacientes</span></div>
                                {c.status === 'draft' && (
                                    <button onClick={() => sendCampaign(c.id)} style={styles.sendBtn}><Send size={16} /> Enviar</button>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

const styles = {
    form: { display: 'flex', flexDirection: 'column', gap: '20px' },
    row: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' },
    group: { display: 'flex', flexDirection: 'column', gap: '8px' },
    label: { fontSize: '0.85rem', fontWeight: '700', color: '#475569' },
    input: { padding: '12px', borderRadius: '10px', border: '1.5px solid #e2e8f0', fontSize: '0.9rem', outline: 'none' },
    textarea: { padding: '12px', borderRadius: '10px', border: '1.5px solid #e2e8f0', fontSize: '0.9rem', outline: 'none', resize: 'vertical' },
    grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '25px' },
    card: { padding: '25px', display: 'flex', flexDirection: 'column', gap: '15px' },
    cardHeader: { display: 'flex', justifyContent: 'space-between' },
    badge: { fontSize: '0.7rem', fontWeight: '800', padding: '5px 10px', borderRadius: '8px', background: '#f1f5f9', color: '#64748b', display: 'flex', alignItems: 'center' },
    cardTitle: { fontSize: '1.2rem', fontWeight: '800' },
    cardText: { fontSize: '0.85rem', color: '#64748b', lineHeight: '1.6' },
    cardFooter: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '15px', borderTop: '1px solid #f1f5f9' },
    stat: { fontSize: '0.75rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '5px' },
    sendBtn: { border: 'none', background: '#10b981', color: '#fff', padding: '8px 15px', borderRadius: '8px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' },
    empty: { padding: '60px', textAlign: 'center', gridColumn: '1/-1' }
};

export default CampaignsManager;
