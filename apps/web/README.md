
# Web - Frontend React com Autenticação (JWT e Microsoft)

Este projeto é o frontend React do sistema de autenticação, consumindo a API de backend para login via e-mail/senha (JWT) e login com conta Microsoft (Azure AD). Utiliza Vite, React 19, TypeScript, TailwindCSS e MSAL.

## Funcionalidades

- Login com e-mail e senha (JWT)
- Login com conta Microsoft (Azure AD)
- Proteção de rotas (apenas usuários autenticados acessam o dashboard)
- Contexto global de autenticação
- Toasts de feedback e UX moderna

## Estrutura de Pastas

- `src/components/` — Componentes de UI, Login, Dashboard, etc.
- `src/lib/` — Hooks, contexto de autenticação, integração com API e MSAL
- `src/assets/` — Assets estáticos

## Instalação

```bash
npm install
```

## Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com:

- `VITE_API_URL` — URL da API backend (ex: http://localhost:3000)
- `VITE_AZURE_CLIENT_ID` — Client ID do app registrado no Azure
- `VITE_AZURE_TENANT_ID` — Tenant ID do Azure

## Comandos

```bash
# Desenvolvimento
yarn dev

# Build de produção
yarn build

# Preview do build
yarn preview

# Lint/Format
yarn lint
yarn format
```

## Fluxo de Autenticação

1. **Login com e-mail/senha:**
   - Usuário preenche e-mail e senha, recebe JWT e acessa rotas protegidas.
2. **Login com Microsoft:**
   - Usuário faz login via popup/redirect do Azure AD, token é trocado por JWT da API.
3. **Proteção de rotas:**
   - Apenas usuários autenticados acessam `/dashboard`.

## Tecnologias

- [React 19](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [MSAL React](https://github.com/AzureAD/microsoft-authentication-library-for-js/tree/dev/lib/msal-react)
- [React Router](https://reactrouter.com/)

## Observações

- O frontend espera que a API esteja rodando e configurada corretamente.
- O token JWT é salvo no `localStorage` e enviado em cada requisição.
- Para produção, configure corretamente as URLs de redirect no Azure e na API.

