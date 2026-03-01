'use client'

import AnimatedCardScroll from '@/components/AnimatedCardScroll'
import AnimatedIconHover from '@/components/AnimatedIconHover'
import StatsCounter from '@/components/StatsCounter'
import PageTransition from '@/components/PageTransition'
import { Briefcase, Users, MessageCircle, TrendingUp } from 'lucide-react'

export default function AnimationsDemo() {
  return (
    <PageTransition>
      <div className="min-h-screen py-20 px-4">
        <div className="max-w-7xl mx-auto">
          
          {/* Stats Section */}
          <section className="mb-20">
            <h2 className="text-4xl font-bold text-center mb-12">Nossas Estatísticas</h2>
            <div className="grid md:grid-cols-4 gap-8">
              <StatsCounter end={1500} label="Profissionais" suffix="+" />
              <StatsCounter end={500} label="Empresas" suffix="+" />
              <StatsCounter end={10000} label="Conversas" suffix="+" />
              <StatsCounter end={98} label="Satisfação" suffix="%" />
            </div>
          </section>

          {/* Cards with Scroll Animation */}
          <section className="mb-20">
            <h2 className="text-4xl font-bold text-center mb-12">Recursos</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <AnimatedCardScroll delay={0}>
                <div className="glass rounded-2xl p-8">
                  <AnimatedIconHover icon={Briefcase} size={48} className="mb-4 text-indigo-400" />
                  <h3 className="text-xl font-bold mb-3">Profissionais Verificados</h3>
                  <p className="text-gray-400">Converse com profissionais reais de empresas renomadas</p>
                </div>
              </AnimatedCardScroll>

              <AnimatedCardScroll delay={100}>
                <div className="glass rounded-2xl p-8">
                  <AnimatedIconHover icon={Users} size={48} className="mb-4 text-purple-400" />
                  <h3 className="text-xl font-bold mb-3">Comunidade Ativa</h3>
                  <p className="text-gray-400">Milhares de usuários compartilhando experiências</p>
                </div>
              </AnimatedCardScroll>

              <AnimatedCardScroll delay={200}>
                <div className="glass rounded-2xl p-8">
                  <AnimatedIconHover icon={MessageCircle} size={48} className="mb-4 text-pink-400" />
                  <h3 className="text-xl font-bold mb-3">Conversas Diretas</h3>
                  <p className="text-gray-400">Agende conversas por vídeo em minutos</p>
                </div>
              </AnimatedCardScroll>
            </div>
          </section>

          {/* Icon Hover Examples */}
          <section>
            <h2 className="text-4xl font-bold text-center mb-12">Ícones Interativos</h2>
            <div className="flex justify-center gap-8">
              <AnimatedIconHover icon={TrendingUp} size={64} className="text-indigo-400" />
              <AnimatedIconHover icon={Briefcase} size={64} className="text-purple-400" />
              <AnimatedIconHover icon={Users} size={64} className="text-pink-400" />
              <AnimatedIconHover icon={MessageCircle} size={64} className="text-cyan-400" />
            </div>
          </section>

        </div>
      </div>
    </PageTransition>
  )
}
