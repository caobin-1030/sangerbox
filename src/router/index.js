import Vue from 'vue'
import VueRouter from 'vue-router'
const Index = ()=>import("../views/Index.vue")
const Search = ()=>import("../views/Search.vue")
const Programme = ()=>import("../views/Programme.vue")
const Personal = ()=>import("../views/Personal.vue")
const Signin = ()=>import("../views/Signin.vue")
const Signup = ()=>import("../views/Signup.vue")
const PhoneSignin = ()=>import("../views/PhoneSignin.vue")
const ForgetPwd = ()=>import("../views/ForgetPwd.vue")
const Modify = ()=>import("../views/Modify.vue")
const WechatSignin = ()=>import("../views/WechatSignin.vue")
const Home = ()=>import("../views/Home.vue")
const Monogenic = ()=>import("../views/Monogenic.vue")
const Journal = ()=>import("../views/Journal.vue")
const Literature = ()=>import("../views/Literature.vue")
const Similarity = ()=>import("../views/Similarity.vue")
const Fund = ()=>import("../views/Fund.vue")
const Blacklist = ()=>import("../views/Blacklist.vue")
const Contribute = ()=>import("../views/Contribute.vue")
const Resemble = ()=>import("../views/Resemble.vue")
const SearchJournal = ()=>import("../views/SearchJournal.vue")
const SearchFund = ()=>import("../views/SearchFund.vue")
const Gene = ()=>import("../views/Gene.vue")
const Information = ()=>import("../views/Information.vue")
const Info = ()=>import("../views/Info.vue")
const IdConversion = ()=>import("../views/IdConversion.vue")
const Tool = ()=>import("../views/Tool.vue")
const welogin = ()=>import("../views/welogin.vue")
const bindweixin = ()=>import("../views/bindweixin.vue")
const EditTools = ()=>import("../views/EditTools.vue")
const Edit = ()=>import("../views/Edit.vue")
const AllTools = ()=>import("../views/AllTools.vue")
const pdf = ()=>import("../views/pdf.vue")
const VideoUpload = ()=>import("../views/VideoUpload.vue")
const SangerBoxClassroom = ()=>import("../views/SangerBoxClassroom.vue")
const VideoInfo = ()=>import("../views/VideoInfo.vue")
const TcgaDown = ()=>import("../views/TcgaDown.vue")
const VisualNetworkDiagram = ()=>import("../views/VisualNetworkDiagram.vue")

Vue.use(VueRouter)
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
const routes = [
  {path:'/',component:Index},
  {path:'/Index',name:'Index',meta:{keepAlive : true},component:Index},
  {path:'/Search',name:'Search',meta:{keepAlive : true},component:Search},
  {path:'/Programme',name:'Programme',meta:{keepAlive : true},component:Programme},
  {path:'/Personal',name:'Personal',meta:{keepAlive : true},component:Personal},
  {path:'/Signin',name:'Signin',meta:{keepAlive : true},component:Signin},
  {path:'/Signup',name:'Signup',meta:{keepAlive : true},component:Signup},
  {path:'/PhoneSignin',name:'PhoneSignin',meta:{keepAlive : true},component:PhoneSignin},
  {path:'/ForgetPwd',name:'ForgetPwd',meta:{keepAlive : true},component:ForgetPwd},
  {path:'/Modify',name:'Modify',meta:{keepAlive : true},component:Modify},
  {path:'/WechatSignin',name:'WechatSignin',meta:{keepAlive : true},component:WechatSignin},
  {path:'/Home',name:'Home',meta:{keepAlive : true},component:Home},
  {path:'/Monogenic',name:'Monogenic',meta:{keepAlive : true},component:Monogenic},
  {path:'/Journal',name:'Journal',meta:{keepAlive : true},component:Journal},
  {path:'/Literature',name:'Literature',meta:{keepAlive : true},component:Literature},
  {path:'/Similarity',name:'Similarity',meta:{keepAlive : true},component:Similarity},
  {path:'/Fund',name:'Fund',meta:{keepAlive : true},component:Fund},
  {path:'/Blacklist',name:'Blacklist',meta:{keepAlive : true},component:Blacklist},
  {path:'/Contribute',name:'Contribute',meta:{keepAlive : true},component:Contribute},
  {path:'/Resemble',name:'Resemble',meta:{keepAlive : true},component:Resemble},
  {path:'/SearchJournal',name:'SearchJournal',meta:{keepAlive : true},component:SearchJournal},
  {path:'/SearchFund',name:'SearchFund',meta:{keepAlive : true},component:SearchFund},
  {path:'/Gene',name:'Gene',meta:{keepAlive : true},component:Gene},
  {path:'/Information',name:'Information',meta:{keepAlive : true},component:Information},
  {path:'/Info',name:'Info',meta:{keepAlive : true},component:Info},
  {path:'/IdConversion',name:'IdConversion',meta:{keepAlive : true},component:IdConversion},
  {path:'/Tool',name:'Tool',meta:{keepAlive : true},component:Tool},
  {path:'/welogin',name:'welogin',meta:{keepAlive : true},component:welogin},
  {path:'/bindweixin',name:'bindweixin',meta:{keepAlive : true},component:bindweixin},
  {path:'/EditTools',name:'EditTools',meta:{keepAlive : true},component:EditTools},
  {path:'/Edit',name:'Edit',meta:{keepAlive : true},component:Edit},
  {path:'/AllTools',name:'AllTools',meta:{keepAlive : true},component:AllTools},
  {path:'/pdf',name:'pdf',meta:{keepAlive : true},component:pdf},
  {path:'/VideoUpload',name:'VideoUpload',meta:{keepAlive : true},component:VideoUpload},
  {path:'/SangerBoxClassroom',name:'SangerBoxClassroom',meta:{keepAlive : true},component:SangerBoxClassroom},
  {path:'/VideoInfo',name:'VideoInfo',meta:{keepAlive : true},component:VideoInfo},
  {path:'/TcgaDown',name:'TcgaDown',meta:{keepAlive : true},component:TcgaDown},
  {path:'/VisualNetworkDiagram',name:'VisualNetworkDiagram',meta:{keepAlive : true},component:VisualNetworkDiagram},
]
const router = new VueRouter({
  mode: 'history',
  // base: '/sangerbox/',
  routes,scrollBehavior(to, from,savedPosition) {
    return {
      x: 0,
      y: 0,
    }
  }
})


export default router
