<template>
  <div>
    <Header></Header>
    <div class="contentAll ">
      <div class="content row">
        <div class="col-md-7">
          <img src="../../public/img/bg.png" alt="">
        </div>
        <div class="Modify col-md-5">
          <p>云 账 户</p>
          <p>更 改 密 码</p>
          <input v-model="gpwd" type="password" placeholder="更改密码" onfocus="this.placeholder=''" onblur="this.placeholder='更改密码'">
          <input v-model="qpwd" type="password" placeholder="确认密码" onfocus="this.placeholder=''" onblur="this.placeholder='确认密码'">
          <div class="pwdR"><span v-show="pwdR">两次密码不一致</span></div>
          <button @click="determine()" :plain="true"><span>确定</span></button>
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
    return {title: 'SangerBox修改密码'} // set a title
  },
  data() {
    return {
      gpwd:'',
      qpwd:'',
      phone:'',
      email:'',
      pwdR:false,
      code:''
    }
  },
  components:{
    Header,Footer1
  },
  mounted() {

  },
  created() {
    this.getRouterData(),
    this.pwdR=false
  },
  methods: {
    getRouterData() {
      this.phone = this.$route.query.phone
      this.email = this.$route.query.email
      this.code = this.$route.query.code
    },
    determine(){
      if(this.gpwd!=this.qpwd){
        this.pwdR=true
      }else if(this.gpwd=="" && this.qpwd==""){
        this.pwdR=true
      }else{
        this.pwdR=false
        var qs=require('qs');
        this.axios.post(
        "/user/resetPassword",
        qs.stringify({
          'email':this.email,
          'mobile':this.phone,
          "password":this.gpwd,
          "code":this.code
        })
        ).then(res =>{
          // console.log(res.data)
          if(res.data.resp_code==0){
            this.$message({
              message: '修改成功',
              type: 'success'
            });
            this.$router.push({path:"Signin"})
          }
        }
      )
      }
    }
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
  .content>div>img{
    margin-top: 60px;
  }
  .Modify{
    width: 350px;
    background: #fff;
    padding: 35px;
    margin: 0 auto;
    border-radius: 4px;
  }
  .Modify>p:first-child{
    font-size:26px;
    font-family:Source Han Sans CN;
    font-weight:bold;
    color:rgba(51,51,51,1);
    text-align: left;
  }
  .Modify>p:nth-child(2){
    font-size:26px;
    font-family:Source Han Sans CN;
    font-weight:bold;
    color:rgba(51,51,51,1);
    text-align: left;
    margin-bottom: 30px;
  }
  input{
    width: 100%;
    height: 30px;
    border: none;
    border-bottom: 2px solid #999999;
    font-size:14px;
    font-family:Source Han Sans CN;
    color:#333;
    margin-top: 30px;
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
  .pwdR{
    margin-top: 10px;
    margin-bottom: 10px;
    text-align: left;
    color: red;
    height: 15px;
    font-size: 12px;
  }
  .Modify>button:nth-child(6){
    width: 100%;
    height:30px;
    background:linear-gradient(180deg,rgba(71,124,254,1),rgba(57,85,255,1));
    text-align: center;
    border: none;
    cursor: pointer;
    margin-right: 4%;
    outline: none;
  }
  .Modify>button:nth-child(6)>span{
    font-size:14px;
    font-family:Source Han Sans CN;
    font-weight:400;
    color:rgba(255,255,255,1);
  }
</style>