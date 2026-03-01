export interface Professional {
  id: string
  name: string
  jobTitle: string
  company: string
  yearsExperience: number
  location: string
  bio: string
  pricePerCall: number
  rating: number
  totalReviews: number
  image?: string
  available: boolean
}

export interface SearchFilters {
  profession?: string
  company?: string
  salaryRange?: string
  location?: string
  minExperience?: number
  maxPrice?: number
  minRating?: number
}

export interface BookingData {
  professionalId: string
  profileId: string
  scheduledAt: Date
  duration: number
  notes?: string
}

export interface ReviewData {
  bookingId: string
  rating: number
  honesty: number
  helpfulness: number
  accuracy: number
  comment?: string
}
