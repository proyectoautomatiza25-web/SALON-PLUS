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

// Appointment Status Types (like Reservo)
const APPOINTMENT_STATUS = {
    CONFIRMED: 'confirmed',      // Confirmado (azul)
    ATTENDED: 'attended',        // Atendido (verde)
    NO_SHOW: 'no_show',         // No llegó (rojo)
    PENDING: 'pending',         // Pendiente (amarillo)
    CANCELLED: 'cancelled',     // Cancelado (gris)
    SUSPENDED: 'suspended',     // Suspendido (naranja)
    BLOCK: 'block'              // Bloqueo (negro)
};

const initialAppointments = [
    { id: 'app1', patientId: '1', profId: 1, time: '11:00', date: '2026-01-19', status: APPOINTMENT_STATUS.CONFIRMED, channel: 'whatsapp' },
    { id: 'app2', patientId: '2', profId: 2, time: '10:00', date: '2026-01-20', status: APPOINTMENT_STATUS.PENDING, channel: 'phone' },
    { id: 'app3', patientId: '1', profId: 3, time: '14:00', date: '2026-01-21', status: APPOINTMENT_STATUS.ATTENDED, channel: 'web' },
];

const initialCampaigns = [];

export const useSaaSStore = () => {
    const [professionals, setProfessionals] = useState(initialProfessionals);
    const [patients, setPatients] = useState(initialPatients);
    const [appointments, setAppointments] = useState(initialAppointments);
    const [notifications, setNotifications] = useState([]);
    const [campaigns, setCampaigns] = useState(initialCampaigns);
    const [config, setConfig] = useState({
        whatsappEnabled: true,
        emailEnabled: true,
        whatsappNumber: '+56912345678',
        emailSender: 'notificaciones@cmdelvalle.cl',
        autoReminders: true,
        reminderHours: 24
    });

    const addAppointment = useCallback((app) => {
        const newId = Math.random().toString(36).substr(2, 9);
        const newAppointment = {
            ...app,
            id: newId,
            status: app.status || APPOINTMENT_STATUS.PENDING,
            channel: app.channel || 'manual',
            createdAt: new Date().toISOString()
        };
        setAppointments(prev => [...prev, newAppointment]);

        // Auto-send confirmation notification
        if (config.whatsappEnabled) {
            const patient = patients.find(p => p.id === app.patientId);
            const professional = professionals.find(p => p.id === app.profId);
            if (patient && professional) {
                setNotifications(prev => [...prev, {
                    id: Date.now(),
                    type: 'whatsapp',
                    to: patient.phone,
                    patientName: patient.name,
                    message: `Hola ${patient.name}, tu cita con ${professional.name} ha sido agendada para el ${app.date} a las ${app.time}.`,
                    status: 'sent',
                    date: new Date().toISOString()
                }]);
            }
        }

        return newId;
    }, [patients, professionals, config]);

    const updateAppointmentStatus = useCallback((appointmentId, newStatus) => {
        setAppointments(prev => prev.map(app =>
            app.id === appointmentId ? { ...app, status: newStatus, updatedAt: new Date().toISOString() } : app
        ));
    }, []);

    const deleteAppointment = useCallback((appointmentId) => {
        setAppointments(prev => prev.filter(app => app.id !== appointmentId));
    }, []);

    const updatePatientHistory = useCallback((patientId, note) => {
        setPatients(prev => prev.map(p => {
            if (p.id === patientId) {
                return {
                    ...p,
                    history: [{
                        date: new Date().toISOString().split('T')[0],
                        note,
                        doctor: 'Sistema'
                    }, ...p.history]
                };
            }
            return p;
        }));
    }, []);

    const addPatient = useCallback((patient) => {
        const newId = (Math.max(...patients.map(p => parseInt(p.id))) + 1).toString();
        const newPatient = {
            ...patient,
            id: newId,
            history: [],
            documents: [],
            photos: [],
            status: 'Activo',
            debt: 0,
            createdAt: new Date().toISOString().split('T')[0]
        };
        setPatients(prev => [...prev, newPatient]);
        return newId;
    }, [patients]);

    const updatePatient = useCallback((patientId, updates) => {
        setPatients(prev => prev.map(p => p.id === patientId ? { ...p, ...updates } : p));
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

    // Advanced Statistics (like Reservo)
    const getStats = () => {
        const now = new Date();
        const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

        // Patients by channel
        const patientsByChannel = patients.reduce((acc, patient) => {
            const channel = patient.channel || 'Sin referencia';
            acc[channel] = (acc[channel] || 0) + 1;
            return acc;
        }, {});

        // Appointments by status
        const appointmentsByStatus = appointments.reduce((acc, app) => {
            acc[app.status] = (acc[app.status] || 0) + 1;
            return acc;
        }, {});

        // Appointments by professional
        const appointmentsByProfessional = professionals.map(prof => ({
            name: prof.name,
            count: appointments.filter(a => a.profId === prof.id).length,
            percentage: ((appointments.filter(a => a.profId === prof.id).length / appointments.length) * 100).toFixed(1)
        }));

        // No-show rate
        const noShowCount = appointments.filter(a => a.status === APPOINTMENT_STATUS.NO_SHOW).length;
        const noShowRate = appointments.length > 0 ? ((noShowCount / appointments.length) * 100).toFixed(1) : 0;

        // Active patients (with appointments in last 30 days)
        const activePatients = new Set(
            appointments
                .filter(a => new Date(a.date) >= thirtyDaysAgo)
                .map(a => a.patientId)
        ).size;

        return {
            totalSales: appointments.filter(a => a.status === APPOINTMENT_STATUS.ATTENDED).length * 35000,
            activePatients,
            newPatients: patients.filter(p => new Date(p.createdAt) >= thirtyDaysAgo).length,
            totalPatients: patients.length,
            pendingAppointments: appointments.filter(a => a.status === APPOINTMENT_STATUS.PENDING).length,
            confirmedAppointments: appointments.filter(a => a.status === APPOINTMENT_STATUS.CONFIRMED).length,
            attendedAppointments: appointments.filter(a => a.status === APPOINTMENT_STATUS.ATTENDED).length,
            noShowAppointments: noShowCount,
            noShowRate,
            notificationsSent: notifications.length,
            activeProfessionals: professionals.filter(p => p.active).length,
            patientsByChannel,
            appointmentsByStatus,
            appointmentsByProfessional
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

    // Campaign Management
    const addCampaign = useCallback((campaign) => {
        const newId = Math.random().toString(36).substr(2, 9);
        setCampaigns(prev => [...prev, {
            ...campaign,
            id: newId,
            createdAt: new Date().toISOString(),
            status: 'draft'
        }]);
        return newId;
    }, []);

    const sendCampaign = useCallback((campaignId) => {
        const campaign = campaigns.find(c => c.id === campaignId);
        if (!campaign) return;

        // Mark campaign as sent
        setCampaigns(prev => prev.map(c =>
            c.id === campaignId ? { ...c, status: 'sent', sentAt: new Date().toISOString() } : c
        ));

        // Create notifications for each recipient
        const recipients = campaign.recipients || patients;
        recipients.forEach(patient => {
            setNotifications(prev => [...prev, {
                id: Date.now() + Math.random(),
                type: campaign.type || 'email',
                to: campaign.type === 'email' ? patient.email : patient.phone,
                patientName: patient.name,
                message: campaign.message,
                subject: campaign.subject,
                status: 'sent',
                campaignId,
                date: new Date().toISOString()
            }]);
        });
    }, [campaigns, patients]);

    return {
        professionals,
        patients,
        appointments,
        notifications,
        campaigns,
        config,
        APPOINTMENT_STATUS,
        addAppointment,
        updateAppointmentStatus,
        deleteAppointment,
        updatePatientHistory,
        addPatient,
        updatePatient,
        addProfessional,
        updateProfessional,
        deleteProfessional,
        getStats,
        updateConfig,
        addNotification,
        addCampaign,
        sendCampaign
    };
};
