module.exports = {
  purge: {
    content: ['./src/pages/**/*.{js,jsx,ts,tsx}', './src/components/**/*.{js,jsx,ts,tsx}']
  },
  darkMode: 'media',
  theme: {
    extend: {
      fontFamily: {
        sans: ['InterVar', 'Inter', 'sans-serif']
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/aspect-ratio')
  ]
}
