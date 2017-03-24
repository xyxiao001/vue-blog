<template>
  <div class="m-loading" v-show="loading">
    <span class="row1"></span>
    <span class="row2"></span>
    <span class="row3"></span>
    <span class="row4"></span>
    <span class="row5"></span>
    <p :style="{'color': color}">加载中...</p>
  </div>
</template>

<script>
export default {
  props: {
    loading: {
      type: Boolean,
      required: true
    },
    color: {
      type: String,
      default: 'rgba(0, 0, 0, 1)'
    }
  }
}
</script>

<style lang="scss">
  .m-loading {
    position: relative;
    margin: auto;
    margin-top: 20px;
    width: 200px;
    height: 100px;

    span {
      position: absolute;
      display: inline-block;
      width: 15px;
      height: 15px;
      border-radius: 15px;
      background-color: white;
    }

    p {
      color: black;
      padding-top: 20px;
      margin-left: 25px;
    }

    span.row1 {
      left: 0px;
      background-color: #e14545;
      animation: row1 1s ease-out infinite;
      -webkit-animation: row1 1s ease-out infinite;
      -moz-animation: row1 1s ease-out infinite;
    }

    span.row2 {
      left: 25px;
      background-color: #fcb421;
    }

    span.row3 {
      left: 50px;
      background-color: #1aadc0;
    }

    span.row4 {
      left: 75px;
      background-color: #aade26;
    }

    span.row5 {
      left: 100px;
      background-color: #5e5b9b;
      animation: row5 1s ease-out infinite;
      -webkit-animation: row5 1s ease-out infinite;
      -moz-animation: row5 1s ease-out infinite;
    }

    @-webkit-keyframes row1 {
      0% {
        -webkit-transform: translate3d(0, 0, 0);
      }

      50% {
        -webkit-transform: translate3d(-10px, -30px, 0);
      }

      100% {
        -webkit-transform: translate3d(0, 0, 0);
      }
    }

    @keyframes row1 {
      0% {
        transform: translate3d(0, 0, 0);
      }

      50% {
        transform: translate3d(-10px, -30px, 0);
      }

      100% {
        transform: translate3d(0, 0, 0);
      }
    }

    @-webkit-keyframes row5 {
      0% {
        -webkit-transform: translate3d(10px, -30px, 0);
      }

      50% {
        -webkit-transform: translate3d(0, 0, 0);
      }

      100% {
        -webkit-transform: translate3d(10px, -30px, 0);
      }
    }

    @keyframes row5 {
      0% {
        transform: translate3d(10px, -30px, 0);
      }

      50% {
        transform: translate3d(0, 0, 0);
      }

      100% {
        transform: translate3d(10px, -30px, 0);
      }
    }
  }

  @media screen and (max-width: 1000px) {
    .m-loading {
      position: relative;
      margin-left: 45%;
    }
  }
</style>
