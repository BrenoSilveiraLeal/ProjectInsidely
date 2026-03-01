import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { prisma } from '@/lib/prisma'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
})

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(req: Request) {
  const body = await req.text()
  const signature = headers().get('stripe-signature')!

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
  } catch (err) {
    return NextResponse.json({ error: 'Webhook signature verification failed' }, { status: 400 })
  }

  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object as Stripe.PaymentIntent
      
      await prisma.payment.updateMany({
        where: { stripePaymentId: paymentIntent.id },
        data: { status: 'COMPLETED' }
      })

      if (paymentIntent.metadata.bookingId) {
        await prisma.booking.update({
          where: { id: paymentIntent.metadata.bookingId },
          data: { status: 'CONFIRMED' }
        })
      }
      break

    case 'checkout.session.completed':
      const session = event.data.object as Stripe.Checkout.Session
      
      if (session.metadata?.subscriptionId) {
        await prisma.subscription.update({
          where: { id: session.metadata.subscriptionId },
          data: { 
            status: 'active',
            stripeSubscriptionId: session.subscription as string
          }
        })
      }
      break

    case 'customer.subscription.deleted':
      const subscription = event.data.object as Stripe.Subscription
      
      await prisma.subscription.updateMany({
        where: { stripeSubscriptionId: subscription.id },
        data: { status: 'cancelled' }
      })
      break
  }

  return NextResponse.json({ received: true })
}
