import { FC } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Box, Grid } from '@chakra-ui/react'
import { useAppSelector } from '@twitt-duck/state'
import { useUser } from '@twitt-duck/hooks'
import { mutateAllPages } from '@twitt-duck/services'
import {
  BottomBar,
  ConfirmRemoveRepost,
  Loader,
  Navbar,
  SearchModal,
  Toolbar,
  UserDetail,
} from '@twitt-duck/ui'

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

  const username = pathname.startsWith('/profile')
    ? user.username
    : pathname.split('/')[pathname.split('/').length-1]

  const { user: userDetail, isLoading } = useUser(username)
  if( isLoading ) return <Loader />

  const onSuccess = () => {
    mutateAllPages(pathname)
  }

  return (
    <Box
      p={{ base: '0 .5rem', md: '0 1rem' }}
      m={{ margin: '0 auto 0'}}
    >
      <Navbar />
      <Box
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
            backgroundImage: userDetail?.backgroundPic ? `url(${userDetail.backgroundPic})` : 'url(/images/default-bg.jpg)',
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
          maxWidth='1080px'
          justifyContent='start'
        >
          <Toolbar />
          <Box
            as='main'
            p={{ base: '.5rem', md: '1rem' }}
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
      <ConfirmRemoveRepost onSuccess={ onSuccess }/>
    </Box>
  )
}
