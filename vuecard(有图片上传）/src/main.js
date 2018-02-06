import Vue from 'vue'
import App from './App'
import router from './router'
import axios from './api/http'
import YDUI from 'vue-ydui';

const FastClick = require('fastclick');
document.addEventListener('DOMContentLoaded', function () {
    FastClick.attach(document.body);
}, false);

import 'vue-ydui/dist/ydui.px.css'; 
import "./assets/fonts/iconfont.css";  

Vue.use(YDUI);

// 将axios挂载到prototype上，在组件中可以直接使用this.axios访问
Vue.prototype.axios = axios
Vue.config.productionTip = false
import './assets/index.less';
/* eslint-disable no-new */
new Vue({
  el: '#app',
  axios,
  router,
  render: h => h(App)
})
