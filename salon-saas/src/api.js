import { useSalonStore } from './store';

const API_URL = 'https://authentic-tenderness-production-a8bc.up.railway.app';

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
    // --- AUTH ---
    getMe: () => request('/api/auth/me'),
    updateMe: (data) => request('/api/auth/me', { method: 'PUT', body: JSON.stringify(data) }),

    // --- STYLISTS ---
    getStylists: () => request('/api/salon/stylists'),
    createStylist: (data) => request('/api/salon/stylists', { method: 'POST', body: JSON.stringify(data) }),
    updateStylist: (id, data) => request(`/api/salon/stylists/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    deleteStylist: (id) => request(`/api/salon/stylists/${id}`, { method: 'DELETE' }),

    // --- SERVICES ---
    getServices: () => request('/api/salon/services'),
    createService: (data) => request('/api/salon/services', { method: 'POST', body: JSON.stringify(data) }),
    deleteService: (id) => request(`/api/salon/services/${id}`, { method: 'DELETE' }),

    // --- CLIENTS ---
    getClients: () => request('/api/salon/clients'),
    createClient: (data) => request('/api/salon/clients', { method: 'POST', body: JSON.stringify(data) }),
    updateClient: (id, data) => request(`/api/salon/clients/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    deleteClient: (id) => request(`/api/salon/clients/${id}`, { method: 'DELETE' }),

    // --- APPOINTMENTS ---
    getAppointments: () => request('/api/salon/appointments'),
    createAppointment: (data) => request('/api/salon/appointments', { method: 'POST', body: JSON.stringify(data) }),
    updateAppointment: (id, data) => request(`/api/salon/appointments/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    deleteAppointment: (id) => request(`/api/salon/appointments/${id}`, { method: 'DELETE' }),

    // --- PRODUCTS ---
    getProducts: () => request('/api/salon/products'),
    createProduct: (data) => request('/api/salon/products', { method: 'POST', body: JSON.stringify(data) }),
    updateProduct: (id, data) => request(`/api/salon/products/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    deleteProduct: (id) => request(`/api/salon/products/${id}`, { method: 'DELETE' }),

    // --- PUBLIC BOOKING ---
    getPublicSalonInfo: (slug) => request(`/api/salon/public/${slug}`),
    publicBook: (slug, data) => request(`/api/salon/public/${slug}/book`, { method: 'POST', body: JSON.stringify(data) }),
};
