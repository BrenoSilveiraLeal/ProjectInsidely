'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiMenu, FiX, FiUser } from 'react-icons/fi';
import { useAuthStore } from '@/store';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuthStore();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold gradient-text">
            Ñ faço ideia
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/search" className="text-dark-600 hover:text-white transition">
              Buscar
            </Link>
            <Link href="/how-it-works" className="text-dark-600 hover:text-white transition">
              Como Funciona
            </Link>
            
            {isAuthenticated ? (
              <>
                <Link href="/dashboard" className="text-dark-600 hover:text-white transition">
                  Dashboard
                </Link>
                <button
                  onClick={logout}
                  className="glass-button"
                >
                  Sair
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="text-dark-600 hover:text-white transition">
                  Entrar
                </Link>
                <Link href="/register" className="glass-button bg-primary-500 hover:bg-primary-600">
                  Cadastrar
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white"
          >
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden py-4 space-y-4"
          >
            <Link href="/search" className="block text-dark-600 hover:text-white transition">
              Buscar
            </Link>
            <Link href="/how-it-works" className="block text-dark-600 hover:text-white transition">
              Como Funciona
            </Link>
            
            {isAuthenticated ? (
              <>
                <Link href="/dashboard" className="block text-dark-600 hover:text-white transition">
                  Dashboard
                </Link>
                <button onClick={logout} className="block w-full text-left text-dark-600 hover:text-white transition">
                  Sair
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="block text-dark-600 hover:text-white transition">
                  Entrar
                </Link>
                <Link href="/register" className="block text-dark-600 hover:text-white transition">
                  Cadastrar
                </Link>
              </>
            )}
          </motion.div>
        )}
      </div>
    </nav>
  );
}
