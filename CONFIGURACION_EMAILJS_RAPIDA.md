# 🚀 CONFIGURACIÓN RÁPIDA DE EMAILJS - PASO A PASO

## ✅ PASO 1: REGISTRO (Ya abierto en tu navegador)

1. En https://www.emailjs.com/
2. Click en **"Sign Up Free"** (botón naranja arriba a la derecha)
3. Completa:
   - Email: `contacto@automatizasur.cl`
   - Password: (crea una segura)
4. Click en **"Sign Up"**
5. **Verifica tu email** (revisa tu bandeja de entrada)
6. Click en el link de verificación

---

## 📧 PASO 2: CONECTAR GMAIL

1. Una vez dentro del dashboard, ve a **"Email Services"** (menú izquierdo)
2. Click en **"Add New Service"**
3. Selecciona **"Gmail"**
4. Click en **"Connect Account"**
5. Selecciona tu cuenta de Gmail
6. Autoriza el acceso
7. **¡IMPORTANTE!** Copia el **Service ID** que aparece
   - Se ve algo así: `service_abc123xyz`
   - **Pégalo aquí abajo:**

```
Service ID: _________________________
```

---

## 📝 PASO 3: CREAR TEMPLATE DE EMAIL

1. Ve a **"Email Templates"** (menú izquierdo)
2. Click en **"Create New Template"**
3. En **"Template Name"**: escribe `demo_welcome`
4. En **"Subject"**: copia esto:

```
¡Bienvenido a Agenda Plus! 🎉 - Tu cuenta demo está lista
```

5. En **"Content"**: Click en el botón **"</>"** (HTML mode)
6. **BORRA TODO** el contenido que hay
7. **COPIA Y PEGA** el siguiente HTML completo:

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
            background: #f5f5f5;
        }
        .container {
            background: white;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }
        .header {
            background: linear-gradient(135deg, #009E9D 0%, #00C9C8 100%);
            color: white;
            padding: 40px 20px;
            text-align: center;
        }
        .header h1 {
            margin: 0;
            font-size: 32px;
        }
        .content {
            padding: 40px 30px;
        }
        .demo-badge {
            background: #fbbf24;
            color: #78350f;
            padding: 10px 20px;
            border-radius: 25px;
            font-weight: bold;
            display: inline-block;
            margin: 15px 0;
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
            padding: 15px;
            background: white;
            border-radius: 8px;
        }
        .credential-label {
            font-size: 12px;
            color: #64748b;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 5px;
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
            color: white !important;
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
            font-size: 18px;
        }
        .footer {
            text-align: center;
            padding: 30px 20px;
            background: #f8fafc;
            color: #64748b;
            font-size: 14px;
        }
    </style>
</head>
<body>
    <div class="container">
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
    </div>
</body>
</html>
```

8. Click en **"Save"** (arriba a la derecha)
9. **¡IMPORTANTE!** Copia el **Template ID** que aparece
   - Se ve algo así: `template_xyz789abc`
   - **Pégalo aquí abajo:**

```
Template ID: _________________________
```

---

## 🔑 PASO 4: OBTENER PUBLIC KEY

1. Ve a **"Account"** (menú izquierdo, abajo)
2. Click en **"General"**
3. Busca **"Public Key"**
4. **Copia la Public Key**
   - Se ve algo así: `user_abc123def456`
   - **Pégala aquí abajo:**

```
Public Key: _________________________
```

---

## ⚙️ PASO 5: CONFIGURAR EN EL PROYECTO

1. Abre el archivo `.env.local` (ya está creado en la raíz del proyecto)
2. Reemplaza los valores con los que copiaste arriba:

```env
VITE_EMAILJS_SERVICE_ID=TU_SERVICE_ID_AQUI
VITE_EMAILJS_TEMPLATE_ID=TU_TEMPLATE_ID_AQUI
VITE_EMAILJS_PUBLIC_KEY=TU_PUBLIC_KEY_AQUI
```

3. **Guarda el archivo** (Ctrl + S)

---

## 🧪 PASO 6: PROBAR

1. En la terminal, ejecuta:
```bash
npm run dev
```

2. Abre http://localhost:5173
3. Click en **"Comenzar Prueba Gratis"**
4. Completa el formulario con tu email
5. **¡Revisa tu bandeja de entrada!** 📧

---

## ✅ CHECKLIST

- [ ] Cuenta de EmailJS creada y verificada
- [ ] Gmail conectado
- [ ] Template creado con el HTML
- [ ] Service ID copiado
- [ ] Template ID copiado
- [ ] Public Key copiada
- [ ] `.env.local` actualizado con las 3 credenciales
- [ ] Archivo guardado
- [ ] Servidor local iniciado (`npm run dev`)
- [ ] Prueba realizada
- [ ] Email recibido ✅

---

## 🎉 ¡LISTO!

Una vez que recibas el email de prueba, estarás listo para desplegar a producción.

**Siguiente paso:** Configurar las mismas variables en Cloudflare Pages.
