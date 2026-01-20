import React, { useState } from 'react'
import { Calendar, CheckCircle2, User, Clock, ArrowRight } from 'lucide-react'

// Rich data with researched bios
const teamMembers = [
    {
        id: 1,
        name: 'Dra. Nataly Malaspina',
        role: 'Medicina General',
        specialty: 'Atención Integral Familiar',
        image: '/dr-nataly-malaspina.png',
        summary: 'Médico Cirujano (U. Carabobo) con amplia experiencia en el manejo de patologías crónicas como hipertensión y diabetes en adultos y niños. Ex-médico de urgencias de alta complejidad en el Hospital de Puerto Montt. Destaca por su enfoque humano, empático y preventivo.',
        tags: ['Adultos y Niños', 'Enfermedades Crónicas', 'Urgencias']
    },
    {
        id: 2,
        name: 'Dra. Francis Zabaleta',
        role: 'Pediatría',
        specialty: 'Desarrollo Infantil',
        image: '/dr-francis-zabaleta.png',
        summary: 'Pediatra certificada y diplomada en Enfermedades Respiratorias y Endocrinología Pediátrica. Experta en control de niño sano, asesora de lactancia y vacunas. Creadora de la comunidad educativa @AdosisdePediatra. Atiende pacientes hasta los 17 años.',
        tags: ['Recién Nacidos', 'Adolescentes', 'Respiratorio', 'Lactancia']
    },
    {
        id: 3,
        name: 'Ps. Carolina Cárcamo',
        role: 'Psicología Clínica',
        specialty: 'Adicciones y Bioética',
        image: '/ps-carolina-carcamo.png',
        summary: 'Directora del Centro Clínico Comunitario de Puerto Montt y ganadora del premio "Mujer Impacta 2024". Especialista en tratamiento de adicciones y bioética social. Ofrece un espacio terapéutico digno, comunitario y profundamente humano.',
        tags: ['Adicciones', 'Terapia Familiar', 'Bioética']
    },
    {
        id: 4,
        name: 'Ps. Eduardo Jara',
        role: 'Psicología Clínica',
        specialty: 'Adultos y Diversidad',
        image: '/ps-eduardo-jara.png',
        summary: 'Psicólogo Clínico con enfoque en adultos, diversidad sexual y síndromes psicosomáticos. Especializado en terapia reparatoria y manejo de crisis, ofreciendo un ambiente seguro y libre de juicios para el autoconocimiento.',
        tags: ['Adultos', 'Diversidad Sexual', 'Psicosomática']
    },
    {
        id: 5,
        name: 'Ps. Jorge Labra',
        role: 'Psicología',
        specialty: 'Clínica y Organizacional',
        image: '/ps-jorge-labra.png',
        summary: 'Psicólogo egresado de la U. Austral de Chile. Combina experiencia clínica y educacional para ofrecer soluciones prácticas a problemas que interrumpen la vida cotidiana. Enfoque centrado en la evaluación y la acción terapéutica efectiva.',
        tags: ['Evaluación', 'Soluciones Prácticas', 'Adultos']
    },
    {
        id: 6,
        name: 'Ps. Paulina Ossa',
        role: 'Psicología Clínica',
        specialty: 'Neurodivergencia e Infancia',
        image: '/ps-paulina-ossa.png',
        summary: 'Especialista en neurodivergencia con certificación PEERS y diplomado en abordaje multidisciplinario TEA. Ofrece un espacio seguro y adaptado tanto para pacientes neurodivergentes como neurotípicos, enfocada en infancia y adolescencia.',
        tags: ['TEA', 'Neurodivergencia', 'Infancia', 'Habilidades Sociales']
    },
    {
        id: 7,
        name: 'Flga. Francisca Stoffel',
        role: 'Fonoaudiología',
        specialty: 'Trastorno Espectro Autista',
        image: '/flga-francisca-stoffel.png',
        summary: 'Fonoaudióloga especialistas en TEA desde la primera infancia hasta la adolescencia. Diplomada en intervención especializada y certificada en la aplicación del instrumento diagnóstico ADOS-2. Enfoque en comunicación funcional.',
        tags: ['TEA', 'Habla y Lenguaje', 'ADOS-2']
    }
]

const Team = () => {
    // Booking Modal Logic
    const [selectedDoc, setSelectedDoc] = useState(null);

    const handleBooking = (doc) => {
        // En un escenario real, esto abriría el widget del SaaS.
        // Aquí simulamos esa conexión abriendo un modal "SaaS-like".
        setSelectedDoc(doc);
    };

    const confirmBooking = () => {
        // Conexión directa a WhatsApp con formato pre-definido para el sistema SaaS
        const message = `Hola, quiero agendar una hora con *${selectedDoc.name}* (${selectedDoc.role}). Vengo desde la web.`;
        const url = `https://wa.me/56975912621?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
        setSelectedDoc(null);
    };

    return (
        <section id="nosotros" className="section" style={{
            background: '#f8fafc',
            paddingTop: '8rem',
            paddingBottom: '12rem',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* SaaS Grid Background Pattern */}
            <div style={{
                position: 'absolute',
                top: 0, left: 0, right: 0, bottom: 0,
                backgroundImage: 'radial-gradient(#e2e8f0 1px, transparent 1px)',
                backgroundSize: '40px 40px',
                opacity: 0.4,
                zIndex: 0
            }} />

            <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ textAlign: 'center', marginBottom: '6rem' }}>
                    <div className="fade-in-up">
                        <h6 style={{
                            color: 'var(--primary)',
                            fontWeight: '900',
                            letterSpacing: '2px',
                            textTransform: 'uppercase',
                            fontSize: '0.9rem',
                            display: 'inline-block',
                            padding: '8px 16px',
                            background: 'rgba(16, 185, 129, 0.1)',
                            borderRadius: '50px',
                            marginBottom: '1.5rem'
                        }}>
                            Staff Clínico Certificado
                        </h6>
                        <h2 style={{
                            fontSize: '3.5rem',
                            fontWeight: '900',
                            color: '#1e293b',
                            marginBottom: '1.5rem',
                            letterSpacing: '-1px'
                        }}>
                            Expertos en tu <span className="gradient-text">Bienestar</span>
                        </h2>
                        <p style={{
                            color: '#64748b',
                            fontSize: '1.2rem',
                            maxWidth: '650px',
                            margin: '0 auto',
                            lineHeight: '1.8'
                        }}>
                            Conoce a nuestro equipo de especialistas. Profesionales destacados por su trayectoria y calidez humana.
                        </p>
                    </div>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
                    gap: '3rem'
                }}>
                    {teamMembers.map((member, index) => (
                        <div key={member.id} className="team-card fade-in-up" style={{
                            animationDelay: `${index * 100}ms`,
                            background: 'white',
                            borderRadius: '24px',
                            border: '1px solid rgba(255,255,255,0.8)',
                            boxShadow: '0 20px 40px -10px rgba(0,0,0,0.08)',
                            overflow: 'hidden',
                            transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                            position: 'relative'
                        }}>
                            {/* Top Gradient Line */}
                            <div style={{ height: '6px', background: 'var(--gradient-primary)' }} />

                            <div style={{ padding: '2.5rem 2rem 2rem' }}>
                                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '20px', marginBottom: '1.5rem' }}>
                                    {/* Unique Avatar Shape */}
                                    <div style={{
                                        width: '80px',
                                        height: '80px',
                                        borderRadius: '20px',
                                        overflow: 'hidden',
                                        boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)',
                                        flexShrink: 0
                                    }}>
                                        <img
                                            src={member.image}
                                            alt={member.name}
                                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                        />
                                    </div>
                                    <div>
                                        <h3 style={{ fontSize: '1.3rem', fontWeight: '800', color: '#1e293b', lineHeight: '1.2' }}>{member.name}</h3>
                                        <p style={{ color: 'var(--primary)', fontWeight: '700', fontSize: '0.9rem', marginTop: '4px' }}>{member.role}</p>
                                        <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginTop: '2px' }}>{member.specialty}</p>
                                    </div>
                                </div>

                                <p style={{
                                    color: '#475569',
                                    fontSize: '0.95rem',
                                    lineHeight: '1.6',
                                    marginBottom: '1.5rem',
                                    textAlign: 'left'
                                }}>
                                    {member.summary}
                                </p>

                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '2rem' }}>
                                    {member.tags.map(tag => (
                                        <span key={tag} style={{
                                            fontSize: '0.75rem',
                                            padding: '4px 10px',
                                            background: '#f1f5f9',
                                            color: '#64748b',
                                            borderRadius: '6px',
                                            fontWeight: '600'
                                        }}>
                                            #{tag}
                                        </span>
                                    ))}
                                </div>

                                <button
                                    onClick={() => handleBooking(member)}
                                    className="btn-saas"
                                    style={{
                                        width: '100%',
                                        padding: '1rem',
                                        background: '#1e293b',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '12px',
                                        fontWeight: '700',
                                        fontSize: '1rem',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '10px',
                                        transition: 'all 0.3s ease'
                                    }}
                                >
                                    <Calendar size={18} />
                                    Agendar Hora
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Booking Modal (Simulating SaaS Connection) */}
            {selectedDoc && (
                <div style={{
                    position: 'fixed',
                    inset: 0,
                    background: 'rgba(15, 23, 42, 0.6)',
                    backdropFilter: 'blur(8px)',
                    zIndex: 10000,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '20px'
                }} onClick={() => setSelectedDoc(null)}>
                    <div
                        className="fade-in-up"
                        style={{
                            background: 'white',
                            width: '100%',
                            maxWidth: '450px',
                            borderRadius: '24px',
                            padding: '2rem',
                            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
                        }} onClick={e => e.stopPropagation()}>
                        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                            <div style={{
                                width: '60px', height: '60px', background: '#f0fdf4',
                                borderRadius: '50%', color: '#10b981', display: 'flex',
                                alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem'
                            }}>
                                <CheckCircle2 size={32} />
                            </div>
                            <h3 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#1e293b', marginBottom: '0.5rem' }}>
                                Confirmar Solicitud
                            </h3>
                            <p style={{ color: '#64748b' }}>
                                Estás a un paso de agendar con <br />
                                <strong style={{ color: '#1e293b' }}>{selectedDoc.name}</strong>
                            </p>
                        </div>

                        <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '16px', marginBottom: '2rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                                <span style={{ color: '#64748b', fontSize: '0.9rem' }}>Especialidad</span>
                                <span style={{ fontWeight: '600', color: '#1e293b', fontSize: '0.9rem' }}>{selectedDoc.role}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                                <span style={{ color: '#64748b', fontSize: '0.9rem' }}>Sistema</span>
                                <span style={{ fontWeight: '600', color: '#10b981', fontSize: '0.9rem' }}>• Conectado SaaS</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ color: '#64748b', fontSize: '0.9rem' }}>Disponibilidad</span>
                                <span style={{ fontWeight: '600', color: '#1e293b', fontSize: '0.9rem' }}>Consultar en vivo</span>
                            </div>
                        </div>

                        <button
                            onClick={confirmBooking}
                            style={{
                                width: '100%',
                                padding: '1.2rem',
                                background: 'var(--gradient-primary)',
                                color: 'white',
                                border: 'none',
                                borderRadius: '16px',
                                fontWeight: '700',
                                fontSize: '1.1rem',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '10px',
                                boxShadow: '0 10px 20px -5px rgba(16, 185, 129, 0.4)'
                            }}
                        >
                            Continuar al Agendador <ArrowRight size={20} />
                        </button>

                        <p style={{ textAlign: 'center', fontSize: '0.8rem', color: '#94a3b8', marginTop: '1rem' }}>
                            Serás redirigido a nuestro asistente de agenda certificado.
                        </p>
                    </div>
                </div>
            )}

            <style>{`
        .team-card:hover { 
            transform: translateY(-10px); 
            box-shadow: 0 30px 60px -15px rgba(0,0,0,0.12) !important;
        }
        .btn-saas:hover {
            background: var(--primary) !important;
            transform: scale(1.02);
        }
      `}</style>
        </section>
    )
}

export default Team
