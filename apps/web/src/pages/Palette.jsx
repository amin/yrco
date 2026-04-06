import { useTraits } from '@/features/traits'
import { TraitList } from '@/shared/ui'

export const Palette = () => {
  const { traits } = useTraits()
  return <TraitList traits={traits} />
}
