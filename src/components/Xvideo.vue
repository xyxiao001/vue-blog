<template>
  <div class="x-video" :class="{'mid-video': midScreen, 'max-video mid-video': maxScreen}" ref="xVideo">
    <div class="x-title">
      <p>{{ name }}</p>
    </div>
    <div class="t-video">
      <video
        :src="video"
        ref="video"
        :preload="cache === 'true' ? 'auto' : 'metadata'"
        @loadedmetadata="loadedmetadata"
        @canplay= "canplay"
        @seeked="seeked"
        @waiting="waiting"
        :poster="img">
      </video>
      <i v-show="!play" class="iconfont max-pause fade-in" :class="{'icon-v-pause': play, 'icon-v-play': !play}" @click="playVideo"></i>
      <!-- 弹幕层 -->
      <div class="danmu" @click="playVideo"></div>
      <!-- 加载动画 -->
      <div class="x-loading" v-show="watting">
        <i class="iconfont icon-v-loading"></i>
        <p>加载中..</p>
      </div>
    </div>
    <div class="c-video">
      <div class="play c-item" :data-msg="playMsg">
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
      <div class="v-volume c-item">
        <i class="iconfont" :class="volumeIcon"></i>
      </div>
      <div class="v-definition c-item">
        {{ definition }}
      </div>
      <div class="c-dan c-item" @click="changeBarrage" :data-msg="danMsg">
        <i class="iconfont" :class="{'icon-open-dan': barrage, 'icon-close-dan': !barrage}"></i>
      </div>
      <div class="m-screen c-item" :data-msg="midScreenMsg" @click="midScreen = !midScreen">
        <i class="iconfont icon-mid-screen"></i>
      </div>
      <div class="f-screen c-item" :data-msg="maxScreenMsg" @click="toMax">
        <i class="iconfont icon-max-screen"></i>
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
      definition: '超清',
      // 弹幕
      barrage: false,
      // 网页全屏
      midScreen: false,
      // 全屏
      maxScreen: false,
      // 是否打开页面自动缓存
      cache: true,
      // 音量
      volume: 50,
      // 等待动画
      watting: true,
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
    },
    playMsg () {
      return this.play ? '暂停' : '播放'
    },
    danMsg () {
      return this.barrage ? '关闭弹幕' : '打开弹幕'
    },
    midScreenMsg () {
      return this.midScreen ? '小屏模式' : '宽屏模式'
    },
    maxScreenMsg () {
      return this.maxScreen ? '退出全屏' : '全屏'
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
      if (!this.play && !this.watting) {
        this.play = true
      } else {
        this.play = false
      }
      if (this.loadLength < 1) {
        this.buffered()
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
    // 元数据加载完毕! 包含总时间
    loadedmetadata () {
      if (this.$refs.video) {
        this.nowTime = this.$refs.video.currentTime
        this.allTime = this.$refs.video.duration
      }
    },
    // 能够播放
    canplay () {
      this.watting = false
    },
    // 跳转完成执行
    seeked () {
      if (this.play === false) {
        this.play = true
      }
      this.watting = false
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
    // 全屏
    toMax () {
      var elem = this.$refs.xVideo
      if (!this.maxScreen) {
        if (elem.requestFullscreen) {
          elem.requestFullscreen()
        } else if (elem.mozRequestFullScreen) {
          elem.mozRequestFullScreen()
        } else if (elem.webkitRequestFullscreen) {
          elem.webkitRequestFullscreen()
        }
      } else {
        // 取消全屏
        if (document.exitFullscreen) {
          document.exitFullscreen()
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen()
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen()
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen()
        }
      }
      this.maxScreen = !this.maxScreen
    },
    // 取消全屏事件
    cancel (e) {
      if (e.code === 'Escape' && this.maxScreen) {
        this.maxScreen = false
      }
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
    // 显示加载中
    waiting () {
      this.watting = true
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
    },
    // 弹幕开关
    changeBarrage () {
      if (this.barrage) {
        this.barrage = false
      } else {
        this.barrage = true
      }
    }
  },
  mounted () {
    // 加载缓冲进度
    if (this.cache) {
      this.buffered()
    }

    // 监听esc
    window.addEventListener('keyup', this.cancel)
  }
}
</script>

<style lang="scss">
  .x-video {
    position: relative;
    width: 800px;
    overflow: hidden;

    .x-title {
      width: 100%;
      text-align: center;
      background-color: #353535;
      color: #e5e9ef;
      vertical-align: middle;
    }
    .t-video {
      position: relative;
      width: 100%;
      background-color: black;
      video {
        margin: 2%;
        width: 96%;
      }

      .max-pause {
        position: absolute;
        bottom: 50px;
        right: 50px;
        font-size: 45px;
        height: 60px;
        width: 60px;
        color: #99a2aa;
        border: 1px solid #99a2aa;
        border-radius: 100%;

        &:before {
          position: absolute;
          padding-top: 7px;
          padding-left: 12px;
        }
      }
    }

    .danmu {
      position: absolute;
      top: 0;
      width: 100%;
      height: 100%;
      z-index: 2;
    }

    .x-loading {
      position: absolute;
      top: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.95);
      z-index: 10;

      p {
        position: absolute;
        width: 100%;
        text-align: center;
        color: #99a2aa;
        top: 50%;
      }

      i {
        position: absolute;
        font-size: 60px;
        width: 100px;
        height: 100px;
        top: 50%;
        left: 50%;
        margin-left: -50px;
        margin-top: -100px;
        color: #99a2aa;
        animation: turn 1s linear infinite;
          &:before {
            position: absolute;
            top: 17.5px;
            padding-left: 19.5px;
          }
      }
    }

    .c-video {
      height: 40px;
      border: 1px solid #e5e9ef;
      user-select: none;
      color: #6d757a;
      .play {
        float: left;
        height: 100%;
        color: #99a2aa;
        i {
          font-size: 28px;
          line-height: 40px;
          padding: 5px;
          cursor: pointer;
        }

        &:before {
          left: -10px!important;
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
        width: 59%;
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
          color: white;
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
        width: 10%;
        font-size: 14px;
        padding-left: 8px;
        line-height: 40px;
        text-align: center;
      }

      .c-item {
        position: relative;
        float: left;
        width: 5%;
        padding: 0;
        text-align: center;
        font-size: 13px;
        line-height: 40px;
        cursor: pointer;

        i {
          font-size: 20px;
        }

        &:before {
          display: none;
          position: absolute;
          top: -33px;
          left: -20px;
          width: 60px;
          padding: 0 6px;
          line-height: 30px;
          text-align: center;
          color: #d9d9d9;
          border-radius: 5px;
          background-color: rgba(0, 0, 0, 0.8);
          content: attr(data-msg);
          animation: fadeIn 0.2s ease-out 1;
        }

        &:hover {
          background-color: #e5e9ef;
          &:before {
            display: block;
          }
        }
      }

      .v-volume {
        i:before {
          margin-top: 3px;
          margin-left: 3px;
        }
      }
      .c-dan {
        i {
          font-size: 22px;
        }
      }

      .f-screen {
        &:before {
          left: -30px;
        }
      }
    }
  }

  .mid-video {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: white;
    z-index: 9999;

    .t-video {
      height: 100%;
      video {
        display: block;
        height: 80%;
        max-height: 90%;
        margin: auto;
        padding-top: 3%;
      }

      .max-pause {
        bottom: 100px;
      }
    }

    .c-video {
      position: absolute;
      width: 100%;
      background: #e5e9ef;
      bottom: 0px;
      z-index: 10000;

      .line {
        width: 81%;

        .line-bg {
          background-color: gray;
        }
      }

      .show-time {
        width: 6%;
      }

      .c-item {
        width: 2%;
      }
    }
  }

  .fade-in {
    animation: scaleIn 0.3s ease-out 1;
  }

  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  @keyframes scaleIn {
    0% {
      opacity: 0;
      transform: scale3d(2, 2, 2);
    }
    100% {
      opacity: 1;
      transform: scale3d(1, 1, 1);
    }
  }

  @keyframes turn {
    0% {
      transform: rotate3d(0, 0, 0, 180deg);
    }
    100% {
      transform: rotate3d(0, 0,  4, 180deg);
    }
  }

  @media screen and (max-width: 1400px) {
    .mid-video {
      .c-video {
        .line {
          width: 72%;
        }

        .show-time {
          width: 9%;
        }

        .c-item {
          width: 3%;
        }
      }
    }
  }
</style>
