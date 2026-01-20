# Directiva: Automatización WhatsApp a Google Sheets

## Objetivo
Crear un sistema que reciba mensajes de WhatsApp y los registre automáticamente en una fila de una hoja de cálculo de Google Sheets.

## Entradas
- Cuenta de Google Cloud con Sheets API habilitada.
- Credenciales de WhatsApp (Token de API de WhatsApp Business o servicio intermediario como Twilio).
- ID de la Hoja de Cálculo (Spreadsheet ID).

## Capas de Implementación
### Capa 1: Gestión (Directiva)
- Definición del flujo: WhatsApp Webhook -> Script de Procesamiento -> Google Sheets.
- Definición de los campos a guardar: Fecha, Remitente, Mensaje.

### Capa 2: Ejecución (Scripts)
1. `ejecucion/whatsapp_webhook.py`: Un servidor Flask/FastAPI para recibir los mensajes.
2. `ejecucion/google_sheets_service.py`: Módulo para interactuar con la API de Sheets.

### Capa 3: Datos (.tmp)
- Archivos temporales de logs de mensajes recibidos.

## Requerimientos Técnicos
- Python 3.10+
- Librerías: `google-auth`, `google-api-python-client`, `flask` (o `fastapi`), `python-dotenv`.

## Casos Límite
- Mensajes multimedia (imágenes/audios): Inicialmente solo texto, registrar que es multimedia.
- Errores de API: Implementar reintentos básicos.
- Seguridad: Validar el token de verificación de WhatsApp.
