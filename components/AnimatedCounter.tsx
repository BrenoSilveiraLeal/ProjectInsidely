'use client'

import { useEffect, useRef } from 'react'
import anime from 'animejs'

interface AnimatedCounterProps {
  end: number
  label: string
  suffix?: string
}

export default function AnimatedCounter({ end, label, suffix = '' }: AnimatedCounterProps) {
  const counterRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const obj = { count: 0 }
    
    anime({
      targets: obj,
      count: end,
      duration: 2000,
      easing: 'easeOutExpo',
      round: 1,
      update: () => {
        if (counterRef.current) {
          counterRef.current.textContent = obj.count + suffix
        }
      }
    })
  }, [end, suffix])

  return (
    <div className="text-center">
      <div className="text-4xl font-bold text-blue-600">
        <span ref={counterRef}>0{suffix}</span>
      </div>
      <p className="text-gray-600 mt-2">{label}</p>
    </div>
  )
}
