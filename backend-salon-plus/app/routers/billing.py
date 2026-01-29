from fastapi import APIRouter, Depends, HTTPException, Request, Form
from sqlalchemy.orm import Session
from .. import database, models, auth
import os
import requests
import hmac
import hashlib
from typing import Optional

router = APIRouter(prefix="/api/billing", tags=["Billing & Subscriptions"])

FLOW_API_KEY = os.getenv("FLOW_API_KEY")
FLOW_SECRET_KEY = os.getenv("FLOW_SECRET_KEY")
FLOW_API_URL = "https://www.flow.cl/api"  # Produccion

def get_flow_signature(params: dict) -> str:
    sorted_keys = sorted(params.keys())
    to_sign = "".join([f"{k}{params[k]}" for k in sorted_keys])
    return hmac.new(FLOW_SECRET_KEY.encode(), to_sign.encode(), hashlib.sha256).hexdigest()

def ensure_plan_exists():
    """
    Intenta crear el plan si no existe.
    """
    plan_id = "plan-pro-salon-plus-v1"
    
    # 1. Verificar si existe (Get Plan)
    # Flow no tiene un "Get Plan" simple público sin ID, así que intentamos crearlo y si falla asumimos que existe
    # O mejor, usamos /plan/get
    
    params = {"apiKey": FLOW_API_KEY, "planId": plan_id}
    params["s"] = get_flow_signature(params)
    
    res = requests.get(f"{FLOW_API_URL}/plan/get", params=params)
    if res.status_code == 200:
        return plan_id # Ya existe
        
    # 2. Si no existe (o error 400), lo creamos
    create_params = {
        "apiKey": FLOW_API_KEY,
        "planId": plan_id,
        "name": "Suscripción Salon Plus Pro",
        "currency": "CLP",
        "amount": "39990",
        "interval": "3", # 3 = Mensual
        "trial_period_days": "7", # 7 dias gratis
        "days_until_due": "3" # Dias para pagar tras intento fallido
    }
    create_params["s"] = get_flow_signature(create_params)
    
    create_res = requests.post(f"{FLOW_API_URL}/plan/create", data=create_params)
    
    if create_res.status_code == 200 or "ya existe" in create_res.text:
        return plan_id
        
    # Si falla, loguear error (idealmente)
    print("Error creando plan Flow:", create_res.text)
    return plan_id 

@router.post("/subscribe")
async def create_subscription(
    current_user: models.User = Depends(auth.get_current_user),
    db: Session = Depends(database.get_db)
):
    if not FLOW_API_KEY or not FLOW_SECRET_KEY:
        raise HTTPException(status_code=500, detail="Configuración de pagos incompleta")

    try:
        # 1. Asegurar Plan
        plan_id = ensure_plan_exists()
        
        # 2. Crear Cliente en Flow
        # Usamos el email como customerId externo, o creamos uno nuevo
        customer_params = {
            "apiKey": FLOW_API_KEY,
            "customerId": str(current_user.id), # ID interno nuestro
            "name": current_user.business_name or "Usuario Salon Plus",
            "email": current_user.email
        }
        customer_params["s"] = get_flow_signature(customer_params)
        
        # Flow retorna el cliente si ya existe o lo crea
        cust_res = requests.post(f"{FLOW_API_URL}/customer/create", data=customer_params)
        cust_data = cust_res.json()
        
        if "customerId" not in cust_data and "id" not in cust_data:
             # A veces retorna el objeto directo, a veces wrapper. 
             # Si falla:
             if cust_res.status_code != 200 and "ya existe" not in cust_res.text:
                 raise Exception(f"Error creando cliente Flow: {cust_res.text}")

        # 3. Crear Suscripción
        sub_params = {
            "apiKey": FLOW_API_KEY,
            "planId": plan_id,
            "customerId": str(current_user.id),
            "subscription_start": "" # Dejar vacio para iniciar hoy (y aplicar trial del plan)
        }
        sub_params["s"] = get_flow_signature(sub_params)
        
        sub_res = requests.post(f"{FLOW_API_URL}/subscription/create", data=sub_params)
        sub_data = sub_res.json()
        
        if "url" in sub_data:
            return {"checkout_url": sub_data["url"]}
        else:
            raise Exception(f"Error creando suscripción: {sub_res.text}")
            
    except Exception as e:
        print(f"Flow Error: {str(e)}")
        raise HTTPException(status_code=400, detail="No se pudo iniciar el pago. Intente nuevamente.")

@router.post("/webhook/flow")
async def flow_webhook(token: str = Form(...), db: Session = Depends(database.get_db)):
    """
    Recibe notificacion de pago exitoso (subscription_payed o similar)
    """
    # Aquí deberías validar el token con Flow y activar la subscripción
    # requests.get(f"{FLOW_API_URL}/payment/getStatus", params={"apiKey":..., "token": token})
    return {"status": "received"}
