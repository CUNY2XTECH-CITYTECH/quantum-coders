FROM node:latest

WORKDIR /src

COPY package*.json ./
COPY drizzle.config.ts ./
COPY . . 

RUN npm install

CMD [ "npx", "drizzle-kit", "push" ]