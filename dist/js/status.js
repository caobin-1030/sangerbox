import axios from 'axios'
import './TCaptcha.js'
import {
  Message,
  MessageBox
} from 'element-ui'
import store from '../../src/store/index'
var url = "calculate.mysci.online";
 $.ajax({
  type : "GET",
  async : false,
  timeout: 5000,
  url : 'http://'+url+":9000/A",
  error : function() {
   $.ajax({
    type : "GET",
    async : false,
    url : "http://admin.sangerbox.com/getIp",
    success: function(data) {
     if (data != null && data.length > 0) {
      url = data;
     }
    }
   });
  }
 });
 axios.defaults.baseURL = 'http://'+url+":9000";
var aut= localStorage.getItem("authorization")
if(aut==null){
  axios.defaults.headers.common["Authorization"] = ''
}else{
  axios.defaults.headers.common["Authorization"] = aut.toString()
}

let mobile=localStorage.getItem("mobile");
if(mobile==null){
  localStorage.clear();
}
let pending = []; //声明一个数组用于存储每个请求的取消函数和axios标识
let cancelToken = axios.CancelToken;
let removePending = (config) => {
 for(let p in pending){
  if(pending[p].u === config.url + '&' + config.method) { //当当前请求在数组中存在时执行函数体
   pending[p].f(); //执行取消操作
   pending.splice(p, 1); 
  }
 }
}
// http请求拦截器
axios.interceptors.request.use(config => {
 
  removePending(config); //在一个axios发送前执行一下取消操作
  config.cancelToken = new cancelToken((c)=>{
   // 这里的axios标识我是用请求地址&请求方式拼接的字符串，当然你可以选择其他的一些方式
   pending.push({ u: config.url + '&' + config.method, f: c }); 
  });
   
  return Promise.resolve(config)
 }, error => {
  return Promise.reject(error)
 })
axios.interceptors.response.use(
  response => {
    removePending(response.config); //在一个axios响应后再执行一下取消操作，把已经完成的请求从pending中移除
    var Authorization=response.headers.authorization;
    if(Authorization!=undefined){
      localStorage.setItem('authorization', Authorization);
    }
    aut= localStorage.getItem('authorization');
    if(aut==null){
      axios.defaults.headers.common["Authorization"] = ''
    }else{
      axios.defaults.headers.common["Authorization"] = aut.toString()
    }
    return response
  },
  error => {
  if (error && error.response) {
  axios.defaults.baseURL = 'http://sangerbox.com';
  switch (error.response.status) {
  case 401:
    localStorage.setItem('href', window.location.href);
    window.location.href='/Signin';
  break;
  case 428: 
  function submitFormWithCaptcha() {
    var captcha = new TencentCaptcha('2081219061', function (res) {
    if (res.ret === 0) {
      $.post("http://calculate.mysci.online:9000/deleteHostAddr?randstr="+res.randstr+"&ticket="+res.ticket,function(data) {
        if(data.status==200 && data.res.response==1){
          $(".Search").click();
        }
      }, "json");
    }
    });
    captcha.show(); 
  }
  submitFormWithCaptcha()
  break;
  case 429: Message({message: '访问频繁,请稍后再试',type: 'warning'}) ; break;
  case 403: 
  window.location.href='/Blacklist'; break;
  case 500:
    // Message({message: '连接服务器失败',type: 'warning'}) ;
    break;
  case 503:
    Message({message: '服务器正在维修状态',type: 'warning'}) ;
    break;
  }
  
  }else{
    // Message({message: '连接服务器失败',type: 'warning'}) 
  }
  return Promise.reject(error)
  }
  )
  var client = null;
  function web(phone){ 
       if(typeof(WebSocket)== 'undefined'){
         Message({message: '浏览器不支持webscoket，请使用更高版本的浏览器，不然部分功能无法使用',type: 'warning'}) ;
         return
       }
       if( typeof(phone)=='undefined' || phone==null){
  //        Message({message: '请登录',type: 'warning'}) ;
         return
       }
       var ws = new WebSocket(`ws://${url}:15674/ws`);
       client = Stomp.over(ws);
       client.heartbeat.incoming = 0;
       var on_connect = function() {
        client.subscribe(`/exchange/rabbitmqTackWeb/${phone}`, function(data) {
          console.log(data)
              var msg = data.body;
              var a=msg.split(";")
              Message({message: `${a.length==1?msg:a[1]}`,type: 'success'}) ;
              if(a[0]==200 && a[2]!='email'){
                store.commit("adddown")
              }else if(a[0]=='提交成功'){
              }else if(a[2]=='email'){
                store.commit("zhanneiadddown")
              }
            });
       };
       var on_error =  function() {
        if(url!='calculate.mysci.online'){
          Message({message: '连接丢失，请等待10秒刷新页面',type: 'warning'}) ;
        }
       };
       client.connect('web', 'web', on_connect, on_error, '/');
     }
  
  function aaa(){
      if(client!==null){
                client.disconnect(function() {});
              }
  
  }
        window.onbeforeunload = function() {
         if(client!==null){
           client.disconnect(function() {});
         }
        }
   function geturl(){
     return 'http://'+url+":9000"
   }
   export {
    web,aaa,geturl
  }