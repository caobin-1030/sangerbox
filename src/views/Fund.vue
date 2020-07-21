<template>
  <div>
    <Header></Header>
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
          <div><p>基本信息</p></div>
        </div>
      </div>
      <div class="SearchBodyOne">
        <div class="SearchContent1" v-loading="loading"
          element-loading-text="拼命加载中"
          element-loading-spinner="el-icon-loading"
          element-loading-background="f5f5f5" id="view">
          <div>
            <table>
            <tbody class="tableTbody">
              <tr>
                <td>项目名称</td>
                <td colspan="5" v-if='fundDetails.title!=null'>{{fundDetails.title}}</td>
                <td v-else>N/A</td>
              </tr>
              <tr>
                <td>项目类型</td>
                <td @click="toSearchFund(fundDetails.type)" class="sta" colspan="2" v-if="fundDetails.type!=null">{{fundDetails.type}}</td>
                <td colspan="2" v-else>N/A</td>
                <td>所属学部</td>
                <td @click="toSearchFund1(fundDetails.department)" class="sta" colspan="2" v-if="fundDetails.department!=null">{{fundDetails.department}}</td>
                <td colspan="2" v-else>N/A</td>
              </tr>
              <tr>
                <td>学科分类</td>
                <td colspan="5"><span>一级:</span><span @click="toSearchFund2(fundDetails.subjectOneType)" class="sta1" v-if="fundDetails.subjectOneType!=null">{{fundDetails.subjectOneType}}</span><span v-if="fundDetails.subjectOneType==null">N/A</span><span>二级:</span><span @click="toSearchFund3(fundDetails.subjectTwoType)" class="sta1" v-if="fundDetails.subjectTwoType!=null">{{fundDetails.subjectTwoType}}</span><span v-if="fundDetails.subjectTwoType==null">N/A</span><span>三级:</span><span @click="toSearchFund4(fundDetails.subjectThreeType)" class="sta1" v-if="fundDetails.subjectThreeType!=null">{{fundDetails.subjectThreeType}}</span><span v-if="fundDetails.subjectThreeType==null">N/A</span></td>
              </tr>
              <tr>
                <td>学科代码</td>
                <td colspan="5"><span>一级:</span><span @click="toSearchFund5(fundDetails.subjectOneCode)" class="sta1" v-if="fundDetails.subjectOneCode!=null">{{fundDetails.subjectOneCode}}</span><span v-if="fundDetails.subjectOneCode==null">N/A</span><span>二级:</span><span @click="toSearchFund6(fundDetails.subjectTwoCode)" class="sta1" v-if="fundDetails.subjectTwoCode!=null">{{fundDetails.subjectTwoCode}}</span><span v-if="fundDetails.subjectTwoCode==null">N/A</span><span>三级:</span><span @click="toSearchFund7(fundDetails.subjectThreeCode)" class="sta1" v-if="fundDetails.subjectThreeCode!=null">{{fundDetails.subjectThreeCode}}</span><span v-if="fundDetails.subjectThreeCode==null">N/A</span></td>
              </tr>
              <tr>
                <td>执行时间</td>
                <td colspan="5" v-if="fundDetails.info!=null"><span v-if="fundDetails.info!=null && (fundDetails.info.researchTimeScope).length>22">{{(fundDetails.info.researchTimeScope).slice(0,10)}}到{{(fundDetails.info.researchTimeScope).slice(22,32)}}</span><span v-if="fundDetails.info!=null && (fundDetails.info.researchTimeScope).length<22">{{fundDetails.info.researchTimeScope}}</span><span v-if="fundDetails.info==null">N/A</span></td>
                <td colspan="5" v-else>N/A</td>
              </tr>
              <tr>
                <td>关键词</td>
                <td colspan="5" v-if="fundDetails.keyword!=null">{{fundDetails.keyword}}</td>
                <td colspan="5" v-if="fundDetails.keyword!=null?'':fundDetails.info!=undefined">{{fundDetails.info.projectKeywordC}}</td>
                <td colspan="5" v-if="fundDetails.keyword==null && fundDetails.info==undefined">N/A</td>
              </tr>
              <tr>
                <td>负责人</td>
                <td @click="toSearchFund(fundDetails.studentsName)" class="sta"  v-if="fundDetails.studentsName!=null && pubTotal!=null">{{fundDetails.studentsName}}</td>
                <td v-else>N/A</td>
                <td style="border-right:1px solid #fff;">职位</td>
                <td v-if="fundDetails.info!=null">{{fundDetails.info.adminPosition}}</td>
                <td v-else>N/A</td>
                <td style="border-right:1px solid #fff;">单位</td>
                <td @click="toSearchFund(fundDetails.unit)" class="sta"  v-if="fundDetails.unit!=null">{{fundDetails.unit}}</td>
                <td  v-else>N/A</td>
              </tr>
              <tr>
                <td>金额（万）</td>
                <td @click="toSearchFund8(fundDetails.money)" class="sta" v-if="fundDetails.money!=null">{{fundDetails.money}}</td>
                <td v-else>N/A</td>
                <td style="border-right:1px solid #fff;">项目编号</td>
                <td v-if="fundDetails.approvalNumber!=null">{{fundDetails.approvalNumber}}</td>
                <td v-else>N/A</td>
                <td style="border-right:1px solid #fff;">批准年份</td>
                <td @click="toSearchFund9(fundDetails.approvalYear)" class="sta" v-if="fundDetails.approvalYear!=null">{{fundDetails.approvalYear}}</td>
                <td v-else>N/A</td>
              </tr>
              <tr v-if="hostStudentsList.length>0">
                <td>负责学者</td>
                <td colspan="5" style="padding:0">
                  <table style="width:100%">
                    <tbody class="tableTbody">
                      <tr>
                        <td style="border-right:1px solid #fff;">姓名</td>
                        <td></td>
                        <td style="border-right:1px solid #fff;">单位代码</td>
                        <td></td>
                        <td style="border-right:1px solid #fff;">单位</td>
                        <td></td>
                      </tr>
                      <tr v-for="(item,i) of data3" :key="i">
                        <td @click="toSearchFund(item.name)" class="sta" style="border-right:1px solid #fff;">{{item.name}}</td>
                        <td></td>
                        <td style="border-right:1px solid #fff;">{{item.unitCode}}</td>
                        <td></td>
                        <td @click="toSearchFund(item.unitName)" class="sta" style="border-right:1px solid #fff;">{{item.unitName}}</td>
                        <td></td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
              <tr v-if="joinStudentsList.length>0">
                <td>参与学者</td>
                <td colspan="5" style="padding:0">
                  <table style="width:100%">
                    <tbody class="tableTbody">
                      <tr>
                        <td style="border-right:1px solid #fff;">姓名</td>
                        <td></td>
                        <td style="border-right:1px solid #fff;">单位代码</td>
                        <td></td>
                        <td style="border-right:1px solid #fff;">单位</td>
                        <td></td>
                      </tr>
                      <tr v-for="(item,i) of data2" :key="i">
                        <td @click="toSearchFund(item.name)" class="sta" style="border-right:1px solid #fff;">{{item.name}}</td>
                        <td></td>
                        <td style="border-right:1px solid #fff;">{{item.unitCode}}</td>
                        <td></td>
                        <td @click="toSearchFund(item.unitName)" class="sta" style="border-right:1px solid #fff;">{{item.unitName}}</td>
                        <td></td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
              <tr>
                <td>学者项目关系</td>
                <td colspan="5">
                  <div class="xuezhe">
                    <div id="xue1" :style="{width: '760px', height: '500px'}"></div>
                  </div>  
                </td>
              </tr>
              <tr v-if="fundDetails.info!=null">
                <td>项目摘要</td>
                <td colspan="5">
                  {{fundDetails.info.projectAbstractC}}
                </td>
              </tr>
              <tr v-if="fundDetails.info!=null && fundDetails.info.conclusionAbstract!=null">
                <td>结题摘要</td>
                <td colspan="5">
                  {{fundDetails.info.conclusionAbstract}}
                </td>
              </tr>
              <tr v-if="fundDetails.info!=null && fundDetails.info.resultsList.length>0">
                <td>成果</td>
                <td colspan="5" style="padding:0">
                  <table style="width:100%;margin:0" class="Achievements">
                    <thead>
                      <tr>
                        <th>序号</th>
                        <th>标题</th>
                        <th >类型</th>
                        <th >作者</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(item,i) in data1" :key="i">
                        <td style="text-align: center">{{item.result[0]}}</td><td >{{item.result[2]}}</td><td >{{item.result[3]}}</td><td >{{item.result[4]}}</td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
              <tr v-if="articleList.searcherData!=null">
                <td>成果文献</td>
                <td colspan="5" style="padding:0">
                  <div class="SearchBodyTwo" v-loading="loading"
                  element-loading-text="拼命加载中"
                  element-loading-spinner="el-icon-loading"
                  element-loading-background="f5f5f5">
                    <ul>
                      <li v-for="(item,i) in data5" :key="i">
                        <div>
                          <p>
                            <span v-html="item.title" @click="toLiterature(item.PMID)">{{item.title}}</span><img v-clipboard:copy="item.title" v-clipboard:success="onCopy" v-clipboard:error="onError" src="../../public/img/copy.png" alt="复制" title="复制">
                          </p>
                          <div></div>
                          <div>
                            <div>
                              <span v-popover:popover1 @click="getText(list)" v-for="(list,i) of item.authorList" :key="i">
                                {{list.lastName}} {{list.initials}},
                              </span>
                            </div>
                            <div class="datas">
                              <div>
                                <!-- <div><span>Article</span></div> -->
                                <ul>
                                  <li><span @click="toJournal(item.journal.nlmId,item.journal.course)">{{item.journal.subName}}</span></li>
                                  <li><span v-if="item.journal.nowIfs!=null">{{item.journal.nowIfs}}</span><span v-else>N/A</span></li>
                                  <li><span v-if="item.journal.qClass!=null">{{item.journal.qClass}}</span><span v-else>N/A</span></li>
                                </ul>
                              </div>
                              <div>
                                <p>
                                  <span>{{item.pubTime}};{{item.volume}};{{item.pagination}}</span>
                                  <span>DOl:{{item.doi}}</span>
                                </p>
                              </div>
                            </div>
                            <div>
                              <span v-html="item.abstractText"></span>
                            </div>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          </div>
          
          <div class="link">
            <div>
              <p>相似基金TOP{{listlength}}</p>
              <div><p  @click="toNewFund(item.approvalNumber)" v-for="(item,i) of data4" :key="i">{{item.title}}</p></div>
              <!-- <div><p  @click="SearchTop(item.nlmId,item.course)" v-for="(item,i) of data2" :key="i">{{item.subName}}</p></div> -->
              <!-- <p>PubMed Central (PMC)链接</p>
              <p>Science Citation Index Expanded</p> -->
              <p>二维码</p>
              <img src="../../public/img/wechart.png" alt="">
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
export default {
  metaInfo() {
    return {title: this.fundDetails.title + '-基金搜索'} // set a title
  },
  data() {
    return {
      searchContent:'',result:'',approvalNumber:'',fundDetails:[],searchJournalData:'',if:[],yearTimeAggs:[],comments:[],journalTypeTop:[],hIndex:'',citedNum:'',pubTotal:'',resultsList:[],researchTimeScope:[],projectAdmin:'',projectAbstractC:'',conclusionAbstract:'',loading:false,hostStudentsList:[],joinStudentsList:[],title1:[],title2:[],aaa:{},aggs:{},bbb:{},ccc:{},title3:[],title4:[],a4:{},fundList:[],listlength:0,articleList:[]
    }
  },
  components:{
    Header,Footer
  },
  created(){
      

  },
  watch: {
    $route: {
      handler: function(val) {
        if(val.path=="/Fund"){
          this.getRouterData()
          this.Searcher1()
        }
      }
    },
  },
  mounted() {
  },
  computed: {
    data1: {
      get: function(){
        if(this.fundDetails.info!=''){
          return this.fundDetails.info.resultsList;
        }
         // 在这里把临时对象的值通过计算属性赋值给页面中用到的对象
      }
    },
    data2: {
      get: function(){
        if(this.joinStudentsList!=''){
          return this.joinStudentsList;
        }
         // 在这里把临时对象的值通过计算属性赋值给页面中用到的对象
      }
    },
    data3: {
      get: function(){
        if(this.hostStudentsList!=''){
          return this.hostStudentsList;
        }
         // 在这里把临时对象的值通过计算属性赋值给页面中用到的对象
      }
    },
    data4: {
      get: function(){
        if(this.fundList!=''){
          return this.fundList.searchData;
        }
         // 在这里把临时对象的值通过计算属性赋值给页面中用到的对象
      }
    },
    data5: {
      get: function(){
        // if(this.articleList!=''){
          return this.articleList.searchData;
        // }
         // 在这里把临时对象的值通过计算属性赋值给页面中用到的对象
      }
    },
  },
  destroyed () {
    
  },
  updated () {
    this.xue()
  },
  activated() {
    this.getRouterData()
    this.Searcher1()
  },
  methods: {
    toSearchFund9(a){
      const {href} =this.$router.resolve({
        path:'/SearchFund',
        query:{
          search1:`approvalYear:"${a}"`
        }
      })
      window.open(href, '_blank')
    },
    toSearchFund8(a){
      const {href} =this.$router.resolve({
        path:'/SearchFund',
        query:{
          search1:`money:"${a}"`
        }
      })
      window.open(href, '_blank')
    },
    toSearchFund7(a){
      const {href} =this.$router.resolve({
        path:'/SearchFund',
        query:{
          search1:`subjectThreeCode:"${a}"`
        }
      })
      window.open(href, '_blank')
    },
    toSearchFund6(a){
      const {href} =this.$router.resolve({
        path:'/SearchFund',
        query:{
          search1:`subjectTwoCode:"${a}"`
        }
      })
      window.open(href, '_blank')
    },
    toSearchFund5(a){
      const {href} =this.$router.resolve({
        path:'/SearchFund',
        query:{
          search1:`subjectOneCode:"${a}"`
        }
      })
      window.open(href, '_blank')
    },
    toSearchFund4(a){
      const {href} =this.$router.resolve({
        path:'/SearchFund',
        query:{
          search1:`subjectThreeType:"${a}"`
        }
      })
      window.open(href, '_blank')
    },
    toSearchFund3(a){
      const {href} =this.$router.resolve({
        path:'/SearchFund',
        query:{
          search1:`subjectTwoType:"${a}"`
        }
      })
      window.open(href, '_blank')
    },
    toSearchFund2(a){
      const {href} =this.$router.resolve({
        path:'/SearchFund',
        query:{
          search1:`subjectOneType:"${a}"`
        }
      })
      window.open(href, '_blank')
    },
    toSearchFund1(a){
      const {href} =this.$router.resolve({
        path:'/SearchFund',
        query:{
          search1:`department:"${a}"`
        }
      })
      window.open(href, '_blank')
    },
    toSearchFund(a){
      const {href} =this.$router.resolve({
        path:'/SearchFund',
        query:{
          search1:a
        }
      })
      window.open(href, '_blank')
    },
    toJournal(nlmId,course){
      const {href} =this.$router.resolve({
        path:'/Journal',
        query:{
          Id:nlmId,Name:course
        }
      })
      window.open(href, '_blank')
    },
    getText(list){
      const {href}=this.$router.resolve({
        path: '/Search',
        query: {
          search1:`author:"${list.lastName} ${list.initials}"`
        },
      })
      window.open(href,'_blank')
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
    onCopy(e){
      this.$message({
          message: '复制成功',
          type: 'success'
        });
    },
    // 复制失败
    onError(e){
      this.$message.error('复制失败');
    },
    toNewFund(ap){
      const {href}=this.$router.resolve({
        path: '/Fund',
        query:{
          approvalNumber:ap
        }
      })
      window.open(href,'_blank')
    },
    toContribute(){
      const {href}=this.$router.resolve({
        path: '/Contribute'
      })
      window.open(href,'_blank')
    },
    
    SearchTop(d,f){
      const {href}=this.$router.resolve({
        path: '/Journal',
        query:{
          Id:d,Name:f
        }
      })
      window.open(href,'_blank')
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
    getRouterData(){
      this.approvalNumber=this.$route.query.approvalNumber
    },
    searcher1(){
      const {href}=this.$router.resolve({
        path: '/SearchFund',
        query:{
          search1:this.searchContent
        }
      })
      window.open(href,'_blank')
    },
    Searcher1(){
      this.loading=true
      this.$axios.get(`/pubmed/getFundInfo`,{
        params:{number:this.approvalNumber}
      }).then(result=>{
        if(result.data.res==undefined){
          this.fundDetails=[]
          this.hostStudentsList=[]
          this.journalTypeTop=[]
          this.aggs=[]
        }else{
          this.fundDetails=result.data.res.fundDetails
          // console.log(this.fundDetails)
          this.hostStudentsList=this.fundDetails.hostStudentsList
          this.joinStudentsList=this.fundDetails.joinStudentsList
          this.aggs=result.data.res.aggs
          // console.log(result.data.res.articleList)
          
          if(result.data.res.fundList==""){
            this.fundList=[]
            this.listlength=0
            this.articleList=[]
          }else{
            this.fundList=result.data.res.fundList
            this.listlength=result.data.res.fundList.searchData.length
            this.articleList=result.data.res.articleList
          }
          // console.log(result.data.res.fundList)
          
        }
        if(result.data.status==200){
            this.loading=false
          }
      })
    },
    xue(){
      var ac={}
      if(typeof(this.fundDetails.title)!='undefined'){
        ac.name=this.fundDetails.title
        ac.symbolSize=40
        this.title1.push(ac)
      }
      let count=this.aggs;
      let count1=this.aggs
      delete count.searchTime
      let bbb=[]
      let z1=[]
      for(var name1 in count){
        this.title2.push({name:name1,symbolSize:30})
        bbb=count[name1].fund.searchData
        bbb.map(function(obj,index) { 
          z1.push(obj)
          return obj;//如果不返回则输出： Array [undefined, undefined, undefined]
        });
        
      }
      z1.map(function(obj,index) { 
        obj.id=index+1
        return obj;//如果不返回则输出： Array [undefined, undefined, undefined]
      });
      let b1=[]
      let x1=[]
      for(var name2 in count1){
        this.title4.push({source:name2,target:this.fundDetails.title})
        b1=count1[name2].fund.searchData
        b1.map(function(obj,index) { 
          obj.target=name2;
          x1.push(obj)
          return obj;//如果不返回则输出： Array [undefined, undefined, undefined]
        });
      }
      var tit2=this.title2
      x1.map(function(obj,index) { 
        obj.source=index+tit2.length+1
        return obj;//如果不返回则输出： Array [undefined, undefined, undefined]
      });
      var ccc = JSON.parse(JSON.stringify(z1).replace(/title/g,'name'));
      var av=(this.title1).concat(this.title2)
      var ac=av.concat(ccc)
      ac.map(function(obj,index) { 
        delete obj.source
        return obj;//如果不返回则输出： Array [undefined, undefined, undefined]
      });
      
      var a5=(this.title4).concat(x1)
      a5.map(function(obj,index) { 
        delete obj.id
        return obj;//如果不返回则输出： Array [undefined, undefined, undefined]
      });
      // console.log(ac)
      $('.xuezhe').html('<div id="xue1" style="width: 760px; height: 500px"></div>')
      var echarts1 = document.getElementById("xue1");
      // 绘制图表
      if(echarts1){
        let myChart = this.echarts.init(echarts1)
        myChart.clear();
        myChart.setOption({
          tooltip: {},
          series: [{
            edgeSymbol: ['arrow','' ],
            itemStyle: {                
              normal: {
                color:'#224ec2',
                lineStyle: {
                  color: '#224ec2' //改变折线颜色
                },
                label: {
                  position: 'top',
                  show: true,
                  textStyle: {
                    color: '#333'
                  }
                },
                nodeStyle: {
                  brushType: 'both',
                  borderColor: 'rgb(255,215,0)',
                  borderWidth: 1
                },
                linkStyle: {
                  normal: {
                    color: 'source',
                    curveness: 0,
                    type: "solid"
                  }
                }
              },

            },
            draggable : true,//节点是否可拖拽
            focusNodeAdjacency : true,//是否在鼠标移到节点上的时候突出显示节点以及节点的边和邻接节点
            animation: false,
            name:"",
            type: 'graph',//关系图类型
            layout: 'force',//引力布局
            force : { //力引导图基本配置
              //initLayout: ,//力引导的初始化布局，默认使用xy轴的标点
              repulsion : 100,//节点之间的斥力因子。支持数组表达斥力范围，值越大斥力越大。
              gravity : 0.03,//节点受到的向中心的引力因子。该值越大节点越往中心点靠拢。
              edgeLength :100,//边的两个节点之间的距离，这个距离也会受 repulsion。[10, 50] 。值越小则长度越长
              layoutAnimation : true
            //因为力引导布局会在多次迭代后才会稳定，这个参数决定是否显示布局的迭代动画，在浏览器端节点数据较多（>100）的时候不建议关闭，布局过程会造成浏览器假死。                        
            },
            roam: true,//可以拖动
            useWorker: false,
            minRadius: 15,
            maxRadius: 25,
            gravity: 1.1,
            scaling: 1.1,
            data:ac,
            links:a5
            }]         
        })
        myChart.on('click', (param)=>{
            if (param.dataType == 'node') {
              if(typeof(param.data.approvalNumber)=="undefined"){
                if(param.data.symbolSize==30){
                  const {href}=this.$router.resolve({
                  path: '/SearchFund',
                  query:{
                    search1:`studentsAll:"${param.data.name}"`
                  }
                  })
                  window.open(href,'_blank')
                }else{

                }
              }else{
                const {href}=this.$router.resolve({
                path: '/Fund',
                query:{
                  approvalNumber:param.data.approvalNumber
                }
                })
                window.open(href,'_blank')
              }
            }else{
              if(typeof(param.data.approvalNumber)=="undefined"){
                const {href}=this.$router.resolve({
                path: '/SearchFund',
                query:{
                  search1:`studentsAll:"${param.data.source}"`
                }
                })
                window.open(href,'_blank')
              }else{
                const {href}=this.$router.resolve({
                path: '/Fund',
                query:{
                  approvalNumber:param.data.approvalNumber
                }
                })
                window.open(href,'_blank')
              }
            }
        });
      }
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
    .SearchContent3{
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
    z-index: 80;
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
  .SearchContent1>div:nth-child(1){
    width: 80%;
  }
  .SearchContent1>div:nth-child(1)>table{
    width: 100%;
  }
  .SearchContent1>div:nth-child(2){
    width: 20%;
  }
  table tbody tr td { border:1px solid rgba(243,243,253,1); }
  table thead tr th { border:1px solid rgba(243,243,253,1); }

  .tableTbody>tr>td{
    width: 16.6%;
    padding: 14px 
  }.tableTbody>tr>td:nth-child(1){
    width: 20%;
    text-align: center;
  }
  .sci{
    display: flex;
    flex-direction: row;
  }
  .sci>div{
    width: 100px;
    text-align: center;
  }
  .link{
    background:#E7EDF9;
  }
  .link>div{
    background: #fff;
    margin-left: 10px;
    width: 100%;
    height: 100%;
    padding: 20px;
  }
  .link>div>p:nth-child(1){
    font-size:14px;
    font-family:Source Han Sans CN;
    font-weight:400;
    color:rgba(51,51,51,1);
    padding-left: 10px;
    border-left: 2px solid #0382D9;
  }
  .link>div>p:nth-child(3){
    font-size:14px;
    font-family:Source Han Sans CN;
    font-weight:400;
    color:rgba(51,51,51,1);
    padding-left: 10px;
    border-left: 2px solid #0382D9;
  }
  .link>div>div:nth-child(2)>p{
    font-size:12px;
    font-family:Source Han Sans CN;
    font-weight:400;
    color:rgba(0,151,255,1) !important;
    cursor: pointer;
    margin-left: 10px;
    margin-bottom: 10px;
  }
  .link>div>div:nth-child(2)>p:hover{
    text-decoration: underline;
    cursor: pointer;
  }
  .link>div>p:nth-child(4){
    font-size:12px;
    font-family:Source Han Sans CN;
    font-weight:400;
    color:rgba(0,151,255,1) !important;
    cursor: pointer;
    margin-left: 10px;
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
  .tableTbody>tr:nth-child(4)>td>span:nth-child(2n){
    margin: 0 10px;
    color: #898989;
  }
  .tableTbody>tr:nth-child(5)>td>span:nth-child(2n){
    margin: 0 10px;
    color: #898989;
  }
  .tableTbody>tr:nth-child(6)>td:nth-child(2){
    letter-spacing:1px;
  }
  .projectAbstractC{
    color: #666;
    /* letter-spacing:1px; */
    line-height: 26px;
  }
  .conclusionAbstract{
    color: #666;
    /* letter-spacing:1px; */
    line-height: 26px;
  }
  .Achievements{
    width: 100%;
    margin: 20px 0;
  }
  .Achievements>thead>tr>th{
    text-align: center;
    font-size: 16px;
    padding: 10px 0;
    letter-spacing: 4px;
  }
  .Achievements>tbody>tr:nth-child(2n+1){
    background: #f9f9f9;
  }
  .Achievements>tbody>tr>td{
    padding: 6px 0;
  }
  .SearchContent3{
    width: 100%;
    margin: 0 auto;
    display: flex;
    flex-direction: row;
  }
  .SearchContent2>table{
    width: 80%;
  }
  .SearchContent3>table{
    width: 80%;

  }
  .SearchBodyTwo{
    box-sizing: border-box;
    padding: 0 15px;
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
  .SearchBodyTwo>ul>li>div>p:nth-child(1)>span:hover{
    cursor: pointer;
    color: #304d99;
  }
  .SearchBodyTwo>ul>li>div>p:nth-child(1)>img{
    margin-left: 10px;
    width: 14px;
    cursor: pointer;
  }
  .SearchBodyTwo>ul>li>div>p:nth-child(1)>img:hover{
    margin-left: 10px;
    width: 14px;
    cursor: pointer;
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
    width: 80%;
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
  .sta:hover{
    color: #3C61C3;
    cursor: pointer;
  }
  .sta1{
    margin: 0 10px;
  }
  .sta1:hover{
    color: #3C61C3;
    cursor: pointer;
  }
</style>