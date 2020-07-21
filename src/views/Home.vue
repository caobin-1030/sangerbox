<template>
  <div>
    <Header></Header>
    <div class="contentAll ">
      <div class="about">
        <img src="../../public/img/homebg.png" alt="">
        <div>
          <div>
            <p>在蓬勃发展的5G和大数据时代趋势下，如何挖掘海量数据，如何提取数据的价值，是所有科研工作者的痛点。</p>
            <p style="margin-top:30px">团队将多年的研发和科研经历凝聚到几条产品线中，专注医学科研与应用转化，打造高效易用的数据挖掘工具，缩短科研成果产出和科研应用转化的周期。伴您轻松科研，笑对科研。</p>
          </div>
        </div>
      </div>
      <div class="Professionalteam">
        <div>
          <div>专业团队</div>
          <div>TEAM</div>
          <p style="margin-top:20px">杭州慕谷科技有限公司2017年在杭州市余杭区美丽的梦想小镇成立。</p>
          <p style="margin-top:40px">公司创始团队由哈医大、浙江大学成员和生物基因行业内顶尖的研发人员构成。</p>
          <p style="margin-top:10px">在基因组学、转录组学、表观遗传、蛋白组学、IT数据库方向有着丰富的项目开发经验。</p>
          <p style="margin-top:40px">生信人社区、桑格助手、桑格box、桑格云平台是公司曾经打造过的业内知名产品，</p>
          <p style="margin-top:10px">从2017年至今，团队累计解答了2万人次以上的科研问题，服务了300+位科研工作者和医生。</p>
        </div>
      </div>
      <div class="CorporateCulture">
        <img src="../../public/img/homebg2.png" style="height:283px;width:100%" alt="">
        <div>
          <p>愿景与使命</p>
          <p>Vision and mission</p>
          <p style="margin-top:60px">帮助数据发挥更大的价值，帮助客户更轻松的进行科研，帮助技术成果更快的惠及百姓</p>
        </div>
      </div>
      <div class="ClassicCase">
        <div>
          <div>联系我们</div>
          <div>contact</div>
          <p style="margin-top:40px">地址：杭州市余杭区龙舟路6号炬华科技2期1号楼</p>
          <p style="margin-top:10px">联系电话：0571-89007130转601或603</p>
          <img src="../../public/img/map11.png" alt="">
        </div>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>
<script>
import Header from '../components/Header'
import Footer from '../components/Footer'
export default {
  metaInfo() {
    return {title: 'SangerBox关于我们'} // set a title
  },
  data() {
    return {
    }
  },
  components:{
    Header,Footer
  },
  methods: {
    
  },
  
}
</script>
<style scoped>
  @media screen and (min-width:1200px){
    .about>div{
      width: 1200px !important;
    }
    .Professionalteam>div{
      width: 1200px !important;
    }
    .CorporateCulture>div{
      width: 1200px !important;
    }
    .ClassicCase>div{
      width: 1200px !important;
    }
  }
  .about{
    width: 100%;
    position: relative;
    font-family:Source Han Sans CN;
  }
  .about>div{
    width: 100%;
    margin: 0 auto;
    text-align: center;
    position: absolute;
    top: 30%;
    left: 19%;
  }
  .about>div>div{
    width: 830px;
    margin: 0 auto;
  }
  .about>div>div>p{
    font-size: 20px;
    color: rgba(255,255,255,.8);
    text-align: center;
    letter-spacing: 6px;
  }
  .Professionalteam{
    width: 100%;
  }
  .Professionalteam>div{
    width: 100%;
    margin: 70px auto;
    text-align: center;
  }
  .Professionalteam>div>div:nth-child(1){
    font-size:44px;
    font-family:Source Han Sans CN;
    font-weight:400;
    color:rgba(0,0,0,1);
    opacity:0.8;
    letter-spacing:5px;
    margin-bottom: 20px;
  }
  .Professionalteam>div>div:nth-child(2){
    font-size:24px;
    font-family:Source Han Sans CN;
    font-weight:400;
    color:rgba(51,51,51,1);
    opacity:0.2;
    letter-spacing:5px;
  }
  .Professionalteam>div>p{
    font-size:20px;
    font-family:Source Han Sans CN;
    font-weight:400;
    color:rgba(51,51,51,1);
    letter-spacing: 5px;
  }
  .CorporateCulture{
    width: 100%;
    position: relative;
  }
  .CorporateCulture>div{
    width: 100%;
    position: absolute;
    top: 15%;
    left: 19%;
    text-align: center
  }
  .CorporateCulture>div>p:nth-child(1){
    font-size:44px;
    font-family:Source Han Sans CN;
    font-weight:400;
    color:#fff;
    opacity:0.9;
    letter-spacing:5px;
    line-height: 50px;
  }
  .CorporateCulture>div>p:nth-child(2){
    font-size:24px;
    font-family:Source Han Sans CN;
    font-weight:300;
    color:rgba(255,255,255,1);
    letter-spacing:8px;
    opacity:0.9;
    line-height: 40px;
    margin-bottom: 20px;
  }
  .CorporateCulture>div>p:nth-child(3){
    font-size:20px;
    font-family:Source Han Sans CN;
    font-weight:400;
    color:rgba(255,255,255,1);
    line-height:20px;
    opacity:0.9;
    letter-spacing: 5px;
  }
  .ClassicCase{
    width: 100%;
  }
  .ClassicCase>div{
    width: 100%;
    margin: 60px auto;
    text-align: center;
  }
  .ClassicCase>div>div:first-child{
    font-size:44px;
    font-family:Source Han Sans CN;
    font-weight:400;
    color:rgba(0,0,0,1);
    opacity:0.8;
    letter-spacing:5px;
  }
  .ClassicCase>div>div:nth-child(2){
    font-size:24px;
    font-family:Source Han Sans CN;
    font-weight:400;
    color:rgba(51,51,51,1);
    opacity:0.2;
    letter-spacing:10px;
  }
  .ClassicCase>div>p{
    font-size:20px;
    font-family:Source Han Sans CN;
    font-weight:400;
    color:rgba(51,51,51,1);
    letter-spacing: 5px;
  }
  .ClassicCase>div>img{
    margin-top: 40px;
    border: 20px solid #3366cc;
    width: 940px;
  }
</style>