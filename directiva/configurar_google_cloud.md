# Directiva: Configuración de Google Cloud y Cloud Code

## Objetivo
Establecer la conexión con Google Cloud Platform (GCP) y configurar las credenciales necesarias para que los scripts de la **Capa 3 (Ejecución)** puedan interactuar con servicios como Google Sheets, Drive o Vertex AI.

## Entradas
- Cuenta de Google.
- Proyecto en Google Cloud Console.
- Archivo `credentials.json` (Desktop o descargado).

## Herramientas/Scripts a usar
1. `ejecucion/verificar_entorno.py`: Comprueba si `gcloud` SDK y las librerías de Python están instaladas.
2. `ejecucion/autenticar_google.py`: Maneja el flujo de OAuth2 para generar `token.json`.

## Salidas
- Archivo `.env` actualizado.
- Archivo `token.json` en la raíz (ignorado por git).

## Casos Límite
- Si `gcloud` no está instalado, se debe instruir al usuario para instalar el Google Cloud SDK.
- Si el proyecto de GCP no tiene habilitadas las APIs, el script de ejecución debe reportar el error específico.
