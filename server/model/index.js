const sequelize = require('sequelize')
const config = require('../config')
const md5 = require('md5')

const seq = new sequelize(config.db.name, config.db.user, config.db.password, {
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

Users.hasMany(Options, {foreignKey: 'uid', targetKey: 'user'})
Metas.hasMany(Relationships, {foreignKey: 'mid', targetKey: 'mid'})
Content.hasMany(Comment, {foreignKey: 'cid', targetKey: 'cid'})
Content.hasMany(Relationships, {foreignKey: 'cid', targetKey: 'cid'})

Relationships.belongsTo(Metas, {foreignKey: 'mid', targetKey: 'mid'})
Content.belongsTo(Users, {foreignKey: 'authorId', targetKey: 'uid'})

seq.sync({force: false}).then(async () => {
  await Users.findOrCreate({
    where: {
      name: 'root',
      password: md5('123456789'),
      mail: '1915327117@qq.com',
      group: 'admin'
    },
    defaults: {
      name: 'root',
      password: md5('123456789'),
      mail: '1915327117@qq.com',
      group: 'admin'
    }
  })
  await Metas.findOrCreate({
    where: {
      name: '默认分类',
      slug: 'default',
      description: 'default',
      type: 'category'
    },
    defaults: {
      name: '默认分类',
      slug: 'default',
      description: 'default',
      type: 'category'
    }
  })
})

module.exports = {
  Content,
  Comment,
  Relationships,
  Options,
  Metas,
  Users
}
