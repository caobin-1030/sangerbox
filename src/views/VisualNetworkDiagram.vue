<template>
<div>
  <div class="header">
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <el-submenu index="1">
        <template slot="title">背景:</template>
        <el-menu-item index="1-1">Black</el-menu-item>
        <el-menu-item index="1-2">White</el-menu-item>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">布局方式:</template>
        <el-menu-item index="2-1">fcose</el-menu-item>
        <el-menu-item index="2-2">Circle</el-menu-item>
        <el-menu-item index="2-3">Concentric</el-menu-item>
        <el-menu-item index="2-4">cise</el-menu-item>
        <el-menu-item index="2-5">cose</el-menu-item>
        <el-menu-item index="2-6">euler</el-menu-item>
        <el-menu-item index="2-7">Random</el-menu-item>
        <el-menu-item index="2-8">spread</el-menu-item>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">是否显示文字:</template>
        <el-menu-item index="3-1">默认</el-menu-item>
        <el-menu-item index="3-2">不显示</el-menu-item>
      </el-submenu>
      <el-submenu index="4">
        <template slot="title">显示文字大小:</template>
        <el-menu-item index="4-1">8px</el-menu-item>
        <el-menu-item index="4-2">10px</el-menu-item>
        <el-menu-item index="4-3">12px</el-menu-item>
      </el-submenu>
      <el-submenu index="5">
        <template slot="title">边线类型:</template>
        <el-menu-item index="5-1">haystack</el-menu-item>
        <el-menu-item index="5-2">unbundled-bezier</el-menu-item>
        <el-menu-item index="5-3">bezier</el-menu-item>
        <el-menu-item index="5-4">segments</el-menu-item>
        <el-menu-item index="5-5">taxi</el-menu-item>
      </el-submenu>
      <el-submenu index="6">
        <template slot="title">节点类型:</template>
        <el-menu-item index="6-1">ellipse</el-menu-item>
        <el-menu-item index="6-2">round-triangle</el-menu-item>
        <el-menu-item index="6-3">round-rectangle</el-menu-item>
        <el-menu-item index="6-4">bottom-round-rectangle</el-menu-item>
        <el-menu-item index="6-5">round-diamond</el-menu-item>
        <el-menu-item index="6-6">round-pentagon</el-menu-item>
        <el-menu-item index="6-7">round-hexagon</el-menu-item>
        <el-menu-item index="6-8">round-heptagon</el-menu-item>
        <el-menu-item index="6-9">round-octagon</el-menu-item>
        <el-menu-item index="6-10">star</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
  <el-row>
    <el-col :span="4" >
      <div class="contextLeft">
        <el-upload
          class="upload-demo"
          action=""
          :on-success="success"
          :on-error='error'
          multiple
          name="file"
          :http-request="upload"
          :file-list="fileList1">
          <el-button size="mini"><i class="el-icon-top"></i>上传文件</el-button>
        </el-upload>
        <p><el-button @click="yunxing">运行</el-button></p>
        <p><el-button @click="daochu">导出成pdf</el-button></p>
        <p><el-button @click="daochupng">导出成png</el-button></p>
      </div>
    </el-col>
    <el-col :span="16">
      <div id="box">
        <div id="cy"></div>
      </div>
    </el-col>
    <el-col :span="4">
      <div id="box">

      </div>
    </el-col>
  </el-row>
</div>

</template>
<script>
  import cytoscape from 'cytoscape'
  import html2canvas from 'html2canvas'
  import jsPDF from 'jspdf'
  import fcose from 'cytoscape-fcose';
  cytoscape.use( fcose );
  import cise from 'cytoscape-cise';
  cytoscape.use( cise );
  import coseBilkent from 'cytoscape-cose-bilkent';
  cytoscape.use( coseBilkent );
  import euler from 'cytoscape-euler';
  cytoscape.use( euler );
  import spread  from 'cytoscape-spread';
  cytoscape.use( spread  );
  
  // import spread from 'cytoscape-spread'
  export default {
    name: 'cytoscape',
    components: {},
    data() {
      return {
        nodes: null,
        edges: null,fileList1:[],activeIndex: '1',Layout:'fcose',
        nodecolor:'black',nodebackcolor:'red',file1:null,datalable:'data(id)',fontsize:'8px',edgetype:'haystack',nodetype:'ellipse'
      }
    },
    mounted() {
    },
    methods: {
      upload(file){
        this.file1=file.file
        let param = new FormData(); //创建form对象
        param.append('file',this.file1);
        this.axios.post(`http://sangerbox.com/getFile`, param).then(result=>{
          this.nodes=JSON.parse(result.data.nodes)
          this.edges=JSON.parse(result.data.edges)
        })
      },
      daochupng(){
        html2canvas(document.getElementById('cy')).then(
          function(canvas) {
            // 创建标签
            var oA = document.createElement("a");
            // 设置下载名称
            oA.download = "a" +".png";
            // 设置地址以及文件类型
            oA.href = canvas.toDataURL("image/png");
            document.body.appendChild(oA);
            // 触发下载事件
            oA.click();
            // 移除标签
            oA.remove();
          }
        )
      },
      daochu(){
        html2canvas(document.getElementById('cy')).then(
          function(canvas) {
            //返回图片URL，参数：图片格式和清晰度(0-1)
            var pageData = canvas.toDataURL('image/jpeg', 1.0);
            //方向默认竖直，尺寸ponits，格式a4【595.28,841.89]
            var pdf = new jsPDF('', 'pt', 'a4');
            //需要dataUrl格式
            pdf.addImage(pageData, 'JPEG', 0, 0, 595.28, 592.28/canvas.width * canvas.height );
            pdf.save('content.pdf');
          }
        )   
      },
      handleSelect(key, keyPath) {
        if(key == '1-1'){
          document.getElementById('cy').style.background='black'
          this.nodecolor = 'white'
          this.yunxing()
        }else if(key == '1-2'){
          document.getElementById('cy').style.background='white'
          this.nodecolor = 'black'
          this.yunxing()
        }else if(key == '2-1'){
          this.Layout='fcose'
          this.yunxing()
        }else if(key == '2-2'){
          this.Layout='circle'
          this.yunxing()
        }else if(key == '2-3'){
          this.Layout='concentric'
          this.yunxing()
        }else if(key == '2-4'){
          this.Layout='cise'
          this.yunxing()
        }else if(key == '2-5'){
          this.Layout='cose'
          this.yunxing()
        }else if(key == '2-6'){
          this.Layout='preset'
          this.yunxing()
        }else if(key == '2-7'){
          this.Layout='euler'
          this.yunxing()
        }else if(key == '2-8'){
          this.Layout='spread'
          this.yunxing()
        }else if(key == '3-1'){
          this.datalable="data(id)"
          this.yunxing()
        }else if(key == '3-2'){
          this.datalable="data(a)"
          this.yunxing()
        }else if(key == '4-1'){
          this.fontsize="8px"
          this.yunxing()
        }else if(key == '4-2'){
          this.fontsize="10px"
          this.yunxing()
        }else if(key == '4-3'){
          this.fontsize="12px"
          this.yunxing()
        }else if(key == '5-1'){
          this.edgetype='haystack'
          this.yunxing()
        }else if(key == '5-2'){
          this.edgetype='unbundled-bezier'
          this.yunxing()
        }else if(key == '5-3'){
          this.edgetype='bezier'
          this.yunxing()
        }else if(key == '5-4'){
          this.edgetype='segments'
          this.yunxing()
        }else if(key == '5-5'){
          this.edgetype='taxi'
          this.yunxing()
        }else if(key == '6-1'){
          this.nodetype='ellipse'
          this.yunxing()
        }else if(key == '6-2'){
          this.nodetype='round-triangle'
          this.yunxing()
        }else if(key == '6-3'){
          this.nodetype='round-rectangle'
          this.yunxing()
        }else if(key == '6-4'){
          this.nodetype='bottom-round-rectangle'
          this.yunxing()
        }else if(key == '6-5'){
          this.nodetype='round-diamond'
          this.yunxing()
        }else if(key == '6-6'){
          this.nodetype='round-pentagon'
          this.yunxing()
        }else if(key == '6-7'){
          this.nodetype='round-hexagon'
          this.yunxing()
        }else if(key == '6-8'){
          this.nodetype='round-heptagon'
          this.yunxing()
        }else if(key == '6-9'){
          this.nodetype='round-octagon'
          this.yunxing()
        }else if(key == '6-10'){
          this.nodetype='star'
          this.yunxing()
        }
      },
      yunxing() {
        cytoscape.warnings(false);
        const cy = cytoscape({
          container: document.getElementById('cy'),
          boxSelectionEnabled: false,
          userZoomingEnabled: true, //滚轮缩放
          wheelSensitivity: 0.1,
          autounselectify: false,
          autolock:false,
          autoungrabify: false,
          layout: {
            name: this.Layout,
            // 'breadthfirst', 'circle', 'concentric', 'cose', 'grid','null', 'preset', 'random'
          },
          minZoom: 0.3,
          style: [
            {
              selector: 'node',
              style: {
                'shape':this.nodetype,
                'content':this.datalable,
                'color':this.nodecolor,
                "font-size": this.fontsize,
                'text-width':10,
                'height': 10,
                'width': 10,
                'background-color': '#e8e406'
              }
            },
            {
              selector: 'node:selected',
              style: {
                'background-color':'#3366cc'
              }
            },
            {
              selector: 'edge',
              style: {
                'curve-style': this.edgetype,
                'haystack-radius': 0,
                'width': 1,
                'opacity': 0.5,
                'line-color': '#f2f08c'
              }
            }
          ],
          elements: {
            //节点数据
            nodes: this.nodes,
            //
            edges: this.edges,
          }
        });
      },
      error(err, file, fileList){
        // console.log(err)
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
    }
  }
</script>
<style>
  #box {
    margin: 0 auto;
    width: 100%;
    height: 888px;
  }
  #cy {
    width: 100%;
    height: 90%;
  }
  .contextLeft{
    min-height: 888px;
  }
  .contextLeft>.upload-demo>.el-upload>.el-upload__input{
    display: none;
  }
  .header{
    width: 100%;
    margin: 0 auto;
  }
  .header>ul{
    display: flex;
    flex-direction: row;
  }
  .header>ul>li{
    list-style: none;
    margin: 0 40px;
  }
</style>