'use client'

import { useState } from 'react'
import { MessageCircle, X, Send, Bot } from 'lucide-react'

const botResponses: Record<string, string> = {
  'ola': 'Olá! 👋 Como posso ajudar você hoje?',
  'oi': 'Oi! 👋 Como posso ajudar você hoje?',
  'ajuda': 'Posso ajudar com: preços, como funciona, pagamentos, cancelamentos. O que você precisa?',
  'preco': 'Os preços variam de R$45 a R$250 por conversa de 30min. Temos também planos mensais a partir de R$29.',
  'plano': 'Temos 3 planos: Explorer (R$29 - 3 conversas), Career Pro (R$59 - 6 conversas) e Premium (R$99 - 10 conversas).',
  'pagamento': 'Aceitamos cartão de crédito/débito e PIX para conversas avulsas. Assinaturas são apenas no cartão.',
  'cancelar': 'Você pode cancelar até 24h antes e receber reembolso total. Menos de 24h não é reembolsável.',
  'funciona': 'Busque profissionais, agende uma conversa, pague e converse por vídeo! Simples assim. 🚀',
  'profissional': 'Para ser profissional, crie uma conta, complete seu perfil e envie comprovação de vínculo com a empresa.',
}

export default function SupportButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState<Array<{text: string, isBot: boolean}>>([{
    text: 'Olá! 👋 Sou o assistente virtual da Insidely. Como posso ajudar?',
    isBot: true
  }])

  const handleSend = () => {
    if (!message.trim()) return

    const userMessage = message.trim()
    setMessages(prev => [...prev, { text: userMessage, isBot: false }])
    setMessage('')

    setTimeout(() => {
      const lowerMessage = userMessage.toLowerCase()
      let botResponse = 'Desculpe, não entendi. Digite "ajuda" para ver o que posso fazer ou fale com um atendente humano.'
      
      for (const [key, response] of Object.entries(botResponses)) {
        if (lowerMessage.includes(key)) {
          botResponse = response
          break
        }
      }

      setMessages(prev => [...prev, { text: botResponse, isBot: true }])
    }, 500)
  }

  return (
    <>
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 glass rounded-2xl shadow-2xl z-50 overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Bot size={20} />
              </div>
              <div>
                <h3 className="font-bold">Assistente Insidely</h3>
                <p className="text-xs opacity-90">Resposta instantânea</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-white/20 p-1 rounded"
            >
              <X size={20} />
            </button>
          </div>

          <div className="p-4 h-80 overflow-y-auto space-y-3">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    msg.isBot
                      ? 'bg-white/10'
                      : 'bg-gradient-to-r from-indigo-600 to-purple-600'
                  }`}
                >
                  <p className="text-sm">{msg.text}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 border-t border-white/10">
            <div className="flex gap-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Digite sua mensagem..."
                className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm outline-none focus:border-indigo-500"
              />
              <button
                onClick={handleSend}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 p-2 rounded-lg hover:opacity-90 transition"
              >
                <Send size={20} />
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">
              Palavras-chave: ajuda, preço, plano, pagamento, cancelar
            </p>
          </div>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform z-50"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>
    </>
  )
}
