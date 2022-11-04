import { useEffect } from 'react'
import { ImageVisor } from '@twitt-duck/ui'
import { finishChecking, loadNotifications, login, useAppDispatch, useAppSelector } from '@twitt-duck/state'
import { getNotificationsRequest } from '@twitt-duck/services'

import { AppRouter } from './routes/AppRouter'
import { DBLocal } from './utils'
import './index.css'

function App() {
  const dispatch = useAppDispatch()
  const { user } = useAppSelector(state => state.auth)

  useEffect(() => {
    const user = DBLocal.loadUserFromLocal()
    if( user && user.active) {
      dispatch(login(user))
    } else {
      dispatch(finishChecking())
    }
  }, [])

  useEffect(() => {
    const token = DBLocal.getTokenFromLocal()
    if( token ) {
      getNotificationsRequest(token)
        .then((notifications) => {
          dispatch(loadNotifications(notifications))
        })
    }
  }, [user])

  return (
    <div>
      <AppRouter />
      <ImageVisor />
    </div>
  )
}

export default App
