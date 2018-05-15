FROM	node:9-alpine

EXPOSE 1337

COPY . .

RUN npm install && npm cache clean

