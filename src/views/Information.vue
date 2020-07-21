<template>
  <div>
    <Header></Header>
    <div class="SearchBackground">
      <div class="SearchBody1" @click.stop="settingEvent()">
        <div class="search2">
          <div class="searchBox1">
            <div>
            </div>
            <div class="searchInput">
              <el-autocomplete
                class="inline-input" @keyup.13.native="searcher()" @input="searchContent==''?'':Suggester();search3()"
                v-model="searchContent"
                :fetch-suggestions="querySearch"
                placeholder="你可以输入相关的疾病关键字或者样本特性关键字"
                :trigger-on-focus="false"
                @select="handleSelect;searcher()"
              ></el-autocomplete>
            </div>
            <div @click="search4();searcher1()" id="sea" class="Search" v-show="false"><span>搜索</span></div>
            <div @click="search3();searcher()"><span>搜索</span></div>
          </div>
        </div>
        <div class="SearchBody">
          <span>寻找数据：</span>
          <ul>
            <li><span @click="breast">breast cancer</span></li>
            <li><span @click="survival">survival</span></li>
            <li><span @click="single">single call RNA-seq</span></li>
          </ul>
          <div class="SearchBox">
            <div>
            </div>
            <div class="searchInput">
              <el-autocomplete
                class="inline-input" @keyup.13.native="searcher()" multiple @input="searchContent==''?'':Suggester();search3()"
                v-model="searchContent"
                :fetch-suggestions="querySearch"
                placeholder="你可以输入相关的疾病关键字或者样本特性关键字"
                :trigger-on-focus="false"
                @select="handleSelect;searcher()"
              ></el-autocomplete>
            </div>
            <div @click="search4();searcher1()" id="sea" class="Search" v-show="false"><span>搜索</span></div>
            <div @click="search3();searcher()"><span>搜索</span></div>
          </div>
          <p class="sousuo"><span>搜索结果：<span>{{result}}</span><span>搜索时间：</span><span>{{timer}}</span></span><span style="font-size:14px;color:#FF6B00" @click="toTcgaDown()">TCGA数据快速下载</span></p>
        </div>
      </div>
      <div class="SearchHeadBg">
      </div>
      <div class="SearchContent">
        <div class="SearchHead">
          <div class="SearchContent1 row">
            <div class="SearchHeadOne col-sm-3">
              <div>
                <img @click="seniorq()" src="../../public/img/search.png">
                <span @click="seniorq()">高级<span>搜索</span></span>
              </div>
              <div><img @click="clear();search3();searcher()" src="../../public/img/brush.png" title="清空"></div>
              <div id="senior" class="senior" v-if="senior1">
                <table>
                  <thead>
                    <tr>
                      <th></th>
                      <th>高级搜索</th>
                      <th><img @click="cloce" src="../../public/img/x.png" alt=""></th>
                    </tr>
                  </thead>
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
                        <el-select  v-model="model1" placeholder="请选择">
                          <el-option
                            v-for="item in field1"
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
                        <el-select v-model="relation2" placeholder="请选择" style="width:100px" size='small'>
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
                            v-for="item in field1"
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
                        <el-select v-model="relation3" placeholder="请选择" style="width:100px" size='small'>
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
                            v-for="item in field1"
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
                        <el-select v-model="relation4" placeholder="请选择" style="width:100px" size='small'>
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
                            v-for="item in field1"
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
                        <el-button type="info" @click="reset()" size="small" round>重置</el-button>
                        <el-button type="primary" @click="Search();searcher()" size="small" round>检索</el-button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div class="SearchHeadTwo col-sm-6">
              <ul>
                <li :class="{'asc':isAsc1,'desc':isDesc1}" @click="Update();inf()">
                  更新日期
                  <span>
                    <img v-if="show1" src="../../public/img/shang.png">
                    <img v-if="active1" src="../../public/img/shangActive.png">
                  </span>
                  <span>
                    <img v-if="show6" src="../../public/img/xia.png">
                    <img v-if="active6" src="../../public/img/xiaActive.png">
                  </span>
                </li>
                <li :class="{'asc':isAsc2,'desc':isDesc2}" @click="Sample();inf()">
                  样本数量
                  <span>
                    <img v-if="show2" src="../../public/img/shang.png">
                    <img v-if="active2" src="../../public/img/shangActive.png">
                  </span>
                  <span>
                    <img v-if="show3" src="../../public/img/xia.png">
                    <img v-if="active3" src="../../public/img/xiaActive.png">
                  </span>
                </li>
                <li :class="{'asc':isAsc3,'desc':isDesc3}" @click="relevant();inf()">
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
            </div>
            <div class="SearchHeadThree col-sm-3">
              <el-select
                :disabled="txdis"
                v-model="ybtx"
                multiple
                filterable
                clearable
                remote
                collapse-tags
                reserve-keyword
                :placeholder="txplac"
                :remote-method="remoteMethod4"
                :loading="loading5"
                @change="onSelectedDrug4($event);search3();searcher()">
                <el-option style="max-width: 250px;"
                  v-for="item in ybtx111"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              <el-button :title="resulttexin1" @click="searchAlltx" size="small" :disabled="resulttexin">样本特性</el-button>
            </div>
          </div>
        </div>
        <div class="SearchBody1 row">
          <div class="SearchBodyOne col-sm-3" v-if="show">
            <ul>
              <li style="text-align:left;margin-top:10px">
                <el-button type="primary" @click="toViedo" style="background:#3366cc;border-color:#3366cc" icon="el-icon-caret-right">视频教程</el-button>
              </li>
              <li>
                <p><img src="../../public/img/year.png"><span>平台ID:</span></p>
                <div class="plid">
                  <el-select
                    v-model="plID1"
                    multiple
                    filterable
                    clearable
                    remote
                    reserve-keyword
                    placeholder="请输入关键词"
                    :remote-method="remoteMethod2"
                    :loading="loading3"
                    @change="onSelectedDrug1($event);search3();searcher()">
                    <el-option
                      v-for="item in plIDs1"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </div>
              </li>
              <li>
                <p><img src="../../public/img/article.png"><span>物种名称:</span></p>
                <div class="plid">
                  <el-select
                    v-model="Species"
                    multiple
                    filterable
                    clearable
                    remote
                    reserve-keyword
                    placeholder="请输入关键词"
                    :remote-method="remoteMethod1"
                    :loading="loading2"
                    @change="onSelectedDrug2($event);search3();searcher()">
                    <el-option
                      v-for="item in Speciess"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </div>
              </li>
              <li>
                <p><img src="../../public/img/article.png"><span>样本信息:</span></p>
                <div class="plid">
                  <el-select
                    v-model="sampleinf"
                    filterable
                    multiple
                    clearable
                    remote
                    
                    reserve-keyword
                    placeholder="请输入关键词"
                    :remote-method="remoteMethod3"
                    :loading="loading4"
                    @change="onSelectedDrug3($event);search3();searcher()">
                    <el-option style="max-width:250px" 
                      v-for="item in sampleinfs"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </div>
              </li>
              <li>
                <p><img src="../../public/img/article.png"><span>样本数:</span></p>
                  <el-checkbox-group v-model="checkList3" @change="sample();search3();searcher()">
                    <el-checkbox label="0-10">0-10</el-checkbox>
                    <el-checkbox label="10-50">10-50</el-checkbox>
                    <el-checkbox label="50-100">50-100</el-checkbox>
                    <div class="InputP" v-show="inpp">
                      <input type="number" v-model="inp1">
                      <div></div>
                      <input type="number" v-model="inp2">
                      <el-button type="primary" size="mini" @click="yangbendown();search3();searcher()" round>搜索</el-button>
                    </div>
                    <span><img v-show="inpp1" @click="countdown" src="../../public/img/xia1.png" alt=""></span>
                    <span><img v-show="!inpp1" @click="countdown" src="../../public/img/shang1.png" alt=""></span>
                  </el-checkbox-group>
              </li>
              <li class="pingtai">
                <p><img src="../../public/img/article.png"><span>平台类型:</span></p>
                <el-checkbox-group value="checkList" v-model="checkList2" @change="platformType();search3();searcher()">
                  <el-checkbox label="EXPRESSION PROFILING BY ARRAY" >Expression Profiling By Array</el-checkbox>
                  <el-checkbox label="EXPRESSION PROFILING BY HIGH THROUGHPUT SEQUENCING" class="top-33">Expression Profiling By High Throughput Sequencing</el-checkbox>
                  <el-checkbox label="EXPRESSION PROFILING BY GENOME TILING ARRAY" class="top-33">Expression Profiling By Genome Tiling Array</el-checkbox>
                  <el-checkbox label="EXPRESSION PROFILING BY MPSS">Expression Profiling By Mpss</el-checkbox>
                  <el-checkbox label="EXPRESSION PROFILING BY RT-PCR">Expression Profiling By RT-PCR</el-checkbox>
                  <div v-if="type1">
                    <el-checkbox label="EXPRESSION PROFILING BY SAGE">Expression Profiling By Sage</el-checkbox>
                    <el-checkbox label="EXPRESSION PROFILING BY SNP ARRAY">Expression Profiling By Snp Array</el-checkbox>
                    <el-checkbox label="GENOME BINDING/OCCUPANCY PROFILING BY ARRAY" class="top-33">Genome Binding/Occupancy Profiling By Array</el-checkbox>
                    <el-checkbox label="GENOME BINDING/OCCUPANCY PROFILING BY HIGH THROUGHPUT SEQUENCING" class="top-33">Genome Binding/Occupancy Profiling By High Throughput Sequencing</el-checkbox>
                    <el-checkbox label="GENOME BINDING/OCCUPANCY PROFILING BY GENOME TILING ARRAY" class="top-33">Genome Binding/Occupancy Profiling By Genome Tiling Array</el-checkbox>
                    <el-checkbox label="GENOME BINDING/OCCUPANCY PROFILING BY SNP ARRAY" class="top-33">Genome Binding/Occupancy Profiling By Snp Array</el-checkbox>
                    <el-checkbox label="GENOME VARIATION PROFILING BY ARRAY">Genome Gariation Profiling By Array</el-checkbox>
                    <el-checkbox label="GENOME VARIATION PROFILING BY GENOME TILING ARRAY" class="top-33">Genome Variation Profiling By Genome Tiling Array</el-checkbox>
                    <el-checkbox label="GENOME VARIATION PROFILING BY HIGH THROUGHPUT SEQUENCING" class="top-33">Genome Variation Profiling By High Throughput Sequencing</el-checkbox>
                    <el-checkbox label="GENOME VARIATION PROFILING BY SNP ARRAY" class="top-33">Genome Variation Profiling By Snp Array</el-checkbox>
                    <el-checkbox label="METHYLATION PROFILING BY ARRAY">Methylation Profiling By Array</el-checkbox>
                    <el-checkbox label="METHYLATION PROFILING BY GENOME TILING ARRAY" class="top-33">Methylation Profiling By Genome Tiling Array</el-checkbox>
                    <el-checkbox label="METHYLATION PROFILING BY HIGH THROUGHPUT SEQUENCING" class="top-33">Methylation Profiling By High Throughput Sequencing</el-checkbox>
                    <el-checkbox label="METHYLATION PROFILING BY SNP ARRAY">Methylation Profiling By Snp Array</el-checkbox>
                    <el-checkbox label="NON-CODING RNA PROFILING BY ARRAY">Non-Coding Rna Profiling By Array</el-checkbox>
                    <el-checkbox label="NON-CODING RNA PROFILING BY GENOME TILING ARRAY" class="top-33">Non-Coding Rna Profiling By Genome Tiling Array</el-checkbox>
                    <el-checkbox label="NON-CODING RNA PROFILING BY HIGH THROUGHPUT SEQUENCING" class="top-33">Non-Coding Rna Profiling By High Throughput Sequencing</el-checkbox>
                    <el-checkbox label="OTHER">Other</el-checkbox>
                    <el-checkbox label="PROTEIN PROFILING BY PROTEIN ARRAY">Protein Profiling By Protein Array</el-checkbox>
                    <el-checkbox label="PROTEIN PROFILING BY MASS SPEC">Protein Profiling By Mass Spec</el-checkbox>
                    <el-checkbox label="SNP GENOTYPING BY SNP ARRAY">Snp Genotyping By Snp Array</el-checkbox>
                    <el-checkbox label="THIRD-PARTY REANALYSIS">Third-Party Reanalysis</el-checkbox>
                  </div>
                </el-checkbox-group>
                <span v-if="type3" class="leixing"><img @click="type2()" src="../../public/img/xia1.png" alt=""></span>
                <span v-if="!type3" class="leixing"><img @click="type2()" src="../../public/img/shang1.png" alt=""></span>
              </li>
            </ul>
          </div>
          <div class="SearchBodyTwo col-sm-9" v-if="show" v-loading="loading"
          element-loading-text="拼命加载中"
          element-loading-spinner="el-icon-loading"
          element-loading-background="f5f5f5">
            <ul>
              <li style="margin-top:10px;margin-bottom:20px;" v-for="(item,i) of data1" :key="i">
                
                <div class="Content">
                  <p>
                    <img @click="collection(item.accession,geoList)" :id="item.accession" class="shoucang" :src="geoList==undefined  || geoList.indexOf(item.accession)==-1?shoucang1:geoList.indexOf(item.accession)!=-1?shoucang10:shoucang1" :title="geoList==undefined  || geoList.indexOf(item.accession)==-1?shoucang2:shoucang11">
                    <span @click="toInfo(item.accession)" v-html="item.title"></span>
                  </p>
                  <table style="white-space:wrap;width:100%;">
                    <tr>
                      <td>数据集名称:</td>
                      <td>{{item.accession}}</td>
                    </tr>
                    <tr>
                      <td>样本数：</td>
                      <td>{{item.sampleCount}}</td>
                    </tr>
                    <tr>
                      <td>实验类型：</td>
                      <td><span v-for="(it,i) of item.platformTypes" :key="i">{{it}}<span v-if="i<item.platformTypes.length-1">;</span></span></td>
                    </tr>
                    <tr>
                      <td>样本特性：</td>
                      <td class="yagben">
                        <p><span v-for="(item1,i) of item.sampleTypesJson" :key="i">{{item1}}<span v-if="i<item.sampleTypesJson.length-1">;</span></span></p>
                        
                      </td>
                    </tr>
                  </table>
                  <p class="gongeng">
                    <img src="../../public/img/zuo.png" style="margin-right:5px;margin-bottom:2px;" alt=""><span>快速分析</span>
                  </p>
                </div>
              </li>
            </ul>
            <el-pagination
              @current-change="handleCurrentChange"
              :current-page.sync="currentPage"
              layout="prev, pager, next,jumper" 
              :total="this.result"
              v-if="el_show">
            </el-pagination>
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
    return {title: this.searchContent == undefined ? '数据搜索' : this.searchContent + '-数据搜索'} // set a title
  },
  data() {
    return {
      show:true,inpp:false,inpp1:true,j:0,ybtx:[],txplac:'请点击样本特性进行搜索',
      inp1:"",inp2:"",inp3:"",inp4:'',inp5:"",inp6:'',inp7:"",inp8:'',
      result:0,timer:0,loading:false,Species:'',Speciess:[],loading2:false,resulttexin1:'',
      checkList1: [],checkList2: [],checkList3: [],isAsc2:false,isDesc2:false,isAsc3:false,isDesc3:false,
      show2:true,active2:false,show3:true,active3:false,show4:true,active4:false,show5:true,active5:false,
      searchContent:'',show1:true,active1:false,show6:true,active6:false,loading3:false,loading4:false,
      currentPage:1,isAsc1:false,isDesc1:false,i:0,loading5:false,txdis:true,yangbenxinxi:[],
      chk1:'',chk2:'',chk3:'',chk4:'',chk5:"",chk6:'',chk7:'',chk8:"",chk9:'',chk10:'',chk11:"",sampleinf:'',sampleinfs:[],
      el_show:true,o:0,p:0,inpp2:true,plID:'',plIDs:[],loading1:false,type1:false,type3:true,plID1:'',plIDs1:[],resulttexin:false,
      field1:[{value:'sampleTypesJson',label:'样本信息关键字'}],
      searchCompletion:[],
      model1: "",model2:'',model3:'',model4:'',
      relation:[{value:'OR',label:'OR'},{value:'AND',label:'AND'},{value:'NOT',label:'NOT'}],relation2:'AND',relation3:'AND',relation4:'AND',GeoList:[],
      int1:'',int2:'',int3:'',int4:'',ybtx11:[],ybtx1:[],ybtx111:[],
      senior1:false,isShow: false,blok:"",jus:'',shoucang1:require('../../public/img/shoucang.png'),shoucang2:'收藏',shoucang10:require('../../public/img/shoucangactive.png'),phone:"",shoucang11:"取消收藏",geoList:'',sort:''
    }
  },
  components:{
    Header,Footer
  },
  created(){
    this.currentPage = Number(localStorage.getItem('pagination')) || 1;
    this.currentPage=1
  },
  watch: {
    plID1(val, newval){
      if(newval!=val){
        this.txdis=true
        this.ybtx=[]
        this.ybtx111=[]
        this.chk4=this.yangbenxinxi.toString()
        this.txplac='请点击样本特性进行搜索'
        this.search3()
      }
    },
    Species(val, newval){
      if(newval!=val){
        this.txdis=true
        this.ybtx=[]
        this.ybtx111=[]
        this.chk4=this.yangbenxinxi.toString()
        this.txplac='请点击样本特性进行搜索'
        this.search3()
      }
    },
    sampleinf(val, newval){
      if(newval!=val){
        this.txdis=true
        this.ybtx=[]
        this.ybtx111=[]
        this.chk4=this.yangbenxinxi.toString()
        this.txplac='请点击样本特性进行搜索'
        this.search3()
      }
    },
    checkList3(val, newval){
      if(newval!=val){
        this.txdis=true
        this.ybtx=[]
        this.ybtx111=[]
        this.chk4=this.yangbenxinxi.toString()
        this.txplac='请点击样本特性进行搜索'
        this.search3()
      }
    },
    checkList2(val, newval){
      if(newval!=val){
        this.txdis=true
        this.ybtx=[]
        this.ybtx111=[]
        this.chk4=this.yangbenxinxi.toString()
        this.txplac='请点击样本特性进行搜索'
        this.search3()
      }
    },
    searchContent(val, newval){
      if(newval!=val){
        this.txdis=true
        this.ybtx=[]
        this.ybtx111=[]
        this.chk4=this.yangbenxinxi.toString()
        this.txplac='请点击样本特性进行搜索'
        this.search3()
      }
    },
  },
  mounted() {
    this.inf()
  },
  destroyed () {
  },
  updated () {
  },
  beforeUpdate () {
    localStorage.setItem('pagination', this.currentPage);
  },
  beforeDestroy () {
    localStorage.setItem('pagination', '1');
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
        return this.GeoList; // 在这里把临时对象的值通过计算属性赋值给页面中用到的对象
      }
    },
  },
  activated() {
    this.getRouterData()
    this.handleCurrentChange()
    this.inf()
    this.getGeo();
    // this.searcher()
  },
  methods: {
    toViedo(){
      const {href}=this.$router.resolve({
        path: '/VideoInfo',
        query:{
          id:'2d6faffe49004b60a0c372c3a9b9d5ff'
        }
      })
      window.open(href,'_blank')
    },
    toTcgaDown(){
      const {href}=this.$router.resolve({
        path: '/TcgaDown'
      })
      window.open(href,'_blank')
    },
    survival(){
      this.searchContent='survival'
      this.searcher()
    },
    breast(){
      this.searchContent='breast cancer'
      this.searcher()
    },
    single(){
      this.searchContent='single call RNA-seq'
      this.searcher()
    },
    onSelectedDrug1(e){
      this.chk1=e.toString()
      this.loading=true;
      this.i=0;this.o=0;this.p=0;
      this.show1=true;this.active1=false;this.show2=true;this.active2=false;this.show3=true;this.active3=false;this.show4=true;this.active4=false;this.show5=true;this.active5=false,this.show6=true;this.active6=false;
      this.isAsc1=false;this.isAsc2=false;this.isAsc3=false
    },
    onSelectedDrug2(e){
      this.chk2=e.toString()
      this.loading=true
      this.i=0;this.o=0;this.p=0;
      this.show1=true;this.active1=false;this.show2=true;this.active2=false;this.show3=true;this.active3=false;this.show4=true;this.active4=false;this.show5=true;this.active5=false,this.show6=true;this.active6=false;
      this.isAsc1=false;this.isAsc2=false;this.isAsc3=false
    },
    onSelectedDrug3(e){
      this.yangbenxinxi=e
      this.chk4=e.toString()
      this.loading=true
      this.i=0;this.o=0;this.p=0;
      this.show1=true;this.active1=false;this.show2=true;this.active2=false;this.show3=true;this.active3=false;this.show4=true;this.active4=false;this.show5=true;this.active5=false,this.show6=true;this.active6=false;
      this.isAsc1=false;this.isAsc2=false;this.isAsc3=false
    },
    onSelectedDrug4(e){
      let a=e.concat(this.yangbenxinxi)
      this.chk4=a.toString()
      this.loading=true
      this.i=0;this.o=0;this.p=0;
      this.show1=true;this.active1=false;this.show2=true;this.active2=false;this.show3=true;this.active3=false;this.show4=true;this.active4=false;this.show5=true;this.active5=false,this.show6=true;this.active6=false;
      this.isAsc1=false;this.isAsc2=false;this.isAsc3=false
    },
    type2(){
      this.type1=!this.type1
      this.type3=!this.type3
    },
    platformType(){
      this.loading=true;
      this.i=0;this.o=0;this.p=0;
      this.show1=true;this.active1=false;this.show2=true;this.active2=false;this.show3=true;this.active3=false;this.show4=true;this.active4=false;this.show5=true;this.active5=false,this.show6=true;this.active6=false;
      this.isAsc1=false;this.isAsc2=false;this.isAsc3=false
      this.chk6=this.checkList2.join(",");
    },
    searchAlltx(){
      this.txplac='搜索中...'
      this.el_show=true
      this.show1=true;this.active1=false;this.show2=true;this.active2=false;this.show3=true;this.active3=false;this.show4=true;this.active4=false;this.show5=true;this.active5=false,this.show6=true;this.active6=false;
      this.isAsc1=false;this.isAsc2=false;this.isAsc3=false
      this.j++;
      this.senior1=false;
      this.currentPage=parseInt(this.$route.query.page)
      this.chk3=this.$route.query.chk3
      this.chk5=this.$route.query.chk5
      this.chk1=this.$route.query.chk1
      this.chk2=this.$route.query.chk2
      this.chk4=this.$route.query.chk4
      this.chk6=this.$route.query.chk6
      this.sort=this.$route.query.sort
      var qs=require('qs');
      if(this.searchContent!='' || this.searchContent!=' '){
        this.axios.post(`/pubmed/searchGeoSampleTypesInfo`, qs.stringify({
          queryStringQuery:this.searchContent,
          page:this.currentPage,
          platformIDsFilter:this.chk1,
          organismAllFilter:this.chk2,
          sampleCountFilter:this.chk3 || this.chk5,
          sampleTypesJsonFilter:this.chk4,
          platformTypesFilter:this.chk6,
          sort:this.sort
        })).then(result=>{
          if(result.data.res.sampleTypesList!=undefined){
            this.ybtx1=result.data.res.sampleTypesList
            this.ybtx11 = this.ybtx1.map(item => {
              return { value: item, label: item };
            });
            this.txdis=false
            this.txplac='搜索完成请输入'
          }
      }).catch(error=>{
          if(error){
            throw error
          }
        });
      } 
    },
    remoteMethod4(query) {
      if (query !== '') {
        this.loading5 = true;
        setTimeout(() => {
          this.loading5 = false;
          this.ybtx111 = this.ybtx11.filter(item => {
            return item.label.toLowerCase()
              .indexOf(query.toLowerCase()) > -1;
          });
        }, 200);
      } else {
        this.ybtx111 = [];
      }
    },
    remoteMethod(query) {
      this.loading1=true
      var qs=require('qs');
      this.$axios.get(`/pubmed/completionGeoPlatformIDsSuggester`, {
        params:{
          query:query
        },paramsSerializer: function(params) {
          return qs.stringify(params, {arrayFormat: 'brackets'})
        },
      }).then(result=>{
        if(result.data.status==200){
          this.loading1=false
        }
        if(result.data.res!=undefined || result.data.res!=null){
          this.completionList=result.data.res.completionList.searchCompletion
          if(this.completionList.length>0){
            let b=[]
            for(var a in this.completionList){
              let c={}
              c.value=this.completionList[a]
              c.label=this.completionList[a]
              b.push(c)
            }
            this.plIDs=b
          }
        }
      }).catch(error=>{
        if(error){
          throw error
        }
      })
    },
    remoteMethod2(query) {
      this.loading3=true
      var qs=require('qs');
      this.$axios.get(`/pubmed/completionGeoPlatformIDsSuggester`, {
        params:{
          query:query
        },paramsSerializer: function(params) {
          return qs.stringify(params, {arrayFormat: 'brackets'})
        },
      }).then(result=>{
        if(result.data.status==200){
          this.loading3=false
        }
        if(result.data.res!=undefined || result.data.res!=null){
          this.completionList=result.data.res.completionList.searchCompletion
          if(this.completionList.length>0){
            let b=[]
            for(var a in this.completionList){
              let c={}
              c.value=this.completionList[a]
              c.label=this.completionList[a]
              b.push(c)
            }
            this.plIDs1=b
          }
        }
      }).catch(error=>{
        if(error){
          throw error
        }
      })
    },
    remoteMethod3(query) {
      this.loading4=true
      var qs=require('qs');
      this.$axios.get(`/pubmed/completionGeoSampleTypesJsonSuggester`, {
        params:{
          query:query
        },paramsSerializer: function(params) {
          return qs.stringify(params, {arrayFormat: 'brackets'})
        },
      }).then(result=>{
        if(result.data.status==200){
          this.loading4=false
        }
        if(result.data.res!=undefined || result.data.res!=null){
          this.completionList=result.data.res.completionList.searchCompletion
          if(this.completionList.length>0){
            let b=[]
            for(var a in this.completionList){
              let c={}
              c.value=this.completionList[a]
              c.label=this.completionList[a]
              b.push(c)
            }
            this.sampleinfs=b
          }
        }
      }).catch(error=>{
        if(error){
          throw error
        }
      })
    },
    remoteMethod1(query) {
      this.loading2=true
      var qs=require('qs');
      this.$axios.get(`/pubmed/completionGeoOrganismSuggester`, {
        params:{
          query:query
        },paramsSerializer: function(params) {
          return qs.stringify(params, {arrayFormat: 'brackets'})
        },
      }).then(result=>{
        if(result.data.status==200){
          this.loading2=false
        }
        if(result.data.res!=undefined || result.data.res!=null){
          this.completionList=result.data.res.completionList.searchCompletion
          if(this.completionList.length>0){
            let b=[]
            for(var a in this.completionList){
              let c={}
              c.value=this.completionList[a]
              c.label=this.completionList[a]
              b.push(c)
            }
            this.Speciess=b
          }
        }
      }).catch(error=>{
        if(error){
          throw error
        }
      })
    },
    collection(id,phone){
      var qs=require('qs');
      if(phone==undefined || phone.length<=0){
        if($(`#${id}`).attr("src")==require("../../public/img/shoucang.png")){
          this.axios.post(`/pubmed/editGeoCollect`, qs.stringify({
            accession:id,
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
          this.$axios.post(`/pubmed/editGeoCollect`, qs.stringify({
            accession:id,
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
          this.axios.post(`/pubmed/editGeoCollect`, qs.stringify({
            accession:id,
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
          this.$axios.post(`/pubmed/editGeoCollect`, qs.stringify({
          accession:id,
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
    getGeo(){
      this.axios.get(`/pubmed/getGeoCollects`).then(result=>{
        // console.log(result.data)
        if(result.data.res.geoList!=undefined){
          this.geoList=result.data.res.geoList
        }
      })
    },
    Search(){
      this.senior1=false;
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
        $("#sea").click()
      }
      if(this.int1!="" && this.int2=="" && this.int3=="" && this.int4==""){
        this.loading=true;
        if(this.searchContent!=undefined && this.searchContent!=""){
          this.searchContent=`${this.searchContent} AND ${this.model1}:"${this.int1}"`;
        }else{
          this.searchContent=`${this.model1}:"${this.int1}"`;
        }
        $("#sea").click()
      }
      if(this.int1!="" && this.int2!="" && this.int3=="" && this.int4==""){
        this.loading=true;
        if(this.searchContent!=undefined && this.searchContent!=""){
          this.searchContent=`${this.searchContent} AND ${this.model1}:"${this.int1}" ${this.relation2} ${this.model2}:"${this.int2}"`;
        }else{
          this.searchContent=`${this.model1}:"${this.int1}" ${this.relation2} ${this.model2}:"${this.int2}"`;
        }
        $("#sea").click()
      }
      if(this.int1!="" && this.int2!="" && this.int3!="" && this.int4==""){
        this.loading=true;
        if(this.searchContent!=undefined && this.searchContent!=""){
          this.searchContent=`${this.searchContent} AND ${this.model1}:"${this.int1}" ${this.relation2} ${this.model2}:"${this.int2}" ${this.relation3} ${this.model3}:"${this.int3}"`;
        }else{
          this.searchContent=`${this.model1}:"${this.int1}" ${this.relation2} ${this.model2}:"${this.int2}" ${this.relation3} ${this.model3}:"${this.int3}"`;
        }
        $("#sea").click()
      }
      if(this.int1!="" && this.int2!="" && this.int3!="" && this.int4!=""){
        this.loading=true;
        if(this.searchContent!=undefined && this.searchContent!=""){
          this.searchContent=`${this.searchContent} AND ${this.model1}:"${this.int1}" ${this.relation2} ${this.model2}:"${this.int2}" ${this.relation3} ${this.model3}:"${this.int3}" ${this.relation4} ${this.model4}:"${this.int4}"`;
        }else{
          this.searchContent=`${this.model1}:"${this.int1}" ${this.relation2} ${this.model2}:"${this.int2}" ${this.relation3} ${this.model3}:"${this.int3}" ${this.relation4} ${this.model4}:"${this.int4}"`;
        }
        $("#sea").click()
      }
      if(this.int1=="" && this.int2!="" && this.int3!="" && this.int4!=""){
        this.loading=true;
        if(this.searchContent!=undefined && this.searchContent!=""){
          this.searchContent=`${this.searchContent} AND ${this.model2}:"${this.int2}" ${this.relation3} ${this.model3}:"${this.int3}" ${this.relation4} ${this.model4}:"${this.int4}"`;
        }else{
          this.searchContent=`${this.model2}:"${this.int2}" ${this.relation3} ${this.model3}:"${this.int3}" ${this.relation4} ${this.model4}:"${this.int4}"`;
        }
        $("#sea").click()
      }
      if(this.int1=="" && this.int2=="" && this.int3!="" && this.int4!=""){
        this.loading=true;
        if(this.searchContent!=undefined && this.searchContent!=""){
          this.searchContent=`${this.searchContent} AND ${this.model3}:"${this.int3}" ${this.relation4} ${this.model4}:"${this.int4}"`;
        }else{
          this.searchContent=`${this.model3}:"${this.int3}" ${this.relation4} ${this.model4}:"${this.int4}"`;
        }
        $("#sea").click()
      }
      if(this.int1=="" && this.int2=="" && this.int3=="" && this.int4!=""){
        this.loading=true;
        if(this.searchContent!=undefined && this.searchContent!=""){
          this.searchContent=`${this.searchContent} AND ${this.model4}:"${this.int4}"`;
        }else{
          this.searchContent=`${this.model4}:"${this.int4}"`;
        }
        $("#sea").click()
      }
      if(this.int1!="" && this.int2=="" && this.int3!="" && this.int4!=""){
        this.loading=true;
        if(this.searchContent!=undefined && this.searchContent!=""){
          this.searchContent=`${this.searchContent} AND ${this.model1}:"${this.int1}" ${this.relation3} ${this.model3}:"${this.int3}" ${this.relation4} ${this.model4}:"${this.int4}"`;
        }else{
          this.searchContent=`${this.model1}:"${this.int1}" ${this.relation3} ${this.model3}:"${this.int3}" ${this.relation4} ${this.model4}:"${this.int4}"`;
        }
        $("#sea").click()
      }
      if(this.int1!="" && this.int2=="" && this.int3!="" && this.int4==""){
        this.loading=true;
        if(this.searchContent!=undefined && this.searchContent!=""){
          this.searchContent=`${this.searchContent} AND ${this.model1}:"${this.int1}" ${this.relation3} ${this.model3}:"${this.int3}"`;
        }else{
          this.searchContent=`${this.model1}:"${this.int1}" ${this.relation3} ${this.model3}:"${this.int3}"`;
        }
        $("#sea").click()
      }
      if(this.int1!="" && this.int2=="" && this.int3=="" && this.int4!=""){
        this.loading=true;
        if(this.searchContent!=undefined && this.searchContent!=""){
          this.searchContent=`${this.searchContent} AND ${this.model1}:"${this.int1}" ${this.relation4} ${this.model4}:"${this.int4}"`;
        }else{
          this.searchContent=`${this.model1}:"${this.int1}" ${this.relation4} ${this.model4}:"${this.int4}"`;
        }
        $("#sea").click()
      }
      if(this.int1=="" && this.int2!="" && this.int3=="" && this.int4!=""){
        this.loading=true;
        if(this.searchContent!=undefined && this.searchContent!=""){
          this.searchContent=`${this.searchContent} AND ${this.model2}:"${this.int2}" ${this.relation3} ${this.model4}:"${this.int4}"`;
        }else{
          this.searchContent=`${this.model2}:"${this.int2}" ${this.relation3} ${this.model4}:"${this.int4}"`;
        }
        $("#sea").click()
      }
      if(this.int1=="" && this.int2!="" && this.int3!="" && this.int4==""){
        this.loading=true;
        if(this.searchContent!=undefined && this.searchContent!=""){
          this.searchContent=`${this.searchContent} AND ${this.model2}:"${this.int2}" ${this.relation3} ${this.model3}:"${this.int3}"`;
        }else{
          this.searchContent=`${this.model2}:"${this.int2}" ${this.relation3} ${this.model3}:"${this.int3}"`;
        }
        $("#sea").click()
      }
      if(this.int1=="" && this.int2!="" && this.int3=="" && this.int4==""){
        this.loading=true;
        if(this.searchContent!=undefined && this.searchContent!=""){
          this.searchContent=`${this.searchContent} AND ${this.model2}:"${this.int2}"`;
        }else{
          this.searchContent=`${this.model2}:"${this.int2}"`;
        }
        $("#sea").click()
      }
      if(this.int1=="" && this.int2=="" && this.int3!="" && this.int4==""){
        this.loading=true;
        if(this.searchContent!=undefined && this.searchContent!=""){
          this.searchContent=`${this.searchContent} AND ${this.model3}:"${this.int3}"`;
        }else{
          this.searchContent=`${this.model3}:"${this.int3}"`;
        }
        $("#sea").click()
      }
    },
    reset(){
      this.int1='';this.int2='';this.int3='';this.int4='';
      this.model1="";this.model2='';this.model3='';this.model4='';this.searchContent=""
    },
    cloce(){
      this.senior1=!this.senior1
    },
    seniorq(){
      this.senior1=!this.senior1
    },
    countdown(){
      this.inpp=!this.inpp
      this.inpp1=!this.inpp1
      this.checkList3=[]
    },
    handleSelect(){},
    querySearch(queryString, cb) {
      if(this.jus!=''){
        var restaurants = this.jus;
        var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
        // 调用 callback 返回建议列表的数据
        cb(results);
      }
    },
    createFilter(queryString) {
      return (restaurant) => {
        return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },
    
    Suggester(){
      var qs=require('qs');
      this.$axios.get(`/pubmed/completionGeoSuggester`, {
        params:{
          query:this.searchContent
        },paramsSerializer: function(params) {
          return qs.stringify(params, {arrayFormat: 'brackets'})
        },
      }).then(result=>{
        if(result.data.res!=undefined){
          this.searchCompletion=result.data.res.completionList.searchCompletion;
          this.jus=[]
          for(let i=0;i<(this.searchCompletion).length;i++){
            this.jus.push({'value':this.searchCompletion[i]})
          }
        }
        if(result.data.status=='500'){
          this.$message({
            message: '不能为空',
            type: 'warning'
          });
        }
      }).catch(error=>{
        if(error){
          throw error
        }
      });
      this.isShow = true
    },
    toInfo(accession){
      const {href}=this.$router.resolve({
        path: '/Info',
        query:{
          Id:accession
        }
      })
      window.open(href,'_blank')
    },
    getRouterData(){
      this.searchContent=this.$route.query.search1
    },
    //样本数
    sample(){
      this.loading=true;
      this.i=0;this.o=0;this.p=0;
      this.show1=true;this.active1=false;this.show2=true;this.active2=false;this.show3=true;this.active3=false;this.show4=true;this.active4=false;this.show5=true;this.active5=false,this.show6=true;this.active6=false;
      this.isAsc1=false;this.isAsc2=false;this.isAsc3=false
      this.chk3=this.checkList3.join(",");
    },
    //清空
    clear(){
      this.loading=true;
      this.searchContent=""
      this.int1="";this.int2="";this.int3="";this.int4="";
      this.model1="";this.model2="";this.model3="";this.model3="";
      this.checkList1=[];this.checkList2=[];this.checkList3=[];this.checkList4=[];this.checkList5=[];this.checkList6=[];this.checkList7=[];
      this.chk1="";this.chk2="";this.chk3="";this.chk4="";this.chk5="";this.chk6="";this.chk7="";this.chk8="";this.chk9="";this.chk10="";this.chk11="";
      this.inp1="";this.inp2="";this.inp3="";this.inp4="";this.inp5="";this.inp6="";this.inp7="";this.inp8="";this.i=0;this.isAsc1=false;this.isDesc1=false;this.isAsc2=false;this.isDesc2=false;this.isAsc3=false;this.isDesc3=false;
      this.i=0;this.o=0;this.p=0;
      this.show1=true;this.active1=false;this.show2=true;this.active2=false;this.show3=true;this.active3=false;this.show4=true;this.active4=false;this.show5=true;this.active5=false,this.show6=true;this.active6=false;
      this.isAsc1=false;this.isAsc2=false;this.isAsc3=false
      this.currentPage=1;this.Species=[];this.sampleinf=[];this.plID1=[]
    },
    yangbendown(){
      this.loading=true;
      this.i=0;this.o=0;this.p=0;
      this.show1=true;this.active1=false;this.show2=true;this.active2=false;this.show3=true;this.active3=false;this.show4=true;this.active4=false;this.show5=true;this.active5=false,this.show6=true;this.active6=false;
      this.isAsc1=false;this.isAsc2=false;this.isAsc3=false
      this.chk3=""
      this.chk5=this.inp1+'-'+this.inp2
    },
    //高级搜索
    senior(){
      this.j++;
      if(this.j%2==1){
        this.senior1=true;
      }else{
        this.senior1=false;
      }
    },
    //阻止默认事件
    settingEvent(){},
    //分页
    handleCurrentChange(currentPage){
      this.loading=true;
      if(typeof(currentPage)!='undefined' && currentPage!=1){
        this.currentPage = currentPage;
        this.$router.push({
          path:'/Infomation',
          query:{
            page:this.currentPage,search1:this.searchContent,chk3:this.chk3,chk5:this.chk5,sort:this.sort
          }
        })
        $("#sea").click()
      }else if(currentPage==1){
        this.currentPage = 1
        this.$router.push({
          path:'/Infomation',
          query:{
            page:this.currentPage,search1:this.searchContent,chk3:this.chk3,chk5:this.chk5,sort:this.sort
          }
        })
        $("#sea").click()
      }else {
        this.currentPage =this.$route.query.page*1 || 1
        currentPage=this.currentPage
        this.$router.push({
          path:'/Infomation',
          query:{
            page:this.currentPage,search1:this.searchContent,chk3:this.chk3,chk5:this.chk5,sort:this.sort
          }
        })
        $("#sea").click()
      }
    },
    //导航栏跳转
    search4(){
      this.$router.push({
        path:'/Information',
        query:{
          page:this.currentPage,search1:this.searchContent,chk3:this.chk3,chk5:this.chk5,sort:this.sort,chk1:this.chk1,chk2:this.chk2,chk4:this.chk4,chk6:this.chk6
        }
      })
    },
    search3(){
      this.$router.push({
        path:'/Information',
        query:{
          page:1,search1:this.searchContent,chk3:this.chk3,chk5:this.chk5,sort:this.sort,chk1:this.chk1,chk2:this.chk2,chk4:this.chk4,chk6:this.chk6
        }
      })
    },
    searcher(){
      this.el_show=true
      this.loading=true;
      this.show1=true;this.active1=false;this.show2=true;this.active2=false;this.show3=true;this.active3=false;this.show4=true;this.active4=false;this.show5=true;this.active5=false,this.show6=true;this.active6=false;
      this.isAsc1=false;this.isAsc2=false;this.isAsc3=false
      this.j++;
      this.senior1=false;
      this.currentPage=parseInt(this.$route.query.page)
      this.chk3=this.$route.query.chk3
      this.chk5=this.$route.query.chk5
      this.chk1=this.$route.query.chk1
      this.chk2=this.$route.query.chk2
      this.chk4=this.$route.query.chk4
      this.chk6=this.$route.query.chk6
      this.sort=this.$route.query.sort
      var qs=require('qs');
      if(this.searchContent!='' || this.searchContent!=' '){
        this.axios.post(`/pubmed/searchGeoInfo`, qs.stringify({
          queryStringQuery:this.searchContent,
          page:this.currentPage,
          platformIDsFilter:this.chk1,
          organismAllFilter:this.chk2,
          sampleCountFilter:this.chk3 || this.chk5,
          sampleTypesJsonFilter:this.chk4,
          platformTypesFilter:this.chk6,
          sort:this.sort
        })).then(result=>{
          console.log(result)
          if(JSON.stringify(result.data.res)!="{}" && result.data.res.GeoList.searchData!=undefined){
            this.GeoList=result.data.res.GeoList.searchData
            this.result=result.data.res.GeoList.searchTotal
            if(this.result>='1000'){
              this.resulttexin=true
            }else{
              this.resulttexin=false
            }
            this.timer=result.data.res.GeoList.searchTime
          }else{
            this.GeoList=[]
            this.result=0
            this.timer=0
          }
          if(result.data.status==200){
            this.loading=false;
          }
          if(this.result==0){
            this.el_show=false
          }
      }).catch(error=>{
          if(error){
            throw error
          }
        });
      } 
    },
    //搜索
    searcher1(){
      this.el_show=true
      this.loading=true;
      this.show1=true;this.active1=false;this.show2=true;this.active2=false;this.show3=true;this.active3=false;this.show4=true;this.active4=false;this.show5=true;this.active5=false,this.show6=true;this.active6=false;
      this.isAsc1=false;this.isAsc2=false;this.isAsc3=false
      this.j++;
      this.senior1=false;
      this.currentPage=parseInt(this.$route.query.page)
      this.chk3=this.$route.query.chk3
      this.chk5=this.$route.query.chk5
      this.chk1=this.$route.query.chk1
      this.chk2=this.$route.query.chk2
      this.chk4=this.$route.query.chk4
      this.chk6=this.$route.query.chk6
      this.sort=this.$route.query.sort
      var qs=require('qs');
      if(this.searchContent!='' || this.searchContent!=' '){
        this.axios.post(`/pubmed/searchGeoInfo`, qs.stringify({
          queryStringQuery:this.searchContent,
          page:this.currentPage,
          platformIDsFilter:this.chk1,
          organismAllFilter:this.chk2,
          sampleCountFilter:this.chk3 || this.chk5,
          sampleTypesJsonFilter:this.chk4,
          platformTypesFilter:this.chk6,
          sort:this.sort
        })).then(result=>{
          if(JSON.stringify(result.data.res)!="{}" && result.data.res.GeoList.searchData!=undefined){
            this.GeoList=result.data.res.GeoList.searchData
            this.result=result.data.res.GeoList.searchTotal
            this.timer=result.data.res.GeoList.searchTime
            if(this.result>='1000'){
              this.resulttexin=true
            }else{
              this.resulttexin=false
            }
          }else{
            this.GeoList=[]
            this.result=0
            this.timer=0
          }
          if(result.data.status==200){
            this.loading=false;
          }
          if(this.result==0){
            this.el_show=false
          }
      }).catch(error=>{
          if(error){
            throw error
          }
        });
      } 
    },
    
    //更新日期排序
    Update(){
      this.i++;
      this.show2=true;this.active2=false;this.show3=true;this.active3=false;this.show4=true;this.active4=false;this.show5=true;this.active5=false
      this.p=0;
      this.o=0;
      this.isAsc2=false
      this.isAsc3=false
      if(this.i%3==1){
        this.sort="updateDate-sort_-1"
        $("#sea").click()
      }else if(this.i%3==2){
        this.sort="updateDate-sort_1"
        $("#sea").click()
      }else if(this.i%3==0){
        this.sort=""
        $("#sea").click()
      }
    },
    inf(){
      this.sort=this.$route.query.sort
      if(this.sort=="updateDate-sort_-1"){
        this.i=1
        this.isAsc1=true
        this.show1=false
        this.active1=true
        this.show6=true
        this.active6=false
      }else if(this.sort=="updateDate-sort_1"){
        this.i=2
        this.isAsc1=true
        this.show1=true
        this.active1=false
        this.show6=false
        this.active6=true
      }else if(this.sort=="sampleCount-sort_-1"){
        this.o=1
        this.isAsc2=true
        this.show2=false
        this.active2=true
        this.show3=true
        this.active3=false
      }else if(this.sort=="sampleCount-sort_1"){
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
    //样本数排序
    Sample(){
      this.o++;
      this.show1=true;this.active1=false;this.show2=true;this.active2=false;this.show3=true;this.active3=false;this.show6=true;this.active6=false;
      this.i=0;this.p=0;
      this.isAsc1=false
      this.isAsc3=false
      if(this.o%3==1){
        this.sort="sampleCount-sort_-1"
        $("#sea").click()
      }else if(this.o%3==2){
        this.sort="sampleCount-sort_1"
        $("#sea").click()
      }else if(this.o%3==0){
        this.sort=""
        $("#sea").click()
      }
    },
    //相关度排序
    relevant(){
      this.p++;
      this.show1=true;this.active1=false;this.show2=true;this.active2=false;this.show3=true;this.active3=false;this.show6=true;this.active6=false;
      this.i=0;this.o=0;
      this.isAsc1=false
      this.isAsc2=false
      if(this.p%3==1){
        this.sort="matching-sort_-1"
        $("#sea").click()
      }else if(this.p%3==2){
        this.sort="matching-sort_1"
        $("#sea").click()
      }else if(this.p%3==0){
        this.sort=""
        $("#sea").click()

      }
    }
  },
}
</script>
<style scoped>
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
  .SearchBody>p{
    font-size:14px;
    font-family:Source Han Sans CN;
    font-weight:400;
    color:rgba(62,94,181,1);
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
  }
  .SearchBody>p>span:first-child>span:nth-child(2){
    margin-left: 20px;
  }
  .SearchBody>p>span:nth-child(2){
    cursor: pointer;
    margin-right: 8.9%;
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
  .searchInput{
    width: 80%;
    margin-left: 30px;
  }
  .searchInput>input{
    display: inline-block;
    width:100%;
    height:19px;
    font-size:12px;
    font-family:Source Han Sans CN;
    font-weight:400;
    color:rgba(183,183,183,1);
    border: none;
    margin-top: 13px;
    outline: none;
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
    width: 25%!important;
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
    margin-left: 10%;
    cursor: pointer;
  }
  /* .el-checkbox-group>span{
    text-align: center;
  } */
  .senior{
    position: absolute;
    left:0px;
    top: 50px;
    z-index: 2001;
    width: 200%;
    background: #fff
  }
  .senior>table{
    width: 100%;
  }
  td,th{
    text-align: center;
  }
  .senior>table>thead>tr>th{
    font-size:14px;
    font-family:Source Han Sans CN;
    font-weight:400;
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
    font-size:13px;
    font-family:Source Han Sans CN;
    font-weight:bolder;
    color:rgba(51,51,51,1);
  }
  .el-button{
    margin-left: 10px;
  }
  .senior>table>tbody>tr>td>>>.el-select{
    width: 235px;
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
    text-align: left;
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
    margin-left: 11%;
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
    padding: 8px 15px;
    box-sizing: border-box;
    padding-bottom: 50px;
    min-height: 600px;
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
  .Content>p:first-child{
    font-family: Source Han Sans CN;
    font-weight: 500;
    font-style: normal;
    font-size: 13px;
    text-align: left;
    margin-bottom: 10px;
  }
  .Content>p:first-child:hover{
    color: #3C61C3;
    text-decoration: underline;
    cursor: pointer;
  }
  .Content>table{
    border-left: 1px solid #999;
  }
  .Content>table>tr>td:nth-child(1){
    width: 200px;padding-left: 21px;
    text-align: left;
    vertical-align: top;
    font-family: 'Microsoft YaHei ', 'Microsoft YaHei';
    font-weight: 400;
    font-style: normal;
    font-size: 12px;
    line-height: 18px;
  }
  .Content>table>tr>td:nth-child(2){
    width: 770px;

    text-align: left;
    font-family: 'Microsoft YaHei ', 'Microsoft YaHei';
    font-weight: 400;
    font-style: normal;
    font-size: 12px;
    line-height: 18px;
  }
  .Content>table>tr>td{
    padding: 3px;
  }
  .Content>table>tr>td>p{
    word-wrap: break-word;
    word-break: break-all;
    text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    font-size:13px;
  }
  .Content{
    padding-bottom: 10px;
    border-bottom: 1px solid #dcdcdc;
  }
  .gongeng{
    text-align: right;
    font-size: 12px;
  }
  .shoucang{
    vertical-align: middle;
    margin-left: 0px !important;
    margin-right: 8px;
    margin-top: -3px;
    cursor: pointer;
  }
  .plid{
    margin-top: 20px;
    text-align: right;
    margin-left: 11%;
  }
  .plid>>>.el-select{
    width: 100%;
  }
  .pingtai{
    text-align: left
  }
  .leixing{
    margin-left: 21%;
  }
  .leixing>img{
    cursor: pointer;
  }
  .top-33>>>.el-checkbox__input{
    margin-top: -36px;
  }
  .pingtai>>>.el-checkbox__label{
    white-space: pre-wrap;
  }
  .plid>>>.el-tag.el-tag--info{
    max-width: 150px;
    overflow: hidden;
  }
  .SearchHeadThree{
    position: relative;
  }
  .SearchHeadThree>>>.el-select{
    width: 220px;
    position: absolute;
    top: 1px;
    left: -30px;
    z-index: 1999;
  }
  .SearchHeadThree>>>.el-input__inner{
    line-height: 32px;
    height: 32px;
  }
  .SearchHeadThree>>>.el-tag.el-tag--info{
    max-width: 120px;
    overflow: hidden;
  }
  .SearchBodyOne>>>.el-input__inner{
    line-height: 32px;
    height: 32px;
  }
</style>