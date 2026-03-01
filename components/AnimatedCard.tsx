'use client'

import { useRef } from 'react'
import anime from 'animejs'

interface AnimatedCardProps {
  title: string
  description: string
  icon: string
}

export default function AnimatedCard({ title, description, icon }: AnimatedCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)

  const handleHover = () => {
    anime({
      targets: cardRef.current,
      scale: 1.05,
      boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
      duration: 300,
      easing: 'easeOutQuad'
    })
  }

  const handleLeave = () => {
    anime({
      targets: cardRef.current,
      scale: 1,
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
      duration: 300,
      easing: 'easeOutQuad'
    })
  }

  return (
    <div
      ref={cardRef}
      onMouseEnter={handleHover}
      onMouseLeave={handleLeave}
      className="bg-white p-6 rounded-lg shadow-md cursor-pointer"
    >
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}
