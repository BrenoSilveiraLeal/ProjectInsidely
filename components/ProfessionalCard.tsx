'use client'

import { useRef } from 'react'
import anime from 'animejs'
import { Star, MapPin, Clock, Briefcase } from 'lucide-react'
import Link from 'next/link'
import { useLanguage } from '@/lib/LanguageContext'

interface ProfessionalCardProps {
  id: string
  name: string
  jobTitle: string
  company: string
  location: string
  yearsExperience: number
  pricePerCall: number
  rating: number
  totalReviews: number
  image?: string
  available?: boolean
}

export default function ProfessionalCard({
  id,
  name,
  jobTitle,
  company,
  location,
  yearsExperience,
  pricePerCall,
  rating,
  totalReviews,
  image,
  available = true,
}: ProfessionalCardProps) {
  const { t } = useLanguage()
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseEnter = () => {
    anime({
      targets: cardRef.current,
      translateY: -8,
      scale: 1.02,
      boxShadow: '0 25px 50px rgba(99, 102, 241, 0.3)',
      duration: 300,
      easing: 'easeOutQuad'
    })
  }

  const handleMouseLeave = () => {
    anime({
      targets: cardRef.current,
      translateY: 0,
      scale: 1,
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      duration: 300,
      easing: 'easeOutQuad'
    })
  }

  return (
    <Link href={`/professional/${id}`}>
      <div
        ref={cardRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="glass rounded-2xl p-6 hover:bg-white/10 transition-all cursor-pointer h-full group"
      >
        <div className="flex justify-between items-start mb-4">
          <div className="text-5xl">{image || '👤'}</div>
          {available && (
            <span className="flex items-center gap-1 text-xs text-green-400 glass px-2 py-1 rounded-full">
              <Clock size={12} />
              {t('available')}
            </span>
          )}
        </div>
        
        <h3 className="font-bold text-lg mb-1 hover:text-indigo-400 transition">
          {name}
        </h3>
        <p className="text-sm text-gray-400 mb-1">{jobTitle}</p>
        <p className="text-sm text-indigo-400 mb-3">{company}</p>
        
        <div className="flex items-center gap-1 text-sm text-gray-400 mb-2">
          <MapPin size={14} />
          {location}
        </div>
        
        <div className="flex items-center gap-1 text-sm text-gray-400 mb-4">
          <Briefcase size={14} />
          {yearsExperience} {t('years')}
        </div>
        
        <div className="flex items-center justify-between pt-4 border-t border-white/10">
          <div className="flex items-center gap-1">
            <Star size={16} className="text-yellow-400 fill-yellow-400" />
            <span className="font-medium">{rating.toFixed(1)}</span>
            <span className="text-sm text-gray-400">({totalReviews})</span>
          </div>
          <div className="text-lg font-bold">
            R${pricePerCall}
            <span className="text-sm text-gray-400">/30min</span>
          </div>
        </div>
      </div>
    </Link>
  )
}
