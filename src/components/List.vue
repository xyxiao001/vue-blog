<template>
  <div class="a-list">
    <article v-for="num in 8">
      <div class="article">
        <a class="photo">
          <span alt="如何 hack Node.js 模块？"></span>
        </a>
        <div class="article-meta">
          <p class="category">
            <a class="article-link">Node.js</a>
          </p>
          <p class="date">
            <time datetime="2016-10-27T08:16:05.000Z" itemprop="datePublished">2016-10-27</time>
          </p>
        </div>
        <h2 class="article-title">
          <a class="title">如何 hack Node.js 模块？</a>
        </h2>
        <p class="article-excerpt">
          为何要去 hack？在业务开发过程中，往往会依赖一些 Node.js 模块，hack 这些 Node.js 模块的主要目的是在不修改工具源码的情况下，篡改一些特定的功能。可能会是出于以下几种情况的考虑：
          总是存在一些特殊的本地需求，不一定能作为工具的通用需求来暴露正常的 API 给更多的用户。
          临时且紧急的需求，提 PR 已经来不及了。
          为什么不直接去改源码？考虑到工具会不定期升级，想使用工具
      </p>
      </div>
    </article>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
    }
  }
}
</script>

<style lang="scss">
  .a-list {
    width: 100%;

    /*flex布局（作用于容器）*/
    display: flex;

    /*两端对齐（作用于容器）*/
    justify-content: flex-start;

    /*侧轴方向对齐方式（作用于容器）*/
    align-items: flex-start;

    /*换行（作用于容器）*/
    flex-wrap: wrap;
    margin-bottom: 50px;

    article {
      width: 375px;
      height: 360px;
      margin: 10px;
      padding: 5px;
      box-shadow: 0 15px 30px rgba(0,0,0,0.2);
      transform: translate3d(0, -2px, 0);

      .article {

        a.photo {
          height: 0;
          width: 100%;
          display: block;
          overflow: hidden;
          position: relative;
          margin-bottom: 10px;
          padding-bottom: 55.71%;
          cursor: pointer;

          span {
            background-image: url(http://img.alicdn.com/tfs/TB1cVgDNpXXXXb2XFXXXXXXXXXX-900-500.jpg);
            display: block;
            position: absolute;
            width: 100%;
            height: 100%;
            opacity: 1;
            -webkit-background-size: cover;
            -moz-background-size: cover;
            background-size: cover;
            background-position: center;
            -webkit-transition: opacity 0.3s ease-in;
            -moz-transition: opacity 0.3s ease-in;
            -ms-transition: opacity 0.3s ease-in;
            transition: opacity 0.3s ease-in;
          }
        }

        .article-meta {
          height: 23px;
          line-height: 23px;
          overflow: hidden;

          p {
            float: left;
            color: #bbb;
          }

          a {
            text-decoration: none;
            color: #62bbc3;
          }

          .article-link {
            margin-right: 6px;
          }
        }

        .article-title {
          margin-bottom: 10px;
          font-size: 22px;
          font-weight: 400;
          line-height: 1.5em;
          word-wrap: break-word;
          overflow: hidden;
          height: 33px;

          a {
            transition: color 0.3s ease-in;
          }
        }

        .article-excerpt {
          position: relative;
          color: #aaa;
          font-size: 16px;
          line-height: 20px;
          overflow: hidden;
          height: 80px;
        }
      }

      &:hover {
        a.photo span {
          opacity: 0.7;
        }

        .article-title a {
          color: #62bbc3;
        }
      }
    }
  }

  @media screen and (max-width: 1480px) {
    .a-list {
      article {
        width: 330px;
        height: 350px;
      }
    }
  }
</style>
