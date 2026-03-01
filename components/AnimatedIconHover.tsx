'use client'

import { useRef } from 'react'
import anime from 'animejs'
import { LucideIcon } from 'lucide-react'

interface AnimatedIconHoverProps {
  icon: LucideIcon
  size?: number
  className?: string
}

export default function AnimatedIconHover({ icon: Icon, size = 24, className = '' }: AnimatedIconHoverProps) {
  const iconRef = useRef<HTMLDivElement>(null)

  const handleMouseEnter = () => {
    anime({
      targets: iconRef.current,
      translateY: [-5, 0],
      rotate: [0, 5, -5, 0],
      scale: [1, 1.15, 1],
      duration: 600,
      easing: 'easeOutElastic(1, .6)'
    })
  }

  return (
    <div
      ref={iconRef}
      onMouseEnter={handleMouseEnter}
      className={`inline-block cursor-pointer ${className}`}
    >
      <Icon size={size} />
    </div>
  )
}
