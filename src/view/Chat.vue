<template>
  <div class="wraper">
    <NavBar></NavBar>
    <div class="content">
      <div class="chat-box">
        <div class="box-user">
          <div class="user-item" v-for="msg in msgs" :class="{'activity': msg.id === now}" @click="changeUser(msg.id)">
            <div class="user-img">
              <span class="avatar" :style="{'background-image': 'url('+ msg.avatar + ')'}"></span>
            </div>
            <div class="user-info">
              <p class="user-name">{{ msg.name }}</p>
              <p class="user-title" :title="msg.title">{{ msg.title }}</p>
            </div>
          </div>
        </div>
        <div class="box-show">
          <div class="chat-show" ref="chatShow">
            <div class="chat-item" v-for="item in nowLists">
              <div class="self-msg" v-if="item.id === 'user'">
                <div class="item-avatar" :style="{'background-image': 'url('+ item.avatar + ')'}"></div>
                <div class="item-msg">{{ item.msg }}</div>
              </div>
              <div class="love-msg" v-else>
                <div class="item-avatar" :style="{'background-image': 'url('+ item.avatar + ')'}"></div>
                <div class="item-msg">
                  <p>{{ item.msg }}</p>
                  <a v-show="item.url" :href="item.url" target="_blank">
                    <span>{{ item.url }}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div class="chat-push">
            <textarea v-model.trim="nowMsg" @keyup.enter="send"></textarea>
            <button class="send btn" @click="send">发送</button>
            <button class="send btn clear" @click="clear">清除记录</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from '../components/Nav'
export default {
  data () {
    return {
      now: 0,
      nowMsg: '',
      url: 'http://www.tuling123.com/openapi/api',
      key0: '43f9c829838b4577b9645d3448e10496',
      key1: '4dcd4c3776104a52be5e8002ee40df45',
      userInfo: {
        name: '访客',
        avatar: 'http://ofyaji162.bkt.clouddn.com/can.jpg'
      },
      msgs: [
        {
          id: 0,
          name: '夜喵喵',
          title: '我是一号机器人,代号喵',
          avatar: 'http://ofyaji162.bkt.clouddn.com/nightcat.jpg',
          list: [
            {
              id: 'robot',
              msg: '我是大神， 夜喵喵',
              avatar: 'http://ofyaji162.bkt.clouddn.com/nightcat.jpg'
            }
          ]
        },
        {
          id: 1,
          name: '清真',
          title: '其实，我是一个人',
          avatar: 'https://ooo.0o0.ooo/2016/12/20/5858bbde6e8ac.jpg',
          list: [
            {
              id: 'robot',
              msg: '全宇宙最帅的真真, 为你服务',
              avatar: 'https://ooo.0o0.ooo/2016/12/20/5858bbde6e8ac.jpg'
            }
          ]
        }
      ]
    }
  },
  computed: {
    nowLists () {
      return this.msgs[this.now].list
    }
  },
  watch: {
    msgs () {
      this.updateScroll()
    },
    now () {
      this.updateScroll()
    }
  },
  methods: {
    changeUser (id) {
      this.now = id
      this.nowMsg = ''
    },
    // 发送消息
    send () {
      if (this.nowMsg.length > 0) {
        this.msgs[this.now].list.push(
          {
            id: 'user',
            avatar: this.userInfo.avatar,
            msg: this.nowMsg
          }
        )
        // 保存到本地
        this.updateScroll()
        this.save()
        this.sendMsg()
        this.nowMsg = ''
      }
    },
    // 滚动到最下面
    updateScroll () {
      this.$nextTick(() => {
        this.$refs.chatShow.scrollTop = 999999
      })
    },
    // 发送消息请求
    sendMsg () {
      let that = this
      let key = that.now === 0 ? that.key0 : that.key1
      this.$http.get(this.url + '?key=' + key + '&&info=' + this.nowMsg)
      .then(function (response) {
        let msg = response.body
        if (msg.code === 100000) {
          that.msgs[that.now].list.push(
            {
              id: this.msgs[this.now].id,
              avatar: this.msgs[this.now].avatar,
              msg: msg.text
            }
          )
        } else if (msg.code === 200000) {
          that.msgs[that.now].list.push(
            {
              id: this.msgs[this.now].id,
              avatar: this.msgs[this.now].avatar,
              msg: msg.text,
              url: msg.url
            }
          )
        }
        this.save()
        this.updateScroll()
      }, (response) => {
        console.error('请求失败！')
      })
    },
    save () {
      window.localStorage.setItem('chatMsg', JSON.stringify(this.msgs))
    },
    // 清除记录
    clear () {
      this.msgs[this.now].list = []
      this.save()
    }
  },
  components: {
    NavBar
  },
  mounted () {
    var msg = window.localStorage.getItem('chatMsg')
    if (msg) {
      this.msgs = JSON.parse(msg)
    }
  }
}
</script>

<style lang="scss" scoped>
  * {
    font-family: Tahoma,Helvetica,Arial,'宋体',sans-serif;
  }

  .content {
     background-image: url("http://ojp9lt0ng.bkt.clouddn.com/bg11.jpg");
     background-size: cover;
     background-repeat: no-repeat;
     min-height: 100vh;
  }

  .chat-box {
    display: flex;
    margin: 5vh auto;
    width: 98%;
    max-width: 1000px;
    height: 600px;
    max-height: 90vh;
    border: 1px solid black;
    border-radius: 5px;
    box-shadow: 10px 20px 30px rgba(0, 0, 0, 0.3);
    background: rgba(253, 253, 253, 1);


    .box-user {
      padding: 5px;
      padding-right: 0px;
      width: 250px;
      border-right: 1px solid rgba(0, 0, 0, 0.2);
      overflow-y: auto;
      overflow-x: hidden;
    }

    .box-show {
      width: calc(100% - 250px);

      .chat-show {
        height: calc(100% - 150px);
        overflow-y: auto;

        .chat-item {
          clear: both;
          width: 100%;
          min-height: 50px;
          margin: 15px 0px;

          .love-msg {
            display: flex;
            width: 100%;
            .item-avatar {
              margin: 10px;
              width: 30px;
              height: 30px;
              background-size: cover;
              border-radius: 100%;
            }
            .item-msg {
              max-width: 300px;
              font-size: 14px;
              line-height: 25px;
              background-color: #daf4fd;
              border-radius: 5px;
              margin-top: 20px;
              padding: 10px;

              a {
                display: inline-block;
                max-width: 100%;
                overflow-x: hidden;
              }
            }
          }

          .self-msg {
            width: 100%;
            .item-avatar {
              float: right;
              margin: 10px;
              width: 30px;
              height: 30px;
              background-size: cover;
              border-radius: 100%;
            }
            .item-msg {
              float: right;
              max-width: 300px;
              font-size: 14px;
              background-color: #f3f3f3;
              border-radius: 5px;
              margin-top: 20px;
              padding: 10px;
            }
          }
        }
      }

      .chat-push {
        position: relative;
        height: 150px;
        border-top: 1px solid #c1c1b1;
        overflow: hidden;
        box-sizing: border-box;

        textarea {
          width: 100%;
          height: 100px;
          // background-color: #e5e5e3;
          font-size: 15px;
          border: 0;
          padding: 5px;
          outline: none;
        }

        .send {
          position: absolute;
          bottom: 5px;
          right: 10px;
          font-size: 12px;
          padding: 0;
          width: 50px;
          line-height: 25px;
        }

        .clear {
          width: 80px;
          right: 70px;
        }
      }
    }

    .user-item {
      display: flex;
      width: 100%;
      height: 90px;
      cursor: pointer;

      &.activity {
        background-color: rgba(240, 241, 245, 1);
      }

      .user-img {
        padding: 10px 15px;
        width: 60px;

        span {
          display: inline-block;
          width: 60px;
          height: 60px;
          border-radius: 100%;
          background-size: cover;
        }
      }

      .user-info {
        width: 140px;
        padding-top: 10px;

        p {
          width: 100%;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          line-height: 32px;
        }

        p.user-name {
          font-size: 16px;
          font-weight: bold;
          letter-spacing: 1px;
        }

        p.user-title {
          font-size: 14px;
          color: gray;
        }
      }
    }
  }

  @media screen and (max-width: 600px) {
    .content {
      min-height: calc(100vh - 50px);
    }

    .chat-box {
      position: fixed;
      margin: 5vh 0 0 0.5%;
      height: 80vh;
      .box-user {
        display: none;
      }

      .box-show {
        width: 100%;
        height: 100%;

        .chat-show {
          height: calc(100% - 100px);

          .chat-item .self-msg .item-msg {
            max-width: 250px;
          }

          .chat-item .love-msg .item-msg {
            max-width: 250px;
          }
        }

        .chat-push {
          height: 100px;

          textarea {
            height: 60px;
          }
        }
      }
    }
  }
</style>
