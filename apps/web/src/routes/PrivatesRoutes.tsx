import { FC } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import { ExplorePage, HomePage, MessagesPage, NotificationPage, ProfilePage, SearchPage } from '../pages'

interface Props {
  isAuthenticated: boolean;
}

export const PrivateRoutes: FC<Props> = ({ isAuthenticated }) => {

  if( isAuthenticated) {
    return (
      <Routes>
        <Route
          path='/'
          element={<HomePage />}
        />
        <Route
          path='/notification'
          element={<NotificationPage />}
        />
        <Route
          path='/messages'
          element={<MessagesPage />}
        />
        <Route
          path='/explore'
          element={<ExplorePage />}
        />
        <Route
          path='/profile/*'
          element={<ProfilePage />}
        />
        <Route
          path='/search'
          element={<SearchPage />}
        />
      </Routes>
    )
  }

  return (
    <Navigate to='/auth/login' />
  )
}
