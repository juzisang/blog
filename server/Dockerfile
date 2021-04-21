FROM node:14.16.1-alpine

RUN npm i -g @nestjs/cli

ENV NODE_ENV='production' \
  APP_PORT=3000 \
  DATABASE_HOST='localhost' \
  DATABASE_USERNAME='blog-test' \
  DATABASE_PASSWORD='blog-test' \
  DATABASE_DATABASE='blog-test' \
  JWT_SECRET='test' \
  USER_ADMIN_NAME='admin' \
  USER_ADMIN_PASSWORD='123456'

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN yarn install --production

COPY . .

EXPOSE $APP_PORT

CMD ["npm", "run", "start:prod"]
