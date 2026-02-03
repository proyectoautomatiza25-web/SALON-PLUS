import os
from sqlalchemy import create_engine, text

# URL QUE ENCONTRAMOS EN TU ARCHIVO
DATABASE_URL = "postgresql://postgres.wnzpltxackalafxrbeix:FLORENCIA2010JULIETA2022@aws-0-us-west-2.pooler.supabase.com:6543/postgres"

try:
    print(f"--- CONECTANDO A SUPABASE ---")
    engine = create_engine(DATABASE_URL)
    with engine.connect() as connection:
        print("✅ CONEXIÓN EXITOSA!")
        
        # 1. BUSCAR USUARIOS (ADMIN)
        print("\n--- USUARIOS ENCONTRADOS ---")
        result = connection.execute(text("SELECT email FROM users;"))
        users = result.fetchall()
        for u in users:
            print(f"👤 Usuario: {u[0]}")
            
        # 2. BUSCAR PROFESIONALES (DRA. FRANCIS)
        print("\n--- PROFESIONALES ENCONTRADOS ---")
        try:
            result = connection.execute(text("SELECT name FROM stylists;"))
            pros = result.fetchall()
            for p in pros:
                print(f"👩‍⚕️ Profesional: {p[0]}")
        except Exception as e:
            print(f"⚠️ No pude leer profesionales: {e}")

except Exception as e:
    print(f"\n❌ ERROR FATAL: No existe la base de datos o la clave es incorrecta.")
    print(e)
