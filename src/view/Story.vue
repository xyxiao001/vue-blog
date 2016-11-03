<template>
  <div class="wraper">
    <NavBar></NavBar>
    <div class="content">
      <div class="s-list">
        <Sitem  v-for="list in lists" :item="list"></Sitem>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from '../components/Nav'
import Sitem from '../components/Sitem'

export default {
  data () {
    return {
      url: 'https://route.showapi.com/955-1?&showapi_appid=26601&showapi_timestamp=20161103170634&type=dp&showapi_sign=c23526a67ce4ea5bc3fd75123ddf55cc&page=',
      current: 1,
      allPages: '',
      lists: []
    }
  },
  computed: {
  },
  methods: {
    start () {
      this.$http.get(this.url + this.current).then((response) => {
        const data = response.body.showapi_res_body.pagebean
        this.allPages = data.allPages
        this.lists = data.contentlist
      }, (response) => {
        console.error('请求失败！')
      })
    }
  },
  components: {
    NavBar,
    Sitem
  },
  mounted () {
    this.start()
  }
}
</script>

<style lang="scss">
</style>
