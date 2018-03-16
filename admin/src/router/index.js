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
          component: () => import('src/view/Home.vue')
        },
        {
          path: 'article/create-article',
          component: () => import('src/view/article/CreateArticle.vue')
        },
        {
          path: 'article/edit-article',
          component: () => import('src/view/article/EditArticle.vue')
        }
      ]
    }
  ]
})
