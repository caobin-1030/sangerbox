<template>
  <div>
    <Header></Header>
    <div class="head">
      <div class="headcontent">
        <div class="headleft">
          <div class="lefttop">
            <p>使用推荐</p>
            <div></div>
          </div>
          <div class="leftbottom">
            <div v-for="(item,i) of data1.slice(0,3)" :key="i">
              <div><img  @click="toAllTools(item)":src="item.toolsImg?item.toolsImg:defaultImg" alt=""></div>
              <div class="wenzi1">
                <p><span @click="toAllTools(item)" :title="item.title">{{item.title}}</span><span><img :id="item.id" @click="collection(item.id,pmidList)"  :src="pmidList==undefined  || pmidList.indexOf(item.id)==-1?shoucang1:pmidList.indexOf(item.id)!=-1?shoucang10:shoucang1" :title="pmidList==undefined  || pmidList.indexOf(item.id)==-1?shoucang2:shoucang11"alt=""></span></p>
                <p @click="toAllTools(item)" :title="item.description">{{item.description}}</p>
                <p @click="toshenxin(item)"><img src="../../public/img/tack.png" alt=""></p>
              </div>
            </div>
          </div>
        </div>
        <div class="headright">
          <div class="righttop">
            <p>热门推荐</p>
            <div></div>
          </div>
          <div class="rigthbottom">
            <table>
              <tr v-for="(item,i) of useCount" :key="i">
                <td><div class="yuan"></div></td>
                <td @click="toAllTools1(item)"><span class="onetool" :title="item.tool_info">{{item.tool_info}}</span></td>
                <td>{{item.use_count}}次</td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </div>
    <div class="contenT1">
      
      <div class="contentC">
        <div class="content11">
        <span @click="togongju('IdConversion')">>>便捷ID转换器</span>
        <span @click="togongju('Information')">>>GEO快速下载</span>
        <span @click="togongju('TcgaDown')">>>TCGA简易下载</span>
      </div>
        <el-button type="text" class="edittool" :disabled="edittool" @click="toEditTools()">新增工具</el-button>
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="全部" name="all">
            <div class="allTool" v-if="data1.length>0">
              <div class="all-4" v-for="(item,i) of data1" :key="i">
                <div><img @click="toAllTools(item)" :src="item.toolsImg?item.toolsImg:defaultImg" alt=""></div>
                <div class="wenzi1">
                  <p><span @click="toAllTools(item)" :title="item.title">{{item.title}}</span><span><img :id="item.id+'1'" @click="collection(item.id,pmidList)"  :src="pmidList==undefined  || pmidList.indexOf(item.id)==-1?shoucang1:pmidList.indexOf(item.id)!=-1?shoucang10:shoucang1" :title="pmidList==undefined  || pmidList.indexOf(item.id)==-1?shoucang2:shoucang11"alt=""></span></p>
                  <p @click="toAllTools(item)" :title="item.description">{{item.description}}</p>
                  <p @click="toshenxin(item)"><img src="../../public/img/tack.png" alt=""></p>
                </div>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="收藏" name="shoucang">
            <div class="allTool" v-if="data2.length>0">
              <div class="all-4" v-for="(item,i) of data2" :key="i" :id="item.id+'n'">
                <div><img @click="toAllTools(item)" :src="item.toolsImg?item.toolsImg:defaultImg" alt=""></div>
                <div class="wenzi1">
                  <p><span @click="toAllTools(item)" :title="item.title">{{item.title}}</span><span><img @click="collection4(item.id)" style="cursor: pointer;" src="../../public/img/shoucangactive.png" alt=""></span></p>
                  <p @click="toAllTools(item)" :title="item.description">{{item.description}}</p>
                  <p @click="toshenxin(item)"><img src="../../public/img/tack.png" alt=""></p>
                </div>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="可视化" name="keshihua">
            <div class="allTool" v-if="data3.length>0">
              <div class="all-4" v-for="(item,i) of data3" :key="i">
                <div><img @click="toAllTools(item)" :src="item.toolsImg?item.toolsImg:defaultImg" alt=""></div>
                <div class="wenzi1">
                  <p><span @click="toAllTools(item)" :title="item.title">{{item.title}}</span><span><img :id="item.id+'2'" @click="collection1(item.id,pmidList)"  :src="pmidList==undefined  || pmidList.indexOf(item.id)==-1?shoucang1:pmidList.indexOf(item.id)!=-1?shoucang10:shoucang1" :title="pmidList==undefined  || pmidList.indexOf(item.id)==-1?shoucang2:shoucang11"alt=""></span></p>
                  <p @click="toAllTools(item)" :title="item.description">{{item.description}}</p>
                  <p @click="toshenxin(item)"><img src="../../public/img/tack.png" alt=""></p>
                </div>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="数据分析" name="shuju">
            <div class="allTool" v-if="data4.length>0">
              <div class="all-4" v-for="(item,i) of data4" :key="i">
                <div><img @click="toAllTools(item)" :src="item.toolsImg?item.toolsImg:defaultImg" alt=""></div>
                <div class="wenzi1">
                  <p><span @click="toAllTools(item)" :title="item.title">{{item.title}}</span><span><img :id="item.id+'3'" @click="collection2(item.id,pmidList)"  :src="pmidList==undefined  || pmidList.indexOf(item.id)==-1?shoucang1:pmidList.indexOf(item.id)!=-1?shoucang10:shoucang1" :title="pmidList==undefined  || pmidList.indexOf(item.id)==-1?shoucang2:shoucang11"alt=""></span></p>
                  <p @click="toAllTools(item)" :title="item.description">{{item.description}}</p>
                  <p @click="toshenxin(item)"><img src="../../public/img/tack.png" alt=""></p>
                </div>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="其他" name="qita">
            <div class="allTool" v-if="data5.length>0">
              <div class="all-4" v-for="(item,i) of data5" :key="i">
                <div><img @click="toAllTools(item)" :src="item.toolsImg?item.toolsImg:defaultImg" alt=""></div>
                <div class="wenzi1">
                  <p><span @click="toAllTools(item)" :title="item.title">{{item.title}}</span><span><img :id="item.id+'3'" @click="collection2(item.id,pmidList)"  :src="pmidList==undefined  || pmidList.indexOf(item.id)==-1?shoucang1:pmidList.indexOf(item.id)!=-1?shoucang10:shoucang1" :title="pmidList==undefined  || pmidList.indexOf(item.id)==-1?shoucang2:shoucang11"alt=""></span></p>
                  <p @click="toAllTools(item)" :title="item.description">{{item.description}}</p>
                  <p @click="toshenxin(item)"><img src="../../public/img/tack.png" alt=""></p>
                </div>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="图集" name="tuji">
            <div class="tuji" v-loading="loading"
              element-loading-text="拼命加载中"
              element-loading-spinner="el-icon-loading"
              element-loading-background="f5f5f5">
              <div v-for="(item,i) of data6" :key="i">
                <img :src="'data:image/png;base64,'+item.img" @click="toAllTools2(item)" alt="">
                <p @click="toAllTools2(item)">{{item.imgTitle}}</p>
              </div>
              
            </div>
            <el-pagination
              @current-change="handleCurrentChange"
              :current-page.sync="currentPage"
              :page-size="20"
              layout="prev, pager, next,jumper" 
              :total="result">
            </el-pagination>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>
<script>
import Header from '../components/Header'
import Footer from '../components/Footer'
export default {
  metaInfo() {
    return {title:'SangerBox 工具'} // set a title
  },
  data() {
    return {
      activeName:'all',edittool:true,useTools:[],defaultImg: require('../../public/img/def.jpg'),pmidList:'',shoucang1:require('../../public/img/shoucang.png'),shoucang2:'收藏',shoucang10:require('../../public/img/shoucangactive.png'),phone:"",shoucang11:"取消收藏",useTools1:[],useCount:[],useTools2:[],useTools3:[],
      useTools4:[],AllToolsPic:[],currentPage:1,loading:false,result:0
    }
  },
  components:{
    Header,Footer
  },
  created() {
    this.getActiveTools()
    this.tuijian()
  },
  mounted() {
    var mobile=localStorage.getItem("mobile")
    if(mobile!=null){
      this.edittool=false
      this.getArticle()
      this.tuijian()
    }else{
      this.edittool=true
    }
    
    
  },
  computed: {
    data1: {
      get: function(){
        return this.useTools; // 在这里把临时对象的值通过计算属性赋值给页面中用到的对象
      }
    },
    data2: {
      get: function(){
        return this.useTools1; // 在这里把临时对象的值通过计算属性赋值给页面中用到的对象
      }
    },
    data3: {
      get: function(){
        return this.useTools2; // 在这里把临时对象的值通过计算属性赋值给页面中用到的对象
      }
    },
    data4: {
      get: function(){
        return this.useTools3; // 在这里把临时对象的值通过计算属性赋值给页面中用到的对象
      }
    },
    data5: {
      get: function(){
        return this.useTools4; // 在这里把临时对象的值通过计算属性赋值给页面中用到的对象
      }
    },
    data6: {
      get: function(){
        return this.AllToolsPic; // 在这里把临时对象的值通过计算属性赋值给页面中用到的对象
      }
    },
  },
  watch: {
    radio(val){
      if(this.radio==6){
        this.show=!this.show
      }else{
        this.show=!this.show
      }
    }
  },
  methods: {
    togongju(a){
      const {href} =this.$router.resolve({
        path: a
      })
      window.open(href, '_blank')
    },
    handleCurrentChange(currentPage){
      this.loading=true;
      this.$axios.get(`/tools/getAllToolPic`,{
        params:{pageNo:currentPage}
      }).then(result=>{
        if(result.data.data!=null){
          this.loading=false;
          this.AllToolsPic=result.data.data
          this.result=parseInt(result.data.msg)
        }
      })
    },
    toshenxin(item){
      window.open(`http://shengxin.ren/sxrpost/topic?tool=${item.title}&tool_id=${item.id}`,'_blank')

    },
    tuijian(){
      this.$axios.get(`/tools/getToolsCount`).then(result=>{
        if(result.data.data!=null && result.data.data!=undefined){
          this.useCount=result.data.data.slice(0,4)
        }
      })
    },
    collection4(id){
      var qs=require('qs');
      this.axios.post(`/tools/editToolCollect`, qs.stringify({
        id:id,
        isCollect:'0'
      })).then(result=>{
        if(result.data.code=='200'){
          document.getElementById(`${id}n`).style.display="none"
          this.axios.get(`/tools/getToolCollect`).then(result=>{
            if(result.data.data!=undefined && result.data.data!=null){
              this.pmidList=result.data.data
            }
          })
        }
      }).catch(error=>{
        if(error){
          throw error
        }
      })
    },
    collection(id,phone){
      var qs=require('qs');
      if(phone==undefined || phone.length<=0){
        if($(`#${id}`).attr("src")==require("../../public/img/shoucang.png") || $(`#${id}1`).attr("src")==require("../../public/img/shoucang.png")){
          this.axios.post(`/tools/editToolCollect`, qs.stringify({
            id:id,
            isCollect:'1'
          })).then(result=>{
            if(result.data.code=='200'){
              $(`#${id}`).attr("src",require("../../public/img/shoucangactive.png"));
              $(`#${id}1`).attr("src",require("../../public/img/shoucangactive.png"));
              $(`#${id}2`).attr("src",require("../../public/img/shoucangactive.png"));
              $(`#${id}3`).attr("src",require("../../public/img/shoucangactive.png"));
              $(`#${id}`).attr("title",'取消收藏');
              $(`#${id}1`).attr("title",'取消收藏');
              $(`#${id}2`).attr("title",'取消收藏');
              $(`#${id}3`).attr("title",'取消收藏');
            }
          })
        }else{
          this.axios.post(`/tools/editToolCollect`, qs.stringify({
            id:id,
            isCollect:'0'
          })).then(result=>{
            if(result.data.code=='200'){
              $(`#${id}`).attr("src",require("../../public/img/shoucang.png"));
              $(`#${id}1`).attr("src",require("../../public/img/shoucang.png"));
              $(`#${id}2`).attr("src",require("../../public/img/shoucang.png"));
              $(`#${id}3`).attr("src",require("../../public/img/shoucang.png"));
              $(`#${id}`).attr("title",'收藏');
              $(`#${id}1`).attr("title",'收藏');
              $(`#${id}2`).attr("title",'收藏');
              $(`#${id}3`).attr("title",'收藏');
            }
          }).catch(error=>{
            if(error){
              throw error
            }
          })
        }
      }else if(phone!=undefined || phone.length<=0){
        if($(`#${id}`).attr("src")==require("../../public/img/shoucang.png") || $(`#${id}1`).attr("src")==require("../../public/img/shoucang.png")){
          this.axios.post(`/tools/editToolCollect`, qs.stringify({
            id:id,
            isCollect:'1'
          })).then(result=>{
            if(result.data.code=='200'){
              $(`#${id}`).attr("src",require("../../public/img/shoucangactive.png"));
              $(`#${id}1`).attr("src",require("../../public/img/shoucangactive.png"));
              $(`#${id}2`).attr("src",require("../../public/img/shoucangactive.png"));
              $(`#${id}3`).attr("src",require("../../public/img/shoucangactive.png"));
              $(`#${id}`).attr("title",'取消收藏');
              $(`#${id}1`).attr("title",'取消收藏');
              $(`#${id}2`).attr("title",'取消收藏');
              $(`#${id}3`).attr("title",'取消收藏');
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
            $(`#${id}1`).attr("src",require("../../public/img/shoucang.png"));
            $(`#${id}2`).attr("src",require("../../public/img/shoucang.png"));
            $(`#${id}3`).attr("src",require("../../public/img/shoucang.png"));
            $(`#${id}`).attr("title",'收藏');
            $(`#${id}1`).attr("title",'收藏');
            $(`#${id}2`).attr("title",'收藏');
            $(`#${id}3`).attr("title",'收藏');
          }
        }).catch(error=>{
          if(error){
            throw error
          }
        })
        }
      }
    },
    collection1(id,phone){
      var qs=require('qs');
      if(phone==undefined || phone.length<=0){
        if($(`#${id}`).attr("src")==require("../../public/img/shoucang.png") || $(`#${id}1`).attr("src")==require("../../public/img/shoucang.png")){
          this.axios.post(`/tools/editToolCollect`, qs.stringify({
            id:id,
            isCollect:'1'
          })).then(result=>{
            if(result.data.code=='200'){
              $(`#${id}`).attr("src",require("../../public/img/shoucangactive.png"));
              $(`#${id}1`).attr("src",require("../../public/img/shoucangactive.png"));
              $(`#${id}2`).attr("src",require("../../public/img/shoucangactive.png"));
              $(`#${id}3`).attr("src",require("../../public/img/shoucangactive.png"));
              $(`#${id}`).attr("title",'取消收藏');
              $(`#${id}1`).attr("title",'取消收藏');
              $(`#${id}2`).attr("title",'取消收藏');
              $(`#${id}3`).attr("title",'取消收藏');
            }
          })
        }else{
          this.axios.post(`/tools/editToolCollect`, qs.stringify({
            id:id,
            isCollect:'0'
          })).then(result=>{
            if(result.data.code=='200'){
              $(`#${id}`).attr("src",require("../../public/img/shoucang.png"));
              $(`#${id}1`).attr("src",require("../../public/img/shoucang.png"));
              $(`#${id}2`).attr("src",require("../../public/img/shoucang.png"));
              $(`#${id}3`).attr("src",require("../../public/img/shoucang.png"));
              $(`#${id}`).attr("title",'收藏');
              $(`#${id}1`).attr("title",'收藏');
              $(`#${id}2`).attr("title",'收藏');
              $(`#${id}3`).attr("title",'收藏');
            }
          }).catch(error=>{
            if(error){
              throw error
            }
          })
        }
      }else if(phone!=undefined || phone.length<=0){
        if($(`#${id}`).attr("src")==require("../../public/img/shoucang.png") || $(`#${id}1`).attr("src")==require("../../public/img/shoucang.png")){
          this.axios.post(`/tools/editToolCollect`, qs.stringify({
            id:id,
            isCollect:'1'
          })).then(result=>{
            if(result.data.code=='200'){
              $(`#${id}`).attr("src",require("../../public/img/shoucangactive.png"));
              $(`#${id}1`).attr("src",require("../../public/img/shoucangactive.png"));
              $(`#${id}2`).attr("src",require("../../public/img/shoucangactive.png"));
              $(`#${id}3`).attr("src",require("../../public/img/shoucangactive.png"));
              $(`#${id}`).attr("title",'取消收藏');
              $(`#${id}1`).attr("title",'取消收藏');
              $(`#${id}2`).attr("title",'取消收藏');
              $(`#${id}3`).attr("title",'取消收藏');
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
            $(`#${id}1`).attr("src",require("../../public/img/shoucang.png"));
            $(`#${id}2`).attr("src",require("../../public/img/shoucang.png"));
            $(`#${id}3`).attr("src",require("../../public/img/shoucang.png"));
            $(`#${id}`).attr("title",'收藏');
            $(`#${id}1`).attr("title",'收藏');
            $(`#${id}2`).attr("title",'收藏');
            $(`#${id}3`).attr("title",'收藏');
          }
        }).catch(error=>{
          if(error){
            throw error
          }
        })
        }
      }
    },
    collection2(id,phone){
      var qs=require('qs');
      if(phone==undefined || phone.length<=0){
        if($(`#${id}`).attr("src")==require("../../public/img/shoucang.png") || $(`#${id}1`).attr("src")==require("../../public/img/shoucang.png")){
          this.axios.post(`/tools/editToolCollect`, qs.stringify({
            id:id,
            isCollect:'1'
          })).then(result=>{
            if(result.data.code=='200'){
              $(`#${id}`).attr("src",require("../../public/img/shoucangactive.png"));
              $(`#${id}1`).attr("src",require("../../public/img/shoucangactive.png"));
              $(`#${id}2`).attr("src",require("../../public/img/shoucangactive.png"));
              $(`#${id}3`).attr("src",require("../../public/img/shoucangactive.png"));
              $(`#${id}`).attr("title",'取消收藏');
              $(`#${id}1`).attr("title",'取消收藏');
              $(`#${id}2`).attr("title",'取消收藏');
              $(`#${id}3`).attr("title",'取消收藏');
            }
          })
        }else{
          this.axios.post(`/tools/editToolCollect`, qs.stringify({
            id:id,
            isCollect:'0'
          })).then(result=>{
            if(result.data.code=='200'){
              $(`#${id}`).attr("src",require("../../public/img/shoucang.png"));
              $(`#${id}1`).attr("src",require("../../public/img/shoucang.png"));
              $(`#${id}2`).attr("src",require("../../public/img/shoucang.png"));
              $(`#${id}3`).attr("src",require("../../public/img/shoucang.png"));
              $(`#${id}`).attr("title",'收藏');
              $(`#${id}1`).attr("title",'收藏');
              $(`#${id}2`).attr("title",'收藏');
              $(`#${id}3`).attr("title",'收藏');
            }
          }).catch(error=>{
            if(error){
              throw error
            }
          })
        }
      }else if(phone!=undefined || phone.length<=0){
        if($(`#${id}`).attr("src")==require("../../public/img/shoucang.png") || $(`#${id}1`).attr("src")==require("../../public/img/shoucang.png")){
          this.axios.post(`/tools/editToolCollect`, qs.stringify({
            id:id,
            isCollect:'1'
          })).then(result=>{
            if(result.data.code=='200'){
              $(`#${id}`).attr("src",require("../../public/img/shoucangactive.png"));
              $(`#${id}1`).attr("src",require("../../public/img/shoucangactive.png"));
              $(`#${id}2`).attr("src",require("../../public/img/shoucangactive.png"));
              $(`#${id}3`).attr("src",require("../../public/img/shoucangactive.png"));
              $(`#${id}`).attr("title",'取消收藏');
              $(`#${id}1`).attr("title",'取消收藏');
              $(`#${id}2`).attr("title",'取消收藏');
              $(`#${id}3`).attr("title",'取消收藏');
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
            $(`#${id}1`).attr("src",require("../../public/img/shoucang.png"));
            $(`#${id}2`).attr("src",require("../../public/img/shoucang.png"));
            $(`#${id}3`).attr("src",require("../../public/img/shoucang.png"));
            $(`#${id}`).attr("title",'收藏');
            $(`#${id}1`).attr("title",'收藏');
            $(`#${id}2`).attr("title",'收藏');
            $(`#${id}3`).attr("title",'收藏');
          }
        }).catch(error=>{
          if(error){
            throw error
          }
        })
        }
      }
    },
    getArticle(){
      this.axios.get(`/tools/getToolCollect`).then(result=>{
        if(result.data.data!=undefined && result.data.data!=null){
          this.pmidList=result.data.data
        }
      })
    },
    getActiveTools(){
      this.$axios.get(`/tools/getActiveTools`).then(result=>{
        if(result.data.data!=null){
          this.useTools=result.data.data
        }
      })
    },
    toAllTools(item){
      const {href} =this.$router.resolve({
        path: '/AllTools',
        query:{
          tool_id:item.id
        }
      })
      window.open(href, '_blank')
    },
    toAllTools1(item){
      const {href} =this.$router.resolve({
        path: '/AllTools',
        query:{
          tool_id:item.tool_id
        }
      })
      window.open(href, '_blank')
    },
    toAllTools2(item){
      const {href} =this.$router.resolve({
        path: '/AllTools',
        query:{
          tool_id:item.toolId
        }
      })
      window.open(href, '_blank')
    },
    toID(){
      const {href} =this.$router.resolve({
        path: '/IdConversion'
      })
      window.open(href, '_blank')
    },
    toEditTools(){
      this.$axios.get(`/tools/addtool`).then(result=>{
        if(result.data.code=='500'){
          this.$message({
            message: '您还没有权限新增工具',
            type: 'warning'
          });
        }else{
          const {href} =this.$router.resolve({
            path: '/EditTools',
            query:{
              tool_id:'',
              edit:'add'
            }
          })
          window.open(href, '_blank')
        }
      })
      
      
    },

    handleClick(tab, event){
      if(tab.name=='all'){
        this.$axios.get(`/tools/getActiveTools`).then(result=>{
          if(result.data.data!=null){
            this.useTools=result.data.data
          }
        })
      }else if(tab.name=='shoucang'){
        this.$axios.get(`/tools/getMyCollectTool`).then(result=>{
          if(result.data.data!=null){
            this.useTools1=result.data.data
          }
        })
      }else if(tab.name=='keshihua'){
        this.$axios.get(`/tools/getToolsGroup`,{
          params:{groupId:2}
        }).then(result=>{
          if(result.data.data!=null){
            this.useTools2=result.data.data
          }
        })
      }else if(tab.name=='shuju'){
        this.$axios.get(`/tools/getToolsGroup`,{
          params:{groupId:1}
        }).then(result=>{
          if(result.data.data!=null){
            this.useTools3=result.data.data
          }
        })
      }else if(tab.name=='qita'){
        this.$axios.get(`/tools/getToolsGroup`,{
          params:{groupId:0}
        }).then(result=>{
          if(result.data.data!=null){
            this.useTools4=result.data.data
          }
        })
      }else if(tab.name=='tuji'){
        this.$axios.get(`/tools/getAllToolPic`,{
          params:{pageNo:this.currentPage}
        }).then(result=>{
          if(result.data.data!=null){
            this.AllToolsPic=result.data.data
            this.result=parseInt(result.data.msg)
          }
        })
      }
    },
  },
}
</script>
<style scoped>
  @media screen and (min-width:1200px){
    .headcontent{
      width: 1200px !important;
    }
    .contentC{
      width: 1200px !important;
    }
  }
  .head{
    width: 100%;
    height: 230px;
    background: rgba(231, 237, 249, 1);
    overflow: hidden;
  }
  .headcontent{
    width: 100%;
    height: 180px;margin: 0 auto;
    margin-top: 25px;
    display: flex;
    flex-direction: row
  }
  .headleft{
    width: 75%;
    height: 100%;
    margin-right: 10px;
    background: #fff;
  }
  .headright{
    height: 100%;
    width: 25%;
    background: #fff;
  }
  .lefttop{
    margin-top: 20px;
    display: flex;
    flex-direction: row;
    justify-content: space-between
  }
  .lefttop>p{
    border-left: 2px solid #3366cc;
    padding-left: 20px;
  }
  .lefttop>div{
    width: 88%;
    height: 1px;
    margin-top: 10px;
    margin-right: 20px;
    background: #eee;
  }
  .righttop{
    margin-top: 20px;
    display: flex;
    flex-direction: row;
    justify-content: space-between
  }
  .righttop>p{
    border-left: 2px solid #3366cc;
    padding-left: 20px;
  }
  .righttop>div{
    width: 65%;
    height: 1px;
    margin-top: 10px;
    margin-right: 20px;
    background: #eee;
  }
  .leftbottom{
    display: flex;
    flex-direction: row;
    padding: 25px 10px;
    cursor: pointer;
  }
  .leftbottom>div{
    width: 33%;
    height: 90px;
    display: flex;
    flex-direction: row;
    padding: 0 20px;
    border-right: 1px solid #eee;
  }
  .leftbottom>div:nth-child(3){
    border-right: none;
  }
  .leftbottom>div>div:nth-child(1){
    width: 90px;
  }
  .wenzi{
    margin-left: 20px;
    font-family:Source Han Sans CN;
  }
  .wenzi>p:nth-child(1){
    text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }
  .onetool{
    text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    cursor: pointer;
  }
  .wenzi>p:nth-child(1)>span:hover{
    color: #3366cc;
    cursor: pointer;
  }
  .wenzi>p:nth-child(2){
    font-size: 12px;
    color: #999;
    margin: 10px 0;
    text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .wenzi>p:nth-child(2):hover{
    color: #3366cc;
    cursor: pointer;
  }
  .wenzi>p:nth-child(3){
    font-size: 12px;
    color: #3366cc;
    cursor: pointer;
  }
  .rigthbottom{
    padding: 20px;
  }
  .rigthbottom>table{
    width: 100%;
  }
  .rigthbottom>table>tr{
    height: 26px;;
  }
  .rigthbottom>table>tr>td:nth-child(2){
    width: 75%;
    padding-left: 10px;
  }
  .rigthbottom>table>tr>td:nth-child(3){
    width: 20%;
    text-align: right;
  }
  .yuan{
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #3366cc;
  }
  .contenT1{
    width: 100%;
    background: #fff;
    margin-top: 25px;
 
  }
  .contentC{
    width: 100%;
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    position: relative;
    min-height: 300px;
  }
  .allTool{
    display: flex;
    flex-direction: row;
    flex-flow: row wrap;
    width: 100%;
    padding-left: 20px;
    padding-bottom: 20px;
  }
  .allTool>div{
    width: 23%;
    margin: 0 10px;
    display: flex;
    flex-direction: row;
    /* border-bottom: 1px solid #dcdcdc; */
    padding: 10px 0;
    height: 111px;
    margin-top: 10px;
  }
  .contentC>>>.el-tabs{
    width: 100%;
  }
  .wenzi1{
    margin-left: 20px;
    font-family:Source Han Sans CN;
    width: 166px;
    position: relative;
  }
  .wenzi1>p:nth-child(1){
    margin-top: 6px;
    text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    line-height: 20px;
  }
  .wenzi1>p:nth-child(1)>span:nth-child(1){
    
    text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }
  .wenzi1>p:nth-child(1)>span:hover{
    color: #3366cc;
    cursor: pointer;
  }
  .wenzi1>p:nth-child(2){
    line-height: 18px;
    font-size: 12px;
    color: #999;
    margin:  5px 0;
    text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    width: 80%;
  }
  .wenzi1>p:nth-child(2):hover{
    color: #3366cc;
    cursor: pointer;
  }
  .wenzi1>p:nth-child(3){
    width: 100%;
    font-size: 12px;
    color: #3366cc;
    cursor: pointer;
    text-align: right;
    position: absolute;
    bottom: 7px;
    right: 0;
  }
  .edittool{
    position: absolute;
    right: 700px;
    z-index: 1999;
  }
  .all-4{
    cursor: pointer;
  }
  .all-4>div:nth-child(1){
    padding: 5px;
  }
  .all-4>div:nth-child(1)>img{
    width: 80px;
  }
  .tuji{
    display: flex;
    flex-direction: row;
    justify-content:space-around;
    flex-wrap:wrap;
    padding: 20px;
    /* flex-basis:auto;
    flex-shrink:2 */
    order:initial;
    align-items:flex-start
  }
  .tuji>div>img{
    height: 150px;
    cursor: pointer;
  }
  .tuji>div>p{
    text-align: center;
    cursor: pointer;
  }
  .tuji>div>p:hover{
    color: #3366cc;
  }
  .content11{
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    position: absolute;
    right: 10px;
    top:10px;
    z-index: 1999;
  }
  .content11>span{
    cursor: pointer;
    margin-right: 10px;
  }
  .content11>span:hover{
    color: #3366cc;
  }
</style>