<template>
  <div class="wraper">
    <NavBar></NavBar>
    <div class="content">
      123
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
  methods: {
    start () {
      this.$http.get('https://route.showapi.com/955-1?page=1&showapi_appid=26601&showapi_timestamp=20161103170634&type=dp&showapi_sign=c23526a67ce4ea5bc3fd75123ddf55cc').then((response) => {
        console.log(response.body)
      }, (response) => {
        console.error('请求失败！')
      })
    }
  },
  components: {
    NavBar
  },
  mounted () {
  }
}
</script>

<style lang="scss">
</style>
