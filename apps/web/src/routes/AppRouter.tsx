import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { HomePage, ProfilePage } from '../pages'

export const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/profile/*' element={<ProfilePage />} />
      </Routes>
    </Router>
  )
}
