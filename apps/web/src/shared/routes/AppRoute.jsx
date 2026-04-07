import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '@/providers/AuthProvider'

export const AppRoute = () => {
  const { user, isLoading } = useAuth()
  const { pathname } = useLocation()
  if (isLoading) return null
  if (!user) return <Navigate to={`/login?redirect=${encodeURIComponent(pathname)}`} replace />
  if (!user.setupComplete) return <Navigate to={`/setup?redirect=${encodeURIComponent(pathname)}`} replace />
  return <Outlet />
}
