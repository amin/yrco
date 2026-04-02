import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '@/providers/AuthProvider'

export const PublicRoute = () => {
  const { user, isLoading } = useAuth()
  if (isLoading) return null
  return user ? <Navigate to="/palette" replace /> : <Outlet />
}
