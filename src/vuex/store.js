import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutations'
import actions from './actions'
import getters from './getters'

Vue.use(Vuex)

export default new Vuex.Store({
  // state 保存初始数据
  state: {
    count: 0
  },
  //  mutations 函数
  mutations: mutations,
  // 触发事件函数
  actions: actions,
  // 取值函数
  getters: getters
})

console.log(actions)
