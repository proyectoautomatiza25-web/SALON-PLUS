import React, { useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/Services'
import Team from './components/Team'
import WhatsAppButton from './components/WhatsAppButton' // This now contains both WA and IG
import Footer from './components/Footer'
import SaaSApp from './SaaSApp'
import LoginModal from './components/LoginModal'

function App() {
  const [showSaaS, setShowSaaS] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleAdminClick = () => {
    setShowLoginModal(true);
  };

  const handleLoginSuccess = () => {
    setShowSaaS(true);
    setShowLoginModal(false);
  };

  // El modo SaaS se activa desde el enlace "Admin" en el Navbar
  if (showSaaS) {
    return <SaaSApp onLogout={() => setShowSaaS(false)} />;
  }

  return (
    <div className="app">
      {/* Navbar con acceso a Admin */}
      <Navbar onAdminLogin={handleAdminClick} />

      {/* Contenido Principal de la Clínica */}
      <Hero />
      <Services />
      <Team />
      <Footer />

      {/* Botones Sociales Flotantes Re-diseñados (WA e IG) */}
      <WhatsAppButton />

      {/* Modal de Login para Profesionales */}
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLogin={handleLoginSuccess}
      />

      <style>{`
        .app {
          background-color: var(--bg-color);
          min-height: 100vh;
        }
      `}</style>
    </div>
  )
}

export default App
