<template>
  <div class="go-top" v-show="show" @click="goTop()">
    <i class="iconfont icon-top"></i>
  </div>
</template>

<script>
export default {
  data () {
    return {
      show: false
    }
  },
  methods: {
    goTop () {
      window.scroll(0, 0)
    }
  },
  mounted () {
    window.onscroll = () => {
      window.scrollY > 600 ? this.show = true : this.show = false
    }
  }
}
</script>

<style lang="scss">
  .go-top {
    position: fixed;
    right: 1%;
    bottom: 50px;
    z-index: 999;

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
