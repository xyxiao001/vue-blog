<template>
  <div class="wraper">
    <NavBar></NavBar>
    <div class="content">
      详情id = {{ this.$route.query.id }}
    </div>
  </div>
</template>

<script>
import NavBar from '../components/Nav'
export default {
  data () {
    return {
    }
  },
  computed: {
  },
  components: {
    NavBar
  },
  mounted () {
  }
}
</script>

<style lang="scss">
</style>
