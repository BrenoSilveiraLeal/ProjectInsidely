'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FiSearch } from 'react-icons/fi';
import { motion } from 'framer-motion';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <motion.form
      onSubmit={handleSearch}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="max-w-3xl mx-auto"
    >
      <div className="glass-card p-2 flex items-center gap-4">
        <FiSearch className="text-2xl text-dark-500 ml-4" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Busque por profissão, empresa ou cargo..."
          className="flex-1 bg-transparent outline-none text-lg text-white placeholder-dark-500"
        />
        <button
          type="submit"
          className="glass-button bg-primary-500 hover:bg-primary-600 whitespace-nowrap"
        >
          Buscar
        </button>
      </div>
    </motion.form>
  );
}
