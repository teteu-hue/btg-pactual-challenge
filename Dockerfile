FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

# Copia o resto da aplicação
COPY . .

# Expondo a porta da aplicação (ajuste conforme necessário)
EXPOSE 3000