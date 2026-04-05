import { motion, AnimatePresence } from 'framer-motion'
import { useLocation } from 'react-router-dom'

export const PageTransition = ({ children }) => {
  const { pathname } = useLocation()

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        className="h-full"
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
