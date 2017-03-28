<template>
  <div class="wraper">
    <NavBar></NavBar>
    <Loading :loading="loading"></Loading>
    <div class="content" v-show="!loading">
      <div class="g-tags">
        <a class="g-tag" v-for="item in types" :class="{'activity': type === item.type}" @click="changeType($event, item)">{{ item.name }}</a>
      </div>
      <div class="s-list">
        <Sitem v-for="list in lists" :item="list" :type="type"></Sitem>
      </div>
      <Pagenation :allPages="allPages" :current="current" :type="type"></Pagenation>
    </div>
    <Top></Top>
  </div>
</template>

<script>
import store from '../vuex/store'
import NavBar from '../components/Nav'
import Sitem from '../components/Sitem'
import Loading from '../components/Loading'
import Pagenation from '../components/Pagenation'
import Top from '../components/Top'

export default {
  data () {
    return {
      url: 'https://route.showapi.com/955-1?&showapi_appid=26601',
      allPages: 0,
      lists: [],
      type: 'dp',
      types: [
        {
          name: '短篇',
          type: 'dp'
        },
        {
          name: '长篇',
          type: 'cp'
        },
        {
          name: '校园',
          type: 'xy'
        },
        {
          name: '医院',
          type: 'yy'
        },
        {
          name: '家里',
          type: 'jl'
        },
        {
          name: '民间',
          type: 'mj'
        },
        {
          name: '灵异',
          type: 'ly'
        },
        {
          name: '原创',
          type: 'yc'
        },
        {
          name: '内涵',
          type: 'neihanguigushi'
        }
      ],
      loading: true
    }
  },
  computed: {
    current () {
      return this.$route.query.page ? this.$route.query.page : 1
    },
    key () {
      return store.getters.getKey
    }
  },
  watch: {
    current () {
      this.loading = true
      this.start()
    }
  },
  methods: {
    start () {
      this.$http.get(this.url + '&showapi_sign=' + this.key + '&page=' + this.current + '&type=' + this.type).then((response) => {
        this.loading = false
        const data = response.body.showapi_res_body.pagebean
        this.allPages = data.allPages ? data.allPages : 0
        this.lists = data.contentlist
        window.scroll(0, 0)
      }, (response) => {
        this.loading = false
        console.error('请求失败！')
      })
    },
    changeType (e, data) {
      if (data.type !== this.type) {
        this.$router.push(
          {
            path: 'story',
            query: { type: data.type }
          }
        )
        this.$router.go(1)
        this.type = data.type
        this.start()
        this.loading = true
      }
    }
  },
  components: {
    NavBar,
    Sitem,
    Loading,
    Pagenation,
    Top
  },
  mounted () {
    if (this.$route.query.type) {
      this.type = this.$route.query.type
    }
    this.start()
  }
}
</script>

<style lang="scss">
  .g-tags {
    width: 100%;
    display: flex;
    padding: 1%;
  }

  .g-tag {
    width: 80px;
    cursor: pointer;
  }

  .g-tags a.activity {
    color: #e78170;
  }
</style>
