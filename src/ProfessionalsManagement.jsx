import React, { useState } from 'react';

const ProfessionalsManagement = ({ professionals, appointments, onAddProfessional, onUpdateProfessional }) => {
    const [activeView, setActiveView] = useState('list');
    const [selectedProfessional, setSelectedProfessional] = useState(null);
    const [showAddModal, setShowAddModal] = useState(false);
    const [newProfessional, setNewProfessional] = useState({
        name: '',
        role: '',
        specialty: '',
        email: '',
        phone: '',
        consultationPrice: 35000,
        color: '#10b981',
        description: '',
        schedule: {
            monday: { start: '09:00', end: '18:00', enabled: true },
            tuesday: { start: '09:00', end: '18:00', enabled: true },
            wednesday: { start: '09:00', end: '18:00', enabled: true },
            thursday: { start: '09:00', end: '18:00', enabled: true },
            friday: { start: '09:00', end: '14:00', enabled: true },
            saturday: { enabled: false },
            sunday: { enabled: false }
        }
    });

    const activeProfessionals = professionals.filter(p => p.active);

    // Calculate stats per professional
    const getProfessionalStats = (profId) => {
        const profAppointments = appointments.filter(a => a.profId === profId);
        return {
            totalAppointments: profAppointments.length,
            revenue: profAppointments.length * (professionals.find(p => p.id === profId)?.consultationPrice || 35000),
            confirmedRate: profAppointments.filter(a => a.status !== 'np').length / (profAppointments.length || 1) * 100
        };
    };

    const handleAddProfessional = () => {
        onAddProfessional(newProfessional);
        setShowAddModal(false);
        setNewProfessional({
            name: '',
            role: '',
            specialty: '',
            email: '',
            phone: '',
            consultationPrice: 35000,
            color: '#10b981',
            description: '',
            schedule: {
                monday: { start: '09:00', end: '18:00', enabled: true },
                tuesday: { start: '09:00', end: '18:00', enabled: true },
                wednesday: { start: '09:00', end: '18:00', enabled: true },
                thursday: { start: '09:00', end: '18:00', enabled: true },
                friday: { start: '09:00', end: '14:00', enabled: true },
                saturday: { enabled: false },
                sunday: { enabled: false }
            }
        });
    };

    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    const dayLabels = {
        monday: 'Lunes',
        tuesday: 'Martes',
        wednesday: 'Miércoles',
        thursday: 'Jueves',
        friday: 'Viernes',
        saturday: 'Sábado',
        sunday: 'Domingo'
    };

    return (
        <div style={styles.container}>
            <header style={styles.header}>
                <div>
                    <h1 style={styles.title}>Gestión de Profesionales</h1>
                    <p style={styles.subtitle}>Administra tu equipo médico, horarios y especialidades</p>
                </div>
                <div style={styles.headerActions}>
                    <button
                        style={activeView === 'list' ? styles.activeBtn : styles.btn}
                        onClick={() => setActiveView('list')}
                    >
                        📋 Lista
                    </button>
                    <button
                        style={activeView === 'calendar' ? styles.activeBtn : styles.btn}
                        onClick={() => setActiveView('calendar')}
                    >
                        📅 Horarios
                    </button>
                    <button
                        className="btn-primary"
                        style={{ background: 'var(--accent)' }}
                        onClick={() => setShowAddModal(true)}
                    >
                        + Agregar Profesional
                    </button>
                </div>
            </header>

            {/* List View */}
            {activeView === 'list' && (
                <div style={styles.grid}>
                    {activeProfessionals.map(prof => {
                        const stats = getProfessionalStats(prof.id);
                        return (
                            <div key={prof.id} className="bento-card" style={styles.profCard}>
                                <div style={styles.profHeader}>
                                    <div style={{ ...styles.profAvatar, background: prof.color }}>
                                        {prof.name.split(' ').map(n => n[0]).join('')}
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <h3 style={styles.profName}>{prof.name}</h3>
                                        <div style={styles.profRole}>{prof.role}</div>
                                        <div style={styles.profSpecialty}>{prof.specialty}</div>
                                    </div>
                                    <button
                                        style={styles.editBtn}
                                        onClick={() => {
                                            setSelectedProfessional(prof);
                                            setActiveView('profile');
                                        }}
                                    >
                                        ✏️ Editar
                                    </button>
                                </div>

                                <div style={styles.profStats}>
                                    <div style={styles.statItem}>
                                        <div style={styles.statValue}>{stats.totalAppointments}</div>
                                        <div style={styles.statLabel}>Citas</div>
                                    </div>
                                    <div style={styles.statItem}>
                                        <div style={styles.statValue}>${(stats.revenue / 1000).toFixed(0)}k</div>
                                        <div style={styles.statLabel}>Ingresos</div>
                                    </div>
                                    <div style={styles.statItem}>
                                        <div style={styles.statValue}>{stats.confirmedRate.toFixed(0)}%</div>
                                        <div style={styles.statLabel}>Asistencia</div>
                                    </div>
                                </div>

                                <div style={styles.profContact}>
                                    <div style={styles.contactItem}>📧 {prof.email}</div>
                                    <div style={styles.contactItem}>📱 {prof.phone}</div>
                                    <div style={styles.contactItem}>💰 ${prof.consultationPrice.toLocaleString()} / consulta</div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Calendar View */}
            {activeView === 'calendar' && (
                <div className="bento-card" style={{ padding: '30px' }}>
                    <h2 style={{ marginBottom: '30px' }}>Horarios de Atención por Profesional</h2>
                    <div style={styles.scheduleGrid}>
                        {activeProfessionals.map(prof => (
                            <div key={prof.id} style={styles.scheduleCard}>
                                <div style={styles.scheduleHeader}>
                                    <div style={{ ...styles.scheduleAvatar, background: prof.color }}>
                                        {prof.name.split(' ').map(n => n[0]).join('')}
                                    </div>
                                    <div>
                                        <div style={styles.scheduleName}>{prof.name}</div>
                                        <div style={styles.scheduleRole}>{prof.role}</div>
                                    </div>
                                </div>
                                <div style={styles.scheduleBody}>
                                    {days.map(day => (
                                        prof.schedule[day].enabled && (
                                            <div key={day} style={styles.scheduleRow}>
                                                <div style={styles.scheduleDay}>{dayLabels[day]}</div>
                                                <div style={styles.scheduleTime}>
                                                    {prof.schedule[day].start} - {prof.schedule[day].end}
                                                </div>
                                            </div>
                                        )
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Profile View */}
            {activeView === 'profile' && selectedProfessional && (
                <div>
                    <button style={styles.backBtn} onClick={() => setActiveView('list')}>
                        ← Volver a la lista
                    </button>
                    <div className="bento-card" style={{ padding: '40px', marginTop: '20px' }}>
                        <div style={styles.profileHeader}>
                            <div style={{ ...styles.profileAvatar, background: selectedProfessional.color }}>
                                {selectedProfessional.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div style={{ flex: 1 }}>
                                <h1 style={styles.profileName}>{selectedProfessional.name}</h1>
                                <div style={styles.profileRole}>{selectedProfessional.role} - {selectedProfessional.specialty}</div>
                            </div>
                        </div>

                        <div style={styles.profileGrid}>
                            <div>
                                <h3 style={styles.sectionTitle}>Información de Contacto</h3>
                                <div style={styles.infoGroup}>
                                    <label style={styles.label}>Email</label>
                                    <input type="email" style={styles.input} value={selectedProfessional.email} readOnly />
                                </div>
                                <div style={styles.infoGroup}>
                                    <label style={styles.label}>Teléfono</label>
                                    <input type="tel" style={styles.input} value={selectedProfessional.phone} readOnly />
                                </div>
                                <div style={styles.infoGroup}>
                                    <label style={styles.label}>Precio Consulta</label>
                                    <input type="number" style={styles.input} value={selectedProfessional.consultationPrice} readOnly />
                                </div>
                            </div>

                            <div>
                                <h3 style={styles.sectionTitle}>Horario de Atención</h3>
                                {days.map(day => (
                                    <div key={day} style={styles.scheduleEditRow}>
                                        <label style={styles.dayCheckbox}>
                                            <input
                                                type="checkbox"
                                                checked={selectedProfessional.schedule[day].enabled}
                                                disabled
                                            />
                                            <span style={{ marginLeft: '10px', fontWeight: '600' }}>{dayLabels[day]}</span>
                                        </label>
                                        {selectedProfessional.schedule[day].enabled && (
                                            <div style={styles.timeInputs}>
                                                <input
                                                    type="time"
                                                    style={styles.timeInput}
                                                    value={selectedProfessional.schedule[day].start}
                                                    disabled
                                                />
                                                <span>-</span>
                                                <input
                                                    type="time"
                                                    style={styles.timeInput}
                                                    value={selectedProfessional.schedule[day].end}
                                                    disabled
                                                />
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div style={{ marginTop: '30px' }}>
                            <h3 style={styles.sectionTitle}>Descripción Profesional</h3>
                            <textarea
                                style={{ ...styles.input, minHeight: '100px' }}
                                value={selectedProfessional.description}
                                readOnly
                            />
                        </div>
                    </div>
                </div>
            )}

            {/* Add Professional Modal */}
            {showAddModal && (
                <div style={styles.modalOverlay} onClick={() => setShowAddModal(false)}>
                    <div className="bento-card" style={styles.modal} onClick={e => e.stopPropagation()}>
                        <h2 style={{ marginBottom: '30px' }}>Agregar Nuevo Profesional</h2>

                        <div style={styles.modalGrid}>
                            <div style={styles.formGroup}>
                                <label style={styles.label}>Nombre Completo *</label>
                                <input
                                    type="text"
                                    style={styles.input}
                                    value={newProfessional.name}
                                    onChange={(e) => setNewProfessional({ ...newProfessional, name: e.target.value })}
                                    placeholder="Dr. Juan Pérez"
                                />
                            </div>

                            <div style={styles.formGroup}>
                                <label style={styles.label}>Rol/Título *</label>
                                <input
                                    type="text"
                                    style={styles.input}
                                    value={newProfessional.role}
                                    onChange={(e) => setNewProfessional({ ...newProfessional, role: e.target.value })}
                                    placeholder="Medicina General"
                                />
                            </div>

                            <div style={styles.formGroup}>
                                <label style={styles.label}>Especialidad *</label>
                                <input
                                    type="text"
                                    style={styles.input}
                                    value={newProfessional.specialty}
                                    onChange={(e) => setNewProfessional({ ...newProfessional, specialty: e.target.value })}
                                    placeholder="Cardiología"
                                />
                            </div>

                            <div style={styles.formGroup}>
                                <label style={styles.label}>Email *</label>
                                <input
                                    type="email"
                                    style={styles.input}
                                    value={newProfessional.email}
                                    onChange={(e) => setNewProfessional({ ...newProfessional, email: e.target.value })}
                                    placeholder="doctor@cmdelvalle.cl"
                                />
                            </div>

                            <div style={styles.formGroup}>
                                <label style={styles.label}>Teléfono *</label>
                                <input
                                    type="tel"
                                    style={styles.input}
                                    value={newProfessional.phone}
                                    onChange={(e) => setNewProfessional({ ...newProfessional, phone: e.target.value })}
                                    placeholder="+56912345678"
                                />
                            </div>

                            <div style={styles.formGroup}>
                                <label style={styles.label}>Precio Consulta *</label>
                                <input
                                    type="number"
                                    style={styles.input}
                                    value={newProfessional.consultationPrice}
                                    onChange={(e) => setNewProfessional({ ...newProfessional, consultationPrice: parseInt(e.target.value) })}
                                />
                            </div>

                            <div style={{ ...styles.formGroup, gridColumn: 'span 2' }}>
                                <label style={styles.label}>Descripción</label>
                                <textarea
                                    style={{ ...styles.input, minHeight: '80px' }}
                                    value={newProfessional.description}
                                    onChange={(e) => setNewProfessional({ ...newProfessional, description: e.target.value })}
                                    placeholder="Breve descripción del profesional..."
                                />
                            </div>
                        </div>

                        <div style={{ display: 'flex', gap: '15px', marginTop: '30px' }}>
                            <button
                                className="btn-primary"
                                style={{ flex: 1 }}
                                onClick={handleAddProfessional}
                            >
                                Agregar Profesional
                            </button>
                            <button
                                style={{ ...styles.cancelBtn, flex: 1 }}
                                onClick={() => setShowAddModal(false)}
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const styles = {
    container: { padding: '40px' },
    header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' },
    title: { fontSize: '2.5rem', fontWeight: '900', marginBottom: '5px', letterSpacing: '-1.5px' },
    subtitle: { color: '#64748b' },
    headerActions: { display: 'flex', gap: '10px' },
    btn: { background: 'white', border: '1px solid #e2e8f0', padding: '10px 20px', borderRadius: '12px', cursor: 'pointer', fontWeight: '600', color: '#64748b' },
    activeBtn: { background: 'var(--primary)', border: 'none', padding: '10px 20px', borderRadius: '12px', cursor: 'pointer', fontWeight: '700', color: 'white' },

    grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '25px' },
    profCard: { padding: '25px' },
    profHeader: { display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px', paddingBottom: '20px', borderBottom: '2px solid #f1f5f9' },
    profAvatar: { width: '60px', height: '60px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: '900', fontSize: '1.2rem' },
    profName: { fontSize: '1.2rem', fontWeight: '800', marginBottom: '5px' },
    profRole: { fontSize: '0.85rem', color: 'var(--primary)', fontWeight: '700' },
    profSpecialty: { fontSize: '0.8rem', color: '#94a3b8' },
    editBtn: { background: '#f8fafc', border: '1px solid #e2e8f0', padding: '8px 16px', borderRadius: '10px', cursor: 'pointer', fontWeight: '600', fontSize: '0.85rem' },

    profStats: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px', marginBottom: '20px' },
    statItem: { textAlign: 'center', padding: '15px', background: '#f8fafc', borderRadius: '12px' },
    statValue: { fontSize: '1.8rem', fontWeight: '900', color: 'var(--primary)', marginBottom: '5px' },
    statLabel: { fontSize: '0.75rem', color: '#64748b', fontWeight: '600' },

    profContact: { display: 'flex', flexDirection: 'column', gap: '8px' },
    contactItem: { fontSize: '0.85rem', padding: '8px 12px', background: '#f8fafc', borderRadius: '8px' },

    scheduleGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' },
    scheduleCard: { background: '#f8fafc', borderRadius: '16px', padding: '20px' },
    scheduleHeader: { display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px', paddingBottom: '15px', borderBottom: '2px solid #e2e8f0' },
    scheduleAvatar: { width: '45px', height: '45px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: '900' },
    scheduleName: { fontWeight: '800', fontSize: '1rem' },
    scheduleRole: { fontSize: '0.75rem', color: '#64748b' },
    scheduleBody: { display: 'flex', flexDirection: 'column', gap: '10px' },
    scheduleRow: { display: 'flex', justifyContent: 'space-between', padding: '10px', background: 'white', borderRadius: '10px' },
    scheduleDay: { fontWeight: '700', fontSize: '0.85rem' },
    scheduleTime: { fontSize: '0.85rem', color: '#64748b', fontWeight: '600' },

    backBtn: { background: '#f1f5f9', border: 'none', padding: '10px 20px', borderRadius: '12px', color: 'var(--primary)', fontWeight: '700', cursor: 'pointer' },
    profileHeader: { display: 'flex', alignItems: 'center', gap: '25px', marginBottom: '40px', paddingBottom: '30px', borderBottom: '3px solid #f1f5f9' },
    profileAvatar: { width: '100px', height: '100px', borderRadius: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: '900', fontSize: '2.5rem' },
    profileName: { fontSize: '2.5rem', fontWeight: '900', marginBottom: '10px' },
    profileRole: { fontSize: '1.1rem', color: '#64748b', fontWeight: '600' },
    profileGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' },
    sectionTitle: { fontSize: '1.2rem', fontWeight: '800', marginBottom: '20px', color: '#1e293b' },
    infoGroup: { marginBottom: '20px' },
    label: { display: 'block', fontWeight: '700', marginBottom: '8px', fontSize: '0.9rem', color: '#1e293b' },
    input: { width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '1rem', fontFamily: 'inherit' },
    scheduleEditRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px', padding: '12px', background: '#f8fafc', borderRadius: '10px' },
    dayCheckbox: { display: 'flex', alignItems: 'center', cursor: 'pointer' },
    timeInputs: { display: 'flex', alignItems: 'center', gap: '10px' },
    timeInput: { padding: '8px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '0.9rem' },

    modalOverlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10000 },
    modal: { width: '700px', maxHeight: '90vh', overflowY: 'auto', padding: '40px' },
    modalGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' },
    formGroup: { display: 'flex', flexDirection: 'column' },
    cancelBtn: { background: 'white', border: '1px solid #e2e8f0', padding: '12px', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }
};

export default ProfessionalsManagement;
