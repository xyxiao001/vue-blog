<template>
  <div class="wraper">
    <NavBar></NavBar>
    <Loading :loading="loading"></Loading>
    <div class="content" v-show="!loading">
      <div class="s-list">
        <Sitem v-for="list in lists" :item="list"></Sitem>
      </div>
      <Pagenation :allPages="allPages" :current="current"></Pagenation>
    </div>
  </div>
</template>

<script>
import NavBar from '../components/Nav'
import Sitem from '../components/Sitem'
import Loading from '../components/Loading'
import Pagenation from '../components/Pagenation'

export default {
  data () {
    return {
      url: 'https://route.showapi.com/955-1?&showapi_appid=26601&type=dp&showapi_sign=adc05e2062a5402b81c563a3ced09208&page=',
      allPages: 0,
      lists: [],
      loading: true
    }
  },
  computed: {
    current () {
      return this.$route.query.page ? this.$route.query.page : 1
    }
  },
  watch: {
    current () {
      this.loading = true
      this.start()
    }
  },
  methods: {
    start () {
      this.$http.get(this.url + this.current).then((response) => {
        this.loading = false
        const data = response.body.showapi_res_body.pagebean
        this.allPages = data.allPages ? data.allPages : 0
        this.lists = data.contentlist
        window.scroll(0, 0)
      }, (response) => {
        this.loading = false
        console.error('请求失败！')
      })
    }
  },
  components: {
    NavBar,
    Sitem,
    Loading,
    Pagenation
  },
  mounted () {
    this.start()
  }
}
</script>
