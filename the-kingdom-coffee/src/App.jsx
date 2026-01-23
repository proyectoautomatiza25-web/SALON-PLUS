import React, { useState } from 'react'
import {
  Coffee, ShoppingBag, User, MapPin,
  QrCode, Star, ChevronRight, Menu, X,
  Instagram, Facebook, Twitter, Plus, Minus, CheckCircle
} from 'lucide-react'
import { useKingdomStore } from './store'

function App() {
  const { menu, cart, user, addToCart, updateQty, removeFromCart, checkout } = useKingdomStore();
  const [activeTab, setActiveTab] = useState('menu');
  const [showCart, setShowCart] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  const cartTotal = cart.reduce((acc, i) => acc + (i.price * i.qty), 0);

  const handleCheckout = () => {
    checkout();
    setOrderComplete(true);
    setTimeout(() => {
      setOrderComplete(false);
      setShowCart(false);
    }, 3000);
  }

  return (
    <div className="app-shell">
      {/* Premium Navigation */}
      <nav className="nav flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="premium-gradient" style={{ width: '40px', height: '40px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
            <Coffee size={24} />
          </div>
          <span style={{ fontSize: '1.2rem', fontWeight: 900, letterSpacing: '-1px' }}>THE KINGDOM <span className="text-gold">COFFEE</span></span>
        </div>

        <div className="hidden-mobile" style={{ display: 'flex', gap: '30px' }}>
          {['INICIO', 'MENÚ', 'SUCURSALES', 'RECOMPENSAS'].map(link => (
            <a key={link} href="#" onClick={() => setActiveTab(link.toLowerCase())} style={{ textDecoration: 'none', color: activeTab === link.toLowerCase() ? 'var(--primary)' : 'rgba(255,255,255,0.7)', fontSize: '0.8rem', fontWeight: 800 }}>{link}</a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setShowCart(true)}
            style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', border: 'none', color: 'white', position: 'relative' }}
          >
            <ShoppingBag size={20} />
            {cart.length > 0 && <span className="cart-badge">{cart.length}</span>}
          </button>
          <div className="user-profile-nav">
            <div className="avatar-nav">{user.name.charAt(0)}</div>
            <div className="points-nav">{user.points} pts</div>
          </div>
        </div>
      </nav>

      {/* Hero Content (Persistent for landing) */}
      {activeTab === 'inicio' && (
        <>
          <section className="hero">
            <div className="hero-bg">
              <div className="hero-overlay" />
              <img src="/hero-coffee.png" alt="Kingdom" className="hero-img" />
            </div>

            <div className="container hero-content">
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', alignItems: 'center', gap: '60px' }}>
                <div className="animate-fade-in">
                  <div className="tag">
                    <Star size={14} fill="currentColor" /> EXPERIENCIA DE ESPECIALIDAD
                  </div>
                  <h1 className="h1">RESCATA <br /> TU <span className="text-gold">REINO</span></h1>
                  <p style={{ color: 'rgba(255,255,255,0.6)', maxWidth: '450px', fontSize: '1.1rem', marginBottom: '40px' }}>
                    Descubre el café que despierta tu poder. Granos seleccionados de fincas exclusivas, tostados con precisión real.
                  </p>
                  <div className="flex gap-4">
                    <button onClick={() => setActiveTab('menú')} className="btn btn-primary flex items-center gap-2">
                      EXPLORAR EL MENÚ <ChevronRight size={18} />
                    </button>
                    <button className="btn btn-ghost">NUESTRAS SEDES</button>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end' }} className="animate-fade-in delay-200">
                  <div className="glass-card card-reward">
                    <div className="flex justify-between" style={{ marginBottom: '40px' }}>
                      <div style={{ width: '50px', height: '50px', borderRadius: '14px', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }} className="premium-gradient">
                        <QrCode size={28} />
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <p style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.4)', fontWeight: 800 }}>SALDO PUNTOS</p>
                        <p style={{ fontSize: '1.8rem', fontWeight: 900 }} className="text-gold">{user.points.toLocaleString()}</p>
                      </div>
                    </div>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 900, marginBottom: '5px' }}>Membresia: {user.level}</h3>
                    <div style={{ height: '6px', width: '100%', background: 'rgba(255,255,255,0.1)', borderRadius: '10px', overflow: 'hidden', marginTop: '20px' }}>
                      <div style={{ height: '100%', width: `${(user.points / user.nextReward) * 100}%` }} className="premium-gradient" />
                    </div>
                    <p style={{ textAlign: 'right', fontSize: '10px', marginTop: '10px', color: 'rgba(255,255,255,0.3)', fontWeight: 800 }}>{user.nextReward - user.points} PTS PARA EL SIGUIENTE NIVEL</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="container features-grid grid-3">
            {[
              { icon: MapPin, title: 'Sedes Reales', desc: 'Encuentra tu Kingdom Coffee más cercano.' },
              { icon: ShoppingBag, title: 'Pick Up Express', desc: 'Pide por la app y retira sin esperas.' },
              { icon: Star, title: 'Kingdom Rewards', desc: 'Acumula coronas y canjea cafés gratis.' }
            ].map((item, i) => (
              <div key={i} className="glass-card feature-tile">
                <div className="feature-icon"><item.icon size={32} /></div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </section>
        </>
      )}

      {/* Dynamic Menu Section */}
      {activeTab === 'menú' && (
        <section className="container animate-fade-in" style={{ paddingTop: '120px', paddingBottom: '100px' }}>
          <h2 className="section-title">Nuestra <span className="text-gold">Carta Real</span></h2>
          <div className="menu-grid">
            {menu.map(item => (
              <div key={item.id} className="glass-card menu-card">
                <div className="menu-img-wrapper">
                  <img src={item.image} alt={item.name} className="menu-img" />
                  <span className="menu-category">{item.category}</span>
                </div>
                <div className="menu-info">
                  <div className="flex justify-between items-center mb-2">
                    <h3>{item.name}</h3>
                    <span className="text-gold font-black">${item.price.toLocaleString()}</span>
                  </div>
                  <p className="menu-desc">{item.desc}</p>
                  <button onClick={() => addToCart(item)} className="btn btn-primary w-full flex items-center justify-center gap-2 mt-4">
                    <Plus size={18} /> AGREGAR AL PEDIDO
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Cart Drawer */}
      {showCart && (
        <div className="cart-overlay animate-fade-in">
          <div className="cart-drawer px-8 py-10">
            <div className="flex justify-between items-center mb-10">
              <h2 style={{ fontSize: '1.5rem', fontWeight: 900 }}>Tu <span className="text-gold">Pedido</span></h2>
              <button onClick={() => setShowCart(false)} className="close-btn"><X size={24} /></button>
            </div>

            {orderComplete ? (
              <div className="order-success">
                <CheckCircle size={64} className="text-gold mb-4" />
                <h3>¡Conquista completada!</h3>
                <p>Estamos preparando tu tesoro. Te avisaremos cuando esté listo para retiro.</p>
              </div>
            ) : cart.length > 0 ? (
              <>
                <div className="cart-items">
                  {cart.map(item => (
                    <div key={item.id} className="cart-item border-b border-white/5 py-6">
                      <div className="flex items-center gap-4">
                        <img src={item.image} style={{ width: '60px', height: '60px', borderRadius: '12px', objectFit: 'cover' }} />
                        <div style={{ flex: 1 }}>
                          <h4 style={{ fontSize: '0.9rem', fontWeight: 800 }}>{item.name}</h4>
                          <p style={{ fontSize: '0.8rem', color: 'var(--primary)' }}>${item.price.toLocaleString()}</p>
                        </div>
                        <div className="qty-controls flex items-center gap-3">
                          <button onClick={() => updateQty(item.id, -1)} className="qty-btn"><Minus size={14} /></button>
                          <span style={{ fontWeight: 900, minWidth: '20px', textAlign: 'center' }}>{item.qty}</span>
                          <button onClick={() => updateQty(item.id, 1)} className="qty-btn"><Plus size={14} /></button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="cart-footer">
                  <div className="flex justify-between mb-6">
                    <span style={{ fontWeight: 700, color: 'rgba(255,255,255,0.4)' }}>Total a pagar</span>
                    <span style={{ fontSize: '1.5rem', fontWeight: 900 }}>${cartTotal.toLocaleString()}</span>
                  </div>
                  <button onClick={handleCheckout} className="btn btn-primary w-full py-5 text-lg">PROCESAR PEDIDO REAL</button>
                </div>
              </>
            ) : (
              <div className="empty-cart">
                <ShoppingBag size={48} className="mb-4 opacity-20" />
                <p>Tu tesoro está vacío. Agrega algo del menú.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer style={{ padding: '100px 0', borderTop: '1px solid var(--border)', background: '#050505' }}>
        <div className="container footer-content">
          <div className="footer-brand">
            <div className="flex items-center gap-2 mb-8">
              <div className="premium-gradient" style={{ width: '40px', height: '40px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                <Coffee size={24} />
              </div>
              <span style={{ fontSize: '1.2rem', fontWeight: 900, letterSpacing: '-1px' }}>THE KINGDOM <span className="text-gold">COFFEE</span></span>
            </div>
            <p style={{ color: 'rgba(255,255,255,0.3)', maxWidth: '350px' }}>El café oficial de los que conquistan el mundo todos los días.</p>
            <div className="flex gap-4 mt-8">
              <Instagram size={20} className="text-gold hover-scale" />
              <Facebook size={20} className="text-gold hover-scale" />
              <Twitter size={20} className="text-gold hover-scale" />
            </div>
          </div>
          <div className="footer-links">
            <h4 className="footer-title">COMPAÑÍA</h4>
            {['Nosotros', 'Sedes', 'Franquicias', 'Contacto'].map(l => (
              <a key={l} href="#" className="footer-link">{l}</a>
            ))}
          </div>
          <div className="footer-links">
            <h4 className="footer-title">LEGAL</h4>
            {['Privacidad', 'Términos', 'Cookies', 'Propiedad'].map(l => (
              <a key={l} href="#" className="footer-link">{l}</a>
            ))}
          </div>
        </div>
      </footer>

      {/* Global CSS Inject (for rapid dev) - Normally in index.css */}
      <style dangerouslySetInnerHTML={{
        __html: `
        .app-shell { background: var(--bg-dark); min-height: 100vh; }
        .hidden-mobile { display: flex; }
        .cart-badge { position: absolute; top: -5px; right: -5px; background: var(--primary); color: white; font-size: 10px; font-weight: 900; width: 18px; height: 18px; border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 2px solid var(--bg-dark); }
        .user-profile-nav { display: flex; align-items: center; gap: 10px; background: rgba(255,255,255,0.05); padding: 4px 12px; border-radius: 50px; border: 1px solid var(--border); }
        .avatar-nav { width: 24px; height: 24px; border-radius: 50%; background: var(--primary-gradient); color: white; display: flex; align-items: center; justify-content: center; font-size: 10px; font-weight: 900; }
        .points-nav { color: var(--primary); font-size: 0.75rem; font-weight: 800; }
        .section-title { font-size: 3rem; font-weight: 900; text-align: center; margin-bottom: 60px; text-transform: uppercase; letter-spacing: -1px; }
        .menu-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 30px; }
        .menu-card { padding: 0 !important; overflow: hidden; transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
        .menu-card:hover { transform: translateY(-10px); }
        .menu-img-wrapper { position: relative; height: 200px; }
        .menu-img { width: 100%; height: 100%; object-fit: cover; }
        .menu-category { position: absolute; top: 15px; left: 15px; background: rgba(0,0,0,0.6); backdrop-filter: blur(5px); color: var(--primary); font-size: 10px; font-weight: 900; padding: 4px 12px; border-radius: 50px; text-transform: uppercase; border: 1px solid rgba(201, 160, 99, 0.2); }
        .menu-info { padding: 25px; }
        .menu-info h3 { font-size: 1.2rem; fontWeight: 900; }
        .menu-desc { font-size: 0.85rem; color: rgba(255,255,255,0.4); margin-bottom: 20px; min-height: 45px; }
        .cart-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.8); backdrop-filter: blur(10px); z-index: 1000; display: flex; justify-content: flex-end; }
        .cart-drawer { width: 100%; max-width: 450px; background: #0a0a0a; height: 100%; border-left: 1px solid var(--border); display: flex; flexDirection: column; }
        .cart-items { flex: 1; overflow-y: auto; margin-bottom: 20px; }
        .qty-btn { width: 28px; height: 28px; border-radius: 8px; border: 1px solid var(--border); background: var(--glass); color: white; display: flex; align-items: center; justify-content: center; }
        .qty-btn:hover { background: var(--primary); border-color: var(--primary); }
        .order-success { display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; text-align: center; }
        .order-success h3 { font-size: 1.8rem; font-weight: 900; margin-bottom: 15px; }
        .footer-content { display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 60px; }
        .footer-links { display: flex; flex-direction: column; gap: 12px; }
        .footer-title { font-size: 0.8rem; font-weight: 900; color: white; margin-bottom: 20px; letter-spacing: 2px; }
        .footer-link { text-decoration: none; color: rgba(255,255,255,0.3); font-size: 0.85rem; font-weight: 700; transition: color 0.2s; }
        .footer-link:hover { color: var(--primary); }
        .w-full { width: 100%; }
        @media (max-width: 768px) {
          .footer-content { grid-template-columns: 1fr; }
          .hidden-mobile { display: none; }
          .h1 { font-size: 3rem; }
          .hero-content { padding-top: 100px; }
        }
      ` }} />
    </div>
  )
}

export default App
