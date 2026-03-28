/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#050505',
        'primary-cyan': '#00e5ff',
        'primary-blue': '#0094ff',
        'border-dark': '#303030',
        'input-dark': '#1a1a1a',
      },
      fontFamily: {
        sans: ['Ubuntu', 'sans-serif'],
      },
      backgroundColor: {
        dark: '#050505',
        card: '#303030',
      },
      borderColor: {
        dark: '#303030',
      },
    },
  },
  plugins: [],
}
