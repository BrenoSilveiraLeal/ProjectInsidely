import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/prisma'

const PREMIUM_PRICE = 499

export async function POST(req: Request) {
  const session = await getServerSession()
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
  }

  const { companyId, description, culture, benefits } = await req.json()

  const user = await prisma.user.findUnique({
    where: { email: session.user.email }
  })

  if (!user) {
    return NextResponse.json({ error: 'Usuário não encontrado' }, { status: 404 })
  }

  const premiumUntil = new Date()
  premiumUntil.setDate(premiumUntil.getDate() + 30)

  const company = await prisma.company.update({
    where: { id: companyId },
    data: {
      isPremium: true,
      premiumUntil,
      description,
      culture,
      benefits
    }
  })

  await prisma.payment.create({
    data: {
      userId: user.id,
      amount: PREMIUM_PRICE,
      stripePaymentId: 'company_premium_' + Date.now(),
      status: 'COMPLETED',
      type: 'COMPANY_PREMIUM'
    }
  })

  return NextResponse.json({ company })
}
