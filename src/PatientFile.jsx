import React, { useState } from 'react';
import { generatePrescription, generateCertificate } from './services/pdfService';

const PatientFile = ({ patient, onBack, onSaveNote, onAddNotification }) => {
    const [newNote, setNewNote] = useState('');
    const [isAIProcessing, setIsAIProcessing] = useState(false);
    const [activeTab, setActiveTab] = useState('anamnesis'); // Default changed to Anamnesis
    const [showPrescriptionModal, setShowPrescriptionModal] = useState(false);
    const [showCertificateModal, setShowCertificateModal] = useState(false);

    // State for Vitals
    const [vitals, setVitals] = useState({ weight: 75, height: 175 }); // Mock initial data

    const bmi = (vitals.weight / ((vitals.height / 100) ** 2)).toFixed(1);

    const handleAISummarize = () => {
        if (!newNote) return;
        setIsAIProcessing(true);
        setTimeout(() => {
            const formalNote = `[ANAMNESIS Y EVOLUCIÓN ASISTIDA]\n\nPaciente: ${patient.name}\nRUT: ${patient.rut}\n\nSubjetivo (Anamnesis): ${newNote}\n\nObjetivo (Examen Físico):\n- Peso: ${vitals.weight}kg, Talla: ${vitals.height}cm, IMC: ${bmi}\n\nPlan:\n- Continuar control.\n\nFirmado IA.`;
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

    const menuItems = [
        { id: 'anamnesis', label: 'Anamnesis / Evolución', icon: '📝' },
        { id: 'background', label: 'Antecedentes', icon: '🏥' },
        { id: 'documents', label: 'Documentos', icon: '📎' },
        { id: 'photos', label: 'Imágenes', icon: '📷' },
        { id: 'timeline', label: 'Historial', icon: '⏱️' },
    ];

    return (
        <div style={styles.container}>
            {/* Top Bar with Patient Summary */}
            <div style={styles.topBar}>
                <button style={styles.backBtn} onClick={onBack}>← Volver</button>
                <div style={styles.patientSummary}>
                    <div style={styles.avatar}>{patient.name.charAt(0)}</div>
                    <div>
                        <h1 style={styles.name}>{patient.name}</h1>
                        <div style={styles.badges}>
                            <span style={styles.rutBadge}>{patient.rut}</span>
                            <span style={styles.ageBadge}>34 años</span>
                            <span style={styles.planBadge}>{patient.insurance || 'Particular'}</span>
                        </div>
                    </div>
                </div>
                <div style={styles.actions}>
                    <button className="btn-primary" onClick={() => setShowPrescriptionModal(true)} style={{ background: '#64748b' }}>💊 Receta</button>
                    <button className="btn-primary" onClick={() => setShowCertificateModal(true)} style={{ background: '#8b5cf6' }}>📑 Certificado</button>
                </div>
            </div>

            <div style={styles.layout}>
                {/* Left Sidebar Menu */}
                <div style={styles.sidebar}>
                    {/* Vitals Card */}
                    <div style={styles.vitalsCard}>
                        <h3 style={styles.vitalsTitle}>Antropometría</h3>
                        <div style={styles.vitalsGrid}>
                            <div style={styles.vitalItem}>
                                <label>Peso (kg)</label>
                                <input
                                    type="number"
                                    value={vitals.weight}
                                    onChange={e => setVitals({ ...vitals, weight: e.target.value })}
                                    style={styles.vitalInput}
                                />
                            </div>
                            <div style={styles.vitalItem}>
                                <label>Talla (cm)</label>
                                <input
                                    type="number"
                                    value={vitals.height}
                                    onChange={e => setVitals({ ...vitals, height: e.target.value })}
                                    style={styles.vitalInput}
                                />
                            </div>
                            <div style={styles.vitalItem}>
                                <label>IMC</label>
                                <div style={{ ...styles.vitalInput, background: '#f1f5f9', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: bmi > 25 ? '#ef4444' : '#10b981' }}>
                                    {bmi}
                                </div>
                            </div>
                        </div>
                    </div>

                    <nav style={styles.menu}>
                        {menuItems.map(item => (
                            <button
                                key={item.id}
                                style={activeTab === item.id ? styles.menuItemActive : styles.menuItem}
                                onClick={() => setActiveTab(item.id)}
                            >
                                <span style={{ marginRight: '10px' }}>{item.icon}</span>
                                {item.label}
                            </button>
                        ))}
                    </nav>

                    <div style={styles.alertCard}>
                        <h4>⚠️ Alertas</h4>
                        <div style={styles.alertItem}>• Alergia Penicilina</div>
                        <div style={styles.alertItem}>• Hipertensión</div>
                    </div>
                </div>

                {/* Main Content Area */}
                <div style={styles.main}>
                    {activeTab === 'anamnesis' && (
                        <div className="fade-in">
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                                <h2 style={styles.sectionHeader}>Anamnesis y Evolución</h2>
                                <button
                                    onClick={handleAISummarize}
                                    style={{ ...styles.aiBtn, opacity: isAIProcessing ? 0.6 : 1 }}
                                    disabled={isAIProcessing}
                                >
                                    <span className="ai-pulse">✨</span> {isAIProcessing ? 'Redactando con IA...' : 'Asistente IA'}
                                </button>
                            </div>

                            <div style={styles.editorContainer}>
                                <textarea
                                    style={styles.editor}
                                    placeholder="Escriba aquí la anamnesis, examen físico y plan..."
                                    value={newNote}
                                    onChange={(e) => setNewNote(e.target.value)}
                                />
                                <div style={styles.editorToolbar}>
                                    <button style={styles.toolbarBtn}>🔡 Texto</button>
                                    <button style={styles.toolbarBtn}>🎙️ Dictar</button>
                                    <div style={{ flex: 1 }}></div>
                                    <button
                                        className="btn-primary"
                                        style={{ padding: '8px 20px' }}
                                        onClick={handleSave}
                                    >
                                        Guardar Evolución
                                    </button>
                                </div>
                            </div>

                            <div style={{ marginTop: '30px' }}>
                                <h3 style={styles.subHeader}>Últimas Evoluciones</h3>
                                {patient.history.length === 0 ? (
                                    <div style={{ textAlign: 'center', padding: '20px', color: '#94a3b8' }}>Sin historial previo</div>
                                ) : (
                                    patient.history.map((entry, i) => (
                                        <div key={i} style={styles.historyCard}>
                                            <div style={styles.historyHeader}>
                                                <span style={styles.historyDate}>{entry.date}</span>
                                                <span style={styles.historyDoc}>{entry.doctor}</span>
                                            </div>
                                            <div style={styles.historyContent}>{entry.note}</div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    )}

                    {activeTab === 'background' && (
                        <div className="fade-in">
                            <h2 style={styles.sectionHeader}>Antecedentes Clínicos</h2>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                                <div style={styles.card}>
                                    <h3>Mórbidos</h3>
                                    <textarea style={styles.simpleInput} placeholder="Diabetes, HTA..." />
                                </div>
                                <div style={styles.card}>
                                    <h3>Quirúrgicos</h3>
                                    <textarea style={styles.simpleInput} placeholder="Apendicectomía..." />
                                </div>
                                <div style={styles.card}>
                                    <h3>Alergias</h3>
                                    <textarea style={styles.simpleInput} placeholder="Medicamentos, alimentos..." />
                                </div>
                                <div style={styles.card}>
                                    <h3>Familiares</h3>
                                    <textarea style={styles.simpleInput} placeholder="Antecedentes familiares..." />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Placeholder for other tabs to save space in replace block */}
                    {activeTab === 'documents' && <div style={styles.card}><h3>Documentos</h3><p>Vista de documentos...</p></div>}
                    {activeTab === 'photos' && <div style={styles.card}><h3>Imágenes</h3><p>Galería de fotos...</p></div>}
                    {activeTab === 'timeline' && <div style={styles.card}><h3>Línea de Tiempo</h3><p>Vista cronológica...</p></div>}
                </div>
            </div>

            {/* Modals restored logic */}
            {showPrescriptionModal && (
                <div style={styles.modalOverlay} onClick={() => setShowPrescriptionModal(false)}>
                    <div style={styles.modal} onClick={e => e.stopPropagation()}>
                        <h3>Nueva Receta</h3>
                        <textarea style={styles.modalTextarea} placeholder="Indique medicamentos..." />
                        <button style={styles.saveBtn} onClick={() => alert('Receta generada')}>Generar PDF</button>
                        <button style={styles.cancelBtn} onClick={() => setShowPrescriptionModal(false)}>Cerrar</button>
                    </div>
                </div>
            )}

            {showCertificateModal && (
                <div style={styles.modalOverlay} onClick={() => setShowCertificateModal(false)}>
                    <div style={styles.modal} onClick={e => e.stopPropagation()}>
                        <h3>Certificado Médico</h3>
                        <textarea style={styles.modalTextarea} placeholder="Diagnóstico y días de reposo..." />
                        <button style={styles.saveBtn} onClick={() => alert('Certificado generado')}>Generar PDF</button>
                        <button style={styles.cancelBtn} onClick={() => setShowCertificateModal(false)}>Cerrar</button>
                    </div>
                </div>
            )}
        </div>
    );
};

const styles = {
    container: { padding: '20px', maxWidth: '1600px', margin: '0 auto', background: '#f8fafc', minHeight: '100vh', fontFamily: 'Inter, sans-serif' },
    topBar: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', background: 'white', padding: '15px 25px', borderRadius: '16px', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' },
    backBtn: { border: 'none', background: 'transparent', color: '#64748b', fontWeight: '600', cursor: 'pointer', fontSize: '0.9rem' },
    patientSummary: { display: 'flex', alignItems: 'center', gap: '15px' },
    avatar: { width: '45px', height: '45px', background: 'var(--primary)', color: 'white', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '1.2rem' },
    name: { margin: 0, fontSize: '1.2rem', color: '#1e293b' },
    badges: { display: 'flex', gap: '8px', marginTop: '4px' },
    rutBadge: { background: '#f1f5f9', padding: '2px 8px', borderRadius: '4px', fontSize: '0.75rem', color: '#64748b', fontWeight: '600' },
    ageBadge: { background: '#e0f2fe', padding: '2px 8px', borderRadius: '4px', fontSize: '0.75rem', color: '#0284c7', fontWeight: '600' },
    planBadge: { background: '#dcfce7', padding: '2px 8px', borderRadius: '4px', fontSize: '0.75rem', color: '#166534', fontWeight: '600' },
    actions: { display: 'flex', gap: '10px' },

    layout: { display: 'grid', gridTemplateColumns: '260px 1fr', gap: '20px', alignItems: 'start' },
    sidebar: { display: 'flex', flexDirection: 'column', gap: '20px' },

    vitalsCard: { background: 'white', padding: '20px', borderRadius: '16px', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' },
    vitalsTitle: { margin: '0 0 15px 0', fontSize: '0.95rem', color: '#1e293b' },
    vitalsGrid: { display: 'flex', flexDirection: 'column', gap: '10px' },
    vitalItem: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
    vitalInput: { width: '80px', padding: '6px', borderRadius: '6px', border: '1px solid #e2e8f0', textAlign: 'center', fontWeight: '600' },

    menu: { display: 'flex', flexDirection: 'column', gap: '5px', background: 'white', padding: '10px', borderRadius: '16px', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' },
    menuItem: { padding: '12px 15px', border: 'none', background: 'transparent', textAlign: 'left', cursor: 'pointer', borderRadius: '8px', color: '#64748b', fontWeight: '500', display: 'flex', alignItems: 'center', fontSize: '0.95rem', transition: 'all 0.2s' },
    menuItemActive: { padding: '12px 15px', border: 'none', background: 'var(--primary-light)', textAlign: 'left', cursor: 'pointer', borderRadius: '8px', color: 'var(--primary)', fontWeight: '700', display: 'flex', alignItems: 'center', fontSize: '0.95rem' },

    alertCard: { background: '#fef2f2', padding: '15px', borderRadius: '12px', border: '1px solid #fee2e2' },
    alertItem: { fontSize: '0.85rem', color: '#991b1b', marginBottom: '4px' },

    main: { background: 'white', borderRadius: '24px', padding: '30px', minHeight: '600px', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' },
    sectionHeader: { margin: '0 0 25px 0', fontSize: '1.5rem', color: '#1e293b' },
    subHeader: { margin: '0 0 15px 0', fontSize: '1.1rem', color: '#475569' },

    editorContainer: { border: '1px solid #e2e8f0', borderRadius: '12px', overflow: 'hidden' },
    editor: { width: '100%', minHeight: '200px', border: 'none', padding: '20px', fontSize: '1rem', outline: 'none', resize: 'vertical', fontFamily: 'inherit' },
    editorToolbar: { background: '#f8fafc', padding: '10px', borderTop: '1px solid #e2e8f0', display: 'flex', gap: '10px' },
    toolbarBtn: { background: 'white', border: '1px solid #e2e8f0', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.85rem', fontWeight: '500' },

    historyCard: { background: '#f8fafc', borderRadius: '12px', padding: '15px', marginBottom: '15px', borderLeft: '4px solid #cbd5e1' },
    historyHeader: { display: 'flex', justifyContent: 'space-between', marginBottom: '8px' },
    historyDate: { fontWeight: '700', color: '#1e293b', fontSize: '0.9rem' },
    historyDoc: { fontSize: '0.85rem', color: '#64748b' },
    historyContent: { fontSize: '0.95rem', color: '#334155', lineHeight: '1.5' },

    card: { background: '#f8fafc', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0' },
    simpleInput: { width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0', minHeight: '60px', marginTop: '10px' },

    aiBtn: { background: '#f0f9ff', color: '#0284c7', border: '1px solid #bae6fd', padding: '6px 12px', borderRadius: '20px', cursor: 'pointer', fontWeight: '600', fontSize: '0.85rem' },

    modalOverlay: { position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999 },
    modal: { background: 'white', padding: '30px', borderRadius: '20px', width: '500px', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' },
    modalTextarea: { width: '100%', minHeight: '100px', margin: '20px 0', padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0' },
    saveBtn: { background: 'var(--primary)', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', marginRight: '10px' },
    cancelBtn: { background: 'white', border: '1px solid #e2e8f0', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }
};

export default PatientFile;
