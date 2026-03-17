import { motion } from 'framer-motion'
import { 
  enhancedButtonHoverVariants, 
  iconBounceVariants, 
  enhancedCardHoverVariants 
} from '../../utils/animations'
import './MicroInteractions.css'

interface AnimatedButtonProps {
  children: React.ReactNode
  onClick?: () => void
  className?: string
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'small' | 'medium' | 'large'
  disabled?: boolean
}

export const AnimatedButton = ({
  children,
  onClick,
  className = '',
  variant = 'primary',
  size = 'medium',
  disabled = false
}: AnimatedButtonProps) => {
  return (
    <motion.button
      className={`animated-btn animated-btn--${variant} animated-btn--${size} ${className}`}
      variants={enhancedButtonHoverVariants}
      initial="rest"
      whileHover={disabled ? "rest" : "hover"}
      whileTap={disabled ? "rest" : "tap"}
      onClick={onClick}
      disabled={disabled}
    >
      <motion.span className="btn-content">
        {children}
      </motion.span>
      <motion.div
        className="btn-ripple"
        initial={{ scale: 0, opacity: 0 }}
        whileTap={{ scale: 1, opacity: 0.3 }}
        transition={{ duration: 0.2 }}
      />
    </motion.button>
  )
}

interface AnimatedIconProps {
  children: React.ReactNode
  className?: string
  variant?: 'bounce' | 'rotate' | 'scale'
  trigger?: 'hover' | 'always'
}

export const AnimatedIcon = ({
  children,
  className = '',
  variant = 'bounce',
  trigger = 'hover'
}: AnimatedIconProps) => {
  const getVariants = () => {
    switch (variant) {
      case 'bounce':
        return iconBounceVariants
      case 'rotate':
        return {
          rest: { rotate: 0 },
          hover: { rotate: 360, transition: { duration: 0.6 } }
        }
      case 'scale':
        return {
          rest: { scale: 1 },
          hover: { scale: 1.2, transition: { duration: 0.3 } }
        }
      default:
        return iconBounceVariants
    }
  }

  const getAlwaysAnimation = () => {
    switch (variant) {
      case 'rotate':
        return { 
          rotate: 360,
          transition: { 
            duration: 2, 
            repeat: Infinity,
            ease: "linear" as const
          }
        }
      default:
        return { 
          y: [-2, -8, -2],
          transition: { 
            duration: 1.5, 
            repeat: Infinity,
            ease: "easeInOut" as const
          }
        }
    }
  }

  const animationProps = trigger === 'hover' 
    ? {
        variants: getVariants(),
        initial: "rest" as const,
        whileHover: "hover" as const
      }
    : {
        animate: getAlwaysAnimation()
      }

  return (
    <motion.div
      className={`animated-icon ${className}`}
      {...animationProps}
    >
      {children}
    </motion.div>
  )
}

interface AnimatedCardProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
  hoverable?: boolean
}

export const AnimatedCard = ({
  children,
  className = '',
  onClick,
  hoverable = true
}: AnimatedCardProps) => {
  return (
    <motion.div
      className={`animated-card ${className} ${onClick ? 'clickable' : ''}`}
      variants={hoverable ? enhancedCardHoverVariants : undefined}
      initial={hoverable ? "rest" : undefined}
      whileHover={hoverable ? "hover" : undefined}
      whileTap={onClick ? { scale: 0.98 } : undefined}
      onClick={onClick}
    >
      {children}
    </motion.div>
  )
}

interface FloatingElementProps {
  children: React.ReactNode
  className?: string
  intensity?: 'subtle' | 'medium' | 'strong'
  direction?: 'vertical' | 'horizontal' | 'circular'
}

export const FloatingElement = ({
  children,
  className = '',
  intensity = 'medium',
  direction = 'vertical'
}: FloatingElementProps) => {
  const getAnimation = () => {
    const intensityMap = {
      subtle: 5,
      medium: 10,
      strong: 15
    }
    
    const distance = intensityMap[intensity]
    
    switch (direction) {
      case 'vertical':
        return {
          y: [-distance, distance, -distance],
          transition: { 
            duration: 4, 
            repeat: Infinity, 
            ease: "easeInOut" as const 
          }
        }
      case 'horizontal':
        return {
          x: [-distance, distance, -distance],
          transition: { 
            duration: 4, 
            repeat: Infinity, 
            ease: "easeInOut" as const 
          }
        }
      case 'circular':
        return {
          x: [0, distance, 0, -distance, 0],
          y: [0, -distance, 0, distance, 0],
          transition: { 
            duration: 6, 
            repeat: Infinity, 
            ease: "easeInOut" as const 
          }
        }
      default:
        return {}
    }
  }

  return (
    <motion.div
      className={`floating-element ${className}`}
      animate={getAnimation()}
    >
      {children}
    </motion.div>
  )
}