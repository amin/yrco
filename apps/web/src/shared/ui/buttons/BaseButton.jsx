export const BaseButton = ({ onClick, disabled = false, className = '', children }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`inline-flex items-center justify-center rounded-full transition-colors cursor-pointer disabled:cursor-not-allowed ${className}`}
  >
    {children}
  </button>
)
