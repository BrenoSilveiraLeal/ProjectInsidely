'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FiCalendar, FiDollarSign, FiStar, FiUser } from 'react-icons/fi';
import Navbar from '@/components/Navbar';
import { useAuthStore } from '@/store';
import api from '@/lib/api';
import { Booking, Payment } from '@/types';

export default function DashboardPage() {
  const { user } = useAuthStore();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [bookingsRes, paymentsRes] = await Promise.all([
        api.get('/bookings'),
        api.get('/payments/history'),
      ]);
      setBookings(bookingsRes.data);
      setPayments(paymentsRes.data);
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const totalEarnings = payments
    .filter(p => p.status === 'completed')
    .reduce((sum, p) => sum + Number(p.amount), 0);

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <h1 className="text-4xl font-bold mb-2">
              Olá, <span className="gradient-text">{user?.fullName}</span>
            </h1>
            <p className="text-dark-500">
              {user?.userType === 'professional' ? 'Gerencie seus agendamentos e ganhos' : 'Acompanhe suas conversas agendadas'}
            </p>
          </motion.div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="glass-card p-6"
            >
              <FiCalendar className="w-8 h-8 text-primary-400 mb-3" />
              <div className="text-3xl font-bold mb-1">{bookings.length}</div>
              <div className="text-dark-500">Agendamentos</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="glass-card p-6"
            >
              <FiDollarSign className="w-8 h-8 text-green-400 mb-3" />
              <div className="text-3xl font-bold mb-1">${totalEarnings.toFixed(2)}</div>
              <div className="text-dark-500">
                {user?.userType === 'professional' ? 'Ganhos' : 'Gastos'}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="glass-card p-6"
            >
              <FiStar className="w-8 h-8 text-yellow-400 mb-3" />
              <div className="text-3xl font-bold mb-1">
                {bookings.filter(b => b.status === 'completed').length}
              </div>
              <div className="text-dark-500">Completados</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="glass-card p-6"
            >
              <FiUser className="w-8 h-8 text-purple-400 mb-3" />
              <div className="text-3xl font-bold mb-1">
                {bookings.filter(b => b.status === 'pending').length}
              </div>
              <div className="text-dark-500">Pendentes</div>
            </motion.div>
          </div>

          {/* Bookings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="glass-card p-8"
          >
            <h2 className="text-2xl font-bold mb-6">Próximos Agendamentos</h2>
            
            {loading ? (
              <div className="space-y-4">
                {[...Array(3)].map((_, idx) => (
                  <div key={idx} className="bg-dark-100 rounded-lg p-4 animate-pulse">
                    <div className="h-4 bg-dark-200 rounded w-1/3 mb-2" />
                    <div className="h-4 bg-dark-200 rounded w-2/3" />
                  </div>
                ))}
              </div>
            ) : bookings.length > 0 ? (
              <div className="space-y-4">
                {bookings.map((booking) => (
                  <div key={booking.id} className="bg-dark-100 rounded-lg p-6 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-lg mb-1">
                        {new Date(booking.bookingDate).toLocaleDateString('pt-BR')}
                      </div>
                      <div className="text-dark-500">
                        {booking.startTime} - {booking.endTime}
                      </div>
                      <div className="mt-2">
                        <span className={`px-3 py-1 rounded-full text-sm ${
                          booking.status === 'confirmed' ? 'bg-green-500/20 text-green-400' :
                          booking.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                          booking.status === 'completed' ? 'bg-blue-500/20 text-blue-400' :
                          'bg-red-500/20 text-red-400'
                        }`}>
                          {booking.status}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {booking.status === 'confirmed' && booking.meetingLink && (
                        <a
                          href={booking.meetingLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="glass-button bg-primary-500 hover:bg-primary-600"
                        >
                          Entrar na Chamada
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-dark-500 text-center py-8">Nenhum agendamento ainda</p>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
