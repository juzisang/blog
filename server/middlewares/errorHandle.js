module.exports = (ctx, next) => {
  return next().catch((err) => {
    ctx.error(err)
  })
}