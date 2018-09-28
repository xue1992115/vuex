import shop from '../../api/shop'

// initial state
// shape: [{ id, quantity }]
const state = {
  items: [],
  checkoutStatus: null
}

// getters
const getters = {
  // rootState表示的是根结点的状态
  // 遍历item中的商品，将商品展示在页面上
  cartProducts: (state, getters, rootState) => {
    return state.items.map(({ id, quantity }) => {
      const product = rootState.products.all.find(product => product.id === id)
      return {
        title: product.title,
        price: product.price,
        quantity
      }
    })
  },
  // 计算总价
  cartTotalPrice: (state, getters) => {
    return getters.cartProducts.reduce((total, product) => {
      return total + product.price * product.quantity
    }, 0)
  }
}

// actions用于提交mutations
const actions = {
  // 计算总价
  checkout ({ commit, state }, products) {
    // 缓存state.item
    const savedCartItems = [...state.items]
    commit('setCheckoutStatus', null)
    // empty cart 清空cart
    commit('setCartItems', { items: [] })
    shop.buyProducts(
      products,
      () => commit('setCheckoutStatus', 'successful'),
      () => {
        commit('setCheckoutStatus', 'failed')
        // rollback to the cart saved before sending the request
        commit('setCartItems', { items: savedCartItems })
      }
    )
  },
  // 添加商品到购物车
  addProductToCart ({ state, commit }, product) {
    commit('setCheckoutStatus', null)
    if (product.inventory > 0) {
      // 寻找item.id === product.id
      const cartItem = state.items.find(item => item.id === product.id)
      if (!cartItem) {
        // 如果不存在就push（product.id）
        commit('pushProductToCart', { id: product.id })
      } else {
        commit('incrementItemQuantity', cartItem)
      }
      // remove 1 item from stock 添加一件商品，库存减少1
      commit(
        'products/decrementProductInventory',
        { id: product.id },
        { root: true }
      )
    }
  }
}

// mutations
const mutations = {
  // 添加一个商品
  pushProductToCart (state, { id }) {
    state.items.push({
      id,
      quantity: 1
    })
  },
  // 商品数量加1
  incrementItemQuantity (state, { id }) {
    const cartItem = state.items.find(item => item.id === id)
    cartItem.quantity++
  },
  // 清空cart
  setCartItems (state, { items }) {
    state.items = items
  },
  // 设置结算状体 null  successful  failed
  setCheckoutStatus (state, status) {
    state.checkoutStatus = status
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
