FROM	node:9-alpine

EXPOSE 1337

COPY . .

WORKDIR /backend

RUN npm install && npm cache clean

