<template>
  <div style="background:#E7EDF9">
    <div v-if="mess" class="mess"><img src="../../public/img/msg.png" alt=""><span>正在导出</span></div>
    <Header></Header>
    <div class="tankuang" v-if="tankuang" @click="downDiscuoption()" id="tankuang">
      <div @click.stop="settingEvent()" class="zhifu1">
        <div>
          <img src="../../public/img/zhifu.png" alt="">
          <div class="zhifuInfo">
            <p>{{title}}</p>
            <div >
              <p>{{desc}}</p>
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
            <p>￥{{money1}}<span v-if="yuanjia!=money1" style="font-size:16px;text-decoration:line-through">{{yuanjia != money1 ? yuanjia : ''}}</span></p>
          </div>
          <img v-if="money1!=0" :src="payimg"  style="width:270px;border:1px solid #dcdcdc" alt="">
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
    <div class="All">
      <div>
        <div style="position: relative;height:50px;margin-top:20px">
          <p class="username" :style="titlewidth">{{title}}</p>
        </div>
        <div class="Video">
          <video id="video" width="888px" :poster="image" height="500px" controls></video>
          <div class="noatuo" v-show="show && type!='工具'">
            <p><i class="el-icon-warning-outline"></i>该课程在购买并参加课程后才能观看</p>
            <p><span style="font-size:24px">￥{{memberType =='4' ? (money*discount).toFixed(2) : money}}</span><el-button type="primary" @click="buyVideo()">购买</el-button></p>
          </div>
          <div class="noatuo" v-show="show && type=='工具'">
            <p><i class="el-icon-warning-outline"></i>您可以选择购买本网站的无忧高级版会员免费观看 <br><span>或进行系列的单独购买</span></p>
            
            <p style="margin-bottom:10px"><span style="font-size:24px;">￥{{money}}</span></p>
            <p><el-button type="primary" @click="buyVideo()">购买视频</el-button><el-button type="primary" @click="buyVideovip()">购买会员</el-button></p>
          </div>
        </div>
        <!-- <div class="VideoInfo">
          <div class="label">
            <div>
              <img src="../../public/img/logo6.png" style="width:48px;height:48px" alt="">
              <p>{{userName}}</p>
            </div>
            <el-button size="small" v-if="hasZip!=0" style="height:34px" @click="downVideoZip" type="primary">下载附件</el-button>
          </div>
            
          
          <div class="info">
            <p>{{title}}</p>
            <p>{{desc}}</p>
          </div>
        </div> -->
        <div class="comment">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="课程简介" name="introduction">
              <div class="introd">
                <img @click="toEdit1" v-if="phone=='13777421877' || phone=='13456826965' || phone=='17515026342'" src="../../public/img/edit.png" alt="">
                <div v-html="videodesc"></div>
              </div>
            </el-tab-pane>
            <!-- <el-tab-pane label="笔记" name="note">笔记</el-tab-pane> -->
            <el-tab-pane label="评论" name="comment">
              <p style="font-size: 18px;color: #333;margin-bottom: 20px;">评论区 ({{videoCommentList.length!=undefined ? videoCommentList.length : 0}}) :</p>
              <div class="comment1">
                <img src="../../public/img/logo6.png" style="width:48px;height:48px" alt="">
                <el-input v-model="input" placeholder="请自觉遵守互联网相关的政策法规,严禁发布色情、暴力、反动的言论。"></el-input>
                <el-button type="primary" :disabled='show' @click="Comment">发表</el-button>
              </div>
              <div class="comment2" v-for="(item,i) of videoCommentList" :key="i">
                <div>
                  <div>
                    <div><img src="../../public/img/logo6.png" style="width:48px;height:48px" alt=""></div>
                    <div>
                      <p>{{item.userInfo.userName}}</p>
                      <p>{{item.content}}</p>
                    </div>
                  </div>
                  <div style="width:100px">
                    <p>{{item.createTime}}</p>
                    <p style="text-align:right;"><span style="color:#3366cc;cursor: pointer;" @click="Reply(i,item)" v-show="item.isReply==1">回复</span></p>
                  </div>
                </div>
                <div v-for="(comm,x) of item.videoReplyList.slice(0,3)" :key="x" class="comment10">
                  <div>
                    <div style="line-height:48px"><img src="../../public/img/logo6.png" style="width:36px;height:36px;" alt=""></div>
                    <div>
                      <p>{{comm.fromUserInfo.userName}} 回复 {{comm.toUserInfo.userName}}</p>
                      <p>{{comm.content}}</p>
                    </div>
                  </div>
                  <div>
                    <p>{{comm.createTime}}</p>
                    <p style="text-align:right;"><span style="color:#3366cc;cursor: pointer;" @click="Reply(i,comm)" v-show="comm.isReply==1">回复</span></p>
                  </div>
                </div>
                <p style="margin-left:63px;margin-bottom:10px" v-if="item.videoReplyList.length>3"><span v-if="chakan1!=i">共{{item.videoReplyList.length}}条回复， <span style="color:#3366cc;cursor: pointer;" @click="chakan(i)">点击查看</span></span></p>
                <div v-for="comm of item.videoReplyList.length>3?item.videoReplyList.slice(3,item.videoReplyList.length):''" :key="comm.id" v-show="chankangenduo==i" class="comment10">
                  <div>
                    <div style="line-height:48px"><img src="../../public/img/logo6.png" style="width:36px;height:36px;" alt=""></div>
                    <div>
                      <p>{{comm.fromUserInfo.userName}} 回复 {{comm.toUserInfo.userName}}</p>
                      <p>{{comm.content}}</p>
                    </div>
                  </div>
                  <div>
                    <p>{{comm.createTime}}</p>
                    <p style="text-align:right;"><span style="color:#3366cc;cursor: pointer;" @click="Reply(i,comm)" v-show="comm.isReply==1">回复</span></p>
                  </div>
                </div>
                <div class="reply" :class="[shows==i?'active1':'']">
                  <div>
                    <img src="../../public/img/logo6.png" style="width:48px;height:48px" alt="">
                    <el-input v-model="replyInput" :placeholder="replyPlaceholder"></el-input>
                    <el-button type="primary" :disabled='show' @click="Comment1">回复</el-button>
                  </div>
                </div>
              </div>
            </el-tab-pane>
            <!-- <el-tab-pane label="讨论" name="discuss">讨论</el-tab-pane> -->
          </el-tabs>
          
        </div>
      </div>
      <div>
        <div class="synopsis">
          <p>视频简介</p>
          <p>{{desc}}</p>
          <div class="label">
            <div>
              <img src="../../public/img/logo6.png" style="width:32px;height:32px" alt="">
              <p>{{userName}}</p>
            </div>
            <el-button size="small" v-if="hasZip!=0" :disabled="show" style="height:34px;background:#3366cc;border-color:#3366cc" @click="downVideoZip" type="primary">下载附件</el-button>
          </div>
        </div>
        <div class="Recommend1" v-if="totalVideoList.length>0">
          <div>
            <p>视频选集</p>
            <div class="shipinxanji">
              <ul>
                <li v-for="(item,i) of totalVideoList" :key="i" :class="{active:i==ins}" @click="toVideoInfo1(item.id,i)">
                  <p ><i class="el-icon-caret-right" style="color:#3366cc;font-size:18px;margin-right:5px" v-if="i==ins"></i>{{item.title}}</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="Recommend" v-if="videoTypeList.length>0">
          <p>相关推荐</p>
          <div v-for="(item,i) of videoTypeList" :key="i" @click="toVideoInfo(item.id)">
            <img :src="item.image" :title="item.title" style="width:250px;height:150px" alt="">
            <!-- <div>
              <p>{{item.title}}</p>
              <p>{{item.desc}}</p>
            </div> -->
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
import Hls from 'hls.js';
import { pako_ungzip } from '../../public/js/indexof'
import { geturl } from '../../public/js/status'
export default {
  metaInfo() {
    return {title: this.title} // set a title
  },
  data() {
    return {
      input:'',id:'',title:'',type:'',desc:'',createTime:'',image:'',money:'',show:false,videoCommentList:[],videoTypeList:[],totalVideoList:[],ins:0,
      tankuang:false,payimg:'',moren:'无可用优惠券',keyong:true,money1:'',userName:'',shoppingId:'',mess:false,
      value:'',options:[],replyPlaceholder:'请自觉遵守互联网相关的政策法规,严禁发布色情、暴力、反动的言论。',replyInput:'',shows:null,rep:null,chankangenduo:false,
      chakan1:true,hasZip:0,activeName:'introduction',titlewidth:'',videodesc:null,phone:null,yuanjia:'',discount:'',memberType:''
    }
  },
  components:{
    Header,Footer
  },
  created(){
    
    
  },
  watch: {
  },
  mounted(){
    this.phone=localStorage.getItem("mobile")
    this.id=this.$route.query.id
    this.getVideoInfo()
    this.getStream()
    this.axios.get(`/video/getVideoDesc`,{
      params:{id:this.id}
    }).then(result=>{
      if(result.data.res.desc!=undefined && result.data.res.desc!=null){
        this.videodesc=result.data.res.desc
      }
    })
  },
  methods: {
    buyVideovip(){
      const {href} =this.$router.resolve({
        path: '/Personal',query:{type:'vip'}
      })
      window.open(href, '_blank')
    },
    handleClick(tab, event) {
      if(tab.name == 'introduction'){
        this.axios.get(`/video/getVideoDesc`,{
          params:{id:this.id}
        }).then(result=>{
          if(result.data.res.desc!=undefined && result.data.res.desc!=null){
            this.videodesc=result.data.res.desc
          }
        })
      }
    },
    toEdit1(){
      const {href} =this.$router.resolve({
        path: '/Edit',
        query:{
          id:this.id,
          type:'video',
        },
      })
      window.open(href, '_blank')
    },
    downVideoZip(){
      this.mess=true
      var xhr = new XMLHttpRequest();
      xhr.open('get', `${geturl()}/video/downVideoZip?id=${this.id}`);    //也可以使用POST方式，根据接口
      xhr.setRequestHeader("Authorization",`${localStorage.getItem('authorization')}`);
      xhr.responseType = "blob";   //返回类型blob
      xhr.onload = (e)=> {
        //定义请求完成的处理函数
        if (e.target.status === 200) {
          var blob = e.target.response;
          var url1 = URL.createObjectURL(blob);
          var a = document.createElement('a');
          a.href = url1;
          a.download='enclosure.zip';
          a.click();
          //释放之前创建的URL对象
          window.URL.revokeObjectURL(url1);
          this.mess=false
        }
      };
      xhr.send(null);
    },
    chakan(i){
      this.chankangenduo=i
      this.chakan1=i

    },
    Reply(i,item){
      this.replyInput=''
      this.shows=i
      this.replyPlaceholder=`回复：${item.userInfo!=undefined?item.userInfo.userName:item.fromUserInfo.userName}`
      this.rep=item
    },
    Comment1(){
      if(this.replyInput!=''){
        var qs=require('qs');
        this.axios.post(`/video/addUserVideoReply`, qs.stringify({
          commentId:this.rep.commentId!=undefined?this.rep.commentId:this.rep.id,
          replyId:this.rep.id,
          videoId:this.id,
          content:this.replyInput,
          toUid:this.rep.userInfo!=undefined?this.rep.userInfo.id:this.rep.fromUserInfo.id
        })).then(result=>{
          if(result.data.status==200){
            if(result.data.res.content>0){
              this.getVideoInfo()
              this.shows=null
              this.$message({
                message: '评论成功',
                type: 'success'
              });
            }else{
              this.$message({
                message: '评论失败',
                type: 'warning'
              });
            }
          }else if(result.data.status==500){
            this.$message({
              message: result.data.message,
              type: 'warning'
            });
          }
          
        })
      }else{
        this.$message({
          message: '评论不能为空',
          type: 'warning'
        });
      }
    },
    quanChange(){
      this.shuaxin()
    },
    paySuccess(){
      if(this.money1 == 0){
        var qs=require('qs');
        this.axios.post(`/pay/getPayResult`, qs.stringify({
          goodId:this.shoppingId,
          couponId:this.value
        })).then(result=>{
          if(result.data.code==0){
            this.tankuang=false
            history.go(0)
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
          goodId:this.shoppingId,
          couponId:this.value}
      }).then(result=>{
        if(result.data.data!=null && result.data.data!=undefined){
          this.payimg='data:image/png;base64,'+result.data.data.img
          this.OrderId=result.data.data.orderNo
          this.yuanjia=result.data.data.yuanjia
          this.money1=result.data.data.mount
        }
      })
    },
    settingEvent(){},
    downDiscuoption(){
      this.tankuang=false
    },
    buyVideo(){
      this.value=''
      this.moren='无可用优惠券'
      this.axios.get(`/pay/getPayInfo`,{
        params:{
          goodId:this.shoppingId,
          couponId:this.value}
      }).then(result=>{
        if(result.data.data!=null && result.data.data!=undefined){
          this.payimg='data:image/png;base64,'+result.data.data.img
          this.tankuang=true
          this.OrderId=result.data.data.orderNo
          this.yuanjia=result.data.data.yuanjia
          this.money1=result.data.data.mount
          this.axios.get('/pay/getCouponInfo').then(result=>{
            if(result.data.data!=null){
              if(result.data.data.length>0){
                this.keyong=false
                var cc=result.data.data
                var bbb=[]
                for(var aa of cc){
                  var cc={}
                  cc.value=aa.couponId
                  cc.label=aa.couponName
                  if(aa.useRule==2){
                    cc.disabled=true
                  }
                  bbb.push(cc)
                }
                this.options=bbb
                this.moren='请选择优惠券'
              }else{
                this.keyong=true
              }
            }
          })
        }
      })
    },
    toVideoInfo(id){
      const {href}=this.$router.resolve({
        path: '/VideoInfo',
        query:{
          id:id
        }
      })
      window.open(href,'_self')
    },
    toVideoInfo1(id,i){
      this.ins=i
      const {href}=this.$router.resolve({
        path: '/VideoInfo',
        query:{
          id:id
        }
      })
      this.id=id
      this.getVideoInfo()
      this.getStream()
    },
    getVideoInfo(){
      this.axios.get('/video/getVideoInfo',{
        params:{id:this.id}
      }).then(result=>{
        if(result.data.res.video!=undefined){
          this.title=result.data.res.video.title
          this.titlewidth=`width:${this.title.length*24+80}px`
          this.type=result.data.res.video.type
          this.desc=result.data.res.video.desc
          this.createTime=result.data.res.video.createTime
          this.image=result.data.res.video.image
          this.money=result.data.res.video.money
          this.discount=result.data.res.discount
          this.memberType=result.data.res.memberType
          this.hasZip=result.data.res.hasZip
          if(result.data.res.videoTypeList!=undefined){
            this.videoTypeList=JSON.parse(pako_ungzip(result.data.res.videoTypeList))
          }else{
            this.videoTypeList=[]
          }
          if(result.data.res.totalVideoList!=undefined){
            this.totalVideoList=JSON.parse(pako_ungzip(result.data.res.totalVideoList))
          }else{
            this.totalVideoList=[]
          }
          this.userName=result.data.res.video.userName
          this.shoppingId=result.data.res.shoppingId
          if(result.data.res.video.money>0){
            this.axios.get('/video/isVideoViewPayAuto',{
              params:{id:this.id}
            }).then(result=>{
              if(result.data.res!=undefined){
                if(result.data.res.isView!=undefined){
                  this.show=false
                }else{
                  this.show=true
                }
              }else{
                this.show=true
              }
            })
          }
        }
        if(result.data.res.videoCommentList!=undefined){
          this.videoCommentList=JSON.parse(pako_ungzip(result.data.res.videoCommentList))
        }
      })
    },
    getStream(){
      var video = document.getElementById('video');
      if (Hls.isSupported()) {
        var hls = new Hls();
        hls.loadSource(''+geturl()+'/video/getVideo?id='+this.id);
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED, function() {
          video.play();
        });
      }
    },
    Comment(){
      if(this.input!=''){
        var qs=require('qs');
        this.axios.post(`/video/addUserVideoComment`, qs.stringify({
          id:this.id,
          content:this.input
        })).then(result=>{
          if(result.data.status==200){
            if(result.data.res.content>0){
              this.getVideoInfo()
              this.$message({
                message: '评论成功',
                type: 'success'
              });
            }else{
              this.$message({
                message: '评论失败',
                type: 'warning'
              });
            }
          }else if(result.data.status==500){
            this.$message({
              message: result.data.message,
              type: 'warning'
            });
          }
          
        })
      }else{
        this.$message({
          message: '评论不能为空',
          type: 'warning'
        });
      }
      
    },
  },
}
</script>
<style scoped>
  @media screen and (min-width:1200px){
    .All{
      width: 1200px !important;
    }
  }
  .comment2>.active1{
    display: block ;
  }
  .active2{
    display: block ;
  }
  .active3{
    display: none ;
  }
  .All{
    width: 100%;
    margin: 0 auto;
    overflow: hidden;
    font-family:Source Han Sans CN;
    display: flex;
    flex-direction: row;
  }
  .All>div:nth-child(1){
    width: 888px;
    margin-right: 15px;
  }
  .All>div:nth-child(2){
    width: 312px;
    margin-top: 90px;
  }
  .All>div:nth-child(1)>p:nth-child(1){
    font-size: 24px;
    margin-top: 20px;
  }
  .All>div:nth-child(1)>p:nth-child(2){
    margin-top: 20px;
  }
  .All>div:nth-child(1)>p:nth-child(2)>span:nth-child(1){
    font-size: 16px;
    margin-right: 10px;
  }
  .All>div:nth-child(1)>p:nth-child(2)>span:nth-child(2){
    font-size: 14px;
    color: #666;
  }
  .Video{
    margin-top: 20px;
    position: relative;
    background: #fff;
  }
  .video11{
    height: 44px;
    margin-top: -5px;
    box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.149019607843137);
    border-radius: 2px;
    margin-bottom: 20px;line-height: 44px;
    display: flex;
    flex-direction: row;
  }
  .video11>div:nth-child(1){
    margin-left: 10px;
  }
  .video11>div{
    margin: 0 10px;
  }
  .video11>div>img{
    cursor: pointer;
  }
  .label{
    display: flex;
    flex-direction: row;
    line-height: 32px;
    color: black;
    justify-content: space-between;
    margin-top: 20px;
  }
  .label>div{
    display: flex;
    flex-direction: row;
    color: black;
  }
  .label>div>p{
    margin-left: 20px;
    font-size: 16px;
  }
  .info{
    padding-left: 68px;
    margin-top: 10px;
    padding-bottom: 15px;
    margin-bottom: 15px;
    border-bottom: 1px solid #333;
  }
  .comment1{
    display: flex;
    flex-direction: row;
    line-height: 48px;
    justify-content: space-between;
    margin-bottom: 20px;
  }
  .comment1>.el-input{
    width: 84%;height: 48px;
    line-height: 48px;  
  }
  .reply{
    display: none;
  }
  .comment2>.reply>div{
    display: flex;
    flex-direction: row;
    line-height: 48px;
    justify-content: space-between;
    margin-bottom: 20px;
    margin-left: 62px;
  }
  .comment2>.reply>div>.el-input{
    width: 84%;height: 48px;
    line-height: 48px;  
  }
  .comment>>>.el-input__inner{
    height: 48px;
    line-height: 48px;  
  }
  .comment2>div:nth-child(1){
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 20px;
  }
  .comment10{
    margin-left: 62px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 20px;
  }
  .comment10>div:nth-child(1){
    display: flex;
    flex-direction: row;
  }
  .comment10>div:nth-child(1)>div:nth-child(2){
    margin-left: 20px;
  }
  .comment10>div:nth-child(1)>div:nth-child(2)>p{
    line-height: 24px;
  }
  .comment2>div:nth-child(1)>div:nth-child(1){
    display: flex;
    flex-direction: row;
    width: 750px;
  }
  .comment2>div:nth-child(1)>div:nth-child(1)>div:nth-child(2){
    margin-left: 20px;
  }
  .comment2>div:nth-child(1)>div:nth-child(1)>div:nth-child(2)>p{
    line-height: 24px;
  }
  .comment2>div:nth-child(1)>div:nth-child(2)>p{
    line-height: 24px;
  }
  .noatuo{
    width: 100%;
    height: 500px;
    background: rgba(255, 255, 255, 0.8);
    text-align: center;
    overflow: hidden;
    position: absolute;
    left: 0;
    top: 0;
  }
  .noatuo>p:nth-child(1){
    margin-top: 200px;
    margin-bottom: 20px;
    font-size: 24px;
  }
  .noatuo>p:nth-child(1)>i{
    color:red;
  }
  .noatuo>p:nth-child(2)>span{
    margin-right: 30px;
  }
  .Recommend{
    background: #fff;
    padding: 10px ;
  }
  .Recommend>p{
    font-size: 18px;
    width: 297px;
    margin-left: -10px;
    padding-left: 20px;
    padding-bottom: 10px;
    border-bottom: 1px solid #ddd;
    margin-bottom: 10px;
  }
  .Recommend>div{
    width: 100%;
    display: flex;
    flex-direction: row;
    cursor: pointer;
    margin: 10px 0;
    margin-left: 10px;
    padding-right: 10px;
  }
  .Recommend>div>div{
    margin-left: 10px;
  }
  .Recommend>div>div>p:nth-child(1){
    font-size: 16px;
    text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }
  .Recommend>div>div>p:nth-child(2){
    font-size: 14px;
    margin-top: 10px;
    text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .Recommend1>div{
    background: #fff;
    max-height: 360px;
    overflow-y: auto;
    padding: 10px;
  }
  .Recommend1>div>p{
    font-size: 18px;
    width: 297px;
    margin-left: -10px;
    padding-left: 20px;
    padding-bottom: 10px;
    border-bottom: 1px solid #ddd;
    margin-bottom: 10px;
  }
  .shipinxanji>ul>li>p{
    text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    padding: 4px 10px;
  }
  .shipinxanji>ul>li>p:hover{
    color: #3366cc;
    border-radius: 5px;
    cursor: pointer;
  }
  .active{
    color: #3C61C3;
    background: #fff;
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
  }
  .tankuang>div>div:nth-child(2){
    background: #fff;
    border-radius: 10px;
  }
  .pay{
    padding: 67px;
  }
  .pay>p:nth-child(1){
    font-size: 20px;
    margin-bottom: 30px;
  }
  .pay>p:nth-child(4){
    margin-top: 40px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .pay>p:nth-child(4)>.el-button{
    width: 110px;
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
    text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }
  .zhifuInfo>div>p{
    width: 70%;
    color: #fff;
    font-size: 20px;
    line-height: 36px;
    text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
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
  .mess>span{
    font-size: 12px;
    vertical-align: middle;
    color: #e6a23c;
  }
  .mess>img{
    vertical-align: middle;
    margin-right: 10px;
  }
  .mess{
    background-color: #fdf6ec;
    border-color: #faecd8;
    min-width: 380px;
    box-sizing: border-box;
    border-radius: 4px;
    position: fixed;
    left: 50%;
    top: 20px;
    transform: translateX(-50%);
    transition: opacity .3s,transform .4s,top .4s;
    overflow: hidden;
    padding: 15px 15px 15px 20px;
    display: flex;
    align-items: center;
    position: fixed;
    top: 20px;
    left: 50%;
    z-index: 8888 ;
  }
  .username{
    position: absolute;
    font-size: 24px;
    display: block;
    color: #000;
    height: 0;
    line-height: 50px;
    padding-left: 5px;
    border-width: 0px 50px 50px 0px;
    border-style: none solid solid;
    border-color: transparent transparent #fff;
    text-align: center;
  }
  .comment {
    background: #fff;
    padding: 10px 20px;
    margin-top: 15px;
  }
  .synopsis {
    width: 100%;
    padding: 10px;
    background: #fff;
    margin-bottom: 10px;
  }
  .synopsis>p:nth-child(1) {
    font-size: 18px;
    width: 297px;
    margin-left: -10px;
    padding-left: 20px;
    padding-bottom: 10px;
    border-bottom: 1px solid #ddd;
  }
  .synopsis>p:nth-child(2) {
    width: 90%;
    padding-left: 10px;
    word-wrap:break-word;
    line-height: 24px;
    font-size: 14px;
    margin-top: 10px;
  }
  .introd{
    width: 100%;
    min-height: 200px;
    position: relative;
  }
  .introd>img {
    position: absolute;
    top:0px;
    right: 10px;
    cursor: pointer;
  }
</style>