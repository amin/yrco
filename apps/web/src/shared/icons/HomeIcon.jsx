import { BaseIcon } from './BaseIcon'

export const HomeIcon = ({ active = false, size, className = '' }) => (
  <BaseIcon size={size} viewBox={active ? '16 52 20 20' : '16 16 20 20'} className={className}>
    {active ? (
      <>
        <path d="M26 53.6667L18.5 59.5V70.3333H33.5V59.5L26 53.6667Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M23.5 70.3333V64.5C23.5 63.1193 24.6193 62 26 62C27.3807 62 28.5 63.1193 28.5 64.5V70.3333" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ) : (
      <>
        <path d="M26 17.6667L18.5 23.5V34.3333H33.5V23.5L26 17.6667Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M23.5 34.3333V28.5C23.5 27.1193 24.6193 26 26 26C27.3807 26 28.5 27.1193 28.5 28.5V34.3333" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
      </>
    )}
  </BaseIcon>
)
