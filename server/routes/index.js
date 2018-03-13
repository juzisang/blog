const ContentController = require('../controller/content')
const UserController = require('./../controller/user')
const MapRouter = require('../util/router')

module.exports = new MapRouter([
  {
    url: '/article',
    children: [
      {
        url: '/create',
        controller: ContentController.createArticle,
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
      }
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
        url: '/all',
        controller: UserController.all,
      },
      {
        url: '/details/:id',
        controller: UserController.details,
      },
    ]
  },
  {
    url: '*',
    controller: (ctx) => ctx.error('接口不存在', 404)
  },
])

