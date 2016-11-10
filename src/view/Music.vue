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
              <option>列表</option>
              <option>在线</option>
            </select>
            <button v-show="onLine" @click="searchMusic">搜索</button>
          </div>
          <div class="left">
            <table>
              <thead>
                <tr>
                  <td>歌曲</td>
                  <td></td>
                  <td>歌手</td>
                  <td v-show="!onLine">时长</td>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(list, index) in newLists"
                  :key="list.songid"
                  @click="playItem(index)"
                  :class="{on: index === now}">
                  <td><span class="clip" :title="list.songname">{{ index + 1 }}. {{ list.songname }}</span></td>
                  <td class="control">
                    <span class="clip">
                      <span class="living"></span>
                      <i
                        class="iconfont"
                        :class="{'icon-pauseMusic': index === now && playing === true,
                         'icon-playMusic': index !== now || (index === now && playing === false)}">
                      </i>
                    </span>
                  </td>
                  <td><span class="clip">{{ list.singername }}</span></td>
                  <td v-show="!onLine"><span class="clip">{{ ~~(list.seconds / 60) + ':' + list.seconds % 60 }}</span></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="right" ref="showRight">
            <div class="l-box">
              <div class="show-img">
                  <img :src="bg" :alt="songName" class="show-img"
                    :class="{'animate-img': playing}"
                  >
              </div>
              <div style="display: none" v-html="lyr" ref="lyr"></div>
              <div class="l-lyr" ref="lyrList" :style="{'transform': 'translate3d(0, '+ 35 * 0 + 'px, 0)'}">
                <p
                  v-for="(s, index) in lyrList"
                  :data-time="(s.min * 60 + s.sec + s.ms / 100)">
                  {{ s.txt }}
                </p>
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
                <p>{{ reslutTime }}<p>
              </div>
            </div>
            <div class="progress"
              ref="progress"
              @click="jumpGo"
              @mousemove="jumpTo"
              @mouseout="jumpLeave">
              <div class="line"></div>
              <div class="lineTo" :style="{'width': jump * 100 + '%'}"></div>
              <div class="lineIn" :style="{'width': (nowTime / allTime) * 100 + '%'}">
                <i class="iconfont icon-dot"></i>
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
      @seeked="seeked"
      @ended="goNext"></audio>
  </div>
</template>

<script>
import NavBar from '../components/Nav'
import Loading from '../components/Loading'
export default {
  data () {
    return {
      url1: 'https://route.showapi.com/213-4?showapi_appid=26601&showapi_timestamp=20161104133125&topid=26&showapi_sign=011cc1d2d0461a7dac17c2cb73fe7c3b',
      url2: 'https://route.showapi.com/213-2?showapi_appid=26601&showapi_timestamp=20161104173307&showapi_sign=39d50b416de374b3b781a65a60c5acad&musicid=',
      url3: 'https://route.showapi.com/213-1?page=1&showapi_appid=26601&showapi_timestamp=20161110120146&showapi_sign=985554800aba921b2633ab6a2f344b61&keyword=',
      musicId: '',
      lists: [],
      newLists: [],
      now: '',
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
      muted: false,
      volume: 0,
      search: '',
      onLine: false
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
    }
  },
  watch: {
    search () {
      if (!this.onLine) {
        this.newLists = this.lists.filter((item) => {
          return (item.songname.indexOf(this.search) !== -1 || item.singername.indexOf(this.search) !== -1)
        })
      }
    }
  },
  methods: {
    all () {
      this.$http.get(this.url1).then((response) => {
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
      this.musicId = this.newLists[this.now].songid
      this.$http.get(this.url2 + this.musicId).then((response) => {
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
        this.$http.get(this.url3 + this.search).then((response) => {
          // 处理数据
          this.lists = response.body.showapi_res_body.pagebean.contentlist
          this.newLists = this.lists
          if (this.newLists.length > 0) {
            this.nowTime = 0
            this.playItem(0)
          }
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
    },
    // 改变后播放
    playNext () {
      if (this.now !== this.preList[this.preList.length - 1]) {
        this.preList.push(this.now)
      }
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
        this.clearTime()
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
      this.timeInter = setInterval(() => {
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
                    val.className = 'on'
                    this.$refs.showRight.scrollTop = i * 35
                    // this.$refs.lyrList.style.transform = 'translate3d(0, -' + i * 35 + 'px, 0)'
                  } else {
                    val.className = ''
                  }
                })
              }
            }
          })
        }
      }, 100)
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
      this.clearTime()
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
      this.volume = volume
      this.$refs.music.volume = volume
    },
    // 搜索
    changeSelect () {
      this.onLine = this.$refs.select.value === '在线'
    }
  },
  components: {
    NavBar,
    Loading
  },
  mounted () {
    this.all()
  },
  destroyed () {
    this.clearTime()
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
    color: rgba(225,225,225,.8);

    .bg {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-repeat: no-repeat;
      background-size: cover;
      background-position: 50%;
      -webkit-filter: blur(20px);
      filter: blur(20px);
      opacity: .6;
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
        height: 425px;
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

        table {
          display: block;
          width: 100%;
          height: 100%;

          td {
            height: 40px;
            line-height: 40px;
            text-align: left;
            cursor: pointer;

            &:first-child {
              max-width: 300px;
            }
          }

          td.control {
            width: 130px;
            padding-top: 0;
            opacity: 0;

            i {
              font-size: 18px;
              line-height: 30px;
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

          tr.on td {
            color: white;
          }

          tr.on td.control {
            opacity: 1;
          }

          tr.on .living {
            display: inline-block;
          }

          tr:hover {
            td.control {
              opacity: 1
            }
          }
        }
      }

      .right {
        float: left;
        width: 40%;
        height: 425px;
        overflow-x: hidden;
        overflow-y: scroll;
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
          .show-img {
            position: relative;
            display: block;
            margin: auto;
            width: 240px;
            height: 240px;
            border-radius: 100%;
            background-size: cover;
            background-image: url(http://music.163.com/style/mobile/img/share/disc-ip6.png);

            img {
              display: inline-block;
              margin-top: 47px;
              margin-left: 47px;
              width: 61%;
              height: 61%;
              transition: all 1s ease-out;
            }

            img.animate-img {
              animation: showImg 35s linear infinite
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
          .l-lyr {
            transition: all 1s ease;
            p {
              text-align: center;
              line-height: 35px;
              transition: all 0.5s ease-out;

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
            background: rgba(255,255,255,.5);
            transition: all 0.1s linear;
            z-index: 2;
          }

          .lineIn {
            position: absolute;
            top: 10px;
            left: 0px;
            width: 0%;
            height: 2px;
            background: rgba(255,255,255,.7);
            transition: all 0.1s linear;
            z-index: 10;

            i {
              position: absolute;
              font-size: 28px;
              top: -20px;
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
          width: 120px;

          i {
            cursor: pointer;
            font-size: 25px;
          }

          .volume-line {
            position: absolute;
            width: 85px;
            top: 20px;
            left: 35px;
            height: 4px;
            background: rgba(255,255,255,.2);
            z-index: 1;
            cursor: pointer;
          }

          .volume-to {
            position: absolute;
            top: 20px;
            left: 35px;
            height: 4px;
            background: rgba(255,255,255, 0.8);
            z-index: 2;
            cursor: pointer;

            i {
              position: absolute;
              top: -16px;
              right: -8px;
              z-index: 3;
            }
          }
        }
      }

      .serach-music {
        input {
          width: 150px;;
          line-height: 30px;
          border: 0;
          font-size: 18px;
          outline: inherit;
          z-index: 1;
          padding-left: 5px;
        }

        select {
          width: 100px;;
          height: 31px;
          border: 0;
          font-size: 18px;
          outline: inherit;
          z-index: 1;
          padding-left: 5px;
        }

        button {
          width: 50px;
          height: 30px;
          font-size: 16px;
          border: 0;
          outline: none;
          cursor: pointer;
          background-color: white;
        }
      }
    }
  }

  @media screen and (max-width: 1400px) {
    .music .show-music {
      margin-left: 2%;
      padding: 4%;

      .left {
        table {
          td {
            width: 70px;
            font-size: 14px;

            &:first-child {
              max-width: 250px;
            }
          }
        }
      }

      .right {
        width: 40%;
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
      }

      .right {
        width: 50%;
      }
    }
  }

  @media screen and (max-width: 500px) {
    .music .show-music {
      width: 100%;
      margin-left: 0;
      padding-left: 1%;
      .left {
        width: 100%;
        height: 300px;

        table {
          td {
              line-height: 30px;
              height: 30px;
          }

          td:first-child {
            max-width: 200px;
          }

          td.control {
            i {
              font-size: 16px;
              margin-right: 5px;
            }
          }
        }
      }

      .right {
        width: 100%;
        height: 40px;
        text-align: left;

        .l-box {
          margin-left: -20%;
          margin-top: -230px;
        }
      }

      .controls {
        width: 80%;
        margin-left: 10%;
        bottom: 10px;

        .control-label {
          width: 80%;
          height: 60px;
          text-align: center;
        }

        .show-info {
          margin-top: -110px;
          width: 80%;
        }

        .progress {
          width: 80%;
          margin-top: -10px;
          margin-left: 0;
        }

        .volume {
          float: left;
        }
      }
    }
  }
</style>
