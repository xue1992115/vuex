<template>
  <div class="cart">
    <h2>Your Cart</h2>
    <p v-show="!products.length"><i>Please add some products to cart.</i></p>
    <ul>
      <li
        v-for="product in products"
        :key="product.id">
        {{ product.title }} - {{ product.price | currency }} x {{ product.quantity }}
      </li>
    </ul>
    <p>Total: {{ total | currency }}</p>
    <p><button :disabled="!products.length" @click="checkout(products)">Checkout</button></p>
    <p v-show="checkoutStatus">Checkout {{ checkoutStatus }}.</p>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'

export default {
  computed: {
    /*mapState作用是将对象和数组中的值，转换为计算属性的写法
    原理就是：格式化 mapState 传进来的 states 参数，state参数有两种形式：数组，对象，第一次格式化返回数组，之后进行处理拼接符合 computed 的对象
    另外，还使用到扩展运算符， 使用对象展开运算符将此对象混入到外部对象中
    */

    /*mapGetters：辅助函数仅仅是将 store 中的 getter 映射到局部计算属性 
    使用对象展开运算符将 getter 混入 computed 对象中
    */
    ...mapState({
      checkoutStatus: state => state.cart.checkoutStatus
    }),
    ...mapGetters('cart', {
      products: 'cartProducts',  /*把 `this.products` 映射为 `this.$store.getters.cartProducts`*/
      total: 'cartTotalPrice'
    })
  },
  methods: {
    /* 计算总价 */
    checkout (products) {
      this.$store.dispatch('cart/checkout', products)
    }
  }
}
</script>
