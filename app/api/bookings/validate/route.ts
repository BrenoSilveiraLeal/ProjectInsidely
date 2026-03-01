import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/prisma'
import { canBookConversation } from '@/lib/monetization'

export async function POST(req: Request) {
  const session = await getServerSession()
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email }
  })

  if (!user) {
    return NextResponse.json({ error: 'Usuário não encontrado' }, { status: 404 })
  }

  const { allowed, reason } = await canBookConversation(user.id, prisma)

  if (!allowed) {
    return NextResponse.json({ 
      canBook: false, 
      reason 
    }, { status: 403 })
  }

  return NextResponse.json({ canBook: true })
}
