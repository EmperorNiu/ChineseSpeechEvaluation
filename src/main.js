import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import './assets/css/global.css'

import axios from 'axios'

Vue.config.productionTip = false
// axios 配置
// 配置请求根路径:线上使用
axios.defaults.baseURL = 'http://47.103.83.192:8001/api/'
// 线下调试
// axios.defaults.baseURL = 'http://localhost:8001/api/'s
Vue.prototype.$http = axios
axios.defaults.headers.post['Content-Type'] = 'application/json'

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
