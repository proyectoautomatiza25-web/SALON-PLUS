import React, { useState } from 'react';

const NotificationCenter = ({ notifications }) => {
    const [filter, setFilter] = useState('all');

    const filteredNotifications = notifications.filter(n => {
        if (filter === 'all') return true;
        return n.type === filter;
    }).sort((a, b) => new Date(b.date) - new Date(a.date));

    const getIcon = (type) => {
        return type === 'whatsapp' ? '💬' : '📧';
    };

    const getStatusStyle = (status) => {
        switch (status) {
            case 'sent': return { background: '#dcfce7', color: '#166534', border: '1px solid #bbf7d0' };
            case 'failed': return { background: '#fee2e2', color: '#991b1b', border: '1px solid #fecaca' };
            case 'pending': return { background: '#fef9c3', color: '#854d0e', border: '1px solid #fde047' };
            default: return { background: '#f3f4f6', color: '#374151' };
        }
    };

    return (
        <div style={styles.container}>
            <header style={styles.header}>
                <div>
                    <h1 style={styles.title}>Centro de Notificaciones</h1>
                    <p style={styles.subtitle}>Monitoreo en tiempo real de comunicaciones enviadas</p>
                </div>
                <div style={styles.filters}>
                    <button
                        style={filter === 'all' ? styles.activeFilter : styles.filter}
                        onClick={() => setFilter('all')}
                    >
                        Todo
                    </button>
                    <button
                        style={filter === 'whatsapp' ? styles.activeFilter : styles.filter}
                        onClick={() => setFilter('whatsapp')}
                    >
                        WhatsApp
                    </button>
                    <button
                        style={filter === 'email' ? styles.activeFilter : styles.filter}
                        onClick={() => setFilter('email')}
                    >
                        Email
                    </button>
                </div>
            </header>

            <div style={styles.statsGrid}>
                <div className="bento-card" style={styles.statCard}>
                    <div style={styles.statValue}>{notifications.length}</div>
                    <div style={styles.statLabel}>Total Enviados</div>
                </div>
                <div className="bento-card" style={styles.statCard}>
                    <div style={{ ...styles.statValue, color: '#10b981' }}>
                        {notifications.filter(n => n.status === 'sent').length}
                    </div>
                    <div style={styles.statLabel}>Exitosos</div>
                </div>
                <div className="bento-card" style={styles.statCard}>
                    <div style={{ ...styles.statValue, color: '#ef4444' }}>
                        {notifications.filter(n => n.status === 'failed').length}
                    </div>
                    <div style={styles.statLabel}>Fallidos</div>
                </div>
            </div>

            <div className="bento-card" style={styles.listContainer}>
                <div style={styles.tableHeader}>
                    <div style={{ flex: 0.5 }}>Canal</div>
                    <div style={{ flex: 1.5 }}>Destinatario</div>
                    <div style={{ flex: 3 }}>Mensaje</div>
                    <div style={{ flex: 1 }}>Fecha</div>
                    <div style={{ flex: 0.8, textAlign: 'right' }}>Estado</div>
                </div>

                <div style={styles.list}>
                    {filteredNotifications.length === 0 ? (
                        <div style={styles.emptyState}>No hay notificaciones registradas</div>
                    ) : (
                        filteredNotifications.map(notification => (
                            <div key={notification.id} style={styles.row}>
                                <div style={{ flex: 0.5, fontSize: '1.2rem' }}>
                                    {getIcon(notification.type)}
                                </div>
                                <div style={{ flex: 1.5 }}>
                                    <div style={{ fontWeight: '700', fontSize: '0.9rem' }}>{notification.to}</div>
                                    <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Paciente</div>
                                </div>
                                <div style={{ flex: 3, fontSize: '0.9rem', color: '#64748b', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', paddingRight: '20px' }}>
                                    {notification.message}
                                </div>
                                <div style={{ flex: 1, fontSize: '0.85rem', color: '#94a3b8' }}>
                                    {new Date(notification.date).toLocaleString()}
                                </div>
                                <div style={{ flex: 0.8, display: 'flex', justifyContent: 'flex-end' }}>
                                    <span style={{ ...styles.badge, ...getStatusStyle(notification.status) }}>
                                        {notification.status === 'sent' ? 'Enviado' : notification.status === 'pending' ? 'En Cola' : 'Error'}
                                    </span>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

const styles = {
    container: { padding: '40px', maxWidth: '1200px', margin: '0 auto' },
    header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' },
    title: { fontSize: '2rem', fontWeight: '900', marginBottom: '5px', letterSpacing: '-1px' },
    subtitle: { color: '#64748b' },
    filters: { display: 'flex', gap: '10px', background: '#f1f5f9', padding: '5px', borderRadius: '12px' },
    filter: { padding: '8px 16px', borderRadius: '8px', border: 'none', background: 'transparent', color: '#64748b', fontWeight: '600', cursor: 'pointer' },
    activeFilter: { padding: '8px 16px', borderRadius: '8px', border: 'none', background: 'white', color: 'var(--primary)', fontWeight: '700', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', cursor: 'pointer' },

    statsGrid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '30px' },
    statCard: { padding: '20px', textAlign: 'center' },
    statValue: { fontSize: '2.5rem', fontWeight: '900', marginBottom: '5px' },
    statLabel: { color: '#94a3b8', fontWeight: '600', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' },

    listContainer: { padding: '0', overflow: 'hidden' },
    tableHeader: { display: 'flex', padding: '15px 25px', background: '#f8fafc', borderBottom: '1px solid #e2e8f0', fontWeight: '700', color: '#64748b', fontSize: '0.85rem', textTransform: 'uppercase' },
    list: { maxHeight: '500px', overflowY: 'auto' },
    row: { display: 'flex', alignItems: 'center', padding: '20px 25px', borderBottom: '1px solid #f1f5f9', transition: 'background 0.2s' },
    emptyState: { padding: '40px', textAlign: 'center', color: '#94a3b8', fontStyle: 'italic' },
    badge: { padding: '4px 10px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase' }
};

export default NotificationCenter;
