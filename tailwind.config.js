/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Charitics Theme Colors
        primary: '#EB5310',
        secondary: '#FAA019',
        accent: '#FFE9C8',
        light: '#FFF9F4',
        orange: '#FC791A',
        dark: '#1E252F',
        gray: {
          DEFAULT: '#434343',
          light: '#D2D2D1',
          lighter: '#F4F4F4',
        }
      },
      fontFamily: {
        'primary': ['Manrope', 'serif'],
        'quicksand': ['Quicksand', 'serif'],
        'caveat': ['Caveat', 'serif'],
      },
      spacing: {
        'xs': '0.25rem',
        'sm': '0.5rem',
        'md': '1rem',
        'lg': '1.5rem',
        'xl': '2rem',
        '2xl': '3rem',
        '3xl': '4rem',
      },
      fontSize: {
        'xs': '0.75rem',
        'sm': '0.875rem',
        'base': '1rem',
        'lg': '1.125rem',
        'xl': '1.25rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
        '4xl': '2.5rem',
        '5xl': '3rem',
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(90deg, #EB5310 0%, #FAA019 100%)',
        'gradient-banner': 'linear-gradient(135deg, #ff5722, #ff7043)',
      },
      animation: {
        'spin-slow': 'spin 1s linear infinite',
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      boxShadow: {
        'card': '0 4px 20px rgba(0, 0, 0, 0.08)',
        'card-hover': '0 8px 30px rgba(0, 0, 0, 0.15)',
        'header': '0 2px 10px rgba(0,0,0,0.1)',
      },
      borderRadius: {
        'card': '0.75rem',
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '1rem',
          lg: '1.5rem',
          xl: '2rem',
        },
        screens: {
          sm: '576px',
          md: '768px',
          lg: '1024px',
          xl: '1200px',
          '2xl': '1400px',
        },
      },
    },
  },
  plugins: [],
}