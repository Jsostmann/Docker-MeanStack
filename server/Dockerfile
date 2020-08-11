FROM node:latest

WORKDIR /usr/src/server

#COPY package.json ./
COPY package*.json ./

#RUN npm install
RUN npm install -g nodemon

RUN npm ci \
 && npm cache clean --force \
 && mv ./node_modules /node_modules

COPY . .

EXPOSE 8080

CMD ["nodemon", "index.js"]
