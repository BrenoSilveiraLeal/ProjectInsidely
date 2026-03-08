'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Globe } from 'lucide-react'
import { useLanguage } from '@/lib/LanguageContext'
import ThemeToggle from './ThemeToggle'
import NotificationDropdown from './NotificationDropdown'
import { useState, useEffect } from 'react'

export default function Navbar() {
  const { language, setLanguage, t } = useLanguage()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0)
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav 
      className="fixed top-0 w-full z-50"
      style={{
        backgroundColor: scrolled ? 'rgba(3, 7, 18, 0.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
        boxShadow: scrolled ? '0 10px 30px rgba(0, 0, 0, 0.3)' : 'none',
        transition: 'background-color 0.3s ease, backdrop-filter 0.3s ease, border-bottom 0.3s ease, box-shadow 0.3s ease'
      }}
    >
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-lg sm:text-xl md:text-2xl font-bold flex">
            {"Insidely".split("").map((char, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.1,
                  ease: "easeOut"
                }}
                className="gradient-text"
              >
                {char}
              </motion.span>
            ))}
          </Link>
          <div className="flex gap-1 sm:gap-2 md:gap-6 items-center">
            <Link href="/about" className="text-xs sm:text-sm hover:text-indigo-400 transition">
              <motion.span
                initial={{ filter: "blur(10px)", opacity: 0 }}
                animate={{ filter: "blur(0px)", opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                {t('about')}
              </motion.span>
            </Link>
            <Link href="/faq" className="text-xs sm:text-sm hover:text-indigo-400 transition">
              <motion.span
                initial={{ filter: "blur(10px)", opacity: 0 }}
                animate={{ filter: "blur(0px)", opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.9 }}
              >
                {t('faq')}
              </motion.span>
            </Link>
            <div className="flex gap-1 items-center ml-2">
              <motion.div
                initial={{ filter: "blur(10px)", opacity: 0 }}
                animate={{ filter: "blur(0px)", opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.0 }}
              >
                <NotificationDropdown />
              </motion.div>
              <motion.div
                initial={{ filter: "blur(10px)", opacity: 0 }}
                animate={{ filter: "blur(0px)", opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.1 }}
              >
                <ThemeToggle />
              </motion.div>
              <motion.button
                initial={{ filter: "blur(10px)", opacity: 0 }}
                animate={{ filter: "blur(0px)", opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.2 }}
                onClick={() => {
                  console.log('Changing language from', language, 'to', language === 'pt-BR' ? 'en' : 'pt-BR')
                  setLanguage(language === 'pt-BR' ? 'en' : 'pt-BR')
                }}
                className="flex items-center gap-2 px-3 py-2 glass rounded-lg hover:bg-white/10 transition cursor-pointer"
              >
                <Globe size={18} />
                <span className="text-sm font-medium">{language === 'pt-BR' ? 'PT-BR' : 'EN'}</span>
              </motion.button>
            </div>
            <Link 
              href="/auth/signin" 
              className="px-2 sm:px-4 py-2 text-xs sm:text-sm hover:text-indigo-400 transition ml-2"
            >
              <motion.span
                initial={{ filter: "blur(10px)", opacity: 0 }}
                animate={{ filter: "blur(0px)", opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.3 }}
              >
                {t('signin')}
              </motion.span>
            </Link>
            <motion.div
              initial={{ filter: "blur(10px)", opacity: 0 }}
              animate={{ filter: "blur(0px)", opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.4 }}
            >
              <Link 
                href="/auth/signup" 
                className="px-3 py-2 sm:px-6 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg text-xs sm:text-sm font-medium hover:opacity-90 transition hover:shadow-lg hover:shadow-indigo-500/50 block whitespace-nowrap"
              >
                {t('signup')}
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </nav>
  )
}
