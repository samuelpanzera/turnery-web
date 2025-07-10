# Turnery Web

Repositório do projeto de site para uma oficina de tornearia, desenvolvido com foco em escalabilidade, performance e boas práticas modernas de desenvolvimento web.

## 🎯 Propósito do Projeto

Fiz este site com o intuito de criar um projeto real para meu pai, dono de uma oficina de usinagem. A ideia é permitir que clientes solicitem orçamentos de fabricação de peças diretamente pelo site, aumentando o alcance do negócio e profissionalizando o atendimento online.

Com esse projeto, busco demonstrar como é possível aumentar o número de clientes que entram em contato, provando sua eficiência por meio de métricas reais, utilizando ferramentas como o Google Analytics para acompanhar taxas de conversão e interação.

## 🚀 Tecnologias Utilizadas

* **Next.js**: Framework React com suporte a renderização híbrida (SSR e SSG), ideal para SEO e performance.
* **TypeScript**: Tipagem estática para maior segurança e facilidade de manutenção.
* **Tailwind CSS**: Framework utilitário para estilização rápida e responsiva.
* **Bun**: Runtime moderno com builds e execução mais rápidos em comparação ao Node.js.
* **ESLint + Prettier**: Ferramentas para padronização e qualidade de código.

## ⚙️ Desafios Enfrentados

* **Adoção do Bun**: Exploramos o desempenho superior do Bun para acelerar builds e otimizar o ambiente de desenvolvimento.
* **Integração Tailwind + Next.js**: Ajustes finos na configuração para garantir compatibilidade e manter alta performance.
* **Estrutura Modular**: Organização do código em componentes reutilizáveis, pensando no crescimento do projeto.

## 📂 Estrutura do Projeto

```
turnery-web/
├── src/           # Código-fonte (componentes, páginas, estilos)
├── public/        # Arquivos estáticos (imagens, fontes etc.)
├── bun.lockb      # Lockfile do Bun para dependências
├── tailwind.config.js  # Configurações do Tailwind CSS
└── README.md      # Documentação deste projeto
```

## 🛠️ Como Rodar Localmente

1. Clone o repositório:

   ```bash
   git clone https://github.com/samuelpanzera/turnery-web.git
   ```
2. Instale as dependências:

   ```bash
   bun install
   ```
3. Inicie o servidor de desenvolvimento:

   ```bash
   bun dev
   ```
4. Acesse `http://localhost:3000` no seu navegador.

## 📌 Considerações Finais

Este projeto foi uma oportunidade de aplicar tecnologias modernas e testar ferramentas emergentes como o Bun. O foco principal foi construir uma base sólida e escalável para o site de uma tornearia, sempre priorizando performance e boas práticas de desenvolvimento.
