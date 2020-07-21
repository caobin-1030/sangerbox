<template>
  <div >
    <Header></Header>
    <div class="fileselect" v-if="fileselect"  @click="downDiscuoption2">
      <div @click.stop="settingEvent()">
        <Filecom/>
      </div>
    </div>
    <div class="SearchBackground">
      <div class="SearchBody1">
        <div class="search2">
          <div class="searchBox1">
              <input ref="input" @keyup.13="searcher()" v-model="searchContent" type="text" placeholder="你可以输入相关的疾病关键字或者样本特性关键字" onfocus="this.placeholder=''" onblur="this.placeholder='你可以输入相关的疾病关键字或者样本特性关键字'">
            <div @click="searcher1()"><span>搜索</span></div>
          </div>
        </div>
        <div class="SearchBody">
          <span>寻找文献</span>
          <ul>
            <li><span @click="breast">breast cancer</span></li>
            <li><span @click="survival">survival</span></li>
            <li><span @click="single">single call RNA-seq</span></li>
          </ul>
          <div class="SearchBox">
              <input ref="input" @keyup.13="searcher()" v-model="searchContent" type="text" placeholder="你可以输入相关的疾病关键字或者样本特性关键字" onfocus="this.placeholder=''" onblur="this.placeholder='你可以输入相关的疾病关键字或者样本特性关键字'">
            <div @click="searcher1()"><span>搜索</span></div>
          </div>
          
        </div><span @click="Searcher1()" class="Search" style="display:none"></span>
      </div>
      <div class="Searchbody2header">
        <div class="SearchHeader">
          <div><p>数据详情</p></div>
          <div></div>
        </div>
      </div>
      <div class="SearchBodyOne">
        <div class="SearchContent1">
          <div class="contentLeft">
            <div class="Content">
              <p v-if="geoDetails.title!=undefined"><img @click="collection(ID,co1)" :id="ID" class="shoucang" :src="co1==undefined?shoucang1:co1=='1'?shoucang10:shoucang1" :title="co1==undefined?shoucang1:co1=='1'?shoucang11:shoucang2"><span v-html="geoDetails.title"></span></p>
              <p class="contenttop">
                <span>数据集名称：<span @click="toncbi(geoDetails.accession)">{{geoDetails.accession}}</span></span>
                <span>样本数：<span>{{geoDetails.sampleCount}}</span></span>
                <span v-if="len<80">实验类型：<span v-for="(it,i) of geoDetails.platformTypes" :key="i">{{it}}<span v-if="i<geoDetails.platformTypes.length-1">;</span></span></span>
                <!-- <span>物种：<span>{{geoDetails.platformTypes}}</span></span> -->
              </p>
              <span class="shiyan" v-if="len>80">实验类型：<span v-for="(it,i) of geoDetails.platformTypes" :key="i">{{it}}<span v-if="i<geoDetails.platformTypes.length-1">;</span></span></span>
              <div>
                <p>数据平台：</p>
              </div>
            </div>
            <div class="yangbente" v-if="geoDetails.sampleTypesJson!=undefined">
              <p>样本特性：</p>
              <p><span v-for="(item1,i) of geoDetails.sampleTypesJson" :key="i"><span>{{item1}};</span></span></p>
            </div>
            <div class="zaiyao">
              <p>摘要</p>
              <p>{{geoDetails.summary}}</p>
            </div>
            <div class="yangben" v-if="gsmInfomationList!=undefined && gsmInfomationList.length>0">
              <p>样本信息 <span @click="load11">下载样本信息到个人数据中心</span></p>
              <div class="scrolldiv" style="overflow: auto; width: 100%; height:200px;position: relative;table-layout: fixed';line-height:26px;" >
                <table width="100%" height="200" v-if="bb.length>0">
                  <tr style="text-align: center;table-layout:fixed">
                    <td class="fix back" style="padding:0 15px!important;"></td>
                    <td class="fix back">samples</td>
                    <td class="fix back">platformRef</td>
                    <td class="fix back">title</td>
                    <td class="back" v-for="(item,i) of bb" :key="i" style="width:100%;white-space:nowrap">{{item}}</td>
                  </tr>
                  <tr v-for="(item,i) of data1" :key="i">
                    <td class="fix back" style="padding:0 15px;">{{i+1}}</td>
                    <td class="fix"><span class="access" @click="access(item.accession)">{{item.accession}}</span></td>
                    <td class="fix"><span class="access" @click="access(item.platformRef)">{{item.platformRef}}</span></td>
                    <td style="width:100%;white-space:nowrap">{{item.title}}</td>
                    <td v-for="(item1,m) of bb" :key="m" style="width:100%;white-space:nowrap"><p v-if="item.characteristicsJson[item1]!=undefined">{{item.characteristicsJson[item1][0]}}</p></td>
                  </tr>
                </table>
              </div>
            </div>
            <div class="yangbente" v-if="gseRelationList!=undefined">
              <p v-if="a">This SubSeries is part of SuperSeries：</p>
              <table>
                <tr v-for="(item,i) of gseRelationList" :key="i">
                  <td style="padding-right:20px;" v-if="item.relationsType=='SubSeries of'?a=true:''"><span @click="toncbi11(item.relationsTarget)" class="toNcbi1">{{item.relationsTarget.split("/").length>0?item.relationsTarget.split("=").length>1?item.relationsTarget.split("=")[1]:item.relationsTarget.substring(item.relationsTarget.lastIndexOf("\/")+1,item.relationsTarget.length):item.relationsTarget}}</span></td>
                  <td style="padding-left:20px;" v-if="item.relationsType=='SubSeries of'"><span>{{item.title}}</span></td>
                </tr>
              </table>
            </div>
            <div class="yangbente" v-if="gseRelationList!=undefined">
              <p v-if="b">This SuperSeries is composed of the following SubSeries:</p>
              <table>
                <tr v-for="(item,i) of gseRelationList" :key="i">
                  <td style="padding-right:20px;" v-if="item.relationsType=='SuperSeries of'?b=true:''"><span @click="toncbi11(item.relationsTarget)" class="toNcbi1">{{item.relationsTarget.split("/").length>0?item.relationsTarget.split("=").length>1?item.relationsTarget.split("=")[1]:item.relationsTarget.substring(item.relationsTarget.lastIndexOf("\/")+1,item.relationsTarget.length):item.relationsTarget}}</span></td>
                  <td style="padding-left:20px;" v-if="item.relationsType=='SuperSeries of'"><span>{{item.title}}</span></td>
                </tr>
              </table>
            </div>
            <div class="yangbente" v-if="gseRelationList!=undefined">
              <p>Relations：</p>
              <table>
                <tr v-for="(item,i) of gseRelationList" :key="i">
                  <td style="padding-right:20px;" v-if="item.relationsType!='SuperSeries of' && item.relationsType!='SubSeries of'"><span>{{item.relationsType}}</span></td>
                  <td style="padding-left:20px;" v-if="item.relationsType!='SuperSeries of' && item.relationsType!='SubSeries of'"><span @click="toncbi1(item.relationsTarget)" class="toNcbi1">{{item.relationsTarget.split("/").length>0?item.relationsTarget.split("=").length>1?item.relationsTarget.split("=")[1]:item.relationsTarget.substring(item.relationsTarget.lastIndexOf("\/")+1,item.relationsTarget.length):item.relationsTarget}}</span></td>
                </tr>
              </table>
            </div>
            <div class="yangbente" v-if="articleList!=undefined">
              <p>pubmed文章信息：</p>
              <table>
                <tr v-for="(item,i) of articleList" :key="i">
                  <td style="padding-right:30px;"><span class="access" @click="toLiterature(item.PMID)">{{item.PMID}}</span></td>
                  <td style="padding-right:30px;"><span>{{item.title}}</span></td>
                </tr>
              </table>
            </div>
            
            <div class="xiazai">
              <p>
                <el-button type="primary" @click="load" size='mini'>下载数据</el-button>
              </p>
              <table class="mingcheng" v-show="load1">
                <tr>
                  <td>文件名称</td>
                  <td style="text-align: center;">高级会员功能</td>
                  <td>大小</td>
                </tr>
                <tr v-for="(item,i) of filelist" :key="i">
                  <td><span class="filename" @click="downfile(item.fullName,item.location)">{{item.fileName}}</span></td>
                  <td style="text-align: center;"><span class="filename" @click="toperson(item)">>>发送到个人中心</span></td>
                  <td style="font-weight: 400;">{{item.fileSize< (0.1 * 1024)?item.fileSize.toFixed(2) + "B":item.fileSize < (0.1 * 1024 * 1024)? (item.fileSize / 1024).toFixed(2) + "KB":item.fileSize < (0.1 * 1024 * 1024 * 1024) ? (item.fileSize / (1024 * 1024)).toFixed(2) + "MB": (item.fileSize / (1024 * 1024 * 1024)).toFixed(2) + "GB"}}</td>
                </tr>
              </table>
            </div>
            <div class="xiangsi">
              <p>相似数据集列表</p>
              <table >
                <thead>
                  <tr>
                    <td></td>
                    <td>数据集ID</td>
                    <td>数据集描述</td>
                    <td>样本数</td>
                  </tr>
                </thead>
                <tr v-for="(item,i) of data4" :key="i">
                  <td><span>{{i+1}}</span></td>
                  <td><span class="hover" @click="Title(item.accession)">{{item.accession}}</span></td>
                  <td><span class="hover" @click="Title(item.accession)" :title="item.title">{{item.title.length>110?item.title.slice(0,110)+'...':item.title}}</span></td>
                  <td style="text-align: center;"><span>{{item.sampleCount}}</span></td>
                </tr>
              </table>
            </div>
          </div>
          <div class="contentRight">
            <div class="RightContent">
              <div>
                <p>快速分析</p>
                <div class="jiaocheng" @click="toVideoinfo">数据下载和导出视频教程</div>
                <div class="export" v-if="platformIDs!=undefined">
                  <p>数据导出</p>
                  <div>
                    <p v-for="(item,i) of platformIDs" :key="i" @click="dialogVisible(item)">{{i+1}}、{{item}}<img style="width:14px;margin-left:5px;margin-bottom:2px;" src="../../public/img/expot.png" title="导出" alt=""></p>
                    <div class="motai" v-if="vis">
                      <div>
                        <p style="width:100%;margin-bottom:30px;text-align: center">快速导出表达矩阵</p>
                        <p>
                          <p>请选择导出数据列</p>
                          <el-select v-model="exopt1" style="width:538px;margin-bottom:30px;" placeholder="请选择">
                            <el-option style="max-width:538px;"
                              v-for="item in options1"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value">
                            </el-option>
                          </el-select>
                        </p>
                        <p>
                          <p>请选择导出数据ID</p>
                          <el-select v-model="exopt2" style="width:538px;margin-bottom:30px;" placeholder="请选择">
                            <el-option style="width:538px;"
                              v-for="item in options2"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value">
                            </el-option>
                          </el-select>
                        </p>
                        <p>
                          <p>计算方式</p>
                          <el-select v-model="exopt3" style="width:538px;margin-bottom:30px;" placeholder="请选择">
                            <el-option style="max-width:538px;"
                              v-for="item in options3"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value">
                            </el-option>
                          </el-select>
                        </p>
                        <p style="text-align: right">
                          <el-button @click="quxiao()">取 消</el-button>
                          <el-button @click="queding()" type="primary">确 定</el-button>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="export" v-if="platformIDs!=undefined">
                  <p>原始数据导出</p>
                  <div>
                    <p v-for="(item,i) of platformIDs" :key="i" @click="dialogVisible1(item)">{{i+1}}、{{item}}<img style="width:14px;margin-left:5px;margin-bottom:2px;" src="../../public/img/expot.png" title="导出" alt=""></p>
                    <div class="motai" v-if="vis1">
                      <div>
                        <p style="width:100%;margin-bottom:30px;text-align: center">从原始数据开始重新标准化</p>
                        <!-- <p>
                          <p>请选择导出数据列</p>
                          <el-select v-model="exopt1" style="width:538px;margin-bottom:30px;" placeholder="请选择">
                            <el-option style="max-width:538px;"
                              v-for="item in options1"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value">
                            </el-option>
                          </el-select>
                        </p> -->
                        <!-- <p>
                          <p>请选择导出数据ID</p>
                          <el-select v-model="exopt2" style="width:538px;margin-bottom:30px;" placeholder="请选择">
                            <el-option style="max-width:538px;"
                              v-for="item in options2"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value">
                            </el-option>
                          </el-select>
                        </p> -->
                        <p>
                          <p>计算方式</p>
                          <el-select v-model="exopt3" style="width:538px;margin-bottom:30px;" placeholder="请选择">
                            <el-option style="max-width:538px;"
                              v-for="item in options3"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value">
                            </el-option>
                          </el-select>
                        </p>
                        <p style="text-align: right">
                          <el-button @click="quxiao1()">取 消</el-button>
                          <el-button @click="queding1()" type="primary">确 定</el-button>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="fenxi">
                  <p>工具推荐：</p>
                  <div class="fenxi1" @click="toAllTools(9698737)">
                    <span>差异分析</span>
                  </div>
                  <div class="fenxi1" @click="toAllTools(9699250)">
                    <span>预后分析</span>
                  </div>
                  <div class="fenxi1" @click="toAllTools(9703598)">
                    <span>WGCNA</span>
                  </div>
                  <div class="fenxi1" @click="toAllTools(9699582)">
                    <span>GSEA</span>
                  </div>
                  <div class="fenxi1" @click="toAllTools(9702806)">
                    <span>ssGSEA</span>
                  </div>
                  <div class="fenxi1" @click="toAllTools(9698455)">
                    <span>boxplot</span>
                  </div>
                  <div class="fenxi1" @click="toAllTools(9699041)">
                    <span>cluster</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="geren" @click="shujuzhongxin">
      <span>数据中心</span>
    </div>
    <Footer/>
  </div>
</template>
<script>
import Header from '../components/Header'
import Footer from '../components/Footer'
import Filecom from '../components/Filecom'
import html2canvas from 'html2canvas'
import { functiontofindIndexByKeyValue,pako_ungzip,web } from '../../public/js/indexof'

export default {
  metaInfo() {
    return {title: this.geoDetails.title + '-数据搜索'} // set a title
  },
  data() {
    return {
      searchContent:'',result:'',PMID:'',searchJournalData:'',if:[],yearTimeAggs:[],comments:[],journalTypeTop:[],articleDetails:[],authorList:[],addr_show:false,d:0,journal1:'',searchData:[],loading:false,grantsList:[],publicationTypeList:[],zh:false,z:0,
      addrList1:'',authorList2:'',dou:false,Id:'',geoDetails:{},gsmInfomationList:[],bb:[],len:0,load1:false,filelist:[],co1:'',shoucang1:require('../../public/img/shoucang.png'),shoucang2:'收藏',shoucang10:require('../../public/img/shoucangactive.png'),phone:"",shoucang11:"取消收藏",phone:"",articleList:[],gseRelationList:[],platformIDs:[],exopt1:'',options1:[],exopt2:'',options2:[],vis:false,gpl:"",exopt3:'',options3:[{label:"均值",value:1},{label:"中位数",value:2},{label:"最大值",value:3},{label:"最小值",value:4}],a:false,b:false,vis1:false,geoList:[],
      fileselect:false,ID:''
    }
  },
  components:{
    Header,Footer,Filecom
  },
  watch: {
  },
  created(){
    this.phone=localStorage.getItem("mobile")
  },
  computed: {
    data1: {
      get: function(){
        return this.gsmInfomationList; // 在这里把临时对象的值通过计算属性赋值给页面中用到的对象
      }
    },
    data4: {
      get: function(){
        return this.geoList; // 在这里把临时对象的值通过计算属性赋值给页面中用到的对象
      }
    },
  },
  destroyed () {
    
  },
  updated () {
  },
  activated() {
    this.getRouterData()
    this.Searcher1()
    this.existsGene()
    this.xiangsishuju()
  },
  methods: {
    toVideoinfo(){
      const {href}=this.$router.resolve({
        path: '/Videoinfo',
        query:{
          id:'a992f633c93441529603a62b37f24233'
        }
      })
      window.open(href,'_blank')
    },
    toperson(e){
      this.axios.get(`/tools/downloadGeoData`, {
        params:{geoId:this.ID,out:e.fileName},
      }).then(result=>{
        if(result.data.msg=='权限不足'){
          this.$message({
            message: '权限不足，请充值',
            type: 'warning'
          });
        }
      })
    },
    downDiscuoption2(){
      this.fileselect=false
    },
    settingEvent(){},
    shujuzhongxin(){
      this.fileselect=true
    },
    toAllTools(e){
      const {href}=this.$router.resolve({
        path: '/AllTools',
        query:{
          tool_id:e
        }
      })
      window.open(href,'_blank')
    },
    survival(){
      const {href}=this.$router.resolve({
        path: '/VideoInfo',
        query:{
          search1:'survival'
        }
      })
      window.open(href,'_blank')
    },
    breast(){
      const {href}=this.$router.resolve({
        path: '/VideoInfo',
        query:{
          search1:'breast cancer'
        }
      })
      window.open(href,'_blank')
    },
    single(){
      const {href}=this.$router.resolve({
        path: '/VideoInfo',
        query:{
          search1:'single call RNA-seq'
        }
      })
      window.open(href,'_blank')
    },
    Title(a){
      const {href}=this.$router.resolve({
        path: '/Info',
        query: {
          Id:a
        },
      })
      window.open(href,'_self')
    },
    xiangsishuju(){
      this.axios.get(`/pubmed/moreLikeThisPubmedGeo`, {
        params:{accession:this.ID},
      }).then(result=>{
        if(result.data.res.geoList.searchData!=undefined){
          this.geoList=result.data.res.geoList.searchData
        }
      }).catch(error=>{
        if(error){
          throw error
        }
      });
    },
    queding1(){
      this.vis1=!this.vis1
      this.axios.get(`/pubmed/getGeoDataRawexpAuthInfo`, {
        params:{accession:this.ID,gpl:this.gpl,m:this.exopt3},
      }).then(result=>{
      }).catch(error=>{
        if(error){
          throw error
        }
      });
    },
    queding(){
      this.vis=!this.vis
      this.axios.get(`/pubmed/getGeoDataExpAuthInfo`, {
        params:{accession:this.ID,gpl:this.gpl,n:this.exopt1,a:this.exopt2,m:this.exopt3},
      }).then(result=>{
      }).catch(error=>{
        if(error){
          throw error
        }
      });
      
    },
    quxiao(){
      this.vis=!this.vis
    },
    quxiao1(){
      this.vis1=!this.vis1
    },
    dialogVisible(a){
      this.exopt1=""
      this.exopt2=""
      this.exopt3=""
      this.gpl=a
      this.axios.get(`/pubmed/getGeoDataExpInfo`, {
        params:{accession:this.ID,gpl:a},
      }).then(result=>{
        this.geoDetails1=result.data.res
        if(result.data.res.gsmInfomation.columns!=undefined && result.data.res.platformInfomation.columns!=undefined){
          this.gsmInfomation=result.data.res.gsmInfomation.columns
          for(var a of this.gsmInfomation){
            a.label=`${a.Name}:${a.Description}`
            a.value=a.Column
          }this.options1=this.gsmInfomation
          this.platformInfomation=result.data.res.platformInfomation.columns
          for(var b of this.platformInfomation){
            b.label=`${b.Name}:${b.Description}`
            b.value=b.Column
          }this.options2=this.platformInfomation
          this.vis=!this.vis
        }else{
          this.$message({
            message: '注释信息列或数据列为空无法导出！',
            type: 'warning'
          });
        }
      }).catch(error=>{
        if(error){
          throw error
        }
      });
    },
    dialogVisible1(a){
      this.gpl=a
      this.exopt1=""
      this.exopt2=""
      this.exopt3=""
      this.axios.get(`/pubmed/getGeoDataRawexpInfo`, {
        params:{accession:this.ID,gpl:a},
      }).then(result=>{
        if(result.data.res=="no file"){
          this.$message({
          message: '没有原始数据无法导出',
          type: 'warning'
        });
        }else{
          this.geoDetails1=result.data.res
          if(result.data.res.gsmInfomation.columns!=undefined && result.data.res.platformInfomation.columns!=undefined){
            this.gsmInfomation=result.data.res.gsmInfomation.columns
            for(var a of this.gsmInfomation){
              a.label=`${a.Name}:${a.Description}`
              a.value=a.Column
            }this.options1=this.gsmInfomation
            this.platformInfomation=result.data.res.platformInfomation.columns
            for(var b of this.platformInfomation){
              b.label=`${b.Name}:${b.Description}`
              b.value=b.Column
            }this.options2=this.platformInfomation
            this.vis1=!this.vis1
          }else{
            this.$message({
              message: '注释信息列或数据列为空无法导出！',
              type: 'warning'
            });
          }
        }
        
      }).catch(error=>{
        if(error){
          throw error
        }
      });
    },
    toncbi1(a){
      if(a.split("/").length>1){
        window.open(a, '_blank')
      }else{
        window.open(`https://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc=${a}`, '_blank')
      }
    },
    toLiterature(pmid){
      const {href} =this.$router.resolve({
        path: '/Literature',
        query: {
          Id:pmid
        },
      })
      window.open(href, '_blank')
    },
    toncbi11(a){
      const {href} =this.$router.resolve({
        path: '/Info',
        query: {
          Id:a
        },
      })
      window.open(href, '_blank')
    },
    toncbi(a){
      window.open(`https://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc=${a}`,'_blank')
    },
    existsGene(){
      this.axios.get(`/pubmed/existsGeoCollect`,{params:{
        accession:this.ID
      }}).then(result=>{
        this.co1=result.data.res.count
      }).catch(error=>{
        if(error){
          throw error
        }
      });
    },
    collection(id,phone){
      var qs=require('qs');
      if(phone==undefined || phone.length<=0){
        if($(`#${id}`).attr("src")==require("../../public/img/shoucang.png")){
          this.axios.post(`/pubmed/editGeoCollect`, qs.stringify({
            accession:id,
            isCollect:1
          })).then(result=>{
            if(result.data.res.count>0){
              $(`#${id}`).attr("src",require("../../public/img/shoucangactive.png"));
              $(`#${id}`).attr("title",'取消收藏');
            }
          }).catch(error=>{
            if(error){
              throw error
            }
          })
        }else{
          this.$axios.post(`/pubmed/editGeoCollect`, qs.stringify({
            accession:id,
            isCollect:0
          })).then(result=>{
            if(result.data.res.count>0){
              $(`#${id}`).attr("src",require("../../public/img/shoucang.png"));
              $(`#${id}`).attr("title",'收藏');
            }
          }).catch(error=>{
            if(error){
              throw error
            }
          })
        }
      }else if(phone!=undefined || phone.length<=0){
        if($(`#${id}`).attr("src")==require("../../public/img/shoucang.png")){
          this.axios.post(`/pubmed/editGeoCollect`, qs.stringify({
            accession:id,
            isCollect:1
          })).then(result=>{
            if(result.data.res.count>0){
              $(`#${id}`).attr("src",require("../../public/img/shoucangactive.png"));
              $(`#${id}`).attr("title",'取消收藏');
            }
          }).catch(error=>{
            if(error){
              throw error
            }
          })
        }else{
          this.$axios.post(`/pubmed/editGeoCollect`, qs.stringify({
          accession:id,
            isCollect:0
        })).then(result=>{
          if(result.data.res.count>0){
            $(`#${id}`).attr("src",require("../../public/img/shoucang.png"));
            $(`#${id}`).attr("title",'收藏');
          }
        }).catch(error=>{
          if(error){
            throw error
          }
        })
        }
      }
    },
    
    load11(){
      this.axios.get(`/pubmed/getGeoDataSampleAuthInfo`, {
        params:{accession:this.ID},
      }).then(result=>{}).catch(error=>{
        if(error){
          throw error
        }
      });
    },
    downfile(a,b){
      if(b=="local"){
        window.location.href=`http://calculate.mysci.online:9000/pubmed/downloadFile?filePath=${a}`
      }else{
        window.location.href=`ftp://ftp.ncbi.nlm.nih.gov${a}`
      }
    },
    load(){
      this.load1=!this.load1
    },
    access(a){
      window.open(`https://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc=${a}`,'_blank')
    },
    getRouterData(){
      this.ID=this.$route.query.Id
    },
    toInformation(){},
    searcher1(){
      const {href}=this.$router.resolve({
        path: '/Information',
        query: {
          search1:this.searchContent
        },
      })
      window.open(href,'_blank')
    },
    Searcher1(){
      this.axios.get(`/pubmed/getGeoInfo`, {
        params:{accession:this.ID},
      }).then(result=>{
        if(JSON.stringify(result.data.res)!="{}"){
          this.geoDetails=JSON.parse(pako_ungzip(result.data.res)).geoDetails
          this.articleList=this.geoDetails.articleList
          this.platformIDs=this.geoDetails.platformIDs
          this.gseRelationList=this.geoDetails.gseRelationList
          this.len=this.geoDetails.platformTypes.toString().length
          this.filelist=this.geoDetails.geoFileList
        }else{
          this.geoDetails=[]
        }
        if(result.data.status==200){
          this.loading=false;
        }
      }).catch(error=>{
        if(error){
          throw error
        }
      });
      
      this.axios.get(`/pubmed/getGeoSampleCompressInfo`, {
        params:{accession:this.ID},
      }).then(result=>{
        var aa=[]
        if(JSON.stringify(result.data.res)!="{}"){
          this.gsmInfomationList=JSON.parse(pako_ungzip(result.data.res)).gsmInfomationList
          // console.log(this.gsmInfomationList)
          for(var a of this.gsmInfomationList){
            for(var b in a.characteristicsJson){
              aa.push(b)
            }
          }
          function unique (arr) {
            return Array.from(new Set(arr))
          }
          this.bb=unique(aa)
        }else{
          this.gsmInfomationList=[]
          this.show=false
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
    display: flex;
    flex-direction: row;
  }
  .SearchHeader>div:nth-child(2){
    width: 66%
  }
  .SearchHeader>div:nth-child(3){
    width: 17%;
    line-height: 48px; 
  }
  .SearchHeader>div:nth-child(3)>img{
    cursor: pointer;
    width: 20px;
  }
  .SearchHeader>div:nth-child(1){
    width: 200px;
    padding-left: 20px;
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
  .contentLeft{
    width: 80%;
    padding: 10px;
  }
  .contentRight{
    width: 20%;
    background: #E7EDF9;
  }
  .Content>p:first-child{
    font-family: Source Han Sans CN;
    font-weight: 650;
    font-style: normal;
    font-size: 16px;
    text-align: left;
    margin-bottom: 20px;
  }
  .Content>table>tr>td:nth-child(1){
    width: 200px;
    text-align: left;
    vertical-align: top;
    font-family: Source Han Sans CN;
    font-weight: 400;
    font-style: normal;
    font-size: 12px;
    line-height: 18px;
  }
  .Content>table>tr>td:nth-child(2){
    text-align: left;
    font-family: Source Han Sans CN;
    font-weight: 400;
    font-style: normal;
    font-size: 12px;
    line-height: 18px;
  }
  .Content>table>tr>td{
    padding: 3px;
  }
  .Content>table>tr>td>p{
    text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    font-size:13px;
  }
  .RightContent{
    width: 100%;
    margin-left: 10px;
    background: #fff;
    height: 100%;
    padding-top:10px;
  }
  .zaiyao{
    margin-top: 15px;
  }
  .zaiyao>p:nth-child(2){
    margin-top: 10px;
  }
  .yangben>p:nth-child(1){
    margin:15px 0; 
  }
  .yangben>p:nth-child(1)>span{
    font-size: 12px;
    color: #3366cc;
    cursor: pointer;
  }
  .yangben>div>table tr td { border:1px solid #dcdcdc;padding: 0 3px; }
  .yangbente>div>table tr td { border:1px solid #dcdcdc;padding: 0 3px; }
  .access{
    color: #0382d9;
  }
  .access:hover{
    color: #0382d9;
    text-decoration: underline;
    cursor: pointer;
  }
  .filename{
    color: #0382d9;
    cursor: pointer;
    font-weight: 400;
  }
  .filename:hover{
    text-decoration: underline;
  }
  .back{
    background: #eee;
  }
  .fht-cell{width:120px!important;}
  .contenttop{
    display: flex;
    flex-direction: row;
  }
  .contenttop>span{
    margin: 0 10px;
  }
  .contenttop>span>span{
    color: #0382d9;
    text-decoration: underline;
    cursor: pointer;
  }
  .contenttop>span:nth-child(1){
    margin: 0 10px 0 0;
  }
  .shiyan>span{
    color: #0382d9;
    text-decoration: underline;
    cursor: pointer;
  }
  .yangbente{
    margin-top: 15px;
  }
  .yangbente>p:nth-child(1){
    font-family: Source Han Sans CN;
    font-weight: 400;
    font-style: normal;
    font-size: 12px;
    line-height: 12px;
    color: #7F7F7F;
    border-left: 2px solid #7F7F7F;
    padding-left: 10px;
    margin-bottom: 10px;
  }
  .yangbente>p:nth-child(2){
    text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }
  .mingcheng{
    width: 100%;
    margin-top: 20px;
  }
  .mingcheng>tr:nth-child(1){
    background: #eee;
  }
  .mingcheng>tr>td:nth-child(2){
    text-align: right;
  }
  .mingcheng>tr>td{
    padding: 10px 20px;
    font-weight: 600;
  }
  .mingcheng tr td { border:1px solid #dcdcdc}
  .sousuo{
    text-align: right;
  }
  .xiazai>p{
    margin-top: 20px;
  }
  .xiazai>>>.el-button--primary{
    color: #fff;
    background: #3366cc;
    border-color:#3366cc;
  }
  .shoucang{
    vertical-align: middle;
    margin-left: 0px !important;
    margin-right: 8px;
    margin-top: -3px;
    cursor: pointer;
  }
  .RightContent>div>p:nth-child(1){
    font-size:16px;
    font-family:Source Han Sans CN;
    font-weight:400;
    color:rgba(51,51,51,1);
    padding-left: 20px;
    border-left: 2px solid #0382D9;
  }
  .export{
    padding-left: 20px;
    margin-top: 20px;
  }
  .export>p:nth-child(1){
    line-height: 20px;
    margin-bottom: 10px;
  }
  .export>div>p{
    line-height: 20px;
    color: #3366cc;
    cursor: pointer;
  }
  .fenxi{
    margin-left: 20px;
    margin-top: 20px;
  }
  .fenxi>p{
    line-height: 25px;
  }
  .fenxi1{
    width: 94px;
    height: 30px;
    background: #f5f5f5;
    color: #333;
    border-radius: 5px;
    line-height: 30px;
    text-align: center;
    margin: 6px 0;
    
  }
  .toNcbi1{
    color: #0382d9;
  }
  .toNcbi1:hover{
    text-decoration: underline;cursor: pointer;
  }
  .motai{
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    text-align: center;
    z-index: 9998;
  }
  .motai:after {
    content: "";
    display: inline-block;
    height: 100%;
    width: 0;
    vertical-align: middle;
  }
  .motai>div{
    display: inline-block;
    width: 600px;
    padding: 30px;
    padding-bottom: 10px;
    vertical-align: middle;
    background-color: #fff;
    border-radius: 4px;
    border: 1px solid #ebeef5;
    font-size: 18px;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    text-align: left;
    overflow: hidden;
    backface-visibility: hidden;
  }
  .xiangsi>p:nth-child(1){
    margin:15px 0; 
  }
  .jiaocheng{
    margin-left: 20px;
    margin-top: 10px;
    color: #3366cc;
  }
  .jiaocheng:hover{
    cursor: pointer;
  }
  .xiangsi>table{
    width: 100%;
  }
  .hover:hover{
    color: #0382d9;
    cursor: pointer;
  }
  .geren{
    position: fixed;
    bottom: 40px;
    right: 40px;
    width: 60px;
    height: 60px;
    background: #3366cc;
    border-radius: 50%;
    color: #fff;
    font-size: 13px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 0 6px rgba(0,0,0,.12);
    cursor: pointer;
    z-index: 9999;
  }
  .fileselect{
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(153,153,153,.4);
    z-index:88888;
    margin: 0 auto;
  }
  .fileselect>div{
    width: 800px;
    min-height: 750px;
    position: absolute;
    top: 50%;
    left: 30%;
    transform: translate(0, -50%);
    background: #fff;
    z-index: 99999;
    padding: 20px;
  }
  .fenxi1:hover{
    background: #3366cc;
    color: #fff;
    cursor: pointer;
  }
</style>