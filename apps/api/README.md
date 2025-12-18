
# API - Autenticação com JWT, Microsoft e Google (NestJS)

Este projeto é um serviço de autenticação desenvolvido em [NestJS](https://nestjs.com/) que oferece login via e-mail/senha (JWT), login com conta Microsoft (Azure AD) e login com conta Google. Ele serve como backend para aplicações que precisam de autenticação centralizada e segura.

## Funcionalidades

- Login com e-mail e senha (JWT)
- Login com conta Microsoft (Azure AD)
- Login com conta Google
- Emissão de tokens JWT para autenticação
- Endpoint para obter perfil do usuário autenticado
- Estrutura modular e fácil de estender

## Estrutura de Pastas

- `src/modules/auth/` — Módulo de autenticação (controllers, serviços, estratégias, casos de uso)
- `src/modules/users/` — Módulo de usuários (serviço de usuários em memória)
- `test/` — Testes automatizados (unitários e e2e)

## Instalação

```bash
npm install
```

## Variáveis de Ambiente

Configure as seguintes variáveis de ambiente para funcionamento local:

- `JWT_SECRET` — Segredo para assinar tokens JWT
- `JWT_EXPIRES_IN` — Tempo de expiração do token (ex: '1d')
- `AZURE_CLIENT_ID` — Client ID do app registrado no Azure
- `GOOGLE_CLIENT_ID` — Client ID do app registrado no Google Cloud Console
- `TEST_OUTLOOK_EMAIL` — E-mail de teste para login Microsoft
- `TEST_OUTLOOK_USER_NAME` — Nome do usuário de teste

## Comandos

```bash
# Desenvolvimento
yarn start:dev

# Produção
yarn build && yarn start:prod

# Testes unitários
yarn test

# Testes e2e
yarn test:e2e

# Cobertura de testes
yarn test:cov
```

## Endpoints Principais

- `POST /auth/login` — Login com e-mail e senha (retorna JWT)
- `POST /auth/login/microsoft` — Login com conta Microsoft (Azure AD, retorna JWT)
- `POST /auth/login/google` — Login com conta Google (retorna JWT)
- `GET /auth/me` — Retorna dados do usuário autenticado (JWT)
- `GET /auth/microsoft/profile` — Retorna perfil do usuário autenticado via Microsoft

## Fluxo de Autenticação

1. **Login com e-mail/senha:**
   - Envie e-mail e senha para `/auth/login`.
   - Se válido, retorna um JWT.
2. **Login com Microsoft / Google:**
   - Autentique-se via Azure AD ou Google e envie o token para `/auth/login/microsoft` ou `/auth/login/google`.
   - O backend valida o token e retorna um JWT próprio.

## Tecnologias

- [NestJS](https://nestjs.com/)
- [Passport](http://www.passportjs.org/) (JWT e Azure AD)
- [TypeScript](https://www.typescriptlang.org/)

## Observações

- Usuários são mantidos em memória para fins de demonstração.
- Para produção, adapte o serviço de usuários para um banco de dados.
- Senhas não são criptografadas neste exemplo.



