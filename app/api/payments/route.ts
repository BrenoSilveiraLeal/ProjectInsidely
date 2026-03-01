import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
})

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions)
  
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const { bookingId, amount } = body

    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
      include: { profile: true },
    })

    if (!booking) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 })
    }

    const platformFee = amount * 0.30
    const professionalAmount = amount * 0.70

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency: 'brl',
      metadata: { bookingId },
    })

    const payment = await prisma.payment.create({
      data: {
        bookingId,
        userId: (session.user as any).id,
        amount,
        platformFee,
        professionalAmount,
        stripePaymentId: paymentIntent.id,
        status: 'PENDING',
      },
    })

    return NextResponse.json({ 
      clientSecret: paymentIntent.client_secret,
      payment 
    })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create payment' }, { status: 500 })
  }
}
