import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Login, Setup, Users, Connections, Traits, AuthCallback, Palette } from '@/pages'
import { DevGallery } from '@/pages/DevGallery'
import { ProtectedRoute, PublicRoute } from '@/shared/routes'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />

        <Route element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route path="/setup" element={<Setup />} />
          <Route path="/palette" element={<Palette />} />
          <Route path="/users" element={<Users />} />
          <Route path="/connections" element={<Connections />} />
          <Route path="/traits" element={<Traits />} />
        </Route>

        <Route path="/auth/callback" element={<AuthCallback />} />
        <Route path="/dev/gallery" element={<DevGallery />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
