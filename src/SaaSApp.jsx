import React, { useState } from 'react';
import Agenda from './Agenda';
import Clients from './Clients';
import PatientFile from './PatientFile';
import Finanzas from './Finanzas';
import TopNav from './components/TopNav';
import IntegrationsConfig from './IntegrationsConfig';
import CRM from './CRM';
import ProfessionalsManagement from './ProfessionalsManagement';
import NotificationCenter from './NotificationCenter';
import Dashboard from './Dashboard';
import CampaignsManager from './CampaignsManager';
import { useSaaSStore } from './store';

const SaaSApp = ({ onLogout }) => {
    const [currentTab, setCurrentTab] = useState('agenda');
    const [selectedPatientForFile, setSelectedPatientForFile] = useState(null);

    const {
        professionals,
        patients,
        appointments,
        notifications,
        config,
        addAppointment,
        updatePatientHistory,
        addProfessional,
        updateProfessional,
        getStats,
        updateConfig,
        addNotification
    } = useSaaSStore();

    const handleOpenPatient = (patient) => {
        setSelectedPatientForFile(patient);
        setCurrentTab('patient-file');
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: 'var(--bg-app)' }}>
            <TopNav currentTab={currentTab} setTab={setCurrentTab} />

            <main style={{ flex: 1, overflowY: 'auto' }}>
                <div style={{ position: 'absolute', top: '10px', right: '10px', zIndex: 100 }}>
                    <button className="btn-outline" onClick={onLogout} style={{ padding: '8px 16px' }}>Cerrar Sesión</button>
                </div>

                {currentTab === 'agenda' && (
                    <Agenda
                        appointments={appointments}
                        patients={patients}
                        professionals={professionals}
                        onAddAppointment={addAppointment}
                        onOpenPatient={handleOpenPatient}
                    />
                )}

                {currentTab === 'clients' && (
                    <Clients onOpenPatient={handleOpenPatient} />
                )}

                {currentTab === 'patient-file' && (
                    <PatientFile
                        patient={selectedPatientForFile}
                        onBack={() => setCurrentTab('clients')}
                        onSaveNote={updatePatientHistory}
                        onAddNotification={addNotification}
                    />
                )}

                {currentTab === 'professionals' && (
                    <ProfessionalsManagement
                        professionals={professionals}
                        appointments={appointments}
                        onAddProfessional={addProfessional}
                        onUpdateProfessional={updateProfessional}
                    />
                )}

                {currentTab === 'notifications' && (
                    <NotificationCenter notifications={notifications} />
                )}

                {currentTab === 'finanzas' && (
                    <Finanzas appointments={appointments} patients={patients} />
                )}

                {currentTab === 'stats' && (
                    <Dashboard stats={getStats()} />
                )}

                {currentTab === 'campaigns' && (
                    <CampaignsManager />
                )}

                {currentTab === 'crm' && (
                    <CRM patients={patients} appointments={appointments} notifications={notifications} />
                )}

                {currentTab === 'config' && (
                    <IntegrationsConfig config={config} onUpdateConfig={updateConfig} />
                )}

                {['support', 'tutorial'].includes(currentTab) && (
                    <div style={{ padding: '40px', textAlign: 'center' }}>
                        <div className="card" style={{ padding: '60px', maxWidth: '600px', margin: '0 auto' }}>
                            <h2 style={{ color: 'var(--primary)', marginBottom: '20px' }}>Panel de {currentTab.toUpperCase()}</h2>
                            <p>Módulo operacional configurado para [Centro Médico Del Valle].</p>
                            <button className="btn-primary" style={{ marginTop: '20px' }} onClick={() => setCurrentTab('agenda')}>Regresar a Agenda</button>
                        </div>
                    </div>
                )}
            </main>

            <style>{`
        .btn-primary { 
          background: var(--primary); 
          color: white; 
          padding: 12px 24px; 
          border-radius: 8px; 
          border: none; 
          font-weight: 700; 
          cursor: pointer; 
          transition: 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .btn-primary:hover { transform: translateY(-2px); filter: brightness(1.1); box-shadow: 0 5px 15px rgba(0,0,0,0.1); }
        .card { border: none !important; }
      `}</style>
        </div>
    );
};

export default SaaSApp;
