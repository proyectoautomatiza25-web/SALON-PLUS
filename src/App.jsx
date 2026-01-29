import React, { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/Services'
import Pricing from './components/Pricing'
import WhatsAppButton from './components/WhatsAppButton'
import Footer from './components/Footer'
import SaaSApp from './SaaSApp'
import LoginModal from './components/LoginModal'
import DemoRegistration from './components/DemoRegistration'
import { initEmailJS } from './services/emailService'

function App() {
  const [showSaaS, setShowSaaS] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showDemoModal, setShowDemoModal] = useState(false);
  const [isDemoMode, setIsDemoMode] = useState(false);

  // Inicializar EmailJS al cargar la app
  useEffect(() => {
    initEmailJS();
  }, []);

  const handleAdminClick = () => {
    setShowLoginModal(true);
  };

  const handleLoginSuccess = () => {
    setShowSaaS(true);
    setShowLoginModal(false);
    setIsDemoMode(false); // Login normal, no es demo
  };

  const handleDemoSuccess = () => {
    setShowSaaS(true);
    setShowDemoModal(false);
    setIsDemoMode(true); // Modo demo activado
  };

  // Detectar clicks en enlaces #demo
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#demo') {
        setShowDemoModal(true);
        // Limpiar el hash
        window.history.replaceState(null, '', window.location.pathname);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    // Verificar al cargar
    handleHashChange();

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // El modo SaaS se activa desde el enlace "Admin" en el Navbar o desde Demo
  if (showSaaS) {
    return <SaaSApp onLogout={() => setShowSaaS(false)} isDemoMode={isDemoMode} />;
  }

  return (
    <div className="app">
      {/* Navbar con acceso a Admin */}
      <Navbar onAdminLogin={handleAdminClick} />

      {/* Contenido Principal de la Landing SaaS */}
      <Hero />
      <Services />
      <Pricing />
      <Footer />

      {/* Botones Sociales Flotantes */}
      <WhatsAppButton />

      {/* Modal de Login para Profesionales */}
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLogin={handleLoginSuccess}
      />

      {/* Modal de Registro de Demo */}
      {showDemoModal && (
        <DemoRegistration
          onClose={() => setShowDemoModal(false)}
          onSuccess={handleDemoSuccess}
        />
      )}

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
