<template>
  <div class="wraper">
    <NavBar></NavBar>
    <div class="content">
      <div class="show-tag">
        <div class="tag-item">
            <router-link to='/tags'>标签</router-link>
        </div>
        <div class="tag-item">
          <a>→</a>
        </div>
        <div class="tag-item">
            <a>{{ this.$route.params.name }}</a>
        </div>
      </div>
      <List></List>
    </div>
  </div>
</template>

<script>
import NavBar from '../components/Nav'
import List from '../components/List'
export default {
  data () {
    return {
    }
  },
  computed: {
  },
  components: {
    NavBar,
    List
  }
}
</script>

<style lang="scss">
  .show-tag {
    margin-top: 20px;
  }

  .go-next {
    position: absolute;
  }
</style>
