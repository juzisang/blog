module.exports = (ctx, next) => {
  return next().catch((err) => {
    if (err.status === 401) {
      ctx.status = 401
      ctx.error(err.originalError ? err.originalError.message : err.message, 401)
    } else {
      // throw err
      ctx.error(err.originalError ? err.originalError.message : err.message, 500)
    }
  })
}