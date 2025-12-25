/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './styles/**/*.css',
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        background: 'var(--color-background)',
        foreground: 'var(--color-foreground)',
        neutral: 'var(--color-neutral)',
        'neutral-light': 'var(--color-neutral-light)',
        'card-bg': 'var(--color-card-bg)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        growDown: {
          '0%': { height: '0%' },
          '100%': { height: '100%' },
        }
      },
      animation: {
        fadeIn: 'fadeIn 0.7s ease-out forwards',
        growDown: 'growDown 1s ease-out forwards',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: 'var(--border-radius)',
      },
      transitionProperty: {
        DEFAULT: 'var(--transition)',
      },
    },
  },
  plugins: [],
}
