import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useIsFetching } from '@tanstack/react-query'
import { useAuth } from '@/providers/AuthProvider'
import { validateRedirect } from '@/lib/validateRedirect'
import { queryKeys } from '@/lib/queryKeys'

export const AuthCallback = () => {
  const { user, isLoading } = useAuth()
  const isFetching = useIsFetching({ queryKey: queryKeys.me }) > 0
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const redirect = validateRedirect(searchParams.get('redirect'))

  useEffect(() => {
    if (isLoading || isFetching || user === undefined) return

    if (!user) {
      navigate('/login', { replace: true })
      return
    }

    if (!user.setupComplete) {
      navigate(redirect ? `/setup?redirect=${encodeURIComponent(redirect)}` : '/setup', { replace: true })
    } else {
      navigate(redirect || '/palette', { replace: true })
    }
  }, [user, isLoading, isFetching, navigate, redirect])

  return null
}
