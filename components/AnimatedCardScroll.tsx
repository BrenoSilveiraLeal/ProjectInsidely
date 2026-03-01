'use client'

import { useEffect, useRef, ReactNode } from 'react'
import anime from 'animejs'

interface AnimatedCardScrollProps {
  children: ReactNode
  delay?: number
}

export default function AnimatedCardScroll({ children, delay = 0 }: AnimatedCardScrollProps) {
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            anime({
              targets: cardRef.current,
              translateY: [30, 0],
              opacity: [0, 1],
              duration: 400,
              delay,
              easing: 'easeOutQuad'
            })
          } else {
            if (cardRef.current) {
              cardRef.current.style.opacity = '0'
              cardRef.current.style.transform = 'translateY(30px)'
            }
          }
        })
      },
      { threshold: 0.2 }
    )

    if (cardRef.current) observer.observe(cardRef.current)
    return () => observer.disconnect()
  }, [delay])

  const handleMouseEnter = () => {
    anime({
      targets: cardRef.current,
      scale: 1.05,
      duration: 300,
      easing: 'easeOutQuad'
    })
  }

  const handleMouseLeave = () => {
    anime({
      targets: cardRef.current,
      scale: 1,
      duration: 300,
      easing: 'easeOutQuad'
    })
  }

  return (
    <div ref={cardRef} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} style={{ opacity: 0 }}>
      {children}
    </div>
  )
}
