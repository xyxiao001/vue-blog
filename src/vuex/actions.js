// 用户操作数据触发方式
export const setStory = ({ commit, state }, payload) => {
  commit('setStory', payload)
}

// 改变nav
export const setNav = ({ commit, state }, payload) => {
  commit('setNav', payload)
}
