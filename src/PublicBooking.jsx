import React, { useState, useEffect } from 'react';
import { Calendar, Clock, User, CheckCircle, ChevronRight, MapPin, Star } from 'lucide-react';
import { api } from './api';

const PublicBooking = () => {
    const [step, setStep] = useState(1); // 1: Profesional, 2: Fecha/Hora, 3: Datos, 4: Confirmación
    const [professionals, setProfessionals] = useState([]);
    const [selectedProf, setSelectedProf] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [patientData, setPatientData] = useState({ name: '', rut: '', email: '', phone: '' });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Cargar profesionales (simulado por ahora si no hay backend público)
        // En producción esto llamaría a un endpoint público
        const mockProfs = [
            { id: 1, name: 'Dra. Francis Zabaleta', specialty: 'Medicina General', rating: 5.0, image: null },
            { id: 2, name: 'Dra. María González', specialty: 'Pediatría', rating: 4.9, image: null }
        ];
        setProfessionals(mockProfs);
    }, []);

    // Simular horarios disponibles
    const timeSlots = ['09:00', '09:30', '10:00', '11:00', '11:30', '15:00', '16:30'];

    const handleBooking = async () => {
        setLoading(true);
        try {
            // Construir fecha ISO para start_time
            // selectedDate es YYYY-MM-DD, selectedTime es HH:MM
            const startDateTime = new Date(`${selectedDate}T${selectedTime}:00`);

            const payload = {
                stylist_id: selectedProf.id.toString(), // Simulamos ID o usamos uno real si tuvieramos endpoint de profesionales
                service_id: "general_service", // ID placeholder, el backend usará el primero que encuentre
                start_time: startDateTime.toISOString(),
                client_name: patientData.name,
                client_phone: patientData.phone || "Sin telefono",
                client_email: patientData.email,
                client_rut: patientData.rut,
                notes: "Reserva web pública"
            };

            // Llamada directa usando fetch (ya que api.js requiere autenticación, o creamos método público)
            const response = await fetch('http://127.0.0.1:8000/api/salon/appointments/public-simple', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || 'Error al reservar');
            }

            setStep(4); // Éxito
        } catch (error) {
            console.error(error);
            alert("Error al reservar: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                {/* Header */}
                <div style={styles.header}>
                    <div style={styles.logo}>Agenda<span style={{ color: '#38bdf8' }}>Plus</span></div>
                    <p style={{ margin: 0, color: '#64748b' }}>Reserva tu hora médica online</p>
                </div>

                {/* Progress Bar */}
                <div style={styles.progressContainer}>
                    {[1, 2, 3].map(s => (
                        <div key={s} style={{ ...styles.progressStep, background: step >= s ? '#004975' : '#e2e8f0' }}></div>
                    ))}
                </div>

                {/* Paso 1: Seleccionar Profesional */}
                {step === 1 && (
                    <div className="animate-slide">
                        <h2 style={styles.title}>Selecciona un Especialista</h2>
                        <div style={styles.grid}>
                            {professionals.map(prof => (
                                <div key={prof.id} style={styles.profCard} onClick={() => { setSelectedProf(prof); setStep(2); }}>
                                    <div style={styles.avatar}>{prof.name.charAt(0)}</div>
                                    <div style={{ flex: 1 }}>
                                        <div style={styles.profName}>{prof.name}</div>
                                        <div style={styles.profSpec}>{prof.specialty}</div>
                                        <div style={styles.rating}><Star size={12} fill="#fbbf24" stroke="#fbbf24" /> {prof.rating}</div>
                                    </div>
                                    <ChevronRight size={20} color="#94a3b8" />
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Paso 2: Fecha y Hora */}
                {step === 2 && (
                    <div className="animate-slide">
                        <button style={styles.backBtn} onClick={() => setStep(1)}>← Volver</button>
                        <h2 style={styles.title}>Elige tu horario con {selectedProf.name}</h2>

                        <div style={{ marginBottom: '20px' }}>
                            <label style={styles.label}>Fecha</label>
                            <input type="date" style={styles.input} onChange={e => setSelectedDate(e.target.value)} />
                        </div>

                        {selectedDate && (
                            <div style={styles.timeGrid}>
                                {timeSlots.map(time => (
                                    <button
                                        key={time}
                                        style={{ ...styles.timeBtn, background: selectedTime === time ? '#004975' : '#fff', color: selectedTime === time ? '#fff' : '#1e293b' }}
                                        onClick={() => setSelectedTime(time)}
                                    >
                                        {time}
                                    </button>
                                ))}
                            </div>
                        )}

                        <button
                            style={{ ...styles.primaryBtn, opacity: (!selectedDate || !selectedTime) ? 0.5 : 1 }}
                            disabled={!selectedDate || !selectedTime}
                            onClick={() => setStep(3)}
                        >
                            Continuar
                        </button>
                    </div>
                )}

                {/* Paso 3: Datos del Paciente */}
                {step === 3 && (
                    <div className="animate-slide">
                        <button style={styles.backBtn} onClick={() => setStep(2)}>← Volver</button>
                        <h2 style={styles.title}>Tus Datos</h2>

                        <div style={styles.formGroup}>
                            <label style={styles.label}>Nombre Completo</label>
                            <input type="text" style={styles.input} placeholder="Ej: Juan Pérez" onChange={e => setPatientData({ ...patientData, name: e.target.value })} />
                        </div>
                        <div style={styles.formGroup}>
                            <label style={styles.label}>RUT</label>
                            <input type="text" style={styles.input} placeholder="12.345.678-9" onChange={e => setPatientData({ ...patientData, rut: e.target.value })} />
                        </div>
                        <div style={styles.formGroup}>
                            <label style={styles.label}>Teléfono / WhatsApp</label>
                            <input type="tel" style={styles.input} placeholder="+56 9 1234 5678" onChange={e => setPatientData({ ...patientData, phone: e.target.value })} />
                        </div>
                        <div style={styles.formGroup}>
                            <label style={styles.label}>Email</label>
                            <input type="email" style={styles.input} placeholder="juan@email.com" onChange={e => setPatientData({ ...patientData, email: e.target.value })} />
                        </div>

                        <button style={styles.primaryBtn} onClick={handleBooking} disabled={loading}>
                            {loading ? 'Reservando...' : 'Confirmar Reserva'}
                        </button>
                    </div>
                )}

                {/* Paso 4: Éxito */}
                {step === 4 && (
                    <div style={{ textAlign: 'center' }} className="animate-slide">
                        <div style={{ display: 'inline-flex', padding: '20px', borderRadius: '50%', background: '#dcfce7', marginBottom: '20px' }}>
                            <CheckCircle size={48} color="#16a34a" />
                        </div>
                        <h2 style={styles.title}>¡Reserva Exitosa!</h2>
                        <p style={{ color: '#64748b', marginBottom: '30px' }}>
                            Hemos enviado la confirmación a <strong>{patientData.email}</strong>.
                        </p>

                        <div style={styles.summaryCard}>
                            <div style={styles.summaryRow}><User size={16} /> {selectedProf.name}</div>
                            <div style={styles.summaryRow}><Calendar size={16} /> {selectedDate}</div>
                            <div style={styles.summaryRow}><Clock size={16} /> {selectedTime}</div>
                            <div style={styles.summaryRow}><MapPin size={16} /> Consulta 601</div>
                        </div>

                        <button style={styles.outlineBtn} onClick={() => window.location.reload()}>
                            Hacer otra reserva
                        </button>
                    </div>
                )}
            </div>

            <div style={styles.footer}>
                Powered by <strong>AgendaPlus</strong>
            </div>
        </div>
    );
};

const styles = {
    container: { minHeight: '100vh', background: '#f8fafc', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px' },
    card: { background: '#fff', width: '100%', maxWidth: '480px', borderRadius: '24px', padding: '30px', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' },
    header: { textAlign: 'center', marginBottom: '30px' },
    logo: { fontSize: '24px', fontWeight: '900', color: '#004975', marginBottom: '5px' },
    progressContainer: { display: 'flex', gap: '8px', marginBottom: '30px' },
    progressStep: { flex: 1, height: '4px', borderRadius: '2px', transition: 'all 0.3s' },
    title: { fontSize: '1.2rem', fontWeight: '800', color: '#1e293b', marginBottom: '20px' },
    grid: { display: 'flex', flexDirection: 'column', gap: '15px' },
    profCard: { display: 'flex', alignItems: 'center', gap: '15px', padding: '15px', borderRadius: '16px', border: '1px solid #e2e8f0', cursor: 'pointer', transition: 'all 0.2s' },
    avatar: { width: '48px', height: '48px', borderRadius: '50%', background: '#004975', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' },
    profName: { fontWeight: '700', color: '#1e293b' },
    profSpec: { fontSize: '0.85rem', color: '#64748b' },
    rating: { display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem', color: '#d97706', marginTop: '4px' },
    backBtn: { background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', marginBottom: '15px', padding: 0 },
    label: { display: 'block', fontSize: '0.9rem', fontWeight: '600', color: '#475569', marginBottom: '8px' },
    input: { width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid #cbd5e1', fontSize: '1rem', marginBottom: '15px' },
    timeGrid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginBottom: '20px' },
    timeBtn: { padding: '10px', borderRadius: '10px', border: '1px solid #e2e8f0', cursor: 'pointer', fontWeight: '600' },
    primaryBtn: { width: '100%', padding: '16px', background: '#004975', color: '#fff', border: 'none', borderRadius: '14px', fontWeight: '700', fontSize: '1rem', cursor: 'pointer', marginTop: '10px' },
    formGroup: { marginBottom: '15px' },
    summaryCard: { background: '#f1f5f9', padding: '20px', borderRadius: '16px', marginBottom: '20px' },
    summaryRow: { display: 'flex', alignItems: 'center', gap: '10px', color: '#334155', marginBottom: '10px', fontSize: '0.95rem' },
    outlineBtn: { width: '100%', padding: '14px', background: 'none', border: '2px solid #e2e8f0', color: '#475569', borderRadius: '14px', fontWeight: '700', cursor: 'pointer' },
    footer: { marginTop: '20px', color: '#94a3b8', fontSize: '0.8rem' }
};

export default PublicBooking;
