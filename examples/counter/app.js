import 'babel-polyfill'
import Vue from 'vue'
import Counter from './Counter.vue'
import store from './store'
// 将store注入组件中，通过$store.state.count访问属性
new Vue({
  el: '#app',
  store,
  render: h => h(Counter)
})
