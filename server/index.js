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
  'http://localhost:3000',
  'http://www.juzisang.com'
]

app
  .use(middlewares.errorHandle)
  .use(logger())
  .use(bodyParser())
  .use(middlewares.ctx)
  .use(cors({
    origin: function (url) {
      if (origin.includes(url)) {
        return url
      }
      return false
    }
  }))
  .use(jwt({
    secret: config.app.jwt,
    getToken (ctx, next) {
      return ctx.header['Authorization'] || ctx.cookies.get('Authorization')
    }
  })
    .unless({
      path: [
        /\/user\/register/,
        /\/user\/login/,
        /\/article\/list/,
        /\/article\/details/,
      ]
    }))
  .use(routes.routes())
  .listen(config.app.port)

// onerror(app)