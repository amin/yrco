import { useAuth } from '@/providers/AuthProvider'
import { TraitList } from '@/features/palette'

export const Palette = () => {
  const { user } = useAuth()
  return <TraitList traits={user?.traitIds ?? []} />
}
