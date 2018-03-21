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
        return Promise.reject(error.response.data)
      })
  }

  register ({mail, name, password}) {
    return this.axios.post('/user/register', {mail, name, password})
  }

  login ({mail, password}) {
    return this.axios.post('/user/login', {mail, password})
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

  addCategory ({name, slug}) {
    return this.axios.post('/meta/create', {name, slug, type: 'category'})
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
}

export default new Http()
