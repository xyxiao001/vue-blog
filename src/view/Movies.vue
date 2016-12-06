<template>
  <div class="wraper">
    <NavBar></NavBar>
    <Loading :loading="loading"></Loading>
    <div class="content">
      <div class="m-title">
        <h3>豆瓣电影TOP250</h3>
      </div>
      <div class="m-list">
        <div class="m-item" v-for="(item, $index) in lists" :data-id="item.id">
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
      url: 'https://api.douban.com/v2/movie/top250?start=',
      movies: {},
      lists: []
    }
  },
  computed: {
    current () {
      return this.$route.query.page ? this.$route.query.page : 1
    }
  },
  components: {
    NavBar,
    Loading
  },
  mounted () {
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
        }
      }, 100)
    }, (response) => {
      console.log('请求失败!')
    })
  }
}
</script>

<style lang="scss">
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
        from {
          opacity: 0;
        }

        to {
          opacity: 1;
        }
      }

        .m-img {
          width: 100%;
          height: 100%;
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
          height: 200px;
          padding: 10px;
          font-size: 14px;
          color: rgba(255, 255, 255, 0.8);
          background-color: rgba(0, 0, 0, 0.5);
          -webkit-transform: translate3d(0, 100px, 0);
          -moz-transform: translate3d(0, 100px, 0);
          transform: translate3d(0, 100px, 0);
          transition: 0.3s transform ease-out;

          p {
            width: 95%;
            line-height: 26px;
          }
        }

        &:hover {
          .m-bottom {
            -webkit-transform: translate3d(0, 0, 0);
            -moz-transform: translate3d(0, 0, 0);
            transform: translate3d(0, 0, 0);
          }
        }
     }
  }
</style>
