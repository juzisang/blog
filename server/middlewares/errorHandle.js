module.exports = (ctx, next) => {
  return next().catch((err) => {
    if (err.status === 401) {
      ctx.status = 401
      ctx.body = {
        code: 401,
        msg: err.originalError ? err.originalError.message : err.message,
        status: 'error',
      }
    } else {
      throw err
    }
  })
}