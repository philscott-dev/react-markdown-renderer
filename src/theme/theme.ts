import { Theme } from '@emotion/react'

const theme: Theme = {
  color: {
    black: {
      700: '#000000',
    },
    gray: {
      200: '#BEBEBE',
      300: '#8A8A8A',
      600: '#202124',
    },
    white: {
      100: '#FCFCFC',
    },
    aqua: {
      300: '#0287B1',
    },
    blue: {
      300: '#028FFF',
      400: '#0253B1',
      500: '#0F1337',
      600: '#0C0F2B',
      700: '#06091F',
    },
    navy: {
      300: '#0253B1',
    },
    magenta: {
      300: '#FF00B8',
    },
    green: {
      300: '#52A147',
    },
    red: {
      200: '#FF0202',
      300: '#ae2727',
    },
    purple: {
      300: '#9E00FF',
    },
    orange: {
      300: '#FF8A00',
    },
    indigo: {
      300: '#0030AC',
      400: '#002585',
      600: '#001343',
    },
  },
  gradient: {
    blue: 'linear-gradient(145deg, #0d102e, #0b0e27)',
    gray:
      'linear-gradient(180deg, #6B6B6B 0%, #484848 99.99%, rgba(107, 107, 107, 0) 100%)',
  },
  font: {
    family: 'Poppins',
    size: {
      h1: '72px',
      h2: '28px',
      h3: '26px',
      h4: '22px',
      h5: '22px',
      h6: '20px',
      large: '18px',
      medium: '16px',
      small: '14px',
      xsmall: '12px',
    },
  },
  breakpoint: {
    xsmall: '320px',
    small: '768px',
    medium: '992px',
    large: '1440px',
    xlarge: '1680px',
  },
  transition: {
    color: 'color 0.25s ease-in-out',
    background: 'background 0.25s ease-in-out',
    all: 'all 0.25s ease-in-out',
  },
  index: {
    100: 100,
  },
  shadow: {
    up: {
      two: '20px 20px 40px #0A0D25, -20px -20px 40px #0E1131',
      one: '20px 20px 20px #0A0D25, -20px -20px 20px #0E1131',
    },
    down: {
      one: 'inset 20px 20px 40px #050611; inset -20px -20px 40px #131845',
    },
  },
}

export default theme
