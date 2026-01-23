import React, { useState } from 'react';
import {
    User, FileText, Clipboard, Pill, Paperclip, CreditCard,
    Plus, Save, Trash2, Download, ExternalLink, Calendar,
    ChevronRight, AlertCircle, History, MessageCircle, Printer
} from 'lucide-react';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { useSaaSStore } from './store';

const PatientFile = ({ patient, onClose }) => {
    const [activeTab, setActiveTab] = useState('clinical');
    const { addClinicalEntry, addReceta, addDocument } = useSaaSStore();

    // Form states
    const [showNewEntry, setShowNewEntry] = useState(false);
    const [newEntry, setNewEntry] = useState({ reason: '', observation: '', weight: '', bloodPressure: '' });

    const [showNewReceta, setShowNewReceta] = useState(false);
    const [newReceta, setNewReceta] = useState({ items: [{ medication: '', instruction: '' }] });

    // REAL INTEGRATION: WhatsApp (Free)
    const sendWhatsApp = (msg) => {
        const phone = patient.phone.replace(/\+/g, '').replace(/\s/g, '');
        const url = `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
        window.open(url, '_blank');
    };

    // REAL INTEGRATION: PDF Generation (Free)
    const downloadRecetaPDF = (receta) => {
        const doc = new jsPDF();

        // Header
        doc.setFillColor(0, 73, 117);
        doc.rect(0, 0, 210, 40, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(22);
        doc.text('CENTRO MEDICO DEL VALLE', 105, 20, { align: 'center' });
        doc.setFontSize(10);
        doc.text('Av. Principal 123, Providencia | +56 9 1234 5678', 105, 30, { align: 'center' });

        // Body Info
        doc.setTextColor(0, 0, 0);
        doc.setFontSize(14);
        doc.text('RECETA MEDICA ELECTRONICA', 20, 55);
        doc.setFontSize(10);
        doc.text(`Fecha: ${new Date(receta.date).toLocaleDateString()}`, 160, 55);
        doc.line(20, 60, 190, 60);

        // Patient Info
        doc.setFont('helvetica', 'bold');
        doc.text('PACIENTE:', 20, 75);
        doc.setFont('helvetica', 'normal');
        doc.text(`${patient.name}`, 50, 75);
        doc.text(`RUT: ${patient.rut}`, 20, 82);

        // Meds
        doc.setFontSize(12);
        doc.text('INDICACIONES:', 20, 100);

        const tableData = receta.items.map(item => [item.medication, item.instruction]);
        doc.autoTable({
            startY: 105,
            head: [['Medicamento', 'Instrucción']],
            body: tableData,
            theme: 'striped',
            headStyles: { fillStyle: [0, 73, 117] }
        });

        const finalY = doc.lastAutoTable.finalY + 30;
        doc.line(120, finalY, 180, finalY);
        doc.text(receta.doctor, 150, finalY + 10, { align: 'center' });
        doc.setFontSize(8);
        doc.text('Firma Digital Autorizada', 150, finalY + 15, { align: 'center' });

        doc.save(`Receta_${patient.name}_${receta.id}.pdf`);
    };

    const handleAddEntry = () => {
        addClinicalEntry(patient.id, {
            ...newEntry,
            doctor: 'Dra. Nataly Malaspina',
            specialty: 'Medicina General'
        });
        setNewEntry({ reason: '', observation: '', weight: '', bloodPressure: '' });
        setShowNewEntry(false);
    };

    const handleAddReceta = () => {
        addReceta(patient.id, {
            ...newReceta,
            doctor: 'Dra. Nataly Malaspina'
        });
        setNewReceta({ items: [{ medication: '', instruction: '' }] });
        setShowNewReceta(false);
    };

    const tabs = [
        { id: 'summary', label: 'Resumen', icon: User },
        { id: 'clinical', label: 'Ficha Médica', icon: Clipboard },
        { id: 'recetas', label: 'Recetas', icon: Pill },
        { id: 'files', label: 'Exámenes y Archivos', icon: Paperclip },
        { id: 'billing', label: 'Cuentas y Pagos', icon: CreditCard }
    ];

    return (
        <div style={styles.overlay}>
            <div style={styles.modal} className="glass-panel animate-slide">
                {/* Modal Header */}
                <header style={styles.header}>
                    <div style={styles.patientInfo}>
                        <div style={styles.bigAvatar}>{patient.name.charAt(0)}</div>
                        <div>
                            <h2 style={styles.patientName}>{patient.name}</h2>
                            <p style={styles.patientSub}>{patient.rut} • {patient.prevision} • {patient.category}</p>
                        </div>
                    </div>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <button
                            onClick={() => sendWhatsApp(`Hola ${patient.name}, te saludamos del Centro Médico Del Valle. Queríamos recordarte tu orden médica...`)}
                            title="Enviar WhatsApp"
                            style={{ ...styles.iconBtn, color: '#25D366', borderColor: '#25D366' }}
                        >
                            <MessageCircle size={20} />
                        </button>
                        <button onClick={onClose} style={styles.closeBtn}>✕</button>
                    </div>
                </header>

                {/* Tabs Navigation */}
                <nav style={styles.tabNav}>
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            style={{
                                ...styles.tab,
                                color: activeTab === tab.id ? 'var(--primary)' : '#94a3b8',
                                borderBottom: activeTab === tab.id ? '2px solid var(--primary)' : 'none'
                            }}
                        >
                            <tab.icon size={18} />
                            <span>{tab.label}</span>
                        </button>
                    ))}
                </nav>

                {/* Content Area */}
                <div style={styles.content}>

                    {/* SUMMARY TAB */}
                    {activeTab === 'summary' && (
                        <div style={styles.summaryGrid}>
                            <div className="bento-card" style={styles.infoCard}>
                                <h3 style={styles.cardTitle}>Datos del Paciente</h3>
                                <div style={styles.infoRow}><span>Email:</span> <strong>{patient.email}</strong></div>
                                <div style={styles.infoRow}><span>Teléfono:</span> <strong>{patient.phone}</strong></div>
                                <div style={styles.infoRow}><span>F. Nacimiento:</span> <strong>{patient.birthDate}</strong></div>
                                <div style={styles.infoRow}><span>Dirección:</span> <strong>{patient.address}</strong></div>
                                <div style={styles.infoRow}><span>Grupo Sanguíneo:</span> <strong>{patient.bloodType}</strong></div>
                            </div>

                            <div className="bento-card" style={{ ...styles.infoCard, borderLeft: '4px solid #ef4444' }}>
                                <h3 style={styles.cardTitle}>⚠️ Alergias y Contraindicaciones</h3>
                                <ul style={styles.list}>
                                    {patient.allergies.map((a, i) => <li key={i}>{a}</li>)}
                                    {patient.allergies.length === 0 && <li>Ninguna registrada</li>}
                                </ul>
                            </div>

                            <div className="bento-card" style={{ ...styles.infoCard, borderLeft: '4px solid #3b82f6' }}>
                                <h3 style={styles.cardTitle}>💊 Medicación Actual</h3>
                                <ul style={styles.list}>
                                    {patient.medications.map((m, i) => <li key={i}>{m}</li>)}
                                    {patient.medications.length === 0 && <li>Ninguna registrada</li>}
                                </ul>
                            </div>
                        </div>
                    )}

                    {/* CLINICAL HISTORY TAB */}
                    {activeTab === 'clinical' && (
                        <div style={styles.historyContainer}>
                            <div style={styles.historyAction}>
                                <button className="btn-primary" onClick={() => setShowNewEntry(!showNewEntry)}>
                                    <Plus size={18} />
                                    <span>{showNewEntry ? 'Cancelar Atención' : 'Realizar Nueva Atención'}</span>
                                </button>
                            </div>

                            {showNewEntry && (
                                <div className="bento-card" style={styles.entryForm}>
                                    <h3>Evolución Médica (SOAP)</h3>
                                    <div style={styles.formGrid}>
                                        <div style={styles.inputGroup}>
                                            <label>Motivo de Consulta</label>
                                            <input
                                                type="text"
                                                value={newEntry.reason}
                                                onChange={e => setNewEntry({ ...newEntry, reason: e.target.value })}
                                                placeholder="Ej: Control mensual"
                                            />
                                        </div>
                                        <div style={styles.row}>
                                            <div style={styles.inputGroup}>
                                                <label>Peso (kg)</label>
                                                <input type="text" placeholder="70" value={newEntry.weight} onChange={e => setNewEntry({ ...newEntry, weight: e.target.value })} />
                                            </div>
                                            <div style={styles.inputGroup}>
                                                <label>Presión Art.</label>
                                                <input type="text" placeholder="120/80" value={newEntry.bloodPressure} onChange={e => setNewEntry({ ...newEntry, bloodPressure: e.target.value })} />
                                            </div>
                                        </div>
                                        <div style={styles.inputGroup}>
                                            <label>Observaciones / Diagnóstico</label>
                                            <textarea
                                                rows={4}
                                                value={newEntry.observation}
                                                onChange={e => setNewEntry({ ...newEntry, observation: e.target.value })}
                                                placeholder="Descripción detallada de la atención..."
                                            />
                                        </div>
                                    </div>
                                    <button className="btn-primary" onClick={handleAddEntry} style={{ marginTop: '15px' }}>
                                        <Save size={18} />
                                        <span>Guardar en Ficha</span>
                                    </button>
                                </div>
                            )}

                            <div style={styles.timeline}>
                                {patient.history.map((entry, i) => (
                                    <div key={entry.id} style={styles.timelineEntry}>
                                        <div style={styles.timelineDot} />
                                        <div className="bento-card" style={styles.timelineCard}>
                                            <div style={styles.entryHeader}>
                                                <span><strong>{new Date(entry.date).toLocaleDateString()}</strong> - {entry.doctor}</span>
                                                <span style={styles.tag}>{entry.specialty}</span>
                                            </div>
                                            <h4>Motivo: {entry.reason}</h4>
                                            <p>{entry.observation}</p>
                                            {(entry.weight || entry.bloodPressure) && (
                                                <div style={styles.vitals}>
                                                    {entry.weight && <span>Peso: {entry.weight}</span>}
                                                    {entry.bloodPressure && <span>P.A: {entry.bloodPressure}</span>}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* RECETAS TAB */}
                    {activeTab === 'recetas' && (
                        <div style={styles.recetasContainer}>
                            <button className="btn-primary" onClick={() => setShowNewReceta(!showNewReceta)} style={{ marginBottom: '20px' }}>
                                <Plus size={18} />
                                <span>{showNewReceta ? 'Ocultar' : 'Emitir Nueva Receta'}</span>
                            </button>

                            {showNewReceta && (
                                <div className="bento-card" style={styles.entryForm}>
                                    <h3>Generador de Recetas</h3>
                                    {newReceta.items.map((item, i) => (
                                        <div key={i} style={styles.recetaItem}>
                                            <input
                                                placeholder="Medicamento (Ej: Amoxicilina 500mg)"
                                                style={{ flex: 1 }}
                                                value={item.medication}
                                                onChange={e => {
                                                    const newItems = [...newReceta.items];
                                                    newItems[i].medication = e.target.value;
                                                    setNewReceta({ ...newReceta, items: newItems });
                                                }}
                                            />
                                            <input
                                                placeholder="Instrucción (Ej: 1 cada 8h)"
                                                style={{ flex: 1 }}
                                                value={item.instruction}
                                                onChange={e => {
                                                    const newItems = [...newReceta.items];
                                                    newItems[i].instruction = e.target.value;
                                                    setNewReceta({ ...newReceta, items: newItems });
                                                }}
                                            />
                                        </div>
                                    ))}
                                    <button className="btn-primary" onClick={handleAddReceta} style={{ marginTop: '15px' }}>Emite Receta Digital</button>
                                </div>
                            )}

                            <div style={styles.recetasList}>
                                {patient.recetas.map(r => (
                                    <div key={r.id} className="bento-card" style={styles.recetaCard}>
                                        <div style={styles.entryHeader}>
                                            <strong>Receta - {new Date(r.date).toLocaleDateString()}</strong>
                                            <div style={{ display: 'flex', gap: '10px' }}>
                                                <button onClick={() => downloadRecetaPDF(r)} style={styles.iconBtn} title="Descargar PDF">
                                                    <Printer size={14} />
                                                </button>
                                                <button style={styles.iconBtn}><ExternalLink size={14} /></button>
                                            </div>
                                        </div>
                                        {r.items.map((item, i) => (
                                            <div key={i} style={{ marginBottom: '10px', fontSize: '0.9rem' }}>
                                                <strong>{item.medication}</strong>: {item.instruction}
                                            </div>
                                        ))}
                                        <p style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '10px' }}>Médico: {r.doctor}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* FILES TAB */}
                    {activeTab === 'files' && (
                        <div style={styles.filesGrid}>
                            <div style={{ gridColumn: '1/-1', marginBottom: '20px', display: 'flex', gap: '15px' }}>
                                <input
                                    type="text"
                                    placeholder="Nombre del archivo (ej: Ecografía Abdominal)"
                                    id="docName"
                                    style={{ ...styles.modalInput, margin: 0, flex: 1 }}
                                />
                                <select id="docType" style={{ ...styles.modalInput, margin: 0, width: '150px' }}>
                                    <option>Examen</option>
                                    <option>Epicrisis</option>
                                    <option>Consentimiento</option>
                                    <option>Otro</option>
                                </select>
                                <button
                                    className="btn-primary"
                                    onClick={() => {
                                        const name = document.getElementById('docName').value;
                                        const type = document.getElementById('docType').value;
                                        if (name) {
                                            addDocument(patient.id, { name, type });
                                            document.getElementById('docName').value = '';
                                        }
                                    }}
                                >
                                    <Plus size={18} />
                                    <span>Adjuntar</span>
                                </button>
                            </div>
                            {patient.documents.map(doc => (
                                <div key={doc.id} className="bento-card" style={styles.fileCard}>
                                    <Paperclip size={24} color="var(--primary)" />
                                    <div style={{ flex: 1 }}>
                                        <h4 style={{ fontSize: '0.9rem' }}>{doc.name}</h4>
                                        <p style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{doc.type} • {new Date(doc.date).toLocaleDateString()}</p>
                                    </div>
                                    <button style={styles.iconBtn}><Download size={16} /></button>
                                </div>
                            ))}
                            {patient.documents.length === 0 && <div style={{ gridColumn: '1/-1', ...styles.empty }}>No hay documentos adjuntos.</div>}
                        </div>
                    )}

                    {/* BILLING TAB */}
                    {activeTab === 'billing' && (
                        <div style={styles.billingContainer}>
                            <div className="bento-card" style={styles.debtBanner}>
                                <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                                    <AlertCircle color={patient.debts && patient.debts.some(d => d.type === 'Cargo') ? '#ef4444' : '#10b981'} size={32} />
                                    <div>
                                        <h3 style={{ color: patient.debts && patient.debts.some(d => d.type === 'Cargo') ? '#ef4444' : '#10b981' }}>
                                            {patient.debts && patient.debts.some(d => d.type === 'Cargo') ? 'Saldo Pendiente' : 'Cuenta al Día'}
                                        </h3>
                                        <p style={{ fontSize: '1.5rem', fontWeight: '900' }}>
                                            ${patient.debts ? patient.debts.reduce((acc, d) => d.type === 'Cargo' ? acc + d.amount : acc - d.amount, 0).toLocaleString() : 0}
                                        </p>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', gap: '10px' }}>
                                    <input
                                        type="number"
                                        id="payAmount"
                                        placeholder="Monto"
                                        style={{ ...styles.modalInput, margin: 0, width: '120px' }}
                                    />
                                    <button
                                        className="btn-primary"
                                        style={{ background: '#10b981' }}
                                        onClick={() => {
                                            const amount = parseInt(document.getElementById('payAmount').value);
                                            if (amount > 0) {
                                                addTransaction(patient.id, { amount, type: 'Abono', description: 'Pago de consulta' });
                                                document.getElementById('payAmount').value = '';
                                            }
                                        }}
                                    >
                                        Regularizar Pago
                                    </button>
                                </div>
                            </div>

                            <h3>Historial de Transacciones</h3>
                            <div className="bento-card" style={{ padding: '0' }}>
                                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                    <thead>
                                        <tr style={{ borderBottom: '1px solid #e2e8f0', textAlign: 'left', background: '#f8fafc' }}>
                                            <th style={{ padding: '12px 20px', fontSize: '0.85rem' }}>Fecha</th>
                                            <th style={{ padding: '12px 20px', fontSize: '0.85rem' }}>Descripción</th>
                                            <th style={{ padding: '12px 20px', fontSize: '0.85rem' }}>Tipo</th>
                                            <th style={{ padding: '12px 20px', fontSize: '0.85rem' }}>Monto</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {patient.debts && patient.debts.map(d => (
                                            <tr key={d.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                                <td style={{ padding: '12px 20px', fontSize: '0.85rem' }}>{new Date(d.date).toLocaleDateString()}</td>
                                                <td style={{ padding: '12px 20px', fontSize: '0.85rem' }}>{d.description}</td>
                                                <td style={{ padding: '12px 20px', fontSize: '0.85rem' }}>
                                                    <span style={{
                                                        padding: '4px 8px',
                                                        borderRadius: '6px',
                                                        fontSize: '0.75rem',
                                                        fontWeight: '700',
                                                        background: d.type === 'Cargo' ? '#fee2e2' : '#dcfce7',
                                                        color: d.type === 'Cargo' ? '#991b1b' : '#166534'
                                                    }}>
                                                        {d.type}
                                                    </span>
                                                </td>
                                                <td style={{ padding: '12px 20px', fontSize: '0.85rem', fontWeight: '800' }}>
                                                    {d.type === 'Cargo' ? '-' : '+'}${d.amount.toLocaleString()}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                {(!patient.debts || patient.debts.length === 0) && (
                                    <div style={styles.empty}>No hay transacciones registradas este período.</div>
                                )}
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
};

const styles = {
    overlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px' },
    modal: { background: '#f8fafc', width: '100%', maxWidth: '1000px', height: '90vh', borderRadius: '24px', display: 'flex', flexDirection: 'column', overflow: 'hidden' },
    header: { padding: '30px 40px', background: '#fff', borderBottom: '1.5px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
    patientInfo: { display: 'flex', gap: '20px', alignItems: 'center' },
    bigAvatar: { width: '60px', height: '60px', borderRadius: '18px', background: 'var(--primary-gradient)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem', fontWeight: '900' },
    patientName: { fontSize: '1.5rem', fontWeight: '900' },
    patientSub: { fontSize: '0.9rem', color: '#64748b', fontWeight: '600' },
    closeBtn: { border: 'none', background: 'none', fontSize: '1.5rem', cursor: 'pointer', color: '#94a3b8' },
    tabNav: { display: 'flex', background: '#fff', padding: '0 40px', gap: '30px', borderBottom: '1px solid #e2e8f0' },
    tab: { padding: '15px 0', background: 'none', border: 'none', fontWeight: '700', fontSize: '0.9rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px' },
    content: { flex: 1, padding: '40px', overflowY: 'auto' },
    summaryGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '25px' },
    infoCard: { padding: '25px' },
    cardTitle: { fontSize: '1.1rem', fontWeight: '800', marginBottom: '20px' },
    infoRow: { display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '0.95rem' },
    list: { paddingLeft: '20px', lineHeight: '1.8', fontSize: '0.95rem' },
    historyContainer: { display: 'flex', flexDirection: 'column', gap: '30px' },
    historyAction: { textAlign: 'right' },
    entryForm: { padding: '30px', background: '#fff', display: 'flex', flexDirection: 'column', gap: '20px' },
    formGrid: { display: 'flex', flexDirection: 'column', gap: '15px' },
    inputGroup: { display: 'flex', flexDirection: 'column', gap: '8px' },
    row: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' },
    timeline: { position: 'relative', paddingLeft: '30px', borderLeft: '2px solid #e2e8f0', marginLeft: '10px' },
    timelineEntry: { position: 'relative', marginBottom: '30px' },
    timelineDot: { position: 'absolute', left: '-37px', top: '15px', width: '12px', height: '12px', borderRadius: '50%', background: 'var(--primary)', border: '3px solid #fff' },
    timelineCard: { padding: '20px' },
    entryHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', fontSize: '0.85rem' },
    tag: { padding: '4px 10px', background: '#f1f5f9', borderRadius: '6px', fontWeight: '700' },
    vitals: { marginTop: '15px', display: 'flex', gap: '20px', fontSize: '0.8rem', color: '#64748b', fontWeight: '700' },
    recetaItem: { display: 'flex', gap: '10px' },
    recetasList: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '25px' },
    recetaCard: { padding: '20px' },
    iconBtn: { padding: '8px', border: '1.5px solid #e2e8f0', borderRadius: '8px', background: '#fff', cursor: 'pointer' },
    filesGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' },
    fileCard: { padding: '20px', display: 'flex', gap: '15px', alignItems: 'center' },
    debtBanner: { padding: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', background: '#fef2f2', borderRadius: '16px' },
    empty: { padding: '40px', textAlign: 'center', color: '#94a3b8', fontStyle: 'italic' },
    modalInput: { padding: '12px 16px', borderRadius: '10px', border: '1.5px solid #e2e8f0', fontSize: '0.9rem', outline: 'none', transition: 'all 0.2s', width: '100%', marginBottom: '15px' },
    modalOverlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' },
    modal: { background: '#fff', padding: '30px', borderRadius: '24px', width: '100%', maxWidth: '500px' }
};

export default PatientFile;
