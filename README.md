# 🚀 D-Barber

<p align="center">
  <img src="public/banner-01.png" alt="banner" width="100%" />
</p>

## 💻 Projeto

Este é um sistema para agendamento de serviços de barbearia, desenvolvido com tecnologias modernas para oferecer uma solução completa de gerenciamento de agendamentos. O sistema conta com:

- Design responsivo e acessível
- Sistema de autenticação seguro
- Gerenciamento de agendamentos
- Animações suaves e modo dark/light
- Validação de formulários robusta

## ✨ Tecnologias

- [Next.js 14](https://nextjs.org/)
- [React 18](https://reactjs.org)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Prisma](https://www.prisma.io/) (ORM para banco de dados)
- [NextAuth.js](https://next-auth.js.org/) (Autenticação)
- [Zod](https://zod.dev/) (Validação de dados)
- [Radix UI](https://www.radix-ui.com/) (Componentes acessíveis)
- [Lucide Icons](https://lucide.dev/) (Ícones)
- [date-fns](https://date-fns.org/) (Manipulação de datas)

## 🔍 Features

- ⚡ Aplicação full-stack com Next.js
- 🔐 Autenticação segura com NextAuth
- 🗓️ Sistema de agendamento com react-day-picker
- 📝 Formulários validados com React Hook Form + Zod
- 🎨 Design system com Tailwind CSS + CVA
- 🌓 Tema claro/escuro com next-themes
- 📊 Banco de dados com Prisma ORM
- 🛠️ Code quality com ESLint, Prettier e Husky
- 🚀 Deploy fácil com Vercel

## 🚀 Como executar

```bash
# Clone este repositório
$ git clone https://github.com/Aldacelio/d-barber

# Entre na pasta do projeto
$ cd d-barber

# Instale as dependências
$ npm install

# Configure o banco de dados (certifique-se de ter o PostgreSQL rodando)
$ npx prisma migrate dev

# Execute a aplicação em modo desenvolvimento
$ npm run dev

# O sistema estará disponível em http://localhost:3000
