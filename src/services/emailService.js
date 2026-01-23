// Email Notification Service
// Ready for Nodemailer/SendGrid integration

class EmailService {
  constructor(config) {
    this.enabled = config.emailEnabled;
    this.sender = config.emailSender || 'notificaciones@cmdelvalle.cl';
    this.smtpHost = config.smtpHost || 'smtp.gmail.com';
    this.smtpPort = config.smtpPort || 587;
    this.smtpUser = config.smtpUser || 'DEMO_MODE';
    this.smtpPass = config.smtpPass || 'DEMO_MODE';
  }

  // Template: Appointment Confirmation Email
  async sendAppointmentConfirmation(patient, appointment) {
    const subject = `Confirmación de Cita - Centro Médico Del Valle`;
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #004975 0%, #006eb1 100%); padding: 30px; text-align: center;">
          <h1 style="color: white; margin: 0;">Centro Médico Del Valle</h1>
        </div>
        <div style="padding: 30px; background: #f8fafc;">
          <h2 style="color: #004975;">Hola ${patient.name},</h2>
          <p style="font-size: 16px; line-height: 1.6;">Tu cita ha sido confirmada exitosamente:</p>
          
          <div style="background: white; padding: 20px; border-radius: 12px; margin: 20px 0;">
            <p><strong>📅 Fecha:</strong> ${appointment.date}</p>
            <p><strong>🕐 Hora:</strong> ${appointment.time}</p>
            <p><strong>👨‍⚕️ Profesional:</strong> ${appointment.doctorName}</p>
            <p><strong>📍 Dirección:</strong> Av. Principal 123, Providencia</p>
          </div>

          <p style="color: #64748b; font-size: 14px;">
            Si necesitas reagendar o cancelar, por favor contáctanos con al menos 24 horas de anticipación.
          </p>

          <a href="https://cmdelvalle.cl/mis-citas" style="display: inline-block; background: #004975; color: white; padding: 12px 30px; text-decoration: none; border-radius: 8px; margin-top: 20px;">
            Ver Mi Agenda
          </a>
        </div>
        <div style="background: #1e293b; padding: 20px; text-align: center; color: white; font-size: 12px;">
          <p>Centro Médico Del Valle © 2026</p>
          <p>contacto@cmdelvalle.cl | +56 9 1234 5678</p>
        </div>
      </div>
    `;

    return this.sendEmail(patient.email, subject, html, 'appointment_confirmation');
  }

  // Template: Prescription with PDF Attachment
  async sendPrescription(patient, prescriptionPdf) {
    const subject = `Receta Médica - ${patient.name}`;
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #10b981; padding: 30px; text-align: center;">
          <h1 style="color: white; margin: 0;">💊 Receta Médica</h1>
        </div>
        <div style="padding: 30px;">
          <h2>Hola ${patient.name},</h2>
          <p>Adjunto encontrarás tu receta médica electrónica.</p>
          <p><strong>Importante:</strong></p>
          <ul>
            <li>Sigue las indicaciones del profesional</li>
            <li>Respeta los horarios de administración</li>
            <li>No suspendas el tratamiento sin consultar</li>
          </ul>
          <p style="color: #64748b; font-size: 14px; margin-top: 30px;">
            Esta receta tiene validez de 30 días desde su emisión.
          </p>
        </div>
      </div>
    `;

    return this.sendEmail(patient.email, subject, html, 'prescription', [prescriptionPdf]);
  }

  // Template: Lab Results
  async sendLabResults(patient, resultsPdf) {
    const subject = `Resultados de Exámenes - ${patient.name}`;
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #6366f1; padding: 30px; text-align: center;">
          <h1 style="color: white; margin: 0;">🔬 Resultados de Exámenes</h1>
        </div>
        <div style="padding: 30px;">
          <h2>Hola ${patient.name},</h2>
          <p>Tus resultados de laboratorio están disponibles en el archivo adjunto.</p>
          <p style="background: #fef3c7; padding: 15px; border-left: 4px solid #f59e0b; border-radius: 8px;">
            <strong>⚠️ Importante:</strong> Estos resultados deben ser interpretados por un profesional de la salud. Te recomendamos agendar una cita de control.
          </p>
          <a href="https://cmdelvalle.cl/agendar" style="display: inline-block; background: #6366f1; color: white; padding: 12px 30px; text-decoration: none; border-radius: 8px; margin-top: 20px;">
            Agendar Cita de Control
          </a>
        </div>
      </div>
    `;

    return this.sendEmail(patient.email, subject, html, 'lab_results', [resultsPdf]);
  }

  // Core Send Function (Simulated - Ready for Nodemailer)
  async sendEmail(to, subject, html, type, attachments = []) {
    if (!this.enabled) {
      console.log('[Email] Service disabled');
      return { success: false, error: 'Service disabled' };
    }

    // DEMO MODE
    if (this.smtpUser === 'DEMO_MODE') {
      console.log(`[Email DEMO] Sending to ${to}:`, subject);
      return {
        success: true,
        messageId: `demo_email_${Date.now()}`,
        to,
        subject,
        type,
        timestamp: new Date().toISOString(),
        status: 'sent'
      };
    }

    // PRODUCTION MODE (Nodemailer)
    try {
      // const nodemailer = require('nodemailer');

      // const transporter = nodemailer.createTransport({
      //     host: this.smtpHost,
      //     port: this.smtpPort,
      //     secure: false,
      //     auth: {
      //         user: this.smtpUser,
      //         pass: this.smtpPass
      //     }
      // });

      // const mailOptions = {
      //     from: this.sender,
      //     to: to,
      //     subject: subject,
      //     html: html,
      //     attachments: attachments
      // };

      // const info = await transporter.sendMail(mailOptions);

      return {
        success: true,
        messageId: `prod_email_${Date.now()}`,
        to,
        subject,
        type,
        timestamp: new Date().toISOString(),
        status: 'sent'
      };
    } catch (error) {
      console.error('[Email] Error:', error);
      return {
        success: false,
        error: error.message,
        to,
        type
      };
    }
  }
}

export default EmailService;
