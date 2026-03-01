import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/prisma'

export async function POST(req: Request) {
  const session = await getServerSession()
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
  }

  const { companyId, title, content } = await req.json()

  const report = await prisma.companyReport.create({
    data: {
      companyId,
      title,
      content,
      price: 9.90
    }
  })

  return NextResponse.json({ report })
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const companyId = searchParams.get('companyId')
  const reportId = searchParams.get('reportId')

  if (reportId) {
    const report = await prisma.companyReport.findUnique({
      where: { id: reportId },
      include: { company: true }
    })
    return NextResponse.json({ report })
  }

  if (companyId) {
    const reports = await prisma.companyReport.findMany({
      where: { companyId },
      include: { company: true }
    })
    return NextResponse.json({ reports })
  }

  return NextResponse.json({ error: 'Parâmetros inválidos' }, { status: 400 })
}
