#!/usr/bin/env python3
"""
Script para importar citas desde Reservo
"""
import sys
import os
from datetime import datetime

sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', 'backend-salon-plus'))

from app.database import SessionLocal
from app.models import User, Stylist, SalonClient, Appointment

def import_appointments():
    print("=" * 70)
    print("  IMPORTAR CITAS DESDE RESERVO - CENTRO MÉDICO DEL VALLE")
    print("=" * 70)
    print()
    
    db = SessionLocal()
    
    try:
        # Obtener el usuario admin
        user = db.query(User).filter(User.email == "admin@agendaplus.cl").first()
        
        if not user:
            print("❌ Usuario admin no encontrado")
            return False
        
        # Obtener el profesional de Pediatría (Francis Zabaleta)
        pediatra = db.query(Stylist).filter(
            Stylist.owner_id == user.id,
            Stylist.specialty.like("%Pediatra%")
        ).first()
        
        if not pediatra:
            print("❌ Profesional de Pediatría no encontrado")
            return False
        
        print(f"✅ Profesional: {pediatra.name}")
        print()
        
        # Citas para importar
        appointments_data = [
            # 2 de febrero 2026
            {
                "date": "2026-02-02",
                "time": "15:45",
                "patient_rut": "29001725-4",
                "patient_name": "Máximo Daniel Peñalver Heredia",
                "email": "angelica27heredia@gmail.com",
                "phone": "+56942749749"
            },
            {
                "date": "2026-02-02",
                "time": "16:00",
                "patient_rut": "28481477-0",
                "patient_name": "Isaac Exequiel Velasquez Aguilar",
                "email": "bianca.1230@outlook.com",
                "phone": "+56994194346"
            },
            {
                "date": "2026-02-02",
                "time": "14:30",
                "patient_rut": "27603092-2",
                "patient_name": "Ansel Ramos Figuera",
                "email": "figueragenesis503@gmail.com",
                "phone": "+56981462963"
            },
            {
                "date": "2026-02-02",
                "time": "14:45",
                "patient_rut": "25172921-2",
                "patient_name": "Rocio Oyarzun Carcamo",
                "email": "nadia.cv@gmail.com",
                "phone": "+56951795087"
            },
            {
                "date": "2026-02-02",
                "time": "15:00",
                "patient_rut": "26071443-0",
                "patient_name": "Fabiola Amparo Oyarzún Cárcamo",
                "email": "nadia.cv@gmail.com",
                "phone": "+56996947274"
            },
            {
                "date": "2026-02-02",
                "time": "14:00",
                "patient_rut": "29117014-5",
                "patient_name": "Aurora Villarroel Vargas",
                "email": "franciscavargas829@gmail.com",
                "phone": "+56940898885"
            },
            # 3 de febrero 2026
            {
                "date": "2026-02-03",
                "time": "16:00",
                "patient_rut": "24925827-k",
                "patient_name": "María Jesús Avello Pérez",
                "email": "mavelomimica@gmail.com",
                "phone": "+56940032898"
            }
        ]
        
        print("📅 Importando citas...")
        print()
        
        imported = 0
        skipped = 0
        
        for appt_data in appointments_data:
            # Buscar o crear paciente
            patient = db.query(SalonClient).filter(
                SalonClient.owner_id == user.id,
                SalonClient.rut == appt_data["patient_rut"]
            ).first()
            
            if not patient:
                # Crear paciente si no existe
                patient = SalonClient(
                    owner_id=user.id,
                    name=appt_data["patient_name"],
                    rut=appt_data["patient_rut"],
                    email=appt_data["email"],
                    phone=appt_data["phone"],
                    prevision="Fonasa",
                    category="General"
                )
                db.add(patient)
                db.flush()
                print(f"   👤 Paciente creado: {patient.name}")
            
            # Crear cita
            start_datetime = datetime.strptime(
                f"{appt_data['date']} {appt_data['time']}",
                "%Y-%m-%d %H:%M"
            )
            end_datetime = datetime.strptime(
                f"{appt_data['date']} {appt_data['time']}",
                "%Y-%m-%d %H:%M"
            )
            # Sumar 30 minutos para la hora de fin
            from datetime import timedelta
            end_datetime = end_datetime + timedelta(minutes=30)
            
            # Verificar si ya existe la cita
            existing = db.query(Appointment).filter(
                Appointment.owner_id == user.id,
                Appointment.client_id == patient.id,
                Appointment.start_time == start_datetime
            ).first()
            
            if existing:
                skipped += 1
                continue
            
            appointment = Appointment(
                owner_id=user.id,
                stylist_id=pediatra.id,
                client_id=patient.id,
                title="Consulta Pediátrica",
                start_time=start_datetime,
                end_time=end_datetime,
                status="confirmed",
                price=25000,
                notes=f"Importado desde Reservo - Box 1: PEDIATRÍA"
            )
            
            db.add(appointment)
            imported += 1
            
            print(f"   ✅ {appt_data['date']} {appt_data['time']} - {patient.name}")
        
        db.commit()
        
        print()
        print("=" * 70)
        print("  RESUMEN DE IMPORTACIÓN")
        print("=" * 70)
        print(f"✅ Citas importadas: {imported}")
        print(f"⚠️  Citas omitidas (ya existían): {skipped}")
        print()
        print("🚀 Recarga la aplicación para ver las citas en la agenda")
        
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
    import_appointments()
