import { FC } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { LoginPage, RegisterPage } from '../pages'

interface Props {
  isAuthenticated: boolean;
}

export const PublicRoutes: FC<Props> = ({ isAuthenticated }) => {

  if( !isAuthenticated ) {
    return (
      <Routes>
        <Route
          path='/register'
          element={<RegisterPage/>}
        />
        <Route
          path='/login'
          element={<LoginPage/>}
        />
      </Routes>
    )
  }

  return (
    <Navigate to='/' />
  )
}
