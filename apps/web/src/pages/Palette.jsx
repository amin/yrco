import { useTraits } from '@/features/traits'
import { SwatchList } from '@/shared/ui'

export const Palette = () => {
  const { traits } = useTraits()
  return <SwatchList traits={traits} />
}
