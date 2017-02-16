<template>
  <div class="v-group" :class="{'v-hide': !open}">
    <div class="v-bg"></div>
    <div class="v-box">
      <div class="v-header">
        <div class="v-ready">请确定你年满18岁, 再继续滑动</div>
        <div class="v-closed"></div>
      </div>
      <div class="v-body">
        <div class="v-widget">
          <div class="w-top"></div>
          <div class="w-box">
            <div class="w-show">
              <div class="w-start" ref="wStart"
                :style="{
                  'transform': 'translate3d('+ end +'px, 0, 0)',
                  'top': y + 'px',
                  'background-position': -success + 'px ' + -y + 'px'
                  }"></div>
              <div class="w-end" :style="{'left': success + 'px', 'top': y + 'px'}"></div>
            </div>
          </div>
          <div class="w-bottom"></div>
        </div>
        <div class="v-slide">
          <div
            class="s-control"
            :class="{'v-go': running}"
            :style="{'transform': 'translate3d('+ end +'px, 0, 0)'}"
            @mousedown="start($event)"
            @touchstart="start($event)"
            ref="control">
          </div>
          <div class="s-text" :class="{'fade-out': running}">按住滑块完成拼图</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      open: true,
      running: false,
      x: 0,
      y: ~~(Math.random() * 50 + 10),
      success: ~~(Math.random() * 100) + 100,
      end: 0,
      go: false
    }
  },
  methods: {
    start (event) {
      this.running = true
      window.addEventListener('mousemove', this.move)
      window.addEventListener('touchmove', this.move)
      window.addEventListener('mouseup', this.leave)
      window.addEventListener('touchend', this.leave)
      this.x = event.clientX ? event.clientX : event.touches[0].clientX
    },
    move (event) {
      event.preventDefault()
      var nowX = event.clientX ? event.clientX : event.touches[0].clientX
      this.$refs.control.style.transitionDuration = '0s'
      this.$refs.wStart.style.transitionDuration = '0s'
      var end = parseInt(nowX - this.x)
      if (end > 0 && end < 220) {
        this.end = end
      }
    },
    leave () {
      var other = this.success - this.end
      if (other >= -2 && other <= 2) {
        this.go = true
        this.open = false
        // 执行父组件的方法
        this.$emit('successEvent', 'success')
      } else {
        this.$refs.control.style.transitionDuration = '1s'
        this.$refs.wStart.style.transitionDuration = '1s'
        this.x = 0
        this.end = 0
      }
      this.running = false
      window.removeEventListener('mousemove', this.move)
      window.removeEventListener('touchmove', this.move)
      window.removeEventListener('mouseup', this.leave)
      window.removeEventListener('touchend', this.leave)
    }
  },
  mounted () {
  }
}
</script>

<style lang="scss">
  .v-hide {
    display: none;
    opacity: 0;
  }

  .v-show {
    display: block;
    animation: 0.2s show-modal ease-out 1;
  }

  @keyframes show-modal {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  .a-hide {
    animation: 0.2s hide-modal ease-out 1;
  }

  @keyframes hide-modal {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }

  .v-bg {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: black;
    opacity: 0.6;
  }

  .v-box {
    height: 286px;
    width: 354px;
    background-position: 0 -853px;
    position: fixed;
    margin-left: -53px;
    margin-top: -143px;
    top: 50%;
    left: 50%;
    z-index: 999;
    background-image: url('http://ofyaji162.bkt.clouddn.com/ver.png');
  }

  .v-header {
    position: relative;
    height: 42px;
    line-height: 42px;
    padding-left: 20px;
    font-size: 14px;
    text-align: left;;
  }

  .v-body {
    margin: 28px auto;
    width: 300px;
    height: 188px;
    background-color: white;
  }

  .v-closed {
    height: 14px;
    width: 14px;
    background-position: 0 -1139px;
    cursor: pointer;
    position: absolute;
    right: 20px;
    top: 14px;
    background-image: url('http://ofyaji162.bkt.clouddn.com/ver.png');
  }

  .v-closed:hover {
    transition: all 1s ease-out;
    transform: rotateZ(360deg);
  }

  .v-ready {
    font-size: 15px;
    color: #677D8B;
  }

  .w-top {
    height: 14px;
    width: 290px;
    background-position: 0 -1341px;
    position: relative;
    background-image: url('http://ofyaji162.bkt.clouddn.com/ver.png');
  }

  .w-box {
    width: 260px;
    height: 116px;
    padding: 0 15px 2px 13px;
    position: relative;
    background-color: #f2ece1;
    border-left: 1px solid #e4ddd1;
    border-right: 1px solid #e4ddd1;
  }

  .w-bottom {
    height: 28px;
    width: 290px;
    background-position: 0 -56px;
    line-height: 14px !important;
    position: relative;
    text-align: left;
    overflow: visible;
    background-image: url('http://ofyaji162.bkt.clouddn.com/ver.png');
  }

  .w-show {
    position: relative;
    width: 100%;
    height: 100%;
    background-image: url('http://ofyaji162.bkt.clouddn.com/ver1.jpg');
  }

  .v-slide {
    height: 28px;
    width: 261px;
    background-position: 0 0;
    position: relative;
    left: 15px;
    top: 5px;
    overflow: visible;
    background-image: url('http://ofyaji162.bkt.clouddn.com/ver.png');
  }

  .s-control {
    height: 44px;
    width: 44px;
    background-position: 0 -84px;
    cursor: pointer;
    display: block;
    position: absolute;
    left: 0px;
    top: -9px;
    -moz-box-shadow: none;
    box-shadow: none;
    border-radius: 13px;
    z-index: 399;
    background-image: url('http://ofyaji162.bkt.clouddn.com/ver.png');
    transition: transform 1s ease-out;
  }

  .v-go {
    background-position: 0 -216px;
  }

  .s-text {
    cursor: default;
    position: absolute;
    left: 20px;
    font-size: 12px;
    color: #486c80;
    opacity: 1;
    filter: alpha(opacity=100);
    height: 28px;
    line-height: 28px;
    text-align: center;
    width: 220px;
    transition: opacity 0.3s ease-out;
  }

  .fade-out {
    opacity: 0;
  }

  .w-start {
    position: absolute;
    width: 40px;
    height: 35px;
    top: 20px;
    left: 0px;
    opacity: 1;
    border-radius: 10px;
    box-shadow: 0px 5px 4px black;
    z-index: 1001;
    transition: transform 1s ease-out;
    background-image: url('http://ofyaji162.bkt.clouddn.com/ver1.jpg');
    background-position: 0px 0px;
  }

  .w-end {
    position: absolute;
    width: 40px;
    height: 35px;
    left: 180px;
    top: 20px;
    background-color: white;
    opacity: 0.9;
    border-radius: 10px;
    box-shadow: 0px 5px 4px black;
    z-index: 1000;
  }

  @media screen and (max-width: '1000px') {
    .v-box {
      margin-left: -177px;
    }
  }
</style>
