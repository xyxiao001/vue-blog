<template>
  <div class="wraper">
    <NavBar></NavBar>
    <div class="content friends">
      <p class="title">志同道合的朋友们:</p>
      <div class="f-list">
        <a
          class="f-item"
          v-for="item in lists"
          :href="item.url"
          target="_blank">
          <div class="avatar" :style="{'background-image': 'url('+ item.avatar + ')'}"></div>
          <span class="line"></span>
          <div class="des">
            <p class="name">{{ item.name }}</p>
            <p>{{ item.des }}</p>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from '../components/Nav'
export default {
  data () {
    return {
      lists: [
        {
          name: '好宅',
          url: 'http://funnycoder.lofter.com',
          des: '这里是一只宅，励志成为一名有趣的Coder~',
          avatar: 'http://imgsize.ph.126.net/?imgurl=http://imglf2.ph.126.net/80tgwfppFxSJbTboaJ4R2Q==/6631977061815991766.jpg_96x96x0x90.jpg'
        },
        {
          name: '清真',
          url: 'http://zhaoyuxiang.cn',
          des: '霸气的天道寺, 不敢见人，怕生的帅哥~',
          avatar: 'https://ooo.0o0.ooo/2016/12/20/5858bbde6e8ac.jpg'
        },
        {
          name: '鱼大佬',
          url: 'https://blog.wanan.me',
          des: '听说是个死胖子~ 可是他有女朋友。',
          avatar: 'http://www.gravatar.com/avatar/7151791be6ac667ad65ba0a3ba7fd99c?s=250&d=mm&r=x'
        },
        {
          name: '兔哥',
          url: 'http://noder.club',
          des: '一个很会玩妖姬的node大佬',
          avatar: 'https://ws3.sinaimg.cn/large/7d051389gw1fbdeilrksgj202s02st8i.jpg'
        },
        {
          name: '夜喵',
          url: '',
          des: '据说是铲屎喵的女朋友，技术宅，车队的头号种子选手。',
          avatar: 'http://ofyaji162.bkt.clouddn.com/nightcat.jpg'
        },
        {
          name: '铲屎喵',
          url: '',
          des: '据说是夜喵喵的男朋友, 叶苗苗的铲屎官',
          avatar: 'http://ofyaji162.bkt.clouddn.com/can.jpg'
        },
        {
          name: '银马座_废喵',
          url: 'https://yinmazuo.github.io',
          des: '不乱于心，不困于情，不畏将来，不念过往。',
          avatar: 'http://ofyaji162.bkt.clouddn.com/yin.jpg'
        }
      ]
    }
  },
  computed: {
  },
  components: {
    NavBar
  }
}
</script>

<style lang="scss">
.friends {
  position: fixed;
  width: 100%;
  height: 100%;
  padding-left: 250px;
  background-image: url('http://ofyaji162.bkt.clouddn.com/bg1.webp');
  background-position: 50%;
  background-repeat: no-repeat;
  background-size: cover;

  .title {
    margin: 50px;
    font-size: 20px;
    color: rgba(255, 255, 255, 0.9);
  }

  .f-list {
    width: 70%;
    height: auto;
    margin: auto;
  }

  .f-item {
    position: relative;
    width: 300px;
    height: 300px;
    border-radius: 50%;
    display: inline-block;

    .avatar {
      margin: auto;
      width: 120px;
      height: 120px;
      border-radius: 50%;
      background-repeat: no-repeat;
      background-size: cover;
    }

    .line {
      position: absolute;
      top: 100px;
      left: 50%;
      margin-left: -20px;
      width: 20px;
      height: 100px;
      border-radius: 30%;
      border-right: 2px solid rgba(128, 64, 0, 0.9);
      z-index: -1;
    }

    .des {
      position: absolute;
      top: 201px;
      left: 50%;
      margin-left: -90px;
      width: 180px;
      background-color: white;
      color: black;
      border-radius: 5px;
      padding: 5px;
      font-size: 14px;

      .name {
        font-size: 16px;
        text-align: center;
        line-height: 30px;
      }
    }
  }
}
</style>
