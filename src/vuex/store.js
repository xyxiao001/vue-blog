import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutations'
import actions from './actions'
import getters from './getters'

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

console.log(mutations)
