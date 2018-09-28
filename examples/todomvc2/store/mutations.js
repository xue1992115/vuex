export const STORAGE_KEY = 'todos-vuejs'

// for testing
if (navigator.userAgent.indexOf('PhantomJS') > -1) {
  window.localStorage.clear()
}

export const mutations = {
  // 添加 Todo
  addTodo (state, todo) {
    state.todos.push(todo)
  },
  //  移除Todo
  removeTodo (state, todo) {
    state.todos.splice(state.todos.indexOf(todo), 1)
  },
  // 编辑 Todo
  editTodo (state, { todo, text = todo.text, done = todo.done }) {
    todo.text = text
    todo.done = done
  }
}
