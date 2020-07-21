<template>
  <div>
    <Header></Header>
    <div class="contentAll ">
      <div class="content row">
        <div class="col-md-7">
          <img src="../../public/img/bg.png" alt="">
        </div>
        <div class="WechatSignin col-md-5">
          <div id="login_container">
          </div>
          <div class="fanhui"><img @click="toSignin" src="../../public/img/back1.png" alt=""></div>
        </div>
      </div>
      
    </div>
    <Footer1></Footer1>
  </div>
</template>
<script>
import Header from '../components/Header'
import Footer1 from '../components/Footer1'
export default {
  data() {
    return {
    }
  },
  components:{
    Header,Footer1
  },
  mounted() {
    window.WxLogin({
      self_redirect:false,
      id:"login_container",
      appid: "wx214d2ccc7c0b3d3b",
      scope: "snsapi_login",
      redirect_uri: "http%3a%2f%2fsangerbox.com%2fwxLogin",
      state: "STATE",
      style: "white",
      href: "data:text/css;base64,DQouc3RhdHVzX2ljb24ge2Rpc3BsYXk6IG5vbmU7fQ0KLmltcG93ZXJCb3ggLnN0YXR1cyB7dGV4dC1hbGlnbjogY2VudGVyO30gDQpib2R5e2NvbG9yOiBibGFjazt9DQouaW1wb3dlckJveCAucXJjb2Rlew0KICBib3JkZXI6IG5vbmUgIWltcG9ydGFudDsNCn0NCi5pbmZvew0KICB3aWR0aDogMjUwcHggIWltcG9ydGFudDsNCiAgbWFyZ2luLXRvcDogMjBweCAhaW1wb3J0YW50Ow0KfQ0KLmltcG93ZXJCb3ggLnN0YXR1c3sNCiAgcGFkZGluZzogMDsNCn0NCg=="
    });
  },
  methods: {
    toSignin(){
      //跳转到登录页
      this.$router.push({path:'/Signin'})
    },
    toSignup(){
      //跳转到登录页
      this.$router.push({path:'/Signup'})
    },
  },
  
}
</script>
<style scoped>
  @media screen and (min-width:1200px){
    .content{
      width: 1200px !important;
    }
  }
  @media screen and (max-width:992px){
    .content>div:first-child{
      display: none;
    }
  }
  .fanhui{
    position: absolute;
    top:17px;
    left: 30px;
  }
  .fanhui>img{
    cursor: pointer;
  }
  .contentAll{
    width: 100%;
    background:linear-gradient(146deg,rgba(71,124,254,1) 0%,rgba(57,85,255,1) 100%);
  }
  .content{
    width: 100%;
    margin: 0 auto;
    padding: 80px 0;
  }
  .content>div{
    text-align: center;
  }
  .content>div>img{
    margin-top: 90px;
  }
  .WechatSignin{
    width: 330px;
    background: #fff;
    padding: 10px;
    margin: 0 auto;
    border-radius: 4px;
  }
  .WechatSignin>p:first-child{
    font-size:26px;
    font-family:Source Han Sans CN;
    font-weight:bold;
    color:rgba(51,51,51,1);
    text-align: center;
  }
  .title{
    font-size: 18px;
  }
</style>