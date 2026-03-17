import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { useScrollAnimation } from '../../hooks'
import { slideUpVariants } from '../../utils/animations'

interface AnimatedSectionProps {
  children: ReactNode
  className?: string
  delay?: number
}

/**
 * Wrapper component that animates children when they scroll into view
 */
export const AnimatedSection = ({ children, className = '', delay = 0 }: AnimatedSectionProps) => {
  const { ref, isInView } = useScrollAnimation({ threshold: 0.1, triggerOnce: true })

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={slideUpVariants}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
