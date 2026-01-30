from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os
from dotenv import load_dotenv

load_dotenv()

# Default to sqlite for local dev if no env var, but prepared for Postgres
# Database Configuration
# Priority: Env Var (Prod) > SQLite (Dev) -> Supabase Hardcoded Fallback (Prod Fix)

SUPABASE_URL = "postgresql://postgres.wnzpltxackalafxrbeix:FLORENCIA2010JULIETA2022@aws-0-us-west-2.pooler.supabase.com:6543/postgres"

env_db_url = os.getenv("DATABASE_URL")

if env_db_url:
    # Fix for Heroku/Supabase style strings
    if env_db_url.startswith("postgres://"):
        DATABASE_URL = env_db_url.replace("postgres://", "postgresql://", 1)
    else:
        DATABASE_URL = env_db_url
else:
    # Fallback directly to Supabase if no env var is set (Fixing Railway SQLite issue)
    DATABASE_URL = SUPABASE_URL

engine = create_engine(
    DATABASE_URL, connect_args={"check_same_thread": False} if "sqlite" in DATABASE_URL else {}
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
