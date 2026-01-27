import React, { useState } from 'react';
import {
    Layout, Calendar, Users, Briefcase, Mail,
    DollarSign, BarChart, Settings, LogOut,
    Search, Bell, ChevronRight
} from 'lucide-react';

/* 
   NOTE: You need to implement your own store or context.
   This template assumes a 'useStore' hook exists.
*/
// import { useStore } from './store';

// Placeholder components - Replace with your actual components
const Agenda = () => <div>Agenda Component</div>;
const Dashboard = () => <div>Dashboard Component</div>;
const Clients = () => <div>Clients Component</div>;
const SettingsComponent = () => <div>Settings Component</div>;

const SaaSAppLayout = ({ user, onLogout }) => {
    const [currentTab, setCurrentTab] = useState('dashboard');
    const [searchQuery, setSearchQuery] = useState('');

    // Example Menu Items
    const menuItems = [
        { id: 'dashboard', label: 'Resumen', icon: BarChart },
        { id: 'agenda', label: 'Agenda', icon: Calendar },
        { id: 'clients', label: 'Clientes', icon: Users },
        { id: 'config', label: 'Ajustes', icon: Settings }
    ];

    return (
        <div style={styles.container}>
            {/* Sidebar */}
            <aside style={styles.sidebar} className="glass-panel">
                <div style={styles.logo}>
                    <Layout size={28} color="var(--primary)" />
                    <span style={styles.logoText}>SaaS<span style={{ color: '#fff' }}>Premium</span></span>
                </div>

                <nav style={styles.nav}>
                    {menuItems.map(item => (
                        <button
                            key={item.id}
                            onClick={() => setCurrentTab(item.id)}
                            style={{
                                ...styles.navItem,
                                background: currentTab === item.id ? 'var(--primary-gradient)' : 'transparent',
                                color: currentTab === item.id ? '#fff' : '#94a3b8'
                            }}
                        >
                            <item.icon size={20} />
                            <span style={styles.navLabel}>{item.label}</span>
                            {currentTab === item.id && <div style={styles.activeIndicator} />}
                        </button>
                    ))}
                </nav>

                <div style={styles.sidebarFooter}>
                    <button onClick={onLogout} style={styles.logoutBtn}>
                        <LogOut size={20} />
                        <span>Cerrar Sesión</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main style={styles.main}>
                {/* Header */}
                <header style={styles.header}>
                    <div style={styles.breadcrumb}>
                        <span style={{ color: '#94a3b8' }}>Panel</span>
                        <span style={{ margin: '0 8px', color: '#cbd5e1' }}>/</span>
                        <span style={{ fontWeight: '700', color: '#1e293b' }}>{menuItems.find(i => i.id === currentTab)?.label}</span>
                    </div>

                    <div style={styles.headerActions}>
                        <div style={{ ...styles.searchBar, position: 'relative' }}>
                            <Search size={18} color="#94a3b8" />
                            <input
                                type="text"
                                placeholder="Buscar..."
                                style={styles.searchInput}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <button style={styles.iconBtn}><Bell size={20} /></button>
                        <div style={styles.userProfile}>
                            <div style={styles.userAvatar}>U</div>
                            <div style={styles.userInfo}>
                                <div style={styles.userName}>Usuario</div>
                                <div style={styles.userRole}>Admin</div>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Content Area */}
                <div style={styles.content}>
                    {currentTab === 'dashboard' && <Dashboard />}
                    {currentTab === 'agenda' && <Agenda />}
                    {currentTab === 'clients' && <Clients />}
                    {currentTab === 'config' && <SettingsComponent />}
                </div>
            </main>
        </div>
    );
};

const styles = {
    container: { display: 'flex', height: '100vh', width: '100vw', background: '#f8fafc', color: '#1e293b', overflow: 'hidden' },
    sidebar: { width: '280px', background: '#1e293b', display: 'flex', flexDirection: 'column', padding: '30px 20px', border: 'none', borderRadius: '0', zIndex: 100, boxShadow: '10px 0 30px rgba(0,0,0,0.05)' },
    logo: { display: 'flex', alignItems: 'center', gap: '15px', padding: '0 10px', marginBottom: '50px' },
    logoText: { fontSize: '1.6rem', fontWeight: '900', color: 'var(--primary-light)', letterSpacing: '-0.5px' },
    nav: { display: 'flex', flexDirection: 'column', gap: '6px', flex: 1 },
    navItem: { display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 18px', borderRadius: '14px', border: 'none', cursor: 'pointer', textAlign: 'left', fontSize: '0.95rem', fontWeight: '600', transition: 'all 0.3s ease', position: 'relative', width: '100%', background: 'transparent' },
    navLabel: { flex: 1 },
    activeIndicator: { width: '4px', height: '20px', background: '#fff', borderRadius: '10px', position: 'absolute', right: '12px' },
    sidebarFooter: { paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.08)' },
    logoutBtn: { display: 'flex', alignItems: 'center', gap: '12px', width: '100%', padding: '14px 18px', background: 'transparent', border: 'none', color: '#f87171', fontWeight: '700', cursor: 'pointer', fontSize: '0.95rem', borderRadius: '12px', transition: 'background 0.2s' },
    main: { flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', background: '#f8fafc' },
    header: { height: '80px', padding: '0 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#fff', borderBottom: '1.5px solid #f1f5f9', zIndex: 50 },
    breadcrumb: { fontSize: '0.9rem', fontWeight: '600', display: 'flex', alignItems: 'center' },
    headerActions: { display: 'flex', alignItems: 'center', gap: '25px' },
    searchBar: { display: 'flex', alignItems: 'center', gap: '12px', background: '#f8fafc', padding: '10px 20px', borderRadius: '14px', border: '1.5px solid #e2e8f0', width: '380px', transition: 'all 0.2s ease' },
    searchInput: { border: 'none', background: 'none', outline: 'none', width: '100%', fontSize: '0.9rem', fontWeight: '600', color: '#1e293b' },
    iconBtn: { width: '42px', height: '42px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fff', borderRadius: '12px', border: '1.5px solid #e2e8f0', cursor: 'pointer', color: '#64748b', transition: 'all 0.2s' },
    userProfile: { display: 'flex', alignItems: 'center', gap: '14px', padding: '6px 12px', borderRadius: '14px', cursor: 'pointer', background: '#f8fafc', border: '1px solid transparent', transition: 'all 0.2s' },
    userAvatar: { width: '38px', height: '38px', background: 'var(--primary-gradient)', color: '#fff', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '900', fontSize: '1.1rem' },
    userInfo: { display: 'flex', flexDirection: 'column' },
    userName: { fontSize: '0.9rem', fontWeight: '800', color: '#1e293b' },
    userRole: { fontSize: '0.75rem', color: '#94a3b8', fontWeight: '600' },
    content: { flex: 1, overflowY: 'auto', paddingBottom: '40px' }
};

export default SaaSAppLayout;
