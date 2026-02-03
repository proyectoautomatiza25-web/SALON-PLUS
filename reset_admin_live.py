from sqlalchemy import create_engine, text
from passlib.context import CryptContext

# URL QUE ENCONTRAMOS (REAL DE SUPABASE)
DATABASE_URL = "postgresql://postgres.wnzpltxackalafxrbeix:FLORENCIA2010JULIETA2022@aws-0-us-west-2.pooler.supabase.com:6543/postgres"

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
hashed_password = pwd_context.hash("admin123")

try:
    print(f"--- CONECTANDO A SUPABASE PARA RESETEAR PASSWORD ---")
    engine = create_engine(DATABASE_URL)
    with engine.connect() as connection:
        # Actualizamos la contraseña del administrador
        stmt = text("UPDATE users SET hashed_password = :h WHERE email = 'admin@agendaplus.cl'")
        connection.execute(stmt, {"h": hashed_password})
        connection.commit()
        print("✅ CONTRASEÑA RESETEADA CON ÉXITO!")
        print("Usuario: admin@agendaplus.cl")
        print("Clave: admin123")

except Exception as e:
    print(f"\n❌ ERROR FATAL: {e}")
