<template>
  <div>
    <Header></Header>
    <div class="Program1">
      <div class="Program">
        <p >合 作 流 程</p>
        <p style="font-size:14px">确认需求→定制方案→签署合同→支付款项→项目启动→结果交付→支付尾款→售后维护</p>
        <div class="Carousel">
          <el-carousel trigger="click">
            <el-carousel-item  v-for="(item,i) of cars" :key="i">
              <img style="border-top:1px solid #fff" :src="item" alt="">
            </el-carousel-item>
          </el-carousel>
        </div>
      </div>
    </div>
    <div class="Programm">
      <ul>
        <li v-for="(item,i) of xiangmu" :key="i" >
          <div class="ProgrammImg">
            <img style="height:298px" :src="item.img">
            <p>项目名称：{{item.title}}</p>
            <span>查看详情<img src="../../public/img/tron.png" alt=""></span>
          </div>
          <div class="ProgrammWord">
            <p>{{item.title}}</p>
            <div></div>
            <ul>
              <li v-for="(item1,i) of item.con" :key="i">
                <p>
                  {{item1}}
                </p>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
    <Footer></Footer>
  </div>
</template>
<script>
import Header from '../components/Header'
import Footer from '../components/Footer'
export default {
  metaInfo() {
    return {title: 'SangerBox服务'} // set a title
  },
  data() {
    return {
      cars:[require('../../public/img/duozu.png'),require('../../public/img/kaifa.png'),require("../../public/img/keyan.png"),require("../../public/img/shengxin.png"),require("../../public/img/shujuwajue.png"),require("../../public/img/wuzhong.png")],
      xiangmu:[
        {title:'物种数据库开发',con:['目前包括ncbi在内的数据库中拥有基因组数据超过2000套，转录组数据超过59万套，数据总量达到2PB以上。','如何盘活自有数据和公共数据库中的数据，更好使用这些数据，以及与他人共享这些数据成果，成为目前科研上的一大痛点。',"基于这些问题，慕谷团队推出物种数据库构建服务，帮助科研工作者搭建某一物种数据库平台，不仅仅能方便管理自己的数据及相应的研究成果，还可以让其他人引用其中的成果或协助上传数据，牢牢锁定在该物种研究领域的影响力。"],img:require("../../public/img/wuzhong1.png")},
        {title:'可视化软件/云平台 开发',con:['医生在日常科研工作中，一些编程语言和工具会被较高频率的使用，其中一些工具使用门槛比较高，需要大量的学习成本才能掌握。','针对这些问题，基于团队自身能力和对IT+BT的独到理解','我们将这些工具二次开发，成为可视化的软件，部署于本地或云端服务器，成为可以一键式使用的工具。通过使用过程的图形化和结果展示的图形化，提升科研效率和进度。'],img:require("../../public/img/kaifa1.png")},
        {title:'生信文章流程复现',con:['生物信息方法学的文章中会用到大量的数据处理和数据分析工具,这些工具通常需要一定的编程基础才能很好的驾驭，门槛较高。','慕谷团队具有近7年的数据挖掘经验，开发过大小项目300余项','我们可以为您识别出文章中的数据分析流程，并且应用您想要研究的疾病数据来重复这些方法，得到相应的结果作为您的前期工作或者课题基础。'],img:require("../../public/img/shengxin1.png")},
        {title:'高级数据挖掘',con:['在文章流程复现的基础上，慕谷团队根据疾病的实际临床意义和过往的SCI发表经验','为您提炼有价值的研究结果并且补充我们认为有必要的分析','使您的研究成为了一篇SCI文章中的核心素材。'],img:require("../../public/img/shujuwajue1.png")},
        {title:'高级科研合作',con:['科研团队与慕谷团队一道探索更有价值的科研成果','发表10分以上SCI文章，要求有一定的科研基础，发表过4-5分文章若干。','合作周期2-3年。'],img:require("../../public/img/keyan1.png")},
        {title:'多组学聚类分析',con:['','',''],img:require("../../public/img/duozu1.png")}
      ]
    }
  },
  components:{
    Header,Footer
  },
  computed: {

  },
  methods: {

  }
}
</script>
<style scpoed>
  @media screen and (min-width:1200px){
    .Program{
      width: 1200px !important;
    }
    .Programm>ul{
      width: 1200px !important;
    }
  }
  @media screen and (min-width:850px){
    .el-carousel__container>div>img{
      width: 70% !important;
      margin: 0 auto
    }
    
  }
  @media screen and (max-width:850px){
    .el-carousel{
      height: 160px !important;
    }
    .el-carousel__item{
      height: 160px !important;
    }
    .el-carousel__container{
      height: 160px !important;
    }
    
  }
  @media screen and (max-width:900px){
    .Programm>ul>li{
      flex-direction: column !important;
    }
    .ProgrammImg{
      width: 100% !important;
      padding: 0 20px;
    }
    .ProgrammImg>img{
      width: 70% !important;
      text-align: center;
    }
    .ProgrammWord{
      width: 100% !important;
      padding: 0 20px;
    }
  }
  @media screen and (max-width:768px){
    .ProgrammImg>img{
      width: 100% !important;
    }
  }
  .Program1{
    width: 100%;
    background:#3366cc;
  }
  .Program{
    width:100%;
    margin: 0 auto;
    overflow: hidden;
  }
  .Program>p:nth-child(1){
    text-align: center; 
    font-size:30px;
    font-family:Source Han Sans CN;
    font-weight:bold;
    color:rgba(255,255,255,1);
    line-height:30px;
    margin-top:89px;
  }
  .Program>p:nth-child(2){
    text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    width: 80%;
    font-size:14px;
    font-family:Source Han Sans CN;
    font-weight:400;
    color:rgba(255,255,255,1);
    line-height:18px;
    margin: 0 auto;
    margin-top: 30px;
    text-align: center;
  }
  .Carousel{
    width: 100%;
    margin: 0 auto;
    margin-top: 50px;
    margin-bottom: 50px;
    text-align: center;
  }
  .el-carousel{
    width: 100%
  }
  .el-carousel--horizontal{
    width: 100%
  }
  .el-carousel__container{
    text-align: center;
    width: 100%;
    height: 330px;
  }
  .el-carousel__container>div>img{
    width: 70%;
    height: 280px;
    margin: 0 auto
  }
  .el-carousel__item{
    width: 100%;
  }
  .Programm{
    width:100%;
    margin: 0 auto;
    overflow: hidden;
  }
  .Programm>ul{
    width: 100%;
    margin: 0 auto;
    margin-top: 46px;
  }
  .Programm>ul>li{
    display: flex;
    flex-direction: row;
    margin-top: 50px;
    margin-bottom: 50px;
  }
  .ProgrammImg{
    width: 60%;
    margin: 0 auto;
    background: #fff;
  }
  .ProgrammImg>img:first-child{
    width:65%;
    display: block;
  }
  .ProgrammImg>p{
    font-size:12px;
    font-family:Source Han Sans CN;
    font-weight:500;
    color:rgba(51,51,51,1);
    margin-left: 8px;
    margin-top: 14px;
    display: inline-block;
  }
  .ProgrammImg>span{
    font-size:12px;
    font-family:Source Han Sans CN;
    font-weight:500;
    color:rgba(58,90,176,1);
    display: inline-block;
    margin-left: 22%;
  }
  .ProgrammImg>span>img{
    width: 12px;
    vertical-align: middle;
    margin-left: 10px;
  }
  .ProgrammWord{
    width:40%;
    margin: 0 auto;
    box-sizing: border-box;
  }
  .ProgrammWord>ul>li{
    list-style-image:url('../../public/img/spot.png');
    margin-bottom:15px; 
  }
  .ProgrammWord>ul>li>p{
    text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }
  .ProgrammWord>p:first-child{
    font-size:24px;
    font-family:Source Han Sans CN;
    font-weight:bold;
    color:rgba(51,51,51,1);
    line-height:30px;
  }
  .ProgrammWord>div:nth-child(2){
    width:68px;
    height:2px;
    background: #3756AD;
    margin: 29px 0 30px 0;
  }
</style>