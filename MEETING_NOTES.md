# Notas de Reunión y Futuras Mejoras - Agenda Plus

## Pendientes para próxima reunión

### Integración FONASA vía WhatsApp
- **Estrategia "Bono-Bot":** Automatizar el flujo de compra de bonos.
  - El sistema detecta paciente FONASA.
  - Envía mensaje automático por WhatsApp con:
    - Link directo de compra (Precompra Fonasa).
    - Código de prestación exacto.
  - Instrucción para que el paciente suba el PDF del bono al mismo chat.
  - Sistema captura el PDF y lo adjunta a la ficha (requiere integración Twilio/WhatsApp API).
