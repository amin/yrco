import { useState } from 'react'
import { Button } from '@/shared/ui/buttons/Button'
import { TraitButton } from './TraitButton'

const MAX = 7

export const TraitsStep = ({ traits, onComplete }) => {
  const [selectedIds, setSelectedIds] = useState([])

  const toggle = (id) => {
    setSelectedIds(prev =>
      prev.includes(id)
        ? prev.filter(t => t !== id)
        : prev.length < MAX ? [...prev, id] : prev
    )
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-m flex items-center justify-center">
        <div className="flex flex-col items-center gap-m">
        <span className="text-2xl font-light">Pick your traits</span>
        <div className="flex flex-wrap gap-s justify-center">
          {traits.map(({ id, trait, color }) => (
            <TraitButton
              key={id}
              trait={trait}
              color={color}
              picked={selectedIds.includes(id)}
              onClick={() => toggle(id)}
            />
          ))}
        </div>
        </div>
      </div>

      <div className="flex justify-end p-m">
        <Button disabled={selectedIds.length !== MAX} onClick={() => onComplete(selectedIds)}>
          Next
        </Button>
      </div>
    </div>
  )
}
