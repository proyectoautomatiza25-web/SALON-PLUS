import sys
import os

# Add the api directory to Python path
api_dir = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, api_dir)

# Set environment variables for production
os.environ.setdefault('DATABASE_URL', 'postgresql://postgres.wnzpltxackalafxrbeix:FLORENCIA2010JULIETA2022@aws-0-us-west-2.pooler.supabase.com:6543/postgres')
os.environ.setdefault('JWT_SECRET', 'dev_secret_change_in_production')
os.environ.setdefault('GOOGLE_API_KEY', 'AIzaSyDLVlaWC_z2DvFVBL9DhgsfFfAz335Adzw')

try:
    from app.main import app
    
    # This is the handler that Vercel will call
    def handler(event, context):
        return app(event, context)
    
except Exception as e:
    print(f"Error loading app: {e}")
    import traceback
    traceback.print_exc()
    
    # Create a minimal error app
    from fastapi import FastAPI
    app = FastAPI()
    
    @app.get("/")
    @app.get("/api/{path:path}")
    def error_handler():
        return {"error": str(e), "message": "Backend initialization failed"}

