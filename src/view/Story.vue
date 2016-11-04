<template>
  <div class="wraper">
    <NavBar></NavBar>
    <div class="content">
      <Loading :loading="loading"></Loading>
      <div class="s-list">
        <Sitem v-for="list in lists" :item="list"></Sitem>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from '../components/Nav'
import Sitem from '../components/Sitem'
import Loading from '../components/Loading'

export default {
  data () {
    return {
      url: 'https://route.showapi.com/955-1?&showapi_appid=26601&showapi_timestamp=20161103170634&type=dp&showapi_sign=c23526a67ce4ea5bc3fd75123ddf55cc&page=',
      current: 1,
      allPages: '',
      lists: [],
      loading: true
    }
  },
  computed: {
  },
  methods: {
    start () {
      this.$http.get(this.url + this.current).then((response) => {
        const data = response.body.showapi_res_body.pagebean
        this.allPages = data.allPages ? data.allPages : 0
        this.lists = data.contentlist
        this.loading = false
      }, (response) => {
        console.error('请求失败！')
      })
    }
  },
  components: {
    NavBar,
    Sitem,
    Loading
  },
  mounted () {
    this.start()
  }
}
</script>

<style lang="scss">
</style>
