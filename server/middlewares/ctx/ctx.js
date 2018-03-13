const DataModel = require('./data')

module.exports = async (ctx, next) => {

  ctx.error = (msg, code = 500) => {
    if (msg instanceof Error) {
      msg = msg.message
    }
    switch (code) {
      case 403:
        ctx.body = new DataModel(403, null, msg || '权限不足', 'error')
      case 404:
        ctx.body = new DataModel(404, null, msg || '获取失败', 'error')
      case 405:
        ctx.body = new DataModel(405, null, msg || '不存在的方法', 'error')
      case 500:
        ctx.body = new DataModel(500, null, msg || '服务器错误', 'error')
      default:
        ctx.body = new DataModel(code, null, msg || '服务器错误', 'error')
    }
  }

  ctx.success = (data = [], msg = '获取成功') => {
    ctx.body = new DataModel(200, data, msg, 'success')
  }

  ctx.getParams = function (keys) {
    const params = Object.assign({}, ctx.query, ctx.request.body, ctx.params)
    if (keys) {
      if (typeof keys === 'string') {
        return params[keys]
      } else if (typeof keys === 'array') {
        const o = {}
        for (let key in params) {
          if (params[key]) {
            o[key] = params[key]
          }
        }
        return o
      }
    }
    return params
  }

  await next()
}