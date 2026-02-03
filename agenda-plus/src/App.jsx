import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Login';
import SaaSApp from './SaaSApp';
import PublicBooking from './PublicBooking';
import { api } from './api';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('agenda_plus_token'));
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleLogin = async (credentials) => {
        setLoading(true);
        try {
            const data = await api.login(credentials);
            if (data.access_token) {
                localStorage.setItem('agenda_plus_token', data.access_token);
                setIsAuthenticated(true);
                // Fetch user data
                try {
                    const userData = await api.getMe();
                    setUser(userData);
                } catch (e) { console.error("Error fetching user data", e); }
            }
        } catch (error) {
            alert('Error al iniciar sesión: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('agenda_plus_token');
        setIsAuthenticated(false);
        setUser(null);
    };

    return (
        <Router>
            <Routes>
                {/* Ruta Pública de Reserva */}
                <Route path="/reservar" element={<PublicBooking />} />

                {/* Rutas Privadas */}
                <Route path="/" element={
                    !isAuthenticated ? (
                        <Login onLogin={handleLogin} />
                    ) : (
                        <SaaSApp user={user} onLogout={handleLogout} />
                    )
                } />

                {/* Catch-all: Redirigir a home */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </Router>
    );
}

export default App;
