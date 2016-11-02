<template>
  <div class="wraper">
    <NavBar></NavBar>
    <div class="content">
      <div class="loading" v-show="loading">
        <div class="show-loading">
          <span class="row1"></span>
          <span class="row2"></span>
          <span class="row3"></span>
          <span class="row4"></span>
          <span class="row5"></span>
          <p>加载中...</p>
        </div>
      </div>
      <div class="photo-list">
        photo
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from '../components/Nav'
export default {
  data () {
    return {
      loading: true,
      url: 'https://api.unsplash.com/photos?client_id=fc1ad074b94abad2fa784ab7740425e91b4ec8db73473371fa36aaa88e866658&page=1'
    }
  },
  methods: {
  },
  components: {
    NavBar
  },
  mounted () {
    this.$http.get(this.url).then((response) => {
      this.loading = false
      console.log(response.body)
    }, (response) => {
      console.error('请求失败！')
    })
  }
}
</script>

<style lang="scss">
  .loading {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.6);

    .show-loading {
      position: absolute;
      left: 50%;
      top: 30%;
      width: 200px;
      height: 100px;

      span {
        position: absolute;
        display: inline-block;
        width: 15px;
        height: 15px;
        border-radius: 15px;
        background-color: white;
      }

      p {
        color: white;
        margin-top: 30px;
        margin-left: 25px;
      }

      span.row1 {
        left: 0px;
        background-color: #e14545;
        animation: row1 1s ease-out infinite;
      }

      span.row2 {
        left: 25px;
        background-color: #fcb421;
      }

      span.row3 {
        left: 50px;
        background-color: #1aadc0;
      }

      span.row4 {
        left: 75px;
        background-color: #aade26;
      }

      span.row5 {
        left: 100px;
        background-color: #5e5b9b;
        animation: row5 1s ease-out infinite;
      }

      @keyframes row1 {
        0% {
          transform: translate3d(0, 0, 0);
        }

        50% {
          transform: translate3d(-10px, -30px, 0);
        }

        100% {
          transform: translate3d(0, 0, 0);
        }
      }

      @keyframes row5 {
        0% {
          transform: translate3d(10px, -30px, 0);
        }

        50% {
          transform: translate3d(0, 0, 0);
        }

        100% {
          transform: translate3d(10px, -30px, 0);
        }
      }
    }
  }
</style>
