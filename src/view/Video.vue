<template>
  <div class="wraper">
    <NavBar></NavBar>
    <div class="content">
      <Verification></Verification>
    </div>
  </div>
</template>

<script>
import NavBar from '../components/Nav'
import Verification from '../components/Verification'
export default {
  data () {
    return {
    }
  },
  computed: {
  },
  components: {
    NavBar,
    Verification
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
