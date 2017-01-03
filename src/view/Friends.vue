<template>
  <div class="wraper">
    <NavBar></NavBar>
    <div class="content friends">
      <p class="title">志同道合的朋友们:</p>
      <div class="f-list">
        <div
          class="f-item"
          v-for="item in lists"
          target="_blank">
          <a :href="item.url" class="avatar" :style="{'background-image': 'url('+ item.avatar + ')'}"></a>
          <span class="line"></span>
          <div class="des"
          :style="{
            'transform': 'rotate3d(0, 0,' + -Math.random() * 10 + ', 1deg) translateZ(0)',
            }">
            <p class="name">{{ item.name }}</p>
            <p>{{ item.des }}</p>
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
          avatar: 'https://avatars3.githubusercontent.com/u/7876498'
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
  min-height: 1000px;
  background-image: url('http://ofyaji162.bkt.clouddn.com/bg1.webp');
  background-position: 50%;
  background-repeat: no-repeat;
  background-size: cover;
  overflow-x: hidden;

  .title {
    margin: 50px;
    font-size: 20px;
    color: rgba(255, 255, 255, 0.9);
  }

  .f-list {
    position: relative;
    height: auto;
    margin: auto;
  }

  .f-item {
    position: relative;
    width: 250px;
    height: 300px;
    border-radius: 50%;
    display: inline-block;

    .avatar {
      display: block;
      margin: auto;
      width: 120px;
      height: 120px;
      border-radius: 50%;
      background-repeat: no-repeat;
      background-size: cover;
    }

    .line {
      position: absolute;
      top: 119px;
      left: 50%;
      margin-left: -20px;
      width: 20px;
      height: 80px;
      border-radius: 30%;
      border-right: 2px solid rgba(128, 64, 0, 0.9);
      z-index: 1;
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
      backface-visibility: hidden;

      p {
        backface-visibility: hidden;
        transform: rotate3d(0, 0, 1, 1deg) translateZ(0);
      }

      .name {
        font-size: 16px;
        text-align: center;
        line-height: 30px;
      }
    }
  }
}

@media screen and (max-width: 600px) {
  .friends .f-item {
    margin: auto;
    display: block;
  }
}
</style>
