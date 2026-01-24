# 📧 GUÍA COMPLETA: CONFIGURACIÓN DE EMAILJS

## 🎯 PASO 1: CREAR CUENTA EN EMAILJS

1. **Ir a EmailJS:**
   - Visita: https://www.emailjs.com/
   - Click en "Sign Up Free"

2. **Registrarse:**
   - Usa tu email: `contacto@automatizasur.cl`
   - Crea una contraseña segura
   - Verifica tu email

---

## 📨 PASO 2: CONECTAR TU SERVICIO DE EMAIL

### **Opción A: Gmail (Recomendado para empezar)**

1. En el dashboard de EmailJS, ve a **"Email Services"**
2. Click en **"Add New Service"**
3. Selecciona **"Gmail"**
4. Click en **"Connect Account"**
5. Autoriza con tu cuenta Gmail
6. **Copia el Service ID** (ejemplo: `service_abc123`)

### **Opción B: Outlook/Hotmail**

1. Selecciona **"Outlook"**
2. Conecta con tu cuenta Microsoft
3. Copia el Service ID

### **Opción C: SMTP Personalizado**

Si tienes un servidor de email propio:
1. Selecciona **"Custom SMTP"**
2. Ingresa:
   - SMTP Server: `mail.automatizasur.cl`
   - Port: `587` (TLS) o `465` (SSL)
   - Username: `contacto@automatizasur.cl`
   - Password: tu contraseña
3. Copia el Service ID

---

## 📝 PASO 3: CREAR TEMPLATE DE EMAIL

### **Template 1: Email de Bienvenida**

1. Ve a **"Email Templates"**
2. Click en **"Create New Template"**
3. **Nombre del template:** `demo_welcome`
4. **Subject:** `¡Bienvenido a Agenda Plus! 🎉 - Tu cuenta demo está lista`

5. **Contenido del email (HTML):**

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }
        .header {
            background: linear-gradient(135deg, #009E9D 0%, #00C9C8 100%);
            color: white;
            padding: 40px 20px;
            text-align: center;
            border-radius: 12px 12px 0 0;
        }
        .header h1 {
            margin: 0;
            font-size: 28px;
        }
        .content {
            background: white;
            padding: 40px 30px;
            border: 1px solid #e2e8f0;
            border-top: none;
        }
        .credentials-box {
            background: #f8fafc;
            border: 2px solid #009E9D;
            border-radius: 12px;
            padding: 25px;
            margin: 25px 0;
        }
        .credentials-box h3 {
            color: #009E9D;
            margin-top: 0;
        }
        .credential-item {
            margin: 15px 0;
        }
        .credential-label {
            font-size: 12px;
            color: #64748b;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        .credential-value {
            font-size: 18px;
            font-weight: bold;
            color: #1a2a2a;
            font-family: 'Courier New', monospace;
        }
        .button {
            display: inline-block;
            background: linear-gradient(135deg, #009E9D 0%, #00C9C8 100%);
            color: white;
            padding: 16px 40px;
            text-decoration: none;
            border-radius: 12px;
            font-weight: bold;
            font-size: 16px;
            margin: 20px 0;
        }
        .features {
            background: #f8fafc;
            padding: 20px;
            border-radius: 8px;
            margin: 20px 0;
        }
        .feature-item {
            margin: 10px 0;
            padding-left: 25px;
            position: relative;
        }
        .feature-item:before {
            content: "✓";
            position: absolute;
            left: 0;
            color: #10b981;
            font-weight: bold;
        }
        .footer {
            text-align: center;
            padding: 30px 20px;
            background: #f8fafc;
            border-radius: 0 0 12px 12px;
            color: #64748b;
            font-size: 14px;
        }
        .demo-badge {
            background: #fbbf24;
            color: #78350f;
            padding: 8px 16px;
            border-radius: 20px;
            font-weight: bold;
            display: inline-block;
            margin: 10px 0;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>📅 Agenda Plus</h1>
        <p style="margin: 10px 0 0 0; font-size: 16px;">Software de Gestión Médica Inteligente</p>
    </div>
    
    <div class="content">
        <h2>¡Hola {{to_name}}! 👋</h2>
        
        <p>¡Bienvenido a <strong>Agenda Plus</strong>! Estamos emocionados de que <strong>{{center_name}}</strong> comience a transformar su gestión médica.</p>
        
        <div class="demo-badge">🎯 CUENTA DEMO - 14 DÍAS GRATIS</div>
        
        <div class="credentials-box">
            <h3>🔐 Tus Credenciales de Acceso</h3>
            
            <div class="credential-item">
                <div class="credential-label">Email de acceso</div>
                <div class="credential-value">{{to_email}}</div>
            </div>
            
            <div class="credential-item">
                <div class="credential-label">Contraseña temporal</div>
                <div class="credential-value">{{temp_password}}</div>
            </div>
        </div>
        
        <div style="text-align: center;">
            <a href="{{login_url}}" class="button">
                🚀 Acceder a Mi Demo
            </a>
        </div>
        
        <div class="features">
            <h3 style="margin-top: 0;">✨ Todo lo que puedes hacer:</h3>
            <div class="feature-item">Gestionar pacientes y fichas médicas</div>
            <div class="feature-item">Agendar citas con calendario inteligente</div>
            <div class="feature-item">Ver analytics y reportes en tiempo real</div>
            <div class="feature-item">Crear campañas de marketing automatizadas</div>
            <div class="feature-item">Enviar notificaciones por WhatsApp y Email</div>
            <div class="feature-item">Gestionar profesionales y especialidades</div>
        </div>
        
        <p><strong>⏰ Tienes {{demo_days}} días</strong> para explorar todas las funcionalidades sin límites.</p>
        
        <p>Si tienes alguna pregunta, estamos aquí para ayudarte:</p>
        <p>📧 <a href="mailto:{{support_email}}">{{support_email}}</a></p>
    </div>
    
    <div class="footer">
        <p><strong>Agenda Plus</strong> by Automatiza Sur</p>
        <p>Puerto Montt, Chile</p>
        <p style="margin-top: 20px; font-size: 12px;">
            Este email fue enviado porque solicitaste una demo de Agenda Plus.<br>
            Si no fuiste tú, puedes ignorar este mensaje.
        </p>
    </div>
</body>
</html>
```

6. **Variables del template (en la pestaña "Settings"):**
   - `to_name` - Nombre del usuario
   - `to_email` - Email del usuario
   - `center_name` - Nombre del centro médico
   - `temp_password` - Contraseña temporal
   - `demo_days` - Días de demo (14)
   - `login_url` - URL de login
   - `support_email` - Email de soporte

7. **Guardar y copiar el Template ID** (ejemplo: `template_xyz789`)

---

## 🔑 PASO 4: OBTENER PUBLIC KEY

1. Ve a **"Account" → "General"**
2. Busca **"Public Key"**
3. **Copia la Public Key** (ejemplo: `user_abc123def456`)

---

## ⚙️ PASO 5: CONFIGURAR EN TU PROYECTO

Abre el archivo `src/services/emailService.js` y reemplaza:

```javascript
const EMAILJS_CONFIG = {
    serviceId: 'TU_SERVICE_ID_AQUI',      // Del Paso 2
    templateId: 'TU_TEMPLATE_ID_AQUI',    // Del Paso 3
    publicKey: 'TU_PUBLIC_KEY_AQUI'       // Del Paso 4
};
```

**Ejemplo real:**
```javascript
const EMAILJS_CONFIG = {
    serviceId: 'service_abc123',
    templateId: 'template_xyz789',
    publicKey: 'user_abc123def456'
};
```

---

## 🧪 PASO 6: PROBAR EL ENVÍO

1. **Build del proyecto:**
   ```bash
   npm run build
   ```

2. **Probar localmente:**
   ```bash
   npm run dev
   ```

3. **Ir a la landing page**
4. **Click en "Comenzar Prueba Gratis"**
5. **Completar el formulario con tu email**
6. **Verificar que llegó el email**

---

## 📊 PASO 7: MONITOREAR ENVÍOS

1. En el dashboard de EmailJS, ve a **"Email History"**
2. Verás todos los emails enviados
3. Puedes ver:
   - ✅ Emails exitosos
   - ❌ Emails fallidos
   - 📈 Estadísticas de envío

---

## 🎨 TEMPLATES ADICIONALES (OPCIONAL)

### **Template 2: Recordatorio (3 días antes de expirar)**

**Template ID:** `template_reminder`

**Subject:** `⏰ Tu demo de Agenda Plus expira en {{days_remaining}} días`

**Contenido:**
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>
        /* Mismo CSS que el template anterior */
    </style>
</head>
<body>
    <div class="header" style="background: linear-gradient(135deg, #f59e0b 0%, #ef4444 100%);">
        <h1>⏰ Tu Demo Está Por Expirar</h1>
    </div>
    
    <div class="content">
        <h2>¡Hola {{to_name}}!</h2>
        
        <p>Solo quedan <strong>{{days_remaining}} días</strong> para que expire tu demo de Agenda Plus.</p>
        
        <p>¿Ya exploraste todas las funcionalidades? No pierdas la oportunidad de:</p>
        
        <ul>
            <li>Gestionar tu agenda médica de forma inteligente</li>
            <li>Automatizar tus campañas de marketing</li>
            <li>Ver reportes en tiempo real</li>
        </ul>
        
        <div style="text-align: center; margin: 30px 0;">
            <a href="{{upgrade_url}}" class="button">
                🚀 Actualizar a Plan Completo
            </a>
        </div>
        
        <p>¿Tienes dudas? Escríbenos a <a href="mailto:{{support_email}}">{{support_email}}</a></p>
    </div>
    
    <div class="footer">
        <p><strong>Agenda Plus</strong> by Automatiza Sur</p>
    </div>
</body>
</html>
```

### **Template 3: Demo Expirado**

**Template ID:** `template_expired`

**Subject:** `Tu demo de Agenda Plus ha expirado - ¡Actualiza ahora!`

---

## 💰 LÍMITES DEL PLAN GRATUITO

- ✅ **200 emails/mes** gratis
- ✅ Todos los templates que quieras
- ✅ Múltiples servicios de email
- ✅ Email history completo

**Si necesitas más:**
- Plan Personal: $7/mes (1,000 emails)
- Plan Professional: $15/mes (10,000 emails)

---

## 🔒 SEGURIDAD

### **Proteger tus credenciales:**

Para producción, usa variables de entorno:

1. **Crear archivo `.env.local`:**
```env
VITE_EMAILJS_SERVICE_ID=service_abc123
VITE_EMAILJS_TEMPLATE_ID=template_xyz789
VITE_EMAILJS_PUBLIC_KEY=user_abc123def456
```

2. **Actualizar `emailService.js`:**
```javascript
const EMAILJS_CONFIG = {
    serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
    templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
    publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY
};
```

3. **Agregar a `.gitignore`:**
```
.env.local
```

---

## 🐛 TROUBLESHOOTING

### **Error: "Service ID not found"**
- Verifica que copiaste el Service ID correcto
- Asegúrate de que el servicio esté activo

### **Error: "Template not found"**
- Verifica el Template ID
- Asegúrate de que el template esté publicado

### **Email no llega:**
- Revisa la carpeta de spam
- Verifica que el email del destinatario sea correcto
- Chequea "Email History" en EmailJS

### **Error: "Public Key invalid"**
- Verifica que la Public Key sea correcta
- Asegúrate de llamar `emailjs.init()` antes de enviar

---

## 📋 CHECKLIST FINAL

- [ ] Cuenta de EmailJS creada
- [ ] Servicio de email conectado (Gmail/Outlook/SMTP)
- [ ] Template de bienvenida creado
- [ ] Service ID copiado
- [ ] Template ID copiado
- [ ] Public Key copiada
- [ ] Credenciales configuradas en `emailService.js`
- [ ] Proyecto rebuildeado (`npm run build`)
- [ ] Email de prueba enviado exitosamente
- [ ] Email recibido en bandeja de entrada

---

## 🚀 PRÓXIMOS PASOS

Una vez configurado EmailJS:

1. **Deploy a Cloudflare Pages:**
   ```bash
   npm run build
   wrangler pages deploy dist --project-name=agenda-plus
   ```

2. **Configurar variables de entorno en Cloudflare:**
   - Ve a tu proyecto en Cloudflare Pages
   - Settings → Environment Variables
   - Agrega las 3 variables de EmailJS

3. **Probar en producción:**
   - Visita tu sitio desplegado
   - Registra una cuenta demo
   - Verifica que llegue el email

---

**¿Necesitas ayuda?** Escríbeme y te guío paso a paso. 🚀

---

**Última actualización:** 23 de Enero, 2026
