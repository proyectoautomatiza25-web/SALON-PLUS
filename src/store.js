import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { api } from './api';

export const useSalonStore = create(
    persist(
        (set, get) => ({
            // --- Estado del Negocio ---
            businessName: 'Salon Plus',
            businessLogo: null,
            bookingSlug: null,
            globalError: null,

            setGlobalError: (error) => set({ globalError: error }),

            updateProfile: async (data) => {
                try {
                    const updatedUser = await api.updateMe(data);
                    set({
                        businessName: updatedUser.business_name,
                        businessLogo: updatedUser.business_logo,
                        bookingSlug: updatedUser.booking_slug
                    });
                } catch (e) {
                    console.error("Error updating profile", e);
                    throw e;
                }
            },

            // --- Autenticación ---
            auth: {
                isAuthenticated: false,
                userEmail: null,
                token: null,
            },

            login: (data) => set(() => ({
                auth: {
                    isAuthenticated: true,
                    userEmail: data.email,
                    token: data.token
                },
            })),

            logout: () => set(() => ({
                auth: { isAuthenticated: false, userEmail: null, token: null }
            })),

            // --- FETCH INITIAL DATA (Backend Sync) ---
            fetchInitialData: async () => {
                const { auth } = get();
                if (!auth.token) return;

                try {
                    console.log("Fetching Initial Data from Backend...");
                    const [userData, rawStylists, rawServices, rawClients, rawAppointments, rawProducts] = await Promise.all([
                        api.getMe(),
                        api.getStylists(),
                        api.getServices(),
                        api.getClients(),
                        api.getAppointments(),
                        api.getProducts()
                    ]);

                    // Sync Subscription & User Data
                    set({
                        businessName: userData.business_name || 'Salon Plus',
                        businessLogo: userData.business_logo || null,
                        bookingSlug: userData.booking_slug || null,
                        subscription: {
                            planType: userData.plan_type,
                            trialEnd: userData.trial_end_at,
                            active: userData.subscription_active
                        }
                    });

                    // Map Entities for Frontend (snake_case -> camelCase)
                    const stylists = rawStylists.map(s => ({
                        id: s.id,
                        name: s.name,
                        specialty: s.specialty,
                        color: s.color,
                        avatar: s.avatar,
                        active: s.active
                    }));

                    const clients = rawClients.map(c => ({
                        id: c.id,
                        name: c.nombre || c.name,
                        phone: c.telefono || c.phone,
                        email: c.email,
                        notes: c.notes,
                        lastVisit: c.ultima_compra || c.last_visit
                    }));

                    const services = rawServices.map(s => ({
                        id: s.id,
                        name: s.name,
                        duration: s.duration,
                        price: s.price,
                        color: s.color
                    }));

                    const products = rawProducts.map(p => ({
                        id: p.id,
                        name: p.name,
                        price: p.price,
                        stock: p.stock,
                        category: p.category
                    }));

                    const appointments = rawAppointments.map(appt => ({
                        ...appt,
                        stylistId: appt.stylist_id,
                        clientId: appt.client_id,
                        start: new Date(appt.start_time),
                        end: new Date(appt.end_time)
                    }));

                    set({ stylists, services, clients, appointments, products, globalError: null });
                    console.log("Data loaded successfully");
                } catch (error) {
                    console.error("Error loading initial data:", error);
                    set({ globalError: "Error al conectar con el servidor. Revisa tu conexión." });
                }
            },


            // --- Estilistas / Profesionales ---
            stylists: [],

            addStylist: async (stylist) => {
                try {
                    const { id, ...payload } = stylist;
                    const newStylist = await api.createStylist(payload);
                    // Map back to camelCase
                    const mapped = {
                        id: newStylist.id,
                        name: newStylist.name,
                        specialty: newStylist.specialty,
                        color: newStylist.color,
                        avatar: newStylist.avatar,
                        active: newStylist.active
                    };
                    set((state) => ({ stylists: [...state.stylists, mapped] }));
                    return mapped;
                } catch (e) {
                    console.error("Error creating stylist", e);
                    throw e;
                }
            },

            updateStylist: async (updatedStylist) => {
                try {
                    const { id, ...payload } = updatedStylist;
                    const result = await api.updateStylist(id, payload);
                    const mapped = {
                        id: result.id,
                        name: result.name,
                        specialty: result.specialty,
                        color: result.color,
                        avatar: result.avatar,
                        active: result.active
                    };
                    set((state) => ({
                        stylists: state.stylists.map(s => s.id === result.id ? mapped : s)
                    }));
                    return mapped;
                } catch (e) {
                    console.error("Error updating stylist", e);
                    throw e;
                }
            },

            removeStylist: async (id) => {
                try {
                    await api.deleteStylist(id);
                    set((state) => ({ stylists: state.stylists.filter(s => s.id !== id) }));
                } catch (e) {
                    console.error("Error deleting stylist", e);
                }
            },

            // --- Clientes ---
            clients: [],

            addClient: async (client) => {
                try {
                    const { id, lastVisit, ...payload } = client;
                    const newClient = await api.createClient(payload);
                    const mapped = {
                        id: newClient.id,
                        name: newClient.name,
                        phone: newClient.phone,
                        email: newClient.email,
                        notes: newClient.notes,
                        lastVisit: newClient.last_visit
                    };
                    set((state) => ({ clients: [...state.clients, mapped] }));
                    return mapped;
                } catch (e) {
                    console.error("Error creating client", e);
                    throw e;
                }
            },

            updateClient: async (updatedClient) => {
                try {
                    const { id, lastVisit, ...payload } = updatedClient;
                    const result = await api.updateClient(id, payload);
                    const mapped = {
                        id: result.id,
                        name: result.name,
                        phone: result.phone,
                        email: result.email,
                        notes: result.notes,
                        lastVisit: result.last_visit
                    };
                    set((state) => ({
                        clients: state.clients.map(c => c.id === result.id ? mapped : c)
                    }));
                    return mapped;
                } catch (e) {
                    console.error("Error updating client", e);
                    throw e;
                }
            },

            removeClient: async (id) => {
                try {
                    await api.deleteClient(id);
                    set((state) => ({ clients: state.clients.filter(c => c.id !== id) }));
                } catch (e) {
                    console.error("Error deleting client", e);
                }
            },

            // --- Servicios ---
            services: [],

            addService: async (service) => {
                try {
                    const { id, ...payload } = service;
                    const newService = await api.createService(payload);
                    const mapped = {
                        id: newService.id,
                        name: newService.name,
                        duration: newService.duration,
                        price: newService.price,
                        color: newService.color
                    };
                    set((state) => ({ services: [...state.services, mapped] }));
                    return mapped;
                } catch (e) {
                    console.error("Error creating service", e);
                    throw e;
                }
            },

            updateService: async (updatedService) => {
                try {
                    const { id, ...payload } = updatedService;
                    const result = await api.updateService(id, payload);
                    const mapped = {
                        id: result.id,
                        name: result.name,
                        duration: result.duration,
                        price: result.price,
                        color: result.color
                    };
                    set((state) => ({
                        services: state.services.map(s => s.id === result.id ? mapped : s)
                    }));
                    return mapped;
                } catch (e) {
                    console.error("Error updating service", e);
                    throw e;
                }
            },

            removeService: async (id) => {
                try {
                    await api.deleteService(id);
                    set((state) => ({ services: state.services.filter(s => s.id !== id) }));
                } catch (e) {
                    console.error("Error deleting service", e);
                }
            },

            // --- Productos ---
            products: [],

            addProduct: async (product) => {
                try {
                    const { id, ...payload } = product;
                    const newProduct = await api.createProduct(payload);
                    const mapped = {
                        id: newProduct.id,
                        name: newProduct.name,
                        price: newProduct.price,
                        stock: newProduct.stock,
                        category: newProduct.category
                    };
                    set((state) => ({ products: [...state.products, mapped] }));
                    return mapped;
                } catch (e) {
                    console.error("Error creating product", e);
                    throw e;
                }
            },

            updateProduct: async (updatedProduct) => {
                try {
                    const { id, ...payload } = updatedProduct;
                    const result = await api.updateProduct(id, payload);
                    const mapped = {
                        id: result.id,
                        name: result.name,
                        price: result.price,
                        stock: result.stock,
                        category: result.category
                    };
                    set((state) => ({ products: state.products.map(p => p.id === result.id ? mapped : p) }));
                    return mapped;
                } catch (e) {
                    console.error("Error updating product", e);
                    throw e;
                }
            },

            removeProduct: async (id) => {
                try {
                    await api.deleteProduct(id);
                    set((state) => ({ products: state.products.filter(p => p.id !== id) }));
                } catch (e) {
                    console.error("Error deleting product", e);
                }
            },

            // --- Citas (Calendario) ---
            appointments: [],

            addAppointment: async (appt) => {
                try {
                    const payload = {
                        stylist_id: String(appt.stylistId),
                        client_id: String(appt.clientId),
                        start_time: appt.start,
                        end_time: appt.end,
                        title: appt.title,
                        price: appt.price,
                        status: appt.status,
                        notes: appt.notes
                    };

                    const newAppt = await api.createAppointment(payload);

                    const frontendAppt = {
                        ...newAppt,
                        stylistId: newAppt.stylist_id,
                        clientId: newAppt.client_id,
                        start: new Date(newAppt.start_time),
                        end: new Date(newAppt.end_time)
                    };

                    set((state) => ({ appointments: [...state.appointments, frontendAppt] }));
                } catch (e) {
                    console.error("Error creating appointment", e);
                }
            },

            updateAppointmentStatus: async (id, status) => {
                try {
                    const state = get();
                    const appt = state.appointments.find(a => a.id === id);
                    if (!appt) return;

                    const payload = {
                        stylist_id: String(appt.stylistId),
                        client_id: String(appt.clientId),
                        start_time: appt.start.toISOString ? appt.start.toISOString() : appt.start,
                        end_time: appt.end.toISOString ? appt.end.toISOString() : appt.end,
                        title: appt.title,
                        price: appt.price,
                        status: status,
                        notes: appt.notes
                    };

                    const result = await api.updateAppointment(id, payload);
                    const frontendAppt = {
                        ...result,
                        stylistId: result.stylist_id,
                        clientId: result.client_id,
                        start: new Date(result.start_time),
                        end: new Date(result.end_time)
                    };

                    set((state) => ({
                        appointments: state.appointments.map(a => a.id === id ? frontendAppt : a)
                    }));
                } catch (e) {
                    console.error("Error updating appointment status", e);
                }
            },

            updateAppointment: async (updatedAppt) => {
                try {
                    const payload = {
                        stylist_id: String(updatedAppt.stylistId),
                        client_id: String(updatedAppt.clientId),
                        start_time: updatedAppt.start.toISOString ? updatedAppt.start.toISOString() : updatedAppt.start,
                        end_time: updatedAppt.end.toISOString ? updatedAppt.end.toISOString() : updatedAppt.end,
                        title: updatedAppt.title,
                        price: updatedAppt.price,
                        status: updatedAppt.status,
                        notes: updatedAppt.notes
                    };
                    const result = await api.updateAppointment(updatedAppt.id, payload);
                    const frontendAppt = {
                        ...result,
                        stylistId: result.stylist_id,
                        clientId: result.client_id,
                        start: new Date(result.start_time),
                        end: new Date(result.end_time)
                    };
                    set((state) => ({
                        appointments: state.appointments.map(a => a.id === updatedAppt.id ? frontendAppt : a)
                    }));
                } catch (e) {
                    console.error("Error updating appointment", e);
                }
            },

            removeAppointment: async (id) => {
                try {
                    await api.deleteAppointment(id);
                    set((state) => ({ appointments: state.appointments.filter(a => a.id !== id) }));
                } catch (e) {
                    console.error("Error deleting appointment", e);
                }
            },

            // --- Constantes ---
            APPOINTMENT_STATUS: {
                PENDING: 'pending',
                CONFIRMED: 'confirmed',
                ATTENDED: 'attended',
                NO_SHOW: 'no_show',
                CANCELLED: 'cancelled'
            },

            // --- Subscription ---
            subscription: {
                planType: 'demo',
                trialStart: new Date().toISOString(),
                trialEnd: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
                active: false
            },

            getTrialStatus: () => {
                const state = get();
                const sub = state.subscription || { planType: 'demo', active: false, trialEnd: new Date().toISOString() };
                const now = new Date();
                const end = new Date(sub.trialEnd);
                const isExpired = sub.planType === 'demo' && !sub.active && now > end;
                const daysLeft = Math.ceil((end - now) / (1000 * 60 * 60 * 24));
                const isOnTrial = sub.planType === 'demo' && !sub.active && !isExpired;
                return { isOnTrial, isExpired, daysLeft, isPaying: sub.active };
            },

            activateSubscription: (plan) => set((state) => ({
                subscription: { ...state.subscription, planType: plan, active: true }
            })),

            expireDemo: () => set((state) => ({
                subscription: { ...state.subscription, trialEnd: new Date(Date.now() - 1000).toISOString() }
            }))
        }),
        {
            name: 'salon-plus-storage',
            partialize: (state) => ({
                businessName: state.businessName,
                businessLogo: state.businessLogo,
                auth: state.auth,
                subscription: state.subscription
            }),
        }
    )
);
