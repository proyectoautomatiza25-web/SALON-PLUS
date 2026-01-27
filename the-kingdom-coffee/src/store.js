import { create } from 'zustand';

export const useKingdomStore = create((set) => ({
    user: {
        name: 'Alex',
        level: 'Kingdom Member Platinum',
        balance: 45.50,
        points: 2450,
        loyaltyLevel: 'Grano de Bronce',
        loyaltyProgress: 750,
        loyaltyTarget: 1000,
        stamps: 7,
        stampsTarget: 10,
    },

    menu: [
        {
            id: 1,
            name: 'Latte de Vainilla',
            desc: 'Con leche de almendras',
            price: 4.50,
            category: 'Café',
            image: 'https://images.unsplash.com/photo-1561882468-9110e03e0f78?w=400&q=80'
        },
        {
            id: 2,
            name: 'Espresso Doble',
            desc: 'Tostado Arábica oscuro',
            price: 2.50,
            category: 'Café',
            image: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=400&q=80'
        },
        {
            id: 3,
            name: 'Muffin Arándanos',
            desc: 'Recién horneado',
            price: 3.00,
            category: 'Repostería',
            image: 'https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=400&q=80'
        },
        {
            id: 4,
            name: 'Flat White',
            desc: 'Doble ristretto con microespuma',
            price: 3.30,
            category: 'Café',
            image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&q=80'
        },
        {
            id: 5,
            name: 'Cappuccino',
            desc: 'Tercios iguales de espresso, leche y espuma',
            price: 3.10,
            category: 'Café',
            image: 'https://images.unsplash.com/photo-1534778101976-62847782c213?w=400&q=80'
        },
        {
            id: 6,
            name: 'Americano',
            desc: 'Espresso diluido en agua caliente',
            price: 2.50,
            category: 'Café',
            image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400&q=80'
        },
    ],

    cart: [],

    addToCart: (item) => set((state) => {
        const existingItem = state.cart.find(cartItem => cartItem.id === item.id);
        if (existingItem) {
            return {
                cart: state.cart.map(cartItem =>
                    cartItem.id === item.id
                        ? { ...cartItem, qty: cartItem.qty + 1 }
                        : cartItem
                )
            };
        }
        return { cart: [...state.cart, { ...item, qty: 1 }] };
    }),

    removeFromCart: (itemId) => set((state) => ({
        cart: state.cart.filter(item => item.id !== itemId)
    })),

    updateCartItemQty: (itemId, qty) => set((state) => ({
        cart: state.cart.map(item =>
            item.id === itemId ? { ...item, qty } : item
        )
    })),

    clearCart: () => set({ cart: [] }),
}));
