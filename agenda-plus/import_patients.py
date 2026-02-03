#!/usr/bin/env python3
"""
Script para importar pacientes desde Excel
"""
import sys
import os
import pandas as pd
from datetime import datetime

sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', 'backend-salon-plus'))

from app.database import SessionLocal
from app.models import User, SalonClient

def import_patients_from_excel():
    print("=" * 70)
    print("  IMPORTAR PACIENTES DESDE EXCEL - AGENDA PLUS")
    print("=" * 70)
    print()
    
    # Leer el archivo Excel
    excel_file = "upr6CRwH7H_base_de_pacientes_1.xlsx"
    
    try:
        df = pd.read_excel(excel_file)
        print(f"✅ Archivo Excel leído: {len(df)} filas")
        print(f"📋 Columnas: {list(df.columns)}")
        print()
        
        # Mostrar primeras filas
        print("Primeras 5 filas:")
        print(df.head().to_string())
        print()
        
        db = SessionLocal()
        
        # Obtener el usuario admin
        user = db.query(User).filter(User.email == "admin@agendaplus.cl").first()
        
        if not user:
            print("❌ Usuario admin no encontrado")
            return False
        
        print(f"✅ Usuario encontrado: {user.email}")
        print()
        print("📥 Importando pacientes...")
        
        imported = 0
        skipped = 0
        errors = 0
        
        for idx, row in df.iterrows():
            try:
                # Extraer datos del Excel
                rut = str(row.get('RUT', '')).strip() if pd.notna(row.get('RUT')) else None
                nombre = str(row.get('Nombre', '')).strip() if pd.notna(row.get('Nombre')) else ''
                apellido_p = str(row.get('Apellido paterno', '')).strip() if pd.notna(row.get('Apellido paterno')) else ''
                apellido_m = str(row.get('Apellido materno', '')).strip() if pd.notna(row.get('Apellido materno')) else ''
                
                # Construir nombre completo
                full_name = f"{nombre} {apellido_p} {apellido_m}".strip()
                
                if not full_name or not rut:
                    skipped += 1
                    continue
                
                # Verificar si ya existe
                existing = db.query(SalonClient).filter(
                    SalonClient.owner_id == user.id,
                    SalonClient.rut == rut
                ).first()
                
                if existing:
                    skipped += 1
                    continue
                
                # Extraer otros campos
                telefono = str(row.get('Telefono', '')).strip() if pd.notna(row.get('Telefono')) else None
                email = str(row.get('Email', '')).strip() if pd.notna(row.get('Email')) else None
                direccion = str(row.get('Direccion', '')).strip() if pd.notna(row.get('Direccion')) else None
                prevision = str(row.get('Prevision', 'Fonasa')).strip() if pd.notna(row.get('Prevision')) else 'Fonasa'
                
                # Crear paciente
                patient = SalonClient(
                    owner_id=user.id,
                    name=full_name,
                    rut=rut,
                    phone=telefono,
                    email=email,
                    address=direccion,
                    prevision=prevision,
                    category='General'
                )
                
                db.add(patient)
                imported += 1
                
                if imported % 10 == 0:
                    print(f"   ✅ {imported} pacientes importados...")
                    
            except Exception as e:
                errors += 1
                print(f"   ❌ Error en fila {idx}: {e}")
                continue
        
        db.commit()
        
        print()
        print("=" * 70)
        print("  RESUMEN DE IMPORTACIÓN")
        print("=" * 70)
        print(f"✅ Importados: {imported}")
        print(f"⚠️  Omitidos: {skipped}")
        print(f"❌ Errores: {errors}")
        print()
        print("🚀 Recarga la aplicación para ver los pacientes importados")
        
        db.close()
        return True
        
    except Exception as e:
        print(f"❌ Error: {e}")
        import traceback
        traceback.print_exc()
        return False

if __name__ == "__main__":
    import_patients_from_excel()
