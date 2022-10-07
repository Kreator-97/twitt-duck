import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { HomePage } from './pages'
import './index.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePage />} />
      </Routes>
    </Router>
  )
}

export default App
