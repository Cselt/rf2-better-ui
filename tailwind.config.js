module.exports = {
  // mode: 'jit',
  purge: {
    content: [
      './projects/rf2-better-ui/src/**/*.{html,ts}'
    ]
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      skew: {
        '22':  '22deg',
        '-22': '-22deg'
      }
    },
  },
  variants: {
    extend: {
      opacity: ['disabled'],
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  }
}
