/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#7c3aed', // Un morado moderno tipo SaaS belleza
                    light: '#a78bfa',
                    dark: '#5b21b6'
                },
                secondary: '#f472b6', // Rosa suave
                dark: '#1e293b',
                light: '#f8fafc'
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            }
        },
    },
    plugins: [],
}
