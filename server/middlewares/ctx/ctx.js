const DataModel = require('./data')
const StatusError = require('../../plugin/StatusError')

module.exports = async (ctx, next) => {

  ctx.error = (err, code = 500) => {
    if (err instanceof Error) {
      ctx.status = err.status || 500
      ctx.body = new DataModel(null, err.message || '获取错误', 'error')
    } else if (typeof err === 'string') {
      ctx.status = code
      ctx.body = new DataModel(null, err || '获取错误', 'error')
    } else if (err instanceof Object) {
      ctx.status = 405
      ctx.body = new DataModel(null, err.message || '获取错误', 'error')
    }
  }

  ctx.success = (data = [], msg = '获取成功') => {
    ctx.body = new DataModel(data, msg, 'success')
  }

  ctx.getParams = function (keys) {
    const params = Object.assign({}, ctx.query, ctx.request.body, ctx.params)
    if (keys) {
      if (typeof keys === 'string') {
        return params[keys]
      } else if (keys instanceof Array) {
        const o = {}
        for (let i = 0; i < keys.length; i++) {
          let key = keys[i]
          o[key] = params[key]
        }
        return o
      }
    }
    return params
  }

  // 自定义异常
  ctx.StatusError = StatusError

  await next()
}