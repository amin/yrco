import { BaseButton } from './BaseButton'

export const ToggleButton = ({ picked = false, disabled = false, onClick, children, className = '' }) => {
  const state = picked
    ? 'bg-yrgo-blue text-white'
    : disabled
    ? 'bg-white text-yrgo-light-blue-active'
    : 'bg-white text-black border border-black'

  return (
    <BaseButton
      onClick={onClick}
      disabled={disabled}
      className={`h-11 px-l py-s font-sans text-sm leading-base tracking-tight whitespace-nowrap ${state} ${className}`}
    >
      {children}
    </BaseButton>
  )
}
