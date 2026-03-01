'use client';

import { motion } from 'framer-motion';
import { FiStar, FiMapPin, FiBriefcase } from 'react-icons/fi';
import { ProfessionalProfile } from '@/types';
import Link from 'next/link';

interface Props {
  professional: ProfessionalProfile;
}

export default function ProfessionalCard({ professional }: Props) {
  return (
    <Link href={`/profile/${professional.id}`}>
      <motion.div
        whileHover={{ scale: 1.05 }}
        className="glass-card p-6 card-hover cursor-pointer"
      >
        {/* Profile Picture */}
        <div className="relative mb-4">
          <div className="w-full h-48 bg-gradient-to-br from-primary-500 to-purple-500 rounded-lg flex items-center justify-center text-4xl font-bold text-white">
            {professional.fullName?.charAt(0) || 'P'}
          </div>
          {professional.companyLogo && (
            <img
              src={professional.companyLogo}
              alt={professional.companyName}
              className="absolute bottom-2 right-2 w-12 h-12 rounded-lg bg-white p-1"
            />
          )}
        </div>

        {/* Info */}
        <h3 className="text-xl font-bold mb-2 truncate">{professional.fullName}</h3>
        
        <div className="flex items-center gap-2 text-sm text-dark-500 mb-2">
          <FiBriefcase />
          <span className="truncate">{professional.jobTitle}</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-dark-500 mb-4">
          <span className="truncate">{professional.companyName}</span>
        </div>

        {/* Rating */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <FiStar className="text-yellow-400 fill-yellow-400" />
            <span className="font-bold">{professional.averageRating.toFixed(1)}</span>
            <span className="text-sm text-dark-500">({professional.totalReviews})</span>
          </div>
          <div className="text-primary-400 font-bold">
            ${professional.pricePerCall}
          </div>
        </div>

        {/* Experience */}
        <div className="mt-4 pt-4 border-t border-white/10">
          <span className="text-sm text-dark-500">
            {professional.yearsExperience} anos de experiência
          </span>
        </div>
      </motion.div>
    </Link>
  );
}
