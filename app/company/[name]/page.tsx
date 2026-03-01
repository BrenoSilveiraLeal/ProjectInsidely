'use client'

import { motion } from 'framer-motion'
import { Building2, MapPin, Users, Star } from 'lucide-react'
import Navbar from '@/components/Navbar'
import ProfessionalCard from '@/components/ProfessionalCard'

const companyData: Record<string, any> = {
  'Google': {
    name: 'Google',
    logo: '🔍',
    industry: 'Tecnologia',
    description: 'Empresa líder em tecnologia e inovação',
    professionals: [
      {
        id: '1',
        name: 'Ana Silva',
        jobTitle: 'Senior Software Engineer',
        company: 'Google',
        location: 'São Paulo, SP',
        yearsExperience: 8,
        rating: 4.9,
        totalReviews: 127,
        pricePerCall: 150,
        image: '👩💻',
        available: true
      },
      {
        id: '5',
        name: 'Lucas Ferreira',
        jobTitle: 'Product Manager',
        company: 'Google',
        location: 'São Paulo, SP',
        yearsExperience: 6,
        rating: 4.8,
        totalReviews: 89,
        pricePerCall: 180,
        image: '👨💼',
        available: true
      },
      {
        id: '6',
        name: 'Juliana Costa',
        jobTitle: 'UX Designer',
        company: 'Google',
        location: 'Rio de Janeiro, RJ',
        yearsExperience: 5,
        rating: 4.9,
        totalReviews: 102,
        pricePerCall: 140,
        image: '👩🎨',
        available: true
      },
    ]
  },
  'Meta': {
    name: 'Meta',
    logo: '📘',
    industry: 'Redes Sociais',
    description: 'Conectando pessoas ao redor do mundo',
    professionals: [
      {
        id: '2',
        name: 'Carlos Santos',
        jobTitle: 'Product Manager',
        company: 'Meta',
        location: 'Rio de Janeiro, RJ',
        yearsExperience: 6,
        rating: 4.8,
        totalReviews: 94,
        pricePerCall: 200,
        image: '👨💼',
        available: true
      },
      {
        id: '7',
        name: 'Fernanda Lima',
        jobTitle: 'Data Scientist',
        company: 'Meta',
        location: 'São Paulo, SP',
        yearsExperience: 7,
        rating: 4.9,
        totalReviews: 115,
        pricePerCall: 190,
        image: '👩🔬',
        available: true
      },
    ]
  },
  'Amazon': {
    name: 'Amazon',
    logo: '📦',
    industry: 'E-commerce',
    description: 'Maior empresa de e-commerce do mundo',
    professionals: [
      {
        id: '3',
        name: 'Marina Costa',
        jobTitle: 'UX Designer',
        company: 'Amazon',
        location: 'Belo Horizonte, MG',
        yearsExperience: 5,
        rating: 5.0,
        totalReviews: 156,
        pricePerCall: 120,
        image: '👩🎨',
        available: false
      },
      {
        id: '8',
        name: 'Rafael Souza',
        jobTitle: 'Software Engineer',
        company: 'Amazon',
        location: 'São Paulo, SP',
        yearsExperience: 4,
        rating: 4.7,
        totalReviews: 78,
        pricePerCall: 130,
        image: '👨💻',
        available: true
      },
    ]
  },
  'Microsoft': {
    name: 'Microsoft',
    logo: '🪟',
    industry: 'Tecnologia',
    description: 'Líder em software e cloud computing',
    professionals: [
      {
        id: '4',
        name: 'Pedro Oliveira',
        jobTitle: 'Data Scientist',
        company: 'Microsoft',
        location: 'São Paulo, SP',
        yearsExperience: 7,
        rating: 4.7,
        totalReviews: 83,
        pricePerCall: 180,
        image: '👨🔬',
        available: true
      },
      {
        id: '9',
        name: 'Camila Rodrigues',
        jobTitle: 'Cloud Architect',
        company: 'Microsoft',
        location: 'Brasília, DF',
        yearsExperience: 9,
        rating: 4.9,
        totalReviews: 134,
        pricePerCall: 220,
        image: '👩💼',
        available: true
      },
    ]
  },
  'Apple': {
    name: 'Apple',
    logo: '🍎',
    industry: 'Tecnologia',
    description: 'Inovação em hardware e software',
    professionals: []
  },
  'Netflix': {
    name: 'Netflix',
    logo: '🎬',
    industry: 'Entretenimento',
    description: 'Streaming de entretenimento',
    professionals: [
      {
        id: '11',
        name: 'Thiago Martins',
        jobTitle: 'DevOps Engineer',
        company: 'Netflix',
        location: 'São Paulo, SP',
        yearsExperience: 6,
        rating: 4.8,
        totalReviews: 87,
        pricePerCall: 170,
        image: '👨💻',
        available: true
      },
    ]
  },
  'Tesla': {
    name: 'Tesla',
    logo: '⚡',
    industry: 'Automotivo',
    description: 'Veículos elétricos e energia sustentável',
    professionals: []
  },
  'Spotify': {
    name: 'Spotify',
    logo: '🎵',
    industry: 'Streaming de Música',
    description: 'Plataforma de streaming de música',
    professionals: []
  },
  'Nubank': {
    name: 'Nubank',
    logo: '💜',
    industry: 'Fintech',
    description: 'Banco digital brasileiro',
    professionals: [
      {
        id: '10',
        name: 'Bruno Alves',
        jobTitle: 'Full Stack Engineer',
        company: 'Nubank',
        location: 'São Paulo, SP',
        yearsExperience: 5,
        rating: 4.8,
        totalReviews: 92,
        pricePerCall: 140,
        image: '👨💻',
        available: true
      },
    ]
  },
  'iFood': {
    name: 'iFood',
    logo: '🍔',
    industry: 'Delivery',
    description: 'Maior plataforma de delivery da América Latina',
    professionals: [
      {
        id: '12',
        name: 'Mariana Santos',
        jobTitle: 'Product Manager',
        company: 'iFood',
        location: 'São Paulo, SP',
        yearsExperience: 5,
        rating: 4.7,
        totalReviews: 68,
        pricePerCall: 160,
        image: '👩💼',
        available: true
      },
      {
        id: '13',
        name: 'Ricardo Lima',
        jobTitle: 'Backend Developer',
        company: 'iFood',
        location: 'São Paulo, SP',
        yearsExperience: 4,
        rating: 4.8,
        totalReviews: 75,
        pricePerCall: 130,
        image: '👨💻',
        available: true
      },
    ]
  },
  'Mercado Livre': {
    name: 'Mercado Livre',
    logo: '🛒',
    industry: 'E-commerce',
    description: 'Maior marketplace da América Latina',
    professionals: [
      {
        id: '14',
        name: 'Paula Mendes',
        jobTitle: 'Data Analyst',
        company: 'Mercado Livre',
        location: 'São Paulo, SP',
        yearsExperience: 3,
        rating: 4.6,
        totalReviews: 54,
        pricePerCall: 120,
        image: '👩📊',
        available: true
      },
    ]
  },
  'Stone': {
    name: 'Stone',
    logo: '💳',
    industry: 'Fintech',
    description: 'Soluções de pagamento',
    professionals: [
      {
        id: '15',
        name: 'Gabriel Costa',
        jobTitle: 'Software Engineer',
        company: 'Stone',
        location: 'Rio de Janeiro, RJ',
        yearsExperience: 6,
        rating: 4.9,
        totalReviews: 81,
        pricePerCall: 150,
        image: '👨💻',
        available: true
      },
    ]
  },
  'Rappi': {
    name: 'Rappi',
    logo: '🛵',
    industry: 'Delivery',
    description: 'Super app de delivery',
    professionals: [
      {
        id: '16',
        name: 'Amanda Silva',
        jobTitle: 'UX Designer',
        company: 'Rappi',
        location: 'São Paulo, SP',
        yearsExperience: 4,
        rating: 4.7,
        totalReviews: 62,
        pricePerCall: 135,
        image: '👩🎨',
        available: true
      },
    ]
  },
  'Uber': {
    name: 'Uber',
    logo: '🚗',
    industry: 'Mobilidade',
    description: 'Plataforma de mobilidade urbana',
    professionals: [
      {
        id: '17',
        name: 'Felipe Rocha',
        jobTitle: 'Mobile Developer',
        company: 'Uber',
        location: 'São Paulo, SP',
        yearsExperience: 5,
        rating: 4.8,
        totalReviews: 94,
        pricePerCall: 165,
        image: '👨💻',
        available: true
      },
    ]
  },
  'Airbnb': {
    name: 'Airbnb',
    logo: '🏠',
    industry: 'Hospedagem',
    description: 'Plataforma de hospedagem',
    professionals: [
      {
        id: '18',
        name: 'Beatriz Oliveira',
        jobTitle: 'Product Designer',
        company: 'Airbnb',
        location: 'São Paulo, SP',
        yearsExperience: 6,
        rating: 4.9,
        totalReviews: 103,
        pricePerCall: 170,
        image: '👩🎨',
        available: true
      },
    ]
  },
  'Stripe': {
    name: 'Stripe',
    logo: '💰',
    industry: 'Fintech',
    description: 'Infraestrutura de pagamentos online',
    professionals: [
      {
        id: '19',
        name: 'Rodrigo Fernandes',
        jobTitle: 'Backend Engineer',
        company: 'Stripe',
        location: 'São Paulo, SP',
        yearsExperience: 7,
        rating: 4.9,
        totalReviews: 118,
        pricePerCall: 190,
        image: '👨💻',
        available: true
      },
    ]
  },
  'McDonald\'s': {
    name: 'McDonald\'s',
    logo: '🍔',
    industry: 'Alimentação',
    description: 'Maior rede de fast-food do mundo',
    professionals: [
      {
        id: '20',
        name: 'Julia Martins',
        jobTitle: 'Atendente',
        company: 'McDonald\'s',
        location: 'São Paulo, SP',
        yearsExperience: 2,
        rating: 4.5,
        totalReviews: 45,
        pricePerCall: 50,
        image: '👩',
        available: true
      },
      {
        id: '21',
        name: 'Carlos Eduardo',
        jobTitle: 'Gerente de Loja',
        company: 'McDonald\'s',
        location: 'Rio de Janeiro, RJ',
        yearsExperience: 5,
        rating: 4.7,
        totalReviews: 67,
        pricePerCall: 90,
        image: '👨💼',
        available: true
      },
    ]
  },
  'Starbucks': {
    name: 'Starbucks',
    logo: '☕',
    industry: 'Alimentação',
    description: 'Rede de cafeterias',
    professionals: [
      {
        id: '22',
        name: 'Ana Paula',
        jobTitle: 'Barista',
        company: 'Starbucks',
        location: 'São Paulo, SP',
        yearsExperience: 3,
        rating: 4.6,
        totalReviews: 52,
        pricePerCall: 60,
        image: '👩',
        available: true
      },
    ]
  },
  'Ambev': {
    name: 'Ambev',
    logo: '🍺',
    industry: 'Bebidas',
    description: 'Maior cervejaria da América Latina',
    professionals: [
      {
        id: '23',
        name: 'Roberto Silva',
        jobTitle: 'Vendedor',
        company: 'Ambev',
        location: 'São Paulo, SP',
        yearsExperience: 4,
        rating: 4.7,
        totalReviews: 71,
        pricePerCall: 80,
        image: '👨💼',
        available: true
      },
    ]
  },
  'Natura': {
    name: 'Natura',
    logo: '🌿',
    industry: 'Cosméticos',
    description: 'Empresa brasileira de cosméticos',
    professionals: [
      {
        id: '24',
        name: 'Fernanda Costa',
        jobTitle: 'Consultora de Vendas',
        company: 'Natura',
        location: 'São Paulo, SP',
        yearsExperience: 3,
        rating: 4.8,
        totalReviews: 58,
        pricePerCall: 70,
        image: '👩',
        available: true
      },
    ]
  },
  'Magazine Luiza': {
    name: 'Magazine Luiza',
    logo: '🛍️',
    industry: 'Varejo',
    description: 'Rede de varejo brasileira',
    professionals: [
      {
        id: '25',
        name: 'Lucas Pereira',
        jobTitle: 'Vendedor',
        company: 'Magazine Luiza',
        location: 'São Paulo, SP',
        yearsExperience: 2,
        rating: 4.5,
        totalReviews: 43,
        pricePerCall: 55,
        image: '👨',
        available: true
      },
    ]
  },
  'Carrefour': {
    name: 'Carrefour',
    logo: '🛒',
    industry: 'Varejo',
    description: 'Rede de supermercados',
    professionals: [
      {
        id: '26',
        name: 'Mariana Souza',
        jobTitle: 'Caixa',
        company: 'Carrefour',
        location: 'São Paulo, SP',
        yearsExperience: 1,
        rating: 4.4,
        totalReviews: 38,
        pricePerCall: 45,
        image: '👩',
        available: true
      },
    ]
  },
  'Renner': {
    name: 'Renner',
    logo: '👗',
    industry: 'Moda',
    description: 'Rede de lojas de moda',
    professionals: [
      {
        id: '27',
        name: 'Camila Alves',
        jobTitle: 'Vendedora',
        company: 'Renner',
        location: 'Porto Alegre, RS',
        yearsExperience: 2,
        rating: 4.6,
        totalReviews: 49,
        pricePerCall: 55,
        image: '👩',
        available: true
      },
      {
        id: '28',
        name: 'Pedro Santos',
        jobTitle: 'Gerente de Loja',
        company: 'Renner',
        location: 'São Paulo, SP',
        yearsExperience: 6,
        rating: 4.7,
        totalReviews: 64,
        pricePerCall: 85,
        image: '👨💼',
        available: true
      },
    ]
  },
  'C&A': {
    name: 'C&A',
    logo: '👔',
    industry: 'Moda',
    description: 'Rede de lojas de vestuário',
    professionals: [
      {
        id: '29',
        name: 'Juliana Lima',
        jobTitle: 'Atendente',
        company: 'C&A',
        location: 'Rio de Janeiro, RJ',
        yearsExperience: 1,
        rating: 4.5,
        totalReviews: 41,
        pricePerCall: 50,
        image: '👩',
        available: true
      },
    ]
  },
  'Riachuelo': {
    name: 'Riachuelo',
    logo: '👚',
    industry: 'Moda',
    description: 'Rede de lojas de moda brasileira',
    professionals: [
      {
        id: '30',
        name: 'Thiago Oliveira',
        jobTitle: 'Vendedor',
        company: 'Riachuelo',
        location: 'Belo Horizonte, MG',
        yearsExperience: 3,
        rating: 4.6,
        totalReviews: 55,
        pricePerCall: 60,
        image: '👨',
        available: true
      },
    ]
  },
  'Pão de Açúcar': {
    name: 'Pão de Açúcar',
    logo: '🍞',
    industry: 'Supermercado',
    description: 'Rede de supermercados premium',
    professionals: [
      {
        id: '31',
        name: 'Beatriz Ferreira',
        jobTitle: 'Caixa',
        company: 'Pão de Açúcar',
        location: 'São Paulo, SP',
        yearsExperience: 2,
        rating: 4.5,
        totalReviews: 47,
        pricePerCall: 50,
        image: '👩',
        available: true
      },
      {
        id: '32',
        name: 'Rafael Costa',
        jobTitle: 'Estoquista',
        company: 'Pão de Açúcar',
        location: 'São Paulo, SP',
        yearsExperience: 1,
        rating: 4.4,
        totalReviews: 35,
        pricePerCall: 45,
        image: '👨',
        available: true
      },
    ]
  },
  'Drogasil': {
    name: 'Drogasil',
    logo: '💊',
    industry: 'Farmácia',
    description: 'Rede de farmácias',
    professionals: [
      {
        id: '33',
        name: 'Patricia Mendes',
        jobTitle: 'Farmacêutica',
        company: 'Drogasil',
        location: 'São Paulo, SP',
        yearsExperience: 5,
        rating: 4.8,
        totalReviews: 72,
        pricePerCall: 95,
        image: '👩‍⚕️',
        available: true
      },
      {
        id: '34',
        name: 'Amanda Silva',
        jobTitle: 'Atendente',
        company: 'Drogasil',
        location: 'Rio de Janeiro, RJ',
        yearsExperience: 2,
        rating: 4.6,
        totalReviews: 51,
        pricePerCall: 55,
        image: '👩',
        available: true
      },
    ]
  },
  'Hospital Albert Einstein': {
    name: 'Hospital Albert Einstein',
    logo: '🏥',
    industry: 'Saúde',
    description: 'Hospital de excelência',
    professionals: [
      {
        id: '35',
        name: 'Dr. Carlos Mendes',
        jobTitle: 'Médico',
        company: 'Hospital Albert Einstein',
        location: 'São Paulo, SP',
        yearsExperience: 12,
        rating: 4.9,
        totalReviews: 145,
        pricePerCall: 250,
        image: '👨‍⚕️',
        available: true
      },
      {
        id: '36',
        name: 'Fernanda Rocha',
        jobTitle: 'Enfermeira',
        company: 'Hospital Albert Einstein',
        location: 'São Paulo, SP',
        yearsExperience: 8,
        rating: 4.8,
        totalReviews: 98,
        pricePerCall: 120,
        image: '👩‍⚕️',
        available: true
      },
      {
        id: '37',
        name: 'Lucas Martins',
        jobTitle: 'Recepcionista',
        company: 'Hospital Albert Einstein',
        location: 'São Paulo, SP',
        yearsExperience: 3,
        rating: 4.7,
        totalReviews: 63,
        pricePerCall: 65,
        image: '👨',
        available: true
      },
    ]
  },
}

export default function CompanyPage({ params }: { params: { name: string } }) {
  const companyName = decodeURIComponent(params.name)
  const company = companyData[companyName]

  if (!company) {
    return (
      <main className="min-h-screen pt-20">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-12 text-center">
          <h1 className="text-4xl font-bold mb-4">Empresa não encontrada</h1>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen pt-20">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Company Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-2xl p-8 mb-12"
        >
          <div className="flex items-start gap-6">
            <div className="text-7xl">{company.logo}</div>
            <div className="flex-1">
              <h1 className="text-4xl font-bold mb-2">{company.name}</h1>
              <p className="text-xl text-gray-400 mb-4">{company.description}</p>
              <div className="flex items-center gap-6 text-sm mb-4">
                <div className="flex items-center gap-2">
                  <Building2 size={16} className="text-gray-400" />
                  <span>{company.industry}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users size={16} className="text-gray-400" />
                  <span>{company.professionals.length} profissionais</span>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <Star size={18} className="text-yellow-400 fill-yellow-400" />
                  <span className="font-bold">4.6</span>
                  <span className="text-gray-400">ambiente de trabalho</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-green-400">R$12k</span>
                  <span className="text-gray-400">salário médio</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Professionals */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-6">Profissionais da {company.name}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {company.professionals.map((pro: any, i: number) => (
            <motion.div
              key={pro.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <ProfessionalCard {...pro} />
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  )
}
