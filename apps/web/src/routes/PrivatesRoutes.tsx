import { FC } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'

import { CommentPage, ExplorePage, HomePage, NotificationPage, PostPage, ProfilePage, SearchPage, SettingsPage } from '../pages'
import { UserPage } from '../pages/User'

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
          path='/explore'
          element={<ExplorePage />}
        />
        <Route
          path='/profile'
          element={<ProfilePage />}
        />
        <Route
          path='/profile/settings'
          element={<SettingsPage />}
        />
        <Route
          path='/user/*'
          element={<UserPage />}
        />
        <Route
          path='/search'
          element={<SearchPage />}
        />
        <Route
          path='/post/*'
          element={<PostPage />}
        />
        <Route
          path='/comment/*'
          element={<CommentPage />}
        />
        <Route
          path='*'
          element={<h1>La página no existe</h1>}
        />
      </Routes>
    )
  }

  return (
    <Navigate to='/auth/login' />
  )
}
