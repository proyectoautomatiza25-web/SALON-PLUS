import { useState, useCallback } from 'react';

// Professionals Data (Expanded)
const initialProfessionals = [
    {
        id: 1,
        name: 'Dra. Nataly Malaspina',
        role: 'Medicina General',
        specialty: 'Atención Integral Familiar',
        email: 'nataly.malaspina@cmdelvalle.cl',
        phone: '+56912345001',
        image: '/dr-nataly-malaspina.png',
        description: 'Especialista en medicina integral con enfoque en prevención y cuidado familiar.',
        color: '#10b981',
        schedule: {
            monday: { start: '09:00', end: '18:00', enabled: true },
            tuesday: { start: '09:00', end: '18:00', enabled: true },
            wednesday: { start: '09:00', end: '18:00', enabled: true },
            thursday: { start: '09:00', end: '18:00', enabled: true },
            friday: { start: '09:00', end: '14:00', enabled: true },
            saturday: { enabled: false },
            sunday: { enabled: false }
        },
        consultationPrice: 35000,
        commission: 60, // 60% commission for the professional
        active: true
    },
    {
        id: 2,
        name: 'Dra. Francis Zabaleta',
        role: 'Pediatría',
        specialty: 'Desarrollo Infantil',
        email: 'francis.zabaleta@cmdelvalle.cl',
        phone: '+56912345002',
        image: '/dr-francis-zabaleta.png',
        description: 'Creadora de @AdosisdePediatra. Dedicada al cuidado y desarrollo saludable de los niños.',
        color: '#f59e0b',
        schedule: {
            monday: { start: '10:00', end: '19:00', enabled: true },
            tuesday: { start: '10:00', end: '19:00', enabled: true },
            wednesday: { start: '10:00', end: '19:00', enabled: true },
            thursday: { start: '10:00', end: '19:00', enabled: true },
            friday: { start: '10:00', end: '15:00', enabled: true },
            saturday: { enabled: false },
            sunday: { enabled: false }
        },
        consultationPrice: 40000,
        commission: 70,
        active: true
    }
];

// Initial Patients Data (Expanded with History, Recetas, Documents)
const initialPatients = [
    {
        id: '1',
        name: 'Juan Pérez',
        email: 'juan@example.com',
        phone: '+56912345678',
        rut: '12.345.678-9',
        address: 'Av. Providencia 1234, Santiago',
        birthDate: '1985-05-15',
        prevision: 'Fonasa',
        category: 'Crónico',
        bloodType: 'O+',
        allergies: ['Penicilina'],
        medications: ['Paracetamol 500mg'],
        history: [
            { id: 'h1', date: '2025-12-10', doctor: 'Dra. Nataly Malaspina', specialty: 'Medicina General', reason: 'Control presión arterial', observation: 'Paciente estable, mantiene medicación.', bloodPressure: '120/80', weight: '75kg' }
        ],
        recetas: [
            { id: 'r1', date: '2025-12-10', doctor: 'Dra. Nataly Malaspina', items: [{ medication: 'Enalapril 10mg', instruction: '1 cada 12 horas por 30 días' }] }
        ],
        documents: [
            { id: 'd1', name: 'Examen de Sangre.pdf', date: '2025-12-05', type: 'Examen' }
        ],
        debts: [],
        status: 'Activo',
        createdAt: '2025-12-01'
    }
];

const APPOINTMENT_STATUS = {
    CONFIRMED: 'confirmed',
    ATTENDED: 'attended',
    NO_SHOW: 'no_show',
    PENDING: 'pending',
    CANCELLED: 'cancelled',
    SUSPENDED: 'suspended',
    BLOCK: 'block'
};

const initialAppointments = [
    { id: 'app1', patientId: '1', profId: 1, time: '11:00', date: '2026-01-19', status: APPOINTMENT_STATUS.CONFIRMED, channel: 'whatsapp', price: 35000, soap: { reason: '', exam: '', diagnosis: '', indication: '' } },
];

export const useSaaSStore = () => {
    const [professionals, setProfessionals] = useState(initialProfessionals);
    const [patients, setPatients] = useState(initialPatients);
    const [appointments, setAppointments] = useState(initialAppointments);
    const [notifications, setNotifications] = useState([]);
    const [campaigns, setCampaigns] = useState([]);
    const [finances, setFinances] = useState({
        transactions: [],
        boxes: [{ id: 1, name: 'Caja Central', status: 'closed', balance: 0 }],
        boxHistory: []
    });

    const openBox = useCallback((boxId, initialAmount = 0) => {
        setFinances(prev => ({
            ...prev,
            boxes: prev.boxes.map(b => b.id === boxId ? { ...b, status: 'open', openingAmount: initialAmount, balance: initialAmount, openedAt: new Date().toISOString() } : b)
        }));
    }, []);

    const closeBox = useCallback((boxId) => {
        setFinances(prev => {
            const box = prev.boxes.find(b => b.id === boxId);
            const historyEntry = { ...box, closedAt: new Date().toISOString(), finalBalance: box.balance };
            return {
                ...prev,
                boxes: prev.boxes.map(b => b.id === boxId ? { ...b, status: 'closed', balance: 0 } : b),
                boxHistory: [historyEntry, ...prev.boxHistory]
            };
        });
    }, []);
    const [config, setConfig] = useState({
        whatsappEnabled: true,
        emailEnabled: true,
        autoReminders: true,
        reminderHours: 24
    });

    const addAppointment = useCallback((app) => {
        const newId = Math.random().toString(36).substr(2, 9);
        const newApp = {
            ...app,
            id: newId,
            status: app.status || APPOINTMENT_STATUS.PENDING,
            price: app.price || 0,
            soap: app.soap || { reason: '', exam: '', diagnosis: '', indication: '' }
        };
        setAppointments(prev => [...prev, newApp]);
        return newId;
    }, []);

    const updateAppointment = useCallback((appId, updates) => {
        setAppointments(prev => prev.map(app => app.id === appId ? { ...app, ...updates } : app));
    }, []);

    const updateAppointmentStatus = useCallback((appointmentId, newStatus) => {
        setAppointments(prev => prev.map(app =>
            app.id === appointmentId ? { ...app, status: newStatus } : app
        ));

        // If attended, we could auto-create a clinical entry
        if (newStatus === APPOINTMENT_STATUS.ATTENDED) {
            // Logic to handle financial transaction
        }
    }, [APPOINTMENT_STATUS.ATTENDED]);

    const deleteAppointment = useCallback((appointmentId) => {
        setAppointments(prev => prev.filter(app => app.id !== appointmentId));
    }, []);

    const addPatient = useCallback((patient) => {
        const newId = (patients.length + 1).toString();
        const newPatient = {
            ...patient,
            id: newId,
            history: [],
            recetas: [],
            documents: [],
            debts: [],
            status: 'Activo',
            createdAt: new Date().toISOString()
        };
        setPatients(prev => [...prev, newPatient]);
        return newId;
    }, [patients.length]);

    const addClinicalEntry = useCallback((patientId, entry) => {
        setPatients(prev => prev.map(p => {
            if (p.id === patientId) {
                return {
                    ...p,
                    history: [{ id: Date.now().toString(), date: new Date().toISOString(), ...entry }, ...p.history]
                };
            }
            return p;
        }));
    }, []);

    const addReceta = useCallback((patientId, receta) => {
        setPatients(prev => prev.map(p => {
            if (p.id === patientId) {
                return {
                    ...p,
                    recetas: [{ id: Date.now().toString(), date: new Date().toISOString(), ...receta }, ...p.recetas]
                };
            }
            return p;
        }));
    }, []);

    const addDocument = useCallback((patientId, doc) => {
        setPatients(prev => prev.map(p => {
            if (p.id === patientId) {
                return {
                    ...p,
                    documents: [{ id: Date.now().toString(), date: new Date().toISOString(), ...doc }, ...p.documents]
                };
            }
            return p;
        }));
    }, []);

    const addTransaction = useCallback((patientId, transaction) => {
        const newTrans = { id: Date.now().toString(), date: new Date().toISOString(), ...transaction };
        setFinances(prev => ({
            ...prev,
            transactions: [newTrans, ...prev.transactions]
        }));

        // Also update patient debts if needed
        setPatients(prev => prev.map(p => {
            if (p.id === patientId) {
                return {
                    ...p,
                    debts: p.debts ? [...p.debts, newTrans] : [newTrans]
                };
            }
            return p;
        }));
    }, []);

    const getStats = () => {
        const totalSales = appointments.filter(a => a.status === APPOINTMENT_STATUS.ATTENDED).reduce((sum, a) => sum + (a.price || 0), 0);
        return {
            totalSales,
            activePatients: patients.length,
            notificationsSent: notifications.length,
            confirmedAppointments: appointments.filter(a => a.status === APPOINTMENT_STATUS.CONFIRMED).length,
            pendingAppointments: appointments.filter(a => a.status === APPOINTMENT_STATUS.PENDING).length,
            attendedAppointments: appointments.filter(a => a.status === APPOINTMENT_STATUS.ATTENDED).length,
            noShowAppointments: appointments.filter(a => a.status === APPOINTMENT_STATUS.NO_SHOW).length,
            noShowRate: appointments.length > 0 ? ((appointments.filter(a => a.status === APPOINTMENT_STATUS.NO_SHOW).length / appointments.length) * 100).toFixed(1) : 0,
            activeProfessionals: professionals.filter(p => p.active).length,
            patientsByChannel: { whatsapp: 10, web: 5, phone: 2 },
            appointmentsByStatus: { confirmed: 5, attended: 12, pending: 3, no_show: 2 },
            appointmentsByProfessional: professionals.map(p => ({
                name: p.name,
                count: appointments.filter(a => a.profId === p.id).length,
                percentage: appointments.length > 0 ? ((appointments.filter(a => a.profId === p.id).length / appointments.length) * 100).toFixed(0) : 0
            })),
            totalPatients: patients.length
        };
    };

    const addCampaign = useCallback((campaign) => {
        const newId = Math.random().toString(36).substr(2, 9);
        setCampaigns(prev => [...prev, { ...campaign, id: newId, status: 'draft', createdAt: new Date().toISOString() }]);
        return newId;
    }, []);

    const sendCampaign = useCallback((campaignId) => {
        setCampaigns(prev => prev.map(c => c.id === campaignId ? { ...c, status: 'sent', sentAt: new Date().toISOString() } : c));
    }, []);

    return {
        professionals,
        patients,
        appointments,
        notifications,
        campaigns,
        config,
        finances,
        APPOINTMENT_STATUS,
        addAppointment,
        updateAppointment,
        updateAppointmentStatus,
        deleteAppointment,
        addClinicalEntry,
        addReceta,
        addDocument,
        getStats,
        addCampaign,
        sendCampaign,
        openBox,
        closeBox,
        addPatient,
        addTransaction
    };
};
