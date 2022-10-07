import { FC } from 'react'
import { Navbar } from '@twitt-duck/ui'

interface Props {
  children: React.ReactNode;
}

export const ProfileLayout: FC<Props> = ({ children }) => {
  return (
    <div style={{ margin: '0 auto 0', padding: '0 1rem' }}>
      <Navbar />
      <main>
        {
          children
        }
      </main>
    </div>
  )
}
