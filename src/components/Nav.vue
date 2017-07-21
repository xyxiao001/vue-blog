<template>
  <section>
    <nav id="slider-bar" ref="slider">
      <div class="slider-content">
        <div class="profile">
          <a href="https://github.com/xyxiao001" target="_blank" class="my-img">
             <img :src="touxiang" alt="goodboy blog">
           </a>
          <span>goodboy</span>
        </div>
        <ul class="menus">
          <li class="menu">
            <a href="https://blog.xyxiao.cn" target="_blank">
              <i class="icon-index iconfont"></i>
              <span>博客文章</span>
            </a>
          </li>
          <li v-for="(menu, index) in menus" class="menu">
            <router-link :to="{path: menu.name}">
              <i :class="menu.icon" class="iconfont"></i>
              <span>{{ menu.text }}</span>
            </router-link>
          </li>
        </ul>
      </div>
    </nav>
    <nav class="navTop">
      <p>
        <i class="iconfont icon-menu" @click="open"></i>
        <router-link :to="{path: '/'}" exact><span>goodboy</span></router-link>
      </p>
    </nav>
  </section>
</template>

<script>
import store from '../vuex/store'
export default {
  data () {
    return {
      now: 0,
      drop: false
    }
  },
  computed: {
    touxiang () {
      return store.getters.getTouxiang
    },
    menus () {
      return store.getters.getMenus
    }
  },
  methods: {
    open () {
      if (this.drop) {
        this.$refs.slider.style.transform = 'translate3d(-250px, 0, 0)'
        this.drop = false
      } else {
        this.$refs.slider.style.transform = 'translate3d(0, 0, 0)'
        this.drop = true
      }
    }
  },
  mounted () {
    this.$nextTick(() => {
      document.querySelectorAll('.menu').forEach((v, i) => {
        if (v.childNodes[0].className === 'active') {
          this.now = i
        }
      })
    })
  }
}
</script>

<style lang="scss">
  #slider-bar {
    width: 250px;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    background-color: #202020;
    overflow-y: auto;
    overflow-x: hidden;
    z-index: 1;
    color: #999;
    opacity: 1;
    -webkit-overflow-scrolling: touch;
    -webkit-transition: all 0.5s ease-out;
    transition: all 0.5s ease-out;
    -webkit-transform: translate3d(0, 0, 0);
            transform: translate3d(0, 0, 0);
    z-index: 1000;
    &::-webkit-scrollbar {
      width: 0px;
      height: 0px;
      background-color: #202020;
      border-radius: 4px;
    }

    &::-webkit-scrollbar-thumb {
      background-color: rgba(235,87,86,.73);
      border-radius: 4px;
    }

    .profile {
      padding-top: 40px;
      padding-bottom: 10px;

      a {
        text-decoration: none;
      }

      .my-img {
        width: 140px;
        display: block;
        margin: 0 auto;
        -webkit-transition: -webkit-transform 6s ease-out;
        transition: -webkit-transform 6s ease-out;
        transition: transform 6s ease-out;
        transition: transform 6s ease-out, -webkit-transform 6s ease-out;

        img {
          width: 140px;
          height: 140px;
          border-radius: 70px;
          overflow: hidden;
        }

        &:hover {
          -webkit-transform: rotate3d(0, 0, 1, 360deg);
                  transform: rotate3d(0, 0, 1, 360deg);
        }
      }

      span {
        display: block;
        padding: 10px 0;
        font-size: 20px;
        color: #999;
        text-align: center;
      }
    }

    .menus {
      margin: 0;
      padding: 0;

      li {
        position: relative;
        display: block;
        width: 100%;
        height: 45px;
        line-height: 45px;
        font-size: 16px;
        overflow: hidden;

        a {
          padding-left: 45px;
          height: 100%;;
          display: block;
          color: #999;
          -webkit-transition: color .2s cubic-bezier(.4,.01,.165,.99);
          transition: color .2s cubic-bezier(.4,.01,.165,.99);
          text-decoration: none;

          i {
            display: inline-block;
            font-size: 19px;
            width: 25px;
            text-align: center;
            margin-right: 18px;
          }

          span {
            display: inline-block;
            line-height: 45px;
          }

          &:hover {
            color: rgba(255, 255, 255, 0.9);
          }

          &.active {
            color: rgba(255, 255, 255, 0.9);
            background-color: rgba(0, 0, 0, 0.2);
          }
        }
      }
    }
  }
  .navTop {
    display: none;
  }

  @media screen and (max-width: 1000px){
    #slider-bar {
      top: 50px;
      -webkit-transform: translate3d(-250px, 0, 0);
              transform: translate3d(-250px, 0, 0);
    }

    .navTop {
      display: block;
      position: fixed;
      width: 100%;
      height: 50px;
      background-color: #202020;
      z-index: 9999;

      p {
        color: white;
        text-align: center;
        line-height: 50px;
        font-size: 20px;

        a {
          color: white;
          text-decoration: none;
        }

        i {
          cursor: pointer;
          position: absolute;
          display: inline-block;
          left: 10px;
          font-size: 25px;
        }
      }
    }
  }

  @media screen and (max-width: 500px){
    #slider-bar {
      opacity: 0.9;

      .slider-content {
        position: relative;
        width: 100%;
        height: 600px;
        overflow: auto;
      }

      .profile {
        padding-top: 20px;
        a {
          width: 80px;

          img {
            width: 80px;
            height: 80px;
          }
        }

        span {
          display: none;
        }
      }

      .menus {
        li {
          font-size: 15px;
          height: 40px;
          line-height: 40px;

          a i {
            font-size: 16px;
          }
        }
      }
    }
  }
</style>
