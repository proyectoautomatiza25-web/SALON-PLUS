import React, { useState } from 'react';
import Login from './Login';
import SaaSApp from './SaaSApp';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);

    const handleLogin = (credentials) => {
        // Basic auth logic for demo
        if (credentials.email && credentials.password) {
            setUser(credentials);
            setIsAuthenticated(true);
        }
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        setUser(null);
    };

    return (
        <div className="App">
            {!isAuthenticated ? (
                <Login onLogin={handleLogin} />
            ) : (
                <SaaSApp user={user} onLogout={handleLogout} />
            )}
        </div>
    );
}

export default App;
