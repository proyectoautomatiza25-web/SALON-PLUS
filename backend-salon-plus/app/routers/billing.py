from fastapi import APIRouter, Depends, HTTPException, Request
from sqlalchemy.orm import Session
from .. import database, models, auth
import os

router = APIRouter(prefix="/api/billing", tags=["Billing & Subscriptions"])

@router.post("/create-subscription")
async def create_subscription(
    plan_id: str = None,
    current_user: models.User = Depends(auth.get_current_user)
):
    """
    Endpoint de suscripción (Provisionalmente deshabilitado para Mercado Pago).
    En espera de integración con Flow.
    """
    raise HTTPException(status_code=501, detail="El sistema de pagos está siendo actualizado a Flow. Por favor, contacte a soporte.")

@router.post("/webhook/flow")
async def flow_webhook(request: Request, db: Session = Depends(database.get_db)):
    """
    Placeholder para futura integración con Flow.
    """
    return {"status": "waiting_for_implementation"}
