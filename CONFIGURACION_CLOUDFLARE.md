# 🌐 CONFIGURACIÓN DE CLOUDFLARE PARA AGENDA PLUS

## 📋 INFORMACIÓN DEL PROYECTO

- **Dominio Principal:** `automatizasur.cl`
- **Subdominio para Agenda Plus:** `agendaplus.automatizasur.cl`
- **Plataforma de Hosting:** Vercel
- **Proyecto:** Agenda Plus - SaaS de Gestión Médica

---

## 🎯 PASO 1: ACCEDER A CLOUDFLARE

1. Ve a [https://dash.cloudflare.com](https://dash.cloudflare.com)
2. Inicia sesión con tu cuenta
3. Selecciona el dominio **`automatizasur.cl`** de la lista

---

## 🔧 PASO 2: CONFIGURAR DNS EN CLOUDFLARE

### Opción A: Registro CNAME (Recomendado para Vercel)

1. En el panel de Cloudflare, ve a la sección **DNS**
2. Click en **"Add record"** (Agregar registro)
3. Configura el registro con estos valores:

```
Type:    CNAME
Name:    agendaplus
Target:  cname.vercel-dns.com
Proxy:   🟠 DNS only (desactivar proxy de Cloudflare)
TTL:     Auto
```

4. Click en **"Save"** (Guardar)

### ⚠️ IMPORTANTE: Proxy Status
- **DEBE estar en "DNS only" (nube gris)** durante la configuración inicial
- Una vez que Vercel valide el dominio, puedes activar el proxy (nube naranja) si lo deseas

---

## 🚀 PASO 3: CONFIGURAR EN VERCEL

### 3.1 Acceder al Proyecto en Vercel

1. Ve a [https://vercel.com/dashboard](https://vercel.com/dashboard)
2. Selecciona tu proyecto de Agenda Plus
3. Ve a **Settings** → **Domains**

### 3.2 Agregar el Dominio Personalizado

1. En la sección de Domains, click en **"Add"**
2. Escribe: `agendaplus.automatizasur.cl`
3. Click en **"Add"**

### 3.3 Verificación

Vercel mostrará uno de estos estados:

- ✅ **Valid Configuration** → ¡Listo! El dominio está configurado
- ⏳ **Pending** → Espera unos minutos (propagación DNS)
- ❌ **Invalid Configuration** → Revisa que el CNAME esté correcto

---

## 🔍 PASO 4: VERIFICAR LA CONFIGURACIÓN

### Verificar DNS desde tu computadora:

Abre PowerShell y ejecuta:

```powershell
nslookup agendaplus.automatizasur.cl
```

**Resultado esperado:**
```
Nombre:  cname.vercel-dns.com
Addresses: [IPs de Vercel]
```

### Verificar en el navegador:

1. Espera 5-10 minutos para la propagación DNS
2. Abre: `https://agendaplus.automatizasur.cl`
3. Deberías ver tu aplicación Agenda Plus

---

## ⚡ PASO 5: CONFIGURAR HTTPS (Automático)

Vercel configurará automáticamente el certificado SSL:

1. En Vercel → Settings → Domains
2. Verás el estado del certificado SSL
3. Espera unos minutos hasta que aparezca ✅ **Valid**

---

## 🎨 PASO 6: ACTUALIZAR METADATOS (YA HECHO)

Ya actualicé los metadatos del proyecto para reflejar el nuevo dominio:

✅ Título: "Agenda Plus | Software de Gestión Médica Inteligente"
✅ Meta OG URL: `https://agendaplus.automatizasur.cl`
✅ Branding completo de Automatiza Sur

---

## 📊 RESUMEN DE CONFIGURACIÓN

| Elemento | Valor |
|----------|-------|
| **Tipo de Registro** | CNAME |
| **Nombre** | agendaplus |
| **Destino** | cname.vercel-dns.com |
| **Proxy Cloudflare** | 🟠 DNS only (inicialmente) |
| **TTL** | Auto |
| **SSL** | Automático (Vercel) |

---

## 🔄 ALTERNATIVA: Si prefieres usar el dominio raíz

Si en lugar de `agendaplus.automatizasur.cl` quieres usar `automatizasur.cl`:

1. **Registro A:**
   - Type: `A`
   - Name: `@`
   - IPv4: `76.76.21.21`
   - Proxy: 🟠 DNS only

2. **Registro CNAME para www:**
   - Type: `CNAME`
   - Name: `www`
   - Target: `cname.vercel-dns.com`
   - Proxy: 🟠 DNS only

---

## ❓ TROUBLESHOOTING

### Problema: "Invalid Configuration" en Vercel

**Solución:**
1. Verifica que el CNAME apunte a `cname.vercel-dns.com`
2. Asegúrate de que el Proxy esté en "DNS only" (nube gris)
3. Espera 5-10 minutos para propagación DNS

### Problema: "ERR_SSL_VERSION_OR_CIPHER_MISMATCH"

**Solución:**
1. Espera a que Vercel genere el certificado SSL (puede tomar hasta 24h)
2. Verifica en Vercel → Settings → Domains que el SSL esté activo

### Problema: El sitio no carga

**Solución:**
1. Ejecuta `nslookup agendaplus.automatizasur.cl`
2. Si no resuelve, revisa la configuración DNS en Cloudflare
3. Limpia caché del navegador (Ctrl + Shift + R)

---

## 📞 SOPORTE

Si tienes problemas:
1. Verifica la configuración DNS en Cloudflare
2. Revisa el estado en Vercel Dashboard
3. Espera al menos 10 minutos para propagación DNS

---

## ✅ CHECKLIST FINAL

- [ ] Registro CNAME creado en Cloudflare
- [ ] Proxy en "DNS only" (nube gris)
- [ ] Dominio agregado en Vercel
- [ ] DNS resuelve correctamente (`nslookup`)
- [ ] SSL activo en Vercel
- [ ] Sitio accesible vía HTTPS

---

**¡Una vez completado, tu Agenda Plus estará en línea en `https://agendaplus.automatizasur.cl`! 🚀**
