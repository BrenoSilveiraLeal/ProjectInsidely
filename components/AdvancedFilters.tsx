'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Filter, X, ChevronDown } from 'lucide-react'

interface FiltersProps {
  onFilterChange: (filters: any) => void
}

const companies = ['Google', 'Meta', 'Amazon', 'Microsoft', 'Apple', 'Netflix', 'Nubank']
const roles = ['Software Engineer', 'Product Manager', 'Data Scientist', 'UX Designer', 'DevOps Engineer']
const cities = ['São Paulo', 'Rio de Janeiro', 'Belo Horizonte', 'Brasília', 'Porto Alegre', 'Curitiba']
const salaryRanges = [
  { label: 'Até R$5k', value: '0-5000' },
  { label: 'R$5k - R$10k', value: '5000-10000' },
  { label: 'R$10k - R$15k', value: '10000-15000' },
  { label: 'R$15k - R$20k', value: '15000-20000' },
  { label: 'R$20k+', value: '20000+' }
]

export default function AdvancedFilters({ onFilterChange }: FiltersProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [filters, setFilters] = useState({
    company: '',
    role: '',
    city: '',
    remote: false,
    salaryRange: '',
    minRating: 0,
    minExperience: 0
  })

  const updateFilter = (key: string, value: any) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  const clearFilters = () => {
    const emptyFilters = {
      company: '',
      role: '',
      city: '',
      remote: false,
      salaryRange: '',
      minRating: 0,
      minExperience: 0
    }
    setFilters(emptyFilters)
    onFilterChange(emptyFilters)
  }

  const activeFiltersCount = Object.values(filters).filter(v => v && v !== 0).length

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-6 py-3 glass rounded-xl hover:bg-white/10 transition"
      >
        <Filter size={20} />
        <span>Filtros</span>
        {activeFiltersCount > 0 && (
          <span className="px-2 py-0.5 bg-indigo-500 rounded-full text-xs">
            {activeFiltersCount}
          </span>
        )}
        <ChevronDown size={16} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full mt-2 right-0 w-[600px] glass rounded-2xl p-6 z-50 shadow-2xl"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold">Filtros Avançados</h3>
              <div className="flex gap-2">
                <button
                  onClick={clearFilters}
                  className="text-sm text-gray-400 hover:text-white transition"
                >
                  Limpar
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-white transition"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Company */}
              <div>
                <label className="block text-sm font-medium mb-2">Empresa</label>
                <select
                  value={filters.company}
                  onChange={(e) => updateFilter('company', e.target.value)}
                  className="w-full px-4 py-2 glass rounded-lg outline-none focus:border-indigo-500 border border-white/10 transition"
                >
                  <option value="">Todas</option>
                  {companies.map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              {/* Role */}
              <div>
                <label className="block text-sm font-medium mb-2">Cargo</label>
                <select
                  value={filters.role}
                  onChange={(e) => updateFilter('role', e.target.value)}
                  className="w-full px-4 py-2 glass rounded-lg outline-none focus:border-indigo-500 border border-white/10 transition"
                >
                  <option value="">Todos</option>
                  {roles.map(r => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
              </div>

              {/* City */}
              <div>
                <label className="block text-sm font-medium mb-2">Cidade</label>
                <select
                  value={filters.city}
                  onChange={(e) => updateFilter('city', e.target.value)}
                  className="w-full px-4 py-2 glass rounded-lg outline-none focus:border-indigo-500 border border-white/10 transition"
                >
                  <option value="">Todas</option>
                  {cities.map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              {/* Salary Range */}
              <div>
                <label className="block text-sm font-medium mb-2">Faixa Salarial</label>
                <select
                  value={filters.salaryRange}
                  onChange={(e) => updateFilter('salaryRange', e.target.value)}
                  className="w-full px-4 py-2 glass rounded-lg outline-none focus:border-indigo-500 border border-white/10 transition"
                >
                  <option value="">Todas</option>
                  {salaryRanges.map(s => (
                    <option key={s.value} value={s.value}>{s.label}</option>
                  ))}
                </select>
              </div>

              {/* Min Rating */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Avaliação Mínima: {filters.minRating > 0 ? filters.minRating : 'Qualquer'}
                </label>
                <input
                  type="range"
                  min="0"
                  max="5"
                  step="0.5"
                  value={filters.minRating}
                  onChange={(e) => updateFilter('minRating', parseFloat(e.target.value))}
                  className="w-full"
                />
              </div>

              {/* Min Experience */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Experiência Mínima: {filters.minExperience > 0 ? `${filters.minExperience} anos` : 'Qualquer'}
                </label>
                <input
                  type="range"
                  min="0"
                  max="15"
                  step="1"
                  value={filters.minExperience}
                  onChange={(e) => updateFilter('minExperience', parseInt(e.target.value))}
                  className="w-full"
                />
              </div>
            </div>

            {/* Remote */}
            <div className="mt-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.remote}
                  onChange={(e) => updateFilter('remote', e.target.checked)}
                  className="w-4 h-4"
                />
                <span className="text-sm">Apenas vagas remotas</span>
              </label>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
