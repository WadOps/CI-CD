FROM	node:9-alpine

EXPOSE 1337

COPY . .

WORKDIR /backend

RUN npm -g install sails

RUN npm install && npm cache verify

