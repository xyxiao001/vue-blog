<template>
  <div class="wraper">
    <NavBar></NavBar>
    <div class="content">
      <div class="chat-box">
        <div class="box-user">
          <div class="user-item" v-for="msg in msgs" :class="{'activity': msg.id === now}">
            <div class="user-img">
              <img :src="msg.avatar" alt="">
            </div>
            <div class="user-info">
              <p class="user-name">{{ msg.name }}</p>
              <p class="user-title" :title="msg.title">{{ msg.title }}</p>
            </div>
          </div>
        </div>
        <div class="box-show">
          聊天界面
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
      now: 1,
      msgs: [
        {
          id: 1,
          name: '纯洁创',
          title: '我是一号机器人,代号喵',
          avatar: 'http://ofyaji162.bkt.clouddn.com/nightcat.jpg',
          list: [
            {
              id: 'robot',
              msg: '你好啊, 我是纯洁创。'
            }
          ]
        },
        {
          id: 2,
          name: '清真',
          title: '其实，我是一个人',
          avatar: 'https://ooo.0o0.ooo/2016/12/20/5858bbde6e8ac.jpg',
          list: [
            {
              id: 'robot',
              msg: '你好啊， 我是机器人。'
            }
          ]
        }
      ]
    }
  },
  computed: {
  },
  components: {
    NavBar
  },
  mounted () {
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
    margin: 5% auto;
    width: 98%;
    max-width: 1000px;
    height: 600px;
    border: 1px solid black;
    border-radius: 5px;
    box-shadow: 10px 20px 30px rgba(0, 0, 0, 0.3);
    background: rgba(253, 253, 253, 1);


    .box-user {
      padding: 5px;
      padding-right: 0px;
      width: 250px;
      border-right: 1px solid rgba(0, 0, 0, 0.2);
    }

    .box-show {
      padding: 5px;
      width: calc(100% - 250px)
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

        img {
          width: 60px;
          height: 60px;
          border-radius: 100%;
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
</style>
