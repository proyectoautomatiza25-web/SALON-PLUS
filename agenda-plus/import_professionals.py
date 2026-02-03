#!/usr/bin/env python3
"""
Script para importar profesionales y agendas del Centro Médico del Valle
"""
import sys
import os

sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', 'backend-salon-plus'))

from app.database import SessionLocal
from app.models import User, Stylist, Service

def import_professionals():
    print("=" * 70)
    print("  IMPORTAR PROFESIONALES - CENTRO MÉDICO DEL VALLE")
    print("=" * 70)
    print()
    
    db = SessionLocal()
    
    try:
        # Obtener el usuario admin
        user = db.query(User).filter(User.email == "admin@agendaplus.cl").first()
        
        if not user:
            print("❌ Usuario admin no encontrado")
            return False
        
        # Actualizar nombre del negocio
        user.business_name = "Centro Médico del Valle"
        db.commit()
        
        print(f"✅ Usuario actualizado: {user.business_name}")
        print()
        
        # Definir profesionales reales
        professionals = [
            {
                "name": "Francis Zabaleta",
                "specialty": "Pediatra",
                "color": "#3b82f6",
                "box": "Box 1: PEDIATRÍA"
            },
            {
                "name": "Gonzalo Matías Ulloa V",
                "specialty": "Psicólogo",
                "color": "#8b5cf6",
                "box": "Box 2: PSICOLOGÍA"
            },
            {
                "name": "Jocelyn Godoy",
                "specialty": "Nutricionista",
                "color": "#10b981",
                "box": "Box 3: MEDICINA GENERAL"
            },
            {
                "name": "Lua Marina Torrealba V",
                "specialty": "Psicóloga Adulto/Infantil",
                "color": "#ec4899",
                "box": "Box 2: PSICOLOGÍA"
            },
            {
                "name": "Martyel Martínez Guedez",
                "specialty": "Médico General",
                "color": "#f59e0b",
                "box": "Box 3: MEDICINA GENERAL"
            }
        ]
        
        print("👨‍⚕️ Importando profesionales...")
        
        # Primero, eliminar los profesionales de prueba anteriores
        db.query(Stylist).filter(Stylist.owner_id == user.id).delete()
        db.commit()
        
        created_profs = []
        for prof_data in professionals:
            prof = Stylist(
                owner_id=user.id,
                name=prof_data["name"],
                specialty=f"{prof_data['specialty']} - {prof_data['box']}",
                color=prof_data["color"],
                active=True
            )
            db.add(prof)
            db.flush()
            created_profs.append(prof)
            print(f"   ✅ {prof_data['name']} ({prof_data['specialty']})")
        
        db.commit()
        print()
        
        # Crear servicios/tratamientos comunes
        print("💉 Creando servicios médicos...")
        
        services = [
            {"name": "Consulta Pediátrica", "duration": 30, "price": 25000},
            {"name": "Control Niño Sano", "duration": 30, "price": 20000},
            {"name": "Consulta Psicológica", "duration": 60, "price": 30000},
            {"name": "Terapia Individual", "duration": 60, "price": 35000},
            {"name": "Consulta Nutricional", "duration": 45, "price": 25000},
            {"name": "Consulta Médica General", "duration": 30, "price": 20000},
            {"name": "Control Crónico", "duration": 30, "price": 18000},
        ]
        
        # Eliminar servicios anteriores
        db.query(Service).filter(Service.owner_id == user.id).delete()
        db.commit()
        
        for service_data in services:
            service = Service(
                owner_id=user.id,
                **service_data,
                color="#0ea5e9"
            )
            db.add(service)
            print(f"   ✅ {service_data['name']} (${service_data['price']:,})")
        
        db.commit()
        print()
        
        print("=" * 70)
        print("  RESUMEN")
        print("=" * 70)
        print(f"✅ Centro: {user.business_name}")
        print(f"✅ Profesionales: {len(created_profs)}")
        print(f"✅ Servicios: {len(services)}")
        print()
        print("🚀 Recarga la aplicación para ver los cambios")
        
        db.close()
        return True
        
    except Exception as e:
        print(f"❌ Error: {e}")
        import traceback
        traceback.print_exc()
        db.rollback()
        return False
    finally:
        db.close()

if __name__ == "__main__":
    import_professionals()
