import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/prisma'

export async function POST(req: Request) {
  const session = await getServerSession()
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
  }

  const { reportId } = await req.json()

  const report = await prisma.companyReport.findUnique({
    where: { id: reportId }
  })

  if (!report) {
    return NextResponse.json({ error: 'Relatório não encontrado' }, { status: 404 })
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email }
  })

  if (!user) {
    return NextResponse.json({ error: 'Usuário não encontrado' }, { status: 404 })
  }

  await prisma.payment.create({
    data: {
      userId: user.id,
      amount: report.price,
      stripePaymentId: 'report_' + Date.now(),
      status: 'COMPLETED',
      type: 'REPORT'
    }
  })

  await prisma.companyReport.update({
    where: { id: reportId },
    data: { purchases: report.purchases + 1 }
  })

  return NextResponse.json({ report })
}
