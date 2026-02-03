#!/usr/bin/env python3
"""
Script para extraer datos de Reservo/Fzabale
"""
import requests
import json
from datetime import datetime, timedelta

def login_reservo():
    """Intentar login en Reservo"""
    print("=" * 70)
    print("  EXTRACCIÓN DE DATOS - RESERVO/FZABALE")
    print("=" * 70)
    print()
    
    # Credenciales
    username = "FZABALETAG"
    password = "12345"
    
    # URLs posibles
    base_urls = [
        "https://app.reservo.cl",
        "https://reservo.cl",
        "https://api.reservo.cl"
    ]
    
    session = requests.Session()
    
    for base_url in base_urls:
        print(f"🔍 Intentando conectar a: {base_url}")
        
        try:
            # Intentar obtener la página de login
            login_page = session.get(f"{base_url}/login", timeout=10)
            print(f"   Status: {login_page.status_code}")
            
            if login_page.status_code == 200:
                print(f"   ✅ Página de login encontrada")
                
                # Intentar diferentes endpoints de login
                login_endpoints = [
                    "/api/auth/login",
                    "/api/login",
                    "/login",
                    "/auth/login"
                ]
                
                for endpoint in login_endpoints:
                    try:
                        # Intentar login con diferentes formatos
                        login_data_formats = [
                            {"username": username, "password": password},
                            {"email": username, "password": password},
                            {"user": username, "pass": password},
                        ]
                        
                        for login_data in login_data_formats:
                            print(f"   🔐 Intentando login en: {endpoint}")
                            
                            # POST con JSON
                            response = session.post(
                                f"{base_url}{endpoint}",
                                json=login_data,
                                timeout=10
                            )
                            
                            print(f"      Status: {response.status_code}")
                            
                            if response.status_code in [200, 201]:
                                print(f"      ✅ Login exitoso!")
                                print(f"      Response: {response.text[:200]}")
                                return session, base_url
                            
                            # POST con form data
                            response = session.post(
                                f"{base_url}{endpoint}",
                                data=login_data,
                                timeout=10
                            )
                            
                            if response.status_code in [200, 201]:
                                print(f"      ✅ Login exitoso!")
                                print(f"      Response: {response.text[:200]}")
                                return session, base_url
                                
                    except Exception as e:
                        continue
                        
        except Exception as e:
            print(f"   ❌ Error: {str(e)[:100]}")
            continue
    
    print()
    print("❌ No se pudo conectar a Reservo mediante API")
    print()
    print("📋 Alternativas:")
    print("   1. Exportar las citas desde Reservo manualmente (Excel/CSV)")
    print("   2. Compartir capturas de pantalla de las citas de mañana")
    print("   3. Proporcionar acceso directo al sistema")
    
    return None, None

def extract_appointments(session, base_url):
    """Extraer citas del sistema"""
    print()
    print("📅 Extrayendo citas...")
    
    # Fecha de mañana
    tomorrow = (datetime.now() + timedelta(days=1)).strftime("%Y-%m-%d")
    
    endpoints = [
        f"/api/appointments?date={tomorrow}",
        f"/api/citas?fecha={tomorrow}",
        f"/api/agenda?date={tomorrow}",
    ]
    
    for endpoint in endpoints:
        try:
            response = session.get(f"{base_url}{endpoint}", timeout=10)
            if response.status_code == 200:
                print(f"✅ Citas obtenidas desde: {endpoint}")
                data = response.json()
                print(json.dumps(data, indent=2)[:500])
                return data
        except Exception as e:
            continue
    
    return None

if __name__ == "__main__":
    session, base_url = login_reservo()
    
    if session and base_url:
        appointments = extract_appointments(session, base_url)
        
        if appointments:
            print()
            print("🎉 Datos extraídos exitosamente!")
        else:
            print()
            print("⚠️  No se pudieron extraer las citas")
    else:
        print()
        print("💡 Por favor, exporta manualmente:")
        print("   - Ve a Reservo > Agenda")
        print("   - Filtra por fecha: 3 de febrero de 2026")
        print("   - Exporta a Excel o toma capturas")
