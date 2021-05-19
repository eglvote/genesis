const colors = require('tailwindcss/colors')

module.exports = {
    mode: 'jit',
    purge: [
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
    ],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            spacing: {
                108: '27rem',
                120: '30rem',
                126: '31.5rem',
                132: '33rem',
                144: '36rem',
                156: '39rem',
                168: '42rem',
                170: '45rem',
                182: '48rem',
                194: '51rem',
                200: '53rem',
                206: '54rem',
            },
        },
        colors: {
            dark: '#181818',
            salmon: {
                DEFAULT: '#f57073',
                dark: '#f24043',
            },
            pink: {
                DEFAULT: '#FE887F',
                dark: '#F05D6C',
            },
            transparent: 'transparent',
            current: 'currentColor',
            black: colors.black,
            white: colors.white,
            gray: colors.trueGray,
            indigo: colors.indigo,
            red: colors.rose,
            yellow: colors.amber,
        },
    },

    variants: {},
    plugins: [],
}
