# frontend/Dockerfile
FROM node:18-alpine

# Definir o diretório de trabalho
WORKDIR /app

# Copiar os arquivos de dependência
COPY package.json package-lock.json ./

# Instalar as dependências
RUN npm install

# Copiar o restante do projeto
COPY . .

# Definir o argumento de build para a URL do backend
ARG REACT_APP_BACKEND_URL
ENV REACT_APP_BACKEND_URL=${REACT_APP_BACKEND_URL}

# Construir a aplicação
RUN npm run build

# Instalar o serve para servir os arquivos estáticos
RUN npm install -g serve

# Cloud Run vai definir a porta via PORT
ENV PORT 8080

CMD ["sh", "-c", "serve -s build -l $PORT"]