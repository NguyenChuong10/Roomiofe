

/** @type {import("tailwindcss").Config} */
export default {
    content: [
        './index.html',
        './src/**/*.{js,ts,jsx,tsx}',
    ],
    theme : {
        extend: {
            fontFamily: {
                sans: ['"Be VietNam Pro"' , 'system-ui' , 'sans-serif'],
            },
            colors:{
                sidebar:{
                    bg:'#111c2d',
                    hover:'#172438',
                    active:'#1a3a5c',
                    text:'#6a8fa8',
                    border:'#1a2d42'
                },
                brand: {
                    DEFAULT:'#1e6abf',
                    50:'#eff6ff',
                    100: '#dbeafe',
                    200: '#bfdbfe',
                    600: '#2563eb',
                    700: '#1d4ed8',
                    800: '#1e40af',
                },
            },
            borderRadius: {
                '2xl': '14px', 
                '3xl': '16px',
            },
            boxShadow: {
                card: '0 1px 3px 0 rgba(0,0,0,.06), 0 1px 2px -1px rgba(0,0,0,.04)',
            },
       },
    },
    plugins: [],
}