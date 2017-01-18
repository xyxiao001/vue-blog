<template>
  <div class="x-video">
    <div class="x-title">
      <p>{{ name }}</p>
    </div>
    <div class="t-video">
      <video :src="video">
      </video>
    </div>
    <div class="c-video">
      控制条
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      name: '那些年那些事 第一集',
      video: 'http://cn-zjcz1-dx.acgvideo.com/vg1/8/51/3216790-1.mp4?expires=1484740800&ssig=iSRFPrGyy-6gLrD65PI0XQ&oi=3078726935&nfa=BaDS8BUFZDb8iKo4Vfwarw==&dynamic=1'
    }
  }
}
</script>

<style lang="scss">
  .x-video {
    position: relative;
    width: 800px;
  }
  .x-title {
    width: 100%;
    text-align: center;
    background-color: #353535;
    color: white;
    vertical-align: middle;
  }
  .t-video {
    width: 100%;
    height: auto;
    background-color: black;
    video {
      margin: 0;
      padding: 20px 2%;
      width: 96%;
    }
  }
</style>
