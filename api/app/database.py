from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os
from dotenv import load_dotenv

load_dotenv()

# Database Configuration
# Priority:
# 1. DATABASE_URL (Environment Variable - Production)
# 2. SQLite Local (Fallback - Development)

env_db_url = os.getenv("DATABASE_URL")

if env_db_url:
    # Fix for Heroku/Supabase style strings (postgres:// -> postgresql://)
    if env_db_url.startswith("postgres://"):
        DATABASE_URL = env_db_url.replace("postgres://", "postgresql://", 1)
    else:
        DATABASE_URL = env_db_url
else:
    # Fallback to Production Supabase for Vercel/Cloud environments if env var is missing
    PROD_DB = "postgresql://postgres.wnzpltxackalafxrbeix:FLORENCIA2010JULIETA2022@aws-0-us-west-2.pooler.supabase.com:6543/postgres"
    print("⚠️ WARNING: No DATABASE_URL set. Using production fallback.")
    DATABASE_URL = PROD_DB

engine = create_engine(
    DATABASE_URL, 
    connect_args={"check_same_thread": False} if "sqlite" in DATABASE_URL else {},
    pool_pre_ping=True,
    pool_recycle=3600
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
