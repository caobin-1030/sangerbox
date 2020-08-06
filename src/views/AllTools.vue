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
              :action="url+'/files/uploadUserFile'"
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
    <!-- <div class="tankuang" v-if="tankuang" @click="downDiscuoption()">
      <div @click.stop="settingEvent()">
        <p></p>
        <p>cmd: <span>{{runlog.cmd}}</span></p>
        <div class="biaogetankuang">
          <table>
            <tr v-for="(item,i) of runlog.runLog.split(/\n/g)" :key="i">
              <td  v-for="(item1,n) of item.split(/\t/g)" :key="n">{{item1}}</td>
            </tr>
          </table>
        </div>
      </div>
    </div> -->
    <div class="bg">
      <div class="content">
        <div class="mianbao">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item>工具+</el-breadcrumb-item>
            <el-breadcrumb-item>{{title1}}</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div class="info">
          <div class="infoleft">
            <div class="lefttop">
              <div>
                <div><img :src="toolImg?toolImg:defaultImg" alt=""></div>
                <div class="wenzi">
                  <p style="font-weight: 600;">{{title1}}</p>
                  <p :title='desctiption'>{{desctiption}}</p>
                  <p class="shoucang"><span v-if="mobile==null">需登录才能运行</span><img style="cursor: pointer;" :id="id" @click="collection(id,pmidList)"  :src="pmidList.indexOf(parseInt(id))==-1?shoucang1:shoucang10" :title="pmidList==undefined  || pmidList.indexOf(id)==-1?shoucang2:shoucang11"alt=""></p>
                </div>
              </div>
              <div class="top-right">
                <p @click="gongjushuo()" id="gongju">工具说明</p>
                <p @click="lizi1()" id="lizi">例子</p>
                <p @click="shiyong()" id="shiyong">数据中心</p>
              </div>
            </div>
            <div class="leftbottom" ref="leftBottom">
              <form-create v-model="ff" @xaboy-change="change" @xaboy11-focus="focus"  @xaboy111-focus="focus1" id="qqq" :rule="rule" @on-submit="onSubmit">
               
              </form-create>
              <p class="zaixian" v-if="isvip==1">
                <el-popover placement="bottom" width="180" trigger="hover">
                  <p style="text-align: center;">请添加客服微信</p>
                  <p style="text-align: center;margin-top:10px"><img src="../../public/img/kefu.png" style="width:150px" alt=""></p>
                  <span slot="reference">在线辅导</span>
                </el-popover>
              </p>
              <div v-if="runcmd!=''" class="runcmd">
                <p>运行结果</p>
                <p>{{runcmd}}</p>
              </div>
            </div>
          </div>
          <div v-if="gongju2" class="inforight" :style="{height:leftheight}">
            <div style="margin-bottom:30px;" v-html="readme"></div>
            <span id="fujian" class="xiazaifujian" v-if="readhasfile" @click="readDown(readfilename)">{{fujian1}}</span>
          </div>
          <div v-if="lizi2" class="inforight" :style="{height:leftheight}">
            <div style="margin-bottom:30px;" v-html="example"></div>
            <span id="fujian" class="xiazaifujian" v-if="exphasfile" @click="expDown(expfilename)">{{fujian1}}</span>
          </div>
          <div v-if="shiyong2" class="inforight" :style="{height:leftheight}">
            <Filecom/>
          </div>
        </div>
      </div>
      <div class="contentBottom" v-loading="loading"
          element-loading-text="拼命加载中"
          element-loading-spinner="el-icon-loading"
          element-loading-background="f5f5f5" v-if="fileList.length>0 && tooltype!='1'">
        <div class="BottomLeft">
          <p v-for="(item,i) of fileList" :key="i" :class="{'active':i==clickIndex}" @click="show(item,i)" :title="item" class="filename">
            <img style="margin-right:5px;" :src="wenjian" alt="">
            <span style="width:100%;white-space:nowrap;" :title="item">{{item.length>13?item.slice(0,13)+'...':item}}</span>
          </p>
        </div>
        <div class="BottomRight" v-loading="loading1"
          element-loading-text="拼命加载中"
          element-loading-spinner="el-icon-loading"
          element-loading-background="f5f5f5">
          <p class="xiazaiTop"><span>数据详情<span class="runlog" style="margin-left:10px;" @click="lookLog">{{logID}}</span></span><span :disabled='xiazai'  @click="downLoad()">下载</span></p>
          <p v-if="datas1.split(/\n/g).length<=1">{{datas1}}</p>
          <img v-if="contenttype=='img'" style="width:100%" :src="img1" alt="">
          <div class="pdf" v-if="contenttype=='pdf'">
            <pdf ref='pdf' :src='pdfurl' :page="currentPage" @progress="loadedRatio = $event" @num-pages="pageCount=$event" @page-loaded="currentPage=$event" @loaded="loadPdfHandler"></pdf>
            <ul class="footers">
              <li :class="{select:idx==0}" @touchstart="idx=0" @touchend="idx=-1" @click="scaleD">
                <p>放大</p>
              </li>
              <li :class="{select:idx==1}" @touchstart="idx=1" @touchend="idx=-1" @click="scaleX">
                <p>缩小</p>
              </li>
              <li :class="{select:idx==2}" @touchstart="idx=2" @touchend="idx=-1" @click="changePdfPage(0)">
                  <p>上一页</p>
              </li>
              <li :class="{select:idx==3}" @touchstart="idx=3" @touchend="idx=-1" @click="changePdfPage(1)">
                <p>下一页</p>
              </li>
            </ul>
          </div>
          <div class="biaoge" v-if="contenttype!='img' && datas1.split(/\n/g).length>1">
            <table class="datas1table" v-if="datas1.split(/\n/g).length>1">
              <tr v-for="(item,i) of datas1.split(/\n/g).splice(0,10)" :key="i">
                <td v-for="(item1,n) of item.split(/\t/g)" :key="n"><span>{{item1}}</span></td>
              </tr>
            </table>
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
import { formCreats } from '../../public/js/indexof'
import pdf from 'vue-pdf'
import { pako_ungzip } from '../../public/js/indexof'
import { geturl } from '../../public/js/status'
export default {
  metaInfo() {
    return {title: this.title1} // set a title
  },
  data() {
    return {
      gongju2:true,lizi2:false,shiyong2:false,id:'',title1:"",desctiption:'',readme:'',example:'',pipline:'',ff:{},readhasfile:false,readtype:'',exptype:'',exphasfile:false,piptype:false,piphasfile:'',readfilename:'',expfilename:'',pipfilename:'',rule:[],runcmd:'',fileList:[],wenjian:require('../../public/img/wenjian1.png'),datas1:'',contenttype:'',img1:'',tooltype:"",fujian1:'下载附件',loading:false,leftheight:0,pdfurl:'',clickIndex:"",currentPage: 1,pageCount: 0,src: "",scale: 100,idx: -1,loadedRatio: 0,toolImg:null,defaultImg: require('../../public/img/def.jpg'),loading1:false,pmidList:'',shoucang1:require('../../public/img/shoucang.png'),shoucang2:'收藏',shoucang10:require('../../public/img/shoucangactive.png'),phone:"",shoucang11:"取消收藏",downloadDir:'',xiazai:true,logID:'',tankuang:false,runlog:'',fileselect:false,loading5:false,fileslist:[],all:null,pagesize:10,dir:'/',wenjianjia:require('../../public/img/wenjian.png'),msg:'',header:{'Authorization': localStorage.getItem('authorization')},datadir:{dir:'/'},fileList1:[],fanhui:false,fileSel:'',fileSels:[],fileSel1:[],fileSels1:[],selectInput:null,multiple:false,
      Sort:'',search:'',isvip:'',aa:'',filesewid:"",mobile:null,url:''
    }
  },
  components:{
    Header,Footer,pdf,Filecom
  },
  watch: {
    dir(val){
      this.datadir.dir=this.dir
    }
  },
  
  mounted(){
    this.url=geturl()
    this.mobile=localStorage.getItem("mobile")
    this.getRouterData().then(e=>{
      if(document.getElementsByClassName('upload1')[0]!=undefined){
        for(let a of document.getElementsByClassName('upload1')){
          let c=(a.className).split(' ')[1]
          document.getElementsByClassName(`${c}+1`)[0].style.display='block'
          document.getElementsByClassName(`${c}`)[0].style.display='none'
        }
      }
      for(let a of this.rule){
        if(a.className=='radio11'){
          a.value='shuru'+a.id
        }
      }
      this.leftheight=this.$refs.leftBottom.offsetHeight+'px'
      if(this.mobile!=null){
        this.getArticle()
      }
      this.isvip=localStorage.getItem('isvip')
    })
    this.gongjushuo()
  },
  activated() {
    
  },
  methods: {
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
    toPersonal(){
      const {href} =this.$router.resolve({
        path: '/Personal',query:{type:'date'}
      })
      window.open(href, '_blank')
    },
    //文件系统搜索功能
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
    //文件系统排序功能
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
    //文件目录选择
    check(){
      var id=null
      if(isNaN(this.selectInput.srcElement.parentNode.parentNode.parentNode.classList[1])== false){
        id=this.selectInput.srcElement.parentNode.parentNode.parentNode.classList[1]
      }else if(isNaN(this.selectInput.srcElement.parentNode.parentNode.parentNode.classList[2])== false){
        id=this.selectInput.srcElement.parentNode.parentNode.parentNode.classList[2]
      }else if(isNaN(this.selectInput.srcElement.parentNode.parentNode.parentNode.classList[3])== false){
        id=this.selectInput.srcElement.parentNode.parentNode.parentNode.classList[3]
      }else if(isNaN(this.selectInput.srcElement.parentNode.parentNode.parentNode.classList[4])== false){
        id=this.selectInput.srcElement.parentNode.parentNode.parentNode.classList[4]
      }
      this.ff.setValue(id,this.multiple!=false?this.fileSel1.toString():this.fileSel.toString())
      this.fileselect=false
      //   var id=null
      //   if(isNaN(this.selectInput.path[3].classList[1])== false){
      //     id=this.selectInput.path[3].classList[1]
      //   }
      //   if(isNaN(this.selectInput.path[3].classList[2])== false){
      //     id=this.selectInput.path[3].classList[2]
      //   }
      //   if(isNaN(this.selectInput.path[3].classList[3])== false){
      //     id=this.selectInput.path[3].classList[3]
      //   }
      //   this.ff.setValue(id,this.multiple!=false?this.fileSel1.toString():this.fileSel.toString())
      //   this.fileselect=false
      
      
    },
    //退出文件系统弹框
    edit(){
      this.fileselect=false
    },
    //上传文件失败回调
    error(err, file, fileList){
      // console.log(err)
    },
    //文件系统返回上级功能
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
    //上传文件成功回调
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
    //文件系统刷新功能
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
    //选取文件名称事件
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
    //文件系统分页页码改变函数
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
    //选择文件名focus函数
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
    settingEvent(){},
    //弹框函数
    downDiscuoption(){
      this.tankuang=false
    },
    //查看日志
    lookLog(){
      this.axios.get('/tools/lookToolLog',{
        params:{id:this.logID}
      }).then(result=>{
        if(result.data.data!=null && result.data.data!=undefined){
          this.tankuang=true
          this.runlog=result.data.data
        }
      }).catch(error=>{
        if(error){
          throw error
        }
      });
    },
    //下载运行文件
    downLoad(){
      this.mess=true
      var xhr = new XMLHttpRequest();
      
      xhr.open('get', `${this.url}/files/downloadAllUserFile?dir=/${this.downloadDir}`);    //也可以使用POST方式，根据接口
      xhr.setRequestHeader("Authorization",`${localStorage.getItem('authorization')}`);
      xhr.responseType = "blob";   //返回类型blob
      xhr.onload =  (e) =>{
        //定义请求完成的处理函数
        if (e.target.status == 200) {
          var blob = e.target.response;
          var url1 = URL.createObjectURL(blob);
          var a = document.createElement('a');
          a.href = url1;
          a.download=this.downloadDir+'.zip';
          a.click();
          //释放之前创建的URL对象
          window.URL.revokeObjectURL(url1);
          this.mess=false
        }
      };
      xhr.send(null);
    },
    //收藏
    collection(id,phone){
      var qs=require('qs');
      if(phone==undefined || phone.length<=0){
        if($(`#${id}`).attr("src")==require("../../public/img/shoucang.png") || $(`#${id+1}`).attr("src")==require("../../public/img/shoucang.png")){
          this.axios.post(`/tools/editToolCollect`, qs.stringify({
            id:id,
            isCollect:'1'
          })).then(result=>{
            if(result.data.code=='200'){
              $(`#${id}`).attr("src",require("../../public/img/shoucangactive.png"));
              $(`#${id+1}`).attr("src",require("../../public/img/shoucangactive.png"));
              $(`#${id}`).attr("title",'取消收藏');
              $(`#${id+1}`).attr("title",'取消收藏');
            }
          }).catch(error=>{
            if(error){
              throw error
            }
          });
        }else{
          this.axios.post(`/tools/editToolCollect`, qs.stringify({
            id:id,
            isCollect:'0'
          })).then(result=>{
            if(result.data.code=='200'){
              $(`#${id}`).attr("src",require("../../public/img/shoucang.png"));
              $(`#${id+1}`).attr("src",require("../../public/img/shoucang.png"));
              $(`#${id}`).attr("title",'收藏');
              $(`#${id+1}`).attr("title",'收藏');
            }
          }).catch(error=>{
            if(error){
              throw error
            }
          })
        }
      }else if(phone!=undefined || phone.length<=0){
        if($(`#${id}`).attr("src")==require("../../public/img/shoucang.png") || $(`#${id+1}`).attr("src")==require("../../public/img/shoucang.png")){
          this.axios.post(`/tools/editToolCollect`, qs.stringify({
            id:id,
            isCollect:'1'
          })).then(result=>{
            if(result.data.code=='200'){
              $(`#${id}`).attr("src",require("../../public/img/shoucangactive.png"));
              $(`#${id+1}`).attr("src",require("../../public/img/shoucangactive.png"));
              $(`#${id}`).attr("title",'取消收藏');
              $(`#${id+1}`).attr("title",'取消收藏');
            }
          }).catch(error=>{
            if(error){
              throw error
            }
          })
        }else{
          this.axios.post(`/tools/editToolCollect`, qs.stringify({
            id:id,
            isCollect:'0'
          })).then(result=>{
            if(result.data.code=='200'){
            $(`#${id}`).attr("src",require("../../public/img/shoucang.png"));
            $(`#${id+1}`).attr("src",require("../../public/img/shoucang.png"));
            $(`#${id}`).attr("title",'收藏');
            $(`#${id+1}`).attr("title",'收藏');
          }
        }).catch(error=>{
          if(error){
            throw error
          }
        })
        }
      }
    },
    //收藏
    getArticle(){
      this.axios.get(`/tools/getToolCollect`).then(result=>{
        if(result.data.data!=undefined && result.data.data!=null){
          this.pmidList=result.data.data
        }
      }).catch(error=>{
        if(error){
          throw error
        }
      });
    },
    //pdf翻页
    changePdfPage(val) {
      if(val === 0 && this.currentPage > 1) {
        this.currentPage--;
      }
      if(val === 1 && this.currentPage < this.pageCount) {
        this.currentPage++;
      }
    },
    // pdf加载时
    loadPdfHandler(e) {
      this.currentPage = 1; // 加载的时候先加载第一页
    },
    //放大
    scaleD() {
      this.scale += 5;
      // this.$refs.pdf.$el.style.transform = "scale(" + this.scale + ")";
      this.$refs.pdf.$el.style.width = parseInt(this.scale) + "%";
    },
    //缩小
    scaleX() {
      if(this.scale == 100) {
          return;
      }
      this.scale += -5;
      this.$refs.pdf.$el.style.width = parseInt(this.scale) + "%";
      // this.$refs.pdf.$el.style.transform = "scale(" + this.scale + ")";
    },
    //查看文件
    show(item,a){
      this.loading1=true
      this.img1=''
      this.datas1=''
      this.pdfurl=''
      var qs=require('qs')
      this.clickIndex=a
      this.axios.get(`/files/lookUserFile`,{params:{
        dir:`${item}`
      },paramsSerializer: function(params) {
          return qs.stringify(params, {arrayFormat: 'brackets'})
        },}).then((response)=>{
        if(response.headers["content-type"]=='image/png;charset=UTF-8'){
          this.loading1=false
          this.contenttype='img'
          this.img1=`data:image/png;base64,${response.data}`
          this.datas1=''
        }else if(response.headers["content-type"]=='application/pdf;charset=UTF-8'){
          this.loading1=false
          this.contenttype='pdf'
          this.pdfurl=response.data
          this.datas1=''
        }else{
          this.loading1=false
          this.contenttype='text'
          this.datas1=response.data
        }
      }).catch(error=>{
        if(error){
          throw error
        }
      });
    },
    //提交
    onSubmit(formData){
      if(this.fileList.length>0){
        this.loading=true
      }
      var args1=[]
      for(var a in formData){
        var b={}
        b.id=a
        b.value=formData[a]
        args1.push(b)
      }
      document.getElementsByClassName('el-button--medium')[0].innerText='提交中...'
      document.getElementsByClassName('el-button--medium')[0].disabled=true
      document.getElementsByClassName('el-button--medium')[0].style.cursor='not-allowed'
      var qs=require('qs');
      this.axios.post(`/tools/previewTool`, qs.stringify({
        id:this.id,
        args:JSON.stringify(args1),
        type:'run'
      })).then(result=>{
        if(result.status=='200'){
          document.getElementsByClassName('el-button--medium')[0].innerText='提交'
          document.getElementsByClassName('el-button--medium')[0].disabled=false
          document.getElementsByClassName('el-button--medium')[0].style.cursor='pointer'
        }else{
          document.getElementsByClassName('el-button--medium')[0].innerText='提交'
          document.getElementsByClassName('el-button--medium')[0].disabled=false
          document.getElementsByClassName('el-button--medium')[0].style.cursor='pointer'
        }
        if(result.data.code=='500'){
          this.$message({
            message: '正在运行请勿重复提交',
            type: 'warning'
          });
          
        }
        if(result.data.data!=null && result.data.data!='' && result.data.data!=undefined){
          this.logID=result.data.msg
          this.fileList=result.data.data
          this.downloadDir=this.fileList[0].split('/')[1]
          this.loading=false
          for(let a in this.fileList){
            if(this.fileList[a].substring( this.fileList[a].lastIndexOf("."))=='.png' || this.fileList[a].substring( this.fileList[a].lastIndexOf("."))=='.jpeg'){
              this.show(this.fileList[a],a)
              this.clickIndex=a
              return 
            }
          }
        }
      }).catch(error=>{
        if(error){
          throw error
        }
      });
    },
    //选择文件或文件夹
    change(e){
      for(let a of document.getElementsByClassName('upload1')){
        let c=(a.className).split(' ')[1]
        if(e==`输入`+c){
          document.getElementsByClassName(`${c}+1`)[0].style.display='block'
          document.getElementsByClassName(`${c}`)[0].style.display='none'
        }else if(e==`文件`+c){
          document.getElementsByClassName(`${c}+1`)[0].style.display='none'
          document.getElementsByClassName(`${c}`)[0].style.display='block'
        }
      }
    },
    //例子附件下载
    expDown(expfilename){
      this.fujian1='下载中...'
      document.getElementById('fujian').disabled=true
      document.getElementById('fujian').style.cursor='not-allowed'
      var xhr = new XMLHttpRequest();
      xhr.open('get', `${this.url}/tools/downToolFile?id=${this.id}&type=${this.exptype}`);    //也可以使用POST方式，根据接口
      xhr.setRequestHeader("Authorization",`${localStorage.getItem('authorization')}`);
      xhr.responseType = "blob";   //返回类型blob
      xhr.onload = function () {
        //定义请求完成的处理函数
        if (this.status === 200) {
          this.fujian1='下载附件'
          document.getElementById('fujian').disabled=false
          document.getElementById('fujian').style.cursor='pointer'
          var blob = this.response;
            var url1 = URL.createObjectURL(blob);
            var a = document.createElement('a');
            a.href = url1;
            a.download=expfilename
            a.click();
            //释放之前创建的URL对象
            window.URL.revokeObjectURL(url1);
        }
      };
      xhr.send(null);
      this.fujian1='下载附件'
      document.getElementById('fujian').disabled=false
      document.getElementById('fujian').style.cursor='pointer'
    },
    //工具说明附件下载
    readDown(readfilename){
      this.fujian1='下载中...'
      document.getElementById('fujian').disabled=true
      
      document.getElementById('fujian').style.cursor='not-allowed'
      var xhr = new XMLHttpRequest();
      xhr.open('get', `${this.url}/tools/downToolFile?id=${this.id}&type=${this.readtype}`);    //也可以使用POST方式，根据接口
      xhr.setRequestHeader("Authorization",`${localStorage.getItem('authorization')}`);
      xhr.responseType = "blob";   //返回类型blob
      xhr.onload = function () {
        //定义请求完成的处理函数
        if (this.status === 200) {
          this.fujian1='下载附件'
          document.getElementById('fujian').disabled=false
          document.getElementById('fujian').style.cursor='pointer'
          var blob = this.response;
            var url1 = URL.createObjectURL(blob);
            var a = document.createElement('a');
            a.href = url1;
            a.download=readfilename
            a.click();
            //释放之前创建的URL对象
            window.URL.revokeObjectURL(url1);
        }
      };
      xhr.send(null);
      this.fujian1='下载附件'
      document.getElementById('fujian').disabled=false
      document.getElementById('fujian').style.cursor='pointer'
    },
    //工具说明函数
    gongjushuo(){
      this.gongju2=true
      this.lizi2=false
      this.shiyong2=false
      document.getElementById('gongju').style.background="#fff"
      document.getElementById('gongju').style.color="#FF7613"
      document.getElementById('lizi').style.background="none"
      document.getElementById('lizi').style.color="#999"
      document.getElementById('shiyong').style.background="none"
      document.getElementById('shiyong').style.color="#999"
      this.gongju2=true
      this.lizi2=false
      this.shiyong2=false
      if(this.readme=="" || this.readme==undefined){
        this.axios.get(`/tools/getToolReadme`,{
          params:{id:this.id}
        }).then(result=>{
          if(result.data.data.readme!=null){
            this.readme=result.data.data.readme
          }
          if(result.data.data.hasfile!=undefined){
            this.readtype=result.data.data.hasfile
            this.readhasfile=true
            this.readfilename=result.data.data.filename
          }
        })
      }
    },
    //例子函数
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
      var qs=require('qs')
      if(this.example=="" || this.example==undefined){
        this.axios.get(`/tools/getToolExp`, {
          params:{id:this.id},paramsSerializer: function(params) {
          return qs.stringify(params, {arrayFormat: 'brackets'})
        },
        }).then(result=>{
          if(result.data.data.example!=null){
            this.example=result.data.data.example
          }
          if(result.data.data.hasfile!=undefined){
            this.exptype=result.data.data.hasfile
            this.exphasfile=true
            this.expfilename=result.data.data.filename
          }
        }).catch(error=>{
          if(error){
            throw error
          }
        });
      }
    },
    //使用说明函数
    shiyong(){
      document.getElementById('shiyong').style.background="#fff"
      document.getElementById('shiyong').style.color="#FF7613"
      document.getElementById('gongju').style.background="none"
      document.getElementById('gongju').style.color="#999"
      document.getElementById('lizi').style.background="none"
      document.getElementById('lizi').style.color="#999"
      this.gongju2=false
      this.lizi2=false
      this.shiyong2=true
    },
    //获取工具详情
    async getRouterData(){
      var qs=require('qs')
      this.id=this.$route.query.tool_id
      await this.$axios.get(`/tools/getToolInfo`,{
        params:{id:this.id},paramsSerializer: function(params) {
          return qs.stringify(params, {arrayFormat: 'brackets'})
        },
      }).then(result=>{
        if(result.data.code==200){
          this.toolImg=result.data.data.toolImg
          this.title1=result.data.data.title
          this.desctiption=result.data.data.desctiption
          this.tooltype=result.data.data.tooltype
          let args=result.data.data.args
          this.rule=formCreats(args,this.files111)
          if(this.mobile!=null){
            for(let a of this.rule){
              if(a.name=='folder'){
                this.axios.get(`/files/getAllUserFile`,{
                  params:{type:"folder"}
                }).then(result=>{
                  if(result.data.data!=undefined){
                    var fliselists=JSON.parse(pako_ungzip(result.data.data))
                    var bbb=[]
                    for(var aa in fliselists){
                      var cc={}
                      cc.value=fliselists[aa]
                      cc.label=fliselists[aa]
                      bbb.push(cc)
                    }
                    a.ppp=bbb
                    a.options=bbb
                  }
                })
              }
            }
          }
          
        }
      }).catch(error=>{
        if(error){
          throw error
        }
      });
    }
  },
}
</script>
<style scoped>
  @media screen and (min-width:1200px){
    .content{
      width: 1200px !important;
    }
    .contentBottom{
      width: 1200px !important;
    }
  }
  .content{
    overflow: hidden;
    margin: 0 auto;
    width: 100%;
  }
  .contentBottom{
    overflow: hidden;
    margin: 0 auto;
    width: 100%;
    background: #FFF;
    margin-top: 10px;
    border-radius: 5px;
    display: flex;
    flex-direction: row;
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
    margin-top: 10px;
    border-radius: 0 5px 5px 5px;
    padding: 20px;
    overflow: hidden;
    overflow-y: auto;
  }
  .inforight>span{
    display: inline-block;
    width: 80px;
    cursor: pointer;
    background: #3366cc;
    border: 1px solid #3366cc;
    border-radius: 5px;
    padding: 5px 10px;
    color: #fff;
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
    min-height: 500px;
    height: 100%;
  }
  .wenzi{
    margin-top: 5px;
    margin-left:20px;
    width: 100%;
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
  .wenzi>p:nth-child(1){
    text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }
  .wenzi>p:nth-child(2){
    text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    height: 40px;
  }
  .leftbottom>>>.el-upload__input{
  display: none;
}
.leftbottom>>>.el-select{
  width: 95%;
}
.leftbottom>>>.fc-upload-btn, .fc-files,.fc-files{
  width: 44px;
  height: 40px;
  line-height: 40px;
}
.leftbottom>>>.fc-files{
  display: none
}
.editimg{
  cursor: pointer;
}
.runcmd{
  margin-top: 20px;
}
.BottomLeft{
  width: 15%;
  border-right: 1px solid #dcdcdc;
  overflow: hidden;
  padding: 20px;
}
.BottomRight{
  width: 85%;
  padding: 20px;
}
.leftbottom>>>.el-button{
  width: 100px!important;
  margin-left: 81.5%;
}
.filename{
  cursor: pointer;
}
.leftbottom>>>.el-form-item{
  margin-bottom: 15px ; 
}
.leftbottom>>>.el-form-item__error{
  padding-top: 0px;
}
.leftbottom>>>.input1{
  margin-bottom: 15px;
}
.active{
  background: #AAD6ED;
}
.pdf{
  position: relative;
}
.footers {
  width: 100%;
  height: rem(100);
  display: flex;
  z-index: 100;
  color: #333;
  border-top: 1px solid #f0f0f0;
  line-height: rem(80);
  background-color: #fff;
}
.footers>li {
  text-align: center;
  flex: 1;
  padding: rem(10) 0;
}
.footers>li>p {
  border-right: 1px solid #f0f0f0;
  cursor: pointer;
}
.footers>li:last-child>p {
  border-right: 0 none;
}
.footers>.select {
  color: #fff;
  background-color: #c59c5a;
}
.footers>.select>p {
  border-right: 0 none;
}
.leftbottom>>>.el-radio-button__inner{
  text-overflow:ellipsis;white-space:nowrap;
  overflow: hidden;width:85px;
}
.biaoge{
  width:100%;overflow-x:scroll;
}
.xiazaiTop{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.xiazaiTop>span:nth-child(2):hover{
  cursor: pointer;
  color: #409EFF;
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