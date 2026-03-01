'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import api from '@/lib/api';
import { useAuthStore } from '@/store';

export default function RegisterPage() {
  const router = useRouter();
  const { setAuth } = useAuthStore();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    userType: 'explorer' as 'explorer' | 'professional',
    region: '',
    linkedinUrl: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await api.post('/auth/register', formData);
      setAuth(response.data.user, response.data.token);
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="pt-32 pb-20 px-4">
        <div className="max-w-md mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card p-8"
          >
            <h1 className="text-3xl font-bold mb-8 text-center">
              Criar <span className="gradient-text">Conta</span>
            </h1>

            {error && (
              <div className="bg-red-500/20 border border-red-500 rounded-lg p-4 mb-6">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Nome Completo</label>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full bg-dark-100 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="Seu nome"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-dark-100 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="seu@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Senha</label>
                <input
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full bg-dark-100 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="••••••••"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Tipo de Usuário</label>
                <select
                  value={formData.userType}
                  onChange={(e) => setFormData({ ...formData, userType: e.target.value as any })}
                  className="w-full bg-dark-100 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="explorer">Explorador (busco insights)</option>
                  <option value="professional">Profissional (ofereço insights)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Região (opcional)</label>
                <input
                  type="text"
                  value={formData.region}
                  onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                  className="w-full bg-dark-100 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="São Paulo, Brasil"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">LinkedIn (opcional)</label>
                <input
                  type="url"
                  value={formData.linkedinUrl}
                  onChange={(e) => setFormData({ ...formData, linkedinUrl: e.target.value })}
                  className="w-full bg-dark-100 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="https://linkedin.com/in/seu-perfil"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full glass-button bg-primary-500 hover:bg-primary-600 disabled:opacity-50"
              >
                {loading ? 'Criando conta...' : 'Criar Conta'}
              </button>
            </form>

            <p className="text-center mt-6 text-dark-500">
              Já tem uma conta?{' '}
              <Link href="/login" className="text-primary-400 hover:text-primary-300">
                Entrar
              </Link>
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
