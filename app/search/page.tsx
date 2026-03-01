'use client'

import { useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Building2, Briefcase } from 'lucide-react'
import Navbar from '@/components/Navbar'
import AdvancedFilters from '@/components/AdvancedFilters'
import ProfessionalCard from '@/components/ProfessionalCard'
import Link from 'next/link'

const companies = ['Google', 'Meta', 'Amazon', 'Microsoft', 'Apple', 'Netflix', 'Tesla', 'Spotify', 'Nubank']
const professions = ['Software Engineer', 'Product Manager', 'Data Scientist', 'UX Designer', 'DevOps Engineer']

const mockProfessionals = [
  {
    id: '1',
    name: 'Ana Silva',
    jobTitle: 'Senior Software Engineer',
    company: 'Google',
    location: 'São Paulo, SP',
    yearsExperience: 8,
    rating: 4.9,
    totalReviews: 127,
    pricePerCall: 150,
    image: '👩💻',
    available: true
  },
  {
    id: '2',
    name: 'Carlos Santos',
    jobTitle: 'Product Manager',
    company: 'Meta',
    location: 'Rio de Janeiro, RJ',
    yearsExperience: 6,
    rating: 4.8,
    totalReviews: 94,
    pricePerCall: 200,
    image: '👨💼',
    available: true
  },
  {
    id: '3',
    name: 'Marina Costa',
    jobTitle: 'UX Designer',
    company: 'Amazon',
    location: 'Belo Horizonte, MG',
    yearsExperience: 5,
    rating: 5.0,
    totalReviews: 156,
    pricePerCall: 120,
    image: '👩🎨',
    available: false
  },
  {
    id: '4',
    name: 'Pedro Oliveira',
    jobTitle: 'Data Scientist',
    company: 'Microsoft',
    location: 'São Paulo, SP',
    yearsExperience: 7,
    rating: 4.7,
    totalReviews: 83,
    pricePerCall: 180,
    image: '👨🔬',
    available: true
  }
]

export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get('q') || ''
  const [filters, setFilters] = useState<any>({})

  const filteredCompanies = companies.filter(c => 
    c.toLowerCase().includes(query.toLowerCase())
  )

  const filteredProfessions = professions.filter(p => 
    p.toLowerCase().includes(query.toLowerCase())
  )

  const filteredProfessionals = mockProfessionals.filter(p => {
    if (filters.company && p.company !== filters.company) return false
    if (filters.role && p.jobTitle !== filters.role) return false
    if (filters.minRating && p.rating < filters.minRating) return false
    if (filters.minExperience && p.yearsExperience < filters.minExperience) return false
    return true
  })

  return (
    <main className="min-h-screen">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Search className="text-indigo-400" size={32} />
                <h1 className="text-4xl font-bold">
                  Resultados para: <span className="gradient-text">"{query}"</span>
                </h1>
              </div>
              <p className="text-gray-400">
                {filteredCompanies.length + filteredProfessions.length + filteredProfessionals.length} resultados encontrados
              </p>
            </div>
            <AdvancedFilters onFilterChange={setFilters} />
          </div>
        </motion.div>

        {filteredProfessionals.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-6">
              <Briefcase className="text-green-400" size={28} />
              <h2 className="text-3xl font-bold">Profissionais</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredProfessionals.map((pro, i) => (
                <motion.div
                  key={pro.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.05 }}
                >
                  <ProfessionalCard {...pro} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {filteredCompanies.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-6">
              <Building2 className="text-purple-400" size={28} />
              <h2 className="text-3xl font-bold">Empresas</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {filteredCompanies.map((company, i) => (
                <Link key={company} href={`/company/${encodeURIComponent(company)}`}>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 + i * 0.05 }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="glass rounded-xl p-6 hover:bg-white/10 hover:shadow-xl hover:shadow-purple-500/20 transition-all cursor-pointer"
                  >
                    <Building2 className="mb-3 text-indigo-400" size={24} />
                    <h3 className="font-bold text-lg">{company}</h3>
                  </motion.div>
                </Link>
              ))}
            </div>
          </motion.div>
        )}

        {filteredProfessions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <Briefcase className="text-green-400" size={28} />
              <h2 className="text-3xl font-bold">Profissões</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredProfessions.map((profession, i) => (
                <Link key={profession} href={`/profession/${encodeURIComponent(profession)}`}>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 + i * 0.05 }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="glass rounded-xl p-6 hover:bg-white/10 hover:shadow-xl hover:shadow-green-500/20 transition-all cursor-pointer"
                  >
                    <Briefcase className="mb-3 text-green-400" size={24} />
                    <h3 className="font-bold text-lg">{profession}</h3>
                  </motion.div>
                </Link>
              ))}
            </div>
          </motion.div>
        )}

        {filteredCompanies.length === 0 && filteredProfessions.length === 0 && filteredProfessionals.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <Search className="mx-auto mb-4 text-gray-600" size={64} />
            <h3 className="text-2xl font-bold mb-2">Nenhum resultado encontrado</h3>
            <p className="text-gray-400">Tente buscar por outra empresa, profissão ou ajuste os filtros</p>
          </motion.div>
        )}
      </div>
    </main>
  )
}
