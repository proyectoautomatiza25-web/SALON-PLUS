import React, { useState } from 'react'
import {
  Coffee, ShoppingBag, MapPin,
  QrCode, Star, ChevronRight, X,
  Instagram, Facebook, Twitter, Plus, Minus, CheckCircle
} from 'lucide-react'
import { useKingdomStore } from './store'

function App() {
  const { menu, cart, user, addToCart, updateQty, checkout } = useKingdomStore();
  const [activeTab, setActiveTab] = useState('inicio');
  const [showCart, setShowCart] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showQRScanner, setShowQRScanner] = useState(false);

  const cartTotal = cart.reduce((acc, i) => acc + (i.price * i.qty), 0);

  const handleCheckout = () => {
    checkout();
    setOrderComplete(true);
    setTimeout(() => {
      setOrderComplete(false);
      setShowCart(false);
    }, 3000);
  }

  const handleScanQR = () => {
    setShowQRScanner(true);
    setTimeout(() => {
      setShowQRScanner(false);
      alert("¡Código Real Escaneado! +50 Coronas añadidas a tu reino.");
    }, 3000);
  }

  return (
    <div className="app-shell">
      {/* Premium Navigation */}
      <nav className="nav flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="premium-gradient brand-logo">
            <Coffee size={24} />
          </div>
          <span className="brand-text">THE KINGDOM <span className="text-gold">COFFEE</span></span>
        </div>

        <div className="hidden-mobile">
          {['INICIO', 'MENÚ', 'SUCURSALES', 'RECOMPENSAS'].map(link => (
            <a
              key={link}
              href="#"
              onClick={(e) => { e.preventDefault(); setActiveTab(link.toLowerCase()); window.scrollTo(0, 0); }}
              className={`nav-link ${activeTab === link.toLowerCase() ? 'active' : ''}`}
            >
              {link}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <button onClick={handleScanQR} className="icon-btn-circle" title="Escanear en tienda">
            <QrCode size={20} />
          </button>
          <button onClick={() => setShowCart(true)} className="icon-btn-circle" style={{ position: 'relative' }}>
            <ShoppingBag size={20} />
            {cart.length > 0 && <span className="cart-badge">{cart.length}</span>}
          </button>
          <div className="user-profile-nav" onClick={() => setActiveTab('recompensas')}>
            <div className="avatar-nav">{user.name.charAt(0)}</div>
            <div className="points-nav">{user.points} pts</div>
          </div>
        </div>
      </nav>

      {/* Main Content Sections */}
      <main>
        {activeTab === 'inicio' && (
          <>
            <section className="hero">
              <div className="hero-bg">
                <div className="hero-overlay" />
                <img src="/hero-coffee.png" alt="Kingdom" className="hero-img" />
              </div>

              <div className="container hero-content">
                <div className="hero-grid">
                  <div className="animate-fade-in">
                    <div className="tag">
                      <Star size={14} fill="currentColor" /> EXPERIENCIA DE ESPECIALIDAD
                    </div>
                    <h1 className="h1">RESCATA <br /> TU <span className="text-gold">REINO</span></h1>
                    <p className="hero-desc">
                      Descubre el café que despierta tu poder. Granos seleccionados de fincas exclusivas, tostados con precisión real.
                    </p>
                    <div className="flex gap-4">
                      <button onClick={() => setActiveTab('menú')} className="btn btn-primary flex items-center gap-2">
                        EXPLORAR EL MENÚ <ChevronRight size={18} />
                      </button>
                      <button onClick={() => setActiveTab('sucursales')} className="btn btn-ghost">NUESTRAS SEDES</button>
                    </div>
                  </div>

                  <div className="flex-end animate-fade-in delay-200">
                    <div className="glass-card card-reward" onClick={() => setActiveTab('recompensas')}>
                      <div className="flex justify-between mb-10">
                        <div className="premium-gradient brand-logo">
                          <QrCode size={24} />
                        </div>
                        <div className="text-right">
                          <p className="points-label">SALDO PUNTOS</p>
                          <p className="points-value">{user.points.toLocaleString()}</p>
                        </div>
                      </div>
                      <h3 className="membership-title">Membresía: {user.level}</h3>
                      <div className="progress-bar">
                        <div className="progress-fill" style={{ width: `${(user.points / user.nextReward) * 100}%` }} />
                      </div>
                      <p className="points-footer">{user.nextReward - user.points} PTS PARA EL SIGUIENTE NIVEL</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="container grid-3" style={{ paddingBottom: '100px' }}>
              {[
                { icon: MapPin, title: 'Sedes Reales', desc: 'Encuentra tu Kingdom Coffee más cercano.' },
                { icon: ShoppingBag, title: 'Pick Up Express', desc: 'Pide por la app y retira sin esperas.' },
                { icon: Star, title: 'Kingdom Rewards', desc: 'Acumula coronas y canjea cafés gratis.' }
              ].map((item, i) => (
                <div key={i} className="glass-card feature-tile">
                  <div className="brand-logo premium-gradient" style={{ marginBottom: '25px' }}><item.icon size={24} /></div>
                  <h3 style={{ marginBottom: '15px', fontWeight: 900 }}>{item.title}</h3>
                  <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.9rem' }}>{item.desc}</p>
                </div>
              ))}
            </section>
          </>
        )}

        {activeTab === 'menú' && (
          <section className="container section-padding animate-fade-in">
            <h2 className="section-title">Nuestra <span className="text-gold">Carta Real</span></h2>
            <div className="menu-grid">
              {menu.map(item => (
                <div key={item.id} className="glass-card menu-card" onClick={() => setSelectedProduct(item)}>
                  <div className="menu-img-wrapper">
                    <img src={item.image} alt={item.name} className="menu-img" />
                    <span className="menu-category">{item.category}</span>
                  </div>
                  <div className="menu-info">
                    <div className="flex justify-between items-center mb-2">
                      <h3 style={{ fontWeight: 900 }}>{item.name}</h3>
                      <span className="text-gold font-black">${item.price.toLocaleString()}</span>
                    </div>
                    <p className="menu-desc">{item.desc}</p>
                    <button onClick={(e) => { e.stopPropagation(); addToCart(item); }} className="btn btn-primary w-full flex items-center justify-center gap-2 mt-4">
                      <Plus size={18} /> AGREGAR
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {activeTab === 'sucursales' && (
          <section className="container section-padding animate-fade-in">
            <h2 className="section-title">Nuestros <span className="text-gold">Palacios</span></h2>
            <div className="grid-3">
              {[
                { name: 'Kingdom Tobalaba', address: 'Av. Tobalaba 1234, Providencia', distance: '1.2 km', open: true },
                { name: 'Kingdom Los Leones', address: 'Av. Los Leones 567, Providencia', distance: '2.5 km', open: true },
                { name: 'Kingdom Parque Arauco', address: 'Av. Kennedy 5413, Las Condes', distance: '4.8 km', open: false }
              ].map((sed, i) => (
                <div key={i} className="glass-card">
                  <div className="flex justify-between mb-6">
                    <h3 style={{ fontWeight: 900 }}>{sed.name}</h3>
                    <span className={`branch-status ${sed.open ? 'open' : 'closed'}`}>{sed.open ? '● Abierto' : '● Cerrado'}</span>
                  </div>
                  <p className="branch-address">{sed.address}</p>
                  <div className="branch-distance">
                    <MapPin size={14} /> {sed.distance}
                  </div>
                  <button className="btn btn-ghost w-full">¿CÓMO LLEGAR?</button>
                </div>
              ))}
            </div>
          </section>
        )}

        {activeTab === 'recompensas' && (
          <section className="container section-padding animate-fade-in">
            <h2 className="section-title">Tu <span className="text-gold">Reino de Beneficios</span></h2>
            <div className="rewards-layout">
              <div className="glass-card profile-card">
                <div className="avatar-big">{user.name.charAt(0)}</div>
                <h3 className="user-name">{user.name}</h3>
                <p className="user-level-badge">{user.level}</p>
                <div className="credit-box">
                  <p className="credit-label">CRÉDITO REAL</p>
                  <p className="credit-value">${(user.points * 10).toLocaleString()}</p>
                </div>
              </div>
              <div className="rewards-actions">
                <div className="glass-card offer-card">
                  <div>
                    <h4 className="offer-title">CAFÉ GRATIS DISPONIBLE</h4>
                    <p className="offer-desc">Canjea tu Espresso Real o Capuchino Imperial ahora.</p>
                  </div>
                  <button className="btn btn-primary">CANJEAR</button>
                </div>
                <div className="glass-card qr-big-card" onClick={handleScanQR}>
                  <QrCode size={48} className="text-gold mb-4" />
                  <h4 className="offer-title">ESCANEAR EN SUCURSAL</h4>
                  <p className="offer-desc">Escanea el código en caja para acumular coronas automáticamente.</p>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      {/* Cart Drawer Overlay */}
      {showCart && (
        <div className="modal-overlay animate-fade-in" onClick={() => setShowCart(false)}>
          <div className="cart-drawer animate-fade-in" onClick={e => e.stopPropagation()} style={{ position: 'absolute', right: 0 }}>
            <div style={{ padding: '40px' }}>
              <div className="flex justify-between items-center mb-10">
                <h2 style={{ fontSize: '1.8rem', fontWeight: 900 }}>Tu <span className="text-gold">Pedido</span></h2>
                <button onClick={() => setShowCart(false)} className="close-btn-round"><X size={24} /></button>
              </div>

              {orderComplete ? (
                <div style={{ textAlign: 'center', padding: '100px 0' }}>
                  <CheckCircle size={80} className="text-gold mb-6" />
                  <h3 style={{ fontSize: '2rem', fontWeight: 900 }}>¡CONQUISTA COMPLETADA!</h3>
                  <p style={{ color: 'rgba(255,255,255,0.4)', marginTop: '10px' }}>Estamos preparando tu tesoro.</p>
                </div>
              ) : cart.length > 0 ? (
                <>
                  <div className="cart-items">
                    {cart.map(item => (
                      <div key={item.id} style={{ display: 'flex', gap: '20px', marginBottom: '30px', borderBottom: '1px solid var(--border)', paddingBottom: '20px' }}>
                        <img src={item.image} style={{ width: '80px', height: '80px', borderRadius: '16px', objectFit: 'cover' }} />
                        <div style={{ flex: 1 }}>
                          <h4 style={{ fontWeight: 900 }}>{item.name}</h4>
                          <p className="text-gold" style={{ fontWeight: 800 }}>${item.price.toLocaleString()}</p>
                          <div className="flex items-center gap-4 mt-3">
                            <button onClick={() => updateQty(item.id, -1)} className="qty-btn"><Minus size={14} /></button>
                            <span style={{ fontWeight: 900 }}>{item.qty}</span>
                            <button onClick={() => updateQty(item.id, 1)} className="qty-btn"><Plus size={14} /></button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div style={{ textAlign: 'center', padding: '100px 0', opacity: 0.2 }}>
                  <ShoppingBag size={80} />
                  <p style={{ marginTop: '20px', fontWeight: 800 }}>TU TESORO ESTÁ VACÍO</p>
                </div>
              )}
            </div>

            {!orderComplete && cart.length > 0 && (
              <div className="cart-footer">
                <div className="flex justify-between items-center mb-8">
                  <span style={{ color: 'rgba(255,255,255,0.4)', fontWeight: 800 }}>TOTAL A PAGAR</span>
                  <span style={{ fontSize: '2rem', fontWeight: 900 }}>${cartTotal.toLocaleString()}</span>
                </div>
                <button onClick={handleCheckout} className="btn btn-primary w-full py-6 text-xl">PROCESAR PEDIDO REAL</button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div className="modal-overlay animate-fade-in" onClick={() => setSelectedProduct(null)}>
          <div className="glass-card modal-product animate-slide" onClick={e => e.stopPropagation()}>
            <div className="modal-grid-detail">
              <img src={selectedProduct.image} className="modal-product-img" alt={selectedProduct.name} />
              <div className="modal-product-info">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <span className="tag">{selectedProduct.category}</span>
                    <h2 style={{ fontSize: '2.5rem', fontWeight: 900, lineHeight: 1 }}>{selectedProduct.name}</h2>
                  </div>
                  <button onClick={() => setSelectedProduct(null)} className="close-btn-round"><X size={24} /></button>
                </div>
                <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1.1rem', marginBottom: '40px' }}>{selectedProduct.desc}</p>
                <div className="flex justify-between items-center mb-8">
                  <span style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--primary)' }}>${selectedProduct.price.toLocaleString()}</span>
                  <button onClick={() => { addToCart(selectedProduct); setSelectedProduct(null); }} className="btn btn-primary py-6 px-10 text-xl">
                    AÑADIR A MI CONQUISTA
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* QR Scanner Simulation */}
      {showQRScanner && (
        <div className="modal-overlay flex items-center justify-center animate-fade-in" style={{ zIndex: 1000 }}>
          <div className="qr-scanner-box">
            <div className="qr-guide-corners" />
            <div className="qr-scan-line" />
            <div className="qr-text">
              <h3>BUSCANDO CÓDIGO REAL...</h3>
              <p>Apunta al código en la caja</p>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer style={{ padding: '80px 0', borderTop: '1px solid var(--border)', background: '#050505' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '60px' }}>
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="premium-gradient brand-logo"><Coffee size={20} /></div>
              <span className="brand-text">THE KINGDOM <span className="text-gold">COFFEE</span></span>
            </div>
            <p style={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.85rem' }}>El café oficial de los que conquistan el mundo todos los días.</p>
          </div>
          <div>
            <h4 style={{ fontWeight: 900, marginBottom: '20px', fontSize: '0.8rem', letterSpacing: '2px' }}>SÍGUENOS</h4>
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
