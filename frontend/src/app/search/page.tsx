'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import ProfessionalCard from '@/components/ProfessionalCard';
import SearchBar from '@/components/SearchBar';
import api from '@/lib/api';
import { ProfessionalProfile } from '@/types';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const [professionals, setProfessionals] = useState<ProfessionalProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    minPrice: '',
    maxPrice: '',
    minRating: '',
    minExperience: '',
  });

  useEffect(() => {
    loadProfessionals();
  }, [searchParams]);

  const loadProfessionals = async () => {
    try {
      setLoading(true);
      const query = searchParams.get('q');
      const params: any = { limit: 20 };
      
      if (query) params.search = query;
      if (filters.minPrice) params.minPrice = filters.minPrice;
      if (filters.maxPrice) params.maxPrice = filters.maxPrice;
      if (filters.minRating) params.minRating = filters.minRating;
      if (filters.minExperience) params.minExperience = filters.minExperience;

      const response = await api.get('/profiles/search', { params });
      setProfessionals(response.data);
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <SearchBar />

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card p-6 mt-8"
          >
            <h3 className="text-xl font-bold mb-4">Filtros</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <input
                type="number"
                placeholder="Preço mínimo"
                value={filters.minPrice}
                onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
                className="bg-dark-100 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-primary-500"
              />
              <input
                type="number"
                placeholder="Preço máximo"
                value={filters.maxPrice}
                onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
                className="bg-dark-100 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-primary-500"
              />
              <input
                type="number"
                placeholder="Avaliação mínima"
                value={filters.minRating}
                onChange={(e) => setFilters({ ...filters, minRating: e.target.value })}
                className="bg-dark-100 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-primary-500"
              />
              <input
                type="number"
                placeholder="Experiência mínima"
                value={filters.minExperience}
                onChange={(e) => setFilters({ ...filters, minExperience: e.target.value })}
                className="bg-dark-100 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <button
              onClick={loadProfessionals}
              className="glass-button bg-primary-500 hover:bg-primary-600 mt-4"
            >
              Aplicar Filtros
            </button>
          </motion.div>

          {/* Results */}
          <div className="mt-12">
            <h2 className="text-3xl font-bold mb-8">
              {professionals.length} profissionais encontrados
            </h2>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[...Array(8)].map((_, idx) => (
                  <div key={idx} className="glass-card p-6 animate-pulse">
                    <div className="w-full h-48 bg-dark-200 rounded-lg mb-4" />
                    <div className="h-4 bg-dark-200 rounded mb-2" />
                    <div className="h-4 bg-dark-200 rounded w-2/3" />
                  </div>
                ))}
              </div>
            ) : professionals.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {professionals.map((professional) => (
                  <ProfessionalCard key={professional.id} professional={professional} />
                ))}
              </div>
            ) : (
              <div className="glass-card p-12 text-center">
                <p className="text-xl text-dark-500">Nenhum profissional encontrado</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
