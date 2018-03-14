module.exports = {
  app: {
    port: process.env.HOME_PORT || 3000,
    jwt: 'jwt_secret'
  },
  db: {
    name: process.env.MYSQL_DATABASE || 'blog',
    user: process.env.MYSQL_USER || 'developer',
    password: process.env.MYSQL_PASSWORD || 'developer',
    host: process.env.MYSQL_HOST || 'localhost',
    port: 3306
  },
  env: ''
}
