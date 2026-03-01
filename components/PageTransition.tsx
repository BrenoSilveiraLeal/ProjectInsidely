'use client'

import { useEffect, useRef, ReactNode } from 'react'
import anime from 'animejs'

interface PageTransitionProps {
  children: ReactNode
}

export default function PageTransition({ children }: PageTransitionProps) {
  const pageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    anime({
      targets: pageRef.current,
      opacity: [0, 1],
      translateY: [20, 0],
      duration: 600,
      easing: 'easeOutExpo'
    })
  }, [])

  return (
    <div ref={pageRef} style={{ opacity: 0 }}>
      {children}
    </div>
  )
}
