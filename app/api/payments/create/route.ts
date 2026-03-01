import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/prisma'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
})

export async function POST(req: Request) {
  const session = await getServerSession()
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
  }

  const { bookingId, amount, paymentMethod } = await req.json()

  const user = await prisma.user.findUnique({
    where: { email: session.user.email }
  })

  if (!user) {
    return NextResponse.json({ error: 'Usuário não encontrado' }, { status: 404 })
  }

  const platformFee = amount * 0.30
  const professionalAmount = amount * 0.70

  if (paymentMethod === 'pix') {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency: 'brl',
      payment_method_types: ['pix'],
      metadata: { bookingId, userId: user.id }
    })

    const payment = await prisma.payment.create({
      data: {
        bookingId,
        userId: user.id,
        amount,
        platformFee,
        professionalAmount,
        stripePaymentId: paymentIntent.id,
        status: 'PENDING',
        type: 'BOOKING'
      }
    })

    return NextResponse.json({
      paymentId: payment.id,
      pixCode: paymentIntent.next_action?.pix_display_qr_code?.data,
      pixQrCode: paymentIntent.next_action?.pix_display_qr_code?.image_url_svg,
      expiresAt: paymentIntent.next_action?.pix_display_qr_code?.expires_at
    })
  }

  // Cartão
  const paymentIntent = await stripe.paymentIntents.create({
    amount: Math.round(amount * 100),
    currency: 'brl',
    payment_method_types: ['card'],
    metadata: { bookingId, userId: user.id }
  })

  const payment = await prisma.payment.create({
    data: {
      bookingId,
      userId: user.id,
      amount,
      platformFee,
      professionalAmount,
      stripePaymentId: paymentIntent.id,
      status: 'PENDING',
      type: 'BOOKING'
    }
  })

  return NextResponse.json({
    paymentId: payment.id,
    clientSecret: paymentIntent.client_secret
  })
}
