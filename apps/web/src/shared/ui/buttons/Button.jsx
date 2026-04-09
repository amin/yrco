import { BaseButton } from './BaseButton'

const variants = {
  primary: 'bg-yrgo-red text-white active:bg-yrgo-red-active disabled:bg-yrgo-red-disabled disabled:text-dark-grey',
  secondary: 'bg-yrgo-light-blue text-black active:bg-yrgo-light-blue-active disabled:text-yrgo-light-blue-active',
}

export const Button = ({ variant = 'primary', disabled = false, onClick, children, className = '' }) => (
  <BaseButton
    disabled={disabled}
    onClick={onClick}
    className={`h-11 px-l py-s font-sans text-sm leading-base tracking-tight whitespace-nowrap ${variants[variant]} ${className}`}
  >
    {children}
  </BaseButton>
)
