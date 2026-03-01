'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { MapPin, TrendingUp, Briefcase, Search } from 'lucide-react'

interface RegionData {
  region: string
  state: string
  professions: {
    name: string
    jobCount: number
    growth: number
  }[]
}

const brazilRegions = [
  { name: 'São Paulo', state: 'SP', color: 'from-blue-500 to-blue-600' },
  { name: 'Rio de Janeiro', state: 'RJ', color: 'from-purple-500 to-purple-600' },
  { name: 'Belo Horizonte', state: 'MG', color: 'from-green-500 to-green-600' },
  { name: 'Brasília', state: 'DF', color: 'from-yellow-500 to-yellow-600' },
  { name: 'Porto Alegre', state: 'RS', color: 'from-red-500 to-red-600' },
  { name: 'Curitiba', state: 'PR', color: 'from-indigo-500 to-indigo-600' },
  { name: 'Salvador', state: 'BA', color: 'from-pink-500 to-pink-600' },
  { name: 'Recife', state: 'PE', color: 'from-orange-500 to-orange-600' },
]

export default function EmployabilityMap() {
  const [selectedRegion, setSelectedRegion] = useState<string>('São Paulo')
  const [regionData, setRegionData] = useState<RegionData | null>(null)
  const [loading, setLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    fetchRegionData(selectedRegion)
  }, [selectedRegion])

  const fetchRegionData = async (region: string) => {
    setLoading(true)
    try {
      const response = await fetch(`/api/employability?region=${encodeURIComponent(region)}`)
      const data = await response.json()
      setRegionData(data)
    } catch (error) {
      console.error('Erro ao buscar dados:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredProfessions = regionData?.professions.filter(prof =>
    prof.name.toLowerCase().includes(searchQuery.toLowerCase())
  ) || []

  return (
    <section className="py-20 px-4 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <MapPin className="text-indigo-400" size={40} />
            <h2 className="text-4xl md:text-5xl font-bold">
              Mapa de <span className="gradient-text">Empregabilidade</span>
            </h2>
          </div>
          <p className="text-xl text-gray-400">
            Descubra quais áreas profissionais têm mais vagas na sua região
          </p>
        </motion.div>

        {/* Region Selector */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 mb-12">
          {brazilRegions.map((region, i) => (
            <motion.button
              key={region.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ scale: 1.05, y: -2 }}
              onClick={() => setSelectedRegion(region.name)}
              className={`glass rounded-xl p-4 transition-all ${
                selectedRegion === region.name
                  ? `bg-gradient-to-r ${region.color} shadow-lg`
                  : 'hover:bg-white/10'
              }`}
            >
              <MapPin size={24} className="mx-auto mb-2" />
              <div className="font-bold text-sm">{region.name}</div>
              <div className="text-xs text-gray-400">{region.state}</div>
            </motion.button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="glass rounded-xl p-4 flex items-center gap-3">
            <Search className="text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Buscar profissão..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent outline-none text-white placeholder-gray-500"
            />
          </div>
        </div>

        {/* Data Display */}
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
            <p className="mt-4 text-gray-400">Carregando dados...</p>
          </div>
        ) : regionData ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass rounded-2xl p-8"
          >
            <div className="flex items-center gap-3 mb-8">
              <Briefcase className="text-indigo-400" size={32} />
              <div>
                <h3 className="text-2xl font-bold">{regionData.region}</h3>
                <p className="text-gray-400">Top profissões com mais vagas</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProfessions.map((profession, i) => (
                <motion.div
                  key={profession.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="glass rounded-xl p-6 hover:bg-white/10 transition-all group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <h4 className="font-bold text-lg group-hover:text-indigo-400 transition-colors">
                      {profession.name}
                    </h4>
                    {profession.growth > 0 && (
                      <div className="flex items-center gap-1 text-green-400 text-sm">
                        <TrendingUp size={16} />
                        <span>+{profession.growth}%</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-400">Vagas disponíveis</span>
                        <span className="font-bold text-indigo-400">{profession.jobCount}</span>
                      </div>
                      <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${Math.min((profession.jobCount / 500) * 100, 100)}%` }}
                          transition={{ duration: 1, delay: i * 0.1 }}
                          className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {filteredProfessions.length === 0 && (
              <div className="text-center py-12 text-gray-400">
                Nenhuma profissão encontrada com "{searchQuery}"
              </div>
            )}
          </motion.div>
        ) : null}
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-indigo-500/10 to-purple-500/10 blur-3xl -z-10" />
    </section>
  )
}
