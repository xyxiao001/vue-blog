<template>
  <div class="wraper">
    <NavBar></NavBar>
    <div class="content">
      <Loading :loading="loading"></Loading>
      <div class="show-tag story-tag">
        <div class="tag-item">
            <router-link :to="{path: '/story', query: {page: page}}">鬼故事</router-link>
        </div>
        <div class="tag-item">
          <a>→</a>
        </div>
        <div class="tag-item">
            <a>{{ name }}</a>
        </div>
      </div>
      <div class="show-story" v-html="detail"></div>
    </div>
  </div>
</template>

<script>
import store from '../vuex/store'
import NavBar from '../components/Nav'
import Loading from '../components/Loading'

export default {
  data () {
    return {
      id: '',
      url: 'https://route.showapi.com/955-2?&page=1&showapi_appid=26601&type=dp&showapi_sign=adc05e2062a5402b81c563a3ced09208&id=',
      detail: '',
      loading: true
    }
  },
  computed: {
    name () {
      return store.getters.getStoryName
    },
    page () {
      return store.getters.getStoryPage
    }
  },
  methods: {
    start () {
      this.$http.get(this.url + this.id).then((response) => {
        // 处理数据
        this.clear(response.body.showapi_res_body.text)
        this.loading = false
      }, (response) => {
        console.error('请求失败！')
      })
    },
    clear (data) {
      var a = ''
      a = data.replace('shoye_336();', '')
      a = a.replace('var cpro_id = "u535693', '').replace('var cpro_id = "u535693', '')
      a = a.replace('var cpro_id = "u138765";', '')
      this.detail = a
      this.detail = this.detail.replace(/&nbsp;&nbsp;&nbsp;/g, '<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;')
    }
  },
  components: {
    NavBar,
    Loading
  },
  mounted () {
    this.id = this.$route.query.id
    this.start()
  }
}
</script>

<style lang="scss">
  .show-story {
    margin: 30px auto;
    width: 80%;
    color: #8d6e63;
    box-shadow: 0 0 15px 0 #CCC;
    background: #F6F4EC;
    border-radius: 3px;
    padding: 0 20px;
    padding-bottom: 40px;
    font: 14px/2.5 "Microsoft YaHei";
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

  @media screen and (max-width: 500px) {
    .show-story {
      width: 90%;
      margin: 0 auto;
    }

    .story-tag {

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
