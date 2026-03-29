import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Setup from './pages/Setup'
import Users from './pages/Users'
import Connections from './pages/Connections'
import Traits from './pages/Traits'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/setup" element={<Setup />} />
        <Route path="/users" element={<Users />} />
        <Route path="/connections" element={<Connections />} />
        <Route path="/traits" element={<Traits />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
