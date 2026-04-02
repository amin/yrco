import { useState } from 'react'
import { Trait } from './Trait'

export const TraitList = ({ traits }) => {
  const [expandedId, setExpandedId] = useState(null)

  const toggle = (id) => setExpandedId(prev => prev === id ? null : id)

  return (
    <div className="flex flex-col h-full w-full overflow-hidden">
      {traits.map(({ id, trait, color, icebreaker }) => (
        <Trait
          key={id}
          trait={trait}
          color={color}
          icebreaker={icebreaker}
          expanded={expandedId === id}
          collapsed={expandedId !== null && expandedId !== id}
          onClick={() => toggle(id)}
        />
      ))}
    </div>
  )
}
