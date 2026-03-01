import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';

// GET - Buscar perfil do usuário logado
export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: {
        profile: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: 'Usuário não encontrado' }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error('Erro ao buscar perfil:', error);
    return NextResponse.json({ error: 'Erro ao buscar perfil' }, { status: 500 });
  }
}

// PUT - Atualizar perfil do usuário logado
export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });
    }

    const formData = await request.formData();
    
    const name = formData.get('name') as string;
    const phone = formData.get('phone') as string;
    const cargo = formData.get('cargo') as string;
    const empresa = formData.get('empresa') as string;
    const bio = formData.get('bio') as string;
    const hourlyRate = formData.get('hourlyRate') as string;
    const experience = formData.get('experience') as string;
    const expertise = formData.get('expertise') as string;
    const availability = formData.get('availability') as string;
    const proofFile = formData.get('proofFile') as File | null;

    // Buscar usuário
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: 'Usuário não encontrado' }, { status: 404 });
    }

    // Processar arquivo de comprovação (em produção, fazer upload para S3/Cloudinary)
    let proofUrl = user.comprovacaoEmprego;
    if (proofFile) {
      // TODO: Implementar upload real
      // const uploadResult = await uploadToS3(proofFile);
      // proofUrl = uploadResult.url;
      proofUrl = `/uploads/proof_${Date.now()}.pdf`; // Placeholder
    }

    // Atualizar dados do usuário
    const updatedUser = await prisma.user.update({
      where: { email: session.user.email },
      data: {
        name,
        phone: phone || null,
        cargo: cargo || null,
        empresa: empresa || null,
        bio: bio || null,
        comprovacaoEmprego: proofUrl,
      },
    });

    // Se for profissional, atualizar/criar perfil
    if (user.role === 'PROFESSIONAL') {
      const expertiseArray = expertise
        ? expertise.split(',').map((s) => s.trim()).filter(Boolean)
        : [];

      const profileData = {
        hourlyRate: hourlyRate ? parseFloat(hourlyRate) : null,
        experience: experience ? parseInt(experience) : null,
        expertise: expertiseArray.length > 0 ? expertiseArray : null,
        availability: availability || null,
      };

      // Verificar se já existe perfil
      const existingProfile = await prisma.profile.findUnique({
        where: { userId: user.id },
      });

      if (existingProfile) {
        await prisma.profile.update({
          where: { userId: user.id },
          data: profileData,
        });
      } else {
        await prisma.profile.create({
          data: {
            userId: user.id,
            ...profileData,
          },
        });
      }
    }

    return NextResponse.json({ success: true, user: updatedUser });
  } catch (error) {
    console.error('Erro ao atualizar perfil:', error);
    return NextResponse.json({ error: 'Erro ao atualizar perfil' }, { status: 500 });
  }
}
