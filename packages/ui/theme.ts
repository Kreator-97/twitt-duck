import { extendTheme } from '@chakra-ui/react'

const breakpoints = {
  sm: '320px',
  md: '640px',
  lg: '960px',
  xl: '1280px',
  '2xl': '1440px',
}

export const theme = extendTheme({
  breakpoints,
  styles: {
    global: {
      body: {
        bg: 'gray.100'
      }
    }
  }
})