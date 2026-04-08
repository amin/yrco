export const Swatch = ({ trait, color, colorText, icebreaker, expanded, collapsed, onClick }) => (
  <button
    onClick={onClick}
    style={{ backgroundColor: color, color: colorText }}
    className={`w-full flex flex-col overflow-hidden transition-all duration-300 cursor-pointer ${
      collapsed
        ? 'h-0 flex-none'
        : expanded
        ? 'flex-1 pt-2xl px-base pb-base'
        : 'flex-1 justify-end px-base pb-l'
    }`}
  >
    <span className="font-sans text-xl leading-xl tracking-tighter text-left">
      {trait}
    </span>
    {expanded && (
      <div className="flex flex-1 items-center">
        <p className="font-sans text-xl leading-xl tracking-tighter font-light text-left">
          {icebreaker}
        </p>
      </div>
    )}
  </button>
)
