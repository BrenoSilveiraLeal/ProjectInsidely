import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions)
  
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const { bookingId, profileId, rating, honesty, helpfulness, accuracy, comment } = body

    const review = await prisma.review.create({
      data: {
        bookingId,
        profileId,
        reviewerId: (session.user as any).id,
        rating,
        honesty,
        helpfulness,
        accuracy,
        comment,
      },
    })

    const avgRating = await prisma.review.aggregate({
      where: { profileId },
      _avg: { rating: true },
      _count: true,
    })

    await prisma.profile.update({
      where: { id: profileId },
      data: {
        rating: avgRating._avg.rating || 0,
        totalReviews: avgRating._count,
      },
    })

    await prisma.booking.update({
      where: { id: bookingId },
      data: { status: 'COMPLETED' },
    })

    return NextResponse.json(review)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create review' }, { status: 500 })
  }
}
