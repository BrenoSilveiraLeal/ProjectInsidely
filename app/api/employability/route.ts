import { NextResponse } from 'next/server'

const mockData: Record<string, any> = {
  'São Paulo': {
    region: 'São Paulo',
    state: 'SP',
    professions: [
      { name: 'Desenvolvedor Full Stack', jobCount: 450, growth: 25 },
      { name: 'Analista de Dados', jobCount: 380, growth: 30 },
      { name: 'Product Manager', jobCount: 320, growth: 20 },
      { name: 'UX Designer', jobCount: 280, growth: 18 },
      { name: 'DevOps Engineer', jobCount: 250, growth: 35 },
      { name: 'Gerente de Vendas', jobCount: 420, growth: 15 },
    ]
  },
  'Rio de Janeiro': {
    region: 'Rio de Janeiro',
    state: 'RJ',
    professions: [
      { name: 'Desenvolvedor Backend', jobCount: 280, growth: 22 },
      { name: 'Analista Financeiro', jobCount: 320, growth: 18 },
      { name: 'Gerente de Projetos', jobCount: 250, growth: 15 },
      { name: 'Designer Gráfico', jobCount: 180, growth: 12 },
      { name: 'Engenheiro de Software', jobCount: 300, growth: 28 },
    ]
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const region = searchParams.get('region') || 'São Paulo'
  
  const data = mockData[region] || mockData['São Paulo']
  
  return NextResponse.json(data)
}
