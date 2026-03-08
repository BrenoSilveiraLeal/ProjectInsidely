'use client'

import { motion } from 'framer-motion'
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react'

const realityChecks = [
  {
    profession: 'Software Engineer',
    question: 'Vale a pena ser Software Engineer?',
    pros: [
      'Salários competitivos e benefícios',
      'Trabalho remoto é comum',
      'Mercado aquecido com muitas vagas',
      'Aprendizado constante'
    ],
    cons: [
      'Pressão por entregas rápidas',
      'Síndrome do impostor é comum',
      'Necessidade de atualização constante',
      'Reuniões podem ser excessivas'
    ],
    reality: 'A rotina envolve muito mais do que apenas programar. Você vai participar de reuniões, revisar código de colegas, planejar arquitetura e lidar com bugs inesperados.'
  },
  {
    profession: 'Product Manager',
    question: 'Vale a pena ser Product Manager?',
    pros: [
      'Visão estratégica do produto',
      'Impacto direto no negócio',
      'Trabalho multidisciplinar',
      'Boa progressão de carreira'
    ],
    cons: [
      'Pressão de stakeholders',
      'Decisões difíceis constantemente',
      'Responsabilidade por resultados',
      'Conflitos entre áreas'
    ],
    reality: 'Você será o ponto central entre engenharia, design, vendas e liderança. Precisa saber dizer não e priorizar o que realmente importa.'
  },
  {
    profession: 'UX Designer',
    question: 'Vale a pena ser UX Designer?',
    pros: [
      'Trabalho criativo e estratégico',
      'Impacto na experiência do usuário',
      'Portfólio diversificado',
      'Colaboração com várias áreas'
    ],
    cons: [
      'Feedback subjetivo é comum',
      'Nem sempre suas ideias são implementadas',
      'Pressão por resultados visuais rápidos',
      'Necessidade de justificar decisões'
    ],
    reality: 'Você vai passar mais tempo pesquisando, testando e iterando do que criando telas bonitas. A parte visual é só 30% do trabalho.'
  }
]

export default function RealityCheck() {
  return (
    <section className="py-16 px-4 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotateX: 45 }}
          whileInView={{ opacity: 1, scale: 1, rotateX: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
              Reality Check
            </span>
          </h2>
          <p className="text-xl text-gray-400">
            A verdade sobre as profissões que ninguém te conta
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {realityChecks.map((check, i) => (
            <motion.div
              key={check.profession}
              initial={{ opacity: 0, rotateY: -90, x: -200 }}
              whileInView={{ opacity: 1, rotateY: 0, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: i * 0.2, duration: 0.8, type: "spring" }}
              whileHover={{ y: -12, scale: 1.03 }}
              className="glass rounded-2xl p-6 hover:bg-white/10 hover:shadow-2xl hover:shadow-orange-500/20 transition-all group card-hover"
            >
              <h3 className="text-2xl font-bold mb-4 group-hover:text-orange-400 transition">
                {check.question}
              </h3>

              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle className="text-green-400" size={20} />
                  <span className="font-semibold text-green-400">Pontos Positivos</span>
                </div>
                <ul className="space-y-2">
                  {check.pros.map((pro, idx) => (
                    <li key={idx} className="text-sm text-gray-300 flex items-start gap-2">
                      <span className="text-green-400 mt-1">•</span>
                      {pro}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <XCircle className="text-red-400" size={20} />
                  <span className="font-semibold text-red-400">Desafios</span>
                </div>
                <ul className="space-y-2">
                  {check.cons.map((con, idx) => (
                    <li key={idx} className="text-sm text-gray-300 flex items-start gap-2">
                      <span className="text-red-400 mt-1">•</span>
                      {con}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-white/10">
                <div className="flex items-start gap-2 mb-2">
                  <AlertCircle className="text-yellow-400 flex-shrink-0 mt-1" size={18} />
                  <span className="font-semibold text-yellow-400">Realidade do Dia a Dia</span>
                </div>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {check.reality}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-orange-500/10 to-red-500/10 blur-3xl -z-10" />
    </section>
  )
}
