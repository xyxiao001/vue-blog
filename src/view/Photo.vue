<template>
  <div class="wraper">
    <NavBar></NavBar>
    <Top v-show="showTop"></Top>
    <Loading :loading="loading"></Loading>
    <div class="content photo-c" v-show="!loading">
      <waterfall :line-gap="300" :watch="photos" id="showPhoto">
        <waterfall-slot
          v-for="(item, index) in photos"
          :width="item.width/50"
          :height="item.height/50"
          :order="index"
          :key="item.id"
          >
          <img :src="item.urls.small" :alt="item.id" :data-max="item.urls.regular">
      </waterfall-slot>
      </waterfall>
      <Mloading :loading="mloading"></Mloading>
      <p class="error">{{ this.error }}</p>
    </div>
    <div
      class="l-show"
      v-show="large"
      @click="large = false">
      <a class="download btn" :href="downBack" target="_blank">超清原图</a>
      <img :src="this.minBack">
        <div class="t-show"
          v-show="large"
          @click="large = false">
          <img :src="this.maxBack">
        </div>
    </div>
    <ViewPhoto :el="el"></ViewPhoto>
  </div>
</template>

<script>
import NavBar from '../components/Nav'
import Top from '../components/Top'
import Loading from '../components/Loading'
import Mloading from '../components/Mloading'
import Waterfall from 'vue-waterfall/lib/waterfall'
import WaterfallSlot from 'vue-waterfall/lib/waterfall-slot'
import ViewPhoto from '../components/ViewPhoto'
export default {
  data () {
    return {
      loading: true,
      mloading: false,
      url: 'https://api.unsplash.com/photos?client_id=80f66654628683dc7a20a3f2b44a93f8a9f0afaa41be7c7c392c5648dc6bb035&page=',
      photos: [],
      page: 1,
      first: true,
      error: '',
      large: false,
      minBack: '',
      maxBack: '',
      downBack: '',
      showTop: false,
      add: false,
      el: '#showPhoto'
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
        this.waterFall(response.body)
      }, (response) => {
        this.first === true ? this.loading = false : this.mloading = false
        console.error('请求失败！')
        this.error = ''
      })
    },
    showLarge (index) {
      this.large = true
      // 小图
      this.minBack = this.photos[index].urls.small
      // 中等
      this.maxBack = this.photos[index].urls.regular
      this.downBack = this.photos[index].urls.full
      // this.maxBack = this.photos[index].urls.raw
    },
    waterFall (data) {
      this.photos = this.photos.concat(data)
      // 把图片数据保存在本地的localstorange
      window.localStorage.setItem('photo', JSON.stringify({
        date: (new Date()).toDateString(),
        page: this.page,
        lists: this.photos
      }))
      this.mloading = false
    }
  },
  components: {
    NavBar,
    Loading,
    Mloading,
    Top,
    Waterfall,
    WaterfallSlot,
    ViewPhoto
  },
  mounted () {
    // 读取本地数据
    var local = window.localStorage.getItem('photo')
    var data = JSON.parse(local)
    var date = (new Date()).toDateString()
    if (data) {
      if (data.lists.length >= 20 && date === data.date) {
        this.loading = false
        this.photos = data.lists
        this.page = data.page
      } else {
        this.start()
        // 请求第二页
        this.page += 1
        this.start()
      }
    } else {
      this.start()
      // 请求第二页
      this.page += 1
      this.start()
    }
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
    // console.log(ViewPhoto)
    // console.log(Waterfall)
  },
  destroyed () {
    document.querySelector('body').classList.remove('model-open')
  }
}
</script>

<style lang="scss">
  .vue-waterfall {
    width: 1500px;
    margin: auto;
  }

  .vue-waterfall .vue-waterfall-slot {
    padding: 2px;
  }

  .vue-waterfall-slot img {
    width: 100%;
    background-color: rgba(0, 0, 0, 0.1);
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

    .download {
      display: inline-block;
      position: absolute;
      width: 100px;
      margin-left: 0px;
      text-align: center;
      z-index: 999;
      left: 50%;
      top: 10px;
      color: white;
    }

    img {
      display: block;
      margin: auto;
      padding-top: 50px;
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
      padding-top: 50px;
      max-width: 95%;
      height: 80%;
    }
  }

  @media screen and (max-width: 1670px) {
    .vue-waterfall {
      width: 1200px;
    }
  }

  @media screen and (max-width: 1470px) {
    .vue-waterfall {
      width: 900px;
    }
  }

  @media screen and (max-width: 1170px) {
    .vue-waterfall {
      width: 600px;
    }
  }


  @media screen and (max-width: 1000px) {
    .l-show {
      .download {
        margin-left: -50px;
        top: 60px;
      }
      padding: 0;

      img {
        padding-top: 100px;
      }
    }

    .t-show {
      padding: 0px;

      img {
        padding-top: 100px;
      }
    }
  }

  @media screen and (max-width: 600px) {
    .vue-waterfall {
      width: 100%;

      .vue-waterfall-slot {
        position: relative !important;
        top: 0!important;
        margin: 1px 0;
        width: 100%!important;
        height: auto!important;
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
