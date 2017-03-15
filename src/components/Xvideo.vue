<template>
  <div class="x-video" :class="{'mid-video': midScreen, 'max-video mid-video': maxScreen}" ref="xVideo" @mousemove="toogleMenu">
    <div class="x-title" ref="xTitle">
      <p>{{ name }}</p>
    </div>
    <div class="t-video" @dbclick="toMax">
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
    <div class="c-video" ref="xControl">
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
        <span class="line-to line-now" :style="{'width': (nowTime / allTime) * 100 + '%'}" ref="lineIn"></span>
        <i class="line-point" :style="{'left': (nowTime / allTime) * 100 + '%'}" @mousedown="drap($event)" @touchstart="drap($event)"></i>
      </div>
      <div class="show-time">
        <p>{{ reslutTime }}</p>
      </div>
      <div class="right-c">
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
      // 菜单隐藏时间
      menuTime: 2,
      setMenu: '',
      // 音量
      volume: 50,
      // 等待动画
      watting: true,
      img: '',
      loadLength: 0,
      set: '',
      showTime: false,
      goNowTime: 0,
      video: 'http://devtest.qiniudn.com/%E8%8B%A5%E8%83%BD%E7%BB%BD%E6%94%BE%E5%85%89%E8%8A%92.mp4',
      screenX: 0,
      oldX: 0,
      setting: ''
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
    },
    maxScreen () {
      if (!this.maxScreen) {
        clearInterval(this.setMenu)
        this.$refs.xTitle.style.transform = 'translate3d(0, 0, 0)'
        this.$refs.xControl.style.transform = 'translate3d(0, 0, 0)'
      }
    },
    midScreen () {
      if (!this.midScreen) {
        clearInterval(this.setMenu)
        this.$refs.xTitle.style.transform = 'translate3d(0, 0, 0)'
        this.$refs.xControl.style.transform = 'translate3d(0, 0, 0)'
      }
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
      this.maxScreen = false
    },
    // 全屏模式菜单栏的显示
    toogleMenu (e) {
      e.preventDefault()
      e.stopPropagation()
      this.screenX = this.screenX === 0 ? e.screenX : this.screenX
      if (Math.round(this.screenX - e.screenX) === 1) {
        this.screenX = e.screenX
        // 每次移动先清除定时器 然后设置定时器menuTimes后关闭菜单
        let title = this.$refs.xTitle
        let control = this.$refs.xControl
        if (this.maxScreen || this.midScreen) {
          title.style.transform = 'translate3d(0, 0, 0)'
          control.style.transform = 'translate3d(0, 0, 0)'
          clearInterval(this.setMenu)
          if (this.play) {
            this.setMenu = setTimeout(() => {
              title.style.transform = 'translate3d(0, -100%, 0)'
              control.style.transform = 'translate3d(0, 100%, 0)'
            }, this.menuTime * 1000)
          }
        }
      } else {
        this.screenX = e.screenX
        return false
      }
      // console.log(e)
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
    // 拖拽
    drap (e) {
      this.pause()
      e.preventDefault()
      window.addEventListener('mousemove', this.move)
      window.addEventListener('touchmove', this.move)
      window.addEventListener('mouseup', this.leave)
      window.addEventListener('touchend', this.leave)
    },
    // 开始拖拽
    move (e) {
    },
    // 结束拖拽
    leave (e) {
      window.removeEventListener('mousemove', this.move)
      window.removeEventListener('touchmove', this.move)
      window.removeEventListener('mouseup', this.leave)
      window.removeEventListener('touchend', this.leave)
      this.start()
    },
    // 跳跃等待函数
    // 显示加载中
    waiting () {
      this.watting = true
    },
    // 读取加载进度
    buffered () {
      clearInterval(this.setting)
      var buffer = this.$refs.video.buffered
      if (buffer.length >= 1) {
        this.setting = setInterval(() => {
          buffer = this.$refs.video.buffered
          if (buffer.end(buffer.length - 1) < this.allTime) {
            this.loadLength = (buffer.end(buffer.length - 1) / this.allTime)
          } else {
            this.loadLength = 1
            clearInterval(this.setting)
            this.buffer = true
          }
        }, 1000)
      }
    },
    // 键盘事件
    keyboard (e) {
      switch (e.code) {
        case 'Escape':
          if (this.midScreen) {
            this.midScreen = false
            this.maxScreen = false
            clearInterval(this.setMenu)
            this.$refs.xTitle.style.transform = 'translate3d(0, 0, 0)'
            this.$refs.xControl.style.transform = 'translate3d(0, 0, 0)'
          }
          break
        case 'F11':
          if (this.maxScreen) {
            this.maxScreen = false
            clearInterval(this.setMenu)
            this.$refs.xTitle.style.transform = 'translate3d(0, 0, 0)'
            this.$refs.xControl.style.transform = 'translate3d(0, 0, 0)'
          }
          break
        case 'Space':
          this.playVideo()
          break
        default:
          console.log(e.code)
          break
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
    var that = this
    // 加载缓冲进度
    if (this.cache) {
      this.buffered()
    }

    // 监听esc
    window.addEventListener('keyup', this.keyboard)
    // document.addEventListener('fullscreenchange', function (event) {
    //   console.log(document.fullscreen)
    // })
    document.addEventListener('webkitfullscreenchange', function (event) {
      if (!(document.webkitFullscreenElement === that.$refs.xVideo)) {
        that.maxScreen = false
      }
    })
  },
  destroyed () {
    this.pause()
    clearInterval(this.setting)
  }
}
</script>

<style lang="scss">
  .x-video {
    position: relative;
    width: 100%;
    overflow: hidden;

    .x-title {
      width: 100%;
      text-align: center;
      background-color: #353535;
      color: #e5e9ef;
      vertical-align: middle;
      transition: transform 0.5s ease-out;
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
            top: 18px;
            padding-left: 20.5px;
          }
      }
    }

    .c-video {
      height: 40px;
      border: 1px solid #e5e9ef;
      user-select: none;
      color: #6d757a;
      background-color: white;
      transition: transform 0.5s ease-out;
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
        width: calc(100% - 350px);
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
          top: 14px;
          margin-left: -10px;
          width: 12px;
          height: 12px;
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
        width: 100px;
        font-size: 14px;
        padding-left: 8px;
        line-height: 40px;
        text-align: center;
      }

      .right-c {
        float: right;
        width: 200px;

        .c-item {
          width: 20%;
        }
      }

      .c-item {
        position: relative;
        float: left;
        width: 40px;
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

    .x-title {
      position: absolute;
      top: 0;
      z-index: 10000;
      background-color: rgba(0, 0, 0, 0.6);

      p {
        padding-left: 50px;
        text-align: left;
      }
    }

    .t-video {
      height: 100%;
      video {
        display: block;
        width: 100%;
        height: 100%;
        margin: auto;
      }

      .max-pause {
        bottom: 100px;
      }
    }

    .c-video {
      position: absolute;
      width: 100%;
      bottom: 0px;
      z-index: 10000;

      .line {

        .line-bg {
        }
      }

      .show-time {
      }

      .right-c {
      }

      .c-item {

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

  @media screen and (max-width: 1200px) {
    .x-video {
      .c-video {
        .line {
        }
        .show-time {
        }
      }
    }
  }

  @media screen and (max-width: 700px) {
    .x-video {
      .x-loading {
        i, p{
          top: 70%;
        }
      }
    }
  }
</style>
