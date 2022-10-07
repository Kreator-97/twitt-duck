import { FC } from 'react'
import { Navbar, SuggestPerson, Tendencies } from '@twitt-duck/ui'

interface Props {
  children: React.ReactNode;
}

export const AppLayout: FC<Props> = ({children}) => {

  return (
    <div style={{ margin: '0 auto 0', padding: '0 1rem' }}>
      <Navbar />
      <div
        style={{
          display: 'grid',
          maxWidth: '1440px',
          gridTemplateColumns: '1fr 1fr 360px',
          gap: '1rem',
          margin: '0 auto'
        }}
      >
        <main style={{ gridColumnStart: 'span 2' }}>
          {
            children
          }
        </main>
        <aside
          style={{
            padding: '0',
            position: 'sticky',
            top: '0',
            height: '100vh',
            overflowY: 'scroll' 
          }}
        >
          <Tendencies />
          <div style={{ height: '1rem'}}></div>
          <SuggestPerson />
        </aside>
      </div>
    </div>
  )
}
