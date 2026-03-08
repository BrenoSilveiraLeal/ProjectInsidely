'use client'

import { Star, MapPin, Briefcase, MessageCircle, Clock, DollarSign, Lock, CheckCircle, Calendar, User } from 'lucide-react'
import { motion } from 'framer-motion'
import { useState, use } from 'react'
import Navbar from '@/components/Navbar'

const professionalData: Record<string, any> = {
  '1': {
    name: 'Ana Silva',
    jobTitle: 'Senior Software Engineer',
    company: 'Google',
    location: 'São Paulo, SP',
    remote: true,
    yearsExperience: 8,
    salaryRange: 'R$ 20k - R$ 30k',
    rating: 4.9,
    totalReviews: 127,
    conversationsCount: 127,
    responseTime: '~2 horas',
    responseRate: 98,
    image: '👩💻',
    bio: 'Trabalho como engenheira de software no Google há 5 anos. Adoro compartilhar minha experiência e ajudar pessoas a entenderem como é trabalhar em big techs.',
    preview: 'O ambiente na Google é bastante colaborativo, mas os prazos são apertados. A cultura de inovação é real, mas você precisa estar preparado para...',
    fullExperience: 'O ambiente na Google é bastante colaborativo, mas os prazos são apertados. A cultura de inovação é real, mas você precisa estar preparado para trabalhar com muita autonomia e responsabilidade. Os benefícios são excelentes e o aprendizado é constante.',
    dailyTasks: 'Desenvolvimento de features, code reviews, reuniões com o time, planejamento de sprints, pair programming',
    workEnvironment: 'Ambiente colaborativo, trabalho híbrido (3 dias escritório), muita autonomia, cultura de feedback',
    workLifeBalance: 'Excelente. Trabalho 40h/semana com flexibilidade de horários. Sem overtime obrigatório.',
    pros: ['Salário excelente', 'Benefícios top', 'Aprendizado constante', 'Marca forte no CV'],
    cons: ['Alta pressão por resultados', 'Processos burocráticos', 'Competição interna'],
    prices: [
      { duration: 15, price: 80 },
      { duration: 30, price: 150 },
      { duration: 45, price: 200 }
    ]
  },
  '2': {
    name: 'Carlos Santos',
    jobTitle: 'Product Manager',
    company: 'Meta',
    location: 'Rio de Janeiro, RJ',
    remote: true,
    yearsExperience: 6,
    salaryRange: 'R$ 18k - R$ 25k',
    rating: 4.8,
    totalReviews: 94,
    conversationsCount: 94,
    responseTime: '~3 horas',
    responseRate: 95,
    image: '👨💼',
    bio: 'PM na Meta focado em produtos de crescimento. Posso te ajudar a entender a carreira de PM e como é trabalhar em produtos de larga escala.',
    preview: 'Ser PM na Meta é desafiador. Você lida com múltiplos stakeholders e precisa tomar decisões difíceis todos os dias...',
    fullExperience: 'Ser PM na Meta é desafiador. Você lida com múltiplos stakeholders e precisa tomar decisões difíceis todos os dias. A cultura é data-driven e você precisa justificar cada decisão com dados. O impacto é enorme, mas a pressão também.',
    dailyTasks: 'Análise de métricas, reuniões com stakeholders, definição de roadmap, priorização de features',
    workEnvironment: 'Fast-paced, data-driven, muita colaboração entre times',
    workLifeBalance: 'Bom, mas depende do projeto. Algumas semanas são mais intensas.',
    pros: ['Impacto em milhões de usuários', 'Salário competitivo', 'Aprendizado rápido'],
    cons: ['Pressão constante', 'Mudanças frequentes de prioridade', 'Política interna'],
    prices: [
      { duration: 15, price: 100 },
      { duration: 30, price: 180 },
      { duration: 45, price: 250 }
    ]
  }
}

export default function ProfessionalProfile({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const [showFullExperience, setShowFullExperience] = useState(false)
  const [selectedDuration, setSelectedDuration] = useState(30)
  
  const professional = professionalData[id] || professionalData['1']
  const selectedPrice = professional.prices.find((p: any) => p.duration === selectedDuration)

  return (
    <main className="min-h-screen">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass rounded-2xl p-8"
            >
              <div className="flex items-start gap-6">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-3xl font-bold">
                  {professional.name.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2)}
                </div>
                <div className="flex-1">
                  <h1 className="text-3xl font-bold mb-2">{professional.name}</h1>
                  <p className="text-xl text-gray-400 mb-1">{professional.jobTitle}</p>
                  <p className="text-lg text-indigo-400 mb-4">{professional.company}</p>
                  
                  <div className="flex flex-wrap gap-4 text-sm mb-4">
                    <div className="flex items-center gap-2">
                      <MapPin size={16} className="text-gray-400" />
                      <span>{professional.location}</span>
                    </div>
                    {professional.remote && (
                      <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-xs">
                        Remoto
                      </span>
                    )}
                    <div className="flex items-center gap-2">
                      <Briefcase size={16} className="text-gray-400" />
                      <span>{professional.yearsExperience} anos</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign size={16} className="text-gray-400" />
                      <span>{professional.salaryRange}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Star size={18} className="text-yellow-400 fill-yellow-400" />
                      <span className="font-bold">{professional.rating}</span>
                      <span className="text-gray-400">({professional.totalReviews} avaliações)</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-400">
                      <MessageCircle size={16} />
                      <span>{professional.conversationsCount} conversas</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* About */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="glass rounded-2xl p-8"
            >
              <h2 className="text-2xl font-bold mb-4">Sobre</h2>
              <p className="text-gray-300 leading-relaxed">{professional.bio}</p>
            </motion.div>

            {/* Preview Experience */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="glass rounded-2xl p-8"
            >
              <h2 className="text-2xl font-bold mb-4">Experiência na Empresa</h2>
              <div className="relative">
                <p className="text-gray-300 leading-relaxed mb-4">
                  {showFullExperience ? professional.fullExperience : professional.preview}
                </p>
                {!showFullExperience && (
                  <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-gray-950 to-transparent" />
                )}
              </div>
              {!showFullExperience && (
                <button
                  onClick={() => setShowFullExperience(true)}
                  className="mt-4 flex items-center gap-2 text-indigo-400 hover:text-indigo-300 transition"
                >
                  <Lock size={16} />
                  Desbloquear relato completo
                </button>
              )}
            </motion.div>

            {/* Details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="glass rounded-2xl p-8 space-y-6"
            >
              <div>
                <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                  <CheckCircle className="text-green-400" size={20} />
                  Tarefas Diárias
                </h3>
                <p className="text-gray-300">{professional.dailyTasks}</p>
              </div>
              
              <div>
                <h3 className="text-xl font-bold mb-3">Ambiente de Trabalho</h3>
                <p className="text-gray-300">{professional.workEnvironment}</p>
              </div>
              
              <div>
                <h3 className="text-xl font-bold mb-3">Work-Life Balance</h3>
                <p className="text-gray-300">{professional.workLifeBalance}</p>
              </div>
              
              <div>
                <h3 className="text-xl font-bold mb-3 text-green-400">Pontos Positivos</h3>
                <ul className="space-y-2">
                  {professional.pros.map((pro: string, i: number) => (
                    <li key={i} className="flex items-start gap-2 text-gray-300">
                      <CheckCircle className="text-green-400 flex-shrink-0 mt-1" size={16} />
                      {pro}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-bold mb-3 text-red-400">Desafios</h3>
                <ul className="space-y-2">
                  {professional.cons.map((con: string, i: number) => (
                    <li key={i} className="flex items-start gap-2 text-gray-300">
                      <span className="text-red-400 mt-1">•</span>
                      {con}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>

          {/* Sidebar - Booking */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="glass rounded-2xl p-6 sticky top-24"
            >
              <h3 className="text-xl font-bold mb-4">Agendar Conversa</h3>
              
              <div className="space-y-3 mb-6">
                {professional.prices.map((option: any) => (
                  <button
                    key={option.duration}
                    onClick={() => setSelectedDuration(option.duration)}
                    className={`w-full p-4 rounded-xl border-2 transition-all ${
                      selectedDuration === option.duration
                        ? 'border-indigo-500 bg-indigo-500/10'
                        : 'border-white/10 hover:border-white/20'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <div className="text-left">
                        <div className="font-bold">{option.duration} minutos</div>
                        <div className="text-sm text-gray-400">Conversa por vídeo</div>
                      </div>
                      <div className="text-2xl font-bold">R${option.price}</div>
                    </div>
                  </button>
                ))}
              </div>

              <button className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl font-bold text-lg hover:opacity-90 transition mb-3 flex items-center justify-center gap-2">
                <Calendar size={20} />
                Agendar por R${selectedPrice?.price}
              </button>

              <button className="w-full py-4 glass rounded-xl font-medium hover:bg-white/10 transition flex items-center justify-center gap-2">
                <MessageCircle size={20} />
                Enviar Mensagem
              </button>

              <div className="mt-6 pt-6 border-t border-white/10 space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Tempo de resposta</span>
                  <span className="font-medium">{professional.responseTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Taxa de resposta</span>
                  <span className="font-medium text-green-400">{professional.responseRate}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Conversas realizadas</span>
                  <span className="font-medium">{professional.conversationsCount}</span>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-white/10">
                <div className="flex items-start gap-2 text-xs text-gray-400">
                  <Lock size={14} className="flex-shrink-0 mt-0.5" />
                  <p>Pagamento seguro processado pelo Stripe. Reembolso total se cancelar com 24h de antecedência.</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  )
}
