<template>
  <div class="wraper">
    <NavBar></NavBar>
    <div class="content">
      <Loading :loading="loading"></Loading>
      <div class="music">
        <div class="bg"></div>
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
        </div>
      </div>
    </div>
    <audio :src="musicSrc" ref="music"></audio>
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
      loading: true
    }
  },
  computed: {
  },
  methods: {
    all () {
      this.$http.get(this.url).then((response) => {
        // 移出loading
        this.loading = false
        // 处理数据
        this.lists = response.body.showapi_res_body.pagebean.songlist
        // 进来自动播放第一首
        this.playItem(0)
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
      } else {
        this.now = index
        this.musicSrc = this.lists[this.now].url
        this.play()
        this.detail()
      }
    },
    play () {
      this.$nextTick(() => {
        this.$refs.music.play()
        this.playing = true
      })
    },
    pause () {
      this.$refs.music.pause()
      this.playing = false
    }
  },
  components: {
    NavBar,
    Loading
  },
  mounted () {
    this.all()
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
      background-image: url("http://y.gtimg.cn/music/photo_new/T002R300x300M000003y8dsH2wBHlo.jpg?max_age=2592000");
      background-repeat: no-repeat;
      background-size: cover;
      background-position: 50%;
      -webkit-filter: blur(90px);
      filter: blur(90px);
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
      }
    }
  }
</style>
