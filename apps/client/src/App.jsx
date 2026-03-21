import { Routes, Route } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './pages/Home'
import Error from './pages/errors/Error'
import Forbidden from './pages/errors/Forbidden'
import NotFound from './pages/errors/NotFound'
import Me from './pages/Me'

function App() {
  return (
    <Routes>
      {/* Public routes */}
     
      <Route path="/" element={<Home />} />
      <Route path="/error" element={<Error />} />
      <Route path="/403" element={<Forbidden />} />
      <Route path="*" element={<NotFound />} />

      {/* Protected routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/me" element={<Me />} />
      </Route>
    </Routes>
  )
}

export default App
