FROM node:23-slim

WORKDIR /app

COPY package*.json ./
COPY src ./src
COPY tsconfig.json ./

RUN npm install
RUN npm install typescript -g
RUN tsc

CMD ["npm", "start"]