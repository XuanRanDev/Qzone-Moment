/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        surface: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        },
        brand: {
          50: '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
        },
        neon: {
          blue: '#06b6d4',
          purple: '#8b5cf6',
          pink: '#ec4899',
          green: '#10b981',
        }
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'slide-up': 'slideUp 0.8s ease-out',
        'fade-in': 'fadeIn 1s ease-out',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 14s linear infinite',
        'bounce-gentle': 'bounceGentle 3s ease-in-out infinite',
        'aurora-1': 'aurora1 22s linear infinite',
        'aurora-2': 'aurora2 26s linear infinite',
        'aurora-3': 'aurora3 18s linear infinite',
        'aurora-4': 'aurora2 24s linear infinite reverse',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(99, 102, 241, 0.5), 0 0 10px rgba(99, 102, 241, 0.3)' },
          '100%': { boxShadow: '0 0 20px rgba(99, 102, 241, 0.8), 0 0 40px rgba(99, 102, 241, 0.5)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        bounceGentle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        aurora1: {
          '0%, 100%': { transform: 'translate(0%, 0%) scale(1)' },
          '12.5%': { transform: 'translate(18%, 10%) scale(1.12)' },
          '25%': { transform: 'translate(28%, 28%) scale(1.25)' },
          '37.5%': { transform: 'translate(22%, 42%) scale(1.15)' },
          '50%': { transform: 'translate(0%, 46%) scale(0.95)' },
          '62.5%': { transform: 'translate(-22%, 38%) scale(0.8)' },
          '75%': { transform: 'translate(-30%, 18%) scale(0.88)' },
          '87.5%': { transform: 'translate(-16%, 4%) scale(0.97)' },
        },
        aurora2: {
          '0%, 100%': { transform: 'translate(0%, 0%) scale(1)' },
          '12.5%': { transform: 'translate(-20%, -14%) scale(1.13)' },
          '25%': { transform: 'translate(-32%, -26%) scale(1.28)' },
          '37.5%': { transform: 'translate(-30%, -36%) scale(1.18)' },
          '50%': { transform: 'translate(-10%, -40%) scale(0.92)' },
          '62.5%': { transform: 'translate(14%, -32%) scale(0.78)' },
          '75%': { transform: 'translate(28%, -16%) scale(0.85)' },
          '87.5%': { transform: 'translate(18%, -4%) scale(0.96)' },
        },
        aurora3: {
          '0%, 100%': { transform: 'translate(0%, 0%) scale(1)' },
          '12.5%': { transform: 'translate(16%, -20%) scale(1.15)' },
          '25%': { transform: 'translate(30%, -34%) scale(1.32)' },
          '37.5%': { transform: 'translate(36%, -30%) scale(1.2)' },
          '50%': { transform: 'translate(28%, -8%) scale(0.95)' },
          '62.5%': { transform: 'translate(10%, 14%) scale(0.8)' },
          '75%': { transform: 'translate(-12%, 26%) scale(0.88)' },
          '87.5%': { transform: 'translate(-4%, 10%) scale(0.98)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'mesh-gradient': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
