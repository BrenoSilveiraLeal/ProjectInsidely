export interface User {
  id: number;
  email: string;
  userType: 'professional' | 'explorer';
  fullName: string;
  profilePicture?: string;
  region?: string;
  verified: boolean;
  createdAt: string;
}

export interface Company {
  id: number;
  name: string;
  logoUrl?: string;
  industry?: string;
  description?: string;
  reputationScore: number;
}

export interface Profession {
  id: number;
  title: string;
  category?: string;
  trendingScore: number;
}

export interface ProfessionalProfile {
  id: number;
  userId: number;
  companyId: number;
  professionId: number;
  jobTitle: string;
  yearsExperience: number;
  salaryRangeMin?: number;
  salaryRangeMax?: number;
  jobDescription?: string;
  workEnvironment?: string;
  managerRelationship?: string;
  dailyTasks?: string;
  workLifeBalance?: number;
  pros?: string;
  cons?: string;
  pricePerCall: number;
  communicationTypes: string[];
  averageRating: number;
  totalReviews: number;
  totalCalls: number;
  isActive: boolean;
  fullName?: string;
  profilePicture?: string;
  region?: string;
  companyName?: string;
  companyLogo?: string;
  professionTitle?: string;
}

export interface Booking {
  id: number;
  explorerId: number;
  professionalId: number;
  bookingDate: string;
  startTime: string;
  endTime: string;
  communicationType: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  meetingLink?: string;
  notes?: string;
  createdAt: string;
}

export interface Payment {
  id: number;
  bookingId: number;
  explorerId: number;
  professionalId: number;
  amount: number;
  stripePaymentId?: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  createdAt: string;
}

export interface Review {
  id: number;
  bookingId: number;
  explorerId: number;
  professionalId: number;
  honestyRating: number;
  helpfulnessRating: number;
  accuracyRating: number;
  overallRating: number;
  comment?: string;
  createdAt: string;
  explorerName?: string;
  explorerPicture?: string;
}

export interface SearchFilters {
  search?: string;
  companyId?: number;
  professionId?: number;
  minSalary?: number;
  maxSalary?: number;
  minExperience?: number;
  maxExperience?: number;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  lat?: number;
  lng?: number;
  radius?: number;
  page?: number;
  limit?: number;
}
