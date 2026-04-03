import { motion } from 'framer-motion'
import { useNavigationType } from 'react-router-dom'

export const PageTransition = ({ children }) => {
  const navigationType = useNavigationType()
  const fromRight = navigationType !== 'POP'

  return (
    <motion.div
      className="absolute inset-0"
      initial={{ x: fromRight ? '100%' : '-100%' }}
      animate={{ x: 0 }}
      exit={{ x: fromRight ? '-100%' : '100%' }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
      {children}
    </motion.div>
  )
}
