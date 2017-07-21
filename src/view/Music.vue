<template>
  <div class="wraper">
    <NavBar></NavBar>
    <div class="content">
      <Loading :loading="loading"></Loading>
      <div class="music">
        <div class="bg" :style="{'background-image': 'url('+ bg +')'}"></div>
        <div class="mask"></div>
        <div class="show-music">
          <div class="serach-music">
            <input type="text>" placeholder="你想听什么呢？" v-model="search" @keyup.enter="searchMusic">
            <select @change="changeSelect" ref="select">
              <option>本地</option>
              <option>在线</option>
            </select>
            <button v-show="onLine" @click="searchMusic">搜索</button>
          </div>
          <div class="left">
            <ul>
                <li>
                  <span class="sing-name">歌曲</span>
                  <span class="control"></span>
                  <span class="singer-name">歌手</span>
                  <span class="sing-time" v-show="!onLine">时长</span>
                </li>
                <li
                  v-for="(list, index) in newLists"
                  :key="list.songid"
                  @click="playItem(index)"
                  :class="{on: list.songname === songName && list.singername === singer}">
                  <span class="sing-name" :title="list.songname">{{ index + 1 }}. {{ list.songname }}</span>
                  <span class="control">
                    <span class="living"></span>
                    <i
                      class="iconfont"
                      :class="{'icon-pauseMusic': index === now && playing === true,
                       'icon-playMusic': index !== now || (index === now && playing === false)}">
                    </i>
                  </span>
                  <span class="singer-name">{{ list.singername }}</span>
                  <span class="sing-time" v-show="!onLine">{{ ~~(list.seconds / 60) + ':' + list.seconds % 60 }}</span>
                </li>
            </ul>
          </div>
          <div class="right">
            <div class="l-box">
              <div class="show-img">
                  <img
                    :src="bg"
                    :alt="songName"
                    class="show-img animate-img"
                    ref="singImg"
                    :style="{'animation-play-state': playing === true ? 'running' : 'paused'}">
              </div>
              <div style="display: none" v-html="lyr" ref="lyr"></div>
              <div class="show-lyr" ref="showLyr"  @mouseover="inLyr" @mouseleave="outLyr">
                <div class="l-lyr" ref="lyrList">
                  <p
                    v-for="(s, index) in lyrList"
                    :data-time="(s.min * 60 + s.sec + s.ms / 100)">
                    {{ s.txt }}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="controls">
            <div class="control-label">
              <i class="iconfont icon-preMusic-copy"  title="上一首" @click="goPre"></i>
              <i
                @click="playItem(now)"
                class="iconfont playing"
                :class="{'icon-pauseMusic': playing === true,
                 'icon-playMusic': playing === false}"
                 :title="playingText ">
              </i>
              <i class="iconfont icon-nextMusic"  title="下一首" @click="goNext"></i>
            </div>
            <div class="show-info">
              <div class="i-l">
                <a class="title">{{ songName }}</a>
                <span> - </span>
                <a class="singer-name">{{ singer }}</a>
              </div>
              <div class="i-r">
                <p>{{ reslutTime }}</p>
              </div>
            </div>
            <div class="progress"
              ref="progress"
              @click="jumpGo"
              @mousemove="jumpTo"
              @mouseout="jumpLeave">
              <div class="line"></div>
              <div class="lineTo" :style="{'width': jump * 100 + '%'}"></div>
              <div class="lineIn" ref="lineIn" :style="{'width': (nowTime / allTime) * 100 + '%'}">
                <i class="iconfont icon-dot" @mousedown="drap($event)" @touchstart="drap($event)"></i>
              </div>
            </div>
            <div class="volume">
              <i
                @click="changeMuted"
                :class="{'icon-yl': muted === false, 'icon-jy': muted === true}"
                class="iconfont"></i>
              <span class="volume-line" @click="changeVolume"></span>
              <span class="volume-to"
                @click="changeVolume"
               :style="{'width': volume * 85 + 'px'}">
                <i class="iconfont icon-dot"></i>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <audio
      :src="musicSrc"
      ref="music"
      @playing="startTime"
      @timeupdate="startTime"
      @seeked="seeked"
      @ended="goNext"></audio>
  </div>
</template>

<script>
import store from '../vuex/store'
import NavBar from '../components/Nav'
import Loading from '../components/Loading'
export default {
  data () {
    return {
      url1: 'https://route.showapi.com/213-4?showapi_appid=26601&topid=26',
      url2: 'https://route.showapi.com/213-2?showapi_appid=26601&musicid=',
      url3: 'https://route.showapi.com/213-1?page=1&showapi_appid=26601&keyword=',
      musicId: '',
      lists: [],
      newLists: [],
      onLinelists: [],
      now: '',
      nowLyr: 0,
      lyrIn: false,
      playing: false,
      musicSrc: '',
      lyr: '',
      lyrList: [],
      preList: [],
      loading: true,
      bg: '',
      songName: '',
      singer: '',
      allTime: 0,
      nowTime: 0,
      timeInter: '',
      jump: 0,
      nowX: 0,
      oldX: 0,
      nowLine: 0,
      muted: false,
      volume: 0,
      search: '',
      onLine: false,
      oldLyr: 0,
      newLyr: 0,
      val: '',
      lyrIndex: 0
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
        return m + ' : ' + s
      }
      return two(this.nowTime) + '/' + two(this.allTime)
    },
    playingText () {
      return this.playing === true ? '暂停' : '开始'
    },
    key () {
      return store.getters.getKey
    }
  },
  watch: {
    search () {
      if (!this.onLine) {
        this.newLists = this.lists.filter((item) => {
          return (item.songname.indexOf(this.search) !== -1 || item.singername.indexOf(this.search) !== -1)
        })
      }
    },

    lyrIndex () {
      this.oldLyr = 0
    }
  },
  methods: {
    all () {
      this.$http.get(this.url1 + '&showapi_sign=' + this.key).then((response) => {
        // 移出loading
        this.loading = false
        // 处理数据
        this.lists = response.body.showapi_res_body.pagebean.songlist
        this.newLists = this.lists
        // 进来随机播放
        this.playItem(~~(Math.random() * this.lists.length))
        // 设置音量为一半
        this.$refs.music.volume = 0.5
        this.volume = 0.5
      }, (response) => {
        console.error('请求失败！')
      })
    },
    // 请求歌词
    detail () {
      this.lyrList = [{
        min: -1,
        ms: 0,
        sec: 0,
        txt: '歌词加载中...'
      }]
      this.musicId = this.newLists[this.now].songid
      this.$http.get(this.url2 + this.musicId + '&showapi_sign=' + this.key).then((response) => {
        // 歌词
        this.lyr = response.body.showapi_res_body.lyric
        // this.showLyr(response.body.showapi_res_body.lyric)
        this.showLyr()
      }, (response) => {
        console.error('请求失败！')
      })
    },
    // 搜素
    searchMusic () {
      if (this.onLine) {
        this.$http.get(this.url3 + this.search + '&showapi_sign=' + this.key).then((response) => {
          // 处理数据
          this.onLinelists = response.body.showapi_res_body.pagebean.contentlist
          this.newLists = this.onLinelists
          if (response.body.showapi_res_body.pagebean.allPages > 2) {
            this.$http.get('https://route.showapi.com/213-1?page=2&showapi_appid=26601' + '&showapi_sign=' + this.key + '&keyword=' + this.search).then((nextRes) => {
              this.now = 1000
              this.onLinelists = this.onLinelists.concat(nextRes.body.showapi_res_body.pagebean.contentlist)
              this.newLists = this.onLinelists
            }, (response) => {
              console.error('请求失败！')
            })
          }
          // 搜索结束不要播放
          // if (this.newLists.length > 0) {
          //   this.nowTime = 0
          //   this.now = 1
          //   this.playItem(0)
          // }
        }, (response) => {
          console.error('请求失败！')
        })
      }
    },
    // 选择播放的是哪首
    playItem (index) {
      if (index === this.now && this.playing === true) {
        this.pause()
      } else if (index === this.now && this.playing === false) {
        this.play()
      } else {
        this.nowTime = 0
        this.now = index
        this.playNext()
      }
    },
    // 单纯的播放
    play () {
      this.allTime = this.$refs.music.duration
      this.$refs.music.play()
      this.playing = true
      if (this.lyrIn) {
        this.outLyr()
      }
    },
    // 改变后播放
    playNext () {
      this.$refs.lyrList.style.transform = 'translate3d(0, 0, 0)'
      if (this.now !== this.preList[this.preList.length - 1]) {
        this.preList.push(this.now)
      }
      this.now = this.now > this.newLists.length - 1 ? 0 : this.now
      this.musicSrc = this.newLists[this.now].url ? this.newLists[this.now].url : this.newLists[this.now].m4a
      this.bg = this.newLists[this.now].albumpic_big
      this.songName = this.newLists[this.now].songname
      this.singer = this.newLists[this.now].singername
      // 记录歌曲时间
      this.allTime = this.newLists[this.now].seconds
      this.detail()
      this.$nextTick(() => {
        this.$refs.music.play()
        this.playing = true
        if (this.onLine) {
          setTimeout(() => {
            this.allTime = this.$refs.music.duration
          }, 1000)
        }
        // this.clearTime()
      })
    },
    // 解析歌词
    showLyr () {
      this.$nextTick(() => {
        // 转义字符
        var lyrics = this.$refs.lyr.innerHTML
        // 切割成数组
        lyrics = lyrics.split('\n')
        // console.log(lyrics)
        var lyrObj = []
        // 提取时间轴
        lyrics.forEach(function (val, index) {
          if (index > 4) {
            // 去除两边空格
            val = val.replace('/^s+|s+$/', '')
            var obj = {}
            obj.min = ~~(val.substring(1, 3))
            obj.sec = ~~(val.substring(4, 6))
            obj.ms = ~~(val.substring(7, 9))
            obj.txt = val.substring(10, val.length)
            obj.txt = obj.txt.replace('/^s+|s+$/', '')
            if (obj.txt.length > 0) {
              lyrObj.push(obj)
            }
          }
          // 提取时间
          // var time = /[[\d:\d((.|)\d\])]/g.exec(val)
        })
        // 添加一个空的p
        lyrObj.push({min: 999, sec: 999, ms: 999, txt: ''})
        this.lyrList = lyrObj
      })
    },
    // 开始计时
    startTime () {
      // this.timeInter = setInterval(() => {
      //
      // }, 100)
      // 读取当前时间
      this.nowTime = this.$refs.music.currentTime
      var lyrP = Array.prototype.slice.call(document.querySelectorAll('.l-lyr p'))
      if (this.lyrList.length > 2) {
        // 表示有歌词 可以滚动
        this.lyrList.forEach((v, i) => {
          if (i < this.lyrList.length - 1) {
            if (this.sumTime(v) <= this.nowTime && this.sumTime(this.lyrList[i + 1]) > this.nowTime) {
              // 选中p
              lyrP.forEach((val, index) => {
                if (index === i) {
                  val.className = 'now'
                  var a = this.sumTime(this.lyrList[i + 1]) - this.sumTime(this.lyrList[i])
                  var b = this.sumTime(this.lyrList[i + 1]) - this.nowTime
                  this.newLyr = (1 - (b / a))
                  this.val = val
                  this.animateLyr()
                  this.nowLyr = i
                  this.lyrIndex = index
                  if (this.oldLyr >= 100) {
                    this.oldLyr = 0
                  }
                  // 如果鼠标不在右边执行滚动
                  if (this.lyrIn === false) {
                    this.$refs.showLyr.scrollTop = 0
                    this.$refs.lyrList.style.transitionDuration = '0.4s'
                    this.$refs.lyrList.style.transform = 'translate3d(0, -' + (this.nowLyr - 1) * 35 + 'px, 0)'
                  }
                } else {
                  val.className = ''
                  val.style.backgroundImage = ''
                }
              })
            }
          }
        })
      }
    },

    // 动画
    animateLyr () {
      if (this.oldLyr < this.newLyr) {
        window.requestAnimationFrame(this.animateLyr)
      }
      this.$nextTick(() => {
        this.val.style.backgroundImage = `-webkit-linear-gradient(left,rgb(49, 194, 124) ${this.oldLyr * 100}%,#ffffff ${this.oldLyr * 100}%)`
        this.oldLyr += 0.005
      })
    },
    // 歌词
    inLyr () {
      if (this.lyrIn === false) {
        this.$refs.lyrList.style.transitionDuration = '0s'
        this.$refs.lyrList.style.transform = 'translate3d(0, 0, 0)'
        this.$refs.showLyr.scrollTop = (this.nowLyr - 1) * 35
        this.lyrIn = true
      }
    },
    outLyr () {
      setTimeout(() => {
        if (this.lyrIn === true) {
          this.$refs.lyrList.style.transitionDuration = '0s'
          this.$refs.lyrList.style.transform = 'translate3d(0, -' + (this.nowLyr - 1) * 35 + 'px, 0)'
          this.$refs.showLyr.scrollTop = 0
          this.lyrIn = false
        }
      }, 1000)
    },
    // 算出时间
    sumTime (v) {
      return (v.min * 60 + v.sec + v.ms / 100).toFixed(2)
    },
    // 结束计时
    clearTime () {
      clearTimeout(this.timeInter)
    },
    // 暂停
    pause () {
      this.$refs.music.pause()
      // this.clearTime()
      this.playing = false
    },
    // 下一首
    goNext () {
      this.now < this.lists.length - 1 ? this.now += 1 : this.now = 0
      this.nowTime = 0
      this.playNext()
    },
    // 上一首
    goPre () {
      // 上一曲时去读历史记录 来进行回放
      // 读到历史记录的倒数第二位
      if (this.preList.length > 1) {
        this.now = this.preList[this.preList.length - 2]
        // 然后进行删除记录
        this.nowTime = 0
        this.preList.pop()
        this.playNext()
      } else {
        return false
      }
    },
    // 想要去跳转
    jumpTo (event) {
      // 得到容器长度
      var all = window.getComputedStyle(this.$refs.progress).width
      all = all.replace('px', '')
      this.jump = (event.offsetX / all).toFixed(2)
    },
    // 离开
    jumpLeave () {
      this.jump = 0
    },
    // 跳转
    jumpGo (event) {
      // 当开始点击时 停止播放
      this.pause()
      var go = event.offsetX
      // 得到要去的时间
      var all = window.getComputedStyle(this.$refs.progress).width
      all = all.replace('px', '')
      var time = ((go / all) * this.allTime).toFixed(2)
      this.$refs.music.currentTime = time
    },
    // 跳转完成后
    seeked () {
      this.play()
    },
    // 是否静音
    changeMuted () {
      if (!this.muted) {
        this.muted = true
        this.$refs.music.muted = true
      } else {
        this.muted = false
        this.$refs.music.muted = false
      }
    },
    // 改变音量
    changeVolume (event) {
      var volume = ((event.offsetX) / 80).toFixed(2)
      volume = volume > 1 ? 1 : volume
      this.volume = volume
      this.$refs.music.volume = volume
    },
    // 搜索
    changeSelect () {
      this.onLine = this.$refs.select.value === '在线'
      this.newLists = this.onLine ? this.onLinelists : this.lists
    },
    // 进度条拖拽
    drap (e) {
      e.preventDefault()
      this.pause()
      this.oldX = e.clientX ? e.clientX : e.touches[0].clientX
      this.nowLine = window.getComputedStyle(this.$refs.lineIn).width
      this.nowLine = this.nowLine.replace('px', '')
      this.$refs.lineIn.style.transitionDuration = '0s'
      window.addEventListener('mousemove', this.move)
      window.addEventListener('touchmove', this.move)
      window.addEventListener('mouseup', this.leave)
      window.addEventListener('touchend', this.leave)
    },
    move (e) {
      // 得到当前
      var all = window.getComputedStyle(this.$refs.progress).width
      all = all.replace('px', '')
      this.nowX = e.clientX ? e.clientX : e.touches[0].clientX
      var end = Number(this.nowX - this.oldX) + Number(this.nowLine)
      end = end > all ? all : end < 0 ? 0 : end
      this.nowTime = Number(((end / all) * this.allTime).toFixed(2))
    },
    leave (e) {
      if (this.oldX !== 0) {
        this.oldX = 0
        this.$refs.music.currentTime = this.nowTime
        this.$refs.lineIn.style.transitionDuration = '0.05s'
      }
      window.removeEventListener('mousemove', this.move)
      window.removeEventListener('touchmove', this.move)
    }
  },
  components: {
    NavBar,
    Loading
  },
  mounted () {
    this.all()
    // 绑定事件
    window.addEventListener('keydown', (e) => {
      switch (e.keyCode) {
        case 32:
          if (this.playing === true) {
            this.pause()
          } else {
            this.play()
          }
          break
        case 37:
          if (this.playing === true) {
            this.goPre()
          }
          break
        case 39:
          if (this.playing === true) {
            this.goNext()
          }
          break
        default:
          return false
      }
    })
  },
  destroyed () {
    // this.clearTime()
  }
}
</script>

<style lang="scss">
  span.clip {
    display: inline-block;
    width: 100%;
    line-height: 30px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space:nowrap;
  }

  .music {
    position: fixed;
    width: 100%;
    height: 100%;
    font-size: 14px;
    line-height: 1.5;
    font-family: poppin,'PingFang SC',Tahoma,Arial,\5FAE\8F6F\96C5\9ED1,sans-serif;
    color: rgba(225,225,225, 0.9);

    .bg {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-repeat: no-repeat;
      background-size: cover;
      background-position: 50%;
      filter: blur(60px);
      opacity: .8;
    }

    .mask {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: #292a2b;
      background-color: rgba(0,0,0,.35);
      z-index: 2;
    }

    .show-music {
      position: absolute;
      margin-left: 5%;
      width: 90%;
      padding: 5%;
      color: rgba(225,225,225, 1);
      z-index: 3;

      .left {
        float: left;
        width: 40%;
        height: 410px;
        overflow-y: scroll;
        overflow-x: hidden;
        &::-webkit-scrollbar {
          width: 8px;
          height: 8px;
          background-color: #202020;
          -webkit-border-radius: 4px;
          -moz-border-radius: 4px;
          border-radius: 4px;
        }

        &::-webkit-scrollbar-thumb {
          background-color: rgba(235,87,86,.73);
          -webkit-border-radius: 4px;
          -moz-border-radius: 4px;
          border-radius: 4px;
        }

        ul {
          display: block;
          width: 100%;
          height: 100%;

          li {
            height: 50px;
            text-align: left;
            cursor: pointer;

            span {
              display: inline-block;
              text-overflow: ellipsis;
              overflow: hidden;
              white-space:nowrap;
            }

            span.sing-name {
              width: 50%;
            }

            span.singer-name {
              width: 20%;
            }

            span.sing-time {
              width: 10%;
            }
          }

          span.control {
            width: 10%;
            opacity: 0;
            user-select: none;

            i {
              font-size: 18px;
              line-height: 100%;
              margin-right: 5px;
            }

            &:hover {
              opacity: 1
            }
          }

          .living {
            display: none;
            width: 10px;
            height: 10px;
            margin-right: 10px;
            background-image: url(http://y.gtimg.cn/mediastyle/yqq/img/wave.gif?max_age=2592000&v=78979d47cc7dc55cab5d36b4c96168d5);
          }

          li.on span {
            color: white;
          }

          li.on span.control {
            opacity: 1;
          }

          li.on .living {
            display: inline-block;
          }

          li:hover {
            span.control {
              opacity: 1
            }
          }
        }
      }

      .right {
        float: left;
        width: 40%;
        height: 415px;
        overflow-x: hidden;
        overflow-y: hidden;
        &::-webkit-scrollbar {
          width: 8px;
          height: 8px;
          background-color: #202020;
          -webkit-border-radius: 4px;
          -moz-border-radius: 4px;
          border-radius: 4px;
        }

        &::-webkit-scrollbar-thumb {
          background-color: rgba(235,87,86,.73);
          -webkit-border-radius: 4px;
          -moz-border-radius: 4px;
          border-radius: 4px;
        }

        .l-box {
          position: relative;
          width: 100%;
          height: auto;
          overflow: hidden;
          .show-img {
            position: absolute;;
            width: 240px;
            height: 240px;
            left: 50%;
            margin-left: -110px;
            border-radius: 100%;
            background-size: cover;
            background-image: url(http://music.163.com/style/mobile/img/share/disc-ip6.png);

            img {
              position: absolute;
              top: 45px;
              left: 155px;
              width: 62%;
              height: 62%;
              transition: transform 1s ease;
            }

            img.animate-img {
              animation: showImg 35s linear infinite;
            }
          }
          @keyframes showImg {
            0% {
              transform: rotate3d(0, 0, 0, 360deg);
            }
            100% {
              transform: rotate3d(0, 0, 1, 360deg);
            }
          }

          .show-lyr {
            position: relative;
            margin-top: 250px;
            width: 105%;
            height: 200px;
            overflow-y: auto;
          }

          .l-lyr {
            position: relative;
            width: 100%;
            transition: all 0.4s ease-out;
            margin-bottom: 200px;
            p {
              text-align: center;
              line-height: 35px;
              transition: all 0.38s ease-out;

              &.on {
                color: #31c27c;
              }
            }
          }
        }

      }

      .controls {
        position: fixed;
        width: 50%;
        margin-left: 10%;
        bottom: 10px;
        color: rgba(225,225,225, 1);

        .control-label {
          float: left;
          width: 200px;
          height: 90px;
          user-select: none;
          i {
            font-size: 40px;
            margin-right: 10px;
            cursor: pointer;
          }
        }

        .show-info {
          width: 65%;
          margin-top: 5px;
          float: left;

          .i-l {
            float: left;
          }

          .i-r {
            float: right;
          }
        }

        .progress {
          position: relative;
          width: 65%;
          display: inline-block;
          margin-top: 10px;
          padding-top: 10px;
          height: 20px;
          cursor: pointer;

          .line {
            position: relative;
            height: 2px;
            background: rgba(255,255,255,.2);
          }

          .lineTo {
            position: absolute;
            top: 10px;
            left: 0px;
            width: 0%;
            height: 2px;
            background: rgba(255,255,255, 0);
            transition: all 0.05s linear;
            z-index: 2;
          }

          .lineIn {
            position: absolute;
            top: 10px;
            left: 0px;
            width: 0%;
            height: 2px;
            background: rgba(255,255,255,.7);
            transition: all 0.05s linear;
            z-index: 10;

            i.icontdot, i::before {
              position: absolute;
              font-size: 28px;
              top: -18px;
              right: 5px;
              width: 10px;
              height: 10px;
              background-position: 0 -170px;
              opacity: 1;
              filter: none;
              color: white;
            }
          }
        }

        .volume {
          float: right;
          position: relative;
          margin-top: -10px;
          width: 120px;

          i {
            cursor: pointer;
            font-size: 25px;
          }

          .volume-line {
            position: absolute;
            width: 85px;
            top: 20px;
            left: 30px;
            height: 4px;
            background: rgba(255,255,255,.2);
            z-index: 1;
            cursor: pointer;
          }

          .volume-to {
            position: absolute;
            top: 20px;
            left: 30px;
            height: 4px;
            background: rgba(255,255,255, 0.8);
            z-index: 2;
            cursor: pointer;

            i.icontdot, i:before {
              position: absolute;
              top: -14px;
              right: -8px;
              z-index: 3;
            }
          }
        }
      }

      .serach-music {
        margin-bottom: 20px;

        input {
          width: 140px;;
          line-height: 31px;
          border: 0;
          background: none;
          border-bottom: 1px solid white;
          font-size: 18px;
          outline: inherit;
          z-index: 1;
          padding-left: 5px;
          color: white;
          width: 150px;
          opacity: 1;

          &:focus {
          }
        }

        select {
          display: inline-block;
          width: 80px;;
          height: 33px;
          border: 0;
          font-size: 18px;
          outline: inherit;
          z-index: 1;
          padding-left: 5px;
        }

        button {
          display: inline-block;
          line-height: 1;
          white-space: nowrap;
          cursor: pointer;
          background: #fff;
          border: 1px solid #c0ccda;
          color: #1f2d3d;
          -webkit-appearance: none;
          text-align: center;
          box-sizing: border-box;
          outline: none;
          margin: 0;
          -moz-user-select: none;
          -webkit-user-select: none;
          -ms-user-select: none;
          padding: 9px 15px;
          font-size: 15px;
          border-radius: 4px;
          color: #fff;
          background-color: #50bfff;
          border-color: #50bfff;
        }
      }
    }
  }

  @media screen and (max-width: 1400px) {
    .music .show-music {
      margin-left: 2%;
      padding: 4%;

      .left {
        height: 340px;

        ul {
          li {
            span.control {
              width: 15%;
            }
          }
        }
      }

      .right {
        width: 40%;
        height: 340px;

        .l-box .show-img {
          width: 180px;
          height: 180px;
          margin-left: -90px;

          img {
            top: 34px;
            left: 125px;
          }
        }

        .l-box .show-lyr {
          margin-top: 200px;
        }
      }

      .controls {
        margin-left: 0;
        width: 70%;
      }
    }
  }

  @media screen and (max-width: 1000px) {
    .music .show-music {
      .left {
        width: 50%;
      }

      .right {
        width: 50%;
      }
    }
  }

  @media screen and (max-width: 800px) {
    .music .bg {
      filter: none;
    }

    .music .show-music {
      width: 100%;
      margin-left: 0;
      padding-left: 1%;
      .left {
        width: 105%;
        height: 202px;
      }

      .right {
        width: 100%;
        height: 105px;
        line-height: 35px;
        text-align: left;

        .l-box {
          height: 105px;

          .show-img {
            display: none;
          }

          .show-lyr {
            margin-top: 10px;
            height: 100px;

            p {
              opacity: 0.6;

              &.on {
                opacity: 1;
              }
            }
          }
        }
      }

      .controls {
        width: 100%;
        bottom: 0px;
        font-size: 12px;

        .control-label {
          width: 35%;
          height: 60px;
          text-align: center;

          i {
            font-size: 30px;
            margin-right: 2px;
            margin-left: 0px;
          }
        }

        .show-info {
          margin-top: -90px;
          margin-left: 10px;
          width: 80%;
        }

        .progress {
          width: 50%;
          margin-top: 15px;
          margin-left: 0;

          .lineIn {
            i {
              top: -18px;
            }
          }
        }

        .volume {
          display: none;
        }
      }
    }
  }

  @media screen and (max-width: 320px) {
    .music .show-music .left table td:first-child {
      max-width: 190px;
    }
  }

  .music .show-music .right .l-box .l-lyr {
    display: flex;
    align-items: center;
    flex-direction: column;
  }

  .now {
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
</style>
