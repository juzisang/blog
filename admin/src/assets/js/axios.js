import Axios from 'axios'
import qs from 'qs'
import router from 'src/router'

const axios = Axios.create({
  baseURL: 'http://localhost:9000/',
  withCredentials: true,
  transformRequest: [function (data, headers) {
    headers['Authorization'] = localStorage.getItem('Authorization')
    return qs.stringify(data, { arrayFormat: 'brackets' })
  }],
  paramsSerializer: function (params) {
    return qs.stringify(params, { arrayFormat: 'brackets' })
  }
})

axios.interceptors.response.use(
  response => {
    return response
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          router.replace('/login')
      }
    }
    return Promise.reject(error.response ? error.response.data : error)
  }
)

export default axios

export function request (method, url, data) {
  return axios({method, url, data}).then((data) => data.data)
}
