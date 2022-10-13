import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { ScrollToTop } from '@twitt-duck/ui'
import { useAppSelector } from '@twitt-duck/state'

import { PrivateRoutes } from './PrivatesRoutes'
import { PublicRoutes } from './PublicRoutes'

export const AppRouter = () => {
  const { logged } = useAppSelector( state => state.auth )
  const isAuthenticated = logged

  return (
    <Router>
      <ScrollToTop >
        <Routes>
          <Route
            path='/auth/*'
            element={ <PublicRoutes isAuthenticated={ isAuthenticated } /> }
          />

          <Route
            path='/*'
            element={ <PrivateRoutes isAuthenticated={ isAuthenticated } /> }
          />

          <Route path='*' element={<p>La página no existe</p>}/>
        </Routes>
      </ScrollToTop>
    </Router>
  )
}
