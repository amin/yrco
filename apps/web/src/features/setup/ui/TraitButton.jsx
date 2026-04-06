export const TraitButton = ({ trait, color, picked, onClick }) => (
  <button
    onClick={onClick}
    style={picked ? { backgroundColor: color } : undefined}
    className={`inline-flex items-center justify-center rounded-full h-11 px-l py-s font-sans text-sm leading-base tracking-tight whitespace-nowrap cursor-pointer transition-colors ${
      picked
        ? 'text-white'
        : 'bg-white text-black border border-black'
    }`}
  >
    {trait}
  </button>
)
