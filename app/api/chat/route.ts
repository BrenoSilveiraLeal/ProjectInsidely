import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/prisma'

const MESSAGE_LIMIT = 5

const BLOCKED_PATTERNS = [
  /\d{2,3}[\s-]?\d{4,5}[\s-]?\d{4}/g, // telefone
  /[\w.-]+@[\w.-]+\.\w+/g, // email
  /(whatsapp|telegram|instagram|facebook|linkedin|twitter)/gi, // redes sociais
  /(https?:\/\/[^\s]+)/g // links
]

function containsBlockedContent(message: string): boolean {
  return BLOCKED_PATTERNS.some(pattern => pattern.test(message))
}

export async function POST(req: Request) {
  const session = await getServerSession()
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
  }

  const { receiverId, content } = await req.json()

  const sender = await prisma.user.findUnique({
    where: { email: session.user.email }
  })

  if (!sender) {
    return NextResponse.json({ error: 'Usuário não encontrado' }, { status: 404 })
  }

  // Verificar conteúdo bloqueado
  if (containsBlockedContent(content)) {
    return NextResponse.json({ 
      error: 'Mensagem bloqueada: não é permitido compartilhar contatos externos',
      blocked: true 
    }, { status: 400 })
  }

  // Verificar limite de mensagens
  let chatLimit = await prisma.chatLimit.findUnique({
    where: {
      explorerId_professionalId: {
        explorerId: sender.id,
        professionalId: receiverId
      }
    }
  })

  if (!chatLimit) {
    chatLimit = await prisma.chatLimit.create({
      data: {
        explorerId: sender.id,
        professionalId: receiverId,
        messageCount: 0
      }
    })
  }

  // Verificar se já tem booking
  const hasBooking = await prisma.booking.findFirst({
    where: {
      explorerId: sender.id,
      professionalId: receiverId,
      status: { in: ['CONFIRMED', 'COMPLETED'] }
    }
  })

  if (!hasBooking && chatLimit.messageCount >= MESSAGE_LIMIT) {
    return NextResponse.json({ 
      error: 'Limite de mensagens atingido. Agende uma conversa para continuar.',
      limitReached: true 
    }, { status: 403 })
  }

  // Criar mensagem
  const message = await prisma.chatMessage.create({
    data: {
      senderId: sender.id,
      receiverId,
      content
    }
  })

  // Atualizar contador
  if (!hasBooking) {
    await prisma.chatLimit.update({
      where: { id: chatLimit.id },
      data: { messageCount: chatLimit.messageCount + 1 }
    })
  }

  return NextResponse.json({ message, remaining: MESSAGE_LIMIT - chatLimit.messageCount - 1 })
}

export async function GET(req: Request) {
  const session = await getServerSession()
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
  }

  const { searchParams } = new URL(req.url)
  const otherUserId = searchParams.get('userId')

  const user = await prisma.user.findUnique({
    where: { email: session.user.email }
  })

  if (!user || !otherUserId) {
    return NextResponse.json({ error: 'Parâmetros inválidos' }, { status: 400 })
  }

  const messages = await prisma.chatMessage.findMany({
    where: {
      OR: [
        { senderId: user.id, receiverId: otherUserId },
        { senderId: otherUserId, receiverId: user.id }
      ]
    },
    orderBy: { createdAt: 'asc' }
  })

  return NextResponse.json({ messages })
}
