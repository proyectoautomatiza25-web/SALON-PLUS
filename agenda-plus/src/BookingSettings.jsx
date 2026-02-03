import React from 'react';
import { Globe, Copy, ExternalLink, Code, Smartphone } from 'lucide-react';
import { useSaaSStore } from './store';

const BookingSettings = () => {
    const { businessName, user } = useSaaSStore();

    // Generate a slug based on business name if not present
    const slug = user?.booking_slug || (businessName || 'mi-centro').toLowerCase().replace(/\s+/g, '-');
    const bookingUrl = `https://agendaplus.cl/reservar/${slug}`;
    const iframeCode = `<iframe style="overflow: hidden; border-radius: 10px; margin-bottom: 20px;" src="${bookingUrl}" width="100%" height="650" frameborder="0"></iframe><a href="${bookingUrl}">Powered by Agenda Plus</a>`;

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        alert("¡Copiado al portapapeles!");
    };

    return (
        <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>
            <header style={{ marginBottom: '40px' }}>
                <h1 style={{ fontSize: '2.2rem', fontWeight: '900', color: '#004975', marginBottom: '10px' }}>Configuración de Reserva Online</h1>
                <p style={{ color: '#64748b', fontSize: '1.1rem' }}>Gestiona cómo tus pacientes reservan sus citas a través de internet.</p>
            </header>

            <div style={styles.card}>
                <div style={styles.tableHeader}>
                    <div style={{ flex: 0.5 }}>#</div>
                    <div style={{ flex: 1.5 }}>Nombre de la Agenda</div>
                    <div style={{ flex: 3 }}>Url para redes sociales (Slug)</div>
                    <div style={{ flex: 3 }}>Botón de Reserva / Código Web</div>
                    <div style={{ flex: 1.5 }}>Opciones</div>
                </div>

                <div style={styles.tableRow}>
                    <div style={{ flex: 0.5, fontWeight: 'bold' }}>1</div>
                    <div style={{ flex: 1.5 }}>
                        <div style={{ fontWeight: '700' }}>{businessName}</div>
                        <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Agenda Principal</div>
                    </div>
                    <div style={{ flex: 3 }}>
                        <div style={styles.urlBox}>
                            <input readOnly value={bookingUrl} style={styles.urlInput} />
                            <button onClick={() => copyToClipboard(bookingUrl)} style={styles.copyBtn}><Copy size={16} /></button>
                            <button onClick={() => window.open(bookingUrl, '_blank')} style={styles.copyBtn}><ExternalLink size={16} /></button>
                        </div>
                    </div>
                    <div style={{ flex: 3 }}>
                        <div style={styles.codeBox}>
                            <textarea readOnly value={iframeCode} style={styles.codeInput} />
                            <button onClick={() => copyToClipboard(iframeCode)} style={styles.copyBtn}><Code size={16} /></button>
                        </div>
                    </div>
                    <div style={{ flex: 1.5, display: 'flex', gap: '8px' }}>
                        <button style={styles.actionBtnEdit}>Editar</button>
                        <button style={styles.actionBtnDelete}>Eliminar</button>
                    </div>
                </div>
            </div>

            <div style={styles.grid}>
                <div style={styles.miniCard}>
                    <div style={{ color: '#004975', marginBottom: '15px' }}><Globe size={32} /></div>
                    <h3>Tu Mini-Sitio de Reserva</h3>
                    <p>Agenda Plus crea automáticamente una página web profesional para que tus pacientes reserven desde cualquier dispositivo.</p>
                    <button className="btn-primary" style={{ marginTop: '10px', width: '100%' }}>Editar Diseño</button>
                </div>
                <div style={styles.miniCard}>
                    <div style={{ color: '#10b981', marginBottom: '15px' }}><Smartphone size={32} /></div>
                    <h3>WhatsApp Booking</h3>
                    <p>Activa el bot de WhatsApp para que tus pacientes puedan agendar escribiendo directamente a tu número.</p>
                    <button className="btn-primary" style={{ marginTop: '10px', width: '100%', background: '#10b981' }}>Configurar Bot</button>
                </div>
            </div>
        </div>
    );
};

const styles = {
    card: { background: '#fff', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0' },
    tableHeader: { display: 'flex', padding: '15px 25px', background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#64748b', fontWeight: '800', fontSize: '0.8rem', textTransform: 'uppercase' },
    tableRow: { display: 'flex', padding: '25px', alignItems: 'center', transition: 'background 0.2s', borderBottom: '1px solid #f1f5f9' },
    urlBox: { display: 'flex', background: '#f1f5f9', borderRadius: '10px', padding: '5px', gap: '5px', border: '1.5px solid #e2e8f0' },
    urlInput: { border: 'none', background: 'none', outline: 'none', fontSize: '0.85rem', flex: 1, padding: '5px 10px', color: '#475569' },
    copyBtn: { border: 'none', background: '#fff', borderRadius: '8px', padding: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#004975', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' },
    codeBox: { display: 'flex', background: '#1e293b', borderRadius: '10px', padding: '5px', gap: '5px' },
    codeInput: { border: 'none', background: 'none', outline: 'none', fontSize: '0.75rem', flex: 1, padding: '5px 10px', color: '#94a3b8', height: '40px', resize: 'none', fontFamily: 'monospace' },
    actionBtnEdit: { flex: 1, padding: '10px', borderRadius: '10px', border: 'none', background: '#004975', color: '#fff', fontWeight: '700', cursor: 'pointer', fontSize: '0.85rem' },
    actionBtnDelete: { flex: 1, padding: '10px', borderRadius: '10px', border: '1.5px solid #ef4444', color: '#ef4444', background: 'none', fontWeight: '700', cursor: 'pointer', fontSize: '0.85rem' },
    grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', marginTop: '40px' },
    miniCard: { background: '#fff', padding: '30px', borderRadius: '24px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '10px' }
};

export default BookingSettings;
