FROM node:alpine

WORKDIR /consumer/server
COPY package*.json .
COPY index.js .
COPY kafka-consumer.js .

RUN apk add g++ make py3-pip
RUN apk update && apk add bash
RUN npm install


CMD [ "node", "index.js" ]