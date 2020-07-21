<template>
  <div>
    <Header></Header>
    <div class="fileselect" v-if="fileselect" >
      <div :style='filesewid'>
        <div style="margin-bottom:10px;" class="search1">
          <p>当前位置：<span id="dir" style="cursor: pointer;" @click="toPersonal()">{{dir}}</span></p>
          <div>
            <el-input v-model="search" placeholder="请输入搜索内容"></el-input>
            <button @click="Search">搜索</button>
          </div>
        </div>
        <div class="top1">
          <div>
            <el-button @click="toshang(dir)" :disabled="fanhui" size="mini"><i class="el-icon-back"></i>返回上级</el-button>
            <el-button @click="shuaxin(dir)" id="shuaxin" size="mini"><i class="el-icon-refresh-right"></i>刷新</el-button>
          </div>
          <div >
            <el-upload
              class="upload-demo"
              action="http://calculate.mysci.online:9000/files/uploadUserFile"
              :on-success="success"
              :on-error='error'
              :before-upload="beforeupload"
              multiple
              :data="datadir"
              :headers="header"
              name="file"
              :file-list="fileList1">
              <el-button size="mini"><i class="el-icon-top"></i>上传文件</el-button>
            </el-upload>
          </div>
          <p>存储空间：{{msg}}</p>
        </div>
        <div v-loading="loading5"
          element-loading-text="拼命加载中"
          element-loading-spinner="el-icon-loading"
          element-loading-background="f5f5f5" :style="aa" class="tableqqq" >
          <el-table :data="fileslist" @sort-change='sortChange' style="height:460px">
            <!-- <el-table-column
              type="selection"
              width="55">
            </el-table-column> -->
            <el-table-column label="名称" prop="name" sortable='custom' >
              <template slot-scope="scope">
                <img style="margin-right:5px;" :src="scope.row.type=='dir'?wenjianjia:wenjian" alt="">
                <span @click="handleGoods(scope.row)" class="pathway" style="margin:0;cursor: pointer;">{{scope.row.name}}</span>
                <!-- <el-input v-if="" v-model="scope.row.name" placeholder="请输入内容"></el-input> -->
              </template>
            </el-table-column>
            <el-table-column label="修改日期" prop="updateTime" sortable='custom' width="160">
              <template slot-scope="scope">
                <span class="pathway" style="margin:0;cursor: pointer;">{{scope.row.updateTime}}</span>
              </template>
            </el-table-column>
            <el-table-column label="大小" prop="size" sortable='custom' width="100">
              <template slot-scope="scope">
                <span class="pathway" style="margin:0;cursor: pointer;">{{scope.row.size}}</span>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            layout="total, prev, pager, next, jumper" 
            :page-size="pagesize"
            :total="all">
          </el-pagination>
        </div>
        <div class="xuanze111" style="margin-top:10px">
          <div v-if="multiple==false">
            <span>选择的文件：</span>
            <el-select
              v-model="fileSel"
              collapse-tags
              clearable
              style="margin-left: 20px;"
              placeholder="请选择">
              <el-option
                v-for="item in fileSels"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div v-else>
            <span>选择的文件：</span>
            <el-select
              v-model="fileSel1"
              collapse-tags
              clearable
              multiple
              style="margin-left: 20px;"
              placeholder="请选择">
              <el-option
                v-for="item in fileSels1"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div>
            <el-button type="primary" @click="check()">选择</el-button>
            <el-button type="primary" @click="edit">退出</el-button>
          </div>
        </div>
        
      </div>
    </div>
    <div class="bg">
    <div class="content">
      <div class="mianbao">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item>工具+</el-breadcrumb-item>
          <el-breadcrumb-item>ID转换工具</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="info">
        <div class="infoleft">
          <div class="lefttop">
            <div>
              <div><img src="../../public/img/juxing.png" alt=""></div>
              <div class="wenzi">
                <p style="font-weight: 600;">ID转换工具</p>
                <p>通过输入数据表和数据库ID匹配表进行数据合并完成数据输出表的转换</p>
                <p class="shoucang"><span v-if="mobile==null">需登录才能运行</span><img src="../../public/img/shoucang.png" alt=""></p>
              </div>
            </div>
            <div class="top-right">
              <p @click="gongjushuo()" id="gongju">工具说明</p>
              <p @click="lizi1()" id="lizi">例子</p>
              <p @click="shiyong()" id="shiyong">数据中心</p>
            </div>
          </div>
          <div class="leftbottom">
            <el-radio-group style="margin-bottom:20px;" v-model="radio3" size="small">
            <el-radio-button label="shuru">输入</el-radio-button>
            <el-radio-button label="xuanze">选择文件</el-radio-button>
            </el-radio-group>
            <!-- <p v-if="show1"><span style="vertical-align: middle">输入</span><img style="width:14px;height:14px;cursor: pointer;vertical-align: middle" @click="clear()" src="../../public/img/xin.png" alt=""></p> -->
            <el-input style="margin-bottom:20px;" v-if="show1" type="textarea" :autosize="{ minRows: 6, maxRows: 6}" :rows="6" placeholder="请输入矩阵，第一列默认为待转ID，第一行默认为表头" v-model="textarea" clearable>
            </el-input>
            <div v-if="!show1" class="wenjian1">
              <el-input style="margin-bottom:20px;" @focus="focus" placeholder="请选择文件" v-model="filesss">
              </el-input>
            </div>
            <el-radio-group v-model="radio">
              <el-radio :label="0">仅转换</el-radio>
              <el-radio :label="1">转换并合并</el-radio>
            </el-radio-group>
            
            <div class="cho">
              <p style="margin-bottom:10px;">待转换ID类型</p>
              <el-select style="width:100%;" filterable v-model="value" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              <div class="sdds">
                <div>
                  <p style="margin:10px 0">目标类型</p>
                  <el-select style="width:95%" v-model="value1" placeholder="请选择">
                    <el-option
                      v-for="item in options1"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </div>
                <div v-if="show">
                  <p style="margin:10px 0">数据合并策略</p>
                  <el-select style="width:100%" v-model="shuju" placeholder="请选择">
                    <el-option
                      v-for="item in shujus"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </div>
              </div>
              
              <p style="width:560px;margin-top:30px;">
                <el-button size="small" @click="submit" type="primary">提交</el-button>
              </p>
            </div>
          </div>
          
        </div>
        <div v-if="gongju2" class="inforight">
          <img style="width:500px;height:500px;" src="../../public/img/liu.png" alt="">
        </div>
        <div v-if="lizi2" class="inforight">
          <img style="width:500px;height:500px;" src="../../public/img/liu.png" alt="">
        </div>
        <div v-if="shiyong2" class="inforight">
          <Filecom/>
        </div>
      </div>
    </div>
    </div>
    <Footer></Footer>
  </div>
</template>
<script>
import Header from '../components/Header'
import Footer from '../components/Footer'
import Filecom from '../components/Filecom'
export default {
  metaInfo() {
    return {title: 'ID转换工具'} // set a title
  },
  data() {
    return {
      textarea:'',options: [],
        value: '',value1:'',fileList: [],radio:3,
        files:[],file:"",show:false,radio3:'shuru',show1:true,
        radio:0,options1:[{label:"Symbol",value:1},{label:"Entrez ID",value:2}],idTypeList:[],
        shujus:[{label:"均值",value:1},{label:"中位数",value:2},
        {label:"最大值",value:3},{label:"最小值",value:4}],
        shuju:"",responsecode:1,datadir:{dir:'/'},
        fliselists:[],gongju2:true,lizi2:false,shiyong2:false,filesss:'',
        wenjian:require('../../public/img/wenjian1.png'),
        fileselect:false,loading5:false,fileslist:[],all:null,pagesize:10,dir:'/',wenjianjia:require('../../public/img/wenjian.png'),msg:'',header:{'Authorization': localStorage.getItem('authorization')},datadir:{dir:'/'},fileList1:[],fanhui:false,fileSel:'',fileSels:[],fileSel1:[],fileSels1:[],selectInput:null,multiple:false,
        Sort:'',search:'',mobile:null
    }
  },
  components:{
    Header,Footer,Filecom
  },
  watch: {
    responsecode(val){
      this.xuanzewenjian()
      this.responsecode=1
      // document.getElementsByClassName('.el-upload-list').style.display="none"  
    },
    value(val){
      if(this.value=='miRNA_Name' || this.value=='miRNA_ID'){
        this.options1=[{label:"Symbol",value:1},{label:"Entrez ID",value:2},{label:"miRNA Name",value:3},{label:"miRNA ID",value:4}]
      }else{
        this.options1=[{label:"Symbol",value:1},{label:"Entrez ID",value:2}]
      }
    },
    dir(val){
      this.datadir.dir=this.dir
    },
    radio(val){
      if(this.radio==1){
        this.show=!this.show
      }else{
        this.show=!this.show
      }
    },
    radio3(val){
      if(this.radio=="shuru"){
        this.show1=!this.show1
      }else{
        this.show1=!this.show1
        this.xuanzewenjian()
      }
    },
  },
  mounted(){
    this.IDleixing()
    this.mobile=localStorage.getItem("mobile")
  },
  methods: {
    download(b){
      if(b.type=="dir"){
        document.getElementById(`${b.url.split('/')[1]}`).disabled=true
        document.getElementById(`${b.url.split('/')[1]}`).style.cursor='not-allowed'
        var qs=require('qs');
        this.$axios.post(`/tools/zipToolFile`, qs.stringify({
          dir:b.url,
        })).then(result=>{
          document.getElementById(`${b.url.split('/')[1]}`).disabled=true
          document.getElementById(`${b.url.split('/')[1]}`).style.cursor='not-allowed'
        })
      }else{
        document.getElementById(`${b.url.split('/')[1]}`).disabled=true
        document.getElementById(`${b.url.split('/')[1]}`).style.cursor='not-allowed'
        this.axios.get('/files/downUserFile',{params:{dir:b.url}}).then(result=>{

          window.open(result.data)
          document.getElementById(`${b.url.split('/')[1]}`).disabled=true
          document.getElementById(`${b.url.split('/')[1]}`).style.cursor='not-allowed'
        })
        
      }
    },
    Search(){
      this.axios.get(`/files/listUserFile`,{params:{
        dir:this.dir,
        page:1,
        total:this.pagesize,
        sort:this.Sort,
        keyword:this.search
      }}).then(result=>{
        if(result.data.data!=undefined){
          this.fileslist=result.data.data.datas
          this.all=result.data.data.all
          this.loading5=false
        }
      })
    },
    sortChange(column, prop, order){
      if(column.order=='ascending' && column.prop=='name'){
        this.Sort='name_asc'
      }else if(column.order=='descending' && column.prop=='name'){
        this.Sort='name_desc'
      }else if(column.order=='ascending' && column.prop=='updateTime'){
        this.Sort='updateTime_asc'
      }else if(column.order=='descending' && column.prop=='updateTime'){
        this.Sort='updateTime_desc'
      }else if(column.order=='ascending' && column.prop=='size'){
        this.Sort='size_asc'
      }else if(column.order=='descending' && column.prop=='size'){
        this.Sort='size_desc'
      }else{
        this.Sort=''
      }
      this.loading=true
      this.axios.get(`/files/listUserFile`,{params:{
        dir:this.dir,
        page:1,
        total:this.pagesize,
        sort:this.Sort,
        keyword:this.search
      }}).then(result=>{
        this.msg=result.data.msg
        var file111=result.data.data.datas
        this.all=result.data.data.all
        if(result.data.data.datas!=undefined){
          for(var a in file111){
            if(file111[a].name=='uploads'){
              file111.unshift(file111.splice(a,1)[0])
              if(file111[a].name=='tools'){
                file111.unshift(file111.splice(a,1)[0])
              }
            }
          }
          this.fileslist=file111
          this.loading=false
        }
      })
    },
    check(){
      var id=null
      this.filesss=this.fileSel
      this.fileselect=false
    },
    edit(){
      this.fileselect=false
    },
    error(err, file, fileList){
      // console.log(err)
    },
    toshang(dir){
      this.search=''
      this.loading5=true
      this.dir = this.dir.length>1? this.dir.substring(0, this.dir.lastIndexOf('/'))==""?this.dir="/":this.dir.substring(0, this.dir.lastIndexOf('/')):this.dir.substring(0, this.dir.lastIndexOf('/')+1)
      this.axios.get(`/files/listUserFile`,{params:{
        dir:`${this.dir}`,
        page:1,
        total:this.pagesize,
        sort:this.Sort,
        keyword:''
      }}).then(result=>{
        this.msg=result.data.msg
        var file111=result.data.data.datas
        this.all=result.data.data.all
        if(result.data.data.datas!=undefined){
          for(var a in file111){
            if(file111[a].name=='uploads'){
              file111.unshift(file111.splice(a,1)[0])
              if(file111[a].name=='tools'){
                file111.unshift(file111.splice(a,1)[0])
              }
            }
          }
          this.fileslist=file111
          this.loading5=false
        }
      })
    },
    beforeupload(file){
      var p=new RegExp(/^[a-z0-9A-Z_]+$/)
      if(p.test(file.name.substr(0,file.name.lastIndexOf(".")))==false){
        this.$message({
          message: '文件名格式错误，只能用字母、数字或下划线命名！',
          type: 'warning'
        });
        return false;
      }
    },
    success(response, file, fileList){
      if(response.msg=='个人空间不足，请扩容'){
        this.$message({
          message: '个人空间不足，请扩容',
          type: 'warning'
        })
      }else if(response.msg=='上传失败，请检查文件名'){
        this.$message({
          message: '上传失败，文件名已存在',
          type: 'warning'
        })
      }else{
        this.$message({
          message: '上传成功',
          type: 'success'
        });
        this.shuaxin(this.dir)
      }
    },
    shuaxin(dir){
      this.loading5=true
      this.axios.get(`/files/listUserFile`,{params:{
        dir:`${this.dir}`,
        page:this.currentPage,
        total:this.pagesize,
        sort:this.Sort,
        keyword:this.search
      }}).then(result=>{
        this.msg=result.data.msg
        var file111=result.data.data.datas
        this.all=result.data.data.all
        if(result.data.data.datas!=undefined){
          for(var a in file111){
            if(file111[a].name=='uploads'){
              file111.unshift(file111.splice(a,1)[0])
              if(file111[a].name=='tools'){
                file111.unshift(file111.splice(a,1)[0])
              }
            }
          }
          this.fileslist=file111
          this.loading5=false
        }
      })
    },
    handleGoods(row){
      if(row.type=="dir"){
        this.loading5=true
        this.axios.get(`/files/listUserFile`,{params:{
          dir:`${row.url}`,
          page:1,
          total:this.pagesize,
          sort:this.Sort,
          keyword:''
        }}).then(result=>{
          if(result.data.data!=undefined){
            this.dir=row.url
            this.fileslist=result.data.data.datas
            this.all=result.data.data.all
            this.loading5=false
          }
        })
      }else{
        var c={}
        c.value=row.url
        c.label=row.url
        if(this.multiple==true){
          this.fileSel1.push(row.url)
          this.fileSels1.push(c)
        }else{
          this.fileSel=row.url.toString() 
          this.fileSels.push(c)
        }
      }
    },
    handleCurrentChange(currentPage){
      this.loading5=true
      this.axios.get(`/files/listUserFile`,{params:{
        dir:this.dir,
        page:currentPage,
        total:this.pagesize,
        sort:this.Sort,
        keyword:this.search
      }}).then(result=>{
        var file111=result.data.data.datas
        this.all=result.data.data.all
        this.msg=result.data.msg
        if(result.data.data.datas!=undefined){
          for(var a in file111){
            if(file111[a].name=='uploads'){
              file111.unshift(file111.splice(a,1)[0])
              if(file111[a].name=='tools'){
                file111.unshift(file111.splice(a,1)[0])
              }
            }
          }
          this.fileslist=file111
          this.loading5=false
        }
      })
    },
    focus(e){
      var clientHeight=document.documentElement.clientHeight
      var clientWidth=document.documentElement.clientWidth
      if(clientHeight<650){
        clientHeight=clientHeight-180
        this.aa=`height:${clientHeight}px`
      }
      if(clientWidth<768){
        this.filesewid=`width:700px;left:0%`
      }else if(clientWidth>=768 && clientWidth<992){
        this.filesewid=`width:700px;left:10%`
      }else if(clientWidth>=992 && clientWidth<1200){
        this.filesewid=`width:700px;left:20%`
      }else if(clientWidth>=1200){
        this.filesewid=`width:700px;left:30%`
      }
      this.currentPage=1
      this.selectInput=e
      this.fileSels=[]
      this.fileSel=''
      this.fileSels1=[]
      this.fileSel1=[]
      this.fileselect=true
      this.loading5=true
      this.axios.get(`/files/listUserFile`,{params:{
        dir:this.dir,
        page:1,
        total:this.pagesize,
        sort:this.Sort,
        keyword:this.search
      }}).then(result=>{
        var file111=result.data.data.datas
        this.all=result.data.data.all
        this.msg=result.data.msg
        if(result.data.data.datas!=undefined){
          for(var a in file111){
            if(file111[a].name=='uploads'){
              file111.unshift(file111.splice(a,1)[0])
              if(file111[a].name=='tools'){
                file111.unshift(file111.splice(a,1)[0])
              }
            }
          }
          this.fileslist=file111
          this.loading5=false
        }
      })
    },
    //多选文件名focus函数
    focus1(e){
      var clientHeight=document.documentElement.clientHeight
      var clientWidth=document.documentElement.clientWidth
      if(clientHeight<650){
        clientHeight=clientHeight-180
        this.aa=`height:${clientHeight}px`
      }
      if(clientWidth<768){
        this.filesewid=`width:700px;left:0%`
      }else if(clientWidth>=768 && clientWidth<992){
        this.filesewid=`width:700px;left:10%`
      }else if(clientWidth>=992 && clientWidth<1200){
        this.filesewid=`width:700px;left:20%`
      }else if(clientWidth>=1200){
        this.filesewid=`width:700px;left:30%`
      }
      this.currentPage=1
      this.selectInput=e
      this.multiple=true
      this.fileSels=[]
      this.fileSel=''
      this.fileSels1=[]
      this.fileSel1=[]
      this.fileselect=true
      this.loading5=true
      this.axios.get(`/files/listUserFile`,{params:{
        dir:this.dir,
        page:1,
        total:this.pagesize,
        sort:this.Sort,
        keyword:this.search
      }}).then(result=>{
        var file111=result.data.data.datas
        this.all=result.data.data.all
        this.msg=result.data.msg
        if(result.data.data.datas!=undefined){
          for(var a in file111){
            if(file111[a].name=='uploads'){
              file111.unshift(file111.splice(a,1)[0])
              if(file111[a].name=='tools'){
                file111.unshift(file111.splice(a,1)[0])
              }
            }
          }
          this.fileslist=file111
          this.loading5=false
        }
      })
    },
    gongjushuo(){
      document.getElementById('gongju').style.background="#fff"
      document.getElementById('gongju').style.color="#FF7613"
      document.getElementById('lizi').style.background="none"
      document.getElementById('lizi').style.color="#999"
      document.getElementById('shiyong').style.background="none"
      document.getElementById('shiyong').style.color="#999"
      this.gongju2=true
      this.lizi2=false
      this.shiyong2=false
    },
    lizi1(){
      document.getElementById('lizi').style.background="#fff"
      document.getElementById('lizi').style.color="#FF7613"
      document.getElementById('gongju').style.background="none"
      document.getElementById('gongju').style.color="#999"
      document.getElementById('shiyong').style.background="none"
      document.getElementById('shiyong').style.color="#999"
      this.lizi2=true
      this.gongju2=false
      this.shiyong2=false
    },
    shiyong(){
      document.getElementById('shiyong').style.background="#fff"
      document.getElementById('shiyong').style.color="#FF7613"
      document.getElementById('gongju').style.background="none"
      document.getElementById('gongju').style.color="#999"
      document.getElementById('lizi').style.background="none"
      document.getElementById('lizi').style.color="#999"
      this.shiyong2=true
      this.lizi2=false
      this.gongju2=false
    },
    xuanzewenjian(){
      this.axios.get(`/files/getAllUserFile`,{
        params:{type:"text"}
      }).then(result=>{
        if(result.data.data!=undefined){
          this.fliselists=result.data.data
          var b=[]
          for(var a in this.fliselists){
            var c={}
            c.value=this.fliselists[a]
            c.label=this.fliselists[a]
            b.push(c)
          }
          this.files=b
        }
      })
    },
    IDleixing(){
      this.axios.get(`/pubmed/getGenesIdConversionTypeInfo`).then(result=>{
        this.idTypeList=result.data.res.idTypeList
        let b=[]
        for(var a in this.idTypeList){
          let c={}
          c.label=this.idTypeList[a]
          c.value=this.idTypeList[a].replace(/\s+/g,"_")
          b.push(c)
        }
        this.options=b
      })
    },
    clear(){
      this.textarea=''
    },
    handleRemove(file, fileList) {
      // console.log(file, fileList);
    },
    handlePreview(file) {
      // console.log(file);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${ file.name }？`);
    },
    submit(){
      if(this.radio3=="shuru"){
        if(this.shuju==""){
          this.shuju=0
        }
        var qs=require('qs');
        this.axios.post(`/pubmed/getGenesDataIdConvertAuthInfo/`, qs.stringify({
          text:this.textarea,
          m:this.shuju,
          t:this.radio,
          f:this.value1,
          p:this.value
        })).then(result=>{
        })
      }else{
        if(this.shuju==""){
          this.shuju=0
        }
        var qs=require('qs');
        this.axios.post(`/pubmed/getGenesDataIdConvertAuthInfo/`, qs.stringify({
          m:this.shuju,
          t:this.radio,
          f:this.value1,
          p:this.value,
          i:this.filesss
        })).then(result=>{
        })
      }
    },
  },
}
</script>
<style scoped>
  @media screen and (min-width:1200px){
    .content{
      width: 1200px !important;
    }
  }
  .content{
    overflow: hidden;
    margin: 0 auto;
    width: 100%;
  }
  .info{
    width: 100%;
    display: flex;
    flex-direction: row;
    min-height: 580px;
  }
  .info>div{
    width: 50%;
  }
  .infoleft>p{
    margin-bottom: 20px;
  }
  .inforight{
    background: #fff;
    padding: 20px;
    margin-top: 10px;
    border-radius: 0 5px 5px 5px;
  }
  .inforight>img{
    width: 360px;
    height: 340px;
    margin-top: 60px;
  }
  .cho>div>p{
    margin: 10px 0;
  }
  .cho{
    padding:  20px 0;
  }
  .cho>div:nth-child(4){
    margin: 20px 0;
    
  }
  .cho>div:nth-child(4)>span{
    margin-right: 10px;
  }
  .infoleft>p{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .infoleft>>>.el-upload__input{
    display: none;
  }
  .wenjian1{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 20px;
  }
  .wenjian1>>>.el-upload-list{
    display: none
  }
  .wenjian1>>>.el-upload-list--text{
    display: none
  }
  .sdds{
    display: flex;
    flex-direction: row;
  }
  .sdds>div{
    width: 50%;
  }
  .lefttop{
    display: flex;
    flex-direction: row;
    margin: 10px 0;
  }
  .lefttop>div:nth-child(1){
    width: 75%;
    display: flex;
    flex-direction: row;
    padding: 20px;
    background: #fff;
    border-radius: 5px;
  }
  .lefttop>div>div:nth-child(1){
    width: 90px;
  }
  .bg{
    background: #E7EDF9;
    padding-bottom: 10px;
  }
  .leftbottom{
    background: #fff;
    padding: 20px;
    margin-right: 10px; 
    border-radius: 5px;
  }
  .wenzi{
    margin-top: 5px;
    margin-left:20px;
  }
  .top-right{
    width: 23%;
    text-align: center;
    margin-left: 20px;
  }
  .top-right>p{
    height: 43px;
    line-height: 43px;
    border-radius: 5px 0 0 5px;
    cursor: pointer;
    border-bottom: 1px solid #C4CFE6
  }
  #gongju{
    background: #FFF;
    color: #FF7613;
  }
  .shoucang{
    margin-top: 5px;
    display: flex;
    flex-direction: row;
    justify-content: space-between
  }
  .shoucang>span:nth-child(1){
    color: #FF7613;
    font-size: 12px;
  }
  #lizi{
    color: #999;
  }
  #shiyong{
    color: #999;
  }
  .mianbao{
    margin: 10px 0;
  }
  .fileselect{
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(153,153,153,.4);
    z-index:10000;
    margin: 0 auto;
  }
  .fileselect>div{
    min-height: 500px;
    position: absolute;
    top: 50%;
    transform: translate(0, -50%);
    background: #fff;
    z-index: 99999;
    padding: 20px;
  }
  .fileselect>div>div:nth-child(1){
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    line-height: 30px;
  }
  .tankuang{
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(153,153,153,.4);
    z-index:88888;
    margin: 0 auto;
  }
  .tankuang>div{
    width: 800px;
    position: absolute;
    top: 50%;
    left: 30%;
    transform: translate(0, -50%);
    background: #fff;
    z-index: 99999;
    padding: 20px;
  }
  .tankuang>div>p:nth-child(1){
    text-align: center;
    font-size: 24px;
    font-weight: 500;
  }
  .tankuang>div>p:nth-child(2){
    width: 100%;
    text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 19;
    -webkit-box-orient: vertical;
  }
  .biaogetankuang{
    max-height: 500px;
  }
  .tankuang>div>div>table tr td{
    border:1px solid #dcdcdc;
  }
  .tankuang>div>div>table{
    table-layout:fixed;
  }
  .tankuang>div>div>table>tr>td{
    padding: 5px;
    word-break: keep-all;white-space:nowrap;
  }
  .tankuang>div>div{
    width:100%;overflow-x:scroll
  }
  .runlog:hover{
    cursor: pointer;
    color: #409EFF;
  }
  .upload1{
    display: none !important;
  }
  .top1{
    display: flex;
    flex-direction: row;
    padding-top: 10px; 
    border-top: 1px solid #dcdcdc;
  }
  .top1>p:last-child{
    width: 250px;
    line-height: 28px;
    text-align: right;
  }
  .top1>div>button{
    margin: 0 5px;
  }
  .top1>div:nth-child(2){
    width: 142px;
    margin-left: 10px;
  }
  .top1>>>.el-upload__input{
    display: none;
  }
  .xuanze111{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    line-height: 48px;
  }
  .xuanze111>div:nth-child(1){
    display: flex;
    flex-direction: row;
    width: 70%;
  }
  .xuanze111>div:nth-child(1)>.el-select{
    width: 60%;
  }
  .search1>div{
    width: 50%;
    display: flex;
    flex-direction: row;
    justify-content:space-between;
  }
  .search1>div>.el-input{
    width: 80%;
    margin-right: 10px;
  }
  .search1>div>button{
    background: #3366cc;
    border: 1px solid #3366cc;
    color: #FFF;
    border-radius: 5px;
  }
  .search1>>>.el-input__inner{
    height: 30px;
    line-height: 30px;
  }
  .xuanze111>div>.el-button{
    background: #3366cc;
    border-color:#3366cc;
  }
  .tableqqq {
    overflow-y:scroll;
  }
  .tableqqq>>>.el-table td, .el-table th{
    padding: 8px 0;
  }
  .tableqqq>>>.el-table {
    height: 100%;
    width: 100%;
  }
  .tableqqq>>>.el-button--small, .el-button--small.is-round{
    padding: 5px 15px;
  }
  .zaixian{
    float: right;
    margin-top:-27px;
    margin-right: 120px;
    position: relative;
    z-index: 9;
    cursor: pointer;
    color: #FF7613;
  }

</style>