FROM node:8

WORKDIR /usr/src/server

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 3000
