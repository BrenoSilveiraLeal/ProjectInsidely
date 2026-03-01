export default function TermsOfService() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8">Termos de Uso - Insidely</h1>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">1. Política de Contato</h2>
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
          <p className="font-semibold">⚠️ IMPORTANTE</p>
          <p className="mt-2">
            Não é permitido compartilhar contatos externos (telefone, email, WhatsApp, 
            Instagram, LinkedIn ou outras redes sociais) antes da primeira conversa agendada 
            através da plataforma.
          </p>
        </div>
        
        <p className="text-gray-700 mb-3">
          A Insidely mantém a plataforma segura e confiável para todos os usuários. 
          Para isso, monitoramos as conversas em busca de tentativas de evasão da plataforma.
        </p>
        
        <h3 className="font-semibold mt-4 mb-2">Consequências de Violação:</h3>
        <ul className="list-disc ml-6 space-y-2 text-gray-700">
          <li>Primeira violação: Advertência formal</li>
          <li>Segunda violação: Suspensão temporária (7 dias)</li>
          <li>Terceira violação: Suspensão permanente da conta</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">2. Sistema de Chat</h2>
        <p className="text-gray-700 mb-3">
          O chat gratuito permite até 5 mensagens antes de exigir o agendamento de uma conversa. 
          Após a primeira conversa paga, o chat se torna ilimitado entre você e o profissional.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">3. Comissão da Plataforma</h2>
        <p className="text-gray-700 mb-3">
          A Insidely cobra uma comissão de 30% sobre cada conversa agendada. 
          Esta comissão cobre os custos de manutenção da plataforma, suporte ao cliente, 
          processamento de pagamentos e garantia de qualidade.
        </p>
        
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="font-semibold mb-2">Exemplo de Distribuição:</p>
          <ul className="space-y-1 text-sm">
            <li>• Valor pago pelo usuário: R$150</li>
            <li>• Profissional recebe: R$105 (70%)</li>
            <li>• Insidely recebe: R$45 (30%)</li>
          </ul>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">4. Assinaturas</h2>
        <p className="text-gray-700 mb-3">
          Os planos de assinatura são cobrados mensalmente e renovados automaticamente. 
          O limite de conversas é resetado no início de cada ciclo de cobrança.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">5. Reembolsos</h2>
        <p className="text-gray-700 mb-3">
          Reembolsos são concedidos apenas em casos de:
        </p>
        <ul className="list-disc ml-6 space-y-2 text-gray-700">
          <li>Profissional não compareceu à conversa agendada</li>
          <li>Problemas técnicos graves que impediram a conversa</li>
          <li>Violação dos termos de uso pelo profissional</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">6. Privacidade</h2>
        <p className="text-gray-700 mb-3">
          Para proteger a privacidade dos profissionais, exibimos apenas o primeiro nome 
          e a inicial do sobrenome até que a primeira conversa seja agendada.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">7. Conduta Esperada</h2>
        <ul className="list-disc ml-6 space-y-2 text-gray-700">
          <li>Respeito mútuo entre usuários e profissionais</li>
          <li>Pontualidade nas conversas agendadas</li>
          <li>Honestidade nas avaliações</li>
          <li>Uso adequado da plataforma</li>
        </ul>
      </section>

      <div className="mt-12 p-6 bg-gray-100 rounded-lg">
        <p className="text-sm text-gray-600">
          Última atualização: {new Date().toLocaleDateString('pt-BR')}
        </p>
        <p className="text-sm text-gray-600 mt-2">
          Ao usar a Insidely, você concorda com estes termos de uso.
        </p>
      </div>
    </div>
  )
}
