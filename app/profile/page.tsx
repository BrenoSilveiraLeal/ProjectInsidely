'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface ProfileData {
  name: string;
  email: string;
  phone?: string;
  image?: string;
  role: 'EXPLORER' | 'PROFESSIONAL';
  cargo?: string;
  empresa?: string;
  bio?: string;
  profile?: {
    hourlyRate?: number;
    experience?: number;
    expertise?: string[];
    availability?: string;
    rating?: number;
    totalReviews?: number;
  };
}

export default function ProfilePage() {
  const { status } = useSession();
  const router = useRouter();
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated') router.push('/auth/signin');
    if (status === 'authenticated') {
      fetch('/api/profile')
        .then(res => res.ok ? res.json() : null)
        .then(data => setProfile(data))
        .catch(async () => {
          const { toast } = await import('@/components/ToastContainer');
          toast.error('Erro ao carregar perfil');
        })
        .finally(() => setLoading(false));
    }
  }, [status, router]);

  if (loading || status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!profile) return null;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 space-y-6">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-6">
              <div className="relative w-24 h-24 rounded-full overflow-hidden bg-gray-200">
                {profile.image ? (
                  <Image src={profile.image} alt={profile.name} fill className="object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-3xl font-bold text-gray-400">
                    {profile.name.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{profile.name}</h1>
                {profile.cargo && profile.empresa && (
                  <p className="text-lg text-gray-600 mt-1">{profile.cargo} na {profile.empresa}</p>
                )}
                <span className={`inline-block mt-2 px-3 py-1 rounded-full text-sm font-medium ${
                  profile.role === 'PROFESSIONAL' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                }`}>
                  {profile.role === 'PROFESSIONAL' ? 'Profissional' : 'Explorador'}
                </span>
              </div>
            </div>
            <Link href="/profile/edit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              Editar Perfil
            </Link>
          </div>
        </div>

        {/* Contato */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Informações de Contato</h2>
          <div className="space-y-3">
            <div><span className="text-gray-600">Email:</span> <span className="ml-2 text-gray-900">{profile.email}</span></div>
            {profile.phone && <div><span className="text-gray-600">Telefone:</span> <span className="ml-2 text-gray-900">{profile.phone}</span></div>}
          </div>
        </div>

        {/* Bio */}
        {profile.bio && (
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Sobre</h2>
            <p className="text-gray-700 whitespace-pre-wrap">{profile.bio}</p>
          </div>
        )}

        {/* Profissional */}
        {profile.role === 'PROFESSIONAL' && profile.profile && (
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Informações Profissionais</h2>
            <div className="grid grid-cols-2 gap-6">
              {profile.profile.hourlyRate && (
                <div>
                  <span className="text-gray-600 block mb-1">Valor por Hora</span>
                  <span className="text-2xl font-bold text-green-600">R$ {profile.profile.hourlyRate}</span>
                </div>
              )}
              {profile.profile.experience && (
                <div>
                  <span className="text-gray-600 block mb-1">Experiência</span>
                  <span className="text-xl font-semibold text-gray-900">{profile.profile.experience} anos</span>
                </div>
              )}
              {profile.profile.rating && (
                <div>
                  <span className="text-gray-600 block mb-1">Avaliação</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-semibold text-gray-900">{profile.profile.rating.toFixed(1)}</span>
                    <span className="text-yellow-500">★</span>
                    <span className="text-gray-500 text-sm">({profile.profile.totalReviews} avaliações)</span>
                  </div>
                </div>
              )}
              {profile.profile.availability && (
                <div>
                  <span className="text-gray-600 block mb-1">Disponibilidade</span>
                  <span className="text-gray-900">{profile.profile.availability}</span>
                </div>
              )}
            </div>
            {profile.profile.expertise && profile.profile.expertise.length > 0 && (
              <div className="mt-6">
                <span className="text-gray-600 block mb-2">Áreas de Expertise</span>
                <div className="flex flex-wrap gap-2">
                  {profile.profile.expertise.map((skill, i) => (
                    <span key={i} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm">{skill}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
