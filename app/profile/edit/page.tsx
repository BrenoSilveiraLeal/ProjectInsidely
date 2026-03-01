'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function EditProfilePage() {
  const { status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [userRole, setUserRole] = useState<'EXPLORER' | 'PROFESSIONAL'>('EXPLORER');
  const [formData, setFormData] = useState({
    name: '', phone: '', cargo: '', empresa: '', bio: '',
    hourlyRate: '', experience: '', expertise: '', availability: ''
  });
  const [proofFile, setProofFile] = useState<File | null>(null);

  useEffect(() => {
    if (status === 'unauthenticated') router.push('/auth/signin');
    if (status === 'authenticated') {
      fetch('/api/profile')
        .then(res => res.ok ? res.json() : null)
        .then(data => {
          if (data) {
            setUserRole(data.role);
            setFormData({
              name: data.name || '',
              phone: data.phone || '',
              cargo: data.cargo || '',
              empresa: data.empresa || '',
              bio: data.bio || '',
              hourlyRate: data.profile?.hourlyRate?.toString() || '',
              experience: data.profile?.experience?.toString() || '',
              expertise: data.profile?.expertise?.join(', ') || '',
              availability: data.profile?.availability || ''
            });
          }
        })
        .finally(() => setLoading(false));
    }
  }, [status, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const fd = new FormData();
    Object.entries(formData).forEach(([k, v]) => fd.append(k, v));
    if (proofFile) fd.append('proofFile', proofFile);

    try {
      const res = await fetch('/api/profile', { method: 'PUT', body: fd });
      const { toast } = await import('@/components/ToastContainer');
      
      if (res.ok) {
        toast.success('Perfil atualizado com sucesso!');
        setTimeout(() => router.push('/profile'), 1000);
      } else {
        toast.error('Erro ao salvar perfil');
      }
    } catch {
      const { toast } = await import('@/components/ToastContainer');
      toast.error('Erro ao salvar perfil');
    } finally {
      setSaving(false);
    }
  };

  if (loading || status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Editar Perfil</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Informações Básicas</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nome Completo *</label>
                  <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Telefone</label>
                  <input type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="(11) 99999-9999" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Cargo *</label>
                  <input type="text" required value={formData.cargo} onChange={(e) => setFormData({ ...formData, cargo: e.target.value })}
                    placeholder="Ex: Desenvolvedor Full Stack" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Empresa *</label>
                  <input type="text" required value={formData.empresa} onChange={(e) => setFormData({ ...formData, empresa: e.target.value })}
                    placeholder="Ex: Google" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Sobre Você</label>
                  <textarea value={formData.bio} onChange={(e) => setFormData({ ...formData, bio: e.target.value })} rows={4}
                    placeholder="Conte um pouco sobre sua trajetória profissional..." className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Comprovante de Vínculo com Empresa</label>
                  <input type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={(e) => setProofFile(e.target.files?.[0] || null)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                  <p className="text-xs text-gray-500 mt-1">Envie um documento que comprove seu vínculo (crachá, holerite, etc.)</p>
                </div>
              </div>
            </div>

            {userRole === 'PROFESSIONAL' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Informações Profissionais</h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Valor por Hora (R$)</label>
                      <input type="number" value={formData.hourlyRate} onChange={(e) => setFormData({ ...formData, hourlyRate: e.target.value })}
                        placeholder="150" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Anos de Experiência</label>
                      <input type="number" value={formData.experience} onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                        placeholder="5" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Áreas de Expertise</label>
                    <input type="text" value={formData.expertise} onChange={(e) => setFormData({ ...formData, expertise: e.target.value })}
                      placeholder="React, Node.js, TypeScript (separado por vírgula)" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Disponibilidade</label>
                    <select value={formData.availability} onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option value="">Selecione...</option>
                      <option value="Imediata">Imediata</option>
                      <option value="Esta semana">Esta semana</option>
                      <option value="Próximas 2 semanas">Próximas 2 semanas</option>
                      <option value="Próximo mês">Próximo mês</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            <div className="flex gap-4 pt-4">
              <button type="submit" disabled={saving}
                className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed">
                {saving ? 'Salvando...' : 'Salvar Alterações'}
              </button>
              <button type="button" onClick={() => router.push('/profile')}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition">
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
