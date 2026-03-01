import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/prisma'

export async function POST(req: Request) {
  const session = await getServerSession()
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
  }

  const { bookingId, rating, honesty, helpfulness, accuracy, comment } = await req.json()

  const user = await prisma.user.findUnique({
    where: { email: session.user.email }
  })

  if (!user) {
    return NextResponse.json({ error: 'Usuário não encontrado' }, { status: 404 })
  }

  const booking = await prisma.booking.findUnique({
    where: { id: bookingId },
    include: { profile: true }
  })

  if (!booking || booking.explorerId !== user.id) {
    return NextResponse.json({ error: 'Agendamento não encontrado' }, { status: 404 })
  }

  const review = await prisma.review.create({
    data: {
      bookingId,
      profileId: booking.profileId,
      reviewerId: user.id,
      rating,
      honesty,
      helpfulness,
      accuracy,
      comment
    }
  })

  // Atualizar rating do profissional
  const reviews = await prisma.review.findMany({
    where: { profileId: booking.profileId }
  })

  const avgRating = reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length

  await prisma.profile.update({
    where: { id: booking.profileId },
    data: {
      rating: avgRating,
      totalReviews: reviews.length
    }
  })

  return NextResponse.json({ review })
}
