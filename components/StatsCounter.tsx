'use client'

import { useEffect, useRef } from 'react'
import anime from 'animejs'

interface StatsCounterProps {
  end: number
  label: string
  suffix?: string
  duration?: number
}

export default function StatsCounter({ end, label, suffix = '', duration = 2000 }: StatsCounterProps) {
  const counterRef = useRef<HTMLSpanElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const obj = { count: 0 }
            
            anime({
              targets: obj,
              count: end,
              duration: 1200,
              easing: 'easeOutQuad',
              round: 1,
              update: () => {
                if (counterRef.current) counterRef.current.textContent = obj.count + suffix
              }
            })

            anime({
              targets: containerRef.current,
              opacity: [0, 1],
              duration: 400,
              easing: 'easeOutQuad'
            })
          }
        })
      },
      { threshold: 0.3 }
    )

    if (containerRef.current) observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [end, suffix, duration])

  return (
    <div ref={containerRef} className="text-center" style={{ opacity: 0 }}>
      <div className="text-5xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent mb-2">
        <span ref={counterRef}>0{suffix}</span>
      </div>
      <p className="text-gray-400 text-lg">{label}</p>
    </div>
  )
}
