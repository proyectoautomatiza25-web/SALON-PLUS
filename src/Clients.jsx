import React, { useState } from 'react';
import { useSaaSStore } from './store';

const Clients = ({ onOpenPatient }) => {
    const { patients } = useSaaSStore();
    const [searchTerm, setSearchTerm] = useState('');

    const filteredClients = patients.filter(c =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div style={styles.container}>
            <header style={styles.header}>
                <div>
                    <h1 style={styles.title}>Panel de Pacientes</h1>
                    <p style={styles.subtitle}>Gestión de fichas clínicas e historial de atenciones</p>
                </div>
                <button className="btn-primary" style={{ backgroundColor: 'var(--status-success)' }}>+ Nuevo Paciente</button>
            </header>

            <div className="card" style={styles.filterCard}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1 }}>
                    <span style={{ fontSize: '1.2rem' }}>🔍</span>
                    <input
                        type="text"
                        placeholder="Buscar por nombre o RUT..."
                        style={styles.searchInput}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div style={styles.stats}>
                    <div style={styles.statItem}>
                        <span style={styles.statLabel}>Registrados</span>
                        <span style={styles.statValue}>{patients.length}</span>
                    </div>
                    <div style={styles.statItem}>
                        <span style={styles.statLabel}>Activos</span>
                        <span style={styles.statValue}>{patients.filter(c => c.status === 'Activo').length}</span>
                    </div>
                </div>
            </div>

            <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
                <table style={styles.table}>
                    <thead>
                        <tr style={styles.tableHeader}>
                            <th style={styles.th}>Nombre del Paciente</th>
                            <th style={styles.th}>Contacto</th>
                            <th style={styles.th}>Estado</th>
                            <th style={styles.th}>Saldo</th>
                            <th style={styles.th}>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredClients.map(client => (
                            <tr key={client.id} style={styles.tr}>
                                <td style={styles.td}>
                                    <div style={styles.patientName}>{client.name}</div>
                                    <div style={styles.patientSub}>PAC-{client.id}002</div>
                                </td>
                                <td style={styles.td}>
                                    <div style={styles.contactInfo}>{client.email}</div>
                                    <div style={styles.contactInfo}>{client.phone}</div>
                                </td>
                                <td style={styles.td}>
                                    <span style={{
                                        ...styles.badge,
                                        backgroundColor: client.status === 'Activo' ? 'var(--status-success)' :
                                            client.status === 'Pendiente' ? 'var(--status-p)' : '#bdc3c7'
                                    }}>
                                        {client.status}
                                    </span>
                                </td>
                                <td style={styles.td}>
                                    <span style={{ fontWeight: '800', color: client.debt > 0 ? 'var(--status-pink)' : 'var(--text-muted)' }}>
                                        ${client.debt ? client.debt.toLocaleString() : '0'}
                                    </span>
                                </td>
                                <td style={styles.td}>
                                    <div style={styles.actions}>
                                        <button style={styles.actionBtn} onClick={() => onOpenPatient(client)}>Ver Ficha Clínica</button>
                                        <button style={{ ...styles.actionBtn, background: 'var(--primary)', color: 'white' }}>Agendar</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const styles = {
    container: { padding: '40px' },
    header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' },
    title: { fontSize: '2rem', fontWeight: '900', color: 'var(--primary)', margin: 0 },
    subtitle: { color: 'var(--text-muted)', margin: 0 },
    filterCard: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px', gap: '40px', padding: '20px 30px' },
    searchInput: { flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid var(--border)', fontSize: '1rem', background: 'transparent', outline: 'none' },
    stats: { display: 'flex', gap: '40px' },
    statItem: { textAlign: 'center' },
    statLabel: { display: 'block', fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '800', marginBottom: '5px' },
    statValue: { fontSize: '1.6rem', fontWeight: '900', color: 'var(--primary)' },
    table: { width: '100%', borderCollapse: 'collapse' },
    tableHeader: { background: '#fcfcfc' },
    th: { textAlign: 'left', padding: '15px', fontSize: '0.75rem', fontWeight: '800', color: 'var(--text-muted)', textTransform: 'uppercase' },
    tr: { borderBottom: '1px solid #f1f5f9' },
    td: { padding: '15px' },
    patientName: { fontWeight: '800', color: 'var(--text-main)', fontSize: '1.05rem' },
    patientSub: { fontSize: '0.75rem', color: 'var(--text-muted)' },
    contactInfo: { fontSize: '0.85rem' },
    badge: { padding: '5px 12px', borderRadius: '6px', color: 'white', fontSize: '0.7rem', fontWeight: '800' },
    actions: { display: 'flex', gap: '10px' },
    actionBtn: { border: '1px solid var(--border)', background: 'white', padding: '8px 15px', borderRadius: '8px', cursor: 'pointer', fontSize: '0.8rem', fontWeight: '700', color: 'var(--primary)' },
};

export default Clients;
