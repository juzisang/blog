const util = require('../util/util')
const config = require('../config')
const ContentModel = require('../model').Content
const MetasModel = require('../model').Metas
const RelationshipsModel = require('../model').Relationships

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
  async createArticle (ctx) {
    const rules = {
      title: {type: 'string', required: true},
      content: {type: 'string', required: true},
      tags: {type: 'array', required: true},
      category: {type: 'string', required: true},
      status: {type: 'enum', enum: ['online', 'draft', 'delete']}
    }
    // 新建
    const createContent = async ({title, content, authorId = ctx.state['user'].user, status = 'online', tags, category}) => await ContentModel.create({
      title,
      content,
      authorId,
      status,
      type: 'article'
    })
    // 新建Tag
    const createList = async (tags, category, contentData) => {
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
    }
    // 修改slug为id
    const updateSlug = async (cid) => await ContentModel.update({slug: cid}, {where: {cid}})
    await util.validate(rules, ctx.getParams())
      .then(async params => ({
        params,
        data: await createContent(params)
      }))
      .then(async params => {
        await updateSlug(params.data.cid)
        return params
      })
      .then(async data => {
        await createList(data.params.tags, data.params.category, data.data)
        return data.data
      })
      .then(data => ctx.success({cid: data.cid}, '创建成功'))
      .catch(err => ctx.error(err))
  }

  async editArticle (ctx) {
    const rules = {
      cid: {type: 'string', required: true},
      title: {type: 'string', required: true},
      content: {type: 'string', required: true},
      tags: {type: 'array', required: true},
      category: {type: 'string', required: true},
      status: {type: 'enum', enum: ['online', 'draft', 'delete']}
    }
    // 删除分类和标签
    const delList = async (cid) => await RelationshipsModel.destroy({
      where: {
        cid
      }
    })
    // 添加修改的标签
    const addList = async (params) => {
      await Promise.all(params.tags.map(mid => RelationshipsModel.create({
        mid,
        cid: params.cid
      })))
      await RelationshipsModel.create({
        mid: params.category,
        cid: params.cid
      })
    }
    // 保存文章
    const save = async ({cid, title, content, status}) => await ContentModel.update(
      {title, content, status},
      {
        where: {
          cid: cid
        }
      }
    )
    await util.validate(rules, ctx.getParams())
      .then(async params => {
        const data = await ContentModel.findById(params.cid)
        if (data) {
          return params
        }
        return Promise.reject(new ctx.StatusError('内容不存在', 404))
      })
      .then(async params => {
        await delList(params.cid)
        return params
      })
      .then(async params => {
        await addList(params)
        return params
      })
      .then(async params => {
        await save(params)
        return params
      })
      .then(params => ctx.success({cid: params.cid}, '编辑成功'))
      .catch(err => ctx.error(err))
  }

  async details (ctx) {
    const start = new Promise((resolve, reject) => resolve(ctx.getParams()))
    const queryArticle = async cid => await ContentModel.findById(cid)
    const withArticle = (data) => new Promise(async resolve => {
      const metas = await getMetas(data.cid)
      data.setDataValue('tags', metas.tags)
      data.setDataValue('category', metas.category)
      resolve(data)
    })
    await start.then(params => params.cid ? params.cid : Promise.resolve(new ctx.StatusError('请填写cid', 404)))
      .then(async cid => await queryArticle(cid))
      .then(async cid => await withArticle(cid))
      .then(data => ctx.success(data))
      .catch(err => ctx.error(err))
  }

  async del (ctx) {
    const start = new Promise((resolve, reject) => resolve(ctx.getParams()))
    const queryArticle = async cid => await ContentModel.findOne({
      where: {
        cid: params.cid,
        status: {
          not: 'delete'
        }
      }
    })
    const delArticle = async cid => await ContentModel.update(
      {
        status: 'delete'
      },
      {
        where: {
          cid
        }
      }
    )
    await start.then(params => params.cid ? params.cid : Promise.resolve(new ctx.StatusError('请填写cid', 404)))
      .then(async cid => await queryArticle(cid) ? cid : Promise.reject(new ctx.StatusError('内容不存在', 404)))
      .then(async cid => await delArticle(cid))
      .then(() => ctx.success(null, '刪除成功'))
      .catch(err => ctx.error(err))
  }

  async articleList (ctx) {
    const start = new Promise(resolve => resolve(ctx.getParams()))
    // 查询出数据
    const queryArticleList = async ({pageIndex = 1, pageSize = 10, status = 'online'}) => await ContentModel.findAll({
      offset: (pageIndex === 1 ? 0 : pageIndex) * pageSize, limit: pageSize,
      where: {
        type: 'article',
        status: status
      }
    })
    // 处理list
    const listFor = (data) => new Promise(async resolve => {
      const list = data.list
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
      resolve(data)
    })
    await start.then(async params => ({
      pageIndex: params.index,
      pageSize: params.pageSize,
      list: await queryArticleList(params)
    }))
      .then(async data => await listFor(data))
      .then(data => ctx.success(data))
      .catch(err => ctx.error(err))
  }
}

module.exports = new ContentController()