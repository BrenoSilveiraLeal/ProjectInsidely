'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import anime from 'animejs'
import { Sparkles, Zap, Target, Rocket, Star, TrendingUp, Code, Briefcase, Heart, Award, Coffee, Lightbulb, Users, Globe, Cpu, Database } from 'lucide-react'
import SearchBar from './SearchBar'
import { useLanguage } from '@/lib/LanguageContext'

const floatingIcons = [
  { Icon: Sparkles, x: '5%', y: '10%', delay: 0 },
  { Icon: Rocket, x: '95%', y: '15%', delay: 100 },
  { Icon: Heart, x: '10%', y: '35%', delay: 200 },
  { Icon: Zap, x: '90%', y: '40%', delay: 300 },
  { Icon: Code, x: '15%', y: '60%', delay: 400 },
  { Icon: Award, x: '85%', y: '65%', delay: 500 },
  { Icon: Target, x: '8%', y: '85%', delay: 600 },
  { Icon: Briefcase, x: '92%', y: '90%', delay: 700 },
  { Icon: Star, x: '30%', y: '12%', delay: 800 },
  { Icon: Lightbulb, x: '70%', y: '18%', delay: 900 },
  { Icon: Users, x: '25%', y: '45%', delay: 1000 },
  { Icon: TrendingUp, x: '75%', y: '50%', delay: 1100 },
  { Icon: Coffee, x: '35%', y: '75%', delay: 1200 },
  { Icon: Cpu, x: '65%', y: '80%', delay: 1300 },
  { Icon: Globe, x: '50%', y: '25%', delay: 1400 },
  { Icon: Database, x: '50%', y: '70%', delay: 1500 },
]

export default function HeroSection() {
  const { t } = useLanguage()
  const [typedText, setTypedText] = useState('')
  const [showCursor, setShowCursor] = useState(true)
  const [showSubtitle, setShowSubtitle] = useState(false)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const searchRef = useRef<HTMLDivElement>(null)
  const fullText = 'Descubra como são os empregos de verdade antes de escolher'

  useEffect(() => {
    // Typing effect
    let i = 0
    const timer = setInterval(() => {
      if (i < fullText.length) {
        setTypedText(fullText.slice(0, i + 1))
        i++
      } else {
        clearInterval(timer)
        setShowCursor(false)
        setShowSubtitle(true)
      }
    }, 50)

    // Hero entrance
    anime.timeline()
      .add({
        targets: titleRef.current,
        translateY: [40, 0],
        opacity: [0, 1],
        duration: 800,
        easing: 'easeOutQuad'
      })
      .add({
        targets: subtitleRef.current,
        translateY: [30, 0],
        opacity: [0, 1],
        duration: 600,
        easing: 'easeOutQuad'
      }, '-=600')
      .add({
        targets: searchRef.current,
        translateY: [20, 0],
        opacity: [0, 1],
        duration: 500,
        easing: 'easeOutQuad'
      }, '-=400')

    // Floating icons
    anime({
      targets: '.floating-icon',
      translateY: (el, i) => [0, anime.random(-25, 25)],
      translateX: (el, i) => [0, anime.random(-18, 18)],
      rotate: () => anime.random(-20, 20),
      scale: [1, 1.15, 1],
      opacity: [0.3, 0.6, 0.3],
      duration: 3500,
      delay: anime.stagger(80),
      loop: true,
      direction: 'alternate',
      easing: 'easeInOutQuad'
    })

    return () => clearInterval(timer)
  }, [])

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center px-4 pt-32 pb-20">
      {/* Animated gradient background */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 blur-3xl -z-10"
      />

      {/* Floating animated icons */}
      {floatingIcons.map(({ Icon, x, y, delay }, i) => (
        <motion.div
          key={i}
          className="floating-icon absolute text-indigo-400/30"
          style={{ left: x, top: y }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.3, scale: 1 }}
          transition={{ delay: delay / 1000, duration: 0.8 }}
          whileHover={{ 
            scale: 1.5, 
            opacity: 0.8,
            filter: 'drop-shadow(0 0 20px rgba(99, 102, 241, 0.8))',
            rotate: 360,
            transition: { duration: 0.6 }
          }}
        >
          <Icon size={48} />
        </motion.div>
      ))}

      <div className="max-w-5xl mx-auto text-center relative z-10 flex flex-col items-center gap-8">
        <h1 
          ref={titleRef}
          className="text-5xl md:text-7xl font-bold leading-tight"
          style={{ opacity: 0 }}
        >
          {typedText.split('empregos de verdade').map((part, i, arr) => (
            i < arr.length - 1 ? (
              <span key={i}>
                {part}
                <span className="shiny-text">empregos de verdade</span>
              </span>
            ) : part
          ))}
        </h1>

        {showSubtitle && (
          <motion.p
            ref={subtitleRef}
            className="text-lg md:text-xl text-gray-400 max-w-2xl"
            initial="hidden"
            animate="visible"
          >
            {t('hero_subtitle').split(' ').map((word, wordIndex) => (
              <span key={wordIndex} style={{ display: 'inline-block', marginRight: '0.25em' }}>
                {word.split('').map((char, charIndex) => (
                  <motion.span
                    key={charIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.15, delay: (wordIndex * 5 + charIndex) * 0.015 }}
                    style={{ display: 'inline-block' }}
                  >
                    {char}
                  </motion.span>
                ))}
              </span>
            ))}
          </motion.p>
        )}

        <div
          ref={searchRef}
          className="w-full max-w-3xl"
          style={{ opacity: 0, position: 'relative', zIndex: 100 }}
        >
          <SearchBar />
        </div>
      </div>
    </section>
  )
}
