export const TraitButton = ({ trait, color, colorText, picked, onClick }) => (
  <button
    onClick={onClick}
    style={picked ? { backgroundColor: color, color: colorText } : undefined}
    className={`inline-flex items-center justify-center rounded-full h-11 px-l py-s font-sans text-sm leading-base tracking-tight whitespace-nowrap cursor-pointer transition-colors ${
      picked
        ? ''
        : 'bg-white text-black border border-black'
    }`}
  >
    {trait}
  </button>
)
