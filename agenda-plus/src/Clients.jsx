import React, { useState } from 'react';
import { Search, Plus, Filter, MoreHorizontal, FileText, Phone, Mail as MailIcon, User } from 'lucide-react';
import { useSaaSStore } from './store';

const Clients = ({ onOpenPatient, currentProfId }) => {
    const { patients, addPatient } = useSaaSStore();
    const [searchQuery, setSearchQuery] = useState('');
    const [showAddModal, setShowAddModal] = useState(false);
    const [newData, setNewData] = useState({ name: '', rut: '', phone: '', email: '', prevision: 'Fonasa', category: 'General' });

    const handleAdd = (e) => {
        e.preventDefault();
        addPatient({ ...newData, ownerProfId: currentProfId });
        setShowAddModal(false);
        setNewData({ name: '', rut: '', phone: '', email: '', prevision: 'Fonasa', category: 'General' });
    };

    const filteredPatients = patients.filter(p =>
        p.ownerProfId === currentProfId && (
            p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.rut.includes(searchQuery)
        )
    );

    return (
        <div style={{ padding: '40px' }}>
            <header style={styles.header}>
                <h1 style={{ fontSize: '2rem', fontWeight: '900', color: 'var(--primary)' }}>Base de Pacientes</h1>
                <div style={{ display: 'flex', gap: '15px' }}>
                    <div style={styles.searchContainer}>
                        <Search size={18} color="#94a3b8" />
                        <input
                            type="text"
                            placeholder="Buscar por nombre o RUT..."
                            style={styles.searchInput}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <button className="btn-primary" onClick={() => setShowAddModal(true)}>
                        <Plus size={20} />
                        <span>Ficha Nueva</span>
                    </button>
                </div>
            </header>

            {/* ADD PATIENT MODAL */}
            {showAddModal && (
                <div style={styles.modalOverlay}>
                    <div className="glass-panel animate-slide" style={styles.modal}>
                        <h3>Ingresar Nuevo Paciente</h3>
                        <form onSubmit={handleAdd} style={styles.form}>
                            <input placeholder="Nombre Completo" value={newData.name} onChange={e => setNewData({ ...newData, name: e.target.value })} style={styles.modalInput} required />
                            <input placeholder="RUT (12.345.678-0)" value={newData.rut} onChange={e => setNewData({ ...newData, rut: e.target.value })} style={styles.modalInput} required />
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                                <input placeholder="Teléfono" value={newData.phone} onChange={e => setNewData({ ...newData, phone: e.target.value })} style={styles.modalInput} required />
                                <input placeholder="Email" type="email" value={newData.email} onChange={e => setNewData({ ...newData, email: e.target.value })} style={styles.modalInput} required />
                            </div>
                            <select value={newData.prevision} onChange={e => setNewData({ ...newData, prevision: e.target.value })} style={styles.modalInput}>
                                <option>Fonasa</option>
                                <option>Isapre Colmena</option>
                                <option>Isapre Banmédica</option>
                                <option>Particular</option>
                            </select>
                            <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                                <button type="button" onClick={() => setShowAddModal(false)} style={styles.cancelBtn}>Cancelar</button>
                                <button type="submit" className="btn-primary" style={{ flex: 1 }}>Crear Ficha</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <div className="bento-card" style={styles.tableCard}>
                <table style={styles.table}>
                    <thead>
                        <tr style={styles.tableHeader}>
                            <th style={{ ...styles.th, width: '60px' }}>#</th>
                            <th style={styles.th}>Paciente</th>
                            <th style={styles.th}>RUT / ID</th>
                            <th style={styles.th}>Contacto</th>
                            <th style={styles.th}>Previsión</th>
                            <th style={styles.th}>Categoría</th>
                            <th style={{ ...styles.th, textAlign: 'right' }}>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredPatients.map((patient, index) => (
                            <tr key={patient.id} style={styles.tr}>
                                <td style={styles.td}>{index + 1}</td>
                                <td style={styles.td}>
                                    <div style={styles.patientCell}>
                                        <div style={styles.smallAvatar}>{patient.name.charAt(0)}</div>
                                        <div style={{ fontWeight: '700', color: '#1e293b' }}>{patient.name}</div>
                                    </div>
                                </td>
                                <td style={styles.td}>{patient.rut}</td>
                                <td style={styles.td}>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', color: '#64748b' }}>
                                            <Phone size={12} /> {patient.phone}
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', color: '#64748b' }}>
                                            <MailIcon size={12} /> {patient.email}
                                        </div>
                                    </div>
                                </td>
                                <td style={styles.td}>
                                    <span style={{ ...styles.badge, background: '#dbeafe', color: '#1e40af' }}>{patient.prevision}</span>
                                </td>
                                <td style={styles.td}>
                                    <span style={{ ...styles.badge, background: '#fef3c7', color: '#92400e' }}>{patient.category}</span>
                                </td>
                                <td style={{ ...styles.td, textAlign: 'right' }}>
                                    <button
                                        onClick={() => onOpenPatient(patient)}
                                        className="btn-primary"
                                        style={{ padding: '8px 15px', fontSize: '0.8rem', background: '#fff', color: 'var(--primary)', border: '1.5px solid var(--primary)' }}
                                    >
                                        Ver Ficha
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {filteredPatients.length === 0 && (
                    <div style={styles.empty}>
                        <Search size={48} color="#cbd5e1" />
                        <p>No se encontraron pacientes con esos criterios.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

const styles = {
    header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' },
    searchContainer: { display: 'flex', alignItems: 'center', gap: '12px', background: '#fff', padding: '10px 20px', borderRadius: '14px', border: '1.5px solid #e2e8f0', width: '350px' },
    searchInput: { border: 'none', outline: 'none', width: '100%', fontSize: '0.9rem', fontWeight: '600' },
    tableCard: { background: '#fff', overflow: 'hidden', padding: '10px' },
    table: { width: '100%', borderCollapse: 'collapse' },
    tableHeader: { borderBottom: '2px solid #f1f5f9' },
    th: { textAlign: 'left', padding: '15px 20px', fontSize: '0.8rem', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase' },
    td: { padding: '20px', borderBottom: '1px solid #f1f5f9', fontSize: '0.9rem', verticalAlign: 'middle' },
    tr: { transition: 'background 0.2s', ':hover': { background: '#f8fafc' } },
    patientCell: { display: 'flex', alignItems: 'center', gap: '15px' },
    smallAvatar: { width: '36px', height: '36px', borderRadius: '10px', background: 'var(--primary-gradient)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '900', fontSize: '1rem' },
    badge: { padding: '4px 12px', borderRadius: '8px', fontSize: '0.75rem', fontWeight: '700' },
    empty: { padding: '80px', textAlign: 'center', color: '#94a3b8', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' },
    modalOverlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' },
    modal: { background: '#fff', padding: '40px', borderRadius: '24px', width: '100%', maxWidth: '500px' },
    form: { display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' },
    modalInput: { padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #e2e8f0', fontSize: '0.95rem', outline: 'none', width: '100%' },
    cancelBtn: { padding: '12px 20px', borderRadius: '12px', border: '1.5px solid #e2e8f0', background: '#fff', color: '#64748b', fontWeight: '700', cursor: 'pointer' }
};

export default Clients;
