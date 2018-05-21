const ContentController = require('../controller/content')
const UserController = require('./../controller/user')
const MetaController = require('../controller/meta')
const CommonController = require('../controller/common')
const Router = require('koa-router')

const router = new Router()

router.get('/articles', ContentController.articleList)
  .get('/article', ContentController.details)
  .post('/article', ContentController.createArticle)
  .put('/article', ContentController.editArticle)
  .del('/article', ContentController.del)

router.post('/register', UserController.register)
  .post('/login', UserController.login)
  .get('/user', UserController.userInfo)
  .put('/user', UserController.edit)

router.get('/tags', MetaController.getTags)
  .post('/tag', MetaController.createMeta)
  .put('/tag', MetaController.editMeta)
  .del('/tag', MetaController.delMeta)

router.get('/categorys', MetaController.getCategory)
  .post('/category', MetaController.createMeta)
  .put('/category', MetaController.editMeta)
  .del('/category', MetaController.delMeta)
  .post('/meta', MetaController.findOrCreateMeta)

router.get('/comment', CommonController.getRecentComments)

router.get('*', (ctx) => ctx.error('接口不存在', 404))

module.exports = router
