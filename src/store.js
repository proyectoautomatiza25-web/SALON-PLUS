import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { api } from './api';

export const useSaaSStore = create(
    persist(
        (set, get) => ({
            // --- State ---
            businessName: 'Agenda Plus',
            businessLogo: null,
            professionals: [],
            patients: [],
            appointments: [],
            finances: {
                transactions: [],
                boxes: [{ id: 1, name: 'Caja Central', status: 'closed', balance: 0 }],
                boxHistory: []
            },
            campaigns: [],
            globalError: null,
            loading: false,
            isHydrated: false, // New: track if persist has finished

            // --- Actions ---
            setLoading: (loading) => set({ loading }),
            setGlobalError: (error) => set({ globalError: error }),
            setHydrated: (val) => set({ isHydrated: val }),

            fetchInitialData: async () => {
                if (get().loading) return; // Prevent double fetch
                set({ loading: true, globalError: null });

                try {
                    console.log('🔄 Sincronizando datos...');
                    const [profRes, patientRes, apptRes, userRes] = await Promise.allSettled([
                        api.getProfessionals(),
                        api.getPatients(),
                        api.getAppointments(),
                        api.getMe()
                    ]);

                    const newState = { loading: false };

                    if (profRes.status === 'fulfilled') {
                        newState.professionals = (profRes.value || []).map(p => ({
                            ...p,
                            id: String(p.id),
                            active: p.active !== undefined ? p.active : true
                        }));
                    }

                    if (patientRes.status === 'fulfilled') {
                        newState.patients = (patientRes.value || []).map(p => ({
                            ...p,
                            id: String(p.id)
                        }));
                    }

                    if (apptRes.status === 'fulfilled') {
                        newState.appointments = (apptRes.value || []).map(a => {
                            try {
                                return {
                                    ...a,
                                    id: String(a.id),
                                    profId: String(a.stylist_id || a.profId || ''),
                                    patientId: String(a.client_id || a.patientId || ''),
                                    start: new Date(a.start_time || a.start),
                                    end: new Date(a.end_time || a.end)
                                };
                            } catch (err) {
                                console.warn("Cita corrupta ignorada:", a);
                                return null;
                            }
                        }).filter(Boolean);
                    }

                    if (userRes.status === 'fulfilled') {
                        newState.businessName = userRes.value?.business_name || 'Agenda Plus';
                        newState.businessLogo = userRes.value?.business_logo || null;
                    }

                    set(newState);
                    console.log('✅ Sincronización completa');
                } catch (e) {
                    console.error("❌ Error en fetchInitialData:", e);
                    set({ loading: false, globalError: "Error al sincronizar con el servidor" });
                }
            },

            // --- Professionals ---
            addProfessional: async (prof) => {
                try {
                    const newProf = await api.createProfessional(prof);
                    set((state) => ({ professionals: [...state.professionals, newProf] }));
                    return newProf;
                } catch (e) {
                    set({ globalError: "Error al crear profesional" });
                    throw e;
                }
            },

            updateProfessional: async (id, data) => {
                try {
                    const updated = await api.updateProfessional(id, data);
                    set((state) => ({
                        professionals: state.professionals.map(p => p.id === id ? updated : p)
                    }));
                } catch (e) {
                    set({ globalError: "Error al actualizar profesional" });
                }
            },

            // --- Patients ---
            addPatient: async (patient) => {
                try {
                    const newPatient = await api.createPatient(patient);
                    const mapped = { ...newPatient, id: String(newPatient.id) };
                    set((state) => ({ patients: [...state.patients, mapped] }));
                    return mapped;
                } catch (e) {
                    set({ globalError: "Error al crear paciente" });
                    throw e;
                }
            },

            updatePatient: async (id, data) => {
                try {
                    const updated = await api.updatePatient(id, data);
                    const mapped = { ...updated, id: String(updated.id) };
                    set((state) => ({
                        patients: state.patients.map(p => p.id === String(id) || p.id === id ? mapped : p)
                    }));
                } catch (e) {
                    set({ globalError: "Error al actualizar paciente" });
                }
            },

            // --- Appointments ---
            addAppointment: async (appt) => {
                try {
                    const payload = {
                        stylist_id: String(appt.profId),
                        client_id: String(appt.patientId),
                        start_time: appt.start,
                        end_time: appt.end,
                        title: appt.title || 'Consulta Médica',
                        price: appt.price || 0,
                        status: appt.status || 'pending',
                        notes: appt.notes || '',
                        anamnesis: appt.anamnesis || '',
                        physical_exam: appt.physicalExam || '',
                        diagnosis: appt.diagnosis || '',
                        indications: appt.indications || '',
                        weight: appt.weight || '',
                        height: appt.height || '',
                        imc: appt.imc || ''
                    };
                    const result = await api.createAppointment(payload);
                    const mapped = {
                        ...result,
                        profId: result.stylist_id,
                        patientId: result.client_id,
                        start: new Date(result.start_time),
                        end: new Date(result.end_time)
                    };
                    set((state) => ({ appointments: [...state.appointments, mapped] }));
                    return mapped;
                } catch (e) {
                    set({ globalError: "Error al crear cita" });
                    throw e;
                }
            },

            // --- Campaigns ---
            addCampaign: (campaign) => {
                const newCampaign = {
                    ...campaign,
                    id: Date.now(),
                    status: 'draft',
                    createdAt: new Date()
                };
                set((state) => ({ campaigns: [...state.campaigns, newCampaign] }));
            },

            sendCampaign: (id) => {
                set((state) => ({
                    campaigns: state.campaigns.map(c => c.id === id ? { ...c, status: 'sent', sentAt: new Date() } : c)
                }));
            },

            updateAppointment: async (id, appt) => {
                try {
                    const payload = {
                        stylist_id: String(appt.profId),
                        client_id: String(appt.patientId),
                        start_time: appt.start,
                        end_time: appt.end,
                        title: appt.title,
                        price: appt.price,
                        status: appt.status,
                        notes: appt.notes,
                        anamnesis: appt.anamnesis,
                        physical_exam: appt.physicalExam,
                        diagnosis: appt.diagnosis,
                        indications: appt.indications,
                        weight: appt.weight,
                        height: appt.height,
                        imc: appt.imc
                    };
                    const result = await api.updateAppointment(id, payload);
                    const mapped = {
                        ...result,
                        profId: result.stylist_id,
                        patientId: result.client_id,
                        start: new Date(result.start_time),
                        end: new Date(result.end_time)
                    };
                    set((state) => ({
                        appointments: state.appointments.map(a => a.id === id ? mapped : a)
                    }));
                } catch (e) {
                    set({ globalError: "Error al actualizar cita" });
                }
            },

            deleteAppointment: async (id) => {
                try {
                    await api.deleteAppointment(id);
                    set((state) => ({ appointments: state.appointments.filter(a => a.id !== id) }));
                } catch (e) {
                    set({ globalError: "Error al eliminar cita" });
                }
            },

            // --- Stats helper ---
            getStats: () => {
                const state = get();
                const appointments = state.appointments;
                const totalSales = appointments.filter(a => a.status === 'attended').reduce((sum, a) => sum + (Number(a.price) || 0), 0);
                return {
                    totalSales,
                    activePatients: state.patients.length,
                    confirmedAppointments: appointments.filter(a => a.status === 'confirmed').length,
                    pendingAppointments: appointments.filter(a => a.status === 'pending').length,
                    attendedAppointments: appointments.filter(a => a.status === 'attended').length,
                    noShowAppointments: appointments.filter(a => a.status === 'no_show').length,
                    activeProfessionals: state.professionals.filter(p => p.active).length,
                    totalPatients: state.patients.length
                };
            },

            APPOINTMENT_STATUS: {
                CONFIRMED: 'confirmed',
                ATTENDED: 'attended',
                NO_SHOW: 'no_show',
                PENDING: 'pending',
                CANCELLED: 'cancelled',
                BLOCK: 'block'
            }
        }),
        {
            name: 'agenda-plus-storage',
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({
                businessName: state.businessName,
                businessLogo: state.businessLogo
                // We don't persist complex lists to avoid sync issues with DB
            }),
            onRehydrateStorage: () => (state) => {
                state.setHydrated(true);
            }
        }
    )
);
