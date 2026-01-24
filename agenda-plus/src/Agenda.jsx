import React, { useState } from 'react';
import {
    Search, CheckCircle, XCircle, Clock, Plus,
    MoreVertical, User, FileText, DollarSign,
    ChevronLeft, ChevronRight, Filter, Settings
} from 'lucide-react';
import { useSaaSStore } from './store';

const timeSlots = ['09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00'];

const AppointmentCard = ({ app, patient, onOpen, updateStatus, statusEnum, getAppStyle }) => (
    <div
        style={{ ...styles.appointment, ...getAppStyle(app.status) }}
        className="appointment-card"
    >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
            <div style={styles.appTitle} onClick={() => patient && onOpen(patient)}>{patient?.name || 'Cita Bloqueada'}</div>
            <div className="actions" style={styles.actions} onClick={(e) => e.stopPropagation()}>
                <button onClick={() => updateStatus(app.id, statusEnum.ATTENDED)} title="Atender" style={{ ...styles.actionBtn, background: '#10b981' }}><CheckCircle size={14} /></button>
                <button onClick={() => updateStatus(app.id, statusEnum.NO_SHOW)} title="No Llegó" style={{ ...styles.actionBtn, background: '#ef4444' }}><XCircle size={14} /></button>
            </div>
        </div>
        <div style={styles.appSubtitle} onClick={() => patient && onOpen(patient)}>
            {app.observation || 'Consulta General'}
        </div>
        {app.status === statusEnum.CONFIRMED && (
            <div style={styles.urgentBadge}>Pendiente</div>
        )}
    </div>
);

const Agenda = ({ onOpenPatient }) => {
    const {
        appointments, patients, professionals,
        APPOINTMENT_STATUS, updateAppointmentStatus,
        deleteAppointment, addAppointment
    } = useSaaSStore();

    const activeProfessionals = professionals.filter(p => p.active);
    const [selectedProf, setSelectedProf] = useState(activeProfessionals[0] || {});
    const [searchQuery, setSearchQuery] = useState('');
    const [viewMode, setViewMode] = useState('week'); // 'week' or 'day-group'

    // Modal states
    const [showNewAppt, setShowNewAppt] = useState(false);
    const [newApptData, setNewApptData] = useState({
        patientId: '',
        time: '09:00',
        date: '2026-01-19',
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
                        <div style={styles.currentDate}>19 - 24 de Enero, 2026</div>
                        <button style={styles.navBtn}><ChevronRight size={20} /></button>
                    </div>
                </div>

                <div style={styles.headerActions}>
                    <div style={styles.viewToggle}>
                        <button
                            style={{ ...styles.toggleBtn, borderTopLeftRadius: '10px', borderBottomLeftRadius: '10px', background: viewMode === 'week' ? 'var(--primary-gradient)' : '#fff', color: viewMode === 'week' ? '#fff' : '#64748b' }}
                            onClick={() => setViewMode('week')}
                        >
                            Individual
                        </button>
                        <button
                            style={{ ...styles.toggleBtn, borderTopRightRadius: '10px', borderBottomRightRadius: '10px', background: viewMode === 'day-group' ? 'var(--primary-gradient)' : '#fff', color: viewMode === 'day-group' ? '#fff' : '#64748b' }}
                            onClick={() => setViewMode('day-group')}
                        >
                            Multi-Agenda
                        </button>
                    </div>

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
                <div style={{ ...styles.calHeader }} className="sticky-header">
                    <div style={styles.timeEmpty}>HORA</div>
                    {viewMode === 'week' ? (
                        ['Lun 19', 'Mar 20', 'Mié 21', 'Jue 22', 'Vie 23', 'Sáb 24'].map(day => (
                            <div key={day} style={styles.dayCol}>{day}</div>
                        ))
                    ) : (
                        activeProfessionals.map(prof => (
                            <div key={prof.id} style={{ ...styles.dayCol, color: prof.color }}>
                                <div style={{ fontSize: '0.85rem' }}>{prof.name.split(' ')[1]}</div>
                                <div style={{ fontSize: '0.65rem', opacity: 0.6 }}>{prof.role}</div>
                            </div>
                        ))
                    )}
                </div>

                <div style={styles.calBody}>
                    {timeSlots.map(time => (
                        <div key={time} style={styles.timeRow}>
                            <div style={styles.timeLabel}>{time}</div>
                            {viewMode === 'week' ? (
                                [19, 20, 21, 22, 23, 24].map(dayDateNum => {
                                    const dayDate = `2026-01-${dayDateNum}`;
                                    const app = appointments.find(a => a.time === time && a.date === dayDate && a.profId === selectedProf.id);
                                    const patient = app ? patients.find(p => p.id === app.patientId) : null;

                                    return (
                                        <div key={dayDateNum} style={styles.slot}>
                                            {app && (
                                                <AppointmentCard app={app} patient={patient} onOpen={onOpenPatient} updateStatus={updateAppointmentStatus} statusEnum={APPOINTMENT_STATUS} getAppStyle={getAppStyle} />
                                            )}
                                        </div>
                                    );
                                })
                            ) : (
                                activeProfessionals.map(prof => {
                                    const dayDate = `2026-01-19`; // Demo fixed date for multi-view
                                    const app = appointments.find(a => a.time === time && a.date === dayDate && a.profId === prof.id);
                                    const patient = app ? patients.find(p => p.id === app.patientId) : null;

                                    return (
                                        <div key={prof.id} style={styles.slot}>
                                            {app && (
                                                <AppointmentCard app={app} patient={patient} onOpen={onOpenPatient} updateStatus={updateAppointmentStatus} statusEnum={APPOINTMENT_STATUS} getAppStyle={getAppStyle} />
                                            )}
                                        </div>
                                    );
                                })
                            )}
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
                .appointment-card:hover .actions { opacity: 1 !important; transform: translateX(0); }
                .appointment-card { position: relative; transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1); cursor: pointer; overflow: hidden; }
                .appointment-card:hover { transform: translateY(-3px); z-index: 10; box-shadow: 0 12px 24px rgba(0,0,0,0.15); }
                .sticky-header { position: sticky; top: -40px; z-index: 20; background: #fff; }
                .actions { opacity: 0; transform: translateX(10px); transition: all 0.2s ease; }
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
    calHeader: { display: 'flex', background: '#f8fafc', borderBottom: '1.5px solid #e2e8f0', width: '100%' },
    timeEmpty: { width: '85px', padding: '15px', fontSize: '0.7rem', fontWeight: '800', color: '#94a3b8', textAlign: 'center', borderRight: '1px solid #f1f5f9' },
    dayCol: { flex: 1, padding: '15px', textAlign: 'center', fontSize: '0.8rem', fontWeight: '900', color: '#1e293b', minWidth: '140px' },
    calBody: { flex: 1 },
    timeRow: { display: 'flex', borderBottom: '1px solid #f1f5f9', minHeight: '105px' },
    timeLabel: { width: '85px', textAlign: 'center', paddingTop: '22px', fontSize: '0.75rem', fontWeight: '900', color: '#94a3b8', borderRight: '1px solid #f1f5f9' },
    slot: { flex: 1, borderRight: '1px solid #f1f5f9', padding: '6px', position: 'relative', minWidth: '140px' },
    appointment: { height: '100%', borderRadius: '12px', padding: '12px', display: 'flex', flexDirection: 'column', gap: '4px', position: 'relative', minHeight: '85px' },
    appTitle: { fontWeight: '900', fontSize: '0.85rem', flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', color: 'inherit' },
    appSubtitle: { fontSize: '0.7rem', opacity: 0.8, fontWeight: '600', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' },
    urgentBadge: { position: 'absolute', bottom: '8px', right: '8px', fontSize: '0.6rem', fontWeight: '900', padding: '2px 6px', borderRadius: '4px', background: 'rgba(255,255,255,0.8)', border: '1px solid currentColor' },
    actions: { display: 'flex', gap: '6px', marginLeft: '10px' },
    actionBtn: { border: 'none', width: '26px', height: '26px', borderRadius: '8px', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.2s', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' },
    viewToggle: { display: 'flex', background: '#fff', borderRadius: '12px', padding: '4px', border: '1.5px solid #e2e8f0' },
    toggleBtn: { padding: '8px 16px', border: 'none', cursor: 'pointer', fontSize: '0.8rem', fontWeight: '800', transition: 'all 0.2s' },
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
