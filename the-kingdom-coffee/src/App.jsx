import React, { useState } from 'react'
import {
  Coffee, ShoppingBag, User, MapPin,
  QrCode, Star, ChevronRight, Menu, X,
  Instagram, Facebook, Twitter
} from 'lucide-react'

function App() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div>
      {/* Navigation */}
      <nav className="nav flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div style={{ width: '40px', height: '40px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }} className="premium-gradient">
            <Coffee size={24} />
          </div>
          <span style={{ fontSize: '1.2rem', fontBlack: '900', letterSpacing: '-1px', fontWeight: 900 }}>THE KINGDOM <span className="text-gold">COFFEE</span></span>
        </div>

        <div className="hidden md-flex" style={{ display: 'flex', gap: '30px' }}>
          {['INICIO', 'MENÚ', 'SUCURSALES', 'RECOMPENSAS'].map(link => (
            <a key={link} href="#" style={{ textDecoration: 'none', color: 'rgba(255,255,255,0.7)', fontSize: '0.8rem', fontWeight: 800 }}>{link}</a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <button style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', border: 'none', color: 'white' }} className="items-center">
            <ShoppingBag size={20} />
          </button>
          <button className="btn btn-primary">PEDIR AHORA</button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-bg">
          <div className="hero-overlay" />
          <img src="/hero-coffee.png" alt="Kingdom" className="hero-img" />
        </div>

        <div className="container hero-content">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', alignItems: 'center', gap: '60px' }}>
            <div>
              <div className="tag">
                <Star size={14} fill="currentColor" /> EXPERIENCIA DE ESPECIALIDAD
              </div>
              <h1 className="h1">RESCATA <br /> TU <span className="text-gold">REINO</span></h1>
              <p style={{ color: 'rgba(255,255,255,0.6)', maxWidth: '450px', fontSize: '1.1rem', marginBottom: '40px' }}>
                Descubre el café que despierta tu poder. Granos seleccionados de fincas exclusivas, tostados con precisión real.
              </p>
              <div className="flex gap-4">
                <button className="btn btn-primary flex items-center gap-2">
                  EXPLORAR EL MENÚ <ChevronRight size={18} />
                </button>
                <button className="btn btn-ghost">NUESTRAS SEDES</button>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <div className="glass-card card-reward">
                <div className="flex justify-between" style={{ marginBottom: '40px' }}>
                  <div style={{ width: '50px', height: '50px', borderRadius: '14px', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }} className="premium-gradient">
                    <QrCode size={28} />
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.4)', fontWeight: 800 }}>SALDO PUNTOS</p>
                    <p style={{ fontSize: '1.8rem', fontWeight: 900 }} className="text-gold">1,250</p>
                  </div>
                </div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 900, marginBottom: '5px' }}>Tu Membresía Real</h3>
                <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', marginBottom: '25px' }}>Nivel: Emperador Platino</p>
                <div style={{ height: '6px', width: '100%', background: 'rgba(255,255,255,0.1)', borderRadius: '10px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: '65%' }} className="premium-gradient" />
                </div>
                <p style={{ textAlign: 'right', fontSize: '10px', marginTop: '10px', color: 'rgba(255,255,255,0.3)', fontWeight: 800 }}>750 PTS PARA EL SIGUIENTE NIVEL</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container">
        <div className="grid-3">
          {[
            { icon: MapPin, title: 'Cerca de ti', desc: 'Encuentra tu Kingdom Coffee más cercano.' },
            { icon: ShoppingBag, title: 'Pick Up', desc: 'Pide por la app y retira sin esperas.' },
            { icon: Star, title: 'Beneficios', desc: 'Acumula coronas y canjea cafés gratis.' }
          ].map((item, i) => (
            <div key={i} className="glass-card" style={{ padding: '50px', textAlign: 'center' }}>
              <div style={{ width: '70px', height: '70px', borderRadius: '20px', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', margin: '0 auto 30px' }} className="f-icon">
                <item.icon size={32} />
              </div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 900, marginBottom: '15px' }}>{item.title}</h3>
              <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.95rem', marginBottom: '25px' }}>{item.desc}</p>
              <button style={{ background: 'none', border: 'none', color: 'var(--primary)', fontWeight: 900, display: 'flex', alignItems: 'center', gap: '8px', margin: '0 auto' }}>
                SABER MÁS <ChevronRight size={18} />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: '100px 0', borderTop: '1px solid var(--border)' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '60px' }}>
          <div>
            <div className="flex items-center gap-2" style={{ marginBottom: '30px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }} className="premium-gradient">
                <Coffee size={24} />
              </div>
              <span style={{ fontSize: '1.2rem', fontBlack: '900', letterSpacing: '-1px', fontWeight: 900 }}>THE KINGDOM <span className="text-gold">COFFEE</span></span>
            </div>
            <p style={{ color: 'rgba(255,255,255,0.3)', maxWidth: '350px' }}>El café oficial de los que conquistan el mundo todos los días. Únete a la realeza del café de especialidad.</p>
          </div>
          <div>
            <h4 style={{ fontSize: '0.9rem', fontWeight: 900, marginBottom: '25px' }}>COMPAÑÍA</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {['Nosotros', 'Sedes', 'Franquicias', 'Contacto'].map(l => (
                <a key={l} href="#" style={{ textDecoration: 'none', color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem', fontWeight: 700 }}>{l}</a>
              ))}
            </div>
          </div>
          <div>
            <h4 style={{ fontSize: '0.9rem', fontWeight: 900, marginBottom: '25px' }}>SOCIAL</h4>
            <div className="flex gap-4">
              <Instagram size={20} className="text-gold" />
              <Facebook size={20} className="text-gold" />
              <Twitter size={20} className="text-gold" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
