import { useState } from 'react'
import { Swatch } from './Swatch'

export const SwatchList = ({ traits }) => {
  const [expandedId, setExpandedId] = useState(null)

  const toggle = (id) => setExpandedId(prev => prev === id ? null : id)

  return (
    <div className="flex flex-col h-full w-full overflow-hidden">
      {traits.map(({ id, trait, color, colorText, icebreaker }) => (
        <Swatch
          key={id}
          trait={trait}
          color={color}
          colorText={colorText}
          icebreaker={icebreaker}
          expanded={expandedId === id}
          collapsed={expandedId !== null && expandedId !== id}
          onClick={() => toggle(id)}
        />
      ))}
    </div>
  )
}
