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
      {/* Scrollable traits */}
      <div className="flex-1 min-h-0 overflow-y-auto px-base pb-16">
        {/* Title scrolls with content */}
        <div className="h-1/2 flex items-end justify-center pb-10 text-center">
          <span className="font-sans text-xl leading-xl tracking-tighter font-normal">
            What seven skills and strengths best describe you?
          </span>
        </div>
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
