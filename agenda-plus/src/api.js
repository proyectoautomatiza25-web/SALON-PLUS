import { useSaaSStore } from './store';

const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';

const getHeaders = () => {
    const token = localStorage.getItem('agenda_plus_token');
    return {
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : ''
    };
};

// Helper for error handling
const request = async (url, options = {}) => {
    const bodyLog = options.body instanceof URLSearchParams
        ? Object.fromEntries(options.body)
        : (options.body ? JSON.parse(options.body) : '');

    console.log(`[API REQUEST] ${options.method || 'GET'} ${url}`, bodyLog);

    try {
        const res = await fetch(`${API_URL}${url}`, {
            ...options,
            headers: {
                ...options.headers,
                ...(!(options.body instanceof URLSearchParams) && getHeaders())
            }
        });

        if (!res.ok) {
            const error = await res.json().catch(() => ({ detail: 'Error desconocido' }));
            console.error(`[API ERROR] ${res.status}:`, error);
            throw new Error(error.detail || `Error ${res.status}`);
        }

        const data = await res.json();
        console.log(`[API SUCCESS] ${url}:`, data);
        return data;
    } catch (e) {
        console.error(`[API FETCH FAILED] ${url}:`, e);
        throw e;
    }
};

export const api = {
    // --- AUTH ---
    login: (credentials) => request('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
            username: credentials.email,
            password: credentials.password,
        })
    }),
    register: (data) => request('/api/auth/register', { method: 'POST', body: JSON.stringify(data) }),
    getMe: () => request('/api/auth/me'),

    // --- PROFESSIONALS (Stylists) ---
    getProfessionals: () => request('/api/salon/stylists'),
    createProfessional: (data) => request('/api/salon/stylists', { method: 'POST', body: JSON.stringify(data) }),
    updateProfessional: (id, data) => request(`/api/salon/stylists/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    deleteProfessional: (id) => request(`/api/salon/stylists/${id}`, { method: 'DELETE' }),

    // --- PATIENTS (Clients) ---
    getPatients: () => request('/api/salon/clients'),
    createPatient: (data) => request('/api/salon/clients', { method: 'POST', body: JSON.stringify(data) }),
    updatePatient: (id, data) => request(`/api/salon/clients/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    deletePatient: (id) => request(`/api/salon/clients/${id}`, { method: 'DELETE' }),

    // --- APPOINTMENTS ---
    getAppointments: () => request('/api/salon/appointments'),
    createAppointment: (data) => request('/api/salon/appointments', { method: 'POST', body: JSON.stringify(data) }),
    updateAppointment: (id, data) => request(`/api/salon/appointments/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    deleteAppointment: (id) => request(`/api/salon/appointments/${id}`, { method: 'DELETE' }),

    // --- BILLING ---
    subscribe: () => request('/api/billing/subscribe', { method: 'POST' }),

    // --- AI ---
    expandMedicalNote: (text, type) => request('/api/ai/expand-medical-note', {
        method: 'POST',
        body: JSON.stringify({ text, type })
    }),
};
