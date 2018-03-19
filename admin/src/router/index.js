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
          path: 'tag',
          meta: {
            title: '标签管理'
          },
          component: () => import('src/view/Tag.vue')
        },
        {
          path: 'category',
          meta: {
            title: '分类管理'
          },
          component: () => import('src/view/Category.vue')
        },
        {
          path: 'article/create-article',
          meta: {
            title: '新建文章'
          },
          component: () => import('src/view/article/CreateArticle.vue')
        },
        {
          path: 'article/edit-article',
          meta: {
            title: '编辑文章'
          },
          component: () => import('src/view/article/EditArticle.vue')
        }
      ]
    },
    {
      path: '/login',
      meta: {
        title: '登录'
      },
      component: () => import('src/view/Login.vue')
    }
  ]
})
