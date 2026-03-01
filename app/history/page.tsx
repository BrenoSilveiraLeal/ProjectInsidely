'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Clock, Star, MessageCircle, Calendar } from 'lucide-react'
import { motion } from 'framer-motion'

interface Conversation {
  id: string
  professionalName: string
  professionalImage: string
  date: string
  duration: number
  price: number
  rating?: number
  status: 'completed' | 'cancelled' | 'scheduled'
}

export default function HistoryPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin')
      return
    }

    if (status === 'authenticated') {
      fetchHistory()
    }
  }, [status, router])

  const fetchHistory = async () => {
    try {
      // Mock data - em produção, buscar do banco
      const mockData: Conversation[] = [
        {
          id: '1',
          professionalName: 'Ana Silva',
          professionalImage: '👩💻',
          date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
          duration: 60,
          price: 150,
          rating: 5,
          status: 'completed',
        },
        {
          id: '2',
          professionalName: 'Carlos Santos',
          professionalImage: '👨💼',
          date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(),
          duration: 45,
          price: 200,
          rating: 4,
          status: 'completed',
        },
        {
          id: '3',
          professionalName: 'Marina Costa',
          professionalImage: '👩🎨',
          date: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString(),
          duration: 60,
          price: 120,
          status: 'scheduled',
        },
      ]
      setConversations(mockData)
    } catch (error) {
      console.error('Erro ao buscar histórico:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500/20 text-green-400'
      case 'cancelled': return 'bg-red-500/20 text-red-400'
      case 'scheduled': return 'bg-blue-500/20 text-blue-400'
      default: return 'bg-gray-500/20 text-gray-400'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return 'Concluída'
      case 'cancelled': return 'Cancelada'
      case 'scheduled': return 'Agendada'
      default: return status
    }
  }

  if (loading || status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Histórico de Conversas</h1>
          <p className="text-gray-600">Veja todas as suas conversas passadas e agendadas</p>
        </div>

        {conversations.length === 0 ? (
          <div className="glass rounded-2xl p-12 text-center">
            <MessageCircle size={48} className="mx-auto mb-4 text-gray-400" />
            <p className="text-gray-600">Você ainda não tem conversas</p>
          </div>
        ) : (
          <div className="space-y-4">
            {conversations.map((conv, i) => (
              <motion.div
                key={conv.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass rounded-2xl p-6 hover:bg-white/10 transition"
              >
                <div className="flex items-start gap-4">
                  <div className="text-5xl">{conv.professionalImage}</div>
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{conv.professionalName}</h3>
                        <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                          <span className="flex items-center gap-1">
                            <Calendar size={14} />
                            {formatDate(conv.date)}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock size={14} />
                            {conv.duration} min
                          </span>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(conv.status)}`}>
                        {getStatusText(conv.status)}
                      </span>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center gap-4">
                        <span className="text-lg font-bold text-green-600">R$ {conv.price}</span>
                        {conv.rating && (
                          <div className="flex items-center gap-1">
                            <Star size={16} className="text-yellow-500 fill-yellow-500" />
                            <span className="font-semibold">{conv.rating}</span>
                          </div>
                        )}
                      </div>
                      
                      {conv.status === 'completed' && !conv.rating && (
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm">
                          Avaliar
                        </button>
                      )}
                      {conv.status === 'scheduled' && (
                        <button className="px-4 py-2 glass rounded-lg hover:bg-white/10 transition text-sm">
                          Ver Detalhes
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
