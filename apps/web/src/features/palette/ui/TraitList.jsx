import { Trait } from './Trait'

export const TraitList = ({ traits }) => (
  <div className="flex flex-col h-screen w-full overflow-hidden">
    {traits.map(({ id, trait, color }) => (
      <Trait key={id} trait={trait} color={color} />
    ))}
  </div>
)
