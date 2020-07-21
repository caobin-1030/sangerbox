<template>
  <div>
    <Header/>
    <div class="black">
      <img src="../../public/img/block.png" alt="">
      <p><span>您的ip已被封禁!</span><span>{{CitySN.cip}}</span></p>
    </div>
    <Footer/>
  </div>
</template>
<script>
import Header from '../components/Header'
import Footer from '../components/Footer'
export default {
  data() {
    return {
      CitySN:''
    }
  },
  components:{
    Header,Footer
  },
  mounted() {
    this.CitySN=returnCitySN
  },
  methods: {
    
  },
}
</script>
<style scoped>
  .black{
    position: relative;
    margin: 0 auto;
    height: 500px;
  }
  .black>p{
    text-align: center;
    margin-top: -190px;
  }
  .black>p>span{
    font-size: 16px;
  }
  .black>p>span:first-child{
    font-size: 16px;
    letter-spacing: 2px;
    margin-right: 10px;
  }
</style>