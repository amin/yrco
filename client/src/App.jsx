import { Routes, Route } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './pages/Home'
import AuthCallback from './pages/AuthCallback'
import Error from './pages/Error'
import Forbidden from './pages/Forbidden'
import NotFound from './pages/NotFound'

function App() {
  return (
    <Routes>
      {/* Public routes */}
     
      <Route path="/" element={<Home />} />
      <Route path="/auth/callback" element={<AuthCallback />} />
      <Route path="/error" element={<Error />} />
      <Route path="/403" element={<Forbidden />} />
      <Route path="*" element={<NotFound />} />

      {/* Protected routes */}
      <Route element={<ProtectedRoute />}>
      </Route>
    </Routes>
  )
}

export default App
