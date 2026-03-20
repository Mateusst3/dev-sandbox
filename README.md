# ChatDesk — Teste Tecnico Fullstack

ChatDesk é uma aplicacao fullstack de chat com IA simulada, organizada por conversas, com login, perfil e historico. O backend usa Fastify + Prisma + Postgres, e o frontend usa React + Vite + Tailwind + Axios + Zod.

## O que foi feito

- Autenticacao com JWT (register/login)
- CRUD de perfil (GET/PATCH /user)
- Suporte a **multiplas conversas** (chats) por usuario
- Mensagens por chat (GET /chats/:chatId/messages, POST /chats/:chatId/message)
- IA simulada quando `DEEPSEEK_API_KEY` nao esta configurada
- UI com Tailwind + componentes ShadcnUI
- Landing page do produto
- Tema claro/escuro

## Stack

### Backend
- Fastify
- Prisma ORM
- Zod
- TypeScript
- PostgreSQL

### Frontend
- React + Vite
- TailwindCSS
- Axios
- Zod

## Requisitos

- Node.js 20+
- Postgres 16+

## Variaveis de ambiente

### Backend (`Backend/.env`)

```
DATABASE_URL="postgresql://app:app@localhost:5432/chatdb?schema=public"
JWT_SECRET="super-secret-change-me"
DEEPSEEK_API_KEY=""
DEEPSEEK_MODEL="deepseek-chat"
DEEPSEEK_BASE_URL="https://api.deepseek.com"
```

> Se `DEEPSEEK_API_KEY` estiver vazio, a IA sera **simulada** com respostas mockadas.

### Frontend (`Frontend/.env`)

```
VITE_API_URL="http://localhost:3001"
```

## Como rodar (local)

### 1) Backend

```
cd Backend
npm install
npx prisma migrate dev
npx prisma generate
npm run dev
```

Backend sobe em `http://localhost:3001`.

### 2) Frontend

```
cd Frontend
npm install
npm run dev
```

Frontend sobe em `http://localhost:5173`.

## Como rodar tudo com Docker

Se for usar DeepSeek, adicione sua chave em `docker-compose.yml` (em `services.backend.environment`):

- `DEEPSEEK_API_KEY=suachave`

Depois:

```
docker-compose up --build
```

Acesse:
- Frontend: `http://localhost:5173`
- Backend: `http://localhost:3001`

## Principais rotas

- `POST /register` — cria usuario
- `POST /login` — autentica
- `GET /user` — retorna dados do usuario
- `PATCH /user` — atualiza nome/email
- `GET /chats` — lista conversas
- `POST /chats` — cria conversa
- `PATCH /chats/:chatId` — renomeia conversa
- `DELETE /chats/:chatId` — exclui conversa
- `GET /chats/:chatId/messages` — lista mensagens
- `POST /chats/:chatId/message` — envia mensagem e retorna resposta da IA

## Observacoes

- O projeto usa somente Tailwind para estilos (sem CSS custom).
- A IA real (DeepSeek) é opcional: sem chave, o backend responde com mensagens mockadas.
- Tema claro/escuro pode ser alternado na UI.

## Scripts

### Backend
- `npm run dev` — servidor em modo dev
- `npm run test` — testes

### Frontend
- `npm run dev` — app em modo dev
- `npm run build` — build de producao

---

Qualquer duvida, é so chamar.
