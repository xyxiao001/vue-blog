<template>
  <div class="wraper">
    <NavBar></NavBar>
    <div class="content">
      <div class="tag-list">
        <div class="tag-item" v-for="(tag, index) in tags">
            <router-link :to="{path: 'tags/' + tag.name }">
              {{ tag.name }}
            </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import store from '../vuex/store.js'
import NavBar from '../components/Nav'
export default {
  data () {
    return {
    }
  },
  computed: {
    tags () {
      return store.getters.getTags
    }
  },
  components: {
    NavBar
  }
}
</script>

<style lang="scss">
  .tag-list {
    margin: 50px;
    min-width: 200px;
  }

  .tag-item {
    display: inline-block;
    margin: 10px;
    margin-bottom: 20px;

    a {
      position: relative;
      padding: 10px 20px;
      border: 1px solid #d9d9d9;
      border-radius: 20px;
      box-sizing: border-box;
      font-size: 15px;
      font-weight: normal;
      line-height: 1.5;
      color: white;
      border-color: #e78170;
      background: #e78170;
      box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
      text-decoration: none;
    }
  }
</style>
