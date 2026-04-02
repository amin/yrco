import { useAuth } from '@/providers/AuthProvider'
import { TraitList } from '@/shared/ui/traits'

export const Palette = () => {
  const { user } = useAuth()
  return <TraitList traits={user?.traitIds ?? []} />
}
