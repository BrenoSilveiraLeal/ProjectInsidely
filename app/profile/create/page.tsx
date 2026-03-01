'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Briefcase, DollarSign, MapPin, Clock, FileText } from 'lucide-react'
import Navbar from '@/components/Navbar'

export default function CreateProfile() {
  const [userType, setUserType] = useState<'PROFESSIONAL' | 'EXPLORER'>('PROFESSIONAL')
  const [formData, setFormData] = useState({
    jobTitle: '',
    company: '',
    yearsExperience: '',
    location: '',
    salaryRange: '',
    bio: '',
    dailyTasks: '',
    workEnvironment: '',
    workLifeBalance: '',
    prosAndCons: '',
    pricePerCall: '',
    communicationType: 'video',
    proofDocument: null as File | null,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const response = await fetch('/api/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        alert('Perfil criado com sucesso!')
        window.location.href = '/dashboard'
      } else {
        const error = await response.json()
        alert(error.error || 'Erro ao criar perfil')
      }
    } catch (error) {
      alert('Erro ao criar perfil')
    }
  }

  return (
    <main className="min-h-screen pt-20">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl font-bold mb-2">Criar Perfil</h1>
          <p className="text-gray-400 mb-8">Complete seu perfil para começar</p>

          {/* User Type Selection */}
          <div className="glass rounded-2xl p-6 mb-8">
            <h2 className="text-xl font-bold mb-4">Tipo de Conta</h2>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setUserType('PROFESSIONAL')}
                className={`p-6 rounded-xl transition ${
                  userType === 'PROFESSIONAL'
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600'
                    : 'glass hover:bg-white/10'
                }`}
              >
                <Briefcase className="mx-auto mb-3" size={32} />
                <h3 className="font-bold mb-1">Profissional</h3>
                <p className="text-sm text-gray-400">Compartilhe sua experiência</p>
              </button>
              <button
                onClick={() => setUserType('EXPLORER')}
                className={`p-6 rounded-xl transition ${
                  userType === 'EXPLORER'
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600'
                    : 'glass hover:bg-white/10'
                }`}
              >
                <FileText className="mx-auto mb-3" size={32} />
                <h3 className="font-bold mb-1">Explorador</h3>
                <p className="text-sm text-gray-400">Descubra carreiras</p>
              </button>
            </div>
          </div>

          {userType === 'PROFESSIONAL' && (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Info */}
              <div className="glass rounded-2xl p-6">
                <h2 className="text-xl font-bold mb-4">Informações Básicas</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Cargo</label>
                    <input
                      type="text"
                      value={formData.jobTitle}
                      onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
                      className="w-full px-4 py-3 glass rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="Ex: Senior Software Engineer"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Empresa</label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full px-4 py-3 glass rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="Ex: Google"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Anos de Experiência</label>
                    <input
                      type="number"
                      value={formData.yearsExperience}
                      onChange={(e) => setFormData({ ...formData, yearsExperience: e.target.value })}
                      className="w-full px-4 py-3 glass rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="Ex: 5"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Localização</label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full px-4 py-3 glass rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="Ex: São Paulo, SP"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Work Details */}
              <div className="glass rounded-2xl p-6">
                <h2 className="text-xl font-bold mb-4">Detalhes do Trabalho</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Faixa Salarial (opcional)</label>
                    <input
                      type="text"
                      value={formData.salaryRange}
                      onChange={(e) => setFormData({ ...formData, salaryRange: e.target.value })}
                      className="w-full px-4 py-3 glass rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="Ex: R$ 15.000 - R$ 25.000"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Sobre Você</label>
                    <textarea
                      value={formData.bio}
                      onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                      className="w-full px-4 py-3 glass rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 h-24"
                      placeholder="Conte um pouco sobre sua experiência..."
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Tarefas Diárias</label>
                    <textarea
                      value={formData.dailyTasks}
                      onChange={(e) => setFormData({ ...formData, dailyTasks: e.target.value })}
                      className="w-full px-4 py-3 glass rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 h-24"
                      placeholder="Descreva suas atividades do dia a dia..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Ambiente de Trabalho</label>
                    <textarea
                      value={formData.workEnvironment}
                      onChange={(e) => setFormData({ ...formData, workEnvironment: e.target.value })}
                      className="w-full px-4 py-3 glass rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 h-24"
                      placeholder="Como é o ambiente na sua empresa?"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Work-Life Balance</label>
                    <textarea
                      value={formData.workLifeBalance}
                      onChange={(e) => setFormData({ ...formData, workLifeBalance: e.target.value })}
                      className="w-full px-4 py-3 glass rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 h-24"
                      placeholder="Como você equilibra trabalho e vida pessoal?"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Prós e Contras</label>
                    <textarea
                      value={formData.prosAndCons}
                      onChange={(e) => setFormData({ ...formData, prosAndCons: e.target.value })}
                      className="w-full px-4 py-3 glass rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 h-24"
                      placeholder="Quais são os pontos positivos e negativos?"
                    />
                  </div>
                </div>
              </div>

              {/* Pricing */}
              <div className="glass rounded-2xl p-6">
                <h2 className="text-xl font-bold mb-4">Configurações de Atendimento</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Preço por Conversa (30min)</label>
                    <input
                      type="number"
                      value={formData.pricePerCall}
                      onChange={(e) => setFormData({ ...formData, pricePerCall: e.target.value })}
                      className="w-full px-4 py-3 glass rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="Ex: 150"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Tipo de Comunicação</label>
                    <select
                      value={formData.communicationType}
                      onChange={(e) => setFormData({ ...formData, communicationType: e.target.value })}
                      className="w-full px-4 py-3 glass rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="video">Vídeo</option>
                      <option value="audio">Áudio</option>
                      <option value="chat">Chat</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Proof of Employment */}
              <div className="glass rounded-2xl p-6 border-2 border-yellow-500/30">
                <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
                  <span>⚠️</span> Comprovação de Vínculo
                </h2>
                <p className="text-sm text-gray-400 mb-4">
                  Para garantir a autenticidade, é obrigatório enviar um contracheque ou documento que comprove seu vínculo com a empresa.
                </p>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Upload do Contracheque (PDF, JPG ou PNG) *
                  </label>
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => setFormData({ ...formData, proofDocument: e.target.files?.[0] || null })}
                    className="w-full px-4 py-3 glass rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-indigo-600 file:text-white file:cursor-pointer hover:file:bg-indigo-700"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    🔒 Seus dados são confidenciais e serão usados apenas para verificação
                  </p>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl font-bold text-lg hover:opacity-90 transition"
              >
                Criar Perfil
              </button>
            </form>
          )}

          {userType === 'EXPLORER' && (
            <div className="glass rounded-2xl p-8 text-center">
              <h2 className="text-2xl font-bold mb-4">Perfil de Explorador</h2>
              <p className="text-gray-400 mb-6">
                Como explorador, você pode começar a buscar profissionais imediatamente!
              </p>
              <button className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl font-medium hover:opacity-90 transition">
                Começar a Explorar
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </main>
  )
}
