<template>
  <div class="wraper">
    <NavBar></NavBar>
    <div class="content">
      首页
    </div>
  </div>
</template>

<script>
import NavBar from '../components/Nav'
export default {
  data () {
    return {
    }
  },
  computed: {
  },
  components: {
    NavBar
  },
  methods: {
  },
  // 页面进入执行
  mounted () {
  },
  // 页面切换
  destroyed () {
  }
}
</script>

<style lang="scss">
  .content {
    background-color: #fff;
    padding-left: 250px;
    padding-right: 40px;
    width: auto;
  }
</style>
