import Vue from 'vue'
import Vuex from 'vuex'
import common, { GET_CATEGORY, GET_TAGS } from './common'

Vue.use(Vuex)

const store = new Vuex.Store({
  actions: {
    init ({state, dispatch}) {
      dispatch(GET_CATEGORY)
      dispatch(GET_TAGS)
    }
  },
  modules: {
    common
  },
  strict: process.env.NODE_ENV !== 'production'
})

export default store
