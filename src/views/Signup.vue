<template>
  <div>
    <Header></Header>
    <div class="contentAll ">
      <div class="content row">
        <div class="col-md-7">
          <img src="../../public/img/bg.png" alt="">
        </div>
        <div class="Signup col-md-5">
          <input v-model="uname" type="uname" placeholder="用户昵称" onfocus="this.placeholder=''" onblur="this.placeholder='用户昵称'">
          <input v-model="phone" type="phone" placeholder="手机号" onfocus="this.placeholder=''" onblur="this.placeholder='手机号'">
          <div class="tPhone"><span v-show="show1">手机号格式不正确</span></div>
          <input v-model="spwd" type="password" placeholder="设置密码" onfocus="this.placeholder=''" onblur="this.placeholder='设置密码'">
          <input v-model="qpwd" type="password" placeholder="确认密码" onfocus="this.placeholder=''" onblur="this.placeholder='确认密码'">
          <div class="tPwd"><span v-show="show2">两次密码不一致</span></div>
          <input v-model="code" type="text" placeholder="短信验证" onfocus="this.placeholder=''" onblur="this.placeholder='短信验证'">
          <button :disabled="isAble" id="phone" @click="getCode()" :plain="true"><span v-show='show'>获 取 短 信 验 证 码</span><span v-show='!show'>{{count}}</span></button>
          <div class="tCode"><span v-show="show3">验证码不正确</span></div>
          <button @keyup.13="Signup" @click="Signup()" :disabled='signup1' :plain="true"><span id="signup">注册</span></button>
          <p>如果您已拥有账号，点击这里<span @click="toSignin()">登录</span></p>
          <p>如无大陆手机号，注册Sangerbox请联系管理员</p>
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
    return {title: 'SangerBox用户注册'} // set a title
  },
  data() {
    return {
      uname:'',
      phone:'',
      spwd:'',
      qpwd:'',signup1:false,
      code:'',
      show:true,
      count:'',
      tPhone:false,
      show1:false,
      show2:false,
      show3:false,
      isAble:false,
    }
  },
  components:{
    Header,Footer1
  },
  mounted() {

  },
  methods: {
    Signup(){
      this.signup1=true
      document.getElementById('signup').innerText='注 册 中 ...'
      if (!(/^1[03456789]\d{9}$/.test(this.phone))) {
        this.signup1=false
        document.getElementById('signup').innerText='注 册'
        this.show1=true
      } else if (this.phone == "" || !this.phone) {
        this.signup1=false
        document.getElementById('signup').innerText='注 册'
        this.show1=true
      }else{
        this.signup1=false
        document.getElementById('signup').innerText='注 册'
        this.show1=false
      //验证两次密码输入一致
        if(this.spwd!=this.qpwd){
          this.signup1=false
          document.getElementById('signup').innerText='注 册'
          this.show2=true
          //验证两次密码是否为空
        }else if(this.spwd=="" && this.qpwd==''){
          this.signup1=false
          document.getElementById('signup').innerText='注 册'
          this.show2=true
        }else{
          this.signup1=false
          document.getElementById('signup').innerText='注 册'
          this.show2=false
          var qs=require('qs');
          this.axios.post(
            "/user/register",
            qs.stringify({
              "mobile":this.phone,
              "code":this.code,
              "password":this.qpwd,
              "username":this.uname
            })
          ).then(res =>{
            if(res.data.resp_code==0){
              this.show3=false
              this.signup1=false
              document.getElementById('signup').innerText='注 册'
              this.$message({
                message: '注册成功跳转到登录页',
                type: 'success'
              });
              this.$router.push({path:"/Signin"});
            }else{
              this.show3=true
            }
          })
        }
      }
    },
    toSignin(){
      //跳转到登录页
      this.$router.push({path:'/Signin'})
    },
    getCode(){
      if (!(/^1[03456789]\d{9}$/.test(this.phone))) {
        this.show1=true
      } else if (this.phone == "" || !this.phone) {
        this.show1=true          
      }else{
        this.show1=false
        var qs=require('qs');
        this.axios.post(
          "/user/isUser",
          qs.stringify({
            "user":this.phone
          })
          ).then(res =>{
            if(res.data.resp_code==1){
              //发送验证码有60秒的控制时间
              const TIME_COUNT = 60;
              if (!this.timer) {
                this.count = TIME_COUNT;
                this.show = false;
                //使得按钮不可用
                this.isAble=true
                document.getElementById('phone').style.cursor = 'not-allowed'
                this.timer = setInterval(() => {
                if (this.count > 0 && this.count <= TIME_COUNT) {
                  this.count--;
                } else {
                  this.show = true;
                  //按钮可用
                  //清楚计时器
                  this.isAble=false
                  document.getElementById('phone').style.cursor = 'pointer'
                  clearInterval(this.timer);
                  this.timer = null;
                  }
                }, 1000)
              }
              this.axios.post(
                "/user/getSms",
                qs.stringify({
                  'mobile':this.phone
                })
                ).then(res =>{
                  // console.log(res.data)
                }
              )
            }else if(res.data.resp_code==0){
              this.$message({
                message: '用户已存在',
                type: 'warning'
              });
            }
          }
        )
      }  
    },
  }
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
  .Signup{
    width: 350px;
    background: #fff;
    padding: 35px;    
    margin: 0 auto;
    border-radius: 4px;
  }
  .Signup>input:nth-child(2){
    margin: 0;
  }
  .tPhone{
    margin-top: 3px;
    margin-bottom: 2px;
    text-align: left;
    color: red;
    height: 15px;
    font-size: 12px;
  }
  .Signup>input:nth-child(5){
    margin: 0;
  }
  .tPwd{
    margin-top: 3px;
    margin-bottom: 2px;
    text-align: left;
    color: red;
    height: 15px;
    font-size: 12px;
  }
  .Signup>input:nth-child(7){
    margin: 0;
  }
  .tCode{
    margin-top: 3px;
    margin-bottom: 2px;
    text-align: left;
    color: red;
    height: 15px;
    font-size: 12px;
  }
  input{
    width: 100%;
    height: 30px;
    border: none;
    border-bottom: 2px solid #999999;
    font-size:16px;
    font-family:Source Han Sans CN;
    color:#333;
    outline: none;
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
  .Signup>input{
    margin-bottom: 20px;
  }
  .Signup>input:nth-child(7){
    width: 50%;
  }
  .Signup>button:nth-child(8){
    width: 50%;
    height:30px;
    background:linear-gradient(180deg,rgba(71,124,254,1),rgba(57,85,255,1));
    text-align: center;
    border: none;
    cursor: pointer;
  }
  .Signup>button:nth-child(8)>span{
    font-size:14px;
    font-family:Source Han Sans CN;
    font-weight:400;
    color:rgba(255,255,255,1);
  }
  .Signup>button:nth-child(10){
    margin-top: 10px;
    width:100%;
    height:36px;
    background:linear-gradient(180deg,rgba(71,124,254,1),rgba(57,85,255,1));
    border-radius:4px;
    text-align: center;
    border: none;
    cursor: pointer;
  }
  .Signup>button:nth-child(10)>span{
    font-size:14px;
    font-family:Source Han Sans CN;
    font-weight:400;
    color:rgba(255,255,255,1);
  }
  .Signup>p:nth-child(11){
    color: #999;
    font-size: 14px;
    margin-top: 20px;
  }
  .Signup>p:nth-child(12){
    color: #999;
    font-size: 12px;
    margin-top: 10px;
  }
  .Signup>p:nth-child(11)>span{
    color: rgba(57,85,255,1);
    cursor: pointer;
  }
</style>