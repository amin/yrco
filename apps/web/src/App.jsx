import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { DevGallery } from '@/pages/DevGallery'
import { PublicRoute, AuthRoute, AppRoute, PUBLIC_ROUTES, AUTH_ROUTES, APP_ROUTES, OPEN_ROUTES } from '@/shared/routes'
import { ProtectedLayout } from '@/shared/layout'

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

        <Route element={<AuthRoute />}>
          {AUTH_ROUTES.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}
        </Route>

        <Route element={<AppRoute />}>
          {APP_ROUTES.map(({ path, element }) => (
            <Route key={path} path={path} element={<ProtectedLayout>{element}</ProtectedLayout>} />
          ))}
        </Route>

        {OPEN_ROUTES.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}

        <Route path="/dev/gallery" element={<DevGallery />} />
        <Route path="*" element={<Navigate to="/error?message=Page not found" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
