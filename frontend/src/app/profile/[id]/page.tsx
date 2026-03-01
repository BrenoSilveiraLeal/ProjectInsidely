'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { FiStar, FiBriefcase, FiDollarSign, FiClock, FiMapPin } from 'react-icons/fi';
import Navbar from '@/components/Navbar';
import api from '@/lib/api';
import { ProfessionalProfile, Review } from '@/types';

export default function ProfilePage() {
  const params = useParams();
  const [profile, setProfile] = useState<ProfessionalProfile | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProfile();
    loadReviews();
  }, [params.id]);

  const loadProfile = async () => {
    try {
      const response = await api.get(`/profiles/${params.id}`);
      setProfile(response.data);
    } catch (error) {
      console.error('Failed to load profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadReviews = async () => {
    try {
      const response = await api.get(`/reviews/${params.id}`);
      setReviews(response.data);
    } catch (error) {
      console.error('Failed to load reviews:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="pt-32 pb-20 px-4">
          <div className="max-w-5xl mx-auto">
            <div className="glass-card p-8 animate-pulse">
              <div className="h-8 bg-dark-200 rounded w-1/3 mb-4" />
              <div className="h-4 bg-dark-200 rounded w-2/3" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="pt-32 pb-20 px-4">
          <div className="max-w-5xl mx-auto text-center">
            <h1 className="text-3xl font-bold">Perfil não encontrado</h1>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="pt-32 pb-20 px-4">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card p-8 mb-8"
          >
            <div className="flex flex-col md:flex-row gap-8">
              <div className="w-32 h-32 bg-gradient-to-br from-primary-500 to-purple-500 rounded-2xl flex items-center justify-center text-5xl font-bold text-white flex-shrink-0">
                {profile.fullName?.charAt(0) || 'P'}
              </div>

              <div className="flex-1">
                <h1 className="text-4xl font-bold mb-2">{profile.fullName}</h1>
                <div className="flex items-center gap-2 text-xl text-dark-500 mb-4">
                  <FiBriefcase />
                  <span>{profile.jobTitle} @ {profile.companyName}</span>
                </div>

                <div className="flex flex-wrap gap-4 mb-6">
                  <div className="flex items-center gap-2">
                    <FiStar className="text-yellow-400 fill-yellow-400" />
                    <span className="font-bold">{profile.averageRating.toFixed(1)}</span>
                    <span className="text-dark-500">({profile.totalReviews} avaliações)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FiClock />
                    <span>{profile.yearsExperience} anos de experiência</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FiMapPin />
                    <span>{profile.region}</span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-3xl font-bold text-primary-400">
                    ${profile.pricePerCall}
                  </div>
                  <button className="glass-button bg-primary-500 hover:bg-primary-600">
                    Agendar Conversa
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="glass-card p-6"
            >
              <h3 className="text-xl font-bold mb-4">Sobre o Trabalho</h3>
              <p className="text-dark-500">{profile.jobDescription}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="glass-card p-6"
            >
              <h3 className="text-xl font-bold mb-4">Ambiente de Trabalho</h3>
              <p className="text-dark-500">{profile.workEnvironment}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="glass-card p-6"
            >
              <h3 className="text-xl font-bold mb-4">Prós</h3>
              <p className="text-dark-500">{profile.pros}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="glass-card p-6"
            >
              <h3 className="text-xl font-bold mb-4">Contras</h3>
              <p className="text-dark-500">{profile.cons}</p>
            </motion.div>
          </div>

          {/* Reviews */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="glass-card p-8"
          >
            <h3 className="text-2xl font-bold mb-6">Avaliações</h3>
            
            {reviews.length > 0 ? (
              <div className="space-y-6">
                {reviews.map((review) => (
                  <div key={review.id} className="border-b border-white/10 pb-6 last:border-0">
                    <div className="flex items-center gap-4 mb-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-purple-500 rounded-full flex items-center justify-center text-lg font-bold">
                        {review.explorerName?.charAt(0) || 'U'}
                      </div>
                      <div>
                        <div className="font-bold">{review.explorerName}</div>
                        <div className="flex items-center gap-1">
                          <FiStar className="text-yellow-400 fill-yellow-400" />
                          <span>{review.overallRating.toFixed(1)}</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-dark-500">{review.comment}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-dark-500 text-center">Nenhuma avaliação ainda</p>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
