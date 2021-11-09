module.exports = {
  mode: 'jit',
  purge: {
    content: ['./src/**/*.{html,ts}']
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'popup-title': '#b5b8ba',
        'popup-footer': '#ccc'
      },
      skew: {
        22: '22deg',
        '-22': '-22deg'
      }
    }
  },
  variants: {
    extend: {
      opacity: ['disabled'],
      scale: ['active']
    }
  },
  plugins: [],
  corePlugins: {
    preflight: false
  }
};
