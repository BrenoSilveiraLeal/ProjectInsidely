'use client'

import { motion } from 'framer-motion'
import { Lightbulb, Target, Users, Heart, Shield, TrendingUp, MessageCircle, CheckCircle } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Link from 'next/link'

export default function AboutPage() {
  const values = [
    { icon: Shield, title: 'Transparência', description: 'Informações reais de quem vive a profissão' },
    { icon: Heart, title: 'Empatia', description: 'Conectando pessoas com experiências genuínas' },
    { icon: Target, title: 'Decisões Conscientes', description: 'Ajudando a construir carreiras alinhadas' },
  ]

  const problems = [
    'Ambiente de trabalho tóxico',
    'Chefias difíceis',
    'Desvio de função',
    'Carga de trabalho inesperada',
    'Rotina diferente do prometido',
    'Expectativas vs. Realidade',
  ]

  const insights = [
    'Ambiente de trabalho',
    'Cultura da empresa',
    'Relação entre colegas e liderança',
    'Rotina e tarefas da função',
    'Faixa salarial',
    'Possíveis desvios de função',
    'Desafios reais da profissão',
  ]

  return (
    <main className="min-h-screen">
      <Navbar />
      
      <section className="pt-32 pb-20 px-4 relative">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-block mb-6"
            >
              <Lightbulb className="text-yellow-400" size={64} />
            </motion.div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Sobre a <span className="gradient-text">Insidely</span>
            </h1>
            <p className="text-xl text-gray-400">
              Conectando pessoas com a realidade do mercado de trabalho
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass rounded-3xl p-8 md:p-12 mb-12"
          >
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Target className="text-indigo-400" />
              Como Tudo Começou
            </h2>
            <div className="space-y-4 text-lg text-gray-300 leading-relaxed">
              <p>
                A Insidely nasceu a partir de um problema muito comum no mercado de trabalho atual: 
                <span className="text-white font-semibold"> a frustração profissional</span>.
              </p>
              <p>
                Todos os anos, milhares de pessoas escolhem carreiras, empresas ou áreas de atuação 
                baseadas apenas em descrições genéricas, promessas de vagas ou expectativas criadas 
                nas redes sociais. No entanto, quando finalmente ingressam no mercado de trabalho, 
                muitas descobrem que a realidade da profissão é muito diferente do que imaginavam.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="glass rounded-3xl p-8 md:p-12 mb-12"
          >
            <h2 className="text-3xl font-bold mb-6">O Problema</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {problems.map((problem, i) => (
                <motion.div
                  key={problem}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-xl"
                >
                  <div className="w-2 h-2 bg-red-500 rounded-full" />
                  <span className="text-gray-300">{problem}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="glass rounded-3xl p-8 md:p-12 mb-12"
          >
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Users className="text-purple-400" />
              Nossa Solução
            </h2>
            <div className="space-y-4 text-lg text-gray-300 leading-relaxed">
              <p>
                Foi observando esse cenário que surgiu a Insidely.
              </p>
              <p className="text-xl text-white font-semibold">
                Nosso objetivo é aproximar quem quer entrar em uma área ou empresa de quem já vive 
                essa realidade todos os dias.
              </p>
              <p>
                Na Insidely, profissionais podem compartilhar suas experiências reais, enquanto 
                pessoas interessadas podem conversar diretamente com eles, tirando dúvidas e 
                entendendo como é o dia a dia antes de tomar decisões importantes para sua carreira.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="glass rounded-3xl p-8 md:p-12 mb-12"
          >
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <MessageCircle className="text-green-400" />
              O Que Você Pode Descobrir
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {insights.map((insight, i) => (
                <motion.div
                  key={insight}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + i * 0.1 }}
                  className="flex items-center gap-3 p-4 bg-green-500/10 border border-green-500/20 rounded-xl"
                >
                  <CheckCircle className="text-green-400 flex-shrink-0" size={20} />
                  <span className="text-gray-300">{insight}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
          >
            {values.map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1 + i * 0.1 }}
                className="glass rounded-2xl p-6 text-center hover:bg-white/10 transition-all"
              >
                <value.icon className="mx-auto mb-4 text-indigo-400" size={40} />
                <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                <p className="text-gray-400 text-sm">{value.description}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="glass rounded-3xl p-8 md:p-12 text-center"
          >
            <TrendingUp className="mx-auto mb-6 text-indigo-400" size={48} />
            <h2 className="text-3xl font-bold mb-4">Nossa Missão</h2>
            <p className="text-xl text-gray-300 mb-6 leading-relaxed">
              <span className="text-white font-semibold">Informação real gera decisões melhores.</span>
            </p>
            <p className="text-lg text-gray-400 mb-8">
              A Insidely existe para trazer mais transparência ao mercado de trabalho e ajudar 
              pessoas a construírem carreiras mais conscientes, seguras e alinhadas com a realidade.
            </p>
            <Link href="/">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl font-bold text-lg hover:shadow-2xl hover:shadow-indigo-500/50 transition-all"
              >
                Começar Agora
              </motion.button>
            </Link>
          </motion.div>
        </div>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 blur-3xl -z-10" />
      </section>
    </main>
  )
}
