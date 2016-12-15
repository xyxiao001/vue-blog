<template>
  <div class="wraper">
    <NavBar></NavBar>
    <Top v-show="showTop"></Top>
    <Loading :loading="loading"></Loading>
    <div class="content photo-c" v-show="!loading">
      <div class="photo-list" ref="photoList">
        <div class="photo-item" v-for="(photo, index) in photos">
          <img :src="photo.urls.small" :alt="photo.id" @click="showLarge(index)">
        </div>
      </div>
      <Mloading :loading="mloading"></Mloading>
      <p class="error">{{ this.error }}</p>
    </div>
    <div
      class="l-show"
      v-show="large"
      @click="large = false">
      <img :src="this.minBack">
        <div class="t-show"
          v-show="large"
          @click="large = false">
          <img :src="this.maxBack">
        </div>
    </div>
  </div>
</template>

<script>
import NavBar from '../components/Nav'
import Top from '../components/Top'
import Loading from '../components/Loading'
import Mloading from '../components/Mloading'
export default {
  data () {
    return {
      loading: true,
      mloading: true,
      url: 'https://api.unsplash.com/photos?client_id=80f66654628683dc7a20a3f2b44a93f8a9f0afaa41be7c7c392c5648dc6bb035&page=',
      photos: [],
      page: 1,
      first: true,
      error: '',
      large: false,
      minBack: '',
      maxBack: '',
      showTop: false
    }
  },
  watch: {
    large () {
      var body = document.querySelector('body')
      if (this.large !== true) {
        this.minBack = ''
        this.maxBack = ''
        body.classList.remove('model-open')
        var top = body.style.top
        top = top.replace('px', '')
        document.body.scrollTop = -top
        body.style.top = 0
      } else {
        body.style.top = -(document.body.scrollTop) + 'px'
        body.classList.add('model-open')
      }
    }
  },
  methods: {
    start () {
      this.$http.get(this.url + this.page).then((response) => {
        this.first === true ? this.loading = false : this.mloading = false
        this.first = false
        response.body.forEach((val) => {
          this.photos.push(val)
        })
      }, (response) => {
        this.first === true ? this.loading = false : this.mloading = false
        console.error('请求失败！')
        this.error = '请求失败了！ 忧伤!'
      })
    },
    showLarge (index) {
      this.large = true
      // 小图
      this.minBack = this.photos[index].urls.small
      // 中等
      this.maxBack = this.photos[index].urls.regular
      // this.maxBack = this.photos[index].urls.full
      // this.maxBack = this.photos[index].urls.raw
    }
  },
  components: {
    NavBar,
    Loading,
    Mloading,
    Top
  },
  mounted () {
    this.start()
    // 请求第二页
    this.page += 1
    this.start()
    // 滚动加载
    window.onscroll = () => {
      window.scrollY > 600 ? this.showTop = true : this.showTop = false
      if (this.mloading === false) {
        var d = document.body.clientHeight
        // 记录滚动条高度
        var t = document.documentElement.scrollTop || document.body.scrollTop
        if (d - t < 1000) {
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
    margin: auto;
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
      margin: 0px  3px;
      transition: all 0.3s ease-out;

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

  .l-show {
    position: fixed;
    width: 100%;
    height: 100%;
    padding-left: 100px;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.8);
    z-index: 100;
    cursor: zoom-out;
    background-position: center center;
    background-size: cover;

    img {
      display: block;
      margin: auto;
      padding-top: 30px;
      max-width: 95%;
      height: 80%;
    }
  }

  .t-show {
    position: fixed;
    width: 100%;
    height: 100%;
    padding-left: 100px;
    top: 0;
    left: 0;
    z-index: 200;
    cursor: zoom-out;
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;

    img {
      display: block;
      margin: auto;
      padding-top: 30px;
      max-width: 95%;
      height: 80%;
    }
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


  @media screen and (max-width: 1000px) {
    .photo-list {
      -webkit-column-count: 2;
      -moz-column-count: 2;
      column-count: 2;
    }

    .l-show {
      padding: 0;
    }

    .t-show {
      padding: 0;
    }
  }

  @media screen and (max-width: 500px) {
    .photo-list {
      width: 100%;
      -webkit-column-count: 1;
      -moz-column-count: 1;
      column-count: 1;
      margin: 3px 0 0 0;

      .photo-item {
        width: 96%;
        margin: 0 2%;

        img {
          width: 100%;
          height: auto;
        }
      }
    }

    .l-show {
      img {
        width: 95%;
        height: auto;
      }
    }

    .t-show {
      img {
        width: 95%;
        height: auto;
      }
    }
  }
</style>
