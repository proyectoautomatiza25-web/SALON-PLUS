import React, { useState } from 'react';

const BookingWidget = ({ patients, onConfirm }) => {
    const [selectedPatientId, setSelectedPatientId] = useState(patients[0]?.id || '');
    const [selectedTime, setSelectedTime] = useState('09:00');
    const [selectedDate, setSelectedDate] = useState('2026-01-19');

    const handleConfirm = () => {
        onConfirm({
            patientId: selectedPatientId,
            time: selectedTime,
            date: selectedDate,
            status: 'p' // Default to "Presente" style for new apps
        });
    };

    return (
        <div className="card animate-slide" style={styles.card}>
            <header style={styles.header}>
                <div style={styles.title}>Nuevo Agendamiento Directo</div>
            </header>

            <div style={styles.body}>
                <div style={styles.field}>
                    <label style={styles.label}>Paciente</label>
                    <select
                        style={styles.select}
                        value={selectedPatientId}
                        onChange={(e) => setSelectedPatientId(e.target.value)}
                    >
                        {patients.map(p => (
                            <option key={p.id} value={p.id}>{p.name}</option>
                        ))}
                    </select>
                </div>

                <div style={styles.field}>
                    <label style={styles.label}>Fecha</label>
                    <input
                        type="date"
                        style={styles.select}
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                    />
                </div>

                <div style={styles.field}>
                    <label style={styles.label}>Hora</label>
                    <div style={styles.slotsGrid}>
                        {['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'].map(t => (
                            <button
                                key={t}
                                onClick={() => setSelectedTime(t)}
                                style={{
                                    ...styles.slotBtn,
                                    background: selectedTime === t ? 'var(--primary)' : 'white',
                                    color: selectedTime === t ? 'white' : 'var(--text-main)',
                                }}
                            >
                                {t}
                            </button>
                        ))}
                    </div>
                </div>

                <button
                    className="btn-primary"
                    style={{ width: '100%', marginTop: '20px' }}
                    onClick={handleConfirm}
                >
                    Confirmar Cita Real
                </button>
            </div>
        </div>
    );
};

const styles = {
    card: { width: '320px', position: 'fixed', right: '20px', top: '100px', zIndex: 900, padding: '0', overflow: 'hidden' },
    header: { background: 'var(--primary)', padding: '15px', color: 'white' },
    title: { fontWeight: '700', fontSize: '0.9rem', textAlign: 'center' },
    body: { padding: '20px' },
    field: { marginBottom: '15px' },
    label: { fontSize: '0.75rem', fontWeight: '700', display: 'block', marginBottom: '5px', color: 'var(--text-muted)' },
    select: { width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--border)', fontWeight: '600' },
    slotsGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' },
    slotBtn: { padding: '8px', border: '1px solid var(--border)', borderRadius: '6px', fontSize: '0.8rem', fontWeight: '600', cursor: 'pointer', transition: '0.2s' },
};

export default BookingWidget;
