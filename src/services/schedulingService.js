/**
 * SchedulingService.js
 * 
 * This service abstracts the appointment booking logic. 
 * Currently, it points to the legacy Reservo portal.
 * In the next phase, it will be updated to communicate with the SaaS API.
 */

const SCHEDULING_CONFIG = {
    mode: 'LEGACY', // Switch to 'SAAS' when the API is ready
    legacyUrl: 'https://agendamiento.reservo.cl/makereserva/agenda/b0BIefe0R0XUZt4C4a73or21J775Yu',
    saasApiUrl: 'https://api.tusaas.com/v1', // Placeholder for SaaS
};

export const SchedulingService = {
    /**
     * Returns the appropriate URL or handler for booking an appointment.
     */
    getBookingAction: () => {
        if (SCHEDULING_CONFIG.mode === 'LEGACY') {
            return {
                type: 'LINK',
                payload: SCHEDULING_CONFIG.legacyUrl
            };
        }

        // Future SaaS integration logic
        return {
            type: 'API',
            payload: SCHEDULING_CONFIG.saasApiUrl
        };
    },

    /**
     * Future method to fetch available slots from the SaaS.
     */
    getAvailableSlots: async (specialtyId) => {
        if (SCHEDULING_CONFIG.mode === 'LEGACY') return [];

        // const response = await fetch(`${SCHEDULING_CONFIG.saasApiUrl}/slots?specialty=${specialtyId}`);
        // return await response.json();
        return [];
    }
};
