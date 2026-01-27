import React, { useState } from 'react';
import {
    Search, CheckCircle, XCircle, Plus,
    ChevronLeft, ChevronRight, Filter, Settings
} from 'lucide-react';

/* 
   NOTE: This template requires a Store/Context to function fully.
   It expects 'appointments', 'professionals', 'patients' to be passed or retrieved.
*/

const timeSlots = ['09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00'];

const APPOINTMENT_STATUS = {
    CONFIRMED: 'confirmed',
    ATTENDED: 'attended',
    PENDING: 'pending',
    NO_SHOW: 'no_show',
    BLOCK: 'block'
};

const AppointmentCard = ({ app, patient, getAppStyle }) => (
    <div
        style={{ ...styles.appointment, ...getAppStyle(app.status) }}
        className="appointment-card"
    >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
            <div style={styles.appTitle}>{patient?.name || 'Cita'}</div>
        </div>
        <div style={styles.appSubtitle}>
            {app.observation || 'Consulta General'}
        </div>
    </div>
);

const AgendaTemplate = () => {
    // Mock Data for Template Visualization
    const appointments = [];
    const professionals = [{ id: 1, name: 'Dr. Example', specialty: 'General', color: '#004975' }];
    const patients = [];

    const [selectedProf, setSelectedProf] = useState(professionals[0]);
    const [viewMode, setViewMode] = useState('week');

    // Helper functionality
    const getStatusColor = (status) => {
        switch (status) {
            case APPOINTMENT_STATUS.CONFIRMED: return '#3b82f6';
            case APPOINTMENT_STATUS.ATTENDED: return '#10b981';
            case APPOINTMENT_STATUS.PENDING: return '#f59e0b';
            case APPOINTMENT_STATUS.NO_SHOW: return '#ef4444';
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
                            <div style={{ fontWeight: '800', fontSize: '1rem' }}>{selectedProf.name}</div>
                            <p style={styles.profSub}>{selectedProf.specialty}</p>
                        </div>
                    </div>

                    <div style={styles.dateNav}>
                        <button style={styles.navBtn}><ChevronLeft size={20} /></button>
                        <div style={styles.currentDate}>Semana Actual</div>
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

                    <button className="btn-primary">
                        <Plus size={20} />
                        <span>Nueva Cita</span>
                    </button>
                </div>
            </header>

            {/* Calendar Grid */}
            <div className="bento-card" style={styles.calendarContainer}>
                <div style={{ ...styles.calHeader }} className="sticky-header">
                    <div style={styles.timeEmpty}>HORA</div>
                    {['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'].map(day => (
                        <div key={day} style={styles.dayCol}>{day}</div>
                    ))}
                </div>

                <div style={styles.calBody}>
                    {timeSlots.map(time => (
                        <div key={time} style={styles.timeRow}>
                            <div style={styles.timeLabel}>{time}</div>
                            {[0, 1, 2, 3, 4, 5].map(day => (
                                <div key={day} style={styles.slot}>
                                    {/* Map appointments here */}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>

            <style>{`
                .appointment-card:hover .actions { opacity: 1 !important; transform: translateX(0); }
                .appointment-card { position: relative; transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1); cursor: pointer; overflow: hidden; }
                .appointment-card:hover { transform: translateY(-3px); z-index: 10; box-shadow: 0 12px 24px rgba(0,0,0,0.15); }
                .sticky-header { position: sticky; top: 0; z-index: 20; background: #fff; }
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
    profSub: { fontSize: '0.75rem', color: '#64748b', fontWeight: '600' },
    dateNav: { display: 'flex', alignItems: 'center', gap: '15px', background: '#fff', padding: '10px 20px', borderRadius: '15px', border: '1.5px solid #e2e8f0' },
    currentDate: { fontWeight: '800', fontSize: '0.9rem', color: '#1e293b' },
    navBtn: { border: 'none', background: 'none', cursor: 'pointer', color: '#94a3b8' },
    headerActions: { display: 'flex', gap: '15px', alignItems: 'center' },
    viewToggle: { display: 'flex', background: '#fff', borderRadius: '12px', padding: '4px', border: '1.5px solid #e2e8f0' },
    toggleBtn: { padding: '8px 16px', border: 'none', cursor: 'pointer', fontSize: '0.8rem', fontWeight: '800', transition: 'all 0.2s' },
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
    appSubtitle: { fontSize: '0.7rem', opacity: 0.8, fontWeight: '600', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }
};

export default AgendaTemplate;
