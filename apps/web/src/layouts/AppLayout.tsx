import { FC } from 'react'
import { Box, Grid } from '@chakra-ui/react'
import { BottomBar, Navbar, SuggestPersons, Tendencies, Toolbar, SearchModal } from '@twitt-duck/ui'

interface Props {
  children: React.ReactNode;
}

export const AppLayout: FC<Props> = ({children }) => {

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
              <SuggestPersons />
              <div style={{ height: '1rem'}}></div>
              <Tendencies />
            </Box>
          }
        </Box>
      </Grid>
      <BottomBar />
      <SearchModal />
    </Box>
  )
}
