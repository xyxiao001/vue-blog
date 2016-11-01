import Vue from 'vue'
import Vuex from 'vuex'

import * as mutations from './mutations'
import * as actions from './actions'
import * as getters from './getters'

Vue.use(Vuex)

const state = {
  count: 0
}

export default new Vuex.Store({
  // state 保存初始数据
  state,
  //  mutations 函数
  mutations,
  // 触发事件函数
  actions,
  // 取值函数
  getters,
  // 开发使用严格模式
  strict: process.env.NODE_ENV !== 'production'
})
