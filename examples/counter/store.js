import Vue from 'vue'
import Vuex from 'vuex'
// vuex详解
// 1、定义：应用开发的状态管理模式

Vue.use(Vuex)

// root state object.
// each Vuex instance is just a single state tree.
const state = {
  count: 0
}
// 2、store是一个容器，基本上包含大部分的状态。

// mutations are operations that actually mutates the state.
// each mutation handler gets the entire state tree as the
// first argument, followed by additional payload arguments.
// mutations must be synchronous and can be recorded by plugins
// for debugging purposes.

// 3、mutations用于改变状态，第一个参数是，state tree,另外的参数是payload，mutations必须是同步的
const mutations = {
  increment (state) {
    state.count++
  },
  decrement (state) {
    state.count--
  }
}
// 4、action提交的是 mutation，而不是直接变更状态。Action 可以包含任意异步操作。
// action函数接收的一个对象，通过commit提交mutation

// actions are functions that cause side effects and can involve
// asynchronous operations.
const actions = {
  increment: ({ commit }) => commit('increment'),
  decrement: ({ commit }) => commit('decrement'),
  incrementIfOdd ({ commit, state }) {
    if ((state.count + 1) % 2 === 0) {
      commit('increment')
    }
  },
  // 异步的
  incrementAsync ({ commit }) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        commit('increment')
        resolve()
      }, 1000)
    })
  }
}

// getters are functions
//  store中的getters可认为是store的计算属性getter 的返回值会根据它的依赖被缓存起来，且只有当它的依赖值发生了改变才会被重新计算。
// getter接受state为第一个参数
const getters = {
  evenOrOdd: state => (state.count % 2 === 0 ? 'even' : 'odd'),
  count: state => state.count
}

// A Vuex instance is created by combining the state, mutations, actions,
// and getters.

// 总结：一个vuex中结合了state，mutations，actions，getters
export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})
