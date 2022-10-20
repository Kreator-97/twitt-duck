import { useEffect } from 'react'
import { finishChecking, login, useAppDispatch } from '@twitt-duck/state'

import { AppRouter } from './routes/AppRouter'
import { DBLocal } from './utils'
import './index.css'
import { ImageVisor } from '@twitt-duck/ui'

function App() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    const user = DBLocal.loadUserFromLocal()
    if( user && user.active) {
      dispatch(login(user))
    } else {
      dispatch(finishChecking())
    }
  }, [])

  return (
    <div>
      <AppRouter />
      <ImageVisor />
    </div>
  )
}

export default App
