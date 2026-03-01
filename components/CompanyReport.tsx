'use client'

import { useState } from 'react'

interface CompanyReportProps {
  reportId: string
  title: string
  companyName: string
  price: number
  purchases: number
}

export default function CompanyReport({
  reportId,
  title,
  companyName,
  price,
  purchases
}: CompanyReportProps) {
  const [loading, setLoading] = useState(false)
  const [purchased, setPurchased] = useState(false)

  const handlePurchase = async () => {
    setLoading(true)
    
    try {
      const res = await fetch('/api/reports/purchase', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reportId })
      })
      
      if (res.ok) {
        setPurchased(true)
      }
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="border rounded-lg p-6 hover:shadow-lg transition">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="text-xl font-bold">{title}</h3>
          <p className="text-gray-600 mt-1">{companyName}</p>
          
          <div className="mt-4 space-y-2 text-sm text-gray-700">
            <p>✓ Salário médio</p>
            <p>✓ Cultura da empresa</p>
            <p>✓ Carga de trabalho</p>
            <p>✓ Nível de estresse</p>
            <p>✓ Relatos de profissionais</p>
          </div>
          
          <p className="text-xs text-gray-500 mt-3">
            {purchases} pessoas compraram
          </p>
        </div>
        
        <div className="text-right">
          <div className="text-2xl font-bold text-green-600">
            R${price.toFixed(2)}
          </div>
          
          {purchased ? (
            <button
              disabled
              className="mt-4 bg-gray-300 text-gray-600 px-6 py-2 rounded-lg cursor-not-allowed"
            >
              Comprado ✓
            </button>
          ) : (
            <button
              onClick={handlePurchase}
              disabled={loading}
              className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Processando...' : 'Comprar'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
