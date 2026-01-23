import React, { useState } from 'react';
import {
    Search, CheckCircle, XCircle, Clock, Plus,
    MoreVertical, User, FileText, DollarSign,
    ChevronLeft, ChevronRight, Filter, Settings
} from 'lucide-react';
import { useSaaSStore } from './store';

const timeSlots = ['09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00'];

const Agenda = ({ onOpenPatient }) => {
    const {
        appointments, patients, professionals,
        APPOINTMENT_STATUS, updateAppointmentStatus,
        deleteAppointment, addAppointment
    } = useSaaSStore();

    const activeProfessionals = professionals.filter(p => p.active);
    const [selectedProf, setSelectedProf] = useState(activeProfessionals[0] || {});
    const [searchQuery, setSearchQuery] = useState('');

    // Modal states
    const [showNewAppt, setShowNewAppt] = useState(false);
    const [newApptData, setNewApptData] = useState({
        patientId: '',
        time: '09:00',
        date: new Date().toISOString().split('T')[0],
        price: '',
        observation: '',
        category: 'General'
    });

    const handleCreateAppt = (e) => {
        e.preventDefault();
        addAppointment({
            ...newApptData,
            profId: selectedProf.id,
            price: parseInt(newApptData.price) || selectedProf.consultationPrice
        });
        setShowNewAppt(false);
    };

    const getStatusColor = (status) => {
        switch (status) {
            case APPOINTMENT_STATUS.CONFIRMED: return '#3b82f6';
            case APPOINTMENT_STATUS.ATTENDED: return '#10b981';
            case APPOINTMENT_STATUS.PENDING: return '#f59e0b';
            case APPOINTMENT_STATUS.NO_SHOW: return '#ef4444';
            case APPOINTMENT_STATUS.BLOCK: return '#1e293b';
            default: return '#94a3b8';
        }
    };

    const getAppStyle = (status) => ({
        background: `${getStatusColor(status)}15`,
        color: getStatusColor(status),
        borderLeft: `5px solid ${getStatusColor(status)}`
    });

    return (
        <div style={{ padding: '40px' }}>
            {/* Agenda Header */}
            <header style={styles.header}>
                <div style={styles.headerLeft}>
                    <div style={styles.profCard} className="bento-card">
                        <div style={{ ...styles.avatar, background: selectedProf.color }}>{selectedProf.name?.charAt(0)}</div>
                        <div style={{ flex: 1 }}>
                            <select
                                style={styles.select}
                                value={selectedProf.id}
                                onChange={(e) => setSelectedProf(activeProfessionals.find(p => p.id === parseInt(e.target.value)))}
                            >
                                {activeProfessionals.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                            </select>
                            <p style={styles.profSub}>{selectedProf.specialty}</p>
                        </div>
                    </div>

                    <div style={styles.dateNav}>
                        <button style={styles.navBtn}><ChevronLeft size={20} /></button>
                        <div style={styles.currentDate}>20 - 25 de Enero, 2026</div>
                        <button style={styles.navBtn}><ChevronRight size={20} /></button>
                    </div>
                </div>

                <div style={styles.headerActions}>
                    <div style={styles.searchBox}>
                        <Search size={18} color="#94a3b8" />
                        <input
                            type="text"
                            placeholder="Buscar cita..."
                            style={styles.searchInput}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <button className="btn-primary" onClick={() => setShowNewAppt(true)}>
                        <Plus size={20} />
                        <span>Nueva Cita</span>
                    </button>
                </div>
            </header>

            {/* Grid Tools */}
            <div style={styles.gridTools}>
                <div style={styles.legends}>
                    {Object.entries(APPOINTMENT_STATUS).map(([key, val]) => (
                        <div key={key} style={styles.legendItem}>
                            <div style={{ ...styles.dot, background: getStatusColor(val) }} />
                            <span>{val.charAt(0).toUpperCase() + val.slice(1)}</span>
                        </div>
                    ))}
                </div>
                <div style={{ display: 'flex', gap: '15px' }}>
                    <button style={styles.toolBtn}><Filter size={16} /> Filtros</button>
                    <button style={styles.toolBtn}><Settings size={16} /> Config</button>
                </div>
            </div>

            {/* Calendar Grid */}
            <div className="bento-card" style={styles.calendarContainer}>
                <div style={styles.calHeader}>
                    <div style={styles.timeEmpty}>Hera</div>
                    {['Lun 19', 'Mar 20', 'Mié 21', 'Jue 22', 'Vie 23', 'Sáb 24'].map(day => (
                        <div key={day} style={styles.dayCol}>{day}</div>
                    ))}
                </div>

                <div style={styles.calBody}>
                    {timeSlots.map(time => (
                        <div key={time} style={styles.timeRow}>
                            <div style={styles.timeLabel}>{time}</div>
                            {[19, 20, 21, 22, 23, 24].map(dayDateNum => {
                                const dayDate = `2026-01-${dayDateNum}`;
                                const app = appointments.find(a => a.time === time && a.date === dayDate && a.profId === selectedProf.id);
                                const patient = app ? patients.find(p => p.id === app.patientId) : null;

                                return (
                                    <div key={dayDateNum} style={styles.slot}>
                                        {app && (
                                            <div
                                                style={{ ...styles.appointment, ...getAppStyle(app.status) }}
                                                className="appointment-card"
                                                onClick={() => patient && onOpenPatient(patient)}
                                            >
                                                <div style={styles.appTitle}>{patient?.name || 'Cita Bloqueada'}</div>
                                                <div style={styles.appSubtitle}>{app.observation || 'Consulta General'}</div>

                                                <div className="actions" style={styles.actions} onClick={(e) => e.stopPropagation()}>
                                                    <button onClick={() => updateAppointmentStatus(app.id, APPOINTMENT_STATUS.ATTENDED)} title="Atender" style={{ ...styles.actionBtn, background: '#10b981' }}><CheckCircle size={12} /></button>
                                                    <button onClick={() => updateAppointmentStatus(app.id, APPOINTMENT_STATUS.NO_SHOW)} title="No Llegó" style={{ ...styles.actionBtn, background: '#ef4444' }}><XCircle size={12} /></button>
                                                    <button onClick={() => onOpenPatient(patient)} title="Ver Ficha" style={{ ...styles.actionBtn, background: '#3b82f6' }}><FileText size={12} /></button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    ))}
                </div>
            </div>

            {/* NEW APPOINTMENT MODAL */}
            {showNewAppt && (
                <div style={styles.modalOverlay}>
                    <div className="glass-panel animate-slide" style={styles.modal}>
                        <header style={styles.modalHeader}>
                            <h2>Agendar Nueva Cita</h2>
                            <button onClick={() => setShowNewAppt(false)} style={styles.closeBtn}>✕</button>
                        </header>

                        <form onSubmit={handleCreateAppt} style={styles.form}>
                            <div style={styles.inputGroup}>
                                <label>Paciente</label>
                                <select
                                    style={styles.modalInput}
                                    value={newApptData.patientId}
                                    onChange={e => setNewApptData({ ...newApptData, patientId: e.target.value })}
                                    required
                                >
                                    <option value="">Seleccione un paciente...</option>
                                    {patients.map(p => <option key={p.id} value={p.id}>{p.name} ({p.rut})</option>)}
                                </select>
                            </div>

                            <div style={styles.modalRow}>
                                <div style={styles.inputGroup}>
                                    <label>Fecha</label>
                                    <input type="date" value={newApptData.date} onChange={e => setNewApptData({ ...newApptData, date: e.target.value })} style={styles.modalInput} required />
                                </div>
                                <div style={styles.inputGroup}>
                                    <label>Hora</label>
                                    <select value={newApptData.time} onChange={e => setNewApptData({ ...newApptData, time: e.target.value })} style={styles.modalInput} required>
                                        {timeSlots.map(t => <option key={t} value={t}>{t}</option>)}
                                    </select>
                                </div>
                            </div>

                            <div style={styles.inputGroup}>
                                <label>Valor de Consulta ($)</label>
                                <input type="number" value={newApptData.price} onChange={e => setNewApptData({ ...newApptData, price: e.target.value })} placeholder={selectedProf.consultationPrice} style={styles.modalInput} />
                            </div>

                            <div style={styles.inputGroup}>
                                <label>Observaciones Internas</label>
                                <textarea rows={3} value={newApptData.observation} onChange={e => setNewApptData({ ...newApptData, observation: e.target.value })} placeholder="Ej: Trae exámenes previos" style={styles.modalInput} />
                            </div>

                            <div style={styles.modalFooter}>
                                <button type="button" onClick={() => setShowNewAppt(false)} style={styles.cancelBtn}>Cancelar</button>
                                <button type="submit" className="btn-primary">Confirmar Cita</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <style>{`
                .appointment-card:hover .actions { display: flex !important; }
                .appointment-card { position: relative; transition: all 0.2s; cursor: pointer; overflow: hidden; }
                .appointment-card:hover { transform: translateY(-2px); z-index: 5; box-shadow: 0 10px 20px rgba(0,0,0,0.1); }
            `}</style>
        </div>
    );
};

const styles = {
    header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', flexWrap: 'wrap', gap: '20px' },
    headerLeft: { display: 'flex', gap: '30px', alignItems: 'center' },
    profCard: { display: 'flex', alignItems: 'center', gap: '15px', padding: '10px 20px', borderRadius: '18px', background: '#fff', minWidth: '280px' },
    avatar: { width: '42px', height: '42px', borderRadius: '12px', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '900', fontSize: '1.2rem' },
    select: { border: 'none', background: 'none', fontSize: '1rem', fontWeight: '800', outline: 'none', cursor: 'pointer', color: '#1e293b', width: '100%' },
    profSub: { fontSize: '0.75rem', color: '#64748b', fontWeight: '600' },
    dateNav: { display: 'flex', alignItems: 'center', gap: '15px', background: '#fff', padding: '10px 20px', borderRadius: '15px', border: '1.5px solid #e2e8f0' },
    currentDate: { fontWeight: '800', fontSize: '0.9rem', color: '#1e293b' },
    navBtn: { border: 'none', background: 'none', cursor: 'pointer', color: '#94a3b8' },
    headerActions: { display: 'flex', gap: '15px', alignItems: 'center' },
    searchBox: { display: 'flex', alignItems: 'center', gap: '10px', background: '#fff', padding: '12px 20px', borderRadius: '15px', border: '1.5px solid #e2e8f0', width: '280px' },
    searchInput: { border: 'none', outline: 'none', fontSize: '0.9rem', fontWeight: '600', width: '100%' },
    gridTools: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' },
    legends: { display: 'flex', gap: '20px' },
    legendItem: { display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.75rem', fontWeight: '700', color: '#64748b' },
    dot: { width: '8px', height: '8px', borderRadius: '50%' },
    toolBtn: { padding: '8px 15px', background: '#fff', border: '1.5px solid #e2e8f0', borderRadius: '10px', fontSize: '0.8rem', fontWeight: '700', color: '#64748b', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' },
    calendarContainer: { overflow: 'hidden', padding: 0 },
    calHeader: { display: 'flex', background: '#f8fafc', borderBottom: '1.5px solid #e2e8f0' },
    timeEmpty: { width: '80px', padding: '15px', fontSize: '0.7rem', fontWeight: '800', color: '#cbd5e1', textAlign: 'center' },
    dayCol: { flex: 1, padding: '15px', textAlign: 'center', fontSize: '0.8rem', fontWeight: '900', color: '#1e293b' },
    calBody: { flex: 1 },
    timeRow: { display: 'flex', borderBottom: '1px solid #f1f5f9', minHeight: '95px' },
    timeLabel: { width: '80px', textAlign: 'center', paddingTop: '20px', fontSize: '0.75rem', fontWeight: '900', color: '#94a3b8' },
    slot: { flex: 1, borderRight: '1px solid #f1f5f9', padding: '5px', position: 'relative' },
    appointment: { height: '100%', borderRadius: '12px', padding: '12px', display: 'flex', flexDirection: 'column', gap: '2px' },
    appTitle: { fontWeight: '900', fontSize: '0.8rem' },
    appSubtitle: { fontSize: '0.7rem', opacity: 0.9, fontWeight: '600' },
    actions: { position: 'absolute', top: '8px', right: '8px', display: 'none', flexDirection: 'column', gap: '5px' },
    actionBtn: { border: 'none', width: '28px', height: '28px', borderRadius: '8px', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' },
    modalOverlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.4)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' },
    modal: { background: '#fff', width: '450px', borderRadius: '24px', padding: '30px', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' },
    modalHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' },
    closeBtn: { border: 'none', background: 'none', fontSize: '1.2rem', cursor: 'pointer', color: '#94a3b8' },
    form: { display: 'flex', flexDirection: 'column', gap: '20px' },
    inputGroup: { display: 'flex', flexDirection: 'column', gap: '8px' },
    modalInput: { padding: '12px 15px', borderRadius: '12px', border: '1.5px solid #e2e8f0', fontSize: '0.95rem', outline: 'none' },
    modalRow: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' },
    modalFooter: { display: 'flex', gap: '15px', marginTop: '10px' },
    cancelBtn: { flex: 1, padding: '12px', borderRadius: '12px', border: '1.5px solid #e2e8f0', background: 'none', fontWeight: '700', cursor: 'pointer' }
};

export default Agenda;
