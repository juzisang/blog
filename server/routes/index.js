const ContentController = require('../controller/content')
const UserController = require('./../controller/user')
const MetaController = require('../controller/meta')
const CommonController = require('../controller/common')
const Router = require('koa-router')

const router = new Router()

router.get('/articles', ContentController.articleList)
  .get('/article/:cid', ContentController.details)
  .post('/article', ContentController.createArticle)
  .del('/article', ContentController.del)
  .put('/article', ContentController.editArticle)

router.get('/user/:uid', UserController.userInfo)
  .put('/user', UserController.edit)
  .post('/register', UserController.register)
  .post('/login', UserController.login)

router.get('/comment', CommonController.getRecentComments)

router.get('/tags', MetaController.getTags)
  .post('/tag', MetaController.createMeta)
  .put('/tag', MetaController.editMeta)
  .del('/tag', MetaController.delMeta)
  .get('/category', MetaController.getCategory)
  .all('/meta', MetaController.findOrCreateMeta)

router.get('*', (ctx) => ctx.error('接口不存在', 404))

module.exports = router
