# Insidely

Plataforma que conecta profissionais com exploradores de carreira.

## 🚀 Como Rodar Localmente

### 1. Instalar Dependências

```bash
cd "C:\N faço ideia"
npm install
```

### 2. Configurar Banco de Dados

Crie um banco PostgreSQL e configure a URL no arquivo `.env`:

```bash
copy .env.example .env
```

Edite o `.env` e adicione sua DATABASE_URL:

```
DATABASE_URL="postgresql://user:password@localhost:5432/insidely"
```

### 3. Rodar Migrações do Prisma

```bash
npx prisma generate
npx prisma migrate dev --name init
```

### 4. (Opcional) Popular Banco com Dados de Teste

```bash
npx prisma db seed
```

### 5. Rodar o Projeto

```bash
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000)

## 📦 Stack Tecnológica

- **Frontend**: Next.js 14 (App Router), React 18, TailwindCSS
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL + Prisma ORM
- **Auth**: NextAuth.js (Email + Google)
- **Payments**: Stripe
- **Animations**: Framer Motion

## 📁 Estrutura do Projeto

```
/app              - Páginas e rotas (Next.js App Router)
  /api            - API routes
  /auth           - Páginas de autenticação
  /dashboard      - Dashboards de usuários
  /professional   - Perfis de profissionais
/components       - Componentes React reutilizáveis
/lib              - Utilitários (Prisma, Auth)
/prisma           - Schema e migrações do banco
/types            - Tipos TypeScript
```

## 🔑 Variáveis de Ambiente

Copie `.env.example` para `.env` e configure:

- `DATABASE_URL` - URL do PostgreSQL
- `NEXTAUTH_SECRET` - Secret para NextAuth
- `GOOGLE_CLIENT_ID` - Google OAuth (opcional)
- `GOOGLE_CLIENT_SECRET` - Google OAuth (opcional)
- `STRIPE_SECRET_KEY` - Chave secreta do Stripe
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` - Chave pública do Stripe

## 🎯 Funcionalidades

- ✅ Landing page moderna
- ✅ Sistema de busca de profissionais
- ✅ Perfis detalhados
- ✅ Sistema de agendamento
- ✅ Integração com Stripe
- ✅ Sistema de avaliações
- ✅ Dashboards para exploradores e profissionais
- ✅ Autenticação com NextAuth

## 🔧 Comandos Úteis

```bash
# Desenvolvimento
npm run dev

# Build de produção
npm run build

# Iniciar produção
npm start

# Prisma Studio (visualizar banco)
npx prisma studio

# Resetar banco de dados
npx prisma migrate reset
```

## 📝 Próximos Passos

1. Configurar Google OAuth
2. Configurar Stripe Webhooks
3. Adicionar integração de vídeo (Zoom/WebRTC)
4. Implementar sistema de mensagens
5. Deploy na Vercel
