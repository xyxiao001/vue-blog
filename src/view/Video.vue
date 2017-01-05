<template>
  <div class="wraper">
    <NavBar></NavBar>
    <div class="content">
      <Verification  @successEvent="successVer"></Verification>
      <div class="ver" v-show="go">{{ msg }}</div>
    </div>
  </div>
</template>

<script>
import NavBar from '../components/Nav'
import Verification from '../components/Verification'
export default {
  data () {
    return {
      go: false,
      msg: '还没通过验证, 隐藏了没用',
      smsg: '恭喜通过图片验证码， 正在全速加载视频播放器...'
    }
  },
  computed: {
  },
  components: {
    NavBar,
    Verification
  },
  methods: {
    successVer (data) {
      if (data === 'success') {
        this.go = true
        this.msg = this.smsg
      }
    }
  },
  mounted () {
  }
}
</script>

<style lang="scss">
  .ver {
    height: 400px;
    width: 600px;
    background-position: 0 -853px;
    position: fixed;
    margin-left: -150px;
    margin-top: -300px;
    top: 50%;
    left: 50%;
    z-index: 1;
    background: url('http://ofyaji162.bkt.clouddn.com/bg1.jpg') no-repeat;
    background-size: cover;
    color: white;
    text-align: center;
    font-size: 18px;
    padding-top: 20px;
    border-radius: 30px;
  }

  @media screen and (max-width: 1000px) {
    .ver {
      text-align: left;
      width: 320px;
      height: 250px;
      margin-top: -100px;
    }
  }
</style>
