import { useEffect } from 'react'
import { useLogout } from '@/shared/hooks/useLogout'

export const Logout = () => {
  const logout = useLogout()
  useEffect(() => { logout() }, [logout])
  return null
}
