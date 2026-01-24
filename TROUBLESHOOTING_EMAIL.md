# 🔍 TROUBLESHOOTING - EMAIL NO SE ENVÍA

## ✅ **PASOS PARA DIAGNOSTICAR:**

### **1. Abrir Consola del Navegador**
1. Presiona **F12**
2. Ve a la pestaña **"Console"**
3. **Recarga la página** (F5)
4. Busca estos mensajes al cargar:
   ```
   📧 EmailJS Config: { serviceId: "...", templateId: "...", publicKey: "✅ Configurada" }
   🔧 Inicializando EmailJS con Public Key: ...
   ✅ EmailJS inicializado correctamente
   ```

### **2. Intentar Registro**
1. Click en "Prueba Gratis"
2. Completa el formulario
3. Click en "Crear Cuenta Demo Gratis"
4. **Observa la consola** - ¿Qué mensaje aparece?

### **3. Posibles Errores y Soluciones:**

#### **Error: "Public Key is required"**
**Solución:**
- Las variables de entorno no se cargaron
- Reinicia el servidor: `Ctrl+C` y luego `npm run dev`

#### **Error: "Service ID not found"**
**Solución:**
- El Service ID es incorrecto
- Verifica en EmailJS Dashboard que sea: `service_8162ehj`

#### **Error: "Template not found"**
**Solución:**
- El Template ID es incorrecto
- Verifica en EmailJS Dashboard que sea: `template_9Loa3dv8rn6_Zi0bR`

#### **Error: "Invalid public key"**
**Solución:**
- La Public Key es incorrecta
- Verifica en EmailJS Dashboard → Account → General

#### **No hay error, pero no llega el email:**
**Solución:**
1. Revisa **Spam/Promociones**
2. Ve a EmailJS Dashboard → Email History
3. Verifica si aparece como enviado

---

## 🔧 **VERIFICACIÓN RÁPIDA:**

### **Credenciales actuales:**
```
Service ID:  service_8162ehj
Template ID: template_9Loa3dv8rn6_Zi0bR
Public Key:  6tWf_vqd60pWzvs0UmvyJ
```

### **Verificar que estén en `.env.local`:**
```bash
# Abre el archivo y verifica
cat .env.local
```

Deberías ver:
```
VITE_EMAILJS_SERVICE_ID=service_8162ehj
VITE_EMAILJS_TEMPLATE_ID=template_9Loa3dv8rn6_Zi0bR
VITE_EMAILJS_PUBLIC_KEY=6tWf_vqd60pWzvs0UmvyJ
```

---

## 📸 **INFORMACIÓN NECESARIA:**

Para ayudarte mejor, necesito:

1. **Captura de la consola** cuando cargas la página
2. **Captura de la consola** cuando intentas registrarte
3. **Captura de Email History** en EmailJS Dashboard

---

## 🚀 **SI NADA FUNCIONA:**

Opción alternativa: **Desplegar sin email** y agregarlo después.

El sistema funciona perfectamente, solo el email no se envía. Podemos:
1. Desplegar a producción
2. Configurar el email directamente en Cloudflare
3. Probar en producción

**¿Qué prefieres?**
