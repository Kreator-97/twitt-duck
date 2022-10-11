import { FC } from 'react'
import { Navbar, SuggestPersons, Tendencies, Toolbar } from '@twitt-duck/ui'
import { Box, Grid } from '@chakra-ui/react'
import { BottomBar, FloatingActionButton, SearchModal } from '@twitt-duck/ui/components'

interface Props {
  children: React.ReactNode;
}

export const AppLayout: FC<Props> = ({children }) => {

  return (
    <Box
      m='0 auto 0'
      p={{ base: '0 .5rem', lg: '0 1rem' }}
    >
      <Navbar />
      <Grid
        maxWidth='1440px'
        gridTemplateColumns={{
          base: '1fr',
          md: 'auto 1fr',
          lg: '280px 1fr 280px'
        }}
        gap={{base: '.5rem', lg: '1rem'}}
        margin={{base: '.5rem auto', lg: '1rem auto'}}
        justifyContent='start'
        alignItems='start'
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
          display={{ base: 'none', lg: 'block' }}
          overflowY='scroll'
        >
          {
            <Box>
              <Tendencies />
              <div style={{ height: '1rem'}}></div>
              <SuggestPersons />
            </Box>
          }
        </Box>
      </Grid>
      <BottomBar />
      <FloatingActionButton />
      <SearchModal />
    </Box>
  )
}
