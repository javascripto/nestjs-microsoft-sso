# MS SSO - Monorepo (NestJS + React + Microsoft & Google SSO)

Este repositório é um monorepo que reúne uma API de autenticação (NestJS) e um frontend (React) para login com e-mail/senha (JWT), Microsoft (Azure AD) e Google. O objetivo é fornecer um exemplo completo de Single Sign-On (SSO) moderno usando tecnologias populares e integração com Microsoft e Google.

## Estrutura do Projeto

- `apps/api/` — Backend em NestJS (autenticação, JWT, Azure AD)
- `apps/web/` — Frontend em React 19 + Vite (login, dashboard, MSAL)

## Principais Funcionalidades

- Login com e-mail/senha (JWT)
- Login com conta Microsoft (Azure AD)
- Login com conta Google
- Proteção de rotas no frontend
- Contexto global de autenticação
- Estrutura modular e fácil de adaptar

## Como rodar localmente

1. **Clone o repositório:**
	```bash
	git clone https://github.com/javascripto/nestjs-microsoft-sso.git
	cd nestjs-microsoft-sso
	```

2. **Instale as dependências:**
	```bash
	npm install
	```

3. **Configure as variáveis de ambiente:**
	- Veja os READMEs em `apps/api/` e `apps/web/` para detalhes das variáveis necessárias.

4. **Inicie a API e o frontend simultaneamente:**
	```bash
	yarn dev
	```

## Fluxo de Autenticação

1. O usuário pode logar com e-mail/senha, conta Microsoft ou conta Google.
2. O frontend obtém um JWT da API e protege as rotas.
3. O backend valida tokens JWT e tokens do Azure AD / Google.

## Tecnologias

- [NestJS](https://nestjs.com/) (API)
- [React 19](https://react.dev/) + [Vite](https://vitejs.dev/) (Web)
- [MSAL](https://github.com/AzureAD/microsoft-authentication-library-for-js) (Microsoft Auth)
- [Google Auth](https://developers.google.com/identity/gsi/web) (Google SSO)
- [Passport](http://www.passportjs.org/) (JWT/Azure AD/Google)
- [TypeScript](https://www.typescriptlang.org/)
- [TailwindCSS](https://tailwindcss.com/)

## Observações

- Este projeto é para fins educacionais e demonstração.
- Usuários e senhas são mantidos em memória (não use em produção sem adaptar para banco de dados e criptografia de senhas).
- Para produção, configure corretamente as URLs de redirect e variáveis de ambiente.

