<template>
  <div>
    <div class="tankuang" v-if="tankuang" @click="downDiscuoption()">
      <div v-loading="loading10"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="f5f5f5" id="view" @click.stop="settingEvent()">
        <p>数据详情</p>
        <p v-if="datas1.split(/\n/g).length<=1">{{datas1}}</p>
        <img v-if="contenttype=='img'" class="yulanimg" :src="img1" alt="">
        <div class="biaogetankuang" v-if="contenttype!='img' && datas1.split(/\n/g).length>1 && contenttype!='pdf'">
          <table v-if="datas1.split(/\n/g).length>1">
            <tr v-for="(item,i) of datas1.split(/\n/g)" :key="i">
              <td  v-for="(item1,n) of item.split(/\t/g)" :key="n">{{item1}}</td>
            </tr>
          </table>
        </div>
        <p class="xiazai111"><el-button type="primary" v-if="rowurl!='log'" @click="xizai1(rowname)" round>下载</el-button></p>
      </div>
    </div>
    <div style="margin-bottom:10px;">
      <p>当前位置：<span id="dir">{{dir}}</span></p>
    </div>
    <div class="top1">
      <div>
        <el-button @click="toshang(dir)" :disabled="fanhui" size="mini"><i class="el-icon-back"></i>返回上级</el-button>
        <el-button @click="shuaxin(dir)" id="shuaxin" size="mini"><i class="el-icon-refresh-right"></i>刷新</el-button>
      </div>
      <div>
        <el-upload
          class="upload-demo"
          :action="action"
          :on-success="success"
          :on-error='error'
          :before-upload='beforeupload'
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
      element-loading-background="f5f5f5">
      <el-table :data="fileslist" style="width: 100%;min-height:540px" @sort-change='sortChange'>
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
        <el-table-column
          fixed="right"
          label="操作"
          width="70">
          <template slot-scope="scope">
            <el-button @click="download(scope)" :ref="scope.row.url.split('/')[1]"  :disabled='scope.row.type+scope.row.size+scope.$index == aid' v-if="scope.row.name!='uploads' && scope.row.name!='tools' && scope.row.type!='dir'" type="text" size="small">
              <div class="loading1" v-if="scope.row.type+scope.row.size+scope.$index == aid">
                <svg viewBox="25 25 50 50" class="circular"> 
                  <circle cx='50' cy='50' r='20' fill='none' class="path"></circle>
                </svg>
              </div>
              <div v-else>
                下载
              </div></el-button>
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
  </div>
</template>
<script>
import { geturl } from '../../public/js/status'
export default {
  data() {
    return {
      loading5:false,fileslist:[],all:null,pagesize:10,dir:'/',wenjianjia:require('../../public/img/wenjian.png'),msg:'',header:{'Authorization': localStorage.getItem('authorization')},datadir:{dir:'/'},fileList1:[],fanhui:false,fileSel:'',fileSels:[],fileSel1:[],fileSels1:[],selectInput:null,multiple:false,
      Sort:'',search:'',wenjian:require('../../public/img/wenjian1.png'),currentPage:1,tankuang:false,action:'',aid:null
    }
  },
  watch: {
    
    dir(val){
      this.datadir.dir=this.dir
    }
  },
  mounted() {
    this.action=geturl()+'/files/uploadUserFile'
    this.loading5=true
    this.axios.get(`/files/listUserFile`,{params:{
      dir:`${this.dir}`,
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
        this.loading5=false
      }
    })
  },
  methods: {
    //上传文件前判断文件名
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
    //下载查看的文件
    xizai1(name){
      this.axios.get('/files/downUserFile',{params:{dir:this.rowurl}}).then(result=>{
        window.open(result.data)
      })
    },
    settingEvent(){},
    //关闭弹框
    downDiscuoption(){
      this.tankuang=false
    },
    //下载文件
    download(b){
      if(b.type=="dir"){
        this.aid=b.row.type+b.row.size+b.$index
        var qs=require('qs');
        this.$axios.post(`/tools/zipToolFile`, qs.stringify({
          dir:b.row.url,
        })).then(result=>{
          this.aid=null
        })
      }else{
        this.aid=b.row.type+b.row.size+b.$index
        this.axios.get('/files/downUserFile',{params:{dir:b.row.url}}).then(result=>{
          this.aid=null
          window.open(result.data)
        })
        
      }
    },
    //文件排序
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
    error(err, file, fileList){
      // console.log(err)
    },
    //返回上级
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
    //上传文件成功
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
    //刷新
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
    //查看文件
    handleGoods(row){
      if(row.type=="dir"){
        this.loading=true
        this.axios.get(`/files/listUserFile`,{params:{
          dir:`${row.url}`,
          page:1,
          total:this.pagesize,
          sort:this.Sort
        }}).then(result=>{
          if(result.data.data!=undefined){
            this.dir=row.url
            this.fileslist=result.data.data.datas
        this.all=result.data.data.all
        this.loading=false
          }
        })
      }else{
        this.axios.get(`/files/lookUserFile`,{params:{
          dir:`${row.url}`
        }}).then((response)=>{
          if(response.headers["content-type"]=='image/png;charset=UTF-8' || response.headers["content-type"]=='image/jpeg;charset=UTF-8'){
            this.contenttype='img'
            this.img1=`data:image/png;base64,${response.data}`
            this.datas1=''
            this.rowurl=row.url
            this.rowname=row.name
            this.tankuang=true
          }else if(response.headers["content-type"]=='application/pdf;charset=UTF-8'){
            this.contenttype='pdf'
            const {href} =this.$router.resolve({
              path: '/pdf',
              query:{
                url:response.data
              },
            })
            window.open(href, '_blank')
          }else{
            this.contenttype='text'
            this.datas1=response.data.toString()
            this.rowurl=row.url
            this.rowname=row.name
            this.tankuang=true
          }
          
        })
      }
    },
    //列表分页
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
  }
}
</script>
<style scope>
.top1{
  display: flex;
  flex-direction: row;
  padding-top: 10px; 
  border-top: 1px solid #dcdcdc;
}
.top1>p:last-child{
  width: 200px;
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
/* .top1>>>.el-upload__input{
  display: none;
} */
.top1>div:nth-child(2)>.upload-demo>.el-upload>.el-upload__input{
  display: none;
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
.loading1 .path{
    animation: loading-dash 1.5s ease-in-out infinite;
    stroke-dasharray: 90,150;
    stroke-dashoffset: 0;
    stroke-width: 2;
    stroke: #409eff;
    stroke-linecap: round;
  }
  .loading1 .circular {
    height: 16px;
    width: 16px;
    animation: loading-rotate 2s linear infinite;
  }
</style>