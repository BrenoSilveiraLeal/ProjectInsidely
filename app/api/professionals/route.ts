import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const profession = searchParams.get('profession')
  const company = searchParams.get('company')
  const location = searchParams.get('location')
  const minExperience = searchParams.get('minExperience')
  const maxPrice = searchParams.get('maxPrice')

  try {
    const profiles = await prisma.profile.findMany({
      where: {
        isActive: true,
        ...(profession && { jobTitle: { contains: profession, mode: 'insensitive' } }),
        ...(company && { company: { name: { contains: company, mode: 'insensitive' } } }),
        ...(location && { location: { contains: location, mode: 'insensitive' } }),
        ...(minExperience && { yearsExperience: { gte: parseInt(minExperience) } }),
        ...(maxPrice && { pricePerCall: { lte: parseFloat(maxPrice) } }),
      },
      include: {
        user: { select: { name: true, image: true } },
        company: { select: { name: true, logo: true } },
      },
      orderBy: { rating: 'desc' },
    })

    return NextResponse.json(profiles)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch professionals' }, { status: 500 })
  }
}
