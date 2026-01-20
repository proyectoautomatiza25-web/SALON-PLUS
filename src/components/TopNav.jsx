import React from 'react';

const TopNav = ({ currentTab, setTab }) => {
    const menuItems = [
        { id: 'agenda', label: 'Agenda', icon: '🗓️' },
        { id: 'clients', label: 'Pacientes', icon: '👥' },
        { id: 'professionals', label: 'Profesionales', icon: '👨‍⚕️' },
        { id: 'crm', label: 'CRM', icon: '❤️' },
        { id: 'finanzas', label: 'Finanzas', icon: '💰' },
        { id: 'stats', label: 'Estadísticas', icon: '📊' },
        { id: 'config', label: 'Configuración', icon: '⚙️' },
        { id: 'support', label: 'Soporte', icon: '💬' },
        { id: 'tutorial', label: 'Tutoriales', icon: '❓' },
    ];

    return (
        <div style={styles.container} className="glass-panel">
            <div style={styles.left}>
                <div style={styles.logo}>
                    <div style={styles.logoIcon}>
                        <span style={{ fontSize: '1.4rem' }}>🗓️</span>
                        <div style={styles.plusBadge}>+</div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', lineHeight: '1' }}>
                        <span style={{ fontSize: '1.4rem', fontWeight: '900', letterSpacing: '-0.5px', background: 'var(--primary-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                            Agenda
                        </span>
                        <span style={{ fontSize: '1.4rem', fontWeight: '900', color: 'var(--secondary)' }}>
                            Plus
                        </span>
                    </div>
                </div>
            </div>

            <div style={styles.center}>
                {menuItems.map(item => (
                    <div
                        key={item.id}
                        onClick={() => setTab(item.id)}
                        style={{
                            ...styles.navItem,
                            color: currentTab === item.id ? 'var(--primary)' : '#94a3b8',
                            background: currentTab === item.id ? '#f1f5f9' : 'transparent',
                        }}
                    >
                        <div style={{ fontSize: '1.2rem' }}>{item.icon}</div>
                        <div style={{ fontSize: '0.75rem', fontWeight: '800' }}>{item.label}</div>
                        {currentTab === item.id && <div style={styles.activeDot} />}
                    </div>
                ))}
            </div>

            <div style={styles.right}>
                <div style={styles.searchPrompt}>Púlsame o <b>Ctrl+K</b></div>
                <div style={styles.userSection}>
                    <div style={styles.avatar}>N</div>
                </div>
            </div>
        </div>
    );
};

const styles = {
    container: { height: '85px', display: 'flex', alignItems: 'center', padding: '0 40px', position: 'sticky', top: 0, zIndex: 1000, borderBottom: '1px solid rgba(0,0,0,0.05)' },
    left: { marginRight: '60px' },
    logo: { display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' },
    logoIcon: { position: 'relative', width: '45px', height: '45px', background: 'white', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 10px 20px rgba(0,0,0,0.08)' },
    plusBadge: { position: 'absolute', top: '-5px', right: '-5px', background: 'var(--primary)', color: 'white', width: '20px', height: '20px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: '900', border: '2px solid white' },
    center: { flex: 1, display: 'flex', gap: '15px', height: '100%', alignItems: 'center' },
    navItem: { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', transition: '0.3s', minWidth: '85px', height: '60px', borderRadius: '16px', position: 'relative', cursor: 'pointer' },
    activeDot: { position: 'absolute', bottom: '8px', width: '4px', height: '4px', background: 'var(--primary)', borderRadius: '50%' },
    right: { display: 'flex', alignItems: 'center', gap: '25px' },
    searchPrompt: { fontSize: '0.75rem', color: '#94a3b8', background: '#f8fafc', padding: '8px 15px', borderRadius: '12px', border: '1px solid #e2e8f0', cursor: 'pointer' },
    userSection: { display: 'flex', alignItems: 'center', gap: '15px' },
    avatar: { width: '42px', height: '42px', background: 'var(--primary-gradient)', color: 'white', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '900', fontSize: '1.1rem' },
};

export default TopNav;
