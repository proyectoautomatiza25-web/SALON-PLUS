// WhatsApp Integration Service
// Ready for Twilio API integration

class WhatsAppService {
    constructor(config) {
        this.enabled = config.whatsappEnabled;
        this.accountSid = config.twilioAccountSid || 'DEMO_MODE';
        this.authToken = config.twilioAuthToken || 'DEMO_MODE';
        this.fromNumber = config.whatsappNumber || 'whatsapp:+14155238886';
    }

    // Template: Appointment Confirmation
    async sendAppointmentConfirmation(patient, appointment) {
        const message = `🏥 *Centro Médico Del Valle*\n\nHola ${patient.name},\n\nTu cita ha sido confirmada:\n📅 Fecha: ${appointment.date}\n🕐 Hora: ${appointment.time}\n👨‍⚕️ Profesional: ${appointment.doctorName}\n\n¿Necesitas reagendar? Responde REAGENDAR\n\nNos vemos pronto! 💙`;

        return this.sendMessage(patient.phone, message, 'appointment_confirmation');
    }

    // Template: Appointment Reminder (24h before)
    async sendAppointmentReminder(patient, appointment) {
        const message = `⏰ *Recordatorio de Cita*\n\n${patient.name}, te recordamos tu cita mañana:\n\n📅 ${appointment.date}\n🕐 ${appointment.time}\n👨‍⚕️ ${appointment.doctorName}\n\nPor favor confirma tu asistencia respondiendo SÍ o NO.`;

        return this.sendMessage(patient.phone, message, 'appointment_reminder');
    }

    // Template: Prescription Delivery
    async sendPrescription(patient, prescriptionUrl) {
        const message = `💊 *Receta Médica Disponible*\n\nHola ${patient.name},\n\nTu receta médica está lista. Puedes descargarla aquí:\n${prescriptionUrl}\n\nRecuerda seguir las indicaciones del profesional.\n\n¿Dudas? Responde a este mensaje.`;

        return this.sendMessage(patient.phone, message, 'prescription');
    }

    // Template: Lab Results Ready
    async sendLabResults(patient, resultsUrl) {
        const message = `🔬 *Resultados de Exámenes*\n\n${patient.name}, tus resultados están disponibles:\n${resultsUrl}\n\nTe recomendamos agendar una cita de control para revisarlos con tu médico.`;

        return this.sendMessage(patient.phone, message, 'lab_results');
    }

    // Core Send Function (Simulated - Ready for Twilio)
    async sendMessage(to, body, type) {
        if (!this.enabled) {
            console.log('[WhatsApp] Service disabled');
            return { success: false, error: 'Service disabled' };
        }

        // DEMO MODE - In production, replace with Twilio API call
        if (this.accountSid === 'DEMO_MODE') {
            console.log(`[WhatsApp DEMO] Sending to ${to}:`, body);
            return {
                success: true,
                messageId: `demo_${Date.now()}`,
                to,
                body,
                type,
                timestamp: new Date().toISOString(),
                status: 'sent'
            };
        }

        // PRODUCTION MODE (Twilio Integration)
        try {
            // const twilio = require('twilio');
            // const client = twilio(this.accountSid, this.authToken);

            // const message = await client.messages.create({
            //     from: this.fromNumber,
            //     to: `whatsapp:${to}`,
            //     body: body
            // });

            return {
                success: true,
                messageId: `prod_${Date.now()}`,
                to,
                body,
                type,
                timestamp: new Date().toISOString(),
                status: 'sent'
            };
        } catch (error) {
            console.error('[WhatsApp] Error:', error);
            return {
                success: false,
                error: error.message,
                to,
                type
            };
        }
    }

    // Bulk Messaging for Campaigns
    async sendBulkMessage(patients, message) {
        const results = [];
        for (const patient of patients) {
            const result = await this.sendMessage(patient.phone, message, 'bulk');
            results.push({ patient: patient.name, ...result });
        }
        return results;
    }
}

export default WhatsAppService;
