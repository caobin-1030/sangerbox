<template>
  <div class="foot">
    <div class="FooterBox">
      <div class="footerContent row">
        <div class="col-sm-3 col-xs-12">
          <img src="../../public/img/logo1.png" alt="">
          <p>杭州慕谷科技有限公司</p>
          <p>公司地址：杭州市余杭区龙舟路6号炬华科技产业园一号楼608</p>
        </div>
        <div class="col-sm-3 col-xs-12">
          <p>客户经理</p>
          <p>小木</p>
          <p>电话：0571-89007130 转 603</p>
          <p>邮箱：liuxl@shengxin.ren</p>
        </div>
        <div class="col-sm-3 col-xs-12">
          <p>售后支持</p>
          <p>盛经理</p>
          <p>电话：0571-89007130 转 601</p>
          <p>邮箱：feedback@shengxin.ren</p>
        </div>
        <div class="col-sm-3 col-xs-12">
          <div class="erweima">
            <div>
              <p>桑格助手</p>
              <img src="../../public/img/wechat.png" alt="">
            </div>
            <div>
              <p>生信学霸</p>
              <img src="../../public/img/xueba.png" alt="">
            </div>
          </div>
        </div>
      </div>
      <div class="Cancellation"><p @click="beian">杭州慕谷科技有限公司 SangerBox研发部 浙ICP备18023291号</p>
        <p>Copyright © 2017 - 2019 SangerBox.com All Rights Reserved</p></div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      
    }
  },
  methods: {
    beian(){
      window.open('http://www.beian.miit.gov.cn','_blank')
    }
  },
}
</script>
<style scoped>

  @import '../assets/css/reset.css';
  p{
    margin: 0;
  }
  @media screen and (max-width:768px){
    .footerContent>div:nth-child(2)>p{
      margin-left: 0 !important;
    }
    .footerContent{
      text-align: center !important;
    }
  }
  @media screen and (min-width:1200px){
    .FooterBox{
      width: 1200px !important;

    }
  }
  .foot{
    background:#fff;
    font-family:Source Han Sans CN;
  }
  hr{
    margin: 0 ;
  }
  .FooterBox{
    margin: 0 auto;
    width:100%;
    overflow: hidden;
  }
  .footerContent{
    margin: 0;
    margin: 50px auto;
  }

  .footerContent>div:nth-child(1)>img{
    width: 213px;
  }
  .footerContent>div:nth-child(1)>p:nth-child(2){
    margin-top: 10px;
  }
  .footerContent>div:nth-child(1)>p{
    font-size: 14px;
    line-height: 30px;
  }

  .footerContent>div:nth-child(2)>p:nth-child(1){
    font-size: 15px;    
    font-weight: bolder;
    margin: 15px auto;
    margin-left: 20px;
  }
  .footerContent>div:nth-child(2)>p{
    font-size: 14px;
    line-height: 30px;
    margin-left: 20px;
  }
  .footerContent>div:nth-child(3)>p:nth-child(1){
    font-size: 15px;
    font-weight: bolder;
    margin: 15px auto;
  }
  .footerContent>div:nth-child(3)>p{
    font-size: 14px;
    line-height: 30px;
  }
  .footerContent>div:nth-child(4)>p:nth-child(1){
    font-size: 15px;
    font-weight: bolder;
    margin: 15px auto;
    line-height: 30px;
  }
  .Cancellation{
    font-size:12px;
    font-family:Source Han Sans CN;
    font-weight:400;
    color:#000;
    line-height:50px;
    margin: 0 auto; 
    text-align: center;
    padding-bottom: 20px;
  }
  .Cancellation>p{
    line-height: 26px;  
  }
  .erweima{
    display: flex;
    flex-direction: row;
    
  }
  .erweima>div{
    text-align: center;
    font-size: 14px;
  }
  .erweima>div>p{
    margin-bottom: 20px;
    margin-top: 20px;
  }
  .erweima>div:nth-child(2){
    margin-left: 20px;
  }
</style>