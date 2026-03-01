'use client'

import { useState } from 'react'
import Navbar from '@/components/Navbar'
import { ChevronDown } from 'lucide-react'

const faqs = [
  {
    question: 'Como funciona a Insidely?',
    answer: 'A Insidely conecta você com profissionais que trabalham em empresas e áreas que você tem interesse. Você pode agendar conversas por vídeo para entender melhor a rotina, cultura e ambiente de trabalho antes de tomar decisões de carreira.'
  },
  {
    question: 'Quanto custa uma conversa?',
    answer: 'Os valores variam de acordo com o profissional e sua experiência, geralmente entre R$45 e R$250 por 30 minutos. Você também pode assinar um plano mensal com conversas incluídas.'
  },
  {
    question: 'Como funciona o pagamento?',
    answer: 'Aceitamos pagamento por cartão de crédito/débito e PIX. Para conversas avulsas, você escolhe o método na hora do pagamento. Para assinaturas, o pagamento é recorrente no cartão.'
  },
  {
    question: 'Posso cancelar uma conversa agendada?',
    answer: 'Sim, você pode cancelar até 24 horas antes do horário agendado e receber reembolso total. Cancelamentos com menos de 24 horas não são reembolsáveis.'
  },
  {
    question: 'Como funcionam os planos de assinatura?',
    answer: 'Temos 3 planos: Explorer (R$29/mês - 3 conversas), Career Pro (R$59/mês - 6 conversas) e Premium (R$99/mês - 10 conversas). As conversas não utilizadas não acumulam para o próximo mês.'
  },
  {
    question: 'Os profissionais são verificados?',
    answer: 'Sim, todos os profissionais passam por um processo de verificação onde confirmamos sua identidade e vínculo com a empresa informada.'
  },
  {
    question: 'Posso me tornar um profissional na plataforma?',
    answer: 'Sim! Basta criar uma conta, completar seu perfil profissional e aguardar a verificação. Você define seu próprio preço por conversa.'
  },
  {
    question: 'As conversas são gravadas?',
    answer: 'Não, as conversas não são gravadas. Valorizamos a privacidade e confidencialidade de todos os usuários.'
  },
  {
    question: 'Posso trocar mensagens antes de agendar?',
    answer: 'Sim, você pode enviar até 5 mensagens gratuitas para o profissional. Após isso, é necessário agendar uma conversa para continuar.'
  },
  {
    question: 'Como funciona o reembolso?',
    answer: 'Reembolsos são concedidos em casos de: profissional não compareceu, problemas técnicos graves ou violação dos termos. O valor é devolvido em até 7 dias úteis.'
  }
]

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <main className="min-h-screen pt-20">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center mb-4">Perguntas Frequentes</h1>
        <p className="text-center text-gray-400 mb-12">
          Encontre respostas para as dúvidas mais comuns
        </p>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="glass rounded-xl overflow-hidden">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full p-6 text-left flex items-center justify-between hover:bg-white/5 transition"
              >
                <span className="font-semibold text-lg">{faq.question}</span>
                <ChevronDown
                  className={`transition-transform ${openIndex === index ? 'rotate-180' : ''}`}
                  size={20}
                />
              </button>
              
              {openIndex === index && (
                <div className="px-6 pb-6 text-gray-400">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
