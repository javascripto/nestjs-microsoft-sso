
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

## Configurar Scope da API no Azure (Expose an API)

Para que o frontend consiga solicitar um access token válido para a sua API, você precisa expor um scope delegado na aplicação da API no Azure AD e usar esse scope no frontend.

Passos rápidos:

1. No Portal do Azure, vá em **Azure Active Directory > App registrations** e selecione a aplicação que representa sua API.
2. Em **Expose an API**:
   - Verifique o **Application ID URI** (por exemplo `api://<CLIENT_ID>`). Se necessário, ajuste para `api://<your-api-client-id>`.
   - Clique em **Add a scope** e crie um scope delegado (ex.: `access_as_user`). Preencha o nome do scope, o display name e a descrição.
   - Marque o scope como **Enabled**.
3. No frontend, defina a variável de ambiente com o scope que você criou (substitua `<your-api-client-id>` e `access_as_user` caso diferente):

```env
VITE_AZURE_API_SCOPE=api://<your-api-client-id>/access_as_user
```

4. Reinicie o servidor de desenvolvimento do frontend e limpe `sessionStorage`/`localStorage` (há botão "Limpar dados da aplicação" na tela de login) antes de testar.

Notas:
- Não use `/.default` combinado com `openid`/`profile`/`offline_access` em uma mesma requisição — para SPAs solicite um scope delegado como `api://<clientId>/access_as_user`.
- Documentação Microsoft: https://learn.microsoft.com/azure/active-directory/develop/v2-permissions-and-consent

