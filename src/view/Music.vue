<template>
  <div class="wraper">
    <NavBar></NavBar>
    <div class="content">
      <Loading :loading="loading"></Loading>
      <div class="music">
        <div class="bg" :style="{'background-image': 'url('+ bg +')'}"></div>
        <div class="mask"></div>
        <div class="show-music">
          <div class="left">
            <table>
              <thead>
                <tr>
                  <td>歌曲</td>
                  <td></td>
                  <td>歌手</td>
                  <td>时长</td>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(list, index) in lists"
                  @click="playItem(index)"
                  :class="{on: index === now}">
                  <td>{{ index + 1 }}. {{ list.songname }}</td>
                  <td class="control">
                    <span class="living"></span>
                    <i
                      class="iconfont"
                      :class="{'icon-pauseMusic': index === now && playing === true,
                       'icon-playMusic': index !== now || (index === now && playing === false)}">
                    </i>
                  </td>
                  <td>{{ list.singername }}</td>
                  <td>{{ ~~(list.seconds / 60) + ':' + list.seconds % 60 }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="right">
            <div class="l-box" v-html="lyr"></div>
          </div>
          <div class="controls">
            <div class="control-label">
              <i class="iconfont icon-preMusic-copy" @click="goPre"></i>
              <i
                @click="playItem(now)"
                class="iconfont playing"
                :class="{'icon-pauseMusic': playing === true,
                 'icon-playMusic': playing === false}">
              </i>
              <i class="iconfont icon-nextMusic" @click="goNext"></i>
            </div>
            <div class="show-info">
              <div class="i-l">
                <a class="title">{{ songName }}</a>
                <span> - </span>
                <a class="singer-name">{{ singer }}</a>
              </div>
              <div class="i-r">{{ reslutTime }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <audio :src="musicSrc" ref="music" @ended="goNext"></audio>
  </div>
</template>

<script>
import NavBar from '../components/Nav'
import Loading from '../components/Loading'
export default {
  data () {
    return {
      url: 'https://route.showapi.com/213-4?showapi_appid=26601&showapi_timestamp=20161104133125&topid=5&showapi_sign=011cc1d2d0461a7dac17c2cb73fe7c3b',
      url2: 'https://route.showapi.com/213-2?showapi_appid=26601&showapi_timestamp=20161104173307&showapi_sign=39d50b416de374b3b781a65a60c5acad&musicid=',
      musicId: '',
      lists: [],
      now: '',
      playing: false,
      musicSrc: '',
      lyr: '',
      preList: [],
      loading: true,
      bg: '',
      songName: '',
      singer: '',
      allTime: 0,
      nowTime: 0,
      timeInter: ''
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
    }
  },
  methods: {
    all () {
      this.$http.get(this.url).then((response) => {
        // 移出loading
        this.loading = false
        // 处理数据
        this.lists = response.body.showapi_res_body.pagebean.songlist
        // 进来随机播放
        this.playItem(~~(Math.random() * this.lists.length))
      }, (response) => {
        console.error('请求失败！')
      })
    },
    detail () {
      this.musicId = this.lists[this.now].songid
      this.$http.get(this.url2 + this.musicId).then((response) => {
        this.lyr = response.body.showapi_res_body.lyric
      }, (response) => {
        console.error('请求失败！')
      })
    },
    playItem (index) {
      if (index === this.now && this.playing === true) {
        this.pause()
      } else if (index === this.now && this.playing === false) {
        this.play()
      } else {
        this.nowTime = 0
        this.now = index
        this.play()
      }
    },
    play () {
      if (this.now !== this.preList[this.preList.length - 1]) {
        this.preList.push(this.now)
      }
      this.musicSrc = this.lists[this.now].url
      this.bg = this.lists[this.now].albumpic_big
      this.songName = this.lists[this.now].songname
      this.singer = this.lists[this.now].singername
      // 记录歌曲时间
      this.allTime = this.lists[this.now].seconds
      this.detail()
      this.$nextTick(() => {
        this.$refs.music.play()
        this.playing = true
        // 开始计时器
        this.clearTime()
        this.startTime()
      })
    },
    startTime () {
      this.timeInter = setInterval(() => { this.nowTime += 1 }, 1000)
    },
    clearTime () {
      clearTimeout(this.timeInter)
    },
    pause () {
      this.$refs.music.pause()
      this.clearTime()
      this.playing = false
    },
    goNext () {
      this.now < this.lists.length - 1 ? this.now += 1 : this.now = 0
      this.nowTime = 0
      this.play()
    },
    goPre () {
      // 上一曲时去读历史记录 来进行回放
      // 读到历史记录的倒数第二位
      if (this.preList.length > 1) {
        this.now = this.preList[this.preList.length - 2]
        // 然后进行删除记录
        this.preList.pop()
      }
      this.nowTime = 0
      this.play()
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
      -webkit-filter: blur(30px);
      filter: blur(30px);
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
      width: 1500px;
      padding: 5%;
      color: rgba(225,225,225, 1);
      z-index: 3;

      .left {
        float: left;
        height: 415px;
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

        table {
          td {
            width: 80px;
            height: 40px;
            line-height: 40px;
            text-align: left;
            cursor: pointer;

            &:first-child {
              width: 400px;
            }
          }

          td.control {
            width: 100px;
            opacity: 0;

            i {
              font-size: 25px;
              line-height: 40px;
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
        margin-left: 50px;
        width: 400px;
        height: 415px;
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
      }

      .controls {
        position: fixed;
        width: 80%;
        margin-left: 10%;
        bottom: 0;
        color: rgba(225,225,225,.8);

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
          width: 50%;
          float: left;

          .i-l {
            float: left;
          }

          .i-r {
            float: right;
          }
        }
      }
    }
  }

  @media screen and (max-width: 1400px) {
    .music .show-music {
      position: absolute;
      width: 80%;
      padding: 1%;
      color: rgba(225,225,225, 1);
      z-index: 3;

      .left {
        table {
          td {
            width: 60px;
          }

        }
      }
    }
  }
</style>
