import { motion } from 'framer-motion'

export const Swatch = ({ trait, color, colorText, icebreaker, expanded, collapsed, onClick }) => (
  <button
    onClick={onClick}
    style={{ backgroundColor: color, color: colorText }}
    className={`w-full flex flex-col overflow-hidden transition-all duration-300 cursor-pointer ${
      collapsed
        ? 'h-0 flex-none px-base'
        : expanded
        ? 'flex-1 pt-2xl px-base pb-base'
        : 'flex-1 justify-end px-base pb-l'
    }`}
  >
    <motion.span
      layout="position"
      transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
      className="font-sans text-xl leading-xl tracking-tighter text-left"
    >
      {trait}
    </motion.span>
    {expanded && (
      <motion.div
        className="flex flex-1 items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2, delay: 0.2 }}
      >
        <p className="font-sans text-xl leading-xl tracking-tighter font-light text-left w-[270px]">
          {icebreaker}
        </p>
      </motion.div>
    )}
  </button>
)
