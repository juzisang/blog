const isProdMode = Object.is(process.env.NODE_ENV, 'production')

module.exports = {
  baseURL: isProdMode ? 'http://api.juzisang.com/' : 'http://localhost:9000/'
}
