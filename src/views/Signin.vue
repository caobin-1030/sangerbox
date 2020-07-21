<template>
  <div>
    <Header></Header>
    <div class="contentAll ">
      <div class="content row">
        <div  class="col-md-7">
          <img src="../../public/img/bg.png" alt="">
        </div>
        <div class="Login col-md-5">
          <p>云 平 台</p>
          <p>账 户 信 息 登 录</p>
          <input v-model="phone" type="text" placeholder="手机号/邮箱" onfocus="this.placeholder=''" onblur="this.placeholder='手机号/邮箱'">
          <input @keyup.13="login" v-model="password" type="password" placeholder="密码" onfocus="this.placeholder=''" onblur="this.placeholder='密码'">
          <el-checkbox v-model="checked">记住账号</el-checkbox>
          <span @click="toSignup()">注册</span>
          <span @click="toForget()">忘记密码</span>
          <button  @click="login()" :disabled='login1'  :plain="true"><span id="login2">登 录</span></button>
          <div class="fast">
            <span @click="toPhoneSignin()">验证码登录</span><span @click="toWechatSignin()">微信登录</span>
          </div>
          
        </div>
      </div>
      
    </div>
    <Footer1></Footer1>
  </div>
</template>
<script>

import Header from '../components/Header'
import Footer1 from '../components/Footer1'
export default {
  metaInfo() {
    return {title: 'SangerBox用户登录'} // set a title
  },
  data() {
    return {
      phone:'',
      password:'',
      checked: false,
      obj:null,
      token:'',login1:false
    }
  },
  components:{
    Header,Footer1
  },
  activated() {
    //页面加载时获取localStorage中的数据
    this.phone=localStorage.getItem('phone')
    this.password=localStorage.getItem('password')
    //如果localStorage中的数据不是空和null的话默认选中
    if(this.phone!="" && this.phone!=null){
      this.checked=true
    }else{
      this.checked=false
    }
    // console.log(localStorage.getItem('phone'))
    // console.log(localStorage.getItem('password'))
  },
  updated() {
    
  },
  mounted() {
    
  },
  methods: {
    toWechatSignin(){
      this.$router.push({path:'/WechatSignin'})
    },
    toPhoneSignin(){
      this.$router.push({path:'/PhoneSignin'})
    },
    toSignup(){
      //跳转到登录页
      this.$router.push({path:'/Signup'})
    },
    toForget(){
      //跳转到忘记密码页
      this.$router.push({path:'/ForgetPwd'})
      //跳转到忘记密码页的同时清空localStorage中的数据
      localStorage.clear()
    },
    toPhone(){
      //跳转到快捷登录页
      this.$router.push({path:'/PhoneLogin'})
    },
    login(){
      this.login1=true
      document.getElementById('login2').innerText='登 录 中 ...'
      if (!(/^1[3456789]\d{9}$/.test(this.phone)) && !(/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(this.phone))) {
        this.$message({
          message: '手机号不符合规则',
          type: 'warning'
        });
        this.login1=false
        document.getElementById('login2').innerText='登 录'
      } else if (this.phone == "" || !this.phone) {
        this.login1=false
        document.getElementById('login2').innerText='登 录'
      } else{
        localStorage.setItem("phone",this.phone);
        localStorage.setItem("password",this.password)
        //当判断手机号或邮箱格式都正确时
        //判断记住账号是否被选中
        var qs=require('qs');
        this.axios.post(`/user/pwdLogin`,  qs.stringify({
          'mobile':this.phone,
          'password':this.password,
          // 'token': this.token
        })).then((res) =>{
          if(res.data.datas!=null){
            let mobile=res.data.datas.mobile;
            let uname=res.data.datas.username;
            let isVip=res.data.datas.isVip;
            localStorage.setItem('mobile', mobile);
            localStorage.setItem("uname",uname);
            localStorage.setItem("isvip",isVip);
          }
          if(res.status!=200){
            this.login1=false
            document.getElementById('login2').innerText='登 录'
            this.$message.error('登录失败');
          }
          if(res.data.resp_code==0){
            this.login1=false
            document.getElementById('login2').innerText='登 录'
            this.$message({
              message: '登录成功',
              type: 'success'
            });
            if(localStorage.getItem('href')==null){
              window.location.href='/Index';
            }else{
              window.location.href=localStorage.getItem('href');
            }
          }else{
            this.login1=false
            document.getElementById('login2').innerText='登 录'
            this.$message({
              message: '用户名或密码错误',
              type: 'warning'
            });
          }
        });
        if(this.checked==true){
          //被选中保存手机号和密码保存到localStorage中
          localStorage.setItem("phone",this.phone);
          localStorage.setItem("password",this.password)
        }else{
          //未被选中就清除localStorage中的数据
          localStorage.removeItem("phone");
          localStorage.removeItem("password");
        }
        // this.obj.validate();
      }
    }
  },
}
</script>
<style scoped>
  @media screen and (min-width:1200px){
    .content{
      width: 1200px !important;
    }
  }
  @media screen and (max-width:992px){
    .content>div:first-child{
      display: none;
    }
  }
  .contentAll{
    width: 100%;
    background:linear-gradient(146deg,rgba(71,124,254,1) 0%,rgba(57,85,255,1) 100%);
  }
  .content{
    width: 100%;
    margin: 0 auto;
    padding: 80px 0;
  }
  .content>div{
    text-align: center;
  }
  .content>div>img{
    margin-top: 70px;
  }
  .Login{
    width: 350px;
    background: #fff;
    padding: 35px;
    margin: 0 auto;
    border-radius: 4px;
  }
  .Login>p:first-child{
    font-size:26px;
    font-family:Source Han Sans CN;
    font-weight:bold;
    color:rgba(51,51,51,1);
    text-align: left;
  }
  .Login>p:nth-child(2){
    font-size:26px;
    font-family:Source Han Sans CN;
    font-weight:bold;
    color:rgba(51,51,51,1);
    text-align: left;
  }
  input{
    width: 100%;
    height: 30px;
    border: none;
    border-bottom: 2px solid #999999;
    font-size:16px;
    font-family:Source Han Sans CN;
    color:#333;
  }
  .Login>input:nth-child(3){
    margin-top: 30px;
    outline: none;
  }
  .Login>input:nth-child(4){
    margin-top: 30px;
    outline: none;
    margin-bottom: 30px;
  }
  /* 设置placeholder的属性，使得各个浏览器兼容 */
  input::-webkit-input-placeholder { 
    /* WebKit browsers */ 
    font-size:14px;
    font-family:Source Han Sans CN;
    color:rgba(153,153,153,1);
  } 
  input:-moz-placeholder { 
    /* Mozilla Firefox 4 to 18 */ 
    font-size:14px;
    font-family:Source Han Sans CN;
    color:rgba(153,153,153,1);
  } 
  input::-moz-placeholder { 
    /* Mozilla Firefox 19+ */ 
    font-size:14px;
    font-family:Source Han Sans CN;
    color:rgba(153,153,153,1);
  } 
  input:-ms-input-placeholder { 
    /* Internet Explorer 10+ */ 
    font-size:14px;
    font-family:Source Han Sans CN;
    color:rgba(153,153,153,1);
  }
  .Login>span:nth-child(6){
    font-size:14px;
    font-family:Source Han Sans CN;
    font-weight:bold;
    color:rgba(207,71,71,1);
    margin-left: 5%;
    cursor: pointer;
  }
  .Login>span:nth-child(7){
    font-size:14px;
    font-family:Source Han Sans CN;
    font-weight:bold;
    color:rgba(48,77,153,1);
    margin-left:34%;
    cursor: pointer;
  }
  .Login>button:nth-child(8){
    margin-top: 30px;
    width:100%;
    height:36px;
    background:linear-gradient(180deg,rgba(71,124,254,1),rgba(57,85,255,1));
    border-radius:4px;
    text-align: center;
    border: none;
    cursor: pointer;
  }
  .Login>button:nth-child(8)>span{
    font-size:14px;
    font-family:Source Han Sans CN;
    font-weight:400;
    color:rgba(255,255,255,1);
  }
  .fast{
    margin-top: 30px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 0 5px;
  }
  .fast>span{
    font-size: 14px;
    font-family: Source Han Sans CN;
    font-weight: bold;
    color: rgba(48,77,153,1);
    cursor: pointer;
  }
</style>