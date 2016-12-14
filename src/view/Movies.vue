<template>
  <div class="wraper">
    <NavBar></NavBar>
    <Loading :loading="loading"></Loading>
    <Top></Top>
    <div class="content" v-show="this.loading === false">
      <div class="m-title">
        <h3>豆瓣电影TOP250</h3>
      </div>
      <div class="m-list">
        <div class="m-item" v-for="(item, $index) in lists" :data-id="item.id" @click="showDetail(item.id)">
          <img :src="item.images.large" :alt="item.images.alt" class="m-img" />
          <div class="m-top">
            <p>{{ item.title }}</p>
          </div>
          <div class="m-bottom">
            <p>当前排名: {{ $index + 1 }}</p>
            <p>评分: {{ item.rating.average }}</p>
            <p>导演: <span v-for="d in item.directors" :data-id="d.id"> {{ d.name }} </span></p>
            <p>主演: <span v-for="a in item.casts" :data-id="a.id"> {{ a.name }}<span>,</span></span></p>
            <p>原名: {{ item.original_title }}</p>
            <p>看过人数: {{ item.collect_count }}</p>
            <p>类型: <span v-for="g in item.genres">{{ g }}, </span></p>
            <p>年代: {{ item.year }}</p>
          </div>
        </div>
      </div>
      <button
        class="add-more btn"
        @click="goNext()"
        v-if="this.lists.length >= 20 && this.lists.length <= 250 && this.add === false">
        点击加载更多....</i>
      </button>
      <button class="add-more btn disabled" v-else>加载中<i class="iconfont icon-loading i-loading"></i></button>
    </div>
    <div class="movie-bg" v-show="detailIn" @click.self="detailIn = false">
      <div class="movie-pos">
        <div class="movie-detail">
          <div class="movie-header">
            <i class="iconfont icon-close"></i>
            <h4>电影详情</h4>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from '../components/Nav'
import Loading from '../components/Loading'
import Top from '../components/Top'
export default {
  data () {
    return {
      loading: true,
      add: false,
      start: 0,
      url: 'https://api.douban.com/v2/movie/top250?start=',
      url2: 'https://api.douban.com/v2/movie/subject/',
      movies: {},
      lists: [],
      detailIn: false,
      detailId: 0,
      details: {}
    }
  },
  watch: {
    detailIn () {
      this.detailIn === true ? document.querySelector('body').classList.add('model-open')
      : document.querySelector('body').classList.remove('model-open')
    }
  },
  methods: {
    getMovie () {
      this.$http.jsonp(this.url + this.start).then((response) => {
        this.movies = response.body
        this.loading = false
        var l = this.movies.subjects.length
        var i = 0
        var set = setInterval(() => {
          if (i < l) {
            this.lists.push(this.movies.subjects[i])
            i += 1
          } else {
            clearTimeout(set)
            this.add = false
          }
        }, 100)
      }, (response) => {
        this.loading = false
        console.log('请求失败!')
      })
    },
    goNext () {
      this.add = true
      this.start += 20
      this.getMovie()
    },
    detail () {
      this.$http.jsonp(this.url2 + this.detailId).then((response) => {
        this.details = response.body
      }, (response) => {
        console.log('请求失败!')
      })
    },
    showDetail (id) {
      this.detailIn = true
      this.detailId = id
      this.detail()
    }
  },
  components: {
    NavBar,
    Loading,
    Top
  },
  mounted () {
    this.getMovie()
  }
}
</script>

<style lang="scss">
  .btn {
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    background: #fff;
    border: 1px solid #c0ccda;
    color: #1f2d3d;
    -webkit-appearance: none;
    text-align: center;
    box-sizing: border-box;
    outline: none;
    margin: 0;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    padding: 9px 15px;
    font-size: 14px;
    border-radius: 4px;
    color: #fff;
    background-color: #50bfff;
    border-color: #50bfff;
    -webkit-transition: all 0.2s ease;
    transition: all 0.2s ease;

    &:hover {
      opacity: 0.8
    }
  }

  button.disabled {
    cursor: not-allowed;
  }

  i.i-loading {
    position: absolute;
    padding: -2px;
    -webkit-animation: loading 2s linear infinite;
    animation: loading 2s linear infinite;
  }

  @-webkit-keyframes loading {
    0% {
      -webkit-transform: rotate3d(0, 0, 0, 360deg);
    }

    100% {
      -webkit-transform: rotate3d(0, 0, 1, 360deg);
    }
  }

  @keyframes loading {
    0% {
      -webkit-transform: rotate3d(0, 0, 0, 360deg);
              transform: rotate3d(0, 0, 0, 360deg);
    }

    100% {
      -webkit-transform: rotate3d(0, 0, 1, 360deg);
              transform: rotate3d(0, 0, 1, 360deg);
    }
  }

  .m-title {
    width: 100%;
    padding-left: 30px;
    height: 100px;
    background-color: #e3ebec;

    h3 {
      font-size: 35px;
      font-weight: bold;
      color: #37a;
      letter-spacing: 1px;
      line-height: 100px;
    }
  }

  .m-list {
    position: relative;
    width: 1400px;
    margin: auto;

    .m-item {
      position: relative;
      display: inline-block;
      width: 300px;
      height: 444px;
      margin: 40px 0 0 2%;
      overflow: hidden;
      cursor: pointer;
      -webkit-animation: show-m .5s ease-out 1;
      animation: show-m .5s ease-out 1;

      @-webkit-keyframes show-m {
        0% {
          opacity: 0;
        }

        100% {
          opacity: 1;
        }
      }

      @keyframes show-m {
        0% {
          opacity: 0;
        }

        100% {
          opacity: 1;
        }
      }

        .m-img {
          width: 100%;
          height: 100%;
          -webkit-transform: scale(1.04);
                  transform: scale(1.04);
          -webkit-transfrom: scale(1.04);
          -moz-webkit-transfrom: scale(1.04)
        }

        .m-top {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 40px;
          background-color: rgba(0, 0, 0, 0.4);

          p {
            text-align: center;
            line-height: 40px;
            font-weight: 600;
            color: rgba(255, 255, 255, 0.9);
          }
        }

        .m-bottom {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          padding: 10px;
          font-size: 14px;
          color: rgba(255, 255, 255, 0.8);
          background-color: rgba(0, 0, 0, 0.6);
          -webkit-transform: translate3d(0, 110px, 0);
          transform: translate3d(0, 110px, 0);
          -webkit-transition: 0.3s all ease-out;
          transition: 0.3s all ease-out;
          opacity: 0.8;

          p {
            width: 95%;
            line-height: 26px;
          }
        }

        &:hover {
          .m-bottom {
            opacity: 1;
            -webkit-transform: translate3d(0, 0, 0);
            transform: translate3d(0, 0, 0);
          }
        }
     }
  }

  .add-more {
    display: block;
    margin: 10px auto 50px auto;
    width: 200px;
    cursor: pointer;
  }

  .movie-bg {
    position: fixed;
    top: 0;
    left: 250px;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8);
    overflow-x: hidden;

    .movie-pos {
      position: relative;
      display: block;
      width: 100%;
      margin-left: -125px;
      margin-top: 50px;
      margin-bottom: 100px;
      background: none;

      .movie-detail {
        position: relative;
        width: 60%;
        min-height: 800px;
        margin: auto;
        border-radius: 5px;
        background-color: rgba(255, 255, 255, 1);
        transition: all .3s ease-out;

        .movie-header {
          padding: 5px 10px;
          height: 40px;
          border-bottom: 1px solid rgba(103, 106, 108, 0.5);

          i {
            float: right;
            font-size: 16px;
            cursor: pointer;
          }

          h4 {
            line-height: 40px;
          }
        }
      }
    }
  }

  @media screen and (max-width: 1600px) {
    .m-list {
      width: 1000px;

      .m-item {
        margin-left: 3%;
      }
    }
  }

  @media screen and (max-width: 1300px) {
    .m-list {
      width: 800px;

      .m-item {
        margin-left: 5%;
      }
    }
  }

  @media screen and (max-width: 1000px) {
    .movie-bg {
      left: 0;

      .movie-pos {
        margin-left: 0;
        margin-top: 100px;

        .movie-detail {
          position: relative;
          width: 80%;
        }
      }
    }
  }


  @media screen and (max-width: 850px) {
    .m-list {
      width: 100%;

      .m-item {
        display: block;
        margin: 20px auto;

        .m-bottom {
          opacity: 1;
          transform: translate3d(0, 0, 0);
          -webkit-transform: translate3d(0, 0, 0);
          -moz-transform: translate3d(0, 0, 0);
        }
      }
    }
  }

  @media screen and (max-width: 320px) {
    .m-title {
      h3 {
        font-size: 25px;
      }
    }
    .m-list {
      .m-item {
        display: block;
        width: 260px;
        height: 350px;
        margin: 20px auto;
      }
    }
  }
</style>
