import { Navigate } from 'react-router-dom'
import { useAuth } from '@/providers/AuthProvider'

export const Setup = () => {
  const { user } = useAuth()
  if (user?.setupComplete) return <Navigate to="/palette" replace />
  return <div>Setup</div>
}
