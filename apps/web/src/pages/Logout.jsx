import { useEffect } from 'react'
import { useAuth } from '@/providers/AuthProvider'

export const Logout = () => {
  const { logout } = useAuth()
  useEffect(() => { logout() }, [logout])
  return null
}
