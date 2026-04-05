import { useAuth } from '@/providers/AuthProvider'

export function useTraits() {
  const { user } = useAuth()
  return { traits: user?.traitIds ?? [] }
}
