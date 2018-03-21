const MetasModel = require('../model/index').Metas
const RelationshipsModel = require('../model/index').Relationships
const sequelize = require('sequelize')
const Util = require('../util/util')

class MetaController {
  async createMeta (ctx) {
    const rules = {
      name: {type: 'string', required: true},
      slug: {type: 'string'},
      description: {type: 'string'},
      type: {type: 'enum', enum: ['tag', 'category'], required: true},
    }
    const {
      name,
      slug = name,
      description = null,
      type
    } = await Util.validate(rules, ctx.getParams())
    const query = {
      where: {
        name,
        type
      }
    }
    if (await MetasModel.findOne(query)) {
      return ctx.error(`${type}已经存在`, 405)
    }
    const meta = await MetasModel.create({
      name, slug, description, type
    })
    ctx.success(meta, '创建成功')
  }

  async delMeta (ctx) {
    const rules = {
      mid: {type: 'string', required: true}
    }
    const {mid} = await Util.validate(rules, ctx.getParams())
    const query = {
      where: {
        mid
      }
    }
    if (!await MetasModel.findOne(query)) {
      return ctx.error('内容不存在', 404)
    }
    await MetasModel.destroy({
      where: {mid}
    })
    ctx.success(null, '删除成功')
  }

  async getTags (ctx) {
    const tags = await MetasModel.findAll({
      where: {
        type: 'tag'
      }
    })
    return ctx.success(tags)
  }

  async getCategory (ctx) {
    return ctx.success(await MetasModel.findAll({
      where: {
        type: 'category'
      }
    }))
  }
}

module.exports = new MetaController()