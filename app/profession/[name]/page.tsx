'use client'

import { motion } from 'framer-motion'
import { Code, Target, Database, Palette, Cpu, Users } from 'lucide-react'
import Navbar from '@/components/Navbar'
import ProfessionalCard from '@/components/ProfessionalCard'

const professionData: Record<string, any> = {
  'Software Engineer': {
    name: 'Software Engineer',
    icon: Code,
    description: 'Desenvolvedores que criam e mantêm sistemas e aplicações',
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
  'Product Manager': {
    name: 'Product Manager',
    icon: Target,
    description: 'Gerentes de produto que definem estratégia e roadmap',
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
    ]
  },
  'Data Scientist': {
    name: 'Data Scientist',
    icon: Database,
    description: 'Cientistas de dados que analisam e interpretam dados complexos',
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
  'UX Designer': {
    name: 'UX Designer',
    icon: Palette,
    description: 'Designers que criam experiências de usuário incríveis',
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
  'DevOps Engineer': {
    name: 'DevOps Engineer',
    icon: Cpu,
    description: 'Engenheiros que gerenciam infraestrutura e automação',
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
  'Atendente': {
    name: 'Atendente',
    icon: Users,
    description: 'Profissionais de atendimento ao cliente',
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
  'Vendedor': {
    name: 'Vendedor',
    icon: Users,
    description: 'Profissionais de vendas e atendimento',
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
    ]
  },
  'Gerente de Loja': {
    name: 'Gerente de Loja',
    icon: Target,
    description: 'Gerentes responsáveis por operações de loja',
    professionals: [
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
  'Enfermeiro': {
    name: 'Enfermeiro',
    icon: Users,
    description: 'Profissionais de enfermagem e cuidados de saúde',
    professionals: [
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
        image: '👩⚕️',
        available: true
      },
    ]
  },
  'Recursos Humanos': {
    name: 'Recursos Humanos',
    icon: Users,
    description: 'Profissionais de gestão de pessoas',
    professionals: []
  },
  'Marketing': {
    name: 'Marketing',
    icon: Target,
    description: 'Profissionais de marketing e comunicação',
    professionals: []
  },
}

export default function ProfessionPage({ params }: { params: { name: string } }) {
  const professionName = decodeURIComponent(params.name)
  const profession = professionData[professionName]

  if (!profession) {
    return (
      <main className="min-h-screen pt-20">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-12 text-center">
          <h1 className="text-4xl font-bold mb-4">Profissão não encontrada</h1>
        </div>
      </main>
    )
  }

  const Icon = profession.icon

  return (
    <main className="min-h-screen pt-20">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Profession Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-2xl p-8 mb-12"
        >
          <div className="flex items-start gap-6">
            <div className="w-20 h-20 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center">
              <Icon size={40} />
            </div>
            <div className="flex-1">
              <h1 className="text-4xl font-bold mb-2">{profession.name}</h1>
              <p className="text-xl text-gray-400 mb-4">{profession.description}</p>
              <div className="flex items-center gap-2 text-sm">
                <Users size={16} className="text-gray-400" />
                <span>{profession.professionals.length} profissionais disponíveis</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Professionals */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-6">Profissionais de {profession.name}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {profession.professionals.map((pro: any, i: number) => (
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
