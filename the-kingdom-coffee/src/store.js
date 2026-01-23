import { useState, useCallback } from 'react';

const initialMenu = [
    { id: 'm1', name: 'Espresso Real', price: 2500, category: 'Café Caliente', desc: 'Doble shot de grano seleccionado, crema densa y persistente.', image: 'https://images.unsplash.com/photo-1510707577719-af7c183a14df?w=500&q=80' },
    { id: 'm2', name: 'Capuchino Imperial', price: 3800, category: 'Café Caliente', desc: 'Shot de espresso con leche texturizada sedosa y cacao en polvo.', image: 'https://images.unsplash.com/photo-1534778101976-62847782c213?w=500&q=80' },
    { id: 'm3', name: 'Cold Brew de la Corona', price: 4200, category: 'Bebidas Frías', desc: 'Infusionado en frío por 18 horas para una dulzura natural máxima.', image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=500&q=80' },
    { id: 'm4', name: 'Croissant Real de Almendras', price: 3500, category: 'Pastelería', desc: 'Masa madre francesa con crema de almendras y láminas tostadas.', image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=500&q=80' },
];

export const useKingdomStore = () => {
    const [menu] = useState(initialMenu);
    const [cart, setCart] = useState([]);
    const [user, setUser] = useState({
        name: 'Juan Carlos',
        level: 'Emperador Platino',
        points: 1250,
        nextReward: 2000,
        history: []
    });

    const addToCart = useCallback((item) => {
        setCart(prev => {
            const existing = prev.find(i => i.id === item.id);
            if (existing) {
                return prev.map(i => i.id === item.id ? { ...i, qty: i.qty + 1 } : i);
            }
            return [...prev, { ...item, qty: 1 }];
        });
    }, []);

    const removeFromCart = useCallback((itemId) => {
        setCart(prev => prev.filter(i => i.id !== itemId));
    }, []);

    const updateQty = useCallback((itemId, delta) => {
        setCart(prev => prev.map(i => {
            if (i.id === itemId) {
                const newQty = Math.max(1, i.qty + delta);
                return { ...i, qty: newQty };
            }
            return i;
        }));
    }, []);

    const clearCart = () => setCart([]);

    const checkout = useCallback(() => {
        const total = cart.reduce((acc, i) => acc + (i.price * i.qty), 0);
        const earnedPoints = Math.floor(total / 100);

        setUser(prev => ({
            ...prev,
            points: prev.points + earnedPoints,
            history: [{ date: new Date().toISOString(), total, items: cart.length }, ...prev.history]
        }));

        clearCart();
        return total;
    }, [cart]);

    return {
        menu,
        cart,
        user,
        addToCart,
        removeFromCart,
        updateQty,
        checkout
    };
};
