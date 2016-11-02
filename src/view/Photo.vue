<template>
  <div class="wraper">
    <NavBar></NavBar>
    <div class="content photo-c">
      <Loading :loading="loading"></Loading>
      <div class="photo-list" ref="photoList">
        <div class="photo-item" v-for="photo in photos">
          <img :src="photo.urls.small" :alt="photo.id"/>
        </div>
      </div>
      <Mloading :loading="mloading"></Mloading>
      <p class="error">{{ this.error }}</p>
    </div>
  </div>
</template>

<script>
import NavBar from '../components/Nav'
import Loading from '../components/Loading'
import Mloading from '../components/Mloading'
export default {
  data () {
    return {
      loading: true,
      mloading: false,
      url: 'https://api.unsplash.com/photos?client_id=fc1ad074b94abad2fa784ab7740425e91b4ec8db73473371fa36aaa88e866658&page=',
      photos: [],
      page: 1,
      listHeight: 0,
      first: true,
      error: ''
    }
  },
  computed: {
  },
  methods: {
    start () {
      this.$http.get(this.url + this.page).then((response) => {
        this.first === true ? this.loading = false : this.mloading = false
        this.first = false
        response.body.forEach((val) => {
          this.photos.push(val)
        })
        this.$nextTick(() => {
          this.listHeight = window.getComputedStyle(this.$refs.photoList).height
        })
      }, (response) => {
        this.first === true ? this.loading = false : this.mloading = false
        console.error('请求失败！')
        this.error = '请求失败了！ 忧伤!'
      })
    }
  },
  components: {
    NavBar,
    Loading,
    Mloading
  },
  mounted () {
    this.start()
    // 滚动加载
    window.onscroll = () => {
      if (this.mloading === false) {
        var d = this.listHeight > 0 ? this.listHeight : document.body.height
        // 记录滚动条高度
        var t = document.documentElement.scrollTop || document.body.scrollTop
        if (d - t < 400) {
          this.mloading = true
          this.page += 1
          this.start()
        }
      }
    }
  }
}
</script>

<style lang="scss">
  .photo-list {
    margin-top: 30px;
    width: 80%;
    -webkit-column-count: 4;
    -moz-column-count: 4;
    column-count: 4;
    -moz-column-gap: 0px; /* Firefox */
    -webkit-column-gap: 0px; /* Safari and Chrome */
    column-gap: 0px;

    .photo-item {
      float: left;
      display: inline-block;
      margin: 0px  5px;

      img {
        width: 100%;
        cursor: zoom-in;
      }
    }
  }

  .error {
    text-align: center;
    color: red;
    font-size: 20px;
  }

  @media screen and (max-width: 1400px) {
    .photo-list {
      margin: auto;
      margin-top: 15px;
      width: 80%;
      -webkit-column-count: 3;
      -moz-column-count: 3;
      column-count: 3;
      -moz-column-gap: 0px; /* Firefox */
      -webkit-column-gap: 0px; /* Safari and Chrome */
      column-gap: 0px;
    }
  }
</style>
