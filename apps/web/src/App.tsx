import { useEffect } from 'react'
import { AppRouter } from './routes/AppRouter'
import './index.css'
import { login, useAppDispatch } from '@twitt-duck/state'

function App() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}' )
    if( Object.keys(user).length !== 0 ) {
      dispatch(login(user))
    }
  }, [])

  return (
    <AppRouter />
  )
}

export default App
