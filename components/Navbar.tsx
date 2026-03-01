'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Globe } from 'lucide-react'
import { useLanguage } from '@/lib/LanguageContext'
import ThemeToggle from './ThemeToggle'
import NotificationDropdown from './NotificationDropdown'

export default function Navbar() {
  const { language, setLanguage, t } = useLanguage()

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 w-full z-50 glass border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-2xl font-bold flex">
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
                className="shiny-text"
              >
                {char}
              </motion.span>
            ))}
          </Link>
          <div className="flex gap-6 items-center">
            <Link href="/about" className="text-sm hover:text-indigo-400 transition">
              Sobre
            </Link>
            <Link href="/faq" className="text-sm hover:text-indigo-400 transition">
              FAQ
            </Link>
            <Link href="/history" className="text-sm hover:text-indigo-400 transition">
              Histórico
            </Link>
            <NotificationDropdown />
            <ThemeToggle />
            <button
              onClick={() => setLanguage(language === 'pt-BR' ? 'en' : 'pt-BR')}
              className="flex items-center gap-2 px-3 py-2 glass rounded-lg hover:bg-white/10 transition"
            >
              <Globe size={18} />
              <span className="text-sm font-medium">{language === 'pt-BR' ? 'PT-BR' : 'EN'}</span>
            </button>
            <Link 
              href="/auth/signin" 
              className="px-4 py-2 text-sm hover:text-indigo-400 transition"
            >
              {t('signin')}
            </Link>
            <Link 
              href="/auth/signup" 
              className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg text-sm font-medium hover:opacity-90 transition hover:shadow-lg hover:shadow-indigo-500/50"
            >
              {t('signup')}
            </Link>
          </div>
        </div>
      </div>
    </motion.nav>
  )
}
