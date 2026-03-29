import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Login, Setup, Users, Connections, Traits } from './pages'

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
