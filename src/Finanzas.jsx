import React from 'react';

const Finanzas = ({ appointments, patients }) => {
    const totalSales = appointments.length * 35000;
    const pendingDebt = patients.reduce((acc, p) => acc + (p.debt || 0), 0);

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Panel Financiero Real</h1>
            <p style={styles.sub}>Basado en las citas agendadas y deudas de pacientes</p>

            <div style={styles.grid}>
                <div className="card" style={styles.card}>
                    <div style={styles.label}>Ventas Totales Proyectadas</div>
                    <div style={styles.value}>${totalSales.toLocaleString()}</div>
                    <div style={styles.detail}>{appointments.length} Citas registradas</div>
                </div>

                <div className="card" style={styles.card}>
                    <div style={styles.label}>Deuda Total por Cobrar</div>
                    <div style={{ ...styles.value, color: 'var(--status-pink)' }}>${pendingDebt.toLocaleString()}</div>
                    <div style={styles.detail}>Pacientes con saldos pendientes</div>
                </div>

                <div className="card" style={styles.card}>
                    <div style={styles.label}>Ticket Promedio</div>
                    <div style={{ ...styles.value, color: 'var(--status-success)' }}>$35.000</div>
                    <div style={styles.detail}>Valor por consulta estándar</div>
                </div>
            </div>

            <div className="card" style={{ marginTop: '30px', padding: '0' }}>
                <table style={styles.table}>
                    <thead style={{ background: '#f8fafc' }}>
                        <tr>
                            <th style={styles.th}>Detalle de Transacción</th>
                            <th style={styles.th}>Estado</th>
                            <th style={styles.th}>Monto</th>
                        </tr>
                    </thead>
                    <tbody>
                        {appointments.map(app => (
                            <tr key={app.id} style={styles.tr}>
                                <td style={styles.td}>Cita Médica - {app.date} ({app.time})</td>
                                <td style={styles.td}>
                                    <span style={styles.badge}>Emitida</span>
                                </td>
                                <td style={styles.td}>$35.000</td>
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
    title: { fontSize: '2rem', color: 'var(--primary)', fontWeight: '800' },
    sub: { color: 'var(--text-muted)', marginBottom: '30px' },
    grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' },
    card: { padding: '30px', display: 'flex', flexDirection: 'column', gap: '10px' },
    label: { fontSize: '0.9rem', fontWeight: '700', color: 'var(--text-muted)' },
    value: { fontSize: '2.5rem', fontWeight: '900', color: 'var(--primary)' },
    detail: { fontSize: '0.8rem', opacity: 0.7 },
    table: { width: '100%', borderCollapse: 'collapse' },
    th: { textAlign: 'left', padding: '15px', borderBottom: '1px solid var(--border)', fontSize: '0.8rem', textTransform: 'uppercase' },
    tr: { borderBottom: '1px solid #f1f1f1' },
    td: { padding: '15px', fontSize: '0.9rem' },
    badge: { background: 'var(--status-success)', color: 'white', padding: '4px 10px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 'Bold' }
};

export default Finanzas;
