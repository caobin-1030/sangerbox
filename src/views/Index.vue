<template>
  <div>
    <Header></Header>
    <div class="tankuang" v-if="tankuang" @click="downDiscuoption()" id="tankuang">
      <div class="zhifu1">
        <div @click.stop="settingEvent()">
          <img src="../../public/img/zhifu.png" alt="">
          <div class="zhifuInfo">
            <p>{{zhifuTitle}}</p>
            <div >
              <p v-for="(info,i) of zhifuInfoList" :key="i">{{info}}</p>
            </div>
          </div>
          <div class="dibu">
            <p>如果 <span style="margin-left:8px">></span>  支付失败 <  请联系  >>小木<<</p>
            <p>邮箱：liuxl@shengxin.ren</p>
            <p>微信：sangerbox002</p>
          </div>
        </div>
        <div @click.stop="settingEvent()" class="pay">
          <div>
            <img style="width:128px;height:35px" src="../../public/img/pay1.png" alt="">
            <p>￥{{money}}</p>
          </div>
          <img v-if="money !=0" :src="'data:image/png;base64,'+payimg"  style="width:270px;border:1px solid #dcdcdc" alt="">
          <img v-else src="../../public/img/zhifu1.png"  style="width:270px;border:1px solid #dcdcdc" alt="">
          <div class="youhuiquan">
            <span>请选择优惠券：</span>
            <div>
              <el-select v-model="value" :disabled="keyong" clearable @change="quanChange" :placeholder="moren">
                <el-option style="width:200px"
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                  :disabled="item.disabled">
                </el-option>
              </el-select>
            </div>
          </div>
          <p><el-button type="success" plain @click="paySuccess">支付成功</el-button><el-button type="info" plain @click="shuaxin">点击刷新</el-button></p>
        </div>
      </div>
      
    </div>
    <div><p class="sangerbox">Sangebox网络版即将上线，本地工具盒下载已移至新地址：soft.sangerbox.com</p></div>
    <div class="Disease">
      <img src="../../public/img/disease.png" alt="">
    </div>
    <div>
      <div class="search1">
        <div class="search3">
          <div class="searchBox1">
            <div>
              <!-- <span @click="Choice()">{{choice}}</span>
              <img @click="Choice()" src="../../public/img/xialist.png" alt="">
              <div class="xiaLa" :class="{'down1':down1}">
                <p @click="literature1()">{{literature}}</p>
                <p @click="periodical1()">{{periodical}}</p>
                <p @click="fund1()">{{fund}}</p>
                <p @click="sample1()">{{(sample)}}</p>
                <p @click="gene1()">{{gene}}</p> 
              </div> -->
              <el-dropdown trigger="click">
                <span class="el-dropdown-link">
                  {{choice}}<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item @click.native="literature1()">{{literature}}</el-dropdown-item>
                  <el-dropdown-item @click.native="periodical1()">{{periodical}}</el-dropdown-item>
                  <el-dropdown-item @click.native="fund1()">{{fund}}</el-dropdown-item>
                  <el-dropdown-item @click.native="sample1()">{{sample}}</el-dropdown-item>
                  <el-dropdown-item @click.native="gene1()">{{gene}}</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
            <input ref="input" @keyup.13="searcher" v-model="search" type="text" placeholder="在此输入您搜索的内容" onfocus="this.placeholder=''" onblur="this.placeholder='在此输入您搜索的内容'">
            <div @click="searcher()"><span>搜索</span></div>
          </div>
        </div>
        <div class="search2">
          <div class="searchHead">
            <ul class="row">
              <li class="col-xs-1" @click="toSearcher">文献</li>
              <li class="col-xs-1">|</li>
              <li class="col-xs-1" @click="toSearcherJournal">刊期</li>
              <li class="col-xs-1">|</li>
              <li class="col-xs-1" @click="toSearcherFund">基金</li>
              <li class="col-xs-1">|</li>
              <li class="col-xs-1" @click="toGene">基因</li>
              <li class="col-xs-1">|</li>
              <li class="col-xs-1" @click="toInformation">数据</li>
              <li class="col-xs-1">|</li>
              <li class="col-xs-1"></li>
            </ul>
          </div>
          <div class="searchBody">
            <p>寻找文献</p>
            <div class="searchBox">
              <input ref="input" @keyup.13="searcher" v-model="search" type="text" placeholder="在此输入您搜索的内容" onfocus="this.placeholder=''" onblur="this.placeholder='在此输入您搜索的内容'">
              <div @click="searcher()"><span>搜索</span></div>
            </div>
            <ul>
              <li><span @click="toSearcher1('TP53')">TP53</span></li>
              <li><span @click="toSearcher1('MYC')">MYC</span></li>
              <li><span @click="toSearcher1('egfr')">egfr</span></li>
              <li><span @click="toSearcher1('kras')">kras</span></li>
            </ul>
          </div>
        </div> 
        <div >
          <div class="cloudAnalysis">
            <div class="crossing"></div>
            <span>起于查询 · 精于分析 · 系统全面</span>
            <div class="crossing"></div>
            <p>云端的科研伴侣</p>
          </div>
          <div class="bestHost row">
            <div class="col-sm-4 col-xs-12 dataSecurity">
              <div><img src="../../public/img/datasecurity.png" alt=""></div>
              <div >
                <span>数据安全</span>
                <p>数据冗余备份，永久保存，保持版本迭代痕迹，让你的研究结果可重复。</p>
              </div>
            </div>
            <div class="col-sm-4 col-xs-12 informationSafety">
              <div><img src="../../public/img/informationsafety.png" alt=""></div>
              <div >
                <span>数据全面</span>
                <p>汇集全球数十个数据库，每天同步更新，收入十五万个人类基因，三千万条研究文章，一万个生物医学杂志，近20年的基金数据，30万个样本数据集。</p>
              </div>
            </div>
            <div class="col-sm-4 col-xs-12 powerfulAnalysis">
              <div><img src="../../public/img/powerfulanalysis.png" alt=""></div>
              <div >
                <span>分析强大</span>
                <p>对搜索到的文献、杂志、基金进行全方位的分析，包括影响因子分布，国家分布，时间线等辅助投稿选刊，集成数十个简单易用的分析工具让你可以尽情的组合进行生物信息学分析。</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="solution">
      <div class="solutionImg">
        <div class="solution1">
          <div class="solutionHeader">
            <div class="crossingOne"></div>
            <span>精准 • 快速 • 便捷</span>
            <div class="crossingOne"></div>
            <p>SangerBox生物信息学解决方案</p>        
          </div>
          <div class="solve row">
            <div class="col-sm-4 col-xs-12">
              <img src="../../public/img/1.png">
              <div>
                <span>套路式数据分析方案</span>
                <p>使用公共数据或已有数据进行免疫相关分析，出具一套发表级的数据分析图表及分析报告</p>
              </div>
            </div>
            <div class="col-sm-4 col-xs-12">
              <img src="../../public/img/2.png">
              <div>
                <span>肿瘤免疫</span>
                <p>使用公共数据或已有数据进行免疫相关分析，出具一套发表级的数据分析图表及分析报告</p>
              </div>
            </div>
            <div class="col-sm-4 col-xs-12">
              <img src="../../public/img/3.png">
              <div>
                <span>多组学联合分析</span>
                <p>使用公共数据或自有数据进行多组学整合分析，并提供一套发表级的数据分析图表及分析报告</p>
              </div>
            </div>
            <div class="col-sm-4 col-xs-12">
              <img src="../../public/img/4.png">
              <div>
                <span>个性化实施</span>
                <p>根据所提供的基因利用公共数据资源全方位的分析该基因的生物学意义并出具一套发表级的数据分析图表及分析报告</p>
              </div>
            </div>
            <div class="col-sm-4 col-xs-12">
              <img src="../../public/img/5.png">
              <div>
                <span>文献临摹</span>
                <p>根据所提供的文献进行临摹并改进分析，出具一套发表级的数据分析图表及分析报告</p>
              </div>
            </div>
            <div class="col-sm-4 col-xs-12">
              <img src="../../public/img/6.png">
              <div>
                <span>生物信息数据库构建方案</span>
                <p>利用自有的数据，整合公共数据库数据构建发表级的生物信息数据库或分析平台</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="gcbi">
      <div class="cooperation">
        <p style="text-align:center;font-size:24px;color:#304D99;margin-top:50px;">我们已合作的顾客</p>
        <img src="../../public/img/cooperation.png">
      </div>
      <div class="gcbi1">
        <div class="platform">
          <div class="crossingOne"></div>
          <span>自主 • 简单 • 高效 • 可重现</span>
          <div class="crossingOne"></div>
          <p>SangerBox平台数据服务</p>
          <p class="article">3000万文章，1000万全文，30万样本，20万数据集，15万基因，100+分析工具</p>
        </div>
        <div class="banner">
          <ul>
            <li>文章写作</li>
            <li>热门服务</li>
            <li>极速体验</li>
          </ul>
        </div>
        <div class="setMeal row">
          <div class="col-md-3 col-sm-6 col-xs-12">
            <div @click="buyVip('87459b98ba0d47b3961503cbc2011b65',0)">
              <div class="moneyHeader">
                <p>10G存储空间</p>
                <p>9</p>
                <p>元 / 月</p>
              </div>
              <div class="words">
                <p>用于数据存储</p>
                <p>用于数据备份</p>
                <p>用于数据加载</p>
                <p></p>
              </div>
              <button>马上购买</button>
            </div>
          </div>
          <div class="col-md-3 col-sm-6 col-xs-12">
            <div @click="buyVip('eadd72555fb04ab7942b39131db1ae3e',1)">
              <div class="moneyHeader">
                <p>无忧初级版</p>
                <p>19</p>
                <p>元 / 月</p>
              </div>
              <div class="words">
                <p>10G免费存储空间</p>
                <p>即时分析不限次数</p>
                <p>耗时分析免费30次</p>
                <p></p>
              </div>
              <button>马上购买</button>
            </div>
          </div>
          <div class="col-md-3 col-sm-6 col-xs-12">
            <div @click="buyVip('c3e18ea588b944b0810fa5fddcc2ebdd',2)">
              <div class="moneyHeader">
                <p>无忧中级版</p>
                <p>29</p>
                <p>元 / 月</p>
              </div>
              <div class="words">
                <p>20G免费存储空间</p>
                <p>即时分析不限次数</p>
                <p>耗时分析免费60次</p>
                <p>教学视频8折</p>
              </div>
              <button>马上购买</button>
            </div>
          </div>
          <div class="col-md-3 col-sm-6 col-xs-12">
            <div @click="buyVip('3e5d20ae3da94333bdd8f6015ff91933',3)">
              <div class="moneyHeader">
                <p>无忧高级版</p>
                <p>49</p>
                <p>元 / 月</p>
              </div>
              <div class="words">
                <p>50G免费存储空间</p>
                <p>即时分析不限次数</p>
                <p>耗时分析免费99次</p>
                <p>教学视频8折</p>
                <p>在线指导（仅限工具使用）</p>
              </div>
              <button>马上购买</button>
            </div>
          </div>
        </div>
      </div>
      <div class="gcbi2">
        <div class="row">
          <div class="col-sm-5 col-xs-12">
            <img src="../../public/img/computer.png" alt="">
          </div>
          <div class="cloudCustomerService col-sm-7 col-xs-12">
            <div class="crossing"></div>
            <span>贴心细心</span>
            <p>云客户服务</p>
            <p>云客户服务是专为Sangerbox云平台用户设立的服务中心。中心自成立以来，始终秉承“以人为本”的服务理念，坚持以客户为中心，提升客户满意度为准绳，不断开拓创新，提升服务理念，为云平台用户提供更加人性化的全方位服务。目前已开通了邮件、电话、QQ、微信等多种沟通渠道和方式，以便解决客户的咨询疑问与投诉建议，为客户提供专业、高效、贴心的服务</p>
            <div @click="GoCloudCustomerService()" class="you"><img src="../../public/img/you.png" alt=""></div>
          </div>
        </div>
      </div>
    </div>
    <div class="newBlog">
      <div class="newBlog1">
        <div class="newBlogHeader">
          <div class="crossingOne"></div>
          <span>最新资讯</span>
          <div class="crossingOne"></div>
          <p>最新博客</p>
        </div>
        <div class="BlogInner row">
          <div v-for="(item,i) of data1" :key="i" class="BlogItem col-md-3 col-sm-6 col-xs-12">
            <div @click="toShengxinren(item.id)">
              <p>{{item.title}}</p>
              <div class="CrossingTwo"></div>
              <p v-html="item.summary"></p>
              <div>
                <p>
                  <!-- <img style="margin-right:10px;" src="../../public/img/count.png" alt=""> -->
                <span><span>{{item.views}}</span>阅读</span></p>
                <p>{{item.updated_at}}</p>
              </div>
            </div>
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
export default {
  metaInfo: {
    title: 'SangerBox数据分析平台，让科研小白也能做生物信息学分析！', // set a title
    meta: [{                 // set meta
      name: 'keyWords',
      content: 'SangerBox数据分析平台，让科研小白也能做生物信息学分析！'
    }]
  },
  data() {
    return {
      search:'',
      i:0,blok:'',
      choice:'文 献',
      gene:'基 因',
      literature:'文 献',
      periodical:'期 刊',
      fund:'基 金',
      sample:'样 本',
      down1:false,
      i:0,tankuang:false,id:'',payimg:'',int:null,OrderId:'',zhifuTitle:'',zhifuInfoList:[],money:'',moren:'无可用优惠券',keyong:true,
      value:'',options:[]

    }
  },
  components:{
    Header,Footer
  },
  created() {
    this.block()
  },
  mounted() {
    this.$refs['input'].focus()
  },
  computed: {
    data1: {
      get: function(){
        return this.blok; // 在这里把临时对象的值通过计算属性赋值给页面中用到的对象
      }
    },
  },
  methods: {
    quanChange(){
      this.shuaxin()
    },
    paySuccess(){
      if(this.money == 0){
        var qs=require('qs');
        this.axios.post(`/pay/getPayResult`, qs.stringify({
          goodId:this.id,
          couponId:this.value
        })).then(result=>{
          if(result.data.code==0){
            this.tankuang=false
          }
        })
      }else{
        this.axios.get('/pay/getOrderInfo',{
          params:{orderNo:this.OrderId}
        }).then(result=>{
          if(result.data.data!=null && result.data.data!=undefined){
            if(result.data.data==0){
              this.$confirm('支付未成功是否退出', '提示', {
                confirmButtonText: '退出',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                this.tankuang=false
              }).catch(() => {
                        
              });
            }else{
              this.$message({
                message: '支付成功',
                type: 'success'
              });
              location.reload()
            }
          }
        })
      } 
      
      
      // clearInterval(this.int)
      // location.reload()
    },
    shuaxin(){
      this.axios.get(`/pay/getPayInfo`,{
        params:{
          goodId:this.id,
        couponId:this.value}
      }).then(result=>{
        if(result.data.data!=null && result.data.data!=undefined){
          this.payimg=result.data.data.img
          this.OrderId=result.data.data.orderNo
          this.money=result.data.data.mount
        }
      })
    },
    buyVip(id,ban){
      const {href}=this.$router.resolve({
        path: '/Personal',
        query:{
          type:'vip'
        },
      })
      window.open(href,'_blank')
    },
    downDiscuoption(){
      this.tankuang=false
      // clearInterval(this.int)
    },
    settingEvent(){},
    toInformation(){
      const {href}=this.$router.resolve({
        path: '/Information',
        query:{
          search1:this.search
        }
      })
      window.open(href,'_blank')
    },
    toGene(){
      const {href}=this.$router.resolve({
        path: '/Gene',
        query:{
          search1:this.search
        }
      })
      window.open(href,'_blank')
    },
    GoCloudCustomerService(){},
    toSearcher1(a){
      const {href}=this.$router.resolve({
        path: '/Search',
        query:{
          search1:a
        }
      })
      window.open(href,'_blank')
    },
    toSearcher(){
      const {href}=this.$router.resolve({
        path: '/Search',
        query:{
          search1:this.search
        }
      })
      window.open(href,'_blank')
    },
    toSearcherJournal(){
      const {href}=this.$router.resolve({
        path: '/SearchJournal',
        query:{
          search1:this.search
        }
      })
      window.open(href,'_blank')
    },
    toSearcherFund(){
      const {href}=this.$router.resolve({
        path: '/SearchFund',
        query:{
          search1:this.search
        }
      })
      window.open(href,'_blank')
    },
    searchkras(){
      const {href}=this.$router.resolve({
        path: '/Search',
        query:{
          search1:`kras`
        }
      })
      window.open(href,'_blank')
    },
    searchegfr(){
      const {href}=this.$router.resolve({
        path: '/Search',
        query:{
          search1:`egfr`
        }
      })
      window.open(href,'_blank')
    },
    searchmyc(){
      const {href}=this.$router.resolve({
        path: '/Search',
        query:{
          search1:`myc`
        }
      })
      window.open(href,'_blank')
    },
    searchtp53(){
      const {href}=this.$router.resolve({
        path: '/Search',
        query:{
          search1:`tp53`
        }
      })
      window.open(href,'_blank')
    },
    toShengxinren(id){
      let url=`https://shengxin.ren/article/${id}`
      window.open(url,'_blank')
    },
    block(){
      $.ajax({
        url:'https://shengxin.ren/sxrpost/getBlog',
        dataType:'json',
        type:'GET',
        success:res=>{
          this.blok=(res.data).slice(0,4)
        }
      })
    },
    searcher(){
      const {href}=this.$router.resolve({
        path: '/Search',
        query:{
          search1:this.search
        }
      })
      window.open(href,'_blank')
    },
  },
  
}
</script>
<style scoped>
  p{
    margin: 0;
  }
  @import '../assets/css/reset.css';
  @media screen and (max-width:768px){
    .bestHost>div{
      padding: 20px 50px !important;
    }
    .you{
      margin: 0 auto;
    }
    .cloudCustomerService{
      text-align: center
    }
    .gcbi2>div>div:first-child>img{
      max-width:80% !important;
    }
    .search2{
      display: none !important;
    }
    .search3{
      display: block !important;
    }
  }
  @media screen and (min-width:992px){
    .gcbi2>div>div:first-child>img{
      max-width:100% !important;
    }
  }
  @media screen and (min-width:1200px){
    .search2{
      width: 700px !important;
      margin: 0 auto;
    }
    .search1{
      width: 1200px !important;
    }
    .solution1{
      width: 1200px !important;
    }
    .gcbi1{
      width: 1200px !important;
    }
    .newBlog1{
      width: 1200px !important;
    }
    .gcbi2>div{
      width: 1200px !important;
    }
  }
  .Disease>img{
    width: 100%;
  }
  .el-dropdown{
    color: #3C61C3;
    line-height: 40px;
  }
  .search1{
    margin: 0 auto;
    margin-top:-5%;
    width: 100%;
  }
  .search2{
    position: relative;
    z-index: 9;
    box-shadow:0px 3px 30px 2px rgba(0, 0, 0, 0.1);
    margin: 0 auto;
    width: 65%;
    display: block;
  }
  .search3{
    width: 100%;
    margin: 0 auto;
    position: relative;
    display: none;
  }
  .searchBox1{
    width:80%;
    height:50px;
    background:rgba(255,255,255,1);
    border:1px solid rgba(235,235,235,1);
    border-radius:25px;
    display: flex;
    flex-direction: row;
    margin: 0 auto;
    margin-top: 13px;
    line-height: 50px;
  }
  .searchBox1>input{
    display: inline-block;
    width:45%;
    height:13px;
    font-size:12px;
    font-family:Source Han Sans CN;
    font-weight:400;
    color:rgba(183,183,183,1);
    border: none;
    margin-top: 19px;
    margin-left: 15px;
    outline: none;
  }
  .searchBox1>div:first-child{
    width: 30%;
    margin-left: 4%;
    cursor: pointer;
    position: relative;
  }
  .searchBox1>div:first-child>span:first-child{
    color: #304D99; 
    font-size: 12px;
  }
  .searchBox1>div:first-child>img{
    margin-left:4px;
  }
  .xiaLa{
    position: absolute;
    top:48px;
    left: 0;
    display: none;
    width: 100%;
    background: #fff;
    z-index: 99;
    box-shadow: #ddd 0 5px 15px 0 ;
  }
  .xiaLa>p{
    font-size: 12px;
    line-height: 20px;
    margin: 0;
    color: #000;
  }
  .xiaLa>p:hover{
    color: #3C61C3;
  }
  .down1{
    display: block !important;
  }
  .searchBox1>div:last-child{
    width:120px;
    height:48px;
    background:rgba(51,102,204,1);
    border-radius:24px;
    margin-left: 17%;
    text-align: center;
    cursor: pointer;
  }
  .searchBox1>div:last-child>span{
    display: inline-block;
    width:25px;
    height:12px;
    font-size:12px;
    font-family:Source Han Sans CN;
    font-weight:400;
    color:rgba(255,255,255,1);
  }
  
  .searchHead{
    width:100%;
    height:75px;
    background:rgba(51,102,204,1);
    line-height: 75px;
  }
  .searchHead>ul{
    width: 100%;
    margin: 0;
    text-align: center;
    margin-left: 20px;
  }
  .searchHead>ul>li{
    font-size: 16px;
    text-align: center;
    padding: 0;
  }
  .searchHead>ul>li:nth-child(2n){
    color:rgba(255,255,255,1);
    opacity:0.3;
  }
  .searchHead>ul>li:nth-child(2n+1){
    font-size:16px;
    font-family:Source Han Sans CN;
    font-weight:400;
    color:rgba(255,255,255,1);
  }
  .searchHead>ul>li:nth-child(2n+1):hover{
    color:rgba(2,240,198,1);
    cursor: pointer;
  }
  .searchBody{
    width: 100%;
    height: 181px;
    background-color: #fff;
    overflow: hidden;
  }
  .searchBody>p{
    font-size:14px;
    font-family:Source Han Sans CN;
    font-weight:400;
    color:rgba(64,64,64,1);
    margin: 25px 0 0 10%;
  }
  .searchBox{
    width:80%;
    height:50px;
    background:rgba(255,255,255,1);
    border:1px solid rgba(235,235,235,1);
    border-radius:25px;
    display: flex;
    flex-direction: row;
    margin: 0 auto;
    margin-top: 13px;
  }
  .searchBox>input{
    display: inline-block;
    width:60%;
    height:13px;
    font-size:12px;
    font-family:Source Han Sans CN;
    font-weight:400;
    color:rgba(183,183,183,1);
    border: none;
    margin-top: 19px;
    margin-left: 30px;
    outline: none;
  }
  .searchBox>div{
    width:120px;
    height:48px;
    background:rgba(51,102,204,1);
    border-radius:24px;
    margin-left: 14%;
    text-align: center;
    cursor: pointer;
  }
  .searchBox>div>span{
    display: inline-block;
    width:25px;
    height:12px;
    font-size:12px;
    font-family:Source Han Sans CN;
    font-weight:400;
    color:rgba(255,255,255,1);
    margin-top: 18px;
  }
  .searchBody>ul{
    width:198px;
    height:14px;
    font-size:14px;
    font-family:Source Han Sans CN;
    font-weight:400;
    text-decoration:underline;
    color:rgba(48,77,153,1);
    display: flex;
    flex-direction: row;
    margin-left: 10%;
    margin-top: 14px;
  }
  .searchBody>ul>li{
    text-align: left;
    margin: 0
  }
  .searchBody>ul>li>span{
    color:rgba(48,77,153,1);
    margin-right: 30px;
    cursor: pointer;
  }
  .cloudAnalysis{
    margin: 0 auto;
    width:230px;
    font-size:10px;
    font-family:Source Han Sans CN;
    font-weight:400;
    color:#666666;
    margin-top: 60px;
    text-align: center;
    margin-bottom: 30px;
  }
  .crossing{
    width:19px;
    height:1px;
    background:rgba(183,183,183,1);
    display: inline-block;
    vertical-align: middle;

  }
  .crossingOne{
    width:24px;
    height:1px;
    background:rgba(183,183,183,1);
    display: inline-block;
    vertical-align: middle;
    margin:0 5px;
  }
  .cloudAnalysis{
    text-align: center;
  }
  .cloudAnalysis>span{
    display: inline-block;
    font-size:10px;
    font-family:Source Han Sans CN;
    font-weight:400;
    color:#666666;
    margin-left: 10px;
    margin-right: 10px;
  }
  .cloudAnalysis>p{
    font-size: 22px;
    color: #304D99;
    line-height: 50px;
  }
  .bestHost{
    margin-top: 30px;
    margin-bottom: 30px;
    padding:0 20px ;
    box-sizing: border-box;
  }
  .bestHost>div{
    padding:0 15px;
  }
  .dataSecurity{
    text-align: center;
    padding: 10px 0;
    box-sizing: border-box;
    margin: 0 auto;
  }
  .dataSecurity>div{
    margin: 0 auto;
  }
  .dataSecurity>div>img{
    width: 80px;
    margin-bottom: 19px;
  }
  .dataSecurity>div>span{
    display: block;
    text-align: center;
    font-size:16px;
    font-family:Source Han Sans CN;
    font-weight:400;
    color:rgba(48,77,153,1);
  }
  .dataSecurity>div>p{
    font-size:14px;
    font-family:Source Han Sans CN;
    color:#666666;
    text-align: center;
    margin-top: 10px; 
  }
  .informationSafety{
    margin: 0 auto;
    text-align: center;
    padding: 10px 0;
    box-sizing: border-box;
  }
  .informationSafety>div{
    margin: 0 auto;
  }
  .informationSafety>div>img{
    width: 80px;
    margin-bottom: 19px;
  }
  .informationSafety>div>span{
    display: block;
    text-align: center;
    font-size:16px;
    font-family:Source Han Sans CN;
    font-weight:400;
    color:rgba(48,77,153,1);
    margin-bottom: 10px;
  }
  .informationSafety>div>p{
    display: inline-block;
    font-size:14px;
    font-family:Source Han Sans CN;
    color:#666666;
  }
  .powerfulAnalysis{
    margin: 0 auto;
    text-align: center;
    padding: 10px 0;
    box-sizing: border-box;
  }
  .powerfulAnalysis>div{
    margin: 0 auto;
  }
  .powerfulAnalysis>div>img{
    width: 80px;
    margin-bottom: 19px;
  }
  .powerfulAnalysis>div>span{
    display: block;
    text-align: center;
    font-size:16px;
    font-family:Source Han Sans CN;
    font-weight:400;
    color:rgba(48,77,153,1);
  }
  .powerfulAnalysis>div>p{
    font-size:14px;
    font-family:Source Han Sans CN;
    color:#666666;
    margin-top: 10px;
  }

  .solution{
    width:100%;
    background:rgba(51,102,204,1);
    overflow: hidden;
  }
  .solutionImg{
    background: url("../../public/img/solution.png") no-repeat;
    overflow: hidden;

  }
  .solution1{
    width: 100%;
    margin: 0 auto;
    overflow: hidden;
  }
  .solutionHeader{
    width: 306px;
    height: 45px;
    margin: 0 auto;
    text-align: center;
    margin-top: 48px;
  }
  .solutionHeader>span{
    font-size:10px;
    font-family:Source Han Sans CN;
    font-weight:400;
    color:rgba(230,230,230,1);
  }
  .solutionHeader>p{
    font-size:21px;
    font-family:Source Han Sans CN;
    font-weight:400;
    color:#fff;
    line-height: 50px;
  }
  .solve{
    margin: 0;
    margin-top: 60px;
    margin-bottom: 69px; 
  }
  .solve>div{
    padding: 20px;
    text-align: center;
    height: 224px;
  }
  .solve>div>div>p{
    text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }
  .solve>div>img{
    margin-top: 15px;
  }
  .solve>div:nth-child(1)>div>span{
    font-size:16px;
    font-family:Source Han Sans CN;
    font-weight:400;
    color:rgba(255,255,255,1);
    display: block;
    margin-top: 23px;
  }
  .solve>div:nth-child(1)>div>p{
    text-align: center;
    font-size:14px;
    font-family:Source Han Sans CN;
    font-weight:400;
    color:rgba(254,254,254,1);
    line-height:20px;
    margin-top: 13px;
  }
  .solve>div:nth-child(2)>div>span{
    font-size:16px;
    font-family:Source Han Sans CN;
    font-weight:400;
    color:rgba(255,255,255,1);
    display: block;
    margin-top: 15px;
  }
  .solve>div:nth-child(2)>div>p{
    font-size:14px;
    font-family:Source Han Sans CN;
    font-weight:400;
    color:rgba(254,254,254,1);
    line-height:20px;
    margin: 0 auto;
    margin-top: 15px;
  }
  .solve>div:nth-child(3)>div>span{
    font-size:16px;
    font-family:Source Han Sans CN;
    font-weight:400;
    color:rgba(255,255,255,1);
    display: block;
    margin-top: 17px;
  }
  .solve>div:nth-child(3)>div>p{
    font-size:14px;
    font-family:Source Han Sans CN;
    font-weight:400;
    color:rgba(254,254,254,1);
    line-height:20px;
    margin: 0 auto;
    margin-top: 15px;
  }
  .solve>div:nth-child(4)>div>span{
    font-size:16px;
    font-family:Source Han Sans CN;
    font-weight:400;
    color:rgba(255,255,255,1);
    display: block;
    margin-top: 15px;
  }
  .solve>div:nth-child(4)>div>p{
    font-size:14px;
    font-family:Source Han Sans CN;
    font-weight:400;
    color:rgba(254,254,254,1);
    line-height:19px;
    margin: 0 auto;
    margin-top: 14px;
  }
  .solve>div:nth-child(5)>div>span{
    font-size:16px;
    font-family:Source Han Sans CN;
    font-weight:400;
    color:rgba(255,255,255,1);
    display: block;
    margin-top: 18px;
  }
  .solve>div:nth-child(5)>div>p{
    font-size:14px;
    font-family:Source Han Sans CN;
    font-weight:400;
    color:rgba(254,254,254,1);
    line-height:20px;
    margin: 0 auto;
    margin-top: 16px;
  }
  .solve>div:nth-child(6)>div>span{
    font-size:16px;
    font-family:Source Han Sans CN;
    font-weight:400;
    color:rgba(255,255,255,1);
    display: block;
    margin-top: 20px;
  }
  .solve>div:nth-child(6)>div>p{
    font-size:14px;
    font-family:Source Han Sans CN;
    font-weight:400;
    color:rgba(254,254,254,1);
    line-height:20px;
    margin: 0 auto;
    margin-top: 14px;
  }
  .gcbi{
    width: 100%;
    overflow: hidden;
  }
  .gcbi1{
    width: 100%;
    margin: 0 auto;
  }
  .cooperation>img{
    width: 100%;
    margin-top: 60px;
  }
  .platform{
    width: 100%;
    margin: 0 auto;
    text-align: center;
    margin-top: 59px;
  }
  .platform>span{
    font-size:14px;
    font-family:Source Han Sans CN;
    font-weight:400;
    color:#666666;
  }
  .platform>p{
    font-size:24px;
    font-family:Source Han Sans CN;
    font-weight:400;
    color:#304D99;
    line-height: 50px;
  }
  .platform>.article{
    margin-top: 19px;
    font-size:14px;
    font-family:Source Han Sans CN;
    font-weight:400;
    color:rgba(64,64,64,1);
    line-height:19px;
  }
  .banner{
    margin: 0 auto;
    width: 341px;
  }
  .banner>ul{
    display: flex;
    flex-direction: row;
    margin-top: 37px; 
    border-bottom:1px solid #E6E6E6;
  }
  .banner>ul>li{
    width: 114px;
    height: 36px;
    text-align: center;
    font-size:16px;
    font-family:Source Han Sans CN;
    font-weight:400;
    color:rgba(102,102,102,1);
  }
  .banner>ul>li:hover{
    border-bottom: 2px solid #304D99;
    cursor: pointer;
  }
  .setMeal{
    margin: 0;
    text-align: center;
    margin-bottom: 70px;
  }
  .setMeal>div{
    margin-top: 51px;
  }
  .setMeal>div>div{
    width: 220px;
    height:350px;
    background:rgba(255,255,255,1);
    border:1px solid rgba(216, 220, 232, 0.51);
    border-radius:20px;
    cursor: pointer;
    text-align: center;
    padding: 0;
    margin: 0 auto;
  }
  .setMeal>div>div:hover>.moneyHeader{
    background: #3C61C3;
  }
  .setMeal>div>div:hover>button{
    background: #3C61C3;
    color: #fff;
  }
  .setMeal>div>div:hover>.moneyHeader>p:nth-child(1){
    font-size:16px;
    color: #fff;
  }
  .setMeal>div>div:hover>.moneyHeader>p:nth-child(2){
    font-size:38px;
    color: #fff;
  }
  .setMeal>div>div:hover>.moneyHeader>p:nth-child(3){
    font-size:10px;
    color: #fff;
  }
  .moneyHeader{
    width:220px;
    height:124px;
    background:rgba(243,243,253,1);
    border-radius:20px 20px 0px 0px;
    text-align: center;
    overflow: hidden;
  }
  .moneyHeader>p:nth-child(1){
    font-size:14px;
    font-family:Source Han Sans CN;
    font-weight:400;
    color:rgba(64,64,64,1);
    margin: 0;
    margin-top: 20px;
  }
  .moneyHeader>p:nth-child(2){
    max-height:100%;
    font-size:36px;
    font-family:Source Han Sans CN;
    font-weight:400;
    color:rgba(64,64,64,1);
    margin: 0;
  }
  .moneyHeader>p:nth-child(3){
    font-size:10px;
    font-family:Source Han Sans CN;
    font-weight:400;
    color:rgba(64,64,64,1);
    margin: 0;
  }
  .words{
    height:96px;
    text-align: center;
    margin: 32px auto 43px;
  }
  .words>p{
    font-size:12px;
    font-family:Source Han Sans CN;
    font-weight:400;
    color:rgba(128,128,128,1);
    line-height:24px;
    margin: 0;
  }
  .setMeal>div>div>button{
    width:108px;
    height:30px;
    background:#fff;
    border:1px solid rgba(72,105,193,1);
    font-size:12px;
    font-family:Source Han Sans CN;
    font-weight:400;
    color:rgba(72,105,193,1);
  }
  .gcbi2{
    width: 100%;
    margin-top: 40px;
    background: #3C61C3;
  }
  .gcbi2>div{
    width: 100%;
    margin: 0 auto;
  }
  .cloudCustomerService{
    margin: 50px 0;
    box-sizing: border-box;
    padding: 20px;
  }
  .cloudCustomerService>span{
    font-size: 14px;
    margin-left: 10px;
    color: #fff;
  }
  .cloudCustomerService>p:nth-child(3){
    font-size: 24px;
    line-height: 48px;
    color: #fff;
  }
  .cloudCustomerService>p:nth-child(4){
    font-size: 12px;
    line-height:24px;
    color: #fff;
    margin-top: 20px;
  }
  .cloudCustomerService>div:nth-child(5){
    width:40px;
    height:40px;
    background:#fff;
    box-shadow:0px 0px 6px 0px rgba(204,204,223,0.5);
    border-radius:20px;
    margin-top:20px;
    text-align: center;
    cursor: pointer;
  }
  .cloudCustomerService>div:nth-child(5)>img{
    margin-top: 12px;
  }
  .gcbi2>div>div:first-child{
    text-align: center;
  }
  .gcbi2>div>div:first-child>img{
    max-width:80%;
  }
  .newBlog{
    width: 100%;
    background:rgba(250,250,250,1);
    overflow: hidden;
    z-index: 999;
  }
  .newBlog1{
    width: 100%;
    margin: 0 auto;
  }
  .newBlogHeader{
    margin: 0 auto;
    text-align: center;
    margin-top: 48px;
    width: 200px;
  }
  .newBlogHeader>span{
    font-size:14px;
    font-family:Source Han Sans CN;
    font-weight:400;
    color:rgba(102,102,102,1);
    margin: 0 10px;
  }
  .newBlogHeader>p{
    font-size:24px;
    font-family:Source Han Sans CN;
    font-weight:400;
    color: #304D99;
    line-height: 50px;
  }
  .BlogInner{
    width: 100%;
    margin: 0;
    margin-bottom: 50px;
  }
  .BlogItem{
    margin: 20px 0;
  }
  .BlogItem>div{
    box-sizing: border-box;
    background: #fff;
    width: 270px;
    height: 300px;
    padding: 30px 20px 20px 20px;
    position: relative;
    margin: 0 auto;
    cursor: pointer;
  }
  .BlogItem>div>p:nth-child(1){
    font-size: 14px;
    text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    line-height: 26px;
  }
  .CrossingTwo{
    width:44px;
    height:1px;
    background:#6E45E2;
    vertical-align: middle;
    margin-top: 12px;
  }
  .BlogItem>div>p:nth-child(3){
    font-size: 12px;
    font-weight: 500;
    text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    margin-top: 50px; 
  }
  .BlogItem>div>div:nth-child(4){
    position: absolute;
    bottom: 20px;
    left: 20px;
    width: 100%;
    display: flex;
    width: 230px;
    flex-direction: row;
    margin-top: 70px;
    justify-content: space-between;
    font-size: 12px;
  }
  .BlogItem>div>div:nth-child(4)>p:nth-child(1)>img{
    vertical-align: middle;
  }
  .BlogItem>div>div:nth-child(4)>p:nth-child(1)>span{
    vertical-align: middle;
  }
  .solve>div>img{
    width: 48px;
  }
  .BlogItem>div:hover{
    cursor: pointer;
    transform: scale(1.1);
    box-shadow: #f5f5f5 10px 10px 5px 0 ;  
  }
  .sangerbox{
    text-align: center;
    padding: 5px 0;
    background: rgba(255,241,240,1);
    color: #FF6B00;
  }
  .tankuang{
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(153,153,153,.4);
    z-index:9997;
    margin: 0 auto;
  }
  
  .tankuang>div{
    width: 800px;
    position: absolute;
    top: 50%;
    left: 30%;
    transform: translate(0, -50%);
    z-index: 9998;
    text-align: center;
    display: flex;
    flex-direction: row;
  }
  .tankuang>div>div{
    width: 50%;
    height: 540px;
  }
  .tankuang>div>div:nth-child(2){
    background: #fff;
    border-radius: 10px;
  }
  .zhifu1>div:nth-child(1){
    position: relative;
  }
  .zhifuInfo{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    text-align: left;
    padding: 120px 0 0 30px;
  }
  .zhifuInfo>p:nth-child(1){
    color: #fff;
    font-size: 40px;
    margin-bottom: 20px;
  }
  .zhifuInfo>div>p{
    color: #fff;
    font-size: 20px;
    line-height: 36px;
  }
  .dibu{
    position: fixed;
    bottom: 20px;
    left: 0;
    text-align: left;
    padding-left: 30px;
  }
  .dibu>p{
    color: #fff;
    font-size: 15px;
    line-height: 26px;
  }
  .pay{
    padding: 44px 60px 44px 60px;
    
  }
  .pay>div:nth-child(1){
    display: flex;
    flex-direction: row;
    justify-content:space-around;
    line-height: 35px;
    font-size: 28px;
    overflow: hidden;
    margin-bottom: 20px;
  }
  .pay>div:nth-child(1)>p{
    margin-top: 6px;
  }
  .pay>p:nth-child(4){
    margin-top: 20px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .pay>p:nth-child(4)>.el-button{
    width: 110px;
  }
  .youhuiquan{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    line-height: 26px;
    margin-top: 20px;
  }
  .youhuiquan>>>.el-input__inner{
    line-height: 26px;
    height: 26px;
    font-size: 14px;
  }
  .youhuiquan>div{
    width: 63%;
  }
  .youhuiquan>span{
    font-size: 12px;
    color: #666666;
  }
  .youhuiquan>>>.el-input__icon{
    line-height: 26px;
  }
</style>