const util = require('../util/util')
const config = require('../config')
const ContentModel = require('../model').Content
const MetasModel = require('../model').Metas
const RelationshipsModel = require('../model').Relationships
const Sequelize = require('../model').Sequelize

/**
 * 获取分类，以及Tag
 */
async function getMetas (cid) {
  const metas = await RelationshipsModel.findAll({where: {cid}})
  const all = await Promise.all(metas.map(meta => MetasModel.findAll({
    where: {
      mid: meta.mid
    }
  })))
  return {
    tags: all.map(item => item[0]).filter(item => item.type === 'tag'),
    category: all.map(item => item[0]).filter(item => item.type === 'category')
  }
}

class ContentController {
  /**
   * 创建文章
   * @param ctx = ctx.getParams()
   * @param ctx.title
   * @param ctx.content
   * @param ctx.tags
   * @param ctx.category
   * @param ctx.slug
   * @param ctx.order
   * @param ctx.status
   */
  async createArticle (ctx) {
    const rules = {
      title: {type: 'string', required: true},
      content: {type: 'string', required: true},
      tags: {type: 'array', required: true},
      category: {type: 'string', required: true},
      status: {type: 'enum', enum: ['online', 'draft', 'delete']}
    }
    const {
      title,
      slug = title,
      content,
      type = 'article',
      authorId = ctx.state['user'],
      status = 'online',
      tags,
      category,
      order
    } = await util.validate(rules, ctx.getParams())
    // 创建内容完毕
    const contentData = await ContentModel.create({title, content, authorId, status, slug, order, type})
    // 创建Tag
    if (tags) {
      await Promise.all(tags.map(mid => RelationshipsModel.create({
        mid,
        cid: contentData.cid
      })))
    }
    // 创建category
    if (category) {
      await RelationshipsModel.create({
        mid: category,
        cid: contentData.cid
      })
    }
    ctx.success(null, '创建成功')
  }

  /**
   * 编辑文章
   * @param ctx = ctx.getParams()
   * @param ctx.cid
   * @param ctx.title
   * @param ctx.content
   * @param ctx.tags
   * @param ctx.category
   * @param ctx.slug
   * @param ctx.order
   * @param ctx.status
   */
  async editArticle (ctx) {
    const rules = {
      cid: {type: 'string', required: true},
      title: {type: 'string', required: true},
      content: {type: 'string', required: true},
      tags: {type: 'array', required: true},
      category: {type: 'string', required: true},
      status: {type: 'enum', enum: ['online', 'draft', 'delete']}
    }
    const params = await util.validate(rules, ctx.getParams())
    const article = ContentModel.findById(params.cid)
    if (!article) {
      return ctx.error('文章不存在', 404)
    }
    // 删除旧的
    await RelationshipsModel.destroy({
      where: {
        cid: params.cid
      }
    })
    // 添加Tag
    await Promise.all(params.tags.map(mid => RelationshipsModel.create({
      mid,
      cid: params.cid
    })))
    // 添加category
    await RelationshipsModel.create({
      mid: params.category,
      cid: params.cid
    })
    await ContentModel.update(
      Object.assign(article, params),
      {
        where: {
          cid: params.cid
        }
      }
    )
    ctx.success(null, '编辑成功')
  }

  /**
   * 获取指定id的内容
   * @param ctx = ctx.getParams()
   * @param ctx.cid
   */
  async details (ctx) {
    const params = ctx.getParams()
    if (!params.cid) {
      return ctx.error('请填写cid')
    }
    const article = await ContentModel.findById(params.cid)
    if (article) {
      const metas = await getMetas(params.cid)
      article.setDataValue('tags', metas.tags)
      article.setDataValue('category', metas.category)
      ctx.success(article)
    } else {
      ctx.error('内容不存在', 404)
    }
  }

  /**
   * 删除指定id的内容
   * @param ctx = ctx.getParams()
   * @param ctx.cid
   */
  async del (ctx) {
    const params = ctx.getParams()
    if (!params.cid) {
      return ctx.error('请填写cid')
    }
    const article = await ContentModel.findOne({
      where: {
        cid: params.cid,
        status: {
          not: 'delete'
        }
      }
    })
    if (!article) {
      return ctx.error('内容不存在', 404)
    }
    await ContentModel.update(
      {
        status: 'delete'
      },
      {
        where: {
          cid: params.cid
        }
      }
    )
    return ctx.success(null, '删除成功')
  }

  /**
   * 获取文章列表
   * @param ctx = ctx.getParams()
   * @param ctx.pageIndex = 1
   * @param ctx.pageSize = 10
   */
  async articleList (ctx) {
    const params = ctx.getParams()
    const {
      pageIndex = 1,
      pageSize = 10,
      status = 'online'
    } = params
    let list = await ContentModel.findAll({
      offset: (pageIndex === 1 ? 0 : pageIndex) * pageSize, limit: pageSize,
      where: {
        type: 'article',
        status: status
      }
    })
    for (let i = 0; i < list.length; i++) {
      const item = list[i]
      // 获取tag category
      const metas = await getMetas(item.cid)
      item.setDataValue('tags', metas.tags)
      item.setDataValue('category', metas.category)
      // 提取文章缩略图，文本长度
      const imgs = util.getContentImgs(item.content)
      item.setDataValue('thumb', imgs.length > 0 ? imgs[0].url : '')
      item.setDataValue('content', item.content.length > 20 ? item.content = item.content.slice(0, 20) + '...' : item.content)
    }
    ctx.success({
      pageIndex,
      pageSize,
      list
    })
  }
}

module.exports = new ContentController()