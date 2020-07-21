<template>
  <div>
    <Header/>
    <i class="el-icon-search search1" id="sea" v-show="false" @click="search3();searchVideos()"></i>
    <div class="all">
      <div class="content">
        <div class="contentLeft">
          <ul>
            <li class="leixing">
              <p>是否免费</p>
              <el-radio-group v-model="Free" @change="checkListOne();search4();searchVideos()" size="mini">
                <el-radio-button label="">全部</el-radio-button>
                <el-radio-button label="0-0">免费</el-radio-button>
                <el-radio-button label="收费"></el-radio-button>
              </el-radio-group>
            </li>
            <li class="leixing">
              <p>价格高低</p>
              <el-radio-group v-model="Price" :disabled="Free=='0-0'" @change="checkListTwo();search4();searchVideos()" size="mini">
                <el-radio-button label="0.01-100000">不限</el-radio-button>
                <el-radio-button label="1-99">￥1-99</el-radio-button>
                <el-radio-button label="100-499">￥100-499</el-radio-button>
                <el-radio-button label="500-999">￥500-999</el-radio-button>
                <el-radio-button label="1000-100000">￥1000以上</el-radio-button>
              </el-radio-group>
            </li>
            <li class="leixing">
              <p>内容分类</p>
              <el-checkbox-group v-model="type" size="mini" @change="checkListThree();search4();searchVideos()">
                <el-checkbox-button v-for="(checklist,i) of typeList" :key="i" :label="checklist"></el-checkbox-button>
              </el-checkbox-group>
            </li>
            <li>
              <el-button type="primary" @click="toVideoUpload">立即投稿</el-button>
            </li>
          </ul>
        </div>
        <div class="contentRight1">
          <div class="rightTop">
            <div>
              <div @click="publishingTime();search4();searchVideos();inf()">
                更新时间
                <span>
                  <img v-if="show1" src="../../public/img/shang11.png">
                  <img v-if="active1" src="../../public/img/shangActive11.png">
                </span>
                <span>
                  <img v-if="show6" src="../../public/img/xia11.png">
                  <img v-if="active6" src="../../public/img/xiaActive11.png">
                </span>
              </div>
              <div @click="influenceFactor();search4();searchVideos();inf()">
                相关价格
                <span>
                  <img v-if="show2" src="../../public/img/shang11.png">
                  <img v-if="active2" src="../../public/img/shangActive11.png">
                </span>
                <span>
                  <img v-if="show3" src="../../public/img/xia11.png">
                  <img v-if="active3" src="../../public/img/xiaActive11.png">
                </span>
              </div>
            </div>
            <div v-show="aaaa">
              <el-input
                placeholder="输入课程、老师名称或关键词"
                v-model="SearchVideo">
              </el-input>
              <i class="el-icon-search search1" @click="search4();searchVideos()"></i>
            </div>
          </div>
          <div class="rightBottom" v-if="videoList.length>0" v-loading="loading"
          element-loading-text="拼命加载中"
          element-loading-spinner="el-icon-loading"
          element-loading-background="f5f5f5">
            <div>
              <div class="VideoBox" v-for="(item,i) of videoList" :key="i" @click="toVideoInfo(item.id)">
                <div style="width:100%;height:140px">
                  <img :src="item.image" style="width:100%;height:140px" alt="">
                </div>
                <div class="videoinfo">
                  <div><p :title="item.title">{{item.title}}</p></div>
                  <div style='height:44px'><p class="hang2" :title="item.desc"><span>简介：</span>{{item.desc}}</p></div>
                  <p class="mon"><span style="color: #FF6B00;"><span v-show="item.money!='0.00'">{{item.type=='工具' ?  '高级会员免费' : item.discount==1 ? '' : `高级会员${item.discount*10}折`}}</span></span><span style="color: #FF6B00;">{{ item.money!='0.00' ? `￥${(item.money*item.discount).toFixed(2)}` : '免费' }} <span v-if="item.discount!=undefined && item.discount!=1" style="text-decoration:line-through;color:#666;">{{item.money}}</span></span></p>
                </div>
              </div>
            </div>
            <el-pagination
              @current-change="handleCurrentChange"
              :current-page.sync="currentPage"
              layout="prev, pager, next,jumper" 
              :page-size="20"
              hide-on-single-page
              :total="result">
            </el-pagination>
          </div>
          <div style="text-align: center;margin-top:20px">
            <img src="../../public/img/none.png" v-if="videoList.length==0" alt="">
          </div>
        </div>
      </div>
    </div>
    <Footer/>
  </div>
</template>
<script>
import Header from '../components/Header'
import Footer from '../components/Footer'
export default {
  metaInfo() {
    return {title: 'SangerBox课堂'} // set a title
  },
  components:{
    Header,Footer
  },
  data() {
    return {
      Free:'',Price:'0.01-100000',type:[],
      show1:true,active1:false,show2:true,active2:false,show3:true,active3:false,show6:true,active6:false,sort:'',i:0,o:0,SearchVideo:'',loading:false,
      result:20,currentPage:1,chk1:'',chk2:'',chk3:'',sort:'',videoList:[],aaaa:false,typeList:[]
    }
  },
  mounted() {
    this.handleCurrentChange()
    this.inf()
    this.axios.get('/video/getVideoTypeInfo').then(result=>{
      if(result.data.res.typeList!=undefined){
        this.typeList=result.data.res.typeList
      }
    })
  },
  watch: {
  },
  computed:{
    chanPage(){
      this.currentPage=parseInt(this.$route.query.page)*1
    }
  },
  methods: {
    toVideoUpload(){
      const {href}=this.$router.resolve({
        path: '/VideoUpload'
      })
      window.open(href,'_blank')
    },
    toVideoInfo(id){
      const {href}=this.$router.resolve({
        path: '/VideoInfo',
        query:{
          id:id
        }
      })
      window.open(href,'_blank')
    },
    checkListOne(){
      this.loading=true;
      this.i=0;this.o=0
      this.show1=true;this.active1=false;this.show2=true;this.active2=false;this.show3=true;this.active3=false;this.show6=true;this.active6=false;
      this.isAsc1=false;this.isAsc2=false;this.isAsc3=false
      this.chk1=this.Free
    },
    checkListTwo(){
      this.loading=true;
      this.i=0;this.o=0
      this.show1=true;this.active1=false;this.show2=true;this.active2=false;this.show3=true;this.active3=false;this.show6=true;this.active6=false;
      this.isAsc1=false;this.isAsc2=false;this.isAsc3=false
      this.chk2=this.Price
    },
    checkListThree(){
      this.loading=true;
      this.i=0;this.o=0
      this.show1=true;this.active1=false;this.show2=true;this.active2=false;this.show3=true;this.active3=false;this.show6=true;this.active6=false;
      this.isAsc1=false;this.isAsc2=false;this.isAsc3=false
      this.chk3=this.type.join(",");
    },
    handleCurrentChange(currentPage){
      this.loading=true;
      if(typeof(currentPage)!='undefined' && currentPage!=1){
        this.currentPage = currentPage;
        this.search3()
        this.searchVideos()
      }else if(currentPage==1){
        this.currentPage = 1
        this.search3()
        this.searchVideos()
      }else {
        this.currentPage =this.$route.query.page*1 || 1
        currentPage=this.currentPage
        this.search3()
        this.searchVideos()
      }
    },
    search3(){
      this.$router.push({
        path:'/SangerBoxClassroom',
        query:{
          sort:this.sort,search:this.SearchVideo,free:this.chk1,price:this.chk2,type:this.chk3,page:this.currentPage
        }
      })
    },
    search4(){
      this.$router.push({
        path:'/SangerBoxClassroom',
        query:{
          sort:this.sort,search:this.SearchVideo,free:this.chk1,price:this.chk2,type:this.chk3,page:1
        }
      })
    },
    searchVideos(){
      this.loading=true;
      this.show1=true;this.active1=false;this.show2=true;this.active2=false;this.show3=true;this.active3=false;this.show6=true;this.active6=false;
      var qs=require('qs');
      this.chk1=this.$route.query.free
      this.chk2=this.$route.query.price
      this.chk3=this.$route.query.type
      this.sort=this.$route.query.sort
      this.currentPage=parseInt(this.$route.query.page)
      if(this.Free=='0-0'){
        var a=this.Free
      }else if(this.Free=='' && this.Price=='0.01-100000'){
        var a=''
      }else{
        var a=this.Price
      }
      this.axios.post(`/video/searchVideo`, qs.stringify({
        money:a,
        types:this.chk3,
        page:this.currentPage,
        sort:this.sort
      })).then(result=>{
        console.log(result)
        if(result.data.res!=undefined){
          this.loading=false
          this.videoList=result.data.res.videoList
        }else{
          this.loading=false
          this.videoList=[]
        }
      })
    },
    inf(){
      this.sort=this.$route.query.sort
      if(this.sort=="time-sort_-1"){
        this.i=1
        this.show1=false
        this.active1=true
        this.show6=true
        this.active6=false
      }else if(this.sort=="time-sort_1"){
        this.i=2
        this.show1=true
        this.active1=false
        this.show6=false
        this.active6=true
      }else if(this.sort=="money-sort_-1"){
        this.o=1
        this.show2=false
        this.active2=true
        this.show3=true
        this.active3=false
      }else if(this.sort=="money-sort_1"){
        this.o=2
        this.show2=true
        this.active2=false
        this.show3=false
        this.active3=true
      }else if(this.sort==''){
        this.show1=true
        this.active1=false
        this.show6=true
        this.active6=false
        this.show2=true
        this.active2=false
        this.show3=true
        this.active3=false
      }
    },
    publishingTime(){
      this.i++;
      this.show2=true;this.active2=false;this.show3=true;this.active3=false
      this.p=0;
      this.o=0;
      this.isAsc2=false
      if(this.i%3==1){
        this.loading=true;
        this.sort="time-sort_-1"
      }else if(this.i%3==2){
        this.loading=true;
        this.sort="time-sort_1"
      }else if(this.i%3==0){
        this.loading=true;
        this.sort=""
      }
    }, 
    //按照影响因子进行升序降序排列
    influenceFactor(){
      this.o++;
      this.show1=true;this.active1=false;this.show6=true;this.active6=false;
      this.i=0;this.p=0;
      this.isAsc1=false
      if(this.o%3==1){
        this.loading=true;
        this.sort="money-sort_-1"
      }else if(this.o%3==2){
        this.loading=true;
        this.sort="money-sort_1"
      }else if(this.o%3==0){
        this.loading=true;
        this.sort=""
      }
    },
  },
}
</script>
<style scope>
  @import '../assets/css/reset.css';
  @media screen and (min-width:1200px){
    .content{
      width: 1200px !important;
    }
  }
  .all{
    background-color: rgba(51, 102, 204, 0.117647058823529);
    overflow: hidden;
    font-family:Source Han Sans CN;
  }
  .content{
    width: 100%;
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    margin-top: 20px;
    margin-bottom: 20px;
  }
  .contentLeft{
    width: 15%;
    background: #fff;
    margin-right: 10px;
    padding: 20px;
  }
  .leixing>p{
    margin: 10px 0;
  }
  .leixing>.el-radio-group>.el-radio-button>.el-radio-button__inner{
    padding: 5px;
    border-left: 1px solid #DCDFE6;
  }
  .leixing>.el-checkbox-group>.el-checkbox-button>.el-checkbox-button__inner{
    padding: 5px;
    border-left: 1px solid #DCDFE6;
  }
  .contentRight1{
    width: 85%;
  }
  
  .contentLeft>ul>li{
    margin-bottom: 20px;
  }
  
  .rightTop{
    height: 42px;
    width: 100%;
    background: #fff;
    display: flex;
    flex-direction: row;
    line-height: 42px;
    padding: 0 10px;
    justify-content: space-between;
  }
  .rightTop>div:nth-child(1){
    display: flex;
    flex-direction: row;
  }
  .rightTop>div:nth-child(1)>div{
    width: 110px;
    height: 42px;
    cursor: pointer;
    position: relative;
  }
  .rightTop>div:nth-child(1)>div>span:nth-child(1)>img{
    position: absolute;
    top: 15px;
    right: 33px;
  }
  .rightTop>div:nth-child(1)>div>span:nth-child(2)>img{
    position: absolute;
    top: 23px;
    right: 33px;
  }
  .rightTop>div:nth-child(2)>.el-input>.el-input__inner{
    line-height: 30px;
    width: 240px;
    height: 30px;
    padding: 0 25px 0 15px;
  }
  .rightTop>div:nth-child(2){
    position: relative;
  }
  .rightTop>div:nth-child(2)>.search1{
    position: absolute;
    top: 14px;
    right: 5px;
  }
  .rightBottom{
    width: 100%;
    
  }
  .rightBottom>div:nth-child(1){
    display: flex;
    flex-direction: row;
    flex-wrap:wrap
  }
  .rightBottom>div:nth-child(1)>div{
    width: 24.25%;
    background: #fff;
    padding: 10px;
    margin-right: 10px;
    margin-top: 10px;
  }
  .rightBottom>div:nth-child(1)>div:nth-child(4n){
    margin-right: 0;
  }
  .VideoBox{
    box-shadow: 0 2px 4px 0 rgba(0,0,0,.05);
  }
  .VideoBox:hover{
    transform: scale(1.01);cursor: pointer;
  }
  .VideoBox>p{
    margin-top: 10px;
    cursor: pointer;
    text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }
  .videoinfo{
    padding-top: 8px;
    font-size: 16px;
    line-height: 22px;
    
  }
  .videoinfo>div{
    width: 100%;
  }
  .videoinfo>span{
    color: #FF6B00;
  }
  .videoinfo>div:nth-child(1)>p{
    cursor: pointer;
    text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }
  .hang2{
    cursor: pointer;
    text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    font-size: 12px;
    margin-bottom: 5px;color: #666;
  }
  .videoinfo1{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding-top: 8px;
    font-size: 13px;
  }
  .videoinfo1>div:nth-child(2){
    color: #797979;
  }
  .videoinfo>div:nth-child(1)>span{
    margin-left: 5px;
  }
  .el-pagination{
    text-align: center;
    margin-top: 20px;
    
  }
  .mon{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 10px;
  }
</style>