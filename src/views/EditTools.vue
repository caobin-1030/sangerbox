<template>
  <div>
    <Header></Header>
    <div class="fileselect" v-if="fileselect" >
      <div :style='filesewid'>
        <div style="margin-bottom:10px;" class="search1">
          <p>当前位置：<span id="dir" style="cursor: pointer;" @click="toPersonal">{{dir}}</span></p>
          <div>
            <el-input v-model="search" placeholder="请输入搜索内容"></el-input>
            <button @click="Search">搜索</button>
          </div>
        </div>
        <div class="top1">
          <div>
            <el-button @click="toshang(dir)" :disabled="fanhui1" size="mini"><i class="el-icon-back"></i>返回上级</el-button>
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
          element-loading-background="f5f5f5" :style="aa"  class="tableqqq" >
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
            @current-change="handleCurrentChange1"
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
            <el-button type="primary" @click="edit1">退出</el-button>
          </div>
        </div>
        
      </div>
    </div>
    <div class="Content">
      <div class="Content-C">
        <div class="gongju">
          <div class="gongju-top">
            <p v-if="title1==''">功能模块1</p><p v-else>{{title1}}</p><span @click="back()" v-if="fanhui">上一步</span>
          </div>
          <div class="buzhou">
            <el-steps :active="active" finish-status="success" simple>
              <el-step title="基本信息" icon="el-icon-document" @click="edit"></el-step>
              <el-step title="软件参数" icon="el-icon-folder-checked"></el-step>
              <el-step title="软件结果" icon="el-icon-s-cooperation"></el-step>
              <el-step title="软件预览及其他" icon="el-icon-picture"></el-step>
            </el-steps>
            <div class="active0" v-if="active0">
              <div>
                <p class="biaoti">
                  <span>标题</span>
                  <el-input v-model="title" placeholder="请输入标题" size="mini"></el-input>
                </p>
                <div class="miaoshu">
                  <div>
                    <span>描述</span>
                  </div>
                  <div>
                    <el-input type="textarea" :rows="4" placeholder="请输入内容" v-model="miaoshu"> </el-input>
                  </div>
                </div>
              </div>
              <div>
                <p class="fenzu">
                  <span>分组</span>
                  <el-select v-model="fenzu" placeholder="请选择" size="mini">
                    <el-option
                      v-for="item in fenzus"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </p>
                <p class="ruanjianbao">
                  <span>软件包</span>
                  <el-upload
                    class="upload-demo"
                    :http-request="addAttachment"
                    action=""
                    :on-preview="handlePreview"
                    :on-remove="handleRemove">
                    <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                  </el-upload>
                </p>
              </div>
              <div>
                <p class="yunxing">
                  <span>是否后台运行</span>
                  <el-radio v-model="radio" label="yes">是</el-radio>
                  <el-radio v-model="radio" label="no">否</el-radio>
                </p>
                <p class="tijiao"><el-button type="primary" @click="Active0Sub" round>提交</el-button></p>
              </div>
            </div>
            <div class="active1" v-if="active1">
              <div>
                <div>
                  <p class="wenjian"><span>请选择可执行文件</span></p>
                  <el-select v-model="wenjian" placeholder="请选择" size="mini">
                    <el-option
                      v-for="item in wenjians"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </div>
                <div>
                  <p class="pingtai"><span>请选择执行平台</span></p>
                  <el-select v-model="pingtai1" placeholder="请选择" size="mini">
                    <el-option
                      v-for="item in pingtai1s"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </div>
              </div>
              <div class="parameter">
                <div class="canshu">
                  <div class="canshu2">
                    <span>参数名称</span>
                    <el-input v-model="parameterName" placeholder="请输入参数名称" size="mini"></el-input>
                  </div>
                  <div class="canshu2">
                    <span>参数描述</span>
                    <el-input v-model="parameterDescription" placeholder="请输入参数描述" size="mini"></el-input>
                  </div>
                  <div class="canshu2">
                    <span>参数短码</span>
                    <el-input v-model="parameterNumber" placeholder="请输入参数编号" size="mini"></el-input>
                  </div>
                  <div class="canshu2">
                    <span>参数长码</span>
                    <el-input v-model="parameterNumber2" placeholder="请输入参数编号" size="mini"></el-input>
                  </div>
                  <div class="canshu5">
                    <span>参数类型</span>
                    <el-select v-model="type" placeholder="请选择" size="mini">
                      <el-option
                        v-for="item in types"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </div>
                  <div class="canshu6" v-if="type=='select' || type=='radio' || type=='checkbox' || type=='mutiSelect'">
                    <span>参数类型值</span>
                    <el-input type="textarea" v-model="typeValue" placeholder="请输入参数类型值，一行一个值，不允许有空格" size="mini"></el-input>
                  </div>
                  <div class="canshu4">
                    <span>参数默认值</span>
                    <el-input v-model="parameterDefault" placeholder="请输入参数默认值" size="mini"></el-input>
                  </div>
                  <div class="canshu7">
                    <span>参数是否能为空</span>
                    <div><el-radio v-model="missValue" label="1">能为空</el-radio>
                    <el-radio v-model="missValue" label="0">不能为空</el-radio></div>
                    
                  </div>
                </div>
                <div class="xinzeng">
                  <p>
                    <el-button type="primary" @click="xinzeng" size="mini" round>新增</el-button>
                    <el-button type="primary" @click="bianjixuanzhonghang" :disabled="xuanzhonghang" size="mini" round>编辑选中行</el-button>
                    <el-button type="primary" @click="shanchuxuanzhonghang" :disabled="xuanzhonghang" size="mini" round>删除选中行</el-button>
                  </p>
                </div>
              </div>
              <div class="biaoge">
                <el-table
                  :data="data1"
                  style="width: 100%"
                  highlight-current-row
                  @current-change="handleCurrentChange"
                  :row-class-name="tableRowClassName"
                  @row-click="rowclick">
                  <el-table-column
                    prop="argsLabel"
                    label="参数名称">
                  </el-table-column>
                  <el-table-column
                    prop="argsDesc"
                    label="参数描述">
                  </el-table-column>
                  <el-table-column
                    prop="argsNumber"
                    label="参数短码">
                  </el-table-column>
                  <el-table-column
                    prop="argsLabelNumber"
                    label="参数长码">
                  </el-table-column>
                  <el-table-column
                    prop="argsType"
                    label="参数类型">
                  </el-table-column>
                  <el-table-column
                    prop="argsValueListvalue"
                    label="参数类型值">
                  </el-table-column>
                  <el-table-column
                    prop="defaultValue"
                    label="参数默认值">
                  </el-table-column>
                  <el-table-column
                    prop="missValue"
                    label="参数默认值">
                  </el-table-column>
                </el-table>
                
              </div>
              <p style="text-align: right; margin-right: 40px; margin-top: 10px; margin-bottom: 10px;"><el-button type="primary" @click="Active1Sub" size="mini" round>提交</el-button></p>
            </div>
            <div class="active2" v-if="active2">
              <div>
                <div>
                  <p class="wenjianming">
                    <span>文件名</span>
                    <el-input v-model="fileName" placeholder="请输入结果文件名称" size="mini"></el-input>
                  </p>
                  <p class="pipei">
                    <span>文件模式匹配</span>
                    <el-radio v-model="radioFile" label="1">文件前缀</el-radio>
                    <el-radio v-model="radioFile" label="0">完整文件名</el-radio>
                  </p>
                  <p class="wenjianleixing">
                    <span>文件类型</span>
                    <el-select v-model="fileType" placeholder="请选择" size="mini">
                      <el-option
                        v-for="item in fileTypes"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </p>
                  <p class="pipei">
                    <span>是否可缺失</span>
                    <el-radio v-model="radioDefect" label="0">一定生成</el-radio>
                    <el-radio v-model="radioDefect" label="1">不一定生成</el-radio>
                  </p>
                </div>
                <div class="xinzeng">
                  <p>
                    <el-button type="primary" @click="xinzeng1" size="mini" round>新增</el-button>
                    <el-button type="primary" @click="bianjixuanzhonghang1" :disabled="xuanzhonghang1" size="mini" round>编辑选中行</el-button>
                    <el-button type="primary" @click="shanchuxuanzhonghang1" :disabled="xuanzhonghang1" size="mini" round>删除选中行</el-button>
                  </p>
                </div>
              </div>
              <div class="biaoge">
                <el-table
                  :data="data2"
                  style="width: 100%"
                  highlight-current-row
                  @current-change="handleCurrentChange"
                  :row-class-name="tableRowClassName1"
                  @row-click="rowclick1">
                  <el-table-column
                    prop="fileName"
                    label="文件名">
                  </el-table-column>
                  <el-table-column
                    prop="filePrifx"
                    label="文件匹配模式">
                    <template slot-scope="scope">
                      <span v-if="scope.row.filePrifx=='0'">完整文件名</span>
                      <span v-if="scope.row.filePrifx=='1'">文件前缀</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="fileType"
                    label="文件类型">
                  </el-table-column>
                  <el-table-column
                    prop="missFile"
                    label="是否可缺失">
                    <template slot-scope="scope">
                      <span v-if="scope.row.missFile=='0'">一定生成</span>
                      <span v-if="scope.row.missFile=='1'">不一定生成</span>
                    </template>
                  </el-table-column>
                </el-table>
                
              </div>
              <p style="text-align: right; margin-right: 40px; margin-top: 10px; margin-bottom: 20px;"><el-button type="primary" @click="Active2Sub" size="mini" round>提交</el-button></p>
            </div>
            <div class="active3" v-if="active3">
              <div class="resultLeft">
                <div class="resultLeftTop">
                  <div class="topLeft">
                    <div><img :src="toolImg?toolImg:defaultImg" alt=""></div>
                    <div class="wenzi">
                      <p style="font-weight: 600;">{{title1}}</p>
                      <p :title='desctiption'>{{desctiption}}</p>
                      <p class="shoucang"><span v-if="mobile==null">需登录才能运行</span></p>
                    </div>
                  </div>
                  <div class="topRight">
                    <p @click="gongjushuo()" id="gongju">工具说明</p>
                    <p @click="lizi1()" id="lizi">例子</p>
                    <p @click="shiyong()" id="shiyong">数据中心</p>
                  </div>
                </div>
                <div class="resultRightBottom" ref="leftBottom">
                  <form-create v-model="ff" @xaboy-change="change" @xaboy11-focus="focus"  @xaboy111-focus="focus1" id="qqq" :rule="rule" @on-submit="onSubmit">
               
                  </form-create>
                  <div v-if="runcmd!=''" class="runcmd">
                    <p>运行结果</p>
                    <p>{{runcmd}}</p>
                  </div>
                </div>
              </div>
              <div v-if="gongju2" class="resultRight" :style="{height:leftheight}">
                <p style="text-align: right"><img class="editimg" @click="toEdit1" src="../../public/img/edit.png" alt=""></p>
                <div style="margin-bottom:30px;" v-html="readme"></div>
                <span id="fujian" class="xiazaifujian" v-if="readhasfile" @click="readDown(readfilename)">{{fujian1}}</span>
              </div>
              <div v-if="lizi2" class="resultRight" :style="{height:leftheight}">
                <p style="text-align: right"><img class="editimg" @click="toEdit2" src="../../public/img/edit.png" alt=""></p>
                <div style="margin-bottom:30px;" v-html="example"></div>
                <span id="fujian" class="xiazaifujian" v-if="exphasfile" @click="expDown(expfilename)">{{fujian1}}</span>
              </div>
              <div v-if="shiyong2" class="resultRight" :style="{height:leftheight}">
                <Filecom/>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="contentBottom" v-if="fileList.length>0">
        <div class="BottomLeft">
          <p v-for="(item,i) of fileList" :key="i" @click="show(item)" :title="item" class="filename">
            <img style="margin-right:5px;" :src="wenjian" alt="">
            {{item}}
          </p>
        </div>
        <div class="BottomRight">
          <p>数据详情</p>
          <p v-if="datas1.split(/\n/g).length<=1">{{datas1}}</p>
          <img v-if="contenttype=='img'" style="width:100%" :src="img1" alt="">
          <div v-if="contenttype!='img' && datas1.split(/\n/g).length>1">
            <table v-if="datas1.split(/\n/g).length>1">
              <tr v-for="(item,i) of datas1.split(/\n/g).splice(0,10)" :key="i">
                <td  v-for="(item1,n) of item.split(/\t/g)" :key="n">{{item1}}</td>
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
import { pako_ungzip } from '../../public/js/indexof'
export default {
  metaInfo() {
    return {title: this.title + '-新增工具'} // set a title
  },
  data() {
    return {
      active:0,active0:true,active1:false,active2:false,active3:false,title:"",miaoshu:'',fenzus:[{value: '1',label: '计算'},{value: '2',label: '可视化'},{value: '3',label: '文件处理'}],fenzu:'',radio: 'yes',parameter1:'',
      parameterNumber:'',parameterName:"",parameterShowName:'',parameterDescription:'',parameterDefault:'',parameterType:'',
      Files:'',id:'',pingtai1:'',pingtai1s:[{value: 'python3',label: 'python3'},{value: 'python2',label: 'python2'},{value: 'Rscript',label: 'Rscript'},{value: 'shell',label: 'shell'},{value: 'java',label: 'java'}],type:'',
      types:[{value: 'fileTextArea',label: 'fileTextArea'},{value: 'file_text-R',label: 'file_text-R'},{value: 'file_text-RW',label: 'file_text-RW'},{value: 'file_text-W',label: 'file_text-W'},{value: 'file_binary-R',label: 'file_binary-R'},{value: 'file_binary-RW',label: 'file_binary-RW'},{value: 'file_binary-W',label: 'file_binary-W'},{value: 'file_folder-R',label: 'file_folder-R'},{value: 'file_folder-RW',label: 'file_folder-RW'},{value: 'file_folder-W',label: 'file_folder-W'},{value: 'file_Multiple-text',label: 'file_Multiple-text'},{value: 'file_Multiple-binary',label: 'file_Multiple-binary'},{value: 'textarea',label: 'textarea'},{value: 'mutiSelect',label: 'mutiSelect'},{value: 'file',label: 'file'},{value: 'checkbox',label: 'checkbox'},{value: 'radio',label: 'radio'},{value: 'select',label: 'select'},{value: 'number',label: 'number'},{value: 'color',label: 'color'},{value: 'time',label: 'time'},{value: 'input',label: 'input'}],
      parameterNumber2:"",edit:'',fanhui:false,wenjian:'',wenjians:[],title1:'',tableData: [],index:'',xuanzhonghang:true,fileName:'',radioFile:'0',fileType:'',fileTypes:[{value: 'tab',label: 'tab'},{value: 'text',label: 'text'},{value: 'pdf',label: 'pdf'},{value: 'jpeg',label: 'jpeg'},{value: 'binary',label: 'binary'},{value: 'folder',label: 'folder'}],radioDefect:'0',xuanzhonghang1:true,tableData1:[],gongju2:true,lizi2:false,shiyong2:false,desctiption:'',
      rule:[],typeValue:'',fliselists:[],files111:[],readme:'',example:'',pipline:'',ff:{},readhasfile:false,readtype:'',exptype:'',exphasfile:false,piptype:false,piphasfile:'',readfilename:'',expfilename:'',pipfilename:'',runcmd:'',fileList:[],wenjian:require('../../public/img/wenjian1.png'),datas1:'',contenttype:'',img1:'',fujian1:'下载附件',leftheight:0,defaultImg: require('../../public/img/def.jpg'),toolImg:null,missValue:'0',
      fileselect:false,loading5:false,fileslist:[],all:null,pagesize:10,dir:'/',wenjianjia:require('../../public/img/wenjian.png'),msg:'',header:{'Authorization': localStorage.getItem('authorization')},datadir:{dir:'/'},fileList1:[],fanhui1:false,fileSel:'',fileSels:[],fileSel1:[],fileSels1:[],selectInput:null,multiple:false,currentPage:1,mobile:null,aa:'',
      Sort:'',search:''
    }
  },
  components:{
    Header,Footer,Filecom
  },
  watch: {
    dir(val){
      this.datadir.dir=this.dir
    }
  },
  mounted() {
  },
  activated() {
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
      if(this.edit=="show"){
        this.leftheight=this.$refs.leftBottom.offsetHeight+140+'px'
        this.axios.get(`/tools/getToolReadme`,{
          params:{id:this.id}
        }).then(result=>{
          if(result.data.data!=undefined){
            if(result.data.data.readme!=undefined){
              this.readme=result.data.data.readme
            }
            if(result.data.data.hasfile!=undefined){
              this.readtype=result.data.data.hasfile
              this.readhasfile=true
              this.readfilename=result.data.data.filename
            }
          }
        })
      }
    })
    
  },
  computed: {
    data1: {
      get: function(){
        return this.tableData; // 在这里把临时对象的值通过计算属性赋值给页面中用到的对象
      }
    },
    data2: {
      get: function(){
        return this.tableData1; // 在这里把临时对象的值通过计算属性赋值给页面中用到的对象
      }
    },
  },
  methods: {
    edit1(){
      this.fileselect=false
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
    toPersonal(){
      const {href} =this.$router.resolve({
        path: '/Personal',query:{type:'date'}
      })
      window.open(href, '_blank')
    },
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
      if(isNaN(this.selectInput.path[3].classList[1])== false){
        id=this.selectInput.path[3].classList[1]
      }
      if(isNaN(this.selectInput.path[3].classList[2])== false){
        id=this.selectInput.path[3].classList[2]
      }
      if(isNaN(this.selectInput.path[3].classList[3])== false){
        id=this.selectInput.path[3].classList[3]
      }
      this.ff.setValue(id,this.multiple!=false?this.fileSel1.toString():this.fileSel.toString())
      this.fileselect=false
    },
    edit1(){
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
    handleCurrentChange1(currentPage){
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
    show(item){
      this.axios.get(`/files/lookUserFile`,{params:{
        dir:`${item}`
      }}).then((response)=>{
        console.log(response)
        if(response.headers["content-type"]=='image/png;charset=UTF-8'){
          this.contenttype='img'
          this.img1=`data:image/png;base64,${response.data}`
          this.datas1=''
        }else{
          this.contenttype='text'
          this.datas1=response.data
          console.log(this.datas1)
        }
      })
    },
    pipDown(pipfilename){
      this.fujian1='下载中...'
      document.getElementById('fujian').disabled=true
      document.getElementById('fujian').style.cursor='not-allowed'
      var xhr = new XMLHttpRequest();
      xhr.open('get', `http://calculate.mysci.online:9000/tools/downToolFile?id=${this.id}&type=${this.piptype}`);    //也可以使用POST方式，根据接口
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
            a.download=pipfilename
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
    expDown(expfilename){
      this.fujian1='下载中...'
      document.getElementById('fujian').disabled=true
      document.getElementById('fujian').style.cursor='not-allowed'
      var xhr = new XMLHttpRequest();
      xhr.open('get', `http://calculate.mysci.online:9000/tools/downToolFile?id=${this.id}&type=${this.exptype}`);    //也可以使用POST方式，根据接口
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
    readDown(readfilename){
      this.fujian1='下载中...'
      document.getElementById('fujian').disabled=true
      document.getElementById('fujian').style.cursor='not-allowed'
      var xhr = new XMLHttpRequest();
      xhr.open('get', `http://calculate.mysci.online:9000/tools/downToolFile?id=${this.id}&type=${this.readtype}`);    //也可以使用POST方式，根据接口
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
    toEdit1(){
      const {href} =this.$router.resolve({
        path: '/Edit',
        query:{
          id:this.id,
          type:'Readme',
        },
      })
      window.open(href, '_blank')
    },
    toEdit2(){
      const {href} =this.$router.resolve({
        path: '/Edit',
        query:{
          id:this.id,
          type:'Exp',
        }
      })
      window.open(href, '_blank')
    },
    toEdit3(){
      const {href} =this.$router.resolve({
        path: '/Edit',
        query:{
          id:this.id,
          type:'Pip',
        }
      })
      window.open(href, '_blank')
    },
    onSubmit(formData){
      var args1=[]
      for(var a in formData){
        var b={}
        b.id=a
        b.value=formData[a]
        args1.push(b)
      }
      document.getElementsByTagName('button')[0].innerText='提交中...'
      document.getElementsByTagName('button')[0].disabled=true
      document.getElementsByTagName('button')[0].style.cursor='not-allowed'
      var qs=require('qs');
      this.axios.post(`/tools/previewTool`, qs.stringify({
        id:this.id,
        args:JSON.stringify(args1),
        type:'pre'
      })).then(result=>{
        if(result.status=='200'){
          document.getElementsByTagName('button')[0].innerText='提交'
          document.getElementsByTagName('button')[0].disabled=false
          document.getElementsByTagName('button')[0].style.cursor='pointer'
        }
        if(result.data.code=='500'){
          this.$message({
            message: '正在运行请勿重复提交',
            type: 'warning'
          });
        }
        if(result.data.data!=null && result.data.data!=''){
          this.runcmd=result.data.data
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
      if(this.example=="" || this.example==undefined){
        this.axios.get(`/tools/getToolExp`, {
          params:{id:this.id}
        }).then(result=>{
          if(result.data.data.example!=null){
            this.example=result.data.data.example
          }
          if(result.data.data.hasfile!=undefined){
            this.exptype=result.data.data.hasfile
            this.exphasfile=true
            this.expfilename=result.data.data.filename
          }
        })
      }
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
    Active2Sub(){
      if(this.tableData1.length>0){
        document.getElementsByTagName('button')[3].innerText='提交中...'
        document.getElementsByTagName('button')[3].disabled=true
        document.getElementsByTagName('button')[3].style.cursor='not-allowed'
        var qs=require('qs');
        this.axios.post(`/tools/postToolResults`, qs.stringify({
          id:this.id,
          results:JSON.stringify(this.tableData1)
        })).then(result=>{
          if(result.data.code==200){
            document.getElementsByTagName('button')[3].innerText='提交'
            document.getElementsByTagName('button')[3].disabled=false
            document.getElementsByTagName('button')[3].style.cursor='pointer'
            this.edit="show"
            this.active=3;
            this.active0=false;
            this.active1=false;
            this.active2=false;
            this.active3=true;this.$router.push({
              path: '/EditTools',
              query:{
                tool_id:this.id,
                edit:'show'
              }
            })
            this.getRouterData().then(e=>{
              if(document.getElementsByClassName('upload1')[0]!=undefined){
                for(let a of document.getElementsByClassName('upload1')){
                  let c=(a.className).split(' ')[1]
                  document.getElementsByClassName(`${c}+1`)[0].style.display='block'
                  document.getElementsByClassName(`${c}`)[0].style.display='none'
                  document.getElementsByClassName(`${c}`)[1].style.display='none'
                }
              }
              for(let a of this.rule){
                if(a.className=='radio11'){
                  a.value='shuru'+a.id
                }
              }
              this.leftheight=this.$refs.leftBottom.offsetHeight+140+'px'
            })
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
        })
      }else{
        this.$message({
          message: '参数至少有一个',
          type: 'warning'
        });
        document.getElementsByTagName('button')[3].innerText='提交'
        document.getElementsByTagName('button')[3].disabled=false
        document.getElementsByTagName('button')[3].style.cursor='pointer'
      }
      
    },
    bianjixuanzhonghang1(){
      this.$set(this.tableData1[this.index],"fileName",this.fileName);
      this.$set(this.tableData1[this.index],"fileType",this.fileType);
      this.$set(this.tableData1[this.index],"filePrifx",this.radioFile);
      this.$set(this.tableData1[this.index],"missFile",this.radioDefect);
    },
    shanchuxuanzhonghang1(){
      this.tableData1.splice(this.index,1)
    },
    xinzeng1(){
      let a={}
      a.fileName=this.fileName
      a.fileType=this.fileType
      a.filePrifx=this.radioFile
      a.missFile=this.radioDefect
      this.tableData1.push(a)
    },
    rowclick1(row, column, event){
      this.xuanzhonghang1=false
      this.fileName=row.fileName
      this.fileType=row.fileType
      this.radioFile=row.filePrifx.toString()
      this.radioDefect=row.missFile.toString()
      this.index=row.index
    },
    handleCurrentChange(val,a){
    },
    shanchuxuanzhonghang(){
      this.tableData.splice(this.index,1)
    },
    tableRowClassName1 ({row, rowIndex}) {
      //把每一行的索引放进row
      row.index = rowIndex;
    },
    bianjixuanzhonghang(){
      this.$set(this.tableData[this.index],"argsLabel",this.parameterName);
      this.$set(this.tableData[this.index],"argsDesc",this.parameterDescription);
      this.$set(this.tableData[this.index],"argsNumber",this.parameterNumber);
      this.$set(this.tableData[this.index],"argsLabelNumber",this.parameterNumber2);
      this.$set(this.tableData[this.index],"argsType",this.type);
      this.$set(this.tableData[this.index],"missValue",this.missValue);
      if(this.type=='select' || this.type=='radio' || this.type=='checkbox' || this.type=='mutiSelect'){
        this.$set(this.tableData[this.index],"argsValueListvalue",this.typeValue);
      }else{
        this.$set(this.tableData[this.index],"argsValueListvalue",'');
      }
      this.$set(this.tableData[this.index],"defaultValue",this.parameterDefault);
    },
    rowclick(row, column, event){
      this.xuanzhonghang=false
      this.parameterName=row.argsLabel
      this.parameterDescription=row.argsDesc
      this.parameterNumber=row.argsNumber
      this.parameterNumber2=row.argsLabelNumber
      this.missValue=row.missValue.toString()
      this.type=row.argsType
      if(this.type=='select' || this.type=='radio' || this.type=='checkbox' || this.type=='mutiSelect'){
        this.typeValue=row.argsValueListvalue
      }
      this.parameterDefault=row.defaultValue
      this.index=row.index
    },
    tableRowClassName ({row, rowIndex}) {
      //把每一行的索引放进row
      row.index = rowIndex;
    },
    handleCurrentChange(val,a){
    },
    xinzeng(){
      let a={}
      a.argsLabel=this.parameterName
      a.argsDesc=this.parameterDescription
      a.argsNumber=this.parameterNumber
      a.argsLabelNumber=this.parameterNumber2
      a.missValue=this.missValue
      if(this.type=='select' || this.type=='radio' || this.type=='checkbox' || this.type=='mutiSelect'){
        a.argsValueListvalue=this.typeValue
      }
      a.argsType=this.type
      a.defaultValue=this.parameterDefault
      this.tableData.push(a)
    },
    back(){
      if(this.edit=="args"){
        this.edit="edit"
        this.fanhui=false; 
        this.active=0;
        this.active0=true;
        this.active1=false;
        this.active2=false;
        this.active3=false;
        this.$router.push({
          path: '/EditTools',
          query:{
            tool_id:this.id,
            edit:'edit'
          }
        })
        
        this.$axios.get(`/tools/getTools`,{
          params:{id:this.id}
        }).then(result=>{
          if(result.data.code==200){
            this.title1=result.data.data.title
            this.title=result.data.data.title
            this.miaoshu=result.data.data.description
            this.fenzu=result.data.data.groupId
            if(result.data.data.toolType==1){
              var a='yes'
            }else{
              var a='no'
            }
            this.radio=a
          }
        })
      }else if(this.edit=="result"){
        this.edit="args"
        this.active=1;
        this.active0=false;
        this.active1=true;
        this.active2=false;
        this.active3=false;
        this.$router.push({
          path: '/EditTools',
          query:{
            tool_id:this.id,
            edit:'args'
          }
        })
        this.$axios.get(`/tools/getToolArgs`,{
          params:{id:this.id}
        }).then(result=>{
          if(result.data.code==200){
            this.wenjian=result.data.data.mainFile
            this.title1=result.data.data.title
            this.pingtai1=result.data.data.toolPlatForm
            if(result.data.data.files.length>0){
              let files=result.data.data.files
              var b=[]
              for(var a of files){
                let c={}
                c.value=a
                c.label=a
                b.push(c)
              }
              this.wenjians=b
            }
            if(result.data.data.args.length>0){
              this.tableData=result.data.data.args
            }
          }
        })
      }else if(this.edit=="show"){
        this.edit="result"
        this.active=2;
        this.active0=false;
        this.active1=false;
        this.active2=true;
        this.active3=false;
        this.$router.push({
          path: '/EditTools',
          query:{
            tool_id:this.id,
            edit:'result'
          }
        })
        this.$axios.get(`/tools/getToolResults`,{
          params:{id:this.id}
        }).then(result=>{
          if(result.data.code==200){
            this.title1=result.data.data.toolTitle
            if(result.data.data.results.length>0){
              this.tableData1=result.data.data.results
            }
          }
        })
      }
    },
    async getRouterData(){
      this.id=this.$route.query.tool_id
      this.edit=this.$route.query.edit
      if(this.id!='' || this.id!=undefined){
        if(this.edit=="edit"){
          this.fanhui=false
          this.active=0;
          this.active0=true;
          this.active1=false;
          this.active2=false;
          this.active3=false;
          
          this.$axios.get(`/tools/getTools`,{
            params:{id:this.id}
          }).then(result=>{
            if(result.data.code==200){
              this.title1=result.data.data.title
              this.title=result.data.data.title
              this.miaoshu=result.data.data.description
              this.fenzu=result.data.data.groupId
              if(result.data.data.toolType==1){
                var a='yes'
              }else{
                var a='no'
              }
              this.radio=a
            }
          })
        }else if(this.edit=="add"){
          this.fanhui=false
          this.active=0;
          this.active0=true;
          this.active1=false;
          this.active2=false;
          this.active3=false;
        }else if(this.edit=="args"){
          this.fanhui=true
          this.active=1;
          this.active0=false;
          this.active1=true;
          this.active2=false;
          this.active3=false;
          this.$axios.get(`/tools/getToolArgs`,{
            params:{id:this.id}
          }).then(result=>{
            if(result.data.code==200){
              console.log(result.data)
              this.wenjian=result.data.data.mainFile
              this.title1=result.data.data.title
              this.pingtai1=result.data.data.toolPlatForm
              if(result.data.data.files.length>0){
                let files=result.data.data.files
                var b=[]
                for(var a of files){
                  let c={}
                  c.value=a
                  c.label=a
                  b.push(c)
                }
                this.wenjians=b
              }
              if(result.data.data.args.length>0){
                this.tableData=result.data.data.args
              }
            }
          })
        }else if(this.edit=="result"){
          // console.log(isLogin())
          
            this.fanhui=true
            this.active=2;
            this.active0=false;
            this.active1=false;
            this.active2=true;
            this.active3=false;
            this.$axios.get(`/tools/getToolResults`,{
              params:{id:this.id}
            }).then(result=>{
              if(result.data.code==200){
                this.title1=result.data.data.toolTitle
                if(result.data.data.results.length>0){
                  this.tableData1=result.data.data.results
                }
              }
            })
          
        }else if(this.edit=="show"){
          this.fanhui=true
          this.active=3;
          this.active0=false;
          this.active1=false;
          this.active2=false;
          this.active3=true;
          await this.$axios.get(`/tools/getToolInfo`,{
            params:{id:this.id}
          }).then(result=>{
            if(result.data.code==200){
              this.toolImg=result.data.data.toolImg
              this.title1=result.data.data.title
              this.desctiption=result.data.data.desctiption
              let args=result.data.data.args
              this.rule=formCreats(args,this.files111)
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
          })
        }
      }
    },
    addAttachment(file){
      this.Files=file.file
    },
    Active0Sub(){
      
      if(this.edit=="add"){
        if(this.radio=="yes"){
          var a=1
        }else{
          var a=0
        }
        if(this.title!="" && this.miaoshu!='' && this.fenzu!="" && this.Files!=""){
          document.getElementsByTagName('button')[1].innerText='提交中...'
          document.getElementsByTagName('button')[1].disabled=true
          document.getElementsByTagName('button')[1].style.cursor='not-allowed'
          let param = new FormData(); //创建form对象
          param.append('file',this.Files);
          param.append('title',this.title);
          param.append('description',this.miaoshu);
          param.append('toolType',a);
          param.append('groupId',this.fenzu);
          this.axios.post(`/tools/addSangerTool`, param).then(result=>{
            if(result.data.code==200){
              document.getElementsByTagName('button')[1].innerText='提交'
              document.getElementsByTagName('button')[1].disabled=false
              document.getElementsByTagName('button')[1].style.cursor='pointer'
              this.edit="args"
              this.fanhui=true
              this.active=1;
              this.active0=false;
              this.active1=true;
              this.active2=false;
              this.active3=false;
              this.id=result.data.data
              this.$router.push({
                path: '/EditTools',
                query:{
                  tool_id:this.id,
                  edit:'args'
                }
              })
              this.$axios.get(`/tools/getToolArgs`,{
                params:{id:this.id}
              }).then(result=>{
                if(result.data.code==200){
                  this.wenjian=result.data.data.mainFile
                  this.title1=result.data.data.title
                  this.pingtai1=result.data.data.toolPlatForm
                  if(result.data.data.files.length>0){
                    let files=result.data.data.files
                    var b=[]
                    for(var a of files){
                      let c={}
                      c.value=a
                      c.label=a
                      b.push(c)
                    }
                    this.wenjians=b
                  }
                  if(result.data.data.args.length>0){
                    this.tableData=result.data.data.args
                  }
                }
              })
            }
          })
        }else{
          this.$message({
            message: '所有数据不为空',
            type: 'warning'
          });
        }
        
      }else{
        if(this.radio=="yes"){
          var a=1
        }else{
          var a=0
        }
        let param = new FormData(); //创建form对象
        if(this.Files==""){
        }else{
          param.append('file',this.Files);
        }
        param.append('title',this.title);
        param.append('id',this.id);
        param.append('description',this.miaoshu);
        param.append('toolType',a);
        param.append('groupId',this.fenzu);
        document.getElementsByTagName('button')[1].innerText='提交中...'
        document.getElementsByTagName('button')[1].disabled=true
        document.getElementsByTagName('button')[1].style.cursor='not-allowed'
        this.axios.post(`/tools/addSangerTool`, param).then(result=>{
          if(result.data.code==200){
            document.getElementsByTagName('button')[1].innerText='提交'
            document.getElementsByTagName('button')[1].disabled=false
            document.getElementsByTagName('button')[1].style.cursor='pointer'
            this.edit="args"
            this.fanhui=true
            this.active=1;
            this.active0=false;
            this.active1=true;
            this.active2=false;
            this.active3=false;
            this.id=result.data.data
            this.$router.push({
              path: '/EditTools',
              query:{
                tool_id:this.id,
                edit:'args'
              }
            })
            this.$axios.get(`/tools/getToolArgs`,{
              params:{id:this.id}
            }).then(result=>{
              if(result.data.code==200){
                this.wenjian=result.data.data.mainFile
                this.title1=result.data.data.title
                this.pingtai1=result.data.data.toolPlatForm
                if(result.data.data.files.length>0){
                  let files=result.data.data.files
                  var b=[]
                  for(var a of files){
                    let c={}
                    c.value=a
                    c.label=a
                    b.push(c)
                  }
                  this.wenjians=b
                }
                if(result.data.data.args.length>0){
                  this.tableData=result.data.data.args
                }
              }
            })
          }
        })
      }
      
    }, 
    Active1Sub(){
      
      if(this.wenjian!="" && this.tableData.length>0 && this.pingtai1!=""){
        document.getElementsByTagName('button')[3].innerText='提交中...'
        document.getElementsByTagName('button')[3].disabled=true
        document.getElementsByTagName('button')[3].style.cursor='not-allowed'
        var qs=require('qs');
        this.axios.post(`/tools/postToolArg`, qs.stringify({
          id:this.id,
          toolsPlatform:this.pingtai1,
          mainFile:this.wenjian,
          allArg:JSON.stringify(this.tableData)
        })).then(result=>{
          console.log(result)
          if(result.data.code==200){
            document.getElementsByTagName('button')[3].innerText='提交'
            document.getElementsByTagName('button')[3].disabled=false
            document.getElementsByTagName('button')[3].style.cursor='pointer'
            this.edit="result"
            this.active=2;
            this.active0=false;
            this.active1=false;
            this.active2=true;
            this.active3=false;this.$router.push({
              path: '/EditTools',
              query:{
                tool_id:this.id,
                edit:'result'
              }
            })
            this.$axios.get(`/tools/getToolResults`,{
              params:{id:this.id}
            }).then(result=>{
              if(result.data.code==200){
                document.getElementsByTagName('button')[3].innerText='提交'
                document.getElementsByTagName('button')[3].disabled=false
                document.getElementsByTagName('button')[3].style.cursor='pointer'
                this.title1=result.data.data.toolTitle
                if(result.data.data.results.length>0){
                  this.tableData1=result.data.data.results
                }
              }
            })
          }
        })
      }else{
        this.$message({
          message: '可执行文件不为空,执行平台不为空，参数至少有一个',
          type: 'warning'
        });
        document.getElementsByTagName('button')[3].innerText='提交'
        document.getElementsByTagName('button')[3].disabled=false
        document.getElementsByTagName('button')[3].style.cursor='pointer'
      }
    },
    handleRemove(file, fileList) {
    },
    handlePreview(file) {
    }
  },
  
}
</script>
<style scoped>
@media screen and (min-width:1200px){
  .Content-C{
    width: 1200px !important;
  }
  .contentBottom{
    width: 1200px !important;
  }
}
.Content{
  width: 100%;
  min-height: 600px;
}
.Content-C{
  width: 100%;
  margin: 0 auto;
}
.gongju{
  width: 1200px;
  margin: 0 auto;
  margin-top: 50px;
  box-shadow: 0px 0px 5px 5px rgba(250, 250, 250, 0.9);
  border-radius: 10px;
}
.gongju-top{
  width: 100%;
  height: 70px;
  background: #4370FC;
  border-radius: 10px 10px 0px 0px;
  line-height: 70px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.gongju-top>span{
  font-size: 16px;
  color: #fff;
  margin-right: 20px;
  font-weight: 500;
  font-family:Source Han Sans CN;
  cursor: pointer;
}
.tijiao{
  margin-top: 70px;
  text-align: right;
  padding-right: 30px;
}
.parameter{
  margin-top: 20px;
}
.gongju-top>p{
  font-size: 16px;
  color: #fff;
  margin-left: 20px;
  font-weight: 500;
  font-family:Source Han Sans CN;
}
.buzhou>>>.el-step.is-simple .el-step__title {
  font-size: 12px;
  line-height: 20px;
}
.active0{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.active0>div{
  margin: 0 10px;
  margin-top: 30px;
  width: 33%;
}
.active0>div:nth-child(1){
  margin-left: 0px;
}
.biaoti>span{
  margin: 10px;
}
.biaoti>>>.el-input{
  width: 78%;
}
.canshu>div{
  width: 100%;
  margin: 5px 0;
}
.canshu2>span{
  margin-left: 52px;
  margin-right: 10px;
}
.canshu2>>>.el-input{
  width: 76%;
}
.canshu5>span{
  margin-left: 52px;
  margin-right: 10px;
}
.canshu5>>>.el-select{
  width: 76% !important;
  margin: 0  !important;
}
.canshu4>span{
  margin-left: 52px;
  margin-right: 10px;
}
.canshu4>>>.el-input{
  width: 73.3%;
}
.canshu6>span{
  margin-left: 52px;
  margin-right: 10px;
}
.canshu6>>>.el-textarea{
  width: 73.3%;
}
.jiancheng>span{
  margin: 10px;
}
.jiancheng>>>.el-input{
  width: 78%;
}
.fenzu>span{
  margin: 10px;
}
.fenzu>>>.el-select{
  width: 78%;
}
.yunxing>span{
  margin: 10px;
}
.ruanjianbao>span{
  margin: 10px;
}
.ruanjianbao>>>.el-select{
  width: 73%;
}
.ruanjianbao{
  margin-top: 20px;
}
.miaoshu{
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  margin-bottom: 20px;
}
.miaoshu>div>span{
  margin: 10px;
}
.miaoshu>div:nth-child(2){
  width: 78%;
}
.biaoti{
  border-left: 2px solid #4370FC;
}
.active1>div{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  
}
.canshu{
  margin: 0 !important;
  margin-top:20px; 
}
.active1>div>div{
  width: 50%;
  margin-top: 20px;
}
.wenjian>span{
  margin: 10px;
  margin-left: 50px;
}
.wenjian{
  border-left: 2px solid #4370FC;
}
.active1>div>div>>>.el-select{
  margin-left: 50px;
  margin-top: 30px;
  width: 80%;
}
.pingtai>span{
  margin: 10px;
  margin-left: 50px;
}
.tijiao1{
  text-align: right;
  margin-right: 40px;
  margin-bottom: 20px;
}
.ruanjianbao>>>.el-upload__input{
  display: none;
}
.xinzeng{
  position: relative;
  margin-left: 10%;;
}
.xinzeng>p{
  position: absolute;
  bottom:5px;
}
.biaoge{
  padding: 0 40px;
}
.biaoge>>>.el-table td, .el-table th{
  padding: 0;
}
.active2{
  padding-bottom: 20px;
}
.active2>div:nth-child(1){
  display: flex;
  flex-direction: row;
}
.active2>div:nth-child(1)>div{
  margin-top: 30px;
  width: 50%;
  margin-bottom: 20px;
}
.pipei{
  margin-left: 40px;
  margin-top: 20px;
}
.pipei>span{
  margin-right: 20px;
}
.wenjianleixing{
  margin-left: 40px;
  margin-top: 10px;
}
.wenjianleixing>span{
  margin-right: 20px;
}
.wenjianming{
  border-left:2px solid #4370FC;
}
.wenjianming>span{
  margin-left: 40px;
  margin-right: 20px;
}
.wenjianming>>>.el-input{
  width: 71%;
}
.wenjianleixing>>>.el-select{
  width: 74%;
}
.active3{
  display: flex;
  flex-direction: row;
  background: #E7EDF9;
}
.active3>div{
  width: 50%;
}
.resultLeftTop{
  display: flex;
  flex-direction: row;
}
.topLeft{
  width: 70%;
}
.topRight{
  width: 30%;
}
.wenzi{
  margin-top: 5px;
  margin-left:20px;
  width: 100%;
}
.topLeft{
  display: flex;
  flex-direction: row;
}
.topLeft{
  padding:20px 0 20px 20px;
  background: #fff;
  border-radius: 5px;
  margin-right: 20px;
}
.topRight{
  border-radius: 5px;
}
#gongju{
  background: #FFF;
  color: #FF7613;
}
#lizi{
  color: #999;
}
#shiyong{
  color: #999;
}
.topRight{
  text-align: center;
}
.topRight>p{
  height: 43px;
  line-height: 43px;
  border-radius: 5px 0 0 5px;
  cursor: pointer;
  border-bottom: 1px solid #C4CFE6
}
.resultRight{
  background: #fff;
  padding: 20px;
  overflow: hidden;
  overflow-y: auto;
}
.resultRightBottom{
  background: #FFF;
  min-height: 450px;
  border-radius: 5px;
  margin-top: 10px;
  margin-right: 10px;
  padding: 20px;
}
.shoucang{
  margin-top: 5px;
  display: flex;
  flex-direction: row;
  justify-content: space-between
}
.shoucang>img{
  margin-right: 10px;
}
.shoucang>span:nth-child(1){
  color: #FF7613;
  font-size: 12px;
}
.resultRightBottom>>>.el-upload__input{
  display: none;
}
.resultRightBottom>>>.el-select{
  width: 95%;
}
.resultRightBottom>>>.fc-upload-btn, .fc-files,.fc-files{
  width: 44px;
  height: 40px;
  line-height: 40px;
}
.resultRightBottom>>>.fc-files{
  display: none
}
.editimg{
  cursor: pointer;
}
.runcmd{
  margin-top: 20px;
}
.resultRightBottom>>>.el-button{
  width: 100px!important;
  margin-left: 81.5%;
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
.resultRightBottom>>>.el-form-item{
  margin-bottom: 10px ; 
}
.xiazaifujian{
  display: inline-block;
  width: 80px;
  height: 30px;
  line-height: 30px;
  border-radius: 15px;
  background: #4370FC;
  cursor: pointer;
  color: #fff;
  text-align: center;
  font-size: 12px;
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
.resultRightBottom>>>.el-radio-button__inner{
  text-overflow:ellipsis;white-space:nowrap;
  overflow: hidden;width:90px;
}
.canshu7{
  display: flex;
  flex-direction: row;
}
.canshu7>span {
  margin-left: 52px;
  margin-right: 10px;
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
  width: 80%;
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
  width: 85%;
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