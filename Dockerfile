FROM node:16-slim

COPY public /app/public
COPY src /app/src
COPY package.json /app
COPY package-lock.json /app

WORKDIR /app

RUN npm install react-scripts
RUN npm run build
RUN npm install -g serve

CMD serve -s build
