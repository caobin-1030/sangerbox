<template>
  <div >
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
          placeholder="请选择文章标签">
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
              <input ref="input" @keyup.13="searcher()" v-model="searchContent" type="text" placeholder="在此输入您搜索的内容" onfocus="this.placeholder=''" onblur="this.placeholder='在此输入您搜索的内容'">
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
              <input ref="input" @keyup.13="searcher()" v-model="searchContent" type="text" placeholder="在此输入您搜索的内容" onfocus="this.placeholder=''" onblur="this.placeholder='在此输入您搜索的内容'">
            <div @click="searcher1()"><span>搜索</span></div>
          </div><p style="text-align:right;margin-right:13.9%;cursor: pointer;" @click="toContribute()">智能选刊</p>
        </div><span @click="Searcher1()" class="Search" style="display:none"></span>
      </div>
      <div class="Searchbody2header">
        <div class="SearchHeader">
          <div><p>文献详情</p></div>
          <div></div>
          <div><img src="../../public/img/translate.png" @click="translate()" alt="翻译" title="翻译"></div>
        </div>
      </div>
      <div class="SearchBodyOne">
        <div class="SearchContent1" v-if="articleDetails.length!={}">
          <div class="contentLeft">
            <div class="leftTop">
              <p v-if="!zh"><img @click="collection(articleDetails.PMID,pmidList)" :id="articleDetails.PMID" class="shoucang" :src="pmidList==undefined || pmidList.indexOf(articleDetails.PMID)==-1?shoucang1:shoucang10" :title="pmidList==undefined || pmidList.indexOf(articleDetails.PMID)==-1?shoucang2:shoucang11" alt="取消收藏"><span v-html="articleDetails.title"></span></p>
              <p v-if="zh"><img @click="collection(articleDetails.PMID,pmidList)" :id="articleDetails.PMID" class="shoucang" :src="pmidList==undefined || pmidList.indexOf(articleDetails.PMID)==-1?shoucang1:shoucang10" :title="pmidList==undefined || pmidList.indexOf(articleDetails.PMID)==-1?shoucang2:shoucang11" alt="取消收藏"><span v-html="articleDetails.titleZh"></span></p>
              <div>
                <span v-if="journal1.subName!=null">杂志名称:</span><span @click="toSearchJour(journal1.subName)">{{journal1.subName}}</span><span v-if="journal1.subName==null"></span>
                <span v-if="journal1.nowIfs!=null">影响因子:</span><span>{{journal1.nowIfs}}</span><span v-if="journal1.nowIfs==null"></span>
                <span v-if="articleDetails.PMID!=null">PMID:</span><span @click="Science(articleDetails.PMID)">{{articleDetails.PMID}}</span><span v-if="articleDetails.PMID==null"></span>
                <span v-if="articleDetails.doi!=null">DOI:</span><span @click="Doi(articleDetails.doi)">{{articleDetails.doi}}</span><span v-if="articleDetails.doi==null"></span>
                <span v-if="articleDetails.pubTime!=null && articleDetails.volume!=null"></span><span @click="PubTime(articleDetails.pubTime)">{{articleDetails.pubTime}};</span><span @click="Volume(articleDetails.volume)">{{articleDetails.volume}}:</span><span @click="Pagination(articleDetails.pagination)">{{articleDetails.pagination}}</span>
                <span v-if="articleDetails.pubTime==null && articleDetails.volume==null"></span>
              </div>
              <div>
                <span v-for="(item,i) of data1" :key="i" @click="Author(item)"><span><span>{{item.lastName}}</span> <span>{{item.initials}}</span></span><sup>{{item.index}}</sup><i v-if="i===data1.length-1?dou:!dou">，</i></span>
              </div>
              <div>
                <p @click="AddrShow()"><img src="../../public/img/xq.png" alt=""><span> Author information</span></p>
                <div v-show="addr_show">
                  <ul >
                    <li style="display:flex;flex-direction: row" v-for="(item,i) of data2" :key="i">
                      <p style="margin-right:5px;">{{item.index}}</p><p>{{item.addr}}</p>
                    </li>
                  </ul>
                </div>
              </div>
              <div>
                <p><img src="../../public/img/xq.png" alt=""><span>Content</span></p>
                <p v-if="!zh" style="white-space: pre-line;" v-html="articleDetails.abstractText"></p>
                <p v-if="zh" style="white-space: pre-line;" v-html="articleDetails.abstractTextZh"></p>
              </div>
              <div>
                <p>关键词</p>
                <span v-for="(item,i) of data3" :key="i" @click="KeyWord(item.name,item.majorTopic)">
                  <span v-if="item.majorTopic=='Y'">{{item.name}}*，</span>
                  <span v-else>{{item.name}}，</span>
                </span>
              </div>
              
            </div>
            <div class="leftBottom" v-loading="loading"
              element-loading-text="拼命加载中"
              element-loading-spinner="el-icon-loading"
              element-loading-background="f5f5f5">
              <p>相似文章</p>
              <ul>
                <li v-for="(item,i) of data4" :key="i">
                  <p>
                    <span>{{item.pubTime}}</span>
                    <span>{{item.journal.subName}}：{{item.journal.nowIfs}}</span>
                    <span v-if="!zh" @click="Title(item.PMID)">{{item.title}}</span>
                    <span v-if="zh" @click="Title(item.PMID)">{{item.titleZh}}</span>
                  </p>
                </li>
              </ul>
              <p @click="More()">查看更多</p>
            </div>
          </div>
          <div class="contentRight">
            <div class="RightContent">
              <div>
                <p>下载文章</p>
                <p>
                  <button @click="downLoad1(articleDetails.doi==null?articleDetails.PMID:articleDetails.doi)"><span>地址一</span></button> 
                  <button @click="downLoad2(articleDetails.doi==null?articleDetails.PMID:articleDetails.doi)"><span>地址二</span></button> 
                  <button @click="downLoad3(articleDetails.doi==null?articleDetails.PMID:articleDetails.doi)"><span>地址三</span></button>
                </p>
              </div>
              <div class="quizhu">
                <p>一键求助</p>
                <p>
                  <!-- <button @click="collection()"><span>文献收藏</span></button>  -->
                  <button @click="discuss()"><span>文献评论</span></button> 
                </p>
              </div>
              <div v-show="pmcid!='' && pmcid!=undefined">
                <p>PMC全文链接</p>
                <p @click="topmc(pmcid)">{{pmcid}}</p>
              </div>
              <div class="jijin">
                <p v-if="typeof(fundProjectList)!='undefined' && fundProjectList.length>0">所属基金</p>
                <p @click="toFund(item.approvalNumber)" v-for="(item,i) of data13" :key="i">
                  <span>{{item.title}}</span>
                </p>
              </div>
              <div>
                <p v-if="publicationTypeList.length>0">PUBLICATION TYPES;</p>
                <p v-if="grantsList.length>0">GRANT SUPPORT;</p>
                <p v-if="chemicalList.length>0">SUBSTANCES;</p>
                <p v-if="mesheadingList.length>0">MESH TERMS;</p>
                <p v-if="commentsList.length>0">COMMENTS;</p>
              </div>
              <div>
                <p v-if="publicationTypeList!=''">----Publication types</p>
                <div v-if="publicationTypeList!=''">
                  <p @click="publication(item.name)" v-for="(item,i) of data6" :key="i">{{item.name}}</p>
                </div>
              </div>
              <div>
                <p v-if="grantsList!=''">----Grant support</p>
                <div v-if="grantsList!=''">
                  <p @click="grants(item.grantId,item.agency)" v-for="(item,i) of data5" :key="i">{{item.grantId}} /{{item.agency}}</p>
                </div>
              </div>
              <div>
                <p v-if="chemicalList.length>0">----Substances</p>
                <div v-if="chemicalList.length>0">
                  <p @click="chemical(item.subName)" v-for="(item,i) of data7" :key="i">{{item.subName}}</p>
                  <div class="chem1" v-if="chemicalList.length>5">
                    <span @click="chem3()">查看更多</span>
                    <p v-show="!chem2" @click="chemical(item.subName)" v-for="(item,i) of data8" :key="i">{{item.subName}}</p>
                  </div>
                </div>
              </div>
              <div>
                <p v-if="mesheadingList.length>0">----MeSH terms</p>
                <div v-if="mesheadingList.length>0">
                  <p @click="mesheading($event)" v-for="(item,i) of data9" :key="i">
                    <span>{{item.name}}{{item.mesheadingChildList.length>0?'/'+(item.mesheadingChildList[0].majorTopic=='Y'?item.mesheadingChildList[0].name+"*":item.mesheadingChildList[0].name):''}}</span>
                  </p>
                  <div class="chem1" v-if="mesheadingList.length>5">
                    <span @click="mesh3()">查看更多</span>
                    <p v-show="!mesh2" @click="mesheading($event)" v-for="(item,i) of data10" :key="i">
                    <span>{{item.name}}{{item.mesheadingChildList.length>0?'/'+(item.mesheadingChildList[0].majorTopic=='Y'?item.mesheadingChildList[0].name+"*":item.mesheadingChildList[0].name):''}}</span>
                  </p>
                  </div>
                </div>
              </div>
              <div>
                <p v-if="commentsList.length>0">----Comments</p>
                <div v-if="commentsList.length>0">
                  <p @click="comments1(item.refSource)" v-for="(item,i) of data11" :key="i">
                    <span>{{item.refSource}}</span>
                  </p>
                  <div class="chem1" v-if="commentsList.length>5">
                    <span @click="comm3()">查看更多</span>
                    <p v-show="!comm2" @click="comments(item.refSource)" v-for="(item,i) of data12" :key="i">
                    <span>{{item.refSource}}</span>
                  </p>
                  </div>
                </div>
              </div>
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
import Ue from '../components/ue'

import html2canvas from 'html2canvas'

export default {
  metaInfo() {
    return {title: this.articleDetails.title + '-文献搜索'} // set a title
  },
  data() {
    return {
      searchContent:'',result:'',PMID:'',searchJournalData:'',if:[],yearTimeAggs:[],comments:[],journalTypeTop:[],articleDetails:[],authorList:[],addr_show:false,d:0,journal1:'',searchData:[],loading:false,grantsList:[],publicationTypeList:[],zh:false,z:0,
      addrList1:'',authorList2:'',dou:false,chemicalList1:[],chemicalList2:[],chemicalList:[],mesheadingList:[],mesheadingList1:[],mesheadingList2:[],
      c:0,chem2:true,d:0,mesh2:true,e:0,comm2:true,commentsList:[],commentsList1:[],commentsList2:[],fundProjectList:[],shoucang1:require('../../public/img/shoucang.png'),shoucang2:'收藏',shoucang10:require('../../public/img/shoucangactive.png'),uid:'',pinglun:false,dataContent:'',title:'',discu:[],discuoptions:[],visibley:false,phone:'',shoucang11:"取消收藏",pmidList:'',con:'',pmcid:''
    }
  },
  components:{
    Header,Footer,Ue
  },
  watch: {
    $route: {
      handler: function(val) {
        if(val.path=="/Literature"){
          this.getRouterData()
          this.Searcher1()
        }
      }
    },
    dataContent(val){
      this.con=this.dataContent
    }
  },
  created(){
    this.phone=localStorage.getItem("mobile")
    
  },
  computed: {
    data1: {
      get: function(){
        return this.authorList2; // 在这里把临时对象的值通过计算属性赋值给页面中用到的对象
      }
    },
    data2: {
      get: function(){
        return this.addrList1; // 在这里把临时对象的值通过计算属性赋值给页面中用到的对象
      }
    },
    data3: {
      get: function(){
        return this.articleDetails.keywordList; // 在这里把临时对象的值通过计算属性赋值给页面中用到的对象
      }
    },
    data4: {
      get: function(){
        return this.searchData; // 在这里把临时对象的值通过计算属性赋值给页面中用到的对象
      }
    },
    data5: {
      get: function(){
        return this.grantsList; // 在这里把临时对象的值通过计算属性赋值给页面中用到的对象
      }
    },
    data6: {
      get: function(){
        return this.publicationTypeList; // 在这里把临时对象的值通过计算属性赋值给页面中用到的对象
      }
    },
    data7: {
      get: function(){
        return this.chemicalList1; // 在这里把临时对象的值通过计算属性赋值给页面中用到的对象
      }
    },
    data8: {
      get: function(){
        return this.chemicalList2; // 在这里把临时对象的值通过计算属性赋值给页面中用到的对象
      }
    },
    data9: {
      get: function(){
        return this.mesheadingList1; // 在这里把临时对象的值通过计算属性赋值给页面中用到的对象
      }
    },
    data10: {
      get: function(){
        return this.mesheadingList2; // 在这里把临时对象的值通过计算属性赋值给页面中用到的对象
      }
    },
    data11: {
      get: function(){
        return this.commentsList1; // 在这里把临时对象的值通过计算属性赋值给页面中用到的对象
      }
    },
    data12: {
      get: function(){
        return this.commentsList2; // 在这里把临时对象的值通过计算属性赋值给页面中用到的对象
      }
    },
    data13: {
      get: function(){
        return this.fundProjectList; // 在这里把临时对象的值通过计算属性赋值给页面中用到的对象
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
    this.getArticle()
    this.getArticleComment()
    
  },
  methods: {
    topmc(a){
      window.open(`https://www.ncbi.nlm.nih.gov/pmc/articles/${a}`)
    },
    settingEvent(){},
    downDiscuoption(){
      this.pinglun=false
    },
    catchData(data){
      this.dataContent=data
    },
    getArticleComment(){
      this.$axios.get(`/pubmed/getArticleComment`, {
       params:{ pmid:this.PMID}
      }).then(result=>{
        // console.log(result)
        if(result.data.res.articleComment!=undefined && typeof(result.data.res.articleComment)!="{}"){
          this.title=result.data.res.articleComment.title
          this.dataContent=result.data.res.articleComment.content
          if(result.data.res.articleComment.isReadAll==1){
            this.visibley=true
          }else{
            this.visibley=false
          }
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
      this.$axios.post(`/pubmed/editArticleUserComment`, qs.stringify({
        pmid:this.PMID,
        title:this.title,
        content:this.dataContent,
        label:JSON.stringify(sss), 
        isReadAll:vis,
        isComment:1
      })).then(result=>{
        // console.log(result)
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
      this.axios.get(`/pubmed/getArticleCollects`,{
        params:{
          pmid:this.PMID
        }
      }).then(result=>{
        if(result.data.res.pmidList!=undefined){
          this.pmidList=result.data.res.pmidList
        }
      })
    },
    collection(id,phone){
      var qs=require('qs');
      if(phone==undefined || phone.length<=0){
        if($(`#${id}`).attr("src")==require("../../public/img/shoucang.png")){
          this.axios.post(`/pubmed/editArticleCollect`, qs.stringify({
            pmid:id,
            isCollect:1
          })).then(result=>{
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
          this.$axios.post(`/pubmed/editArticleCollect`, qs.stringify({
            pmid:id,
            isCollect:0
        })).then(result=>{
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
      }else if(phone!=undefined && phone.length>0){
        if($(`#${id}`).attr("src")==require("../../public/img/shoucang.png")){
          this.axios.post(`/pubmed/editArticleCollect`, qs.stringify({
            pmid:id,
            isCollect:1
          })).then(result=>{
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
          this.$axios.post(`/pubmed/editArticleCollect`, qs.stringify({
            pmid:id,
            isCollect:0
        })).then(result=>{
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
    toFund(ap){
      const {href}=this.$router.resolve({
        path: '/Fund',
        query: {
          approvalNumber:`${ap}`
        },
      })
      window.open(href,'_blank')
    },
    comments1(name){
      const {href}=this.$router.resolve({
        path: '/Search',
        query: {
          search1:`comments:"${name}"`
        },
      })
      window.open(href,'_blank')
    },
    mesheading(e){
      const {href}=this.$router.resolve({
        path: '/Search',
        query: {
          search1:`mesheading:"${e.target.innerText}"`
        },
      })
      window.open(href,'_blank')
    },
    chemical(name){
      const {href}=this.$router.resolve({
        path: '/Search',
        query: {
          search1:`chemical:"${name}"`
        },
      })
      window.open(href,'_blank')
    },
    comm3(){
      this.e++
      if(this.e%2==1){
        this.comm2=false
      }else{
        this.comm2=true
      }
    },
    chem3(){
      this.c++
      if(this.c%2==1){
        this.chem2=false
      }else{
        this.chem2=true
      }
    },
    mesh3(){
      this.d++
      if(this.d%2==1){
        this.mesh2=false
      }else{
        this.mesh2=true
      }
    },
    downLoad1(doi){
      // var urlList=['http://sci-hub.ren/','https://sci-hub.ren/','https://sci-hub.tw/','https://sci-hub.se/']
      // let ping =1;
      // setInterval(ping++,100);
      // geturl(urlList)
      // function geturl(urlList) {
      //   for(let i=0;i<urlList.length;i++){
      //     $("button").eq(i).append("<img src="+urlList[i]+"/"+Math.random()+" width='1' height='1' onerror='autotest("+i+")' style='display:none'>")
      //   }
      // }
      // function autotest(i){
      // }
      window.open(`http://sci-hub.ren/${doi}`,'_blank')
      
    },
    
    downLoad2(doi){
      window.open(`https://sci-hub.ren/${doi}`,'_blank')
    },
    downLoad3(doi){
      window.open(`https://sci-hub.tw/${doi}`,'_blank')
    },
    toContribute(){
      const {href}=this.$router.resolve({
        path: '/Contribute',
      })
      window.open(href,'_blank')
    },
    translate(){
      this.z++
      if(this.z%2==1){
        this.zh=true
      }else{
        this.zh=false
      }
    },
    Pagination(pagination1){
      const {href}=this.$router.resolve({
        path: '/Search',
        query: {
          search1:`pagination:"${pagination1}"`
        },
      })
      window.open(href,'_blank')
    },
    Volume(volume1){
      const {href}=this.$router.resolve({
        path: '/Search',
        query: {
          search1:`volume:"${volume1}"`
        },
      })
      window.open(href,'_blank')
    },
    More(){
      const {href}=this.$router.resolve({
        path: '/Similarity',
        query: {
          Aquery:`${this.PMID}`
        },
      })
      window.open(href,'_blank')
    },
    publication(name){
      const {href}=this.$router.resolve({
        path: '/Search',
        query: {
          search1:`publicationType:"${name}"`
        },
      })
      window.open(href,'_blank')
    },
    grants(grantId,agency){
      const {href}=this.$router.resolve({
        path: '/Search',
        query: {
          search1:`grant:"${grantId}/${agency}"`
        },
      })
      window.open(href,'_blank')
    },
    searcher1(){
      const {href}=this.$router.resolve({
        path: '/Search',
        query: {
          search1:this.searchContent
        },
      })
      window.open(href,'_blank')
    },
    Title(PMID1){
      const {href}=this.$router.resolve({
        path: '/Literature',
        query: {
          Id:PMID1
        },
      })
      window.open(href,'_blank')
    },
    KeyWord(word,ma){
      if(ma=="Y"){
        var word1=`keyword:"${word}*"`
      }else{
        var word1=`keyword:"${word}"`
      }
      this.$router.push({
        path:'/Search',
        query:{search1:`${word1}`}
      })
    },
    PubTime(pubTime){
      const {href}=this.$router.resolve({
        path:'/Search',
        query:{search1:`pubTime:"${pubTime}"`}
      })
      window.open(href,'_blank')
    },
    Author(item){
      let a=`${item.lastName} ${item.initials}`
      const {href}=this.$router.resolve({
        path:'/Search',
        query:{search1:`author:"${a}"`}
      })
      window.open(href,'_blank')
    },
    toSearchJour(subName){
      const {href}=this.$router.resolve({
        path:'/Search',
        query:{search1:`isoAbbr:"${subName}"`}
      })
      window.open(href,'_blank')
    },
    Doi(doi){
      let url=`https://doi.org/${doi}`
      window.open(url,'_blank')
    },
    Science(pmid){
      let url=`https://www.ncbi.nlm.nih.gov/pubmed/?term=${pmid}`
      window.open(url,'_blank')
    },
    AddrShow(){
      this.d++
      if(this.d%2==1){
        this.addr_show=true
      }else{
        this.addr_show=false
      }
    },
    getRouterData(){
      this.PMID=this.$route.query.Id
    },
    searchkras(){
      const {href}=this.$router.resolve({
        path: '/Search',
        query: {
          search1:`kras`
        },
      })
      window.open(href,'_blank')
    },
    searchegfr(){
      const {href}=this.$router.resolve({
        path: '/Search',
        query: {
          search1:`egfr`
        },
      })
      window.open(href,'_blank')
    },
    searchmyc(){
      const {href}=this.$router.resolve({
        path: '/Search',
        query: {
          search1:`myc`
        },
      })
      window.open(href,'_blank')
    },
    searchtp53(){
      const {href}=this.$router.resolve({
        path: '/Search',
        query: {
          search1:`tp53`
        },
      })
      window.open(href,'_blank')
    },
    Searcher1(){
      this.$axios.get(`/pubmed/getPmidArticle`, {
        params:{
          pmid:this.PMID
        }
      }).then(result=>{
        console.log(result)
        if(result.data.res==undefined){
          var article=[];
          this.articleDetails=[];
          this.authorList1=[];
          this.journal1=[]
          this.fundProjectList=[]
          this.chemicalList=[]
          this.mesheadingList=[]
          this.commentsList=[]
          this.pmcid=''
        }else{
          var article=result.data.res
          this.articleDetails=result.data.res.articleDetails
          // console.log(this.articleDetails)
          this.pmcid=result.data.res.articleDetails.pmcId
          this.authorList=result.data.res.articleDetails.authorList
          this.journal1=result.data.res.articleDetails.journal
          this.fundProjectList=result.data.res.articleDetails.fundProjectList
        if((result.data.res.articleDetails.grantsList).length==0){
          this.grantsList=""
        }else{
          this.grantsList=result.data.res.articleDetails.grantsList
        }
        if((result.data.res.articleDetails.publicationTypeList).length==0){
          this.publicationTypeList=""
        }else{
          this.publicationTypeList=result.data.res.articleDetails.publicationTypeList
        }
        this.chemicalList=result.data.res.articleDetails.chemicalList
        if(this.chemicalList.length>5){
          this.chemicalList1=(result.data.res.articleDetails.chemicalList).slice(0,5)
          this.chemicalList2=(result.data.res.articleDetails.chemicalList).slice(5,(this.chemicalList).length+1)
        }else{
          this.chemicalList1=result.data.res.articleDetails.chemicalList
        }
        this.mesheadingList=result.data.res.articleDetails.mesheadingList
        if(this.mesheadingList.length>5){
          this.mesheadingList1=(result.data.res.articleDetails.mesheadingList).slice(0,5)
          this.mesheadingList2=(result.data.res.articleDetails.mesheadingList).slice(5,(this.mesheadingList).length+1)
        }else{
          this.mesheadingList1=result.data.res.articleDetails.mesheadingList
        }
        this.commentsList=result.data.res.articleDetails.commentsList
        if(this.mesheadingList.length>5){
          this.commentsList1=(result.data.res.articleDetails.commentsList).slice(0,5)
          this.commentsList2=(result.data.res.articleDetails.commentsList).slice(5,(this.commentsList).length+1)
        }else{
          this.commentsList1=result.data.res.articleDetails.commentsList
        }
        if(this.articleDetails!=undefined){
					if(this.authorList!=undefined){
						var authorList1=new Array();
						var addrMap=new Map();
						var addrIndex=0;
						var addrValue=null;
						var addrValues=new Array();
						for (let author of this.authorList) {
							addrValues=new Array();
							for (let affiliation of author.affiliationList) {
								addrValue=addrMap.get(affiliation.addr);
								if(addrValue==undefined){
									addrMap.set(affiliation.addr,++addrIndex);
									addrValue=addrIndex;
								}
								addrValues.push(addrValue);
							}
							author.index=addrValues.join(',');
							authorList1.push(author);
						}
						var addrList=new Array();
						for(var key of addrMap){
							var addr={};
							addr.addr=key[0];
							addr.index=key[1];
							addrList.push(addr);
						}
              article.addrList=addrList;
              this.addrList1=article.addrList
              article.authorList1=authorList1;
              this.authorList2=article.authorList1
					  }
				  }
        }
      }).catch(error=>{
        if(error){
          throw error
        }
      })
      this.loading=true
      this.$axios.get(`/pubmed/moreLikeThisPubmedArticle`, {
        params:{
          pmid:this.PMID
        }
      }).then(result=>{
        if(result.data.res==undefined){
          this.searchData=[]
        }else{
          this.searchData=result.data.res.articleList.searchData
          if(result.data.status==200){
            this.loading=false
          }
        }
      }).catch(error=>{
        if(error){
          throw error
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
  }
  .contentRight{
    width: 20%;
    background: #E7EDF9;
  }
  .leftTop{
    padding: 20px;
    border-bottom: 1px solid #dcdcdc;
    padding-bottom: 30px;
    margin-bottom: 10px;
  }
  .leftTop>p:first-child{
    font-size:16px;
    font-family:Source Han Sans CN;
    font-weight:400;
    color:rgba(51,51,51,1);
    line-height:26px;
    vertical-align: middle;
  }
  .leftTop>div:nth-child(2)>span:nth-child(2n){
    color: #1B9AF7;
    text-decoration: underline;
    margin-left: 10px;
    margin-right: 10px;
    cursor: pointer;
  }
  .leftTop>div:nth-child(2)>span:nth-child(2n+1){
    font-size:14px;
    font-family:Source Han Sans CN;
    font-weight:400;
    color:rgba(51,51,51,1);
  }
  .leftTop>div:nth-child(2)>span:nth-child(4){
    cursor: auto;
  }
  .leftTop>div:nth-child(3){
    margin-top: 10px;
  }
  .leftTop>div:nth-child(3)>span>span{
    margin-right: 10px;
    font-size:14px;
    font-family:Source Han Sans CN;
    font-weight:400;
    color:rgba(102,102,102,1);
    text-decoration: underline;
  }
  .leftTop>div:nth-child(3)>span>span:hover{
    cursor: pointer;
    color: #4183C4;
    text-decoration: none;
  }
  .leftTop>div:nth-child(4){
    margin-top: 10px;
  }
  .leftTop>div:nth-child(4)>p{
    font-size:14px;
    font-family:Source Han Sans CN;
    font-weight:400;
    color:rgba(102,102,102,1);
    
  }
  .leftTop>div:nth-child(4)>p>span{
    vertical-align: middle;
    margin-left: 10px;
    cursor: pointer;
  }
  .leftTop>div:nth-child(4)>p>img{
    cursor: pointer;
  }
  .leftTop>div:nth-child(4)>div{
    margin-left: 20px;
    font-size:14px;
    font-family:Source Han Sans CN;
    font-weight:400;
    color:rgba(51,51,51,1);
    line-height:16px;
  }
  .leftTop>div:nth-child(5)>p:first-child{
    font-size:14px;
    font-family:Source Han Sans CN;
    font-weight:400;
    color:rgba(102,102,102,1);
  }
  .leftTop>div:nth-child(5)>p:first-child>span{
    vertical-align: middle;
    margin-left: 10px;
  }
  .leftTop>div:nth-child(5)>p:last-child{
    font-size:14px;
    font-family:Source Han Sans CN;
    font-weight:400;
    color:rgba(51,51,51,1);
    line-height:26px;
  }
  .leftTop>div:nth-child(6)>p{
    font-size:16px;
    font-family:Source Han Sans CN;
    font-weight:400;
    color:rgba(102,102,102,1);
  }
  .leftTop>div:nth-child(6)>span{
    margin-right: 10px;
    text-decoration: underline;
  }
  .leftTop>div:nth-child(6)>span:hover{
    text-decoration: none;
    color: #1B9AF7;
    cursor: pointer;
  }
  .RightContent>div>p>button{
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
  /* .RightContent>div>p:nth-child(2){
    margin-left: 20px;
  }
  .RightContent>div>p:nth-child(2)>button:hover{
    background: #1B9AF7;
    color: #fff;
  } */
  .leftBottom{
    padding: 20px;
    margin-bottom: 20px;
  }
  .leftBottom>p:first-child{
    font-size:14px;
    font-family:Source Han Sans CN;
    font-weight:400;
    color:rgba(51,51,51,1);
  }
  .leftBottom>ul>li{
    list-style-type:  decimal;
    margin-left: 20px;
    padding-left: 10px;
  }
  .leftBottom>ul>li>p>span:nth-child(1){
    margin-right: 10px;
  }
  .leftBottom>ul>li>p>span:nth-child(3){
    color: #1B9AF7;
    cursor: pointer;
    margin-left: 10px;
  }
  .leftBottom>p:last-child{
    color: #1B9AF7;
    cursor: pointer;
    font-size:17px;
    font-family:Source Han Sans CN;
    font-weight:400;
    text-align: center;
    margin-top: 20px;
  }
  .RightContent{
    width: 100%;
    margin-left: 10px;
    background: #fff;
    height: 100%;
    padding: 20px;
  }
  .RightContent>div:nth-child(1){
    margin-left: -20px;
  }
  .RightContent>div:nth-child(1)>p:nth-child(1){
    padding-left:20px; 
    line-height: 15px;
    border-left: 2px solid #0382D9;
  }
  .RightContent>div:nth-child(1)>p:nth-child(2){
    padding-left: 20px;
  }
  .quizhu{
    margin-left: -20px;
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
  .jijin{
    margin-left: -20px;
  }
  .jijin>p>span{
    color: #0382D9;
    font-size: 12px;
    font-weight: 500;
    text-decoration: none;
  }
  .jijin>p>span:hover{
    cursor: pointer;
  }
  .jijin>p{
    padding-left: 20px;
    line-height: 15px;
  }
  .jijin>p:nth-child(1){
    border-left: 2px solid #0382D9;
  }
  .RightContent>div:nth-child(3)>p:nth-child(1){
    margin-left: -20px;
    padding-left: 20px;
    border-left: 2px solid #0382D9;
  }
  .RightContent>div:nth-child(3)>p:nth-child(2){
    color: #333;
    margin: 3px 0;
    font-size: 12px;
    text-decoration: underline;
    cursor: pointer;
  }
  .RightContent>div:nth-child(3)>p:nth-child(2):hover{
    color: #1B9AF7;
    text-decoration:none;cursor: pointer;
  }
  .RightContent>div:nth-child(5){
    margin-left: -20px;
    padding-left: 20px;
    border-left: 2px solid #0382D9;
  }
  .RightContent>div:nth-child(5)>p{
    margin: 0;
    line-height: 15px;
  }
  .RightContent>div:nth-child(6){
    margin-top: 10px;
  }
  .RightContent>div:nth-child(6)>p:nth-child(1){
    color: #0382D9;
    font-size: 16px;
    font-weight: 500;
  }
  .RightContent>div:nth-child(6)>div>p:hover{
    color: #0382D9;
    cursor: pointer;
    text-decoration: none;
  }
  .RightContent>div:nth-child(7)>div>p{
    color: #333;
    font-size: 12px;
    text-decoration: underline;
    
  }
  .RightContent>div:nth-child(7)>p:nth-child(1){
    color: #0382D9;
    font-size: 16px;
    font-weight: 500;
  }
  .RightContent>div:nth-child(7)>div>p:hover{
    color: #0382D9;
    cursor: pointer;
    text-decoration: none;
  }
  .RightContent>div:nth-child(8){
    margin-top: 10px;
  }
  .RightContent>div:nth-child(8)>p:nth-child(1){
    color: #0382D9;
    font-size: 16px;
    font-weight: 500;
    text-decoration: none;
  }
  .RightContent>div:nth-child(9)>p:nth-child(1):hover{
    cursor: auto;
  }
  .RightContent>div:nth-child(9)>div>p{
    color: #333;
    font-size: 12px;
    text-decoration: underline;
  }
  .RightContent>div:nth-child(8){
    margin-top: 10px;
  }
  .RightContent>div:nth-child(8)>p:nth-child(1){
    color: #0382D9;
    font-size: 16px;
    font-weight: 500;
    text-decoration: none;
  }
  .RightContent>div:nth-child(8)>p:nth-child(1):hover{
    cursor: auto;
  }
  .RightContent>div:nth-child(8)>div>p{
    color: #333;
    font-size: 12px;
    text-decoration: underline;
  }
  .RightContent>div:nth-child(8)>div>p:hover{
    color: #0382D9;
    cursor: pointer;
    text-decoration: none;
  }
  .RightContent>div:nth-child(9){
    margin-top: 10px;
  }
  .RightContent>div:nth-child(9)>p:nth-child(1){
    color: #0382D9;
    font-size: 16px;
    font-weight: 500;
    text-decoration: none;
  }
  .RightContent>div:nth-child(9)>p:nth-child(1):hover{
    cursor: auto;
  }
  .RightContent>div:nth-child(9)>div>p{
    color: #333;
    font-size: 12px;
    text-decoration: underline;
  }
  .RightContent>div:nth-child(9)>div>p:hover{
    color: #0382D9;
    cursor: pointer;
    text-decoration: none;
  }
  .RightContent>div:nth-child(10){
    margin-top: 10px;
  }
  .RightContent>div:nth-child(10)>p:nth-child(1){
    color: #0382D9;
    font-size: 16px;
    font-weight: 500;
    text-decoration: none;
  }
  .RightContent>div:nth-child(10)>p:nth-child(1):hover{
    cursor: auto;
  }
  .RightContent>div:nth-child(10)>div>p{
    color: #333;
    font-size: 12px;
    text-decoration: underline;
  }
  .RightContent>div:nth-child(11)>div>p:hover{
    color: #0382D9;
    cursor: pointer;
    text-decoration: none;
  }
  .RightContent>div:nth-child(11){
    margin-top: 10px;
  }
  .RightContent>div:nth-child(11)>p:nth-child(1){
    color: #0382D9;
    font-size: 16px;
    font-weight: 500;
    text-decoration: none;
  }
  .RightContent>div:nth-child(11)>p:nth-child(1):hover{
    cursor: auto;
  }
  .RightContent>div:nth-child(11)>div>p{
    color: #333;
    font-size: 12px;
    text-decoration: underline;
  }
  .RightContent>div:nth-child(11)>div>p:hover{
    color: #0382D9;
    cursor: pointer;
    text-decoration: none;
  }
  .RightContent>div:nth-child(12){
    margin-top: 10px;
  }
  .RightContent>div:nth-child(12)>p:nth-child(1){
    color: #0382D9;
    font-size: 16px;
    font-weight: 500;
    text-decoration: none;
  }
  .RightContent>div:nth-child(12)>p:nth-child(1):hover{
    cursor: auto;
  }
  .RightContent>div:nth-child(12)>div>p{
    color: #333;
    font-size: 12px;
    text-decoration: underline;
  }
  .RightContent>div:nth-child(12)>div>p:hover{
    color: #0382D9;
    cursor: pointer;
    text-decoration: none;
  }
  .contentLeft>div:nth-child(2)>p:nth-child(3){
    text-align: center;
    color: #0382D9;
    cursor: pointer;
    font-size: 16px;
    margin-top: 10px;
  }
  .leftTop>div:nth-child(2)>span:nth-child(10){
    margin-right: 0;
  }
  .leftTop>div:nth-child(2)>span:nth-child(11){
    color: #1B9AF7;
    text-decoration: underline;
    cursor: pointer;
  }
  .leftTop>div:nth-child(2)>span:nth-child(12){
    margin: 0;
  }
  .leftTop>div:nth-child(3)>span>sup{
    margin-left: -5px;
  }
  .leftTop>div:nth-child(4)>p>span:hover{
    cursor: pointer;
    color: #0382D9;
  }
  .chem1>span{
    color: #0382d9;
    cursor: pointer;
    font-size: 12px;display: inline-block;
    margin-bottom: 10px;

  }
  .chem1>p{
    color: #333;
    font-size: 12px;
    text-decoration: underline;
  }
  .chem1>p:hover{
    text-decoration: none;
    cursor: pointer;
    color: #0382d9;
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
    z-index:8888
  }
  .pinglun2>div{
    width: 800px;
    height: 560px;
    position: absolute;
    top: 50%;
    left: 30%;
    transform: translate(0, -50%);
    background: #fff;
    z-index: 8888;text-align: right
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
</style>