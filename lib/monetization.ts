// Ocultar nome completo do profissional
export function maskName(fullName: string): string {
  const parts = fullName.trim().split(' ')
  if (parts.length === 1) return parts[0]
  
  const firstName = parts[0]
  const lastInitial = parts[parts.length - 1][0]
  
  return `${firstName} ${lastInitial}.`
}

// Calcular comissão da plataforma (30%)
export function calculateCommission(amount: number) {
  const platformFee = amount * 0.30
  const professionalAmount = amount * 0.70
  
  return {
    total: amount,
    platformFee,
    professionalAmount
  }
}

// Verificar se usuário pode enviar mensagem
export async function canSendMessage(
  explorerId: string,
  professionalId: string,
  prisma: any
): Promise<{ allowed: boolean; remaining: number }> {
  const MESSAGE_LIMIT = 5
  
  const chatLimit = await prisma.chatLimit.findUnique({
    where: {
      explorerId_professionalId: {
        explorerId,
        professionalId
      }
    }
  })
  
  if (!chatLimit) {
    return { allowed: true, remaining: MESSAGE_LIMIT - 1 }
  }
  
  const hasBooking = await prisma.booking.findFirst({
    where: {
      explorerId,
      professionalId,
      status: { in: ['CONFIRMED', 'COMPLETED'] }
    }
  })
  
  if (hasBooking) {
    return { allowed: true, remaining: -1 } // ilimitado
  }
  
  const remaining = MESSAGE_LIMIT - chatLimit.messageCount
  return { allowed: remaining > 0, remaining }
}

// Detectar conteúdo bloqueado
export function detectBlockedContent(message: string): { blocked: boolean; reason?: string } {
  const patterns = [
    { regex: /\d{2,3}[\s-]?\d{4,5}[\s-]?\d{4}/g, reason: 'número de telefone' },
    { regex: /[\w.-]+@[\w.-]+\.\w+/g, reason: 'email' },
    { regex: /(whatsapp|telegram|instagram|facebook|linkedin|twitter)/gi, reason: 'rede social' },
    { regex: /(https?:\/\/[^\s]+)/g, reason: 'link externo' }
  ]
  
  for (const pattern of patterns) {
    if (pattern.regex.test(message)) {
      return { blocked: true, reason: pattern.reason }
    }
  }
  
  return { blocked: false }
}

// Verificar se assinatura está ativa
export function isSubscriptionActive(subscription: any): boolean {
  if (!subscription) return false
  if (subscription.status !== 'active') return false
  
  const now = new Date()
  return now < new Date(subscription.currentPeriodEnd)
}

// Verificar se usuário pode agendar conversa
export async function canBookConversation(
  userId: string,
  prisma: any
): Promise<{ allowed: boolean; reason?: string }> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { subscription: true }
  })
  
  if (!user?.subscription) {
    return { allowed: true } // sem assinatura, paga por conversa
  }
  
  if (!isSubscriptionActive(user.subscription)) {
    return { allowed: false, reason: 'Assinatura expirada' }
  }
  
  if (user.subscription.conversationsUsed >= user.subscription.conversationsLimit) {
    return { allowed: false, reason: 'Limite de conversas atingido' }
  }
  
  return { allowed: true }
}
