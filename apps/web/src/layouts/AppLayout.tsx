import { FC } from 'react'
import { Navbar, SuggestPersons, Tendencies, Toolbar } from '@twitt-duck/ui'
import { Grid } from '@chakra-ui/react'
interface Props {
  children: React.ReactNode;
}

export const AppLayout: FC<Props> = ({children }) => {

  return (
    <div style={{ margin: '0 auto 0', padding: '0 1rem' }}>
      <Navbar />
      <Grid
        maxWidth='1440px'
        gridTemplateColumns='280px 1fr 280px'
        gap='1rem'
        margin='1rem auto'
        justifyContent='start'
        alignItems='start'
      >
        <Toolbar />
        <main>
          {
            children
          }
        </main>
        <aside
          style={{
            padding: '0',
            position: 'sticky',
            top: '.5rem',
            height: '100vh',
            overflowY: 'scroll' 
          }}
        >
          {
            <>
              <Tendencies />
              <div style={{ height: '1rem'}}></div>
              <SuggestPersons />
            </>
          }
        </aside>
      </Grid>
    </div>
  )
}
