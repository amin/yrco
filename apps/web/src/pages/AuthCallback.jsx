import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useIsFetching } from '@tanstack/react-query'
import { useAuth } from '@/providers/AuthProvider'
import { PROTECTED_ROUTES } from '@/shared/routes'
import { queryKeys } from '@/lib/queryKeys'

export const AuthCallback = () => {
  const { user, isLoading } = useAuth()
  const isFetching = useIsFetching({ queryKey: queryKeys.me }) > 0
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const raw = searchParams.get('redirect')
  const redirect = PROTECTED_ROUTES.some(r => r.path === raw) ? raw : null

  useEffect(() => {
    if (isLoading || isFetching) return

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
