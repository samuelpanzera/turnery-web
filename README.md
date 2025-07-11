# TornoMix - Aplicação Full-Stack

![TornoMix](httpsd://github.com/samuelpanzera/turnery-web/assets/101292815/1c52d7e0-2508-4127-b08e-8a0337c73b06)

Este projeto é a aplicação full-stack para a empresa de tornearia mecânica TornoMix. O objetivo é criar um canal de comunicação digital robusto, permitindo que clientes solicitem orçamentos de forma detalhada, e que a empresa gerencie esses contatos de forma centralizada e eficiente.

A aplicação foi desenvolvida utilizando uma arquitetura **monorepo**, que centraliza o código do front-end e do back-end, facilitando o compartilhamento de código, a padronização e a manutenção.

---

## 🚀 Tecnologias Utilizadas

Este projeto combina tecnologias modernas para garantir performance, escalabilidade e uma ótima experiência de desenvolvimento.

- **Front-end (`/apps/web`):**
  - **[Next.js](https://nextjs.org/)**: Framework React para renderização no lado do servidor (SSR) e geração de sites estáticos.
  - **[React](https://react.dev/)**: Biblioteca para construção de interfaces de usuário.
  - **[TypeScript](https://www.typescriptlang.org/)**: Superset do JavaScript que adiciona tipagem estática.
  - **[Tailwind CSS](https://tailwindcss.com/)**: Framework de CSS utility-first para estilização rápida e responsiva.

- **Back-end (`/apps/api`):**
  - **[NestJS](https://nestjs.com/)**: Framework Node.js progressivo para construir aplicações back-end eficientes, escaláveis e robustas.
  - **[TypeScript](https://www.typescriptlang.org/)**: Garante um código de back-end seguro e bem estruturado.

- **Monorepo & Tooling:**
  - **[Turborepo](https://turbo.build/repo)**: Ferramenta de build de alta performance para monorepos JavaScript/TypeScript.
  - **[pnpm](https://pnpm.io/)**: Gerenciador de pacotes rápido e eficiente em disco, ideal para a estrutura de monorepo.
  - **[ESLint](https://eslint.org/)** e **[Prettier](https://prettier.io/)**: Para padronização e formatação de código.

---

## 🏛️ Arquitetura do Monorepo

O código está organizado em um monorepo com a seguinte estrutura:

- `apps/`: Contém as aplicações principais.
  - `web/`: O código do site em Next.js (front-end).
  - `api/`: O código da API em NestJS (back-end).
- `packages/`: Contém pacotes compartilhados entre as aplicações.
  - `ui/`: (Exemplo) Componentes de React compartilhados.
  - `types/`: (Exemplo) Tipos e interfaces do TypeScript compartilhados entre o front-end e o back-end.

---

## ⚙️ Como Rodar o Projeto

Siga os passos abaixo para configurar e rodar o ambiente de desenvolvimento local.

### Pré-requisitos

- [Node.js](https://nodejs.org/en) (versão 18 ou superior)
- [pnpm](https://pnpm.io/installation)

### Passos

1.  **Clone o repositório:**

    ```bash
    git clone [https://github.com/samuelpanzera/turnery-web.git](https://github.com/samuelpanzera/turnery-web.git)
    cd turnery-web
    ```

2.  **Instale as dependências:**
    O `pnpm` irá instalar as dependências de todos os projetos do monorepo.

    ```bash
    pnpm install
    ```

3.  **Configure as Variáveis de Ambiente:**
    Você precisará de dois arquivos de ambiente, um para a API e um para o site.
    - **Para a API:** Crie um arquivo `.env` dentro de `apps/api/`.

      ```
      # apps/api/.env
      DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
      ```

    - **Para o Site:** Crie um arquivo `.env.local` dentro de `apps/web/`.
      ```
      # apps/web/.env.local
      NEXT_PUBLIC_API_URL="http://localhost:3001"
      ```

4.  **Inicie os servidores de desenvolvimento:**
    Este comando utiliza o Turborepo para iniciar o front-end e o back-end simultaneamente.
    ```bash
    pnpm dev
    ```

- Sua aplicação **Next.js** estará disponível em `http://localhost:3000`.
- Sua API **NestJS** estará disponível em `http://localhost:3001`.

---

## 📜 Scripts Disponíveis

Os seguintes scripts podem ser executados a partir da raiz do projeto:

- `pnpm dev`: Inicia todos os aplicativos em modo de desenvolvimento.
- `pnpm build`: Gera a build de produção para todos os aplicativos.
- `pnpm lint`: Executa o ESLint em todo o código do monorepo.
- `pnpm format`: Formata todo o código com o Prettier.
