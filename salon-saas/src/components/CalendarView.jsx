import React, { useState, useMemo, useEffect } from 'react';
import { Calendar, dateFnsLocalizer, Views } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import es from 'date-fns/locale/es';
import { useSalonStore } from '../store';
import { Plus, ChevronLeft, ChevronRight, Calendar as CalIcon, User, Settings, Menu } from 'lucide-react';
import BookingModal from './BookingModal';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const locales = {
    'es': es,
};

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});

// Custom Resource Header (Circular Avatar + Name)
const ResourceHeader = ({ label, resource }) => {
    return (
        <div className="flex flex-col items-center justify-center py-2 group cursor-pointer">
            {resource?.avatar ? (
                <div className="w-14 h-14 rounded-full shadow-md mb-2 overflow-hidden border-2 border-white ring-1 ring-slate-200 group-hover:ring-pink-400 group-hover:scale-105 transition-all">
                    <img src={resource.avatar} alt={label} className="w-full h-full object-cover" />
                </div>
            ) : (
                <div
                    className="w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md mb-2 overflow-hidden border-2 border-white ring-1 ring-slate-200 group-hover:scale-105 transition-all"
                    style={{ backgroundColor: resource?.color || '#3b82f6' }}
                >
                    {label ? label.substring(0, 2).toUpperCase() : '??'}
                </div>
            )}
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wide group-hover:text-pink-500 transition-colors">{label}</span>
        </div>
    );
};

const CalendarView = () => {
    const { stylists, appointments } = useSalonStore();
    const [date, setDate] = useState(new Date(2026, 0, 24));
    const [view, setView] = useState(Views.DAY);
    const [step, setStep] = useState(15); // Default to 15 min slots for clarity
    const [showBookingModal, setShowBookingModal] = useState(false);
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [currentTimePosition, setCurrentTimePosition] = useState('0%');

    // Timer for current time line
    useEffect(() => {
        const calculatePosition = () => {
            const now = new Date();
            const startHour = 9; // Updated start
            const endHour = 21;  // Updated end
            const totalMinutes = (endHour - startHour) * 60;
            const currentMinutes = (now.getHours() * 60 + now.getMinutes()) - (startHour * 60);

            if (currentMinutes < 0) return '0%';
            if (currentMinutes > totalMinutes) return '100%';

            const percentage = (currentMinutes / totalMinutes) * 100;
            return `${percentage}%`;
        };

        setCurrentTimePosition(calculatePosition());
        const interval = setInterval(() => setCurrentTimePosition(calculatePosition()), 60000); // Update every minute
        return () => clearInterval(interval);
    }, []);

    // Transform appointments for Big Calendar
    const events = appointments.map(app => ({
        id: app.id,
        title: app.title,
        start: app.start,
        end: app.end,
        resourceId: app.stylistId,
        status: app.status,
        clientName: app.clientName
    }));

    // Resource Map (Columns)
    const resources = stylists.map(s => ({
        id: s.id,
        title: s.name,
        color: s.color,
        avatar: s.avatar // Pass avatar
    }));

    // Custom Event Component
    const EventComponent = ({ event }) => (
        <div className="h-full w-full p-1 flex flex-col justify-center">
            <div className="font-bold text-xs truncate">{event.clientName}</div>
            <div className="text-xs opacity-90 truncate">{event.title}</div>
            <div className="absolute top-1 right-1">
                {event.status === 'attended' && <span title="Atendido">✅</span>}
                {event.status === 'no_show' && <span title="Ausente">❌</span>}
            </div>
        </div>
    );

    const components = useMemo(() => ({
        event: EventComponent,
        resourceHeader: ResourceHeader
    }), []);

    const handleSelectSlot = (slotInfo) => {
        setSelectedSlot(slotInfo);
        setShowBookingModal(true);
    };

    const handleSelectEvent = (event) => {
        setSelectedSlot(event);
        setShowBookingModal(true);
    };

    return (
        <div className="h-full flex flex-col bg-slate-50 relative overflow-hidden">

            {/* Salonist-style Header Control */}
            <div className="px-4 py-3 flex justify-between items-center bg-white border-b border-gray-200">

                {/* Left Controls */}
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <select
                            value={view}
                            onChange={(e) => setView(e.target.value)}
                            className="appearance-none bg-white border border-gray-300 text-gray-700 py-1.5 pl-4 pr-8 rounded-full text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-100 shadow-sm hover:border-gray-400 transition-colors cursor-pointer"
                        >
                            <option value={Views.DAY}>Día</option>
                            <option value={Views.WEEK}>Semana</option>
                            <option value={Views.MONTH}>Mes</option>
                        </select>
                        <ChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 rotate-90 text-gray-400 pointer-events-none" size={12} />
                    </div>

                    <div className="flex items-center bg-white border border-gray-300 rounded-full px-1 py-0.5 shadow-sm">
                        <button onClick={() => setDate(new Date(date.setDate(date.getDate() - 1)))} className="p-1 text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded-full transition-colors"><ChevronLeft size={16} /></button>
                        <div className="px-3 text-sm font-semibold text-gray-700 min-w-[160px] text-center capitalize">
                            {format(date, 'EEE, MMMM do yyyy', { locale: es })}
                        </div>
                        <button onClick={() => setDate(new Date(date.setDate(date.getDate() + 1)))} className="p-1 text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded-full transition-colors"><ChevronRight size={16} /></button>
                    </div>
                </div>

                {/* Center - Time Slot Duration */}
                <div className="hidden md:block">
                    <div className="relative">
                        <select
                            value={step}
                            onChange={(e) => setStep(parseInt(e.target.value))}
                            className="appearance-none bg-white border border-gray-300 text-gray-700 py-1.5 pl-4 pr-8 rounded-full text-sm font-medium focus:outline-none shadow-sm cursor-pointer"
                        >
                            <option value={10}>10 Min</option>
                            <option value={15}>15 Min</option>
                            <option value={30}>30 Min</option>
                            <option value={60}>60 Min</option>
                        </select>
                        <ChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 rotate-90 text-gray-400 pointer-events-none" size={12} />
                    </div>
                </div>

                {/* Right Controls */}
                <div className="flex items-center gap-2">
                    <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full border border-transparent hover:border-gray-200 transition-all"><Settings size={18} /></button>
                    <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full border border-transparent hover:border-gray-200 transition-all"><ChevronRight size={18} className="rotate-[-45deg]" /></button>

                    <button
                        onClick={() => {
                            setSelectedSlot({ start: new Date(), resourceId: null });
                            setShowBookingModal(true);
                        }}
                        className="flex items-center gap-2 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white px-5 py-2 rounded-full font-bold shadow-md hover:shadow-lg transition-all ml-2 transform hover:-translate-y-0.5"
                    >
                        Agendar <Plus size={18} strokeWidth={3} />
                    </button>

                    <div className="h-6 w-[1px] bg-gray-300 mx-2"></div>

                    <div className="flex bg-gray-100 p-0.5 rounded-lg border border-gray-200">
                        <button onClick={() => setView(Views.DAY)} className={`p-1.5 rounded-md ${view === Views.DAY ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500 hover:text-gray-800'}`}><CalIcon size={16} /></button>
                        <button onClick={() => setView(Views.WEEK)} className={`p-1.5 rounded-md ${view === Views.WEEK ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500 hover:text-gray-800'}`}><Menu size={16} /></button>
                    </div>
                </div>
            </div>

            {/* Main Calendar Area - Clean & Borderless look with Scroll */}
            <div className="flex-1 bg-white overflow-y-auto relative">
                <Calendar
                    localizer={localizer}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ minHeight: '1200px' }}
                    date={date}
                    onNavigate={date => setDate(date)}
                    view={view}
                    onView={view => setView(view)}

                    selectable={true}
                    onSelectSlot={handleSelectSlot}
                    onSelectEvent={handleSelectEvent}

                    resources={view === Views.DAY ? resources : null}
                    resourceIdAccessor="id"
                    resourceTitleAccessor="title"

                    step={step}
                    timeslots={60 / step}
                    min={new Date(0, 0, 0, 9, 0, 0)} // Start 9 AM
                    max={new Date(0, 0, 0, 21, 0, 0)} // End 9 PM

                    culture='es'
                    messages={{
                        next: "Siguiente",
                        previous: "Anterior",
                        today: "Hoy",
                        month: "Mes",
                        week: "Semana",
                        day: "Día"
                    }}

                    components={components}

                    eventPropGetter={(event) => {
                        const resource = resources.find(r => r.id === event.resourceId);
                        let bg = resource?.color || '#3b82f6';
                        if (event.status === 'confirmed') bg = '#10b981';
                        if (event.status === 'pending') bg = '#fbbf24';

                        return {
                            style: {
                                backgroundColor: bg,
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                opacity: 0.9,
                                fontSize: '0.75rem',
                                fontWeight: '600',
                                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                            }
                        }
                    }}
                />

                {/* Current Time Indicator Line */}
                <div className="absolute left-[60px] right-0 h-[2px] bg-red-400 z-10 pointer-events-none flex items-center transition-all duration-1000" style={{ top: currentTimePosition }}>
                    <div className="absolute -left-[50px] bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                        {format(new Date(), 'HH:mm')}
                    </div>
                    <div className="w-full h-full bg-red-400 opacity-50"></div>
                </div>
            </div>

            {/* Booking Modal */}
            <BookingModal
                isOpen={showBookingModal}
                onClose={() => setShowBookingModal(false)}
                initialData={selectedSlot}
            />
        </div>
    );
};

export default CalendarView;
