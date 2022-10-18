import { useEffect } from 'react'
import { login, useAppDispatch } from '@twitt-duck/state'

import { AppRouter } from './routes/AppRouter'
import { DBLocal } from './utils'
import './index.css'

function App() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    const user = DBLocal.loadUserFromLocal()
    if( user && user.active) {
      dispatch(login(user))
    }
  }, [])

  return (
    <AppRouter />
  )
}

export default App
