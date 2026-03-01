import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: 'Usuário não encontrado' }, { status: 404 });
    }

    // Mock notifications - em produção, buscar do banco
    const notifications = [
      {
        id: '1',
        type: 'booking',
        title: 'Nova conversa agendada',
        message: 'Sua conversa com Ana Silva foi confirmada para amanhã às 14h',
        read: false,
        createdAt: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
      },
      {
        id: '2',
        type: 'review',
        title: 'Nova avaliação recebida',
        message: 'Carlos Santos deixou uma avaliação de 5 estrelas',
        read: false,
        createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
      },
      {
        id: '3',
        type: 'payment',
        title: 'Pagamento confirmado',
        message: 'Seu pagamento de R$ 150 foi processado com sucesso',
        read: true,
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
      },
    ];

    return NextResponse.json(notifications);
  } catch (error) {
    console.error('Erro ao buscar notificações:', error);
    return NextResponse.json({ error: 'Erro ao buscar notificações' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });
    }

    const { notificationId } = await request.json();

    // Em produção, atualizar no banco
    // await prisma.notification.update({ where: { id: notificationId }, data: { read: true } })

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erro ao marcar notificação:', error);
    return NextResponse.json({ error: 'Erro ao marcar notificação' }, { status: 500 });
  }
}
