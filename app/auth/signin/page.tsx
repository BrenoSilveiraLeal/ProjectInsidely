'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function SignIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showGoogleAlert, setShowGoogleAlert] = useState(false)
  const [showErrorAlert, setShowErrorAlert] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const response = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      if (response.ok) {
        window.location.href = '/dashboard'
      } else {
        setShowErrorAlert(true)
      }
    } catch (error) {
      setShowErrorAlert(true)
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      {showGoogleAlert && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="glass rounded-2xl p-6 max-w-sm w-full text-center">
            <div className="text-4xl mb-4">🚧</div>
            <h3 className="text-xl font-bold mb-3">Em Desenvolvimento</h3>
            <p className="text-gray-400 mb-6">
              Login com Google estará disponível em breve. Por enquanto, use email e senha.
            </p>
            <button
              onClick={() => setShowGoogleAlert(false)}
              className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg font-medium hover:opacity-90 transition"
            >
              Entendi
            </button>
          </div>
        </div>
      )}

      {showErrorAlert && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="glass rounded-2xl p-6 max-w-sm w-full text-center">
            <div className="text-4xl mb-4">❌</div>
            <h3 className="text-xl font-bold mb-3">Erro ao fazer login</h3>
            <p className="text-gray-400 mb-6">
              Email ou senha inválidos. Verifique suas credenciais e tente novamente.
            </p>
            <button
              onClick={() => setShowErrorAlert(false)}
              className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg font-medium hover:opacity-90 transition"
            >
              Tentar novamente
            </button>
          </div>
        </div>
      )}
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-2xl p-8 w-full max-w-md"
      >
        <Link href="/" className="text-2xl font-bold gradient-text block text-center mb-8">
          Insidely
        </Link>

        <h1 className="text-3xl font-bold mb-2 text-center">Entrar</h1>
        <p className="text-gray-400 text-center mb-8">
          Bem-vindo de volta!
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 glass rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="seu@email.com"
              required
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium">Senha</label>
              <Link href="/auth/forgot-password" className="text-xs text-indigo-400 hover:text-indigo-300">
                Esqueceu a senha?
              </Link>
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 glass rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg font-medium hover:opacity-90 transition"
          >
            Entrar
          </button>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gray-950 text-gray-400">Ou continue com</span>
            </div>
          </div>

          <button 
            onClick={() => setShowGoogleAlert(true)}
            className="w-full mt-4 py-3 glass rounded-lg font-medium hover:bg-white/10 transition flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Google (em breve)
          </button>
        </div>

        <p className="mt-6 text-center text-sm text-gray-400">
          Não tem uma conta?{' '}
          <Link href="/auth/signup" className="text-indigo-400 hover:text-indigo-300">
            Cadastre-se
          </Link>
        </p>
      </motion.div>
    </main>
  )
}
