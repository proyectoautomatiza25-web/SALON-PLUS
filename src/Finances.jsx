import React, { useState } from 'react';
import {
    DollarSign, TrendingUp, TrendingDown, Layout,
    ArrowUpRight, ArrowDownRight, Clock, CheckCircle,
    Users, Briefcase, Calendar, ShieldCheck, Download
} from 'lucide-react';
import { useSaaSStore } from './store';

const Finances = () => {
    const { appointments, professionals, finances } = useSaaSStore();
    const [activeTab, setActiveTab] = useState('summary');

    // REAL INTEGRATION: Export CSV (Free)
    const exportSettlementsToCSV = () => {
        const rows = settlements.map(s => [
            s.name,
            s.specialty,
            s.appointmentsCount,
            s.totalGenerated,
            s.commissionAmount,
            s.clinicNet
        ]);

        const header = ["Profesional", "Especialidad", "Citas", "Total Generado", "Comisión Prof.", "Neto Clínica"];
        const csvContent = "data:text/csv;charset=utf-8,"
            + header.join(",") + "\n"
            + rows.map(r => r.join(",")).join("\n");

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `Liquidaciones_${new Date().toLocaleDateString()}.csv`);
        document.body.appendChild(link);
        link.click();
    };

    // Calculate professional settlements
    const settlements = professionals.map(prof => {
        const profAppointments = appointments.filter(a => a.profId === prof.id && a.status === 'attended');
        const totalGenerated = profAppointments.reduce((sum, a) => sum + (a.price || 0), 0);
        const commissionAmount = (totalGenerated * (prof.commission || 0)) / 100;
        const clinicNet = totalGenerated - commissionAmount;

        return {
            ...prof,
            appointmentsCount: profAppointments.length,
            totalGenerated,
            commissionAmount,
            clinicNet
        };
    });

    const totalClinicNet = settlements.reduce((sum, s) => sum + s.clinicNet, 0);
    const totalCommissions = settlements.reduce((sum, s) => sum + s.commissionAmount, 0);

    return (
        <div style={{ padding: '40px' }}>
            <header style={styles.header}>
                <h1 style={{ fontSize: '2rem', fontWeight: '900', color: 'var(--primary)' }}>Gestión Financiera</h1>
                <div style={styles.tabNav}>
                    <button onClick={() => setActiveTab('summary')} style={{ ...styles.tab, borderBottom: activeTab === 'summary' ? '2px solid var(--primary)' : 'none' }}>Resumen</button>
                    <button onClick={() => setActiveTab('settlements')} style={{ ...styles.tab, borderBottom: activeTab === 'settlements' ? '2px solid var(--primary)' : 'none' }}>Liquidaciones Prof.</button>
                    <button onClick={() => setActiveTab('cash')} style={{ ...styles.tab, borderBottom: activeTab === 'cash' ? '2px solid var(--primary)' : 'none' }}>Caja Diaria</button>
                </div>
            </header>

            {activeTab === 'summary' && (
                <div style={styles.grid}>
                    <div className="bento-card" style={{ ...styles.card, borderTop: '5px solid #10b981' }}>
                        <div style={styles.cardIcon}><TrendingUp color="#10b981" /></div>
                        <h3>Ingresos Totales</h3>
                        <p style={styles.amount}>${(totalClinicNet + totalCommissions).toLocaleString()}</p>
                        <span style={styles.sub}>Atenciones realizadas este período</span>
                    </div>

                    <div className="bento-card" style={{ ...styles.card, borderTop: '5px solid #3b82f6' }}>
                        <div style={styles.cardIcon}><Layout color="#3b82f6" /></div>
                        <h3>Neto Centro Médico</h3>
                        <p style={styles.amount}>${totalClinicNet.toLocaleString()}</p>
                        <span style={styles.sub}>Después de comisiones profesionales</span>
                    </div>

                    <div className="bento-card" style={{ ...styles.card, borderTop: '5px solid #f59e0b' }}>
                        <div style={styles.cardIcon}><Briefcase color="#f59e0b" /></div>
                        <h3>Comisiones por Pagar</h3>
                        <p style={styles.amount}>${totalCommissions.toLocaleString()}</p>
                        <span style={styles.sub}>Total acumulado para el equipo</span>
                    </div>
                </div>
            )}

            {activeTab === 'settlements' && (
                <div className="bento-card" style={styles.tableCard}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '25px' }}>
                        <h3 style={{ fontSize: '1.2rem', fontWeight: '800' }}>Cálculo de Comisiones por Profesional</h3>
                        <button onClick={exportSettlementsToCSV} className="btn-primary" style={{ background: '#fff', color: 'var(--primary)', border: '1.5px solid var(--primary)', display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px' }}>
                            <Download size={16} /> Exportar Excel (CSV)
                        </button>
                    </div>
                    <table style={styles.table}>
                        <thead>
                            <tr style={styles.tableHeader}>
                                <th style={styles.th}>Profesional</th>
                                <th style={styles.th}>Especialidad</th>
                                <th style={styles.th}>Citas</th>
                                <th style={styles.th}>Total Generado</th>
                                <th style={styles.th}>% Comis.</th>
                                <th style={styles.th}>Monto Prof.</th>
                                <th style={{ ...styles.th, textAlign: 'right' }}>Neto Clínica</th>
                            </tr>
                        </thead>
                        <tbody>
                            {settlements.map(s => (
                                <tr key={s.id} style={styles.tr}>
                                    <td style={styles.td}><strong>{s.name}</strong></td>
                                    <td style={styles.td}>{s.specialty}</td>
                                    <td style={styles.td}>{s.appointmentsCount}</td>
                                    <td style={styles.td}>${s.totalGenerated.toLocaleString()}</td>
                                    <td style={styles.td}>{s.commission}%</td>
                                    <td style={{ ...styles.td, color: '#10b981', fontWeight: '800' }}>
                                        ${s.commissionAmount.toLocaleString()}
                                    </td>
                                    <td style={{ ...styles.td, textAlign: 'right', fontWeight: '800' }}>
                                        ${s.clinicNet.toLocaleString()}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {activeTab === 'cash' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                    <div style={styles.cashGrid}>
                        {finances.boxes.map(box => (
                            <div key={box.id} className="bento-card" style={{ ...styles.card, borderTop: box.status === 'open' ? '5px solid #10b981' : '5px solid #94a3b8' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                                    <div>
                                        <h4 style={{ fontSize: '1.2rem', fontWeight: '800' }}>{box.name}</h4>
                                        <span style={{ fontSize: '0.8rem', color: box.status === 'open' ? '#10b981' : '#64748b', fontWeight: '700' }}>
                                            ● {box.status === 'open' ? 'ABIERTA' : 'CERRADA'}
                                        </span>
                                    </div>
                                    <ShieldCheck size={32} color={box.status === 'open' ? '#10b981' : '#cbd5e1'} />
                                </div>

                                {box.status === 'open' ? (
                                    <>
                                        <div style={styles.amount}>${box.balance.toLocaleString()}</div>
                                        <p style={styles.sub}>Apertura: ${box.openingAmount.toLocaleString()} • {new Date(box.openedAt).toLocaleTimeString()}</p>
                                        <button
                                            onClick={() => closeBox(box.id)}
                                            className="btn-primary"
                                            style={{ marginTop: '20px', background: '#ef4444', border: 'none', width: '100%' }}
                                        >
                                            Cerrar Caja
                                        </button>
                                    </>
                                ) : (
                                    <div style={{ marginTop: '20px' }}>
                                        <input
                                            type="number"
                                            id={`opening-${box.id}`}
                                            placeholder="Saldo Inicial ($)"
                                            style={{ ...styles.modalInput, marginBottom: '10px' }}
                                        />
                                        <button
                                            onClick={() => {
                                                const val = parseInt(document.getElementById(`opening-${box.id}`).value) || 0;
                                                openBox(box.id, val);
                                            }}
                                            className="btn-primary"
                                            style={{ width: '100%' }}
                                        >
                                            Abrir Caja del Día
                                        </button>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="bento-card" style={styles.tableCard}>
                        <div style={{ padding: '25px', borderBottom: '1px solid #f1f5f9' }}>
                            <h3 style={{ fontSize: '1.1rem', fontWeight: '800' }}>Historial Cierres de Caja</h3>
                        </div>
                        <table style={styles.table}>
                            <thead>
                                <tr style={styles.tableHeader}>
                                    <th style={styles.th}>Fecha Cierre</th>
                                    <th style={styles.th}>Caja</th>
                                    <th style={styles.th}>Saldo Apertura</th>
                                    <th style={styles.th}>Saldo Final</th>
                                    <th style={{ ...styles.th, textAlign: 'right' }}>Diferencia</th>
                                </tr>
                            </thead>
                            <tbody>
                                {finances.boxHistory.map((h, i) => (
                                    <tr key={i} style={styles.tr}>
                                        <td style={styles.td}>{new Date(h.closedAt).toLocaleString()}</td>
                                        <td style={styles.td}>{h.name}</td>
                                        <td style={styles.td}>${h.openingAmount.toLocaleString()}</td>
                                        <td style={styles.td}>${h.finalBalance.toLocaleString()}</td>
                                        <td style={{ ...styles.td, textAlign: 'right', fontWeight: '800', color: '#10b981' }}>
                                            +${(h.finalBalance - h.openingAmount).toLocaleString()}
                                        </td>
                                    </tr>
                                ))}
                                {finances.boxHistory.length === 0 && (
                                    <tr>
                                        <td colSpan="5" style={styles.empty}>No hay cierres registrados aún.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

const styles = {
    header: { marginBottom: '40px' },
    tabNav: { display: 'flex', gap: '30px', marginTop: '20px', borderBottom: '1px solid #e2e8f0' },
    tab: { padding: '15px 0', background: 'none', border: 'none', fontWeight: '700', cursor: 'pointer', color: '#94a3b8' },
    grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' },
    card: { padding: '30px', background: '#fff' },
    cardIcon: { width: '40px', height: '40px', borderRadius: '10px', background: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' },
    amount: { fontSize: '2.5rem', fontWeight: '900', color: '#1e293b', marginBottom: '5px' },
    sub: { fontSize: '0.8rem', color: '#94a3b8', fontWeight: '600' },
    tableCard: { background: '#fff', overflow: 'hidden' },
    table: { width: '100%', borderCollapse: 'collapse' },
    tableHeader: { borderBottom: '2px solid #f1f5f9' },
    th: { textAlign: 'left', padding: '15px 25px', fontSize: '0.8rem', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase' },
    td: { padding: '20px 25px', borderBottom: '1px solid #f1f5f9', fontSize: '0.95rem' },
    tr: { ':hover': { background: '#f8fafc' } },
    empty: { padding: '80px', textAlign: 'center', color: '#94a3b8', background: '#fff', borderRadius: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' },
    cashGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '30px' },
    modalInput: { padding: '12px 16px', borderRadius: '12px', border: '1.5px solid #e2e8f0', fontSize: '0.95rem', outline: 'none', width: '100%', background: '#fff' }
};

export default Finances;
