<template>
  <div class="a-list">
    <article v-for="list in lists">
      <div class="article">
        <router-link :to="{ path: '/detail', query: {id: list.id} }" class="photo" >
          <span
            :alt="list.title"
            :style="{'background-image': 'url('+ list.img +')'}">
          </span>
        </router-link>
        <div class="article-meta">
          <p class="category">
            <router-link :to="{ path: '/tags', query: {tag: list.tagName} }" class="article-link">{{ list.tag }}</router-link>
          </p>
          <p class="date">
            <time>{{ list.time }}</time>
          </p>
        </div>
        <h2 class="article-title">
          <router-link :to="{ path: '/detail', query: {id: list.id} }" class="title">{{ list.title }}</router-link>
        </h2>
        <p class="article-excerpt">{{ list.pre }}</p>
      </div>
    </article>
  </div>
</template>

<script>
import store from '../vuex/store.js'
export default {
  computed: {
    lists () {
      return store.getters.getPre
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
            text-decoration: none;
            color: #444;
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
        height: 335px;

        .article {
          .article-excerpt {
            height: 75px;
            font-size: 14px;
          }
        }
      }
    }
  }
</style>
