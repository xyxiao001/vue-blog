<template>
  <div class="go-top" v-show="showTop" @click="goTop()">
    <i class="iconfont icon-top"></i>
  </div>
</template>

<script>
export default {
  data () {
    return {
      showTop: false
    }
  },
  methods: {
    goTop () {
      window.scroll(0, 0)
    }
  },
  mounted () {
    window.onscroll = () => {
      window.scrollY > 600 ? this.showTop = true : this.showTop = false
    }
  }
}
</script>

<style lang="scss">
  .go-top {
    position: fixed;
    right: 1%;
    bottom: 50px;
    z-index: 9999;

    i {
      font-size: 40px;
      cursor: pointer;
      color: gray;
      transition: all 0.5s ease-out;

      &:hover {
        font-size: 45px;
        color: #50bfff;
      }
    }
  }
</style>
