(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2734c261"],{"2fa7":function(t,e,n){"use strict";n.d(e,"a",(function(){return r}));var a=n("85d3"),s=n.n(a);function r(t,e,n){return e in t?s()(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}},"3e476":function(t,e,n){var a=n("a5eb"),s=n("c1b2"),r=n("4180");a({target:"Object",stat:!0,forced:!s,sham:!s},{defineProperty:r.f})},4255:function(t,e,n){"use strict";var a=n("879c"),s=n.n(a);s.a},"664f":function(t,e,n){"use strict";var a=n("23e7"),s=n("857a"),r=n("eae9");a({target:"String",proto:!0,forced:r("sup")},{sup:function(){return s(this,"sup","","")}})},"6d3f":function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAQCAYAAAAmlE46AAAACXBIWXMAAAsSAAALEgHS3X78AAAAxElEQVQokZWTfQ3CMBDF38gEIGEGKJMwATSgoAkO5oDiYBJGFZDUADhYqqA4wEFJk5XA0Y3b+6/X/u7jXVpsdhcN4AS+js6qvhyfPwD0TLQT0jwT6J1VmkMJaRoAdUmCFYBqgonJfTqU5LIDsJ8A7wCaLOisOnDa/QGFNPozK9HgrGpTaEXnmCkyTFaM++GuhbZ6nTPHWZU3B0A7OpvT1xi0Vf9nzreoOWwlsBLSrJeA8XdE4AZgu4A7FyGE6GaEazYG+BcU0jSnbJIjgwAAAABJRU5ErkJggg=="},8558:function(t,e,n){t.exports=n.p+"static/img/wechart.png"},"85d3":function(t,e,n){t.exports=n("9a13")},"865d":function(t,e,n){"use strict";var a=n("91be"),s=n.n(a);s.a},"879c":function(t,e,n){},"91be":function(t,e,n){},"9a13":function(t,e,n){t.exports=n("a38c")},a38c:function(t,e,n){n("3e476");var a=n("764b"),s=a.Object,r=t.exports=function(t,e,n){return s.defineProperty(t,e,n)};s.defineProperty.sham&&(r.sham=!0)},c209:function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("Header"),a("div",{staticClass:"SearchBackground"},[a("div",{staticClass:"SearchBody1"},[a("div",{staticClass:"search2"},[a("div",{staticClass:"searchBox1"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.searchContent,expression:"searchContent"}],ref:"input",attrs:{type:"text",placeholder:"在此输入您搜索的内容",onfocus:"this.placeholder=''",onblur:"this.placeholder='在此输入您搜索的内容'"},domProps:{value:t.searchContent},on:{keyup:function(e){return e.type.indexOf("key")||13===e.keyCode?t.searcher():null},input:function(e){e.target.composing||(t.searchContent=e.target.value)}}}),a("div",{on:{click:function(e){return t.searcher1()}}},[a("span",[t._v("搜索")])])])]),a("div",{staticClass:"SearchBody"},[a("span",[t._v("寻找文献")]),a("ul",[a("li",[a("span",{on:{click:function(e){return t.searchtp53()}}},[t._v("TP53")])]),a("li",[a("span",{on:{click:function(e){return t.searchmyc()}}},[t._v("MYC")])]),a("li",[a("span",{on:{click:function(e){return t.searchegfr()}}},[t._v("egfr")])]),a("li",[a("span",{on:{click:function(e){return t.searchkras()}}},[t._v("kras")])])]),a("div",{staticClass:"SearchBox"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.searchContent,expression:"searchContent"}],ref:"input",attrs:{type:"text",placeholder:"在此输入您搜索的内容",onfocus:"this.placeholder=''",onblur:"this.placeholder='在此输入您搜索的内容'"},domProps:{value:t.searchContent},on:{keyup:function(e){return e.type.indexOf("key")||13===e.keyCode?t.searcher():null},input:function(e){e.target.composing||(t.searchContent=e.target.value)}}}),a("div",{on:{click:function(e){return t.searcher1()}}},[a("span",[t._v("搜索")])])]),a("p",{staticStyle:{"text-align":"right","margin-right":"13.9%",cursor:"pointer"},on:{click:function(e){return t.toContribute()}}},[t._v("智能选刊")])]),a("span",{staticClass:"Search",staticStyle:{display:"none"},on:{click:function(e){return t.Searcher1()}}})]),t._m(0),a("div",{staticClass:"SearchBodyOne"},[a("div",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticClass:"SearchContent1",attrs:{"element-loading-text":"拼命加载中","element-loading-spinner":"el-icon-loading","element-loading-background":"f5f5f5",id:"view"}},[a("div",[a("table",[a("tbody",{staticClass:"tableTbody"},[a("tr",[a("td",[t._v("项目名称")]),null!=t.fundDetails.title?a("td",{attrs:{colspan:"5"}},[t._v(t._s(t.fundDetails.title))]):a("td",[t._v("N/A")])]),a("tr",[a("td",[t._v("项目类型")]),null!=t.fundDetails.type?a("td",{staticClass:"sta",attrs:{colspan:"2"},on:{click:function(e){return t.toSearchFund(t.fundDetails.type)}}},[t._v(t._s(t.fundDetails.type))]):a("td",{attrs:{colspan:"2"}},[t._v("N/A")]),a("td",[t._v("所属学部")]),null!=t.fundDetails.department?a("td",{staticClass:"sta",attrs:{colspan:"2"},on:{click:function(e){return t.toSearchFund1(t.fundDetails.department)}}},[t._v(t._s(t.fundDetails.department))]):a("td",{attrs:{colspan:"2"}},[t._v("N/A")])]),a("tr",[a("td",[t._v("学科分类")]),a("td",{attrs:{colspan:"5"}},[a("span",[t._v("一级:")]),null!=t.fundDetails.subjectOneType?a("span",{staticClass:"sta1",on:{click:function(e){return t.toSearchFund2(t.fundDetails.subjectOneType)}}},[t._v(t._s(t.fundDetails.subjectOneType))]):t._e(),null==t.fundDetails.subjectOneType?a("span",[t._v("N/A")]):t._e(),a("span",[t._v("二级:")]),null!=t.fundDetails.subjectTwoType?a("span",{staticClass:"sta1",on:{click:function(e){return t.toSearchFund3(t.fundDetails.subjectTwoType)}}},[t._v(t._s(t.fundDetails.subjectTwoType))]):t._e(),null==t.fundDetails.subjectTwoType?a("span",[t._v("N/A")]):t._e(),a("span",[t._v("三级:")]),null!=t.fundDetails.subjectThreeType?a("span",{staticClass:"sta1",on:{click:function(e){return t.toSearchFund4(t.fundDetails.subjectThreeType)}}},[t._v(t._s(t.fundDetails.subjectThreeType))]):t._e(),null==t.fundDetails.subjectThreeType?a("span",[t._v("N/A")]):t._e()])]),a("tr",[a("td",[t._v("学科代码")]),a("td",{attrs:{colspan:"5"}},[a("span",[t._v("一级:")]),null!=t.fundDetails.subjectOneCode?a("span",{staticClass:"sta1",on:{click:function(e){return t.toSearchFund5(t.fundDetails.subjectOneCode)}}},[t._v(t._s(t.fundDetails.subjectOneCode))]):t._e(),null==t.fundDetails.subjectOneCode?a("span",[t._v("N/A")]):t._e(),a("span",[t._v("二级:")]),null!=t.fundDetails.subjectTwoCode?a("span",{staticClass:"sta1",on:{click:function(e){return t.toSearchFund6(t.fundDetails.subjectTwoCode)}}},[t._v(t._s(t.fundDetails.subjectTwoCode))]):t._e(),null==t.fundDetails.subjectTwoCode?a("span",[t._v("N/A")]):t._e(),a("span",[t._v("三级:")]),null!=t.fundDetails.subjectThreeCode?a("span",{staticClass:"sta1",on:{click:function(e){return t.toSearchFund7(t.fundDetails.subjectThreeCode)}}},[t._v(t._s(t.fundDetails.subjectThreeCode))]):t._e(),null==t.fundDetails.subjectThreeCode?a("span",[t._v("N/A")]):t._e()])]),a("tr",[a("td",[t._v("执行时间")]),null!=t.fundDetails.info?a("td",{attrs:{colspan:"5"}},[null!=t.fundDetails.info&&t.fundDetails.info.researchTimeScope.length>22?a("span",[t._v(t._s(t.fundDetails.info.researchTimeScope.slice(0,10))+"到"+t._s(t.fundDetails.info.researchTimeScope.slice(22,32)))]):t._e(),null!=t.fundDetails.info&&t.fundDetails.info.researchTimeScope.length<22?a("span",[t._v(t._s(t.fundDetails.info.researchTimeScope))]):t._e(),null==t.fundDetails.info?a("span",[t._v("N/A")]):t._e()]):a("td",{attrs:{colspan:"5"}},[t._v("N/A")])]),a("tr",[a("td",[t._v("关键词")]),null!=t.fundDetails.keyword?a("td",{attrs:{colspan:"5"}},[t._v(t._s(t.fundDetails.keyword))]):t._e(),null==t.fundDetails.keyword&&void 0!=t.fundDetails.info?a("td",{attrs:{colspan:"5"}},[t._v(t._s(t.fundDetails.info.projectKeywordC))]):t._e(),null==t.fundDetails.keyword&&void 0==t.fundDetails.info?a("td",{attrs:{colspan:"5"}},[t._v("N/A")]):t._e()]),a("tr",[a("td",[t._v("负责人")]),null!=t.fundDetails.studentsName&&null!=t.pubTotal?a("td",{staticClass:"sta",on:{click:function(e){return t.toSearchFund(t.fundDetails.studentsName)}}},[t._v(t._s(t.fundDetails.studentsName))]):a("td",[t._v("N/A")]),a("td",{staticStyle:{"border-right":"1px solid #fff"}},[t._v("职位")]),null!=t.fundDetails.info?a("td",[t._v(t._s(t.fundDetails.info.adminPosition))]):a("td",[t._v("N/A")]),a("td",{staticStyle:{"border-right":"1px solid #fff"}},[t._v("单位")]),null!=t.fundDetails.unit?a("td",{staticClass:"sta",on:{click:function(e){return t.toSearchFund(t.fundDetails.unit)}}},[t._v(t._s(t.fundDetails.unit))]):a("td",[t._v("N/A")])]),a("tr",[a("td",[t._v("金额（万）")]),null!=t.fundDetails.money?a("td",{staticClass:"sta",on:{click:function(e){return t.toSearchFund8(t.fundDetails.money)}}},[t._v(t._s(t.fundDetails.money))]):a("td",[t._v("N/A")]),a("td",{staticStyle:{"border-right":"1px solid #fff"}},[t._v("项目编号")]),null!=t.fundDetails.approvalNumber?a("td",[t._v(t._s(t.fundDetails.approvalNumber))]):a("td",[t._v("N/A")]),a("td",{staticStyle:{"border-right":"1px solid #fff"}},[t._v("批准年份")]),null!=t.fundDetails.approvalYear?a("td",{staticClass:"sta",on:{click:function(e){return t.toSearchFund9(t.fundDetails.approvalYear)}}},[t._v(t._s(t.fundDetails.approvalYear))]):a("td",[t._v("N/A")])]),t.hostStudentsList.length>0?a("tr",[a("td",[t._v("负责学者")]),a("td",{staticStyle:{padding:"0"},attrs:{colspan:"5"}},[a("table",{staticStyle:{width:"100%"}},[a("tbody",{staticClass:"tableTbody"},[t._m(1),t._l(t.data3,(function(e,n){return a("tr",{key:n},[a("td",{staticClass:"sta",staticStyle:{"border-right":"1px solid #fff"},on:{click:function(n){return t.toSearchFund(e.name)}}},[t._v(t._s(e.name))]),a("td"),a("td",{staticStyle:{"border-right":"1px solid #fff"}},[t._v(t._s(e.unitCode))]),a("td"),a("td",{staticClass:"sta",staticStyle:{"border-right":"1px solid #fff"},on:{click:function(n){return t.toSearchFund(e.unitName)}}},[t._v(t._s(e.unitName))]),a("td")])}))],2)])])]):t._e(),t.joinStudentsList.length>0?a("tr",[a("td",[t._v("参与学者")]),a("td",{staticStyle:{padding:"0"},attrs:{colspan:"5"}},[a("table",{staticStyle:{width:"100%"}},[a("tbody",{staticClass:"tableTbody"},[t._m(2),t._l(t.data2,(function(e,n){return a("tr",{key:n},[a("td",{staticClass:"sta",staticStyle:{"border-right":"1px solid #fff"},on:{click:function(n){return t.toSearchFund(e.name)}}},[t._v(t._s(e.name))]),a("td"),a("td",{staticStyle:{"border-right":"1px solid #fff"}},[t._v(t._s(e.unitCode))]),a("td"),a("td",{staticClass:"sta",staticStyle:{"border-right":"1px solid #fff"},on:{click:function(n){return t.toSearchFund(e.unitName)}}},[t._v(t._s(e.unitName))]),a("td")])}))],2)])])]):t._e(),a("tr",[a("td",[t._v("学者项目关系")]),a("td",{attrs:{colspan:"5"}},[a("div",{staticClass:"xuezhe"},[a("div",{style:{width:"760px",height:"500px"},attrs:{id:"xue1"}})])])]),null!=t.fundDetails.info?a("tr",[a("td",[t._v("项目摘要")]),a("td",{attrs:{colspan:"5"}},[t._v(" "+t._s(t.fundDetails.info.projectAbstractC)+" ")])]):t._e(),null!=t.fundDetails.info&&null!=t.fundDetails.info.conclusionAbstract?a("tr",[a("td",[t._v("结题摘要")]),a("td",{attrs:{colspan:"5"}},[t._v(" "+t._s(t.fundDetails.info.conclusionAbstract)+" ")])]):t._e(),null!=t.fundDetails.info&&t.fundDetails.info.resultsList.length>0?a("tr",[a("td",[t._v("成果")]),a("td",{staticStyle:{padding:"0"},attrs:{colspan:"5"}},[a("table",{staticClass:"Achievements",staticStyle:{width:"100%",margin:"0"}},[t._m(3),a("tbody",t._l(t.data1,(function(e,n){return a("tr",{key:n},[a("td",{staticStyle:{"text-align":"center"}},[t._v(t._s(e.result[0]))]),a("td",[t._v(t._s(e.result[2]))]),a("td",[t._v(t._s(e.result[3]))]),a("td",[t._v(t._s(e.result[4]))])])})),0)])])]):t._e(),null!=t.articleList.searcherData?a("tr",[a("td",[t._v("成果文献")]),a("td",{staticStyle:{padding:"0"},attrs:{colspan:"5"}},[a("div",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticClass:"SearchBodyTwo",attrs:{"element-loading-text":"拼命加载中","element-loading-spinner":"el-icon-loading","element-loading-background":"f5f5f5"}},[a("ul",t._l(t.data5,(function(e,s){return a("li",{key:s},[a("div",[a("p",[a("span",{domProps:{innerHTML:t._s(e.title)},on:{click:function(n){return t.toLiterature(e.PMID)}}},[t._v(t._s(e.title))]),a("img",{directives:[{name:"clipboard",rawName:"v-clipboard:copy",value:e.title,expression:"item.title",arg:"copy"},{name:"clipboard",rawName:"v-clipboard:success",value:t.onCopy,expression:"onCopy",arg:"success"},{name:"clipboard",rawName:"v-clipboard:error",value:t.onError,expression:"onError",arg:"error"}],attrs:{src:n("6d3f"),alt:"复制",title:"复制"}})]),a("div"),a("div",[a("div",t._l(e.authorList,(function(e,n){return a("span",{directives:[{name:"popover",rawName:"v-popover:popover1",arg:"popover1"}],key:n,on:{click:function(n){return t.getText(e)}}},[t._v(" "+t._s(e.lastName)+" "+t._s(e.initials)+", ")])})),0),a("div",{staticClass:"datas"},[a("div",[a("ul",[a("li",[a("span",{on:{click:function(n){return t.toJournal(e.journal.nlmId,e.journal.course)}}},[t._v(t._s(e.journal.subName))])]),a("li",[null!=e.journal.nowIfs?a("span",[t._v(t._s(e.journal.nowIfs))]):a("span",[t._v("N/A")])]),a("li",[null!=e.journal.qClass?a("span",[t._v(t._s(e.journal.qClass))]):a("span",[t._v("N/A")])])])]),a("div",[a("p",[a("span",[t._v(t._s(e.pubTime)+";"+t._s(e.volume)+";"+t._s(e.pagination))]),a("span",[t._v("DOl:"+t._s(e.doi))])])])]),a("div",[a("span",{domProps:{innerHTML:t._s(e.abstractText)}})])])])])})),0)])])]):t._e()])])]),a("div",{staticClass:"link"},[a("div",[a("p",[t._v("相似基金TOP"+t._s(t.listlength))]),a("div",t._l(t.data4,(function(e,n){return a("p",{key:n,on:{click:function(n){return t.toNewFund(e.approvalNumber)}}},[t._v(t._s(e.title))])})),0),a("p",[t._v("二维码")]),a("img",{attrs:{src:n("8558"),alt:""}})])])])])]),a("Footer")],1)},s=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"Searchbody2header"},[n("div",{staticClass:"SearchHeader"},[n("div",[n("p",[t._v("基本信息")])])])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("tr",[n("td",{staticStyle:{"border-right":"1px solid #fff"}},[t._v("姓名")]),n("td"),n("td",{staticStyle:{"border-right":"1px solid #fff"}},[t._v("单位代码")]),n("td"),n("td",{staticStyle:{"border-right":"1px solid #fff"}},[t._v("单位")]),n("td")])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("tr",[n("td",{staticStyle:{"border-right":"1px solid #fff"}},[t._v("姓名")]),n("td"),n("td",{staticStyle:{"border-right":"1px solid #fff"}},[t._v("单位代码")]),n("td"),n("td",{staticStyle:{"border-right":"1px solid #fff"}},[t._v("单位")]),n("td")])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("thead",[n("tr",[n("th",[t._v("序号")]),n("th",[t._v("标题")]),n("th",[t._v("类型")]),n("th",[t._v("作者")])])])}],r=n("e000"),i=r["a"],o=(n("4255"),n("2877")),l=Object(o["a"])(i,a,s,!1,null,"3ef49f90",null);e["default"]=l.exports},ca52:function(t,e,n){t.exports=n.p+"static/img/logo3.png"},e000:function(t,e,n){"use strict";(function(t){n("99af"),n("d81d"),n("b0c0"),n("ac1f"),n("5319");var a=n("0418"),s=n("fd2d");n("c0e9");e["a"]={metaInfo:function(){return{title:this.fundDetails.title+"-基金搜索"}},data:function(){return{searchContent:"",result:"",approvalNumber:"",fundDetails:[],searchJournalData:"",if:[],yearTimeAggs:[],comments:[],journalTypeTop:[],hIndex:"",citedNum:"",pubTotal:"",resultsList:[],researchTimeScope:[],projectAdmin:"",projectAbstractC:"",conclusionAbstract:"",loading:!1,hostStudentsList:[],joinStudentsList:[],title1:[],title2:[],aaa:{},aggs:{},bbb:{},ccc:{},title3:[],title4:[],a4:{},fundList:[],listlength:0,articleList:[]}},components:{Header:a["a"],Footer:s["a"]},created:function(){},watch:{$route:{handler:function(t){"/Fund"==t.path&&(this.getRouterData(),this.Searcher1())}}},mounted:function(){},computed:{data1:{get:function(){if(""!=this.fundDetails.info)return this.fundDetails.info.resultsList}},data2:{get:function(){if(""!=this.joinStudentsList)return this.joinStudentsList}},data3:{get:function(){if(""!=this.hostStudentsList)return this.hostStudentsList}},data4:{get:function(){if(""!=this.fundList)return this.fundList.searchData}},data5:{get:function(){return this.articleList.searchData}}},destroyed:function(){},updated:function(){this.xue()},activated:function(){this.getRouterData(),this.Searcher1()},methods:{toSearchFund9:function(t){var e=this.$router.resolve({path:"/SearchFund",query:{search1:'approvalYear:"'.concat(t,'"')}}),n=e.href;window.open(n,"_blank")},toSearchFund8:function(t){var e=this.$router.resolve({path:"/SearchFund",query:{search1:'money:"'.concat(t,'"')}}),n=e.href;window.open(n,"_blank")},toSearchFund7:function(t){var e=this.$router.resolve({path:"/SearchFund",query:{search1:'subjectThreeCode:"'.concat(t,'"')}}),n=e.href;window.open(n,"_blank")},toSearchFund6:function(t){var e=this.$router.resolve({path:"/SearchFund",query:{search1:'subjectTwoCode:"'.concat(t,'"')}}),n=e.href;window.open(n,"_blank")},toSearchFund5:function(t){var e=this.$router.resolve({path:"/SearchFund",query:{search1:'subjectOneCode:"'.concat(t,'"')}}),n=e.href;window.open(n,"_blank")},toSearchFund4:function(t){var e=this.$router.resolve({path:"/SearchFund",query:{search1:'subjectThreeType:"'.concat(t,'"')}}),n=e.href;window.open(n,"_blank")},toSearchFund3:function(t){var e=this.$router.resolve({path:"/SearchFund",query:{search1:'subjectTwoType:"'.concat(t,'"')}}),n=e.href;window.open(n,"_blank")},toSearchFund2:function(t){var e=this.$router.resolve({path:"/SearchFund",query:{search1:'subjectOneType:"'.concat(t,'"')}}),n=e.href;window.open(n,"_blank")},toSearchFund1:function(t){var e=this.$router.resolve({path:"/SearchFund",query:{search1:'department:"'.concat(t,'"')}}),n=e.href;window.open(n,"_blank")},toSearchFund:function(t){var e=this.$router.resolve({path:"/SearchFund",query:{search1:t}}),n=e.href;window.open(n,"_blank")},toJournal:function(t,e){var n=this.$router.resolve({path:"/Journal",query:{Id:t,Name:e}}),a=n.href;window.open(a,"_blank")},getText:function(t){var e=this.$router.resolve({path:"/Search",query:{search1:'author:"'.concat(t.lastName," ").concat(t.initials,'"')}}),n=e.href;window.open(n,"_blank")},toLiterature:function(t){var e=this.$router.resolve({path:"/Literature",query:{Id:t}}),n=e.href;window.open(n,"_blank")},onCopy:function(t){this.$message({message:"复制成功",type:"success"})},onError:function(t){this.$message.error("复制失败")},toNewFund:function(t){var e=this.$router.resolve({path:"/Fund",query:{approvalNumber:t}}),n=e.href;window.open(n,"_blank")},toContribute:function(){var t=this.$router.resolve({path:"/Contribute"}),e=t.href;window.open(e,"_blank")},SearchTop:function(t,e){var n=this.$router.resolve({path:"/Journal",query:{Id:t,Name:e}}),a=n.href;window.open(a,"_blank")},searchkras:function(){var t=this.$router.resolve({path:"/Search",query:{search1:"kras"}}),e=t.href;window.open(e,"_blank")},searchegfr:function(){var t=this.$router.resolve({path:"/Search",query:{search1:"egfr"}}),e=t.href;window.open(e,"_blank")},searchmyc:function(){var t=this.$router.resolve({path:"/Search",query:{search1:"myc"}}),e=t.href;window.open(e,"_blank")},searchtp53:function(){var t=this.$router.resolve({path:"/Search",query:{search1:"tp53"}}),e=t.href;window.open(e,"_blank")},getRouterData:function(){this.approvalNumber=this.$route.query.approvalNumber},searcher1:function(){var t=this.$router.resolve({path:"/SearchFund",query:{search1:this.searchContent}}),e=t.href;window.open(e,"_blank")},Searcher1:function(){var t=this;this.loading=!0,this.$axios.get("/pubmed/getFundInfo",{params:{number:this.approvalNumber}}).then((function(e){void 0==e.data.res?(t.fundDetails=[],t.hostStudentsList=[],t.journalTypeTop=[],t.aggs=[]):(t.fundDetails=e.data.res.fundDetails,t.hostStudentsList=t.fundDetails.hostStudentsList,t.joinStudentsList=t.fundDetails.joinStudentsList,t.aggs=e.data.res.aggs,""==e.data.res.fundList?(t.fundList=[],t.listlength=0,t.articleList=[]):(t.fundList=e.data.res.fundList,t.listlength=e.data.res.fundList.searchData.length,t.articleList=e.data.res.articleList)),200==e.data.status&&(t.loading=!1)}))},xue:function(){var e=this,n={};"undefined"!=typeof this.fundDetails.title&&(n.name=this.fundDetails.title,n.symbolSize=40,this.title1.push(n));var a=this.aggs,s=this.aggs;delete a.searchTime;var r=[],i=[];for(var o in a)this.title2.push({name:o,symbolSize:30}),r=a[o].fund.searchData,r.map((function(t,e){return i.push(t),t}));i.map((function(t,e){return t.id=e+1,t}));var l=[],c=[];for(var u in s)this.title4.push({source:u,target:this.fundDetails.title}),l=s[u].fund.searchData,l.map((function(t,e){return t.target=u,c.push(t),t}));var d=this.title2;c.map((function(t,e){return t.source=e+d.length+1,t}));var f=JSON.parse(JSON.stringify(i).replace(/title/g,"name")),p=this.title1.concat(this.title2);n=p.concat(f);n.map((function(t,e){return delete t.source,t}));var h=this.title4.concat(c);h.map((function(t,e){return delete t.id,t})),t(".xuezhe").html('<div id="xue1" style="width: 760px; height: 500px"></div>');var v=document.getElementById("xue1");if(v){var _=this.echarts.init(v);_.clear(),_.setOption({tooltip:{},series:[{edgeSymbol:["arrow",""],itemStyle:{normal:{color:"#224ec2",lineStyle:{color:"#224ec2"},label:{position:"top",show:!0,textStyle:{color:"#333"}},nodeStyle:{brushType:"both",borderColor:"rgb(255,215,0)",borderWidth:1},linkStyle:{normal:{color:"source",curveness:0,type:"solid"}}}},draggable:!0,focusNodeAdjacency:!0,animation:!1,name:"",type:"graph",layout:"force",force:{repulsion:100,gravity:.03,edgeLength:100,layoutAnimation:!0},roam:!0,useWorker:!1,minRadius:15,maxRadius:25,gravity:1.1,scaling:1.1,data:n,links:h}]}),_.on("click",(function(t){if("node"==t.dataType)if("undefined"==typeof t.data.approvalNumber){if(30==t.data.symbolSize){var n=e.$router.resolve({path:"/SearchFund",query:{search1:'studentsAll:"'.concat(t.data.name,'"')}}),a=n.href;window.open(a,"_blank")}}else{var s=e.$router.resolve({path:"/Fund",query:{approvalNumber:t.data.approvalNumber}}),r=s.href;window.open(r,"_blank")}else if("undefined"==typeof t.data.approvalNumber){var i=e.$router.resolve({path:"/SearchFund",query:{search1:'studentsAll:"'.concat(t.data.source,'"')}}),o=i.href;window.open(o,"_blank")}else{var l=e.$router.resolve({path:"/Fund",query:{approvalNumber:t.data.approvalNumber}}),c=l.href;window.open(c,"_blank")}}))}}}}}).call(this,n("1157"))},fd2d:function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"foot"},[n("div",{staticClass:"FooterBox"},[t._m(0),n("div",{staticClass:"Cancellation"},[n("p",{on:{click:t.beian}},[t._v("杭州慕谷科技有限公司 SangerBox研发部 浙ICP备18023291号")]),n("p",[t._v("Copyright © 2017 - 2019 SangerBox.com All Rights Reserved")])])])])},s=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"footerContent row"},[a("div",{staticClass:"col-sm-3 col-xs-12"},[a("img",{attrs:{src:n("ca52"),alt:""}}),a("p",[t._v("杭州慕谷科技有限公司")]),a("p",[t._v("公司地址：杭州市余杭区龙舟路6号炬华科技产业园一号楼608")])]),a("div",{staticClass:"col-sm-3 col-xs-12"},[a("p",[t._v("客户经理")]),a("p",[t._v("小木")]),a("p",[t._v("电话：0571-89007130 转 603")]),a("p",[t._v("邮箱：liuxl@shengxin.ren")])]),a("div",{staticClass:"col-sm-3 col-xs-12"},[a("p",[t._v("售后支持")]),a("p",[t._v("盛经理")]),a("p",[t._v("电话：0571-89007130 转 601")]),a("p",[t._v("邮箱：feedback@shengxin.ren")])]),a("div",{staticClass:"col-sm-3 col-xs-12"},[a("div",{staticClass:"erweima"},[a("div",[a("p",[t._v("桑格助手")]),a("img",{attrs:{src:n("b88b"),alt:""}})]),a("div",[a("p",[t._v("生信学霸")]),a("img",{attrs:{src:n("aceb"),alt:""}})])])])])}],r={data:function(){return{}},methods:{beian:function(){window.open("http://www.beian.miit.gov.cn","_blank")}}},i=r,o=(n("865d"),n("2877")),l=Object(o["a"])(i,a,s,!1,null,"4a42fa51",null);e["a"]=l.exports}}]);