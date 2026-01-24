import React, { useState, useEffect } from 'react'
import {
  Coffee, ShoppingBag, MapPin,
  QrCode, Star, ChevronRight, X,
  Plus, Minus, CheckCircle, Bell,
  Search, ArrowLeft
} from 'lucide-react'
import { useKingdomStore } from './store'

function App() {
  const { menu, cart, user, addToCart, updateQty, checkout } = useKingdomStore();
  const [activeTab, setActiveTab] = useState('inicio');
  const [showCart, setShowCart] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showToast, setShowToast] = useState(false);

  const cartTotal = cart.reduce((acc, i) => acc + (i.price * i.qty), 0);

  const triggerToast = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  }

  const handleAddToCart = (item) => {
    addToCart(item);
    triggerToast();
  }

  return (
    <div className="kingdom-app-surface">
      {/* App Header (Top Notch Area) */}
      <header className="app-header">
        <div className="brand-title">
          THE KINGDOM <span className="gold-text">APP</span>
        </div>
        <div style={{ display: 'flex', gap: '15px' }}>
          <button className="icon-btn-circle" style={{ background: 'rgba(255,255,255,0.08)' }}><Bell size={20} /></button>
          <div className="avatar-nav" style={{ width: '36px', height: '36px', fontSize: '14px' }}>{user.name.charAt(0)}</div>
        </div>
      </header>

      {/* Floating Toast Notification */}
      {showToast && (
        <div className="toast-premium">
          <CheckCircle size={20} />
          <span>AGREGADO A TU PEDIDO</span>
        </div>
      )}

      {/* Dynamic Content Area */}
      <main className="app-content">

        {activeTab === 'inicio' && (
          <div className="animate-app-slide">
            <div className="hero-card">
              <img src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&q=80" className="hero-img" alt="Hero" />
              <div className="hero-overlay">
                <div className="tag" style={{ border: 'none', background: 'var(--primary)', color: '#000', marginBottom: '10px' }}>OFERTA REAL</div>
                <h1 style={{ fontSize: '2.2rem', lineHeight: 1, fontWeight: 900 }}>COSECHA DE <br /><span className="gold-text">INVIERNO</span></h1>
                <p style={{ fontSize: '0.9rem', color: '#ccc', marginTop: '10px' }}>25% de descuento en Cold Brews exclusivos.</p>
              </div>
            </div>

            <h2 className="section-label">Para ti ahora <ArrowLeft size={18} style={{ transform: 'rotate(180deg)' }} /></h2>
            <div className="cat-slider">
              {['Favoritos', 'Especiales', 'En Grano', 'Promos'].map((c, i) => (
                <div key={i} className={`cat-pill ${i === 0 ? 'active' : ''}`}>{c}</div>
              ))}
            </div>

            <div className="menu-grid">
              {menu.slice(0, 4).map(item => (
                <div key={item.id} className="app-card" onClick={() => setSelectedProduct(item)}>
                  <img src={item.image} className="card-img" />
                  <h4 style={{ fontSize: '0.9rem', marginBottom: '4px' }}>{item.name}</h4>
                  <p className="card-price">${item.price.toLocaleString()}</p>
                </div>
              ))}
            </div>

            <div className="status-card" style={{ marginTop: '30px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h3 style={{ fontWeight: 900 }}>TU REINO</h3>
                  <p style={{ color: 'var(--primary)', fontSize: '0.8rem', fontWeight: 800 }}>RANGO: {user.level.split(' ')[0]}</p>
                </div>
                <QrCode size={30} className="gold-text" />
              </div>
              <div className="progress-track">
                <div className="progress-bar" style={{ width: '65%' }} />
              </div>
              <p style={{ fontSize: '0.7rem', color: '#777', textAlign: 'center' }}>FALTAN 750 PTS PARA EL SIGUIENTE NIVEL</p>
            </div>
          </div>
        )}

        {activeTab === 'menú' && (
          <div className="animate-app-slide">
            <h2 className="section-label" style={{ fontSize: '1.8rem', marginBottom: '30px' }}>Carta Real</h2>
            <div className="search-bar" style={{ background: '#1c1f26', padding: '16px', borderRadius: '18px', display: 'flex', gap: '12px', marginBottom: '25px', border: '1px solid rgba(255,255,255,0.05)' }}>
              <Search size={20} color="#666" />
              <input placeholder="¿Qué se te antoja hoy?" style={{ background: 'none', border: 'none', color: '#fff', outline: 'none', width: '100%' }} />
            </div>

            <div className="menu-grid">
              {menu.map(item => (
                <div key={item.id} className="app-card" onClick={() => setSelectedProduct(item)}>
                  <div style={{ position: 'relative' }}>
                    <img src={item.image} className="card-img" />
                    <button
                      className="icon-btn-circle"
                      style={{ position: 'absolute', bottom: '8px', right: '8px', background: 'var(--primary)', color: '#000', width: '32px', height: '32px' }}
                      onClick={(e) => { e.stopPropagation(); handleAddToCart(item); }}
                    >
                      <Plus size={18} />
                    </button>
                  </div>
                  <h4 style={{ fontSize: '0.9rem', marginBottom: '4px' }}>{item.name}</h4>
                  <p className="card-price">${item.price.toLocaleString()}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'mapa' && (
          <div className="animate-app-slide">
            <h2 className="section-label">Sucursales</h2>
            <div style={{ background: '#1c1f26', height: '250px', borderRadius: '32px', marginBottom: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(255,255,255,0.05)' }}>
              <MapPin size={40} className="gold-text" />
            </div>
            {[
              { name: 'Palacio Tobalaba', dist: '1.2km' },
              { name: 'Corte Los Leones', dist: '2.5km' }
            ].map((s, i) => (
              <div key={i} className="app-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', padding: '20px' }}>
                <h4 style={{ fontWeight: 800 }}>{s.name}</h4>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary)', fontSize: '0.8rem', fontWeight: 900 }}>
                  <MapPin size={14} /> {s.dist}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'club' && (
          <div className="animate-app-slide">
            <h2 className="section-label">Kingdom Club</h2>
            <div className="status-card" style={{ height: '240px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
              <div className="avatar-big" style={{ width: '80px', height: '80px', marginBottom: '15px' }}>{user.name.charAt(0)}</div>
              <h3 style={{ fontWeight: 900 }}>{user.name}</h3>
              <p className="gold-text" style={{ fontWeight: 800 }}>{user.level}</p>
            </div>

            <div className="app-card" style={{ padding: '24px', borderStyle: 'dashed', borderColor: 'var(--primary)' }}>
              <h4 style={{ color: 'var(--primary)', marginBottom: '8px' }}>RECOMPENSA DISPONIBLE</h4>
              <p style={{ fontSize: '0.8rem', opacity: 0.6 }}>Canjea un Muffin Real ahora.</p>
              <button className="btn btn-primary" style={{ width: '100%', marginTop: '15px', padding: '12px' }}>CANJEAR</button>
            </div>
          </div>
        )}

      </main>

      {/* Floating Cart Button */}
      {cart.length > 0 && !showCart && (
        <button className="cart-floating-btn animate-app-slide" onClick={() => setShowCart(true)}>
          <ShoppingBag size={24} color="#000" />
          <span style={{ position: 'absolute', top: '-5px', right: '-5px', background: '#fff', color: '#000', fontSize: '12px', fontWeight: 900, width: '22px', height: '22px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{cart.length}</span>
        </button>
      )}

      {/* Bottom Nav Controller */}
      <nav className="app-nav">
        {[
          { id: 'inicio', label: 'INICIO', icon: Star },
          { id: 'menú', label: 'ORDENAR', icon: Coffee },
          { id: 'mapa', label: 'SEDES', icon: MapPin },
          { id: 'club', label: 'CLUB', icon: QrCode }
        ].map(tab => (
          <div
            key={tab.id}
            className={`nav-item ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => { setActiveTab(tab.id); window.scrollTo(0, 0); }}
          >
            <tab.icon size={22} fill={activeTab === tab.id ? 'currentColor' : 'none'} />
            <span>{tab.label}</span>
            <div className="nav-indicator" />
          </div>
        ))}
      </nav>

      {/* Product Detail Overlay */}
      {selectedProduct && (
        <div className="full-screen-modal animate-app-slide">
          <div style={{ position: 'relative', height: '50%' }}>
            <img src={selectedProduct.image} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <button
              className="icon-btn-circle"
              style={{ position: 'absolute', top: '40px', left: '24px', background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(10px)' }}
              onClick={() => setSelectedProduct(null)}
            >
              <ArrowLeft size={24} />
            </button>
          </div>
          <div style={{ flex: 1, padding: '30px', background: 'var(--bg-app)', borderTopLeftRadius: '32px', borderTopRightRadius: '32px', marginTop: '-32px', position: 'relative' }}>
            <div className="tag" style={{ border: 'none', background: 'rgba(212, 175, 55, 0.1)', color: 'var(--primary)', marginBottom: '15px' }}>{selectedProduct.category}</div>
            <h2 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '10px' }}>{selectedProduct.name}</h2>
            <p style={{ color: '#aaa', lineHeight: 1.6, marginBottom: '30px' }}>{selectedProduct.desc}</p>

            <div style={{ position: 'absolute', bottom: '40px', left: '24px', right: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <p style={{ fontSize: '0.8rem', opacity: 0.5, fontWeight: 700 }}>PRECIO</p>
                <p style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--primary)' }}>${selectedProduct.price.toLocaleString()}</p>
              </div>
              <button
                className="btn btn-primary"
                style={{ padding: '20px 40px', fontSize: '1rem' }}
                onClick={() => { handleAddToCart(selectedProduct); setSelectedProduct(null); }}
              >
                AGREGAR
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cart Drawer */}
      {showCart && (
        <div className="full-screen-modal animate-app-slide" style={{ padding: '40px 24px' }}>
          <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
            <h2 style={{ fontSize: '2rem', fontWeight: 900 }}>MI <span className="gold-text">PEDIDO</span></h2>
            <button className="icon-btn-circle" style={{ background: 'rgba(255,255,255,0.05)' }} onClick={() => setShowCart(false)}><X size={30} /></button>
          </header>

          <div style={{ flex: 1, overflowY: 'auto' }}>
            {cart.map(item => (
              <div key={item.id} style={{ display: 'flex', gap: '20px', marginBottom: '24px', background: '#1c1f26', padding: '16px', borderRadius: '24px' }}>
                <img src={item.image} style={{ width: '80px', height: '80px', borderRadius: '16px', objectFit: 'cover' }} />
                <div style={{ flex: 1 }}>
                  <h4 style={{ fontWeight: 800 }}>{item.name}</h4>
                  <p className="gold-text" style={{ fontWeight: 900 }}>${item.price.toLocaleString()}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginTop: '10px' }}>
                    <button className="qty-btn" onClick={() => updateQty(item.id, -1)}><Minus size={14} /></button>
                    <span style={{ fontWeight: 900 }}>{item.qty}</span>
                    <button className="qty-btn" onClick={() => updateQty(item.id, 1)}><Plus size={14} /></button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ paddingTop: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
              <span style={{ opacity: 0.5, fontWeight: 800 }}>TOTAL</span>
              <span style={{ fontSize: '1.8rem', fontWeight: 900 }}>${cartTotal.toLocaleString()}</span>
            </div>
            <button
              className="btn btn-primary"
              style={{ width: '100%', padding: '24px' }}
              onClick={() => { checkout(); setShowCart(false); alert("¡ORDEN ENVIADA!"); }}
            >
              FINALIZAR COMPRA REAL
            </button>
          </div>
        </div>
      )}

    </div>
  )
}

export default App
