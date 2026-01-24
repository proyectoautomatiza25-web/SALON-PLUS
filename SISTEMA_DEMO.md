# 🎯 SISTEMA DE DEMO - AGENDA PLUS

## 📋 RESUMEN EJECUTIVO

Se ha implementado un **sistema completo de registro y demo** para Agenda Plus que permite a los usuarios probar el software durante 14 días sin necesidad de tarjeta de crédito.

---

## 🔄 FLUJO DE USUARIO

### **1. Landing Page → Registro Demo**

```
Usuario hace click en "Comenzar Prueba Gratis" o "Solicitar Demo"
        ↓
Se abre modal de registro con formulario
        ↓
Usuario completa 4 campos:
  • Nombre Completo
  • Email Profesional
  • Teléfono
  • Nombre del Centro Médico
        ↓
Sistema crea cuenta DEMO automáticamente
        ↓
Pantalla de éxito con credenciales
        ↓
Usuario accede al SaaS en modo DEMO
```

### **2. Dentro del SaaS (Modo Demo)**

- **Banner superior visible** con:
  - Indicador "🎯 Estás en Modo DEMO"
  - Contador de días restantes (14 días)
  - Botón "Actualizar a Plan Completo"
  - Opción para cerrar temporalmente el banner

- **Acceso completo** a todas las funcionalidades:
  - ✅ Dashboard con estadísticas
  - ✅ Agenda inteligente
  - ✅ Gestión de pacientes
  - ✅ CRM médico
  - ✅ Campañas de marketing
  - ✅ Notificaciones
  - ✅ Reportes y analytics

---

## 🎨 COMPONENTES IMPLEMENTADOS

### **1. DemoRegistration.jsx**
**Ubicación:** `src/components/DemoRegistration.jsx`

**Características:**
- Modal de registro con 2 pasos:
  1. **Formulario de registro** (4 campos con validación)
  2. **Pantalla de éxito** con credenciales generadas

- **Diseño premium:**
  - Iconos de Lucide React
  - Animaciones fade-in-up
  - Glassmorphism y sombras modernas
  - Responsive y accesible

- **Funcionalidad:**
  - Validación de campos requeridos
  - Generación automática de contraseña temporal
  - Almacenamiento en localStorage (simulado)
  - Envío de email de bienvenida (simulado)

### **2. DemoBanner.jsx**
**Ubicación:** `src/components/DemoBanner.jsx`

**Características:**
- Banner superior con gradiente dinámico:
  - **Azul/Morado:** Cuando quedan más de 3 días
  - **Naranja/Rojo:** Cuando quedan 3 días o menos (urgencia)

- **Elementos visuales:**
  - Icono dinámico (Sparkles o AlertCircle)
  - Contador de días restantes
  - Mensaje contextual según días restantes
  - Botón CTA "Actualizar a Plan Completo"
  - Botón para cerrar temporalmente

### **3. Integración en App.jsx**

**Cambios realizados:**
- Importación de `DemoRegistration`
- Estado `isDemoMode` para diferenciar demo de login normal
- Detección automática de hash `#demo` en URL
- Paso de prop `isDemoMode` a `SaaSApp`

**Lógica:**
```javascript
// Detectar clicks en enlaces #demo
React.useEffect(() => {
  const handleHashChange = () => {
    if (window.location.hash === '#demo') {
      setShowDemoModal(true);
      window.history.replaceState(null, '', window.location.pathname);
    }
  };
  // ...
}, []);
```

### **4. Integración en SaaSApp.jsx**

**Cambios realizados:**
- Importación de `DemoBanner`
- Prop `isDemoMode` con valor por defecto `false`
- Renderizado condicional del banner
- Handler `handleUpgrade` para actualización a plan completo

---

## 🔗 PUNTOS DE ENTRADA

Los usuarios pueden acceder al registro de demo desde:

1. **Hero Section:**
   - Botón "Solicitar Demo" → `href="#demo"`

2. **Pricing Section:**
   - Botón "Comenzar Prueba Gratis" → `href="#demo"`

3. **Cualquier enlace con hash #demo:**
   - Ejemplo: `https://agendaplus.automatizasur.cl#demo`

---

## 📧 SIMULACIÓN DE EMAIL DE BIENVENIDA

Actualmente, el email es simulado. En producción, deberías integrar:

### **Opción 1: EmailJS (Recomendado para MVP)**
```javascript
import emailjs from '@emailjs/browser';

emailjs.send('service_id', 'template_id', {
  to_email: formData.email,
  user_name: formData.name,
  center_name: formData.centerName,
  temp_password: demoCredentials.password,
  demo_days: 14
}, 'public_key');
```

### **Opción 2: API Backend**
```javascript
fetch('/api/send-demo-email', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: formData.email,
    name: formData.name,
    centerName: formData.centerName,
    password: demoCredentials.password
  })
});
```

---

## 🔐 GESTIÓN DE CUENTAS DEMO

### **Almacenamiento Actual (Simulado)**
```javascript
localStorage.setItem('demoCredentials', JSON.stringify({
  email: formData.email,
  password: 'demo' + Math.random().toString(36).substring(7),
  demoExpiresIn: 14,
  createdAt: new Date().toISOString()
}));
```

### **Recomendación para Producción:**

Crear una tabla `demo_accounts` en tu base de datos:

```sql
CREATE TABLE demo_accounts (
  id UUID PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  center_name VARCHAR(255),
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  expires_at TIMESTAMP NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  converted_to_paid BOOLEAN DEFAULT FALSE
);
```

**Backend API necesario:**
- `POST /api/demo/register` - Crear cuenta demo
- `POST /api/demo/login` - Login de cuenta demo
- `GET /api/demo/status` - Verificar días restantes
- `POST /api/demo/upgrade` - Convertir a cuenta paga

---

## ⏰ CONTADOR DE DÍAS

### **Implementación Actual:**
```javascript
<DemoBanner daysRemaining={14} onUpgrade={handleUpgrade} />
```

### **Implementación Dinámica Recomendada:**

```javascript
const [daysRemaining, setDaysRemaining] = useState(14);

useEffect(() => {
  const credentials = JSON.parse(localStorage.getItem('demoCredentials'));
  if (credentials && credentials.createdAt) {
    const created = new Date(credentials.createdAt);
    const now = new Date();
    const daysPassed = Math.floor((now - created) / (1000 * 60 * 60 * 24));
    const remaining = Math.max(0, 14 - daysPassed);
    setDaysRemaining(remaining);
    
    // Si expiró, redirigir a upgrade
    if (remaining === 0) {
      handleUpgrade();
    }
  }
}, []);
```

---

## 🎨 DIFERENCIAS VISUALES: DEMO vs CUENTA REAL

| Característica | Modo DEMO | Cuenta Real |
|----------------|-----------|-------------|
| **Banner Superior** | ✅ Visible con contador | ❌ No visible |
| **Datos** | Datos de ejemplo precargados | Datos reales del cliente |
| **Funcionalidades** | Todas habilitadas | Todas habilitadas |
| **Límites** | 14 días de acceso | Acceso ilimitado |
| **Facturación** | No aplica | Activa ($49.990/mes) |
| **Soporte** | Email básico | Soporte prioritario 24/7 |

---

## 🚀 PRÓXIMOS PASOS RECOMENDADOS

### **1. Backend para Demo Accounts**
- [ ] Crear API de registro de demos
- [ ] Implementar autenticación JWT
- [ ] Sistema de expiración automática
- [ ] Limpieza de cuentas demo expiradas

### **2. Email Transaccional**
- [ ] Integrar EmailJS o SendGrid
- [ ] Template de bienvenida profesional
- [ ] Emails de recordatorio (día 7, día 12, día 14)
- [ ] Email de expiración con CTA de upgrade

### **3. Analytics y Conversión**
- [ ] Tracking de registros de demo
- [ ] Tasa de conversión demo → pago
- [ ] Análisis de uso durante demo
- [ ] Identificar features más usadas

### **4. Mejoras UX**
- [ ] Tour guiado para nuevos usuarios demo
- [ ] Tooltips explicativos
- [ ] Video tutorial de bienvenida
- [ ] Checklist de onboarding

### **5. Proceso de Upgrade**
- [ ] Página de checkout integrada
- [ ] Integración con Mercado Pago / Flow
- [ ] Migración automática de datos demo → real
- [ ] Email de confirmación de upgrade

---

## 📊 MÉTRICAS A MONITOREAR

1. **Tasa de Registro:**
   - Visitas a landing → Registros demo
   - Objetivo: >5%

2. **Tasa de Activación:**
   - Registros → Primer login
   - Objetivo: >80%

3. **Engagement:**
   - Días activos durante demo
   - Features más utilizadas

4. **Tasa de Conversión:**
   - Demos → Cuentas pagas
   - Objetivo: >15%

5. **Tiempo hasta Conversión:**
   - Promedio de días antes de upgrade
   - Identificar momento óptimo para CTA

---

## 🔧 COMANDOS ÚTILES

```bash
# Build del proyecto
npm run build

# Deploy a Cloudflare Pages
wrangler pages deploy dist --project-name=agenda-plus

# Ver logs de Cloudflare
wrangler pages deployment list --project-name=agenda-plus
```

---

## 🌐 URLs ACTUALES

- **Landing Page:** https://8365be80.agenda-plus.pages.dev
- **Dominio Custom:** agendaplus.automatizasur.cl (pendiente configuración DNS)

---

## 📝 NOTAS IMPORTANTES

1. **Seguridad:**
   - Las contraseñas temporales deben ser hasheadas en producción
   - Implementar rate limiting en registro de demos
   - Validar emails para evitar spam

2. **Datos de Demo:**
   - Precarga datos de ejemplo al crear cuenta demo
   - Incluye pacientes, citas y profesionales ficticios
   - Permite exploración completa del sistema

3. **Expiración:**
   - Notificar al usuario 3 días antes de expirar
   - Ofrecer extensión de 7 días adicionales (opcional)
   - Backup de datos antes de eliminar cuenta demo

---

**Última actualización:** 23 de Enero, 2026
**Versión:** 1.0.0
**Estado:** ✅ Implementado y desplegado
