'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Lock } from 'lucide-react'

const plans = [
  {
    name: 'Explorer',
    price: 29,
    conversations: 3,
    features: [
      'Até 3 conversas por mês',
      'Acesso a relatos completos',
      'Ver salários médios',
      'Acesso ao Reality Check'
    ]
  },
  {
    name: 'Career Pro',
    price: 59,
    conversations: 6,
    features: [
      'Até 6 conversas por mês',
      'Filtros avançados',
      'Acesso prioritário',
      'Empresas em alta'
    ],
    popular: true
  },
  {
    name: 'Premium',
    price: 99,
    conversations: 10,
    features: [
      'Até 10 conversas por mês',
      'Profissionais verificados',
      'Relatórios de empresas',
      'Perguntas ilimitadas'
    ]
  }
]

export default function SubscriptionPlans() {
  const [loading, setLoading] = useState<string | null>(null)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const router = useRouter()

  const handleSubscribe = async (planName: string) => {
    setLoading(planName)
    
    try {
      const res = await fetch('/api/subscriptions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan: planName.toUpperCase().replace(' ', '_') })
      })
      
      if (res.status === 401) {
        setShowLoginModal(true)
        setLoading(null)
        return
      }
      
      if (!res.ok) {
        const error = await res.json()
        alert(error.error || 'Erro ao processar assinatura')
        setLoading(null)
        return
      }
      
      const data = await res.json()
      
      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl
      } else {
        alert('Erro ao gerar link de pagamento')
      }
    } catch (error) {
      console.error(error)
      alert('Erro ao processar assinatura. Tente novamente.')
    } finally {
      setLoading(null)
    }
  }

  return (
    <div className="py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">
          Escolha seu plano
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`glass rounded-2xl p-8 ${
                plan.popular ? 'border-2 border-blue-500 shadow-lg shadow-blue-500/20 scale-105' : ''
              }`}
            >
              {plan.popular && (
                <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm">
                  Mais Popular
                </span>
              )}
              
              <h3 className="text-2xl font-bold mt-4">{plan.name}</h3>
              <div className="mt-4">
                <span className="text-4xl font-bold">R${plan.price}</span>
                <span className="text-gray-400">/mês</span>
              </div>
              
              <ul className="mt-6 space-y-3">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <button
                onClick={() => handleSubscribe(plan.name)}
                disabled={loading === plan.name}
                className="w-full mt-8 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-lg hover:opacity-90 transition disabled:opacity-50"
              >
                {loading === plan.name ? 'Processando...' : 'Assinar'}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[9999] p-4">
          <div className="glass rounded-2xl p-8 max-w-md w-full text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Lock size={32} />
            </div>
            
            <h3 className="text-2xl font-bold mb-4">Login Necessário</h3>
            <p className="text-gray-400 mb-8">
              Para assinar um plano, você precisa estar logado na plataforma.
            </p>
            
            <div className="flex gap-4">
              <button
                onClick={() => setShowLoginModal(false)}
                className="flex-1 px-6 py-3 border border-white/20 rounded-lg hover:bg-white/5 transition"
              >
                Cancelar
              </button>
              <button
                onClick={() => router.push('/auth/signin')}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg hover:opacity-90 transition"
              >
                Entrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
