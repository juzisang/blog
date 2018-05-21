import Http from 'src/assets/js/Http'

export const GET_TAGS = 'common/getTags'
export const GET_CATEGORY = 'common/getCategory'
export const RESET_TAGS = 'common/resetTags'
export const RESET_CATEGORY = 'common/resetCategory'
export const GET_USERINFO = 'common/getUserInfo'

export const SAVE_TAGS = 'common/saveTags'
export const SAVE_CATEGORY = 'common/saveCategory'
export const SAVE_USERINFO = 'common/saveUserInfo'

export default {
  state: {
    tags: [],
    categorys: [],
    userInfo: []
  },
  getters: {},
  mutations: {
    [SAVE_TAGS] (state, tags) {
      state.tags = tags
    },
    [SAVE_CATEGORY] (state, categorys) {
      state.categorys = categorys
    },
    [SAVE_USERINFO] (state, info) {
      state.userInfo = info
    }
  },
  actions: {
    async [GET_TAGS] ({state, commit, dispatch}) {
      if (!state.tags.length) {
        dispatch(RESET_TAGS)
      }
    },
    async [GET_CATEGORY] ({state, commit, dispatch}) {
      if (!state.categorys.length) {
        dispatch(RESET_CATEGORY)
      }
    },
    async [GET_USERINFO] ({state, commit, dispatch}) {
      const userInfo = await Http.getUserInfo()
      commit(SAVE_USERINFO, userInfo.data)
    },
    async [RESET_TAGS] ({state, commit}) {
      const list = await Http.getTags()
      const tags = list.data
      commit(SAVE_TAGS, tags)
    },
    async [RESET_CATEGORY] ({state, commit}) {
      const list = await Http.getCategory()
      const categorys = list.data
      commit(SAVE_CATEGORY, categorys)
    }
  }
}
