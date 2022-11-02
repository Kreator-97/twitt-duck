import { useEffect } from 'react'
import { finishChecking, loadState, login, useAppDispatch } from '@twitt-duck/state'
import { ImageVisor } from '@twitt-duck/ui'

import { AppRouter } from './routes/AppRouter'
import { DBLocal } from './utils'
import './index.css'
import { useNotifications } from '@twitt-duck/hooks'

function App() {
  const dispatch = useAppDispatch()
  const { notifications } = useNotifications()

  useEffect(() => {
    const user = DBLocal.loadUserFromLocal()
    if( user && user.active) {
      dispatch(login(user))
    } else {
      dispatch(finishChecking())
    }
  }, [])

  useEffect(() => {
    if( notifications ) {
      dispatch( loadState(notifications) )
    }
  }, [notifications])

  return (
    <div>
      <AppRouter />
      <ImageVisor />
    </div>
  )
}

export default App
