<template>
  <div class="wraper self">
    <router-link :to="{path: '/story'}" class="sologan">{{ name }}</router-link>
  </div>
</template>

<script>
export default {
  data () {
    return {
      name: 'goodboy',
      des: '叩首为梦 码梦为生'
    }
  },
  computed: {
  },
  components: {
  }
}
</script>

<style lang="scss">
  .self {
    position: fixed;
    width: 100%;
    height: 100%;
    background-image: url('http://ofyaji162.bkt.clouddn.com/bg1.webp');
    background-position: 50%;
    background-repeat: no-repeat;
    background-size: cover;

    .sologan {
      display: block;
      font-size: 50px;
      color: white;
      text-align: center;
    }
  }
</style>
