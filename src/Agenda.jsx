import React, { useState, useEffect, useMemo } from 'react';
import {
    Plus, Settings, Calendar, User, Clock, Check, X,
    Shield, AlertTriangle, ChevronLeft, ChevronRight,
    Search, Filter, LayoutGrid, List, RefreshCw, Trash2, FileText, MessageSquare, Mail, MessageCircle
} from 'lucide-react';
import { useSaaSStore } from './store';

const timeSlots = [
    '08:00', '08:15', '08:30', '08:45',
    '09:00', '09:15', '09:30', '09:45',
    '10:00', '10:15', '10:30', '10:45',
    '11:00', '11:15', '11:30', '11:45',
    '12:00', '12:15', '12:30', '12:45',
    '13:00', '13:15', '13:30', '13:45',
    '14:00', '14:15', '14:30', '14:45',
    '15:00', '15:15', '15:30', '15:45',
    '16:00', '16:15', '16:30', '16:45',
    '17:00', '17:15', '17:30', '17:45',
    '18:00', '18:15', '18:30', '18:45',
    '19:00', '19:15', '19:30', '19:45'
];

const Agenda = ({ onOpenPatient, initialProfId }) => {
    const {
        appointments,
        patients,
        professionals,
        APPOINTMENT_STATUS,
        addAppointment,
        deleteAppointment,
        fetchInitialData
    } = useSaaSStore();

    const [currentView, setCurrentView] = useState('individual');
    const [currentDate, setCurrentDate] = useState(new Date());
    const [viewBy, setViewBy] = useState('professional');
    const [selectedResourceId, setSelectedResourceId] = useState(initialProfId || null);
    const [showNewAppt, setShowNewAppt] = useState(false);
    const [showApptDetails, setShowApptDetails] = useState(false);
    const [selectedAppt, setSelectedAppt] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    const [newApptData, setNewApptData] = useState({
        patientId: '',
        time: '09:00',
        date: '',
        notes: '',
        title: 'Consulta Médica',
        isBlock: false
    });

    const activeProfessionals = useMemo(() => (professionals || []).filter(p => p.active), [professionals]);

    useEffect(() => {
        // If no resource selected OR selection no longer exists in active list, pick first
        const exists = activeProfessionals.find(p => String(p.id) === String(selectedResourceId));
        if (activeProfessionals.length > 0 && (!selectedResourceId || !exists)) {
            setSelectedResourceId(String(activeProfessionals[0].id));
        }
    }, [activeProfessionals, selectedResourceId]);

    const formatIsoDate = (date) => {
        if (!date) return '';
        try {
            const d = new Date(date);
            if (isNaN(d.getTime())) return '';
            return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
        } catch (e) { return ''; }
    };

    const selectedProf = activeProfessionals.find(p => String(p.id) === String(selectedResourceId));

    const navigateDate = (days) => {
        const next = new Date(currentDate);
        next.setDate(next.getDate() + days);
        setCurrentDate(next);
    };

    const goToToday = () => {
        setCurrentDate(new Date());
    };

    const weekDates = useMemo(() => {
        const dates = [];
        const base = new Date(currentDate);
        const day = base.getDay();
        const diff = base.getDate() - day + (day === 0 ? -6 : 1);
        const monday = new Date(base.setDate(diff));

        for (let i = 0; i < 7; i++) {
            const d = new Date(monday);
            d.setDate(monday.getDate() + i);
            const names = ['Dom', 'Lun', 'Mar', 'Mar', 'Jue', 'Vie', 'Sab'];
            dates.push({
                label: `${names[d.getDay()]} ${d.getDate()}/${d.getMonth() + 1}`,
                iso: formatIsoDate(d)
            });
        }
        return dates;
    }, [currentDate]);

    const handleCreateAppt = async (e) => {
        e.preventDefault();
        try {
            const startStr = `${newApptData.date}T${newApptData.time}:00`;
            const startDate = new Date(startStr);
            const endDate = new Date(startDate.getTime() + 15 * 60000);

            await addAppointment({
                ...newApptData,
                title: newApptData.isBlock ? 'HORA BLOQUEADA' : (newApptData.title || 'Consulta Médica'),
                status: newApptData.isBlock ? 'block' : 'pending',
                profId: selectedResourceId,
                start: startDate,
                end: endDate,
            });
            setShowNewAppt(false);
            setNewApptData({ patientId: '', time: '09:00', date: '', notes: '', title: 'Consulta Médica', isBlock: false });
        } catch (error) {
            alert("Error al agendar. Seleccione un paciente.");
        }
    };

    const handleDeleteAppt = async (id) => {
        if (window.confirm("¿Está seguro que desea cancelar esta cita?")) {
            await deleteAppointment(id);
            setShowApptDetails(false);
        }
    };

    const filteredAppointments = (appointments || []).filter(a => String(a.profId) === String(selectedResourceId));

    return (
        <div style={styles.container}>
            {/* VIEW TABS */}
            <nav style={styles.viewTabs}>
                {[
                    { id: 'individual', label: 'Calendario Semanal' },
                    { id: 'multiple', label: 'Agenda Diaria (Equipo)' },
                    { id: 'list', label: 'Listado de Citas (Pacientes)' }
                ].map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setCurrentView(tab.id)}
                        style={{
                            ...styles.viewTab,
                            color: currentView === tab.id ? '#004975' : '#64748b',
                            borderBottom: currentView === tab.id ? '2px solid #004975' : 'none'
                        }}
                    >
                        {tab.label}
                    </button>
                ))}
            </nav>

            {/* ACTION BAR */}
            <div style={styles.actionBar}>
                <div style={styles.navGroup}>
                    <button style={styles.iconBtn} onClick={() => navigateDate(-1)}><ChevronLeft size={18} /></button>
                    <div style={styles.dateDisplay}>
                        {currentDate.toLocaleDateString('es-CL', { day: '2-digit', month: '2-digit', year: 'numeric' })}
                    </div>
                    <button style={styles.iconBtn} onClick={() => navigateDate(1)}><ChevronRight size={18} /></button>
                    <button style={styles.todayBtn} onClick={goToToday}>Hoy</button>
                </div>

                <div style={styles.toggleGroup}>
                    <button
                        style={{ ...styles.toggleBtn, background: viewBy === 'professional' ? '#e0f2fe' : '#fff' }}
                        onClick={() => setViewBy('professional')}
                    >
                        Ver por profesional
                    </button>
                    <button
                        style={{ ...styles.toggleBtn, background: viewBy === 'box' ? '#e0f2fe' : '#fff' }}
                        onClick={() => setViewBy('box')}
                    >
                        Ver por box
                    </button>
                </div>

                <select
                    style={styles.resourceSelect}
                    value={selectedResourceId}
                    onChange={(e) => setSelectedResourceId(e.target.value)}
                >
                    {activeProfessionals.map(p => (
                        <option key={p.id} value={p.id}>{p.specialty || 'Box'} - {p.name}</option>
                    ))}
                </select>

                <div style={styles.searchWrapper}>
                    <div style={styles.searchBox}>
                        <Search size={16} color="#94a3b8" />
                        <input
                            placeholder="Buscar paciente para ficha..."
                            style={styles.searchInput}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    {searchQuery.length > 2 && (
                        <div style={styles.searchResults}>
                            {((patients || []).filter(p => ((p?.name || '').toLowerCase().includes(searchQuery.toLowerCase()) || (p?.rut || '').includes(searchQuery)))).slice(0, 5).map(p => (
                                <div key={p?.id || p?.rut || Math.random()} style={styles.searchItem} onClick={() => { onOpenPatient(p); setSearchQuery(''); }}>
                                    <div style={styles.miniAvatar}>{p?.name?.charAt(0) || '?'}</div>
                                    <div>
                                        <div style={{ fontWeight: '700', fontSize: '0.85rem' }}>{p?.name || 'Sin nombre'}</div>
                                        <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{p?.rut || 'Sin RUT'}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <button style={styles.refreshBtn} onClick={fetchInitialData}>
                    <RefreshCw size={16} />
                    <span>Actualizar</span>
                </button>
            </div>

            {/* MAIN TITLE */}
            <div style={styles.titleArea}>
                <h1 style={styles.mainTitle}>
                    {selectedProf ? (
                        `${selectedProf.specialty || 'Especialista'}: ${selectedProf.name.toUpperCase()}`
                    ) : (
                        'No hay profesionales configurados'
                    )}
                </h1>
                <Settings size={20} color="#004975" style={{ cursor: 'pointer' }} />
            </div>

            {/* CALENDAR / LIST VIEW */}
            <div style={styles.gridContainer}>
                {currentView === 'list' ? (
                    <div style={{ padding: '20px', overflowY: 'auto', background: '#fff', height: '100%' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ borderBottom: '2px solid #f1f5f9', textAlign: 'left' }}>
                                    <th style={{ padding: '12px', color: '#94a3b8', fontSize: '0.75rem', textTransform: 'uppercase' }}>Hora</th>
                                    <th style={{ padding: '12px', color: '#94a3b8', fontSize: '0.75rem', textTransform: 'uppercase' }}>Paciente</th>
                                    <th style={{ padding: '12px', color: '#94a3b8', fontSize: '0.75rem', textTransform: 'uppercase' }}>Motivo</th>
                                    <th style={{ padding: '12px', color: '#94a3b8', fontSize: '0.75rem', textTransform: 'uppercase' }}>Estado</th>
                                    <th style={{ padding: '12px', color: '#94a3b8', fontSize: '0.75rem', textTransform: 'uppercase' }}>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {(appointments || [])
                                    .filter(a => formatIsoDate(a.start) === formatIsoDate(currentDate) && String(a.profId) === String(selectedResourceId))
                                    .sort((a, b) => a.start - b.start)
                                    .map(app => (
                                        <tr key={app.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                            <td style={{ padding: '12px', fontSize: '0.9rem', fontWeight: '700' }}>{app.start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
                                            <td style={{ padding: '12px', fontSize: '0.9rem' }}>{(patients || []).find(p => String(p?.id) === String(app?.patientId))?.name || 'NP: ' + (app?.title || 'Cita')}</td>
                                            <td style={{ padding: '12px', fontSize: '0.85rem', color: '#64748b' }}>{app.notes || 'Consulta General'}</td>
                                            <td style={{ padding: '12px' }}>
                                                <span style={{ padding: '4px 8px', borderRadius: '6px', fontSize: '0.7rem', fontWeight: '700', background: '#e0f2fe', color: '#004975' }}>
                                                    {app.status === 'attended' ? 'Atendido' : 'Agendado'}
                                                </span>
                                            </td>
                                            <td style={{ padding: '12px' }}>
                                                <button
                                                    onClick={() => { setSelectedAppt(app); setShowApptDetails(true); }}
                                                    style={{ border: 'none', background: '#004975', color: '#fff', padding: '6px 12px', borderRadius: '6px', fontSize: '0.75rem', cursor: 'pointer' }}
                                                >
                                                    Gestionar
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                        {(!appointments || (appointments || []).length === 0 || (appointments || []).filter(a => formatIsoDate(a?.start) === formatIsoDate(currentDate) && String(a?.profId) === String(selectedResourceId)).length === 0) && (
                            <div style={{ padding: '40px', textAlign: 'center', color: '#94a3b8' }}>No hay pacientes agendados para este día.</div>
                        )}
                    </div>
                ) : (
                    <>
                        <div style={styles.gridHeader}>
                            <div style={styles.timeColHeader}></div>
                            {currentView === 'individual' ? (
                                weekDates.map(day => (
                                    <div key={day.iso} style={styles.dayHeader}>{day.label}</div>
                                ))
                            ) : currentView === 'multiple' ? (
                                activeProfessionals.map(p => (
                                    <div key={p.id} style={styles.dayHeader}>{p.name.split(' ')[0]}</div>
                                ))
                            ) : (
                                <div style={styles.dayHeader}>
                                    {currentDate.toLocaleDateString('es-CL', { weekday: 'long', day: 'numeric', month: 'long' }).toUpperCase()}
                                </div>
                            )}
                        </div>

                        <div style={styles.gridBody}>
                            {timeSlots.map(time => (
                                <div key={time} style={styles.gridRow}>
                                    <div style={styles.timeLabel}>{time}</div>

                                    {currentView === 'individual' ? (
                                        weekDates.map(day => {
                                            const dayAppts = filteredAppointments.filter(a => formatIsoDate(a.start) === day.iso && (String(a.start.getHours()).padStart(2, '0') + ':' + String(a.start.getMinutes()).padStart(2, '0')) === time);
                                            return (
                                                <div key={day.iso} style={styles.gridSlot} onClick={() => { setNewApptData({ ...newApptData, date: day.iso, time }); setShowNewAppt(true); }}>
                                                    {dayAppts.map(app => (
                                                        <div key={app?.id} style={{ ...styles.appointmentChip, background: '#f9d5d3', borderColor: '#94a3b8', color: '#1e293b' }} onClick={(e) => { e.stopPropagation(); setSelectedAppt(app); setShowApptDetails(true); }}>
                                                            <MessageSquare size={12} style={{ marginRight: '5px', fill: '#fff', color: '#94a3b8' }} />
                                                            <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>NP: {(patients || []).find(p => String(p?.id) === String(app?.patientId))?.name || app?.title || 'Cita'}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            );
                                        })
                                    ) : currentView === 'multiple' ? (
                                        activeProfessionals.map(p => {
                                            const dayIso = formatIsoDate(currentDate);
                                            const profAppts = (appointments || []).filter(a => String(a.profId) === String(p.id) && formatIsoDate(a.start) === dayIso && (String(a.start.getHours()).padStart(2, '0') + ':' + String(a.start.getMinutes()).padStart(2, '0')) === time);
                                            return (
                                                <div key={p.id} style={styles.gridSlot} onClick={() => { setSelectedResourceId(p.id); setNewApptData({ ...newApptData, date: dayIso, time }); setShowNewAppt(true); }}>
                                                    {profAppts.map(app => (
                                                        <div key={app.id} style={{ ...styles.appointmentChip, background: '#f9d5d3' }} onClick={(e) => { e.stopPropagation(); setSelectedAppt(app); setShowApptDetails(true); }}>
                                                            <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{(patients || []).find(pat => String(pat.id) === String(app.patientId))?.name?.split(' ')[0] || 'NP'}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            );
                                        })
                                    ) : (
                                        <div style={styles.gridSlot} onClick={() => { setNewApptData({ ...newApptData, date: formatIsoDate(currentDate), time }); setShowNewAppt(true); }}>
                                            {(filteredAppointments || []).filter(a => formatIsoDate(a?.start) === formatIsoDate(currentDate) && (String(new Date(a?.start).getHours()).padStart(2, '0') + ':' + String(new Date(a?.start).getMinutes()).padStart(2, '0')) === time).map(app => (
                                                <div key={app?.id} style={styles.appointmentChip} onClick={(e) => { e.stopPropagation(); setSelectedAppt(app); setShowApptDetails(true); }}>
                                                    <span>{(patients || []).find(p => String(p?.id) === String(app?.patientId))?.name || app?.title || 'Cita'}</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>

            {/* NEW APPOINTMENT MODAL */}
            {showNewAppt && (
                <div style={styles.overlay}>
                    <div style={styles.modal} className="glass-panel animate-reveal">
                        <header style={styles.modalHeader}>
                            <h3>Agendar Nueva Cita</h3>
                            <button onClick={() => setShowNewAppt(false)} style={styles.closeBtn}>✕</button>
                        </header>
                        <form onSubmit={handleCreateAppt} style={styles.form}>
                            <div style={{ ...styles.field, flexDirection: 'row', alignItems: 'center', gap: '10px', background: '#f8fafc', padding: '10px', borderRadius: '12px' }}>
                                <input
                                    type="checkbox"
                                    id="isBlock"
                                    checked={newApptData.isBlock || false}
                                    onChange={e => setNewApptData({ ...newApptData, isBlock: e.target.checked })}
                                />
                                <label htmlFor="isBlock" style={{ ...styles.label, marginBottom: 0, cursor: 'pointer' }}>Bloquear esta hora (No requiere paciente)</label>
                            </div>

                            {!newApptData.isBlock && (
                                <div style={styles.field}>
                                    <label style={styles.label}>Paciente</label>
                                    <select value={newApptData.patientId} onChange={e => setNewApptData({ ...newApptData, patientId: e.target.value })} required={!newApptData.isBlock} style={styles.input}>
                                        <option value="">Seleccione...</option>
                                        {patients && patients.length > 0 ? patients.map(p => <option key={p.id} value={p.id}>{p.name} ({p.rut})</option>) : <option disabled>No hay pacientes registrados</option>}
                                    </select>
                                </div>
                            )}
                            <div style={styles.row}>
                                <div style={styles.field}>
                                    <label style={styles.label}>Fecha</label>
                                    <input type="date" value={newApptData.date} onChange={e => setNewApptData({ ...newApptData, date: e.target.value })} required style={styles.input} />
                                </div>
                                <div style={styles.field}>
                                    <label style={styles.label}>Hora</label>
                                    <select value={newApptData.time} onChange={e => setNewApptData({ ...newApptData, time: e.target.value })} required style={styles.input}>
                                        {timeSlots.map(t => <option key={t} value={t}>{t}</option>)}
                                    </select>
                                </div>
                            </div>
                            <div style={styles.field}>
                                <label style={styles.label}>Motivo / Notas</label>
                                <textarea placeholder="Escriba aquí observaciones del agendamiento..." value={newApptData.notes} onChange={e => setNewApptData({ ...newApptData, notes: e.target.value })} style={styles.textarea} rows={3} />
                            </div>
                            <div style={styles.modalFooter}>
                                <button type="button" onClick={() => setShowNewAppt(false)} style={styles.cancelLink}>Cancelar</button>
                                <button type="submit" className="btn-primary" style={{ padding: '12px 25px', borderRadius: '12px' }}>Confirmar Cita</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* APPOINTMENT ACTIONS MODAL */}
            {showApptDetails && selectedAppt && (
                <div style={styles.overlay}>
                    <div style={{ ...styles.modal, width: '700px' }} className="glass-panel animate-slide">
                        <header style={styles.modalHeader}>
                            <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#004975' }}>Información de la cita</h3>
                            <button onClick={() => setShowApptDetails(false)} style={styles.closeBtn}>✕</button>
                        </header>

                        <div style={styles.reservoGrid}>
                            <div style={styles.leftCol}>
                                <div style={styles.fieldRow}><span>Nombre:</span> <div style={styles.fieldValue}>{(patients || []).find(p => String(p?.id) === String(selectedAppt?.patientId))?.name || 'NP: ' + (selectedAppt?.title || 'Sin Título')}</div></div>
                                <div style={styles.fieldRow}><span>Estado:</span> <div style={styles.fieldValue}>{selectedAppt?.status === 'confirmed' ? 'Confirmado' : 'No Confirmado'}</div></div>
                                <div style={styles.fieldRow}><span>Pago:</span> <select style={styles.selectSmall}><option>No Pagado</option><option>Pagado</option></select></div>
                                <div style={styles.fieldRow}><span>Teléfono:</span> <div style={styles.fieldValue}>{(patients || []).find(p => String(p?.id) === String(selectedAppt?.patientId))?.phone || 'N/A'}</div></div>
                                <div style={styles.fieldRow}><span>Correo:</span> <div style={styles.fieldValue}>{(patients || []).find(p => String(p?.id) === String(selectedAppt?.patientId))?.email || 'N/A'}</div></div>

                                <div style={{ display: 'flex', gap: '20px', marginTop: '15px' }}>
                                    <Mail size={20} color="#004975" cursor="pointer" />
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#004975', fontWeight: 'bold', fontSize: '0.85rem' }}><Plus size={16} /> datos</div>
                                    <MessageCircle size={20} color="#25D366" cursor="pointer" onClick={() => {
                                        const p = patients.find(p => String(p.id) === String(selectedAppt.patientId));
                                        if (p && p.phone) {
                                            const phone = p.phone.replace(/\+/g, '').replace(/\s/g, '');
                                            window.open(`https://wa.me/${phone}`, '_blank');
                                        }
                                    }} />
                                </div>
                            </div>

                            <div style={styles.rightCol}>
                                <div style={styles.fieldRow}><span>Fecha:</span> <div style={styles.fieldValue}>{selectedAppt.start instanceof Date ? selectedAppt.start.toLocaleDateString() : 'N/A'}</div></div>
                                <div style={styles.fieldRow}><span>Inicio:</span> <div style={styles.fieldValue}>{selectedAppt.start instanceof Date ? selectedAppt.start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'N/A'}</div></div>
                                <div style={styles.fieldRow}><span>Fin:</span> <div style={styles.fieldValue}>{selectedAppt.end instanceof Date ? selectedAppt.end.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'N/A'}</div></div>
                                <div style={styles.fieldRow}><span>Servicio:</span> <div style={styles.fieldValue}>{selectedAppt.title || 'Consulta'}</div></div>
                                <div style={styles.fieldRow}><span>Profesional:</span> <div style={styles.fieldValue}>{selectedProf?.name || 'No asignado'}</div></div>
                                <div style={styles.fieldRow}><span>Agenda:</span> <div style={styles.fieldValue}>Box 1 : {selectedProf?.specialty?.toUpperCase() || 'GENERAL'}</div></div>
                                <div style={styles.fieldRow}><span>Comentario:</span> <textarea style={styles.textAreaSmall} defaultValue={selectedAppt.notes || 'Reserva Online'} readOnly /></div>
                            </div>
                        </div>

                        <div style={styles.reservoFooter}>
                            <div style={{ display: 'flex', gap: '15px' }}>
                                <button style={styles.linkBtn}>Historico</button>
                                <button style={styles.linkBtn} onClick={() => handleDeleteAppt(selectedAppt.id)}>Eliminar</button>
                            </div>
                            <div style={{ display: 'flex', gap: '10px' }}>
                                <button
                                    className="btn-primary"
                                    style={{ background: '#fff', color: '#004975', border: '1.5px solid #004975' }}
                                    onClick={() => {
                                        const p = (patients || []).find(p => String(p.id) === String(selectedAppt.patientId));
                                        if (p) {
                                            onOpenPatient(p);
                                            setShowApptDetails(false);
                                        } else {
                                            alert("Este registro no tiene un paciente asociado (posible hora bloqueada).");
                                        }
                                    }}
                                >
                                    Realizar Atención
                                </button>
                                <button className="btn-primary" style={{ background: '#004975' }} onClick={() => setShowApptDetails(false)}>Guardar</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const styles = {
    container: { height: '100%', display: 'flex', flexDirection: 'column', background: '#fff' },
    viewTabs: { display: 'flex', borderBottom: '1px solid #e2e8f0', padding: '0 20px', background: '#fff', gap: '20px' },
    viewTab: { padding: '15px 5px', border: 'none', background: 'none', fontSize: '0.85rem', fontWeight: '700', cursor: 'pointer' },
    actionBar: { padding: '10px 20px', borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '15px', background: '#f8fafc' },
    navGroup: { display: 'flex', alignItems: 'center', gap: '5px' },
    iconBtn: { padding: '5px', border: '1px solid #e2e8f0', background: '#fff', borderRadius: '6px', cursor: 'pointer' },
    dateDisplay: { padding: '5px 12px', border: '1px solid #e2e8f0', borderRadius: '6px', fontSize: '0.8rem', fontWeight: '700' },
    todayBtn: { padding: '7px 15px', background: '#004975', color: '#fff', border: 'none', borderRadius: '6px', fontSize: '0.8rem', fontWeight: '700', cursor: 'pointer' },
    toggleGroup: { display: 'flex', borderRadius: '6px', overflow: 'hidden', border: '1px solid #004975' },
    toggleBtn: { padding: '7px 12px', border: 'none', fontSize: '0.75rem', fontWeight: '600', color: '#004975', cursor: 'pointer' },
    resourceSelect: { padding: '7px 12px', borderRadius: '6px', border: '1px solid #e2e8f0', fontSize: '0.8rem', outline: 'none' },
    searchWrapper: { flex: 1, position: 'relative' },
    searchBox: { display: 'flex', alignItems: 'center', gap: '8px', padding: '7px 12px', background: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0' },
    searchInput: { border: 'none', background: 'none', outline: 'none', fontSize: '0.8rem', width: '100%' },
    searchResults: { position: 'absolute', top: '40px', left: 0, right: 0, background: '#fff', borderRadius: '8px', boxShadow: '0 10px 20px rgba(0,0,0,0.1)', border: '1px solid #e2e8f0', zIndex: 100 },
    searchItem: { padding: '8px 12px', display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', borderBottom: '1px solid #f1f5f9' },
    miniAvatar: { width: '24px', height: '24px', borderRadius: '50%', background: '#004975', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontWeight: '900' },
    refreshBtn: { padding: '7px 12px', borderRadius: '8px', border: '1px solid #e2e8f0', background: '#fff', fontSize: '0.75rem', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' },
    titleArea: { padding: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' },
    mainTitle: { fontSize: '1.25rem', fontWeight: '900', color: '#1e293b' },
    gridContainer: { flex: 1, border: '1px solid #e2e8f0', margin: '0 15px 15px 15px', borderRadius: '10px', overflow: 'hidden', display: 'flex', flexDirection: 'column' },
    gridHeader: { display: 'flex', background: '#f1f5f9', borderBottom: '1px solid #e2e8f0' },
    timeColHeader: { width: '70px', borderRight: '1px solid #e2e8f0' },
    dayHeader: { flex: 1, padding: '10px', borderRight: '1px solid #e2e8f0', textAlign: 'center', fontSize: '0.8rem', fontWeight: '800', color: '#004975' },
    gridBody: { flex: 1, overflowY: 'auto' },
    gridRow: { display: 'flex', height: '32px', borderBottom: '1px solid #f1f5f9' },
    timeLabel: { width: '70px', textAlign: 'center', fontSize: '0.65rem', fontWeight: '700', color: '#94a3b8', borderRight: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center' },
    gridSlot: { flex: 1, borderRight: '1px solid #f1f5f9', position: 'relative', cursor: 'pointer' },
    appointmentChip: { position: 'absolute', top: '1px', left: '2px', right: '2px', bottom: '1px', background: '#fff', border: '1.5px solid #004975', color: '#004975', borderRadius: '3px', fontSize: '0.65rem', fontWeight: '800', display: 'flex', alignItems: 'center', padding: '0 5px', zIndex: 10, overflow: 'hidden', cursor: 'pointer' },
    overlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.4)', zIndex: 3000, display: 'flex', alignItems: 'center', justifyContent: 'center' },
    modal: { background: '#fff', width: '450px', borderRadius: '24px', padding: '30px', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' },
    smallModal: { background: '#fff', width: '380px', borderRadius: '24px', padding: '25px', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' },
    modalHeader: { display: 'flex', justifyContent: 'space-between', marginBottom: '20px' },
    closeBtn: { border: 'none', background: 'none', fontSize: '1.2rem', cursor: 'pointer', color: '#94a3b8' },
    reservoGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', padding: '10px 0' },
    leftCol: { display: 'flex', flexDirection: 'column', gap: '10px' },
    rightCol: { display: 'flex', flexDirection: 'column', gap: '10px' },
    fieldRow: { display: 'grid', gridTemplateColumns: '100px 1fr', gap: '10px', alignItems: 'center', fontSize: '0.9rem' },
    fieldValue: { background: '#f1f5f9', padding: '8px 12px', borderRadius: '8px', border: '1px solid #e2e8f0', color: '#1e293b' },
    selectSmall: { padding: '8px 12px', borderRadius: '8px', border: '1px solid #e2e8f0', background: '#fff' },
    textAreaSmall: { padding: '8px 12px', borderRadius: '8px', border: '1px solid #e2e8f0', background: '#f1f5f9', height: '60px', resize: 'none' },
    reservoFooter: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #e2e8f0', marginTop: '20px', paddingTop: '20px' },
    linkBtn: { border: 'none', background: 'none', color: '#004975', fontWeight: '700', cursor: 'pointer', fontSize: '0.85rem' },
    form: { display: 'flex', flexDirection: 'column', gap: '15px' },
    field: { display: 'flex', flexDirection: 'column', gap: '8px' },
    label: { fontSize: '0.8rem', fontWeight: '700', color: '#004975' },
    row: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' },
    input: { padding: '12px', borderRadius: '12px', border: '1.5px solid #e2e8f0', fontSize: '0.95rem', outline: 'none' },
    textarea: { padding: '12px', borderRadius: '12px', border: '1.5px solid #e2e8f0', fontSize: '0.95rem', outline: 'none', resize: 'none' },
    modalFooter: { display: 'flex', justifyContent: 'flex-end', gap: '20px', alignItems: 'center', marginTop: '10px' },
    cancelLink: { border: 'none', background: 'none', color: '#64748b', cursor: 'pointer', fontWeight: '700' },

    apptInfo: { background: '#f8fafc', padding: '15px', borderRadius: '12px', marginBottom: '20px', display: 'flex', flexDirection: 'column', gap: '10px' },
    infoRow: { display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.85rem', color: '#475569' },
    actionGrid: { display: 'grid', gridTemplateColumns: '1fr', gap: '12px' },
    mainAction: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', padding: '15px', borderRadius: '12px', background: '#e0f2fe', color: '#004975', border: '1.5px solid #bae6fd', fontSize: '0.9rem', fontWeight: '700', cursor: 'pointer', transition: 'all 0.2s' }
};

export default Agenda;
