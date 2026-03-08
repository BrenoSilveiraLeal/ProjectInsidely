'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

type Language = 'pt-BR' | 'en'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const translations = {
  'pt-BR': {
    signin: 'Entrar',
    signup: 'Cadastrar',
    about: 'Sobre',
    faq: 'FAQ',
    hero_title_full: 'Descubra como os empregos realmente são antes de escolher!',
    hero_title_highlight: 'empregos realmente são',
    hero_title: 'Descubra como são os',
    hero_highlight: 'empregos de verdade',
    hero_title_end: 'antes de escolher',
    hero_subtitle: 'Converse diretamente com profissionais que trabalham nas empresas e carreiras que você quer seguir.',
    search_placeholder: 'Buscar por profissão, empresa ou cargo...',
    search_button: 'Buscar',
    why_choose: 'Por que escolher a',
    why_subtitle: 'Conecte-se com quem realmente sabe',
    smart_search: 'Busca Inteligente',
    smart_search_desc: 'Encontre profissionais por empresa, cargo ou localização',
    secure_payment: 'Pagamento Seguro',
    secure_payment_desc: 'Transações protegidas com Stripe',
    fast_response: 'Respostas Rápidas',
    fast_response_desc: 'Profissionais respondem em até 2 horas',
    real_insights: 'Insights Reais',
    real_insights_desc: 'Informações autênticas sobre carreiras',
    how_it_works: 'Como funciona',
    how_subtitle: 'Simples, rápido e eficiente',
    step1_title: 'Busque',
    step1_desc: 'Encontre profissionais da empresa ou cargo que você quer',
    step2_title: 'Agende',
    step2_desc: 'Escolha horário e pague pela conversa',
    step3_title: 'Converse',
    step3_desc: 'Tire suas dúvidas sobre a carreira real',
    trending_professions: 'Profissões em Alta',
    trending_companies: 'Empresas em Alta',
    available_professionals: 'Profissionais Disponíveis',
    cta_title: 'Pronto para descobrir sua',
    cta_highlight: 'carreira ideal',
    cta_subtitle: 'Junte-se a milhares de pessoas que já encontraram seu caminho',
    cta_button: 'Começar Agora',
    footer_tagline: 'Antes de escolher uma carreira, veja como ela é por dentro.',
    footer_rights: '© 2026 Insidely. Todos os direitos reservados.',
    available: 'Disponível',
    years: 'anos',
  },
  'en': {
    signin: 'Sign In',
    signup: 'Sign Up',
    about: 'About',
    faq: 'FAQ',
    hero_title_full: 'Discover what jobs are really like before you choose!',
    hero_title_highlight: 'really like',
    hero_title: 'Discover what jobs are',
    hero_highlight: 'really like',
    hero_title_end: 'before you choose',
    hero_subtitle: 'Talk directly with professionals working in the companies and careers you want to pursue.',
    search_placeholder: 'Search by profession, company, or role...',
    search_button: 'Search',
    why_choose: 'Why choose',
    why_subtitle: 'Connect with those who really know',
    smart_search: 'Smart Search',
    smart_search_desc: 'Find professionals by company, role, or location',
    secure_payment: 'Secure Payment',
    secure_payment_desc: 'Transactions protected with Stripe',
    fast_response: 'Fast Responses',
    fast_response_desc: 'Professionals respond within 2 hours',
    real_insights: 'Real Insights',
    real_insights_desc: 'Authentic information about careers',
    how_it_works: 'How it works',
    how_subtitle: 'Simple, fast, and efficient',
    step1_title: 'Search',
    step1_desc: 'Find professionals from the company or role you want',
    step2_title: 'Schedule',
    step2_desc: 'Choose time and pay for the conversation',
    step3_title: 'Talk',
    step3_desc: 'Get answers about the real career',
    trending_professions: 'Trending Professions',
    trending_companies: 'Trending Companies',
    available_professionals: 'Available Professionals',
    cta_title: 'Ready to discover your',
    cta_highlight: 'ideal career',
    cta_subtitle: 'Join thousands who have already found their path',
    cta_button: 'Get Started',
    footer_tagline: 'Before choosing a career, see it from the inside.',
    footer_rights: '© 2026 Insidely. All rights reserved.',
    available: 'Available',
    years: 'years',
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('pt-BR')

  const t = (key: string) => {
    return translations[language][key as keyof typeof translations['pt-BR']] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) throw new Error('useLanguage must be used within LanguageProvider')
  return context
}
