import { useSalonStore } from './store';

const API_URL = '/api'; // Proxied via Vite to http://localhost:8000

const getHeaders = () => {
    const token = useSalonStore.getState().auth.token;
    return {
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : ''
    };
};

// Helper for error handling
const request = async (url, options = {}) => {
    const res = await fetch(`${API_URL}${url}`, {
        ...options,
        headers: {
            ...getHeaders(),
            ...options.headers
        }
    });
    if (!res.ok) {
        const error = await res.json().catch(() => ({ detail: 'Error desconocido' }));
        throw new Error(error.detail || `Error ${res.status}`);
    }
    return res.json();
};

export const api = {
    // --- STYLISTS ---
    getStylists: () => request('/salon/stylists'),
    createStylist: (data) => request('/salon/stylists', { method: 'POST', body: JSON.stringify(data) }),
    deleteStylist: (id) => request(`/salon/stylists/${id}`, { method: 'DELETE' }),

    // --- SERVICES ---
    getServices: () => request('/salon/services'),
    createService: (data) => request('/salon/services', { method: 'POST', body: JSON.stringify(data) }),
    deleteService: (id) => request(`/salon/services/${id}`, { method: 'DELETE' }),

    // --- CLIENTS ---
    getClients: () => request('/salon/clients'),
    createClient: (data) => request('/salon/clients', { method: 'POST', body: JSON.stringify(data) }),
    updateClient: (id, data) => request(`/salon/clients/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    deleteClient: (id) => request(`/salon/clients/${id}`, { method: 'DELETE' }),

    // --- APPOINTMENTS ---
    getAppointments: () => request('/salon/appointments'),
    createAppointment: (data) => request('/salon/appointments', { method: 'POST', body: JSON.stringify(data) }),
    updateAppointment: (id, data) => request(`/salon/appointments/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    deleteAppointment: (id) => request(`/salon/appointments/${id}`, { method: 'DELETE' }),
};
