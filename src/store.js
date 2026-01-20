import { useState, useCallback } from 'react';

// Professionals Data (from Team.jsx)
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
        active: true
    },
    {
        id: 3,
        name: 'Ps. Carolina Cárcamo',
        role: 'Psicología Clínica',
        specialty: 'Terapia Individual y Familiar',
        email: 'carolina.carcamo@cmdelvalle.cl',
        phone: '+56912345003',
        image: '/ps-carolina-carcamo.png',
        description: 'Experta en bienestar emocional y apoyo psicoterapéutico integral.',
        color: '#6366f1',
        schedule: {
            monday: { start: '14:00', end: '20:00', enabled: true },
            tuesday: { start: '14:00', end: '20:00', enabled: true },
            wednesday: { start: '14:00', end: '20:00', enabled: true },
            thursday: { start: '14:00', end: '20:00', enabled: true },
            friday: { start: '14:00', end: '18:00', enabled: true },
            saturday: { start: '09:00', end: '13:00', enabled: true },
            sunday: { enabled: false }
        },
        consultationPrice: 30000,
        active: true
    },
    {
        id: 4,
        name: 'Ps. Eduardo Jara',
        role: 'Psicología',
        specialty: 'Terapia Cognitivo-Conductual',
        email: 'eduardo.jara@cmdelvalle.cl',
        phone: '+56912345004',
        image: '/ps-eduardo-jara.png',
        description: 'Especialista en procesos terapéuticos y desarrollo personal.',
        color: '#8b5cf6',
        schedule: {
            monday: { start: '09:00', end: '17:00', enabled: true },
            tuesday: { start: '09:00', end: '17:00', enabled: true },
            wednesday: { start: '09:00', end: '17:00', enabled: true },
            thursday: { start: '09:00', end: '17:00', enabled: true },
            friday: { start: '09:00', end: '13:00', enabled: true },
            saturday: { enabled: false },
            sunday: { enabled: false }
        },
        consultationPrice: 30000,
        active: true
    },
    {
        id: 5,
        name: 'Flga. Francisca Stoffel',
        role: 'Fonoaudiología',
        specialty: 'Trastornos del Lenguaje',
        email: 'francisca.stoffel@cmdelvalle.cl',
        phone: '+56912345005',
        image: '/flga-francisca-stoffel.png',
        description: 'Especializada en trastornos del lenguaje, audición y comunicación.',
        color: '#ec4899',
        schedule: {
            monday: { start: '08:00', end: '16:00', enabled: true },
            tuesday: { start: '08:00', end: '16:00', enabled: true },
            wednesday: { start: '08:00', end: '16:00', enabled: true },
            thursday: { start: '08:00', end: '16:00', enabled: true },
            friday: { start: '08:00', end: '12:00', enabled: true },
            saturday: { enabled: false },
            sunday: { enabled: false }
        },
        consultationPrice: 35000,
        active: true
    }
];

// Initial Patients Data
const initialPatients = [
    {
        id: '1',
        name: 'Juan Pérez',
        email: 'juan@example.com',
        phone: '+56912345678',
        rut: '12.345.678-9',
        bloodType: 'O+',
        allergies: ['Penicilina'],
        medications: ['Paracetamol 500mg'],
        history: [
            { date: '2026-01-15', note: 'Consulta inicial por dolor lumbar. Se recomienda reposo.', doctor: 'Dra. Nataly Malaspina' }
        ],
        status: 'Activo',
        debt: 0,
        documents: [{ name: 'Radiografia_Lumbar.pdf', size: '2.4MB', date: '2026-01-15' }],
        photos: [],
        createdAt: '2025-12-01'
    },
    {
        id: '2',
        name: 'Maria Garcia',
        email: 'maria@example.com',
        phone: '+56987654321',
        rut: '18.765.432-1',
        bloodType: 'A-',
        allergies: [],
        medications: [],
        history: [],
        status: 'Pendiente',
        debt: 25000,
        documents: [],
        photos: [],
        createdAt: '2026-01-10'
    }
];

const initialAppointments = [
    { id: 'app1', patientId: '1', profId: 1, time: '11:00', date: '2026-01-19', status: 'pink' },
    { id: 'app2', patientId: '2', profId: 2, time: '10:00', date: '2026-01-20', status: 'np' },
];

export const useSaaSStore = () => {
    const [professionals, setProfessionals] = useState(initialProfessionals);
    const [patients, setPatients] = useState(initialPatients);
    const [appointments, setAppointments] = useState(initialAppointments);
    const [notifications, setNotifications] = useState([]);
    const [config, setConfig] = useState({
        whatsappEnabled: true,
        emailEnabled: true,
        whatsappNumber: '+56912345678',
        emailSender: 'notificaciones@cmdelvalle.cl'
    });

    const addAppointment = useCallback((app) => {
        const newId = Math.random().toString(36).substr(2, 9);
        setAppointments(prev => [...prev, { ...app, id: newId }]);

        // Simulate Notification
        if (config.whatsappEnabled) {
            const patient = patients.find(p => p.id === app.patientId);
            const professional = professionals.find(p => p.id === app.profId);
            setNotifications(prev => [...prev, {
                id: Date.now(),
                type: 'whatsapp',
                to: patient.phone,
                message: `Hola ${patient.name}, tu cita con ${professional.name} ha sido agendada para el ${app.date} a las ${app.time}.`,
                status: 'sent',
                date: new Date().toISOString()
            }]);
        }

        return newId;
    }, [patients, professionals, config]);

    const updatePatientHistory = useCallback((patientId, note) => {
        setPatients(prev => prev.map(p => {
            if (p.id === patientId) {
                return {
                    ...p,
                    history: [{
                        date: new Date().toISOString().split('T')[0],
                        note,
                        doctor: 'Dra. Trinidad Zamorano'
                    }, ...p.history]
                };
            }
            return p;
        }));
    }, []);

    const addProfessional = useCallback((professional) => {
        const newId = Math.max(...professionals.map(p => p.id)) + 1;
        setProfessionals(prev => [...prev, { ...professional, id: newId }]);
    }, [professionals]);

    const updateProfessional = useCallback((profId, updates) => {
        setProfessionals(prev => prev.map(p => p.id === profId ? { ...p, ...updates } : p));
    }, []);

    const deleteProfessional = useCallback((profId) => {
        setProfessionals(prev => prev.map(p => p.id === profId ? { ...p, active: false } : p));
    }, []);

    const getStats = () => {
        const totalSales = appointments.length * 35000;
        const activePatients = patients.filter(p => p.status === 'Activo').length;
        return {
            totalSales,
            activePatients,
            pendingAppointments: appointments.filter(a => a.status === 'np').length,
            confirmedAppointments: appointments.filter(a => a.status !== 'np').length,
            notificationsSent: notifications.length,
            activeProfessionals: professionals.filter(p => p.active).length
        };
    };

    const updateConfig = (newConfig) => {
        setConfig(prev => ({ ...prev, ...newConfig }));
    };

    const addNotification = useCallback((notification) => {
        setNotifications(prev => [{
            id: Date.now(),
            date: new Date().toISOString(),
            status: 'sent',
            ...notification
        }, ...prev]);
    }, []);

    return {
        professionals,
        patients,
        appointments,
        notifications,
        config,
        addAppointment,
        updatePatientHistory,
        addProfessional,
        updateProfessional,
        deleteProfessional,
        getStats,
        updateConfig,
        addNotification
    };
};
