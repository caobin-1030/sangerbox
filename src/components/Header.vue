<template>
<div>
  <div id="boxFixed" :class="{'isFixed' : isFixed}" class="header1">
    <div class="header2" id="header111">
      <div @click="dropDown()"><img src="../../public/img/list.png" alt=""></div>
      <img src="../../public/img/logo1.png" alt="">
      <div :class="{'down':down}" class="dropDown">
        <ul>
          <li @click="toIndex">首页</li>
          <li @click="toSearch">文献+</li>
          <li @click="toMonogenic">基因+</li>
          <li>数据+</li>
          <li @click="toTools">工具+</li>
          <li @click="toVideo">课堂+</li>
          <li @click="toProgramme">服务+</li>
          <li @click="toPersonal()">关于我们</li>
          <li>Eng</li>
          <li @click="toSignin()" v-if="!login">登录</li>
          <li @click="toSignup()" v-if="!login">注册</li>
          <li v-if="login"><img src="../../public/img/logo6.png" alt="">{{uname}}</li>
        </ul>
      </div>
    </div>
    <div class="row header">
      <div class="col-md-2 col-sm-1 col-xs-1">
        <img class="logo1" @click="toIndex" src="../../public/img/logo1.png">
        <img class="logo4" @click="toIndex" src="../../public/img/logo4.png">
      </div>
      <div class="col-md-8 col-sm-10 col-xs-10 Navigation">
        <ul>
          <li @click="toIndex">首页</li>
          <li @click="toSearch">文献+</li>
          <li @click="toMonogenic">基因+</li>
          <li @click="toInformation">数据+</li>
          <li @click="toTools">工具+</li>
          <li @click="toVideo">课堂+</li>
          <li @click="toProgramme">服务+</li>
          <li @click="toHome()">关于我们</li>
        </ul>
      </div>
      <div class="col-lg-3 col-md-2 col-sm-1 col-xs-1">
        <div class="row">
          <div class="login" v-if="login">
            <el-dropdown placement="bottom-start" trigger="click">
              <span class="el-dropdown-link">
                <img src="../../public/img/logo6.png" alt=""><span><el-badge :is-dot='download || zhannei' class="item">{{uname}}</el-badge></span>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item><img class="uname" src="../../public/img/logo6.png" alt=""><span>{{uname}}</span></el-dropdown-item>
                <el-dropdown-item><div class="xian"></div></el-dropdown-item>
                <el-dropdown-item @click.native="toPersonal('date')"><img @click.native="toPersonal('date')" class="fenxi" src="../../public/img/name.png" alt=""><span @click.native="toPersonal('date')">数据中心<sup id="sup1" class="sup1"></sup></span></el-dropdown-item>
                <el-dropdown-item @click.native="toPersonal('task')"><img class="fenxi" @click.native="toPersonal('task')" src="../../public/img/fenxi.png" alt=""><span @click.native="toPersonal('task')"><el-badge :is-dot='download' class="item">任务中心</el-badge></span></el-dropdown-item>
                <el-dropdown-item @click.native="toPersonal('vip')"><img class="fenxi" @click.native="toPersonal('vip')" src="../../public/img/fenxi.png" alt=""><span @click.native="toPersonal('vip')">会员中心</span></el-dropdown-item>
                <el-dropdown-item @click.native="toPersonal('inbox')"><img class="fenxi" @click.native="toPersonal('inbox')" src="../../public/img/fenxi.png" alt=""><span @click.native="toPersonal('inbox')"><el-badge :is-dot='zhannei' class="item">站内信</el-badge></span></el-dropdown-item>
                <el-dropdown-item v-if="phone=='13777421877' || phone=='13456826965'" @click.native="houtai()"><img class="fenxi" src="../../public/img/fenxiang.png" alt=""><span>后台管理</span></el-dropdown-item>
                <el-dropdown-item @click.native="exit()"><img class="fenxi" src="../../public/img/exit.png" alt=""><span>退出</span></el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <div class="English col-md-4"><span>英文</span><img src="../../public/img/english.png" alt="英文" title="英文"></div>
          </div>
          <div v-if="!login">
            <div class="English col-md-4"><span>英文</span><img src="../../public/img/english.png" alt="英文" title="英文"></div>
            <div class="Login col-lg-4 col-md-12 col-xs-12"><span @click="toSignin">登录</span><img @click="toSignin" src="../../public/img/login.png" alt="登录" title="登录"></div>
            <div class="Register col-md-4"><span @click="toSignup">注册</span><img @click="toSignup" src="../../public/img/register.png" alt="注册" title="注册"></div>
          </div>
                    
        </div>
      </div>
    </div>
  </div>
  <div v-if="msg!=''"><p class="sangerbox">{{msg}}</p></div>
</div>
  
</template>
<script>
import { web } from '../../public/js/status'

export default {
  data() {
    return {
      show:true,
      screenWidth: document.body.clientWidth,
      isFixed:false,
      show:false,
      down:false,msg:'',
      i:0,
      login:false,
      uname:"",
      aut:'',phone:'',download:true,zhannei:true
    }
  },
  mounted() {
    if(localStorage.getItem('download')!=null && localStorage.getItem('download')>0){
      this.download=true
    }else{
      this.download=false
    }
    if(localStorage.getItem('zhannei')!=null && localStorage.getItem('zhannei')>0){
      this.zhannei=true
    }else{
      this.zhannei=false
    }
    this.$axios.get("http://sangerbox.com/getLastIp").then((res) =>{
      this.msg = res.data
    })
    // this.$axios.get("/user/getUserInfo").then((res) =>{
    //   console.log(res.data.resp_code)
    //   if(res.data.resp_code==1){
    //     this.login=false
    //   }else{
    //     localStorage.setItem('mobile', res.data.datas.mobile);
    //     localStorage.setItem("uname",res.data.datas.username);
    //   }
    // })
    if(window.location.pathname=="/Signin" || window.location.pathname=="/Signup" || window.location.pathname=="/WechatSignin" || window.location.pathname=="/ForgetPwd" || window.location.pathname=="/Modify" || window.location.pathname=="/PhoneSignin"){
      this.login=false
    }
    this.phone=localStorage.getItem("mobile")
    web(this.phone)
    this.sup=localStorage.getItem("sup")
    window.addEventListener('scroll',this.handleScroll)
    let mobile=localStorage.getItem("mobile");
    this.uname=localStorage.getItem("uname");
    // console.log(this.uname)
    if(mobile!=null){
      this.login=true
    }else{
      this.login=false
    }
    if(window.location.pathname=="/Signin" || window.location.pathname=="/Signup" || window.location.pathname=="/WechatSignin" || window.location.pathname=="/ForgetPwd" || window.location.pathname=="/Modify" || window.location.pathname=="/PhoneSignin"){
      this.login=false
    }
  },
  activated() {
    let mobile=localStorage.getItem("mobile");
    this.uname=localStorage.getItem("uname");
    // console.log(this.uname)
    if(mobile!=null){
      this.login=true
    }else{
      this.login=false
    }
    if(window.location.pathname=="/Signin" || window.location.pathname=="/Signup" || window.location.pathname=="/WechatSignin" || window.location.pathname=="/ForgetPwd" || window.location.pathname=="/Modify" || window.location.pathname=="/PhoneSignin" || window.location.pathname=="/PhoneSignin"){
      this.login=false
    }else{
      this.aut= localStorage.getItem("authorization");
      if(this.aut!=undefined && this.aut!="" && this.aut!=null){
        this.login=true
      }else{
        this.login=false
      }
    }
    
  },
  watch: {
    aut(val){
      if(this.aut!=undefined){
        this.login=true
      }else{
        this.login=false
      }
    },
    sup(val){

    },
    
    // $route: {
    //   handler: function(val, oldVal) {
    //     if(oldVal!=val){
    //       aaa()
    //     }
        
    //   },deep: true
    // },
  },
  methods: {
    houtai(){
      window.open('http://admin.sangerbox.com/', '_blank')
    },
    toVideo(){
      const {href} =this.$router.resolve({
        path: '/SangerBoxClassroom',
      })
      window.open(href, '_self')
    },
    toInformation(){
      const {href} =this.$router.resolve({
        path: '/Information',
      })
      window.open(href, '_self')
    },
    toTools(){
      const {href} =this.$router.resolve({
        path: '/Tool',
      })
      window.open(href, '_self')
    },
    toMonogenic(){
      const {href} =this.$router.resolve({
        path: '/Gene',
      })
      window.open(href, '_self')
    },
    toHome(){
      const {href} =this.$router.resolve({
        path: '/Home',
      })
      window.open(href, '_self')
    },
    exit(){
      this.axios.get(
        "/user/loginout"
        ).then(res =>{
          if(res.data.resp_code==0){
            localStorage.clear();
            this.login=false
            this.$router.push({path:"/Signin"});
            location.reload(true); 
            
          }else{
            alert("失败")
          }
          
        }
      )
      
    },
    toPersonal(a){
      if(a=='task'){
        this.$store.commit('addup')
      }else if(a=='inbox'){
        this.$store.commit('zhanneiaddup')
      }
      const {href} =this.$router.resolve({
        path: '/Personal',query:{type:a}
      })
      window.open(href, '_self')
    },
    dropDown(){
      this.down=!this.down
      
    },
    handleScroll(){
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop // 滚动条偏移量
      let offsetTop = document.querySelector('#boxFixed').offsetTop;  // 要滚动到顶部吸附的元素的偏移量
      this.isFixed = scrollTop > offsetTop ? true : false;  // 如果滚动到顶部了，this.isFixed就为true
      if(scrollTop<90){
        this.isFixed=false;
      }
      if(window.outerWidth<768){
        this.isFixed=false;
      }
    },
    toIndex(){
      const {href} =this.$router.resolve({
        path: '/Index',
      })
      window.open(href, '_self')
      this.down=false;
      this.i++;
    },
    toSignin(){
      this.$router.push({path:"/Signin"});
    },
    toSignup(){
      this.$router.push({path:"/Signup"});
    },
    toSearch(){
      const {href} =this.$router.resolve({
        path: '/Search',
      })
      window.open(href, '_self')
      this.down=false;
      this.i++;
    },
    toProgramme(){
      const {href} =this.$router.resolve({
        path: '/Programme',
      })
      window.open(href, '_self')
      // this.$message({
      //   message: '功能正在开发中',
      //   type: 'warning'
      // });
      // this.down=false;
      // this.i++;
    }
  },
}
</script>
<style scoped>
  @import '../assets/css/reset.css';
  @media screen and (min-width:1200px){
    .header{
      width: 1200px !important;
      margin: 0 auto !important;
    }
    .header>div:first-child{
      text-align: left !important;
    }
    .Navigation>ul{
      display: flex;
      flex-direction: row;
      list-style: none;
      justify-content:space-around;
      text-align: center;
      line-height: 80px;
    }
    .Navigation>ul>li{
      font-size:16px;
      font-family:Source Han Sans CN;
      font-weight:400;
      color:#333333;
    }
    .Navigation>ul>li:hover{
      color: #4285F4;
      border-bottom: 1px solid #4285F4;
      cursor: pointer;
    }
    .header>div:last-child>div{
      padding: 0 !important;
    }
    .header>div:last-child>div>div{
      cursor: pointer;

  }
  }
  @media screen and (max-width:1200px){
    .English {
      display:none;
    }
    .Register{
      display: none;
    }
  }
  @media screen and (max-width:768px){
    .header2{
      display: block !important;
    }
    .header{
      display: none !important; 
    }
  }
  @media screen and (max-width:992px){
    .logo1 {
      display:none;
    }
    .logo4{
      display: inline-block !important;
      width: 22px !important;
      height: 42px !important;
    }
    .Login{
      padding: 0 !important;
    }
  }
  .dropDown{
    background: #fff;
    width: 100%;
    text-align: left;
    display: none;
  }
  .dropDown>ul>li{
    border-bottom: 1px solid #999;
    cursor: pointer;
  }
  .dropDown>ul>li:hover{
    color: #4285F4;
  }
  .down{
    display: block !important;
    transition: all 2s linear;
  }
  .header2{
    display: none;
    width: 100%;
    line-height: 50px;
    margin: 0 auto;
  }
  .header2>div{
    float: left;
    padding-left: 20px;
    box-sizing: border-box;
  }
  .header2>div>img{
    cursor: pointer;
  }
  .sangerbox{
    text-align: center;
    padding: 5px 0;
    background: rgba(255,241,240,1);
    color: #FF6B00;
  }
  .header2>img:nth-child(2){
    width: 172px;
    vertical-align: middle;
    display: inline-block;
  }
  .header1{
    background: #fff;
    width: 100%;
    text-align: center;
    margin-top: -2px;
    box-shadow: 0 2px 4px 0 rgba(0,0,0,.05);
  }
  .isFixed{
    width: 100%;
    height: 80px;
    position: fixed !important;
    z-index: 10100;
    top: 0;
  }
  .logo4{
    display: none;
  }
  .header{
    width: 100%;
    height: 80px;
    line-height: 80px;
    margin: 0 auto;
    display: flex;
    flex-direction: row;
  }
  .header>div:first-child{
    text-align: end;
  }
  .header>div:first-child>img:nth-child(1){
    width: 170px;
    cursor: pointer;
  }
  .Navigation{
  }
  .Navigation>ul{
    display: flex;
    flex-direction: row;
    list-style: none;
    justify-content:space-around;
    line-height: 80px;
  }
  .Navigation>ul>li{
    font-size:16px;
    font-family:Source Han Sans CN;
    font-weight:400;
    color:#333333;
    vertical-align: middle;
  }
  .Navigation>ul>li:hover{
    color: #4285F4;
    border-bottom: 1px solid #4285F4;
    cursor: pointer;
  }
  .header>div:last-child{
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    padding: 0;
  }
  .header>div:last-child>div{
    width: 100%;
    vertical-align: middle;
    font-size: 15px;
  }
  .English>img{
    width: 18px;
    margin-left:5px; 
    vertical-align: middle;
  }
  .Login>img{
    width: 14px;
    margin-left: 5px;
    vertical-align: middle; 
  }
  .Register>img{
    width: 14px;
    margin-left: 5px;
    vertical-align: middle;   
  }
  .login{
    display: flex;
    flex-direction: row;
    justify-content: space-around
  }
  .el-dropdown-menu{
    margin-top: -5px !important;
  }
  .fenxi{
    vertical-align: middle;
    margin-right: 5px;
  }
  .uname{
    vertical-align: middle;
    margin-right: 5px;
    width: 24px;
  }
  .uname+span{
    vertical-align: middle;
    font-size: 14px; 
  }
  .fenxi+span{
    vertical-align: middle;
    font-size: 13px; 
  }
  .xian{
    height: 1px;
    background: #dcdcdc;
  }
  .el-dropdown-menu>li:nth-child(1){
    margin-bottom: 10px;
  }
  .el-dropdown-menu>li:nth-child(2){
    margin-bottom: 10px;
  }
  .el-dropdown-menu__item:focus, .el-dropdown-menu__item:not(.is-disabled):hover{
    color: #606266;
  }
  .header>div:last-child>div>div{
    cursor: pointer;
  }
  .el-dropdown>span>span{
    margin-left: 18px;
    font-size: 16px;
  }
  .sup1{
    background-color: #f56c6c;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    color: #fff;
    display: inline-block;
    font-size: 12px;
    text-align: center;
    white-space: nowrap;
    border: 1px solid #fff;
    display: none;
  }
  .el-badge{
    display: inline;
  }
</style>