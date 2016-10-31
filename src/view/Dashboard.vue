<template>
  <div class="content">
    <button @click="addCount">add</button>
    <button @click="reduceCount">reduce</button>
    <p>{{ count }}</p>
  </div>
</template>

<script>
import store from '../vuex/store'
export default {
  data () {
    return {
    }
  },
  computed: {
    count () {
      return store.getters.getCount
    }
  },
  components: {
  },
  methods: {
    addCount () {
      store.dispatch('increment')
    },
    reduceCount () {
      store.dispatch('decrement')
    }
  },
  // 页面进入执行
  mounted () {
    console.log(store)
  },
  // 页面切换
  destroyed () {
  }
}
</script>

<style lang="scss">
</style>
