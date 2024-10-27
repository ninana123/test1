/** @type {import('tailwindcss').Config} */
export default {
    important: false,
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            backgroundImage: {
                'main': "url('@/assets/images/bg-main.jpg')",
            }
        },
        colors: {
            'c-blue-1': '#3831fe',
            'c-blue-2': '#3831FD',
            'c-blue-3': '#0700C8',
            'c-gray-1': '#e7e9ed',
            'c-gray-2': 'rgba(56, 49, 253, 0.15)',
            'c-gray-3': '#F4F7FA',
            'c-gray-4': '#ADB5BD',
            'c-gray-5': 'rgb(200 200 200)',
            'c-gray-6': '#EBEAFF',
            'c-black-1': '#161A1A',
            'c-black-2': '#212529',
            'c-black-3':'rgb(30 34 34)',
            'c-black-4':'rgb(22 26 26)',
            'c-black-5':'rgba(0,0,0,0.25)',
            'c-white-1': '#F8F9FD',
            'c-white': '#fff'
        },

        screens: {
            'xl': {'max': '1279px'},
            // => @media (max-width: 1279px) { ... }

            'lg': {'max': '1023px'},
            // => @media (max-width: 1023px) { ... }

            'md': {'max': '767px'},
            // => @media (max-width: 767px) { ... }

            'sm': {'max': '639px'},
            // => @media (max-width: 639px) { ... }
            'xs': {'max':'374px'}
        },
    },
    plugins: [],
}