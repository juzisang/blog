import Http from 'src/assets/js/Http'

export const GET_TAGS = 'common/getTags'
export const GET_CATEGORY = 'common/getCategory'

export const SAVE_TAGS = 'common/saveTags'

export default {
  state: {
    tags: [],
    categorys: []
  },
  getters: {},
  mutations: {
    [SAVE_TAGS] (state, tags) {
      state.tags = tags
    }
  },
  actions: {
    async [GET_TAGS] ({state, commit}) {
      const list = await Http.getTags()
      const tags = list.data.data
      commit(SAVE_TAGS, tags)
    },
    [GET_CATEGORY] () {
    }
  }
}
