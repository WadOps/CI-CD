FROM node:9-alpine

EXPOSE 1337

COPY . .

RUN apk add nano==2.9.6-r0

RUN npm -g install sails@0.12.14

RUN npm install && npm cache verify
