import { useTraits, TraitList } from '@/features/traits'

export const Palette = () => {
  const { traits } = useTraits()
  return <TraitList traits={traits} />
}
