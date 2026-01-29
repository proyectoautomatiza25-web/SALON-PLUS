import React, { useState, useEffect } from 'react';

const CommandPalette = ({ isOpen, onClose, setTab }) => {
    const [search, setSearch] = useState('');

    const actions = [
        { id: 'agenda', title: 'Ver Agenda Central', shortcut: 'G A', icon: '🗓️' },
        { id: 'clients', title: 'Buscar Paciente', shortcut: 'G P', icon: '👥' },
        { id: 'finanzas', title: 'Reporte Financiero', shortcut: 'G F', icon: '💰' },
        { id: 'stats', title: 'Estadísticas Pro', shortcut: 'G S', icon: '📊' },
    ];

    if (!isOpen) return null;

    return (
        <div style={styles.overlay} onClick={onClose}>
            <div className="glass-panel" style={styles.modal} onClick={e => e.stopPropagation()}>
                <div style={styles.searchHeader}>
                    <span style={{ fontSize: '1.2rem' }}>🔍</span>
                    <input
                        autoFocus
                        style={styles.input}
                        placeholder="¿Qué quieres hacer hoy? (Escribe para buscar...)"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                </div>

                <div style={styles.list}>
                    {actions.filter(a => a.title.toLowerCase().includes(search.toLowerCase())).map(action => (
                        <div
                            key={action.id}
                            style={styles.item}
                            onClick={() => { setTab(action.id); onClose(); }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                <span style={{ fontSize: '1.2rem' }}>{action.icon}</span>
                                <span style={{ fontWeight: '600' }}>{action.title}</span>
                            </div>
                            <div style={styles.shortcut}>{action.shortcut}</div>
                        </div>
                    ))}
                </div>

                <div style={styles.footer}>
                    Tip: Usa <span style={styles.key}>Esc</span> para cerrar o <span style={styles.key}>↵</span> para ejecutar
                </div>
            </div>
        </div>
    );
};

const styles = {
    overlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.4)', zIndex: 10000, display: 'flex', justifyContent: 'center', paddingTop: '10vh' },
    modal: { width: '600px', borderRadius: '20px', padding: '0', overflow: 'hidden', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)', height: 'fit-content' },
    searchHeader: { display: 'flex', alignItems: 'center', gap: '15px', padding: '20px 25px', borderBottom: '1px solid #e2e8f0' },
    input: { border: 'none', background: 'transparent', outline: 'none', fontSize: '1.1rem', flex: 1, fontFamily: 'inherit' },
    list: { padding: '10px' },
    item: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 15px', borderRadius: '12px', cursor: 'pointer', transition: '0.2s', '&:hover': { background: '#f8fafc' } },
    shortcut: { fontSize: '0.75rem', color: '#94a3b8', background: '#f1f5f9', padding: '4px 8px', borderRadius: '6px', fontWeight: '800' },
    footer: { padding: '15px 25px', background: '#f8fafc', fontSize: '0.75rem', color: '#64748b', borderTop: '1px solid #e2e8f0' },
    key: { background: '#e2e8f0', padding: '2px 6px', borderRadius: '4px', fontWeight: '700' }
};

export default CommandPalette;
