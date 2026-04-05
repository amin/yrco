import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '@/providers/AuthProvider'

export const AppRoute = () => {
  const { user, isLoading } = useAuth()
  if (isLoading) return null
  if (!user) return <Navigate to="/login" replace />
  if (!user.setupComplete) return <Navigate to="/setup" replace />
  return <Outlet />
}
