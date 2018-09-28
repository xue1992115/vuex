<template>
  <ul>
    <li
      v-for="product in products"
      :key="product.id">
      {{ product.title }} - {{ product.price | currency }}
      <br>
      <button
        :disabled="!product.inventory"
        @click="addProductToCart(product)">
        Add to cart
      </button>
    </li>
  </ul>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  computed: mapState({
    products: state => state.products.all
  }),
  methods: mapActions('cart', [
    'addProductToCart'
  ]),
  /* vue生命周期在created，通过dispatch方法触发action */
  created () {
    this.$store.dispatch('products/getAllProducts')
  }
}
</script>
