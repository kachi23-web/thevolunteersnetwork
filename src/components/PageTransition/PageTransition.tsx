import { motion, AnimatePresence } from 'framer-motion'
import { useLocation } from 'react-router-dom'
import { smoothPageTransitionVariants, loadingSpinnerVariants } from '../../utils/animations'
import './PageTransition.css'

interface PageTransitionProps {
  children: React.ReactNode
  isLoading?: boolean
}

export const PageTransition = ({ children, isLoading = false }: PageTransitionProps) => {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <motion.div
          key="loading"
          className="page-loading"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="loading-spinner"
            variants={loadingSpinnerVariants}
            animate="animate"
          >
            <div className="spinner-ring"></div>
          </motion.div>
          <motion.p
            className="loading-text"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Loading...
          </motion.p>
        </motion.div>
      ) : (
        <motion.div
          key={location.pathname}
          variants={smoothPageTransitionVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="page-transition-wrapper"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}