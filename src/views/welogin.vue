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
          <p>手 机 号 绑 定</p>
          <input v-model="phone" type="text" placeholder="请输入手机号" onfocus="this.placeholder=''" onblur="this.placeholder='请输入手机号'">
          <p class="tPhone"><span v-show="show1">手机号格式不正确</span></p>
          <div>
            <input @keyup.13="login" v-model="code" placeholder="请输入验证码" onfocus="this.placeholder=''" onblur="this.placeholder='请输入验证码'">
            <button id="phone" :disabled="isAble" @click="SendPhone()" type="primary"><span v-show='show'>发送验证码</span><span v-show='!show'>{{count}}</span></button>
          </div>
          <button class="bangding" @click="Bind()" type="primary">绑定</button>
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
    return {title:'SangerBox 微信登录'} // set a title
  },
  data() {
    return {
      phone:'',
      count:'',
      code:'',
      isAble:false,
      show:true,
      show1:false,
      uid:''
    }
  },
  components:{
    Header,Footer1
  },
  created(){
    var a=window.location.href
    console.log(a)
    if(a.split('?')[1].split('=')[0]!="uid"){
      this.$axios.defaults.headers.common["Authorization"] = a.split('?')[1].split('=')[1]
      this.$axios.get(`/user/getUserInfo`,).then(res=>{
        if(res.data.datas!=null){
          let mobile=res.data.datas.mobile;
          let uname=res.data.datas.username;
          localStorage.setItem('mobile', mobile);
          localStorage.setItem("uname",uname);
        }
        if(res.status!=200){
          this.$message.error('登录失败');
        }
        if(res.data.resp_code==0){
          this.$message({
            message: '登录成功',
            type: 'success'
          });
          if(localStorage.getItem('href')==null){
            window.location.href='/Index';
          }else{
            window.location.href=localStorage.getItem('href');
          }
        }
      })
    }else{
      this.uid=a.split('?')[1].split('=')[1]
    }
    
  },
  mounted(){
    
  },
  methods: {
    SendPhone(){
      if (!(/^1[03456789]\d{9}$/.test(this.phone))) {
        this.show1=true
      } else if (this.phone == "" || !this.phone) {
        this.show1=true          
      }else{
        this.show1=false
        var qs=require('qs');
        this.axios.post("/user/getSms", qs.stringify({
          'mobile':this.phone
        })
        ).then(res =>{
          // console.log(res.data)
        })
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
      }  
    },
    Bind(){
      var qs=require('qs');
      this.axios.post("/user/addMobile", qs.stringify({
        mobile:this.phone,
        uid:this.uid,
        code:this.code
      })
      ).then(res =>{
        if(res.data.datas!=null){
          let uname=res.data.datas.username;
          localStorage.setItem('mobile', this.phone);
          localStorage.setItem("uname",uname);
          let isVip=res.data.datas.isVip;
          localStorage.setItem("isvip",isVip);
        }
        if(res.status!=200){
          this.$message.error('绑定失败');
          setTimeout(function(){window.location.href='/WechatSignin';},3000)
        }
        if(res.data.resp_code==0){
          this.$message({
            message: '绑定成功',
            type: 'success'
          });
          if(localStorage.getItem('href')==null){
            window.location.href='/Index';
          }else{
            window.location.href=localStorage.getItem('href');
          }
        }
      })
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
    margin-top: 30px;
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
  .Login>div>input{
    
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
  .Login>div{
    display: flex;
    margin-top: 30px;
    margin-bottom: 30px;
    flex-direction: row;
    justify-content: space-between;;
  }
  .Login>div>button{
    width: 120px;
    height: 30px;
    line-height: 30px;
    padding: 0 10px;
    background: #3955ff;
    border-radius: 4px;
    text-align: center;
    border: none;
    cursor: pointer;
    color: #fff;
    font-size: 12px;
  }
  .Login>div>button:hover{
    background: #477cfe;
  }
  .bangding{
    width: 100%;
    height: 36px;
    background:#3955ff;
    border-radius: 4px;
    text-align: center;
    border: none;
    cursor: pointer;
    color: #fff;
    font-size: 14px;
  }
  .bangding:hover{
    background: #477cfe;
  }
  .tPhone{
    margin-top: 3px;
    margin-bottom: 2px;
    text-align: left;
    color: red;
    height: 15px;
    font-size: 12px;
  }
</style>