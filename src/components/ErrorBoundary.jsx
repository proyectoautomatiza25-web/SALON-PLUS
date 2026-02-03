import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        this.setState({ error, errorInfo });
        console.group('🛑 APPLICATION CRASH');
        console.error('Error:', error);
        console.error('Info:', errorInfo);
        console.groupEnd();
    }

    handleReload = () => {
        window.location.reload();
    };

    render() {
        if (this.state.hasError) {
            return (
                <div style={styles.errorContainer}>
                    <div style={styles.errorCard}>
                        <div style={styles.icon}>⚠️</div>
                        <h1 style={styles.title}>¡Oh no! Algo salió mal</h1>
                        <p style={styles.message}>
                            La aplicación ha encontrado un error inesperado al mostrar estos datos.
                            Hemos registrado el problema para corregirlo.
                        </p>
                        <div style={styles.debugBox}>
                            <pre style={styles.pre}>
                                {this.state.error && this.state.error.toString()}
                            </pre>
                        </div>
                        <div style={styles.actions}>
                            <button onClick={this.handleReload} style={styles.reloadBtn}>
                                Reiniciar Aplicación
                            </button>
                        </div>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

const styles = {
    errorContainer: {
        height: '100vh',
        width: '100vw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#f1f5f9',
        fontFamily: "'Outfit', sans-serif"
    },
    errorCard: {
        background: '#fff',
        padding: '40px',
        borderRadius: '24px',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
        maxWidth: '500px',
        width: '90%',
        textAlign: 'center'
    },
    icon: {
        fontSize: '48px',
        marginBottom: '20px'
    },
    title: {
        fontSize: '24px',
        fontWeight: '800',
        color: '#1e293b',
        marginBottom: '15px'
    },
    message: {
        color: '#64748b',
        lineHeight: '1.6',
        marginBottom: '25px'
    },
    debugBox: {
        background: '#f8fafc',
        padding: '15px',
        borderRadius: '12px',
        border: '1px solid #e2e8f0',
        textAlign: 'left',
        marginBottom: '25px',
        maxHeight: '150px',
        overflowY: 'auto'
    },
    pre: {
        fontSize: '0.8rem',
        color: '#ef4444',
        margin: 0,
        whiteSpace: 'pre-wrap'
    },
    reloadBtn: {
        background: '#004975',
        color: '#fff',
        border: 'none',
        padding: '12px 25px',
        borderRadius: '12px',
        fontWeight: '700',
        cursor: 'pointer',
        fontSize: '1rem',
        transition: 'transform 0.2s'
    }
};

export default ErrorBoundary;
