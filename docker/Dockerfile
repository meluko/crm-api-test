FROM node:10.16-alpine

WORKDIR /worker

COPY package*.json ./

RUN npm install --only=prod
RUN mkdir -p ./log
RUN mkdir -p ./config

COPY src ./src
COPY index.js ./

CMD [ "node", "index" ]
