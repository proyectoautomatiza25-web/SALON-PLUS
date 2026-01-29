import React from 'react'
import { MessageCircle } from 'lucide-react'

const WhatsAppButton = () => {
  const whatsappUrl = "https://wa.me/56975912621?text=Hola,%20vengo%20de%20la%20web%20y%20quisiera%20agendar%20una%20hora%20en%20el%20Centro%20Médico."

  return (
    <div className="social-floating">
      {/* Solo WhatsApp por solicitud, con alta visibilidad */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="social-btn btn-whatsapp"
        title="Háblanos por WhatsApp"
      >
        <MessageCircle size={40} strokeWidth={2.5} />
      </a>

      <style>{`
        .social-floating {
          position: fixed;
          right: 2.5rem;
          bottom: 2.5rem;
          z-index: 9999;
        }

        .social-btn {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          display: flex;
          alignItems: center;
          justify-content: center;
          color: white;
          box-shadow: 0 15px 35px rgba(37, 211, 102, 0.4);
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          cursor: pointer;
          background: #25d366;
          border: 4px solid white;
        }

        .social-btn:hover {
          transform: scale(1.15) rotate(5deg);
          box-shadow: 0 20px 45px rgba(37, 211, 102, 0.5);
        }

        @media (max-width: 768px) {
          .social-floating {
            right: 1.5rem;
            bottom: 1.5rem;
          }
          .social-btn {
            width: 70px;
            height: 70px;
          }
        }
      `}</style>
    </div>
  )
}

export default WhatsAppButton
