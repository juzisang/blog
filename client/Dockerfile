FROM node:14.16.1-alpine

ENV NODE_ENV='production' \
  APP_PORT=3000

WORKDIR /usr/src/app

COPY package.json package-lock.json ./

RUN npm install --production

COPY . .

EXPOSE $APP_PORT

CMD ["npm", "run", "start"]
