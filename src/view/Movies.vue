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
        <div class="m-item" v-for="(item, $index) in lists" :data-id="item.id" @click="showDetail(item.id, $index)">
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
    <div class="movie-bg" v-show="detailIn" ref="content">
      <div class="movie-pos" @click.self="detailIn = false">
        <div class="movie-detail">
          <div class="movie-header">
            <i class="iconfont icon-close" @click="detailIn = false"></i>
            <h4>电影详情</h4>
          </div>
          <div class="movie-body" v-show="dLoading" style="text-align: center; padding-top: 50px;">
            加载中..
          </div>
          <div class="movie-body"  v-show="!dLoading">
            <h1 class="title">{{ details.title }} <span v-show="details.title !== details.original_title">({{ details.original_title }})</span></h1>
            <div class="m-left">
              <img :src="details.images.large">
            </div>
            <div class="m-right">
              <P>别名: <span v-for="item in details.aka">{{ item }} </span></p>
              <p>排名: <span>{{ now + 1 }}</span></p>
              <P>导演: <span v-for="item in details.directors">{{ item.name }} </span></p>
              <P>主演: <span v-for="item in details.casts">{{ item.name }} </span></p>
              <p>上映时间: <span>{{ details.year }} 年</span></p>
              <p>评分: <span>{{ details.rating.average }} 分</span></p>
              <p>短评: <span>{{ details.comments_count }} 条</span><a class="btn" :href="details.alt + 'comments?status=P'" target="_blank">查看短评</a></p>
              <p>影评: <span>{{ details.reviews_count }} 条</span><a class="btn" :href="details.alt + '/reviews'" target="_blank">查看影评</a</p>
              <p>收藏人数: <span>{{ details.collect_count }} 人</span></p>
              <p>看过人数: <span>{{ details.comments_count }} 人</span></p>
              <p>想看人数: <span>{{ details.wish_count }} 人</span></p>
              <p>打分人数: <span>{{ details.ratings_count }} 人</span></p>
              <p>简介: <span>{{ details.summary }}</span></p>
            </div>
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
      dLoading: true,
      add: false,
      start: 0,
      now: 0,
      url: 'https://api.douban.com/v2/movie/top250?start=',
      url2: 'https://api.douban.com/v2/movie/subject/',
      movies: {},
      lists: [],
      detailIn: false,
      detailId: 0,
      details: {
        title: '',
        original_title: '',
        rating: {
          average: 0
        },
        images: {
          large: ''
        },
        aka: [],
        comments_count: 0,
        collect_count: 0,
        ratings_count: 0,
        reviews_count: 0,
        wish_count: 0,
        alt: '',
        year: 0,
        summary: '',
        directors: [],
        casts: [],
        countries: []
      }
    }
  },
  watch: {
    detailIn () {
      this.$refs.content.scrollTop = 0
      var body = document.querySelector('body')
      if (this.detailIn) {
        body.style.top = -(document.body.scrollTop) + 'px'
        body.classList.add('model-open')
      } else {
        body.classList.remove('model-open')
        var top = body.style.top
        top = top.replace('px', '')
        document.body.scrollTop = -top
        body.style.top = 0
      }
    }
  },
  methods: {
    getMovie () {
      this.$http.jsonp(this.url + this.start).then((response) => {
        this.movies = response.body
        this.loading = false
        var l = this.movies.subjects.length
        var i = 0
        // 把图片数据保存在本地的localstorange
        window.localStorage.setItem('movies', JSON.stringify({
          date: (Date.parse(new Date())),
          start: this.lists.length + l,
          lists: this.lists.concat(this.movies.subjects)
        }))
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
        this.dLoading = false
      }, (response) => {
        console.log('请求失败!')
      })
    },
    showDetail (id, index) {
      this.detailIn = true
      this.detailId = id
      this.dLoading = true
      this.now = index
      this.detail()
    }
  },
  components: {
    NavBar,
    Loading,
    Top
  },
  mounted () {
    // 读取本地数据
    var local = window.localStorage.getItem('movies')
    var data = JSON.parse(local)
    var date = Date.parse(new Date())
    if (data) {
      if (data.lists.length >= 20 && (date - data.date) / (24 * 3600000) <= 5 && data.start > 0) {
        this.loading = false
        this.lists = data.lists
        this.start = data.start
      } else {
        this.getMovie()
      }
    } else {
      this.getMovie()
    }
  },
  destroyed () {
    document.querySelector('body').classList.remove('model-open')
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
      animation: show-m .5s ease-out 1;

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
    padding-right: 2%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8);
    overflow-x: hidden;
    -webkit-overflow-scrolling: touch;

    .movie-pos {
      position: relative;
      display: block;
      width: 100%;
      margin-left: -125px;
      padding-top: 50px;
      padding-bottom: 100px;
      background: none;

      .movie-detail {
        position: relative;
        width: 60%;
        min-height: 800px;
        margin: auto;
        border-radius: 5px;
        background-color: rgba(255, 255, 255, 0.95);
        transition: all .3s ease-out;

        .movie-header {
          padding: 5px 10px;
          height: 40px;
          border-bottom: 1px solid rgba(103, 106, 108, 0.5);

          i {
            float: right;
            padding-top: 5px;
            font-size: 20px;
            cursor: pointer;
          }

          h4 {
            line-height: 40px;
          }
        }

        .movie-body {
          .title {
            margin-top: 20px;
            text-align: center;
            font-size: 20px;
            line-height: 40px;
            font-weight: 600;
          }

          .m-left {
            float: left;
            width: 30%;
            margin: 25px 2%;

            img {
              max-width: 100%;
              display: block;
              margin: auto;
            }
          }

          .m-right {
            display: inline-block;
            width: 65%;
            margin-top: 20px;

            p {
              padding-left: 3px;
              line-height: 30px;

              span {
                font-size: 14px;
                padding-left: 7px;
              }

              .btn {
                font-size: 13px;
                margin-left: 10px;
                padding: 1px 2px;
              }
            }
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

    .movie-bg {
      .movie-pos {
        margin-top: 10px;
        width: 100%;

        .movie-detail {
          width: 95%;

          .movie-body {
            .m-left {
              margin: 10px 0;
              width: 100%;
            }

            .m-right {
              float: none;
              margin: auto;
              width: 95%;
            }
          }
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
