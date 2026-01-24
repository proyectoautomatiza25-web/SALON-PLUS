import { create } from 'zustand';

export const useSalonStore = create((set, get) => ({
    // --- Estado del Negocio ---
    businessName: 'Salon Plus by Automatiza Sur',

    // --- Estilistas / Profesionales ---
    stylists: [
        { id: 1, name: 'Michel', specialty: 'Estilista', color: '#fcd34d', active: true }, // Yellowish
        { id: 2, name: 'Steve', specialty: 'Barbero', color: '#fca5a5', active: true },   // Redish
        { id: 3, name: 'Elena', specialty: 'Manicure', color: '#6ee7b7', active: true },  // Greenish
        { id: 4, name: 'Sarah', specialty: 'Colorista', color: '#93c5fd', active: true }, // Blueish
    ],

    // --- Clientes (Base de datos CRM) ---
    clients: [
        { id: 1, name: 'Valentina Muñoz', phone: '+56911223344', email: 'vale@gmail.com', lastVisit: '2023-12-10' },
        { id: 2, name: 'Carolina Lagos', phone: '+56922334455', email: 'caro@hotmail.com', lastVisit: '2024-01-05' },
        { id: 3, name: 'Fernanda Pizarro', phone: '+56933445566', email: 'fer@outlook.com', lastVisit: '2024-01-15' },
    ],

    // --- Servicios ---
    services: [
        { id: 1, name: 'Corte de Dama', duration: 60, price: 25000, color: '#f472b6' },
        { id: 2, name: 'Color Global', duration: 120, price: 65000, color: '#fb7185' },
        { id: 3, name: 'Balayage', duration: 180, price: 85000, color: '#c084fc' },
        { id: 4, name: 'Manicure Permanente', duration: 60, price: 18000, color: '#34d399' },
        { id: 5, name: 'Barbería Tradicional', duration: 45, price: 15000, color: '#60a5fa' }
    ],

    // --- Productos (Punto de Venta) ---
    products: [
        { id: 1, name: 'Shampoo Keratina 500ml', price: 15990, stock: 12, category: 'Cuidado Capilar' },
        { id: 2, name: 'Máscara Reparadora', price: 21990, stock: 8, category: 'Tratamiento' },
        { id: 3, name: 'Aceite de Argán', price: 12990, stock: 20, category: 'Finalizadores' },
        { id: 4, name: 'Spray Fijador Fuerte', price: 9990, stock: 15, category: 'Styling' },
        { id: 5, name: 'Pack Shampoo + Acondicionador', price: 28990, stock: 5, category: 'Packs' },
    ],

    // --- Citas (Calendario) ---
    appointments: [
        {
            id: 101,
            stylistId: 1,
            clientId: 1,
            clientName: 'Valentina Muñoz',
            title: 'Balayage + Corte',
            start: new Date(2026, 0, 24, 10, 0), // Enero 24, 2026 10:00
            end: new Date(2026, 0, 24, 13, 0),   // 3 horas
            status: 'confirmed',
            price: 85000
        },
        {
            id: 102,
            stylistId: 2,
            clientId: 2,
            clientName: 'Carolina Lagos',
            title: 'Corte Bordado',
            start: new Date(2026, 0, 24, 11, 0),
            end: new Date(2026, 0, 24, 12, 0),
            status: 'pending',
            price: 25000
        },
        {
            id: 103,
            stylistId: 3,
            clientId: 3,
            clientName: 'Fernanda Pizarro',
            title: 'Esmaltado Permanente',
            start: new Date(2026, 0, 24, 15, 0),
            end: new Date(2026, 0, 24, 16, 0),
            status: 'attended',
            price: 18000
        }
    ],

    // --- Acciones ---
    addAppointment: (appt) => set((state) => ({
        appointments: [...state.appointments, { ...appt, id: Date.now() }]
    })),

    updateAppointmentStatus: (id, status) => set((state) => ({
        appointments: state.appointments.map(a => a.id === id ? { ...a, status } : a)
    })),

    updateAppointment: (updatedAppt) => set((state) => ({
        appointments: state.appointments.map(a => a.id === updatedAppt.id ? updatedAppt : a)
    })),

    removeAppointment: (id) => set((state) => ({
        appointments: state.appointments.filter(a => a.id !== id)
    })),

    addClient: (client) => set((state) => ({
        clients: [...state.clients, { ...client, id: Date.now() }]
    })),

    updateClient: (updatedClient) => set((state) => ({
        clients: state.clients.map(c => c.id === updatedClient.id ? updatedClient : c)
    })),

    removeClient: (id) => set((state) => ({
        clients: state.clients.filter(c => c.id !== id)
    })),

    // --- Stylist Actions ---
    addStylist: (stylist) => set((state) => ({
        stylists: [...state.stylists, { ...stylist, id: Date.now() }]
    })),

    updateStylist: (updatedStylist) => set((state) => ({
        stylists: state.stylists.map(s => s.id === updatedStylist.id ? updatedStylist : s)
    })),

    removeStylist: (id) => set((state) => ({
        stylists: state.stylists.filter(s => s.id !== id)
    })),

    // --- Service Actions ---
    addService: (service) => set((state) => ({
        services: [...state.services, { ...service, id: Date.now() }]
    })),

    updateService: (updatedService) => set((state) => ({
        services: state.services.map(s => s.id === updatedService.id ? updatedService : s)
    })),

    removeService: (id) => set((state) => ({
        services: state.services.filter(s => s.id !== id)
    })),

    // --- Product Actions ---
    addProduct: (product) => set((state) => ({
        products: [...state.products, { ...product, id: Date.now() }]
    })),

    updateProduct: (updatedProduct) => set((state) => ({
        products: state.products.map(p => p.id === updatedProduct.id ? updatedProduct : p)
    })),

    removeProduct: (id) => set((state) => ({
        products: state.products.filter(p => p.id !== id)
    })),

    // --- Constantes de Estado ---
    APPOINTMENT_STATUS: {
        PENDING: 'pending',
        CONFIRMED: 'confirmed',
        ATTENDED: 'attended',
        NO_SHOW: 'no_show',
        CANCELLED: 'cancelled'
    }
}));
