import { FC } from 'react'
import { mutate } from 'swr'
import { Box, Grid } from '@chakra-ui/react'
import { useLocation } from 'react-router-dom'

import {
  BottomBar,
  ConfirmRemoveRepost,
  Navbar,
  SearchModal,
  SuggestPeople,
  Tendencies,
  Toolbar,
} from '@twitt-duck/ui'

import { useAppSelector } from '@twitt-duck/state'

interface Props {
  children: React.ReactNode;
}

export const AppLayout: FC<Props> = ({children }) => {
  const { pathname } = useLocation()
  const { user } = useAppSelector( state => state.auth)

  if( !user ) {
    console.error('no existe el usuario')
    return <></>
  }

  const onSuccess = () => {
    mutate('http://localhost:5000/api/post/')
    if( pathname.startsWith('/post/') ) {
      const URLToReload = `http://localhost:5000/api${pathname}`
      mutate(URLToReload)
    }
  }

  return (
    <Box
      m='0 auto 3rem'
      p={{ base: '0 .5rem', lg: '0 1rem' }}
    >
      <Navbar />
      <Grid
        maxWidth='1440px'
        gap={{base: '.5rem', lg: '1rem'}}
        margin={{base: '.5rem auto', lg: '1rem auto'}}
        justifyContent='start'
        alignItems='start'
        gridTemplateColumns={{
          base: '1fr',
          md: 'auto 1fr',
          xl: 'auto 1fr 320px'
        }}
      >
        <Toolbar/>
        <main>
          {
            children
          }
        </main>
        <Box
          as='aside'
          p={0}
          position='sticky'
          top='.5rem'
          height='100vh'
          display={{ base: 'none', xl: 'block' }}
          overflowY='scroll'
          pb='2rem'
        >
          {
            <Box>
              <SuggestPeople />
              <div style={{ height: '1rem'}}></div>
              <Tendencies />
            </Box>
          }
        </Box>
      </Grid>
      <BottomBar />
      <SearchModal />
      <ConfirmRemoveRepost onSuccess={ onSuccess } />
    </Box>
  )
}
