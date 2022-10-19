import { FC } from 'react'
import { Navbar } from '@twitt-duck/ui'
import { Box, Grid } from '@chakra-ui/react'
import { BottomBar, FloatingActionButton, SearchModal, Toolbar, UserDetail } from '@twitt-duck/ui/components'

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
        <Box
          minHeight={{
            base: '200px',
            sm: '250px',
            md: '300px',
            lg: '400px'
          }}
          objectFit='cover'
          style={{
            objectFit: 'cover',
            backgroundImage: 'url(https://getwallpapers.com/wallpaper/full/1/7/f/1334809-most-popular-best-4k-wallpapers-1920x1080-download-free.jpg)',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
          }}
        />
        <UserDetail />
        <Grid
          gridTemplateColumns={{ base: '1fr', md: 'auto 1fr', lg: '240px 1fr' }}
          gap='1rem'
          alignItems='start'
          margin='0 auto'
          maxWidth='1280px'
          justifyContent='start'
        >
          <Toolbar />
          <Box
            as='main'
            p='1rem'
            bg='white'
            boxShadow='md'
            rounded='md'
          >

            {
              children
            }
          
          </Box>
        </Grid>
      </Box>
      <FloatingActionButton />
      <BottomBar />
      <SearchModal />
    </Box>
  )
}
