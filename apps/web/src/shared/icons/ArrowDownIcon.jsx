import { BaseIcon } from './BaseIcon'

export const ArrowDownIcon = ({ active = false, size, className = '' }) => (
  <BaseIcon size={size} viewBox={active ? '16 52 20 20' : '16 16 20 20'} className={className}>
    {active ? (
      <path d="M20.1667 59.0833L26 64.9167L31.8333 59.0833" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    ) : (
      <path d="M20.1667 23.0833L26 28.9167L31.8333 23.0833" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
    )}
  </BaseIcon>
)
