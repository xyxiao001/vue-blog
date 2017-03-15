<template>
  <div class="wraper">
    <NavBar></NavBar>
    <div class="content">
      <Verification @successEvent="successVer" v-show="!go"></Verification>
      <div class="video" v-if="go === true">
        <p>视频播放器测试</p>
        <Xvideo></Xvideo>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from '../components/Nav'
import Verification from '../components/Verification'
import Xvideo from '../components/Xvideo'
export default {
  data () {
    return {
      go: false
    }
  },
  computed: {
  },
  components: {
    NavBar,
    Verification,
    Xvideo
  },
  methods: {
    successVer (data) {
      if (data === 'success') {
        this.go = true
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
    opacity: 1;
    animation: showVer 1s ease-out 1;
  }

  .video {
    padding-top: 5%;
    width: 800px;
    margin: auto;

    p {
      line-height: 40px;
    }
  }

  @keyframes showVer {
    0% {
      opacity: 0;
    }

    100% {
    }
  }

  @media screen and (max-width: 1100px) {
    .video {
      width: 95%;
    }
  }
</style>
