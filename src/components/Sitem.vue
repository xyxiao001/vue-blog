<template>
  <div
    class="s-item"
    @mouseover="changeName(item.title)"
    @mouseout="leave"
    @click="changeName(item.title)">
    <router-link
      :to="{path: '/story/detail',  query: {type: type , id: item.id, text: item.title}}">
      <div class="left">
        <img :src="item.img" :alt="item.title" />
      </div>
      <div class="right">
        <span class="title">{{ item.title }}</span>
        <p>{{ item.desc }}</p>
      </div>
    </router-link>
  </div>
</template>

<script>
import store from '../vuex/store'
export default {
  data () {
    return {
      set: false
    }
  },
  props: ['item', 'type'],
  methods: {
    changeName (name) {
      if (!this.set) {
        store.dispatch({
          type: 'setStory',
          payload: {
            name: name,
            page: this.$route.query.page ? ~~(this.$route.query.page) : 1
          }
        })
        this.set = true
      }
    },
    leave () {
      this.set = false
    }
  }
}
</script>

<style lang="scss">
  .s-item {
    display: inline-block;
    width: 31%;
    height: auto;
    margin: 1%;
    background-color: #fff;
    border: 1px solid #eee;
    -webkit-box-shadow: 0 1px 4px rgba(0, 0, 0, 0.27), 0 0 60px rgba(0, 0, 0, 0.06) inset;
    -moz-box-shadow: 0 1px 4px rgba(0, 0, 0, 0.27), 0 0 40px rgba(0, 0, 0, 0.06) inset;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.27), 0 0 40px rgba(0, 0, 0, 0.06) inset;
    position: relative;
    *zoom: 1;
    overflow: hidden;
    cursor: pointer;

    &>a {
      position: relative;
      display: inline-block;
      width: 100%;
      height: 100%;
    }

    .left {
      float: left;
      width: 30%;
      height: 100px;

      img {
        width: 100%;
        height: 100%;
        vertical-align: middle;
      }
    }

    .right {
      float: left;
      width: 65%;
      margin-left: 2%;

      .title {
        font-size: 16px;
        color: #62bbc3;
      }

      p {
        font-size: 13px;
        color: #aaa;
      }
    }
  }

  @media screen and (max-width: 1400px) {
      .s-item {
        width: 47%;
      }
  }

  @media screen and (max-width: 500px) {
    .s-item {
      width: 100%;
      margin: 5px;

      .left {
        float: left;
        width: 30%;

        img {
          vertical-align: middle;
          width: 100%;
          height: 100%;
        }
      }

      .right {
        width: 70%;
        height: 100%;
        margin: 0px;

        .title {
          margin-left: 2%;
        }

        p {
          margin-left: 2%;
          width: 95%;
        }
      }
    }
  }
</style>
