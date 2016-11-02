<template>
  <div class="wraper">
    <NavBar></NavBar>
    <div class="content">
      <Loading :loading="loading"></Loading>
      <div class="photo-list">
        photo
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
      loading: true,
      url: 'https://api.unsplash.com/photos?client_id=fc1ad074b94abad2fa784ab7740425e91b4ec8db73473371fa36aaa88e866658&page=1'
    }
  },
  methods: {
  },
  components: {
    NavBar,
    Loading
  },
  mounted () {
    this.$http.get(this.url).then((response) => {
      this.loading = false
      console.log(response.body)
    }, (response) => {
      console.error('请求失败！')
    })
  }
}
</script>

<style lang="scss">
</style>
