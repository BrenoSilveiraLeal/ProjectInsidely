'use client'

import { useState, useEffect } from 'react'

interface ChatProps {
  professionalId: string
  professionalName: string
}

export default function Chat({ professionalId, professionalName }: ChatProps) {
  const [messages, setMessages] = useState<any[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [remaining, setRemaining] = useState(5)
  const [limitReached, setLimitReached] = useState(false)
  const [blocked, setBlocked] = useState(false)

  useEffect(() => {
    loadMessages()
  }, [professionalId])

  const loadMessages = async () => {
    const res = await fetch(`/api/chat?userId=${professionalId}`)
    const data = await res.json()
    setMessages(data.messages || [])
  }

  const sendMessage = async () => {
    if (!newMessage.trim()) return

    setBlocked(false)
    setLimitReached(false)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          receiverId: professionalId,
          content: newMessage
        })
      })

      const data = await res.json()

      if (data.blocked) {
        setBlocked(true)
        return
      }

      if (data.limitReached) {
        setLimitReached(true)
        return
      }

      setMessages([...messages, data.message])
      setRemaining(data.remaining)
      setNewMessage('')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="flex flex-col h-[600px] border rounded-lg">
      <div className="bg-gray-100 p-4 border-b">
        <h3 className="font-semibold">{professionalName}</h3>
        {remaining >= 0 && (
          <p className="text-sm text-gray-600">
            {remaining} mensagens restantes antes de agendar
          </p>
        )}
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`p-3 rounded-lg max-w-[70%] ${
              msg.senderId === professionalId
                ? 'bg-gray-200'
                : 'bg-blue-500 text-white ml-auto'
            }`}
          >
            {msg.content}
          </div>
        ))}
      </div>

      {limitReached ? (
        <div className="p-4 bg-yellow-50 border-t">
          <p className="text-center mb-3">
            Para continuar a conversa, agende uma call
          </p>
          <button className="w-full bg-blue-600 text-white py-2 rounded-lg">
            Agendar conversa
          </button>
        </div>
      ) : (
        <div className="p-4 border-t">
          {blocked && (
            <p className="text-red-500 text-sm mb-2">
              ⚠️ Não é permitido compartilhar contatos externos
            </p>
          )}
          <div className="flex gap-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Digite sua mensagem..."
              className="flex-1 border rounded-lg px-4 py-2"
            />
            <button
              onClick={sendMessage}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg"
            >
              Enviar
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
