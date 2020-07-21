<template>
  <div>
    <Header></Header>
    <div class="contentAll ">
      <div class="content row">
        <div class="col-md-7">
          <img src="../../public/img/bg.png" alt="">
        </div>
        <div class="ForgetPwd col-md-5">
          <p></p>
          <p>密 码 找 回</p>
          <button id="youxiang1" @click="emailRetrieve()"><span id="youxiang2">邮箱找回</span></button>
          <button id="shouji1" @click="phoneRetrieve()"><span id="shouji2">手机找回</span></button>
          <input v-if="showEmail" v-model="email" type="text" placeholder="邮箱" onfocus="this.placeholder=''" onblur="this.placeholder='邮箱'">
          <input v-if="showPhone" v-model="phone" type="text" placeholder="手机号" onfocus="this.placeholder=''" onblur="this.placeholder='手机号'"> 
          <div class="correct">
            <span v-show="remail">请填写正确的邮箱</span>
            <span v-show="rphone">请填写正确的手机号</span>
          </div>
          <input v-model="code" type="text" placeholder="验证码" onfocus="this.placeholder=''" onblur="this.placeholder='验证码'">
          <button id="email" :disabled="isAble" @keyup.13="sendEmail" v-if="showEmail" @click="sendEmail()" :plain="true"><span v-show='show'>发送验证邮件</span><span v-show='!show'>{{count}}</span></button>
          <button id="phone" :disabled="isAble" @keyup.13="sendPhone" v-if="showPhone" @click="sendPhone()" :plain="true"><span v-show='show'>发送验证码</span><span v-show='!show'>{{count}}</span></button>
          <div class="codeR1"><span v-show="codeR">验证码输入错误</span></div>
          <button @keyup.13="next" @click="next()"><span>下一步</span></button>
          <div class="fast" style="text-align: center">
            <span @click="toSignin()">密码登录</span><span @click="toSignup()">注册</span>
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
    return {title: 'SangerBox忘记密码'} // set a title
  },
  data() {
    return {
      showEmail:true,
      showPhone:false,
      phone:'',
      email:'',
      remail:false,
      rphone:false,
      code:"",
      codeR:false,
      show:true,
      isAble:false,
      count:''
    }
  },
  components:{
    Header,Footer1
  },
  
  mounted() {

  },
  methods: {
    toSignin(){
      this.$router.push({path:'/Signin'})
    },
    toSignup(){
      this.$router.push({path:'/Signup'})
    },
    emailRetrieve(){
      this.codeR=false;
      this.phone="";
      this.email="";
      this.showEmail=true;
      this.showPhone=false;
      this.remail=false;
      this.rphone=false;
      document.getElementById('youxiang1').style.background= '#477CFE'
      document.getElementById('youxiang2').style.color= '#fff'
      document.getElementById('shouji1').style.background= '#DDDDDD'
      document.getElementById('shouji2').style.color= '#000'

    },
    phoneRetrieve(){
      this.codeR=false;
      this.remail=false;
      this.rphone=false;
      this.phone="";
      this.email="";
      this.showEmail=false;
      this.showPhone=true;
      document.getElementById('youxiang1').style.background= '#DDDDDD'
      document.getElementById('youxiang2').style.color= '#000'
      document.getElementById('shouji1').style.background= '#477CFE'
      document.getElementById('shouji2').style.color= '#fff'
    },
    next(){
      var qs=require('qs');
      this.axios.post(
        "/user/enterSetPassword",
        qs.stringify({
          'email':this.email,
          'mobile':this.phone,
          "code":this.code
        })
        ).then(res =>{
          if(res.data.resp_code==0){
            this.$router.push({
              path:"Modify",
              query: {
                "phone":this.phone,
                "email":this.email,
                "code":this.code
              }
            })
          }else{
            this.codeR=true
          }
        }
      )
    },
    sendEmail(){
      //验证邮箱格式是否正确
      if (!(/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(this.email))) {
        this.codeR=false
        this.remail=true
        this.rphone=false
      } else if (this.email == "" || !this.email) {
        this.codeR=false
        this.remail=true
        this.rphone=false
      } else{
        this.codeR=false
        this.remail=false
        this.rphone=false
        var qs=require('qs');
        this.axios.post(
          "/user/isUser",
          qs.stringify({
            "user":this.email
          })
          ).then(res =>{
            // console.log(res.data)
            if(res.data.resp_code==0){
              const TIME_COUNT = 120;
              if (!this.timer) {
                this.count = TIME_COUNT;
                this.show = false;
                //使得按钮不可用
                this.isAble=true
                document.getElementById('email').style.cursor = 'not-allowed'
                this.timer = setInterval(() => {
                if (this.count > 0 && this.count <= TIME_COUNT) {
                  this.count--;
                } else {
                  this.show = true;
                  //按钮可用
                  //清楚计时器
                  this.isAble=false
                  document.getElementById('email').style.cursor = 'pointer'
                  clearInterval(this.timer);
                  this.timer = null;
                  }
                }, 1000)
              }
              this.axios.post(
                "/user/getEmailCode",
                qs.stringify({
                  'email':this.email
                })
                ).then(res =>{
                  // console.log(res.data)
                }
              )
            }else{
              this.$message({
                message: '用户不存在',
                type: 'warning'
              });
            }
          }
        )
        
      }
    },
    sendPhone(){
      //验证电话号码格式是否正确
      if (!(/^1[3456789]\d{9}$/.test(this.phone))) {
        this.codeR=false
        this.rphone=true
        this.remail=false
      } else if (this.phone == "" || !this.phone) {
        //验证是否为空
        this.codeR=false
        this.rphone=true
        this.remail=false
      } else{
        this.codeR=false
        this.rphone=false
        this.remail=false
        var qs=require('qs');
        this.axios.post(
          "/user/isUser",
          qs.stringify({
            "user":this.phone
          })
          ).then(res =>{
            // console.log(res.data)
            if(res.data.resp_code==0){
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
            }else{
              this.$message({
                message: '用户不存在',
                type: 'warning'
              });
            }
          }
        )
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
  .content>div>img{
    margin-top: 60px;
  }
  .ForgetPwd{
    width: 350px;
    background: #fff;
    padding: 35px;
    margin: 0 auto;
    border-radius: 4px;
  }
  .ForgetPwd>p:first-child{
    font-size:26px;
    font-family:Source Han Sans CN;
    font-weight:bold;
    color:rgba(51,51,51,1);
    text-align: left;
  }
  .ForgetPwd>p:nth-child(2){
    font-size:26px;
    font-family:Source Han Sans CN;
    font-weight:bold;
    color:rgba(51,51,51,1);
    text-align: left;
    margin-bottom: 30px;
  }
  input{
    height: 30px;
    border: none;
    border-bottom: 2px solid #999999;
    font-size:14px;
    font-family:Source Han Sans CN;
    color:#333;
    margin-top: 30px;
    outline: none;
  }
  .ForgetPwd>input:nth-child(5){
    width: 100%;
    margin-bottom: 0;
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
  .ForgetPwd>button:nth-child(3){
    width: 30%;
    height:30px;
    background:#477CFE;
    text-align: center;
    border: none;
    cursor: pointer;
    margin-right: 4%;
    outline: none;
  }
  .ForgetPwd>button:nth-child(3)>span{
    font-size:14px;
    font-family:Source Han Sans CN;
    font-weight:400;
    color:rgba(255,255,255,1);
  }
  .ForgetPwd>button:nth-child(4){
    width: 30%;
    height:30px;
    background:#ddd;
    text-align: center;
    border: none;
    cursor: pointer;
    outline: none;
  }
  .ForgetPwd>button:nth-child(4)>span{
    font-size:14px;
    font-family:Source Han Sans CN;
    font-weight:400; 
  }
  .ForgetPwd>input:nth-child(7){
    width: 50%;
    margin-top:0 ;
  }
  .ForgetPwd>button:nth-child(8){
    width: 50%;
    height:30px;
    background:#477CFE;
    text-align: center;
    border: none;
    cursor: pointer;
    outline: none;
  }
  .ForgetPwd>button:nth-child(8)>span{
    font-size:14px;
    font-family:Source Han Sans CN;
    font-weight:400;
    color:rgba(255,255,255,1);  
  }
  .correct{
    margin-top: 10px;
    margin-bottom: 10px;
    text-align: left;
    color: red;
    height: 15px;
    font-size: 12px;
  }
  .codeR1{
    margin-top: 10px;
    margin-bottom: 10px;
    text-align: left;
    color: red;
    height: 15px;
    font-size: 12px;
  }
  .ForgetPwd>button:nth-child(10){
    width: 100%;
    height:40px;
    background:#477CFE;
    text-align: center;
    border: none;
    cursor: pointer;
    outline: none;
  }
  .ForgetPwd>button:nth-child(10)>span{
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