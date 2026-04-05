import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '@/providers/AuthProvider'

export const ProtectedRoute = () => {
  const { user, isLoading } = useAuth()
  const { pathname } = useLocation()

  if (isLoading) return null
  if (!user) return <Navigate to="/login" replace />
  if (!user.setupComplete && pathname !== '/setup') return <Navigate to="/setup" replace />

  return <Outlet />
}
