<template>
  <div>
    <Header/>
    <div class="all">
      <div class="content">
        <div class="contentLeft">
          <ul>
            <li>
              <p class="leftLi">
                <img src="../../public/img/chuangzuo.png" alt=""><span>视频投稿</span>
              </p>
            </li>
            
            <li>
              <p class="leftLi">
                <img src="../../public/img/neirong.png" alt=""><span>稿件管理</span>
              </p>
            </li>
            <li>
              <p class="leftLi">
                <img src="../../public/img/pinglunguanli.png" alt=""><span>评论管理</span>
              </p>
            </li>
            <li>
              <p class="leftLi">
                <img src="../../public/img/shezhi.png" alt=""><span>创作设置</span>
              </p>
            </li>
          </ul>
        </div>
        <div class="contentRight1">
          <div class="rightTop">
            <el-tabs v-model="activeName" @tab-click="handleClick">
              <el-tab-pane label="视频投稿" name="shipin">
                <div class="rightBottom">
                  <p class="shuoming"><span>文件上传</span><span>（单个视频最大1GB，推荐采用mp4格式，可有效缩短审核转码耗时）</span></p>
                  <div class="uploadvideo">
                    <el-upload
                      class="upload-demo"
                      drag
                      :on-progress="uploadVideoProcess"
                      :before-upload="beforeUploadVideo"
                      :on-success='uploadVideoSuccess'
                      :on-error='uploadVideoerror'
                      :on-remove='uploadVideoRemove'
                      :on-change='uploadVideoChange'
                      :action="action"
                      :headers='header'
                      name='file'
                      multiple>
                      <i class="el-icon-upload"></i>
                      <div class="el-upload__text">将视频拖到此处，或<em>点击上传</em></div>
                      <!-- <el-progress v-if="videoFlag == true"
                        type="circle"
                        :percentage="videoUploadPercent"
                        style="margin-top:7px;"></el-progress> -->
                    </el-upload>
                  </div>
                  <p v-if="filelist11.length>0" style="margin-bottom:10px">共{{filelist11.length}}个文件</p>
                  <p class="shuoming" style="margin-bottom:10px"><span>附件上传</span><span>（附件格式只能为zip）</span></p>
                  <el-upload
                    class="upload-demo"
                    action=""
                    :http-request="addAttachment2"
                    :before-upload='beforeUploadfile'>
                    <el-button size="small" type="primary">点击附件上传</el-button>
                  </el-upload>
                  <p>基本信息</p>
                  <p class="shuoming"><span style="font-size:14px">视频封面设置</span><span>（格式jpeg、png，文件大小≤5MB，建议尺寸≥1146*717，最低尺寸≥960*600）</span></p>
                  <div class="fengmian">
                    <div class="pngUpload">
                      <el-upload
                        class="avatar-uploader"
                        action=""
                        :show-file-list="false"
                        :http-request="addAttachment1"
                        :before-upload='beforeUploadImg'>
                        <img v-if="uploadimg!=''" style="width:300px;height:178px" :src="uploadimg" alt="">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                      </el-upload>
                    </div>
                    <div class="infomation">
                      <div class="info"><span>标题</span><el-input v-model="title"></el-input></div>
                      <div class="info">
                        <span>类型</span>
                        <el-radio v-model="type" label="0">免费</el-radio>
                        <el-radio v-model="type" label="1">收费</el-radio>
                        <span class="jine" v-if="type=='1'">收费金额(元)<input step='0.01' v-model="money" type="number"></span>
                    </div>
                      <div class="info">
                        <span>分类</span>
                        <el-select v-model="partition" allow-create filterable placeholder="请选择">
                          <el-option
                            v-for="item in partitions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                          </el-option>
                        </el-select>
                      </div>
                      <div class="info"><span>简介</span><el-input type="textarea" resize='none' v-model="introduce"></el-input></div>
                    </div>
                    <div>
                      <button class="tougao1" @click="Contribute" id="tougao"><span id="tougaospan">立即投稿</span></button>
                    </div>
                  </div>
                  <div class="wenzi">
                    <p>禁止发布的视频内容 视频大小 视频格式 视频码率</p>
                    <p>上传视频，即表示您已同意sangerbox使用协议 与sangerbox创作公约 ，请勿上传色情，反动等违法视频。</p>
                  </div>
                </div>
              </el-tab-pane>
              <el-tab-pane label="稿件管理" name="gaojian">
                <div class="rightBottom">
                  <div>
                    
                  </div>
                </div>
              </el-tab-pane>
            </el-tabs>
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
import { geturl } from '../../public/js/status'
export default {
  metaInfo() {
    return {title:'SangerBox 视频上传'} // set a title
  },
  components:{
    Header,Footer
  },
  data() {
    return {
      title:'',type:'0',partitions:[],partition:'',introduce:'',dialogImageUrl: '',dialogVisible: false,videoUploadPercent: "",uploadimg:'',Video:'',Img:'',param : new FormData(),fileList:[],money:'',typeList:[],
      activeName:'shipin',file11:'',action:'',header:{'Authorization': localStorage.getItem('authorization')},filelist11:[]
    }
  },
  mounted() {
    this.action=`${geturl()}/video/uploadUserVideo`
    this.axios.get('/video/getVideoTypeInfo').then(result=>{
      if(result.data.res.typeList!=undefined){
        this.typeList=result.data.res.typeList
        var bbb=[]
        for(var aa in this.typeList){
          var cc={}
          cc.value=this.typeList[aa]
          cc.label=this.typeList[aa]
          bbb.push(cc)
        }
        this.partitions=bbb
      }
    })
  },
  methods: {
    uploadVideoerror(err, file, fileList){
      if(err.status=='401'){
        localStorage.setItem('href', window.location.href);
        window.location.href='/Signin';
      }
    },
    handleClick(tab, event){

    },
    uploadVideoChange(file, fileList){
      this.fileList=fileList
    },
    Contribute(){
      if(this.fileList.length>0 && this.Img!='' && this.title!='' && this.introduce!='' && this.type!='' && this.partition!=''){
        
        this.param=null
        this.param=new FormData()
        if(this.type=='1'){
          var a = this.money
        }else{
          var a = this.type
        }
        this.param.append('id', this.filelist11.toString()); // 因为要上传多个文件，所以需要遍历一下才行
        this.param.append('imageFile',this.Img)
        this.param.append('title',this.title)
        this.param.append('desc',this.introduce)
        this.param.append('money',a)
        this.param.append('type',this.partition) 
        this.param.append('zipFile',this.file11) 
        this.axios.post(`/video/submitUserVideo`, this.param, {onUploadProgress(progressEvent){
          let val = (progressEvent.loaded / progressEvent.total * 100).toFixed(0);
          document.getElementById('tougaospan').innerHTML=`投稿中...${parseInt(val)}%`
          document.getElementById('tougao').disabled=true
          document.getElementById('tougao').style.cursor= 'not-allowed'
        }}).then(result=>{
          if(result.data.res!=undefined){
            if(result.data.res.count!=undefined){
              if(result.data.res.count>0){
                this.$message({
                  message: '投稿成功',
                  type: 'success'
                });
                document.getElementById('tougaospan').innerHTML='立即投稿'
                document.getElementById('tougao').disabled=false
                document.getElementById('tougao').style.cursor= 'pointer'
                location.reload(true)
              }else{
                this.$message({
                  message: '投稿失败',
                  type: 'success'
                });
                document.getElementById('tougaospan').innerHTML='立即投稿'
                document.getElementById('tougao').disabled=false
                document.getElementById('tougao').style.cursor= 'pointer'
              }
            }
          }
        })
      }else{
        this.$message({
          message: '所有参数不为空',
          type: 'warning'
        });
      }
    },
    beforeUploadfile(file) {
      if (['application/x-zip-compressed','application/zip'].indexOf(file.type) == -1) {
        this.$message({
          message: '请上传正确的附件格式，格式为zip',
          type: 'warning'
        });
        return false;
      }
    },
    beforeUploadImg(file) {
      var fileSize = file.size / 1024 / 1024  < 5;
      if (['image/png','image/jpeg'].indexOf(file.type) == -1) {
        this.$message({
          message: '请上传正确的图片格式',
          type: 'warning'
        });
        return false;
      }else{
        this.uploadimg=URL.createObjectURL(file)
      }
      if (!fileSize) {
        this.$message({
          message: '图片大小不能超过5MB',
          type: 'warning'
        });
        return false;
      }else{
        this.uploadimg=URL.createObjectURL(file)
      }
    },
    beforeUploadVideo(file) {
      var fileSize = file.size / 1024 / 1024 / 1024 < 1;
      if (['video/mp4'].indexOf(file.type) == -1) {
        this.$message({
          message: '请上传正确的视频格式',
          type: 'warning'
        });
        return false;
      }
      if (!fileSize) {
        this.$message({
          message: '视频大小不能超过1GB',
          type: 'warning'
        });
        return false;
      }
    },
    uploadVideoRemove(file, fileList) {
      if(file.response!=undefined){
        let resid=file.response.res
        this.filelist11.splice(this.filelist11.indexOf(resid),1)
      }
    },
    // addAttachment(file){
    //   // this.uploadVideoSuccess(file)
    //   this.param=new FormData()
    //   this.fileList.forEach( (file)=>{
    //     this.param.append('file', file.raw); // 因为要上传多个文件，所以需要遍历一下才行
    //     // upData.append('file', this.file); 不要直接使用我们的文件数组进行上传，你会发现传给后台的是两个Object
    //   })
    //   this.axios.post(`/video/uploadUserVideo`, this.param).then(result=>{
    //   })
    // },
    addAttachment1(file){
      this.Img=file.file
    },
    addAttachment2(file){
      this.file11=file.file
    },
    uploadVideoSuccess( response, file, fileList){
      this.filelist11.push(file.response.res)
    },
    uploadVideoProcess(event, file, fileList) {
      this.videoUploadPercent = file.percentage.toFixed(0) * 1;
    },
  },
}
</script>
<style scope>
  @import '../assets/css/reset.css';
  @media screen and (min-width:1200px){
    .content{
      width: 1200px !important;
    }
  }
  .all{
    background-color: rgba(51, 102, 204, 0.117647058823529);
    overflow: hidden;
    font-family:Source Han Sans CN;
  }
  .content{
    width: 100%;
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    margin-top: 20px;
    margin-bottom: 20px;
  }
  .contentLeft{
    width: 15%;
    background: #fff;
    margin-right: 10px;
    padding: 20px;
  }
  .contentRight1{
    width: 85%;
  }
  .tougao{
    width: 110px;
    height: 40px;
    line-height: 40px;
    background: inherit;
    background-color: rgba(51, 102, 204, 1);
    border: none;
    color: #fff;
    border-radius: 4px;
    font-size: 22px;
    -moz-box-shadow: none;
    -webkit-box-shadow: none;
    box-shadow: none;
    font-weight: 400;
    font-style: normal;
  }
  .tougao>>>.el-icon-upload{
    vertical-align: middle;
  }
  .tougao>span{
    margin-left: 5px;
    font-size: 13px;
    display: inline-block;
    vertical-align: middle;
  }
  .tougao1{
    margin-left: 10px;
    width: 154px;
    height: 84px;
    background: inherit;
    background-color: rgba(51, 102, 204, 1);
    border: none;
    color: #fff;
    border-radius: 4px;
    -moz-box-shadow: none;
    -webkit-box-shadow: none;
    box-shadow: none;
    font-family: '思源黑体 CN';
    font-weight: 400;
    font-style: normal;
    margin-top: 84px;
  }
  .contentLeft>ul>li{
    margin-bottom: 20px;
    text-align: center;
  }
  .leftLi>img{
    width: 20px;
  }
  .leftLi>span{
    margin-left: 10px;
  }
  .leftLi1>span{
    margin-left: 30px;
  }
  .rightTop{
    width: 100%;
    background: #fff;
    padding-left: 20px;
  }
  .rightBottom{
    width: 100%;
    background: #fff;
  }
  .shipin{
    color: #3366cc;
    border-bottom: 1px solid #3366cc;
  }
  .shuoming>span:nth-child(1){
    font-size: 16px;
  }
  .shuoming>span:nth-child(2){
    font-size: 12px;
    margin-left: 10px;
  }
  .uploadvideo{
    margin-top: 20px;
  }
  .uploadvideo>.upload-demo>.el-upload>.el-upload-dragger{
    width: 962px;
  }
  input[type=file]{
    display: none !important;
  }
  .uploadvideo>.upload-demo>.el-upload>.el-upload__input{
    display: none !important;
  }
  .pngUpload>.avatar-uploader>.el-upload>.el-upload__input{
    display: none !important;
  }
  .rightBottom>p:nth-child(5){
    margin: 20px 0;
    font-size: 16px;
  }
  .fengmian{
    display: flex;
    flex-direction: row;
    margin-top: 20px;
  }
  .pngUpload{
    width: 38%;
  }
  .pngUpload>div>.el-upload--picture-card{
    height: 168px;
    width: 168px;
    line-height: 168px;
  }
  .info{
    display: flex;
    flex-direction: row;
    line-height: 32px;
    margin: 7px 0;
  }
  .info>span:nth-child(1){
    margin-right: 10px;
  }
  .info>.el-input{
    width:90%;
  }
  .info>.el-textarea{
    width: 90%;
  }
  .info>.el-radio{
    margin-top: 8px;
  }
  .info>.el-select{
    height:32px;
    line-height:32px
  }
  .info>.el-select>.el-input{
    width:90%;
  }
  .info>.el-select>.el-input>.el-input__inner{
    height:32px;
    line-height:32px
  }
  .info>.el-select>.el-input>.el-input__suffix>.el-input__suffix-inner>.el-input__icon{
    line-height: 32px;
  }
  .info>.el-input>.el-input__inner{
    height:32px;
    line-height:32px
  }
  .infomation{
    width: 45%;
  }
  .wenzi{
    text-align: center;
  }
  .wenzi>p{
    font-weight: 400;
    font-style: normal;
    font-size: 12px;
    color: #666666;
    margin: 10px 0;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 300px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 300px;
    height: 178px;
    display: block;
  }
  .jine>input{
    margin-left: 10px;
    width: 60px;
  }
</style>