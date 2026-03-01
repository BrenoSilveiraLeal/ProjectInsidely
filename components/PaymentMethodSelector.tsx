'use client'

import { useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

interface PaymentMethodProps {
  bookingId: string
  amount: number
  onSuccess: () => void
}

function PaymentForm({ bookingId, amount, onSuccess }: PaymentMethodProps) {
  const stripe = useStripe()
  const elements = useElements()
  const [method, setMethod] = useState<'card' | 'pix'>('card')
  const [loading, setLoading] = useState(false)
  const [pixData, setPixData] = useState<any>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!stripe || !elements) return

    setLoading(true)

    try {
      const res = await fetch('/api/payments/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bookingId, amount, paymentMethod: method })
      })

      const data = await res.json()

      if (method === 'pix') {
        setPixData(data)
      } else {
        const cardElement = elements.getElement(CardElement)
        if (!cardElement) return

        const { error } = await stripe.confirmCardPayment(data.clientSecret, {
          payment_method: { card: cardElement }
        })

        if (!error) {
          onSuccess()
        }
      }
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  if (pixData) {
    return (
      <div className="text-center">
        <h3 className="text-xl font-bold mb-4">Pague com PIX</h3>
        <img src={pixData.pixQrCode} alt="QR Code PIX" className="mx-auto mb-4" />
        <p className="text-sm text-gray-600 mb-2">Escaneie o QR Code ou copie o código:</p>
        <div className="bg-gray-100 p-3 rounded text-xs break-all">
          {pixData.pixCode}
        </div>
        <button
          onClick={() => navigator.clipboard.writeText(pixData.pixCode)}
          className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg"
        >
          Copiar código PIX
        </button>
        <p className="text-xs text-gray-500 mt-4">
          Pagamento expira em 30 minutos
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h3 className="text-xl font-bold mb-4">Escolha a forma de pagamento</h3>
        <div className="flex gap-4 mb-6">
          <button
            type="button"
            onClick={() => setMethod('card')}
            className={`flex-1 p-4 border-2 rounded-lg ${
              method === 'card' ? 'border-blue-600 bg-blue-50' : 'border-gray-200'
            }`}
          >
            💳 Cartão
          </button>
          <button
            type="button"
            onClick={() => setMethod('pix')}
            className={`flex-1 p-4 border-2 rounded-lg ${
              method === 'pix' ? 'border-blue-600 bg-blue-50' : 'border-gray-200'
            }`}
          >
            📱 PIX
          </button>
        </div>
      </div>

      {method === 'card' && (
        <div className="border rounded-lg p-4">
          <CardElement options={{
            style: {
              base: { fontSize: '16px', color: '#424770' }
            }
          }} />
        </div>
      )}

      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="flex justify-between mb-2">
          <span>Valor da conversa:</span>
          <span className="font-semibold">R${amount.toFixed(2)}</span>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading || !stripe}
        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? 'Processando...' : method === 'pix' ? 'Gerar PIX' : 'Pagar com Cartão'}
      </button>
    </form>
  )
}

export default function PaymentMethodSelector(props: PaymentMethodProps) {
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm {...props} />
    </Elements>
  )
}
