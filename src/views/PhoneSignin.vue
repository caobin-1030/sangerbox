<template>
  <div>
    <Header></Header>
    <div class="contentAll ">
      <div class="content row">
        <div class="col-md-7">
          <img src="../../public/img/bg.png" alt="">
        </div>
        <div class="PhoneSignin col-md-5">
          <p>云 平 台</p>
          <p>账 户 信 息 登 录</p>
          <input v-model="phone" type="text" placeholder="手机号" onfocus="this.placeholder=''" onblur="this.placeholder='手机号'">
          <div class="tPhone"><span v-show="show1">手机号格式不正确</span></div>
          <input v-model="code" type="text" placeholder="短信验证码" onfocus="this.placeholder=''" onblur="this.placeholder='短信验证码'">
          <button id="phone" :disabled="isAble" @click="getCode()"><span v-show='show'>获 取 短 信 验 证 码</span><span v-show='!show'>{{count}}</span></button>
          <div class="tCode"><span v-show="show3">验证码不正确</span></div>
          <div class="fast">
            <span @click="toSignin()">密码登录</span><span @click="toSignup()">注册</span>
          </div>
          <button @click="login()" :plain="true"><span>登 录</span></button>
          
          
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
    return {title: 'SangerBox手机号登录'} // set a title
  },
  data() {
    return {
      phone:'',
      code:'',
      show:true,
      count:'',
      show1:false,
      show3:false,
      isAble:false
    }
  },
  components:{
    Header,Footer1
  },
  
  mounted() {

  },
  methods: {
    toSignin(){
      //跳转到登录页
      this.$router.push({path:'/Signin'})
    },
    toSignup(){
      //跳转到登录页
      this.$router.push({path:'/Signup'})
    },
    getCode(){
      if (!(/^1[3456789]\d{9}$/.test(this.phone))) {
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
            if(res.data.resp_code==0){
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
                }
              )
            }else if(res.data.resp_code==1){
              this.$message({
                message: '用户不存在',
                type: 'warning'
              });
            }
          }
        )
      }  
    },
    login(){
      //验证电话号码格式是否正确
      if (!(/^1[3456789]\d{9}$/.test(this.phone))) {
        this.show1=true
      } else if (this.phone == "" || !this.phone) {
        //判断电话号码或输入的是否为空
        this.show1=true
      } else{
        this.show1=false
        var qs=require('qs');
        this.axios.post(
          "/user/mobileLogin",
          qs.stringify({
            "mobile":this.phone,
            "code":this.code
          })
        ).then(res =>{
          let uname=res.data.datas.username;
          localStorage.setItem('mobile', this.phone);
          localStorage.setItem("uname",uname);
          let isVip=res.data.datas.isVip;
          localStorage.setItem("isvip",isVip);
          // console.log(res.data.resp_code)
          if(res.data.resp_code==0){
            this.$message({
              message: '登录成功',
              type: 'success'
            });
            this.$router.push({path:"/Index"});
            this.show3=false
          }else{
            this.show3=true
          }
        });
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
    margin-top: 60px;
  }
  .PhoneSignin{
    width: 350px;
    background: #fff;
    padding: 35px;
    margin: 0 auto;
    border-radius: 4px;
  }
  .PhoneSignin>p:first-child{
    font-size:26px;
    font-family:Source Han Sans CN;
    font-weight:bold;
    color:rgba(51,51,51,1);
    text-align: left;
  }
  .PhoneSignin>p:nth-child(2){
    font-size:26px;
    font-family:Source Han Sans CN;
    font-weight:bold;
    color:rgba(51,51,51,1);
    text-align: left;
    margin-bottom: 30px;
  }
  .PhoneSignin>input:nth-child(3){
    margin: 0;
  }
  .tPhone{
    margin-top: 10px;
    margin-bottom: 10px;
    text-align: left;
    color: red;
    height: 15px;
    font-size: 12px;
  }
  .PhoneSignin>input:nth-child(5){
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
    font-size:14px;
    font-family:Source Han Sans CN;
    color:#333;
    margin-bottom: 30px;
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
  .PhoneSignin>input:nth-child(5){
    width: 50%;
  }
  .PhoneSignin>button:nth-child(6){
    width: 50%;
    height:30px;
    background:linear-gradient(180deg,rgba(71,124,254,1),rgba(57,85,255,1));
    text-align: center;
    border: none;
    cursor: pointer;
  }
  .PhoneSignin>button:nth-child(6)>span{
    font-size:14px;
    font-family:Source Han Sans CN;
    font-weight:400;
    color:rgba(255,255,255,1);
  }
  .PhoneSignin>button:last-child{
    margin-top: 30px;
    width:100%;
    height:36px;
    background:linear-gradient(180deg,rgba(71,124,254,1),rgba(57,85,255,1));
    border-radius:4px;
    text-align: center;
    border: none;
    cursor: pointer;
  }
  .PhoneSignin>button:last-child>span{
    font-size:14px;
    font-family:Source Han Sans CN;
    font-weight:400;
    color:rgba(255,255,255,1);
  }
  .fast{
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
  .fast>span:last-child{
    color: rgba(207,71,71,1);
    font-weight: 400;
  }
</style>