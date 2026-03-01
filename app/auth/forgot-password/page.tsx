'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Mail } from 'lucide-react'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Aqui você implementaria o envio do email de recuperação
    // Por enquanto, apenas simula o envio
    setTimeout(() => {
      setSent(true)
    }, 1000)
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-2xl p-8 w-full max-w-md"
      >
        <Link href="/" className="text-2xl font-bold gradient-text block text-center mb-8">
          Insidely
        </Link>

        {!sent ? (
          <>
            <div className="w-16 h-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Mail size={32} />
            </div>

            <h1 className="text-3xl font-bold mb-2 text-center">Esqueceu a senha?</h1>
            <p className="text-gray-400 text-center mb-8">
              Digite seu email e enviaremos um link para redefinir sua senha
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

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg font-medium hover:opacity-90 transition"
              >
                Enviar link de recuperação
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-gray-400">
              Lembrou a senha?{' '}
              <Link href="/auth/signin" className="text-indigo-400 hover:text-indigo-300">
                Voltar para login
              </Link>
            </p>
          </>
        ) : (
          <div className="text-center">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Mail size={32} className="text-green-500" />
            </div>

            <h1 className="text-3xl font-bold mb-2">Email enviado!</h1>
            <p className="text-gray-400 mb-8">
              Enviamos um link de recuperação para <strong>{email}</strong>. 
              Verifique sua caixa de entrada e spam.
            </p>

            <Link
              href="/auth/signin"
              className="inline-block px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg font-medium hover:opacity-90 transition"
            >
              Voltar para login
            </Link>
          </div>
        )}
      </motion.div>
    </main>
  )
}
