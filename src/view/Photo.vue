<template>
  <div class="wraper">
    <NavBar></NavBar>
    <div class="content">
      <Loading :loading="loading"></Loading>
      <div class="photo-list">
        <div class="waterFall">
          <div class="photo-item" v-for="photo in photos">
            <img :src="photo.urls.small" :alt="photo.id" />
          </div>
        </div>
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
      url: 'https://api.unsplash.com/photos?client_id=fc1ad074b94abad2fa784ab7740425e91b4ec8db73473371fa36aaa88e866658&page=',
      page: 1,
      photos: []
    }
  },
  methods: {
  },
  components: {
    NavBar,
    Loading
  },
  mounted () {
    this.$http.get(this.url + this.page).then((response) => {
      this.loading = false
      this.photos = response.body
    }, (response) => {
      this.loading = false
      console.error('请求失败！')
    })
  }
}
</script>

<style lang="scss">
  .photo-list {
    margin: auto;
    max-width: 1200px;

    .waterFall {
    }

    .photo-item {
      float: left;
      display: inline-block;
      width: 375px;
      margin: 12px;

      img {
        width: 100%;
        cursor: zoom-in;
      }
    }
  }
</style>
