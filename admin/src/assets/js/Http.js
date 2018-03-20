import qs from 'qs'

class Http {
  constructor () {
    this.axios = require('axios').create({
      baseURL: 'http://localhost:9000/',
      transformRequest: [function (data) {
        return qs.stringify(data)
      }]
    })
  }

  register ({mail, name, password}) {
    return this.axios.post('/user/register', {mail, name, password})
  }

  login ({mail, password}) {
    return this.axios.post('/user/login', {mail, password})
  }
}

export default new Http()
