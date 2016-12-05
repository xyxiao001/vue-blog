<template>
  <div class="wraper">
    <NavBar></NavBar>
    <div class="content">
      <div class="china">
        <p>
          <span>富强</span>
          <span>民主</span>
          <span>文明</span>
          <span>和谐</span>
        </p>
        <p>
          <span>自由</span>
          <span>平等</span>
          <span>公正</span>
          <span>法治</span>
        <p>
          <span>爱国</span>
          <span>敬业</span>
          <span>诚信</span>
          <span>友善</span>
        </p>
        <button type="button" name="button" class="btn-success">我同意</button>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from '../components/Nav'
export default {
  data () {
    return {
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

<style lang="scss">
  .china {
    width: 100%;
    text-align: center;
    font-size: 48px;
    margin-top: 10%;
  }

  .btn-success {
    display: inline-block;
    border-color: #72C47C;
    background-color: #72C47C;
    border-radius: 4px;
    font-size: 16px;
    padding: 0 15px;
    min-width: 70px;
    text-align: center;
    outline: none;
    color: white;
    height: 40px;
    cursor: pointer;
  }

  @media screen and (max-width: 500px) {
    .china {
      font-size: 25px;
    }
  }
</style>
