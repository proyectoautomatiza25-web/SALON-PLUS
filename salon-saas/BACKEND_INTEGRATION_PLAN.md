# 🛠️ Plan de Integración Backend & Pagos (SalonPlus)

Este documento detalla los cambios necesarios en tu Backend (Node/Express/Postgres) y Base de Datos para soportar el sistema de Demos y Suscripciones implementado en el Frontend.

---

## 1. Migraciones de Base de Datos (SQL)

Ejecuta estos scripts en tu base de datos (PostgreSQL ejemplo) para agregar los campos de control de suscripción a la tabla de `salons`.

```sql
-- Agregar campos de suscripción a la tabla 'salons'
ALTER TABLE salons
ADD COLUMN plan_type VARCHAR(50) DEFAULT 'demo', -- 'demo', 'basic', 'pro'
ADD COLUMN trial_start_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN trial_end_at TIMESTAMP WITH TIME ZONE DEFAULT (CURRENT_TIMESTAMP + INTERVAL '7 days'),
ADD COLUMN subscription_active BOOLEAN DEFAULT FALSE,
ADD COLUMN stripe_customer_id VARCHAR(100),
ADD COLUMN stripe_subscription_id VARCHAR(100);

-- Índice para búsquedas rápidas de vencimiento
CREATE INDEX idx_salons_trial_end ON salons(trial_end_at);
```

---

## 2. Middleware de Validación (Node.js / Express)

Implementa este middleware en tu backend para proteger las rutas de la API. Bloqueará peticiones de salones que tengan la demo vencida y no hayan pagado.

```javascript
// middleware/checkSubscription.js
const { isAfter } = require('date-fns');

const checkSubscription = async (req, res, next) => {
  const salon = req.user.salon; // Asumiendo que `req.user` ya fue poblado por Auth middleware

  // 1. Si tiene suscripción activa, Pasa.
  if (salon.subscription_active) {
    return next();
  }

  // 2. Si está en plan 'demo'
  if (salon.plan_type === 'demo') {
    const now = new Date();
    const trialEnd = new Date(salon.trial_end_at);

    // Revisar si la fecha actual es mayor a la fecha de fin de prueba
    if (isAfter(now, trialEnd)) {
      return res.status(403).json({
        error: 'SUBSCRIPTION_REQUIRED',
        message: 'Tu periodo de prueba ha terminado. Por favor actualiza tu plan.'
      });
    }
  }

  // 3. Demo vigente, Pasa.
  next();
};

module.exports = checkSubscription;
```

**Uso en rutas:**

```javascript
const express = require('express');
const router = express.Router();
const checkSubscription = require('./middleware/checkSubscription');

// Rutas protegidas
router.post('/appointments', checkSubscription, createAppointment);
router.get('/reports', checkSubscription, getFinancialReports);
```

---

---

## 3. Integración de Pagos con MercadoPago (Chile 🇨🇱)

Dado que operamos en Chile (CLP), MercadoPago es la opción ideal por soporte de tarjetas locales, WebPay y facilidad de uso. Usaremos la API de **Suscripciones**.

### A. Crear Preferencia de Suscripción (Backend)

Cuando el usuario elige un plan, creamos un link de suscripción (Preapproval).

```javascript
// routes/billing.js
const { MercadoPagoConfig, PreApproval } = require('mercadopago');
const client = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN });

router.post('/create-subscription', async (req, res) => {
  const { planId, email } = req.body; 
  const salon = req.user.salon;

  // IDs de "Planes" creados previamente en tu panel de MercadoPago
  // (O puedes crearlos dinámicamente con la API)
  const reasonMap = {
    'basic': 'Suscripción SalonPlus Básico',
    'pro': 'Suscripción SalonPlus Pro'
  };
  
  const amountMap = {
    'basic': 29990,
    'pro': 49990
  };

  try {
    const preapproval = new PreApproval(client);
    const result = await preapproval.create({
        body: {
            reason: reasonMap[planId],
            auto_recurring: {
                frequency: 1,
                frequency_type: 'months',
                transaction_amount: amountMap[planId],
                currency_id: 'CLP'
            },
            back_url: `${process.env.FRONTEND_URL}/success`,
            payer_email: email, // Email del usuario (debe ser real)
            external_reference: salon.id.toString(), // ID del salón para conciliar
            status: 'pending'
        }
    });

    // Retorna la URL de cobro (usuario es redirigido a MercadoPago)
    res.json({ url: result.init_point });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
```

### B. Webhook Handler (MercadoPago)

MercadoPago notifica cuando una suscripción cambia de estado.

```javascript
// routes/webhooks.js
router.post('/mercadopago', async (req, res) => {
  const { type, data } = req.body;
  
  // MercadoPago envía notificación, luego consultamos el estado real
  if (type === 'subscription_preapproval') {
     try {
         const preapprovalId = data.id;
         // Consultar API de MP para ver estado actual
         // const sub = await preapproval.get({ id: preapprovalId });
         
         // Lógica de activación
         // if (sub.status === 'authorized') {
         //    Activar salón usando sub.external_reference (ID salón)
         // }
         
         console.log(`Evento de suscripción recibido: ${preapprovalId}`);
     } catch (e) {
         console.error(e);
     }
  }

  res.sendStatus(200);
});
```

**Nota:** MercadoPago requiere que tu servidor tenga HTTPS válido para recibir webhooks. Usar servicio como `ngrok` para desarrollo local.

---

## 4. Sistema de Notificaciones (Email Transaccional)

Para evitar problemas de **configuración en frontend** (como nos pasó con EmailJS) y asegurar que los correos lleguen (evitar Spam), implementaremos el envío desde el **Backend** usando **Resend** o **Nodemailer**.

### Ventajas:
1. **Seguridad:** Las API Keys nunca tocan el navegador.
2. **Confiabilidad:** Webhooks de Stripe disparan correos automáticamente.
3. **Logs:** Registro centralizado de correos enviados.

### Implementación Sugerida (Node.js + Resend):

```javascript
// services/emailService.js
const { Resend } = require('resend');
const resend = new Resend(process.env.RESEND_API_KEY);

const sendWelcomeEmail = async (email, businessName) => {
  await resend.emails.send({
    from: 'Soporte SalonPlus <no-reply@salonplus.com>',
    to: email,
    subject: 'Bienvenido a SalonPlus 🚀',
    html: `<p>Hola ${businessName}, tu periodo de prueba de 7 días ha comenzado.</p>`
  });
};

const sendSubscriptionConfirmed = async (email, plan) => {
  await resend.emails.send({
    from: 'Facturación SalonPlus <billing@salonplus.com>',
    to: email,
    subject: '¡Suscripción Activada!',
    html: `<p>Gracias por suscribirte al plan <strong>${plan}</strong>.</p>`
  });
};

module.exports = { sendWelcomeEmail, sendSubscriptionConfirmed };
```

**Integración en Webhooks:**
Simplemente llama a `sendSubscriptionConfirmed(customerEmail, plan)` dentro del `case 'customer.subscription.created'` en `routes/webhooks.js`.
