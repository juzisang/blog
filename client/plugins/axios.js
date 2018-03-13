import axios from 'axios'
import config from '../config'
import Vue from 'vue'

axios.defaults.baseURL = config.baseURL

Vue.prototype.$http = axios

module.exports = axios
