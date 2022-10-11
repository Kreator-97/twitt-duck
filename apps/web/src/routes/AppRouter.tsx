import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { ScrollToTop } from '@twitt-duck/ui'

import { PrivateRoutes } from './PrivatesRoutes'
import { PublicRoutes } from './PublicRoutes'

export const AppRouter = () => {
  const isAuthenticated = true

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
