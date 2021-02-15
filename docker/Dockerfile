FROM node:10.16-alpine

WORKDIR /worker

COPY package*.json ./
RUN npm install --only=prod

COPY src ./src
RUN mkdir -p ./log

CMD [ "node", "index" ]
