import { FC } from 'react'
import { Box } from '@chakra-ui/react'

import background from '../assets/subtle-prism.svg'

interface Props {
  children: React.ReactNode;
}

export const AuthLayout: FC<Props> = ({children}) => {
  return (
    <Box
      bgImage={background}
    >
      <Box
        maxW='480px'
        p='1rem'
        minH='100vh'
        m='0 auto'
        boxShadow='md'
        bg='white'
      >
        { children }
      </Box>
    </Box>
  )
}
