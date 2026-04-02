import { BaseIcon } from './BaseIcon'

export const ArrowUpIcon = ({ active = false, size, className = '' }) => (
  <BaseIcon size={size} viewBox={active ? '16 52 20 20' : '16 16 20 20'} className={className}>
    {active ? (
      <path d="M20.1667 64.9167L26 59.0833L31.8333 64.9167" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    ) : (
      <path d="M20.1667 28.9167L26 23.0833L31.8333 28.9167" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
    )}
  </BaseIcon>
)
