export const SearchIcon = ({ active = false, className = '' }) => (
  <svg
    width="20"
    height="20"
    viewBox={active ? '16 52 20 20' : '16 16 20 20'}
    fill="none"
    className={className}
  >
    {active ? (
      <>
        <path d="M24.3333 65.8333C27.555 65.8333 30.1667 63.2217 30.1667 60C30.1667 56.7783 27.555 54.1667 24.3333 54.1667C21.1117 54.1667 18.5 56.7783 18.5 60C18.5 63.2217 21.1117 65.8333 24.3333 65.8333Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M33.5 69.5L28.4662 64.4662" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ) : (
      <>
        <path d="M24.3333 29.8333C27.555 29.8333 30.1667 27.2217 30.1667 24C30.1667 20.7783 27.555 18.1667 24.3333 18.1667C21.1117 18.1667 18.5 20.7783 18.5 24C18.5 27.2217 21.1117 29.8333 24.3333 29.8333Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M33.5 33.5L28.4662 28.4662" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
      </>
    )}
  </svg>
)
