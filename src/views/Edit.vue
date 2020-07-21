<template>
  <div>
    <Header/>
    <div class="uecontent">
      <div class="content">
        <div class="xianshi">
          <Ue v-on:catchData="catchData" :content='con'/>
          <div v-html="dataContent"></div>
        </div>
        <div class="bottom" v-if="type!='video'">
          <el-upload
            class="upload-demo"
            :http-request="addAttachment"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :file-list="fileList">
            <el-button size="mini"><i class="el-icon-top"></i>上传文件</el-button>
          </el-upload>
          
        </div>
        <p style="margin-top:20px;text-align:right">
          <el-button size="mini" id="tijiao1" :disabled="tijiao" @click="Preservation" type="primary">{{baocun}}</el-button>
        </p>
      </div>
    </div>
    <Footer/>
  </div>
</template>
<script>
import Header from '../components/Header'
import Footer from '../components/Footer'
import Ue from '../components/ue'
export default {
  metaInfo() {
    return {title: this.type + '-富文本编辑'} // set a title
  },
  data() {
    return {
      con:'',dataContent:'',fileList:[],id:'',type:'',Files:'',baocun:'保存',tijiao:false
    }
  },
  components:{
    Header,Footer,Ue
  },
  watch:{
    dataContent(val){
    }
  },
  mounted() {
    this.getRouterData()
    if(this.type=="Readme"){
      this.axios.get(`/tools/getToolReadme`,{
        params:{id:this.id}
      }).then(result=>{
        if(result.data.data.readme!=undefined && result.data.data.readme!=null){
          this.con=result.data.data.readme
        }
      })
    }else if(this.type=="Exp"){
      this.axios.get(`/tools/getToolExp`, {
        params:{id:this.id}
      }).then(result=>{
        if(result.data.data.example!=undefined && result.data.data.example!=null){
          this.con=result.data.data.example
        }
      })
    }else if(this.type=="Pip"){
      this.axios.get(`/tools/getToolPip`,{
        params:{id:this.id}
      }).then(result=>{
        if(result.data.data.pipline!=undefined && result.data.data.pipline!=null){
          this.con=result.data.data.pipline
        }
      })
    }else if(this.type=="video"){
      this.axios.get(`/video/getVideoDesc`,{
        params:{id:this.id}
      }).then(result=>{
        if(result.data.res.desc!=undefined && result.data.res.desc!=null){
          this.con=result.data.res.desc
        }
      })
    }
  },
  methods: {
    addAttachment(file){
      this.Files=file.file
    },
    getRouterData(){
      this.id=this.$route.query.id
      this.type=this.$route.query.type
    },
    Preservation(){
      var qs=require('qs');
      if(this.type=="Readme"){
        this.baocun='保存中...'
        this.tijiao=true
        document.getElementById('tijiao1').style.cursor='not-allowed'
        let param = new FormData(); //创建form对象
        param.append('file',this.Files);
        param.append('id',this.id);
        param.append('toolReadme',this.dataContent);
        this.axios.post(`/tools/postToolReadme`,param).then(result=>{
          if(result.data.code=='200'){
            this.baocun='保存'
            this.tijiao=false
            document.getElementById('tijiao1').style.cursor='pointer'
            const {href} =this.$router.resolve({
              path: '/EditTools',
              query:{
                tool_id:this.id,
                edit:'show'
              }
            })
            window.open(href, '_blank')
          }
        })
      }else if(this.type=="Exp"){
        this.baocun='保存中...'
        this.tijiao=true
        document.getElementById('tijiao1').style.cursor='not-allowed'
        let param = new FormData(); //创建form对象
        param.append('file',this.Files);
        param.append('id',this.id);
        param.append('toolExample',this.dataContent);
        this.axios.post(`/tools/postToolExp`, param).then(result=>{
          if(result.data.code=='200'){
            this.baocun='保存'
            this.tijiao=false
            document.getElementById('tijiao1').style.cursor='pointer'
            const {href} =this.$router.resolve({
              path: '/EditTools',
              query:{
                tool_id:this.id,
                edit:'show'
              }
            })
            window.open(href, '_blank')
          }
        })
      }else if(this.type=="Pip"){
        this.baocun='保存中...'
        this.tijiao=true
        document.getElementById('tijiao1').style.cursor='not-allowed'
        let param = new FormData(); //创建form对象
        param.append('file',this.Files);
        param.append('id',this.id);
        param.append('toolPipline',this.dataContent);
        this.axios.post(`/tools/postToolPip`, param).then(result=>{
          if(result.data.code=='200'){
            this.baocun='保存'
            this.tijiao=false
            document.getElementById('tijiao1').style.cursor='pointer'
            const {href} =this.$router.resolve({
              path: '/EditTools',
              query:{
                tool_id:this.id,
                edit:'show'
              }
            })
            window.open(href, '_blank')
          }
        })
      }else if(this.type=="video"){
        this.baocun='保存中...'
        this.tijiao=true
        document.getElementById('tijiao1').style.cursor='not-allowed'
        let param = new FormData(); //创建form对象
        param.append('id',this.id);
        param.append('desc',this.dataContent);
        this.axios.post(`/video/addVideoDesc`, param).then(result=>{
          if(result.data.res.content=='success'){
            this.baocun='保存'
            this.tijiao=false
            document.getElementById('tijiao1').style.cursor='pointer'
            const {href} =this.$router.resolve({
              path: '/VideoInfo',
              query:{
                id:this.id,
              }
            })
            window.open(href, '_blank')
          }
        })
      }
    },
    handleRemove(file, fileList) {
    },
    handlePreview(file) {
    },
    catchData(data){
      this.dataContent=data
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
.uecontent{
  width: 100%;
}
.content{
  width: 100%;
  margin: 0 auto;
  min-height: 500px;
}
.xianshi{
  display: flex;
  flex-direction: row;
  margin-top: 100px;
}
.xianshi>div:nth-child(1){
  width: 60%;
  margin-right: 20px;
}
.xianshi>div:nth-child(2){
  width: 40%;
}
.bottom{
  margin-top: 20px;
}
.bottom>>>.el-upload__input{
  display: none;
}
</style>