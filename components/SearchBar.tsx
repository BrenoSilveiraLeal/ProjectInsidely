'use client'

import { Search } from 'lucide-react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useLanguage } from '@/lib/LanguageContext'
import { motion } from 'framer-motion'

const companies = ['Google', 'Meta', 'Amazon', 'Microsoft', 'Apple', 'Netflix', 'Tesla', 'Spotify', 'Nubank', 'iFood', 'Mercado Livre', 'Stone', 'Rappi', 'Uber', 'Airbnb', 'Stripe', 'McDonald\'s', 'Starbucks', 'Ambev', 'Natura', 'Magazine Luiza', 'Carrefour', 'Renner', 'C&A', 'Riachuelo', 'Pão de Açúcar', 'Drogasil', 'Hospital Albert Einstein']
const professions = ['Software Engineer', 'Product Manager', 'Data Scientist', 'UX Designer', 'DevOps Engineer', 'Atendente', 'Vendedor', 'Gerente de Loja', 'Caixa', 'Barista', 'Cozinheiro', 'Garçom', 'Analista Financeiro', 'Recursos Humanos', 'Marketing', 'Enfermeiro', 'Farmacêutico', 'Professor', 'Recepcionista', 'Estoquista']
const locations = ['São Paulo', 'Rio de Janeiro', 'Belo Horizonte', 'Brasília', 'Curitiba', 'Porto Alegre', 'Salvador', 'Fortaleza', 'Recife', 'Manaus']
const skills = ['React', 'Node.js', 'Python', 'Java', 'TypeScript', 'AWS', 'Docker', 'Kubernetes', 'SQL', 'MongoDB', 'Figma', 'Photoshop', 'Excel', 'PowerBI', 'Scrum', 'Agile']

export default function SearchBar() {
  const [query, setQuery] = useState('')
  const [showSuggestions, setShowSuggestions] = useState(false)
  const router = useRouter()
  const { t } = useLanguage()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`)
      setShowSuggestions(false)
    }
  }

  const suggestions = query.length > 0 ? [
    ...companies.filter(c => c.toLowerCase().includes(query.toLowerCase())).map(c => ({ text: c, type: 'empresa' })),
    ...professions.filter(p => p.toLowerCase().includes(query.toLowerCase())).map(p => ({ text: p, type: 'profissão' })),
    ...locations.filter(l => l.toLowerCase().includes(query.toLowerCase())).map(l => ({ text: l, type: 'localização' })),
    ...skills.filter(s => s.toLowerCase().includes(query.toLowerCase())).map(s => ({ text: s, type: 'skill' }))
  ].slice(0, 8) : []

  const handleSuggestionClick = (suggestion: { text: string; type: string }) => {
    setQuery(suggestion.text)
    setShowSuggestions(false)
    router.push(`/search?q=${encodeURIComponent(suggestion.text)}&type=${suggestion.type}`)
  }

  return (
    <div className="w-full relative" style={{ zIndex: 9999 }}>
      <form onSubmit={handleSearch} className="w-full">
        <div className="bg-white/[0.02] backdrop-blur-sm border border-white/5 rounded-2xl p-1.5 sm:p-2 flex items-center gap-1 sm:gap-2">
          <Search className="ml-2 sm:ml-4 text-gray-400" size={18} />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            placeholder={t('search_placeholder')}
            className="flex-1 bg-transparent px-2 sm:px-4 py-3 sm:py-4 outline-none text-sm sm:text-base lg:text-lg"
          />
          <button
            type="submit"
            className="px-3 sm:px-6 lg:px-8 py-2.5 sm:py-4 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl text-xs sm:text-sm font-medium hover:opacity-90 transition whitespace-nowrap"
          >
            {t('search_button')}
          </button>
        </div>
      </form>

      {showSuggestions && suggestions.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="absolute top-full mt-4 w-full rounded-xl shadow-2xl border border-white/20 backdrop-blur-xl bg-gradient-to-br from-gray-900/95 via-indigo-900/90 to-purple-900/95"
          style={{ zIndex: 99999 }}
        >
          {suggestions.map((suggestion, i) => (
            <motion.button
              key={i}
              type="button"
              onClick={() => handleSuggestionClick(suggestion)}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', x: 5 }}
              className="w-full px-6 py-4 text-left transition flex items-center justify-between gap-3 first:rounded-t-xl last:rounded-b-xl"
            >
              <div className="flex items-center gap-3">
                <Search size={16} className="text-indigo-400" />
                <span>{suggestion.text}</span>
              </div>
              <span className="text-xs px-2 py-1 rounded-full bg-white/10 text-gray-400">
                {suggestion.type}
              </span>
            </motion.button>
          ))}
        </motion.div>
      )}
    </div>
  )
}
