FROM	node:9-alpine

EXPOSE 1337 8081

COPY . .

WORKDIR /frontend

RUN npm install && npm cache verify

WORKDIR /backend

RUN npm -g install sails@0.12.14

RUN npm install && npm cache verify
