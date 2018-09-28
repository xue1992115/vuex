import Vue from 'vue'
import Vuex from 'vuex'
import * as getters from './getters'
import * as actions from './actions'
import * as mutations from './mutations'

Vue.use(Vuex)

const state = {
  count: 0,
  history: []
}

const store = new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})

if (module.hot) {
  // 使./getters,./actions,./mutations成为可热重载模块
  // "热重载"不是当你修改文件的时候简单重新加载页面。
  // 启用热重载后，当你修改 .vue 文件时，所有该组件的实例会被替换，并且不需要刷新页面。它甚至保持应用程序和被替换组件的当前状态！当你调整模版或者修改样式时，这极大的提高了开发体验。
  module.hot.accept(['./getters', './actions', './mutations'], () => {
    store.hotUpdate({
      getters: require('./getters'),
      actions: require('./actions'),
      mutations: require('./mutations')
    })
  })
}

export default store
