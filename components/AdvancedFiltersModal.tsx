'use client'

import { useState } from 'react'
import { SlidersHorizontal, X } from 'lucide-react'

interface AdvancedFiltersProps {
  onApply: (filters: any) => void
}

export default function AdvancedFiltersModal({ onApply }: AdvancedFiltersProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [filters, setFilters] = useState({
    minPrice: '',
    maxPrice: '',
    minRating: '',
    minExperience: '',
    availability: 'all',
    location: ''
  })

  const handleApply = () => {
    onApply(filters)
    setIsOpen(false)
  }

  const handleReset = () => {
    setFilters({
      minPrice: '',
      maxPrice: '',
      minRating: '',
      minExperience: '',
      availability: 'all',
      location: ''
    })
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-4 py-2 glass rounded-lg hover:bg-white/10 transition"
      >
        <SlidersHorizontal size={20} />
        Filtros
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[9999] p-4">
          <div className="glass rounded-2xl p-6 w-full max-w-md max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold">Filtros Avançados</h3>
              <button onClick={() => setIsOpen(false)}>
                <X size={24} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Preço</label>
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="number"
                    placeholder="Mín"
                    value={filters.minPrice}
                    onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
                    className="px-4 py-2 glass rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <input
                    type="number"
                    placeholder="Máx"
                    value={filters.maxPrice}
                    onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
                    className="px-4 py-2 glass rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Avaliação Mínima</label>
                <select
                  value={filters.minRating}
                  onChange={(e) => setFilters({ ...filters, minRating: e.target.value })}
                  className="w-full px-4 py-2 glass rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">Todas</option>
                  <option value="4.5">4.5+ ⭐</option>
                  <option value="4.0">4.0+ ⭐</option>
                  <option value="3.5">3.5+ ⭐</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Experiência Mínima</label>
                <input
                  type="number"
                  placeholder="Anos"
                  value={filters.minExperience}
                  onChange={(e) => setFilters({ ...filters, minExperience: e.target.value })}
                  className="w-full px-4 py-2 glass rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Disponibilidade</label>
                <select
                  value={filters.availability}
                  onChange={(e) => setFilters({ ...filters, availability: e.target.value })}
                  className="w-full px-4 py-2 glass rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="all">Todos</option>
                  <option value="available">Disponíveis</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Localização</label>
                <input
                  type="text"
                  placeholder="Ex: São Paulo"
                  value={filters.location}
                  onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                  className="w-full px-4 py-2 glass rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={handleReset}
                className="flex-1 py-3 glass rounded-lg hover:bg-white/10 transition"
              >
                Limpar
              </button>
              <button
                onClick={handleApply}
                className="flex-1 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg hover:opacity-90 transition"
              >
                Aplicar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
