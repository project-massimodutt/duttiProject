// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import './assets/css/reset.css'
// 取消a标签在移动端点击时的蓝色
import './assets/css/a.css'
import './assets/css/iconfont.css'
// import "./assets/fonts/iconfont.css"
import router from './router'
import 'lib-flexible/flexible'
import axios from 'axios'
import $ from 'jquery'
import store from './store/index'
import VueAwesomeSwiper from 'vue-awesome-swiper'
//vue-awesome-swiper2.6以上需要自己手动导入css样式
require('swiper/dist/css/swiper.css');
Vue.use(VueAwesomeSwiper);

Vue.prototype.$axios = axios;
//生产环境打包时, 将其替换为http://localhost:8888/data
Vue.prototype.$api = "/api";


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>'
})


