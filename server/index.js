const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const session = require('koa-session')
const onerror = require('koa-onerror')
const logger = require('koa-logger')
const jsonp = require('koa-jsonp')
const cors = require('koa2-cors')

const config = require('./config')
const Db = require('./model')
const routes = require('./routes')
const middlewares = require('./middlewares')

const app = new Koa()
app.keys = ['secret']
onerror(app)
app.use(logger())
app.use(bodyParser())
app.use(session({maxAge: 86400000}, app))
app.use(middlewares.ctx)

const origin = [
  'http://localhost:3000',
  'http://www.juzisang.com'
]

app.use(cors({
  origin: function (url) {
    if (origin.includes(url)) {
      return url
    }
    return false
  },
  allowMethods: ['GET', 'PUT', 'POST', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'],
  AllowCredentials: true,
  maxAge: 1728000,
  allowHeaders: ['Access-Control-Allow-Headers', 'Authorization', 'Origin', 'X-Requested-With', 'Pragma', 'Cache-Control', 'Expires', 'Content-Type']
}))
// app.use(jsonp())

app.use(routes.routes())

app.listen(config.app.port)