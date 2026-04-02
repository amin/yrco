import { BaseIcon } from './BaseIcon'

export const CloseIcon = ({ active = false, size, className = '' }) => (
  <BaseIcon size={size} viewBox={active ? '16 52 20 20' : '16 16 20 20'} className={className}>
    {active ? (
      <>
        <path d="M32 56L20 68" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M20 56L32 68" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ) : (
      <>
        <path d="M32 20L20 32" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M20 20L32 32" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
      </>
    )}
  </BaseIcon>
)
