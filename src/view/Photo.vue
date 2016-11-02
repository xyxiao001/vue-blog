<template>
  <div class="wraper">
    <NavBar></NavBar>
    <div class="content">
      <Loading :loading="loading"></Loading>
      <div class="photo-list">
        <div class="photo-item" v-for="photo in photos">
          <img :src="photo.urls.small" :alt="photo.id"/>
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
      photos: [],
      page: 1
    }
  },
  computed: {
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
    margin-top: 30px;
    width: 1200px;
    -webkit-column-count: 3;
    -moz-column-count: 3;
    column-count: 3;
    -moz-column-gap: 0px; /* Firefox */
    -webkit-column-gap: 0px; /* Safari and Chrome */
    column-gap: 0px;

    .photo-item {
      float: left;
      display: inline-block;
      margin: 5px;

      img {
        width: 100%;
        cursor: zoom-in;
      }
    }
  }

  @media screen and (max-width: 1400px) {
    .photo-list {
      margin-top: 15px;
      width: 800px;
      -webkit-column-count: 3;
      -moz-column-count: 3;
      column-count: 3;
      -moz-column-gap: 0px; /* Firefox */
      -webkit-column-gap: 0px; /* Safari and Chrome */
      column-gap: 0px;
    }
  }
</style>
