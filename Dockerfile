FROM node:12-alpine

WORKDIR /app
COPY ./src /app/src
COPY ./package.json ./package-lock.json /app/

RUN npm install

USER node

CMD ["npm", "start"]
