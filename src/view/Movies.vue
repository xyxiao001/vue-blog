<template>
  <div class="wraper">
    <NavBar></NavBar>
    <Loading :loading="loading"></Loading>
    <div class="content">
      <div class="m-title">
        <h3>豆瓣电影TOP250</h3>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from '../components/Nav'
import Loading from '../components/Loading'
export default {
  data () {
    return {
      loading: false,
      start: 0,
      url: 'https://api.douban.com/v2/movie/top250?start=',
      movies: {}
    }
  },
  computed: {
  },
  components: {
    NavBar,
    Loading
  },
  mounted () {
    this.$http.jsonp(this.url + this.start).then((response) => {
      this.movies = response.body
      this.start += 20
      this.loading = false
    }, (response) => {
      console.log('请求失败!')
    })
  }
}
</script>

<style lang="scss">
</style>
