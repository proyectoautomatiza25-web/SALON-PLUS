import React from 'react'
import { ArrowRight, CheckCircle2, MapPin } from 'lucide-react'
import { SchedulingService } from '../services/schedulingService'

const Hero = () => {
    const bookingAction = SchedulingService.getBookingAction();

    return (
        <section id="hero" className="section container" style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            alignItems: 'center',
            gap: '4rem',
            paddingTop: '6rem',
            paddingBottom: '8rem'
        }}>
            <div className="fade-in-up">
                <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '10px',
                    backgroundColor: 'rgba(0, 158, 157, 0.1)',
                    padding: '0.6rem 1.2rem',
                    borderRadius: '50px',
                    color: 'var(--primary)',
                    fontSize: '0.95rem',
                    fontWeight: '700',
                    marginBottom: '2rem',
                    border: '1px solid rgba(0, 158, 157, 0.2)'
                }}>
                    <CheckCircle2 size={18} />
                    Centro Médico del Valle: Excelencia y Confianza
                </div>
                <h1 style={{
                    fontSize: '4.5rem',
                    lineHeight: '1.1',
                    marginBottom: '2rem',
                    fontWeight: '900',
                    color: '#1a2a2a',
                    letterSpacing: '-1.5px'
                }}>
                    Cuidamos de ti de manera <span className="gradient-text">Integral</span>
                </h1>
                <p style={{
                    fontSize: '1.3rem',
                    color: '#4a5568',
                    marginBottom: '3.5rem',
                    maxWidth: '600px',
                    lineHeight: '1.8',
                    fontWeight: '450'
                }}>
                    Nuestra misión es mantener a nuestros pacientes en óptimas condiciones, ofreciendo servicios médicos de calidad y tecnología de vanguardia en Puerto Montt.
                </p>

                <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
                    <a href={bookingAction.payload} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ padding: '1.3rem 3rem' }}>
                        Agendar Hora <ArrowRight size={22} />
                    </a>
                    <a href="#services" className="btn btn-outline" style={{ padding: '1.3rem 3rem' }}>
                        Nuestras Especialidades
                    </a>
                </div>

                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    marginTop: '4rem',
                    padding: '1rem 1.5rem',
                    background: 'rgba(0, 158, 157, 0.05)',
                    borderRadius: '16px',
                    borderLeft: '4px solid var(--primary)'
                }}>
                    <MapPin size={24} color="var(--primary)" />
                    <div>
                        <p style={{ fontWeight: '700', color: '#1a2a2a', fontSize: '1.05rem' }}>Av. Sargento Silva 381</p>
                        <p style={{ color: '#4a5568', fontSize: '0.95rem' }}>Puerto Montt, Los Lagos</p>
                    </div>
                </div>
            </div>

            <div className="fade-in-up" style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '2rem'
            }}>
                {/* Centro Médico Image */}
                <div style={{
                    position: 'relative',
                    width: '100%',
                    borderRadius: '48px',
                    overflow: 'hidden',
                    boxShadow: '0 40px 80px rgba(0, 50, 50, 0.15)',
                    border: '12px solid white'
                }}>
                    <img
                        src="/centro-medico.png"
                        alt="Centro Médico del Valle - Puerto Montt"
                        style={{
                            width: '100%',
                            height: '500px',
                            objectFit: 'cover'
                        }}
                    />
                </div>

                {/* Social Media Row with Original Logos */}
                <div style={{
                    display: 'flex',
                    gap: '2.5rem',
                    alignItems: 'center',
                    background: 'white',
                    padding: '1.2rem 2.5rem',
                    borderRadius: '100px',
                    boxShadow: '0 15px 35px rgba(0,0,0,0.08)',
                    border: '1px solid rgba(0,0,0,0.03)'
                }}>
                    <a href="https://www.youtube.com/@AdosisdePediatra" target="_blank" rel="noopener noreferrer" style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        textDecoration: 'none',
                        color: '#1a2a2a',
                        fontWeight: '700',
                        fontSize: '0.95rem',
                        transition: 'transform 0.3s ease'
                    }}>
                        <img src="https://upload.wikimedia.org/wikipedia/commons/e/ef/Youtube_logo.png" alt="YouTube" style={{ height: '24px' }} />
                        <span>@AdosisdePediatra</span>
                    </a>
                    <div style={{ width: '1px', height: '20px', background: '#e2e8f0' }} />
                    <a href="https://www.instagram.com/adosisdepediatra/" target="_blank" rel="noopener noreferrer" style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        textDecoration: 'none',
                        color: '#1a2a2a',
                        fontWeight: '700',
                        fontSize: '0.95rem',
                        transition: 'transform 0.3s ease'
                    }}>
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/600px-Instagram_icon.png" alt="Instagram" style={{ height: '24px' }} />
                        <span>@adosisdepediatra</span>
                    </a>
                </div>
            </div>
        </section>
    )
}

export default Hero
