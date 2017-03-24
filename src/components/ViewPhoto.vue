<template>
  <div class="view-photo" :class="{'bg-show': open, 'bg-hidden': !open}" v-if="first">
    <div class="x-show">
      <div class="view-loading" v-show="loading">
        <Mloading :loading="loading" :color="'rgba(255, 255, 255, 1)'"></Mloading>
      </div>
      <img
        v-show="!loading"
        class="show-img"
        @mousedown="startMove"
        @touchstart="startMove"
        :src="now.url"
        :alt="now.text"
        :style="{
          'margin-left': -left + 'px',
          'margin-top': -top + 'px',
          'opacity': opacity
          }"
         ref="showImg">
       <div class="view-close" @click="exit">
         <i class="iconfont icon-close"></i>
       </div>
      <span class="size" :class="{'show-size': showSize}">{{(this.size * 100).toFixed(0) + '%'}}</span>
      <span class="msg" :class="{'show-msg': showMsg}">{{ message }}</span>
      <div class="view-control">
        <div class="show-control">
          <span class="v-pre" @click="pre"><i class="iconfont icon-pre"></i></span>
          <span class="v-next" @click="next"><i class="iconfont icon-next"></i></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Mloading from '../components/Mloading'

export default {
  data: function () {
    return {
      loading: true,
      now: {
        url: '',
        text: ''
      },
      nowId: -1,
      lists: [],
      opacity: 0,
      left: 0,
      top: 0,
      open: false,
      first: false,
      x: 0,
      y: 0,
      reallyWidth: 0,
      reallyHeight: 0,
      size: 1,
      showSize: false,
      setSize: '',
      message: '',
      showMsg: '',
      setMsg: ''
    }
  },
  props: {
    el: {
      type: String,
      required: true
    }
  },
  watch: {
    open () {
      if (this.open) {
        window.addEventListener('mousewheel', this.changeSize)
        document.body.style.overflow = 'hidden'
      } else {
        window.removeEventListener('mousewheel', this.changeSize)
        setTimeout(() => {
          this.now.url = ''
          this.nowId = -1
          document.body.style.overflow = 'auto'
        }, 600)
      }
    },
    loading () {
      if (!this.loading) {
        this.$nextTick(() => {
          this.showImg()
        })
      }
    },
    nowId () {
      if (this.nowId >= 0) {
        this.loading = true
        this.now.url = this.lists[this.nowId].url
        this.now.text = this.lists[this.nowId].text
      }
    },
    showSize () {
      if (this.showSize) {
        clearInterval(this.setSize)
        this.setSize = setTimeout(() => {
          this.showSize = false
        }, 1500)
      }
    },
    showMsg () {
      if (this.showMsg) {
        clearInterval(this.setMsg)
        this.setmsg = setTimeout(() => {
          this.showMsg = false
          this.message = ''
        }, 1500)
      }
    }
  },
  components: {
    Mloading
  },
  methods: {
    // 退出
    exit () {
      this.open = false
    },
    // 图片布局
    showImg () {
      var screenH = document.documentElement.clientHeight
      var screenW = document.documentElement.clientWidth
      var img = this.$refs.showImg
      img.style.height = 'auto'
      img.style.width = 'auto'
      // console.log(window.getComputedStyle(img).height)
      this.reallyHeight = window.getComputedStyle(img).height.replace('px', '')
      this.reallyWidth = window.getComputedStyle(img).width.replace('px', '')
      if ((screenH - 100) < img.height) {
        if (screenW - 20 < img.width) {
          this.size = (screenW - 20) / img.width
          this.size = parseFloat(this.size.toFixed(2))
          img.style.width = screenW - 20 + 'px'
        } else {
          this.size = (screenH - 100) / img.height
          this.size = parseFloat(this.size.toFixed(2))
          img.style.height = screenH - 100 + 'px'
        }
      } else {
        this.size = 1
      }
      this.$nextTick(() => {
        this.opacity = 1
        this.top = img.height / 5
        this.left = img.width / 2
        img.style.top = '20%'
        img.style.left = '50%'
      })
    },
    // 图片拖动
    startMove (event) {
      window.addEventListener('mousemove', this.move)
      window.addEventListener('touchmove', this.move)
      window.addEventListener('mouseup', this.leave)
      window.addEventListener('touchend', this.leave)
      var old = window.getComputedStyle(this.$refs.showImg)
      var x = old.left.replace('px', '')
      var y = old.top.replace('px', '')
      this.x = event.clientX ? event.clientX : event.touches[0].clientX
      this.x += ~(x)
      this.y = event.clientY ? event.clientY : event.touches[0].clientY
      this.y += ~(y)
    },
    // 移动函数
    move (event) {
      if (event.clientX) {
        event.preventDefault()
      }
      var nowX = event.clientX ? event.clientX : event.touches[0].clientX
      var nowY = event.clientY ? event.clientY : event.touches[0].clientY
      this.$refs.showImg.style.left = ~~(nowX) - ~~(this.x) + 'px'
      this.$refs.showImg.style.top = nowY - this.y + 'px'
    },

    leave () {
      window.removeEventListener('mousemove', this.move)
      window.removeEventListener('touchmove', this.move)
      window.removeEventListener('mouseup', this.leave)
      window.removeEventListener('touchend', this.leave)
    },

    changeSize (event) {
      this.showSize = true
      var change = event.deltaY
      var top = window.getComputedStyle(this.$refs.showImg).top.replace('px', '')
      var left = window.getComputedStyle(this.$refs.showImg).left.replace('px', '')
      if (change < 0) {
        if (this.size > 0.9 && this.size < 1) {
          var num = 1 - this.size
          this.size = 1
          this.$refs.showImg.style.top = ~~(top) - num / 2 * this.reallyHeight + 'px'
          this.$refs.showImg.style.left = ~~(left) - num / 2 * this.reallyWidth + 'px'
        } else {
          this.size += 0.06
          this.$refs.showImg.style.top = ~~(top) - 0.03 * this.reallyHeight + 'px'
          this.$refs.showImg.style.left = ~~(left) - 0.03 * this.reallyWidth + 'px'
        }
      } else {
        if (this.size > 0.12) {
          this.size -= 0.06
          this.$refs.showImg.style.top = ~~(top) + 0.03 * this.reallyHeight + 'px'
          this.$refs.showImg.style.left = ~~(left) + 0.03 * this.reallyWidth + 'px'
        }
      }
      this.$nextTick(() => {
        this.$refs.showImg.style.width = this.reallyWidth * this.size + 'px'
        this.$refs.showImg.style.height = this.reallyHeight * this.size + 'px'
      })
      event.preventDefault()
    },

    // 下一张
    next () {
      if (this.nowId < this.lists.length - 1) {
        this.nowId += 1
      } else {
        this.end()
      }
    },

    pre () {
      if (this.nowId > 0) {
        this.nowId -= 1
      } else {
        this.showMsg = true
        this.message = '已经是第一张了, 向后点击看看!'
      }
    },

    end () {
      this.showMsg = true
      this.message = '后面没有了哟!'
      console.log('end')
    }
  },
  mounted () {
    // this.open = true
    document.querySelector(this.el).addEventListener('click', (e) => {
      if (e.target.nodeName === 'IMG') {
        if (!this.first) {
          this.first = true
          this.$nextTick(() => {
            this.$refs.showImg.onload = () => {
              // 图片加载成功后布局
              this.loading = false
            }
          })
        }
        this.open = true
        this.now.url = e.target.getAttribute('data-max')
        this.now.text = e.target.alt
        this.opacity = 0
        var lists = Array.prototype.slice.apply(document.querySelectorAll(this.el + ' img'))
        this.lists = lists.map((item, index) => {
          if (this.now.url === item.getAttribute('data-max')) {
            this.nowId = index
          }
          return (
          {
            src: item.src,
            url: item.getAttribute('data-max'),
            text: item.alt
          }
          )
        })
      }
    })
  }
}
</script>

<style lang="scss" scoped>
  @import url(https://at.alicdn.com/t/font_6j0cuk14qwd0a4i.css);
  .m-loading {
    color: #fff;
  }

  .view-photo {
    position: fixed;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    z-index: 2017;
    background-color: rgba(0,0,0,.5);
    overflow: hidden;

    .x-show {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;

      .view-loading {
        position: absolute;
        top: 50%;
        left: 50%;
        margin-left: -50px;
      }

      img.show-img {
        position: absolute;
        cursor: -webkit-grab;
        user-select: none;
        top: 50%;
        left: 50%;
      }

      .view-close {
        position: absolute;
        top: -40px;
        right: -40px;
        width: 80px;
        height: 80px;
        cursor: pointer;
        border-radius: 50%;
        background-color: #000;
        background-color: rgba(0,0,0,.5);
          i {
            position: absolute;
            top: 45px;
            right: 40px;
            font-size: 30px;
            color: white;
          }
      }

      .view-control {
        position: absolute;
        width: 100%;
        height: 60px;
        bottom: 0;
        background-color: rgba(0,0,0,.5);

        .show-control {
          width: 200px;
          margin: auto;
          display: flex;

          span {
            width: 100px;
            text-align: center;
            cursor: pointer;

            i {
              color: rgba(255, 255, 255, .8);
              font-size: 25px;
              line-height: 60px;
              transition: color .3s ease-out;
            }
          }

          span:hover i {
            color: rgba(255, 255, 255, 1)
          }
        }
      }

      .size {
        position: absolute;
        top: 50%;
        left: 50%;
        margin-top: -60px;
        margin-left: -17.5px;
        width: 80px;
        font-size: 14px;
        line-height: 35px;
        border: 1px solid rgba(255, 255, 255, 0.3);
        background: rgba(0, 0, 0,  0.3);
        text-align: center;
        border-radius: 20px;
        color: white;
        visibility: hidden;
        opacity: 0;
      }

      .show-size {
        opacity: 1;
        visibility: visible;
      }

      .msg {
        position: absolute;
        top: 50%;
        left: 50%;
        margin-top: -60px;
        margin-left: -117.5px;
        width: 200px;
        font-size: 14px;
        line-height: 35px;
        border: 1px solid rgba(255, 255, 255, 0.3);
        background: rgba(0, 0, 0,  0.3);
        text-align: center;
        border-radius: 20px;
        padding: 0 15px;
        color: white;
        visibility: hidden;
        opacity: 0;
        z-index: 10;
      }

      .show-msg {
        opacity: 1;
        visibility: visible;
      }
    }
  }

  .model-open {
    zoom: 1;
    position: fixed;
    width: 100%;
    top: 0;
  }

  .bg-show {
    animation: vfadeIn 0.3s ease-out 1;

    img.show-img {
      visibility: hidden;
      animation: vscaleIn 0.3s ease-out 1;
      animation-fill-mode: forwards;
    }
  }

  .bg-hidden {
    animation: vfadeOut 0.3s ease-out 0.3s 1;
    animation-fill-mode: forwards;

    img.show-img {
      animation: vscaleOut 0.3s ease-out 1;
      animation-fill-mode: forwards;
    }
  }



  @keyframes vfadeIn {
    0% {
      opacity: 0;
    }

    100% {
      opacity: 1;
    }
  }

  @keyframes vfadeOut {
    0% {
      opacity: 1;
    }

    100% {
      visibility: hidden;
      opacity: 0;
    }
  }

  @keyframes vscaleIn {
    0% {
      visibility: visible;
      transform: scale3d(0, 0, 0);
    }

    100% {
      visibility: visible;
      transform: scale3d(1, 1, 1);
    }
  }

  @keyframes vscaleOut {
    0% {
      transform: scale3d(1, 1, 1);
    }

    100% {
      visibility: hidden;
      transform: scale3d(0, 0, 0);
    }
  }

  @media screen and (max-width: 1000px) {
    .view-photo {
      top: 50px;
      height: calc(100vh - 50px);

      .m-loading {
        margin-left: 0;
      }
    }
  }
</style>
