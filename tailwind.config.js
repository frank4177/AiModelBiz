/** @type {import('tailwindcss').Config} */

module.exports = {
    content: [
      './pages/**/*.{js,ts,jsx,tsx}',
      './components/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
      extend: {
        colors:{
          primary: {
            DEFAULT: '#22263F',
            foreground: 'hsl(var(--primary-foreground))'
          }
       
      },
    },
      plugins: [],
    }
  }