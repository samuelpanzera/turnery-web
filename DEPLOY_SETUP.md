# Deploy via Heroku Container Registry

Este projeto utiliza o Heroku Container Registry para deploy, evitando que o Heroku faça o build novamente após o deploy. O build é feito localmente no GitHub Actions e apenas o resultado final é enviado para o Heroku.

## Configuração Necessária

### 1. Secrets do GitHub Actions

Configure os seguintes secrets no repositório GitHub (Settings > Secrets and variables > Actions):

- `HEROKU_API_KEY`: Sua chave de API do Heroku

  - Obtenha em: https://dashboard.heroku.com/account
  - Ou via CLI: `heroku auth:token`

- `HEROKU_APP_NAME_FRONTEND`: Nome da sua aplicação no Heroku
  - Exemplo: `minha-app-frontend`

### 2. Configuração do Heroku

#### 2.1 Habilitar Container Registry no seu app:

```bash
heroku stack:set container -a SEU_APP_NAME
```

#### 2.2 Configurar variáveis de ambiente no Heroku:

```bash
heroku config:set NODE_ENV=production -a SEU_APP_NAME
heroku config:set PORT=3000 -a SEU_APP_NAME
```

#### 2.3 Adicionar outras variáveis de ambiente necessárias:

```bash
# Adicione aqui outras variáveis específicas do seu projeto
# Exemplo:
# heroku config:set DATABASE_URL=sua_url_aqui -a SEU_APP_NAME
# heroku config:set API_URL=sua_api_url -a SEU_APP_NAME
```

## Como Funciona o Workflow

1. **Checkout**: Baixa o código do repositório
2. **Setup Bun**: Instala o runtime Bun no ambiente do GitHub Actions
3. **Install dependencies**: Instala as dependências usando `bun install`
4. **Build local**: Executa `bun run build` para gerar os arquivos de produção
5. **Login Heroku**: Autentica no Heroku Container Registry
6. **Build Docker**: Cria a imagem Docker otimizada com multi-stage build
7. **Push**: Envia a imagem para o registry do Heroku
8. **Release**: Libera a nova versão no Heroku

## Vantagens desta Abordagem

- ✅ Build é feito apenas uma vez (no GitHub Actions)
- ✅ Deploy mais rápido no Heroku
- ✅ Imagem Docker otimizada com multi-stage build
- ✅ Controle total sobre o processo de build
- ✅ Reduz uso de recursos no Heroku

## Estrutura do Dockerfile

O Dockerfile usa multi-stage build:

- **Stage 1 (build)**: Instala dependências e faz o build da aplicação
- **Stage 2 (production)**: Cria imagem final apenas com arquivos necessários

## Comandos Úteis para Debug

### Testar o build local:

```bash
bun install
bun run build
```

### Testar o Docker localmente:

```bash
docker build -t turnery-web .
docker run -p 3000:3000 turnery-web
```

### Verificar logs do Heroku:

```bash
heroku logs --tail -a SEU_APP_NAME
```

### Deploy manual via CLI (se necessário):

```bash
heroku container:login
docker build -t registry.heroku.com/SEU_APP_NAME/web .
docker push registry.heroku.com/SEU_APP_NAME/web
heroku container:release web -a SEU_APP_NAME
```
