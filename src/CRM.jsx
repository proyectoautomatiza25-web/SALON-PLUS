import React, { useState } from 'react';

const CRM = ({ patients, appointments, notifications }) => {
    const [activeView, setActiveView] = useState('overview');
    const [selectedSegment, setSelectedSegment] = useState('all');

    // CRM Analytics
    const analytics = {
        totalPatients: patients.length,
        activePatients: patients.filter(p => p.status === 'Activo').length,
        newThisMonth: patients.filter(p => {
            const created = new Date(p.createdAt || '2026-01-01');
            const now = new Date();
            return created.getMonth() === now.getMonth();
        }).length,
        churnRate: ((patients.filter(p => p.status === 'Inactivo').length / patients.length) * 100).toFixed(1),
        avgLifetimeValue: (appointments.length * 35000 / patients.length).toFixed(0),
        retentionRate: ((patients.filter(p => p.history?.length > 1).length / patients.length) * 100).toFixed(1)
    };

    // Patient Segments
    const segments = {
        all: patients,
        vip: patients.filter(p => (p.history?.length || 0) >= 5),
        atrisk: patients.filter(p => p.status === 'Pendiente' || p.debt > 0),
        new: patients.filter(p => (p.history?.length || 0) === 0),
        loyal: patients.filter(p => (p.history?.length || 0) >= 3 && p.status === 'Activo')
    };

    const currentSegment = segments[selectedSegment];

    // Campaign Templates
    const campaigns = [
        {
            id: 1,
            name: 'Campaña de Reactivación',
            target: 'Pacientes Inactivos',
            message: 'Te extrañamos! Vuelve y obtén 20% de descuento en tu próxima consulta',
            channel: 'WhatsApp + Email',
            status: 'draft'
        },
        {
            id: 2,
            name: 'Recordatorio Chequeo Anual',
            target: 'Pacientes VIP',
            message: 'Es momento de tu chequeo anual. Agenda con prioridad!',
            channel: 'Email',
            status: 'active'
        },
        {
            id: 3,
            name: 'Programa de Referidos',
            target: 'Pacientes Leales',
            message: 'Recomienda a un amigo y ambos reciben beneficios',
            channel: 'WhatsApp',
            status: 'scheduled'
        }
    ];

    return (
        <div style={styles.container}>
            <header style={styles.header}>
                <div>
                    <h1 style={styles.title}>CRM - Gestión de Relaciones</h1>
                    <p style={styles.subtitle}>Análisis de pacientes, segmentación y campañas</p>
                </div>
                <div style={styles.viewToggle}>
                    <button
                        style={activeView === 'overview' ? styles.activeBtn : styles.btn}
                        onClick={() => setActiveView('overview')}
                    >
                        📊 Overview
                    </button>
                    <button
                        style={activeView === 'segments' ? styles.activeBtn : styles.btn}
                        onClick={() => setActiveView('segments')}
                    >
                        🎯 Segmentos
                    </button>
                    <button
                        style={activeView === 'campaigns' ? styles.activeBtn : styles.btn}
                        onClick={() => setActiveView('campaigns')}
                    >
                        📢 Campañas
                    </button>
                </div>
            </header>

            {/* Overview View */}
            {activeView === 'overview' && (
                <div>
                    <div style={styles.metricsGrid}>
                        <div className="bento-card" style={styles.metricCard}>
                            <div style={styles.metricIcon}>👥</div>
                            <div style={styles.metricValue}>{analytics.totalPatients}</div>
                            <div style={styles.metricLabel}>Total Pacientes</div>
                            <div style={styles.metricChange}>+{analytics.newThisMonth} este mes</div>
                        </div>

                        <div className="bento-card" style={styles.metricCard}>
                            <div style={styles.metricIcon}>✅</div>
                            <div style={styles.metricValue}>{analytics.activePatients}</div>
                            <div style={styles.metricLabel}>Pacientes Activos</div>
                            <div style={styles.metricChange}>{analytics.retentionRate}% retención</div>
                        </div>

                        <div className="bento-card" style={styles.metricCard}>
                            <div style={styles.metricIcon}>💰</div>
                            <div style={styles.metricValue}>${analytics.avgLifetimeValue}</div>
                            <div style={styles.metricLabel}>Valor Promedio Vida</div>
                            <div style={styles.metricChange}>Por paciente</div>
                        </div>

                        <div className="bento-card" style={{ ...styles.metricCard, borderLeft: '5px solid #f43f5e' }}>
                            <div style={styles.metricIcon}>⚠️</div>
                            <div style={styles.metricValue}>{analytics.churnRate}%</div>
                            <div style={styles.metricLabel}>Tasa de Abandono</div>
                            <div style={styles.metricChange}>Requiere atención</div>
                        </div>
                    </div>

                    {/* Patient Lifecycle Funnel */}
                    <div className="bento-card" style={{ marginTop: '30px', padding: '30px' }}>
                        <h2 style={{ marginBottom: '30px' }}>Embudo de Ciclo de Vida del Paciente</h2>
                        <div style={styles.funnel}>
                            <div style={{ ...styles.funnelStage, width: '100%', background: '#eff6ff' }}>
                                <span style={styles.funnelLabel}>Leads / Contactos</span>
                                <span style={styles.funnelValue}>{patients.length + 15}</span>
                            </div>
                            <div style={{ ...styles.funnelStage, width: '85%', background: '#dbeafe' }}>
                                <span style={styles.funnelLabel}>Primera Consulta</span>
                                <span style={styles.funnelValue}>{patients.length}</span>
                            </div>
                            <div style={{ ...styles.funnelStage, width: '60%', background: '#bfdbfe' }}>
                                <span style={styles.funnelLabel}>Pacientes Recurrentes</span>
                                <span style={styles.funnelValue}>{patients.filter(p => (p.history?.length || 0) > 1).length}</span>
                            </div>
                            <div style={{ ...styles.funnelStage, width: '35%', background: '#93c5fd' }}>
                                <span style={styles.funnelLabel}>Pacientes Leales (3+ visitas)</span>
                                <span style={styles.funnelValue}>{segments.loyal.length}</span>
                            </div>
                            <div style={{ ...styles.funnelStage, width: '20%', background: '#60a5fa' }}>
                                <span style={styles.funnelLabel}>VIP (5+ visitas)</span>
                                <span style={styles.funnelValue}>{segments.vip.length}</span>
                            </div>
                        </div>
                    </div>

                    {/* Recent Activity */}
                    <div className="bento-card" style={{ marginTop: '30px', padding: '30px' }}>
                        <h2 style={{ marginBottom: '20px' }}>Actividad Reciente</h2>
                        <div style={styles.activityList}>
                            {notifications.slice(0, 5).map((notif, i) => (
                                <div key={i} style={styles.activityItem}>
                                    <div style={styles.activityIcon}>
                                        {notif.type === 'whatsapp' ? '💬' : '📧'}
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <div style={styles.activityText}>{notif.message.substring(0, 60)}...</div>
                                        <div style={styles.activityMeta}>
                                            Enviado a {notif.to} • {new Date(notif.date).toLocaleString()}
                                        </div>
                                    </div>
                                    <div style={{ ...styles.statusBadge, background: notif.status === 'sent' ? '#ecfdf5' : '#fef3c7' }}>
                                        {notif.status}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Segments View */}
            {activeView === 'segments' && (
                <div>
                    <div style={styles.segmentSelector}>
                        <button
                            style={selectedSegment === 'all' ? styles.segmentBtnActive : styles.segmentBtn}
                            onClick={() => setSelectedSegment('all')}
                        >
                            Todos ({segments.all.length})
                        </button>
                        <button
                            style={selectedSegment === 'vip' ? styles.segmentBtnActive : styles.segmentBtn}
                            onClick={() => setSelectedSegment('vip')}
                        >
                            🌟 VIP ({segments.vip.length})
                        </button>
                        <button
                            style={selectedSegment === 'loyal' ? styles.segmentBtnActive : styles.segmentBtn}
                            onClick={() => setSelectedSegment('loyal')}
                        >
                            💙 Leales ({segments.loyal.length})
                        </button>
                        <button
                            style={selectedSegment === 'new' ? styles.segmentBtnActive : styles.segmentBtn}
                            onClick={() => setSelectedSegment('new')}
                        >
                            ✨ Nuevos ({segments.new.length})
                        </button>
                        <button
                            style={selectedSegment === 'atrisk' ? styles.segmentBtnActive : styles.segmentBtn}
                            onClick={() => setSelectedSegment('atrisk')}
                        >
                            ⚠️ En Riesgo ({segments.atrisk.length})
                        </button>
                    </div>

                    <div className="bento-card" style={{ marginTop: '30px', padding: 0, overflow: 'hidden' }}>
                        <table style={styles.table}>
                            <thead>
                                <tr style={styles.tableHeader}>
                                    <th style={styles.th}>Paciente</th>
                                    <th style={styles.th}>Contacto</th>
                                    <th style={styles.th}>Visitas</th>
                                    <th style={styles.th}>Última Cita</th>
                                    <th style={styles.th}>Valor Total</th>
                                    <th style={styles.th}>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentSegment.map(patient => (
                                    <tr key={patient.id} style={styles.tr}>
                                        <td style={styles.td}>
                                            <div style={styles.patientName}>{patient.name}</div>
                                            <div style={styles.patientRut}>RUT: {patient.rut}</div>
                                        </td>
                                        <td style={styles.td}>
                                            <div>{patient.email}</div>
                                            <div style={{ fontSize: '0.85rem', color: '#64748b' }}>{patient.phone}</div>
                                        </td>
                                        <td style={styles.td}>
                                            <div style={styles.visitBadge}>{patient.history?.length || 0} visitas</div>
                                        </td>
                                        <td style={styles.td}>
                                            {patient.history?.[0]?.date || 'Sin visitas'}
                                        </td>
                                        <td style={styles.td}>
                                            <div style={{ fontWeight: '800', color: 'var(--primary)' }}>
                                                ${((patient.history?.length || 0) * 35000).toLocaleString()}
                                            </div>
                                        </td>
                                        <td style={styles.td}>
                                            <button style={styles.actionBtn}>📧 Contactar</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Campaigns View */}
            {activeView === 'campaigns' && (
                <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px' }}>
                        <div>
                            <h2>Campañas de Marketing</h2>
                            <p style={{ color: '#64748b' }}>Automatiza la comunicación con tus pacientes</p>
                        </div>
                        <button className="btn-primary" style={{ background: 'var(--accent)' }}>
                            + Nueva Campaña
                        </button>
                    </div>

                    <div style={styles.campaignsGrid}>
                        {campaigns.map(campaign => (
                            <div key={campaign.id} className="bento-card" style={styles.campaignCard}>
                                <div style={styles.campaignHeader}>
                                    <h3>{campaign.name}</h3>
                                    <div style={{
                                        ...styles.statusBadge,
                                        background: campaign.status === 'active' ? '#ecfdf5' :
                                            campaign.status === 'scheduled' ? '#fef3c7' : '#f1f5f9'
                                    }}>
                                        {campaign.status}
                                    </div>
                                </div>
                                <div style={styles.campaignBody}>
                                    <div style={styles.campaignRow}>
                                        <strong>🎯 Objetivo:</strong> {campaign.target}
                                    </div>
                                    <div style={styles.campaignRow}>
                                        <strong>📱 Canal:</strong> {campaign.channel}
                                    </div>
                                    <div style={styles.campaignMessage}>
                                        "{campaign.message}"
                                    </div>
                                </div>
                                <div style={styles.campaignActions}>
                                    <button style={styles.campaignBtn}>Ver Detalles</button>
                                    <button style={{ ...styles.campaignBtn, background: 'var(--primary)', color: 'white' }}>
                                        Lanzar Campaña
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Campaign Builder */}
                    <div className="bento-card" style={{ marginTop: '30px', padding: '30px' }}>
                        <h2 style={{ marginBottom: '20px' }}>Constructor Rápido de Campaña</h2>
                        <div style={styles.builderGrid}>
                            <div style={styles.formGroup}>
                                <label style={styles.label}>Nombre de la Campaña</label>
                                <input type="text" style={styles.input} placeholder="Ej: Promoción de Verano" />
                            </div>
                            <div style={styles.formGroup}>
                                <label style={styles.label}>Segmento Objetivo</label>
                                <select style={styles.input}>
                                    <option>Todos los pacientes</option>
                                    <option>Pacientes VIP</option>
                                    <option>Pacientes en Riesgo</option>
                                    <option>Nuevos Pacientes</option>
                                </select>
                            </div>
                            <div style={styles.formGroup}>
                                <label style={styles.label}>Canal de Comunicación</label>
                                <select style={styles.input}>
                                    <option>WhatsApp</option>
                                    <option>Email</option>
                                    <option>WhatsApp + Email</option>
                                </select>
                            </div>
                            <div style={{ ...styles.formGroup, gridColumn: 'span 3' }}>
                                <label style={styles.label}>Mensaje</label>
                                <textarea style={{ ...styles.input, minHeight: '100px' }} placeholder="Escribe tu mensaje aquí..."></textarea>
                            </div>
                        </div>
                        <button className="btn-primary" style={{ marginTop: '20px', width: '100%' }}>
                            Crear y Programar Campaña
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

const styles = {
    container: { padding: '40px' },
    header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' },
    title: { fontSize: '2.5rem', fontWeight: '900', marginBottom: '5px', letterSpacing: '-1.5px' },
    subtitle: { color: '#64748b' },
    viewToggle: { display: 'flex', gap: '10px' },
    btn: { background: 'white', border: '1px solid #e2e8f0', padding: '10px 20px', borderRadius: '12px', cursor: 'pointer', fontWeight: '600', color: '#64748b' },
    activeBtn: { background: 'var(--primary)', border: 'none', padding: '10px 20px', borderRadius: '12px', cursor: 'pointer', fontWeight: '700', color: 'white' },

    metricsGrid: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' },
    metricCard: { padding: '30px', textAlign: 'center' },
    metricIcon: { fontSize: '3rem', marginBottom: '15px' },
    metricValue: { fontSize: '2.5rem', fontWeight: '900', color: 'var(--primary)', marginBottom: '10px' },
    metricLabel: { fontSize: '0.9rem', color: '#64748b', fontWeight: '600', marginBottom: '5px' },
    metricChange: { fontSize: '0.8rem', color: '#10b981', fontWeight: '600' },

    funnel: { display: 'flex', flexDirection: 'column', gap: '15px', alignItems: 'center' },
    funnelStage: { padding: '20px', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', transition: '0.3s' },
    funnelLabel: { fontWeight: '700', fontSize: '1rem' },
    funnelValue: { fontSize: '1.5rem', fontWeight: '900', color: 'var(--primary)' },

    activityList: { display: 'flex', flexDirection: 'column', gap: '15px' },
    activityItem: { display: 'flex', alignItems: 'center', gap: '15px', padding: '15px', background: '#f8fafc', borderRadius: '12px' },
    activityIcon: { fontSize: '1.5rem' },
    activityText: { fontWeight: '600', marginBottom: '5px' },
    activityMeta: { fontSize: '0.75rem', color: '#94a3b8' },
    statusBadge: { padding: '5px 12px', borderRadius: '8px', fontSize: '0.75rem', fontWeight: '800', color: '#064e3b' },

    segmentSelector: { display: 'flex', gap: '10px', flexWrap: 'wrap' },
    segmentBtn: { background: 'white', border: '1px solid #e2e8f0', padding: '12px 20px', borderRadius: '12px', cursor: 'pointer', fontWeight: '600' },
    segmentBtnActive: { background: 'var(--primary)', color: 'white', border: 'none', padding: '12px 20px', borderRadius: '12px', cursor: 'pointer', fontWeight: '700' },

    table: { width: '100%', borderCollapse: 'collapse' },
    tableHeader: { background: '#f8fafc' },
    th: { textAlign: 'left', padding: '15px', fontSize: '0.75rem', fontWeight: '800', color: '#64748b', textTransform: 'uppercase' },
    tr: { borderBottom: '1px solid #f1f5f9' },
    td: { padding: '15px' },
    patientName: { fontWeight: '800', fontSize: '1rem' },
    patientRut: { fontSize: '0.75rem', color: '#94a3b8' },
    visitBadge: { background: '#eff6ff', color: '#1e40af', padding: '5px 12px', borderRadius: '8px', fontSize: '0.8rem', fontWeight: '700', display: 'inline-block' },
    actionBtn: { background: 'var(--primary)', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' },

    campaignsGrid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' },
    campaignCard: { padding: '25px', display: 'flex', flexDirection: 'column' },
    campaignHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', paddingBottom: '15px', borderBottom: '2px solid #f1f5f9' },
    campaignBody: { flex: 1, marginBottom: '20px' },
    campaignRow: { marginBottom: '10px', fontSize: '0.9rem' },
    campaignMessage: { marginTop: '15px', padding: '15px', background: '#f8fafc', borderRadius: '10px', fontStyle: 'italic', fontSize: '0.9rem', lineHeight: '1.6' },
    campaignActions: { display: 'flex', gap: '10px' },
    campaignBtn: { flex: 1, background: 'white', border: '1px solid #e2e8f0', padding: '10px', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' },

    builderGrid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' },
    formGroup: { display: 'flex', flexDirection: 'column' },
    label: { fontWeight: '700', marginBottom: '8px', fontSize: '0.9rem' },
    input: { padding: '12px', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '1rem', fontFamily: 'inherit' }
};

export default CRM;
