import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    goodsList: [],
    tagList: {},
    tag: [],
  },
  mutations: {
    getGoodList(state, data) {
      state.goodsList = data;
    },
    //当前标签所在的列表
    getTag(state, data) {
      state.tagList = data;
    },
    tag(state, data) {
      state.tag = data;
    },
  },
  actions: {}
})
