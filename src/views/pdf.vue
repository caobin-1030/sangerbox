<template>
<div class="content">
  <div class="pdf">
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
</div>
</template>
<script>
import pdf from 'vue-pdf'
export default {
  components:{
    pdf
  },
  data() {
    return {
      pdfurl:'',currentPage: 1,pageCount: 0,src: "",scale: 100,idx: -1,loadedRatio: 0
    }
  },
  mounted() {
    this.geturl()
  },
  methods: {
    geturl(){
      this.pdfurl=this.$route.query.url
    },
    changePdfPage(val) {
      if(val === 0 && this.currentPage > 1) {
        this.currentPage--;
      }
      if(val === 1 && this.currentPage < this.pageCount) {
        this.currentPage++;
      }
    },
    goBack() {
      this.$router.go(-1);
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
.content{
  width: 100%;
  margin: 0 auto;
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
</style>