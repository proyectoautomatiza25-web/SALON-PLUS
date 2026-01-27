# Proyecto FOCUS - Integración con Fudo

## Configuración de Variables de Entorno

Para habilitar la integración con Fudo, configura las siguientes variables de entorno en el archivo `.env`:

```bash
# Base URL de la API de Fudo
FUDO_BASE_URL=https://app-v2.fu.do

# Credenciales de "Aplicaciones Externas (beta)"
# Obtener desde: Panel de Fudo > Configuración > Aplicaciones Externas
FUDO_CLIENT_ID=tu_client_id_aqui
FUDO_CLIENT_SECRET=tu_client_secret_aqui
```

### Ejemplo con credenciales de Kingdom Coffee:

```bash
FUDO_CLIENT_ID=MDAwMDI6MTkxNDcz
FUDO_CLIENT_SECRET=DbJcsn8gNJYI3IOMwVmkMUCx
```

**⚠️ IMPORTANTE:** En producción, estas credenciales deben guardarse de forma segura (ej: Google Secret Manager, AWS Secrets Manager, etc.) y **nunca** commitearlas al repositorio.

---

## Endpoints de Integración Fudo

Una vez configuradas las variables de entorno, los siguientes endpoints estarán disponibles:

### 1. Probar Conexión
```
GET /api/fudo/test-connection
```

Verifica que las credenciales sean válidas y la API de Fudo esté accesible.

**Respuesta exitosa:**
```json
{
  "success": true,
  "status_code": 200,
  "message": "Connection successful"
}
```

### 2. Obtener Órdenes de Prueba
```
GET /api/fudo/test-orders?fecha_desde=2026-01-01&fecha_hasta=2026-01-26
```

**Parámetros:**
- `fecha_desde` (opcional): Fecha inicio en formato YYYY-MM-DD (default: hace 7 días)
- `fecha_hasta` (opcional): Fecha fin en formato YYYY-MM-DD (default: hoy)

**Respuesta:**
```json
{
  "success": true,
  "fecha_desde": "2026-01-01",
  "fecha_hasta": "2026-01-26",
  "total_orders": 150,
  "orders": [
    {
      "id": "...",
      "fecha": "...",
      "total": "...",
      ...
    }
  ]
}
```

### 3. Obtener Productos
```
GET /api/fudo/products
```

Obtiene el catálogo completo de productos de Fudo.

---

## Uso del Cliente Fudo en Código

```python
from app.integrations.fudo_client import FudoClient
from datetime import date

# Inicializar cliente
client = FudoClient(
    base_url="https://app-v2.fu.do",
    client_id="MDAwMDI6MTkxNDcz",
    client_secret="DbJcsn8gNJYI3IOMwVmkMUCx"
)

# Obtener órdenes
orders = client.fetch_orders(
    desde=date(2026, 1, 1),
    hasta=date(2026, 1, 26)
)

# Obtener productos
products = client.fetch_products()

# Probar conexión
status = client.test_connection()
```

---

## Próximos Pasos

1. **Verificar Endpoints Reales:** Los endpoints actuales (`/api/integrations/orders`, `/api/integrations/products`) son placeholders. Deben ajustarse según la documentación oficial de Fudo.

2. **Implementar Importación Automática:** Crear un servicio que:
   - Llame a `fetch_orders()` periódicamente
   - Transforme los datos de Fudo al formato de `Venta` e `ItemVenta`
   - Inserte en la base de datos evitando duplicados

3. **Webhooks:** Si Fudo soporta webhooks, configurar un endpoint para recibir notificaciones en tiempo real de nuevas ventas.

---

## Troubleshooting

### Error: "Missing Fudo configuration"
- Verifica que el archivo `.env` exista en `backend/`
- Asegúrate de que las variables estén correctamente definidas
- Reinicia el servidor FastAPI después de modificar `.env`

### Error 401 Unauthorized
- Verifica que las credenciales sean correctas
- Confirma que la URL base sea la correcta (`https://app-v2.fu.do` vs `https://api.fu.do`)
- Contacta a soporte de Fudo para verificar que la integración esté activa

### Error 404 Not Found
- Los endpoints actuales son placeholders
- Consulta la documentación oficial de Fudo para los endpoints reales
- Ajusta las URLs en `fudo_client.py` según corresponda
