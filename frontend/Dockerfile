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

# Expor a porta 3000
EXPOSE 3000

# Comando para servir a aplicação
CMD ["serve", "-s", "build", "-l", "3000"]