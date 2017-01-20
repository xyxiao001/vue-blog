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
        @loadedmetadata="loadedmetadata"
        @seeked="seeked"
        @waiting="waiting"
        :poster="img">
      </video>
      <i v-show="!play" class="iconfont max-pause fade-in" :class="{'icon-v-pause': play, 'icon-v-play': !play}" @click="playVideo"></i>
    </div>
    <!-- 弹幕层 -->
    <div class="danmu" @click="playVideo"></div>
    <div class="c-video">
      <div class="play">
        <i class="iconfont" :class="{'icon-v-pause': play, 'icon-v-play': !play}" @click="playVideo"></i>
      </div>
      <div class="line"
        @mousemove="goTime($event)"
        @mouseleave="leaveTime"
        @click="jump()"
        ref="bar">
        <span class="go-time" v-show="showTime" :style="{'left': (goNowTime / allTime) * 100 + '%'}">{{ this.two(this.goNowTime) }}</span>
        <span class="line-to line-bg"></span>
        <span class="line-to line-load" :style="{'width': (loadLength / 1) * 100 + '%'}"></span>
        <span class="line-to line-now" :style="{'width': (nowTime / allTime) * 100 + '%'}"></span>
        <i class="line-point" :style="{'left': (nowTime / allTime) * 100 + '%'}"></i>
      </div>
      <div class="show-time">
        <p>{{ reslutTime }}</p>
      </div>
      <div class="v-volume">
        <i class="iconfont" :class="volumeIcon"></i>
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
      buffer: true,
      name: '若能绽放',
      cache: true,
      volume: 50,
      img: '',
      loadLength: 0,
      set: '',
      showTime: false,
      goNowTime: 0,
      video: 'http://devtest.qiniudn.com/%E8%8B%A5%E8%83%BD%E7%BB%BD%E6%94%BE%E5%85%89%E8%8A%92.mp4'
    }
  },
  computed: {
    reslutTime () {
      return this.two(this.nowTime) + ' / ' + this.two(this.allTime)
    },
    volumeIcon () {
      if (this.volume === 100) {
        return 'icon-v-v3'
      } else if (this.volume >= 50) {
        return 'icon-v-v2'
      } else if (this.volume > 0) {
        return 'icon-v-v1'
      } else {
        return 'icon-v-v0'
      }
    }
  },
  watch: {
    play () {
      this.play ? (this.$refs.video.play(), this.start()) : (this.$refs.video.pause(), this.pause())
    }
  },
  methods: {
    // 转化为两位的函数
    two (data) {
      var m = ~~(data / 60)
      var s = ~~(data % 60)
      m = m > 9 ? m : '0' + m
      s = s > 9 ? s : '0' + s
      return m + ':' + s
    },
    // 视频点击事件
    playVideo () {
      if (this.play) {
        this.play = false
      } else {
        this.play = true
        // 开始计时
      }
      if (this.loadLength < 1) {
        this.buffered()
      }
      if (this.buffered < this.nowTime / this.allTime) {
        this.buffered = Math.random(this.nowTime / this.allTime)
      }
    },
    // 开始播放
    start () {
      this.set = setInterval(() => {
        this.nowTime = this.$refs.video.currentTime
        this.allTime = this.$refs.video.duration
      }, 100)
    },
    // 暂停
    pause () {
      clearInterval(this.set)
    },
    // 袁素菊加载完毕! 包含总时间
    loadedmetadata () {
      if (this.$refs.video) {
        this.nowTime = this.$refs.video.currentTime
        this.allTime = this.$refs.video.duration
      }
    },
    // 跳转完成执行
    seeked () {
      if (this.play === false) {
        this.play = true
      }
    },
    goTime (event) {
      this.showTime = true
      var go = 0
      var all = window.getComputedStyle(this.$refs.bar).width
      all = all.replace('px', '')
      if (event.target.nodeName !== 'I') {
        go = event.offsetX
      } else {
        go = event.offsetX + (this.nowTime / this.allTime) * all
      }
      var time = ((go / all) * this.allTime).toFixed(3)
      this.goNowTime = time
    },
    // 移出控制台执行的
    leaveTime () {
      this.showTime = false
    },
    // 跳转时应该进行的
    jump () {
      this.$refs.video.currentTime = this.goNowTime
      this.nowTime = this.$refs.video.currentTime
    },
    // 跳跃等待函数
    waiting () {
    // 显示加载中
    },
    // 读取加载进度
    buffered () {
      var setting = ''
      clearInterval(setting)
      var buffer = this.$refs.video.buffered
      if (buffer.length >= 1) {
        setting = setInterval(() => {
          buffer = this.$refs.video.buffered
          if (buffer.end(buffer.length - 1) < this.allTime) {
            this.loadLength = (buffer.end(buffer.length - 1) / this.allTime)
          } else {
            this.loadLength = 1
            clearInterval(setting)
            this.buffer = true
          }
        }, 1000)
      }
    }
  },
  mounted () {
    // 加载缓冲进度
    if (this.cache) {
      this.buffered()
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
    color: #e5e9ef;
    vertical-align: middle;
  }
  .t-video {
    width: 100%;
    height: 460px;
    background-color: black;
    padding: 20px 0px;
    video {
      margin: 0;
      padding: 20px 2%;
      width: 96%;
    }

    .max-pause {
      position: absolute;
      bottom: 80px;
      right: 50px;
      font-size: 50px;
      height: 60px;
      width: 60px;
      color: #99a2aa;
      border: 1px solid #99a2aa;
      border-radius: 100%;

      &:before {
        position: absolute;
        padding-top: 8px;
        padding-left: 8px;
      }
    }
  }

  .danmu {
    position: absolute;
    top: 40px;
    width: 100%;
    height: 500px;
    z-index: 2px;
  }

  .c-video {
    height: 40px;
    border: 1px solid #e5e9ef;
    user-select: none;
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
      user-select: none;

      .go-time {
        position: absolute;
        top: -26px;
        background-color: #a3a3a3;
        padding: 2px 4px;
        border-radius: 5px;
        font-size: 14px;
        z-index: 5;
        margin-left: -15px;
      }

      .line-to {
        position: absolute;
        width: 0;
        height: 6px;
        top: 18px;
        border-radius: 10px;
        background-color: #e7e7e7;
        transition: all 0.05s linear;
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
        transition: all 0.05s linear;
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

    .v-volume {
      float: left;
      padding: 0 10px;
      width: 15px;
      line-height: 40px;
      color: #99a2aa;
      cursor: pointer;

      i {
        font-size: 20px;
      }
      &:hover {
        background-color: #e5e9ef;
      }
    }
  }

  .fade-in {
    animation: fadeIn 0.3s ease-out 1;
  }

  @keyframes fadeIn {
    0% {
      opacity: 0;
      transform: scale3d(2, 2, 2);
    }
    100% {
      opacity: 1;
      transform: scale3d(1, 1, 1);
    }
  }
</style>
