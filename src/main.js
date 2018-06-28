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

// 导入vue-amap
import VueAMap from 'vue-amap'
//在定制化程度较高的项目中，开发者可能只想通过 vue-amap 引入高德地图，而部分实例化的操作直接基于高德地图的 sdk 完成。这个时候就需要 lazyAMapApiLoaderInstance。
import { lazyAMapApiLoaderInstance } from 'vue-amap';


//vue-awesome-swiper2.6以上需要自己手动导入css样式
require('swiper/dist/css/swiper.css');
Vue.use(VueAwesomeSwiper);

Vue.prototype.$axios = axios;
//生产环境打包时, 将其替换为http://localhost:8888/data
Vue.prototype.$api = "/api";

// 实例化vue-amap
Vue.use(VueAMap)
VueAMap.initAMapApiLoader({
  key: 'd0f51d5e8af91110addb3e08c63642b5',
  // 插件
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale'],
  v: '1.4.4',
  // 引入高德原生UI库
  uiVersion: '1.0.11' // 版本号
});
lazyAMapApiLoaderInstance.load().then(() => {
  // your code ...
  this.map = new AMap.Map('amapContainer', {
    center: new AMap.LngLat(121.59996, 31.197646)
  });
});

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>'
})


