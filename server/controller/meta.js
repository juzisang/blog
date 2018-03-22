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
    const queryPromise = async (name, type) => await MetasModel.findOne({
      where: {
        name,
        type
      }
    })
    await Util.validate(rules, ctx.getParams())
      .then(async (params) => (await queryPromise(params.name, params.type)) ? Promise.reject(new Error(`${params.type}已经存在`)) : params)
      .then(async ({name, slug = this.name, description, type}) => await MetasModel.create({
        name, slug, description, type
      }))
      .then((meta) => ctx.success(meta, '创建成功'))
      .catch(err => ctx.error(err))
  }

  async editMeta (ctx) {
    const rules = {
      mid: {type: 'string', required: true},
      name: {type: 'string', required: true},
      type: {type: 'enum', enum: ['tag', 'category'], required: true},
      slug: {type: 'string'},
      description: {type: 'string'}
    }
    await Util.validate(rules, ctx.getParams())
      .then(async params => (await MetasModel.findById(params.mid)) ? params : Promise.reject(new Error('mid不能为空')))
      .then(async params => await MetasModel.update(params, {where: {mid: params.mid}}))
      .then(() => ctx.success(null, '编辑成功'))
      .catch(err => ctx.error(err))
  }

  async delMeta (ctx) {
    const rules = {
      mid: {type: 'string', required: true}
    }
    await Util.validate(rules, ctx.getParams())
      .then(async ({mid}) => await MetasModel.findOne({where: {mid}}) ? mid : Promise.reject(new Error('内容不存在', 404)))
      .then(async mid => await MetasModel.destroy({where: {mid}}))
      .then(() => ctx.success(null, '删除成功'))
      .catch((err) => ctx.error(err))
  }

  async getTags (ctx) {
    await MetasModel.findAll({
      attributes: ['mid', 'name', 'slug', [sequelize.fn('COUNT', sequelize.col('relationships.cid')), 'total']],
      include: [{
        model: RelationshipsModel,
        required: true,
        attributes: []
      }],
      where: {
        type: 'tag'
      },
      group: 'metas.mid'
    })
      .then(list => ctx.success(list))
      .catch(err => ctx.error(err))
  }

  async getCategory (ctx) {
    await MetasModel.findAll({
      attributes: ['mid', 'name', 'slug', [sequelize.fn('COUNT', sequelize.col('relationships.cid')), 'total']],
      include: [{
        model: RelationshipsModel,
        required: true,
        attributes: []
      }],
      where: {
        type: 'category'
      },
      group: 'metas.mid'
    })
      .then(list => ctx.success(list))
      .catch(err => ctx.error(err))
  }
}

module.exports = new MetaController()