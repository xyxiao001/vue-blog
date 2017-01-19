<template>
  <div class="x-video">
    <div class="x-title">
      <p>{{ name }}</p>
    </div>
    <div class="t-video">
      <video
        :src="video"
        ref="video"
        :preload="cache === 'true' ? 'auto' : 'metadata'"
        :poster="img">
      </video>
    </div>
    <!-- 弹幕层 -->
    <div class="danmu"></div>
    <div class="c-video">
      <div class="play">
        <i class="iconfont" :class="{'icon-v-pause': play, 'icon-v-play': !play}" @click="playVideo"></i>
      </div>
      <div class="line">
        <span class="line-to line-bg"></span>
        <span class="line-to line-load" :style="{'width': (loadLength / 1) * 100 + '%'}"></span>
        <span class="line-to line-now" :style="{'width': (nowTime / allTime) * 100 + '%'}"></span>
        <span class="line-point" :style="{'left': (nowTime / allTime) * 100 + '%'}"></span>
      </div>
      <div class="show-time">
        <p>{{ reslutTime }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      play: false,
      nowTime: 0,
      allTime: 0,
      name: '那年那兔那些事儿 第一季 第一集',
      cache: false,
      img: '',
      loadLength: 0,
      ser: '',
      video: 'http://cn-zjcz1-dx.acgvideo.com/vg1/8/51/3216790-1.mp4?expires=1484821500&ssig=fov5nc7Ouejo_UwR9DP0PA&oi=3078726935&nfa=BaDS8BUFZDb8iKo4Vfwarw==&dynamic=1'
    }
  },
  computed: {
    reslutTime () {
      // 生成时间展示
      var two = (data) => {
        var m = ~~(data / 60)
        var s = ~~(data % 60)
        m = m > 9 ? m : '0' + m
        s = s > 9 ? s : '0' + s
        return m + ':' + s
      }
      return two(this.nowTime) + ' / ' + two(this.allTime)
    }
  },
  methods: {
    playVideo () {
      if (this.play) {
        this.play = false
        this.$refs.video.pause()
        this.pause()
      } else {
        this.play = true
        this.$refs.video.play()
        // 开始计时
        this.start()
      }
    },
    start () {
      this.set = setInterval(() => {
        this.nowTime = this.$refs.video.currentTime
        this.allTime = this.$refs.video.duration
        this.loadLength = this.$refs.video.buffered.length
      }, 100)
    },
    pause () {
      clearInterval(this.set)
    }
  },
  mounted () {
    // 显示加载进度
    var l = setInterval(() => {
      if (this.loadLength < 1) {
        this.loadLength = this.$refs.video.buffered.length
      } else {
        clearInterval(l)
      }
    }, 100)
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
    height: 460px;
    background-color: black;
    video {
      margin: 0;
      padding: 20px 2%;
      width: 96%;
    }
  }

  .danmu {
    position: absolute;
    top: 40px;
    width: 100%;
    height: 460px;
    z-index: 2px;
  }

  .c-video {
    height: 40px;
    border: 1px solid #e5e9ef;
    .play {
      float: left;
      height: 100%;
      i {
        color: #99a2aa;
        font-size: 28px;
        line-height: 40px;
        padding: 5px;
        cursor: pointer;
      }

      &:hover {
        background-color: #e5e9ef;

        i {
          color: #6d757a;
        }
      }
    }

    .line {
      position: relative;
      float: left;
      height: 100%;
      width: 60%;
      cursor: pointer;

      .line-to {
        position: absolute;
        width: 0;
        height: 6px;
        top: 18px;
        border-radius: 10px;
        background-color: #e7e7e7;
        transition: all 0.1s linear;
      }

      .line-bg {
        width: 100%;
        z-index: 1;
      }

      .line-load {
        z-index: 2;
        background-color: #8adceb;
      }

      .line-now {
        z-index: 3;
        background-color: #00aed6;
      }

      .line-point {
        position: absolute;
        top: 13px;
        margin-left: -5px;
        width: 14px;
        height: 14px;
        background-color: white;
        border-radius: 10px;
        border: 1px solid #8adceb;
        z-index: 4;
        transition: all 0.1s linear;
        cursor: pointer;
      }
    }

    .show-time {
      float: left;
      font-size: 14px;
      padding-left: 8px;
      line-height: 40px;
      color: #99a2aa;
    }
  }
</style>
