import { request } from './axios.js'

class Http {
  register ({ mail, name, password }) {
    return request('post', '/register', { mail, name, password })
  }

  login ({ name, password }) {
    return request('post', '/login', { name, password })
  }

  getUserInfo () {
    return request('get', '/user')
  }

  getTags () {
    return request('get', '/tags')
  }

  addTag ({ name, slug }) {
    return request('post', '/tag', { name, slug })
  }

  editTag ({ name, slug, mid }) {
    return request('put', '/tag', { name, slug, mid })
  }

  delTag (mid) {
    return request('delete', '/tag', { mid })
  }

  getCategory () {
    return request('get', '/categorys')
  }

  delCategory (mid) {
    return request('delete', '/category', { mid })
  }

  addCategory ({ name, slug, description }) {
    return request('post', '/category', { name, slug, description })
  }

  editCategory ({ name, slug, mid, description }) {
    return request('put', '/category', { name, slug, mid, description })
  }

  createArticle ({ title, slug, content, type, authorId, status, tags, category, order }) {
    return request('post', '/article', { title, slug, content, type, authorId, status, tags, category, order })
  }

  updateArticle ({ cid, title, slug, content, type, authorId, status, tags, category, order }) {
    return request('put', '/article', { cid, title, slug, content, type, authorId, status, tags, category, order })
  }

  findOrCreateMeta ({ name, slug, type }) {
    return request('post', '/meta', { name, slug, type })
  }
}

export default new Http()
