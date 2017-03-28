<template>
  <div class="wraper">
    <NavBar></NavBar>
    <div class="content">
      <Loading :loading="loading"></Loading>
      <div class="show-tag story-tag">
        <div class="tag-item">
            <router-link :to="{path: '/story', query: {type: type, page: page}}">鬼故事</router-link>
        </div>
        <div class="tag-item">
          <a>→</a>
        </div>
        <div class="tag-item">
            <a>{{ name }}</a>
        </div>
      </div>
      <div class="show-story" v-html="detail"></div>
      <div class="more-story" v-show="nowPage < allPages && !mloading" @click="more">加载下一页</div>
    </div>
    <Top></Top>
  </div>
</template>

<script>
import store from '../vuex/store'
import NavBar from '../components/Nav'
import Loading from '../components/Loading'
import Top from '../components/Top'

export default {
  data () {
    return {
      id: '',
      url: 'https://route.showapi.com/955-2?showapi_appid=26601',
      detail: '',
      type: 'dp',
      nowPage: 1,
      allPages: 1,
      loading: true,
      mloading: false
    }
  },
  computed: {
    name () {
      if (this.$route.query.text) {
        return this.$route.query.text
      } else {
        return '未知名字'
      }
    },
    page () {
      return store.getters.getStoryPage
    },
    key () {
      return store.getters.getKey
    }
  },
  methods: {
    start () {
      this.$http.get(this.url + '&showapi_sign=' + this.key + '&id=' + this.id + '&page=' + this.nowPage).then((response) => {
        // 处理数据
        this.clear(response.body.showapi_res_body.text)
        this.page = response.body.showapi_res_body.currentPage
        this.allPages = response.body.showapi_res_body.allPages
        this.loading = false
        this.mloading = false
      }, (response) => {
        console.error('请求失败！')
        this.loading = false
        this.mloading = false
      })
    },
    clear (data) {
      var a = ''
      a = data.replace('shoye_336();', '')
      a = a.replace('var cpro_id = "u535693', '').replace('var cpro_id = "u535693', '')
      a = a.replace('var cpro_id = "u138765";', '')
      a = a.replace(/&nbsp;&nbsp;&nbsp;/g, '<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;')
      this.detail += a
    },
    more () {
      console.log(1)
      if (!this.mloading) {
        this.mloading = true
        this.nowPage += 1
        this.start()
      }
    }
  },
  components: {
    NavBar,
    Loading,
    Top
  },
  mounted () {
    if (this.$route.query.type) {
      this.type = this.$route.query.type
    }
    this.id = this.$route.query.id
    this.start()
  }
}
</script>

<style lang="scss" scoped>
  .content {
    margin-bottom: 30px;
  }
  .show-story {
    margin: auto;
    width: 80%;
    color: #8d6e63;
    box-shadow: 0 0 15px 0 #CCC;
    background: #F6F4EC;
    border-radius: 3px;
    padding: 0 20px;
    padding-bottom: 40px;
    font: 17px/3 "Microsoft YaHei";
  }

  .story-tag {
    width: 81%;
    margin: auto;
    margin-top: 10px;

    .tag-item {

      &:first-child {
        margin-left: 0;
      }

      a {
        background: #F6F4EC;
        box-shadow: 0 0 15px 0 #CCC;
        color: #8d6e63;
        border-color: #8d6e63;
      }
    }
  }

  .more-story {
    margin: 0 auto 30px auto;
    padding: 0 20px;
    width: 80%;
    text-align: center;
    background: #8d6e63;
    color: white;
    line-height: 35px;
    cursor: pointer;
    user-select: none;
  }

  @media screen and (max-width: 500px) {
    .show-story {
      width: 90%;
      margin: 0 auto;
    }

    .story-tag {
      width: 100%;
      margin: 0;

      .tag-item {
        font-size: 14px;
        margin:20px 2px;

        a {
          padding: 10px 10px;
        }
      }
    }
  }
</style>
