<template>
  <nav id="slider-bar">
    <div class="profile">
      <router-link  to="/">
         <img :src="touxiang" alt="goodboy blog">
       </router-link>
      <span>goodboy 博客</span>
    </div>
    <ul class="menus">
      <li v-for="menu in menus">
        <router-link :to="{path: menu.name}" exact>
          <i :class="menu.icon" class="iconfont"></i>
          <span>{{ menu.text }}</span>
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
import store from '../vuex/store'
export default {
  data () {
    return {
    }
  },
  computed: {
    touxiang () {
      return store.getters.getTouxiang
    },
    menus () {
      return store.getters.getMenus
    }
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
    -webkit-overflow-scrolling: touch;

    .profile {
      padding-top: 40px;
      padding-bottom: 10px;

      a {
        width: 140px;
        display: block;
        margin: 0 auto;

        img {
          width: 140px;
          height: 140px;
          border-radius: 70px;
          overflow: hidden;
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
        display: block;
        width: 100%;
        height: 45px;
        line-height: 45px;
        font-size: 16px;

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
</style>
