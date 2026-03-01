import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/prisma'

export async function POST(req: Request) {
  const session = await getServerSession()
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
  }

  const { professionalId } = await req.json()

  const user = await prisma.user.findUnique({
    where: { email: session.user.email }
  })

  if (!user) {
    return NextResponse.json({ error: 'Usuário não encontrado' }, { status: 404 })
  }

  const favorites = user.favorites || []
  const isFavorite = favorites.includes(professionalId)

  const updatedFavorites = isFavorite
    ? favorites.filter(id => id !== professionalId)
    : [...favorites, professionalId]

  await prisma.user.update({
    where: { id: user.id },
    data: { favorites: updatedFavorites }
  })

  return NextResponse.json({ isFavorite: !isFavorite })
}

export async function GET(req: Request) {
  const session = await getServerSession()
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email }
  })

  return NextResponse.json({ favorites: user?.favorites || [] })
}
