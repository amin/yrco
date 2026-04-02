import { BaseIcon } from './BaseIcon'

export const ArrowLeftIcon = ({ active = false, size, className = '' }) => (
  <BaseIcon size={size} viewBox={active ? '16 52 20 20' : '16 16 20 20'} className={className}>
    {active ? (
      <>
        <path d="M25.1667 56.1667L19.3333 62L25.1667 67.8333" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M19.3333 62H32.6667" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ) : (
      <>
        <path d="M25.1667 20.1667L19.3333 26L25.1667 31.8333" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M19.3333 26H32.6667" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
      </>
    )}
  </BaseIcon>
)
