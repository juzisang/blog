import qs from 'qs'
import router from 'src/router'
import Cookies from 'js-cookie'

class Http {
  constructor () {
    this.axios = require('axios').create({
      baseURL: 'http://localhost:9000/',
      withCredentials: true,
      transformRequest: [function (data) {
        return qs.stringify(data)
      }]
    })
    this.axios.interceptors.response.use(
      response => {
        return response
      },
      error => {
        if (error.response) {
          switch (error.response.status) {
            case 401:
              Cookies.remove('authorization')
              router.replace('/login')
          }
        }
        return Promise.reject(error.response ? error.response.data : error)
      })
  }

  register ({mail, name, password}) {
    return this.axios.post('/user/register', {mail, name, password})
  }

  login ({name, password}) {
    return this.axios.post('/user/login', {name, password})
  }

  getUserInfo () {
    return this.axios.get('/user/info')
  }

  getTags () {
    return this.axios.get('/meta/tags')
  }

  getCategory () {
    return this.axios.get('/meta/category')
  }

  addTag ({name, slug}) {
    return this.axios.post('/meta/create', {name, slug, type: 'tag'})
  }

  editTag ({name, slug, mid}) {
    return this.axios.post('/meta/edit', {name, slug, type: 'tag', mid})
  }

  delMeta (mid) {
    return this.axios.post('/meta/del', {mid})
  }

  addCategory ({name, slug, description}) {
    return this.axios.post('/meta/create', {name, slug, description, type: 'category'})
  }

  editCategory ({name, slug, mid, description}) {
    return this.axios.post('/meta/edit', {name, slug, type: 'category', mid, description})
  }

  createArticle ({title, slug, content, type, authorId, status, tags, category, order}) {
    return this.axios.post('/article/create', {title, slug, content, type, authorId, status, tags, category, order})
  }

  updateArticle ({cid, title, slug, content, type, authorId, status, tags, category, order}) {
    return this.axios.post('/article/edit', {
      cid,
      title,
      slug,
      content,
      type,
      authorId,
      status,
      tags,
      category,
      order
    })
  }

  findOrCreateTag ({name, slug}) {
    return this.axios.post('/meta/find_or_create', {name, slug, type: 'tag'})
  }

  findOrCreateCategory ({name, slug}) {
    return this.axios.post('/meta/find_or_create', {name, slug, type: 'category'})
  }
}

export default new Http()
