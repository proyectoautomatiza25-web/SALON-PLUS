import React from 'react';

const TopNav = ({ currentTab, setTab }) => {
    const menuItems = [
        { id: 'agenda', label: 'Agenda', icon: '📅' },
        { id: 'clients', label: 'Pacientes', icon: '👥' },
        { id: 'professionals', label: 'Profesionales', icon: '👨‍⚕️' },
        { id: 'campaigns', label: 'Campañas', icon: '📧' },
        { id: 'crm', label: 'CRM', icon: '💚' },
        { id: 'finanzas', label: 'Finanzas', icon: '💰' },
        { id: 'stats', label: 'Estadísticas', icon: '📊' },
        { id: 'config', label: 'Config', icon: '⚙️' },
    ];

    return (
        <div style={styles.container} className="glass-panel">
            <div style={styles.left}>
                <div style={styles.logo}>
                    <div style={styles.logoIcon}>
                        📅
                    </div>
                    <div style={styles.logoText}>
                        <div style={styles.brandName}>Agenda Plus</div>
                        <div style={styles.brandTagline}>by Automatiza Sur</div>
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
                            color: currentTab === item.id ? 'var(--primary)' : '#64748b',
                            background: currentTab === item.id ? 'rgba(0, 158, 157, 0.08)' : 'transparent',
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
    container: {
        height: '70px',
        display: 'flex',
        alignItems: 'center',
        padding: '0 30px',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        borderBottom: '1px solid rgba(0,0,0,0.06)',
        background: 'rgba(255,255,255,0.95)',
        backdropFilter: 'blur(10px)'
    },
    left: { marginRight: '40px' },
    logo: { display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' },
    logoIcon: {
        width: '42px',
        height: '42px',
        background: 'linear-gradient(135deg, #009E9D 0%, #00C9C8 100%)',
        borderRadius: '12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1.5rem',
        boxShadow: '0 4px 12px rgba(0, 158, 157, 0.25)'
    },
    logoText: {
        display: 'flex',
        flexDirection: 'column',
        lineHeight: '1.2'
    },
    brandName: {
        fontSize: '1.1rem',
        fontWeight: '900',
        color: '#1a2a2a',
        letterSpacing: '-0.3px'
    },
    brandTagline: {
        fontSize: '0.7rem',
        fontWeight: '600',
        color: '#94a3b8',
        textTransform: 'uppercase',
        letterSpacing: '0.5px'
    },
    center: {
        flex: 1,
        display: 'flex',
        gap: '8px',
        height: '100%',
        alignItems: 'center',
        overflowX: 'auto',
        overflowY: 'hidden'
    },
    navItem: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        transition: '0.2s',
        minWidth: '75px',
        height: '55px',
        borderRadius: '12px',
        position: 'relative',
        cursor: 'pointer',
        flexShrink: 0
    },
    activeDot: {
        position: 'absolute',
        bottom: '6px',
        width: '4px',
        height: '4px',
        background: 'var(--primary)',
        borderRadius: '50%'
    },
    right: { display: 'flex', alignItems: 'center', gap: '20px', marginLeft: '20px' },
    searchPrompt: {
        fontSize: '0.7rem',
        color: '#94a3b8',
        background: '#f8fafc',
        padding: '6px 12px',
        borderRadius: '8px',
        border: '1px solid #e2e8f0',
        cursor: 'pointer',
        whiteSpace: 'nowrap'
    },
    userSection: { display: 'flex', alignItems: 'center', gap: '12px' },
    avatar: {
        width: '38px',
        height: '38px',
        background: 'linear-gradient(135deg, #009E9D 0%, #00C9C8 100%)',
        color: 'white',
        borderRadius: '10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: '800',
        fontSize: '1rem',
        boxShadow: '0 2px 8px rgba(0, 158, 157, 0.2)'
    },
};

export default TopNav;
