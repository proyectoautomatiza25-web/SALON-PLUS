import React, { useState } from 'react';
import {
    Layout, Calendar, Users, Briefcase, Mail,
    DollarSign, BarChart, Settings, LogOut,
    Search, Bell, ChevronRight
} from 'lucide-react';
import { useSaaSStore } from './store';
import Agenda from './Agenda';
import Dashboard from './Dashboard';
import CampaignsManager from './CampaignsManager';
import PatientFile from './PatientFile';
import Clients from './Clients';
import Finances from './Finances';
import Professionals from './Professionals';
import Config from './Config';

const SaaSApp = ({ user, onLogout }) => {
    const [currentTab, setCurrentTab] = useState('dashboard');
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const { getStats, patients, professionals } = useSaaSStore();
    const [currentProf, setCurrentProf] = useState(professionals[0]);

    const menuItems = [
        { id: 'dashboard', label: 'Resumen', icon: BarChart },
        { id: 'agenda', label: 'Agenda', icon: Calendar },
        { id: 'patients', label: 'Pacientes', icon: Users },
        { id: 'professionals', label: 'Equipo', icon: Briefcase },
        { id: 'marketing', label: 'Marketing', icon: Mail },
        { id: 'finances', label: 'Finanzas', icon: DollarSign },
        { id: 'config', label: 'Ajustes', icon: Settings }
    ];

    return (
        <div style={styles.container}>
            {/* Sidebar */}
            <aside style={styles.sidebar} className="glass-panel">
                <div style={styles.logo}>
                    <Layout size={28} color="var(--primary)" />
                    <span style={styles.logoText}>Agenda<span style={{ color: '#fff' }}>Plus</span></span>
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
                                placeholder="Buscar paciente por nombre o RUT..."
                                style={styles.searchInput}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            {/* Universal Search Results Dropdown */}
                            {searchQuery.length > 1 && (
                                <div style={styles.searchResults}>
                                    {patients.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.rut.includes(searchQuery)).map(p => (
                                        <div
                                            key={p.id}
                                            style={styles.searchResultItem}
                                            onClick={() => {
                                                setSelectedPatient(p);
                                                setSearchQuery('');
                                            }}
                                        >
                                            <div style={styles.miniAvatar}>{p.name.charAt(0)}</div>
                                            <div style={{ flex: 1 }}>
                                                <div style={{ fontSize: '0.85rem', fontWeight: '800' }}>{p.name}</div>
                                                <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>{p.rut}</div>
                                            </div>
                                            <ChevronRight size={14} color="#cbd5e1" />
                                        </div>
                                    ))}
                                    {patients.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.rut.includes(searchQuery)).length === 0 && (
                                        <div style={{ padding: '15px', textAlign: 'center', fontSize: '0.8rem', color: '#94a3b8' }}>
                                            No se encontraron pacientes
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                        <button style={styles.iconBtn}><Bell size={20} /></button>
                        <div style={styles.userProfile}>
                            <select
                                value={currentProf.id}
                                onChange={(e) => setCurrentProf(professionals.find(p => p.id === parseInt(e.target.value)))}
                                style={styles.contextSelect}
                            >
                                {professionals.map(p => (
                                    <option key={p.id} value={p.id}>{p.name}</option>
                                ))}
                            </select>
                            <div style={{ ...styles.userAvatar, background: currentProf.color }}>{currentProf.name.charAt(0)}</div>
                            <div style={styles.userInfo}>
                                <div style={styles.userName}>{currentProf.role}</div>
                                <div style={styles.userRole}>Perfil Activo</div>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Content Area */}
                <div style={styles.content}>
                    {currentTab === 'dashboard' && <Dashboard stats={getStats()} profId={currentProf.id} />}
                    {currentTab === 'agenda' && <Agenda onOpenPatient={setSelectedPatient} initialProfId={currentProf.id} />}
                    {currentTab === 'patients' && <Clients onOpenPatient={setSelectedPatient} currentProfId={currentProf.id} />}
                    {currentTab === 'marketing' && <CampaignsManager />}
                    {currentTab === 'finances' && <Finances />}
                    {currentTab === 'professionals' && <Professionals />}
                    {currentTab === 'config' && <Config currentProfId={currentProf.id} />}
                </div>

                {/* Overlays */}
                {selectedPatient && (
                    <PatientFile patient={selectedPatient} onClose={() => setSelectedPatient(null)} />
                )}
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
    content: { flex: 1, overflowY: 'auto', paddingBottom: '40px' },
    searchResults: { position: 'absolute', top: '60px', left: 0, right: 0, background: '#fff', borderRadius: '16px', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.15)', border: '1.5px solid #e2e8f0', zIndex: 1000, overflow: 'hidden', maxHeight: '400px' },
    searchResultItem: { padding: '12px 20px', display: 'flex', alignItems: 'center', gap: '15px', cursor: 'pointer', borderBottom: '1px solid #f1f5f9', transition: 'background 0.2s' },
    miniAvatar: { width: '32px', height: '32px', borderRadius: '8px', background: 'var(--primary-gradient)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem', fontWeight: '900' },
    contextSelect: { background: 'none', border: 'none', outline: 'none', fontSize: '0.9rem', fontWeight: '800', cursor: 'pointer', color: 'var(--primary)', marginRight: '10px' }
};

export default SaaSApp;
