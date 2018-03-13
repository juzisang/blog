export const state = () => ({
  list: {
    pagination: {
      currentPage: 0
    },
    data: []
  }
})

export const mutations = {
  GET_LIST_SUCCESS (state, action) {
    state.list.data = action.data.list
    state.list.pagination.currentPage = action.data.pageIndex
  }
}
