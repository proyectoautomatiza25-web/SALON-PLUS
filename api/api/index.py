import sys
import os

# Determinar la ruta absoluta de la carpeta 'api'
# Esto es necesario porque Vercel puede ejecutar desde distintas rutas
api_dir = os.path.dirname(os.path.abspath(__file__))
sys.path.append(api_dir)

# Importar la app de FastAPI desde la subcarpeta 'app' que copiamos antes
from app.main import app
