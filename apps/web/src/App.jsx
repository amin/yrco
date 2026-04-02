import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { DevGallery } from '@/pages/DevGallery'
import { ProtectedRoute, PublicRoute, PROTECTED_ROUTES, PUBLIC_ROUTES, UNGUARDED_ROUTES } from '@/shared/routes'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />

        <Route element={<PublicRoute />}>
          {PUBLIC_ROUTES.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}
        </Route>

        <Route element={<ProtectedRoute />}>
          {PROTECTED_ROUTES.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}
        </Route>

        {UNGUARDED_ROUTES.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}

        <Route path="/dev/gallery" element={<DevGallery />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
