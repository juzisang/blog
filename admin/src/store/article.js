import Http from 'src/assets/js/Http'

export const SAVE_ARTICLE = 'article/saveArticle'
export const SAVE_CID = 'article/saveCid'

export const SET_ARTICLE = 'article/setArticle'
export const SET_CID = 'article/setCid'

const state = {
  cid: null,
  article: {
    title: '',
    content: '',
    status: 'online',
    tags: [],
    category: '',
    ctime: '',
    utime: ''
  }
}

const mutations = {
  [SET_CID] (state, cid) {
    state.cid = cid
  },
  [SET_ARTICLE] (state, article) {
    state.article = Object.assign({}, article)
  }
}

const actions = {
  async [SAVE_CID] (store, cid) {
    store.commit(SET_CID, cid)
  },
  async [SAVE_ARTICLE] (store, article) {
    const data = await (store.state.cid ? Http.updateArticle(Object.assign({}, article, {cid: store.state.cid})) : Http.createArticle(article))
    store.commit(SET_ARTICLE, article)
    store.commit(SET_CID, data.data.data.cid)
    return data
  }
}

export default {
  state,
  mutations,
  actions
}
