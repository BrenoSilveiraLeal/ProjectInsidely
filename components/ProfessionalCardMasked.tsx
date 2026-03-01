'use client'

interface ProfessionalCardMaskedProps {
  id: string
  name: string
  jobTitle: string
  company: string
  yearsExperience: number
  pricePerCall: number
  rating: number
  totalReviews: number
  isFeatured?: boolean
}

function maskName(fullName: string): string {
  const parts = fullName.trim().split(' ')
  if (parts.length === 1) return parts[0]
  
  const firstName = parts[0]
  const lastInitial = parts[parts.length - 1][0]
  
  return `${firstName} ${lastInitial}.`
}

export default function ProfessionalCardMasked({
  id,
  name,
  jobTitle,
  company,
  yearsExperience,
  pricePerCall,
  rating,
  totalReviews,
  isFeatured
}: ProfessionalCardMaskedProps) {
  const maskedName = maskName(name)
  
  return (
    <div className={`border rounded-lg p-6 hover:shadow-lg transition ${
      isFeatured ? 'border-yellow-400 bg-yellow-50' : 'border-gray-200'
    }`}>
      {isFeatured && (
        <span className="bg-yellow-400 text-black px-2 py-1 rounded text-xs font-semibold">
          ⭐ Destaque
        </span>
      )}
      
      <div className="mt-4">
        <h3 className="text-xl font-bold">{maskedName}</h3>
        <p className="text-gray-600">{jobTitle} — {company}</p>
        <p className="text-sm text-gray-500 mt-1">
          {yearsExperience} anos de experiência
        </p>
      </div>
      
      <div className="flex items-center mt-3">
        <span className="text-yellow-500">★</span>
        <span className="ml-1 font-semibold">{rating.toFixed(1)}</span>
        <span className="text-gray-500 text-sm ml-1">
          ({totalReviews} avaliações)
        </span>
      </div>
      
      <div className="mt-4 flex items-center justify-between">
        <div>
          <span className="text-2xl font-bold text-green-600">
            R${pricePerCall}
          </span>
          <span className="text-gray-500 text-sm">/30min</span>
        </div>
        
        <button
          onClick={() => window.location.href = `/professional/${id}`}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
        >
          Ver perfil
        </button>
      </div>
    </div>
  )
}
