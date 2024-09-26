/** @type {import('tailwindcss').Config} */
export default {

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
        },
    },
    plugins: [],
}