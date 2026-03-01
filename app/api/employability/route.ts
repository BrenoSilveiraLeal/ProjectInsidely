import { NextRequest, NextResponse } from 'next/server'

const employabilityData: Record<string, any> = {
  'São Paulo': {
    region: 'São Paulo',
    state: 'SP',
    professions: [
      { name: 'Software Engineer', jobCount: 487, growth: 23 },
      { name: 'Product Manager', jobCount: 312, growth: 18 },
      { name: 'Data Scientist', jobCount: 289, growth: 31 },
      { name: 'UX/UI Designer', jobCount: 245, growth: 15 },
      { name: 'DevOps Engineer', jobCount: 198, growth: 27 },
      { name: 'Marketing Manager', jobCount: 176, growth: 12 },
      { name: 'Sales Executive', jobCount: 165, growth: 9 },
      { name: 'Financial Analyst', jobCount: 143, growth: 14 },
      { name: 'HR Manager', jobCount: 128, growth: 8 },
    ]
  },
  'Rio de Janeiro': {
    region: 'Rio de Janeiro',
    state: 'RJ',
    professions: [
      { name: 'Software Engineer', jobCount: 298, growth: 19 },
      { name: 'Product Manager', jobCount: 187, growth: 16 },
      { name: 'Marketing Manager', jobCount: 165, growth: 21 },
      { name: 'Data Scientist', jobCount: 154, growth: 25 },
      { name: 'UX/UI Designer', jobCount: 142, growth: 13 },
      { name: 'Sales Executive', jobCount: 134, growth: 11 },
      { name: 'Financial Analyst', jobCount: 121, growth: 15 },
      { name: 'DevOps Engineer', jobCount: 98, growth: 22 },
      { name: 'HR Manager', jobCount: 87, growth: 7 },
    ]
  },
  'Belo Horizonte': {
    region: 'Belo Horizonte',
    state: 'MG',
    professions: [
      { name: 'Software Engineer', jobCount: 213, growth: 28 },
      { name: 'Data Scientist', jobCount: 156, growth: 34 },
      { name: 'Product Manager', jobCount: 134, growth: 20 },
      { name: 'DevOps Engineer', jobCount: 112, growth: 29 },
      { name: 'UX/UI Designer', jobCount: 98, growth: 17 },
      { name: 'Marketing Manager', jobCount: 87, growth: 14 },
      { name: 'Financial Analyst', jobCount: 76, growth: 12 },
      { name: 'Sales Executive', jobCount: 65, growth: 9 },
      { name: 'HR Manager', jobCount: 54, growth: 6 },
    ]
  },
  'Brasília': {
    region: 'Brasília',
    state: 'DF',
    professions: [
      { name: 'Financial Analyst', jobCount: 198, growth: 16 },
      { name: 'Software Engineer', jobCount: 176, growth: 21 },
      { name: 'Product Manager', jobCount: 143, growth: 18 },
      { name: 'Data Scientist', jobCount: 121, growth: 26 },
      { name: 'Marketing Manager', jobCount: 109, growth: 13 },
      { name: 'HR Manager', jobCount: 98, growth: 11 },
      { name: 'UX/UI Designer', jobCount: 87, growth: 15 },
      { name: 'Sales Executive', jobCount: 76, growth: 8 },
      { name: 'DevOps Engineer', jobCount: 65, growth: 23 },
    ]
  },
  'Porto Alegre': {
    region: 'Porto Alegre',
    state: 'RS',
    professions: [
      { name: 'Software Engineer', jobCount: 234, growth: 24 },
      { name: 'Data Scientist', jobCount: 167, growth: 30 },
      { name: 'Product Manager', jobCount: 145, growth: 19 },
      { name: 'DevOps Engineer', jobCount: 123, growth: 26 },
      { name: 'UX/UI Designer', jobCount: 109, growth: 16 },
      { name: 'Marketing Manager', jobCount: 98, growth: 12 },
      { name: 'Financial Analyst', jobCount: 87, growth: 14 },
      { name: 'Sales Executive', jobCount: 76, growth: 10 },
      { name: 'HR Manager', jobCount: 65, growth: 7 },
    ]
  },
  'Curitiba': {
    region: 'Curitiba',
    state: 'PR',
    professions: [
      { name: 'Software Engineer', jobCount: 198, growth: 25 },
      { name: 'Product Manager', jobCount: 143, growth: 20 },
      { name: 'Data Scientist', jobCount: 132, growth: 28 },
      { name: 'DevOps Engineer', jobCount: 109, growth: 24 },
      { name: 'UX/UI Designer', jobCount: 98, growth: 18 },
      { name: 'Marketing Manager', jobCount: 87, growth: 13 },
      { name: 'Financial Analyst', jobCount: 76, growth: 15 },
      { name: 'Sales Executive', jobCount: 65, growth: 9 },
      { name: 'HR Manager', jobCount: 54, growth: 8 },
    ]
  },
  'Salvador': {
    region: 'Salvador',
    state: 'BA',
    professions: [
      { name: 'Software Engineer', jobCount: 154, growth: 22 },
      { name: 'Marketing Manager', jobCount: 132, growth: 19 },
      { name: 'Product Manager', jobCount: 109, growth: 17 },
      { name: 'Sales Executive', jobCount: 98, growth: 14 },
      { name: 'Data Scientist', jobCount: 87, growth: 27 },
      { name: 'UX/UI Designer', jobCount: 76, growth: 16 },
      { name: 'Financial Analyst', jobCount: 65, growth: 12 },
      { name: 'DevOps Engineer', jobCount: 54, growth: 25 },
      { name: 'HR Manager', jobCount: 43, growth: 9 },
    ]
  },
  'Recife': {
    region: 'Recife',
    state: 'PE',
    professions: [
      { name: 'Software Engineer', jobCount: 176, growth: 26 },
      { name: 'Data Scientist', jobCount: 143, growth: 32 },
      { name: 'Product Manager', jobCount: 121, growth: 21 },
      { name: 'DevOps Engineer', jobCount: 98, growth: 28 },
      { name: 'UX/UI Designer', jobCount: 87, growth: 19 },
      { name: 'Marketing Manager', jobCount: 76, growth: 15 },
      { name: 'Sales Executive', jobCount: 65, growth: 11 },
      { name: 'Financial Analyst', jobCount: 54, growth: 13 },
      { name: 'HR Manager', jobCount: 43, growth: 8 },
    ]
  },
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const region = searchParams.get('region') || 'São Paulo'

  await new Promise(resolve => setTimeout(resolve, 500))

  const data = employabilityData[region] || employabilityData['São Paulo']

  return NextResponse.json(data)
}
