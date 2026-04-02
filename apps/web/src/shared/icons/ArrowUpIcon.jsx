export const ArrowUpIcon = ({ active = false, className = '' }) => (
  <svg
    width="20"
    height="20"
    viewBox={active ? '16 52 20 20' : '16 16 20 20'}
    fill="none"
    className={className}
  >
    {active ? (
      <path d="M20.1667 64.9167L26 59.0833L31.8333 64.9167" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    ) : (
      <path d="M20.1667 28.9167L26 23.0833L31.8333 28.9167" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
    )}
  </svg>
)
