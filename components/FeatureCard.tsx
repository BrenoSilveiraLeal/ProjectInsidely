'use client'

import { motion } from 'framer-motion'
import { LucideIcon } from 'lucide-react'
import AnimatedIcon from './AnimatedIcon'

interface FeatureCardProps {
  Icon: LucideIcon
  title: string
  description: string
  glowColor?: string
}

export default function FeatureCard({ Icon, title, description, glowColor = '#6366f1' }: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      whileHover={{ scale: 1.05, y: -10 }}
      className="glass p-8 rounded-2xl relative overflow-hidden group"
    >
      {/* Glow effect on hover */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"
        style={{ background: `radial-gradient(circle at center, ${glowColor}20, transparent 70%)` }}
      />
      
      <div className="relative z-10">
        <div className="mb-6">
          <AnimatedIcon Icon={Icon} size={48} glowColor={glowColor} />
        </div>
        
        <h3 className="text-2xl font-bold mb-3 text-white">{title}</h3>
        <p className="text-gray-400 leading-relaxed">{description}</p>
      </div>
    </motion.div>
  )
}
