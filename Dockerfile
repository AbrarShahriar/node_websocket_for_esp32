FROM node:16-alpine

WORKDIR /app

COPY package.json ./

COPY package-lock.json ./

RUN npm install 

COPY . .

EXPOSE 4001

CMD [ "npm", "start" ]
