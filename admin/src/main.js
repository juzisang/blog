// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import Cookies from 'js-cookie'
import 'normalize.css'
import 'element-ui/lib/theme-chalk/index.css'
import 'src/assets/style/base.scss'
import VueMarkdown from 'vue-markdown'
import App from './App.vue'
import router from './router'
import Http from 'src/assets/js/Http'

Vue.config.productionTip = false

Vue.use(ElementUI, {size: 'small'})
Vue.component('VueMarkdown', VueMarkdown)

Vue.prototype.$Http = Http

router.beforeEach((to, from, next) => {
  if (to.fullPath !== '/login' && to.fullPath !== '/register') {
    if (!Cookies.get('authorization')) {
      return next('/login')
    }
  }
  document.title = to.meta.title
  next()
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>'
})
