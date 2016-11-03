<template>
  <a class="s-item">
    <div class="left">
      <img :src="item.img" alt="item.title" />
    </div>
    <div class="right">
      <span class="title">{{ item.title }}</span>
      <p>{{ item.desc }}</p>
    </div>
  </a>
</template>

<script>
export default {
  props: ['item']
}
</script>

<style lang="scss">
  .s-item {
    display: inline-block;
    width: 500px;
    height: 105px;
    margin: 20px;
    background-color: #fff;
    border: 1px solid #eee;
    -webkit-box-shadow: 0 1px 4px rgba(0, 0, 0, 0.27), 0 0 60px rgba(0, 0, 0, 0.06) inset;
    -moz-box-shadow: 0 1px 4px rgba(0, 0, 0, 0.27), 0 0 40px rgba(0, 0, 0, 0.06) inset;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.27), 0 0 40px rgba(0, 0, 0, 0.06) inset;
    position: relative;
    *zoom: 1;
    overflow: hidden;
    cursor: pointer;

    .left {
      float: left;
      width: 100px;

      img {
        height: 100px;
      }
    }

    .right {
      float: left;
      width: 335px;
      margin-left: 60px;

      .title {
        font-size: 16px;
        color: #62bbc3;
      }

      p {
        font-size: 13px;
      }
    }
  }

  @media screen and (max-width: 500px) {
    .s-item {
      width: 100%;
      margin: 5px;

      .left {
        float: left;
        width: 30%;

        img {
          width: 100%;
        }
      }

      .right {
        width: 70%;
        margin: 0px;

        .title {
          margin-left: 2%;
        }

        p {
          margin-left: 2%;
          width: 95%;
        }
      }
    }
  }
</style>
