import { FC } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { LoginPage, RegisterPage } from '../pages'
import { CustomizePage } from '../pages/Customize'

interface Props {
  isAuthenticated: boolean;
}

export const PublicRoutes: FC<Props> = ({ isAuthenticated }) => {

  if( !isAuthenticated ) {
    return (
      <Routes>
        <Route
          path='/login'
          element={<LoginPage/>}
        />
        <Route
          path='/register'
          element={<RegisterPage/>}
        />
        <Route
          path='/customize/*'
          element={<CustomizePage/>}
        />
      </Routes>
    )
  }

  return (
    <Navigate to='/' />
  )
}
