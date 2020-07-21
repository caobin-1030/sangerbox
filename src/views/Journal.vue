<template>
  <div>
    <Header></Header>
    <div class="pinglun2" v-if="pinglun" @click="downDiscuoption()">
      <div @click.stop="settingEvent()">
        <p>撰写评论</p>
        <el-input v-model="title" placeholder="请输入标题"></el-input>
        <Ue v-on:catchData="catchData" :content='con'/>
        <el-select
          v-model="discu"
          multiple
          filterable
          allow-create
          default-first-option
          placeholder="请选择期刊标签">
          <el-option
            v-for="item in discuoptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-switch
          v-model="visibley"
          active-text="自己可见"
          inactive-text="全部可见">
        </el-switch>
        <el-button @click="cloce()">评论</el-button>
        
      </div>
    </div>
    <div class="SearchBackground">
      <div class="SearchBody1">
        <div class="search2">
          <div class="searchBox1">
              <input ref="input" @keyup.13="searcher1()" v-model="searchContent" type="text" placeholder="在此输入您搜索的内容" onfocus="this.placeholder=''" onblur="this.placeholder='在此输入您搜索的内容'">
            <div @click="searcher1()"><span>搜索</span></div>
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
              <input ref="input" @keyup.13="searcher1()" v-model="searchContent" type="text" placeholder="在此输入您搜索的内容" onfocus="this.placeholder=''" onblur="this.placeholder='在此输入您搜索的内容'">
            <div @click="searcher1()"><span>搜索</span></div>
            
          

          </div><p style="text-align:right;margin-right:13.9%;cursor: pointer;" @click="toContribute()">智能选刊</p>
        </div><span @click="Searcher1()" class="Search" style="display:none"></span>
      </div>
      <div class="Searchbody2header">
        <div class="SearchHeader">
          <div><p>基本信息</p></div>
        </div>
      </div>
      <div class="SearchBodyOne">
        <div class="SearchContent1"  v-loading="loading"
          element-loading-text="拼命加载中"
          element-loading-spinner="el-icon-loading"
          element-loading-background="f5f5f5" id="view">
          <table>
            <tbody class="tableTbody">
              <tr>
                <td>期刊名称</td>
                <td colspan="5" v-if='searchJournalData.fullName!=null'><img @click="collection(searchJournalData.nlmId,nlmIdList)" :id="searchJournalData.nlmId" class="shoucang" :src="nlmIdList==undefined  || nlmIdList.indexOf(searchJournalData.nlmId)==-1?shoucang1:nlmIdList.indexOf(searchJournalData.nlmId)!=-1?shoucang10:shoucang1" :title="nlmIdList==undefined  || nlmIdList.indexOf(searchJournalData.nlmId)==-1?shoucang2:shoucang11">{{searchJournalData.fullName}} ({{searchJournalData.subName}})</td>
                <td colspan="5" v-else>N/A</td>
              </tr>
              <tr>
                <td>ISSN</td>
                <td v-if="searchJournalData.issn!=null">{{searchJournalData.issn}}</td>
                <td v-if="searchJournalData.issn==null"></td>
                <td>ESSN</td>
                <td v-if="searchJournalData.essn!=null">{{searchJournalData.essn}}</td>
                <td v-if="searchJournalData.essn==null">N/A</td>
                <td>是否OA开放访问</td>
                <td v-if="searchJournalData.isOa!=null">{{searchJournalData.isOa}}</td>
                <td v-if="searchJournalData.isOa==null">N/A</td>
              </tr>
              <tr>
                <td>自引率</td>
                <td v-if="searchJournalData.selfCitationRate!=null">{{searchJournalData.selfCitationRate}}</td>
                <td v-else>N/A</td>
                <td>h_index</td>
                <td v-if="hIndex!=null">{{hIndex}}</td>
                <td v-if="hIndex==null">N/A</td>
                <td>即时IF值</td>
                <!-- <td v-if="citedNum!=null && pubTotal!=null">{{(citedNum/pubTotal).toFixed(2)}}</td>
                <td v-if="citedNum==null || pubTotal==null">N/A</td> -->
                <td>八月份计算</td>
              </tr>
              <tr>
                <td>影响因子</td>
                <td colspan="5"><div v-if="searchJournalData.ifs" id="foot2" :style="{width: '600px', height: '300px'}"></div><p v-else>N/A</p></td>
              </tr>
              <tr>
                <td>期刊官方网站</td>
                <td colspan="5" v-if="searchJournalData.officialUrl!=null" @click="toonlinelibrary(searchJournalData.officialUrl)" style="color:#4183C4;cursor: pointer;">{{searchJournalData.officialUrl}}</td>
                <td colspan="5" v-else>N/A</td>
              </tr>
              <tr>
                <td>期刊投稿网址</td>
                <td colspan="5" v-if="searchJournalData.contributeUrl!=null" @click="toonlinelibrary(searchJournalData.contributeUrl)" style="color:#4183C4;cursor: pointer;">{{searchJournalData.contributeUrl}}</td>
                <td colspan="5" v-else>N/A</td>
              </tr>
              <tr>
              </tr>
              <tr>
                <td>涉及的研究方向</td>
                <td colspan="5" v-if="searchJournalData.direction!=null">{{searchJournalData.direction.join('，')}}</td>
                <td colspan="5" v-else>N/A</td>
              </tr>
              <tr>
                <td>杂志方向</td>
                <td  colspan="2" v-if="searchJournalData.subCourse!=null">{{searchJournalData.course}} ({{searchJournalData.qClass}}) - {{searchJournalData.subCourse}}</td>
                <td colspan="2" v-else>N/A</td>
                <td style="border-right:1px solid #fff;">领域</td>
                <td colspan="2" v-if="searchJournalData.territory!=null">{{searchJournalData.territory.join('，')}}</td>
                <td colspan="2" v-else>N/A</td>
              </tr>
              <tr>
                <td>国家/出版地</td>
                <td><span v-if="searchJournalData.countryZh!=null">{{searchJournalData.countryZh}}；</span><span v-else>N/A；</span><span v-if="searchJournalData.pubAddr!=null">{{searchJournalData.pubAddr}}</span><span v-else>N/A</span></td>
                <td style="border-right:1px solid #fff;">出版周期</td>
                <td v-if="searchJournalData.publishingCycle!=null">{{searchJournalData.publishingCycle}}</td>
                <td v-else>N/A</td>
                <td style="border-right:1px solid #fff;">出版年份</td>
                <td v-if="searchJournalData.startYear!=null">{{searchJournalData.startYear}}</td>
                <td v-else>N/A</td>
              </tr>
              <tr>
                <td>科室</td>
                <td colspan="2" v-if="searchJournalData.subject==[]">{{searchJournalData.subject.join(',')}}</td>
                <td colspan="2" v-else>N/A</td>
                <td style="border-right:1px solid #fff;">分类</td>
                <td colspan="2" v-if="searchJournalData.type==[]">{{searchJournalData.type.join(',')}}</td>
                <td colspan="2" v-else>N/A</td>
              </tr>
              <tr>
                <td>年文章数</td>
                <td colspan="5"><div id="per1" :style="{width: '665px', height: '200px'}"></div></td>
              </tr>
              <tr>
                <td>中科院SCI期刊分区</td>
                <td colspan="5" class="zhongke">
                  <table class="sci">
                    <tbody>
                      <tr>
                        <td>大类学科</td>
                        <td>小类学科</td>
                      </tr>
                      <tr>
                        <td class="dalei1">{{searchJournalData.course}}</td>
                        <td class="xiaolei1">
                          <table v-if="typeof(jourcacheNowAreaList)!='undefined' && jourcacheNowAreaList.length>0">
                            <tbody>
                              <tr v-for="(item,i) of data3" :key="i">
                                <td>{{item.subject}}</td>
                                <td>{{item.subjectZh}}</td>
                                <td>{{item.area}}</td>
                              </tr>
                            </tbody>
                          </table>
                          
                        </td>
                      </tr>
                    </tbody>
                    <!-- <div>
                      <p>大类学科</p>
                      <p v-if="searchJournalData.course!=null">{{searchJournalData.course}}</p>
                      <p v-else></p>
                    </div>
                    <div>
                      <p>小类学科</p>
                      <div class="xiaolei" v-for="(item,i) of data3" :key="i">
                        <div>
                          <p>{{item.subject}}</p>
                          <p>{{item.subjectZh}}</p>
                        </div>
                        <div>{{item.area}}</div>
                      </div>
                    </div> -->
                  </table>
                  
                </td>
              </tr>
              <tr>
                <td>平均审稿速度</td>
                <td colspan="2" v-if="searchJournalData.acceptTime!=null">{{searchJournalData.acceptTime}}</td>
                <td colspan="2" v-else>N/A</td>
                <td style="border-right:1px solid #fff;">平均录用比例</td>
                <td colspan="2" v-if="searchJournalData.enterPresent!=null">{{searchJournalData.enterPresent}}</td>
                <td colspan="2" v-else>N/A</td>
              </tr>
              
            </tbody>
          </table>
          <div class="link">
            <div>
              <div class="quizhu">
                <p>一键求助</p>
                <p>
                  <!-- <button @click="collection()"><span>期刊收藏</span></button>  -->
                  <button @click="discuss()"><span>期刊评论</span></button> 
                </p>
              </div>
              <p v-if="journalTypeTop!=undefined">同领域TOP{{journalTypeTop.length}}杂志</p>
              <div><p  @click="SearchTop(item.nlmId,item.course)" v-for="(item,i) of data2" :key="i">{{item.subName}}</p></div>
              <p>PubMed Central (PMC)链接</p>
              <p @click="Science()">Science Citation Index Expanded</p>
              <p>二维码</p>
              <img style="margin-left:20px;" src="../../public/img/wechart.png" alt="">
            </div>
          </div>
        </div>
      </div>
      <div class="Searchbody2header">
        <div class="SearchHeader">
          <div><p>网友投稿经验</p></div>
        </div>
      </div>
      <div class="SearchBodyOne1">
        <div class="SearchContent2">
          <table>
            <tbody>
              <tr v-for="(item,i) of data1" :key="i">
                <td>
                  <p>作者：</p>
                  <p>匿名</p>
                  <p>日期：</p>
                  <p>{{item.share_user.publication_date}}</p>
                </td>
                <td>
                  <p><span>研究方向：</span><span>{{item.comment_content.research_direction}}</span></p>
                  <p><span>投稿周期：</span><span>{{item.comment_content.submission_cycle}}</span></p>
                  <p><span>录用情况：</span><span>{{item.comment_content.employment_situation}}</span></p>
                  <div><p>{{item.comment_content.contribution_experience}}</p></div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <Footer/>
  </div>
</template>
<script>
import Header from '../components/Header'
import Footer from '../components/Footer'
import Ue from '../components/ue'
import html2canvas from 'html2canvas';
export default {
  metaInfo() {
    return {title: this.searchJournalData.fullName + '-期刊搜索'} // set a title
  },
  data() {
    return {
      searchContent:'',result:'',nlmId:'',course:'',searchJournalData:'',if:[],yearTimeAggs:[],comments:[],journalTypeTop:[],hIndex:'',citedNum:'',pubTotal:'',
      loading:false,jourcacheNowAreaList:[],shoucang1:require('../../public/img/shoucang.png'),shoucang2:'收藏',shoucang10:require('../../public/img/shoucangactive.png'),uid:'',pinglun:false,dataContent:'',title:'',discu:[],discuoptions:[],visibley:false,phone:'',shoucang11:'取消收藏',nlmIdList:[],con:''
    }
  },
  components:{
    Header,Footer,Ue
  },
  created(){this.phone=localStorage.getItem("mobile")
  },
  watch: {
    $route: {
      handler: function(val) {
        if(val.path=="/Journal"){
          this.getRouterData()
          this.Searcher1()
        }
      }
    },
    dataContent(val){
      this.con=this.dataContent
    }
  },
  mounted() {
    
    
  },
  computed: {
    data1: {
      get: function(){
        return this.comments; // 在这里把临时对象的值通过计算属性赋值给页面中用到的对象
      }
    },
    data2: {
      get: function(){
        return this.journalTypeTop; // 在这里把临时对象的值通过计算属性赋值给页面中用到的对象
      }
    },
    data3: {
      get: function(){
        return this.jourcacheNowAreaList; // 在这里把临时对象的值通过计算属性赋值给页面中用到的对象
      }
    },
  },
  destroyed () {
    
  },
  updated () {
    this.smootline()
    this.per1()
  },
  activated() {
    this.getRouterData()
    this.Searcher1();
    this.getArticle()
    this.getJourcacheComment()
  },
  methods: {
    toonlinelibrary(url){
      window.open(url,"_block")
    },
    settingEvent(){},
    downDiscuoption(){
      this.pinglun=false
    },
    catchData(data){
      this.dataContent=data
    },
    getJourcacheComment(){
      this.$axios.get(`/pubmed/getJourcacheComment`, {
       params:{ nlmId:this.nlmId}
      }).then(result=>{
        // console.log(result)
        if(result.data.res.articleComment!=undefined && typeof(result.data.res.articleComment)!="{}"){
          // console.log(result.data.res.articleComment.title)
          this.title=result.data.res.articleComment.title
          if(result.data.res.articleComment.isReadAll==1){
            this.visibley=true
          }else{
            this.visibley=false
          }
          this.dataContent=result.data.res.articleComment.content
          var bb=[]
          for(var a of result.data.res.articleComment.label){
            let aa={}
            aa.value=a
            aa.label=a
            bb.push(aa)
          }
          this.discuoptions=bb
          this.discu=result.data.res.articleComment.label
        }
      })
    },
    cloce(){
      this.pinglun=false
      if(this.visibley==false){
        var vis=0
      }else{
        var vis=1
      }
      var sss=this.discu
      var qs=require('qs');
      this.$axios.post(`/pubmed/editJourcacheUserComment`, qs.stringify({
        nlmId:this.nlmId,
        title:this.title,
        content:this.dataContent,
        label:JSON.stringify(sss),
        isReadAll:vis,
        isComment:1
      })).then(result=>{
        if(result.data.res.count>0){
          this.$message({
            message: '评论成功',
            type: 'success'
          });
        }
      }).catch(error=>{
        if(error){
          throw error
        }
      })
    },
    discuss(){
      this.pinglun=true
    },
    getArticle(){
      this.axios.get(`/pubmed/getJourcacheCollects`).then(result=>{
        if(result.data.res.nlmIdList!=undefined){
          this.nlmIdList=result.data.res.nlmIdList
        }else{
          this.nlmIdList=[]
        }
      })
    },
    collection(id,phone){
      // console.log(phone)
      var qs=require('qs');
      if(phone==undefined || phone.length<=0){
        if($(`#${id}`).attr("src")==require("../../public/img/shoucang.png")){
          this.axios.post(`/pubmed/editJourcacheCollect`, qs.stringify({
            nlmId:id,
            isCollect:1
          })).then(result=>{
            // console.log(result.data)
            if(result.data.res.count>0){
              // this.shoucang1=require("../../public/img/shoucangactive.png")
              $(`#${id}`).attr("src",require("../../public/img/shoucangactive.png"));
              this.shoucang2="取消收藏"
            }
          }).catch(error=>{
            if(error){
              throw error
            }
          })
        }else{
          this.$axios.post(`/pubmed/editJourcacheCollect`, qs.stringify({
          nlmId:id,
            isCollect:0
        })).then(result=>{
          // console.log(result.data.res)
          if(result.data.res.count>0){
            $(`#${id}`).attr("src",require("../../public/img/shoucang.png"));
            this.shoucang2="收藏"
          }
        }).catch(error=>{
          if(error){
            throw error
          }
        })
        }
      }else if(phone!=undefined || phone.length<=0){
        if($(`#${id}`).attr("src")==require("../../public/img/shoucang.png")){
          this.axios.post(`/pubmed/editJourcacheCollect`, qs.stringify({
            nlmId:id,
            isCollect:1
          })).then(result=>{
          // console.log(result.data.res)
            if(result.data.res.count>0){
              // this.shoucang1=require("../../public/img/shoucangactive.png")
              $(`#${id}`).attr("src",require("../../public/img/shoucangactive.png"));
              this.shoucang2="取消收藏"
            }
          }).catch(error=>{
            if(error){
              throw error
            }
          })
        }else{
          this.$axios.post(`/pubmed/editJourcacheCollect`, qs.stringify({
            nlmId:id,
            isCollect:0
          })).then(result=>{
            // console.log(result.data.res)
            if(result.data.res.count>0){
              $(`#${id}`).attr("src",require("../../public/img/shoucang.png"));
              this.shoucang2="收藏"
            }
          }).catch(error=>{
            if(error){
              throw error
            }
          })
        }
      }
    },
    toContribute(){
      const {href}=this.$router.resolve({
        path: '/Contribute'
      })
      window.open(href,'_blank')
    },
    Science(){
      let url=`https://www.ncbi.nlm.nih.gov/nlmcatalog/?term=${this.nlmId}`
      window.open(url,'_blank')
    },
    SearchTop(d,f){
      this.$router.push({
        path:'/Journal',
        query:{
          Id:d,Name:f
        }
      })
    },
    per1(){
      let b=[];let c=[];let d=[];
      for(let a of this.yearTimeAggs){
        b.push(a.name)
        c.push(a.count)
        d.push(a.chinaAggs.chinaAggs)
      }
      var echarts1 = document.getElementById("per1");
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
          legend: {
            data:['发表总量','中国发表'],
            x:'right',
            textStyle: {fontSize:12},
            itemGap: 5,
          },
          grid: {
            left: '10%',
            top:'15%',
          },
          xAxis: {
            type: 'category',
            data:b,
            axisLine: {
              show:false
            },
            axisTick:{
              show:false
            }
          },  
          yAxis: {
            type: 'value',
            axisLine: {
              show:false
            },
            splitLine: {
              show:false
            },
            axisTick:{
              show:false
            },
          },
          series : [
            {
              name:'中国发表',
              type:'bar',
              stack: '总量',
              data:d,
              barWidth:'60%',
              barWidth:10,
              itemStyle:{
                normal:{
                  color:'rgba(51,102,204,1)' 
                }
              },
            },
            {
              name:'发表总量',
              type:'bar',
              stack: '总量',
              data:c,
              barWidth:'60%',
              barWidth:10,
              itemStyle:{
                normal:{
                  color:'#F3F3FD',
                }
              },
              

            },
          ]
        })
      }
    },
    searchkras(){
      const {href}=this.$router.resolve({
        path: '/Search',
        query:{
          search1:`kras`
        }
      })
      window.open(href,'_blank')
    },
    searchegfr(){
      const {href}=this.$router.resolve({
        path: '/Search',
        query:{
          search1:`egfr`
        }
      })
      window.open(href,'_blank')
    },
    searchmyc(){
      const {href}=this.$router.resolve({
        path: '/Search',
        query:{
          search1:`myc`
        }
      })
      window.open(href,'_blank')
    },
    searchtp53(){
      const {href}=this.$router.resolve({
        path: '/Search',
        query:{
          search1:`tp53`
        }
      })
      window.open(href,'_blank')
    },
    smootline(){
      let c=[];
      for(let a in this.if){
        c.push(this.if[a])
      }
      c.reverse()
      var echarts1 = document.getElementById("foot2");
      // 绘制图表
      if(echarts1){
        let myChart = this.echarts.init(echarts1)
        myChart.setOption({
          tooltip : {
          trigger: 'axis',
            axisPointer: {
              type: 'cross',
              label: {
                backgroundColor: '#6a7985'
              }
            }
          },
          xAxis: {
            type: 'category',
            data: ['2013','2014','2015','2016','2017','2018','2019']
          },  
          yAxis: {
            type: 'value',
            axisLine: {
              show:false
            },
            axisLabel : {
            },
            splitLine: {
              lineStyle: {
                color: '#63659F',
                type:'dashed'
              }
            }
          },
          series: [
            {
            name:'IF',
            data: c,
            type: 'line',
            smooth: true,
            itemStyle:{
              color:'rgba(51,102,204,1)'
            },
            lineStyle:{
              color:'rgba(51,102,204,1)'
            },
          }
          ]
        })
      }
    },
    getRouterData(){
      this.nlmId=this.$route.query.Id
      this.course=this.$route.query.Name
      if(this.course==null){
        this.course=''
      }else if(this.course==undefined){
        this.course=''
      }
    },
    searcher1(){
      const {href}=this.$router.resolve({
        path: '/SearchJournal',
        query:{
          search1:this.searchContent
        }
      })
      window.open(href,'_blank')
    },
    Searcher1(){
      this.loading=true
      var qs=require('qs');
      this.axios.post(`/pubmed/getPubmedJournalId`, qs.stringify({
        journalId:this.nlmId,
        typeTop:this.course
      })).then(result=>{
        // console.log(result.data.res)
        if(JSON.stringify(result.data.res)!='{}' && result.data.res!=undefined){
          this.jourcacheNowAreaList=result.data.res.journalDetails.searchData[0].jourcacheNowAreaList;
          this.searchJournalData=result.data.res.journalDetails.searchData[0];
          if(typeof(result.data.res.journalDetails.searchData[0].jourcacheScience)!='undefined'){
            this.hIndex=result.data.res.journalDetails.searchData[0].jourcacheScience.hIndex
            this.citedNum=result.data.res.journalDetails.searchData[0].jourcacheScience.citedNum
            this.pubTotal=result.data.res.journalDetails.searchData[0].jourcacheScience.pubTotal
          }else{
            this.hIndex=""
            
            this.citedNum=""
            this.pubTotal=""
          }
          this.journalTypeTop=result.data.res.journalTypeTop.searchData
          this.comments=this.searchJournalData.comments
          this.if=this.searchJournalData.ifs;
          this.yearTimeAggs=result.data.res.articleYearAggs.nearly12YearsAggs[0].yearTimeAggs
        }else{
          this.jourcacheNowAreaList=""
          this.searchJournalData=""
          this.journalTypeTop=[]
          this.comments=""
          this.yearTimeAggs=""
        }
        
        if(result.data.status==200){
          this.loading=false
        }
      })
    }
  },
}
</script>
<style scoped>
  @media screen and (min-width:992px){
    .SearchBodyOne{
      padding-left: 0 !important;
    }
  }
  @media screen and (max-width:992px){
    .SearchBodyOne{
      width: 20% !important;
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
    
    .SearchBodyOne>ul>li>p>span{
      display: none !important;
    }
    .SearchBodyOne>ul>li>p{
      width: 100%;
      text-align: left;
      margin-left: 30%;
    }
  }
  @media screen and (min-width:1200px){
    .SearchBody1{
      width: 1200px !important;
    }
    .SearchContent1{
      width: 1200px !important;
    }
    .SearchContent2{
      width: 1200px !important;
    }
    .SearchHeader{
      width: 1200px !important;
    }
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
    margin: 39px auto 30px;
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
    margin-top: 13px;
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
    width: 60px;
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
    line-height: 50px;
    margin-top: 30px;
    line-height: 50px;
  }
  .SearchBox>input{
    display: inline-block;
    width:60%;
    height:19px;
    font-size:12px;
    font-family:Source Han Sans CN;
    font-weight:400;
    color:rgba(183,183,183,1);
    border: none;
    margin-top: 13px;
    margin-left: 30px;
    outline: none;
  }
  .SearchBox>div:last-child{
    width:120px;
    height:50px;
    background:rgba(51,102,204,1);
    border-radius:24px;
    margin-left: 21%;
    text-align: center;
    cursor: pointer;
    text-align: center;
    line-height: 50px;
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
  .Searchbody2header{
    width: 100%;
    height:48px;
    background:linear-gradient(0deg,rgba(45,76,161,1),rgba(78,112,201,1));
    position: relative;
    z-index: 99;
  }
  .SearchHeader{
    width: 100%;
    margin: 0 auto;
  }
  .SearchHeader>div{
    width: 166px;
    text-align: center;
    font-size:14px;
    font-family:Source Han Sans CN;
    font-weight:400;
    line-height: 48px;
    color:rgba(255,255,255,1);
  }
  .SearchHeader>div>p{
    margin: 0;
  }
  .SearchBodyOne{
    width: 100%;
    background: #fff;
  }
  .SearchContent1{
    width: 100%;
    margin: 0 auto;
    display: flex;
    flex-direction: row;
  }
  .SearchContent1>table{
    width: 80%;
  }
  .SearchContent1>div{
    width: 20%;
  }
  table tbody tr td { border:1px solid rgba(243,243,253,1); }
  .tableTbody>tr>td{
    width: 16.6%;
    padding: 14px 
  }
  .sci{
    width: 100%;
    
  }
  .sci>tbody>tr>td{
    padding: 5px;
  }
  .sci>tbody>tr:nth-child(1)>td{
    text-align: center;
  }
  .zhongke{
    padding: 0 !important;
  }
  .xiaolei1{
    padding: 0 !important;
  }
  .xiaolei1>table{
    text-align: center;
    width: 100%;
  }
  .xiaolei1>table>tbody>tr>td{
    padding: 5px;
  }
  /* .sci{
    display: flex;
    flex-direction: row;
  }
  .sci>div:nth-child(1){
    width: 30%;
    text-align: center;
  }
  .sci>div:nth-child(1)>p:nth-child(2){
  }
  .sci>div:nth-child(2){
    width: 40%;
  }
  .sci>div:nth-child(2)>p{
    text-align: center
  } */
  .link{
    background:#E7EDF9;
    overflow: hidden;
  }
  .link>div{
    background: #fff;
    margin-left: 10px;
    width: 100%;
    height: 100%;
    padding-top: 20px;
  }
  .link>div>p:nth-child(2){
    font-size:14px;
    font-family:Source Han Sans CN;
    font-weight:400;
    color:rgba(51,51,51,1);
    padding-left: 20px;
    border-left: 2px solid #0382D9;
  }
  .link>div>p:nth-child(4){
    font-size:14px;
    font-family:Source Han Sans CN;
    font-weight:400;
    color:rgba(51,51,51,1);
    padding-left: 20px;
    border-left: 2px solid #0382D9;
  }
  .link>div>div:nth-child(3)>p{
    font-size:12px;
    font-family:Source Han Sans CN;
    font-weight:400;
    color:rgba(0,151,255,1) !important;
    cursor: pointer;
    margin-left: 20px;
  }
  .link>div>div:nth-child(3)>p:hover{
    text-decoration: underline;
  }
  .link>div>p:nth-child(5){
    font-size:12px;
    font-family:Source Han Sans CN;
    font-weight:400;
    color:rgba(0,151,255,1) !important;
    cursor: pointer;
    margin-left: 20px;
  }
  .link>div>p:nth-child(6){
    font-size:14px;
    font-family:Source Han Sans CN;
    font-weight:400;
    color:rgba(51,51,51,1);
    padding-left: 20px;
    border-left: 2px solid #0382D9;
  }
  .SearchBodyOne1{
    width: 100%;
    background: #fff;
  }
  .SearchContent2{
    width: 100%;
    margin: 0 auto;
    display: flex;
    flex-direction: row;
  }
  .SearchContent2>table{
    width: 100%;
  }
  .SearchContent2>table>tbody>tr>td:nth-child(1){
    width: 15.5% ;
    text-align: left;
    padding-left: 35px;
  }
  .SearchContent2>table>tbody>tr>td:nth-child(2){
    width: 80%;
    padding-left: 20px;
    padding: 20px;
  }
  .SearchContent2>table>tbody>tr>td:nth-child(2)>div:nth-child(4){
    border-top: 1px solid #dcdcdc;
    padding-top: 10px;
  }
  .tableTbody>tr>td:nth-child(1){
    width: 17%;
    text-align: center;
  }
  .xiaolei{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .xiaolei>div>p{
    margin: 0
  }
  .dalei1{
    text-align: center;
  }
  .shoucang{
    vertical-align: middle;
    margin-right: 8px;
    margin-top: -3px;
    cursor: pointer;
  }
  .pinglun2{
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    text-align: center;
    background: rgba(153,153,153,.4);
    z-index:2153
  }
  .pinglun2>div{
    width: 800px;
    height: 560px;
    position: absolute;
    top: 50%;
    left: 30%;
    transform: translate(0, -50%);
    background: #fff;
    z-index: 2154;text-align: right
  }
  .pinglun2>div>p{
    text-align: left;
    padding: 10px;
    margin: 0;
  }
  .pinglun2>div>button{
    margin-top: 10px;
    margin-right: 20px;
  }
  .pinglun2>div>.el-input{
    text-align: center;
    width: 95%;
    margin-bottom: 10px;
    margin-right: 20px;
  }
  .pinglun2>div>.el-select{
    text-align: center;
    width: 95%;
    margin: 20px 20px 10px 0;
  }
  .pinglun2>div>.el-switch{
    margin-right: 30px;
  }
  .quizhu>p>button{
    background:rgba(245,245,245,1);
    border-radius:2px;
    color:rgba(51,51,51,1);
    font-size:12px;
    border: none;
    outline: none;
    height:29px;
    text-align: center;
    line-height: 29px;
    margin: 10px 1px;
  }
  .quizhu>p>span{
    color: #0382D9;
    font-size: 12px;
    font-weight: 500;
    text-decoration: none;
  }
  .quizhu>p>span:hover{
    cursor: pointer;
  }
  .quizhu>p{
    padding-left: 20px;
    line-height: 15px;
  }
  .quizhu>p:nth-child(1){
    border-left: 2px solid #0382D9;
  }
</style>