export const ArrowRightIcon = ({ active = false, className = '' }) => (
  <svg
    width="20"
    height="20"
    viewBox={active ? '16 52 20 20' : '16 16 20 20'}
    fill="none"
    className={className}
  >
    {active ? (
      <>
        <path d="M26.8333 67.8333L32.6667 62L26.8333 56.1667" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M32.6667 62H19.3333" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ) : (
      <>
        <path d="M26.8333 31.8333L32.6667 26L26.8333 20.1667" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M32.6667 26L19.3333 26" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
      </>
    )}
  </svg>
)
