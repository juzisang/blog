import Http from '../plugins/axios'

export const actions = {
  // 加载主页数据
  async loadHome ({commit}) {
    const list = await Http.get('article/list')
    commit('article/GET_LIST_SUCCESS', list.data)
  }
}
