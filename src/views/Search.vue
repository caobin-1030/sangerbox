<template>
  <div>
    <Header></Header>
    <div @click="search3();searcher()" id="sea" v-show="false" class="Search"><span>搜索</span></div>
    <div v-if="mess" class="mess"><img src="../../public/img/msg.png" alt=""><span>正在导出</span></div>
    <div class="SearchBackground" @click="downAnalysis()">
      <div class="SearchBody1" @click.stop="settingEvent()">
        <div class="search2">
          <div class="searchBox1">
            <div>
              <el-dropdown trigger="click">
                <span class="el-dropdown-link">
                  <span>{{choice}}</span>
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item id="lit" @click.native="literature1()">{{literature}}</el-dropdown-item>
                  <el-dropdown-item @click.native="periodical1()">{{periodical}}</el-dropdown-item>
                  <el-dropdown-item @click.native="fund1()">{{fund}}</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
            <div class="searchInput">
              <input ref="input" @keyup.13="search4();searcher()" v-model="searchContent" type="text" placeholder="在此输入您搜索的内容" onfocus="this.placeholder=''" onblur="this.placeholder='在此输入您搜索的内容'">
              <span style="margin-right:10px" class="tougao" @click="senior()">>>高级搜索</span>
            </div>
            <div @click="search4();searcher()" id="sea" class="Search"><span>搜索</span></div>
          </div>
        </div>
        <div class="SearchBody">
          <span>寻找文献</span>
          <ul>
            <li><span @click="searchtp53()">TP53</span></li>
            <li><span @click="searchmyc()">MYC</span></li>
            <li><span @click="searchegfr()">egfr</span></li>
            <li><span @click="searchkras()">kras</span></li>
          </ul>
          <div class="SearchBox">
            <div>
              <el-dropdown trigger="click">
                <span class="el-dropdown-link">
                  {{choice}}<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item class="lit" @click.native="literature1()">{{literature}}</el-dropdown-item>
                  <el-dropdown-item @click.native="periodical1()">{{periodical}}</el-dropdown-item>
                  <el-dropdown-item @click.native="fund1()">{{fund}}</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
            <div class="searchInput">
              <input v-if="literature2" ref="input" @keyup.13="search4();searcher()" v-model="searchContent" type="text" placeholder="在此输入您搜索的内容" onfocus="this.placeholder=''" onblur="this.placeholder='在此输入您搜索的内容'">
              <span style="margin-right:10px" class="tougao" @click="senior()">>>高级搜索</span>
            </div>
            <div @click="search4();searcher()" class="Search"><span>搜索</span></div>
            
          </div>
          <p class="sousuo">
            <span>搜索结果：<span>{{result}}</span><span>搜索时间：</span><span>{{timer}}</span></span>
            <span>
              <span class="tougao" @click="toContribute()">>>智能选刊</span>
            </span>
          </p>
          <div id="senior" class="senior" v-if="senior1">
            <div class="theads">
              <p>高级搜索</p>
              <img @click="quiet()" src="../../public/img/x.png" alt="">
            </div>
            <table>
              <tbody>
                <tr>
                  <td>关联符</td>
                  <td>检索字段</td>
                  <td>检索词</td>
                </tr>
                <tr>
                  <td>
                  </td>
                  <td>
                    <el-select v-model="model1" placeholder="请选择">
                      <el-option
                        v-for="item in field"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </td>
                  <td>
                    <el-input
                      placeholder="请输入内容"
                      v-model="int1"
                      clearable>
                    </el-input>
                  </td>
                </tr>
                <tr>
                  <td>
                    <el-select v-model="relation2" placeholder="请选择" style="width:75px" size='small'>
                      <el-option
                        v-for="item in relation"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </td>
                  <td>
                    <el-select v-model="model2" placeholder="请选择">
                      <el-option
                        v-for="item in field"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </td>
                  <td>
                    <el-input
                      placeholder="请输入内容"
                      v-model="int2"
                      clearable>
                    </el-input>
                  </td>
                </tr>
                <tr>
                  <td>
                    <el-select v-model="relation3" placeholder="请选择" style="width:75px" size='small'>
                      <el-option
                        v-for="item in relation"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </td>
                  <td>
                    <el-select v-model="model3" placeholder="请选择">
                      <el-option
                        v-for="item in field"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </td>
                  <td>
                    <el-input
                      placeholder="请输入内容"
                      v-model="int3"
                      clearable>
                    </el-input>
                  </td>
                </tr>
                <tr>
                  <td>
                    <el-select v-model="relation4" placeholder="请选择" style="width:75px" size='small'>
                      <el-option
                        v-for="item in relation"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </td>
                  <td>
                    <el-select v-model="model4" placeholder="请选择">
                      <el-option
                        v-for="item in field"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </td>
                  <td>
                    <el-input
                      placeholder="请输入内容"
                      v-model="int4"
                      clearable>
                    </el-input>
                  </td>
                </tr>
                <tr>
                  <td colspan="3">
                    <el-button @click="reset()" type="info" size="small" round>重置</el-button>
                    <el-button @click="Search()" type="primary" size="small" round>检索</el-button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="SearchHeadBg">
      </div>
      <div class="SearchContent">
        <div class="SearchHead">
          <div class="SearchContent1 row">
            <div class="SearchHeadOne col-md-2 col-sm-3 col-xs-3">
              <div>
                <img src="../../public/img/search.png">
                <span>快速搜索</span>
              </div>
              <div><img @click="clear()" src="../../public/img/brush.png" title="清空"></div>
              
            </div>
            <div class="SearchHeadTwo col-md-7 col-sm-6 col-xs-7">
              <ul>
                <li :class="{'asc':isAsc1,'desc':isDesc1}" @click="publishingTime();search4();searcher();inf()">
                  出版时间
                  <span>
                    <img v-if="show1" src="../../public/img/shang.png">
                    <img v-if="active1" src="../../public/img/shangActive.png">
                  </span>
                  <span>
                    <img v-if="show6" src="../../public/img/xia.png">
                    <img v-if="active6" src="../../public/img/xiaActive.png">
                  </span>
                </li>
                <li :class="{'asc':isAsc2,'desc':isDesc2}" @click="influenceFactor();search4();searcher();inf()">
                  影响因子
                  <span>
                    <img v-if="show2" src="../../public/img/shang.png">
                    <img v-if="active2" src="../../public/img/shangActive.png">
                  </span>
                  <span>
                    <img v-if="show3" src="../../public/img/xia.png">
                    <img v-if="active3" src="../../public/img/xiaActive.png">
                  </span>
                </li>
                <li :class="{'asc':isAsc3,'desc':isDesc3}" @click="relevant();search4();searcher();inf()">
                  相关度
                  <span>
                    <img v-if="show4" src="../../public/img/shang.png">
                    <img v-if="active4" src="../../public/img/shangActive.png">
                  </span>
                  <span>
                    <img v-if="show5" src="../../public/img/xia.png">
                    <img v-if="active5" src="../../public/img/xiaActive.png">
                  </span>
                </li>
              </ul>
              <el-switch v-model="showSCI" v-if="periodical2" @change="showSci()" active-text="只显示SCI"></el-switch>
            </div>
            <div class="SearchHeadThree col-md-3 col-sm-2">
              <ul>
                <li><img src="../../public/img/translate.png" @click="translate()" alt="翻译" title="翻译"></li>
                <!-- <li><img src="../../public/img/right.png" alt="本页" title="本页"></li> -->
                <li><img src="../../public/img/all.png" @click="export1()" alt="导出" title="导出"></li>
                <li><img src="../../public/img/analysis.png" v-if="analy" id="ana" @click.stop="analysis()" alt="分析" title="分析"></li>
              </ul>
            </div>
          </div>
        </div>
        <div class="SearchBody1 row"  @click.stop="settingEvent()">
          <div class="SearchBodyOne col-sm-2" v-if="show">
            <ul>
              <li>
                <p><img src="../../public/img/Influencefactor.png"><span>影响因子:</span></p>
                <el-checkbox-group v-model="checkList1" @change="checkListOne();search4();searcher()">
                  <el-checkbox label="0-1"></el-checkbox>
                  <el-checkbox label="1-3"></el-checkbox>
                  <el-checkbox label="3-5"></el-checkbox>
                  <el-checkbox label="5-10"></el-checkbox>
                  <el-checkbox label="10-15"></el-checkbox>
                  <div class="InputP" v-show="inpp">
                    <input type="number" v-model="inp1">
                    <div></div>
                    <input type="number" v-model="inp2">
                    <el-button type="primary" size="mini" round @click="customOne();search4();searcher()">搜索</el-button>
                  </div>
                  <span><img @click="influencefactorDown" v-show="inpp1" src="../../public/img/xia1.png" alt=""></span>
                  <span><img @click="influencefactorDown" v-show="!inpp1" src="../../public/img/shang1.png" alt=""></span>
                </el-checkbox-group>
              </li>
              <li>
                <p><img src="../../public/img/year.png"><span>出版年份:</span></p>
                  <el-checkbox-group v-model="checkList2" @change="checkListTwo();search4();searcher()">
                  <el-checkbox label="2018"></el-checkbox>
                  <el-checkbox label="2019"></el-checkbox>
                  <el-checkbox label="2020"></el-checkbox>
                  <div class="InputP" v-show="inpp2">
                    <input type="number" v-model="inp3">
                    <div></div>
                    <input type="number" v-model="inp4">
                    <el-button type="primary" size="mini" round @click="yearOne();search4();searcher()">搜索</el-button>
                  </div>
                  <span><img @click="yearDown" v-show="inpp3" src="../../public/img/xia1.png" alt=""></span>
                  <span><img @click="yearDown" v-show="!inpp3" src="../../public/img/shang1.png" alt=""></span>
                </el-checkbox-group>
              </li>
              <li>
                <p><img src="../../public/img/article.png"><span>文献类型:</span></p>
                  <el-checkbox-group value="checkList" v-model="checkList3" @change="checkListThree();search4();searcher()">
                    <el-checkbox label="Journal Article">Article</el-checkbox>
                    <el-checkbox label="Review">综述</el-checkbox>
                    <div v-if="type1">
                      <el-checkbox label="Practice Guideline">指南</el-checkbox>
                      <el-checkbox label="Meta-Analysis">Meta分析</el-checkbox>
                      <el-checkbox label="Clinical Trial,Multicenter Study">临床试验</el-checkbox>
                      <el-checkbox label="Case Reports">病例报告</el-checkbox>
                      <el-checkbox label="English Abstract">英文摘要</el-checkbox>
                      <el-checkbox label="Randomized Controlled Trial">随机对照实验</el-checkbox>
                      <el-checkbox label="Comparative Study">对照实验</el-checkbox>
                      <el-checkbox label="rests">其他</el-checkbox>
                    </div>
                  </el-checkbox-group>
                <span><img @click="type2()" v-if="type3" src="../../public/img/xia1.png" alt=""></span>
                <img @click="type2()" v-if="!type3" src="../../public/img/shang1.png" alt="">
              </li>
            </ul>
          </div>
          <div class="SearchBodyTwo col-sm-10" v-if="show" v-loading="loading"
          element-loading-text="拼命加载中"
          element-loading-spinner="el-icon-loading"
          element-loading-background="f5f5f5">
            <ul v-if="JSON.stringify(Article)!='{}'">
              <li v-for="(item,i) in data1" :key="i">
                <div>
                  <p v-if="!zh">
                    <img @click="collection(item.PMID,pmidList)" :id="item.PMID" class="shoucang" :src="pmidList==undefined  || pmidList.indexOf(item.PMID)==-1?shoucang1:pmidList.indexOf(item.PMID)!=-1?shoucang10:shoucang1" :title="pmidList==undefined  || pmidList.indexOf(item.PMID)==-1?shoucang2:shoucang11">
                    <span v-html="item.title" id="sp1" @click="toLiterature(item.PMID)"></span><img @click="copy1" src="../../public/img/copy.png" alt="复制" title="复制">
                  </p>
                  <p v-if="zh">
                    <img @click="collection(item.PMID,pmidList)" :id="item.PMID" class="shoucang" :src="pmidList==undefined  || pmidList.indexOf(item.PMID)==-1?shoucang1:pmidList.indexOf(item.PMID)!=-1?shoucang10:shoucang1" :title="pmidList==undefined  || pmidList.indexOf(item.PMID)==-1?shoucang2:shoucang11">
                    <span  v-html="item.titleZh" @click="toLiterature(item.PMID)"></span><img @click="copy1" src="../../public/img/copy.png" alt="复制" title="复制">
                  </p>
                  <div></div>
                  <div>
                    <div>
                      <span v-popover:popover1 @click="getText(list);search4();searcher()" v-for="(list,i) of item.authorList" :key="i">
                        {{list.lastName}} {{list.initials}},
                      </span>
                    </div>
                    <div class="datas">
                      <div>
                        <!-- <div><span>Article</span></div> -->
                        <ul>
                          <li><span @click="toJournal(item.journal.nlmId,item.journal.course)">{{item.journal.subName}}</span></li>
                          <li><span v-if="item.journal.nowIfs!=null">{{item.journal.nowIfs}}</span><span v-else>N/A</span></li>
                          <li><span v-if="item.journal.qClass!=null">{{item.journal.qClass}}</span><span v-else>N/A</span></li>
                        </ul>
                      </div>
                      <div>
                        <p>
                          <span>{{item.pubTime}};{{item.volume}};{{item.pagination}}</span>
                          <span>DOl:{{item.doi}}</span>
                        </p>
                      </div>
                    </div>
                    <div>
                      <span v-html="item.abstractText" v-if="!zh"></span>
                      <span v-html="item.abstractTextZh" v-if="zh && item.abstractTextZh!=null"></span>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
            <div v-else>
              <div style="width:100%;text-align: center">
                <img style="margin-top:200px;height:150px" src="../../public/img/none.png" alt="">
              </div>
            </div>
            <el-pagination
              @current-change="handleCurrentChange"
              :current-page.sync="currentPage"
              layout="prev, pager, next,jumper" 
              :total="result"
              v-if="el_show">
            </el-pagination>
          </div>
          <div class="SearchBodyThree col-sm-2" v-if="show">
            <div>
              <el-button style="background:#3366cc;color:#fff;border:1px solid #3366cc;margin-bottom:10px" @click="export1()" plain>结果杂志统计</el-button>
              <el-button style="background:#3366cc;color:#fff;border:1px solid #3366cc;margin-bottom:10px" v-if="analy" id="ana" @click.stop="analysis()" plain>搜索结果分析</el-button>
            </div>
            <div>
              <p>最新动态</p>
              <div></div>
              <p v-for="(item,i) of data7" :key="i"><span  @click="toShengxinren(item.id)">{{item.title}}</span></p>
            </div>
            <div >
              <p>历史记录</p>
              <div></div>
              <p @click="his1(item)" v-for="(item,i) of data13" :key="i">{{item}}</p>
            </div>
          </div>
          <div class="SearchBodyFore"  v-loading="loading"
          element-loading-text="拼命加载中"
          element-loading-spinner="el-icon-loading"
          element-loading-background="f5f5f5" id="view" ref="canvas" v-if="!show">
            <div class="ForeContent">
              <div>
                <img src="../../public/img/forebg.png" alt="">
                <ul>
                  <li><img src="../../public/img/logo7.png" alt=""></li>
                  <li>
                    <p>大数据分析图表</p>
                    <p>Sangerbox Big Data Analysis Chart</p>
                  </li>
                  <li><p>{{systemDate}}<span  @click="savecanvas()" style="cursor: pointer;">导出</span></p></li>
                </ul>
              </div>
              <div>
                <ul>
                  <li>
                    <div>
                      <p>期刊统计</p>
                      <div class="perer">
                        <div id="per1" :style="{width: '260px', height: '170px'}"></div>
                      </div>
                      
                    </div>
                  </li>
                  <li>
                    <div class="partition">
                      <p>分区统计</p>
                      <div id="parti">
                        <div id="part1" :style="{width: '200px', height: '150px'}"></div>
                      </div>
                      
                    </div>
                  </li>
                  <li>
                    <div class="mesh">
                      <p>Mesh分析</p>
                      <div class="mesh1" style="cursor: pointer;" @click="mesh2(item.name)" v-for="(item,i) of data2" :key="i">
                        <div>
                          <div></div>
                        </div>
                        <div>
                          <p><span>{{item.name}}</span><span>{{item.count}}</span></p>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div>
                      <p>通讯作者</p>
                      <div class="Periodical">
                        <div class="perLeft">
                          <div id="per2" :style="{width: '160px', height: '170px'}"></div>
                        </div>
                        <div class="perRight">
                          <div id="per3" :style="{width: '160px', height: '170px'}"></div>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
              <div class="Country">
                <div class="country1">
                  <div>
                    <p>发布国家统计</p>
                    <div class="count1">
                     <div id="per4" :style="{width: '200px', height: '270px'}"></div>
                    </div>
                  </div>
                  <div><img src="../../public/img/map.png" alt=""></div>
                </div>
                <div class="Countrymen">
                  <p>国人发刊</p>
                  <div>
                    <div id="count" :style="{width: '338px', height: '270px'}"></div>
                  </div>
                </div>
                <div class="first1">
                  <p>第一作者</p>
                  <div>
                    <div>
                      <p><img src="../../public/img/bang1.png" alt=""></p>
                      <p><img src="../../public/img/bang2.png" alt=""></p>
                      <p><img src="../../public/img/bang3.png" alt=""></p>
                      <p>NO.4</p>
                      <p>NO.5</p>
                      <p>NO.6</p>
                    </div>
                    <div @click="First2(item.name)" style="cursor: pointer;" class="First" v-for="(item,i) of data3" :key="i">
                      <div><p>{{item.name}}</p></div>
                      <div><p>{{item.count}}</p></div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="foreFoot">
                <div class="foot1">
                  <p>关键字统计</p>
                  <div class="Foot1">
                    <div id="foot1" :style="{width: '320px', height: '180px'}"></div>
                  </div>
                </div>
                <div class="foot2">
                  <p>年份统计</p>
                  <div class="Foot2">
                    <div id="foot2" :style="{width: '370px', height: '200px'}"></div>
                  </div>
                </div>
                <div class="foot3">
                  <p>文章类型</p>
                  <div>
                    <div id="foot3" :style="{width: '370px', height: '220px'}"></div>
                  </div>
                </div>
              </div>
              <div class="fiveFoot">
                <div class="five1">
                  <p >科目统计</p>
                  <div>
                    <div id="five1" :style="{width: '500px', height: '200px'}"></div>
                  </div>
                </div>
                <div class="five2">
                  <p>作者统计</p>
                  <div class="Five2">
                    <div id="five2" :style="{width: '260px', height: '200px'}"></div>
                  </div>
                  
                </div>
                <div class="five3">
                  <p>qclass统计</p>
                  <div class="five4">
                    <div id="five4" :style="{width: '200px', height: '150px'}"></div>
                  </div>
                </div>
              </div>
              <div class="sixFoot">
                <div class="six1">
                  <p>研究方向统计</p>
                  <div>
                    <div id="six1" :style="{width: '500px', height: '400px'}"></div>
                  </div>
                </div>
                <div class="six2">
                  <p>影响因子统计</p>
                  <div>
                    <div id="six2" :style="{width: '500px', height: '400px'}"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
  </div>
</template>
<script>
import Header from '../components/Header'
import Footer from '../components/Footer'
import html2canvas from 'html2canvas';
import FileSaver from 'file-saver';
export default {
  metaInfo() {
    return {title: this.searchContent == undefined ? '文献搜索' : this.searchContent + '-文献搜索'} // set a title
  },
  data() {
    return {
      isactive:false,mess:false,
      dataset : [ 30 , 10 , 43 , 55  ],
      show:true,Entrance:true,e:0,w:0,r:0,t:0,y:0,g:0,j:0,f:0,d:0,i:0,o:0,p:0,u:0,h:0,a:0,q:0,z:0,v:0,n:0,
      inpp:false,inpp1:true,inpp2:false,inpp3:true,inpp4:false,inpp5:true,inpp6:false,inpp7:true,
      inp1:"",inp2:"",inp3:"",inp4:'',inp5:"",inp6:'',inp7:"",inp8:'',
      type3:true,analy:true,
      result:0,zh:false,
      timer:0,loading:false,foreConte:true,
      checkList1: [],checkList2: [],checkList3: [],checkList4: [],checkList5: [],checkList6: [],checkList7:[],
      input1:"",input2:"",input3:"",input4:"",
      isAsc1:false,isDesc1:false,isAsc2:false,isDesc2:false,isAsc3:false,isDesc3:false,
      show1:true,active1:false,show2:true,active2:false,show3:true,active3:false,show4:true,active4:false,show5:true,active5:false,show6:true,active6:false,
      searchContent:'',
      choice:'文 献',
      literature:'文 献',literature2:true,periodical2:false,fund2:false,
      periodical:'期 刊',
      fund:'基 金',ifsAggs:[],
      search:'',a5:[],a6:[],accc:[],a7:[],abbb:[],
      searchPubmedArticle:{},searchPubmedJournal:{},
      a1:{},a2:{},currentPage:1,currentPage1:"",
      chk1:'',chk2:'',chk3:'',chk4:'',chk5:"",chk6:'',chk7:'',chk8:"",chk9:'',chk10:'',chk11:"",
      el_show:true,
      aa:'',ab:'',type1:false,
      field:[
        {
          value:'title',
          label:'Title(标题)'
        },
        {
          value:'firstAuthor',
          label:'First Author(第一作者)'
        },
        {
          value:'lastAuthor',
          label:'Fast Author(最后作者)'
        },
        {
          value:'isoAbbr',
          label:'Journal(期刊名称)'
        },
        {
          value:'pubTime',
          label:'Publication Date(出版日期)'
        },
        {
          value:'volume',
          label:'Volume(卷)'
        },
        {
          value:'pagination',
          label:'Pagination(页码)'
        },
        {
          value:'affiliation',
          label:'Affiliation(单位地址)'
        },
        {
          value:'author',
          label:'Author(作者)'
        },
        {
          value:'entrezTime',
          label:'Entrez Time(entrez日期)'
        },
        {
          value:'grant',
          label:'Grant Number(资助号)'
        },
        {
          value:'issue',
          label:'Issue(期)'
        },
        {
          value:'doi',
          label:'Doi(Doi)'
        },
        {
          value:'pubmedTime',
          label:'Medline Time(Medline日期)'
        },
        {
          value:'acceptedTime',
          label:'Accepted Time(Accepted日期)'
        },
        {
          value:'receivedTime',
          label:'Received Time(Received日期)'
        },
        {
          value:'revisedTime',
          label:'RevisedTime(Revised日期)'
        },
        {
          value:'publicationType',
          label:'Publication Type(文献类型)'
        },
        {
          value:'keyword',
          label:'Keyword(关键词)'
        },
        {
          value:'mesheading',
          label:'MeSh(主/副)主题词'
        },
        {
          value:'chemical',
          label:'Chemical(化学物质名称)'
        },
        {
          value:'email',
          label:'Email(邮箱)'
        }
      ],
      searchCompletion:[],
      model1: "",model2:'',model3:'',model4:'',subCou:'',
      relation:[
        {
          value:'OR',
          label:'OR'
        },
        {
          value:'AND',
          label:'AND'
        },
        {
          value:'NOT',
          label:'NOT'
        }
      ],relation2:'AND',relation3:'AND',relation4:'AND',
      int1:'',int2:'',int3:'',int4:'',Article:{},
      senior1:false,isShow: false,blok:"",jus:'',showSCI:false,isSci:'',
      sort:'',literature3:true,periodical3:false,subCourseAggs:[],courseAggs:[],countryZhAggs:[],subjectAggs:[],publishingCycleAggs:[],typeAggs:[],
      journalAggsName:'',journalAggsCount:'',aggs:'',areaAggs:[],pubCountryAggs:[],lastAuthorAggs:[],journalAggs:[],meshAggs:[],yearTime:[],
      publicationTypeAggs:[],courseAggs:[],keywordAggs:[],authorAggs:[],courseAggs:[],directionAggs:[],qClassAggs:[],ifsCount:'',
      lastAuthorAggsName:'',lastAuthorAggsCount:'',lastAuthorAggsName1:'',lastAuthorAggsCount1:'',chinaTimeCount:'',chinaJournalAggsCount:'',
      pubCountryAggsName:'',pubCountryAggsCount:'',chinaPubAggs:[],chinaPubAggsCount:'',chinaPubAggsName:'',yearTimeName:"",yearTimeCount:'',publicationTypeAggsName:'',publicationTypeAggsCount:'',authorAggsName:'',authorAggsCount:'',courseAggsName:'',courseAggsCount:'',directionAggsName:'',directionAggsCount:'',his:[],shoucang1:require('../../public/img/shoucang.png'),shoucang2:'收藏',shoucang10:require('../../public/img/shoucangactive.png'),phone:"",shoucang11:"取消收藏",pmidList:""
    }
  },
  components:{
    Header,Footer
  },
  created(){
    this.currentPage = Number(localStorage.getItem('pagination')) || 1;
    this.currentPage=1
    this.phone=localStorage.getItem("mobile")
  },
  watch: {
  },
  mounted() {
    this.$refs['input'].focus();
    window.addEventListener('scroll', this.scrollToTop)
    this.addDate()
    this.block()
    this.inf()
  },
  destroyed () {
    window.removeEventListener('scroll', this.scrollToTop)
  },
  updated () {
    this.smootline();
    this.wordcloud();
    this.Histogram();
    this.Subject();
    this.Countrymen();
    this.per1();
    this.per2();
    this.per3();
    this.per4();
    this.author();
    this.pie();
    this.direction();
    this.mechanism();
    this.qclass();
  },
  beforeUpdate () {
    localStorage.setItem('pagination', this.currentPage);
  },
  beforeDestroy () {
    localStorage.setItem('pagination', '1');
    
  },
  computed:{
    chanPage(){
      this.currentPage=parseInt(this.$route.query.page)*1
    }
  },
  computed: {
    noMore () {
      return this.count >= 20
    },
    disabled () {
      return this.loading || this.noMore
    },
    data1: {
      get: function(){
        return this.a1; // 在这里把临时对象的值通过计算属性赋值给页面中用到的对象
      }
    },
    data2: {
      get: function(){
        return this.a5; // 在这里把临时对象的值通过计算属性赋值给页面中用到的对象
      }
    },
    data3: {
      get: function(){
        return this.a6; // 在这里把临时对象的值通过计算属性赋值给页面中用到的对象
      }
    },
    data4: {
      get: function(){
        return this.accc; // 在这里把临时对象的值通过计算属性赋值给页面中用到的对象
      }
    },
    data5:{
      get:function(){
        return this.searchCompletion
      }
    },
    data6:{
      get:function(){
        return this.abbb
      }
    },
    data7:{
      get:function(){
        return this.blok
      }
    },
    data8:{
      get:function(){
        return this.departmentAggs
      }
    },
    data9:{
      get:function(){
        return this.typeAggs1
      }
    },
    data10:{
      get:function(){
        return this.studentsNameAggs
      }
    },
    data11:{
      get:function(){
        return this.unitAggs
      }
    },
    data12:{
      get:function(){
        return this.yearAggs
      }
    },
    data13:{
      get:function(){
        return this.his
      }
    }
  },
  activated() {
    this.getRouterData();
    this.handleCurrentChange()
    this.inf();
    this.getArticle();
    this.history()
  },
  methods:{
    copy1(){
      var Url2 =document.getElementById('sp1').innerText
      var oInput = document.createElement("input");
      oInput.value = Url2;
      document.body.appendChild(oInput);
      oInput.select(); // 选择对象
      document.execCommand("Copy"); // 执行浏览器复制命令
      oInput.className = "oInput";
      oInput.style.display = "none";
      this.$message({
        message: '复制成功',
        type: 'success'
      });
    },
    collection(id,phone){
      var qs=require('qs');
      if(phone==undefined || phone.length<=0){
        if($(`#${id}`).attr("src")==require("../../public/img/shoucang.png")){
          this.axios.post(`/pubmed/editArticleCollect`, qs.stringify({
            pmid:id,
            isCollect:1
          })).then(result=>{
            if(result.data.res.count>0){
              $(`#${id}`).attr("src",require("../../public/img/shoucangactive.png"));
              $(`#${id}`).attr("title",'取消收藏');
            }
          }).catch(error=>{
            if(error){
              throw error
            }
          })
        }else{
          this.$axios.post(`/pubmed/editArticleCollect`, qs.stringify({
            pmid:id,
            isCollect:0
          })).then(result=>{
            if(result.data.res.count>0){
              $(`#${id}`).attr("src",require("../../public/img/shoucang.png"));
              $(`#${id}`).attr("title",'收藏');
            }
          }).catch(error=>{
            if(error){
              throw error
            }
          })
        }
      }else if(phone!=undefined || phone.length<=0){
        if($(`#${id}`).attr("src")==require("../../public/img/shoucang.png")){
          this.axios.post(`/pubmed/editArticleCollect`, qs.stringify({
            pmid:id,
            isCollect:1
          })).then(result=>{
            if(result.data.res.count>0){
              $(`#${id}`).attr("src",require("../../public/img/shoucangactive.png"));
              $(`#${id}`).attr("title",'取消收藏');
            }
          }).catch(error=>{
            if(error){
              throw error
            }
          })
        }else{
          this.$axios.post(`/pubmed/editArticleCollect`, qs.stringify({
          pmid:id,
          isCollect:0
        })).then(result=>{
          if(result.data.res.count>0){
            $(`#${id}`).attr("src",require("../../public/img/shoucang.png"));
            $(`#${id}`).attr("title",'收藏');
          }
        }).catch(error=>{
          if(error){
            throw error
          }
        })
        }
      }
    },
    his1(hi){
      const {href}=this.$router.resolve({
        path: '/Search',
        query:{
          search1:hi
        }
      })
      window.open(href,'_blank')
    },
    history(){
      if(typeof(this.searchContent)!='undefined'){
        var mj=this.searchContent.replace(/\s*/g,"")
        if(mj!=""){
          var nnnn=JSON.parse(localStorage.getItem('Searchhistory'))
          if(nnnn==null){
            nnnn=[]
            nnnn.unshift(mj)
          }else if(nnnn!=null){
            nnnn.unshift(mj)
          }
          localStorage.setItem('Searchhistory', JSON.stringify(nnnn));
        }
      }
      var nm=localStorage.getItem('Searchhistory')
      this.his=JSON.parse(nm)
      if(this.his!=null){
        if(this.his.length>4){
          this.his=this.his.slice(0,4)
        }else{
          this.his
        }
      }else{
        this.his=[]
      }
    },
    to884(){
      window.open('https://shengxin.ren/article/884','_blank')
    },
    to885(){
      window.open('https://shengxin.ren/article/885','_blank')
    },
    to886(){
      window.open('https://shengxin.ren/article/886','_blank')
    },
    to887(){
      window.open('https://shengxin.ren/article/887','_blank')
    },
    to888(){
      window.open('https://shengxin.ren/article/888','_blank')
    },
    to889(){
      window.open('https://shengxin.ren/article/889','_blank')
    },
    toContribute(){
      const {href}=this.$router.resolve({
        path: '/Contribute'
      })
      window.open(href,'_blank')
    },
    toShengxinren(id){
      let url=`https://shengxin.ren/article/${id}`
      window.open(url,'_blank')
    },
    block(){
      $.ajax({
        url:'https://shengxin.ren/sxrpost/getBlog',
        dataType:'json',
        type:'GET',
        success:res=>{
          this.blok=(res.data).slice(0,4)
        }
      })
    },
    settingEvent(){
    },
    downAnalysis(){
      this.h++
      this.show=true
    },
    addDate() {
      let nowDate = new Date();
      let date = {
        year: nowDate.getFullYear(),
        month: nowDate.getMonth() + 1,
        date: nowDate.getDate(),
      }
      this.systemDate = date.year + '-'  + date.month + '-'  + date.date;
    },
    high(){
      this.d++;
      if(this.d%2==1){
        this.senior1=true;
      }else{
        this.senior1=false;
      }
    },
    export1(){
      this.mess=true
      var qs=require('qs');
      this.axios.post(`/pubmed/downloadPubmedArticleAll`, qs.stringify({
        queryStringQuery:this.searchContent,
        ifsFilter:this.chk1 || this.chk4,
        yearsFilter:this.chk2 || this.chk5,
        typeFilter:this.chk3
      },{responseType:'arraybuffer'})).then(res => {
        if (res.data.status == 200) {
          downloadJournalAllTxt(res.data.res.journalList.ifsJournalAggs.journalAggs);
          this.mess=false
        } else {
          this.$message.error({
            message: "导出失败"
          })
        }
      });
      function StringBuilder() {
        this._stringArray = new Array();
        }
        StringBuilder.prototype.append = function (str) {
        this._stringArray.push(str);
        }
        StringBuilder.prototype.toString = function (joinGap) {
        return this._stringArray.join(joinGap);
      } 
      function downloadJournalAllTxt(journalMap){
        var map=journalMap;
        let txtContent = new StringBuilder();
        var journal=null;
        txtContent.append("杂志名称\t中科院分区\t学科分类\tQ\t影响因子\tISSN\t杂志链接\t难易程度\t投稿速度\t国家\t文章数量");
        for(var key in map){
          journal=map[key];
          var fullName=journal.journalData.searchData[0].journal.fullName;
          var course=journal.journalData.searchData[0].journal.course!=undefined?journal.journalData.searchData[0].journal.course:"N/A";
          var area=journal.journalData.searchData[0].journal.area!=undefined?"("+journal.journalData.searchData[0].journal.area+")":"";
          var subCourse=journal.journalData.searchData[0].journal.subCourse!=undefined?journal.journalData.searchData[0].journal.subCourse:"N/A";
          var qClass=journal.journalData.searchData[0].journal.qClass!=undefined?journal.journalData.searchData[0].journal.qClass:"N/A";
          var nowIfs=journal.journalData.searchData[0].journal.nowIfs;
          // var nowIfs=journal.journalData.searchData[0].journal.ifs.year2019;
          var issn=journal.journalData.searchData[0].journal.issn!=undefined?journal.journalData.searchData[0].journal.issn:journal.journalData.searchData[0].journal.essn;
          var officialUrl=journal.journalData.searchData[0].journal.officialUrl!=undefined?journal.journalData.searchData[0].journal.officialUrl:"N/A";
          var enterPresent=journal.journalData.searchData[0].journal.enterPresent!=undefined?journal.journalData.searchData[0].journal.enterPresent:"N/A";
          var acceptTime=journal.journalData.searchData[0].journal.acceptTime!=undefined?journal.journalData.searchData[0].journal.acceptTime:"N/A";
          var publishingCountry=journal.journalData.searchData[0].journal.publishingCountry!=undefined?journal.journalData.searchData[0].journal.publishingCountry:"N/A";
          var articleCount=journal.count!=undefined?journal.count:"N/A";
          txtContent.append(fullName+"\t"+course+area+"\t"+subCourse+"\t"+qClass+"\t"+nowIfs+"\t"+issn+"\t"+officialUrl+"\t"+enterPresent+"\t"+acceptTime+"\t"+publishingCountry+"\t"+articleCount);
        }
        var filename = "journal.txt";
        var blob = new Blob([txtContent.toString("\n")], {
          type: "text/plain;charset=utf-8"
        });
        saveAs(blob, filename); 
      }
      
    },
    translate(){
      this.z++
      if(this.z%2==1){
        this.zh=true
      }else{
        this.zh=false
      }
    },
    getRouterData(){
      if(typeof(this.$route.query.search)!="undefined"){
        $("#lit").click()
      }
      this.searchContent=this.$route.query.search1
    },
    toLiterature(pmid){
      const {href} =this.$router.resolve({
        path: '/Literature',
        query: {
          Id:pmid
        },
      })
      window.open(href, '_blank')
    },
    nlmId(id){
      this.searchContent="nlmId:"+id;
      this.periodical2=false;
      this.literature2=true;
      this.i++;
      this.choice=this.literature;
    },
    scrollToTop () {
      //返回顶部
      const that = this
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      that.scrollTop = scrollTop
      if (that.scrollTop > 60) {
        that.btnFlag = true
      } else {
        that.btnFlag = false
      }
    },
    savecanvas(){
      //数据分析图导出
      const that = this
      let timer = setInterval(() => {
        let ispeed = Math.floor(-that.scrollTop / 5)
        document.documentElement.scrollTop = document.body.scrollTop = that.scrollTop + ispeed
        if (that.scrollTop === 0) {
          clearInterval(timer)
        }
      }, 16)
      setTimeout(function(){
        let canvas = document.querySelector('#view');
        html2canvas(canvas,{scale:2,logging:false,useCORS:true}).then(function(canvas) {
          let type = 'png';
          let imgData = canvas.toDataURL('image/jpeg',.99);
          // 照片格式处理
          let _fixType = function(type) {
              type = type.toLowerCase().replace(/jpg/i, 'jpeg');
              let r = type.match(/png|jpeg|bmp|gif/)[0];
              return 'image/' + r;
          };
          imgData = imgData.replace(_fixType(type),'image/octet-stream');
          let filename = "SangerBox" + '.' + type;
          that.saveFile(imgData,filename);
        });
      },500)
    },
    saveFile(data, filename){
      //数据分析图导出
      let save_link = document.createElementNS('http://www.w3.org/1999/xhtml', 'a');
      save_link.href = data;
      save_link.download = filename;
      let event = document.createEvent('MouseEvents');
      event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
      save_link.dispatchEvent(event);
    },
    First2(name){
      if(typeof(this.searchContent)=='undefined' || this.searchContent==''){
        this.h++
        var date=new Date();
        let date1=date.getFullYear()+'-'+((date.getMonth()+1)<10?'0'+(date.getMonth()+1):date.getMonth()+1)+'-'+(date.getDate()<10?'0'+date.getDate():date.getDate())
        this.searchContent=`firstAuthor:"${name}" AND pubTime:"${date1}"`
        this.show=true
        $("#sea").click()
      }else{
        let a=this.searchContent
        this.h++
        this.show=true
        this.searchContent=`${a} AND firstAuthor:"${name}"`
        $("#sea").click()
      }
    },
    mesh2(name){
      if(typeof(this.searchContent)=='undefined' || this.searchContent==''){
        this.h++
        var date=new Date();
        let date1=date.getFullYear()+'-'+((date.getMonth()+1)<10?'0'+(date.getMonth()+1):date.getMonth()+1)+'-'+(date.getDate()<10?'0'+date.getDate():date.getDate())
        this.searchContent=`mesheading:"${name}" AND pubTime:"${date1}"`
        this.show=true
        $("#sea").click()
      }else{
        let a=this.searchContent
        this.h++
        this.show=true
        this.searchContent=`${a} AND mesheading:"${name}"`
        $("#sea").click()
      }
    },
    //qclass图
    qclass(){
      //qclass图
      var qClassAggs1=this.qClassAggs;
      var ccc = JSON.parse(JSON.stringify(qClassAggs1).replace(/count/g,"value"));
      $('.five4').html('<div id="five4" style="width: 200px; height: 150px"></div>')
      var echarts1 = document.getElementById("five4");
      // 绘制图表
      if(echarts1){
        let myChart = this.echarts.init(echarts1)
        myChart.clear()
        myChart.setOption({
          tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          color:['#5c65b0', '#ed6c18','#f3b407','#13b88b','#00b4ff'],
          series : [
            {
              name: '访问来源',
              type: 'pie',
              radius : '55%',
              center: ['50%', ' 40%'],
              data:ccc,
              label:{
                normal:{
                  position:"inside",
                  fontSize:11
                }
              },
            }
          ]
        })
        myChart.off('click')
        myChart.on('click',(params)=>{
          if(typeof(this.searchContent)=='undefined' || this.searchContent==''){
            this.h++
            var date=new Date();
            let date1=date.getFullYear()+'-'+((date.getMonth()+1)<10?'0'+(date.getMonth()+1):date.getMonth()+1)+'-'+(date.getDate()<10?'0'+date.getDate():date.getDate())
            this.searchContent=`journal.qClass:"${params.name}" AND pubTime:"${date1}"`
            this.show=true
            $("#sea").click()
          }else{
            let a=this.searchContent
            this.h++
            this.show=true
            this.searchContent=`${a} AND journal.qClass:"${params.name}"`
            $("#sea").click()
          }
        })
      }
    },
    //影响因子统计
    mechanism(){
      let ifsAggs1=this.ifsAggs;
      let b=[];
      let c=[];
      let d=[];
      for(let a of ifsAggs1){
        b.push(a.name)
        c.push(a.count)
        d.push(a.chinaAggs.chinaAggs)
      }
      b.reverse();
      c.reverse();
      d.reverse();
      $('.Six2').html('<div id="six2" style="width: 500px; height: 400px"></div>')
      var echarts1 = document.getElementById("six2");
      // 绘制图表
      if(echarts1){
        let myChart = this.echarts.init(echarts1)
        myChart.clear()
        myChart.setOption({
          color: ['#3398DB'],
          tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
              type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            },
          },
          legend: {
            data:['中国','全球'],
            x:'right',
            textStyle: {color: '#fff',fontSize:10},
            itemGap: 5,
          },
          grid: {
            left: '3%',
            right: '4%',
            top:'15%',
            containLabel: true
          },
          xAxis: {
            type: 'value',
            axisLine: {
              show:false
            },
            splitLine: {
              show:false
            },
            axisLabel:{
              show:false
            },
            axisTick:{
              show:false
            }
          },  
          yAxis: {
            
            type: 'category',
            data: b,
            axisLine: {
              show:false
            },
            splitLine: {
              show:false
            },
            axisTick:{
              show:false
            },
            axisLabel:{
              color:"#fff",
              formatter: function (value) {
                var maxlength=15;
                if (value.length>maxlength) {
                  return value.substring(0, maxlength-1)+'...';
                } else{
                  return value;
                };
              },
            }
          },
          series : [
            {
              name:'中国',
              type:'bar',
              barWidth: '60%',
              stack: '总量',
              data:d,
              barWidth:10,
              itemStyle:{
                normal:{
                  color:'#36E7B3' 
                }
              }
            },
            {
              name:'全球',
              type:'bar',
              barWidth: '60%',
              stack: '总量',
              data:c,
              barWidth:10,
              itemStyle:{
                normal:{
                  color:'rgba(143,148,163,.8)',
                }
              }
            }
          ]
        })
        myChart.off('click')
        myChart.on('click',(params)=>{
          if(typeof(this.searchContent)=='undefined' || this.searchContent==''){
            this.h++
            var date=new Date();
            let date1=date.getFullYear()+'-'+((date.getMonth()+1)<10?'0'+(date.getMonth()+1):date.getMonth()+1)+'-'+(date.getDate()<10?'0'+date.getDate():date.getDate())
            let abc=(params.name).split("-")
            if(params.seriesName=="中国"){
              this.searchContent=`journal.nowIfs:"${abc[0]} TO ${abc[1]}" AND pubTime:"${date1}" AND pubCountry:"China"`
              this.show=true
              $("#sea").click()
            }else{
              this.searchContent=`journal.nowIfs:[${abc[0]} TO ${abc[1]}] AND pubTime:"${date1}"`
              this.show=true
              $("#sea").click()
            }
          }else{
            let a=this.searchContent
            this.h++
            this.show=true
            let abc=(params.name).split("-")
            if(params.seriesName=="中国"){
              this.searchContent=`${a} AND journal.nowIfs:[${abc[0]} TO ${abc[1]}] AND pubCountry:"China"`
              this.show=true
              $("#sea").click()
            }else{
              this.searchContent=`${a} AND journal.nowIfs:[${abc[0]} TO ${abc[1]}]`
              this.show=true
              $("#sea").click()
            }
          }
        })
      }
    },
    //研究方向统计
    direction(){
      var direction1=this.directionAggs;
      var ccc = JSON.parse(JSON.stringify(direction1).replace(/count/g,"value"));
      $('.Six1').html('<div id="six1" style="width: 500px; height: 400px;margin-top:-55px"></div>')
      var echarts1 = document.getElementById("six1");
      // 绘制图表
      if(echarts1){
        let myChart = this.echarts.init(echarts1)
        myChart.clear()
        myChart.setOption({
          tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
            x : 'center',
            y : 'bottom',
            data:ccc.name,
            textStyle: { //图例文字的样式
              color: '#fff',
            },
          },
          calculable : true,
          series : [
            {
              name:'研究方向统计',
              type:'pie',
              radius : [30, 110],
              center : ['50%', '50%'],
              roseType : 'area',
              data:ccc,
            }
          ],
          color:['#dcffcc','#9fdfcd','#baabda','#d79abc','#f2a6a6','#e7f3ee','#fcf9ea','#ffba92','#60a9a6','#be97dc']
        })
        myChart.off('click')
        myChart.on('click',(params)=>{
          if(typeof(this.searchContent)=='undefined' || this.searchContent==''){
            this.h++
            var date=new Date();
            let date1=date.getFullYear()+'-'+((date.getMonth()+1)<10?'0'+(date.getMonth()+1):date.getMonth()+1)+'-'+(date.getDate()<10?'0'+date.getDate():date.getDate())
            this.searchContent=`journal.direction:"${params.name}" AND pubTime:"${date1}"`
            this.show=true
            $("#sea").click()
          }else{
            let a=this.searchContent
            this.h++
            this.show=true
            this.searchContent=`${a} AND journal.direction:"${params.name}"`
            $("#sea").click()
          }
        })
      }
    },
    pie(){
      var areaAggs1=this.areaAggs;
      var bbb = JSON.parse(JSON.stringify(areaAggs1).replace(/count/g,"value"));
      $('#parti').html('<div id="part1" style="width: 200px; height: 150px"></div>')
      var echarts1 = document.getElementById("part1");
      // 绘制图表
      var b=this.searchContent
      if(echarts1){
        let myChart = this.echarts.init(echarts1)
        myChart.clear();
        myChart.setOption({
          tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          color:['#5c65b0', '#ed6c18','#f3b407','#13b88b','#00b4ff'],
          series : [
            {
              name: '访问来源',
              type: 'pie',
              radius : '55%',
              center: ['50%', ' 40%'],
              data:bbb,
              label:{
                normal:{
                  position:"inside",
                  fontSize:11
                }
              },
            }
          ]
        })
        myChart.off('click')
        myChart.on('click',(params)=>{
          if(typeof(this.searchContent)=='undefined' || this.searchContent==''){
            this.h++
            var date=new Date();
            let date1=date.getFullYear()+'-'+((date.getMonth()+1)<10?'0'+(date.getMonth()+1):date.getMonth()+1)+'-'+(date.getDate()<10?'0'+date.getDate():date.getDate())
            this.searchContent=`journal.area:"${params.name}" AND pubTime:"${date1}"`
            this.show=true
            $("#sea").click()
          }else{
            let a=this.searchContent
            this.h++
            this.show=true
            this.searchContent=`${a} AND journal.area:"${params.name}"`
            $("#sea").click()
          }
        })
      }
    },
    //发布国家
    per4(){
      this.pubCountryAggs.splice(7,10);
      var b=[];
      var c=[];
      for(var a of this.pubCountryAggs){
        b.push(a.name)
        c.push(a.count)
      }
      this.pubCountryAggsName=b;
      this.pubCountryAggsName.reverse();
      this.pubCountryAggsCount=c;
      this.pubCountryAggsCount.reverse();
      $('.count1').html('<div id="per4" style="width: 200px; height: 270px;margin-top:-55px"></div>"></div>')
      var echarts1 = document.getElementById("per4");
      // 绘制图表
      if(echarts1){
        let myChart = this.echarts.init(echarts1)
        myChart.clear()
        myChart.setOption({
          color: ['#3398DB'],
          tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
              type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            },
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: {
            type: 'value',
            axisLine: {
              show:false
            },
            splitLine: {
              show:false
            },
            axisLabel:{
              show:false
            },
            axisTick:{
              show:false
            }
          },  
          yAxis: {
            type: 'category',
            data: this.pubCountryAggsName,
            axisLine: {
              show:false
            },
            splitLine: {
              show:false
            },
            axisTick:{
              show:false
            },
            axisLabel:{
              color:"#fff",
              formatter: function (value) {
                var maxlength=7;
                if (value.length>maxlength) {
                  return value.substring(0, maxlength-1)+'...';
                } else{
                  return value;
                };
              },
            }
          },
          series : [
            {
              name:'数量',
              type:'bar',
              barWidth: '60%',
              data:this.pubCountryAggsCount,
              barWidth:5
              ,
              itemStyle:{
                normal:{
                  label:{
                    show:true,
                    position:"right",
                    textStyle:{
                      color:"#fff",
                      fontSize:12
                    }
                  },
                  color: function (params){
                    var colorList = ['#8282DC','#8282DC','#8282DC','#8282DC','#36E7B3','#EBED37','#ED6C18'];
                    return colorList[params.dataIndex];
                  }
                }
              }
            }
          ]
        })
        myChart.off('click')
        myChart.on('click',(params)=>{
          if(typeof(this.searchContent)=='undefined' || this.searchContent==''){
            this.h++
            var date=new Date();
            let date1=date.getFullYear()+'-'+((date.getMonth()+1)<10?'0'+(date.getMonth()+1):date.getMonth()+1)+'-'+(date.getDate()<10?'0'+date.getDate():date.getDate())
            this.searchContent=`pubCountry:"${params.name}" AND pubTime:"${date1}"`
            this.show=true
            $("#sea").click()
          }else{
            let a=this.searchContent
            this.h++
            this.show=true
            this.searchContent=`${a} AND pubCountry:"${params.name}"`
            $("#sea").click()
          }
        })
      }
    },
    //通讯作者
    per3(){
      var lastAuthorAggs1=this.lastAuthorAggs.slice(5,10);
      var b=[];
      var c=[];
      for(var a of lastAuthorAggs1){
        b.push(a.name)
        c.push(a.count)
      }
      this.lastAuthorAggsName1=b;
      this.lastAuthorAggsName1.reverse();
      this.lastAuthorAggsCount1=c;
      this.lastAuthorAggsCount1.reverse();
      $('.perRight').html('<div id="per3" style="width: 160px; height: 170px;margin-top:-55px"></div>"></div>')
      var echarts1 = document.getElementById("per3");
      // 绘制图表
      if(echarts1){
        let myChart = this.echarts.init(echarts1)
        myChart.clear();
        myChart.setOption({
          color: ['#3398DB'],
          tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
              type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            },
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: {
            type: 'value',
            axisLine: {
              show:false
            },
            splitLine: {
              show:false
            },
            axisLabel:{
              show:false
            },
            axisTick:{
              show:false
            }
          },  
          yAxis: {
            type: 'category',
            data: this.lastAuthorAggsName1,
            axisLine: {
              show:false
            },
            splitLine: {
              show:false
            },
            axisTick:{
              show:false
            },
            axisLabel:{
              color:"#fff",
              formatter: function (value) {
                var maxlength=10;
                if (value.length>maxlength) {
                  return value.substring(0, maxlength-1)+'...';
                } else{
                  return value;
                };
              },
            }
          },
          series : [
            {
              name:'通讯作者',
              type:'bar',
              barWidth: '60%',
              data:this.lastAuthorAggsCount1,
              barWidth:5
              ,
              itemStyle:{
                normal:{
                  label:{
                    show:true,
                    position:"right",
                    textStyle:{
                      color:"#fff",
                      fontSize:12
                    }
                  },
                  color: function (params){
                    var colorList = ['#8282DC','#8282DC','#8282DC'];
                    return colorList[params.dataIndex];
                  }
                }
              }
            }
          ]
        })
        myChart.off('click')
        myChart.on('click',(params)=>{
          if(typeof(this.searchContent)=='undefined' || this.searchContent==''){
            this.h++
            var date=new Date();
            let date1=date.getFullYear()+'-'+((date.getMonth()+1)<10?'0'+(date.getMonth()+1):date.getMonth()+1)+'-'+(date.getDate()<10?'0'+date.getDate():date.getDate())
            this.searchContent=`lastAuthor:"${params.name}" AND pubTime:"${date1}"`
            this.show=true
            $("#sea").click()
          }else{
            let a=this.searchContent
            this.h++
            this.show=true
            this.searchContent=`${a} AND lastAuthor:"${params.name}"`
            $("#sea").click()
          }
        })
      }
    },
    //通讯作者
    per2(){
      var lastAuthorAggs2=this.lastAuthorAggs.slice(0,5);
      var b=[];
      var c=[];
      for(var a of lastAuthorAggs2){
        b.push(a.name)
        c.push(a.count)
      }
      this.lastAuthorAggsName=b;
      this.lastAuthorAggsName.reverse();
      this.lastAuthorAggsCount=c;
      this.lastAuthorAggsCount.reverse();
      $('.perLeft').html('<div id="per2" style="width: 160px; height: 170px;margin-top:-55px"></div>"></div>')
      var echarts1 = document.getElementById("per2");
      // 绘制图表
      if(echarts1){
        let myChart = this.echarts.init(echarts1)
        myChart.clear();
        myChart.setOption({
          color: ['#3398DB'],
          tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
              type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            },
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: {
            type: 'value',
            axisLine: {
              show:false
            },
            splitLine: {
              show:false
            },
            axisLabel:{
              show:false
            },
            axisTick:{
              show:false
            }
          },  
          yAxis: {
            type: 'category',
            data: this.lastAuthorAggsName,
            axisLine: {
              show:false
            },
            splitLine: {
              show:false
            },
            axisTick:{
              show:false
            },
            axisLabel:{
              color:"#fff",
              formatter: function (value) {
                var maxlength=10;
                if (value.length>maxlength) {
                  return value.substring(0, maxlength-1)+'...';
                } else{
                  return value;
                };
              },
            }
          },
          series : [
            {
              name:'通讯作者',
              type:'bar',
              barWidth: '60%',
              data:this.lastAuthorAggsCount,
              barWidth:5
              ,
              itemStyle:{
                normal:{
                  label:{
                    show:true,
                    position:"right",
                    textStyle:{
                      color:"#fff",
                      fontSize:12
                    }
                  },
                  color: function (params){
                    var colorList = ['#8282DC','#8282DC','#36E7B3','#EBED37','#ED6C18'];
                    return colorList[params.dataIndex];
                  }
                }
              }
            }
          ]
        })
        myChart.off('click')
        myChart.on('click',(params)=>{
          if(typeof(this.searchContent)=='undefined' || this.searchContent==''){
            this.h++
            var date=new Date();
            let date1=date.getFullYear()+'-'+((date.getMonth()+1)<10?'0'+(date.getMonth()+1):date.getMonth()+1)+'-'+(date.getDate()<10?'0'+date.getDate():date.getDate())
            this.searchContent=`lastAuthor:"${params.name}" AND pubTime:"${date1}"`
            this.show=true
            $("#sea").click()
          }else{
            let a=this.searchContent
            this.h++
            this.show=true
            this.searchContent=`${a} AND lastAuthor:"${params.name}"`
            $("#sea").click()
          }
        })
      }
    },
    //期刊同期
    per1(){
      this.journalAggs.splice(5,10);
      var b=[];
      var c=[];
      var d=[];
      for(var a of this.journalAggs){
        b.push(a.name)
        c.push(a.count)
        d.push(a.chinaAggs.chinaAggs)
      }
      this.chinaJournalAggsCount=d;
      this.chinaJournalAggsCount.reverse();
      this.journalAggsName=b;
      this.journalAggsName.reverse();
      this.journalAggsCount=c;
      this.journalAggsCount.reverse();
      $('.perer').html('<div id="per1" style="width: 260px; height: 170px"></div>')
      var echarts1 = document.getElementById("per1");
      // 绘制图表
      if(echarts1){
        let myChart = this.echarts.init(echarts1)
        myChart.clear();
        myChart.setOption({
          color: ['#3398DB'],
          tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
              type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            },
          },
          legend: {
            data:['中国','全球'],
            x:'right',
            textStyle: {color: '#fff',fontSize:10},
            itemGap: 5,
          },
          grid: {
            left: '3%',
            right: '4%',
            top:'15%',
            containLabel: true
          },
          xAxis: {
            type: 'value',
            axisLine: {
              show:false
            },
            splitLine: {
              show:false
            },
            axisLabel:{
              show:false
            },
            axisTick:{
              show:false
            }
          },  
          yAxis: {
            
            type: 'category',
            data: this.journalAggsName,
            axisLine: {
              show:false
            },
            splitLine: {
              show:false
            },
            axisTick:{
              show:false
            },
            axisLabel:{
              color:"#fff",
              formatter: function (value) {
                var maxlength=15;
                if (value.length>maxlength) {
                  return value.substring(0, maxlength-1)+'...';
                } else{
                  return value;
                };
              },
            }
          },
          series : [
            {
              name:'中国',
              type:'bar',
              barWidth: '60%',
              stack: '总量',
              data:this.chinaJournalAggsCount,
              barWidth:5,
              itemStyle:{
                normal:{
                  color:'#36E7B3' 
                }
              }
            },
            {
              name:'全球',
              type:'bar',
              barWidth: '60%',
              stack: '总量',
              data:this.journalAggsCount,
              barWidth:5,
              itemStyle:{
                normal:{
                  color:'#e5e9f2',
                }
              }
            }
          ]
        })
        myChart.off('click')
        myChart.on('click',(params)=>{
          if(typeof(this.searchContent)=='undefined' || this.searchContent==''){
            this.h++
            var date=new Date();
            let date1=date.getFullYear()+'-'+((date.getMonth()+1)<10?'0'+(date.getMonth()+1):date.getMonth()+1)+'-'+(date.getDate()<10?'0'+date.getDate():date.getDate())
            if(params.seriesName=="中国"){
              this.searchContent=`isoAbbr:"${params.name}" AND pubTime:"${date1}" AND pubCountry:"China"`
              this.show=true
              this.$router.push({
                path:'/Search',
                query:{
                  chk1:this.chk1,chk2:this.chk2,chk3:this.chk3,chk4:this.chk4,sort:this.sort,page:this.currentPage,search1:this.searchContent,chk5:this.chk5
                }
              })
            }else{
              this.searchContent=`isoAbbr:"${params.name}" AND pubTime:"${date1}"`
              this.show=true
              $("#sea").click()
            }
          }else{
            let a=this.searchContent
            this.h++
            this.show=true
            var date=new Date();
            let date1=date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()
            if(params.seriesName=="中国"){
              this.searchContent=`${a} AND isoAbbr:"${params.name}" AND pubCountry:"China"`
              this.show=true
              $("#sea").click()
            }else{
              this.searchContent=`${a} AND isoAbbr:"${params.name}"`
              $("#sea").click()
            }
          }
        })
      }
    },
    //国人发刊
    Countrymen(){
      var china=this.chinaPubAggs.slice(0,7);
      let b=[];
      let c=[];
      for(var a of china){
        b.push(a.name)
        c.push(a.count)
      }
      this.chinaPubAggsName=b;
      this.chinaPubAggsName.reverse();
      this.chinaPubAggsCount=c;
      this.chinaPubAggsCount.reverse();
      $('.count2').html('<div id="count" style="width: 200px; height: 270px"></div>')
      var echarts1 = document.getElementById("count");
      // 绘制图表
      if(echarts1){
        let myChart = this.echarts.init(echarts1)
        myChart.clear()
        myChart.setOption({
          color: ['#3398DB'],
          tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
              type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            },
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: {
            type: 'value',
            axisLine: {
              show:false
            },
            splitLine: {
              show:false
            },
            axisLabel:{
              show:false
            },
            axisTick:{
              show:false
            }
          },  
          yAxis: {
            type: 'category',
            data: this.chinaPubAggsName,
            axisLine: {
              show:false
            },
            splitLine: {
              show:false
            },
            axisTick:{
              show:false
            },
            axisLabel:{
              color:"#fff",
              formatter: function (value) {
                var maxlength=20;
                if (value.length>maxlength) {
                  return value.substring(0, maxlength-1)+'...';
                } else{
                  return value;
                };
              },
            }
          },
          series : [
            {
              name:'国人发刊',
              type:'bar',
              barWidth: '60%',
              data:this.chinaPubAggsCount,
              barWidth:5
              ,
              itemStyle:{
                normal:{
                  label:{
                    show:true,
                    position:"right",
                    textStyle:{
                      color:"#fff",
                      fontSize:12
                    }
                  },
                  color: function (params){
                    var colorList = ['#8282DC','#8282DC','#8282DC','#8282DC','#36E7B3','#EBED37','#ED6C18'];
                    return colorList[params.dataIndex];
                  }
                }
              }
            }
          ]
        })
        myChart.off('click')
        myChart.on('click',(params)=>{
          if(typeof(this.searchContent)=='undefined' || this.searchContent==''){
            this.h++
            var date=new Date();
            let date1=date.getFullYear()+'-'+((date.getMonth()+1)<10?'0'+(date.getMonth()+1):date.getMonth()+1)+'-'+(date.getDate()<10?'0'+date.getDate():date.getDate())
            this.searchContent=`isoAbbr:"${params.name}" AND pubTime:"${date1}" AND pubCountry:"China"`
            this.show=true
            $("#sea").click()
          }else{
            let a=this.searchContent
            this.h++
            this.show=true
            this.searchContent=`${a} AND isoAbbr:"${params.name}" AND pubCountry:"China"`
            $("#sea").click()
          }
        })
      }
    },
    //科目统计
    Subject(){
      var courseAggs1=this.courseAggs.slice(0,9);
      var b=[];
      var c=[];
      for(var a of courseAggs1){
        b.push(a.name)
        c.push(a.count)
      }
      this.courseAggsName=b;
      this.courseAggsCount=c;
      $('.Five1').html('<div id="five1" style="width: 500px; height: 200px;margin-top:-50px"></div>')
      var echarts1 = document.getElementById("five1");
      // 绘制图表
      if(echarts1){
        let myChart = this.echarts.init(echarts1)
        myChart.clear()
        
        myChart.setOption({
          color: ['#3398DB'],
          tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
              type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            },
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: {
            type: 'category',
            data: this.courseAggsName,
            axisLine: {
              lineStyle: {
                color: '#fff'
              }
            },
            axisLabel:{
              interval:0,  
              rotate:0,
              fontSize:12,
              formatter: function (value) {
                var maxlength=4;
                if (value.length>maxlength) {
                  return value.substring(0, maxlength-1)+'...';
                } else{
                  return value;
                };
              },
            }
          },  
          yAxis: {
            type: 'value',
            axisLine: {
              show:false
            },
            axisLabel : {
              show:false
            },
            splitLine: {
              lineStyle: {
                color: '#63659F',
                type:'dashed'
              }
            }
          },
          series : [
            {
              name:'科目统计',
              type:'bar',
              barWidth: '60%',
              data:this.courseAggsCount,
              barWidth:10
              ,
              itemStyle:{
                normal:{
                  label:{
                    show:true,
                    position:"top",
                    textStyle:{
                      color:"#fff",
                      fontSize:12
                    }
                  },
                  color: function (params){
                    var colorList = ['#ED6C18','#EBED37','#36E7B3','#8282DC','#8282DC','#8282DC','#8282DC',];
                    return colorList[params.dataIndex];
                  }
                }
              }
            }
          ]
        })
        myChart.off('click')
        myChart.on('click',(params)=>{
          if(typeof(this.searchContent)=='undefined' || this.searchContent==''){
            this.h++
            var date=new Date();
            let date1=date.getFullYear()+'-'+((date.getMonth()+1)<10?'0'+(date.getMonth()+1):date.getMonth()+1)+'-'+(date.getDate()<10?'0'+date.getDate():date.getDate())
            this.searchContent=`journal.course:"${params.name}" AND pubTime:"${date1}"`
            this.show=true
            $("#sea").click()
          }else{
            let a=this.searchContent
            this.h++
            this.show=true
            this.searchContent=`${a} AND journal.course:"${params.name}"`
            $("#sea").click()
          }
        })
      }
    },
    //文章类型图表
    Histogram(){
      var publicationTypeAggs1=this.publicationTypeAggs.slice(0,6);
      var b=[];
      var c=[];
      for(var a of publicationTypeAggs1){
        b.push(a.name)
        c.push(a.count)
      }
      this.publicationTypeAggsName=b;
      this.publicationTypeAggsCount=c;
      $('.Foot3').html('<div id="foot3" style="width: 370px; height: 220px"></div>')
      var echarts1 = document.getElementById("foot3");
      // 绘制图表
      if(echarts1){
        let myChart = this.echarts.init(echarts1)
        myChart.clear()
        myChart.setOption({
          color: ['#3398DB'],
          tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
              type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            },
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: {
            type: 'category',
            data: this.publicationTypeAggsName,
            axisLine: {
              lineStyle: {
                color: '#fff'
              }
            },
            axisLabel:{
              interval:0,  
              rotate:0,
              fontSize:12,
              rotate:45,
              formatter: function (value) {
                var maxlength=7;
                if (value.length>maxlength) {
                  return value.substring(0, maxlength-1)+'...';
                } else{
                  return value;
                };
              },
            }
          },  
          yAxis: {
            type: 'value',
            axisLine: {
              show:false
            },
            axisLabel : {
              show:false
            },
            splitLine: {
              lineStyle: {
                color: '#63659F',
                type:'dashed'
              }
            }
          },
          series : [
            {
              name:'文章类型',
              type:'bar',
              barWidth: '60%',
              data: this.publicationTypeAggsCount,
              barWidth:7,
              itemStyle:{
                normal:{
                  label:{
                    show:true,
                    position:"top",
                    textStyle:{
                      color:"#fff",
                      fontSize:12
                    }
                  },
                  color: function (params){
                    var colorList = ['#ED6C18','#EBED37','#36E7B3','#8282DC','#8282DC','#8282DC','#8282DC',];
                    return colorList[params.dataIndex];
                  }
                }
              }
            }
          ]
        })
        myChart.off('click')
        myChart.on('click',(params)=>{
          if(typeof(this.searchContent)=='undefined' || this.searchContent==''){
            this.h++
            var date=new Date();
            let date1=date.getFullYear()+'-'+((date.getMonth()+1)<10?'0'+(date.getMonth()+1):date.getMonth()+1)+'-'+(date.getDate()<10?'0'+date.getDate():date.getDate())
            this.show=true
            $("#sea").click()
          }else{
            let a=this.searchContent
            this.h++
            this.show=true
            this.searchContent=`${a} AND publicationType:"${params.name}"`
            $("#sea").click()
          }
        })
      }
      
    },
    //关键词统计
    wordcloud(){
      var keywordAggs1=this.keywordAggs;
      var bbb = JSON.parse(JSON.stringify(keywordAggs1).replace(/count/g,"value"));
      $('.Foot1').html('<div id="foot1" style="width: 320px; height: 180px"></div>')
      var echarts1 = document.getElementById("foot1");
      // 绘制图表
      if(echarts1){
        let myChart = this.echarts.init(echarts1)
        myChart.clear()
        myChart.setOption({
          title: {
            x: 'center',
            textStyle: {
              fontSize: 23
            }
          },
          tooltip: {
            show: true
          },
          series: [{
            name: '热点分析',//数据提示窗标题
            type: 'wordCloud',
            sizeRange: [12, 18],//画布范围，如果设置太大会出现少词（溢出屏幕）
            rotationRange: [0, 0],//数据翻转范围
            // shape: 'circle',
            textPadding: 0,
            autoSize: {
              enable: true,
              minSize: 6
            },
            textStyle: {
              normal: {
                color: '#fff'
                // function() {
                //   return 'rgb(' + [
                //     Math.round(Math.random() * 256),
                //     Math.round(Math.random() * 256),
                //     Math.round(Math.random() * 256)
                //   ].join(',') + ')';
                // }
              },
              emphasis: {
                shadowBlur: 10,
                shadowColor: '#333'
              }
            },
            data: bbb
          }]
        })
        myChart.off('click')
        myChart.on('click',(params)=>{
          if(typeof(this.searchContent)=='undefined' || this.searchContent==''){
            this.h++
            var date=new Date();
            let date1=date.getFullYear()+'-'+((date.getMonth()+1)<10?'0'+(date.getMonth()+1):date.getMonth()+1)+'-'+(date.getDate()<10?'0'+date.getDate():date.getDate())
            this.searchContent=`keyword:"${params.name}" AND pubTime:"${date1}"`
            this.show=true
            $("#sea").click()
          }else{
            let a=this.searchContent
            this.h++
            this.show=true
            this.searchContent=`${a} AND keyword:"${params.name}"`
            $("#sea").click()
          }
        })
      }
    },
    //年份统计
    smootline(){
      var yearTime1=this.yearTime;
      var b=[];
      var c=[];
      var d=[];
      for(var a of yearTime1){
        b.push(a.name)
        c.push(a.count)
        d.push(a.chinaAggs.chinaAggs)
      }
      this.chinaTimeCount=d
      this.yearTimeName=b;
      this.yearTimeCount=c;
      $('.Foot2').html('<div id="foot2" style="width: 370px; height: 200px"></div>')
      var echarts1 = document.getElementById("foot2");
      // 绘制图表
      if(echarts1){
        let myChart = this.echarts.init(echarts1)
        myChart.clear()
        myChart.setOption({
          title:{
            text:'单位:个数',
            textStyle:{
              color:"#fff",
              fontSize:12,
              fontWeight:400,
            }
          },
          legend: {
            data:['全球发文量','中国发文量'],
            x:'right',
            textStyle: {color: '#fff',fontSize:10}
          },
          tooltip : {
          trigger: 'axis',
            axisPointer: {
              type: 'cross',
              label: {
                backgroundColor: '#6a7985'
              }
            }
          },
          xAxis: {
            type: 'category',
            data: this.yearTimeName,
            axisLine: {
              lineStyle: {
                color: '#fff'
              }
            },
          },  
          yAxis: {
            type: 'value',
            axisLine: {
              show:false
            },
            axisLabel : {
              formatter: '{value}',
              textStyle: {
                color: '#fff'
              }
            },
            splitLine: {
              lineStyle: {
                color: '#63659F',
                type:'dashed'
              }
            }
          },
          series: [
            {
            name:'全球发文量',
            data: this.yearTimeCount,
            type: 'line',
            smooth: true,
            itemStyle:{
              color:"#13B88B",
            },
            lineStyle:{
              color:"#13B88B"
            },
            areaStyle:{
              normal: {
                color:  {
                    type: "linear",
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [
                      {
                        offset: 0,
                        color: "#13B88B" // 0% 处的颜色
                      },
                      {
                        offset: 1,
                        color: "rgba(19,184,139,0)" // 100% 处的颜色
                      }
                    ],
                    globalCoord: false // 缺省为 false
                  }
              }
            }
          },
          {
            name:'中国发文量',
            data: this.chinaTimeCount,
            type: 'line',
            smooth: true,
            itemStyle:{
              color:"#FBA33C",
            },
            lineStyle:{
              color:"#FBA33C"
            },
            areaStyle:{
              normal: {
                color:  {
                    type: "linear",
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [
                      {
                        offset: 0,
                        color: "#FBA33C" // 0% 处的颜色
                      },
                      {
                        offset: 1,
                        color: "rgba(251,163,60,0)" // 100% 处的颜色
                      }
                    ],
                    globalCoord: false // 缺省为 false
                  }
              }
            }
          }
          ]
        })
        myChart.off('click')
        myChart.on('click',(params)=>{
          if(typeof(this.searchContent)=='undefined' || this.searchContent==''){
            this.h++
            var date=new Date();
            let date1=date.getFullYear()+'-'+((date.getMonth()+1)<10?'0'+(date.getMonth()+1):date.getMonth()+1)+'-'+(date.getDate()<10?'0'+date.getDate():date.getDate())
            if(params.seriesName=="中国发文量"){
              this.searchContent=`pubTime:[${params.name} TO ${date1}] AND pubTime:"${date1}" AND pubCountry:"China"`
              this.show=true
              $("#sea").click()
            }else{
              this.searchContent=`pubTime:[${params.name} TO ${date1}] AND pubTime:"${date1}"`
              this.show=true
              $("#sea").click()
            }
          }else{
            let a=this.searchContent
            this.h++
            this.show=true
            var date=new Date();
            let date1=date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()
            if(params.seriesName=="中国发文量"){
              this.searchContent=`${a} AND pubTime:[${params.name} TO ${date1}] AND pubCountry:"China"`
              this.show=true
              $("#sea").click()
            }else{
              this.searchContent=`${a} AND pubTime:[${params.name} TO ${date1}]`
              $("#sea").click()
            }
            
          }
        })
      }
    },
    //作者统计
    author(){
      var author1=this.authorAggs.slice(0,8);
      var b=[];
      var c=[];
      for(var a of author1){
        b.push(a.name)
        c.push(a.count)
      }
      this.authorAggsName=b;
      this.authorAggsName.reverse();
      this.authorAggsCount=c;
      this.authorAggsCount.reverse();
      $('.Five2').html('<div id="five2" style="width: 260px; height: 230px;margin-top:-55px;"></div>')
      var echarts1 = document.getElementById("five2");
      // 绘制图表
      if(echarts1){
        let myChart = this.echarts.init(echarts1)
        myChart.clear()
        myChart.setOption({
          color: ['#3398DB'],
          tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
              type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            },
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: {
            type: 'value',
            axisLine: {
              show:false
            },
            splitLine: {
              show:false
            },
            axisLabel:{
              show:false
            },
            axisTick:{
              show:false
            }
          },  
          yAxis: {
            
            type: 'category',
            data: this.authorAggsName,
            axisLine: {
              show:false
            },
            splitLine: {
              show:false
            },
            axisTick:{
              show:false
            },
            axisLabel:{
              color:"#fff",
              formatter: function (value) {
                var maxlength=15;
                if (value.length>maxlength) {
                  return value.substring(0, maxlength-1)+'...';
                } else{
                  return value;
                };
              },
            }
          },
          series : [
            {
              name:'作者统计',
              type:'bar',
              barWidth: '60%',
              data:this.authorAggsCount,
              barWidth:5
              ,
              itemStyle:{
                normal:{
                  label:{
                    show:true,
                    position:"right",
                    textStyle:{
                      color:"#fff",
                      fontSize:12
                    }
                  },
                  color: function (params){
                    var colorList = ['#8282DC','#8282DC','#8282DC','#36E7B3','#EBED37','#ED6C18'];
                    return colorList[params.dataIndex];
                  }
                }
              }
            }
          ]
        })
        myChart.off('click')
        myChart.on('click',(params)=>{
          if(typeof(this.searchContent)=='undefined' || this.searchContent==''){
            this.h++
            var date=new Date();
            let date1=date.getFullYear()+'-'+((date.getMonth()+1)<10?'0'+(date.getMonth()+1):date.getMonth()+1)+'-'+(date.getDate()<10?'0'+date.getDate():date.getDate())
            this.searchContent=`author:"${params.name}" AND pubTime:"${date1}"`
            this.show=true
            $("#sea").click()
          }else{
            let a=this.searchContent
            this.h++
            this.show=true
            this.searchContent=`${a} AND author:"${params.name}"`
            $("#sea").click()
          }
        })
      }
    },
    //分析
    analysis(){
      if(this.h%2==0){
        this.h++
        this.loading=true
        this.show=false;
        if(this.choice=='文 献'){
          this.foreConte=true
          var qs=require('qs');
          this.axios.post(`/pubmed/statisticsArticle`, qs.stringify({
            queryStringQuery:this.searchContent,
            ifsFilter:this.chk1 || this.chk4,
            yearsFilter:this.chk2 || this.chk5,
            typeFilter:this.chk3
          }))
          .then(result=>{
            if(JSON.stringify(result.data.res) == "{}"){
            }else{
            this.aggs=result.data.res.aggs;
            this.journalAggs=result.data.res.aggs.journalAggs;
            this.pubCountryAggs=result.data.res.aggs.pubCountryAggs;
            this.chinaPubAggs=result.data.res.aggs.chinaPubAggs.journalAggs;
            this.lastAuthorAggs=result.data.res.aggs.lastAuthorAggs;
            this.meshAggs=result.data.res.aggs.meshAggs;
            this.firstAuthorAggs=result.data.res.aggs.firstAuthorAggs;
            this.yearTime=result.data.res.aggs.nearly7YearsAggs[0].yearTimeAggs;
            this.pubAgencyAggs=result.data.res.aggs.pubAgencyAggs;
            this.publicationTypeAggs=result.data.res.aggs.publicationTypeAggs;
            this.courseAggs=result.data.res.aggs.courseAggs;
            this.keywordAggs=result.data.res.aggs.keywordAggs;
            this.authorAggs=result.data.res.aggs.authorAggs;
            this.courseAggs=result.data.res.aggs.courseAggs;
            this.qClassAggs=result.data.res.aggs.qClassAggs;
            this.areaAggs=result.data.res.aggs.areaAggs;
            this.directionAggs=result.data.res.aggs.directionAggs;
            this.ifsAggs=result.data.res.aggs.ifsAggs
            this.a7=this.qClassAggs.slice(0,7);
            this.a6=this.firstAuthorAggs.slice(0,6);
            this.a5=this.meshAggs.slice(0,4);
            }
            if(this.searchPubmedArticle.status==200){
              this.loading=false;
            }
          }) 
        }
      }else{
        this.h++
        this.show=true;
      }
    },
    clear(){
      this.loading=true;
      this.int1="";this.int2="";this.int3="";this.int4="";
      this.model1="";this.model2="";this.model3="";this.model3="";
      this.checkList1=[];this.checkList2=[];this.checkList3=[];this.checkList4=[];this.checkList5=[];this.checkList6=[];this.checkList7=[];
      this.chk1="";this.chk2="";this.chk3="";this.chk4="";this.chk5="";this.chk6="";this.chk7="";this.chk8="";this.chk9="";this.chk10="";this.chk11="";
      this.inp1="";this.inp2="";this.inp3="";this.inp4="";this.inp5="";this.inp6="";this.inp7="";this.inp8="";this.i=0;this.isAsc1=false;this.isDesc1=false;this.isAsc2=false;this.isDesc2=false;this.isAsc3=false;this.isDesc3=false;
      this.i=0;this.o=0;this.p=0;
      this.show1=true;this.active1=false;this.show2=true;this.active2=false;this.show3=true;this.active3=false;this.show4=true;this.active4=false;this.show5=true;this.active5=false,this.show6=true;this.active6=false;
      this.isAsc1=false;this.isAsc2=false;this.isAsc3=false
      this.currentPage=1
      $("#sea").click()
    },
    quiet(){
      this.j++;
      this.senior1=false;
    },
    Search(){
      this.j++;
      this.senior1=false;
      this.i=0;this.o=0;this.p=0;
      this.show1=true;this.active1=false;this.show2=true;this.active2=false;this.show3=true;this.active3=false;this.show4=true;this.active4=false;this.show5=true;this.active5=false,this.show6=true;this.active6=false;
      this.isAsc1=false;this.isAsc2=false;this.isAsc3=false
      if(this.relation2=="AND"){
        this.relation2="AND"
      }if(this.relation3=="AND"){
        this.relation3="AND"
      }if(this.relation4=="AND"){
        this.relation4="AND"
      }
      if(this.int1=="" && this.int2=="" && this.int3=="" && this.int4==""){
        this.loading=true;
        this.searchContent="";
        this.search4();
        this.searcher();
      }
      if(this.int1!="" && this.int2=="" && this.int3=="" && this.int4==""){
        this.loading=true;
        if(this.searchContent!=undefined && this.searchContent!=""){
          this.searchContent=`${this.searchContent} AND ${this.model1}:"${this.int1}"`;
        }else{
          this.searchContent=`${this.model1}:"${this.int1}"`;
        }
        this.search4();
        this.searcher();
      }
      if(this.int1!="" && this.int2!="" && this.int3=="" && this.int4==""){
        this.loading=true;
        if(this.searchContent!=undefined && this.searchContent!=""){
          this.searchContent=`${this.searchContent} AND ${this.model1}:"${this.int1}" ${this.relation2} ${this.model2}:"${this.int2}"`;
        }else{
          this.searchContent=`${this.model1}:"${this.int1}" ${this.relation2} ${this.model2}:"${this.int2}"`;
        }
        this.search4();
        this.searcher();
      }
      if(this.int1!="" && this.int2!="" && this.int3!="" && this.int4==""){
        this.loading=true;
        if(this.searchContent!=undefined && this.searchContent!=""){
          this.searchContent=`${this.searchContent} AND ${this.model1}:"${this.int1}" ${this.relation2} ${this.model2}:"${this.int2}" ${this.relation3} ${this.model3}:"${this.int3}"`;
        }else{
          this.searchContent=`${this.model1}:"${this.int1}" ${this.relation2} ${this.model2}:"${this.int2}" ${this.relation3} ${this.model3}:"${this.int3}"`;
        }
        this.search4();
        this.searcher();
      }
      if(this.int1!="" && this.int2!="" && this.int3!="" && this.int4!=""){
        this.loading=true;
        if(this.searchContent!=undefined && this.searchContent!=""){
          this.searchContent=`${this.searchContent} AND ${this.model1}:"${this.int1}" ${this.relation2} ${this.model2}:"${this.int2}" ${this.relation3} ${this.model3}:"${this.int3}" ${this.relation4} ${this.model4}:"${this.int4}"`;
        }else{
          this.searchContent=`${this.model1}:"${this.int1}" ${this.relation2} ${this.model2}:"${this.int2}" ${this.relation3} ${this.model3}:"${this.int3}" ${this.relation4} ${this.model4}:"${this.int4}"`;
        }
        this.search4();
        this.searcher();
      }
      if(this.int1=="" && this.int2!="" && this.int3!="" && this.int4!=""){
        this.loading=true;
        if(this.searchContent!=undefined && this.searchContent!=""){
          this.searchContent=`${this.searchContent} AND ${this.model2}:"${this.int2}" ${this.relation3} ${this.model3}:"${this.int3}" ${this.relation4} ${this.model4}:"${this.int4}"`;
        }else{
          this.searchContent=`${this.model2}:"${this.int2}" ${this.relation3} ${this.model3}:"${this.int3}" ${this.relation4} ${this.model4}:"${this.int4}"`;
        }
        this.search4();
        this.searcher();
      }
      if(this.int1=="" && this.int2=="" && this.int3!="" && this.int4!=""){
        this.loading=true;
        if(this.searchContent!=undefined && this.searchContent!=""){
          this.searchContent=`${this.searchContent} AND ${this.model3}:"${this.int3}" ${this.relation4} ${this.model4}:"${this.int4}"`;
        }else{
          this.searchContent=`${this.model3}:"${this.int3}" ${this.relation4} ${this.model4}:"${this.int4}"`;
        }
        this.search4();
        this.searcher();
      }
      if(this.int1=="" && this.int2=="" && this.int3=="" && this.int4!=""){
        this.loading=true;
        if(this.searchContent!=undefined && this.searchContent!=""){
          this.searchContent=`${this.searchContent} AND ${this.model4}:"${this.int4}"`;
        }else{
          this.searchContent=`${this.model4}:"${this.int4}"`;
        }
        this.search4();
        this.searcher();
      }
      if(this.int1!="" && this.int2=="" && this.int3!="" && this.int4!=""){
        this.loading=true;
        if(this.searchContent!=undefined && this.searchContent!=""){
          this.searchContent=`${this.searchContent} AND ${this.model1}:"${this.int1}" ${this.relation3} ${this.model3}:"${this.int3}" ${this.relation4} ${this.model4}:"${this.int4}"`;
        }else{
          this.searchContent=`${this.model1}:"${this.int1}" ${this.relation3} ${this.model3}:"${this.int3}" ${this.relation4} ${this.model4}:"${this.int4}"`;
        }
        this.search4();
        this.searcher();
      }
      if(this.int1!="" && this.int2=="" && this.int3!="" && this.int4==""){
        this.loading=true;
        if(this.searchContent!=undefined && this.searchContent!=""){
          this.searchContent=`${this.searchContent} AND ${this.model1}:"${this.int1}" ${this.relation3} ${this.model3}:"${this.int3}"`;
        }else{
          this.searchContent=`${this.model1}:"${this.int1}" ${this.relation3} ${this.model3}:"${this.int3}"`;
        }
        this.search4();
        this.searcher();
      }
      if(this.int1!="" && this.int2=="" && this.int3=="" && this.int4!=""){
        this.loading=true;
        if(this.searchContent!=undefined && this.searchContent!=""){
          this.searchContent=`${this.searchContent} AND ${this.model1}:"${this.int1}" ${this.relation4} ${this.model4}:"${this.int4}"`;
        }else{
          this.searchContent=`${this.model1}:"${this.int1}" ${this.relation4} ${this.model4}:"${this.int4}"`;
        }
        this.search4();
        this.searcher();
      }
      if(this.int1=="" && this.int2!="" && this.int3=="" && this.int4!=""){
        this.loading=true;
        if(this.searchContent!=undefined && this.searchContent!=""){
          this.searchContent=`${this.searchContent} AND ${this.model2}:"${this.int2}" ${this.relation3} ${this.model4}:"${this.int4}"`;
        }else{
          this.searchContent=`${this.model2}:"${this.int2}" ${this.relation3} ${this.model4}:"${this.int4}"`;
        }
        this.search4();
        this.searcher();
      }
      if(this.int1=="" && this.int2!="" && this.int3!="" && this.int4==""){
        this.loading=true;
        if(this.searchContent!=undefined && this.searchContent!=""){
          this.searchContent=`${this.searchContent} AND ${this.model2}:"${this.int2}" ${this.relation3} ${this.model3}:"${this.int3}"`;
        }else{
          this.searchContent=`${this.model2}:"${this.int2}" ${this.relation3} ${this.model3}:"${this.int3}"`;
        }
        this.search4();
        this.searcher();
      }
      if(this.int1=="" && this.int2!="" && this.int3=="" && this.int4==""){
        this.loading=true;
        if(this.searchContent!=undefined && this.searchContent!=""){
          this.searchContent=`${this.searchContent} AND ${this.model2}:"${this.int2}"`;
        }else{
          this.searchContent=`${this.model2}:"${this.int2}"`;
        }
        this.search4();
        this.searcher();
      }
      if(this.int1=="" && this.int2=="" && this.int3!="" && this.int4==""){
        this.loading=true;
        if(this.searchContent!=undefined && this.searchContent!=""){
          this.searchContent=`${this.searchContent} AND ${this.model3}:"${this.int3}"`;
        }else{
          this.searchContent=`${this.model3}:"${this.int3}"`;
        }
        this.search4();
        this.searcher();
      }
    },
    reset(){
      this.int1='';this.int2='';this.int3='';this.int4='';
      this.model1="";this.model2='';this.model3='';this.model4='';this.searchContent=""
    },
    toJournal(nlmId,course){
      const {href} =this.$router.resolve({
        path:'/Journal',
        query:{
          Id:nlmId,Name:course
        }
      })
      window.open(href, '_blank')
    },
    senior(){
      this.senior1=!this.senior1
    },
    searchkras(){
      this.searchContent="kras";
      this.searcher()
    },
    searchegfr(){
      this.searchContent="egfr";
      this.searcher()
    },
    searchmyc(){
      this.searchContent="MYC";
      this.searcher()
    },
    searchtp53(){
      this.searchContent="TP53";
      this.searcher()
    },
    type2(){
      this.type1=!this.type1
      this.type3=!this.type3
    },
    influencefactorDown(){
      this.inpp=!this.inpp
      this.inpp1=!this.inpp1
      this.checkList1=[];
      this.chk1=this.checkList1.join(",");
      this.$router.push({
        path:'/Search',
        query:{
          chk1:this.chk1,chk2:this.chk2,chk3:this.chk3,chk4:this.chk4,sort:this.sort,page:this.currentPage,search1:this.searchContent,chk5:this.chk5
        }
      })
    },
    yearDown(){
      this.inpp2=!this.inpp2
      this.inpp3=!this.inpp3
      this.checkList2=[]
      this.chk2=this.checkList2.join(",");
      this.$router.push({
        path:'/Search',
        query:{
          chk1:this.chk1,chk2:this.chk2,chk3:this.chk3,chk4:this.chk4,sort:this.sort,page:this.currentPage,search1:this.searchContent,chk5:this.chk5
        }
      })
    },
    yearOne(){
      this.loading=true;
      this.i=0;this.o=0;this.p=0;
      this.show1=true;this.active1=false;this.show2=true;this.active2=false;this.show3=true;this.active3=false;this.show4=true;this.active4=false;this.show5=true;this.active5=false,this.show6=true;this.active6=false;
      this.isAsc1=false;this.isAsc2=false;this.isAsc3=false
      this.chk2=""
      this.chk5=this.inp3+'-'+this.inp4
    },
    getText(list){
      this.loading=true;
      this.i=0;this.o=0;this.p=0;
      this.show1=true;this.active1=false;this.show2=true;this.active2=false;this.show3=true;this.active3=false;this.show4=true;this.active4=false;this.show5=true;this.active5=false,this.show6=true;this.active6=false;
      this.isAsc1=false;this.isAsc2=false;this.isAsc3=false
      this.aa=`${list.lastName} ${list.initials}`;
      this.searchContent="author:"+`"${list.lastName} ${list.initials}"`;
    },
    //页码
    handleCurrentChange(currentPage){
      this.loading=true;
      if(typeof(currentPage)!='undefined' && currentPage!=1){
        this.currentPage = currentPage;
        $("#sea").click()
        this.inf();
      }else if(currentPage==1){
        this.currentPage = 1
        $("#sea").click()
        this.inf();
      }else {
        this.currentPage =this.$route.query.page*1 || 1
        currentPage=this.currentPage
        $("#sea").click()
        this.inf();
      }
    },
    //选择
    Choice(){
      this.i++;
      if(this.i%2==1){
        this.down1=true
      }else{
        this.down1=false
      }
    },
    //文献选择
    literature1(){
      const {href} =this.$router.resolve({
        path:'/Search'
      })
      window.open(href, '_blank')
    },
    //期刊选择
    periodical1(){
      const {href} =this.$router.resolve({
        path:'/SearchJournal'
      })
      window.open(href, '_blank')
    },
    //基金选择
    fund1(){
      const {href} =this.$router.resolve({
        path:'/SearchFund'
      })
      window.open(href, '_blank')
    },
    search3(){
      this.$router.push({
        path:'/Search',
        query:{
          chk1:this.chk1,chk2:this.chk2,chk3:this.chk3,chk4:this.chk4,sort:this.sort,page:this.currentPage,search1:this.searchContent,chk5:this.chk5
        }
      })
    },
    search4(){
      this.$router.push({
        path:'/Search',
        query:{
          chk1:this.chk1,chk2:this.chk2,chk3:this.chk3,chk4:this.chk4,sort:this.sort,page:1,search1:this.searchContent,chk5:this.chk5
        }
      })
    },
    getArticle(){
      this.axios.get(`/pubmed/getArticleCollects`).then(result=>{
        if(result.data.res.pmidList!=undefined){
          this.pmidList=result.data.res.pmidList
        }
      })
    },
    //搜索框搜索
    searcher(){ 
      this.loading=true;
      this.show1=true;this.active1=false;this.show2=true;this.active2=false;this.show3=true;this.active3=false;this.show4=true;this.active4=false;this.show5=true;this.active5=false,this.show6=true;this.active6=false;
      this.isAsc1=false;this.isAsc2=false;this.isAsc3=false
      this.j++;
      this.senior1=false;
      var qs=require('qs');
      this.chk1=this.$route.query.chk1
      this.chk2=this.$route.query.chk2
      this.chk3=this.$route.query.chk3
      this.chk4=this.$route.query.chk4
      this.chk5=this.$route.query.chk5
      this.sort=this.$route.query.sort
      this.currentPage=parseInt(this.$route.query.page)
      if(this.searchContent!='' || this.searchContent!=' '){
        this.axios.post(`/pubmed/searchPubmedArticle/`, qs.stringify({
          queryStringQuery:this.searchContent,
          page:this.currentPage,
          ifsFilter:this.chk1 || this.chk4,
          yearsFilter:this.chk2 || this.chk5,
          typeFilter:this.chk3,
          sort:this.sort
        })).then(result=>{
          this.searchPubmedArticle=result.data
          this.Article=result.data.res
          // console.log(result)
          if(JSON.stringify(result.data.res)==="{}" || result.data.res==undefined){
            this.a1=''
            this.result=0
            this.timer=0
          }else{
            this.a1=result.data.res.articleList.searchData;
            this.result=result.data.res.articleList.searchTotal;
            this.timer=result.data.res.articleList.searchTime;
          }
          if(!this.result){
            this.el_show=false;
            this.result=0
          }else{
            this.el_show=true
          }
          if(this.searchPubmedArticle.status==200){
            this.loading=false;
          }
      }).catch(error=>{
          if(error){
            throw error
          }
        });
      } 
      if(this.show==false){
        this.h=0
        $('#ana').click()
      }
      
      
    },
    //影响因子
    checkListOne(){
      if(this.inpp==true){
        this.w++;
        this.inpp=false;
        this.inp1="";
        this.inp2='';
        this.inpp1=true;
      }
      this.loading=true;
      this.i=0;this.o=0;this.p=0;
      this.show1=true;this.active1=false;this.show2=true;this.active2=false;this.show3=true;this.active3=false;this.show4=true;this.active4=false;this.show5=true;this.active5=false,this.show6=true;this.active6=false;
      this.isAsc1=false;this.isAsc2=false;this.isAsc3=false
      console.log(this.checkList1)
      this.chk1=this.checkList1.join(",");
    },
    //出版年份
    checkListTwo(){
      if(this.inpp2==true){
        this.e++;
        this.inpp2=false
        this.inpp3=true
        this.inp3=""
        this.int4=''
      }
      this.loading=true;
      this.i=0;this.o=0;this.p=0;
      this.show1=true;this.active1=false;this.show2=true;this.active2=false;this.show3=true;this.active3=false;this.show4=true;this.active4=false;this.show5=true;this.active5=false,this.show6=true;this.active6=false;
      this.isAsc1=false;this.isAsc2=false;this.isAsc3=false
      this.chk2=this.checkList2.join(",");
    },
    //文献类型
    checkListThree(){
      this.loading=true;
      this.i=0;this.o=0;this.p=0;
      this.show1=true;this.active1=false;this.show2=true;this.active2=false;this.show3=true;this.active3=false;this.show4=true;this.active4=false;this.show5=true;this.active5=false,this.show6=true;this.active6=false;
      this.isAsc1=false;this.isAsc2=false;this.isAsc3=false
      this.chk3=this.checkList3.join(",");
    },
    //自定义影响因子
    customOne(){
      this.loading=true;
      this.i=0;this.o=0;this.p=0;
      this.show1=true;this.active1=false;this.show2=true;this.active2=false;this.show3=true;this.active3=false;this.show4=true;this.active4=false;this.show5=true;this.active5=false,this.show6=true;this.active6=false;
      this.isAsc1=false;this.isAsc2=false;this.isAsc3=false
      this.chk4=this.inp1+'-'+this.inp2
    },
    inf(){
      this.sort=this.$route.query.sort
      if(this.sort=="published-sort_-1"){
        this.i=1
        this.isAsc1=true
        this.show1=false
        this.active1=true
        this.show6=true
        this.active6=false
      }else if(this.sort=="published-sort_1"){
        this.i=2
        this.isAsc1=true
        this.show1=true
        this.active1=false
        this.show6=false
        this.active6=true
      }else if(this.sort=="factor-sort_-1"){
        this.o=1
        this.isAsc2=true
        this.show2=false
        this.active2=true
        this.show3=true
        this.active3=false
      }else if(this.sort=="factor-sort_1"){
        this.o=2
        this.isAsc2=true
        this.show2=true
        this.active2=false
        this.show3=false
        this.active3=true
      }else if(this.sort=="matching-sort_-1"){
        this.p=1
        this.isAsc3=true
        this.show4=false
        this.active4=true
        this.show5=true
        this.active5=false
      }else if(this.sort=="matching-sort_1"){
        this.p=2
        this.isAsc3=true
        this.show4=true
        this.active4=false
        this.show5=false
        this.active5=true
      }
    },
    //按照时间长短来查询文献资源
    publishingTime(){
      this.i++;
      this.show2=true;this.active2=false;this.show3=true;this.active3=false;this.show4=true;this.active4=false;this.show5=true;this.active5=false
      this.p=0;
      this.o=0;
      this.isAsc2=false
      this.isAsc3=false
      if(this.i%3==1){
        this.loading=true;
        this.sort="published-sort_-1"
      }else if(this.i%3==2){
        this.loading=true;
        this.sort="published-sort_1"
      }else if(this.i%3==0){
        this.loading=true;
        this.sort=""
      }
    }, 
    //按照影响因子进行升序降序排列
    influenceFactor(){
      this.o++;
      this.show1=true;this.active1=false;this.show2=true;this.active2=false;this.show3=true;this.active3=false;this.show6=true;this.active6=false;
      this.i=0;this.p=0;
      this.isAsc1=false
      this.isAsc3=false
      if(this.o%3==1){
        this.loading=true;
        this.sort="factor-sort_-1"
      }else if(this.o%3==2){
        this.loading=true;
        this.sort="factor-sort_1"
      }else if(this.o%3==0){
        this.loading=true;
        this.sort=""
      }
    },
    //按照相关度进行升序降序排列
    relevant(){
      this.p++;
      this.show1=true;this.active1=false;this.show2=true;this.active2=false;this.show3=true;this.active3=false;this.show6=true;this.active6=false;
      this.i=0;this.o=0;
      this.isAsc1=false
      this.isAsc2=false
      if(this.p%3==1){
        this.loading=true;
        this.sort="matching-sort_-1"
      }else if(this.p%3==2){
        this.loading=true;
        this.sort="matching-sort_1"
      }else if(this.p%3==0){
        this.loading=true;
        this.sort=""
      }
    }
  }
}
</script>
<style scoped>
  @media screen and (min-width:992px){
    .SearchHeadOne{
      width: 15% !important;
      padding-left: 0!important;
      
    }
    .SearchHeadThree{
      width: 15% !important;
    }
    .SearchHeadTwo{
      width: 70% !important;
    }
    .SearchBodyOne{
      padding-left: 0 !important;
    }
  }
  @media screen and (max-width:992px){
    .SearchBodyTwo>ul>li>div>p[data-v-1a1d373c]:nth-child(1){
      width: 80% !important;
    }
    .datas{
      flex-direction: column !important;
    }
    .datas>div:nth-child(2){
      margin-left: 0px !important;
      margin-top: 5px;
    }
    .SearchHeadOne{
      width: 20% !important;
    }
    .SearchBodyOne{
      width: 20% !important;
    }
    .SearchBodyTwo{
      width: 80% !important;
    }
    .SearchBodyThree{
      display: none !important;
    }
  }
  @media screen and (max-width:1200px){
    .datas[data-v-1a1d373c]{
      width: 100% !important;
    }
  }
  @media screen and (max-width:800px){
    .SearchHeadOne>div:first-child>img{
      display: none !important;
    }
    .SearchHeadOne>div:first-child{
      margin: 0 !important;
    }
    .SearchHeadOne>div:first-child>span>span{
      display: none !important;
    }
  }
  @media screen and (max-width:768px){
    .search2{
      display: block !important;
    }
    .SearchBody{
      display:none !important;
    }
    .SearchBodyOne{
      margin-right: 0 !important;
    }
    .SearchBodyTwo{
      margin-right: 0 !important;
    }
    .SearchBodyOne>ul>li>p>span{
      display: none !important;
    }
    .SearchBodyOne>ul>li>p{
      width: 100%;
      text-align: left;
      margin-left: 30%;
    }
    .SearchHeadOne>div:first-child>img{
      display: none !important;
    }
    .SearchHeadOne>div:first-child{
      margin: 0 !important;
    }
    .SearchHeadOne>div:first-child>span>span{
      display: none !important;
    }
    .SearchHeadOne{
      padding: 0 !important;
      text-align: center !important ;
    }
    .el-checkbox-group{
      margin-left: 30% !important;
    }
    .SearchHeadOne{
      justify-content: space-around !important;
    }
    .SearchHeadThree{
      display: none !important;
    }
  }
  @media screen and (max-width:400px){
    .el-checkbox-group{
      margin: 0 !important;
    }
  }
  @media screen and (min-width:1200px){
    .datas>div:nth-child(3)>p>span{
      margin-right: 20px !important;
    }
    .datas[data-v-1a1d373c]{
      width: 100% !important;
    }
    .SearchBody1{
      width: 1200px !important;
    }
    .SearchContent1{
      width: 1200px !important;
    }
  }
  .el-dropdown{
    color: #999;
    line-height: 40px;
  }
  .SearchBackground{
    width: 100%;
    background: #E7EDF9;
    overflow: hidden;
  }
  .SearchBody1{
    width: 100%;
    margin: 0 auto;
    position: relative;
  }
  .SearchHeadBg{
    height: 50px;
    width: 100%;
    line-height: 50px;
    background:linear-gradient(0deg,rgba(45,76,161,1),rgba(78,112,201,1));
  }
  .SearchBody{
    width: 70%;
    height: 153px;
    margin: 39px auto 19px;
    position: relative;

  }
  .SearchBody>span{
    font-size:14px;
    font-family:Source Han Sans CN;
    font-weight:400;
    color:rgba(64,64,64,1);
  }
  .SearchBody>ul{
    position: absolute;
    top: 0;
    left: 80px;
    font-size:14px;
    font-family:Source Han Sans CN;
    font-weight:400;
    text-decoration:underline;
    color:rgba(48,77,153,1);
    display: flex;
    flex-direction: row;
  }
  .SearchBody>ul>li>span{
    margin-left: 20px;
    color:rgba(48,77,153,1);
  }
  .SearchBody>ul>li>span:hover{
    cursor: pointer;
  }
  .sousuo{
    font-size:14px;
    font-family:Source Han Sans CN;
    font-weight:400;
    color:rgba(62,94,181,1);
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
  }
  .sousuo>span:first-child>span:nth-child(2){
    margin-left: 20px;
  }
  .sousuo>span:nth-child(2){
    cursor: pointer;
    margin-right: 100px;
  }
  .sousuo>span:nth-child(2)>span:hover{
    text-decoration: underline;
    cursor: pointer;
  }
  .SearchBox>.searchInput>>>.el-input__inner{
    border: none;
    font-size: 12px;
    font-weight: 500;
  }
  .SearchBox>.searchInput>>>div{
    width: 100%;
  }
  .search2{
    width: 100%;
    margin: 40px auto;
    position: relative;
    display: none;
  }
      
  .searchBox1{
    width:80%;
    height:50px;
    background:rgba(255,255,255,1);
    border:1px solid rgba(235,235,235,1);
    border-radius:25px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 0 auto;
    margin-top: 13px;
    line-height: 50px;
  }
  .searchBox1>input{
    display: inline-block;
    width:45%;
    height:13px;
    font-size:12px;
    font-family:Source Han Sans CN;
    font-weight:400;
    color:rgba(183,183,183,1);
    border: none;
    margin-top: 19px;
    margin-left: 15px;
    outline: none;
  }
  .searchBox1>div:first-child{
    margin-left: 4%;
    cursor: pointer;width: 75px;
  }
  .searchBox1>div:last-child{
    width: 120px;
    height: 48px;
    background: rgba(51,102,204,1);
    border-radius: 24px;
    text-align: center;
    cursor: pointer;
    text-align: center;
    line-height: 48px;
  }
  .el-dropdown{
    width: 100%;
  }
  .xiaLa{
    position: absolute;
    top:50px;
    left: 0px;
    display: none;
    width: 100%;
    background: #fff;
    z-index: 99;
    box-shadow: #f5f5f5 0 0px 6px 0 ;
  }
  .xiaLa>p{
    font-size: 12px;
    line-height: 20px;
    margin: 0;
    color: #999;
    text-align: center
  }
  .xiaLa>p:hover{
    color: #3C61C3;
  }
  .down1{
    display: block !important;
  }
  .searchBox1>div:last-child{
    width:120px;
    height:48px;
    background:rgba(51,102,204,1);
    border-radius:24px;
    text-align: center;
    cursor: pointer;
  }
  .searchBox1>div:last-child>span{
    display: inline-block;
    width:25px;
    height:12px;
    font-size:12px;
    font-family:Source Han Sans CN;
    font-weight:400;
    color:rgba(255,255,255,1);
  }
  .SearchBox>div:first-child{
    width: 79px;
    margin-left: 4%;
    cursor: pointer;
    position: relative;
  }
  .SearchBox>div:first-child>span:first-child{
    color: #304D99; 
    font-size: 12px;
    
  }
  .SearchBox>div:first-child>img{
    margin-left:4px;
  }
  .SearchBox{
    width:80%;
    height:50px;
    background:rgba(255,255,255,1);
    border:1px solid rgba(235,235,235,1);
    border-radius:25px;
    display: flex;
    flex-direction: row;
    margin: 0 auto;
    margin-top: 13px;
    line-height: 50px;
    justify-content: space-between;
  }
  .searchInput>input{
    display: inline-block;
    width:80%;
    height:19px;
    font-size:12px;
    font-family:Source Han Sans CN;
    font-weight:400;
    color:rgba(183,183,183,1);
    border: none;
    margin-top: 13px;
    outline: none;
  }
  .searchInput>span{
    color: #3366cc;
    cursor: pointer;
  }
  .SearchBox>div:last-child{
    width:120px;
    height:48px;
    background:rgba(51,102,204,1);
    border-radius:24px;
    text-align: center;
    cursor: pointer;
    text-align: center;
    line-height: 48px;
  }
  .SearchBox>div:last-child>span{
    font-size:12px;
    font-family:Source Han Sans CN;
    font-weight:400;
    color:rgba(255,255,255,1);
  }
  /* 设置placeholder的属性，使得各个浏览器兼容 */
  input::-webkit-input-placeholder { 
    /* WebKit browsers */ 
    font-size:12px;
    font-family:Source Han Sans CN;
    font-weight:bold;
    color:rgba(183,183,183,1);
  } 
  input:-moz-placeholder { 
    /* Mozilla Firefox 4 to 18 */ 
    font-size:12px;
    font-family:Source Han Sans CN;
    font-weight:bold;
    color:rgba(183,183,183,1);
  } 
  input::-moz-placeholder { 
    /* Mozilla Firefox 19+ */ 
    font-size:12px;
    font-family:Source Han Sans CN;
    font-weight:bold;
    color:rgba(183,183,183,1);
  } 
  input:-ms-input-placeholder { 
    /* Internet Explorer 10+ */ 
    font-size:12px;
    font-family:Source Han Sans CN;
    font-weight:bold;
    color:rgba(183,183,183,1);
  }
  .SearchContent{
    width:100%;  
    /* background: #E7EDF9;     */
    background:#fff; 
    margin-top: -50px;
  }
  .SearchContent1{
    width: 100%;
    margin: 0 auto;
    height: 50px;
    line-height: 50px;
  }
  .SearchHeadOne{
    display: flex;
    flex-direction: row;
    justify-content: space-between;position: relative;
  }
  .SearchHeadOne>div:first-child{
    margin-left: 21%;
  }
  .SearchHeadOne>div:last-child{
    cursor: pointer;
  }
  .SearchHeadOne>div:first-child>img{
    cursor: pointer;
  }
  .SearchHeadOne>div:first-child>span{
    font-size: 14px;
    color: #fff;
    margin-left: 15px;
    cursor: pointer;
  }
  .el-checkbox-group>span{
    margin-top: 10px;
    margin-left: 30%;
    cursor: pointer;
  }
  /* .el-checkbox-group>span{
    text-align: center;
  } */
  .senior{
    position: absolute;
    left:120px;
    top: 100px;
    z-index: 2001;
    width: 570px;
    background: #fff;
    border-radius: 10px;
  }
  .senior>table{
    width: 100%;
    height: 354px;
  }
  td,th{
    text-align: center;
  }
  .senior>table>thead>tr>th{
    font-size:14px;
    font-family:Source Han Sans CN;
    font-weight:400;
    line-height: 50px;
    color:rgba(255,255,255,1);
  }
  .senior>table>thead>tr>th:nth-child(3){
    text-align: right;
    padding-right: 20px;
  }
  
  .senior>table>thead{
    background:linear-gradient(0deg,rgba(45,76,161,1),rgba(78,112,201,1));
    
  }
  .senior>table>tbody>tr:nth-child(1)>td{
    font-size:14px;
    font-family:Source Han Sans CN;
    font-weight:bolder;
    color:rgba(51,51,51,1);
  }
  .senior>table>tbody>tr>td:nth-child(1)>.el-select{
    width: 75px;
  }
  .el-button{
    margin-left: 10px;
  }
  .senior>table>tbody>tr>td{
    padding:0 5px;
  }
  .SearchHeadTwo{
    padding-left: 10px;
    display: flex;
    flex-direction: row;
    justify-content: space-between
  }
  .SearchHeadTwo>ul{
    width: 70%;
    display: flex;
    flex-direction: row;
    margin: 0;
  }
  .SearchHeadTwo>>>.el-switch{
    margin-top: 15px;
  }
  .SearchHeadTwo>>>.el-switch__label--right{
    color: #fff;
    font-style: 12px;
  }
  .SearchHeadTwo>>>.el-switch__core{
    width: 36px !important;
    height: 16px;
  }
  .SearchHeadTwo>>>.el-switch__core:after{
    width: 12px;
    height: 12px;
  }
  .SearchHeadTwo>ul>li{
    line-height: 50px;
    font-size:14px;
    font-family:Source Han Sans CN;
    font-weight:400;
    color:rgba(255,255,255,1);
    position: relative;
    cursor: pointer;
  }
  .SearchHeadTwo>ul>li>span{
    color: #fff;
    font-size: 12px;
  }
  .SearchHeadTwo>ul>li:nth-child(1)>span{
    position: absolute;
    top: -3px;
    left: 110%;
  }
  .SearchHeadTwo>ul>li:nth-child(1){
    margin-right: 8%;
  }
  .SearchHeadTwo>ul>li:nth-child(1)>span:nth-child(1){
    position: absolute;
    top: -5px;
    left: 110%;
  }
  .SearchHeadTwo>ul>li:nth-child(1)>span:nth-child(2){
    position: absolute;
    top: 3px;
    left: 110%;
  }
  .SearchHeadTwo>ul>li:nth-child(2){
    margin-right: 10%;
  }
  .SearchHeadTwo>ul>li:nth-child(2)>span:nth-child(1){
    position: absolute;
    top: -5px;
    left: 110%;
  }
  .SearchHeadTwo>ul>li:nth-child(2)>span:nth-child(2){
    position: absolute;
    top: 3px;
    left: 110%;
  }
  .SearchHeadTwo>ul>li:nth-child(3)>span:nth-child(1){
    position: absolute;
    top: -5px;
    left: 110%;
  }
  .SearchHeadTwo>ul>li:nth-child(3)>span:nth-child(2){
    position: absolute;
    top: 3px;
    left: 110%;
  }
  .SearchHeadThree{
    text-align: right;
    padding-left: 17px;
  }
  .SearchHeadThree>ul{
    display: flex;
    flex-direction: row;
    justify-content:space-around;
    margin: 0;
  }
  .SearchHeadThree>ul>li{
    margin-right: 10px;
    text-align: center;
  }
  .SearchHeadThree>ul>li>span{
    font-size: 14px;
    color: #fff;
    vertical-align: middle;
    
  }
  .SearchHeadThree>ul>li>img{
    width: 20px;  
    vertical-align: middle;
    cursor: pointer;
  }
  .SearchHead{
    width: 100%;
    background:linear-gradient(0deg,rgba(45,76,161,1),rgba(78,112,201,1));
    height: 50px;
  }
  .SearchBody1{
    width: 100%;
    display: flex;
    flex-direction: row;
    background: #E7EDF9;
  }
  .SearchBodyOne{
    background:rgba(255,255,255,1);
    margin-right: 5px;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    padding-bottom: 50px;
  }
  .SearchBodyOne>ul{
    width: 100%;
    display: flex;
    flex-direction: column;
    text-align: center;
  }
  .SearchBodyOne>ul>li{
    width: 100%
  }
  .SearchBodyOne>ul>li>p{
    display: inline-block;
    margin-top: 20px;
  }
  .SearchBodyOne>ul>li>p>img{
    vertical-align: middle;
    width: 20px;
    height: 18px;
  }
  .SearchBodyOne>ul>li>p>span{
    margin-left: 10px;
    font-size:14px;
    font-family:Source Han Sans CN;
    font-weight:500;
    color:#3366cc;
  }
  .el-checkbox-group{
    display: flex !important ;
    flex-direction: column !important;
    text-align: left;
    margin-left: 40%;
  }
  .el-checkbox{
    margin: 3px 0 !important;
  }
  .el-pagination{
    text-align: center;
  }
  .InputP{
    line-height: 14px;
    margin-top: 5px;
    text-align: left;
    border: 0;
  }
  .InputP>div{
    width: 11px;
    height:1px;
    background:rgba(207,207,207,1);
    margin: 5px 0;
  }
  .InputP>input{
    width:35px;
    height:14px;
    background:rgba(255,255,255,1);
    border:1px solid rgba(207,207,207,1);
    outline: none;
    padding-left: 5px;
    font-size: 12px;
    display: block;
  }
  .InputP>input::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
  .InputP>input::-webkit-outer-spin-button {
    -webkit-appearance: none;
  }
  .InputP>input:nth-child(3){
    margin-bottom: 10px;
  }
  .SearchBodyOne>ul>li:nth-child(3)>span{
    font-size:14px;
    font-family:Source Han Sans CN;
    font-weight:400;
    color:rgba(45,76,161,1);
    margin-left: 30%;
    cursor: pointer;
  }
  .SearchBodyOne>ul>li:nth-child(3)>img{
    cursor: pointer;
  }
  .SearchBodyTwo{
    background:rgba(255,255,255,1);
    margin-right: 5px;
    padding: 8px 15px;
    box-sizing: border-box;
    padding-bottom: 50px;
  }
  .SearchBodyTwo>ul>li>div{
    position: relative; 
     margin-bottom: 30px;
  }
  /* .SearchBodyTwo>div:nth-child(2){
    text-align: center;
    widows: 100px;
    margin: 0 auto;
  }
  .SearchBodyTwo>div:nth-child(3){
    text-align: center;
    widows: 100px;
    margin: 0 auto;
  } */
  .SearchBodyTwo>ul>li>div>p:nth-child(1){
    text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    /* width:80%; */
    font-size:13px;
    font-family:Source Han Sans CN;
    font-weight:500;
    color:rgba(51,51,51,1);
    margin-top: 10px;
  }
  .SearchBodyTwo>ul>li>div>p:nth-child(1)>span:hover{
    cursor: pointer;
    color: #304d99;
  }
  .SearchBodyTwo>ul>li>div>p:nth-child(1)>img{
    margin-left: 10px;
    width: 14px;
    cursor: pointer;
  }
  .SearchBodyTwo>ul>li>div>p:nth-child(1)>img:hover{
    margin-left: 10px;
    width: 14px;
    cursor: pointer;
  }
  /* .SearchBodyTwo>ul>li>div>div:nth-child(2){
    width:1px;
    height:78px;
    background:rgba(153,153,153,1);
    margin-top: 14px;
    position: absolute;
    top: 35px;
    left: 0;
  } */
  .SearchBodyTwo>ul>li>div>div:nth-child(3){
    border-left: 1px solid #999;
  }
  .SearchBodyTwo>ul>li>div>div:nth-child(3)>div:nth-child(1){
    text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    width:100%;
    font-size:12px;
    font-family:Source Han Sans CN;
    text-decoration:underline;
    color:rgba(102,102,102,1);
    margin-top: 10px;
    margin-left: 2.5%;
  }
  .SearchBodyTwo>ul>li>div>div:nth-child(3)>div:nth-child(1)>span:hover{
    cursor: pointer;
    color:#304d99;
  }
  .datas{
    width: 80%;
    margin-left: 2.5%;
    margin-top: 10px;
    display: flex;
    flex-direction: row;
  }
  .datas>div:first-child{
    display: flex;
    flex-direction: row;
  }
  .datas>div:first-child>div:first-child{
    width:54px;
    height:16px;
    background:rgba(255,255,255,1);
    border: 1px solid #999;
    border-radius:8px;
    text-align: center;
    line-height: 14px;
    margin-right: 5px;
  }
  .datas>div:first-child>div:first-child>span{
    display: inline-block;
    font-size:12px;
    font-family:Source Han Sans CN;
    font-weight:500;
    color:rgba(151,151,151,1);
  }
  .datas>div:first-child>ul{
    height: 16px;
    display: flex;
    flex-direction: row;
    border:1px solid rgba(153,153,153,1);
    border-radius:2px;
    text-align: center;
    font-size:16px;
    font-family:Source Han Sans CN;
    color:rgba(51,51,51,1);
  }
  .datas>div:first-child>ul>li:nth-child(2){
    line-height: 10px;
  }
  .datas>div:first-child>ul>li:nth-child(3){
    line-height: 10px;
  }
  .datas>div:first-child>ul>li:nth-child(1){
    padding: 0 5px;
    background: #fff;
    border-right:1px solid #999999;
    line-height: 10px;
  }
  .datas>div:first-child>ul>li:nth-child(1)>span{
    display: inline-block;
    font-size: 12px;
    font-family: Source Han Sans CN;
    color:#666666;
  }
  .datas>div:first-child>ul>li:nth-child(1)>span:hover{
    color: #304d99;
    cursor: pointer;
  }
  .datas>div:first-child>ul>li:nth-child(2)>span{
    display: inline-block;
    font-size: 12px;
    font-family: Source Han Sans CN;
    color:#666666;
  }
  .datas>div:first-child>ul>li:nth-child(3)>span{
    display: inline-block;
    font-size: 12px;
    font-family: Source Han Sans CN;
    color:#666666;
  }
  .datas>div:first-child>ul>li:nth-child(2){
    line-height: 10px;
    width: 44px;
    background:rgba(238,238,238,1);
    border-right:1px solid #999999;
  }
  .datas>div:first-child>ul>li:nth-child(3){
    line-height: 10px;
    width: 24px;
    background:rgba(238,238,238,1);
  }
  .datas>div:nth-child(2)>p{
    font-size:12px;
    font-family:Source Han Sans CN;
    font-weight:500;
    margin: 0;
    color:rgba(51,51,51,1);
  }
  .datas>div:nth-child(2)>p>span{
    margin-right: 10px;
  }
  .datas>div:nth-child(2){
    margin-left: 2%;
    line-height: 16px;
  }
  .SearchBodyTwo>ul>li>div>div:nth-child(3)>div:nth-child(3){
    text-align: left;
  }
  .SearchBodyTwo>ul>li>div>div:nth-child(3)>div:nth-child(3)>span{
    text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    font-size:13px;
    width: 95%;
    margin-left: 2.5%;
    font-family:Source Han Sans CN-;
    color:rgba(102,102,102,1);
    margin-top: 5px;;
    /* -webkit-transform: scale(0.8) */
  }
  .SearchBodyThree{
    box-sizing: border-box;
    background:rgba(255,255,255,1);
    padding: 17px 15px;;
  }
  .SearchBodyThree>div>p:nth-child(1){
    font-size:14px;
    font-family:Source Han Sans CN;
    color:rgba(51,51,51,1);
    cursor: pointer;
  }
  .SearchBodyThree>div>div{
    width:84px;
    height:1px;
    background:rgba(220,220,220,1);
    font-weight: bold;
    margin-top: 14px;
    margin-bottom: 15px;
  }
  .SearchBodyThree>div>p:nth-child(3){
    font-size:12px;
    font-family:Source Han Sans CN;
    color:rgba(53,84,172,1);
    margin-bottom: 15px;
    cursor: pointer;
    line-height: 20px;
  }  
  .SearchBodyThree>div>p:nth-child(4){
    font-size:12px;
    font-family:Source Han Sans CN;
    color:rgba(53,84,172,1);
    margin-bottom: 15px;
    cursor: pointer;
    line-height: 20px;
  }
  .SearchBodyThree>div>p:nth-child(5){
    font-size:12px;
    font-family:Source Han Sans CN;
    color:rgba(53,84,172,1);
    margin-bottom: 15px;
    cursor: pointer;
    line-height: 20px;
  }
  .SearchBodyThree>div>p:nth-child(6){
    font-size:12px;
    font-family:Source Han Sans CN;
    color:rgba(53,84,172,1);
    margin-bottom: 15px;
    cursor: pointer;
    line-height: 20px;
  }
  .asc{
    color: #25F7D2 !important;
  }
  .desc{
    color: #fff !important;
  }
  .ForeContent{
    width: 100%;
    background: linear-gradient(-120deg, #93A3CE 0%, #7783A8 100%);
    margin-top: 6px;
  }
  .ForeContent>div:nth-child(1){
    width: 100%;
    position: relative;
  }
  .ForeContent>div:nth-child(1)>img{
    width: 100%;
    opacity: 0.8;
  }
  .ForeContent>div:nth-child(1)>ul{
    position: absolute;
    top: 0;
    left: 0;
    padding: 7px 14px;
    display: flex;
    flex-direction: row;
    width: 100%;
    margin-bottom: 0;
  }
  .ForeContent>div:nth-child(1)>ul>li{
    width: 33%;
  }
  .ForeContent>div:nth-child(1)>ul>li:nth-child(2){
    text-align: center;
  }
  .ForeContent>div:nth-child(1)>ul>li:nth-child(2)>p:nth-child(1){
    font-size:18px;
    font-family:Source Han Sans CN;
    font-weight:400;
    color:rgba(255,255,255,1);
    margin: 0;
    line-height: 20px;
    letter-spacing:5px;
  }
  .ForeContent>div:nth-child(1)>ul>li:nth-child(2)>p:nth-child(2){
    font-size:8px;
    font-family:Source Han Sans CN;
    font-weight:300;
    color:rgba(255,255,255,1);
    letter-spacing:2px;
    margin-top: 5px;
    opacity: .8;
  }
  .ForeContent>div:nth-child(1)>ul>li:nth-child(3)>p{
    text-align: right;
    font-size:12px;
    font-family:Source Han Sans CN;
    font-weight:400;
    color:rgba(255,255,255,1);
    letter-spacing:2px;
    margin-top: 3px;
    opacity: .8;
  }
  .ForeContent>div:nth-child(2)>ul{
    margin: 0;
    padding: 5px 14px;
    display: flex;
    flex-direction: row;
    width: 100%;
  }
  .ForeContent>div:nth-child(2)>ul>li{
    
    opacity:0.8;
    border-radius:2px;
    margin-right: 10px;
  }
  .ForeContent>div:nth-child(2)>ul>li>div{
    box-shadow:0px 2px 18px 0px rgba(21,22,34,0.5);
    background:linear-gradient(270deg,#393F53,#3C4357);
    height: 170px;
    padding: 10px 10px 10px 15px;
  }
  .ForeContent>div:nth-child(2)>ul>li:nth-child(1){
    width: 26%;
  }
  .ForeContent>div:nth-child(2)>ul>li:nth-child(1)>div>p{
    font-size:14px;
    font-family:Source Han Sans CN;
    font-weight:400;
    color:rgba(255,255,255,1);
    letter-spacing:2px;
  }
  .Periodical{
    width: 100%;
    display: flex;
    flex-direction: row;
    
  }
  .Periodical>div:nth-child(2){
    width: 50%;
  }
  .Periodical>div:nth-child(1){
    text-align: right;
    margin-right: 10px;
    width: 50%;
  }
  .Periodical>div:nth-child(1)>p{
    font-size:12px;
    font-family:Source Han Sans CN;
    font-weight:400;
    color:rgba(255,255,255,1);
    margin-bottom: 0;
    line-height: 20px;
  }
  .partition>p{
    font-size:14px;
    font-family:Source Han Sans CN;
    font-weight:400;
    color:rgba(255,255,255,1);
    line-height: 20px;
  }
  .part1{
    width: 100%;
    display: flex;
    flex-direction: row;
    margin-top: 40px;
  }
  .part1>div:nth-child(1){
    width: 50%;
    text-align: center;
    line-height: 63px;
  }
  .part1>div:nth-child(2){
    width: 50%;
    line-height: 63px;
    text-align: center;
  }
  .part1>div:nth-child(2){
    font-size:18px;
    font-family:Source Han Sans CN;
    font-weight:400;
    color:rgba(255,255,255,1);
  }
  .part1>div:nth-child(1)>div{
    width:63px;
    height:63px;
    background:linear-gradient(-30deg,rgba(92,101,176,1),rgba(130,130,220,1));
    border-radius:50%;
    margin: 0 auto;
  }
  .part1>div:nth-child(1)>div>p{
    font-size:18px;
    font-family:Source Han Sans CN;
    font-weight:400;
    color:rgba(255,255,255,1);
  }
  .mesh>p{
    font-size:14px;
    font-family:Source Han Sans CN;
    font-weight:400;
    color:rgba(255,255,255,1);
    line-height: 20px;
  }
  .five4{
    width: 100%;
    margin-top: 20px;
    display: flex;
    flex-direction: row
  }
  .five4>div:nth-child(1){
    width: 10%;
  }
  .five4>div:nth-child(1)>div{
    width:6px;
    height:6px;
    background:rgba(237,108,24,1);
    border-radius:50%;
    margin-bottom: 20px;
    margin-top: 4px;
  }
  .five4>div:nth-child(2)>p{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    font-size:12px;
    font-family:Source Han Sans CN;
    font-weight:400;
    color:rgba(255,255,255,1);
    margin: 0;
    line-height: 12px;
    margin-bottom: 14px;
  }
  .five4>div:nth-child(2){
    width: 90%
  }
  .mesh>div{
    width: 100%;
    margin-top: 5px;
  }
  .mesh>div:nth-child(2)>div:nth-child(1)>div{
    background:rgba(237,108,24,1);
  }
  .mesh>div:nth-child(3)>div:nth-child(1)>div{
    background:#F3B407;
  }
  .mesh>div:nth-child(4)>div:nth-child(1)>div{
    background:#13B88B;
  }
  .mesh>div:nth-child(5)>div:nth-child(1)>div{
    background:#5C65B0;
  }
  .mesh>div:nth-child(6)>div:nth-child(1)>div{
    background:#5C65B0;
  }
  .mesh1{
    display: flex;
    flex-direction: row
  }
  .mesh1>div:nth-child(1){
    width: 10%;
  }
  .mesh1>div:nth-child(1)>div{
    width:6px;
    height:6px;
    background:rgba(237,108,24,1);
    border-radius:50%;
    margin-bottom: 15px;
    margin-top: 4px;
  }
  .mesh1>div:nth-child(1)>div:nth-child(1){
    background:rgba(237,108,24,1);
  }
  .mesh1>div:nth-child(2)>p{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    font-size:12px;
    font-family:Source Han Sans CN;
    font-weight:400;
    color:rgba(255,255,255,1);
    margin: 0;
    line-height: 12px;
    margin-bottom: 9px;
  }
  .mesh1>div:nth-child(2){
    width: 90%
  }
  .ForeContent>div:nth-child(2)>ul>li:nth-child(2){
    width: 20%;
  }
  .ForeContent>div:nth-child(2)>ul>li:nth-child(3){
    width: 23%;
  }
  .ForeContent>div:nth-child(2)>ul>li:nth-child(4){
    width: 32%;
    margin-right: 0;
  }
  .ForeContent>div:nth-child(2)>ul>li:nth-child(4)>div>p{
    font-size:14px;
    font-family:Source Han Sans CN;
    font-weight:400;
    color:rgba(255,255,255,1);
    line-height: 20px;
  }
  .perLeft{
    display: flex;
    flex-direction: row;
  }
  .perLeft>div:nth-child(1){
    margin-right: 10px;
    width: 60%;
  }

  .perLeft>div:nth-child(1)>p{
    font-size:12px;
    font-family:Source Han Sans CN;
    font-weight:400;
    color:rgba(255,255,255,1);
    margin:0;
    line-height: 20px;
  }
  .perRight{
    display: flex;
    flex-direction: row;
    text-align: right;
  }
  .perRight>div:nth-child(1){
    margin-right: 10px;
    width: 60%
  }
  .perRight>div:nth-child(2){
    width: 40%
  }
  .perRight>div:nth-child(1)>p{
    font-size:12px;
    font-family:Source Han Sans CN;
    font-weight:400;
    color:rgba(255,255,255,1);
    margin:0;
    line-height: 20px;
  }
  .Country{
    display: flex;
    flex-direction: row;
    padding: 5px 14px;
  }
  .Country>div{
    height: 270px;
    box-shadow:0px 2px 18px 0px rgba(21,22,34,0.5);
    background:linear-gradient(270deg,#393F53,#3C4357);
    margin-right: 10px;
    opacity:0.8;
  }
  .Country>div:nth-child(1){
    width: 52%;
  }
  .Country>div:nth-child(2){
    width: 31%;
  }
  .Country>div:nth-child(3){
    width: 17%;
    margin: 0;
  }
  .country1{
    display: flex;
    flex-direction: row;
    padding: 10px 10px 10px 15px;
  }
  .country1>div:first-child{
    width: 35%;
  }
  .country1>div:first-child>p{
    font-size:14px;
    font-family:Source Han Sans CN;
    font-weight:400;
    color:rgba(255,255,255,1);
  }
  .country1>div:last-child{
    width: 65%;
    line-height: 250px;
  }
  .count1{
    display: flex;
    flex-direction: row;
  }
  .count1>div:first-child{
    width: 30%
  }
  .count1>div:first-child>p{
    font-size:12px;
    font-family:Source Han Sans CN;
    font-weight:400;
    color:rgba(255,255,255,1);
    line-height: 20px;
  }
  .count1>div:last-child{
    width: 70%
  }
  .Countrymen{
    padding: 10px 10px 10px 15px;
  }
  .Countrymen>p{
    font-size:14px;
    font-family:Source Han Sans CN;
    font-weight:400;
    color:rgba(255,255,255,1);
    line-height: 20px;
  }
  .Countrymen>div{
    margin-top: -50px;
  }
  .Countrymen>div>div:first-child{
    width: 55%
  }
  .Countrymen>div>div:first-child>p{
    font-size: 12px;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: rgba(255,255,255,1);
    line-height: 20px;
    text-align: right;
    margin-right: 10px;
  }
  .Countrymen>div>div:last-child{
    width: 45%;
  }
  .first1{
    padding: 10px 10px 10px 15px;
    
  }
  .first1>p{
    font-size:14px;
    font-family:Source Han Sans CN;
    font-weight:400;
    color:rgba(255,255,255,1);
    line-height: 20px;
  }
  .first1>div{
    width: 100%;
    margin-top: 20px;
    position: relative;
  }
  .first1>div>div:nth-child(1){
    width: 20%;
    position: absolute;

  }
  .first1>div>div:nth-child(1)>p{
    font-size:12px;
    font-family:Source Han Sans CN;
    font-weight:400;
    color:rgba(92,101,176,1);
    margin-top: 5px;
  }
  .first1>div>div:nth-child(1)>p:nth-child(4){
    margin-top: 16px;
  }
  .first1>div>div:nth-child(1)>p:nth-child(5){
    margin-top: 20px;
  }
  .first1>div>div:nth-child(1)>p:nth-child(6){
    margin-top: 18px;
  }
  .First{
    width: 76%;
    margin-left: 35px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 8px;
  }
  .First>div:nth-child(1)>p{
    font-size:12px;
    font-family:Source Han Sans CN;
    font-weight:400;
    color:rgba(255,255,255,1);
    margin: 0;
  }
  .First>div:nth-child(1)>p:nth-child(1){
    line-height: 28px
  }
  .First>div:nth-child(1)>p:nth-child(2){
    line-height: 28px
  }
  .First>div:nth-child(1)>p:nth-child(3){
    line-height: 28px
  }
  .First>div:nth-child(2)>p{
    font-size:12px;
    font-family:Source Han Sans CN;
    font-weight:400;
    color:rgba(255,255,255,1);
    margin: 0;
  }
  .First>div:nth-child(2)>p:nth-child(1){
    line-height: 28px
  }
  .First>div:nth-child(2)>p:nth-child(2){
    line-height: 28px
  }
  .First>div:nth-child(2)>p:nth-child(3){
    line-height: 28px
  }
  .foreFoot{
    width: 100%;
    display: flex;
    flex-direction: row;
    padding: 5px 14px;
  }
  .foreFoot>div{
    box-shadow:0px 2px 18px 0px rgba(21,22,34,0.5);
    background:linear-gradient(270deg,#393F53,#3C4357);
    height: 215px;
    padding: 10px 10px 10px 15px;
    margin-right: 10px; 
    opacity: .8;
  }
  .foot1{
    width: 30%;
  }
  .foot1>p{
    font-size:14px;
    font-family:Source Han Sans CN;
    font-weight:400;
    color:rgba(255,255,255,1);
  }
  .foot2{
    width: 35%;
  }
  .foot2>p{
    font-size:14px;
    font-family:Source Han Sans CN;
    font-weight:400;
    color:rgba(255,255,255,1);
  }
  .foot3{
    width: 35%;
    margin-right: 0 !important;
  }
  .foot3>p{
    font-size:14px;
    font-family:Source Han Sans CN;
    font-weight:400;
    color:rgba(255,255,255,1);
  }
  #foot3{
    margin-top: -50px;
  }
  .fiveFoot{
    width: 100%;
    display: flex;
    flex-direction: row;
    padding: 5px 14px;
  }
  .fiveFoot>div{
    box-shadow:0px 2px 18px 0px rgba(21,22,34,0.5);
    background:linear-gradient(270deg,#393F53,#3C4357);
    height: 212px;
    padding: 10px 10px 10px 15px;
    margin-right: 10px; 
    opacity: .8;
  }
  .five1{
    width: 50%;
  }
  .five1>p{
    font-size:14px;
    font-family:Source Han Sans CN;
    font-weight:400;
    color:rgba(255,255,255,1);
  }
  #five1{
    margin-top: -50px; 
  }
  .five2{
    width: 27%;
  }
  .five2>p{
    font-size:14px;
    font-family:Source Han Sans CN;
    font-weight:400;
    color:rgba(255,255,255,1);
  }
  .five3{
    width: 23%;
    margin-right: 0!important;
  }
  .five3>div:nth-child(2)>div:nth-child(1)>div{
    background:rgba(237,108,24,1);
  }
  .five3>div:nth-child(3)>div:nth-child(1)>div{
    background:#F3B407;
  }
  .five3>div:nth-child(4)>div:nth-child(1)>div{
    background:#13B88B;
  }
  .five3>div:nth-child(5)>div:nth-child(1)>div{
    background:#5C65B0;
  }
  .five3>div:nth-child(6)>div:nth-child(1)>div{
    background:#5C65B0;
  }
  .five3>p{
    font-size:14px;
    font-family:Source Han Sans CN;
    font-weight:400;
    color:rgba(255,255,255,1);
    margin-bottom: 20px;
  }
  .five4{
    margin-top: 0;
    margin-bottom: 10px;
  }
  #per2{
    margin-top: -55px;
  }
  #per3{
    margin-top: -55px;
  }
  #per4{
    margin-top: -55px;
  }
  #five2{
    margin-top: -55px;
  }
  .sixFoot{
    width: 100%;
    display: flex;
    flex-direction: row;
    padding: 5px 14px;
  }
  .sixFoot>div{
    box-shadow:0px 2px 18px 0px rgba(21,22,34,0.5);
    background:linear-gradient(270deg,#393F53,#3C4357);
    height: 413px;
    padding: 10px 10px 10px 15px;
    margin-right: 10px; 
    opacity: .8;
  }
  .six1{
    width: 49.5%;
  }
  .six2{
    width: 50.5%;
    margin-right: 0!important;
  }
  .six1>p{
    font-size:14px;
    font-family:Source Han Sans CN;
    font-weight:400;
    color:rgba(255,255,255,1);
    margin-bottom: 20px;
  }
  #six1{
    margin-top: -55px;
  }
  .six2>p{
    font-size:14px;
    font-family:Source Han Sans CN;
    font-weight:400;
    color:rgba(255,255,255,1);
    margin-bottom: 20px;
  }
  .Periodical1{
    width: 100%;
    display: flex;
    flex-direction: row;
  }
  .Periodical2{
    width: 100%;
  }
  .title3{
    margin: 10px 0 15px 0;
    cursor: pointer;
  }
  .Periodical1Left{
    width: 70%;
  }
  .Periodical1Left>div:nth-child(1){
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin:0 0 20px 0;
  }
  .Periodical1Left>div:nth-child(1)>p:nth-child(1){
    font-size:12px;
    font-family:Source Han Sans CN;
    font-weight:400;
    color:rgba(51,51,51,1);
  }
  .Periodical1Left>div:nth-child(1)>p:nth-child(1)>span:nth-child(3){
    margin-left: 20px;
  }
  .Periodical1Left>div:nth-child(1)>p:nth-child(2){
    font-size:12px;
    font-family:Source Han Sans CN;
    font-weight:400;
    color:rgba(102,102,102,1);
  }
  .Periodical1Left>div:nth-child(1)>p:nth-child(2)>span:last-child{
    margin-left: 20px;
    margin-right: 20px;
  }
  .Periodical1Left>div:nth-child(1)>p:nth-child(2)>span{
    cursor: pointer;
  }
  .Periodical1Left>div:nth-child(1)>p:nth-child(2)>span:hover{
    color:#4E70C9;
  }
  .Periodical1Right{
    width: 30%;
    margin-top: -50px;
  }
  .Periodical2Left{
    width: 100%;
  }
  .Periodical2Left>p:nth-child(1){
    font-size:12px;
    font-family:Source Han Sans CN;
    font-weight:400;
    color:rgba(51,51,51,1);
    margin: 0;
    margin-bottom: 5px;
  }
  .Periodical2Left>p:nth-child(2){
    font-size:12px;
    font-family:Source Han Sans CN;
    font-weight:400;
    color:rgba(51,51,51,1);
    margin-bottom: 20px;;
  }
  .Periodical2Left>p:nth-child(2)>span{
    font-size:12px;
    font-family:Source Han Sans CN;
    font-weight:400;
    color:rgba(51,51,51,1);
    margin: 0 10px;
    font-size:12px;
    font-family:Source Han Sans CN;
    font-weight:400;
    color:rgba(102,102,102,1);
  }
  .Periodical2Left>p:nth-child(1)>span{
    margin:0 10px;
    font-size:12px;
    font-family:Source Han Sans CN;
    font-weight:400;
    color:rgba(102,102,102,1);
  }
  .Periodical2Left>div:last-child{
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    margin-top: 10px;
  }
  .Periodical2Left>div:last-child>div{
    width: 65%;
    height: 1px;
    background: #dcdcdc;
    margin-top: 10px;
  }
  .Periodical2Left>div:last-child>p{
    margin-left: 30px;
    font-size:12px;
    font-family:Source Han Sans CN;
    font-weight:400;
    color:rgba(51,51,51,1);
  }
  .issn{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    border:1px solid rgba(243,243,253,1);
    border-radius:4px;
    padding: 0 20px;
  }
  .issn>div{
    font-size:13px;
    font-family:Source Han Sans CN;
    font-weight:400;
    color:rgba(51,51,51,1);
  }
  .issn>div>p:first-child{
    margin-top: 5px;
  }
  #Period{
    margin-top: -50px;
  }
  .select-panel {
    position: absolute;
    top: 85px;
    height: 0;
    z-index: 999;

  }
  .searchInput{
    display: flex;
    flex-grow: 0;
    flex-shrink: 0;
    box-sizing: border-box;
    width: 70%;
  }
  .select-item {
    /*height: 0;*/
    z-index: 999;
    background: #fff;
    color: #b7b7b7;
    padding: 0 10px;
  }
  .select-item:hover{
    color: #3d5eb5;
    background: #f3f3fd;
    cursor: pointer;
  }
  .senior>table{
    box-shadow: 3px 3px 5px rgba(244,244,244,1);
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
  .mess>span{
    font-size: 12px;
    vertical-align: middle;
    color: #e6a23c;
  }
  .mess>img{
    vertical-align: middle;
    margin-right: 10px;
  }
  .el-checkbox, .el-checkbox__input{
    white-space: pre-wrap !important;
  }
  .sevenContent{
    display: flex;
    flex-direction: row;
  }
  .eghitContent{
    display: flex;
    flex-direction: row;
  }
  .nineContent{
    display: flex;
    flex-direction: row;
  }
  .shucontent{
    width: 27%;
    margin-left: 10px;
    margin-right: 10px;
    margin-top: 10px;
    opacity: .8;
  }
  .hengcontent{
    width: 73%;
    opacity: .8;
  }
  .shuContent{
    width: 50%;
    margin-left: 10px;
    margin-right: 10px;
    opacity: .8;
  }
  .hengContent{
    width: 50%;
    opacity: .8;
  }
  .xuebu{
    box-shadow: 0px 2px 18px 0px rgba(21,22,34,0.5);
    background: linear-gradient(270deg,#393F53,#3C4357);
    padding: 10px 10px 10px 15px;
  }
  .fuze{
    box-shadow: 0px 2px 18px 0px rgba(21,22,34,0.5);
    background: linear-gradient(270deg,#393F53,#3C4357);
    padding: 10px 10px 10px 15px;
  }
  .biaoti1{
    box-shadow: 0px 2px 18px 0px rgba(21,22,34,0.5);
    background: linear-gradient(270deg,#393F53,#3C4357);
    padding: 10px 10px 10px 15px;
    margin-top: 10px;
  }
  .yijixue{
    box-shadow: 0px 2px 18px 0px rgba(21,22,34,0.5);
    background: linear-gradient(270deg,#393F53,#3C4357);
    padding: 10px 10px 10px 15px;
    margin-top: 10px;
  }
  .yijixue>p{
    font-size:14px;
    font-family:Source Han Sans CN;
    font-weight:400;
    color:rgba(255,255,255,1);
    letter-spacing:2px;
  }
  .erjixue{
    box-shadow: 0px 2px 18px 0px rgba(21,22,34,0.5);
    background: linear-gradient(270deg,#393F53,#3C4357);
    padding: 10px 10px 10px 15px;
    margin-top: 10px;
  }
  .erjixue>p{
    font-size:14px;
    font-family:Source Han Sans CN;
    font-weight:400;
    color:rgba(255,255,255,1);
    letter-spacing:2px;
  }
  .nineContent{
    opacity: 0.8;
  }
  .danwei{
    width: 50%;
    box-shadow: 0px 2px 18px 0px rgba(21,22,34,0.5);
    background: linear-gradient(270deg,#393F53,#3C4357);
    padding: 10px 10px 10px 15px;
    margin-top: 10px;
    margin-left: 10px;
    margin-right: 10px;
  }
  .danwei>p{
    font-size:14px;
    font-family:Source Han Sans CN;
    font-weight:400;
    color:rgba(255,255,255,1);
    letter-spacing:2px;
  }
  .nianfen{
    width: 50%;
    box-shadow: 0px 2px 18px 0px rgba(21,22,34,0.5);
    background: linear-gradient(270deg,#393F53,#3C4357);
    padding: 10px 10px 10px 15px;
    margin-top: 10px;
  }
  .nianfen>p{
    font-size:14px;
    font-family:Source Han Sans CN;
    font-weight:400;
    color:rgba(255,255,255,1);
    letter-spacing:2px;
  }
  .sanjixue{
    box-shadow: 0px 2px 18px 0px rgba(21,22,34,0.5);
    background: linear-gradient(270deg,#393F53,#3C4357);
    padding: 10px 10px 10px 15px;
    margin-top: 10px;
  }
  .sanjixue>p{
    font-size:14px;
    font-family:Source Han Sans CN;
    font-weight:400;
    color:rgba(255,255,255,1);
    letter-spacing:2px;
  }
  .fuze1{
    display: flex;flex-direction: row;
  }
  .fu1{
    width: 80%;
  }
  .fu2{
    width: 25%;
    text-align: center
  }
  .fu2>p{
    margin-bottom: 12px;
    font-size:14px;
    font-family:Source Han Sans CN;
    font-weight:400;
    color:rgba(92,101,176,1);
  }
  .fuze>p{
    font-size:14px;
    font-family:Source Han Sans CN;
    font-weight:400;
    color:rgba(255,255,255,1);
    letter-spacing:2px;
  }
  .fu1{
    width: 70%;
  }
  
  .fu1>tbody>tr>td{
    color: #fff;
    padding: 6px;
  }
  .fu1>tbody>tr:nth-child(1)>td{
    color: #AFB6D4 !important;
  }
  .fu1>tbody>tr:nth-child(2)>td{
    padding-top: 10px;
  }
  .fu1>tbody>tr:nth-child(3)>td{
    padding: 14px 0;
  }
  .fu1>tbody>tr:nth-child(4)>td{
    padding-top: 7px;
    padding-bottom: 9px;
  }
  .biaoti1>p{
    font-size:14px;
    font-family:Source Han Sans CN;
    font-weight:400;
    color:rgba(255,255,255,1);
  }
  .xue1{
    width: 350px;
    height: 300px;
  }
  .xuebu>p{
    font-size:14px;
    font-family:Source Han Sans CN;
    font-weight:400;
    color:rgba(255,255,255,1);
    letter-spacing:2px;
  }
  .xuebu>div{
    display: flex;
    flex-direction: row;
  }
  .xuebu>div>div:nth-child(2){
    margin-left: 10px;
    margin-top: 50px;
    color: #fff;
  }
  
  .xiangmu{
    box-shadow: 0px 2px 18px 0px rgba(21,22,34,0.5);
    background: linear-gradient(270deg,#393F53,#3C4357);
    padding: 10px 10px 10px 15px;
  }
  .xiang1{
    width: 350px;
    height: 300px;
  }
  .xiangmu>p{
    font-size:14px;
    font-family:Source Han Sans CN;
    font-weight:400;
    color:rgba(255,255,255,1);
    letter-spacing:2px;
  }
  .xiangmu>div{
    display: flex;
    flex-direction: row;
  }
  .xiangmu>div>div:nth-child(2){
    margin-left: 10px;
    color: #fff;
  }
  .xiang2{
    display: flex;
    flex-direction: row;
  }
  .xue2{
    display: flex;
    flex-direction: row;
  }
  .yuan1{
    width: 18px;
    height: 18px;
    border-radius:50%;
    background: #fff;
  }
  .xiang2>p{
    margin-bottom: 8px;
    margin-left: 10px;
    font-size: 12px;
  }
  .xue2>p{
    margin-bottom: 7px;
    margin-left: 10px;
    font-size: 12px;
  }
  .danwei1{
    margin-top: -30px;
  }
  .xiangmujine{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    color: #fff;
  }
  .xiangmujine>p:nth-child(1){
    margin-left: 30px
  }
  .xiangmujine>p:nth-child(2){
    margin-right: 30px
  }
  .xiangmujin{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    color: #fff;
    margin-bottom: 10px;
  }
  .xiangmujin>p:nth-child(1){
    margin-left: 30px
  }
  .xiangmujin>p:nth-child(2){
    margin-right: 30px
  }
  .nianfen1{
    margin-top: -30px;
  }
  .dangnianjine{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    color: #fff;
  }
  .dangnianjine>p:nth-child(1){
    margin-left: 30px
  }
  .dangnianjine>p:nth-child(2){
    margin-right: 30px
  }
  .dangnianjin{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    color: #fff;
    margin-bottom: 10px;
  }
  .dangnianjin>p:nth-child(1){
    margin-left: 30px
  }
  .dangnianjin>p:nth-child(2){
    margin-right: 30px
  }
  .shoucang{
    vertical-align: middle;
    margin-left: 0px !important;
    margin-right: 8px;
    margin-top: -3px;
    cursor: pointer;
  }
  .theads{
    line-height: 50px;
    background:linear-gradient(0deg,#4a6bc4 ,#587ad6);
    color: #fff;
    padding-left: 25px;
    position: relative;
  }
  .theads>img{
    position: absolute;
    top: 18px;
    right: 30px;
    cursor: pointer;
  }
</style>