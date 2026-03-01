'use client'

import { useRef } from 'react'
import { motion } from 'framer-motion'
import anime from 'animejs'
import { LucideIcon } from 'lucide-react'

interface AnimatedIconProps {
  Icon: LucideIcon
  size?: number
  color?: string
  glowColor?: string
}

export default function AnimatedIcon({ Icon, size = 40, color = 'currentColor', glowColor = '#6366f1' }: AnimatedIconProps) {
  const iconRef = useRef<HTMLDivElement>(null)

  const handleMouseEnter = () => {
    anime({
      targets: iconRef.current,
      scale: [1, 1.2],
      rotate: [0, 10, -10, 0],
      duration: 600,
      easing: 'easeOutElastic(1, .6)'
    })
  }

  const handleMouseLeave = () => {
    anime({
      targets: iconRef.current,
      scale: 1,
      rotate: 0,
      duration: 400,
      easing: 'easeOutQuad'
    })
  }

  return (
    <motion.div
      ref={iconRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      whileHover={{
        filter: `drop-shadow(0 0 20px ${glowColor})`,
      }}
      transition={{ duration: 0.3 }}
      className="inline-flex items-center justify-center cursor-pointer"
      style={{ color }}
    >
      <Icon size={size} />
    </motion.div>
  )
}
