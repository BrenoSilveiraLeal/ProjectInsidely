import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { canBookConversation } from '@/lib/monetization'

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions)
  
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const { professionalId, profileId, scheduledAt, duration, notes } = body

    const userId = (session.user as any).id

    // Verificar se pode agendar
    const { allowed, reason } = await canBookConversation(userId, prisma)
    if (!allowed) {
      return NextResponse.json({ error: reason }, { status: 403 })
    }

    const booking = await prisma.booking.create({
      data: {
        explorerId: userId,
        professionalId,
        profileId,
        scheduledAt: new Date(scheduledAt),
        duration,
        notes,
        status: 'PENDING',
      },
      include: {
        profile: true,
        professional: { select: { name: true, email: true } },
      },
    })

    // Atualizar contador de conversas se tiver assinatura
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { subscription: true }
    })

    if (user?.subscription) {
      await prisma.subscription.update({
        where: { id: user.subscription.id },
        data: { conversationsUsed: user.subscription.conversationsUsed + 1 }
      })
    }

    // Atualizar chat limit
    await prisma.chatLimit.upsert({
      where: {
        explorerId_professionalId: {
          explorerId: userId,
          professionalId
        }
      },
      update: { hasBooking: true },
      create: {
        explorerId: userId,
        professionalId,
        hasBooking: true
      }
    })

    return NextResponse.json(booking)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create booking' }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions)
  
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const bookings = await prisma.booking.findMany({
      where: {
        OR: [
          { explorerId: (session.user as any).id },
          { professionalId: (session.user as any).id },
        ],
      },
      include: {
        profile: true,
        explorer: { select: { name: true, image: true } },
        professional: { select: { name: true, image: true } },
        payment: true,
      },
      orderBy: { scheduledAt: 'desc' },
    })

    return NextResponse.json(bookings)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch bookings' }, { status: 500 })
  }
}
