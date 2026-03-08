'use client'

import { Search, TrendingUp, Building2, Users, Zap, Shield, Target, MessageCircle, Calendar, Sparkles, Code, Briefcase, Palette, Database } from 'lucide-react'
import { motion } from 'framer-motion'
import Navbar from '@/components/Navbar'
import HeroSection from '@/components/HeroSection'
import FeatureCard from '@/components/FeatureCard'
import ProfessionalCard from '@/components/ProfessionalCard'
import AnimatedIcon from '@/components/AnimatedIcon'
import RealityCheck from '@/components/RealityCheck'
import AnimatedCardScroll from '@/components/AnimatedCardScroll'
import AnimatedIconHover from '@/components/AnimatedIconHover'
import StatsCounter from '@/components/StatsCounter'
import SubscriptionPlans from '@/components/SubscriptionPlans'
import SupportButton from '@/components/SupportButton'
import ToastContainer from '@/components/ToastContainer'
import { useLanguage } from '@/lib/LanguageContext'
import Link from 'next/link'

const mockProfessionals = [
  { id: '1', name: 'Ana Silva', jobTitle: 'Senior Software Engineer', company: 'Google', location: 'São Paulo, SP', yearsExperience: 8, rating: 4.9, totalReviews: 127, pricePerCall: 150, available: true },
  { id: '2', name: 'Carlos Santos', jobTitle: 'Product Manager', company: 'Meta', location: 'Rio de Janeiro, RJ', yearsExperience: 6, rating: 4.8, totalReviews: 94, pricePerCall: 200, available: true },
  { id: '3', name: 'Marina Costa', jobTitle: 'UX Designer', company: 'Amazon', location: 'Belo Horizonte, MG', yearsExperience: 5, rating: 5.0, totalReviews: 156, pricePerCall: 120, available: false },
  { id: '4', name: 'Pedro Oliveira', jobTitle: 'Data Scientist', company: 'Microsoft', location: 'São Paulo, SP', yearsExperience: 7, rating: 4.7, totalReviews: 83, pricePerCall: 180, available: true }
]

const trendingCompanies = ['Google', 'Meta', 'Amazon', 'Microsoft', 'Nubank', 'iFood', 'McDonald\'s', 'Starbucks', 'Renner', 'Drogasil']

export default function Home() {
  const { t } = useLanguage()

  const features = [
    { icon: Search, title: t('smart_search'), description: t('smart_search_desc'), glowColor: 'rgba(99, 102, 241, 0.5)' },
    { icon: Shield, title: t('secure_payment'), description: t('secure_payment_desc'), glowColor: 'rgba(139, 92, 246, 0.5)' },
    { icon: Zap, title: t('fast_response'), description: t('fast_response_desc'), glowColor: 'rgba(236, 72, 153, 0.5)' },
    { icon: Target, title: t('real_insights'), description: t('real_insights_desc'), glowColor: 'rgba(34, 211, 238, 0.5)' },
  ]

  const steps = [
    { icon: Search, title: t('step1_title'), description: t('step1_desc'), color: 'from-indigo-600 to-purple-600' },
    { icon: Calendar, title: t('step2_title'), description: t('step2_desc'), color: 'from-purple-600 to-pink-600' },
    { icon: MessageCircle, title: t('step3_title'), description: t('step3_desc'), color: 'from-pink-600 to-red-600' },
  ]

  const trendingProfessions = [
    { name: 'Software Engineer', icon: Code },
    { name: 'Product Manager', icon: Target },
    { name: 'Data Scientist', icon: Database },
    { name: 'UX Designer', icon: Palette },
    { name: 'Atendente', icon: Users },
    { name: 'Vendedor', icon: Briefcase }
  ]

  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <SupportButton />
      <ToastContainer />

      <section className="py-12 sm:py-20 px-4 relative overflow-hidden" style={{ zIndex: 0 }}>
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.8 }}
          className="max-w-7xl mx-auto"
        >
          <motion.div 
            initial={{ opacity: 0, y: 50 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: false, amount: 0.3 }} 
            transition={{ duration: 0.6 }} 
            className="text-center mb-8 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">{t('why_choose')} <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">Insidely</span>?</h2>
            <p className="text-lg sm:text-xl text-gray-400">{t('why_subtitle')}</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, x: (i === 0 || i === 1) ? -150 : 150 }}
                whileInView={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: (i === 0 || i === 1) ? -150 : 150 }}
                viewport={{ once: false, amount: 0.3, margin: "-100px" }}
                transition={{ duration: 0.6 }}
              >
                <FeatureCard Icon={feature.icon} title={feature.title} description={feature.description} glowColor={feature.glowColor} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      <section className="py-12 sm:py-20 px-4 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, scale: 0.5 }} 
            whileInView={{ opacity: 1, scale: 1 }} 
            viewport={{ once: false, amount: 0.9 }} 
            transition={{ duration: 0.7, type: "spring", bounce: 0.4 }} 
            className="text-center mb-8 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">{t('how_it_works')}</h2>
            <p className="text-lg sm:text-xl text-gray-400">{t('how_subtitle')}</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            {steps.map((step, i) => (
              <motion.div 
                key={step.title} 
                initial={{ opacity: 0, y: 60 }} 
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.5 }} 
                transition={{ duration: 0.5, delay: i * 0.1 }} 
                className="glass rounded-2xl p-10 text-center hover:bg-white/10 transition-all group card-hover min-h-[400px] flex flex-col justify-center"
              >
                <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.3 }} className={`w-20 h-20 bg-gradient-to-r ${step.color} rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg`}>
                  <step.icon size={40} />
                </motion.div>
                <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                <p className="text-gray-400">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-6 sm:mb-8">
            <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: false, amount: 0.5 }} transition={{ duration: 0.6 }}>
              <AnimatedIcon Icon={TrendingUp} size={28} glowColor="rgba(99, 102, 241, 0.5)" />
            </motion.div>
            <h2 className="text-2xl sm:text-3xl font-bold">{t('trending_professions')}</h2>
          </div>
          <div className="flex flex-wrap gap-3 sm:gap-4">
            {trendingProfessions.map((profession, i) => (
              <Link key={profession.name} href={`/profession/${encodeURIComponent(profession.name)}`}>
                <motion.button 
                  initial={{ opacity: 0, scale: 0, rotate: -180 }} 
                  whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0, rotate: 180 }}
                  viewport={{ once: false, amount: 0.5, margin: "-100px" }} 
                  whileHover={{ scale: 1.1, y: -4, rotate: 5 }} 
                  transition={{ delay: i * 0.05, duration: 0.5, type: "spring", stiffness: 200 }} 
                  className="glass px-6 py-4 rounded-full hover:bg-white/10 hover:shadow-xl hover:shadow-indigo-500/20 transition-all flex items-center gap-3 group"
                >
                  <AnimatedIconHover icon={profession.icon} size={20} />
                  <span className="font-medium">{profession.name}</span>
                </motion.button>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: false, amount: 0.5 }} transition={{ duration: 0.6 }}>
              <AnimatedIcon Icon={Building2} size={32} glowColor="rgba(139, 92, 246, 0.5)" />
            </motion.div>
            <h2 className="text-3xl font-bold">{t('trending_companies')}</h2>
          </div>
          <div className="flex flex-wrap gap-4">
            {trendingCompanies.map((company, i) => (
              <Link key={company} href={`/company/${encodeURIComponent(company)}`}>
                <motion.button 
                  initial={{ opacity: 0, y: 50, scale: 0.5 }} 
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 50, scale: 0.5 }}
                  viewport={{ once: false, amount: 0.5, margin: "-100px" }} 
                  whileHover={{ scale: 1.1, y: -4 }} 
                  transition={{ delay: i * 0.05, duration: 0.5, type: "spring", bounce: 0.5 }} 
                  className="glass px-6 py-4 rounded-full hover:bg-white/10 hover:shadow-xl hover:shadow-purple-500/20 transition-all font-medium"
                >
                  {company}
                </motion.button>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <RealityCheck />

      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="glass rounded-2xl p-8">
            <h3 className="text-2xl font-bold mb-3">Mapa de Empregabilidade</h3>
            <p className="text-gray-400 mb-6">Descubra as áreas com maior demanda e oportunidades de carreira</p>
            <Link href="/mapa-empregabilidade">
              <button className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg hover:opacity-90 transition">Ver Mapa Completo</button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-20 px-4 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, x: -100 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            viewport={{ once: false, amount: 0.5 }} 
            transition={{ duration: 0.8 }}
            className="flex items-center gap-3 mb-6 sm:mb-8"
          >
            <AnimatedIcon Icon={Users} size={28} glowColor="rgba(236, 72, 153, 0.5)" />
            <h2 className="text-2xl sm:text-3xl font-bold">{t('available_professionals')}</h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {mockProfessionals.map((pro, i) => (
              <motion.div
                key={pro.id}
                initial={{ opacity: 0, y: 80, rotateX: -30 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                exit={{ opacity: 0, y: 80, rotateX: -30 }}
                viewport={{ once: false, amount: 0.2, margin: "-100px" }}
                transition={{ duration: 0.7, delay: i * 0.15, type: "spring" }}
              >
                <ProfessionalCard {...pro} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <SubscriptionPlans />

      <section className="py-20 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-500/5 to-transparent -z-10" />
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold text-center mb-12"
          >
            Números que Impressionam
          </motion.h2>
          <div className="grid md:grid-cols-4 gap-8">
            <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: 0.5 }} transition={{ duration: 0.6, delay: 0 }}>
              <StatsCounter end={1500} label="Profissionais" suffix="+" />
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: 0.5 }} transition={{ duration: 0.6, delay: 0.15 }}>
              <StatsCounter end={500} label="Empresas" suffix="+" />
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: 0.5 }} transition={{ duration: 0.6, delay: 0.3 }}>
              <StatsCounter end={10000} label="Conversas" suffix="+" />
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: 0.5 }} transition={{ duration: 0.6, delay: 0.45 }}>
              <StatsCounter end={98} label="Satisfação" suffix="%" />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/5 to-transparent -z-10" />
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: false, amount: 0.3 }} transition={{ duration: 0.4 }} className="glass rounded-3xl p-8">
            <Sparkles className="mx-auto mb-4 text-indigo-400" size={40} />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('cta_title')} <span className="gradient-text">{t('cta_highlight')}</span>?</h2>
            <p className="text-lg text-gray-400 mb-6">{t('cta_subtitle')}</p>
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="px-10 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl font-bold hover:shadow-2xl hover:shadow-indigo-500/50 transition-all">
              {t('cta_button')}
            </motion.button>
          </motion.div>
        </div>
      </section>

      <footer className="glass border-t border-white/10 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="text-base font-bold gradient-text mb-1">Insidely</div>
          <p className="text-xs text-gray-400 mb-3">{t('footer_tagline')}</p>
          <p className="text-xs text-gray-500">{t('footer_rights')}</p>
        </div>
      </footer>
    </main>
  )
}
