import React from 'react'
import { Microscope, Baby, Brain, Speech, Activity, Heart, ArrowRight } from 'lucide-react'

const serviceList = [
    {
        title: 'Medicina General',
        desc: 'Atención primaria y preventiva con diagnósticos precisos para toda la familia.',
        icon: <Microscope size={35} />,
        color: '#E0F2F1'
    },
    {
        title: 'Pediatría',
        desc: 'Cuidado especializado en el crecimiento y salud de los más pequeños.',
        icon: <Baby size={35} />,
        color: '#FFF3E0'
    },
    {
        title: 'Psicología',
        desc: 'Apoyo profesional para el bienestar emocional y mental de nuestros pacientes.',
        icon: <Brain size={35} />,
        color: '#F3E5F5'
    },
    {
        title: 'Fonoaudiología',
        desc: 'Especialistas en terapias de lenguaje, audición y deglución.',
        icon: <Speech size={35} />,
        color: '#E3F2FD'
    },
    {
        title: 'Nutrición',
        desc: 'Planes alimenticios personalizados para mejorar tu vitalidad y salud.',
        icon: <Activity size={35} />,
        color: '#F1F8E9'
    },
    {
        title: 'Cardiología',
        desc: 'Detección y tratamiento experto de afecciones cardiovasculares.',
        icon: <Heart size={35} />,
        color: '#FFEBEE'
    }
]

const Services = () => {
    return (
        <section id="services" className="section container" style={{ paddingBottom: '12rem' }}>
            <div style={{ textAlign: 'center', marginBottom: '7rem' }}>
                <h6 style={{ color: 'var(--primary)', fontWeight: '900', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '1.5rem', fontSize: '1rem' }}>
                    Nuestras Especialidades
                </h6>
                <h2 style={{ fontSize: '4rem', fontWeight: '900', color: '#1a2a2a', letterSpacing: '-1.5px' }}>
                    Atención <span className="gradient-text">Profesional</span> para Ti
                </h2>
                <p style={{ marginTop: '1.5rem', color: '#4a5568', fontSize: '1.25rem', maxWidth: '700px', margin: '1.5rem auto 0' }}>
                    Ofrecemos un enfoque multidisciplinario para garantizar el mejor cuidado de tu salud.
                </p>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))',
                gap: '3rem'
            }}>
                {serviceList.map((service, index) => (
                    <div key={index} className="glass" style={{
                        padding: '3.5rem',
                        borderRadius: '40px',
                        transition: 'var(--transition)',
                        cursor: 'pointer',
                        border: '2px solid rgba(255,255,255,0.5)',
                        position: 'relative',
                        overflow: 'hidden'
                    }}>
                        <div style={{
                            backgroundColor: service.color,
                            width: '90px',
                            height: '90px',
                            borderRadius: '24px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'var(--primary)',
                            marginBottom: '2.5rem',
                            boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.05)'
                        }}>
                            {service.icon}
                        </div>
                        <h3 style={{ fontSize: '1.9rem', fontWeight: '900', marginBottom: '1.2rem', color: '#1a2a2a' }}>{service.title}</h3>
                        <p style={{ color: '#4a5568', marginBottom: '2.5rem', lineHeight: '1.7', fontSize: '1.15rem', fontWeight: '500' }}>{service.desc}</p>
                        <div style={{
                            color: 'var(--primary)',
                            fontWeight: '800',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            fontSize: '1.1rem'
                        }}>
                            Agendar Atención <ArrowRight size={20} />
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default Services
