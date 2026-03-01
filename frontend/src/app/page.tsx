'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FiSearch, FiTrendingUp, FiUsers, FiStar } from 'react-icons/fi';
import Navbar from '@/components/Navbar';
import SearchBar from '@/components/SearchBar';
import ProfessionalCard from '@/components/ProfessionalCard';
import { useLocationStore } from '@/store';
import api from '@/lib/api';
import { ProfessionalProfile } from '@/types';

export default function Home() {
  const [professionals, setProfessionals] = useState<ProfessionalProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const { setLocation } = useLocationStore();

  useEffect(() => {
    // Get user location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setLocation(latitude, longitude, 'Unknown');
          loadProfessionals(latitude, longitude);
        },
        () => {
          loadProfessionals();
        }
      );
    } else {
      loadProfessionals();
    }
  }, []);

  const loadProfessionals = async (lat?: number, lng?: number) => {
    try {
      const params: any = { limit: 8 };
      if (lat && lng) {
        params.lat = lat;
        params.lng = lng;
      }
      const response = await api.get('/profiles/search', { params });
      setProfessionals(response.data);
    } catch (error) {
      console.error('Failed to load professionals:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-600/20 via-purple-600/20 to-pink-600/20 blur-3xl" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-6xl md:text-7xl font-bold mb-6">
              <span className="gradient-text">Descubra</span> sua próxima
              <br />
              carreira com quem vive ela
            </h1>
            
            <p className="text-xl text-dark-500 mb-12 max-w-2xl mx-auto">
              Converse diretamente com profissionais que trabalham nas empresas e cargos dos seus sonhos
            </p>

            <SearchBar />
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: FiUsers, label: 'Profissionais', value: '10,000+' },
              { icon: FiTrendingUp, label: 'Empresas', value: '500+' },
              { icon: FiStar, label: 'Avaliações', value: '50,000+' },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="glass-card p-8 text-center"
              >
                <stat.icon className="w-12 h-12 mx-auto mb-4 text-primary-400" />
                <div className="text-4xl font-bold gradient-text mb-2">{stat.value}</div>
                <div className="text-dark-500">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Professionals */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-4xl font-bold">
              Profissionais em <span className="gradient-text">Destaque</span>
            </h2>
            <a href="/search" className="glass-button">
              Ver todos
            </a>
          </div>

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
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {professionals.map((professional) => (
                <ProfessionalCard key={professional.id} professional={professional} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">
            Como <span className="gradient-text">Funciona</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Busque Profissionais',
                description: 'Encontre pessoas que trabalham na empresa ou cargo que você deseja',
              },
              {
                step: '02',
                title: 'Agende uma Conversa',
                description: 'Escolha o melhor horário e tipo de comunicação para você',
              },
              {
                step: '03',
                title: 'Obtenha Insights',
                description: 'Converse e descubra a realidade da profissão direto da fonte',
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.2 }}
                viewport={{ once: true }}
                className="glass-card p-8 relative"
              >
                <div className="text-6xl font-bold gradient-text opacity-20 absolute top-4 right-4">
                  {item.step}
                </div>
                <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                <p className="text-dark-500">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass-card p-12"
          >
            <h2 className="text-4xl font-bold mb-6">
              Pronto para descobrir sua próxima carreira?
            </h2>
            <p className="text-xl text-dark-500 mb-8">
              Junte-se a milhares de pessoas que já encontraram seu caminho
            </p>
            <div className="flex gap-4 justify-center">
              <a href="/register" className="glass-button bg-primary-500 hover:bg-primary-600">
                Começar Agora
              </a>
              <a href="/search" className="glass-button">
                Explorar Profissionais
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
