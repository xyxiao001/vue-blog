<template>
  <div class="wraper">
    <NavBar></NavBar>
    <div class="content">
      <div class="show-tag story-tag">
        <div class="tag-item">
            <router-link to='/story'>鬼故事</router-link>
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
export default {
  data () {
    return {
      id: '',
      url: 'https://route.showapi.com/955-2?&page=1&showapi_appid=26601&showapi_timestamp=20161103170634&type=dp&showapi_sign=c23526a67ce4ea5bc3fd75123ddf55cc&id=',
      detail: ''
    }
  },
  computed: {
    name () {
      return store.getters.getStoryName
    }
  },
  methods: {
    start () {
      this.$http.get(this.url + this.id).then((response) => {
        // 处理数据
        this.clear(response.body.showapi_res_body.text)
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
    }
  },
  components: {
    NavBar
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
    padding: 0 10px;
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
      width: 95%;
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
