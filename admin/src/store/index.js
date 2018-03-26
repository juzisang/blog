import Vue from 'vue'
import Vuex from 'vuex'
import router from 'src/router'
import common, { GET_CATEGORY, GET_TAGS, GET_USERINFO } from './common'
import article from './article'
import Cookies from 'js-cookie'

Vue.use(Vuex)

const store = new Vuex.Store({
  actions: {
    async init ({state, dispatch}) {
      dispatch(GET_USERINFO)
        .then(() => {
          dispatch(GET_CATEGORY)
          dispatch(GET_TAGS)
        })
        .catch(() => {
          Cookies.remove('authorization')
          router.replace('/login')
        })
    }
  },
  modules: {
    common,
    article
  },
  strict: process.env.NODE_ENV !== 'production'
})

export default store
