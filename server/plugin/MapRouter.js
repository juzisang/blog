const Router = require('koa-router')

module.exports = function MapRouter (conf) {
  const router = new Router()
  for (let i = 0; i < conf.length; i++) {
    let item = conf[i]
    let type = item.type || 'all'
    let url = item.url
    if (item.children) {
      if (url && item.controller) {
        router[type](url, item.controller)
      }
      const routes = MapRouter(item.children, url).routes()
      router.use(url, routes)
    } else {
      if (item.controller) {
        router[type](url, item.controller)
      } else {
        throw new Error(url + ` controller is not defined`)
      }
    }
  }
  return router
}