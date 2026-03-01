'use client'

import { Calendar, DollarSign, Star, Users } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function Dashboard() {
  const stats = [
    { label: 'Conversas Agendadas', value: '5', icon: Calendar, color: 'indigo' },
    { label: 'Total Gasto', value: 'R$ 750', icon: DollarSign, color: 'green' },
    { label: 'Profissionais Salvos', value: '12', icon: Users, color: 'purple' },
    { label: 'Avaliações Feitas', value: '3', icon: Star, color: 'yellow' },
  ]

  const upcomingBookings = [
    {
      id: 1,
      professional: 'Ana Silva',
      company: 'Google',
      role: 'Senior Software Engineer',
      date: '2024-01-15',
      time: '14:00',
    },
    {
      id: 2,
      professional: 'Carlos Santos',
      company: 'Meta',
      role: 'Product Manager',
      date: '2024-01-18',
      time: '10:00',
    },
  ]

  return (
    <main className="min-h-screen pt-20">
      <nav className="fixed top-0 w-full z-50 glass border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="text-2xl font-bold gradient-text">Insidely</Link>
            <div className="flex gap-4">
              <Link href="/dashboard" className="px-4 py-2 text-sm text-indigo-400">Dashboard</Link>
              <button className="px-4 py-2 text-sm hover:text-indigo-400 transition">Sair</button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8">Meu Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass rounded-2xl p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <stat.icon className={`text-${stat.color}-400`} size={24} />
              </div>
              <div className="text-3xl font-bold mb-1">{stat.value}</div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="glass rounded-2xl p-6"
          >
            <h2 className="text-2xl font-bold mb-6">Próximas Conversas</h2>
            <div className="space-y-4">
              {upcomingBookings.map((booking) => (
                <div key={booking.id} className="glass rounded-xl p-4 hover:bg-white/10 transition">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-bold">{booking.professional}</h3>
                      <p className="text-sm text-gray-400">{booking.role}</p>
                      <p className="text-sm text-indigo-400">{booking.company}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{booking.date}</p>
                      <p className="text-sm text-gray-400">{booking.time}</p>
                    </div>
                  </div>
                  <button className="w-full mt-3 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg text-sm font-medium hover:opacity-90 transition">
                    Entrar na Chamada
                  </button>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="glass rounded-2xl p-6"
          >
            <h2 className="text-2xl font-bold mb-6">Histórico de Pagamentos</h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center py-3 border-b border-white/10">
                <div>
                  <p className="font-medium">Ana Silva - Google</p>
                  <p className="text-sm text-gray-400">15 Jan 2024</p>
                </div>
                <p className="font-bold text-green-400">R$ 150</p>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-white/10">
                <div>
                  <p className="font-medium">Carlos Santos - Meta</p>
                  <p className="text-sm text-gray-400">12 Jan 2024</p>
                </div>
                <p className="font-bold text-green-400">R$ 200</p>
              </div>
              <div className="flex justify-between items-center py-3">
                <div>
                  <p className="font-medium">Marina Costa - Amazon</p>
                  <p className="text-sm text-gray-400">08 Jan 2024</p>
                </div>
                <p className="font-bold text-green-400">R$ 120</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  )
}
