<template>
  <div>
    <Header></Header>
    <div class="SearchBackground">
      <div class="SearchBody1">
        <div class="search2">
          <div class="searchBox1">
              <input ref="input" @keyup.13="searcher()" v-model="searchContent" type="text" placeholder="在此输入您搜索的内容" onfocus="this.placeholder=''" onblur="this.placeholder='在此输入您搜索的内容'">
            <div id="sea" @click="searcher()"><span>搜索</span></div>
          </div>
        </div>
        <div class="SearchBody">
          <span>寻找基因</span>
          <ul>
            <li><span @click="searchtp53()">TP53</span></li>
            <li><span @click="searchmyc()">MYC</span></li>
            <li><span @click="searchegfr()">egfr</span></li>
            <li><span @click="searchkras()">kras</span></li>
          </ul>
          <div class="SearchBox">
            <div class="searchInput">
              <el-autocomplete
                class="inline-input" @input="searchContent==''?'':Fund();search2()" @keyup.13.native="searcher()"
                v-model="searchContent"
                :fetch-suggestions="querySearch"
                placeholder="在此输入您搜索的内容"
                :trigger-on-focus="false"
                @select="handleSelect;searcher()"
              ></el-autocomplete>
            </div>
            
            <div id="sea" @click="search2();searcher()"><span>搜索</span></div>
            
          </div>
          <p class="sousuo"><span class="tougao" style="margin-right:12%;cursor: pointer;" @click="toIdConversion()">GeneID转换</span></p>
        </div>
      </div>
      <div class="SearchContent">
        <div class="Content">
          <el-table :data="genesList.filter(data => !search1 || data.name.toLowerCase().includes(search1.toLowerCase()))"  border style="width: 100%">
            <el-table-column label="Symbol" width="135">
              <template slot-scope="scope">
                <span @click="handleGoods(scope.row)" class="scopeName" style="margin:0;cursor: pointer;">{{scope.row.name}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="desc" label="Description" width="500">
            </el-table-column>
            <el-table-column prop="geneType">
              <template slot="header" slot-scope="scope">
                <el-input v-model="search1" size="mini" placeholder="输入关键字搜索"/>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            layout="prev, pager, next,jumper" 
            :total="this.result1">
          </el-pagination>
        </div>
      </div>
    </div>
    <Footer :style="{'margin-top':(genesList.length<=3?'170px':'')}"/>
  </div>
</template>
<script>
import Header from '../components/Header'
import Footer from '../components/Footer'
import html2canvas from 'html2canvas';
export default {
  metaInfo() {
    return {title: '基因搜索'} // set a title
  },
  data() {
    return {
     searchContent:'',result1:0,genesList:[],search1:'',currentPage:1,code:'?code=061VlpZz0I8drc1DDK1A0GHpZz0VlpZM&state=STATE'
    }
  },
  components:{
    Header,Footer
  },
  created(){
   
  },
  mounted() {
    
  },
  destroyed () {
    
  },
  updated () {
    
  },
  activated(){
    
  },
  beforeUpdate () {
    
    
  },
  beforeDestroy () {
  },
  watch: {
    
  },
  computed: {
   
    
  },
  activated(){
    this.getRouterData()
    this.handleCurrentChange()
    this.searcher()
  },
  methods: {
    toIdConversion(){
      const {href}=this.$router.resolve({
        path: '/IdConversion',
      })
      window.open(href,'_blank')
    },
    handleCurrentChange(currentPage){
      if(typeof(currentPage)!='undefined' && currentPage!=1){
        this.currentPage = currentPage;
        $("#sea").click()
      }else if(currentPage==1){
        this.currentPage = 1
        $("#sea").click()
      }else {
        this.currentPage =this.$route.query.page*1 || 1
        currentPage=this.currentPage
        $("#sea").click()
      }
    },
    search2(){
      this.$router.push({
        path:'/Gene',
        query:{
          search1:this.searchContent,page:this.currentPage
        }
      })
    },
    handleSelect(){},
    querySearch(queryString, cb) {
      if(this.jus!='' || this.jus.length>0){
        var restaurants = this.jus;
        var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
        // 调用 callback 返回建议列表的数据
        cb(results);
      }
    },
    createFilter(queryString) {
      return (restaurant) => {
        return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },  
    Fund(){
      var qs=require('qs')
      this.$axios.get(`/pubmed/completionGenesSuggester`, {
        params:{
          query:this.searchContent
        },paramsSerializer: function(params) {
          return qs.stringify(params, {arrayFormat: 'brackets'})
        },
      }).then(result=>{
        // console.log(result.data)
        if(result.data.res!=undefined){
          this.searchCompletion=result.data.res.completionList.searchCompletion;
          this.jus=[]
          for(let i=0;i<(this.searchCompletion).length;i++){
            this.jus.push({'value':this.searchCompletion[i]})
          }
        }
        if(result.data.status==500){
          this.$message({
            message: '不能为空',
            type: 'warning'
          });
        }
      }) 
      this.isShow = true
    },
    getRouterData(){
      this.searchContent=this.$route.query.search1
    },
    handleGoods(scope){
      const {href}=this.$router.resolve({
        path: '/Monogenic',
        query: {
          search1:`${this.searchContent}`,
          Id:`${scope.geneID}`
        },
      })
      window.open(href,'_blank')
    },
    searchkras(){
      this.searchContent='kras'
      this.search2()
      this.searcher()
    },
    searchegfr(){
      this.searchContent='egfr'
      this.search2()
      this.searcher()
    },
    searchmyc(){
      this.searchContent='myc'
      this.search2()
      this.searcher()
    },
    searchtp53(){
      this.searchContent='tp53'
      this.search2()
      this.searcher()
    },
    searcher(){
      var qs=require('qs');
      this.axios.post(`/pubmed/searchGenesInfo`, qs.stringify({
        query:this.searchContent,
        page:this.currentPage
      })).then(result=>{
        // console.log(result.data.res)
        if(JSON.stringify(result.data.res)!="{}" && result.data.res!=undefined){
          this.genesList=result.data.res.genesList.searchData
          this.result1=result.data.res.genesList.searchTotal
          // console.log(this.result1)
          if(this.genesList.length==1){
            const {href}=this.$router.resolve({
              path: '/Monogenic',
              query: {
                search1:`${this.searchContent}`,
                Id:`${this.genesList[0].geneID}`
              },
            })
            window.open(href,'_blank')
          }
        }else{
          this.genesList=[]
        }
        if(result.data.status==200){
          this.loading=false;
        }
      })
    }
  },
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
    .Content{
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
    height: 130px;
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
    width: 80%;
    margin-left: 4%;
    cursor: pointer;
    position: relative;
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
    margin-top: 13px;
    line-height: 50px;
  }
  .SearchBox>input{
    display: inline-block;
    width:80%;
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
    height:48px;
    background:rgba(51,102,204,1);
    border-radius:24px;
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
    background: #fff;
  }
  .Content{
    width: 100%;
    margin: 0 auto;
    overflow: hidden;
    padding: 50px 0 ;
  }
  
  .scopeName:hover{
    color: #3366CC;
    cursor: pointer;
  }
  .searchInput{
    width: 80%;
  }
  .SearchBox>.searchInput>>>.el-input__inner{
    border: none;
    width: 100%;
    font-size: 12px;
    font-weight: 500;
  }
  .SearchBox>.searchInput>>>div{
    width: 100%;
  }
  .sousuo{
    text-align: right;
  }
</style>