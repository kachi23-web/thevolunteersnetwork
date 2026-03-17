import { useEffect, useState, useRef } from 'react'
import { useTransform, useScroll } from 'framer-motion'

interface UseParallaxOptions {
  speed?: number
  offset?: number
  disabled?: boolean
}

/**
 * Custom hook for parallax scroll effects
 * Returns a MotionValue that can be used with Framer Motion
 */
export const useParallax = (options: UseParallaxOptions = {}) => {
  const { speed = 0.5, offset = 0, disabled = false } = options
  const containerRef = useRef<HTMLElement | null>(null)
  
  // Get the main content scroll container
  useEffect(() => {
    containerRef.current = document.getElementById('main-content')
  }, [])
  
  const { scrollY } = useScroll({
    container: containerRef
  })
  
  // Transform scroll position to parallax offset
  const y = useTransform(
    scrollY,
    [0, 1000],
    [offset, offset + (1000 * speed)]
  )

  // Respect user's motion preferences
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches)
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  // Return static value if parallax is disabled or user prefers reduced motion
  if (disabled || prefersReducedMotion) {
    return offset
  }

  return y
}

/**
 * Custom hook for element-based parallax effects
 * Tracks an element's position relative to viewport
 */
export const useElementParallax = (options: UseParallaxOptions = {}) => {
  const { speed = 0.5, disabled = false } = options
  const [elementTop, setElementTop] = useState(0)
  const [clientHeight, setClientHeight] = useState(0)
  const containerRef = useRef<HTMLElement | null>(null)
  
  // Get the main content scroll container
  useEffect(() => {
    containerRef.current = document.getElementById('main-content')
  }, [])
  
  const { scrollY } = useScroll({
    container: containerRef
  })

  const y = useTransform(scrollY, (value) => {
    if (disabled) return 0
    
    const rate = (value - elementTop + clientHeight) * speed
    return rate
  })

  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches)
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  useEffect(() => {
    const handleResize = () => {
      setClientHeight(window.innerHeight)
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const updateElementTop = (element: HTMLElement) => {
    if (element) {
      setElementTop(element.offsetTop)
    }
  }

  if (prefersReducedMotion) {
    return { y: 0, updateElementTop }
  }

  return { y, updateElementTop }
}