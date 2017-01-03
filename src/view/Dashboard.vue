<template>
  <div class="wraper">
    <NavBar></NavBar>
    <div class="content">
      <List></List>
    </div>
  </div>
</template>

<script>
// import marked from 'marked'
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
  },
  methods: {
  },
  // 页面进入执行
  mounted () {
  },
  // 页面切换
  destroyed () {
  }
}
</script>

<style lang="scss">
  html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p,
  blockquote, pre, a, abbr, acronym, address, big, cite, code, del, dfn, em,
  img, ins, kbd, q, s, samp, small, strike, strong, sub, sup, tt, var, dl, dt,
  dd, ol, ul, li, fieldset, form, label, legend, table, caption, tbody, tfoot, thead, tr, th, td {
    margin: 0;
    padding: 0;
    border: 0;
    outline: 0;
    font-weight: inherit;
    font-style: inherit;
    font-family: inherit;
    font-size: 100%;
    -webkit-tap-highlight-color:rgba(255,255,255,0);
    vertical-align: baseline;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    text-decoration: none;
  }

  body {
    width: 100%;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
  }

  .content {
    background-color: #fff;
    padding-left: 250px;
    width: auto;
    overflow: hidden;
  }

  .model-open {
    zoom: 1;
    position: fixed;
    width: 100%;
    top: 0;
  }

  @media screen and (max-width: 1000px) {
    .content {
      padding-left: 0px;
      padding-top: 50px;
    }
  }
</style>
