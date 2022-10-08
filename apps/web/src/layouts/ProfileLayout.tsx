import { FC } from 'react'
import { Navbar } from '@twitt-duck/ui'
import { Box } from '@chakra-ui/react'
import { BottomBar, FloatingActionButton } from '@twitt-duck/ui/components'

interface Props {
  children: React.ReactNode;
}

export const ProfileLayout: FC<Props> = ({ children }) => {
  return (
    <Box
      p={{ base: '0 .5rem', md: '0 1rem' }}
      m={{ margin: '0 auto 0'}}
    >
      <Navbar />
      <Box as='main'
        marginBottom='64px'
      >
        {
          children
        }
      </Box>
      <FloatingActionButton />
      <BottomBar />
    </Box>
  )
}
