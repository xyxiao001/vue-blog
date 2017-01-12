<template>
  <div class="wraper">
    <NavBar></NavBar>
    <Top></Top>
    <Loading :loading="loading"></Loading>
    <div class="content">
      <ul class="n-news">
        <li class="n-item" v-for="item in lists" :class="{'activity': item.channelId === id}" @click="changeId(item.channelId)">
          <span>{{ item.name }}</span>
        </li>
      </ul>
      <div class="a-list news-detail">
        <article class="d-item" v-for="(list, $index) in dLists" @click="showNews($index)">
          <div class="article">
            <a class="photo">
              <span
                v-if="list.havePic"
                :alt="list.title"
                :style="{'background-image': 'url('+ list.imageurls[0].url +')'}">
              </span>
              <span v-else :alt="list.title"></span>
            </a>
            <div class="article-meta">
              <p class="category">
                <a class="article-link">{{ list.source }}</a><span>{{ list.pubDate }}</span>
              </p>
              <p class="date">
                <time>{{ list.time }}</time>
              </p>
            </div>
            <h2 class="article-title">
              <a class="title">{{ list.title }}</a>
            </h2>
            <p class="article-excerpt">{{ list.desc }}</p>
          </div>
        </article>
        <div class="n-more">
          <button
            class="add-more btn"
            @click="goNext()"
            v-show="this.page < this.allPages"
            v-if="this.add === false">
            点击加载更多....</i>
          </button>
          <button class="add-more btn disabled" v-else>加载中<i class="iconfont icon-loading i-loading"></i></button>
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
      url1: 'https://route.showapi.com/109-34?showapi_appid=26601&showapi_sign=adc05e2062a5402b81c563a3ced09208',
      url2: 'https://route.showapi.com/109-35?&needContent=0&needHtml=1&showapi_appid=26601&showapi_sign=adc05e2062a5402b81c563a3ced09208&channelId=',
      loading: true,
      dLoading: true,
      lists: [],
      dLists: [],
      id: '5572a108b3cdc86cf39001cd',
      page: 1,
      allPages: 1,
      add: false
    }
  },
  components: {
    NavBar,
    Loading,
    Top
  },
  methods: {
    getNewName () {
      // 请求新闻列表
      this.$http.get(this.url1).then((response) => {
        this.loading = false
        if (response.body.showapi_res_code === 0) {
          this.lists = response.body.showapi_res_body.channelList
        } else {
          console.error('请求失败!!')
        }
      }, (response) => {
        this.loading = false
        console.error('请求失败!!')
      })
    },
    getNewList () {
      // 请求新闻内容
      this.$http.get(this.url2 + this.id + '&page=' + this.page).then((response) => {
        this.loading = false
        if (response.body.showapi_res_code === 0) {
          this.add = false
          this.allPages = response.body.showapi_res_body.pagebean.allPages
          this.page = response.body.showapi_res_body.pagebean.currentPage
          if (this.page === 1) {
            this.dLists = response.body.showapi_res_body.pagebean.contentlist
          } else {
            this.dLists = this.dLists.concat(response.body.showapi_res_body.pagebean.contentlist)
          }
        } else {
          console.error('请求失败!!')
        }
      }, (response) => {
        this.loading = false
        console.error('请求失败!!')
      })
    },
    changeId (id) {
      if (id !== this.id) {
        this.id = id
        this.page = 1
        window.scroll(0, 0)
        this.getNewList()
      }
    },
    goNext () {
      this.add = true
      this.page += 1
      this.page = this.page > this.allPages ? this.allPages : this.page
      this.getNewList()
    },
    showNews (index) {
      console.log(index)
    }
  },
  mounted () {
    this.getNewName()
    this.getNewList()
  }
}
</script>

<style lang="scss">
  .n-news {
    position: fixed;
    width: 10%;
    height: 100%;
    overflow-y: auto;
    margin: 2%;
    &::-webkit-scrollbar {
      width: 4px;
      height: 4px;
      background-color: #202020;
      border-radius: 8px;
    }

    &::-webkit-scrollbar-thumb {
      background-color: rgba(235,87,86,.73);
      border-radius: 8px;
    }

    .n-item {
      display: block;
      width: 110px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      color: #444;
      border-radius: 4px;
      margin-bottom: 2px;
      transition-property: color,background-color;
      cursor: pointer;

      &:hover {
        background-color: #ed4040;
        color: #fff;
      }
    }

    .activity {
      background-color: #ed4040;
      color: #fff;
    }
  }

  .news-detail {
    float: right;
    width: 85%;
    margin-top: 2%;
    .d-item {
      cursor: pointer;

      a.photo span {
        background-image: url('http://ojdfj29yl.bkt.clouddn.com/news.jpg');
        background-size: cover;
      }
    }

    .n-more {
      width: 100%;
      display: block;
      margin: auto;
    }
  }

  @media screen and (max-width: 600px) {
    .n-news {
      position: relative;
      float: left;
      width: 100%;
      margin: 3px;
      .n-item {
        float: left;
      }
    }

    .news-detail {
      width: 100%;
    }
  }
</style>
