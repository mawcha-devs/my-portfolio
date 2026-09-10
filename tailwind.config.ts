import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        muted: 'hsl(var(--muted))',
        'muted-foreground': 'hsl(var(--muted-foreground))',
        border: 'hsl(var(--border))',
        card: 'hsl(var(--card))',
        'card-foreground': 'hsl(var(--card-foreground))',
        primary: 'hsl(var(--primary))',
        'primary-foreground':
          'hsl(var(--primary-foreground))',
        accent: 'hsl(var(--accent))',
        'accent-foreground':
          'hsl(var(--accent-foreground))',
        ring: 'hsl(var(--ring))',
        success: 'hsl(var(--success))',
        danger: 'hsl(var(--danger))',
      },
      boxShadow: {
        soft: '0 10px 30px -12px rgba(15, 23, 42, 0.18)',
        glow: '0 0 0 1px rgba(148, 163, 184, 0.18), 0 18px 40px -20px rgba(15, 23, 42, 0.28)',
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.5rem',
      },
      fontFamily: {
        sans: ['var(--font-sans)'],
        display: ['var(--font-display)'],
      },
      spacing: {
        18: '4.5rem',
      },
    },
  },
  plugins: [],
};

export default config;
