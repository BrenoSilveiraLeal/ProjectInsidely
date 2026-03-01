'use client'

import { useState, useEffect } from 'react'
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react'

type ToastType = 'success' | 'error' | 'info'

interface Toast {
  id: number
  message: string
  type: ToastType
}

let toastId = 0
let addToastFn: ((message: string, type: ToastType) => void) | null = null

export const toast = {
  success: (message: string) => addToastFn?.(message, 'success'),
  error: (message: string) => addToastFn?.(message, 'error'),
  info: (message: string) => addToastFn?.(message, 'info')
}

export default function ToastContainer() {
  const [toasts, setToasts] = useState<Toast[]>([])

  useEffect(() => {
    addToastFn = (message: string, type: ToastType) => {
      const id = toastId++
      setToasts(prev => [...prev, { id, message, type }])
      setTimeout(() => removeToast(id), 5000)
    }
  }, [])

  const removeToast = (id: number) => {
    setToasts(prev => prev.filter(t => t.id !== id))
  }

  const icons = {
    success: <CheckCircle size={20} className="text-green-500" />,
    error: <AlertCircle size={20} className="text-red-500" />,
    info: <Info size={20} className="text-blue-500" />
  }

  return (
    <div className="fixed top-4 right-4 z-[9999] space-y-2 max-w-md">
      {toasts.map(toast => (
        <div
          key={toast.id}
          className="glass rounded-lg p-4 flex items-start gap-3 shadow-2xl animate-in slide-in-from-right border-l-4 ${toast.type === 'success' ? 'border-green-500' : toast.type === 'error' ? 'border-red-500' : 'border-blue-500'}"
        >
          <div className="flex-shrink-0 mt-0.5">
            {icons[toast.type]}
          </div>
          <p className="flex-1 text-sm leading-relaxed break-words">{toast.message}</p>
          <button 
            onClick={() => removeToast(toast.id)}
            className="flex-shrink-0 hover:bg-white/10 rounded p-1 transition"
          >
            <X size={16} />
          </button>
        </div>
      ))}
    </div>
  )
}
