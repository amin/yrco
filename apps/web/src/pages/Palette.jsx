import { useAuth } from '@/providers/AuthProvider'
import { SwatchList } from '@/shared/ui'

export const Palette = () => {
  const { user } = useAuth()
  return <SwatchList traits={user?.traitIds ?? []} />
}
