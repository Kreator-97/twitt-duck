import { useEffect } from 'react'
import { finishChecking, login, useAppDispatch } from '@twitt-duck/state'
import { ConfirmRemoveRepost, ImageVisor } from '@twitt-duck/ui'

import { AppRouter } from './routes/AppRouter'
import { DBLocal } from './utils'
import './index.css'

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
      <ConfirmRemoveRepost />
    </div>
  )
}

export default App
