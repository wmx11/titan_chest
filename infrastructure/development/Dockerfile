FROM node:alpine

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/
COPY .env ./
COPY tsconfig.json ./
COPY . .

RUN npm install
RUN npm install pm2 typescript -g

EXPOSE 2000

CMD node index.js
