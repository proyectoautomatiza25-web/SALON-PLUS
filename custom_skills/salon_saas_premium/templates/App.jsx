import React, { useState } from 'react';
import Layout from './Layout';
// import Login from './Login'; // Implement Login component

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(true); // Default true for dev
    const [user, setUser] = useState({ name: 'Admin', role: 'admin' });

    const handleLogin = (credentials) => {
        setUser(credentials);
        setIsAuthenticated(true);
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        setUser(null);
    };

    return (
        <div className="App">
            {isAuthenticated ? (
                <Layout user={user} onLogout={handleLogout} />
            ) : (
                <div>Login Screen Placeholder</div>
            )}
        </div>
    );
}

export default App;
