# Etapa 1: Build
FROM node:18-alpine AS builder

# Configurar o diretório de trabalho no contêiner
WORKDIR /app

# Copiar apenas os arquivos essenciais para instalar as dependências
COPY package.json pnpm-lock.yaml ./

# Instalar dependências
RUN npm install --include=dev

# Copiar o restante dos arquivos do projeto para o contêiner
COPY . .

# Construir o projeto
RUN npm run build

# Etapa 2: Final (imagem mais leve)
FROM node:18-alpine

# Configurar o diretório de trabalho no contêiner
WORKDIR /app

# Copiar apenas os arquivos necessários do estágio de build
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./

# Instalar apenas dependências de produção
RUN npm install

# Expor a porta usada pelo Vite no modo preview
EXPOSE 4173

# Comando para iniciar o servidor de pré-visualização
CMD ["npm", "run", "preview", "--", "--host"]