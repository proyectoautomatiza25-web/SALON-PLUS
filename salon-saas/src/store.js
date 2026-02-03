import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
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
                    set({ globalError: "Error al actualizar perfil" });
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
                globalError: null
            })),

            logout: () => {
                localStorage.removeItem('salon-plus-v3-storage');
                set(() => ({
                    auth: { isAuthenticated: false, userEmail: null, token: null },
                    stylists: [],
                    services: [],
                    clients: [],
                    appointments: [],
                    products: [],
                    globalError: null
                }));
                window.location.href = '/';
            },

            // --- FETCH INITIAL DATA (Backend Sync) ---
            fetchInitialData: async () => {
                const { auth } = get();
                if (!auth || !auth.token) return;

                try {
                    console.log("Fetching Initial Data from Backend...");
                    const responses = await Promise.allSettled([
                        api.getMe(),
                        api.getStylists(),
                        api.getServices(),
                        api.getClients(),
                        api.getAppointments(),
                        api.getProducts()
                    ]);

                    const [userRes, stylistsRes, servicesRes, clientsRes, apptsRes, productsRes] = responses;

                    // Sync User Data
                    if (userRes.status === 'fulfilled') {
                        const userData = userRes.value;
                        set({
                            businessName: userData.business_name || 'Salon Plus',
                            businessLogo: userData.business_logo || null,
                            bookingSlug: userData.booking_slug || null,
                            subscription: {
                                planType: userData.plan_type || 'demo',
                                trialEnd: userData.trial_end_at || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
                                active: userData.subscription_active || false
                            }
                        });
                    }

                    // Map Entities with safety checks
                    const stylists = stylistsRes.status === 'fulfilled' && Array.isArray(stylistsRes.value)
                        ? stylistsRes.value.map(s => ({
                            id: s.id,
                            name: s.name,
                            specialty: s.specialty,
                            color: s.color,
                            avatar: s.avatar,
                            active: s.active
                        })) : [];

                    const clients = clientsRes.status === 'fulfilled' && Array.isArray(clientsRes.value)
                        ? clientsRes.value.map(c => ({
                            id: c.id,
                            name: c.nombre || c.name || 'Sin nombre',
                            phone: c.telefono || c.phone || '',
                            email: c.email || '',
                            notes: c.notes || '',
                            lastVisit: c.ultima_compra || c.last_visit || null
                        })) : [];

                    const services = servicesRes.status === 'fulfilled' && Array.isArray(servicesRes.value)
                        ? servicesRes.value.map(s => ({
                            id: s.id,
                            name: s.name,
                            duration: s.duration || 60,
                            price: s.price || 0,
                            color: s.color || '#3b82f6'
                        })) : [];

                    const products = productsRes.status === 'fulfilled' && Array.isArray(productsRes.value)
                        ? productsRes.value.map(p => ({
                            id: p.id,
                            name: p.name,
                            price: p.price || 0,
                            stock: p.stock || 0,
                            category: p.category || 'General'
                        })) : [];

                    const appointments = apptsRes.status === 'fulfilled' && Array.isArray(apptsRes.value)
                        ? apptsRes.value.map(appt => ({
                            ...appt,
                            stylistId: appt.stylist_id,
                            clientId: appt.client_id,
                            start: new Date(appt.start_time),
                            end: new Date(appt.end_time)
                        })) : [];

                    set({ stylists, services, clients, appointments, products, globalError: null });
                    console.log("Data loaded successfully");
                } catch (error) {
                    console.error("Critical error in fetchInitialData:", error);
                    set({ globalError: "Error de red. Por favor intenta recargar la página." });
                }
            },


            // --- Estilistas / Profesionales ---
            stylists: [],

            addStylist: async (stylist) => {
                try {
                    const { id, ...payload } = stylist;
                    const newStylist = await api.createStylist(payload);
                    const mapped = {
                        id: newStylist.id,
                        name: newStylist.name,
                        specialty: newStylist.specialty,
                        color: newStylist.color,
                        avatar: newStylist.avatar,
                        active: newStylist.active
                    };
                    set((state) => ({ stylists: [...(state.stylists || []), mapped] }));
                    return mapped;
                } catch (e) {
                    console.error("Error creating stylist", e);
                    set({ globalError: "No se pudo guardar el estilista." });
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
                        stylists: (state.stylists || []).map(s => s.id === result.id ? mapped : s)
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
                    set((state) => ({ stylists: (state.stylists || []).filter(s => s.id !== id) }));
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
                    set((state) => ({ clients: [...(state.clients || []), mapped] }));
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
                        clients: (state.clients || []).map(c => c.id === result.id ? mapped : c)
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
                    set((state) => ({ clients: (state.clients || []).filter(c => c.id !== id) }));
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
                    set((state) => ({ services: [...(state.services || []), mapped] }));
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
                        services: (state.services || []).map(s => s.id === result.id ? mapped : s)
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
                    set((state) => ({ services: (state.services || []).filter(s => s.id !== id) }));
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
                    set((state) => ({ products: [...(state.products || []), mapped] }));
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
                    set((state) => ({
                        products: (state.products || []).map(p => p.id === result.id ? mapped : p)
                    }));
                    return mapped;
                } catch (e) {
                    console.error("Error updating product", e);
                    throw e;
                }
            },

            removeProduct: async (id) => {
                try {
                    await api.deleteProduct(id);
                    set((state) => ({ products: (state.products || []).filter(p => p.id !== id) }));
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

                    set((state) => ({ appointments: [...(state.appointments || []), frontendAppt] }));
                } catch (e) {
                    console.error("Error creating appointment", e);
                }
            },

            updateAppointmentStatus: async (id, status) => {
                try {
                    const state = get();
                    const appt = (state.appointments || []).find(a => a.id === id);
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
                        appointments: (state.appointments || []).map(a => a.id === id ? frontendAppt : a)
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
                        appointments: (state.appointments || []).map(a => a.id === updatedAppt.id ? frontendAppt : a)
                    }));
                } catch (e) {
                    console.error("Error updating appointment", e);
                }
            },

            removeAppointment: async (id) => {
                try {
                    await api.deleteAppointment(id);
                    set((state) => ({ appointments: (state.appointments || []).filter(a => a.id !== id) }));
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
            name: 'salon-plus-v4-storage', // Incremented storage name for fresh start
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({
                businessName: state.businessName,
                businessLogo: state.businessLogo,
                auth: state.auth,
                subscription: state.subscription
            }),
        }
    )
);
