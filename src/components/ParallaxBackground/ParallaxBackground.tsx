import { motion } from 'framer-motion'
import { useParallax } from '../../hooks/useParallax'
import './ParallaxBackground.css'

interface ParallaxBackgroundProps {
  children: React.ReactNode
  backgroundImage?: string
  speed?: number
  className?: string
  overlay?: boolean
  overlayOpacity?: number
}

export const ParallaxBackground = ({
  children,
  backgroundImage,
  speed = 0.5,
  className = '',
  overlay = true,
  overlayOpacity = 0.4
}: ParallaxBackgroundProps) => {
  const y = useParallax({ speed })

  return (
    <div className={`parallax-container ${className}`}>
      {backgroundImage && (
        <motion.div
          className="parallax-background"
          style={{
            y,
            backgroundImage: `url(${backgroundImage})`,
          }}
        />
      )}
      {overlay && (
        <div 
          className="parallax-overlay"
          style={{ opacity: overlayOpacity }}
        />
      )}
      <div className="parallax-content">
        {children}
      </div>
    </div>
  )
}