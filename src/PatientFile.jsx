import React, { useState } from 'react';
import { generatePrescription, generateCertificate } from './services/pdfService';

const PatientFile = ({ patient, onBack, onSaveNote, onAddNotification }) => {
    const [newNote, setNewNote] = useState('');
    const [isAIProcessing, setIsAIProcessing] = useState(false);
    const [activeTab, setActiveTab] = useState('evolution');
    const [showPrescriptionModal, setShowPrescriptionModal] = useState(false);
    const [showCertificateModal, setShowCertificateModal] = useState(false);

    const handleAISummarize = () => {
        if (!newNote) return;
        setIsAIProcessing(true);
        setTimeout(() => {
            const formalNote = `[AI GENERATED PROGRESS NOTE]\n\nPaciente: ${patient.name}\nRUT: ${patient.rut}\nEvaluación: Se observa evolución satisfactoria. ${newNote}\nPlan: Continuar con tratamiento indicado y control en 15 días.\n\nFirmado Electrónicamente por IA Copilot.`;
            setNewNote(formalNote);
            setIsAIProcessing(false);
        }, 1500);
    };

    const handleSave = () => {
        if (newNote.trim()) {
            onSaveNote(patient.id, newNote);
            setNewNote('');
        }
    };

    return (
        <div style={styles.container}>
            <header style={styles.header}>
                <button style={styles.backBtn} onClick={onBack}>← Volver al Listado</button>
                <div style={styles.profileHeader}>
                    <div style={styles.avatar}>{patient.name.charAt(0)}</div>
                    <div>
                        <h1 style={styles.name}>{patient.name}</h1>
                        <p style={styles.sub}>
                            {patient.email} • {patient.phone} • <span style={styles.tag}>RUT {patient.rut}</span>
                        </p>
                    </div>
                </div>
            </header>

            <div style={styles.content}>
                <aside style={styles.sidebar}>
                    {/* Patient Intelligence 360 Panel */}
                    <div className="bento-card" style={{ marginBottom: '20px', background: 'linear-gradient(145deg, #ffffff, #f8fafc)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                            <h3 style={styles.sectionTitle}>Análisis 360°</h3>
                            <span style={{ fontSize: '0.7rem', background: '#ecfdf5', color: '#059669', padding: '4px 8px', borderRadius: '12px', fontWeight: '800' }}>
                                EXCELENTE COMPORTAMIENTO
                            </span>
                        </div>

                        <div style={styles.intelligenceGrid}>
                            <div style={styles.intelligenceItem}>
                                <div style={styles.intLabel}>Valor Paciente (LTV)</div>
                                <div style={styles.intValue}>$1.2M</div>
                                <div style={styles.intTrend}>💎 Cliente Top 10%</div>
                            </div>
                            <div style={styles.intelligenceItem}>
                                <div style={styles.intLabel}>Deuda Actual</div>
                                <div style={{ ...styles.intValue, color: patient.debt > 0 ? '#ef4444' : '#10b981' }}>
                                    ${patient.debt?.toLocaleString() || '0'}
                                </div>
                                <div style={styles.intTrend}>{patient.debt > 0 ? '⚠️ Pago Pendiente' : '✅ Al día'}</div>
                            </div>
                        </div>

                        <div style={{ marginTop: '20px', borderTop: '1px solid #e2e8f0', paddingTop: '15px' }}>
                            <div style={styles.intLabel}>Próxima Acción Inteligente</div>
                            <div style={{ background: '#eff6ff', padding: '12px', borderRadius: '10px', marginTop: '8px', borderLeft: '4px solid var(--primary)', fontSize: '0.85rem', color: '#1e3a8a' }}>
                                <div style={{ marginBottom: '8px', lineHeight: '1.4' }}>
                                    💡 <strong>Sugerencia:</strong> El paciente cumple 1 año desde su último chequeo. Se recomienda control preventivo.
                                </div>
                                <button
                                    style={{
                                        background: 'white',
                                        color: 'var(--primary)',
                                        border: '1px solid var(--primary)',
                                        borderRadius: '6px',
                                        padding: '6px 12px',
                                        fontSize: '0.75rem',
                                        cursor: 'pointer',
                                        fontWeight: '700',
                                        width: '100%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '6px',
                                        transition: 'all 0.2s'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.target.style.background = 'var(--primary)';
                                        e.target.style.color = 'white';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.target.style.background = 'white';
                                        e.target.style.color = 'var(--primary)';
                                    }}
                                    onClick={() => {
                                        onAddNotification({
                                            type: 'whatsapp',
                                            to: patient.phone,
                                            message: `Hola ${patient.name}, te extrañamos en Centro Médico Del Valle. Tu salud es prioridad. Agenda tu chequeo anual aquí: [Link]`,
                                            status: 'sent'
                                        });
                                        alert(`🚀 Invitación enviada a ${patient.name} y registrada en el Centro de Notificaciones.`);
                                    }}
                                >
                                    ✨ Enviar Invitación Automática
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Internal Notes / Sticky */}
                    <div className="bento-card" style={{ marginBottom: '20px', background: '#fef3c7', border: 'none', position: 'relative' }}>
                        <div style={{ position: 'absolute', top: '-10px', left: '50%', transform: 'translateX(-50%)', width: '40%', height: '8px', background: 'rgba(0,0,0,0.1)', borderRadius: '4px' }}></div>
                        <h3 style={{ ...styles.sectionTitle, color: '#92400e' }}>📌 Nota Interna (Recepción)</h3>
                        <p style={{ fontSize: '0.9rem', color: '#78350f', fontStyle: 'italic', lineHeight: '1.5' }}>
                            "El paciente prefiere que le llamen 'Don Juan'. Tener cuidado con mencionar temas de peso, es sensible al respecto."
                        </p>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px', fontSize: '0.75rem', color: '#b45309', fontWeight: 'bold' }}>
                            - Escrito por Maria (Sec)
                        </div>
                    </div>

                    {/* Critical Info Card */}
                    <div className="bento-card" style={{ marginBottom: '20px', borderLeft: '5px solid #f43f5e' }}>
                        <h3 style={styles.sectionTitle}>⚠️ Información Crítica</h3>
                        <div style={styles.criticalItem}>
                            <strong>Grupo Sanguíneo:</strong> {patient.bloodType || 'No registrado'}
                        </div>
                        <div style={styles.criticalItem}>
                            <strong>Alergias:</strong>
                            {patient.allergies?.length > 0 ? (
                                <div style={{ marginTop: '5px' }}>
                                    {patient.allergies.map((a, i) => (
                                        <span key={i} style={styles.allergyBadge}>{a}</span>
                                    ))}
                                </div>
                            ) : ' Ninguna registrada'}
                        </div>
                        <div style={styles.criticalItem}>
                            <strong>Medicación Actual:</strong>
                            {patient.medications?.length > 0 ? (
                                <ul style={{ margin: '5px 0', paddingLeft: '20px' }}>
                                    {patient.medications.map((m, i) => <li key={i}>{m}</li>)}
                                </ul>
                            ) : ' Ninguna'}
                        </div>
                    </div>

                    {/* Quick Actions Card */}
                    <div className="bento-card">
                        <h3 style={styles.sectionTitle}>Acciones Rápidas</h3>
                        <button
                            className="btn-primary"
                            style={{ width: '100%', background: 'var(--accent)', marginBottom: '10px' }}
                            onClick={() => setShowPrescriptionModal(true)}
                        >
                            📝 Generar Receta
                        </button>
                        <button
                            className="btn-primary"
                            style={{ width: '100%', background: '#8b5cf6', marginBottom: '10px' }}
                            onClick={() => setShowCertificateModal(true)}
                        >
                            📑 Generar Certificado
                        </button>
                        <button className="btn-primary" style={{ width: '100%', background: '#10b981', marginBottom: '10px' }}>
                            📧 Enviar Resultados
                        </button>
                        <button className="btn-primary" style={{ width: '100%', background: 'var(--primary)' }}>
                            ✅ Cerrar Episodio
                        </button>
                    </div>
                </aside>

                <main style={styles.main}>
                    {/* Tab Navigation */}
                    <div style={styles.tabs}>
                        <button
                            style={activeTab === 'evolution' ? styles.activeTab : styles.tab}
                            onClick={() => setActiveTab('evolution')}
                        >
                            📋 Evolución
                        </button>
                        <button
                            style={activeTab === 'documents' ? styles.activeTab : styles.tab}
                            onClick={() => setActiveTab('documents')}
                        >
                            📎 Documentos
                        </button>
                        <button
                            style={activeTab === 'photos' ? styles.activeTab : styles.tab}
                            onClick={() => setActiveTab('photos')}
                        >
                            📷 Fotos Clínicas
                        </button>
                        <button
                            style={activeTab === 'timeline' ? styles.activeTab : styles.tab}
                            onClick={() => setActiveTab('timeline')}
                        >
                            ⏱️ Línea de Tiempo
                        </button>
                    </div>

                    {/* Evolution Tab */}
                    {activeTab === 'evolution' && (
                        <>
                            <div className="bento-card" style={styles.editorArea}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                                    <h3 style={{ margin: 0 }}>Nueva Evolución Clínica</h3>
                                    <button
                                        onClick={handleAISummarize}
                                        style={{ ...styles.aiBtn, opacity: isAIProcessing ? 0.6 : 1 }}
                                        disabled={isAIProcessing}
                                    >
                                        <span className="ai-pulse">✨</span> {isAIProcessing ? 'Procesando IA...' : 'Formatear con IA Pro'}
                                    </button>
                                </div>
                                <textarea
                                    style={styles.textarea}
                                    placeholder="Escribe notas rápidas aquí y usa la IA para formalizarlas..."
                                    value={newNote}
                                    onChange={(e) => setNewNote(e.target.value)}
                                />
                                <button
                                    className="btn-primary"
                                    style={{ alignSelf: 'flex-end', padding: '12px 30px' }}
                                    onClick={handleSave}
                                >
                                    Guardar en Ficha Permanente
                                </button>
                            </div>

                            <div style={{ marginTop: '30px' }}>
                                <h3 style={{ marginBottom: '20px' }}>Historial Cronológico</h3>
                                {patient.history.length === 0 ? (
                                    <div className="bento-card" style={{ textAlign: 'center', padding: '40px', color: '#94a3b8' }}>
                                        No hay registros previos para este paciente
                                    </div>
                                ) : (
                                    patient.history.map((entry, i) => (
                                        <div key={i} className="bento-card" style={styles.historyEntry}>
                                            <div style={styles.entryHeader}>
                                                <div style={styles.dateBadge}>{entry.date}</div>
                                                <div style={styles.docName}>{entry.doctor}</div>
                                            </div>
                                            <div style={styles.entryBody}>{entry.note}</div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </>
                    )}

                    {/* Documents Tab */}
                    {activeTab === 'documents' && (
                        <div className="bento-card" style={{ padding: '30px' }}>
                            <h3>Documentos del Paciente</h3>
                            {patient.documents?.length > 0 ? (
                                <div style={styles.docList}>
                                    {patient.documents.map((doc, i) => (
                                        <div key={i} style={styles.docItem}>
                                            <div style={styles.docIcon}>📄</div>
                                            <div style={{ flex: 1 }}>
                                                <div style={styles.docName}>{doc.name}</div>
                                                <div style={styles.docMeta}>{doc.size} • {doc.date}</div>
                                            </div>
                                            <button style={styles.downloadBtn}>Descargar</button>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div style={{ textAlign: 'center', padding: '40px', color: '#94a3b8' }}>
                                    <p>No hay documentos cargados</p>
                                    <button className="btn-primary" style={{ marginTop: '20px' }}>Subir Documento</button>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Photos Tab */}
                    {activeTab === 'photos' && (
                        <div className="bento-card" style={{ padding: '30px' }}>
                            <h3>Fotos Clínicas</h3>
                            <p style={{ color: '#64748b', marginBottom: '20px' }}>
                                Registro fotográfico de evolución de tratamientos, lesiones, etc.
                            </p>
                            <div style={{ textAlign: 'center', padding: '40px', color: '#94a3b8' }}>
                                <p>No hay fotos registradas</p>
                                <button className="btn-primary" style={{ marginTop: '20px' }}>📸 Agregar Foto</button>
                            </div>
                        </div>
                    )}

                    {/* Timeline Tab */}
                    {activeTab === 'timeline' && (
                        <div className="bento-card" style={{ padding: '30px' }}>
                            <h3>Línea de Tiempo Completa</h3>
                            <div style={styles.timeline}>
                                {patient.history.map((entry, i) => (
                                    <div key={i} style={styles.timelineItem}>
                                        <div style={styles.timelineDot}></div>
                                        <div style={styles.timelineContent}>
                                            <div style={styles.timelineDate}>{entry.date}</div>
                                            <div style={styles.timelineText}>{entry.note}</div>
                                            <div style={styles.timelineDoctor}>{entry.doctor}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </main>
            </div>

            {/* Prescription Modal */}
            {showPrescriptionModal && (
                <div style={styles.modalOverlay} onClick={() => setShowPrescriptionModal(false)}>
                    <div className="bento-card" style={styles.modal} onClick={e => e.stopPropagation()}>
                        <h2>Generar Receta Médica</h2>
                        <div style={{ marginTop: '20px' }}>
                            <textarea
                                style={styles.textarea}
                                placeholder="Medicamento, dosis, frecuencia..."
                                rows="6"
                            />
                        </div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '20px' }}>
                            <button
                                className="btn-primary"
                                style={{ flex: '1 1 45%', background: '#64748b' }}
                                onClick={() => {
                                    // Mock Professional Data (In a real app, this comes from the logged-in user context)
                                    const currentProfessional = {
                                        name: "Dra. Nataly Malaspina",
                                        specialty: "Medicina General",
                                        rut: "16.123.456-7"
                                    };
                                    const prescriptionText = document.querySelector('textarea[placeholder="Medicamento, dosis, frecuencia..."]').value;
                                    if (!prescriptionText) return alert("Escribe el contenido de la receta");

                                    generatePrescription(patient, currentProfessional, prescriptionText);
                                }}
                            >
                                📄 Descargar PDF Oficial
                            </button>
                            <button className="btn-primary" style={{ flex: '1 1 45%' }}>
                                📧 Generar y Enviar por Email
                            </button>
                            <button className="btn-primary" style={{ flex: '1 1 100%', background: '#10b981' }}>
                                💬 Enviar por WhatsApp
                            </button>
                        </div>
                        <button
                            style={{ ...styles.cancelBtn, marginTop: '10px' }}
                            onClick={() => setShowPrescriptionModal(false)}
                        >
                            Cancelar
                        </button>
                    </div>
                </div>
            )}

            {/* Certificate Modal */}
            {showCertificateModal && (
                <div style={styles.modalOverlay} onClick={() => setShowCertificateModal(false)}>
                    <div className="bento-card" style={styles.modal} onClick={e => e.stopPropagation()}>
                        <h2>Emitir Certificado Médico</h2>
                        <div style={{ marginTop: '20px' }}>
                            <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold' }}>Diagnóstico / Motivo:</label>
                            <textarea
                                id="certDetails"
                                style={styles.textarea}
                                placeholder="Ej: Cuadro viral agudo, requiere reposo..."
                                rows="4"
                            />
                            <label style={{ display: 'block', marginBottom: '10px', marginTop: '10px', fontWeight: 'bold' }}>Días de Reposo (0 para Alta):</label>
                            <input
                                id="certDays"
                                type="number"
                                style={{ ...styles.textarea, minHeight: 'auto', marginBottom: '20px' }}
                                placeholder="0"
                            />
                        </div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '20px' }}>
                            <button
                                className="btn-primary"
                                style={{ flex: '1 1 100%', background: '#64748b' }}
                                onClick={() => {
                                    const currentProfessional = {
                                        name: "Dra. Nataly Malaspina",
                                        specialty: "Medicina General",
                                        rut: "16.123.456-7"
                                    };
                                    const details = document.getElementById('certDetails').value;
                                    const days = document.getElementById('certDays').value;

                                    if (!details) return alert("Escribe el motivo del certificado");

                                    generateCertificate(patient, currentProfessional, details, days);
                                }}
                            >
                                📄 Descargar PDF Oficial
                            </button>
                        </div>
                        <button
                            style={{ ...styles.cancelBtn, marginTop: '10px' }}
                            onClick={() => setShowCertificateModal(false)}
                        >
                            Cancelar
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

const styles = {
    container: { padding: '40px', maxWidth: '1400px', margin: '0 auto' },
    header: { display: 'flex', alignItems: 'center', gap: '30px', marginBottom: '40px' },
    backBtn: { background: '#f1f5f9', border: 'none', padding: '10px 20px', borderRadius: '12px', color: 'var(--primary)', fontWeight: '700', cursor: 'pointer' },
    profileHeader: { display: 'flex', alignItems: 'center', gap: '20px' },
    avatar: { width: '70px', height: '70px', background: 'var(--primary-gradient)', color: 'white', borderRadius: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', fontWeight: '900' },
    name: { margin: 0, fontSize: '2.4rem', letterSpacing: '-1.5px' },
    sub: { color: '#64748b', fontWeight: '500' },
    tag: { color: 'var(--primary)', fontWeight: '700' },

    content: { display: 'grid', gridTemplateColumns: '320px 1fr', gap: '30px' },
    sidebar: {},
    sectionTitle: { fontSize: '0.9rem', fontWeight: '800', marginBottom: '15px', color: '#1e293b' },
    intelligenceGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' },
    intelligenceItem: { background: 'white', padding: '12px', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' },
    intLabel: { fontSize: '0.7rem', color: '#64748b', fontWeight: '700', textTransform: 'uppercase', marginBottom: '4px' },
    intValue: { fontSize: '1.2rem', fontWeight: '900', color: '#0f172a', marginBottom: '4px' },
    intTrend: { fontSize: '0.65rem', fontWeight: '600', color: '#64748b' },
    criticalItem: { marginBottom: '15px', fontSize: '0.9rem', lineHeight: '1.6' },
    allergyBadge: { display: 'inline-block', background: '#fee2e2', color: '#991b1b', padding: '4px 10px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: '700', marginRight: '5px' },

    main: { display: 'flex', flexDirection: 'column' },
    tabs: { display: 'flex', gap: '10px', marginBottom: '30px', borderBottom: '2px solid #f1f5f9' },
    tab: { background: 'transparent', border: 'none', padding: '12px 20px', cursor: 'pointer', fontWeight: '600', color: '#94a3b8', borderBottom: '2px solid transparent', marginBottom: '-2px' },
    activeTab: { background: 'transparent', border: 'none', padding: '12px 20px', cursor: 'pointer', fontWeight: '800', color: 'var(--primary)', borderBottom: '2px solid var(--primary)', marginBottom: '-2px' },

    editorArea: { display: 'flex', flexDirection: 'column', border: '2px solid #e2e8f0' },
    textarea: { minHeight: '180px', border: 'none', background: 'transparent', outline: 'none', fontSize: '1.1rem', marginBottom: '20px', fontFamily: 'inherit', resize: 'none', padding: '15px' },
    aiBtn: { background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '8px 15px', color: '#475569', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' },

    historyEntry: { marginBottom: '20px', borderLeft: '5px solid var(--primary)' },
    entryHeader: { display: 'flex', justifyContent: 'space-between', marginBottom: '15px', alignItems: 'center' },
    dateBadge: { background: '#f1f5f9', padding: '5px 12px', borderRadius: '8px', fontSize: '0.8rem', fontWeight: '800', color: 'var(--primary)' },
    docName: { fontSize: '0.85rem', fontWeight: '600', color: '#94a3b8' },
    entryBody: { whiteSpace: 'pre-line', lineHeight: '1.6', fontSize: '1rem', color: '#334155' },

    docList: { marginTop: '20px' },
    docItem: { display: 'flex', alignItems: 'center', gap: '15px', padding: '15px', background: '#f8fafc', borderRadius: '12px', marginBottom: '10px' },
    docIcon: { fontSize: '2rem' },
    docMeta: { fontSize: '0.75rem', color: '#94a3b8' },
    downloadBtn: { background: 'var(--primary)', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' },

    timeline: { marginTop: '30px' },
    timelineItem: { display: 'flex', gap: '20px', marginBottom: '30px', position: 'relative' },
    timelineDot: { width: '12px', height: '12px', background: 'var(--primary)', borderRadius: '50%', marginTop: '5px', flexShrink: 0 },
    timelineContent: { flex: 1, paddingBottom: '20px', borderLeft: '2px solid #e2e8f0', paddingLeft: '20px', marginLeft: '-6px' },
    timelineDate: { fontSize: '0.75rem', fontWeight: '800', color: 'var(--primary)', marginBottom: '5px' },
    timelineText: { fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '5px' },
    timelineDoctor: { fontSize: '0.75rem', color: '#94a3b8', fontStyle: 'italic' },

    modalOverlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10000 },
    modal: { width: '600px', padding: '30px' },
    cancelBtn: { width: '100%', background: 'white', border: '1px solid #e2e8f0', padding: '12px', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }
};

export default PatientFile;
