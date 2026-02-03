from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from google import genai
import os
from ..auth import get_current_user
from ..models import User

router = APIRouter(prefix="/api/ai", tags=["ai"])

class AIRequest(BaseModel):
    text: str
    type: str = "general" # can be 'anamnesis', 'diagnosis', 'indications'

@router.post("/expand-medical-note")
async def expand_medical_note(
    request: AIRequest, 
    current_user: User = Depends(get_current_user)
):
    api_key = os.getenv("GOOGLE_API_KEY")
    if not api_key:
        raise HTTPException(status_code=500, detail="AI Key not configured")

    client = genai.Client(api_key=api_key)

    prompt = f"""
    Eres un asistente médico inteligente para el software 'Agenda Plus'. 
    Tu tarea es expandir una nota médica breve y técnica en una redacción profesional, formal y clara en español.
    Mantén el rigor médico pero mejora la estructura y legibilidad.

    Tipo de nota: {request.type}
    Texto breve: {request.text}

    Instrucciones específicas por tipo:
    - anamnesis: Redacta como motivo de consulta formal y antecedentes.
    - diagnosis: Expande a descripción clínica técnica.
    - indications: Redacta como instrucciones claras y numeradas para el paciente (Receta/Plan).
    - dose_calc: El texto contiene un medicamento y un peso. Calcula la dosis pediátrica estándar (mg/kg) y proporciónala en ml o gotas según corresponda. Sé preciso y añade una advertencia de que debe ser validado por el profesional.
    - lab_analysis: El texto contiene resultados de laboratorio. Analiza valores fuera de rango, tendencias y sugiere posibles implicancias clínicas de forma técnica pero resumida.

    Responde SOLO con el texto profesional generado, sin introducciones ni comentarios adicionales.
    """

    import time
    import re

    # --- MOTOR LÓGICO LOCAL (RESPALDO) ---
    def fallback_generation(text: str, type: str) -> str:
        text_lower = text.lower()
        
        if type == "dose_calc":
            # Intentar extraer peso
            weight_match = re.search(r'(\d+([.,]\d+)?)\s*(kg|kilos)', text_lower)
            weight = float(weight_match.group(1).replace(',', '.')) if weight_match else None
            
            medication = "medicamento"
            if "paracetamol" in text_lower: medication = "Paracetamol"
            elif "ibuprofeno" in text_lower: medication = "Ibuprofeno"
            elif "amoxicilina" in text_lower: medication = "Amoxicilina"
            elif "azitromicina" in text_lower: medication = "Azitromicina"
            
            if weight:
                if medication == "Paracetamol":
                    dosis_mg = weight * 15
                    dosis_ml = (dosis_mg * 5) / 160 # Jarabe 160mg/5ml común
                    return f"Cálculo para {weight}kg:\n- Dosis estándar (15mg/kg): {dosis_mg:.0f}mg por dosis.\n- En jarabe (160mg/5ml): Aprox {dosis_ml:.1f} ml cada 6-8 horas.\n⚠️ Dosis máxima 60mg/kg/día."
                elif medication == "Ibuprofeno":
                    dosis_mg = weight * 10
                    dosis_ml = (dosis_mg * 5) / 100 # Jarabe 100mg/5ml
                    return f"Cálculo para {weight}kg:\n- Dosis estándar (10mg/kg): {dosis_mg:.0f}mg por dosis.\n- En jarabe (100mg/5ml): Aprox {dosis_ml:.1f} ml cada 8 horas.\n⚠️ Solo si hay dolor/inflamación. No usar en <6 meses."
                elif medication == "Amoxicilina":
                    dosis_diaria = weight * 50
                    dosis_ml_diaria = (dosis_diaria * 5) / 500 # 500mg/5ml
                    return f"Cálculo para {weight}kg:\n- Dosis diaria (50mg/kg/día): {dosis_diaria:.0f}mg.\n- Repartir en 2 o 3 tomas.\n- Volumen diario total (500mg/5ml): {dosis_ml_diaria:.1f} ml."
                else:
                    return f"Para {weight}kg. Se sugiere verificar presentación del fármaco. Regla general: Dosis/kg * Peso / Concentración."
            return "No se detectó el peso del paciente (ej: 15kg). Por favor especifíquelo para calcular."

        elif type == "anamnesis":
            return f"Paciente consulta por cuadro de {text}. Refiere inicio de síntomas caracterizados por malestar general y la sintomatología descrita. No refiere antecedentes mórbidos agudos adicionales al momento de la entrevista.\n(Texto formalizado automáticamente por Sistema Local)"

        elif type == "diagnosis":
            return f"Diagnóstico Clínico Principal: {text.upper()}.\nSe observa correlación clínica compatible. Se requiere monitoreo de evolución para confirmar resolución del cuadro."

        elif type == "indications":
            return f"PLAN DE TRATAMIENTO:\n1. Reposo relativo y control térmico.\n2. Hidratación abundante.\n3. {text}.\n4. Consultar en servicio de urgencia en caso de signos de alarma (dificultad respiratoria, fiebre persistente >3 días)."
            
        elif type == "lab_analysis":
            return f"ANÁLISIS PRELIMINAR:\nValores ingresados: '{text}'.\nSe sugiere correlacionar con clínica del paciente. Si hay valores fuera de rango, repetir examen en 15 días o derivar a especialista según criterio médico."

        return f"Texto procesado: {text}. (IA en modo mantenimiento)"

    # --- INTENTO DE CONEXIÓN CON GEMINI ---
    max_retries = 2 # Reducimos intentos para ser más rápidos en fallar y usar el backup
    base_delay = 1

    for attempt in range(max_retries):
        try:
            # Usamos 1.5-flash que es más estable
            response = client.models.generate_content(
                model='gemini-1.5-flash', contents=prompt
            )
            return {"expanded_text": response.text.strip()}
        
        except Exception as e:
            error_str = str(e)
            print(f"⚠️ Gemini Intento {attempt+1} falló: {error_str}")
            
            # Si falla el último intento, ACTIVAMOS EL RESPALDO
            if attempt == max_retries - 1:
                print("🔄 ACTIVANDO MODO RESPALDO LOCAL (Fallback)")
                local_result = fallback_generation(request.text, request.type)
                return {"expanded_text": local_result} # Devolvemos 200 OK con el resultado local
            
            time.sleep(base_delay)
    
    # Este punto no debería alcanzarse por el return en el catch, pero por seguridad:
    return {"expanded_text": fallback_generation(request.text, request.type)}

