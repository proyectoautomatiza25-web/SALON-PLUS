import React, { useState, useEffect } from 'react';
import {
    Layout, Calendar, Users, Briefcase, Mail,
    DollarSign, BarChart, Settings, LogOut,
    Search, Bell, ChevronRight, HelpCircle, Video, Gift, Globe
} from 'lucide-react';
import { useSaaSStore } from './store';
import Agenda from './Agenda';
import Dashboard from './Dashboard';
import CampaignsManager from './CampaignsManager';
import BookingSettings from './BookingSettings';
import PatientFile from './PatientFile';
import Clients from './Clients';
import Finances from './Finances';
import Professionals from './Professionals';
import Config from './Config';

const SaaSApp = ({ user, onLogout }) => {
    const [currentTab, setCurrentTab] = useState('agenda');
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    const {
        getStats,
        patients,
        professionals,
        fetchInitialData,
        businessName,
        businessLogo,
        loading,
        isHydrated
    } = useSaaSStore();

    useEffect(() => {
        if (isHydrated) {
            fetchInitialData();
        }
    }, [isHydrated, fetchInitialData]);

    const [currentProf, setCurrentProf] = useState(null);

    useEffect(() => {
        const activeProfs = (professionals || []).filter(p => p.active);
        if (activeProfs.length > 0 && !currentProf) {
            setCurrentProf(activeProfs[0]);
        }
    }, [professionals, currentProf]);

    const menuItems = [
        { id: 'agenda', label: 'Agenda Pediátrica', icon: Calendar },
        { id: 'booking', label: 'Reserva Online', icon: Globe },
        { id: 'clients', label: 'Pacientes', icon: Users },
        { id: 'professionals', label: 'Equipo', icon: Briefcase },
        { id: 'marketing', label: 'CRM', icon: Mail },
        { id: 'finances', label: 'Finanzas', icon: DollarSign },
        { id: 'stats', label: 'Estadísticas', icon: BarChart },
        { id: 'config', label: 'Configuración', icon: Settings },
        { id: 'support', label: 'Soporte', icon: Video }
    ];

    const isReady = isHydrated && !loading;
    const hasData = (professionals || []).length > 0;

    if (!isReady && !hasData) {
        return (
            <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8fafc' }}>
                <div style={{ textAlign: 'center' }}>
                    <div className="loader" style={{ marginBottom: '15px' }}></div>
                    <div style={{ color: '#004975', fontWeight: '800', fontSize: '1.2rem' }}>Agenda Plus</div>
                    <div style={{ color: '#64748b', fontSize: '0.9rem' }}>Sincronizando sus datos médicos...</div>
                </div>
            </div>
        );
    }

    return (
        <div style={styles.container}>
            {/* Top Navigation - Reservo Style */}
            <header style={styles.topNav}>
                <div style={styles.leftSection}>
                    <div style={styles.logoContainer}>
                        <img src="/logo_centro_medico.png" alt="Logo" style={styles.logoImg} />
                        <div style={styles.brandInfo}>
                            <div style={styles.brandName}>{businessName}</div>
                        </div>
                    </div>
                </div>

                <nav style={styles.navBar}>
                    {menuItems.map(item => (
                        <button
                            key={item.id}
                            onClick={() => setCurrentTab(item.id)}
                            style={{
                                ...styles.navTab,
                                borderBottom: currentTab === item.id ? '4px solid #fff' : '4px solid transparent',
                                background: currentTab === item.id ? 'rgba(255,255,255,0.1)' : 'transparent'
                            }}
                        >
                            <item.icon size={22} color="#fff" />
                            <span style={styles.navLabel}>{item.label}</span>
                        </button>
                    ))}
                </nav>

                <div style={styles.rightSection}>
                    <div style={styles.userMinimal}>
                        <div style={styles.userTextInfo}>
                            <div style={styles.userNameHeader}>{user?.email.split('@')[0]}</div>
                            <div style={styles.centerName}>{businessName || 'Mi Centro'}</div>
                            <button onClick={onLogout} style={styles.logoutHeaderBtn}>
                                <LogOut size={14} />
                                <span>Cerrar sesión</span>
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content Area */}
            <main style={styles.main}>

                {/* Content */}
                <div style={styles.content}>
                    {currentTab === 'agenda' && (
                        <Agenda
                            onOpenPatient={setSelectedPatient}
                            initialProfId={currentProf?.id}
                        />
                    )}
                    {currentTab === 'stats' && <Dashboard stats={getStats()} profId={currentProf?.id} />}
                    {currentTab === 'clients' && <Clients onOpenPatient={setSelectedPatient} currentProfId={currentProf?.id} />}
                    {currentTab === 'marketing' && <CampaignsManager />}
                    {currentTab === 'booking' && <BookingSettings />}
                    {currentTab === 'finances' && <Finances />}
                    {currentTab === 'config' && <Config currentProfId={currentProf?.id} />}
                    {currentTab === 'professionals' && <Professionals />}
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
    container: { display: 'flex', flexDirection: 'column', height: '100vh', width: '100vw', background: '#fff', color: '#1e293b', overflow: 'hidden' },
    topNav: { height: '90px', background: '#004975', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 20px', zIndex: 100 },
    leftSection: { display: 'flex', alignItems: 'center', gap: '20px' },
    logoContainer: { display: 'flex', alignItems: 'center', gap: '15px', background: '#fff', padding: '5px 12px', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.2)' },
    logoCircle: { width: '45px', height: '45px', background: '#004975', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' },
    logoImg: { height: '50px', width: 'auto', objectFit: 'contain' },
    brandInfo: { display: 'none' }, // In the image, logo is separate
    navBar: { display: 'flex', height: '100%', alignItems: 'flex-end', gap: '10px' },
    navTab: { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '10px 20px', border: 'none', cursor: 'pointer', transition: 'all 0.2s', height: '80px', minWidth: '100px' },
    navLabel: { color: '#fff', fontSize: '0.85rem', fontWeight: '600' },
    rightSection: { display: 'flex', alignItems: 'center', gap: '20px' },
    inviteBtn: { background: '#fff', border: 'none', borderRadius: '8px', padding: '8px 15px', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '700', fontSize: '0.85rem', color: '#004975', cursor: 'pointer' },
    userMinimal: { display: 'flex', alignItems: 'center', gap: '10px', color: '#fff' },
    userTextInfo: { textAlign: 'right' },
    userNameHeader: { fontSize: '0.9rem', fontWeight: '700' },
    centerName: { fontSize: '0.75rem', opacity: '0.9' },
    logoutHeaderBtn: { background: 'none', border: 'none', color: '#fff', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer', padding: '0', marginTop: '2px' },

    subHeader: { height: '50px', background: '#fff', borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', padding: '0 20px' },
    tabBar: { display: 'flex', gap: '20px' },
    subTab: { background: 'none', border: 'none', padding: '10px 0', fontSize: '0.85rem', fontWeight: '600', color: '#64748b', cursor: 'pointer' },
    subTabActive: { background: 'none', border: 'none', padding: '10px 0', fontSize: '0.85rem', fontWeight: '700', color: '#004975', borderBottom: '2px solid #004975', cursor: 'pointer' },

    main: { flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' },
    actionsBar: { padding: '15px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '20px' },
    contextSelectors: { display: 'flex', alignItems: 'center', gap: '15px' },
    dateSelector: { display: 'flex', alignItems: 'center', border: '1px solid #e2e8f0', borderRadius: '8px', overflow: 'hidden' },
    arrowBtn: { padding: '8px 12px', border: 'none', background: '#fff', cursor: 'pointer', color: '#64748b' },
    currentDate: { padding: '8px 15px', fontSize: '0.9rem', fontWeight: '600', borderLeft: '1px solid #e2e8f0', borderRight: '1px solid #e2e8f0' },
    todayBtn: { background: '#004975', color: '#fff', border: 'none', borderRadius: '8px', padding: '8px 20px', fontWeight: '700', fontSize: '0.9rem', cursor: 'pointer' },
    viewToggle: { display: 'flex', border: '1px solid #004975', borderRadius: '8px', overflow: 'hidden' },
    toggleBtn: { background: '#fff', color: '#004975', border: 'none', padding: '8px 15px', fontSize: '0.85rem', fontWeight: '600', cursor: 'pointer' },
    toggleBtnActive: { background: '#e0f2fe', color: '#004975', border: 'none', padding: '8px 15px', fontSize: '0.85rem', fontWeight: '700', cursor: 'pointer' },
    boxSelect: { padding: '8px 15px', borderRadius: '8px', border: '1px solid #e2e8f0', background: '#fff', fontSize: '0.9rem', color: '#64748b', outline: 'none' },

    searchSection: { display: 'flex', alignItems: 'center', gap: '15px' },
    searchWrapper: { position: 'relative', display: 'flex', alignItems: 'center', gap: '10px', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '8px 15px', width: '300px' },
    mainSearch: { border: 'none', outline: 'none', width: '100%', fontSize: '0.9rem', background: 'transparent' },
    searchResults: { position: 'absolute', top: '45px', left: 0, right: 0, background: '#fff', borderRadius: '8px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', border: '1px solid #e2e8f0', zIndex: 1000, overflow: 'hidden' },
    searchResultItem: { padding: '10px 15px', display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', borderBottom: '1px solid #f1f5f9' },
    miniAvatar: { width: '28px', height: '28px', borderRadius: '6px', background: '#004975', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: '900' },

    content: { flex: 1, overflowY: 'auto', padding: '0 20px 20px 20px' }
};

export default SaaSApp;
