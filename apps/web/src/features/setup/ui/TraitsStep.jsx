import { useState, useMemo } from 'react'
import { Button } from '@/shared/ui/buttons/Button'
import { TraitButton } from './TraitButton'
import { shuffle } from '@/utils/shuffle'

const MAX = 7

export const TraitsStep = ({ traits, onComplete }) => {
  const [selectedIds, setSelectedIds] = useState([])
  const shuffledTraits = useMemo(() => shuffle(traits), [traits])

  const toggle = (id) => {
    setSelectedIds(prev =>
      prev.includes(id)
        ? prev.filter(t => t !== id)
        : prev.length < MAX ? [...prev, id] : prev
    )
  }

  return (
    <div className="flex-1 min-h-0 flex flex-col relative">
      {/* Title — top half, text pinned to bottom */}
      <div className="shrink-0 h-1/2 flex items-end justify-center px-8 pb-10 text-center">
        <span className="text-2xl font-normal tracking-[-1.2px]">
          What seven skills and strengths best describe you?
        </span>
      </div>

      {/* Scrollable traits */}
      <div className="flex-1 min-h-0 overflow-y-auto px-base pb-16">
        <div className="flex flex-wrap gap-s justify-center">
          {shuffledTraits.map(({ id, trait, color, colorText }) => (
            <TraitButton
              key={id}
              trait={trait}
              color={color}
              colorText={colorText}
              picked={selectedIds.includes(id)}
              onClick={() => toggle(id)}
            />
          ))}
        </div>
      </div>

      {/* Floating button — no background, sits over content */}
      <div className="absolute bottom-0 right-0 p-base">
        <Button disabled={selectedIds.length !== MAX} onClick={() => onComplete(selectedIds)}>
          Next
        </Button>
      </div>
    </div>
  )
}
