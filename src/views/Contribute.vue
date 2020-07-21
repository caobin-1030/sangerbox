<template>
  <div>
    <Header></Header>
    <div v-if="mess" class="mess"><img src="../../public/img/msg.png" alt=""><span>正在导出</span></div>
    <div class="SearchBackground">
      <div class="SearchBody1">
        <div class="search2">
          <div class="searchBox1">
            <div class="searchInput">
              <input ref="input" @keyup.13="searcher()" v-model="searchContent" type="text" placeholder="在此输入您搜索的内容" onfocus="this.placeholder=''" onblur="this.placeholder='在此输入您搜索的内容'">
              <div class="select-panel">
                <div v-show="isShow" v-for="(item,i) in data5" :key="i" class="select-item" @click="click_item(item)">{{item}}</div>
              </div>
            </div>
            <div @click="toSearch()"><span>搜索</span></div>
          </div>
        </div>
        <div class="SearchBody">
          <span>寻找文献</span>
          <ul>
            <li><span @click="searchtp53()">TP53</span></li>
            <li><span @click="searchmyc()">MYC</span></li>
            <li><span @click="searchegfr()">egfr</span></li>
            <li><span @click="searchkras()">kras</span></li>
          </ul>
          <div class="SearchBox">
            <div class="searchInput">
              <input ref="input" @keyup.13="searcher()" v-model="searchContent" type="text" placeholder="在此输入您搜索的内容" onfocus="this.placeholder=''" onblur="this.placeholder='在此输入您搜索的内容'">
              <div class="select-panel">
                <div v-show="isShow" v-for="(item,i) in data5" :key="i" class="select-item" @click="click_item(item)">{{item}}</div>
              </div>
            </div>
            
            <div @click="toSearch()"><span>搜索</span></div>
          </div>
          <p class="sousuo"><span>搜索结果：<span>{{result}}</span><span>搜索时间：</span><span>{{timer}}</span></span><span class="tougao" @click="toContribute()">智能选刊</span></p>

        </div>
      </div>
      <div class="SearchHeadBg">
      </div>
      <div class="SearchContent">
        <div class="SearchHead">
          <div class="SearchContent1 row">
            <div class="SearchHeadOne col-md-2 col-sm-3 col-xs-3">
              <div>
              </div>
              <div></div>
              <div id="senior" class="senior" v-if="senior1">
              </div>
            </div>
            <div class="SearchHeadTwo col-md-7 col-sm-6 col-xs-7">
            <ul>
              <!-- <li :class="{'asc':isAsc1,'desc':isDesc1}" @click="publishingTime()">
                出版时间
                <span>
                  <img v-if="show1" src="../../public/img/shang.png">
                  <img v-if="active1" src="../../public/img/shangActive.png">
                </span>
                <span>
                  <img v-if="show6" src="../../public/img/xia.png">
                  <img v-if="active6" src="../../public/img/xiaActive.png">
                </span>
              </li> -->
              <li :class="{'asc':isAsc2,'desc':isDesc2}" @click="influenceFactor()">
                影响因子
                <span>
                  <img v-if="show2" src="../../public/img/shang.png">
                  <img v-if="active2" src="../../public/img/shangActive.png">
                </span>
                <span>
                  <img v-if="show3" src="../../public/img/xia.png">
                  <img v-if="active3" src="../../public/img/xiaActive.png">
                </span>
              </li>
              <li :class="{'asc':isAsc3,'desc':isDesc3}" @click="relevant()">
                相关度
                <span>
                  <img v-if="show4" src="../../public/img/shang.png">
                  <img v-if="active4" src="../../public/img/shangActive.png">
                </span>
                <span>
                  <img v-if="show5" src="../../public/img/xia.png">
                  <img v-if="active5" src="../../public/img/xiaActive.png">
                </span>
              </li>
            </ul>
          </div>
            <div class="SearchHeadThree col-md-3 col-sm-2">
              <ul>
                <!-- <li><img src="../../public/img/translate.png" alt="翻译" title="翻译" @click="translate()"></li> -->
                <li><img src="../../public/img/right.png" alt="导出" @click="export1()" title="导出"></li>
                <!-- <li><img src="../../public/img/all.png" alt="导出" title="全部"></li> -->
              </ul>
            </div>
          </div>
        </div>
        <div class="SearchBody1 row">
          <div class="SearchBodyOne col-sm-2" v-if="show">
            <ul>
              <li>
                <p><img src="../../public/img/Influencefactor.png"><span>影响因子:</span></p>
                <el-checkbox-group v-model="checkList1" @change="checkListOne()">
                  <el-checkbox label="0-1"></el-checkbox>
                  <el-checkbox label="1-3"></el-checkbox>
                  <el-checkbox label="3-5"></el-checkbox>
                  <el-checkbox label="5-10"></el-checkbox>
                  <el-checkbox label="10-15"></el-checkbox>
                  <div class="InputP" v-show="inpp">
                    <input type="number" v-model="inp1">
                    <div></div>
                    <input type="number" v-model="inp2">
                    <el-button type="primary" size="mini" round @click="customOne()">搜索</el-button>
                  </div>
                  <span><img @click="influencefactorDown" v-show="inpp1" src="../../public/img/xia1.png" alt=""></span>
                  <span><img @click="influencefactorDown" v-show="!inpp1" src="../../public/img/shang1.png" alt=""></span>
                </el-checkbox-group>
              </li>
              <li>
                <p><img src="../../public/img/year.png"><span>出版年份:</span></p>
                  <el-checkbox-group v-model="checkList2" @change="checkListTwo()">
                  <el-checkbox label="2017"></el-checkbox>
                  <el-checkbox label="2018"></el-checkbox>
                  <el-checkbox label="2019"></el-checkbox>
                  <div class="InputP" v-show="inpp2">
                    <input type="number" v-model="inp3">
                    <div></div>
                    <input type="number" v-model="inp4">
                    <el-button type="primary" size="mini" round @click="yearOne()">搜索</el-button>
                  </div>
                  <span><img @click="yearDown" v-show="inpp3" src="../../public/img/xia1.png" alt=""></span>
                  <span><img @click="yearDown" v-show="!inpp3" src="../../public/img/shang1.png" alt=""></span>
                </el-checkbox-group>
              </li>
              <li>
                <p><img src="../../public/img/article.png"><span>文献类型:</span></p>
                  <el-checkbox-group value="checkList" v-model="checkList3" @change="checkListThree()">
                    <el-checkbox label="Journal Article">Article</el-checkbox>
                    <el-checkbox label="Review">综述</el-checkbox>
                    <div v-if="type1">
                      <el-checkbox label="Practice Guideline">指南</el-checkbox>
                      <el-checkbox label="Meta-Analysis">Meta分析</el-checkbox>
                      <el-checkbox label="Clinical Trial,Multicenter Study">临床试验</el-checkbox>
                      <el-checkbox label="Case Reports">病例报告</el-checkbox>
                      <el-checkbox label="English Abstract">英文摘要</el-checkbox>
                      <el-checkbox label="Randomized Controlled Trial">随机对照实验</el-checkbox>
                      <el-checkbox label="Comparative Study">对照实验</el-checkbox>
                      <el-checkbox label="rests">其他</el-checkbox>
                    </div>
                  </el-checkbox-group>
                <span><img @click="type2()" v-if="type3" src="../../public/img/xia1.png" alt=""></span>
                <img @click="type2()" v-if="!type3" src="../../public/img/shang1.png" alt="">
              </li>
            </ul>
          </div>
          <div class="SearchBodyTwo col-sm-10" v-if="show" v-loading="loading"
          element-loading-text="拼命加载中"
          element-loading-spinner="el-icon-loading"
          element-loading-background="f5f5f5">
            <div class="matching">
              <p>匹配内容</p><el-input type="textarea" :rows="3" placeholder="请输入内容" v-model="textarea">
              </el-input>
              <div class="march">
                <el-slider v-model="value"></el-slider>
                <span>相关度：{{value}}%</span>
                <el-switch v-model="showlanguage" active-text="中文匹配"></el-switch>
                <el-switch v-model="showSCI" active-text="只显示SCI"></el-switch>
                <p>
                  <el-button type="info" size='mini' @click="clear()" round>清空</el-button>
                  <el-button type="primary" size='mini' class="Search" @click="searcher()" round>提交</el-button>
                </p>
              </div>
              
            </div>
            <ul>
              <li v-for="(item1,itemi) in data1" :key="itemi">
                <p class="title3" v-if="item1.endYear==null" @click="toJournal(item1.journalTopHits.searchData[0].journal.nlmId,item1.journalTopHits.searchData[0].journal.course)"><span v-html="item1.journalTopHits.searchData[0].journal.fullName"></span><span style="color:blue"> ( </span><span v-html="item1.journalTopHits.searchData[0].journal.subName"></span><span style="color:blue"> )</span></p>
                <p class="title3" v-else style="text-decoration: line-through;" @click="toJournal(item1.journalTopHits.searchData[0].journal.nlmId,item1.journalTopHits.searchData[0].journal.course)"><span v-html="item1.journalTopHits.searchData[0].journal.fullName"></span><span style="color:blue"> ( </span><span v-html="item1.journalTopHits.searchData[0].journal.subName"></span><span style="color:blue"> )</span></p>
                <div class="Periodical1"> 
                  <div class="Periodical1Left">
                    <div>
                      <p><span v-if="item1.journalTopHits.searchData[0].journal.course!=null">{{item1.journalTopHits.searchData[0].journal.course}}</span><span v-else>N/A</span><span v-show="item1.journalTopHits.searchData[0].journal.area!='未录'">{{item1.journalTopHits.searchData[0].journal.area}}</span><span v-if="item1.journalTopHits.searchData[0].journal.subCourse!=null">{{item1.journalTopHits.searchData[0].journal.subCourse}}</span><span v-else>N/A</span></p>
                      <p><span style="margin-right:15px;" @click="toResemble(item1.journalTopHits.searchData[0].journal.nlmId)">相似文章({{item1.count}})</span><span @click="officialUrl(item1.journalTopHits.searchData[0].journal.officialUrl)" v-if="item1.journalTopHits.searchData[0].journal.officialUrl!=null">杂志入口</span><span v-else>N/A</span><span  @click="nlmId(item1.journalTopHits.searchData[0].journal.nlmId)">最新文章</span></p>
                    </div>
                    <div class="issn">
                      <div>
                        <p>ISSN</p>
                        <p v-if="item1.journalTopHits.searchData[0].journal.issn!=null">{{item1.journalTopHits.searchData[0].journal.issn}}</p>
                        <p v-else>N/A</p>
                      </div>
                      <div>
                        <p>发布国家</p>
                        <p v-if="item1.journalTopHits.searchData[0].journal.countryZh!=null">{{item1.journalTopHits.searchData[0].journal.countryZh}}</p>
                        <p v-else>N/A</p>
                      </div>
                      <div>
                        <p>投稿难度</p>
                        <p v-if="item1.journalTopHits.searchData[0].journal.enterPresent!=null">{{item1.journalTopHits.searchData[0].journal.enterPresent}}</p>
                        <p v-else>N/A</p>
                      </div>
                      <div>
                        <p>投稿周期</p>
                        <p v-if="item1.journalTopHits.searchData[0].journal.acceptTime!=null">{{item1.journalTopHits.searchData[0].journal.acceptTime}}</p>
                        <p v-else>N/A</p>
                      </div>
                      <div>
                        <p>发布频次</p>
                        <p v-if="item1.journalTopHits.searchData[0].journal.publishingCycle!=null">{{item1.journalTopHits.searchData[0].journal.publishingCycle}}</p>
                        <p v-else>N/A</p>
                      </div>
                    </div>
                  </div>
                  <div class="Periodical1Right">
                    <div :id="Period1(itemi)"  :style="{width: '270px', height: '180px'}"></div>
                  </div>
                </div>
              </li>
            </ul>
            
            <el-pagination
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              layout="prev, pager, next,jumper" 
              :total="this.result"
              v-if="el_show">
            </el-pagination>
          </div>
          <div class="SearchBodyThree col-sm-2" v-if="show">
            <div>
              <p>新手上路</p>
              <div></div>
              <p @click="to884">1、怎样快速查文献</p>
              <p @click="to885">2、怎样收藏文献</p>
              <p @click="to886">3、怎么进行文献分析</p>
              <p @click="to887">4、怎么筛选目标杂志</p>
            </div>
            <div>
              <p>数据统计</p>
              <div></div>
              <p @click="to888">1、怎样对搜索结果进行统计</p>
              <p @click="to889">2、怎样进行投稿选刊</p>
            </div>
            <div>
              <p>最新动态</p>
              <div></div>
              <p v-for="(item,i) of data7" :key="i"><span  @click="toShengxinren(item.id)">{{item.title}}</span></p>
            </div>
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
import html2canvas from 'html2canvas';
import FileSaver from 'file-saver';
export default {
  metaInfo() {
    return {title: this.textarea + '-智能选刊搜索'} // set a title
  },
  data() {
    return {
      show:true,Entrance:true,textarea:'tcga',value:30,mess:false,
      inpp:false,inpp1:true,w:0,
      inpp2:false,inpp3:true,e:0,
      inp3:"",inp4:'',
      type3:true,
      result:0,
      timer:0,loading:false,
      checkList1: [],checkList2: [],checkList3: [],
      input1:"",input2:"",input3:"",input4:"",
      i:0,o:0,p:0,u:0,
      isAsc1:false,isDesc1:false,isAsc2:false,isDesc2:false,isAsc3:false,isDesc3:false,
      show1:true,active1:false,show2:true,active2:false,show3:true,active3:false,show4:true,active4:false,show5:true,active5:false,show6:true,active6:false,
      searchContent:'',ifsAggs:[],
      search:'',a5:[],a6:[],accc:[],a7:[],
      searchPubmedArticle:{},searchPubmedJournal:{},
      a1:{},a2:{},inp1:"",inp2:"",currentPage:1,
      chk1:'',chk2:'',chk3:'',chk4:'',chk5:"",
      el_show:true,
      aa:'',ab:'',type1:false,q:0,showSCI:false,
      h:0,searchCompletion:[],showlanguage:false,showSci:false,
      model1: "",model2:'',model3:'',model4:'',
      relation2:'AND',relation3:'AND',relation4:'AND',
      int1:'',int2:'',int3:'',int4:'',
      senior1:false,j:0,isShow: false,blok:[],
      sort:'',
    }
  },
  components:{
    Header,Footer
  },
  created(){
    this.currentPage = Number(localStorage.getItem('pagination')) || 1;
    this.currentPage=1
  },
  mounted() {
    this.$refs['input'].focus();
    this.block()
  },
  destroyed () {
  },
  updated () {
    this.Period();
  },
  beforeUpdate () {
    localStorage.setItem('pagination', this.currentPage);
  },
  beforeDestroy () {
    localStorage.setItem('pagination', '1');
  },
  watch: {
  },
  computed: {
    noMore () {
      return this.count >= 20
    },
    disabled () {
      return this.loading || this.noMore
    },
    data1: {
      get: function(){
        return this.accc; // 在这里把临时对象的值通过计算属性赋值给页面中用到的对象
      }
    },
    data5:{
      get:function(){
        return this.searchCompletion
      }
    },
    data7:{
      get:function(){
        return this.blok
      }
    },
  },
  activated() {
    this.getRouterData()
    this.searcher()
  },
  methods:{
    to884(){
      window.open('https://shengxin.ren/article/884','_blank')
    },
    to885(){
      window.open('https://shengxin.ren/article/885','_blank')
    },
    to886(){
      window.open('https://shengxin.ren/article/886','_blank')
    },
    to887(){
      window.open('https://shengxin.ren/article/887','_blank')
    },
    to888(){
      window.open('https://shengxin.ren/article/888','_blank')
    },
    to889(){
      window.open('https://shengxin.ren/article/889','_blank')
    },
    toShengxinren(id){
      let url=`https://shengxin.ren/article/${id}`
      window.open(url,'_blank')
    },
    block(){
      $.ajax({
        url:'https://shengxin.ren/sxrpost/getBlog',
        dataType:'json',
        type:'GET',
        success:res=>{
          this.blok=(res.data).slice(0,4)
        }
      })
    },
    //导出
    export1(){
      this.mess=true
      var qs=require('qs');
      this.axios.post(`/pubmed/downloadMoreLikeThisPubmedArticleAll`, qs.stringify({
        query:this.textarea,
        ifsFilter:this.chk1 || this.chk4,
        yearsFilter:this.chk2 || this.chk5,
        typeFilter:this.chk3,
        similarity:this.value
      },{responseType:'arraybuffer'})).then(res => {
        if (res.data.status == 200) {
          downloadJournalAllTxt(res.data.res.journalList.ifsJournalAggs.journalAggs);
          this.mess=false
        } else {
          this.$message.error({
            message: "导出失败"
          })
        }
      });
      function StringBuilder() {
        this._stringArray = new Array();
        }
        StringBuilder.prototype.append = function (str) {
        this._stringArray.push(str);
        }
        StringBuilder.prototype.toString = function (joinGap) {
        return this._stringArray.join(joinGap);
      } 
      function downloadJournalAllTxt(journalMap){
        var map=journalMap;
        let txtContent = new StringBuilder();
        var journal=null;
        txtContent.append("杂志名称\t中科院分区\t学科分类\tQ\t影响因子\tISSN\t杂志链接\t难易程度\t投稿速度\t国家\t文章数量");
        for(var key in map){
          journal=map[key];
          var fullName=journal.journalData.searchData[0].journal.fullName;
          var course=journal.journalData.searchData[0].journal.course!=undefined?journal.journalData.searchData[0].journal.course:"N/A";
          var area=journal.journalData.searchData[0].journal.area!=undefined?"("+journal.journalData.searchData[0].journal.area+")":"";
          var subCourse=journal.journalData.searchData[0].journal.subCourse!=undefined?journal.journalData.searchData[0].journal.subCourse:"N/A";
          var qClass=journal.journalData.searchData[0].journal.qClass!=undefined?journal.journalData.searchData[0].journal.qClass:"N/A";
          var nowIfs=journal.journalData.searchData[0].journal.nowIfs;
          var issn=journal.journalData.searchData[0].journal.issn!=undefined?journal.journalData.searchData[0].journal.issn:journal.journalData.searchData[0].journal.essn;
          var officialUrl=journal.journalData.searchData[0].journal.officialUrl!=undefined?journal.journalData.searchData[0].journal.officialUrl:"N/A";
          var enterPresent=journal.journalData.searchData[0].journal.enterPresent!=undefined?journal.journalData.searchData[0].journal.enterPresent:"N/A";
          var acceptTime=journal.journalData.searchData[0].journal.acceptTime!=undefined?journal.journalData.searchData[0].journal.acceptTime:"N/A";
          var publishingCountry=journal.journalData.searchData[0].journal.publishingCountry!=undefined?journal.journalData.searchData[0].journal.publishingCountry:"N/A";
          var articleCount=journal.count!=undefined?journal.count:"N/A";
          txtContent.append(fullName+"\t"+course+area+"\t"+subCourse+"\t"+qClass+"\t"+nowIfs+"\t"+issn+"\t"+officialUrl+"\t"+enterPresent+"\t"+acceptTime+"\t"+publishingCountry+"\t"+articleCount);
        }
        var filename = "journal.txt";
        var blob = new Blob([txtContent.toString("\n")], {
          type: "text/plain;charset=utf-8"
        });
        saveAs(blob, filename); 
      }
      
    },
    //跳转相似文章
    toResemble(nlmId){
      const {href}=this.$router.resolve({
        path:'/Resemble',
        query:{
          Id:nlmId,search:this.textarea
        }
      })
      window.open(href,'_blank')
    },
    Period1(i){
      return 'Period1'+i
    },
    //杂志影响因子图
    Period(){
      let c=[];
      let a=[];
      for(a of this.accc){
        c.push(a.journalTopHits.searchData[0].journal.ifs)
      }
      let d=[[],[],[],[],[],[],[],[],[],[],]
      for(let i=0;i<c.length+1;i++){
        for(let b in c[i]){
          if(c[i][b]==-1){
            c[i][b]=0
          }
          d[i].push(c[i][b])
        }
        if(d[i]==''){
          d[i]=[0,0,0,0,0,0]
        }
        var echarts1 =[];echarts1= document.getElementById("Period1"+i);
        // 绘制图表
        if(echarts1){
          let myChart = this.echarts.init(echarts1)
          myChart.setOption({
            color: ['#3398DB'],
            tooltip : {
              trigger: 'axis',
              axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
              },
            },
            grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true
            },
            xAxis: {
              type: 'category',
              data: ['2013','2014','2015','2016','2017','2018'],
              
            },  
            yAxis: {
              type: 'value',
              splitLine: {
                show:false
              }
            },
            series : [
              {
                name:'影响因子',
                type:'bar',
                barWidth: '60%',
                data: d[i].reverse(),
                barWidth:7,
                itemStyle:{
                  normal:{
                    label:{
                      show:true,
                      position:"top",
                      textStyle:{
                        color:"#fff",
                        fontSize:12
                      }
                    },
                    color: '#4966AE'
                  }
                }
              }
            ]
          })
        }
      }
      
    },
    //跳转文献搜索页
    toSearch(){
      const {href}=this.$router.resolve({
        path: '/Search',
        query: {
          Search:this.searchContent
        },
      })
      window.open(href,'_blank')
    },
    //输入清空
    clear(){
      this.textarea=""
      this.value=30;this.showlanguage=false;this.showSCI=false;
      this.loading=true;
      this.int1="";this.int2="";this.int3="";this.int4="";
      this.model1="";this.model2="";this.model3="";this.model3="";
      this.checkList1=[];this.checkList2=[];this.checkList3=[];this.checkList4=[];this.checkList5=[];this.checkList6=[];this.checkList7=[];
      this.chk1="";this.chk2="";this.chk3="";this.chk4="";this.chk5="";this.chk6="";this.chk7="";this.chk8="";this.chk9="";this.chk10="";this.chk11="";
      this.inp1="";this.inp2="";this.inp3="";this.inp4="";this.inp5="";this.inp6="";this.inp7="";this.inp8="";this.i=0;this.isAsc1=false;this.isDesc1=false;this.isAsc2=false;this.isDesc2=false;this.isAsc3=false;this.isDesc3=false;
      this.i=0;this.o=0;this.p=0;
      this.show1=true;this.active1=false;this.show2=true;this.active2=false;this.show3=true;this.active3=false;this.show4=true;this.active4=false;this.show5=true;this.active5=false,this.show6=true;this.active6=false;
      this.isAsc1=false;this.isAsc2=false;this.isAsc3=false
      this.currentPage=1
      $('.Search').click()
    },
    //获取路由参数
    getRouterData(){
      this.textarea=this.$route.query.Aquery
    },
    //跳转
    officialUrl(url){
      window.open(url,'_blank')
    },
    //跳转杂志搜索页
    toJournal(nlmId,course){
      const {href}=this.$router.resolve({
        path:'/Journal',
        query:{
          Id:nlmId,Name:course
        }
      })
      window.open(href,'_blank')
    },
    //跳转文献搜索页
    nlmId(id){
      const {href}=this.$router.resolve({
        path:'/Search',
        query:{
          search1:`nlmId:"${id}"`
        }
      })
      window.open(href,'_blank')
    },
    //跳转文献详情页
    toLiterature(pmid){
      const {href}=this.$router.resolve({
        path: '/Literature',
        query: {
          Id:pmid
        },
      })
      window.open(href,'_blank')
    },
    click_item(item) {
      this.searchContent=item;
      var qs=require('qs');
       
      this.axios.post(`/pubmed/searchPubmedJournal/`, qs.stringify({
          queryStringQuery:this.searchContent,
          page:this.currentPage,
          ifsFilter:this.chk1 || this.chk4,
          areaFilter:this.chk2 || this.chk5,
          qClassFilter:this.chk3
        })).then(result=>{
          this.searchPubmedJournal=result.data;
          this.accc=this.searchPubmedJournal.res.journalList.searchData;
          this.result=this.searchPubmedJournal.res.journalList.searchTotal;
          this.timer=this.searchPubmedJournal.res.journalList.searchTime;
          if(!this.result){
            this.el_show=false;
            this.result=0
          }else{
            this.el_show=true
          }
          if(this.searchPubmedArticle.status==200){
            this.loading=false;
          }
        }).catch(error=>{
          if(error){
            throw error
          }
        });
    },
    //返回顶部
    scrollToTop () {
      const that = this
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      that.scrollTop = scrollTop
      if (that.scrollTop > 60) {
        that.btnFlag = true
      } else {
        that.btnFlag = false
      }
    },
    searchkras(){
      this.$router.push({
        path: '/Search',
        query: {
          search1:`tp53`
        },
      })
    },
    searchegfr(){
      this.$router.push({
        path: '/Search',
        query: {
          search1:`kras`
        },
      })
    },
    searchmyc(){
      this.$router.push({
        path: '/Search',
        query: {
          search1:`myc`
        },
      })
    },
    searchtp53(){
      this.$router.push({
        path: '/Search',
        query: {
          search1:`tp53`
        },
      })
    },
    type2(){
      this.q++;
      if(this.q%2==1){
        this.type1=true
        this.type3=false
      }else{
        this.type1=false
        this.type3=true
      }
    },
    influencefactorDown(){
      this.w++;
      if(this.w%2==1){
        this.inpp=true
        this.inpp1=false
      }else{
        this.inpp=false
        this.inpp1=true
      }
      this.checkList1=[];
    },
    yearDown(){
      this.e++;
      if(this.e%2==1){
        this.inpp2=true
        this.inpp3=false
      }else{
        this.inpp2=false
        this.inpp3=true
      }
      this.checkList2=[]
    },
    yearOne(){
      this.loading=true;
      this.i=0;this.o=0;this.p=0;
      this.show1=true;this.active1=false;this.show2=true;this.active2=false;this.show3=true;this.active3=false;this.show4=true;this.active4=false;this.show5=true;this.active5=false,this.show6=true;this.active6=false;
      this.isAsc1=false;this.isAsc2=false;this.isAsc3=false
      var qs=require('qs');
      this.chk5=this.inp3+'-'+this.inp4
      if(this.showSCI==false){
        this.isSci=0
      }{
        this.isSci=1
      }
      if(this.showlanguage==false){
        this.langu='en'
      }else{
        this.langu='zh'
      }
      this.axios.post(`/pubmed/moreLikeThisPubmedArticleJournalAll/`, qs.stringify({
        query:this.textarea,
        page:this.currentPage,
        yearsFilter:this.chk5,
        similarity:this.value,isSci:this.isSci,language:this.langu
      })).then(result=>{
        if((result.data.res.journalList.journalTermsAggs).length==0){
          this.accc=""
        }
        this.searchPubmedJournal=result.data;
        this.accc=this.searchPubmedJournal.res.journalList.journalTermsAggs;
        this.result=this.searchPubmedJournal.res.journalList.journalTotal.journalTotal;
        this.timer=this.searchPubmedJournal.res.journalList.searchTime;
        if(!this.result){
          this.el_show=false;
          this.result=0
        }else{
          this.el_show=true
        }
        if(result.data.status==200){
          this.loading=false;
        }
      }).catch(error=>{
          if(error){
            throw error
          }
        });
    },
    getText(list){
      this.$router.push({
        name: 'Search',
        query: {
          author:`author:"${list}"`
        },
      })
    },
    //页码
    handleCurrentChange: function(currentPage){
      this.loading=true;
      this.currentPage = currentPage;
      var qs=require('qs');
      this.chk1=this.checkList1.join(",");
      this.chk2=this.checkList2.join(",");
      this.chk3=this.checkList3.join(",");
      if(this.showSCI==false){
        this.isSci=0
      }{
        this.isSci=1
      }
      if(this.showlanguage==false){
        this.langu='en'
      }else{
        this.langu='zh'
      }
      this.axios.post(`/pubmed/moreLikeThisPubmedArticleJournalAll/`, qs.stringify({
        query:this.textarea,
        page:this.currentPage,
        ifsFilter:this.chk1 || this.chk4,
        yearsFilter:this.chk2 || this.chk5,
        typeFilter:this.chk3,
        similarity:this.value,isSci:this.isSci,language:this.langu
      })).then(result=>{
        if((result.data.res.journalList.journalTermsAggs).length==0){
          this.accc=""
        }
        this.searchPubmedJournal=result.data;
        this.accc=this.searchPubmedJournal.res.journalList.journalTermsAggs;
        this.result=this.searchPubmedJournal.res.journalList.journalTotal.journalTotal;
        this.timer=this.searchPubmedJournal.res.journalList.searchTime;
        if(!this.result){
          this.el_show=false;
          this.result=0
        }else{
          this.el_show=true
        }
        if(result.data.status==200){
          this.loading=false;
        }
      }).catch(error=>{
          if(error){
            throw error
          }
        });
    },
    
    //搜索框搜索
    searcher(){
      this.loading=true;
      
      this.i=0;this.o=0;this.p=0;
      this.show1=true;this.active1=false;this.show2=true;this.active2=false;this.show3=true;this.active3=false;this.show4=true;this.active4=false;this.show5=true;this.active5=false,this.show6=true;this.active6=false;
      this.isAsc1=false;this.isAsc2=false;this.isAsc3=false
      this.j++;
      this.senior1=false;
      var qs=require('qs');
      if(this.showSCI==false){
        this.isSci=0
      }{
        this.isSci=1
      }
      if(this.showlanguage==false){
        this.langu='en'
      }else{
        this.langu='zh'
      }
      this.axios.post(`/pubmed/moreLikeThisPubmedArticleJournalAll/`, qs.stringify({
        query:this.textarea,
        page:this.currentPage,
        ifsFilter:this.chk1 || this.chk4,
        yearsFilter:this.chk2 || this.chk5,
        typeFilter:this.chk3,
        similarity:this.value,isSci:this.isSci,language:this.langu
      })).then(result=>{
        if((result.data.res.journalList.journalTermsAggs).length==0){
          this.accc=""
        }
        this.searchPubmedJournal=result.data;
        if(JSON.stringify(result.data.res)=="{}"){
          this.accc=''
          this.result=0
          this.timer=0
        }else{
          this.accc=this.searchPubmedJournal.res.journalList.journalTermsAggs;
          this.result=this.searchPubmedJournal.res.journalList.journalTotal.journalTotal;
          this.timer=this.searchPubmedJournal.res.journalList.searchTime;
        }
        if(!this.result){
          this.el_show=false;
          this.result=0
        }else{
          this.el_show=true
        }
        if(result.data.status==200){
          this.loading=false;
        }
      }).catch(error=>{
          if(error){
            throw error
          }
        });
      
    },
    //影响因子
    checkListOne(){
      if(this.inpp==true){
        this.w++;
        this.inpp=false;
        this.inp1="";
        this.inp2='';
        this.inpp1=true;
      }
      this.loading=true;
      this.i=0;this.o=0;this.p=0;
      this.show1=true;this.active1=false;this.show2=true;this.active2=false;this.show3=true;this.active3=false;this.show4=true;this.active4=false;this.show5=true;this.active5=false,this.show6=true;this.active6=false;
      this.isAsc1=false;this.isAsc2=false;this.isAsc3=false
      var qs=require('qs');
      this.chk1=this.checkList1.join(",");
      if(this.showSCI==false){
        this.isSci=0
      }{
        this.isSci=1
      }
      if(this.showlanguage==false){
        this.langu='en'
      }else{
        this.langu='zh'
      }
      this.axios.post(`/pubmed/moreLikeThisPubmedArticleJournalAll/`, qs.stringify({
        query:this.textarea,
        page:this.currentPage,
        ifsFilter:this.chk1 || this.chk4,
        yearsFilter:this.chk2 || this.chk5,
        typeFilter:this.chk3,
        similarity:this.value,isSci:this.isSci,language:this.langu
      })).then(result=>{
        if((result.data.res.journalList.journalTermsAggs).length==0){
          this.accc=""
        }
        this.searchPubmedJournal=result.data;
        this.accc=this.searchPubmedJournal.res.journalList.journalTermsAggs;
        this.result=this.searchPubmedJournal.res.journalList.journalTotal.journalTotal;
        this.timer=this.searchPubmedJournal.res.journalList.searchTime;
        if(!this.result){
          this.el_show=false;
          this.result=0
        }else{
          this.el_show=true
        }
        if(result.data.status==200){
          this.loading=false;
        }
      }).catch(error=>{
          if(error){
            throw error
          }
        });
      
    },
    //出版年份
    checkListTwo(){
      if(this.inpp2==true){
        this.e++;
        this.inpp2=false
        this.inpp3=true
        this.inp3=""
        this.int4=''
      }
      this.loading=true;
      this.i=0;this.o=0;this.p=0;
      this.show1=true;this.active1=false;this.show2=true;this.active2=false;this.show3=true;this.active3=false;this.show4=true;this.active4=false;this.show5=true;this.active5=false,this.show6=true;this.active6=false;
      this.isAsc1=false;this.isAsc2=false;this.isAsc3=false
      var qs=require('qs');
      this.chk2=this.checkList2.join(",");
      if(this.showSCI==false){
        this.isSci=0
      }{
        this.isSci=1
      }
      if(this.showlanguage==false){
        this.langu='en'
      }else{
        this.langu='zh'
      }
      this.axios.post(`/pubmed/moreLikeThisPubmedArticleJournalAll/`, qs.stringify({
        query:this.textarea,
        page:this.currentPage,
        ifsFilter:this.chk1 || this.chk4,
        yearsFilter:this.chk2 || this.chk5,
        typeFilter:this.chk3,
        similarity:this.value,isSci:this.isSci,language:this.langu
      })).then(result=>{
        if((result.data.res.journalList.journalTermsAggs).length==0){
          this.accc=""
        }
        this.searchPubmedJournal=result.data;
        this.accc=this.searchPubmedJournal.res.journalList.journalTermsAggs;
        this.result=this.searchPubmedJournal.res.journalList.journalTotal.journalTotal;
        this.timer=this.searchPubmedJournal.res.journalList.searchTime;
        if(!this.result){
          this.el_show=false;
          this.result=0
        }else{
          this.el_show=true
        }
        if(result.data.status==200){
          this.loading=false;
        }
      }).catch(error=>{
          if(error){
            throw error
          }
        });
    },
    //文献类型
    checkListThree(){
      this.loading=true;
      this.i=0;this.o=0;this.p=0;
      this.show1=true;this.active1=false;this.show2=true;this.active2=false;this.show3=true;this.active3=false;this.show4=true;this.active4=false;this.show5=true;this.active5=false,this.show6=true;this.active6=false;
      this.isAsc1=false;this.isAsc2=false;this.isAsc3=false
      var qs=require('qs');
      this.chk3=this.checkList3.join(",");
      if(this.showSCI==false){
        this.isSci=0
      }{
        this.isSci=1
      }
      if(this.showlanguage==false){
        this.langu='en'
      }else{
        this.langu='zh'
      }
      this.axios.post(`/pubmed/moreLikeThisPubmedArticleJournalAll/`, qs.stringify({
        query:this.textarea,
        page:this.currentPage,
        ifsFilter:this.chk1 || this.chk4,
        yearsFilter:this.chk2 || this.chk5,
        typeFilter:this.chk3,
        similarity:this.value,isSci:this.isSci,language:this.langu
      })).then(result=>{
        if((result.data.res.journalList.journalTermsAggs).length==0){
          this.accc=""
        }
        this.searchPubmedJournal=result.data;
        this.accc=this.searchPubmedJournal.res.journalList.journalTermsAggs;
        this.result=this.searchPubmedJournal.res.journalList.journalTotal.journalTotal;
        this.timer=this.searchPubmedJournal.res.journalList.searchTime;
        if(!this.result){
          this.el_show=false;
          this.result=0
        }else{
          this.el_show=true
        }
        if(result.data.status==200){
          this.loading=false;
        }
      }).catch(error=>{
          if(error){
            throw error
          }
        });
    },
    //自定义影响因子
    customOne(){
      this.loading=true;
      this.i=0;this.o=0;this.p=0;
      this.show1=true;this.active1=false;this.show2=true;this.active2=false;this.show3=true;this.active3=false;this.show4=true;this.active4=false;this.show5=true;this.active5=false,this.show6=true;this.active6=false;
      this.isAsc1=false;this.isAsc2=false;this.isAsc3=false
      var qs=require('qs');
      this.chk4=this.inp1+'-'+this.inp2
      if(this.showSCI==false){
        this.isSci=0
      }{
        this.isSci=1
      }
      if(this.showlanguage==false){
        this.langu='en'
      }else{
        this.langu='zh'
      }
      this.axios.post(`/pubmed/moreLikeThisPubmedArticleJournalAll/`, qs.stringify({
        query:this.textarea,
        page:this.currentPage,
        ifsFilter:this.chk4,
        similarity:this.value,isSci:this.isSci,language:this.langu
      })).then(result=>{
        if((result.data.res.journalList.journalTermsAggs).length==0){
          this.accc=""
        }
        this.searchPubmedJournal=result.data;
        this.accc=this.searchPubmedJournal.res.journalList.journalTermsAggs;
        this.result=this.searchPubmedJournal.res.journalList.journalTotal.journalTotal;
        this.timer=this.searchPubmedJournal.res.journalList.searchTime;
        if(!this.result){
          this.el_show=false;
          this.result=0
        }else{
          this.el_show=true
        }
        if(result.data.status==200){
          this.loading=false;
        }
      }).catch(error=>{
          if(error){
            throw error
          }
        });
    },
    //按照时间长短来查询文献资源
    publishingTime(){
      this.i++;
      this.show2=true;this.active2=false;this.show3=true;this.active3=false;this.show4=true;this.active4=false;this.show5=true;this.active5=false
      this.p=0;
      this.o=0;
      this.isAsc2=false
      this.isAsc3=false
      if(this.i%3==1){
        this.loading=true;
        this.isAsc1=true
        this.show1=false
        this.active1=true
        this.show6=true
        this.active6=false
        this.sort="published-sort_-1"
        var qs=require('qs');
        if(this.showSCI==false){
        this.isSci=0
      }{
        this.isSci=1
      }
      if(this.showlanguage==false){
        this.langu='en'
      }else{
        this.langu='zh'
      }
      this.axios.post(`/pubmed/moreLikeThisPubmedArticleJournalAll/`, qs.stringify({
        query:this.textarea,
        page:this.currentPage,
        ifsFilter:this.chk1 || this.chk4,
        yearsFilter:this.chk2 || this.chk5,
        sort:this.sort,
        typeFilter:this.chk3,
        similarity:this.value,isSci:this.isSci,language:this.langu
      })).then(result=>{
        if((result.data.res.journalList.journalTermsAggs).length==0){
          this.accc=""
        }
        this.searchPubmedJournal=result.data;
        this.accc=this.searchPubmedJournal.res.journalList.journalTermsAggs;
        this.result=this.searchPubmedJournal.res.journalList.journalTotal.journalTotal;
        this.timer=this.searchPubmedJournal.res.journalList.searchTime;
        if(!this.result){
          this.el_show=false;
          this.result=0
        }else{
          this.el_show=true
        }
        if(result.data.status==200){
          this.loading=false;
        }
      }).catch(error=>{
          if(error){
            throw error
          }
        });
      }else if(this.i%3==2){
        this.loading=true;
        this.isAsc1=true
        this.show1=true
        this.active1=false
        this.show6=false
        this.active6=true
        this.sort="published-sort_1"
        var qs=require('qs');
        if(this.showSCI==false){
        this.isSci=0
      }{
        this.isSci=1
      }
      if(this.showlanguage==false){
        this.langu='en'
      }else{
        this.langu='zh'
      }
      this.axios.post(`/pubmed/moreLikeThisPubmedArticleJournalAll/`, qs.stringify({
        query:this.textarea,
        page:this.currentPage,
        ifsFilter:this.chk1 || this.chk4,
        yearsFilter:this.chk2 || this.chk5,
        sort:this.sort,
        typeFilter:this.chk3,
        similarity:this.value,isSci:this.isSci,language:this.langu
      })).then(result=>{
        if((result.data.res.journalList.journalTermsAggs).length==0){
          this.accc=""
        }
        this.searchPubmedJournal=result.data;
        this.accc=this.searchPubmedJournal.res.journalList.journalTermsAggs;
        this.result=this.searchPubmedJournal.res.journalList.journalTotal.journalTotal;
        this.timer=this.searchPubmedJournal.res.journalList.searchTime;
        if(!this.result){
          this.el_show=false;
          this.result=0
        }else{
          this.el_show=true
        }
        if(result.data.status==200){
          this.loading=false;
        }
      }).catch(error=>{
          if(error){
            throw error
          }
        });
      }else if(this.i%3==0){
        this.loading=true;
        this.isAsc1=false
        this.show1=true
        this.active1=false
        this.show6=true
        this.active6=false
        this.sort=""
        var qs=require('qs');
        if(this.showSCI==false){
        this.isSci=0
      }{
        this.isSci=1
      }
      if(this.showlanguage==false){
        this.langu='en'
      }else{
        this.langu='zh'
      }
      this.axios.post(`/pubmed/moreLikeThisPubmedArticleJournalAll/`, qs.stringify({
        query:this.textarea,
        page:this.currentPage,
        ifsFilter:this.chk1 || this.chk4,
        yearsFilter:this.chk2 || this.chk5,
        sort:this.sort,
        typeFilter:this.chk3,
        similarity:this.value,isSci:this.isSci,language:this.langu
      })).then(result=>{
        if((result.data.res.journalList.journalTermsAggs).length==0){
          this.accc=""
        }
        this.searchPubmedJournal=result.data;
        this.accc=this.searchPubmedJournal.res.journalList.journalTermsAggs;
        this.result=this.searchPubmedJournal.res.journalList.journalTotal.journalTotal;
        this.timer=this.searchPubmedJournal.res.journalList.searchTime;
        if(!this.result){
          this.el_show=false;
          this.result=0
        }else{
          this.el_show=true
        }
        if(result.data.status==200){
          this.loading=false;
        }
      }).catch(error=>{
          if(error){
            throw error
          }
        });
      }
    }, 
    //按照影响因子进行升序降序排列
    influenceFactor(){
      this.o++;
      this.show1=true;this.active1=false;this.show2=true;this.active2=false;this.show3=true;this.active3=false;this.show6=true;this.active6=false;
      this.i=0;this.p=0;
      this.isAsc1=false
      this.isAsc3=false
      if(this.o%3==1){
        this.loading=true;
        this.isAsc2=true
        this.show2=false
        this.active2=true
        this.show3=true
        this.active3=false
        this.sort="factor-sort_-1"
        var qs=require('qs');
        if(this.showSCI==false){
        this.isSci=0
      }{
        this.isSci=1
      }
      if(this.showlanguage==false){
        this.langu='en'
      }else{
        this.langu='zh'
      }
      this.axios.post(`/pubmed/moreLikeThisPubmedArticleJournalAll/`, qs.stringify({
        query:this.textarea,
        page:this.currentPage,
        ifsFilter:this.chk1 || this.chk4,
        yearsFilter:this.chk2 || this.chk5,
        sort:this.sort,
        typeFilter:this.chk3,
        similarity:this.value,isSci:this.isSci,language:this.langu
      })).then(result=>{
        if((result.data.res.journalList.journalTermsAggs).length==0){
          this.accc=""
        }
        this.searchPubmedJournal=result.data;
        this.accc=this.searchPubmedJournal.res.journalList.journalTermsAggs;
        this.result=this.searchPubmedJournal.res.journalList.journalTotal.journalTotal;
        this.timer=this.searchPubmedJournal.res.journalList.searchTime;
        if(!this.result){
          this.el_show=false;
          this.result=0
        }else{
          this.el_show=true
        }
        if(result.data.status==200){
          this.loading=false;
        }
      }).catch(error=>{
          if(error){
            throw error
          }
        });
      }else if(this.o%3==2){
        this.loading=true;
        this.isAsc2=true
        this.show2=true
        this.active2=false
        this.show3=false
        this.active3=true
        this.sort="factor-sort_1"
        var qs=require('qs');
        if(this.showSCI==false){
        this.isSci=0
      }{
        this.isSci=1
      }
      if(this.showlanguage==false){
        this.langu='en'
      }else{
        this.langu='zh'
      }
      this.axios.post(`/pubmed/moreLikeThisPubmedArticleJournalAll/`, qs.stringify({
        query:this.textarea,
        page:this.currentPage,
        ifsFilter:this.chk1 || this.chk4,
        yearsFilter:this.chk2 || this.chk5,
        sort:this.sort,
        typeFilter:this.chk3,
        similarity:this.value,isSci:this.isSci,language:this.langu
      })).then(result=>{
        if((result.data.res.journalList.journalTermsAggs).length==0){
          this.accc=""
        }
        this.searchPubmedJournal=result.data;
        this.accc=this.searchPubmedJournal.res.journalList.journalTermsAggs;
        this.result=this.searchPubmedJournal.res.journalList.journalTotal.journalTotal;
        this.timer=this.searchPubmedJournal.res.journalList.searchTime;
        if(!this.result){
          this.el_show=false;
          this.result=0
        }else{
          this.el_show=true
        }
        if(result.data.status==200){
          this.loading=false;
        }
      }).catch(error=>{
          if(error){
            throw error
          }
        });
      }else if(this.o%3==0){
        this.loading=true;
        this.isAsc2=false
        this.show2=true
        this.active2=false
        this.show3=true
        this.active3=false
        this.sort=""
        var qs=require('qs');
        if(this.showSCI==false){
        this.isSci=0
      }{
        this.isSci=1
      }
      if(this.showlanguage==false){
        this.langu='en'
      }else{
        this.langu='zh'
      }
      this.axios.post(`/pubmed/moreLikeThisPubmedArticleJournalAll/`, qs.stringify({
        query:this.textarea,
        page:this.currentPage,
        ifsFilter:this.chk1 || this.chk4,
        yearsFilter:this.chk2 || this.chk5,
        sort:this.sort,
        typeFilter:this.chk3,
        similarity:this.value,isSci:this.isSci,language:this.langu
      })).then(result=>{
        if((result.data.res.journalList.journalTermsAggs).length==0){
          this.accc=""
        }
        this.searchPubmedJournal=result.data;
        this.accc=this.searchPubmedJournal.res.journalList.journalTermsAggs;
        this.result=this.searchPubmedJournal.res.journalList.journalTotal.journalTotal;
        this.timer=this.searchPubmedJournal.res.journalList.searchTime;
        if(!this.result){
          this.el_show=false;
          this.result=0
        }else{
          this.el_show=true
        }
        if(result.data.status==200){
          this.loading=false;
        }
      }).catch(error=>{
          if(error){
            throw error
          }
        });
      }
    },
    //按照相关度进行升序降序排列
    relevant(){
      this.p++;
      this.show1=true;this.active1=false;this.show2=true;this.active2=false;this.show3=true;this.active3=false;this.show6=true;this.active6=false;
      this.i=0;this.o=0;
      this.isAsc1=false
      this.isAsc2=false
      if(this.p%3==1){
        this.loading=true;
        this.isAsc3=true
        this.show4=false
        this.active4=true
        this.show5=true
        this.active5=false
        this.sort="matching-sort_-1"
        var qs=require('qs');
        if(this.showSCI==false){
        this.isSci=0
      }{
        this.isSci=1
      }
      if(this.showlanguage==false){
        this.langu='en'
      }else{
        this.langu='zh'
      }
      this.axios.post(`/pubmed/moreLikeThisPubmedArticleJournalAll/`, qs.stringify({
        query:this.textarea,
        page:this.currentPage,
        ifsFilter:this.chk1 || this.chk4,
        yearsFilter:this.chk2 || this.chk5,
        sort:this.sort,
        typeFilter:this.chk3,
        similarity:this.value,isSci:this.isSci,language:this.langu
      })).then(result=>{
        if((result.data.res.journalList.journalTermsAggs).length==0){
          this.accc=""
        }
        this.searchPubmedJournal=result.data;
        this.accc=this.searchPubmedJournal.res.journalList.journalTermsAggs;
        this.result=this.searchPubmedJournal.res.journalList.journalTotal.journalTotal;
        this.timer=this.searchPubmedJournal.res.journalList.searchTime;
        if(!this.result){
          this.el_show=false;
          this.result=0
        }else{
          this.el_show=true
        }
        if(result.data.status==200){
          this.loading=false;
        }
      }).catch(error=>{
          if(error){
            throw error
          }
        });
      }else if(this.p%3==2){
        this.loading=true;
        this.isAsc3=true
        this.show4=true
        this.active4=false
        this.show5=false
        this.active5=true
        this.sort="matching-sort_1"
        var qs=require('qs');
        if(this.showSCI==false){
        this.isSci=0
      }{
        this.isSci=1
      }
      if(this.showlanguage==false){
        this.langu='en'
      }else{
        this.langu='zh'
      }
      this.axios.post(`/pubmed/moreLikeThisPubmedArticleJournalAll/`, qs.stringify({
        query:this.textarea,
        page:this.currentPage,
        ifsFilter:this.chk1 || this.chk4,
        yearsFilter:this.chk2 || this.chk5,
        sort:this.sort,
        typeFilter:this.chk3,
        similarity:this.value,isSci:this.isSci,language:this.langu
      })).then(result=>{
        if((result.data.res.journalList.journalTermsAggs).length==0){
          this.accc=""
        }
        this.searchPubmedJournal=result.data;
        this.accc=this.searchPubmedJournal.res.journalList.journalTermsAggs;
        this.result=this.searchPubmedJournal.res.journalList.journalTotal.journalTotal;
        this.timer=this.searchPubmedJournal.res.journalList.searchTime;
        if(!this.result){
          this.el_show=false;
          this.result=0
        }else{
          this.el_show=true
        }
        if(result.data.status==200){
          this.loading=false;
        }
      }).catch(error=>{
          if(error){
            throw error
          }
        });
      }else if(this.p%3==0){
        this.loading=true;
        this.isAsc3=false
        this.show4=true
        this.active4=false
        this.show5=true
        this.active5=false
        this.sort=""
        var qs=require('qs');
        if(this.showSCI==false){
        this.isSci=0
      }{
        this.isSci=1
      }
      if(this.showlanguage==false){
        this.langu='en'
      }else{
        this.langu='zh'
      }
      this.axios.post(`/pubmed/moreLikeThisPubmedArticleJournalAll/`, qs.stringify({
        query:this.textarea,
        page:this.currentPage,
        sort:this.sort,
        ifsFilter:this.chk1 || this.chk4,
        yearsFilter:this.chk2 || this.chk5,
        typeFilter:this.chk3,
        similarity:this.value,isSci:this.isSci,language:this.langu
      })).then(result=>{
        if((result.data.res.journalList.journalTermsAggs).length==0){
          this.accc=""
        }
        this.searchPubmedJournal=result.data;
        this.accc=this.searchPubmedJournal.res.journalList.journalTermsAggs;
        this.result=this.searchPubmedJournal.res.journalList.journalTotal.journalTotal;
        this.timer=this.searchPubmedJournal.res.journalList.searchTime;
        if(!this.result){
          this.el_show=false;
          this.result=0
        }else{
          this.el_show=true
        }
        if(result.data.status==200){
          this.loading=false;
        }
      }).catch(error=>{
          if(error){
            throw error
          }
        });
      }
    }
  }
}
</script>
<style scoped>
  @media screen and (min-width:992px){
    .SearchHeadOne{
      width: 15% !important;
      padding-left: 0!important;
      
    }
    .SearchHeadThree{
      width: 15% !important;
    }
    .SearchHeadTwo{
      width: 70% !important;
    }
    .SearchBodyOne{
      padding-left: 0 !important;
    }
  }
  @media screen and (max-width:992px){
    .SearchBodyTwo>ul>li>div>p[data-v-1a1d373c]:nth-child(1){
      width: 80% !important;
    }
    .datas{
      flex-direction: column !important;
    }
    .datas>div:nth-child(2){
      margin-left: 0px !important;
      margin-top: 5px;
    }
    .SearchHeadOne{
      width: 20% !important;
    }
    .SearchBodyOne{
      width: 20% !important;
    }
    .SearchBodyTwo{
      width: 80% !important;
    }
    .SearchBodyThree{
      display: none !important;
    }
  }
  @media screen and (max-width:1200px){
    .datas[data-v-1a1d373c]{
      width: 100% !important;
    }
  }
  @media screen and (max-width:800px){
    .SearchHeadOne>div:first-child>img{
      display: none !important;
    }
    .SearchHeadOne>div:first-child{
      margin: 0 !important;
    }
    .SearchHeadOne>div:first-child>span>span{
      display: none !important;
    }
  }
  @media screen and (max-width:768px){
    .search2{
      display: block !important;
    }
    .SearchBody{
      display:none !important;
    }
    .SearchBodyOne{
      margin-right: 0 !important;
    }
    .SearchBodyTwo{
      margin-right: 0 !important;
    }
    .SearchBodyOne>ul>li>p>span{
      display: none !important;
    }
    .SearchBodyOne>ul>li>p{
      width: 100%;
      text-align: left;
      margin-left: 30%;
    }
    .SearchHeadOne>div:first-child>img{
      display: none !important;
    }
    .SearchHeadOne>div:first-child{
      margin: 0 !important;
    }
    .SearchHeadOne>div:first-child>span>span{
      display: none !important;
    }
    .SearchHeadOne{
      padding: 0 !important;
      text-align: center !important ;
    }
    .el-checkbox-group{
      margin-left: 30% !important;
    }
    .SearchHeadOne{
      justify-content: space-around !important;
    }
    .SearchHeadThree{
      display: none !important;
    }
  }
  @media screen and (max-width:400px){
    .el-checkbox-group{
      margin: 0 !important;
    }
  }
  @media screen and (min-width:1200px){
    .datas>div:nth-child(3)>p>span{
      margin-right: 20px !important;
    }
    .datas[data-v-1a1d373c]{
      width: 100% !important;
    }
    .SearchBody1{
      width: 1200px !important;
    }
    .SearchContent1{
      width: 1200px !important;
    }
  }
  .el-dropdown{
    color: #999;
    line-height: 40px;
  }
  .SearchBackground{
    width: 100%;
    background: #E7EDF9;
    overflow: hidden;
  }
  .SearchBody1{
    width: 100%;
    margin: 0 auto;
    position: relative;
  }
  .SearchHeadBg{
    height: 50px;
    width: 100%;
    line-height: 50px;
    background:linear-gradient(0deg,rgba(45,76,161,1),rgba(78,112,201,1));
  }
  .SearchBody{
    width: 70%;
    height: 153px;
    margin: 39px auto 19px;
    position: relative;

  }
  .SearchBody>span{
    font-size:14px;
    font-family:Source Han Sans CN;
    font-weight:400;
    color:rgba(64,64,64,1);
  }
  .SearchBody>ul{
    position: absolute;
    top: 0;
    left: 80px;
    font-size:14px;
    font-family:Source Han Sans CN;
    font-weight:400;
    text-decoration:underline;
    color:rgba(48,77,153,1);
    display: flex;
    flex-direction: row;
  }
  .SearchBody>ul>li>span{
    margin-left: 20px;
    color:rgba(48,77,153,1);
  }
  .SearchBody>ul>li>span:hover{
    cursor: pointer;
  }
  .SearchBody>p{
    font-size:14px;
    font-family:Source Han Sans CN;
    font-weight:400;
    color:rgba(62,94,181,1);
    margin-top: 20px;
  }
  .SearchBody>p>span:nth-child(2){
    margin-left: 15px;
  }
  .search2{
    width: 100%;
    margin: 40px auto;
    position: relative;
    display: none;
  }
      
  .searchBox1{
    width:80%;
    height:50px;
    background:rgba(255,255,255,1);
    border:1px solid rgba(235,235,235,1);
    border-radius:25px;
    display: flex;
    flex-direction: row;
    margin: 0 auto;
    margin-top: 20px;
    line-height: 50px;
  }
  .searchBox1>input{
    display: inline-block;
    width:45%;
    height:13px;
    font-size:12px;
    font-family:Source Han Sans CN;
    font-weight:400;
    color:rgba(183,183,183,1);
    border: none;
    margin-top: 19px;
    margin-left: 15px;
    outline: none;
  }
  .searchBox1>div:first-child{
    margin-left: 4%;
    cursor: pointer;
    width: 28%
  }
  .el-dropdown{
    width: 100%;
  }
  .xiaLa{
    position: absolute;
    top:50px;
    left: 0px;
    display: none;
    width: 100%;
    background: #fff;
    z-index: 99;
    box-shadow: #f5f5f5 0 0px 6px 0 ;
  }
  .xiaLa>p{
    font-size: 12px;
    line-height: 20px;
    margin: 0;
    color: #999;
    text-align: center
  }
  .xiaLa>p:hover{
    color: #3C61C3;
  }
  .down1{
    display: block !important;
  }
  .searchBox1>div:last-child{
    width:120px;
    height:48px;
    background:rgba(51,102,204,1);
    border-radius:24px;
    margin-left: 17%;
    text-align: center;
    cursor: pointer;
  }
  .searchBox1>div:last-child>span{
    display: inline-block;
    width:25px;
    height:12px;
    font-size:12px;
    font-family:Source Han Sans CN;
    font-weight:400;
    color:rgba(255,255,255,1);
  }
  .SearchBox>div:first-child{
    width: 68%;
    margin-left: 4%;
    cursor: pointer;
    position: relative;
  }
  .SearchBox>div:first-child>span:first-child{
    color: #304D99; 
    font-size: 12px;
    
  }
  .SearchBox>div:first-child>img{
    margin-left:4px;
  }
  .SearchBox{
    width:80%;
    height:50px;
    background:rgba(255,255,255,1);
    border:1px solid rgba(235,235,235,1);
    border-radius:25px;
    display: flex;
    flex-direction: row;
    margin: 0 auto;
    margin-top: 40px;
    line-height: 50px;
  }
  .searchInput>input{
    display: inline-block;
    width:100%;
    height:19px;
    font-size:12px;
    font-family:Source Han Sans CN;
    font-weight:400;
    color:rgba(183,183,183,1);
    border: none;
    margin-top: 13px;
    margin-left: 15px;
    outline: none;
  }
  .SearchBox>div:last-child{
    width:120px;
    height:48px;
    background:rgba(51,102,204,1);
    border-radius:24px;
    margin-left: 10%;
    text-align: center;
    cursor: pointer;
    text-align: center;
    line-height: 48px;
  }
  .SearchBox>div:last-child>span{
    font-size:12px;
    font-family:Source Han Sans CN;
    font-weight:400;
    color:rgba(255,255,255,1);
  }
  /* 设置placeholder的属性，使得各个浏览器兼容 */
  input::-webkit-input-placeholder { 
    /* WebKit browsers */ 
    font-size:12px;
    font-family:Source Han Sans CN;
    font-weight:bold;
    color:rgba(153,153,153,1);
  } 
  input:-moz-placeholder { 
    /* Mozilla Firefox 4 to 18 */ 
    font-size:12px;
    font-family:Source Han Sans CN;
    font-weight:bold;
    color:rgba(153,153,153,1);
  } 
  input::-moz-placeholder { 
    /* Mozilla Firefox 19+ */ 
    font-size:12px;
    font-family:Source Han Sans CN;
    font-weight:bold;
    color:rgba(153,153,153,1);
  } 
  input:-ms-input-placeholder { 
    /* Internet Explorer 10+ */ 
    font-size:12px;
    font-family:Source Han Sans CN;
    font-weight:bold;
    color:rgba(153,153,153,1);
  }
  .SearchContent{
    width:100%;  
    /* background: #F3F3FD;     */
    background:#fff; 
    margin-top: -50px;
  }
  .SearchContent1{
    width: 100%;
    margin: 0 auto;
    height: 50px;
    line-height: 50px;
  }
  .SearchHeadOne{
    display: flex;
    flex-direction: row;
    justify-content: space-between;position: relative;
  }
  .SearchHeadOne>div:first-child{
    margin-left: 21%;
  }
  .SearchHeadOne>div:last-child{
    cursor: pointer;
  }
  .SearchHeadOne>div:first-child>img{
    cursor: pointer;
  }
  .SearchHeadOne>div:first-child>span{
    font-size: 14px;
    color: #fff;
    margin-left: 15px;
    cursor: pointer;
  }
  .el-checkbox-group>span{
    margin-top: 10px;
    margin-left: 30%;
    cursor: pointer;
  }
  /* .el-checkbox-group>span{
    text-align: center;
  } */
  .senior{
    position: absolute;
    left:20px;
    top: 50px;
    z-index: 3;
    width: 300%;
    background: #fff
  }
  .senior>table{
    width: 100%;
  }
  td,th{
    text-align: center;
  }
  .senior>table>thead>tr>th{
    font-size:14px;
    font-family:Source Han Sans CN;
    font-weight:400;
    color:rgba(255,255,255,1);
  }
  .senior>table>thead>tr>th:nth-child(3){
    text-align: right;
    padding-right: 20px;
  }
  
  .senior>table>thead{
    background:linear-gradient(0deg,rgba(45,76,161,1),rgba(78,112,201,1));
    
  }
  .senior>table>tbody>tr:nth-child(1)>td{
    font-size:13px;
    font-family:Source Han Sans CN;
    font-weight:bolder;
    color:rgba(51,51,51,1);
  }
  .el-button{
    margin-left: 10px;
  }
  .senior>table>tbody>tr>td{
    padding:0 5px;
  }
  .SearchHeadTwo{
    padding-left: 10px;
  }
  .SearchHeadTwo>ul{
    display: flex;
    flex-direction: row;
    margin: 0;
  }
  .SearchHeadTwo>ul>li{
    line-height: 50px;
    font-size:14px;
    font-family:Source Han Sans CN;
    font-weight:400;
    color:rgba(255,255,255,1);
    position: relative;
    cursor: pointer;
  }
  .SearchHeadTwo>ul>li>span{
    color: #fff;
    font-size: 12px;
  }
  .SearchHeadTwo>ul>li:nth-child(1)>span{
    position: absolute;
    top: -3px;
    left: 110%;
  }
  .SearchHeadTwo>ul>li:nth-child(1){
    margin-right: 8%;
  }
  .SearchHeadTwo>ul>li:nth-child(1)>span:nth-child(1){
    position: absolute;
    top: -5px;
    left: 110%;
  }
  .SearchHeadTwo>ul>li:nth-child(1)>span:nth-child(2){
    position: absolute;
    top: 3px;
    left: 110%;
  }
  .SearchHeadTwo>ul>li:nth-child(2){
    margin-right: 10%;
  }
  .SearchHeadTwo>ul>li:nth-child(2)>span:nth-child(1){
    position: absolute;
    top: -5px;
    left: 110%;
  }
  .SearchHeadTwo>ul>li:nth-child(2)>span:nth-child(2){
    position: absolute;
    top: 3px;
    left: 110%;
  }
  .SearchHeadTwo>ul>li:nth-child(3)>span:nth-child(1){
    position: absolute;
    top: -5px;
    left: 110%;
  }
  .SearchHeadTwo>ul>li:nth-child(3)>span:nth-child(2){
    position: absolute;
    top: 3px;
    left: 110%;
  }
  .SearchHeadThree{
    text-align: right;
    padding-left: 17px;
  }
  .SearchHeadThree>ul{
    display: flex;
    flex-direction: row;
    justify-content:space-around;
    margin: 0;
  }
  .SearchHeadThree>ul>li{
    margin-right: 10px;
    text-align: center;
  }
  .SearchHeadThree>ul>li>span{
    font-size: 14px;
    color: #fff;
    vertical-align: middle;
    
  }
  .SearchHeadThree>ul>li>img{
    width: 20px;  
    vertical-align: middle;
    cursor: pointer;
  }
  .SearchHead{
    width: 100%;
    background:linear-gradient(0deg,rgba(45,76,161,1),rgba(78,112,201,1));
    height: 50px;
  }
  .SearchBody1{
    width: 100%;
    display: flex;
    flex-direction: row;
    background: #E7EDF9;
  }
  .SearchBodyOne{
    background:rgba(255,255,255,1);
    margin-right: 5px;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    padding-bottom: 50px;
  }
  .SearchBodyOne>ul{
    width: 100%;
    display: flex;
    flex-direction: column;
    text-align: center;
  }
  .SearchBodyOne>ul>li{
    width: 100%
  }
  .SearchBodyOne>ul>li>p{
    display: inline-block;
    margin-top: 20px;
  }
  .SearchBodyOne>ul>li>p>img{
    vertical-align: middle;
    width: 20px;
    height: 18px;
  }
  .SearchBodyOne>ul>li>p>span{
    margin-left: 10px;
    font-size:14px;
    font-family:Source Han Sans CN;
    font-weight:500;
    color:#3366cc;
  }
  .el-checkbox-group{
    display: flex !important ;
    flex-direction: column !important;
    text-align: left;
    margin-left: 40%;
  }
  .el-checkbox{
    margin: 3px 0 !important;
  }
  .el-pagination{
    text-align: center;
  }
  .InputP{
    line-height: 14px;
    margin-top: 5px;
    text-align: left;
    border: 0;
  }
  .InputP>div{
    width: 11px;
    height:1px;
    background:rgba(207,207,207,1);
    margin: 5px 0;
  }
  .InputP>input{
    width:35px;
    height:14px;
    background:rgba(255,255,255,1);
    border:1px solid rgba(207,207,207,1);
    outline: none;
    padding-left: 5px;
    font-size: 12px;
    display: block;
  }
  .InputP>input::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
  .InputP>input::-webkit-outer-spin-button {
    -webkit-appearance: none;
  }
  .InputP>input:nth-child(3){
    margin-bottom: 10px;
  }
  .SearchBodyOne>ul>li:nth-child(3)>span{
    font-size:14px;
    font-family:Source Han Sans CN;
    font-weight:400;
    color:rgba(45,76,161,1);
    margin-left: 30%;
    cursor: pointer;
  }
  .SearchBodyOne>ul>li:nth-child(3)>img{
    cursor: pointer;
  }
  .SearchBodyTwo{
    background:rgba(255,255,255,1);
    margin-right: 5px;
    padding: 8px 15px;
    box-sizing: border-box;
    padding-bottom: 50px;
  }
  .SearchBodyTwo>ul>li>div{
    position: relative; 
    margin-bottom: 30px;
  }
  /* .SearchBodyTwo>div:nth-child(2){
    text-align: center;
    widows: 100px;
    margin: 0 auto;
  }
  .SearchBodyTwo>div:nth-child(3){
    text-align: center;
    widows: 100px;
    margin: 0 auto;
  } */
  .SearchBodyTwo>ul>li>div>p:nth-child(1){
    text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    width:80%;
    font-size:13px;
    font-family:Source Han Sans CN;
    font-weight:500;
    color:rgba(51,51,51,1);
    margin-top: 10px;
  }
  .SearchBodyTwo>ul>li>div>p:nth-child(1):hover{
    cursor: pointer;
    color: #304d99;
  }
  /* .SearchBodyTwo>ul>li>div>div:nth-child(2){
    width:1px;
    height:78px;
    background:rgba(153,153,153,1);
    margin-top: 14px;
    position: absolute;
    top: 35px;
    left: 0;
  } */
  .SearchBodyTwo>ul>li>div>div:nth-child(3){
    border-left: 1px solid #999;
  }
  .SearchBodyTwo>ul>li>div>div:nth-child(3)>div:nth-child(1){
    text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    width:100%;
    font-size:12px;
    font-family:Source Han Sans CN;
    text-decoration:underline;
    color:rgba(102,102,102,1);
    margin-top: 10px;
    margin-left: 2.5%;
  }
  .SearchBodyTwo>ul>li>div>div:nth-child(3)>div:nth-child(1)>span:hover{
    cursor: pointer;
    color:#304d99;
  }
  .datas{
    width: 90%;
    margin-left: 2.5%;
    margin-top: 10px;
    display: flex;
    flex-direction: row;
  }
  .datas>div:first-child{
    display: flex;
    flex-direction: row;
  }
  .datas>div:first-child>div:first-child{
    width:54px;
    height:16px;
    background:rgba(255,255,255,1);
    border: 1px solid #999;
    border-radius:8px;
    text-align: center;
    line-height: 14px;
    margin-right: 5px;
  }
  .datas>div:first-child>div:first-child>span{
    display: inline-block;
    font-size:12px;
    font-family:Source Han Sans CN;
    font-weight:500;
    color:rgba(151,151,151,1);
  }
  .datas>div:first-child>ul{
    height: 16px;
    display: flex;
    flex-direction: row;
    border:1px solid rgba(153,153,153,1);
    border-radius:2px;
    text-align: center;
    font-size:16px;
    font-family:Source Han Sans CN;
    color:rgba(51,51,51,1);
  }
  .datas>div:first-child>ul>li:nth-child(2){
    line-height: 10px;
  }
  .datas>div:first-child>ul>li:nth-child(3){
    line-height: 10px;
  }
  .datas>div:first-child>ul>li:nth-child(1){
    padding: 0 5px;
    background: #fff;
    border-right:1px solid #999999;
    line-height: 10px;
  }
  .datas>div:first-child>ul>li:nth-child(1)>span{
    display: inline-block;
    font-size: 12px;
    font-family: Source Han Sans CN;
    color:#666666;
  }
  .datas>div:first-child>ul>li:nth-child(1)>span:hover{
    color: #304d99;
    cursor: pointer;
  }
  .datas>div:first-child>ul>li:nth-child(2)>span{
    display: inline-block;
    font-size: 12px;
    font-family: Source Han Sans CN;
    color:#666666;
  }
  .datas>div:first-child>ul>li:nth-child(3)>span{
    display: inline-block;
    font-size: 12px;
    font-family: Source Han Sans CN;
    color:#666666;
  }
  .datas>div:first-child>ul>li:nth-child(2){
    line-height: 10px;
    width: 44px;
    background:rgba(238,238,238,1);
    border-right:1px solid #999999;
  }
  .datas>div:first-child>ul>li:nth-child(3){
    line-height: 10px;
    width: 24px;
    background:rgba(238,238,238,1);
  }
  .datas>div:nth-child(2)>p{
    font-size:12px;
    font-family:Source Han Sans CN;
    font-weight:500;
    margin: 0;
    color:rgba(51,51,51,1);
  }
  .datas>div:nth-child(2)>p>span{
    margin-right: 10px;
  }
  .datas>div:nth-child(2){
    margin-left: 2%;
    line-height: 16px;
  }
  .SearchBodyTwo>ul>li>div>div:nth-child(3)>div:nth-child(3){
    text-align: left;
  }
  .SearchBodyTwo>ul>li>div>div:nth-child(3)>div:nth-child(3)>span{
    text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    font-size:13px;
    width: 95%;
    margin-left: 2.5%;
    font-family:Source Han Sans CN-;
    color:rgba(102,102,102,1);
    margin-top: 5px;;
    /* -webkit-transform: scale(0.8) */
  }
  .SearchBodyThree{
    box-sizing: border-box;
    background:rgba(255,255,255,1);
    padding: 17px 15px;;
  }
  .SearchBodyThree>div>p:nth-child(1){
    font-size:14px;
    font-family:Source Han Sans CN;
    color:rgba(51,51,51,1);
    cursor: pointer;
  }
  .SearchBodyThree>div>div{
    width:84px;
    height:1px;
    background:rgba(220,220,220,1);
    font-weight: bold;
    margin-top: 14px;
    margin-bottom: 15px;
  }
  .SearchBodyThree>div>p:nth-child(3){
    font-size:12px;
    font-family:Source Han Sans CN;
    color:rgba(53,84,172,1);
    margin-bottom: 15px;
    cursor: pointer;
    line-height: 20px;
  }  
  .SearchBodyThree>div>p:nth-child(4){
    font-size:12px;
    font-family:Source Han Sans CN;
    color:rgba(53,84,172,1);
    margin-bottom: 15px;
    cursor: pointer;
    line-height: 20px;
  }
  .SearchBodyThree>div>p:nth-child(5){
    font-size:12px;
    font-family:Source Han Sans CN;
    color:rgba(53,84,172,1);
    margin-bottom: 15px;
    cursor: pointer;
    line-height: 20px;
  }
  .SearchBodyThree>div>p:nth-child(6){
    font-size:12px;
    font-family:Source Han Sans CN;
    color:rgba(53,84,172,1);
    margin-bottom: 15px;
    cursor: pointer;
    line-height: 20px;
  }
  .asc{
    color: #25F7D2 !important;
  }
  .desc{
    color: #fff !important;
  }
  .ForeContent{
    width: 100%;
    background: linear-gradient(-120deg, #93A3CE 0%, #7783A8 100%);
    margin-top: 6px;
  }
  .ForeContent>div:nth-child(1){
    width: 100%;
    position: relative;
  }
  .ForeContent>div:nth-child(1)>img{
    width: 100%;
    opacity: 0.8;
  }
  .ForeContent>div:nth-child(1)>ul{
    position: absolute;
    top: 0;
    left: 0;
    padding: 7px 14px;
    display: flex;
    flex-direction: row;
    width: 100%;
    margin-bottom: 0;
  }
  .ForeContent>div:nth-child(1)>ul>li{
    width: 33%;
  }
  .ForeContent>div:nth-child(1)>ul>li:nth-child(2){
    text-align: center;
  }
  .ForeContent>div:nth-child(1)>ul>li:nth-child(2)>p:nth-child(1){
    font-size:18px;
    font-family:Source Han Sans CN;
    font-weight:400;
    color:rgba(255,255,255,1);
    margin: 0;
    line-height: 20px;
    letter-spacing:5px;
  }
  .ForeContent>div:nth-child(1)>ul>li:nth-child(2)>p:nth-child(2){
    font-size:8px;
    font-family:Source Han Sans CN;
    font-weight:300;
    color:rgba(255,255,255,1);
    letter-spacing:2px;
    margin-top: 5px;
    opacity: .8;
  }
  .ForeContent>div:nth-child(1)>ul>li:nth-child(3)>p{
    text-align: right;
    font-size:12px;
    font-family:Source Han Sans CN;
    font-weight:400;
    color:rgba(255,255,255,1);
    letter-spacing:2px;
    margin-top: 3px;
    opacity: .8;
  }
  .ForeContent>div:nth-child(2)>ul{
    margin: 0;
    padding: 5px 14px;
    display: flex;
    flex-direction: row;
    width: 100%;
  }
  .ForeContent>div:nth-child(2)>ul>li{
    
    opacity:0.8;
    border-radius:2px;
    margin-right: 10px;
  }
  .ForeContent>div:nth-child(2)>ul>li>div{
    box-shadow:0px 2px 18px 0px rgba(21,22,34,0.5);
    background:linear-gradient(270deg,#393F53,#3C4357);
    height: 170px;
    padding: 10px 10px 10px 15px;
  }
  .ForeContent>div:nth-child(2)>ul>li:nth-child(1){
    width: 26%;
  }
  .ForeContent>div:nth-child(2)>ul>li:nth-child(1)>div>p{
    font-size:14px;
    font-family:Source Han Sans CN;
    font-weight:400;
    color:rgba(255,255,255,1);
    letter-spacing:2px;
  }
  .Periodical{
    width: 100%;
    display: flex;
    flex-direction: row;
    
  }
  .Periodical>div:nth-child(2){
    width: 50%;
  }
  .Periodical>div:nth-child(1){
    text-align: right;
    margin-right: 10px;
    width: 50%;
  }
  .Periodical>div:nth-child(1)>p{
    font-size:12px;
    font-family:Source Han Sans CN;
    font-weight:400;
    color:rgba(255,255,255,1);
    margin-bottom: 0;
    line-height: 20px;
  }
  .partition>p{
    font-size:14px;
    font-family:Source Han Sans CN;
    font-weight:400;
    color:rgba(255,255,255,1);
    line-height: 20px;
  }
  .part1{
    width: 100%;
    display: flex;
    flex-direction: row;
    margin-top: 40px;
  }
  .part1>div:nth-child(1){
    width: 50%;
    text-align: center;
    line-height: 63px;
  }
  .part1>div:nth-child(2){
    width: 50%;
    line-height: 63px;
    text-align: center;
  }
  .part1>div:nth-child(2){
    font-size:18px;
    font-family:Source Han Sans CN;
    font-weight:400;
    color:rgba(255,255,255,1);
  }
  .part1>div:nth-child(1)>div{
    width:63px;
    height:63px;
    background:linear-gradient(-30deg,rgba(92,101,176,1),rgba(130,130,220,1));
    border-radius:50%;
    margin: 0 auto;
  }
  .part1>div:nth-child(1)>div>p{
    font-size:18px;
    font-family:Source Han Sans CN;
    font-weight:400;
    color:rgba(255,255,255,1);
  }
  .mesh>p{
    font-size:14px;
    font-family:Source Han Sans CN;
    font-weight:400;
    color:rgba(255,255,255,1);
    line-height: 20px;
  }
  .five4{
    width: 100%;
    margin-top: 20px;
    display: flex;
    flex-direction: row
  }
  .five4>div:nth-child(1){
    width: 10%;
  }
  .five4>div:nth-child(1)>div{
    width:6px;
    height:6px;
    background:rgba(237,108,24,1);
    border-radius:50%;
    margin-bottom: 20px;
    margin-top: 4px;
  }
  .five4>div:nth-child(2)>p{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    font-size:12px;
    font-family:Source Han Sans CN;
    font-weight:400;
    color:rgba(255,255,255,1);
    margin: 0;
    line-height: 12px;
    margin-bottom: 14px;
  }
  .five4>div:nth-child(2){
    width: 90%
  }
  .mesh>div{
    width: 100%;
    margin-top: 5px;
  }
  .mesh>div:nth-child(2)>div:nth-child(1)>div{
    background:rgba(237,108,24,1);
  }
  .mesh>div:nth-child(3)>div:nth-child(1)>div{
    background:#F3B407;
  }
  .mesh>div:nth-child(4)>div:nth-child(1)>div{
    background:#13B88B;
  }
  .mesh>div:nth-child(5)>div:nth-child(1)>div{
    background:#5C65B0;
  }
  .mesh>div:nth-child(6)>div:nth-child(1)>div{
    background:#5C65B0;
  }
  .mesh1{
    display: flex;
    flex-direction: row
  }
  .mesh1>div:nth-child(1){
    width: 10%;
  }
  .mesh1>div:nth-child(1)>div{
    width:6px;
    height:6px;
    background:rgba(237,108,24,1);
    border-radius:50%;
    margin-bottom: 15px;
    margin-top: 4px;
  }
  .mesh1>div:nth-child(1)>div:nth-child(1){
    background:rgba(237,108,24,1);
  }
  .mesh1>div:nth-child(2)>p{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    font-size:12px;
    font-family:Source Han Sans CN;
    font-weight:400;
    color:rgba(255,255,255,1);
    margin: 0;
    line-height: 12px;
    margin-bottom: 9px;
  }
  .mesh1>div:nth-child(2){
    width: 90%
  }
  .ForeContent>div:nth-child(2)>ul>li:nth-child(2){
    width: 20%;
  }
  .ForeContent>div:nth-child(2)>ul>li:nth-child(3){
    width: 23%;
  }
  .ForeContent>div:nth-child(2)>ul>li:nth-child(4){
    width: 32%;
    margin-right: 0;
  }
  .ForeContent>div:nth-child(2)>ul>li:nth-child(4)>div>p{
    font-size:14px;
    font-family:Source Han Sans CN;
    font-weight:400;
    color:rgba(255,255,255,1);
    line-height: 20px;
  }
  .perLeft{
    display: flex;
    flex-direction: row;
  }
  .perLeft>div:nth-child(1){
    margin-right: 10px;
    width: 60%;
  }

  .perLeft>div:nth-child(1)>p{
    font-size:12px;
    font-family:Source Han Sans CN;
    font-weight:400;
    color:rgba(255,255,255,1);
    margin:0;
    line-height: 20px;
  }
  .perRight{
    display: flex;
    flex-direction: row;
    text-align: right;
  }
  .perRight>div:nth-child(1){
    margin-right: 10px;
    width: 60%
  }
  .perRight>div:nth-child(2){
    width: 40%
  }
  .perRight>div:nth-child(1)>p{
    font-size:12px;
    font-family:Source Han Sans CN;
    font-weight:400;
    color:rgba(255,255,255,1);
    margin:0;
    line-height: 20px;
  }
  .Country{
    display: flex;
    flex-direction: row;
    padding: 5px 14px;
  }
  .Country>div{
    height: 270px;
    box-shadow:0px 2px 18px 0px rgba(21,22,34,0.5);
    background:linear-gradient(270deg,#393F53,#3C4357);
    margin-right: 10px;
    opacity:0.8;
  }
  .Country>div:nth-child(1){
    width: 52%;
  }
  .Country>div:nth-child(2){
    width: 31%;
  }
  .Country>div:nth-child(3){
    width: 17%;
    margin: 0;
  }
  .country1{
    display: flex;
    flex-direction: row;
    padding: 10px 10px 10px 15px;
  }
  .country1>div:first-child{
    width: 35%;
  }
  .country1>div:first-child>p{
    font-size:14px;
    font-family:Source Han Sans CN;
    font-weight:400;
    color:rgba(255,255,255,1);
  }
  .country1>div:last-child{
    width: 65%;
    line-height: 250px;
  }
  .count1{
    display: flex;
    flex-direction: row;
  }
  .count1>div:first-child{
    width: 30%
  }
  .count1>div:first-child>p{
    font-size:12px;
    font-family:Source Han Sans CN;
    font-weight:400;
    color:rgba(255,255,255,1);
    line-height: 20px;
  }
  .count1>div:last-child{
    width: 70%
  }
  .Countrymen{
    padding: 10px 10px 10px 15px;
  }
  .Countrymen>p{
    font-size:14px;
    font-family:Source Han Sans CN;
    font-weight:400;
    color:rgba(255,255,255,1);
    line-height: 20px;
  }
  .Countrymen>div{
    margin-top: -50px;
  }
  .Countrymen>div>div:first-child{
    width: 55%
  }
  .Countrymen>div>div:first-child>p{
    font-size: 12px;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: rgba(255,255,255,1);
    line-height: 20px;
    text-align: right;
    margin-right: 10px;
  }
  .Countrymen>div>div:last-child{
    width: 45%;
  }
  .first1{
    padding: 10px 10px 10px 15px;
    
  }
  .first1>p{
    font-size:14px;
    font-family:Source Han Sans CN;
    font-weight:400;
    color:rgba(255,255,255,1);
    line-height: 20px;
  }
  .first1>div{
    width: 100%;
    margin-top: 20px;
    position: relative;
  }
  .first1>div>div:nth-child(1){
    width: 20%;
    position: absolute;

  }
  .first1>div>div:nth-child(1)>p{
    font-size:12px;
    font-family:Source Han Sans CN;
    font-weight:400;
    color:rgba(92,101,176,1);
    margin-top: 3px;
  }
  .first1>div>div:nth-child(1)>p:nth-child(4){
    margin-top: -3px;
  }
  .first1>div>div:nth-child(1)>p:nth-child(5){
    margin-top: 20px;
  }
  .first1>div>div:nth-child(1)>p:nth-child(6){
    margin-top: 20px;
  }
  .First{
    width: 76%;
    margin-left: 35px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 8px;
  }
  .First>div:nth-child(1)>p{
    font-size:12px;
    font-family:Source Han Sans CN;
    font-weight:400;
    color:rgba(255,255,255,1);
    margin: 0;
  }
  .First>div:nth-child(1)>p:nth-child(1){
    line-height: 28px
  }
  .First>div:nth-child(1)>p:nth-child(2){
    line-height: 28px
  }
  .First>div:nth-child(1)>p:nth-child(3){
    line-height: 28px
  }
  .First>div:nth-child(2)>p{
    font-size:12px;
    font-family:Source Han Sans CN;
    font-weight:400;
    color:rgba(255,255,255,1);
    margin: 0;
  }
  .First>div:nth-child(2)>p:nth-child(1){
    line-height: 28px
  }
  .First>div:nth-child(2)>p:nth-child(2){
    line-height: 28px
  }
  .First>div:nth-child(2)>p:nth-child(3){
    line-height: 28px
  }
  .foreFoot{
    width: 100%;
    display: flex;
    flex-direction: row;
    padding: 5px 14px;
  }
  .foreFoot>div{
    box-shadow:0px 2px 18px 0px rgba(21,22,34,0.5);
    background:linear-gradient(270deg,#393F53,#3C4357);
    height: 215px;
    padding: 10px 10px 10px 15px;
    margin-right: 10px; 
    opacity: .8;
  }
  .foot1{
    width: 30%;
  }
  .foot1>p{
    font-size:14px;
    font-family:Source Han Sans CN;
    font-weight:400;
    color:rgba(255,255,255,1);
  }
  .foot2{
    width: 35%;
  }
  .foot2>p{
    font-size:14px;
    font-family:Source Han Sans CN;
    font-weight:400;
    color:rgba(255,255,255,1);
  }
  .foot3{
    width: 35%;
    margin-right: 0 !important;
  }
  .foot3>p{
    font-size:14px;
    font-family:Source Han Sans CN;
    font-weight:400;
    color:rgba(255,255,255,1);
  }
  #foot3{
    margin-top: -60px;
  }
  .fiveFoot{
    width: 100%;
    display: flex;
    flex-direction: row;
    padding: 5px 14px;
  }
  .fiveFoot>div{
    box-shadow:0px 2px 18px 0px rgba(21,22,34,0.5);
    background:linear-gradient(270deg,#393F53,#3C4357);
    height: 212px;
    padding: 10px 10px 10px 15px;
    margin-right: 10px; 
    opacity: .8;
  }
  .five1{
    width: 50%;
  }
  .five1>p{
    font-size:14px;
    font-family:Source Han Sans CN;
    font-weight:400;
    color:rgba(255,255,255,1);
  }
  #five1{
    margin-top: -50px; 
  }
  .five2{
    width: 27%;
  }
  .five2>p{
    font-size:14px;
    font-family:Source Han Sans CN;
    font-weight:400;
    color:rgba(255,255,255,1);
  }
  .five3{
    width: 23%;
    margin-right: 0!important;
  }
  .five3>div:nth-child(2)>div:nth-child(1)>div{
    background:rgba(237,108,24,1);
  }
  .five3>div:nth-child(3)>div:nth-child(1)>div{
    background:#F3B407;
  }
  .five3>div:nth-child(4)>div:nth-child(1)>div{
    background:#13B88B;
  }
  .five3>div:nth-child(5)>div:nth-child(1)>div{
    background:#5C65B0;
  }
  .five3>div:nth-child(6)>div:nth-child(1)>div{
    background:#5C65B0;
  }
  .five3>p{
    font-size:14px;
    font-family:Source Han Sans CN;
    font-weight:400;
    color:rgba(255,255,255,1);
    margin-bottom: 20px;
  }
  .five4{
    margin-top: 0;
    margin-bottom: 10px;
  }
  #per2{
    margin-top: -55px;
  }
  #per3{
    margin-top: -55px;
  }
  #per4{
    margin-top: -55px;
  }
  #five2{
    margin-top: -55px;
  }
  .sixFoot{
    width: 100%;
    display: flex;
    flex-direction: row;
    padding: 5px 14px;
  }
  .sixFoot>div{
    box-shadow:0px 2px 18px 0px rgba(21,22,34,0.5);
    background:linear-gradient(270deg,#393F53,#3C4357);
    height: 413px;
    padding: 10px 10px 10px 15px;
    margin-right: 10px; 
    opacity: .8;
  }
  .six1{
    width: 49.5%;
  }
  .six2{
    width: 50.5%;
    margin-right: 0!important;
  }
  .six1>p{
    font-size:14px;
    font-family:Source Han Sans CN;
    font-weight:400;
    color:rgba(255,255,255,1);
    margin-bottom: 20px;
  }
  #six1{
    margin-top: -55px;
  }
  .six2>p{
    font-size:14px;
    font-family:Source Han Sans CN;
    font-weight:400;
    color:rgba(255,255,255,1);
    margin-bottom: 20px;
  }
  .Periodical1{
    width: 100%;
    display: flex;
    flex-direction: row;
  }
  .title3{
    margin: 10px 0 15px 0;
    cursor: pointer;
  }
  .Periodical1Left{
    width: 70%;
  }
  .Periodical1Left>div:nth-child(1){
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin:0 0 20px 0;
  }
  .Periodical1Left>div:nth-child(1)>p:nth-child(1){
    font-size:12px;
    font-family:Source Han Sans CN;
    font-weight:400;
    color:rgba(51,51,51,1);
  }
  .Periodical1Left>div:nth-child(1)>p:nth-child(1)>span:nth-child(3){
    margin-left: 20px;
  }
  .Periodical1Left>div:nth-child(1)>p:nth-child(2){
    font-size:12px;
    font-family:Source Han Sans CN;
    font-weight:400;
    color:rgba(102,102,102,1);
  }
  .Periodical1Left>div:nth-child(1)>p:nth-child(2)>span:last-child{
    margin-left: 20px;
    margin-right: 20px;
  }
  .Periodical1Left>div:nth-child(1)>p:nth-child(2)>span{
    cursor: pointer;
  }
  .Periodical1Left>div:nth-child(1)>p:nth-child(2)>span:hover{
    color:#4E70C9;
  }
  .Periodical1Right{
    width: 30%;
    margin-top: -50px;
  }
  .issn{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    border:1px solid rgba(243,243,253,1);
    border-radius:4px;
    padding: 0 20px;
  }
  .issn>div{
    font-size:13px;
    font-family:Source Han Sans CN;
    font-weight:400;
    color:rgba(51,51,51,1);
  }
  .issn>div>p:first-child{
    margin-top: 5px;padding: 10px 0;
  }
  .issn>div>p:last-child{padding: 10px 0;
  }
  #Period{
    margin-top: -50px;
  }
  .select-panel {
    position: absolute;
    top: 85px;
    height: 0;
    z-index: 999;

  }
  .searchInput{
    display: flex;
    flex-grow: 0;
    flex-shrink: 0;
    box-sizing: border-box;
  }
  .select-item {
    /*height: 0;*/
    z-index: 999;
    background: #fff;
    color: #b7b7b7;
    padding: 0 10px;
  }
  .select-item:hover{
    color: #3d5eb5;
    background: #f3f3fd;
    cursor: pointer;
  }
  .senior>table{
    box-shadow: 3px 3px 5px rgba(244,244,244,1);
  }
  .matching{
    margin-top: 11px;
  }
  .matching>p:first-child{
    font-size:14px;
    font-family:Source Han Sans CN;
    font-weight:400;
    color:rgba(51,51,51,1);
  }
  .el-textarea{
    margin-bottom: 10px !important;
  }
  .matching>p:nth-child(4){
    text-align: right;
    margin: 0;
    margin-top:10px; 
  }
  .march{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    line-height: 38px;
  }
  .march>>>.el-slider{
    width: 40%;
  }
  .march>>>.el-switch{
    margin-top:9px; 
    
  }
  .march>span{
    width: 92px;
  }
  .mess{
    background-color: #fdf6ec;
    border-color: #faecd8;
    min-width: 380px;
    box-sizing: border-box;
    border-radius: 4px;
    position: fixed;
    left: 50%;
    top: 20px;
    transform: translateX(-50%);
    transition: opacity .3s,transform .4s,top .4s;
    overflow: hidden;
    padding: 15px 15px 15px 20px;
    display: flex;
    align-items: center;
    position: fixed;
    top: 20px;
    left: 50%;
    z-index: 999 ;
  }
  .mess>span{
    font-size: 12px;
    vertical-align: middle;
    color: #e6a23c;
  }
  .mess>img{
    vertical-align: middle;
    margin-right: 10px;
  }
  .SearchBody>p{
    font-size: 14px;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: rgba(62,94,181,1);
    margin-top: 20px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
  }
  .SearchBody>p>span:nth-child(2){
    cursor: pointer;
    margin-right: 12.9%;
  }
  .SearchBody>p>span:first-child>span:nth-child(2){
    margin-left: 20px;
  }
</style>