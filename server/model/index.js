const Sequelize = require('sequelize')
const config = require('../config')

const seq = new Sequelize(config.db.name, config.db.user, config.db.password, {
  dialect: 'mysql',
  host: config.db.host,
  port: config.db.port
})

const Comment = seq.import('./comments.js')
const Relationships = seq.import('./relationships.js')
const Options = seq.import('./options.js')
const Metas = seq.import('./metas.js')
const Users = seq.import('./users.js')
const Content = seq.import('./content.js')

Relationships.removeAttribute('id')

Users.hasMany(Content, {foreignKey: 'authorId', targetKey: 'uid'})
Users.hasMany(Comment, {foreignKey: 'authorId', targetKey: 'uid'})
Users.hasMany(Options, {foreignKey: 'user', targetKey: 'uid'})

Relationships.belongsTo(Metas, {foreignKey: 'mid', targetKey: 'mid'})
Relationships.belongsTo(Content, {foreignKey: 'cid', targetKey: 'cid'})

seq.sync({force: false})

module.exports = {
  Content,
  Comment,
  Relationships,
  Options,
  Metas,
  Users,
  Sequelize: seq
}
