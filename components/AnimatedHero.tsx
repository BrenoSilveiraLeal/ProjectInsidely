'use client'

import { useEffect, useRef } from 'react'
import anime from 'animejs'

export default function AnimatedHero() {
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    anime.timeline()
      .add({
        targets: titleRef.current,
        translateY: [-50, 0],
        opacity: [0, 1],
        duration: 1200,
        easing: 'easeOutExpo'
      })
      .add({
        targets: subtitleRef.current,
        translateY: [30, 0],
        opacity: [0, 1],
        duration: 1000,
        easing: 'easeOutExpo'
      }, '-=800')
      .add({
        targets: ctaRef.current,
        scale: [0.8, 1],
        opacity: [0, 1],
        duration: 800,
        easing: 'easeOutElastic(1, .8)'
      }, '-=600')
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="text-center px-4">
        <h1 
          ref={titleRef}
          className="text-6xl font-bold text-gray-900 mb-6"
          style={{ opacity: 0 }}
        >
          Insidely
        </h1>
        
        <p 
          ref={subtitleRef}
          className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto"
          style={{ opacity: 0 }}
        >
          Conecte-se com profissionais e descubra como é trabalhar nas melhores empresas
        </p>
        
        <div 
          ref={ctaRef}
          className="flex gap-4 justify-center"
          style={{ opacity: 0 }}
        >
          <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700">
            Começar agora
          </button>
          <button className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-lg hover:bg-blue-50">
            Saber mais
          </button>
        </div>
      </div>
    </div>
  )
}
