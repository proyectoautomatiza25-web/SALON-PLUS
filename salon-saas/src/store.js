import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { api } from './api';

export const useSalonStore = create(
    persist(
        (set, get) => ({
            // --- Estado del Negocio ---
            businessName: 'Salon Plus',
            businessLogo: null,

            updateBusinessName: (name) => set(() => ({ businessName: name })),
            updateBusinessLogo: (logo) => set(() => ({ businessLogo: logo })),

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
                    const [stylists, services, clients, rawAppointments] = await Promise.all([
                        api.getStylists(),
                        api.getServices(),
                        api.getClients(),
                        api.getAppointments()
                    ]);

                    // Format Appointments (Backend snake_case -> Frontend camelCase + Date objects)
                    const appointments = rawAppointments.map(appt => ({
                        ...appt,
                        stylistId: appt.stylist_id,
                        clientId: appt.client_id,
                        start: new Date(appt.start_time),
                        end: new Date(appt.end_time)
                    }));

                    set({ stylists, services, clients, appointments });
                    console.log("Data loaded successfully");
                } catch (error) {
                    console.error("Error loading initial data:", error);
                }
            },

            // --- Estilistas / Profesionales ---
            stylists: [], // Inicialmente vacío (se carga del backend)

            addStylist: async (stylist) => {
                try {
                    const newStylist = await api.createStylist(stylist);
                    set((state) => ({ stylists: [...state.stylists, newStylist] }));
                } catch (e) {
                    console.error("Error creating stylist", e);
                }
            },

            updateStylist: (updatedStylist) => set((state) => ({
                stylists: state.stylists.map(s => s.id === updatedStylist.id ? updatedStylist : s)
                // TODO: Implement API update
            })),

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
                    const newClient = await api.createClient(client);
                    set((state) => ({ clients: [...state.clients, newClient] }));
                } catch (e) {
                    console.error("Error creating client", e);
                }
            },

            updateClient: async (updatedClient) => {
                set((state) => ({
                    clients: state.clients.map(c => c.id === updatedClient.id ? updatedClient : c)
                }));
                // TODO: Implement API update
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
                    const newService = await api.createService(service);
                    set((state) => ({ services: [...state.services, newService] }));
                } catch (e) {
                    console.error("Error creating service", e);
                }
            },

            updateService: (updatedService) => set((state) => ({
                services: state.services.map(s => s.id === updatedService.id ? updatedService : s)
            })),

            removeService: async (id) => {
                try {
                    await api.deleteService(id);
                    set((state) => ({ services: state.services.filter(s => s.id !== id) }));
                } catch (e) {
                    console.error("Error deleting service", e);
                }
            },

            // --- Productos (Local only for now or TODO API) ---
            products: [
                { id: 1, name: 'Shampoo Keratina 500ml', price: 15990, stock: 12, category: 'Cuidado Capilar' },
                // ... placeholders
            ],
            addProduct: (product) => set((state) => ({ products: [...state.products, { ...product, id: Date.now() }] })),
            updateProduct: (updatedProduct) => set((state) => ({ products: state.products.map(p => p.id === updatedProduct.id ? updatedProduct : p) })),
            removeProduct: (id) => set((state) => ({ products: state.products.filter(p => p.id !== id) })),

            // --- Citas (Calendario) ---
            appointments: [],

            addAppointment: async (appt) => {
                try {
                    // Convert Date objects to strings for API if needed, or API handles logic.
                    // Schema expects start_time (datetime). JSON.stringify handles Dates as ISO strings.
                    // BUT keys in frontend might differ slightly (stylistId vs stylist_id). 
                    // Schema: stylist_id. Frontend: stylistId. 
                    // We need to MAP keys!

                    const payload = {
                        stylist_id: appt.stylistId, // Mapping
                        client_id: appt.clientId,
                        start_time: appt.start,
                        end_time: appt.end,
                        title: appt.title,
                        price: appt.price,
                        status: appt.status
                    };

                    const newAppt = await api.createAppointment(payload);

                    // Convert back to Frontend Format (react-big-calendar needs Date objects)
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

            updateAppointmentStatus: (id, status) => set((state) => ({
                appointments: state.appointments.map(a => a.id === id ? { ...a, status } : a)
            })),

            updateAppointment: (updatedAppt) => set((state) => ({
                appointments: state.appointments.map(a => a.id === updatedAppt.id ? updatedAppt : a)
            })),

            removeAppointment: async (id) => {
                try {
                    await api.deleteAppointment(id);
                    set((state) => ({ appointments: state.appointments.filter(a => a.id !== id) }));
                } catch (e) {
                    console.error("Error deleting appointment", e);
                }
            },

            // --- Legacy Actions (kept for safety or partial migration) ---

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
                // Note: Stylists, Clients, Appointments are NOT persisted locally anymore.
                // They are fetched fresh on load.
            }),
        }
    )
);
