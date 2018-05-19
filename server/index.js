const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const onerror = require('koa-onerror')
const logger = require('koa-logger')
const cors = require('koa2-cors')
const jwt = require('koa-jwt')

const config = require('./config')
const Db = require('./model')
const routes = require('./routes')
const middlewares = require('./middlewares')

const app = new Koa()

const origin = [
  'http://localhost:8080',
  'http://localhost:3000',
  'http://www.juzisang.com'
]

app
  .use(middlewares.ctx)
  .use(middlewares.errorHandle)
  .use(logger())
  .use(bodyParser())
  .use(cors({
    origin: function (ctx) {
      if (origin.includes(ctx.headers.origin)) {
        return ctx.headers.origin
      }
      return false
    },
    credentials: true
  }))
  .use(jwt({
    secret: config.app.jwt,
    getToken (ctx, next) {
      return ctx.header['authorization'] || ctx.cookies.get('authorization')
    }
  })
    .unless({
      path: [
        /\/register/,
        /\/login/,
        /\/articles/,
        /\/article/
      ]
    }))
  .use(routes.routes())
  .listen(config.app.port)

// onerror(app)