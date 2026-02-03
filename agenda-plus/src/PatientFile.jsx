import React, { useState, useEffect } from 'react';
import {
    User, Clipboard, Paperclip, CreditCard,
    Save, MessageCircle, History, X, Phone, Mail, FileText, Printer, FileDown, Plus, TrendingUp, Send,
    Sparkles, Loader2
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useSaaSStore } from './store';
import { api } from './api';


const PatientFile = ({ patient, onClose }) => {
    const [activeTab, setActiveTab] = useState('summary');
    const { appointments, updateAppointment, updatePatient, patients } = useSaaSStore();

    // Debug logging
    console.log('[PatientFile] Paciente recibido:', patient);
    console.log('[PatientFile] Total citas en store:', appointments.length);

    // Verificar que el paciente existe
    if (!patient) {
        console.error('[PatientFile] ERROR: Paciente es null o undefined');
        return (
            <div style={styles.overlay}>
                <div style={styles.modal}>
                    <p>No se pudo cargar el paciente</p>
                    <button onClick={onClose}>Cerrar</button>
                </div>
            </div>
        );
    }

    const formatIsoDate = (date) => {
        if (!date) return '';
        const d = new Date(date);
        return isNaN(d) ? '' : d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
    };

    const formatDateDisplay = (date) => {
        if (!date || !(new Date(date) instanceof Date) || isNaN(new Date(date))) return 'Sin fecha';
        return new Date(date).toLocaleDateString('es-CL');
    };

    // Obtener citas del paciente - Comparación robusta de IDs
    const patientAppointments = (appointments || [])
        .filter(a => {
            const appointmentClientId = String(a.client_id || a.patientId || '');
            const currentPatientId = String(patient.id || '');
            return appointmentClientId === currentPatientId;
        })
        .sort((a, b) => {
            const dateA = new Date(a.start_time || a.start);
            const dateB = new Date(b.start_time || b.start);
            return dateB - dateA; // Más reciente primero
        });

    const [selectedAppt, setSelectedAppt] = useState(patientAppointments[0] || null);

    // Form states for editing
    const [editData, setEditData] = useState({
        anamnesis: '',
        physical_exam: '',
        diagnosis: '',
        indications: '',
        weight: '',
        height: '',
        imc: ''
    });

    const [labText, setLabText] = useState('');
    const [labAnalysis, setLabAnalysis] = useState('');
    const [aiLoading, setAiLoading] = useState(null); // 'anamnesis', 'diagnosis', 'indications', 'dose_calc', 'lab_analysis'

    const handleAIExpand = async (field, type, customText = null) => {
        const textToUse = customText || editData[field];
        if (!textToUse || textToUse.length < 3) {
            alert("Escriba algo primero.");
            return;
        }

        setAiLoading(type === 'dose_calc' ? 'dose_calc' : field);
        try {
            const response = await api.expandMedicalNote(textToUse, type);
            if (type === 'dose_calc') {
                setEditData(prev => ({
                    ...prev,
                    [field]: prev[field] + "\n\nDOSIS SUGERIDA: " + response.expanded_text
                }));
            } else {
                setEditData(prev => ({
                    ...prev,
                    [field]: response.expanded_text
                }));
            }
        } catch (error) {
            console.error("AI Error:", error);
            alert("Error al conectar con Gemini.");
        } finally {
            setAiLoading(null);
        }
    };

    useEffect(() => {
        if (selectedAppt) {
            setEditData({
                anamnesis: selectedAppt.anamnesis || '',
                physical_exam: selectedAppt.physical_exam || '',
                diagnosis: selectedAppt.diagnosis || '',
                indications: selectedAppt.indications || '',
                weight: selectedAppt.weight || '',
                height: selectedAppt.height || '',
                imc: selectedAppt.imc || ''
            });
        }
    }, [selectedAppt]);

    // REAL INTEGRATION: WhatsApp
    const sendWhatsApp = (msg) => {
        const phone = (patient.phone || '').replace(/\+/g, '').replace(/\s/g, '');
        if (!phone) {
            alert("El paciente no tiene teléfono registrado");
            return;
        }
        const url = `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
        window.open(url, '_blank');
    };

    const handleSaveClinical = async () => {
        if (!selectedAppt) {
            alert("No hay una cita seleccionada para guardar la evolución");
            return;
        }
        await updateAppointment(selectedAppt.id, {
            ...selectedAppt,
            ...editData,
            status: 'attended'
        });
        alert("Evolución clínica guardada correctamente");
    };

    const tabs = [
        { id: 'summary', label: 'Resumen', icon: User },
        { id: 'clinical', label: 'Ficha Médica', icon: Clipboard },
        { id: 'growth', label: 'Crecimiento', icon: TrendingUp },
        { id: 'documents', label: 'Documentos', icon: FileText },
        { id: 'files', label: 'Exámenes', icon: Paperclip }
    ];

    // Local state for recipes
    const [recipes, setRecipes] = useState([]);
    const [isIssuingRecipe, setIsIssuingRecipe] = useState(false);
    const [newRecipe, setNewRecipe] = useState({
        rp: '',
        date: formatIsoDate(new Date()),
        type: 'recipe'
    });

    const handleIssueRecipe = () => {
        const doc = {
            ...newRecipe,
            id: Date.now(),
            patientName: patient.name,
            patientRut: patient.rut
        };
        setRecipes([doc, ...recipes]);
        setIsIssuingRecipe(false);
        setNewRecipe({ rp: '', date: formatIsoDate(new Date()), type: 'recipe' });
        alert("Documento guardado correctamente.");
    };

    const printRecipe = (recipe) => {
        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
            <html>
                <head>
                    <title>Documento Clínico - ${patient.name}</title>
                    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&display=swap" rel="stylesheet">
                    <style>
                        @page { margin: 0; size: letter; }
                        body { font-family: 'Inter', sans-serif; padding: 40px; color: #1e293b; max-width: 800px; margin: 0 auto; line-height: 1.5; }
                        .header-brand { display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 3px solid #004975; padding-bottom: 20px; margin-bottom: 30px; }
                        .brand-logo { color: #004975; font-weight: 900; font-size: 28px; text-transform: uppercase; letter-spacing: -1px; }
                        .brand-sub { font-size: 14px; color: #64748b; font-weight: 500; margin-top: 5px; }
                        .clinic-details { text-align: right; font-size: 12px; color: #64748b; }
                        
                        .doc-title { text-align: center; text-transform: uppercase; letter-spacing: 2px; font-weight: 800; font-size: 22px; margin: 40px 0; color: #0f172a; border: 2px solid #e2e8f0; padding: 10px; border-radius: 8px; }
                        
                        .patient-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; background: #f8fafc; padding: 25px; border-radius: 12px; margin-bottom: 40px; border: 1px solid #e2e8f0; }
                        .field-label { font-size: 11px; text-transform: uppercase; color: #64748b; font-weight: 700; margin-bottom: 4px; letter-spacing: 0.5px; }
                        .field-value { font-size: 16px; font-weight: 600; color: #334155; }
                        
                        .rp-section { margin-bottom: 60px; }
                        .rp-header { font-size: 24px; font-weight: 900; color: #004975; margin-bottom: 15px; font-family: serif; font-style: italic; }
                        .rp-content { min-height: 300px; font-size: 16px; line-height: 1.8; white-space: pre-wrap; padding: 0 10px; }
                        
                        .footer { position: fixed; bottom: 40px; left: 40px; right: 40px; text-align: center; }
                        .signature-box { display: flex; justify-content: flex-end; margin-bottom: 60px; padding-right: 20px; }
                        .signature-line { width: 250px; text-align: center; border-top: 2px solid #334155; padding-top: 10px; }
                        .doc-name { font-weight: 700; font-size: 14px; }
                        .doc-rut { font-size: 12px; color: #64748b; }
                        
                        .legal-footer { font-size: 10px; color: #94a3b8; text-align: center; border-top: 1px solid #e2e8f0; padding-top: 15px; }
                        
                        @media print { 
                            .no-print { display: none; } 
                            body { padding: 20px; }
                            .footer { position: fixed; bottom: 20px; }
                        }
                    </style>
                </head>
                <body>
                    <div class="header-brand">
                        <div>
                            <div class="brand-logo">Agenda<span style="color: #38bdf8">Plus</span></div>
                            <div class="brand-sub">Centro Médico Integral</div>
                        </div>
                        <div class="clinic-details">
                            Av. Providencia 1234, Of. 601<br>
                            Santiago, Chile<br>
                            +56 2 2345 6789<br>
                            contacto@agendaplus.cl
                        </div>
                    </div>

                    <div class="doc-title">${recipe.type === 'recipe' ? 'RECETA MÉDICA' : 'CERTIFICADO CLÍNICO'}</div>

                    <div class="patient-grid">
                        <div>
                            <div class="field-label">Paciente</div>
                            <div class="field-value">${patient.name}</div>
                        </div>
                        <div>
                            <div class="field-label">RUT</div>
                            <div class="field-value">${patient.rut || 'Sin RUT'}</div>
                        </div>
                        <div>
                            <div class="field-label">Fecha de Emisión</div>
                            <div class="field-value">${formatDateDisplay(recipe.date)}</div>
                        </div>
                        <div>
                            <div class="field-label">Edad</div>
                            <div class="field-value">${patient.age || '-'}</div>
                        </div>
                    </div>

                    <div class="rp-section">
                        ${recipe.type === 'recipe' ? '<div class="rp-header">Rp.</div>' : ''}
                        <div class="rp-content">${recipe.rp}</div>
                    </div>

                    <div class="footer">
                        <div class="signature-box">
                            <div class="signature-line">
                                <div class="doc-name">Dra. Francis Zabaleta</div>
                                <div class="doc-rut">Médico Cirujano - RUT: 12.345.678-9</div>
                                <div class="doc-rut">Reg. Col. Med: 45678</div>
                            </div>
                        </div>
                        <div class="legal-footer">
                            Documento generado electrónicamente por Agenda Plus Software Médico. 
                            La validez de este documento debe ser verificada según normativa vigente.
                        </div>
                    </div>

                    <script>
                        setTimeout(() => { window.print(); window.close(); }, 500);
                    </script>
                </body>
            </html>
        `);
        printWindow.document.close();
    };

    return (
        <div style={styles.overlay}>
            <div style={styles.modal} className="glass-panel animate-slide">
                <header style={styles.header}>
                    <div style={styles.patientInfo}>
                        <div style={styles.bigAvatar}>{patient.name?.charAt(0)}</div>
                        <div>
                            <h2 style={styles.patientName}>{patient.name}</h2>
                            <p style={styles.patientSub}>{patient.rut} • {patient.prevision || 'Sin Previsión'} • {patient.category || 'General'}</p>
                        </div>
                    </div>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <button
                            onClick={() => sendWhatsApp(`Hola ${patient.name}, te saludo de la Agenda Plus...`)}
                            title="Enviar WhatsApp"
                            style={{ ...styles.iconBtn, color: '#25D366', borderColor: '#25D366' }}
                        >
                            <MessageCircle size={20} />
                        </button>
                        <button onClick={onClose} style={styles.closeBtn}>✕</button>
                    </div>
                </header>

                <nav style={styles.tabNav}>
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            style={{
                                ...styles.tab,
                                color: activeTab === tab.id ? '#004975' : '#94a3b8',
                                borderBottom: activeTab === tab.id ? '3px solid #004975' : 'none'
                            }}
                        >
                            <tab.icon size={18} />
                            <span>{tab.label}</span>
                        </button>
                    ))}
                </nav>

                <div style={styles.content}>
                    {activeTab === 'summary' && (
                        <div style={styles.summaryGrid}>
                            <div className="bento-card" style={styles.infoCard}>
                                <h3 style={styles.cardTitle}>Datos Personales</h3>
                                <div style={styles.infoRow}><span>Email:</span> <strong>{patient.email}</strong></div>
                                <div style={styles.infoRow}><span>Teléfono:</span> <strong>{patient.phone}</strong></div>
                                <div style={styles.infoRow}><span>Previsión:</span> <strong>{patient.prevision}</strong></div>
                                <div style={styles.infoRow}><span>Dirección:</span> <strong>{patient.address}</strong></div>
                                <div style={styles.infoRow}><span>Categoría:</span> <strong>{patient.category}</strong></div>
                            </div>
                            <div className="bento-card" style={{ ...styles.infoCard, borderLeft: '4px solid #ef4444' }}>
                                <h3 style={styles.cardTitle}>⚠️ Alergias</h3>
                                <p style={{ fontSize: '0.95rem' }}>{patient.allergies || 'Ninguna registrada'}</p>
                            </div>
                            <div className="bento-card" style={{ ...styles.infoCard, borderLeft: '4px solid #3b82f6' }}>
                                <h3 style={styles.cardTitle}>💊 Medicación Actual</h3>
                                <p style={{ fontSize: '0.95rem' }}>{patient.medications || 'Ninguna registrada'}</p>
                            </div>
                        </div>
                    )}

                    {activeTab === 'clinical' && (
                        <div style={styles.clinicalLayout}>
                            <div style={styles.clinicalSidebar}>
                                <h3>Historial de Citas</h3>
                                {patientAppointments.map(appt => (
                                    <button
                                        key={appt.id}
                                        onClick={() => setSelectedAppt(appt)}
                                        style={{
                                            ...styles.apptSelector,
                                            background: selectedAppt?.id === appt.id ? '#e0f2fe' : '#fff',
                                            borderColor: selectedAppt?.id === appt.id ? '#004975' : '#e2e8f0'
                                        }}
                                    >
                                        <div style={{ fontWeight: '700' }}>{formatDateDisplay(appt.start)}</div>
                                        <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{appt.title}</div>
                                    </button>
                                ))}
                            </div>

                            <div style={styles.clinicalMain}>
                                {selectedAppt ? (
                                    <div style={styles.evolutionForm}>
                                        <div style={styles.formHeader}>
                                            <h3>Evolución Clínica - {formatDateDisplay(selectedAppt.start)}</h3>
                                            <div style={{ display: 'flex', gap: '10px' }}>
                                                <button
                                                    className="btn-primary"
                                                    style={{ background: '#25D366', borderColor: '#25D366' }}
                                                    onClick={() => {
                                                        const msg = `🏥 *SEGUIMIENTO MÉDICO: ADULTO-INFANTIL*\n\nHola *${patient.name}*, espero que estés bien. Soy el *Dr. Francis Zabaleta*.\n\nRecuerdo que en nuestro control de hoy vimos: "${editData.diagnosis || 'Consulta General'}".\n\n📌 *Indicaciones clave:*\n${editData.indications || 'Seguir tratamiento indicado.'}\n\nEstaré atento a cualquier duda por aquí. ¡Que tengas un excelente día!`;
                                                        sendWhatsApp(msg);
                                                    }}
                                                >
                                                    <Send size={18} />
                                                    <span>Enviar Seguimiento WA</span>
                                                </button>
                                                <button className="btn-primary" onClick={handleSaveClinical}>
                                                    <Save size={18} />
                                                    <span>Guardar Ficha</span>
                                                </button>
                                            </div>
                                        </div>

                                        <div style={styles.sectionHeader}>
                                            Anamnesis
                                            <button
                                                onClick={() => handleAIExpand('anamnesis', 'anamnesis')}
                                                style={styles.aiBtn}
                                                disabled={aiLoading === 'anamnesis'}
                                            >
                                                {aiLoading === 'anamnesis' ? <Loader2 size={14} className="animate-spin" /> : <Sparkles size={14} />}
                                                <span>Aumentar profesionalismo</span>
                                            </button>
                                        </div>
                                        <textarea
                                            style={styles.textArea}
                                            rows={4}
                                            value={editData.anamnesis}
                                            onChange={e => setEditData({ ...editData, anamnesis: e.target.value })}
                                            placeholder="Describa el motivo de consulta y antecedentes..."
                                        />

                                        <div style={styles.sectionHeader}>Examen Físico y Mediciones</div>
                                        <div style={styles.vitalsRow}>
                                            <div style={styles.vitalInput}>
                                                <label>Peso (kg)</label>
                                                <input type="text" value={editData.weight} onChange={e => setEditData({ ...editData, weight: e.target.value })} />
                                            </div>
                                            <div style={styles.vitalInput}>
                                                <label>Talla (cm)</label>
                                                <input type="text" value={editData.height} onChange={e => setEditData({ ...editData, height: e.target.value })} />
                                            </div>
                                            <div style={styles.vitalInput}>
                                                <label>IMC</label>
                                                <input type="text" value={editData.imc} onChange={e => setEditData({ ...editData, imc: e.target.value })} />
                                            </div>
                                        </div>
                                        <textarea
                                            style={styles.textArea}
                                            rows={4}
                                            value={editData.physical_exam}
                                            onChange={e => setEditData({ ...editData, physical_exam: e.target.value })}
                                            placeholder="Hallazgos en el examen físico..."
                                        />

                                        <div style={styles.sectionHeader}>
                                            Diagnóstico
                                            <button
                                                onClick={() => handleAIExpand('diagnosis', 'diagnosis')}
                                                style={styles.aiBtn}
                                                disabled={aiLoading === 'diagnosis'}
                                            >
                                                {aiLoading === 'diagnosis' ? <Loader2 size={14} className="animate-spin" /> : <Sparkles size={14} />}
                                                <span>Sugerir detalle médico</span>
                                            </button>
                                        </div>
                                        <textarea
                                            style={styles.textArea}
                                            rows={2}
                                            value={editData.diagnosis}
                                            onChange={e => setEditData({ ...editData, diagnosis: e.target.value })}
                                            placeholder="Diagnóstico clínico (CIE-10 si aplica)..."
                                        />

                                        <div style={styles.sectionHeader}>
                                            Indicaciones y Tratamiento
                                            <div style={{ display: 'flex', gap: '8px' }}>
                                                <button
                                                    onClick={() => {
                                                        const med = prompt("¿Qué medicamento quieres calcular? (Ej: Paracetamol, Ibuprofeno)");
                                                        if (med) handleAIExpand('indications', 'dose_calc', `${med}. Peso del paciente: ${editData.weight}kg`);
                                                    }}
                                                    style={{ ...styles.aiBtn, background: '#fef3c7', color: '#92400e' }}
                                                    disabled={aiLoading === 'dose_calc' || !editData.weight}
                                                >
                                                    {aiLoading === 'dose_calc' ? <Loader2 size={12} className="animate-spin" /> : <TrendingUp size={12} />}
                                                    <span>Calc. Dosis</span>
                                                </button>
                                                <button
                                                    onClick={() => handleAIExpand('indications', 'indications')}
                                                    style={{ ...styles.aiBtn, background: 'linear-gradient(135deg, #10b981, #3b82f6)', color: '#fff' }}
                                                    disabled={aiLoading === 'indications'}
                                                >
                                                    {aiLoading === 'indications' ? <Loader2 size={14} className="animate-spin" /> : <Sparkles size={14} />}
                                                    <span>Generar Receta Pro</span>
                                                </button>
                                            </div>
                                        </div>
                                        <textarea
                                            style={styles.textArea}
                                            rows={4}
                                            value={editData.indications}
                                            onChange={e => setEditData({ ...editData, indications: e.target.value })}
                                            placeholder="Receta, próximos controles, derivaciones..."
                                        />
                                    </div>
                                ) : (
                                    <div style={styles.emptyState}>
                                        <History size={48} color="#cbd5e1" />
                                        <p>Seleccione una cita del historial para ver o editar la evolución clínica.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {activeTab === 'growth' && (
                        <div style={{ background: '#fff', borderRadius: '20px', padding: '25px', height: '100%' }}>
                            <div style={{ marginBottom: '25px', borderBottom: '1px solid #f1f5f9', paddingBottom: '15px' }}>
                                <h3 style={{ margin: 0, color: '#004975' }}>Curvas de Crecimiento OMS</h3>
                                <p style={{ fontSize: '0.85rem', color: '#64748b' }}>Evolución histórica de peso y talla basada en sus controles.</p>
                            </div>
                            <div style={{ height: '350px', width: '100%' }}>
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart
                                        data={patientAppointments
                                            .filter(a => a.weight || a.height)
                                            .sort((a, b) => new Date(a.start) - new Date(b.start))
                                            .map(a => ({
                                                name: formatDateDisplay(a.start),
                                                peso: parseFloat(a.weight) || 0,
                                                talla: parseFloat(a.height) || 0
                                            }))}
                                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                                    >
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                        <XAxis dataKey="name" fontSize={11} stroke="#94a3b8" />
                                        <YAxis yAxisId="left" orientation="left" stroke="#004975" />
                                        <YAxis yAxisId="right" orientation="right" stroke="#10b981" />
                                        <Tooltip />
                                        <Legend />
                                        <Line yAxisId="left" type="monotone" dataKey="peso" stroke="#004975" name="Peso (Kg)" />
                                        <Line yAxisId="right" type="monotone" dataKey="talla" stroke="#10b981" name="Talla (Cm)" />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    )}

                    {activeTab === 'documents' && (
                        <div style={styles.docsLayout}>
                            {isIssuingRecipe ? (
                                <div className="bento-card animate-reveal" style={styles.recipeForm}>
                                    <h3 style={{ margin: 0 }}>Emitir {newRecipe.type === 'recipe' ? 'Receta' : 'Certificado'}</h3>
                                    <textarea
                                        style={styles.textArea}
                                        rows={12}
                                        value={newRecipe.rp}
                                        onChange={e => setNewRecipe({ ...newRecipe, rp: e.target.value })}
                                        placeholder="Escriba el RP o el cuerpo del certificado aquí..."
                                    />
                                    <div style={styles.recipeFooter}>
                                        <button style={styles.cancelBtn} onClick={() => setIsIssuingRecipe(false)}>Cancelar</button>
                                        <button className="btn-primary" onClick={handleIssueRecipe}>Guardar Documento</button>
                                    </div>
                                </div>
                            ) : (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <h3 style={{ margin: 0 }}>Historial de Documentos</h3>
                                        <button className="btn-primary" onClick={() => setIsIssuingRecipe(true)}>
                                            <Plus size={18} />
                                            <span>Nuevo Documento</span>
                                        </button>
                                    </div>
                                    <div style={styles.docsGrid}>
                                        {recipes.map(r => (
                                            <div key={r.id} className="bento-card" style={styles.docCard}>
                                                <div>
                                                    <div style={{ fontWeight: '700' }}>{r.type === 'recipe' ? 'Receta' : 'Certificado'}</div>
                                                    <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{r.date}</div>
                                                </div>
                                                <div style={styles.docActions}>
                                                    <button onClick={() => printRecipe(r)} style={styles.miniBtn}><Printer size={16} /></button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === 'files' && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            <div className="bento-card" style={{ padding: '25px', background: 'linear-gradient(to bottom right, #ffffff, #f0f9ff)' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
                                    <Sparkles size={24} color="#004975" />
                                    <h3 style={{ margin: 0, color: '#004975' }}>Analista de Laboratorio IA</h3>
                                </div>
                                <p style={{ fontSize: '0.9rem', color: '#64748b', marginBottom: '15px' }}>
                                    Pega los resultados del examen para que Gemini analice tendencias.
                                </p>
                                <textarea
                                    style={styles.textArea}
                                    rows={6}
                                    value={labText}
                                    onChange={(e) => setLabText(e.target.value)}
                                    placeholder="Ej: Hemoglobina 10.5 g/dL..."
                                />
                                <button
                                    onClick={async () => {
                                        setAiLoading('lab_analysis');
                                        try {
                                            const res = await api.expandMedicalNote(labText, 'lab_analysis');
                                            setLabAnalysis(res.expanded_text);
                                        } catch (e) { alert("Error al analizar"); }
                                        finally { setAiLoading(null); }
                                    }}
                                    className="btn-primary"
                                    style={{ marginTop: '15px', width: '100%', justifyContent: 'center' }}
                                    disabled={aiLoading === 'lab_analysis' || !labText}
                                >
                                    {aiLoading === 'lab_analysis' ? <Loader2 size={18} className="animate-spin" /> : <Sparkles size={18} />}
                                    <span>Analizar Resultados</span>
                                </button>
                                {labAnalysis && (
                                    <div style={{ marginTop: '20px', padding: '15px', background: '#fff', borderRadius: '12px', borderLeft: '4px solid #004975' }}>
                                        <div style={{ fontSize: '0.95rem', whiteSpace: 'pre-wrap' }}>{labAnalysis}</div>
                                    </div>
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
    overlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' },
    modal: { background: '#fff', width: '900px', maxWidth: '95vw', height: '85vh', borderRadius: '24px', display: 'flex', flexDirection: 'column', overflow: 'hidden', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' },
    header: { padding: '20px 30px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f8fafc' },
    patientInfo: { display: 'flex', alignItems: 'center', gap: '15px' },
    bigAvatar: { width: '50px', height: '50px', borderRadius: '25px', background: '#004975', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: 'bold' },
    patientName: { margin: 0, fontSize: '1.4rem', color: '#1e293b', fontWeight: '800' },
    patientSub: { margin: 0, fontSize: '0.85rem', color: '#64748b' },
    closeBtn: { border: 'none', background: 'none', fontSize: '1.5rem', cursor: 'pointer', color: '#94a3b8' },
    iconBtn: { padding: '8px', borderRadius: '10px', border: '1.5px solid #e2e8f0', background: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' },
    tabNav: { display: 'flex', gap: '30px', padding: '0 30px', borderBottom: '1px solid #e2e8f0', background: '#fff' },
    tab: { padding: '15px 5px', border: 'none', background: 'none', fontSize: '0.9rem', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', transition: 'all 0.2s' },
    content: { flex: 1, padding: '30px', overflowY: 'auto', background: '#f1f5f9' },
    summaryGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' },
    infoCard: { background: '#fff', padding: '20px', borderRadius: '16px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' },
    cardTitle: { marginTop: 0, marginBottom: '15px', fontSize: '1rem', color: '#1e293b', fontWeight: '700' },
    infoRow: { display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #f1f5f9', fontSize: '0.9rem' },
    clinicalLayout: { display: 'grid', gridTemplateColumns: '250px 1fr', gap: '25px', height: '100%' },
    clinicalSidebar: { background: '#fff', borderRadius: '16px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '10px', border: '1px solid #e2e8f0' },
    apptSelector: { padding: '12px', borderRadius: '12px', border: '1.5px solid #e2e8f0', textAlign: 'left', cursor: 'pointer', transition: 'all 0.2s' },
    clinicalMain: { background: '#fff', borderRadius: '16px', padding: '25px', border: '1px solid #e2e8f0', overflowY: 'auto' },
    evolutionForm: { display: 'flex', flexDirection: 'column', gap: '15px' },
    formHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' },
    sectionHeader: { fontSize: '0.85rem', fontWeight: '800', color: '#004975', textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
    aiBtn: { padding: '4px 10px', borderRadius: '20px', border: 'none', background: '#f0f9ff', color: '#0369a1', fontSize: '0.7rem', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', transition: 'all 0.3s ease', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' },
    textArea: { width: '100%', padding: '12px', borderRadius: '12px', border: '1.5px solid #e2e8f0', fontSize: '0.95rem', outline: 'none', resize: 'vertical', fontFamily: 'inherit' },
    vitalsRow: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px' },
    vitalInput: { display: 'flex', flexDirection: 'column', gap: '5px' },
    emptyState: { height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#64748b', gap: '15px', textAlign: 'center', minHeight: '300px' },
    docsLayout: { height: '100%', display: 'flex', flexDirection: 'column' },
    recipeForm: { background: '#fff', padding: '25px', borderRadius: '20px', display: 'flex', flexDirection: 'column', gap: '20px' },
    recipeFooter: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '15px', borderTop: '1px solid #f1f5f9' },
    cancelBtn: { border: 'none', background: 'none', color: '#ef4444', fontWeight: '700', cursor: 'pointer' },
    docsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '15px' },
    docCard: { padding: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0' },
    docActions: { display: 'flex', gap: '5px' },
    miniBtn: { width: '32px', height: '32px', borderRadius: '8px', border: '1.5px solid #f1f5f9', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#64748b' }
};

export default PatientFile;
