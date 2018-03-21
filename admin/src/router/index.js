import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: () => import('src/view/Main.vue'),
      children: [
        {
          path: 'home',
          meta: {
            title: '主页'
          },
          component: () => import('src/view/Home.vue')
        },
        {
          path: 'tag/list',
          meta: {
            title: '标签列表'
          },
          component: () => import('src/view/tag/Tag.vue')
        },
        {
          path: 'tag/create',
          meta: {
            title: '新建标签'
          },
          component: () => import('src/view/tag/CreateTag.vue')
        },
        {
          path: 'category/list',
          meta: {
            title: '分类列表'
          },
          component: () => import('src/view/category/Category.vue')
        },
        {
          path: 'category/create',
          meta: {
            title: '分类列表'
          },
          component: () => import('src/view/category/CreateCategory.vue')
        },
        {
          path: 'article/list',
          meta: {
            title: '文章列表'
          },
          component: () => import('src/view/article/EditArticle.vue')
        },
        {
          path: 'article/create',
          meta: {
            title: '新建文章'
          },
          component: () => import('src/view/article/CreateArticle.vue')
        },
        {
          path: 'setting/base',
          meta: {
            title: '基本设置'
          },
          component: () => import('src/view/setting/BaseSetting.vue')
        },
        {
          path: 'setting/user',
          meta: {
            title: '个人设置'
          },
          component: () => import('src/view/setting/UserSetting.vue')
        }
      ]
    },
    {
      path: '/login',
      meta: {
        title: '登录'
      },
      component: () => import('src/view/Login.vue')
    },
    {
      path: '/register',
      meta: {
        title: '注册'
      },
      component: () => import('src/view/Register.vue')
    }
  ]
})
