export const Trait = ({ trait, color }) => (
  <button
    className="flex flex-1 w-full items-end px-base pb-l"
    style={{ backgroundColor: color }}
  >
    <span className="font-sans text-xl leading-xl tracking-tighter text-white">
      {trait}
    </span>
  </button>
)
