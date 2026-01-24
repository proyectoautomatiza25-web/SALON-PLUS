import emailjs from '@emailjs/browser';

// Configuración de EmailJS desde variables de entorno
const EMAILJS_CONFIG = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID',
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID',
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY'
};

/**
 * Inicializa EmailJS con la clave pública
 */
export const initEmailJS = () => {
  emailjs.init(EMAILJS_CONFIG.publicKey);
};

/**
 * Envía email de bienvenida a nuevo usuario demo
 * @param {Object} userData - Datos del usuario
 * @param {string} userData.name - Nombre completo
 * @param {string} userData.email - Email del usuario
 * @param {string} userData.centerName - Nombre del centro médico
 * @param {string} userData.password - Contraseña temporal
 * @returns {Promise} - Promesa con resultado del envío
 */
export const sendDemoWelcomeEmail = async (userData) => {
  try {
    const templateParams = {
      to_email: userData.email,
      to_name: userData.name,
      center_name: userData.centerName,
      temp_password: userData.password,
      demo_days: 14,
      login_url: window.location.origin,
      support_email: 'contacto@automatizasur.cl',
      from_name: 'Agenda Plus - Automatiza Sur',
      reply_to: 'contacto@automatizasur.cl'
    };

    const response = await emailjs.send(
      EMAILJS_CONFIG.serviceId,
      EMAILJS_CONFIG.templateId,
      templateParams
    );

    console.log('✅ Email enviado exitosamente:', response);
    return { success: true, response };
  } catch (error) {
    console.error('❌ Error al enviar email:', error);
    return { success: false, error };
  }
};

/**
 * Envía email de recordatorio (3 días antes de expirar)
 * @param {Object} userData - Datos del usuario
 * @returns {Promise} - Promesa con resultado del envío
 */
export const sendDemoReminderEmail = async (userData) => {
  try {
    const templateParams = {
      to_email: userData.email,
      to_name: userData.name,
      days_remaining: userData.daysRemaining,
      upgrade_url: `${window.location.origin}#upgrade`,
      support_email: 'contacto@automatizasur.cl'
    };

    const response = await emailjs.send(
      EMAILJS_CONFIG.serviceId,
      'template_reminder', // Template ID para recordatorios
      templateParams
    );

    console.log('✅ Email de recordatorio enviado:', response);
    return { success: true, response };
  } catch (error) {
    console.error('❌ Error al enviar recordatorio:', error);
    return { success: false, error };
  }
};

/**
 * Envía email de expiración de demo
 * @param {Object} userData - Datos del usuario
 * @returns {Promise} - Promesa con resultado del envío
 */
export const sendDemoExpiredEmail = async (userData) => {
  try {
    const templateParams = {
      to_email: userData.email,
      to_name: userData.name,
      upgrade_url: `${window.location.origin}#upgrade`,
      support_email: 'contacto@automatizasur.cl'
    };

    const response = await emailjs.send(
      EMAILJS_CONFIG.serviceId,
      'template_expired', // Template ID para expiración
      templateParams
    );

    console.log('✅ Email de expiración enviado:', response);
    return { success: true, response };
  } catch (error) {
    console.error('❌ Error al enviar email de expiración:', error);
    return { success: false, error };
  }
};

export default {
  initEmailJS,
  sendDemoWelcomeEmail,
  sendDemoReminderEmail,
  sendDemoExpiredEmail
};
