import React, { useState } from 'react';
import BookingWidget from './components/BookingWidget';


const timeSlots = ['09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00'];

const Agenda = ({ appointments, patients, professionals, onAddAppointment, onOpenPatient }) => {
    const activeProfessionals = professionals.filter(p => p.active);
    const [selectedProf, setSelectedProf] = useState(activeProfessionals[0] || {});
    const [showBooking, setShowBooking] = useState(false);

    // Update selected professional if the list changes or none selected
    React.useEffect(() => {
        if (!selectedProf.id && activeProfessionals.length > 0) {
            setSelectedProf(activeProfessionals[0]);
        }
    }, [activeProfessionals, selectedProf.id]);

    const getAppStyle = (type) => {
        switch (type) {
            case 'np': return { background: 'var(--status-np)', color: '#854d0e', borderLeft: '4px solid #eab308' };
            case 'p': return { background: 'var(--status-p)', color: '#1e40af', borderLeft: '4px solid #3b82f6' };
            case 'success': return { background: 'var(--status-success)', color: '#064e3b', borderLeft: '4px solid #10b981' };
            case 'pink': return { background: 'var(--status-pink)', color: '#9d174d', borderLeft: '4px solid #f43f5e' };
            case 'block': return { background: 'var(--status-block)', color: 'white' };
            default: return { background: '#f8fafc', borderLeft: '4px solid #cbd5e0' };
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
                </div>

                <button
                    className="btn-primary"
                    style={{ background: 'var(--primary-gradient)', borderRadius: '14px' }}
                    onClick={() => setShowBooking(!showBooking)}
                >
                    {showBooking ? 'Cerrar Panel' : '⚡ Nuevo Agendamiento'}
                </button>
            </header>

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
                                        <div key={dayNum} style={styles.slot}>
                                            {app && (
                                                <div
                                                    className="animate-slide"
                                                    style={{ ...styles.appointment, ...getAppStyle(app.status) }}
                                                    onClick={() => onOpenPatient(patient)}
                                                >
                                                    <div style={{ fontWeight: '800' }}>{patient?.name || 'Bloqueo'}</div>
                                                    <div style={{ fontSize: '0.65rem', opacity: 0.8 }}>Ficha: #{patient?.id}00</div>
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
        </div>
    );
};

const styles = {
    container: { padding: '30px 40px', background: 'var(--bg-app)', minHeight: 'calc(100vh - 80px)' },
    subHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' },
    navTools: { display: 'flex', gap: '30px', alignItems: 'center' },
    profCard: { display: 'flex', alignItems: 'center', gap: '15px', background: 'white', padding: '10px 20px', borderRadius: '18px', boxShadow: 'var(--shadow-pro)' },
    avatar: { width: '40px', height: '40px', borderRadius: '12px', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '900' },
    profName: { fontWeight: '800', fontSize: '1rem' },
    profSpec: { fontSize: '0.75rem', color: '#64748b', fontWeight: '600' },
    dropdown: { padding: '10px 15px', borderRadius: '14px', border: '1px solid #e2e8f0', fontWeight: '700', outline: 'none', color: 'var(--primary)', cursor: 'pointer' },

    gridContainer: { display: 'grid', gridTemplateColumns: '1fr auto', gap: '30px' },
    calendarCard: { border: 'none', padding: '0', overflow: 'hidden' },
    calHeader: { display: 'flex', background: '#f8fafc', borderBottom: '1px solid #f1f5f9' },
    timeEmpty: { width: '80px' },
    dayColHeader: { flex: 1, padding: '15px', textAlign: 'center', fontSize: '0.8rem', fontWeight: '800', color: '#64748b', textTransform: 'uppercase' },

    calBody: { flex: 1 },
    timeRow: { display: 'flex', borderBottom: '1px solid #f1f5f9', minHeight: '75px' },
    timeTag: { width: '80px', textAlign: 'center', paddingTop: '15px', fontSize: '0.75rem', fontWeight: '800', color: '#94a3b8' },
    slot: { flex: 1, borderRight: '1px solid #f1f5f9', position: 'relative', padding: '4px' },
    appointment: { height: '100%', borderRadius: '10px', padding: '10px', fontSize: '0.75rem', cursor: 'pointer', display: 'flex', flexDirection: 'column', justifyContent: 'center' },
    keyboardHint: { position: 'fixed', bottom: '20px', right: '40px', fontSize: '0.75rem', color: '#94a3b8', background: 'white', padding: '8px 15px', borderRadius: '10px', boxShadow: 'var(--shadow-pro)' }
};

export default Agenda;
