import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        cream:        'rgb(var(--c-cream) / <alpha-value>)',
        'cream-soft': 'rgb(var(--c-cream-soft) / <alpha-value>)',
        paper:        'rgb(var(--c-paper) / <alpha-value>)',
        'paper-edge': 'rgb(var(--c-paper-edge) / <alpha-value>)',
        bark:         'rgb(var(--c-bark) / <alpha-value>)',
        'bark-soft':  'rgb(var(--c-bark-soft) / <alpha-value>)',
        'bark-muted': 'rgb(var(--c-bark-muted) / <alpha-value>)',
        moss:         'rgb(var(--c-moss) / <alpha-value>)',
        'moss-dark':  'rgb(var(--c-moss-dark) / <alpha-value>)',
        amber:        'rgb(var(--c-amber) / <alpha-value>)',
        'amber-bright':'rgb(var(--c-amber-bright) / <alpha-value>)',
        rust:         'rgb(var(--c-rust) / <alpha-value>)',
      },
      fontFamily: {
        display: ['var(--font-fraunces)', 'serif'],
        sans:    ['var(--font-manrope)', 'system-ui', 'sans-serif'],
        mono:    ['var(--font-jb-mono)', 'monospace'],
      },
      maxWidth: {
        wrap: '1320px',
      },
      animation: {
        'fade-in':   'fadeIn 0.6s ease-out both',
        'slide-up':  'slideUp 0.7s cubic-bezier(.2,.7,.1,1) both',
        'sparkle':   'sparkle 4s ease-in-out infinite',
        'drift':     'drift 18s ease-in-out infinite',
        'pulse-slow':'pulseSlow 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn:    { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        slideUp:   { '0%': { opacity: '0', transform: 'translateY(24px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        sparkle:   { '0%,100%': { opacity: '0.3' }, '50%': { opacity: '1' } },
        drift:     { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-6px)' } },
        pulseSlow: { '0%,100%': { opacity: '0.4' }, '50%': { opacity: '1' } },
      },
    },
  },
  plugins: [],
};

export default config;
