import React, { useState } from 'react';
import {
    Users, Plus, Mail, Phone, Clock, DollarSign,
    Settings, Trash2, Edit2, Shield, Calendar, Save
} from 'lucide-react';
import { useSaaSStore } from './store';

const Professionals = () => {
    const { professionals } = useSaaSStore();
    const [selectedProf, setSelectedProf] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const days = [
        { id: 'monday', label: 'Lunes' },
        { id: 'tuesday', label: 'Martes' },
        { id: 'wednesday', label: 'Miércoles' },
        { id: 'thursday', label: 'Jueves' },
        { id: 'friday', label: 'Viernes' },
        { id: 'saturday', label: 'Sábado' },
        { id: 'sunday', label: 'Domingo' }
    ];

    return (
        <div style={{ padding: '40px' }}>
            <header style={styles.header}>
                <div>
                    <h1 style={{ fontSize: '2rem', fontWeight: '900', color: 'var(--primary)' }}>Staff de Profesionales</h1>
                    <p style={{ color: '#64748b', fontWeight: '600' }}>Gestiona los miembros de tu equipo, horarios y comisiones.</p>
                </div>
                <button className="btn-primary" onClick={() => setShowModal(true)}>
                    <Plus size={20} />
                    <span>Nuevo Profesional</span>
                </button>
            </header>

            <div style={styles.grid}>
                {(professionals || []).map(prof => (
                    <div key={prof?.id} className="bento-card" style={styles.profCard}>
                        <div style={{ ...styles.colorBar, background: prof?.color || '#004975' }} />
                        <div style={styles.cardContent}>
                            <div style={styles.avatarRow}>
                                <div style={styles.avatar}>{prof?.name?.charAt(0) || '?'}</div>
                                <div style={styles.info}>
                                    <h3 style={styles.name}>{prof?.name || 'Profesional'}</h3>
                                    <span style={styles.role}>{prof?.role || 'Médico'}</span>
                                </div>
                                <button style={styles.editBtn} onClick={() => setSelectedProf(prof)}>
                                    <Settings size={18} color="#94a3b8" />
                                </button>
                            </div>

                            <div style={styles.statsRow}>
                                <div style={styles.stat}>
                                    <span style={styles.statLabel}>Comisión</span>
                                    <span style={styles.statValue}>{prof?.commission || 0}%</span>
                                </div>
                                <div style={styles.stat}>
                                    <span style={styles.statLabel}>Valor Consulta</span>
                                    <span style={styles.statValue}>${(prof?.consultationPrice || 0).toLocaleString()}</span>
                                </div>
                            </div>

                            <div style={styles.contactRow}>
                                <div style={styles.contactItem}><Mail size={14} /> {prof?.email || 'N/A'}</div>
                                <div style={styles.contactItem}><Phone size={14} /> {prof?.phone || 'N/A'}</div>
                            </div>

                            <div style={styles.schedulePreview}>
                                <h4 style={{ fontSize: '0.8rem', fontWeight: '800', marginBottom: '10px' }}>Horario Activo</h4>
                                <div style={styles.daysList}>
                                    {days.map(day => (
                                        <div
                                            key={day.id}
                                            style={{
                                                ...styles.dayBadge,
                                                background: prof?.schedule?.[day.id]?.enabled ? 'var(--primary-gradient)' : '#f1f5f9',
                                                color: prof?.schedule?.[day.id]?.enabled ? '#fff' : '#94a3b8'
                                            }}
                                        >
                                            {day.label.charAt(0)}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <button className="btn-primary" style={{ width: '100%', marginTop: '20px', background: '#fff', color: 'var(--primary)', border: '1.5px solid var(--primary)' }}>
                                <Calendar size={16} /> Ver Agenda Staff
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* EDIT MODAL (Simplified for now) */}
            {selectedProf && (
                <div style={styles.modalOverlay}>
                    <div className="glass-panel animate-slide" style={styles.modal}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '25px' }}>
                            <h2>Configurar Perfil: {selectedProf.name}</h2>
                            <button onClick={() => setSelectedProf(null)} style={{ border: 'none', background: 'none', cursor: 'pointer', fontSize: '1.5rem' }}>✕</button>
                        </div>

                        <div style={styles.formGrid}>
                            <div style={styles.inputGroup}>
                                <label>Porcentaje de Comisión (%)</label>
                                <input type="number" defaultValue={selectedProf.commission} style={styles.input} />
                            </div>
                            <div style={styles.inputGroup}>
                                <label>Precio Consulta Sugerido</label>
                                <input type="number" defaultValue={selectedProf.consultationPrice} style={styles.input} />
                            </div>
                        </div>

                        <h3 style={{ marginTop: '30px', marginBottom: '15px' }}>Disponibilidad</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            {days.map(day => (
                                <div key={day.id} style={styles.scheduleRow}>
                                    <div style={{ width: '100px', fontWeight: '700' }}>{day.label}</div>
                                    <input type="checkbox" defaultChecked={selectedProf.schedule[day.id]?.enabled} />
                                    <input type="time" defaultValue={selectedProf.schedule[day.id]?.start || '09:00'} style={styles.timeInput} />
                                    <span>a</span>
                                    <input type="time" defaultValue={selectedProf.schedule[day.id]?.end || '18:00'} style={styles.timeInput} />
                                </div>
                            ))}
                        </div>

                        <div style={{ marginTop: '40px', display: 'flex', gap: '15px' }}>
                            <button onClick={() => setSelectedProf(null)} style={styles.cancelBtn}>Cancelar</button>
                            <button className="btn-primary" style={{ flex: 1 }}>
                                <Save size={18} /> Guardar Cambios
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const styles = {
    header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' },
    grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', gap: '30px' },
    profCard: { padding: '0', overflow: 'hidden', position: 'relative' },
    colorBar: { height: '6px', width: '100%' },
    cardContent: { padding: '25px' },
    avatarRow: { display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '25px' },
    avatar: { width: '50px', height: '50px', borderRadius: '14px', background: 'var(--primary-gradient)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: '900' },
    info: { flex: 1 },
    name: { fontSize: '1.2rem', fontWeight: '900', color: '#1e293b' },
    role: { fontSize: '0.85rem', color: '#64748b', fontWeight: '600' },
    editBtn: { background: 'none', border: 'none', padding: '10px', cursor: 'pointer' },
    statsRow: { display: 'flex', gap: '30px', marginBottom: '25px', padding: '15px', background: '#f8fafc', borderRadius: '12px' },
    stat: { display: 'flex', flexDirection: 'column', gap: '4px' },
    statLabel: { fontSize: '0.75rem', color: '#94a3b8', fontWeight: '800', textTransform: 'uppercase' },
    statValue: { fontSize: '1rem', fontWeight: '900', color: 'var(--primary)' },
    contactRow: { display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '25px' },
    contactItem: { display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', color: '#64748b', fontWeight: '600' },
    schedulePreview: { borderTop: '1px solid #f1f5f9', paddingTop: '20px' },
    daysList: { display: 'flex', gap: '8px' },
    dayBadge: { width: '30px', height: '30px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: '900' },
    modalOverlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px' },
    modal: { background: '#fff', padding: '40px', borderRadius: '32px', width: '100%', maxWidth: '650px', maxHeight: '90vh', overflowY: 'auto' },
    formGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' },
    inputGroup: { display: 'flex', flexDirection: 'column', gap: '8px' },
    label: { fontSize: '0.9rem', fontWeight: '700', color: '#64748b' },
    input: { padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #e2e8f0', fontSize: '1rem', outline: 'none' },
    scheduleRow: { display: 'flex', alignItems: 'center', gap: '15px', padding: '10px', background: '#f8fafc', borderRadius: '12px' },
    timeInput: { padding: '8px 12px', borderRadius: '8px', border: '1.5px solid #e2e8f0', background: '#fff' },
    cancelBtn: { padding: '12px 25px', borderRadius: '12px', border: '1.5px solid #e2e8f0', background: '#fff', color: '#64748b', fontWeight: '700', cursor: 'pointer' }
};

export default Professionals;
