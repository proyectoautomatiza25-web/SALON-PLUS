import React, { useState, useMemo } from 'react';
import { Search, CheckCircle, XCircle, Clock, AlertCircle, Ban, Trash2 } from 'lucide-react';
import BookingWidget from './components/BookingWidget';
import { useSaaSStore } from './store';

const timeSlots = ['09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00'];

const Agenda = ({ appointments, patients, professionals, onAddAppointment, onOpenPatient }) => {
    const { APPOINTMENT_STATUS, updateAppointmentStatus, deleteAppointment } = useSaaSStore();
    const activeProfessionals = professionals.filter(p => p.active);
    const [selectedProf, setSelectedProf] = useState(activeProfessionals[0] || {});
    const [showBooking, setShowBooking] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedDate, setSelectedDate] = useState(new Date());

    // Update selected professional if the list changes or none selected
    React.useEffect(() => {
        if (!selectedProf.id && activeProfessionals.length > 0) {
            setSelectedProf(activeProfessionals[0]);
        }
    }, [activeProfessionals, selectedProf.id]);

    // Filter patients by search query
    const filteredPatients = useMemo(() => {
        if (!searchQuery) return patients;
        const query = searchQuery.toLowerCase();
        return patients.filter(p =>
            p.name.toLowerCase().includes(query) ||
            p.rut?.toLowerCase().includes(query) ||
            p.phone?.includes(query)
        );
    }, [patients, searchQuery]);

    // Get appointment style based on status
    const getAppStyle = (status) => {
        switch (status) {
            case APPOINTMENT_STATUS.CONFIRMED:
                return { background: '#dbeafe', color: '#1e40af', borderLeft: '4px solid #3b82f6' };
            case APPOINTMENT_STATUS.ATTENDED:
                return { background: '#d1fae5', color: '#065f46', borderLeft: '4px solid #10b981' };
            case APPOINTMENT_STATUS.PENDING:
                return { background: '#fef3c7', color: '#92400e', borderLeft: '4px solid #f59e0b' };
            case APPOINTMENT_STATUS.NO_SHOW:
                return { background: '#fee2e2', color: '#991b1b', borderLeft: '4px solid #ef4444' };
            case APPOINTMENT_STATUS.CANCELLED:
                return { background: '#f1f5f9', color: '#475569', borderLeft: '4px solid #94a3b8' };
            case APPOINTMENT_STATUS.SUSPENDED:
                return { background: '#fed7aa', color: '#9a3412', borderLeft: '4px solid #f97316' };
            case APPOINTMENT_STATUS.BLOCK:
                return { background: '#1e293b', color: 'white', borderLeft: '4px solid #0f172a' };
            default:
                return { background: '#f8fafc', borderLeft: '4px solid #cbd5e0' };
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case APPOINTMENT_STATUS.CONFIRMED: return <CheckCircle size={14} />;
            case APPOINTMENT_STATUS.ATTENDED: return <CheckCircle size={14} />;
            case APPOINTMENT_STATUS.PENDING: return <Clock size={14} />;
            case APPOINTMENT_STATUS.NO_SHOW: return <XCircle size={14} />;
            case APPOINTMENT_STATUS.CANCELLED: return <Ban size={14} />;
            case APPOINTMENT_STATUS.SUSPENDED: return <AlertCircle size={14} />;
            default: return null;
        }
    };

    const getStatusLabel = (status) => {
        switch (status) {
            case APPOINTMENT_STATUS.CONFIRMED: return 'Confirmado';
            case APPOINTMENT_STATUS.ATTENDED: return 'Atendido';
            case APPOINTMENT_STATUS.PENDING: return 'Pendiente';
            case APPOINTMENT_STATUS.NO_SHOW: return 'No llegó';
            case APPOINTMENT_STATUS.CANCELLED: return 'Cancelado';
            case APPOINTMENT_STATUS.SUSPENDED: return 'Suspendido';
            case APPOINTMENT_STATUS.BLOCK: return 'Bloqueo';
            default: return status;
        }
    };

    return (
        <div style={styles.container}>
            <header style={styles.subHeader}>
                <div style={styles.navTools}>
                    <div style={styles.profCard}>
                        <div style={{ ...styles.avatar, background: selectedProf.color }}>
                            {selectedProf.name ? selectedProf.name.substring(0, 2) : '??'}
                        </div>
                        <div>
                            <div style={styles.profName}>{selectedProf.name}</div>
                            <div style={styles.profSpec}>{selectedProf.specialty}</div>
                        </div>
                    </div>
                    <select
                        style={styles.dropdown}
                        value={selectedProf.id}
                        onChange={(e) => setSelectedProf(activeProfessionals.find(p => p.id === parseInt(e.target.value)))}
                    >
                        {activeProfessionals.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                    </select>

                    {/* Search Bar */}
                    <div style={styles.searchContainer}>
                        <Search size={18} color="#64748b" />
                        <input
                            type="text"
                            placeholder="Buscar paciente por nombre, RUT o teléfono..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            style={styles.searchInput}
                        />
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery('')}
                                style={styles.clearBtn}
                            >
                                ✕
                            </button>
                        )}
                    </div>
                </div>

                <button
                    className="btn-primary"
                    style={{ background: 'var(--primary-gradient)', borderRadius: '14px' }}
                    onClick={() => setShowBooking(!showBooking)}
                >
                    {showBooking ? 'Cerrar Panel' : '⚡ Nuevo Agendamiento'}
                </button>
            </header>

            {/* Search Results */}
            {searchQuery && (
                <div style={styles.searchResults}>
                    <div style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '10px', fontWeight: '600' }}>
                        {filteredPatients.length} resultado(s) encontrado(s)
                    </div>
                    <div style={{ display: 'grid', gap: '10px' }}>
                        {filteredPatients.slice(0, 5).map(patient => (
                            <div
                                key={patient.id}
                                onClick={() => onOpenPatient(patient)}
                                style={styles.searchResultItem}
                            >
                                <div>
                                    <div style={{ fontWeight: '700', color: '#1e293b' }}>{patient.name}</div>
                                    <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
                                        RUT: {patient.rut} • Tel: {patient.phone}
                                    </div>
                                </div>
                                <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>
                                    Ver ficha →
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div style={styles.gridContainer}>
                <div className="bento-card" style={styles.calendarCard}>
                    <div style={styles.calHeader}>
                        <div style={styles.timeEmpty}></div>
                        {['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'].map(day => (
                            <div key={day} style={styles.dayColHeader}>{day}</div>
                        ))}
                    </div>

                    <div style={styles.calBody}>
                        {timeSlots.map(time => (
                            <div key={time} style={styles.timeRow}>
                                <div style={styles.timeTag}>{time}</div>
                                {[1, 2, 3, 4, 5, 6].map(dayNum => {
                                    const dayDate = `2026-01-${18 + dayNum}`;
                                    const app = appointments.find(a => a.time === time && a.date === dayDate && a.profId === selectedProf.id);
                                    const patient = app ? patients.find(p => p.id === app.patientId) : null;

                                    return (
                                        <div
                                            key={dayNum}
                                            style={styles.slot}
                                            className={!app ? "slot-hover" : ""}
                                            onClick={() => !app && setShowBooking(true)}
                                        >
                                            {app ? (
                                                <div
                                                    className="appointment-card"
                                                    style={{ ...styles.appointment, ...getAppStyle(app.status) }}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        onOpenPatient(patient);
                                                    }}
                                                >
                                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '5px' }}>
                                                        <div style={{ fontWeight: '800', fontSize: '0.8rem' }}>
                                                            {patient?.name || 'Bloqueo'}
                                                        </div>
                                                        <div style={{ display: 'flex', gap: '4px' }}>
                                                            {getStatusIcon(app.status)}
                                                        </div>
                                                    </div>
                                                    <div style={{ fontSize: '0.65rem', opacity: 0.8, marginBottom: '5px' }}>
                                                        Ficha: #{patient?.id}00
                                                    </div>
                                                    <div style={{
                                                        fontSize: '0.6rem',
                                                        fontWeight: '700',
                                                        padding: '3px 6px',
                                                        background: 'rgba(0,0,0,0.1)',
                                                        borderRadius: '4px',
                                                        display: 'inline-block'
                                                    }}>
                                                        {getStatusLabel(app.status)}
                                                    </div>

                                                    <div className="appointment-actions" style={styles.appointmentActions}>
                                                        <button onClick={(e) => { e.stopPropagation(); updateAppointmentStatus(app.id, APPOINTMENT_STATUS.ATTENDED); }} style={{ ...styles.actionBtn, background: '#10b981' }} title="Atendido"><CheckCircle size={12} /></button>
                                                        <button onClick={(e) => { e.stopPropagation(); updateAppointmentStatus(app.id, APPOINTMENT_STATUS.NO_SHOW); }} style={{ ...styles.actionBtn, background: '#ef4444' }} title="No llegó"><XCircle size={12} /></button>
                                                        <button onClick={(e) => { e.stopPropagation(); if (confirm('¿Eliminar cita?')) deleteAppointment(app.id); }} style={{ ...styles.actionBtn, background: '#64748b' }} title="Eliminar"><Trash2 size={12} /></button>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div style={styles.emptySlotContent}>
                                                    <span className="add-icon">+</span>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        ))}
                    </div>
                </div>

                {showBooking && (
                    <div className="animate-slide">
                        <BookingWidget patients={patients} onConfirm={(data) => { onAddAppointment({ ...data, profId: selectedProf.id }); setShowBooking(false); }} />
                    </div>
                )}
            </div>

            <div style={styles.keyboardHint}>Tip: Usa <b>Ctrl + K</b> para navegación ultra-rápida</div>

            <style>{`
                .appointment-card:hover .appointment-actions {
                    display: flex !important;
                }
                .appointment-card:hover {
                    transform: scale(1.02);
                    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                    z-index: 10;
                }
                .searchResultItem:hover {
                    background: #e2e8f0 !important;
                    transform: translateX(5px);
                }
                .actionBtn:hover {
                    transform: scale(1.1);
                    filter: brightness(1.1);
                }
                .slot-hover:hover {
                    background-color: #f0f9ff !important;
                    cursor: pointer;
                }
                .slot-hover:hover .add-icon {
                    opacity: 1;
                    transform: scale(1.1);
                }
            `}</style>
        </div>
    );
};

const styles = {
    container: { padding: '30px 40px', background: 'var(--bg-app)', minHeight: 'calc(100vh - 80px)' },
    subHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', flexWrap: 'wrap', gap: '20px' },
    navTools: { display: 'flex', gap: '20px', alignItems: 'center', flexWrap: 'wrap', flex: 1 },
    profCard: { display: 'flex', alignItems: 'center', gap: '15px', background: 'white', padding: '10px 20px', borderRadius: '18px', boxShadow: 'var(--shadow-pro)' },
    avatar: { width: '40px', height: '40px', borderRadius: '12px', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '900' },
    profName: { fontWeight: '800', fontSize: '1rem' },
    profSpec: { fontSize: '0.75rem', color: '#64748b', fontWeight: '600' },
    dropdown: { padding: '10px 15px', borderRadius: '14px', border: '1px solid #e2e8f0', fontWeight: '700', outline: 'none', color: 'var(--primary)', cursor: 'pointer' },

    searchContainer: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        background: 'white',
        padding: '10px 20px',
        borderRadius: '14px',
        border: '1px solid #e2e8f0',
        flex: 1,
        minWidth: '300px',
        maxWidth: '500px'
    },
    searchInput: {
        border: 'none',
        outline: 'none',
        flex: 1,
        fontSize: '0.9rem',
        fontWeight: '600',
        color: '#1e293b'
    },
    clearBtn: {
        background: '#f1f5f9',
        border: 'none',
        borderRadius: '50%',
        width: '24px',
        height: '24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        fontSize: '0.8rem',
        color: '#64748b'
    },
    searchResults: {
        background: 'white',
        padding: '20px',
        borderRadius: '18px',
        marginBottom: '20px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
    },
    searchResultItem: {
        padding: '15px',
        background: '#f8fafc',
        borderRadius: '12px',
        cursor: 'pointer',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        transition: 'all 0.2s',
        border: '1px solid #e2e8f0'
    },

    gridContainer: { display: 'grid', gridTemplateColumns: '1fr auto', gap: '30px' },
    calendarCard: { border: 'none', padding: '0', overflow: 'hidden' },
    calHeader: { display: 'flex', background: '#f8fafc', borderBottom: '1px solid #f1f5f9' },
    timeEmpty: { width: '80px' },
    dayColHeader: { flex: 1, padding: '15px', textAlign: 'center', fontSize: '0.8rem', fontWeight: '800', color: '#64748b', textTransform: 'uppercase' },

    calBody: { flex: 1 },
    timeRow: { display: 'flex', borderBottom: '1px solid #f1f5f9', minHeight: '90px' },
    timeTag: { width: '80px', textAlign: 'center', paddingTop: '15px', fontSize: '0.75rem', fontWeight: '800', color: '#94a3b8' },
    slot: { flex: 1, borderRight: '1px solid #f1f5f9', position: 'relative', padding: '4px', transition: 'background-color 0.2s' },

    emptySlotContent: { width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#cbd5e1', fontSize: '1.5rem', fontWeight: '300' },

    appointment: {
        height: '100%',
        borderRadius: '10px',
        padding: '10px',
        fontSize: '0.75rem',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        transition: 'all 0.2s'
    },
    appointmentActions: {
        position: 'absolute',
        top: '5px',
        right: '5px',
        display: 'none',
        gap: '4px',
        flexDirection: 'column'
    },
    actionBtn: {
        border: 'none',
        borderRadius: '6px',
        width: '28px',
        height: '28px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        color: 'white',
        transition: 'all 0.2s',
        boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
    },
    keyboardHint: { position: 'fixed', bottom: '20px', right: '40px', fontSize: '0.75rem', color: '#94a3b8', background: 'white', padding: '8px 15px', borderRadius: '10px', boxShadow: 'var(--shadow-pro)' }
};

export default Agenda;
