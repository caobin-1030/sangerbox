<template>
  <div>
    <Header/>
    <div class="fileselect" v-if="fileselect"  @click="downDiscuoption2">
      <div @click.stop="settingEvent()">
        <Filecom/>
      </div>
    </div>
    <div class="all">
      <div class="top">
        <p>本站TCGA数据来源于GDC API，每天同步更新，文章写作示例：利用GDC API下载TCGA-THCA的RNA-seq数据，下载时间为XXXX-XX-XX，其中癌症样本包含X个，正常样本包含X个，所有肿瘤样本均来源于未经治疗之前。</p>
      </div>
      <div class="content">
        <div class="contentLeft">
          <el-radio-group v-model="radio" @change="CategoryFilesCount();StrategyFilesCount();xuritu()">
            <el-radio v-for="(item,i) of tcgaCancerSelectList" :key="i" style="width:100%" :title="item.label" :label="item.id">{{item.label.length>33?item.label.slice(0,33)+'...' : item.label}}</el-radio>
          </el-radio-group>
        </div>
        <div class="contentRight1">
          <div class="rightTop">
            <p class="title">{{radio}}数据统计</p>
            <div >
              <div>
                <table>
                  <thead>
                    <tr>
                      <th>Data Category</th>
                      <th>Cases</th>
                      <th>Files</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item,i) of tcgaCancerCaseCount" :key="i">
                      <td>{{item.dataCategory}}</td>
                      <td>{{item.count}}</td>
                      <td>{{item.count1}}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div>
                <table>
                  <thead>
                    <tr>
                      <th>Experimental Strategy</th>
                      <th>Cases</th>
                      <th>Files</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item,i) of tcgaCancerStrategyCaseCount" :key="i">
                      <td>{{item.experimentalStrategy}}</td>
                      <td>{{item.count}}</td>
                      <td>{{item.count1}}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div class="rightMidd">
            <div>
              <span style="font-size:16px">转录组：</span>
              <el-radio-group v-model="radio1" size="medium" @change="TcgaTypeInfo()">
                <el-radio-button v-for="(item,i) of zhuanluzu" :key="i" :label="item.value!=undefined?item.label:item">{{item.value!=undefined?item.value:item}}</el-radio-button>
              </el-radio-group>
            </div>
            <div>
              <span style="font-size:16px">外显子组：</span>
              <el-radio-group v-model="radio1" size="medium" @change="TcgaTypeInfo()">
                <el-radio-button v-for="(item,i) of waixianzi" :key="i" :label="item.value!=undefined?item.label:item">{{item.value!=undefined?item.value:item}}</el-radio-button>
              </el-radio-group>
            </div>
            <div>
              <span style="font-size:16px">甲基化：</span>
              <el-radio-group v-model="radio1" size="medium" @change="TcgaTypeInfo()">
                <el-radio-button v-for="(item,i) of jiajihua" :key="i" :label="item.value!=undefined?item.label:item">{{item.value!=undefined?item.value:item}}</el-radio-button>
              </el-radio-group>
            </div>
            <div>
              <span style="font-size:16px">拷贝数变异：</span>
              <el-radio-group v-model="radio1" size="medium" @change="TcgaTypeInfo()">
                <el-radio-button v-for="(item,i) of kaobeishu" :key="i" :label="item.value!=undefined?item.label:item">{{item.value!=undefined?item.value:item}}</el-radio-button>
              </el-radio-group>
            </div>
            <div>
              <span style="font-size:16px">临床信息：</span>
              <el-radio-group v-model="radio1" size="medium" @change="TcgaTypeInfo()">
                <el-radio-button v-for="(item,i) of linchuang" :key="i" :label="item"></el-radio-button>
              </el-radio-group>
            </div>
            <div>
              <span style="font-size:16px">影像组：</span>
              <el-radio-group v-model="radio1" size="medium" @change="TcgaTypeInfo()">
                <el-radio-button v-for="(item,i) of yingxiang" :key="i" :label="item.value!=undefined?item.label:item">{{item.value!=undefined?item.value:item}}</el-radio-button>
              </el-radio-group>
            </div>
            <div>
              <span style="font-size:16px">其他数据：</span>
              <el-radio-group v-model="radio1" size="medium" @change="TcgaTypeInfo()">
                <el-radio-button v-for="(item,i) of qita" :key="i" :label="item"></el-radio-button>
              </el-radio-group>
            </div>
          </div>
          <div class="tab1">
            <el-tabs v-model="activeName" @tab-click="handleClick" tabPosition="right">
              <el-tab-pane label="样本统计" name="tongji">
                <div class="perer" v-loading="loading1"
                element-loading-text="拼命加载中"
                element-loading-spinner="el-icon-loading"
                element-loading-background="f5f5f5" v-if="isvip>0">
                  <div id="xiri1" style="width:687px; height: 687px"></div>
                </div>
                <div v-else>
                  <div style="width:100%;text-align: center">
                    <p>开通 <span @click="tovip" style="cursor: pointer;color: #3366cc;">高级会员</span> 获得此功能</p>
                  </div>
                </div>
              </el-tab-pane>
              <el-tab-pane label="样本类型统计" name="leixing">
                <div v-loading="loading1"
                element-loading-text="拼命加载中"
                element-loading-spinner="el-icon-loading"
                element-loading-background="f5f5f5" v-if="isvip>0">
                  <img :src="xuriimg" alt="">
                </div>
                <div v-else>
                  <div style="width:100%;text-align: center">
                    <p>开通 <span @click="tovip" style="cursor: pointer;color: #3366cc;">高级会员</span> 获得此功能</p>
                  </div>
                </div>
              </el-tab-pane>
            </el-tabs>
          </div>
          <div class="rightBottom"  v-loading="loading"
          element-loading-text="拼命加载中"
          element-loading-spinner="el-icon-loading"
          element-loading-background="f5f5f5">
            <div class="aaa" v-if="tcgaTypeInfoList.length!=0" >
              <span>{{radio}}/{{radio1}}</span>
              <el-button v-if="radio1!='未本地化'" :title='location==true?"存在未本地化数据":""' :disabled='location' type="primary" size="small"  @click="download()">下载到个人中心</el-button>
            </div>
            <div v-if="tcgaTypeInfoList.length>0">
              <el-table border :data="tcgaTypeInfoList.slice((currentPage-1)*pagesize,currentPage*pagesize)" style="max-width:350%;">
                <el-table-column prop="submitterId" label="Submitter Id" width='120px'>
                </el-table-column>
                <el-table-column prop="sampleType" label="Sample Type" width='100px'>
                </el-table-column>
                <el-table-column prop="fileId" label="File Id" width='300px'>
                </el-table-column>
                <el-table-column prop="fileName" label="File Name" width='370px'>
                </el-table-column>
                <el-table-column prop="dataCategory" label="Data Category" width='170px'>
                </el-table-column>
                <el-table-column prop="dataType" label="Data Type" width='220px'>
                </el-table-column>
                <el-table-column prop="experimentalStrategy" label="Experimental Strategy" width='160px'>
                </el-table-column>
                <el-table-column prop="workflowType" label="Workflow Type" width='160px'>
                </el-table-column>
              </el-table>
            </div>
            <div v-else>
              <div style="width:100%;text-align: center">
                <img style="margin-top:200px;height:150px" src="../../public/img/none.png" alt="">
              </div>
            </div>
            <div class="bottom1" v-if="tcgaTypeInfoList.length!=0">
              <el-pagination
                @current-change="handleCurrentChange"
                @size-change="handleSizeChange"
                :current-page.sync="currentPage"
                layout="total, sizes, prev, pager, next, jumper" 
                :page-sizes="[20, 30, 50, 80]"
                :page-size="pagesize"
                :total="tcgaTypeInfoList.length">
              </el-pagination>
              
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
export default {
  metaInfo() {
    return {title:'SangerBox TCGA数据下载'} // set a title
  },
  components:{
    Header,Footer,Filecom
  },
  data() {
    return {
      tcgaCancerSelectList:[],radio:'TCGA-THCA',tcgaCancerCaseCount:[],tcgaCancerFilesCount:[],tcgaCancerStrategyFilesCount:[],tcgaCancerStrategyCaseCount:[],
      radio1:'',tcgaTypeInfoList:[],currentPage:1,pagesize:20,loading:false,zhuanluzu:['FPKM','FPKM-UQ','Counts','前体miRNA','成熟体miRNA',{label:'Other1',value:'Other'}],yingxiang:['Tissue Slide','Diagnostic Slide',{label:'Other6',value:'Other'}],waixianzi:['MuSE','MuTect2','SomaticSniper','VarScan2',{label:'Other2',value:'Other'}],jiajihua:['Illumina Human Methylation 450','Illumina Human Methylation 27',{label:'Other3',value:'Other'}],kaobeishu:['CNV','MaskCNV','Gene Leve CNV','等位基因特异性拷贝数',{label:'Other4',value:'Other'}],linchuang:['Clinical','Other','Biospecimen'],qita:['已本地化','未本地化'],activeName: 'tongji',fileselect:false,xuri:null,location:false,
      zhengchang1:[{value: 'RNA-seq',label: 'RNA-seq'},{value: 'miRNA-seq',label: 'miRNA-seq'},{value: 'SNV',label: 'SNV'},{value: 'CNV',label: 'CNV'},{value: 'Clinical',label: 'Clinical'},{value: 'TissueSlide',label: 'TissueSlide'},{value: 'DiagnosticSlide',label: 'DiagnosticSlide'},{value: 'Methy450k',label: 'Methy450k'},{value: 'Methy27k',label: 'Methy27k'}],zhengchang:[],isvip:null,loading1:false,yangben:'',xuriimg:''
      
    }
  },
  
  mounted() {
    this.isvip=localStorage.getItem('isvip')
    this.axios.get('/pubmed/getTcgaCancerSelectList').then(result=>{
      if(result.data.res.tcgaCancerSelectList.length>0){

        this.tcgaCancerSelectList=result.data.res.tcgaCancerSelectList.reverse()
        this.tcgaCancerSelectList.map(a =>{
          a.label=`${a.id} (${a.name})`
        })
        this.CategoryFilesCount()
        this.StrategyFilesCount()
        this.radio1='Clinical'
        this.xuri111().then(e=>{
          if(this.isvip>0){
            var data=[]
            for(var data1 in this.xuri){
              data.push(this.xuri[data1])
            }
            $('.perer').html('<div id="xuri1" style="width:687px; height: 687px"></div>')
            var echarts1 = document.getElementById("xuri1");
            // 绘制图表
            if(echarts1){
              let myChart = this.echarts.init(echarts1)
              myChart.clear();
              myChart.setOption({
                tooltip : {
                  trigger: 'item',
                  formatter: "{b}: {c}",
                },
                label:{
                  formatter: function (params) {
                    var val="";
                    if(params.name.length >10){
                      val = params.name.substr(0,10)+'...';
                      return val;
                    }else{
                      return params.name;
                    }
                  }
                },
                title: {
                  text: this.radio,
                  textStyle: {
                      fontSize: 14,
                      align: 'center'
                  },
                  subtextStyle: {
                      align: 'center'
                  },
                },
                series: {
                  type: 'sunburst',
                  data: data,
                  highlightPolicy: 'ancestor',
                  radius: [0, '60%'],
                  sort: null,
                  levels: [{}, {
                      label: {
                          show:false
                      }
                  }, {
                      label: {
                          show:false
                      }
                  },{
                      label: {
                          show:false
                      }
                  },{
                      label: {
                          show:false
                      }
                  },{
                      r0: '35%',
                      r: '70%',
                      label: {
                          position: 'inside',
                          color:'#000',
                          padding: 3,
                      },
                  }, {
                      r0: '70%',
                      r: '72%',
                      label: {
                          position: 'outside',
                          color:'#000',
                          silent: false,
                          padding: 3,
                      },
                  }]
                },
                
              })
            }
          }
          
        })
        
      }
    })
  },
  methods: {
    tovip(){
      const {href} =this.$router.resolve({
        path: '/Personal',query:{type:'vip'}
      })
      window.open(href, '_blank')
    },
    downDiscuoption2(){
      this.fileselect=false
    },
    settingEvent(){},
    shujuzhongxin(){
      this.fileselect=true
    },
    handleClick(){

    },
    download(){
      switch (this.radio1) {
        case 'FPKM' :
          var qs=require('qs');
          this.axios.post(`/pubmed/downloadTcgaDataAll`, qs.stringify({
            id:this.radio,
            type:'FPKM',
            workflowType:'HTSeq - FPKM'
          })).then(result=>{
          })
          break;
        case 'FPKM-UQ' :
          var qs=require('qs');
          this.axios.post(`/pubmed/downloadTcgaDataAll`, qs.stringify({
            id:this.radio,
            type:'FPKM-UQ',
            workflowType:'HTSeq - FPKM-UQ'
          })).then(result=>{

          })
          break;
        case 'Counts' :
          var qs=require('qs');
          this.axios.post(`/pubmed/downloadTcgaDataAll`, qs.stringify({
            id:this.radio,
            type:'Counts',
            workflowType:'HTSeq - Counts'
          })).then(result=>{
            
          })
          break;
        case '前体miRNA' :
          var qs=require('qs');
          this.axios.post(`/pubmed/downloadTcgaDataAll`, qs.stringify({
            id:this.radio,
            type:'前体miRNA',
            workflowType:'BCGSC miRNA Profiling',
            dataType:'miRNA Expression Quantification'
          })).then(result=>{
            
          })
          break;
        case '成熟体miRNA' :
          var qs=require('qs');
          this.axios.post(`/pubmed/downloadTcgaDataAll`, qs.stringify({
            id:this.radio,
            type:'成熟体miRNA',
            workflowType:'BCGSC miRNA Profiling',
            dataType:'Isoform Expression Quantification'
          })).then(result=>{
            
          })
          break;
        case 'Other1' :
          var qs=require('qs');
          this.axios.post(`/pubmed/downloadTcgaDataAll`, qs.stringify({
            id:this.radio,
            type:'Other',
            dataCategory:'Transcriptome Profiling',
            transferNoT:'1'
          })).then(result=>{

          })
          break;
        case 'Muse' :
          var qs=require('qs');
          this.axios.post(`/pubmed/downloadTcgaDataAll`, qs.stringify({
            id:this.radio,
            type:'MuSE',
            workflowType:'MuSE Variant Aggregation and Masking',
            dataType:'Masked Somatic Mutation'
          })).then(result=>{
            
          })
          break;
        case 'VarScan2' :
          var qs=require('qs');
          this.axios.post(`/pubmed/downloadTcgaDataAll`, qs.stringify({
            id:this.radio,
            type:'VarScan2',
            workflowType:'VarScan2 Variant Aggregation and Masking',
            dataType:'Masked Somatic Mutation'
          })).then(result=>{
            
          })
          break;
        case 'Other2' :
          var qs=require('qs');
          this.axios.post(`/pubmed/downloadTcgaDataAll`, qs.stringify({
            id:this.radio,
            type:'Other',
            dataCategory:'Simple Nucleotide Variation',
            outsideNoT:'1'
          })).then(result=>{

          })
          break;
        case 'MuTect2' :
          var qs=require('qs');
          this.axios.post(`/pubmed/downloadTcgaDataAll`, qs.stringify({
            id:this.radio,
            type:'MuTect2',
            workflowType:'MuTect2 Variant Aggregation and Masking',
            dataType:'Masked Somatic Mutation'
          })).then(result=>{
            
          })
          break;
        case 'SomaticSniper' :
          var qs=require('qs');
          this.axios.post(`/pubmed/downloadTcgaDataAll`, qs.stringify({
            id:this.radio,
            type:'SomaticSniper',
            workflowType:'SomaticSniper Variant Aggregation and Masking',
            dataType:'Masked Somatic Mutation'
          })).then(result=>{
            
          })
          break;
        case 'Illumina Human Methylation 450' :
          var qs=require('qs');
          this.axios.post(`/pubmed/downloadTcgaDataAll`, qs.stringify({
            id:this.radio,
            workflowType:'Liftover',
            type:'450k',
            dataType:'Methylation Beta Value',
            platform:'Illumina Human Methylation 450'
          })).then(result=>{
            
          })
          break;
        case 'Illumina Human Methylation 27' :
          var qs=require('qs');
          this.axios.post(`/pubmed/downloadTcgaDataAll`, qs.stringify({
            id:this.radio,
            type:'27k',
            workflowType:'Liftover',
            dataType:'Methylation Beta Value',
            platform:'Illumina Human Methylation 27'
          })).then(result=>{
            
          })
          break;
        case 'Other3' :
          var qs=require('qs');
          this.axios.post(`/pubmed/downloadTcgaDataAll`, qs.stringify({
            id:this.radio,
            type:'Other',
            dataCategory:'DNA Methylation',
            platformNoT:'1'
          })).then(result=>{

          })
          break;
        case 'CNV' :
          var qs=require('qs');
          this.axios.post(`/pubmed/downloadTcgaDataAll`, qs.stringify({
            id:this.radio,
            type:'CNV',
            workflowType:'DNAcopy',
            dataType:'Copy Number Segment'
          })).then(result=>{
            
          })
          break;
        case 'MaskCNV' :
          var qs=require('qs');
          this.axios.post(`/pubmed/downloadTcgaDataAll`, qs.stringify({
            id:this.radio,
            type:'MaskCNV',
            workflowType:'DNAcopy',
            dataType:'Masked Copy Number Segment'
          })).then(result=>{
            
          })
          break;
        case 'Clinical' :
          var qs=require('qs');
          this.axios.post(`/pubmed/downloadTcgaDataAll`, qs.stringify({
            id:this.radio,
            type:'Clinical',
            dataCategory:'Clinical',
            dataFormat:'BCR XML'
          })).then(result=>{
          })
          break;
        case 'Other' :
          var qs=require('qs');
          this.axios.post(`/pubmed/downloadTcgaDataAll`, qs.stringify({
            id:this.radio,
            type:'Other',
            dataCategory:'Clinical',
            dataFormatNoT:'BCR XML'
          })).then(result=>{
            
          })
          break;
        case 'Biospecimen' :
          var qs=require('qs');
          this.axios.post(`/pubmed/downloadTcgaDataAll`, qs.stringify({
            id:this.radio,
            type:'Biospecimen',
            dataCategory:'Biospecimen',
            dataFormatNoT:'SVS'
          })).then(result=>{

          })
          break;
        case '已本地化' :
          var qs=require('qs');
          this.axios.post(`/pubmed/downloadTcgaDataAll`, qs.stringify({
            id:this.radio,
            location:'1'
          })).then(result=>{
          })
          break;
        case '未本地化' :
          var qs=require('qs');
          this.axios.post(`/pubmed/downloadTcgaDataAll`, qs.stringify({
            id:this.radio,
            locationNot:'1'
          })).then(result=>{
          })
          break;
        case 'Gene Leve CNV' :
          var qs=require('qs');
          this.axios.post(`/pubmed/downloadTcgaDataAll`, qs.stringify({
            id:this.radio,
            type:'GeneLeveCNV',
            dataType:'Gene Level Copy Number'
          })).then(result=>{
          })
          break;
        case '等位基因特异性拷贝数' :
          var qs=require('qs');
          this.axios.post(`/pubmed/downloadTcgaDataAll`, qs.stringify({
            id:this.radio,
            type:'等位基因特异性拷贝数',
            dataType:'Allele-specific Copy Number Segment'
          })).then(result=>{
          })
          break;
        case 'Other4' :
          var qs=require('qs');
          this.axios.post(`/pubmed/downloadTcgaDataAll`, qs.stringify({
            id:this.radio,
            type:'Other',
            dataCategory:'Copy Number Variation'
          })).then(result=>{

          })
          break;
        case 'Tissue Slide' :
          var qs=require('qs');
          this.axios.post(`/pubmed/downloadTcgaDataAll`, qs.stringify({
            id:this.radio,
            type:'TissueSlide',
            experimental:'Tissue Slide',
            dataType:'Biospecimen' 
          })).then(result=>{
          })
          break;
        case 'Diagnostic Slide' :
          var qs=require('qs');
          this.axios.post(`/pubmed/downloadTcgaDataAll`, qs.stringify({
            id:this.radio,
            type:'DiagnosticSlide',
            experimental:'Diagnostic Slide',
            dataType:'Biospecimen' 
          })).then(result=>{
          })
          break;
        case 'Other6' :
          var qs=require('qs');
          this.axios.post(`/pubmed/downloadTcgaDataAll`, qs.stringify({
            id:this.radio,
            type:'Other',
            experimentalNoT:'1' 
          })).then(result=>{
          })
      }
    },
    handleSizeChange(val){
      this.pagesize=val
    },
    handleCurrentChange(currentPage){

    },
    async xuri111(){
      this.loading1=true
      var qs=require('qs');
      await this.axios.post(`/pubmed/getTcgaTypeInfos`, qs.stringify({
        id:this.radio
      },{responseType:'arraybuffer'})).then(result=>{
        
        if(result.data.res.json!=undefined){
          this.xuri=result.data.res.json
          this.xuriimg=`data:image/png;base64,${result.data.res.img}`
          this.loading1=false
          return this.xuri
        }
      })
    },
    CategoryFilesCount(){
      this.tcgaTypeInfoList=[]
      this.axios.get('/pubmed/getTcgaCancerCategoryFilesCount',{
        params:{
          id:this.radio
        }
      }).then(result=>{
        if(result.data.res!=undefined){
          this.tcgaCancerFilesCount=result.data.res.tcgaCancerFilesCount
          this.axios.get('/pubmed/getTcgaCancerCategoryCaseCount',{
            params:{
              id:this.radio
            }
          }).then(result=>{
            if(result.data.res!=undefined){
              this.tcgaCancerCaseCount=result.data.res.tcgaCancerCaseCount
              for(let a in this.tcgaCancerCaseCount){
                this.tcgaCancerCaseCount[a].count1=this.tcgaCancerFilesCount[a].count
              }
            }
          })
        }
      })
    },
    StrategyFilesCount(){
      this.axios.get('/pubmed/getTcgaCancerStrategyFilesCount',{
        params:{
          id:this.radio
        }
      }).then(result=>{
        if(result.data.res!=undefined){
          this.tcgaCancerStrategyFilesCount=result.data.res.tcgaCancerStrategyFilesCount
          this.axios.get('/pubmed/getTcgaCancerStrategyCaseCount',{
            params:{
              id:this.radio
            }
          }).then(result=>{
            if(result.data.res!=undefined){
              this.tcgaCancerStrategyCaseCount=result.data.res.tcgaCancerStrategyCaseCount
              for(let a in this.tcgaCancerStrategyCaseCount){
                this.tcgaCancerStrategyCaseCount[a].count1=this.tcgaCancerStrategyFilesCount[a].count
              }
              this.TcgaTypeInfo()
            }
          })
        }
      })
    },
    TcgaTypeInfo(){
      this.loading=true
      switch (this.radio1) {
        case 'FPKM' :
          var qs=require('qs');
          this.axios.post(`/pubmed/getTcgaTypeInfo`, qs.stringify({
            id:this.radio,
            workflowType:'HTSeq - FPKM'
          },{responseType:'arraybuffer'})).then(result=>{
            this.loading=false
            if(result.data.res.tcgaTypeInfoList!=undefined){
              this.tcgaTypeInfoList=result.data.res.tcgaTypeInfoList
              this.xuri=result.data.res.resp
              const obj=this.tcgaTypeInfoList
              this.location=obj.every(item => !('location' in item))
            }
          })
          break;
        case 'FPKM-UQ' :
          var qs=require('qs');
          this.axios.post(`/pubmed/getTcgaTypeInfo`, qs.stringify({
            id:this.radio,
            workflowType:'HTSeq - FPKM-UQ'
          },{responseType:'arraybuffer'})).then(result=>{
            this.loading=false
            if(result.data.res.tcgaTypeInfoList!=undefined){
              this.tcgaTypeInfoList=result.data.res.tcgaTypeInfoList
              this.xuri=result.data.res.resp
              const obj=this.tcgaTypeInfoList
              this.location=obj.every(item => !('location' in item))
            }
          })
          break;
        case 'Counts' :
          var qs=require('qs');
          this.axios.post(`/pubmed/getTcgaTypeInfo`, qs.stringify({
            id:this.radio,
            workflowType:'HTSeq - Counts'
          },{responseType:'arraybuffer'})).then(result=>{
            this.loading=false
            if(result.data.res.tcgaTypeInfoList!=undefined){
              this.tcgaTypeInfoList=result.data.res.tcgaTypeInfoList
              this.xuri=result.data.res.resp
              const obj=this.tcgaTypeInfoList
              this.location=obj.every(item => !('location' in item))
            }
          })
          break;
        case '前体miRNA' :
          var qs=require('qs');
          this.axios.post(`/pubmed/getTcgaTypeInfo`, qs.stringify({
            id:this.radio,
            workflowType:'BCGSC miRNA Profiling',
            dataType:'miRNA Expression Quantification'
          },{responseType:'arraybuffer'})).then(result=>{
            this.loading=false
            if(result.data.res.tcgaTypeInfoList!=undefined){
              this.tcgaTypeInfoList=result.data.res.tcgaTypeInfoList
              this.xuri=result.data.res.resp
              const obj=this.tcgaTypeInfoList
              this.location=obj.every(item => !('location' in item))
            }
          })
          break;
        case '成熟体miRNA' :
          var qs=require('qs');
          this.axios.post(`/pubmed/getTcgaTypeInfo`, qs.stringify({
            id:this.radio,
            workflowType:'BCGSC miRNA Profiling',
            dataType:'Isoform Expression Quantification'
          },{responseType:'arraybuffer'})).then(result=>{
            this.loading=false
            if(result.data.res.tcgaTypeInfoList!=undefined){
              this.tcgaTypeInfoList=result.data.res.tcgaTypeInfoList
              this.xuri=result.data.res.resp
              const obj=this.tcgaTypeInfoList
              this.location=obj.every(item => !('location' in item))
            }
          })
          break;
        case 'Other1' :
          var qs=require('qs');
          this.axios.post(`/pubmed/getTcgaTypeInfo`, qs.stringify({
            id:this.radio,
            dataCategory:'Transcriptome Profiling',
            transferNoT:'1'
          },{responseType:'arraybuffer'})).then(result=>{
            this.loading=false
            if(result.data.res.tcgaTypeInfoList!=undefined){
              this.tcgaTypeInfoList=result.data.res.tcgaTypeInfoList
              this.xuri=result.data.res.resp
              const obj=this.tcgaTypeInfoList
              this.location=obj.every(item => !('location' in item))
            }
          })
          break;
        case 'Muse' :
          var qs=require('qs');
          this.axios.post(`/pubmed/getTcgaTypeInfo`, qs.stringify({
            id:this.radio,
            workflowType:'MuSE Variant Aggregation and Masking',
            dataType:'Masked Somatic Mutation'
          },{responseType:'arraybuffer'})).then(result=>{
            this.loading=false
            if(result.data.res.tcgaTypeInfoList!=undefined){
              this.tcgaTypeInfoList=result.data.res.tcgaTypeInfoList
              this.xuri=result.data.res.resp
              const obj=this.tcgaTypeInfoList
              this.location=obj.every(item => !('location' in item))
            }
          })
          break;
        case 'VarScan2' :
          var qs=require('qs');
          this.axios.post(`/pubmed/getTcgaTypeInfo`, qs.stringify({
            id:this.radio,
            workflowType:'VarScan2 Variant Aggregation and Masking',
            dataType:'Masked Somatic Mutation'
          },{responseType:'arraybuffer'})).then(result=>{
            this.loading=false
            if(result.data.res.tcgaTypeInfoList!=undefined){
              this.tcgaTypeInfoList=result.data.res.tcgaTypeInfoList
              this.xuri=result.data.res.resp
              const obj=this.tcgaTypeInfoList
              this.location=obj.every(item => !('location' in item))
            }
          })
          break;
        case 'Other2' :
          var qs=require('qs');
          this.axios.post(`/pubmed/getTcgaTypeInfo`, qs.stringify({
            id:this.radio,
            dataCategory:'Simple Nucleotide Variation',
            outsideNoT:'1'
          },{responseType:'arraybuffer'})).then(result=>{
            this.loading=false
            if(result.data.res.tcgaTypeInfoList!=undefined){
              this.tcgaTypeInfoList=result.data.res.tcgaTypeInfoList
              this.xuri=result.data.res.resp
              const obj=this.tcgaTypeInfoList
              this.location=obj.every(item => !('location' in item))
            }
          })
          break;
        case 'MuTect2' :
          var qs=require('qs');
          this.axios.post(`/pubmed/getTcgaTypeInfo`, qs.stringify({
            id:this.radio,
            workflowType:'MuTect2 Variant Aggregation and Masking',
            dataType:'Masked Somatic Mutation'
          },{responseType:'arraybuffer'})).then(result=>{
            this.loading=false
            if(result.data.res.tcgaTypeInfoList!=undefined){
              this.tcgaTypeInfoList=result.data.res.tcgaTypeInfoList
              this.xuri=result.data.res.resp
              const obj=this.tcgaTypeInfoList
              this.location=obj.every(item => !('location' in item))
            }
          })
          break;
        case 'SomaticSniper' :
          var qs=require('qs');
          this.axios.post(`/pubmed/getTcgaTypeInfo`, qs.stringify({
            id:this.radio,
            workflowType:'SomaticSniper Variant Aggregation and Masking',
            dataType:'Masked Somatic Mutation'
          },{responseType:'arraybuffer'})).then(result=>{
            this.loading=false
            if(result.data.res.tcgaTypeInfoList!=undefined){
              this.tcgaTypeInfoList=result.data.res.tcgaTypeInfoList
              this.xuri=result.data.res.resp
              const obj=this.tcgaTypeInfoList
              this.location=obj.every(item => !('location' in item))
            }
          })
          break;
        case 'Illumina Human Methylation 450' :
          var qs=require('qs');
          this.axios.post(`/pubmed/getTcgaTypeInfo`, qs.stringify({
            id:this.radio,
            workflowType:'Liftover',
            dataType:'Methylation Beta Value',
            platform:'Illumina Human Methylation 450'
          },{responseType:'arraybuffer'})).then(result=>{
            this.loading=false
            if(result.data.res.tcgaTypeInfoList!=undefined){
              this.tcgaTypeInfoList=result.data.res.tcgaTypeInfoList
              this.xuri=result.data.res.resp
              const obj=this.tcgaTypeInfoList
              this.location=obj.every(item => !('location' in item))
            }
          })
          break;
        case 'Illumina Human Methylation 27' :
          var qs=require('qs');
          this.axios.post(`/pubmed/getTcgaTypeInfo`, qs.stringify({
            id:this.radio,
            workflowType:'Liftover',
            dataType:'Methylation Beta Value',
            platform:'Illumina Human Methylation 27'
          },{responseType:'arraybuffer'})).then(result=>{
            this.loading=false
            if(result.data.res.tcgaTypeInfoList!=undefined){
              this.tcgaTypeInfoList=result.data.res.tcgaTypeInfoList
              this.xuri=result.data.res.resp
              const obj=this.tcgaTypeInfoList
              this.location=obj.every(item => !('location' in item))
            }
          })
          break;
        case 'Other3' :
          var qs=require('qs');
          this.axios.post(`/pubmed/getTcgaTypeInfo`, qs.stringify({
            id:this.radio,
            dataCategory:'DNA Methylation',
            platformNoT:'1'
          },{responseType:'arraybuffer'})).then(result=>{
            this.loading=false
            if(result.data.res.tcgaTypeInfoList!=undefined){
              this.tcgaTypeInfoList=result.data.res.tcgaTypeInfoList
              this.xuri=result.data.res.resp
              const obj=this.tcgaTypeInfoList
              this.location=obj.every(item => !('location' in item))
            }
          })
          break;
        case 'CNV' :
          var qs=require('qs');
          this.axios.post(`/pubmed/getTcgaTypeInfo`, qs.stringify({
            id:this.radio,
            workflowType:'DNAcopy',
            dataType:'Copy Number Segment'
          },{responseType:'arraybuffer'})).then(result=>{
            this.loading=false
            if(result.data.res.tcgaTypeInfoList!=undefined){
              this.tcgaTypeInfoList=result.data.res.tcgaTypeInfoList
              this.xuri=result.data.res.resp
              const obj=this.tcgaTypeInfoList
              this.location=obj.every(item => !('location' in item))
            }
          })
          break;
        case 'MaskCNV' :
          var qs=require('qs');
          this.axios.post(`/pubmed/getTcgaTypeInfo`, qs.stringify({
            id:this.radio,
            workflowType:'DNAcopy',
            dataType:'Masked Copy Number Segment'
          },{responseType:'arraybuffer'})).then(result=>{
            this.loading=false
            if(result.data.res.tcgaTypeInfoList!=undefined){
              this.tcgaTypeInfoList=result.data.res.tcgaTypeInfoList
              this.xuri=result.data.res.resp
              const obj=this.tcgaTypeInfoList
              this.location=obj.every(item => !('location' in item))
            }
          })
          break;
        case 'Clinical' :
          var qs=require('qs');
          this.axios.post(`/pubmed/getTcgaTypeInfo`, qs.stringify({
            id:this.radio,
            dataCategory:'Clinical',
            dataFormat:'BCR XML'
          },{responseType:'arraybuffer'})).then(result=>{
            this.loading=false
            if(result.data.res.tcgaTypeInfoList!=undefined){
              this.tcgaTypeInfoList=result.data.res.tcgaTypeInfoList
              this.xuri=result.data.res.resp
              const obj=this.tcgaTypeInfoList
              this.location=obj.every(item => !('location' in item))
            }
          })
          break;
        case 'Other' :
          var qs=require('qs');
          this.axios.post(`/pubmed/getTcgaTypeInfo`, qs.stringify({
            id:this.radio,
            dataCategory:'Clinical',
            dataFormatNoT:'BCR XML'
          },{responseType:'arraybuffer'})).then(result=>{
            this.loading=false
            if(result.data.res.tcgaTypeInfoList!=undefined){
              this.tcgaTypeInfoList=result.data.res.tcgaTypeInfoList
              this.xuri=result.data.res.resp
              const obj=this.tcgaTypeInfoList
              this.location=obj.every(item => !('location' in item))
            }
          })
          break;
        case 'Biospecimen' :
          var qs=require('qs');
          this.axios.post(`/pubmed/getTcgaTypeInfo`, qs.stringify({
            id:this.radio,
            dataCategory:'Biospecimen',
            dataFormatNoT:'SVS'
          },{responseType:'arraybuffer'})).then(result=>{
            this.loading=false
            if(result.data.res.tcgaTypeInfoList!=undefined){
              this.tcgaTypeInfoList=result.data.res.tcgaTypeInfoList
              this.xuri=result.data.res.resp
              const obj=this.tcgaTypeInfoList
              this.location=obj.every(item => !('location' in item))
            }
          })
          break;
        case '已本地化' :
          var qs=require('qs');
          this.axios.post(`/pubmed/getTcgaTypeInfo`, qs.stringify({
            id:this.radio,
            location:'1'
          },{responseType:'arraybuffer'})).then(result=>{
            this.loading=false
            if(result.data.res.tcgaTypeInfoList!=undefined){
              this.tcgaTypeInfoList=result.data.res.tcgaTypeInfoList
              this.xuri=result.data.res.resp
              const obj=this.tcgaTypeInfoList
              this.location=obj.every(item => !('location' in item))
            }
          })
          break;
        case '未本地化' :
          var qs=require('qs');
          this.axios.post(`/pubmed/getTcgaTypeInfo`, qs.stringify({
            id:this.radio,
            locationNot:'1'
          },{responseType:'arraybuffer'})).then(result=>{
            this.loading=false
            if(result.data.res.tcgaTypeInfoList!=undefined){
              this.tcgaTypeInfoList=result.data.res.tcgaTypeInfoList
              this.xuri=result.data.res.resp
              const obj=this.tcgaTypeInfoList
              this.location=obj.every(item => !('location' in item))
            }
          })
          break;
        case 'Gene Leve CNV' :
          var qs=require('qs');
          this.axios.post(`/pubmed/getTcgaTypeInfo`, qs.stringify({
            id:this.radio,
            type:'MaskCNV',
            dataType:'Gene Level Copy Number'
          },{responseType:'arraybuffer'})).then(result=>{
            this.loading=false
            if(result.data.res.tcgaTypeInfoList!=undefined){
              this.tcgaTypeInfoList=result.data.res.tcgaTypeInfoList
              this.xuri=result.data.res.resp
              const obj=this.tcgaTypeInfoList
              this.location=obj.every(item => !('location' in item))
            }
          })
          break;
        case '等位基因特异性拷贝数' :
          var qs=require('qs');
          this.axios.post(`/pubmed/getTcgaTypeInfo`, qs.stringify({
            id:this.radio,
            dataType:'Allele-specific Copy Number Segment'
          },{responseType:'arraybuffer'})).then(result=>{
            this.loading=false
            if(result.data.res.tcgaTypeInfoList!=undefined){
              this.tcgaTypeInfoList=result.data.res.tcgaTypeInfoList
              this.xuri=result.data.res.resp
              const obj=this.tcgaTypeInfoList
              this.location=obj.every(item => !('location' in item))
            }
          })
          break;
        case 'Other4' :
          var qs=require('qs');
          this.axios.post(`/pubmed/getTcgaTypeInfo`, qs.stringify({
            id:this.radio,
            dataCategory:'Copy Number Variation'
          },{responseType:'arraybuffer'})).then(result=>{
            this.loading=false
            if(result.data.res.tcgaTypeInfoList!=undefined){
              this.tcgaTypeInfoList=result.data.res.tcgaTypeInfoList
              this.xuri=result.data.res.resp
              const obj=this.tcgaTypeInfoList
              this.location=obj.every(item => !('location' in item))
            }
          })
          break;
        case 'Tissue Slide' :
          var qs=require('qs');
          this.axios.post(`/pubmed/getTcgaTypeInfo`, qs.stringify({
            id:this.radio,
            experimental:'Tissue Slide',
          },{responseType:'arraybuffer'})).then(result=>{
            this.loading=false
            if(result.data.res.tcgaTypeInfoList!=undefined){
              this.tcgaTypeInfoList=result.data.res.tcgaTypeInfoList
              this.xuri=result.data.res.resp
              const obj=this.tcgaTypeInfoList
              this.location=obj.every(item => !('location' in item))
            }
          })
          break;
        case 'Diagnostic Slide' :
          var qs=require('qs');
          this.axios.post(`/pubmed/getTcgaTypeInfo`, qs.stringify({
            id:this.radio,
            experimental:'Diagnostic Slide',
          },{responseType:'arraybuffer'})).then(result=>{
            this.loading=false
            if(result.data.res.tcgaTypeInfoList!=undefined){
              this.tcgaTypeInfoList=result.data.res.tcgaTypeInfoList
              this.xuri=result.data.res.resp
              const obj=this.tcgaTypeInfoList
              this.location=obj.every(item => !('location' in item))
            }
          })
          break;
        case 'Other6' :
          var qs=require('qs');
          this.axios.post(`/pubmed/getTcgaTypeInfo`, qs.stringify({
            id:this.radio,
            experimentalNoT:'1' 
          },{responseType:'arraybuffer'})).then(result=>{
            this.loading=false
            if(result.data.res.tcgaTypeInfoList!=undefined){
              this.tcgaTypeInfoList=result.data.res.tcgaTypeInfoList
              this.xuri=result.data.res.resp
              const obj=this.tcgaTypeInfoList
              this.location=obj.every(item => !('location' in item))
              
            }
          })
      }
      console.log(this.location)
    },
    xuritu(){
      this.xuri111().then(e=>{
        if(this.isvip>0){
            var data=[]
            for(var data1 in this.xuri){
              data.push(this.xuri[data1])
            }
            $('.perer').html('<div id="xuri1" style="width:687px; height: 687px"></div>')
            var echarts1 = document.getElementById("xuri1");
            // 绘制图表
            if(echarts1){
              let myChart = this.echarts.init(echarts1)
              myChart.clear();
              myChart.setOption({
                tooltip : {
                  trigger: 'item',
                  formatter: "{b}: {c}",
                },
                label:{
                  formatter: function (params) {
                    var val="";
                    if(params.name.length >10){
                      val = params.name.substr(0,10)+'...';
                      return val;
                    }else{
                      return params.name;
                    }
                  }
                },
                title: {
                  text: this.radio,
                  textStyle: {
                      fontSize: 14,
                      align: 'center'
                  },
                  subtextStyle: {
                      align: 'center'
                  },
                },
                series: {
                  type: 'sunburst',
                  data: data,
                  highlightPolicy: 'ancestor',
                  radius: [0, '60%'],
                  sort: null,
                  levels: [{}, {
                      label: {
                          show:false
                      }
                  }, {
                      label: {
                          show:false
                      }
                  },{
                      label: {
                          show:false
                      }
                  },{
                      label: {
                          show:false
                      }
                  },{
                      r0: '35%',
                      r: '70%',
                      label: {
                          position: 'inside',
                          color:'#000',
                          padding: 3,
                      },
                  }, {
                      r0: '70%',
                      r: '72%',
                      label: {
                          position: 'outside',
                          color:'#000',
                          silent: false,
                          padding: 3,
                      },
                  }]
                },
                
              })
            }
          }
      })
    }
  },
}
</script>
<style scope>
  @import '../assets/css/reset.css';
  @media screen and (min-width:1200px){
    .content{
      width: 1200px !important;
    }
    .top{
      width: 1200px !important;
    margin-top: 20px;

    }
  }
  .all{
    background-color: rgba(51, 102, 204, 0.117647058823529);
    overflow: hidden;
    font-family:Source Han Sans CN;
    padding-top: 20px;
  }
  .top{
    width: 100%;
    margin-top: 20px;
    margin-bottom: 10px;
    margin: 0 auto;
    background: #FFF;
    color: #FF6B00;
    padding: 10px 20px;
  }
  .content{
    width: 100%;
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    margin-top: 10px;
    margin-bottom: 20px;
  }
  .contentLeft{
    width: 30%;
    background: #fff;
    margin-right: 10px;
    padding: 20px;
    overflow: hidden;
  }
  .contentRight1{
    width: 70%;
  }
  .rightTop{
    background: #fff;
    margin-bottom: 10px;
    padding: 10px;
    padding-right: 0;
  }
  .rightTop>p{
    font-size: 18px;
  }
  .rightTop>div{
    display: flex;
    flex-direction: row;
  }
  .rightMidd{
    margin-bottom: 10px;
    background: #fff;
    padding: 10px;
  }
  .rightMidd>div{
    display: flex;
    flex-direction: row;
    margin-bottom: 10px;
    line-height: 36px;
  }
  .rightTop>div>div{
    width: 50%;
  }
  .rightTop>div>div:nth-child(1)>table{
    width: 100%;
    margin-left: -10px;
  }
  .rightTop>div>div:nth-child(2)>table{
    width: 100%;
  }
  .rightTop>div>div>table>tbody>tr>td:nth-child(1){
    padding-left: 10px;
  }
  .rightTop>div>div>table>thead>tr>th:nth-child(1){
    padding-left: 10px;
  }
  .rightTop>div>div>table>thead>tr>th{
    font-size: 14px;
    font-weight: 600;
    line-height: 40px;
  }
  .rightTop>div>div>table>tbody>tr:nth-child(2n+1){
    background: #E7EDF9;
  }
  .rightBottom{
    background: #fff;
    padding: 10px;
    min-height: 650px;
  }
  .rightBottom>div{
    overflow-x: auto;
  }
  .rightBottom>div>.el-table td, .el-table th{
    padding: 0;
    font-size: 12px;
  }
  .rightBottom>div>.el-table .cell{
    line-height: 17px;
  }
  .rightBottom>div>.el-table th div{
    line-height: 17px;
  }
  .rightMidd>.el-radio-group>.el-radio-button>.el-radio-button__inner{
    border: none;
  }
  label{margin-bottom:0}
  .bottom1{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 10px;
  }
  .aaa{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    /* text-align: right; */
    margin-bottom: 10px;
  }
  .aaa>.el-button--primary{
    background-color: #3366cc;
    border-color: #3366cc;
  }
  .rightMidd>div>.el-radio-group>.el-radio-button>.el-radio-button__orig-radio:checked+.el-radio-button__inner{
    background-color: #3366cc;
    border-color: #3366cc;
  }
  .tab1{
    background: #FFF;
    width: 100%;
    margin-bottom: 10px;
    padding: 10px;
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
  .sample{
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .sample1{
    width: 500px;
  }
  .sample2{
    width: 187px;
  }
</style>