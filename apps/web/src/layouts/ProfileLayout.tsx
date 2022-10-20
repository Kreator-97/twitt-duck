import { FC } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Navbar } from '@twitt-duck/ui'
import { Box, Grid } from '@chakra-ui/react'
import { BottomBar, Loader, SearchModal, Toolbar, UserDetail } from '@twitt-duck/ui/components'
import { useAppSelector } from '@twitt-duck/state'

import { userUser } from '../hooks'

interface Props {
  children: React.ReactNode;
}

// this layout work for users pages and profile page

export const ProfileLayout: FC<Props> = ({ children }) => {
  const {pathname} = useLocation()
  const { user } = useAppSelector(state => state.auth)
  const navigate = useNavigate()

  if( !user ) {
    navigate('/auth/login')
    return <></>
  }

  const username = pathname === '/profile' ? user.username : pathname.split('/')[pathname.split('/').length-1]
  const { user: userDetail, isLoading } = userUser(username)

  if( isLoading ) return <Loader />

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
        <UserDetail user={userDetail} />
        <Grid
          gridTemplateColumns={{ base: '1fr', md: 'auto 1fr', lg: '280px 1fr' }}
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
      <BottomBar />
      <SearchModal />
    </Box>
  )
}
