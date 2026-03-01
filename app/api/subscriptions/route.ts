import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/prisma'

const PLANS = {
  EXPLORER: { price: 29, limit: 3 },
  CAREER_PRO: { price: 59, limit: 6 },
  PREMIUM: { price: 99, limit: 10 }
}

export async function POST(req: Request) {
  const session = await getServerSession()
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
  }

  const { plan } = await req.json()
  
  if (!PLANS[plan as keyof typeof PLANS]) {
    return NextResponse.json({ error: 'Plano inválido' }, { status: 400 })
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email }
  })

  if (!user) {
    return NextResponse.json({ error: 'Usuário não encontrado' }, { status: 404 })
  }

  const planData = PLANS[plan as keyof typeof PLANS]
  const now = new Date()
  const periodEnd = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000)

  const subscription = await prisma.subscription.create({
    data: {
      plan,
      price: planData.price,
      conversationsLimit: planData.limit,
      currentPeriodStart: now,
      currentPeriodEnd: periodEnd,
      status: 'pending'
    }
  })

  await prisma.user.update({
    where: { id: user.id },
    data: { subscriptionId: subscription.id }
  })

  // Criar checkout Stripe para cartão
  const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
  
  const session_stripe = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [{
      price_data: {
        currency: 'brl',
        product_data: { name: `Plano ${plan}` },
        unit_amount: Math.round(planData.price * 100),
        recurring: { interval: 'month' }
      },
      quantity: 1
    }],
    mode: 'subscription',
    success_url: `${process.env.NEXT_PUBLIC_URL}/dashboard?subscription=success`,
    cancel_url: `${process.env.NEXT_PUBLIC_URL}/pricing?subscription=cancelled`,
    metadata: { subscriptionId: subscription.id, userId: user.id }
  })

  return NextResponse.json({ 
    subscription,
    checkoutUrl: session_stripe.url 
  })
}

export async function GET(req: Request) {
  const session = await getServerSession()
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: { subscription: true }
  })

  return NextResponse.json({ subscription: user?.subscription })
}
