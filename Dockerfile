# Build stage - usando Node.js para compatibilidade total com Next.js
FROM node:20-alpine AS build

WORKDIR /app

# Instalar Bun no container Node.js
RUN npm install -g bun

# Copiar arquivos de configuração primeiro para otimizar cache do Docker
COPY package.json bun.lockb ./
COPY tsconfig.json ./
COPY next.config.ts ./
COPY tailwind.config.js ./
COPY postcss.config.mjs ./
COPY components.json ./
COPY eslint.config.mjs ./

# Instalar dependências
RUN bun install --frozen-lockfile

# Copiar código fonte
COPY public ./public
COPY src ./src
COPY types ./types

# Build da aplicação Next.js
RUN bun run build

# Production stage - usando Node.js para runtime
FROM node:20-alpine AS production

WORKDIR /app

# Instalar Bun para runtime
RUN npm install -g bun

# Definir NODE_ENV como production
ENV NODE_ENV=production
ENV PORT=3000

# Copiar apenas os arquivos necessários para produção
COPY --from=build /app/.next ./.next
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/public ./public
COPY --from=build /app/next.config.ts ./

# Criar usuário não-root por segurança
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
RUN chown -R nextjs:nodejs /app
USER nextjs

EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["bun", "run", "start"]
