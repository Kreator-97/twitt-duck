import { FC } from 'react'
import { Box, Grid } from '@chakra-ui/react'

import background from '../assets/subtle-prism.svg'

interface Props {
  children: React.ReactNode;
}

export const AuthLayout: FC<Props> = ({children}) => {
  return (
    <Grid
      bgImage={background}
      minH='100vh'
    >
      <Box
        maxW='480px'
        width='100%'
        minH='800px'
        p='1rem'
        m={{base: '0 auto', md: 'auto auto'}}
        boxShadow='md'
        bg='white'
      >
        { children }
      </Box>
    </Grid>
  )
}
