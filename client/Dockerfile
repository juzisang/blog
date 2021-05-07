FROM node:14.16.1-alpine

ENV NODE_ENV='production' \
  PORT=3000 \
  BLOG_API='/api'

WORKDIR /usr/src/app

COPY package.json package-lock.json ./

RUN npm install --production

COPY . .

EXPOSE $PORT

CMD ["npm", "run", "start"]
