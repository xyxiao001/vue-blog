<template>
  <div class="wraper">
    <NavBar></NavBar>
    <div class="content friends">
      <p class="title">志同道合的朋友们:</p>
      <div class="f-list">
        <div
          class="f-item"
          v-for="(item, $index) in lists">
          <a :href="item.url"   target="_blank" class="avatar" :style="{'background-image': 'url('+ item.avatar + ')'}"></a>
          <span
            class="line line1"
            @mouseover="cut($index, $event)"
            @touchstart="cut($index, $event)"
            :style="{
              'top': 115 + item.offset + 'px',
              'opacity': -(item.cut / 100) + 0.8,
              'transform': 'translate3d(0,'+ item.cut +'px, 0)',
              'height': 90 - item.offset + 'px'}"></span>
          <span
            class="line line2"
            :style="{'top': 115 + 'px', 'height': item.offset + 'px'}">
          </span>
          <div class="des"
            :class="{'hide': item.cut + 1 === 106}"
            :style="{
              'transform': 'translate3d(0,'+ item.cut +'px, 0)',
              'z-index': item.cut + 1,
              'opacity': -(item.cut / 100) + 1
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
          cut: 0,
          offset: 0,
          name: '好宅',
          url: 'http://funnycoder.lofter.com',
          des: '这里是一只宅，励志成为一名有趣的Coder~',
          avatar: 'http://ofyaji162.bkt.clouddn.com/zhai.jpg'
        },
        {
          cut: 0,
          offset: 0,
          name: '清真',
          url: 'http://zhaoyuxiang.cn',
          des: '霸气的天道寺, 不敢见人，怕生的帅哥~',
          avatar: 'https://ooo.0o0.ooo/2016/12/20/5858bbde6e8ac.jpg'
        },
        {
          cut: 0,
          offset: 0,
          name: '鱼大佬',
          url: 'https://blog.wanan.me',
          des: '听说是个死胖子~ 可是他有女朋友。',
          avatar: 'https://avatars3.githubusercontent.com/u/7876498'
        },
        {
          cut: 0,
          offset: 0,
          name: '兔哥',
          url: 'http://noder.club',
          des: '一个很会玩妖姬的node大佬',
          avatar: 'https://ws3.sinaimg.cn/large/7d051389gw1fbdeilrksgj202s02st8i.jpg'
        },
        {
          cut: 0,
          offset: 0,
          name: '夜喵',
          url: 'https://nightcat.win',
          des: '据说是铲屎喵的女朋友，技术宅，车队的头号种子选手。',
          avatar: 'http://ofyaji162.bkt.clouddn.com/nightcat.jpg'
        },
        {
          cut: 0,
          offset: 0,
          name: '铲屎喵',
          url: 'https://nightcat.win',
          des: '据说是夜喵喵的男朋友, 叶苗苗的铲屎官, 拥有逆天长腿。',
          avatar: 'http://ofyaji162.bkt.clouddn.com/can.jpg'
        },
        {
          cut: 0,
          offset: 0,
          name: '树大佬',
          url: 'http://geeku.net/',
          des: '对于他来说， 就没有不知道东西，江湖人送称号 - 百科全树',
          avatar: 'http://geeku.net/wp-content/themes/Lollipop/img/avatar.png'
        },
        {
          cut: 0,
          offset: 0,
          name: '爆栈大佬',
          url: 'https://is.daryl.moe',
          des: '传说中的爆栈， 技术栈深不可测。',
          avatar: 'https://o90cnn3g2.qnssl.com/0C3ABE8D05322EAC3120DDB11F9D1F72.png'
        },
        {
          cut: 0,
          offset: 0,
          name: '银马座_废喵',
          url: 'https://yinmazuo.github.io',
          des: '不乱于心，不困于情，不畏将来，不念过往。',
          avatar: 'http://ofyaji162.bkt.clouddn.com/yin.jpg'
        },
        {
          cut: 0,
          offset: 0,
          name: '油俊',
          url: 'http://www.chjsun.top',
          des: '据说也是一个胖子，但是他没女朋友',
          avatar: 'http://www.chjsun.top/img/logo/logo.png'
        },
        {
          cut: 0,
          offset: 0,
          name: '狐狸',
          url: 'http://rbblog.space/',
          des: '审美为100的美男子',
          avatar: 'https://avatars2.githubusercontent.com/u/19708789?v=3&s=460'
        }
      ]
    }
  },
  computed: {
  },
  components: {
    NavBar
  },
  methods: {
    cut (index, event) {
      // 记录从哪里剪断
      if (this.lists[index].cut === 0) {
        this.lists[index].offset = event.offsetY
        clearInterval(set)
        var t = 0
        var set = setInterval(() => {
          if (this.lists[index].cut < 100) {
            t += 1
            this.lists[index].cut += t
          } else {
            clearInterval(set)
          }
        }, 120)
      }
    }
  }
}
</script>

<style lang="scss">
.hide {
  display: none!important;
}
.friends {
  min-height: 1000px;
  background-image: url('http://ofyaji162.bkt.clouddn.com/bg1.jpg');
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
    width: 20%;
    height: 300px;
    border-radius: 50%;
    display: inline-block;

    .avatar {
      position: absolute;
      top: 0;
      left: 50%;
      margin-left: -60px;
      display: block;
      width: 120px;
      height: 120px;
      border-radius: 50%;
      background-repeat: no-repeat;
      background-size: cover;
      background-color: rgba(255, 255, 255, 0.2);
      z-index: 9;
    }

    .line {
      position: absolute;
      top: 115px;
      left: 50%;
      margin-left: -5px;
      width: 5px;
      height: 90px;
      border-radius: 20%;
      border-right: 2px solid rgba(128, 64, 0, 0.9);
      z-index: 1;
      cursor: pointer;
    }

    .line1 {
      transition: transform 0.2s linear;
    }

    .des {
      position: absolute;
      top: 198px;
      left: 50%;
      margin-left: -90px;
      width: 180px;
      background-color: white;
      color: black;
      border-radius: 10px;
      padding: 5px;
      font-size: 14px;
      backface-visibility: hidden;
      z-index: 2;
      transition: all 0.2s linear;

      .name {
        font-size: 16px;
        text-align: center;
        line-height: 30px;
      }
    }
  }
}

@media screen and (max-width: 1400px) {
  .friends .f-item {
    width: 25%;
  }
}

@media screen and (max-width: 1100px) {
  .friends .f-item {
    width: 33%;
  }
}

@media screen and (max-width: 670px) {
  .friends .f-item {
    width: 50%;
    .des {
      width: 130px;
      margin-left: -70px;
    }
  }
}
</style>
