export const Trait = ({ trait, color, icebreaker, expanded, collapsed, onClick }) => (
  <button
    onClick={onClick}
    style={{ backgroundColor: color }}
    className={`w-full flex flex-col overflow-hidden transition-all duration-300 ${
      collapsed
        ? 'h-0 flex-none'
        : expanded
        ? 'flex-1 pt-2xl px-m pb-m'
        : 'flex-1 justify-end px-base pb-l'
    }`}
  >
    <span className="font-sans text-xl leading-xl tracking-tighter text-white text-left">
      {trait}
    </span>
    {expanded && (
      <div className="flex flex-1 items-center">
        <p className="font-sans text-xl leading-xl tracking-tighter text-white font-light text-left">
          {icebreaker}
        </p>
      </div>
    )}
  </button>
)
