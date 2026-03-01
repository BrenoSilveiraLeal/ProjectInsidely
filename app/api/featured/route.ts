import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/prisma'

const FEATURED_PRICE = 19
const FEATURED_DURATION_DAYS = 30

export async function POST(req: Request) {
  const session = await getServerSession()
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: { profile: true }
  })

  if (!user?.profile) {
    return NextResponse.json({ error: 'Perfil não encontrado' }, { status: 404 })
  }

  const featuredUntil = new Date()
  featuredUntil.setDate(featuredUntil.getDate() + FEATURED_DURATION_DAYS)

  await prisma.profile.update({
    where: { id: user.profile.id },
    data: {
      isFeatured: true,
      featuredUntil
    }
  })

  await prisma.payment.create({
    data: {
      userId: user.id,
      amount: FEATURED_PRICE,
      stripePaymentId: 'featured_' + Date.now(),
      status: 'COMPLETED',
      type: 'FEATURED'
    }
  })

  return NextResponse.json({ success: true, featuredUntil })
}
