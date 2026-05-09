/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg: {
          light: '#FAFAF7',
          dark: '#0E0E10',
        },
        ink: {
          light: '#171717',
          dark: '#ECECEA',
        },
        accent: {
          light: '#1B4FCE',
          dark: '#5B82E8',
        },
        action: {
          adopt: { light: '#059669', dark: '#34D399' },
          experiment: { light: '#2563EB', dark: '#60A5FA' },
          watch: { light: '#D97706', dark: '#FBBF24' },
          ignore: { light: '#737373', dark: '#A3A3A3' },
        },
      },
      fontFamily: {
        serif: ['"Source Serif 4 Variable"', 'Source Serif 4', 'Georgia', 'serif'],
        sans: ['"Inter Variable"', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono Variable"', 'JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      maxWidth: {
        prose: '680px',
      },
      spacing: {
        rhythm: '8px',
      },
    },
  },
  plugins: [],
};
