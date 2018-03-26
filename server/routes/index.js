const ContentController = require('../controller/content')
const UserController = require('./../controller/user')
const MetaController = require('../controller/meta')
const CommonController = require('../controller/common')
const MapRouter = require('../plugin/MapRouter')

module.exports = new MapRouter([
  {
    url: '/article',
    children: [
      {
        url: '/create',
        controller: ContentController.createArticle,
      },
      {
        url: '/edit',
        controller: ContentController.editArticle,
      },
      {
        url: '/details',
        controller: ContentController.details
      },
      {
        url: '/delete',
        controller: ContentController.del
      },
      {
        url: '/list',
        controller: ContentController.articleList
      },
    ]
  },
  {
    url: '/user',
    children: [
      {
        url: '/register',
        controller: UserController.register,
      },
      {
        url: '/login',
        controller: UserController.login,
      },
      {
        url: '/edit',
        controller: UserController.edit,
      },
      {
        url: '/info',
        controller: UserController.userInfo,
      }
    ]
  },
  {
    url: '/comment',
    children: [
      {
        url: '/recent',
        controller: CommonController.getRecentComments
      }
    ]
  },
  {
    url: '/meta',
    children: [
      {
        url: '/create',
        controller: MetaController.createMeta
      },
      {
        url: '/edit',
        controller: MetaController.editMeta
      },
      {
        url: '/del',
        controller: MetaController.delMeta
      },
      {
        url: '/tags',
        controller: MetaController.getTags
      },
      {
        url: '/category',
        controller: MetaController.getCategory
      },
      {
        url: '/find_or_create',
        controller: MetaController.findOrCreateMeta
      }
    ]
  },
  {
    url: '*',
    controller: (ctx) => ctx.error('接口不存在', 404)
  }
])
