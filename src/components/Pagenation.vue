<template>
  <div class="pagenation">
    <router-link
      class="pre pages"
      v-show="current > 0"
      :to="{path: this.$route.path, query: { page: 1, type: type }}" exact>首页
    </router-link>
    <router-link
      class="pre pages"
      v-show="current > 1"
      :to="{path: this.$route.path, query: { page: current - 1, type: type  }}" exact>上一页
    </router-link>
    <a
      class="pre pages disabled"
      v-show="current <= 1"
      >上一页
    </a>
    <ul>
      <li v-for="page in pages">
        <router-link
          class="pages"
          :class="{'active': page === current}"
          :to="{path: $route.path, query: { page: page, type: type }}"
           exact>{{ page }}</router-link>
      </li>
    </ul>
    <router-link
      v-if="~~(current) < ~~(allPages)"
      :to="{path: this.$route.path, query: { page: ~~(current) + 1, type: type }}"
      class="next pages" exact>下一页
    </router-link>
    <a
      class="next pages disabled"
      v-else
      >下一页
    </a>
    <div class="go">
      <span>跳转到：</span>
      <input
        type="number"
        @keyup="goPage = goPage >= ~~(allPages) ? allPages : goPage"
        class="goPage"
        v-model.number="goPage">
      <router-link
        :to="{path: this.$route.path, query: { page: goPage, type: type  }}"
        class="pages" exact>GO
      </router-link>
      <span>共{{ allPages }}页</span>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      goPage: 1
    }
  },
  props: ['allPages', 'current', 'type'],
  computed: {
    pages () {
      var arr = []
      var pageCount = 5
      if (this.allPages < 5) {
        for (let i = 1; i <= this.allPages; i++) {
          arr.push(i)
        }
      } else if (this.current <= 2) {
        for (let i = 1; i <= pageCount; i++) {
          arr.push(i)
        }
      } else if (this.current > 2 && this.current < this.allPages - 2) {
        for (let i = this.current - 2; i <= ~~(this.current) + 2; i++) {
          arr.push(i)
        }
      } else if (this.current >= this.allPages - 2) {
        for (let i = this.allPages - 4; i <= this.allPages; i++) {
          arr.push(i)
        }
      }
      return arr
    }
  }
}
</script>

<style lang="scss">
  .pagenation {
    width: 500px;
    margin: 30px auto;

    ul li{
      list-style-type: none;
      float: left;

      a.active {
        background-color: #ff7b6c;
        color: white;
      }
    }

    a.pages {
      display: inline-block;
      float: left;
      text-decoration: none;
      border: 1px solid #ff7b6c;
      padding: 3px 8px;
      margin-right: 5px;
      border-radius: 10px;
      color: #ff7b6c;
      cursor: pointer;
      font-size: 16px;
    }

    a.disabled {
      cursor: not-allowed;
    }

    .go {
      clear: both;
      padding-top: 15px;
      width: 300px;
      color: #aaa;

      .pages {
        position: relative;
        float: none;
      }
    }

    .goPage {
      width: 50px;
      border: 1px solid #ff7b6c;
      padding: 3px 8px;
      outline: none;
      border-radius: 10px;
      line-height: 25px;
      color: #aaa;
      text-align: center;
      font-size: 15px;
    }

    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button{
        -webkit-appearance: none !important;
        margin: 0;
    }
  }

  @media screen and (max-width: 500px) {
    .pagenation {
      width: 80%;
      margin: auto;

      .pre {
        margin-bottom: 10px;
      }

      ul {
        width: 100%;
        float: left;
      }

      .next {
        display: block;
        margin-top: 10px;
      }

      a.pages {
        font-size: 12px;
      }
    }
  }
</style>
