/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace'],
      },
      colors: {
        // Paleta Minimalista Profissional - Neutro elegante
        primary: {
          50: '#f9f9f9',
          100: '#f3f3f3',
          200: '#e8e8e8',
          300: '#d1d1d1',
          400: '#a6a6a6',
          500: '#666666',
          600: '#4a4a4a',
          700: '#333333',
          800: '#1a1a1a',
          900: '#0d0d0d',
          950: '#000000',
        },
        secondary: {
          50: '#f0f4ff',
          100: '#e0e8ff',
          200: '#c7d5ff',
          300: '#a8b9ff',
          400: '#7a93ff',
          500: '#0066cc',
          600: '#0052a3',
          700: '#003d7a',
          800: '#002952',
          900: '#001a33',
          950: '#000d1a',
        },
        gray: {
          50: '#f9f9f9',
          100: '#f3f3f3',
          200: '#e8e8e8',
          300: '#d1d1d1',
          400: '#a6a6a6',
          500: '#666666',
          600: '#4a4a4a',
          700: '#333333',
          800: '#1a1a1a',
          850: '#0d0d0d',
          900: '#0d0d0d',
          950: '#000000',
        },
        accent: {
          blue: '#0066cc',
          orange: '#666666',
          gold: '#888888',
        }
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(8px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      boxShadow: {
        'soft': '0 2px 15px rgba(0, 0, 0, 0.08)',
        'medium': '0 4px 25px rgba(0, 0, 0, 0.12)',
        'large': '0 8px 40px rgba(0, 0, 0, 0.16)',
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
}
