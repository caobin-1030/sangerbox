<template>
  <div>
    <Header></Header>
    <div @click="search2();searcher()" id="sea" v-show="false" class="Search"><span>搜索</span></div>
    <div v-if="mess" class="mess"><img src="../../public/img/msg.png" alt=""><span>正在导出</span></div>
    <div class="SearchBackground">
      <div class="SearchBody1">
        <div class="search2">
          <div class="searchBox1">
            <div>
              <el-dropdown trigger="click">
                <span class="el-dropdown-link">
                  <span>{{choice}}</span>
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item id="lit" @click.native="literature1();searcher()">{{literature}}</el-dropdown-item>
                  <el-dropdown-item @click.native="periodical1();searcher()">{{periodical}}</el-dropdown-item>
                  <el-dropdown-item @click.native="fund1();searcher()">{{fund}}</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
            <div class="searchInput">
              <el-autocomplete
                class="inline-input" @input="searchContent==''?'':Suggester();search3()" @keyup.13.native="searcher()"
                v-model="searchContent"
                :fetch-suggestions="querySearch"
                placeholder="在此输入您搜索的内容"
                :trigger-on-focus="false"
                @select="handleSelect;searcher()"
              ></el-autocomplete>
              <span style="margin-right:10px" class="tougao" @click="Advanced()">>>高级搜索</span>
            </div>
            <div @click="search3();searcher()" class="Search"><span>搜索</span></div>
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
                  <el-dropdown-item class="lit" @click.native="literature1();searcher()">{{literature}}</el-dropdown-item>
                  <el-dropdown-item @click.native="periodical1();searcher()">{{periodical}}</el-dropdown-item>
                  <el-dropdown-item @click.native="fund1();searcher()">{{fund}}</el-dropdown-item>
                </el-dropdown-menu>
                
              </el-dropdown>
            </div>
            <div class="searchInput">
              <el-autocomplete
                class="inline-input" @keyup.13.native="searcher()" @input="searchContent==''?'':Suggester();search3()"
                v-model="searchContent"
                :fetch-suggestions="querySearch"
                placeholder="在此输入您搜索的内容"
                :trigger-on-focus="false"
                @select="handleSelect;searcher()"
              ></el-autocomplete>
              <span style="margin-right:10px" class="tougao" @click="Advanced()">>>高级搜索</span>
            </div>
            <div @click="search3();searcher()" class="Search"><span>搜索</span></div>
          </div>
          <p class="sousuo"><span>搜索结果：<span>{{result}}</span><span>搜索时间：</span><span>{{timer}}</span></span><span class="tougao" @click="toContribute()">>>智能选刊</span></p>
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
                    <el-input v-if="model1!='subCourse' && model1!='course' && model1!='countryZh' && model1!='direction' && model1!='publishingCycle' && model1!='subject' && model1!='type'"
                      placeholder="请输入内容"
                      v-model="int1"
                      clearable>
                    </el-input>
                    <el-select v-else-if="model1=='subCourse'" filterable v-model="int1" placeholder="请选择">
                      <el-option
                        v-for="item in subCourseAggs"
                        :key="item.label"
                        :label="item.label+'('+item.count+')'"
                        :value="item.label">
                      </el-option>
                    </el-select>
                    <el-select v-else-if="model1=='course'" filterable v-model="int1" placeholder="请选择">
                      <el-option
                        v-for="item in courseAggs"
                        :key="item.label"
                        :label="item.label+'('+item.count+')'"
                        :value="item.label">
                      </el-option>
                    </el-select>
                    <el-select v-else-if="model1=='countryZh'" filterable v-model="int1" placeholder="请选择">
                      <el-option
                        v-for="item in countryZhAggs"
                        :key="item.label"
                        :label="item.label+'('+item.count+')'"
                        :value="item.label">
                      </el-option>
                    </el-select>
                    <el-select v-else-if="model1=='direction'" filterable v-model="int1" placeholder="请选择">
                      <el-option
                        v-for="item in directionAggs"
                        :key="item.label"
                        :label="item.label+'('+item.count+')'"
                        :value="item.label">
                      </el-option>
                    </el-select>
                    <el-select v-else-if="model1=='publishingCycle'" filterable v-model="int1" placeholder="请选择">
                      <el-option
                        v-for="item in publishingCycleAggs"
                        :key="item.label"
                        :label="item.label+'('+item.count+')'"
                        :value="item.label">
                      </el-option>
                    </el-select>
                    <el-select v-else-if="model1=='subject'" filterable v-model="int1" placeholder="请选择">
                      <el-option
                        v-for="item in subjectAggs"
                        :key="item.label"
                        :label="item.label+'('+item.count+')'"
                        :value="item.label">
                      </el-option>
                    </el-select>
                    <el-select v-else-if="model1=='type'" filterable v-model="int1" placeholder="请选择">
                      <el-option
                        v-for="item in typeAggs"
                        :key="item.label"
                        :label="item.label+'('+item.count+')'"
                        :value="item.label">
                      </el-option>
                    </el-select>
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
                        v-for="item in field1"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </td>
                  <td>
                    <el-input v-if="model2!='subCourse' && model2!='course' && model2!='countryZh' && model2!='direction' && model2!='publishingCycle' && model2!='subject' && model2!='type'"
                      placeholder="请输入内容"
                      v-model="int2"
                      clearable>
                    </el-input>
                    <el-select v-else-if="model2=='subCourse'" filterable v-model="int2" placeholder="请选择">
                      <el-option
                        v-for="item in subCourseAggs"
                        :key="item.label"
                        :label="item.label+'('+item.count+')'"
                        :value="item.label">
                      </el-option>
                    </el-select>
                    <el-select v-else-if="model2=='course'" filterable v-model="int2" placeholder="请选择">
                      <el-option
                        v-for="item in courseAggs"
                        :key="item.label"
                        :label="item.label+'('+item.count+')'"
                        :value="item.label">
                      </el-option>
                    </el-select>
                    <el-select v-else-if="model2=='countryZh'" filterable v-model="int2" placeholder="请选择">
                      <el-option
                        v-for="item in countryZhAggs"
                        :key="item.label"
                        :label="item.label+'('+item.count+')'"
                        :value="item.label">
                      </el-option>
                    </el-select>
                    <el-select v-else-if="model2=='direction'" filterable v-model="int2" placeholder="请选择">
                      <el-option
                        v-for="item in directionAggs"
                        :key="item.label"
                        :label="item.label+'('+item.count+')'"
                        :value="item.label">
                      </el-option>
                    </el-select>
                    <el-select v-else-if="model2=='publishingCycle'" filterable v-model="int2" placeholder="请选择">
                      <el-option
                        v-for="item in publishingCycleAggs"
                        :key="item.label"
                        :label="item.label+'('+item.count+')'"
                        :value="item.label">
                      </el-option>
                    </el-select>
                    <el-select v-else-if="model2=='subject'" filterable v-model="int2" placeholder="请选择">
                      <el-option
                        v-for="item in subjectAggs"
                        :key="item.label"
                        :label="item.label+'('+item.count+')'"
                        :value="item.label">
                      </el-option>
                    </el-select>
                    <el-select v-else-if="model2=='type'" filterable v-model="int2" placeholder="请选择">
                      <el-option
                        v-for="item in typeAggs"
                        :key="item.label"
                        :label="item.label+'('+item.count+')'"
                        :value="item.label">
                      </el-option>
                    </el-select>
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
                        v-for="item in field1"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </td>
                  <td>
                    <el-input
                    v-if="model3!='subCourse' && model3!='course' && model3!='countryZh' && model3!='direction' && model3!='publishingCycle' && model3!='subject' && model3!='type'"
                      placeholder="请输入内容"
                      v-model="int3"
                      clearable>
                    </el-input>
                    <el-select v-else-if="model3=='subCourse'" filterable v-model="int3" placeholder="请选择">
                      <el-option
                        v-for="item in subCourseAggs"
                        :key="item.label"
                        :label="item.label+'('+item.count+')'"
                        :value="item.label">
                      </el-option>
                    </el-select>
                    <el-select v-else-if="model3=='course'" filterable v-model="int3" placeholder="请选择">
                      <el-option
                        v-for="item in courseAggs"
                        :key="item.label"
                        :label="item.label+'('+item.count+')'"
                        :value="item.label">
                      </el-option>
                    </el-select>
                    <el-select v-else-if="model3=='countryZh'" filterable v-model="int3" placeholder="请选择">
                      <el-option
                        v-for="item in countryZhAggs"
                        :key="item.label"
                        :label="item.label+'('+item.count+')'"
                        :value="item.label">
                      </el-option>
                    </el-select>
                    <el-select v-else-if="model3=='direction'" filterable v-model="int3" placeholder="请选择">
                      <el-option
                        v-for="item in directionAggs"
                        :key="item.label"
                        :label="item.label+'('+item.count+')'"
                        :value="item.label">
                      </el-option>
                    </el-select>
                    <el-select v-else-if="model3=='publishingCycle'" filterable v-model="int3" placeholder="请选择">
                      <el-option
                        v-for="item in publishingCycleAggs"
                        :key="item.label"
                        :label="item.label+'('+item.count+')'"
                        :value="item.label">
                      </el-option>
                    </el-select>
                    <el-select v-else-if="model3=='subject'" filterable v-model="int3" placeholder="请选择">
                      <el-option
                        v-for="item in subjectAggs"
                        :key="item.label"
                        :label="item.label+'('+item.count+')'"
                        :value="item.label">
                      </el-option>
                    </el-select>
                    <el-select v-else-if="model3=='type'" filterable v-model="int3" placeholder="请选择">
                      <el-option
                        v-for="item in typeAggs"
                        :key="item.label"
                        :label="item.label+'('+item.count+')'"
                        :value="item.label">
                      </el-option>
                    </el-select>
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
                        v-for="item in field1"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </td>
                  <td>
                    <el-input
                    v-if="model4!='subCourse' && model4!='course' && model4!='countryZh' && model4!='direction' && model4!='publishingCycle' && model4!='subject' && model4!='type'"
                      placeholder="请输入内容"
                      v-model="int4"
                      clearable>
                    </el-input>
                    <el-select v-else-if="model4=='subCourse'" filterable v-model="int4" placeholder="请选择">
                      <el-option
                        v-for="item in subCourseAggs"
                        :key="item.label"
                        :label="item.label+'('+item.count+')'"
                        :value="item.label">
                      </el-option>
                    </el-select>
                    <el-select v-else-if="model4=='course'" filterable v-model="int4" placeholder="请选择">
                      <el-option
                        v-for="item in courseAggs"
                        :key="item.label"
                        :label="item.label+'('+item.count+')'"
                        :value="item.label">
                      </el-option>
                    </el-select>
                    <el-select v-else-if="model4=='countryZh'" filterable v-model="int4" placeholder="请选择">
                      <el-option
                        v-for="item in countryZhAggs"
                        :key="item.label"
                        :label="item.label+'('+item.count+')'"
                        :value="item.label">
                      </el-option>
                    </el-select>
                    <el-select v-else-if="model4=='direction'" filterable v-model="int4" placeholder="请选择">
                      <el-option
                        v-for="item in directionAggs"
                        :key="item.label"
                        :label="item.label+'('+item.count+')'"
                        :value="item.label">
                      </el-option>
                    </el-select>
                    <el-select v-else-if="model4=='publishingCycle'" filterable v-model="int4" placeholder="请选择">
                      <el-option
                        v-for="item in publishingCycleAggs"
                        :key="item.label"
                        :label="item.label+'('+item.count+')'"
                        :value="item.label">
                      </el-option>
                    </el-select>
                    <el-select v-else-if="model4=='subject'" filterable v-model="int4" placeholder="请选择">
                      <el-option
                        v-for="item in subjectAggs"
                        :key="item.label"
                        :label="item.label+'('+item.count+')'"
                        :value="item.label">
                      </el-option>
                    </el-select>
                    <el-select v-else-if="model4=='type'" filterable v-model="int4" placeholder="请选择">
                      <el-option
                        v-for="item in typeAggs"
                        :key="item.label"
                        :label="item.label+'('+item.count+')'"
                        :value="item.label">
                      </el-option>
                    </el-select>
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
                <span>高级<span>搜索</span></span>
              </div>
              <div><img @click="clear()" src="../../public/img/brush.png" title="清空"></div>
              
            </div>
            <div class="SearchHeadTwo col-md-7 col-sm-6 col-xs-7">
              <ul>
                <li :class="{'asc':isAsc2,'desc':isDesc2}" @click="influenceFactor();search3();searcher();inf()">
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
                <li :class="{'asc':isAsc3,'desc':isDesc3}" @click="relevant();search3();searcher();inf()">
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
              <el-switch v-model="showSCI" @change="showSci();search3();searcher()" active-text="只显示SCI"></el-switch>
            </div>
            <div class="SearchHeadThree col-md-3 col-sm-2">
              <ul>
              </ul>
            </div>
          </div>
        </div>
        <div class="SearchBody1 row"  @click.stop="settingEvent()">
          <div class="SearchBodyOne col-sm-2" v-if="show">
            <ul>
              <li>
                <p><img src="../../public/img/Influencefactor.png"><span>影响因子:</span></p>
                <el-checkbox-group v-model="checkList1" @change="checkListOne();search3();searcher()">
                  <el-checkbox label="0-1"></el-checkbox>
                  <el-checkbox label="1-3"></el-checkbox>
                  <el-checkbox label="3-5"></el-checkbox>
                  <el-checkbox label="5-10"></el-checkbox>
                  <el-checkbox label="10-15"></el-checkbox>
                  <div class="InputP" v-show="inpp">
                    <input type="number" v-model="inp1">
                    <div></div>
                    <input type="number" v-model="inp2">
                    <el-button type="primary" size="mini" round @click="customOne();search3();searcher()">搜索</el-button>
                  </div>
                  <span><img @click="influencefactorDown" v-show="inpp1" src="../../public/img/xia1.png" alt=""></span>
                  <span><img @click="influencefactorDown" v-show="!inpp1" src="../../public/img/shang1.png" alt=""></span>
                </el-checkbox-group>
              </li>
              <li>
                <p><img src="../../public/img/year.png"><span>中科院分区:</span></p>
                <el-checkbox-group v-model="checkList2" @change="checkListFore();search3();searcher()">
                  <el-checkbox label="1区"></el-checkbox>
                  <el-checkbox label="2区"></el-checkbox>
                  <el-checkbox label="3区"></el-checkbox>
                  <el-checkbox label="4区"></el-checkbox>
                </el-checkbox-group>
              </li>
              <li>
                <p><img src="../../public/img/article.png"><span>JCR分区:</span></p>
                  <el-checkbox-group v-model="checkList3" @change="checkListFive();search3();searcher()">
                    <el-checkbox label="Q1"></el-checkbox>
                    <el-checkbox label="Q2"></el-checkbox>
                    <el-checkbox label="Q3"></el-checkbox>
                    <el-checkbox label="Q4"></el-checkbox>
                  </el-checkbox-group>
              </li>
            </ul>
          </div>
          <div class="SearchBodyTwo col-sm-10" v-if="show" v-loading="loading"
          element-loading-text="拼命加载中"
          element-loading-spinner="el-icon-loading"
          element-loading-background="f5f5f5">
            <ul v-if="JSON.stringify(Jou)!='{}'">
              <li v-for="(item1,itemi) in data4" :key="itemi">
                <p class="title3" v-if="item1.endYear==null" >
                  <img @click="collection(item1.nlmId,nlmIdList)" :id="item1.nlmId" class="shoucang" :src="nlmIdList==undefined  || nlmIdList.indexOf(item1.nlmId)==-1?shoucang1:nlmIdList.indexOf(item1.nlmId)!=-1?shoucang10:shoucang1" :title="nlmIdList==undefined  || nlmIdList.indexOf(item1.nlmId)==-1?shoucang2:shoucang11">
                  <span @click="toJournal(item1.nlmId,item1.course)" v-html="item1.fullName">{{item1.fullName}}</span><span style="color:blue"> ( </span><span v-html="item1.subName" @click="toJournal(item1.nlmId,item1.course)" ></span><span style="color:blue"> )</span></p>
                <p class="title3" v-else style="text-decoration: line-through;">
                  <img @click="collection(item1.nlmId,nlmIdList)" :id="item1.nlmId" class="shoucang" :src="nlmIdList==undefined  || nlmIdList.indexOf(item1.nlmId)==-1?shoucang1:nlmIdList.indexOf(item1.nlmId)!=-1?shoucang10:shoucang1" :title="nlmIdList==undefined  || nlmIdList.indexOf(item1.nlmId)==-1?shoucang2:shoucang11">
                  <span @click="toJournal(item1.nlmId,item1.course)" v-html="item1.fullName">{{item1.fullName}}</span><span style="color:blue"> ( </span><span v-html="item1.subName" @click="toJournal(item1.nlmId,item1.course)" ></span><span style="color:blue"> )</span></p>
                <div class="Periodical1"> 
                  <div class="Periodical1Left">
                    <div>
                      <p><span v-if="item1.course!=null">{{item1.course}}</span><span v-else>N/A</span><span v-show="item1.area!='未录'">{{item1.area}}</span><span v-if="item1.subCourse!=null">{{item1.subCourse}}</span><span v-else>N/A</span></p>
                      <p><span @click="officialUrl(item1.officialUrl)" v-if="item1.officialUrl!=null">杂志入口</span><span v-else>N/A</span><span  @click="nlmId(item1.nlmId)">最新文章</span></p>
                    </div>
                    <div class="issn">
                      <div>
                        <p>ISSN</p>
                        <p v-if="item1.issn!=null">{{item1.issn}}</p>
                        <p v-else>N/A</p>
                      </div>
                      <div>
                        <p>发布国家</p>
                        <p v-if="item1.countryZh!=null">{{item1.countryZh}}</p>
                        <p v-else>N/A</p>
                      </div>
                      <div>
                        <p>投稿难度</p>
                        <p v-if="item1.enterPresent!=null">{{item1.enterPresent}}</p>
                        <p v-else>N/A</p>
                      </div>
                      <div>
                        <p>投稿周期</p>
                        <p v-if="item1.acceptTime!=null">{{item1.acceptTime}}</p>
                        <p v-else>N/A</p>
                      </div>
                      <div>
                        <p>发布频次</p>
                        <p v-if="item1.publishingCycle!=null">{{item1.publishingCycle}}</p>
                        <p v-else>N/A</p>
                      </div>
                    </div>
                  </div>
                  <div class="Periodical1Right">
                    <div :id="Period1(itemi)"  :style="{width: '270px', height: '180px'}"></div>
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
              :total="this.result"
              v-if="el_show">
            </el-pagination>
          </div>
          <div class="SearchBodyThree col-sm-2" v-if="show">
            <!-- <div>
              <p>新手上路</p>
              <div></div>
              <p @click="to884">1、怎样快速查文献</p>
              <p @click="to885">2、怎样收藏文献</p>
              <p @click="to886">3、怎么进行文献分析</p>
              <p @click="to887">4、怎么筛选目标杂志</p>
            </div>
            <div>
              <p>数据统计</p>
              <div></div>
              <p @click="to888">1、怎样对搜索结果进行统计</p>
              <p @click="to889">2、怎样进行投稿选刊</p>
            </div> -->
            <!-- <div>
              <p>最新动态</p>
              <div></div>
              <p v-for="(item,i) of data7" :key="i"><span  @click="toShengxinren(item.id)">{{item.title}}</span></p>
            </div> -->
            <div v-if="his.length>0">
              <p>历史记录</p>
              <div></div>
              <p @click="his1(item)" v-for="(item,i) of data13" :key="i">{{item}}</p>
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
    return {title: this.searchContent == undefined ? '期刊搜索' : this.searchContent + '-期刊搜索'} // set a title
  },
  data() {
    return {
      isactive:false,mess:false,
      dataset : [ 30 , 10 , 43 , 55  ],
      show:true,Entrance:true,e:0,w:0,r:0,t:0,y:0,g:0,j:0,f:0,d:0,i:0,o:0,p:0,u:0,h:0,a:0,q:0,z:0,v:0,n:0,
      inpp:false,inpp1:true,inpp2:false,
      inp1:"",inp2:"",inp3:"",inp4:'',inp5:"",inp6:'',inp7:"",inp8:'',
      type3:true,analy:true,
      result:0,zh:false,
      timer:0,loading:false,foreConte:true,
      checkList1: [],checkList2: [],checkList3: [],
      input1:"",input2:"",input3:"",input4:"",isAsc2:false,isDesc2:false,isAsc3:false,isDesc3:false,
      show2:true,active2:false,show3:true,active3:false,show4:true,active4:false,show5:true,active5:false,
      searchContent:'',
      choice:'文 献',
      literature:'文 献',
      periodical:'期 刊',
      fund:'基 金',ifsAggs:[],
      search:'',a5:[],a6:[],accc:[],a7:[],abbb:[],
      searchPubmedArticle:{},searchPubmedJournal:{},
      a1:{},a2:{},currentPage:1,
      chk1:'',chk2:'',chk3:'',chk4:'',chk5:"",chk6:'',chk7:'',chk8:"",chk9:'',chk10:'',chk11:"",
      el_show:true,
      aa:'',ab:'',type1:false,
      field1:[
        {
          value:'fullName',
          label:'FullName (全称)'
        },{
          value:'subName',
          label:'SubName (简称)'
        },{
          value:'issn',
          label:'ISSN'
        },{
          value:'essn',
          label:'ESSN'
        },{
          value:'subCourse',
          label:'SubCourse (小类学科)'
        },{
          value:'course',
          label:'Course (大类学科)'
        },{
          value:'direction',
          label:'Direction (研究方向)'
        },{
          value:'subject',
          label:'Subject (科室)'
        },{
          value:'type',
          label:'Type (分类)'
        },{
          value:'publishingCycle',
          label:'PublishingCycle (出版周期)'
        },{
          value:'countryZh',
          label:'CountryZh (国家)'
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
      int1:'',int2:'',int3:'',int4:'',
      senior1:false,isShow: false,blok:"",jus:'',showSCI:false,isSci:'',
      sort:'',subCourseAggs:[],courseAggs:[],countryZhAggs:[],subjectAggs:[],publishingCycleAggs:[],typeAggs:[],Jou:{},
      journalAggsName:'',journalAggsCount:'',aggs:'',areaAggs:[],pubCountryAggs:[],lastAuthorAggs:[],journalAggs:[],meshAggs:[],yearTime:[],
      publicationTypeAggs:[],courseAggs:[],keywordAggs:[],authorAggs:[],courseAggs:[],directionAggs:[],qClassAggs:[],ifsCount:'',his:[],shoucang1:require('../../public/img/shoucang.png'),shoucang2:'收藏',shoucang10:require('../../public/img/shoucangactive.png'),phone:'',shoucang11:'取消收藏',nlmIdList:''
    }
  },
  components:{
    Header,Footer
  },
  created(){
    this.currentPage = Number(localStorage.getItem('pagination')) || 1;
    this.currentPage=1
    this.choice=this.periodical
    this.phone=localStorage.getItem("mobile")
    // console.log(this.phone)
  },
  watch: {
    
  },
  mounted() {
    // this.$refs['input'].focus();
    this.inf()
  },
  destroyed () {
  },
  updated () {
    this.Period()
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
    
    data4: {
      get: function(){
        return this.accc; // 在这里把临时对象的值通过计算属性赋值给页面中用到的对象
      }
    },
    
    data7:{
      get:function(){
        return this.blok
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
    this.getArticle()
    this.inf()
    this.history()

  },
  methods:{
    getArticle(){
      this.axios.get(`/pubmed/getJourcacheCollects`).then(result=>{
        if(result.data.res.nlmIdList!=undefined){
          this.nlmIdList=result.data.res.nlmIdList
        }
      })
    },
    collection(id,phone){
      // console.log(phone)
      var qs=require('qs');
      if(phone==undefined || phone.length<=0){
        if($(`#${id}`).attr("src")==require("../../public/img/shoucang.png")){
          this.axios.post(`/pubmed/editJourcacheCollect`, qs.stringify({
            nlmId:id,
            isCollect:1
          })).then(result=>{
            // console.log(result.data)
            if(result.data.res.count>0){
              // this.shoucang1=require("../../public/img/shoucangactive.png")
              $(`#${id}`).attr("src",require("../../public/img/shoucangactive.png"));
              this.shoucang2="取消收藏"
            }
          }).catch(error=>{
            if(error){
              throw error
            }
          })
        }else{
          this.$axios.post(`/pubmed/editJourcacheCollect`, qs.stringify({
          nlmId:id,
            isCollect:0
        })).then(result=>{
          // console.log(result.data.res)
          if(result.data.res.count>0){
            $(`#${id}`).attr("src",require("../../public/img/shoucang.png"));
            this.shoucang2="收藏"
          }
        }).catch(error=>{
          if(error){
            throw error
          }
        })
        }
      }else if(phone!=undefined || phone.length<=0){
        if($(`#${id}`).attr("src")==require("../../public/img/shoucang.png")){
          this.axios.post(`/pubmed/editJourcacheCollect`, qs.stringify({
            nlmId:id,
            isCollect:1
          })).then(result=>{
          // console.log(result.data.res)
            if(result.data.res.count>0){
              // this.shoucang1=require("../../public/img/shoucangactive.png")
              $(`#${id}`).attr("src",require("../../public/img/shoucangactive.png"));
              this.shoucang2="取消收藏"
            }
          }).catch(error=>{
            if(error){
              throw error
            }
          })
        }else{
          this.$axios.post(`/pubmed/editJourcacheCollect`, qs.stringify({
            nlmId:id,
            isCollect:0
          })).then(result=>{
            // console.log(result.data.res)
            if(result.data.res.count>0){
              $(`#${id}`).attr("src",require("../../public/img/shoucang.png"));
              this.shoucang2="收藏"
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
        path: '/SearchJournal',
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
          var nnnn=JSON.parse(localStorage.getItem('SearchJournalhistory'))
          if(nnnn==null){
            nnnn=[]
            nnnn.unshift(mj)
          }else{
            nnnn.unshift(mj)
          }
          // console.log(JSON.stringify(nnnn))
          localStorage.setItem('SearchJournalhistory', JSON.stringify(nnnn));
        }
      }
      var nm=localStorage.getItem('SearchJournalhistory')
      this.his=JSON.parse(nm)
      if(this.his!=null){
        this.his.length>4?this.his=this.his.slice(0,4):this.his
      }else{
        this.his=[]
      }
      // console.log(localStorage.getItem('Searchhistory'))
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
    search2(){
      this.$router.push({
        path:'/SearchJournal',
        query:{
          chk1:this.chk1,chk2:this.chk2,chk3:this.chk3,chk4:this.chk4,chk5:this.chk5,sort:this.sort,search1:this.searchContent,sci:this.isSci,page:this.currentPage
        }
      })
    },
    search3(){
      this.$router.push({
        path:'/SearchJournal',
        query:{
          chk1:this.chk1,chk2:this.chk2,chk3:this.chk3,chk4:this.chk4,chk5:this.chk5,sort:this.sort,search1:this.searchContent,sci:this.isSci,page:1
        }
      })
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
    toContribute(){
      const {href}=this.$router.resolve({
        path: '/Contribute'
      })
      window.open(href,'_blank')
    },
    showSci(){
      if(this.showSCI==false){
        this.isSci=0
      }else{
        this.isSci=1
      }
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
    high(){
      this.d++;
      if(this.d%2==1){
        this.senior1=true;
      }else{
        this.senior1=false;
      }
    },
    //期刊高级搜索
    Advanced(){
      this.f++;
      if(this.f%2==1){
        this.senior1=true;
      }else{
        this.senior1=false;
      }
      if(this.subCourseAggs==''){
        this.axios.get(`/pubmed/getPubmedJournalAdvancedAggs`, )
        .then(result=>{
          this.subCourseAggs=result.data.res.aggs.subCourseAggs
          this.courseAggs=result.data.res.aggs.courseAggs
          this.countryZhAggs=result.data.res.aggs.countryZhAggs
          this.directionAggs=result.data.res.aggs.directionAggs
          this.publishingCycleAggs=result.data.res.aggs.publishingCycleAggs
          this.typeAggs=result.data.res.aggs.typeAggs
          this.subjectAggs=result.data.res.aggs.subjectAggs
          var ggg = JSON.parse(JSON.stringify(this.subjectAggs).replace(/name/g,'label'));
          this.subjectAggs=ggg
          var fff = JSON.parse(JSON.stringify(this.typeAggs).replace(/name/g,'label'));
          this.typeAggs=fff
          var eee = JSON.parse(JSON.stringify(this.publishingCycleAggs).replace(/name/g,'label'));
          this.publishingCycleAggs=eee
          var aaa = JSON.parse(JSON.stringify(this.directionAggs).replace(/name/g,'label'));
          this.directionAggs=aaa
          var ccc = JSON.parse(JSON.stringify(this.courseAggs).replace(/name/g,'label'));
          this.courseAggs=ccc
          var ddd = JSON.parse(JSON.stringify(this.countryZhAggs).replace(/name/g,'label'));
          this.countryZhAggs=ddd
          var bbb = JSON.parse(JSON.stringify(this.subCourseAggs).replace(/name/g,'label'));
          this.subCourseAggs=bbb
        }).catch(error=>{
          if(error){
            throw error
          }
        });
      }
      
    },
    getRouterData(){
      this.searchContent=this.$route.query.search1
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
    click_item(item) {
      this.searchContent=item;
      var qs=require('qs');
       
      this.axios.post(`/pubmed/searchPubmedJournal/`, qs.stringify({
          queryStringQuery:this.searchContent,
          page:this.currentPage,
          ifsFilter:this.chk1 || this.chk4,
          areaFilter:this.chk2 || this.chk5,
          qClassFilter:this.chk3
        })).then(result=>{
          this.searchPubmedJournal=result.data;
          this.accc=this.searchPubmedJournal.res.journalList.searchData;
          this.result=this.searchPubmedJournal.res.journalList.searchTotal;
          this.timer=this.searchPubmedJournal.res.journalList.searchTime;
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
    },
    blur(){
      setTimeout(() => {
        this.isShow = false
      },
      200)
    },
    Suggester(){
      var qs=require('qs')
      this.$axios.get(`/pubmed/completionJournalSuggester`, {
        params:{
          query:this.searchContent,
          suggestType:'杂志'
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
    nlmId(id){
      const {href} =this.$router.resolve({
        path:'/Search',
        query:{
          search1:`nlmId:"${id}"`
        }
      })
      window.open(href, '_blank')
    },
    officialUrl(url){
      window.open(url,'_blank')
    },
    Period1(i){
      return 'Period1'+i
    },
    //杂志影响因子图
    Period(){
      let c=[];
      let a=[];
      for(a of this.accc){
        c.push(a.ifs)
      }
      
      let d=[[],[],[],[],[],[],[],[],[],[],]
      for(let i=0;i<c.length+1;i++){
        for(let b in c[i]){
          if(c[i][b]==-1){
            c[i][b]=0
          }
          d[i].push(c[i][b])
        }
        if(d[i]==''){
          d[i]=[0,0,0,0,0,0]
        }
        var echarts1 =[];echarts1= document.getElementById("Period1"+i);
        // 绘制图表
        if(echarts1){
          let myChart = this.echarts.init(echarts1)
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
              data: ['2014','2015','2016','2017','2018','2019'],
              
            },  
            yAxis: {
              type: 'value',
              splitLine: {
                show:false
              }
            },
            series : [
              {
                name:'影响因子',
                type:'bar',
                barWidth: '60%',
                data: d[i].slice(0,-1).reverse(),
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
                    color: '#4966AE'
                  }
                }
              }
            ]
          })
        }
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
        this.search3();
        this.searcher();
      }
      if(this.int1!="" && this.int2=="" && this.int3=="" && this.int4==""){
        this.loading=true;
        if(this.searchContent!=undefined && this.searchContent!=""){
          this.searchContent=`${this.searchContent} AND ${this.model1}:"${this.int1}"`;
        }else{
          this.searchContent=`${this.model1}:"${this.int1}"`;
        }
        this.search3();
        this.searcher();
      }
      if(this.int1!="" && this.int2!="" && this.int3=="" && this.int4==""){
        this.loading=true;
        if(this.searchContent!=undefined && this.searchContent!=""){
          this.searchContent=`${this.searchContent} AND ${this.model1}:"${this.int1}" ${this.relation2} ${this.model2}:"${this.int2}"`;
        }else{
          this.searchContent=`${this.model1}:"${this.int1}" ${this.relation2} ${this.model2}:"${this.int2}"`;
        }
        this.search3();
        this.searcher();
      }
      if(this.int1!="" && this.int2!="" && this.int3!="" && this.int4==""){
        this.loading=true;
        if(this.searchContent!=undefined && this.searchContent!=""){
          this.searchContent=`${this.searchContent} AND ${this.model1}:"${this.int1}" ${this.relation2} ${this.model2}:"${this.int2}" ${this.relation3} ${this.model3}:"${this.int3}"`;
        }else{
          this.searchContent=`${this.model1}:"${this.int1}" ${this.relation2} ${this.model2}:"${this.int2}" ${this.relation3} ${this.model3}:"${this.int3}"`;
        }
        this.search3();
        this.searcher();
      }
      if(this.int1!="" && this.int2!="" && this.int3!="" && this.int4!=""){
        this.loading=true;
        if(this.searchContent!=undefined && this.searchContent!=""){
          this.searchContent=`${this.searchContent} AND ${this.model1}:"${this.int1}" ${this.relation2} ${this.model2}:"${this.int2}" ${this.relation3} ${this.model3}:"${this.int3}" ${this.relation4} ${this.model4}:"${this.int4}"`;
        }else{
          this.searchContent=`${this.model1}:"${this.int1}" ${this.relation2} ${this.model2}:"${this.int2}" ${this.relation3} ${this.model3}:"${this.int3}" ${this.relation4} ${this.model4}:"${this.int4}"`;
        }
        this.search3();
        this.searcher();
      }
      if(this.int1=="" && this.int2!="" && this.int3!="" && this.int4!=""){
        this.loading=true;
        if(this.searchContent!=undefined && this.searchContent!=""){
          this.searchContent=`${this.searchContent} AND ${this.model2}:"${this.int2}" ${this.relation3} ${this.model3}:"${this.int3}" ${this.relation4} ${this.model4}:"${this.int4}"`;
        }else{
          this.searchContent=`${this.model2}:"${this.int2}" ${this.relation3} ${this.model3}:"${this.int3}" ${this.relation4} ${this.model4}:"${this.int4}"`;
        }
        this.search3();
        this.searcher();
      }
      if(this.int1=="" && this.int2=="" && this.int3!="" && this.int4!=""){
        this.loading=true;
        if(this.searchContent!=undefined && this.searchContent!=""){
          this.searchContent=`${this.searchContent} AND ${this.model3}:"${this.int3}" ${this.relation4} ${this.model4}:"${this.int4}"`;
        }else{
          this.searchContent=`${this.model3}:"${this.int3}" ${this.relation4} ${this.model4}:"${this.int4}"`;
        }
        this.search3();
        this.searcher();
      }
      if(this.int1=="" && this.int2=="" && this.int3=="" && this.int4!=""){
        this.loading=true;
        if(this.searchContent!=undefined && this.searchContent!=""){
          this.searchContent=`${this.searchContent} AND ${this.model4}:"${this.int4}"`;
        }else{
          this.searchContent=`${this.model4}:"${this.int4}"`;
        }
        this.search3();
        this.searcher();
      }
      if(this.int1!="" && this.int2=="" && this.int3!="" && this.int4!=""){
        this.loading=true;
        if(this.searchContent!=undefined && this.searchContent!=""){
          this.searchContent=`${this.searchContent} AND ${this.model1}:"${this.int1}" ${this.relation3} ${this.model3}:"${this.int3}" ${this.relation4} ${this.model4}:"${this.int4}"`;
        }else{
          this.searchContent=`${this.model1}:"${this.int1}" ${this.relation3} ${this.model3}:"${this.int3}" ${this.relation4} ${this.model4}:"${this.int4}"`;
        }
        this.search3();
        this.searcher();
      }
      if(this.int1!="" && this.int2=="" && this.int3!="" && this.int4==""){
        this.loading=true;
        if(this.searchContent!=undefined && this.searchContent!=""){
          this.searchContent=`${this.searchContent} AND ${this.model1}:"${this.int1}" ${this.relation3} ${this.model3}:"${this.int3}"`;
        }else{
          this.searchContent=`${this.model1}:"${this.int1}" ${this.relation3} ${this.model3}:"${this.int3}"`;
        }
        this.search3();
        this.searcher();
      }
      if(this.int1!="" && this.int2=="" && this.int3=="" && this.int4!=""){
        this.loading=true;
        if(this.searchContent!=undefined && this.searchContent!=""){
          this.searchContent=`${this.searchContent} AND ${this.model1}:"${this.int1}" ${this.relation4} ${this.model4}:"${this.int4}"`;
        }else{
          this.searchContent=`${this.model1}:"${this.int1}" ${this.relation4} ${this.model4}:"${this.int4}"`;
        }
        this.search3();
        this.searcher();
      }
      if(this.int1=="" && this.int2!="" && this.int3=="" && this.int4!=""){
        this.loading=true;
        if(this.searchContent!=undefined && this.searchContent!=""){
          this.searchContent=`${this.searchContent} AND ${this.model2}:"${this.int2}" ${this.relation3} ${this.model4}:"${this.int4}"`;
        }else{
          this.searchContent=`${this.model2}:"${this.int2}" ${this.relation3} ${this.model4}:"${this.int4}"`;
        }
        this.search3();
        this.searcher();
      }
      if(this.int1=="" && this.int2!="" && this.int3!="" && this.int4==""){
        this.loading=true;
        if(this.searchContent!=undefined && this.searchContent!=""){
          this.searchContent=`${this.searchContent} AND ${this.model2}:"${this.int2}" ${this.relation3} ${this.model3}:"${this.int3}"`;
        }else{
          this.searchContent=`${this.model2}:"${this.int2}" ${this.relation3} ${this.model3}:"${this.int3}"`;
        }
        this.search3();
        this.searcher();
      }
      if(this.int1=="" && this.int2!="" && this.int3=="" && this.int4==""){
        this.loading=true;
        if(this.searchContent!=undefined && this.searchContent!=""){
          this.searchContent=`${this.searchContent} AND ${this.model2}:"${this.int2}"`;
        }else{
          this.searchContent=`${this.model2}:"${this.int2}"`;
        }
        this.search3();
        this.searcher();
      }
      if(this.int1=="" && this.int2=="" && this.int3!="" && this.int4==""){
        this.loading=true;
        if(this.searchContent!=undefined && this.searchContent!=""){
          this.searchContent=`${this.searchContent} AND ${this.model3}:"${this.int3}"`;
        }else{
          this.searchContent=`${this.model3}:"${this.int3}"`;
        }
        this.search3();
        this.searcher();
      }
    },
    reset(){
      this.int1='';this.int2='';this.int3='';this.int4='';
      this.model1="";this.model2='';this.model3='';this.model4='';this.searchContent=""
    },
    influencefactorDown(){
      this.inpp=!this.inpp
      this.inpp1=!this.inpp1
      this.checkList1=[];
      this.chk1=this.checkList1.join(",");
      this.$router.push({
        path:'/SearchJournal',
        query:{
          chk1:this.chk1,chk2:this.chk2,chk3:this.chk3,chk4:this.chk4,sort:this.sort,page:this.currentPage,search1:this.searchContent
        }
      })
    },
    senior(){
      this.j++;
      if(this.j%2==1){
        this.senior1=!this.senior1
      }else{
        this.senior1=false;
      }
    },
    searchkras(){
      const {href}=this.$router.resolve({
        path: '/Search',
        query: {
          search1:`kras`
        },
      })
      window.open(href,'_blank')
    },
    searchegfr(){
      const {href}=this.$router.resolve({
        path: '/Search',
        query: {
          search1:`egfr`
        },
      })
      window.open(href,'_blank')
    },
    searchmyc(){
      const {href}=this.$router.resolve({
        path: '/Search',
        query: {
          search1:`myc`
        },
      })
      window.open(href,'_blank')
    },
    searchtp53(){
      const {href}=this.$router.resolve({
        path: '/Search',
        query: {
          search1:`tp53`
        },
      })
      window.open(href,'_blank')
    },
    //页码
    handleCurrentChange(currentPage){
      this.loading=true;
      if(this.showSCI==false){
        this.isSci=0
      }else{
        this.isSci=1
      }
      if(typeof(currentPage)!='undefined' && currentPage!=1){
        this.currentPage = currentPage;
        this.$router.push({
          path:'/SearchJournal',
          query:{
            chk1:this.chk1,chk2:this.chk2,chk3:this.chk3,chk4:this.chk4,chk5:this.chk5,sort:this.sort,search1:this.searchContent,sci:this.isSci,page:this.currentPage
          }
        })
        $("#sea").click()
        this.inf();
      }else if(currentPage==1){
        this.currentPage = 1
        this.$router.push({
          path:'/SearchJournal',
          query:{
            chk1:this.chk1,chk2:this.chk2,chk3:this.chk3,chk4:this.chk4,sort:this.sort,page:this.currentPage,search1:this.searchContent
          }
        })
        $("#sea").click()
        this.inf();
      }else {
        this.currentPage =this.$route.query.page*1 || 1
        currentPage=this.currentPage
        this.$router.push({
          path:'/SearchJournal',
          query:{
            chk1:this.chk1,chk2:this.chk2,chk3:this.chk3,chk4:this.chk4,sort:this.sort,page:this.currentPage,search1:this.searchContent
          }
        })
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
    //搜索框搜索
    searcher(){
      this.loading=true;
      this.show1=true;this.active1=false;this.show2=true;this.active2=false;this.show3=true;this.active3=false;this.show4=true;this.active4=false;this.show5=true;this.active5=false,this.show6=true;this.active6=false;
      this.isAsc1=false;this.isAsc2=false;this.isAsc3=false
      this.j++;
      this.senior1=false;
      var qs=require('qs');
      if(this.showSCI==false){
        this.isSci=0
      }else{
        this.isSci=1
      }
      this.chk1=this.$route.query.chk1
      this.chk2=this.$route.query.chk2
      this.chk3=this.$route.query.chk3
      this.chk4=this.$route.query.chk4
      this.chk5=this.$route.query.chk5
      this.sort=this.$route.query.sort
      this.isSci=this.$route.query.sci
      this.currentPage=parseInt(this.$route.query.page)
      if(this.searchContent!='' || this.searchContent!=' '){
      this.axios.post(`/pubmed/searchPubmedJournal/`, qs.stringify({
        queryStringQuery:this.searchContent,
        page:this.currentPage,
        ifsFilter:this.chk1 || this.chk4,
        areaFilter:this.chk2 || this.chk5,
        qClassFilter:this.chk3,
        sort:this.sort,
        isSci:this.isSci
      })).then(result=>{
        this.searchPubmedArticle=result.data
        this.Jou=result.data.res
        if(JSON.stringify(result.data.res)==="{}" || result.data.res==undefined){
          this.accc=''
          this.result=0
          this.timer=0
        }else{
          this.accc=result.data.res.journalList.searchData;
          this.result=result.data.res.journalList.searchTotal;
          this.timer=result.data.res.journalList.searchTime;
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
      this.chk1=this.checkList1.join(",");
    },
    
    //中科院分区
    checkListFore(){
      this.loading=true;
      this.i=0;this.o=0;this.p=0;
      this.show1=true;this.active1=false;this.show2=true;this.active2=false;this.show3=true;this.active3=false;this.show4=true;this.active4=false;this.show5=true;this.active5=false,this.show6=true;this.active6=false;
      this.isAsc1=false;this.isAsc2=false;this.isAsc3=false
      this.chk2=this.checkList2.join(",");
      if(this.showSCI==false){
        this.isSci=0
      }else{
        this.isSci=1
      }
    },
    //jcr分区
    checkListFive(){
      this.loading=true;
      this.i=0;this.o=0;this.p=0;
      this.show1=true;this.active1=false;this.show2=true;this.active2=false;this.show3=true;this.active3=false;this.show4=true;this.active4=false;this.show5=true;this.active5=false,this.show6=true;this.active6=false;
      this.isAsc1=false;this.isAsc2=false;this.isAsc3=false
      this.chk3=this.checkList3.join(",");
      if(this.showSCI==false){
        this.isSci=0
      }else{
        this.isSci=1
      }
    },
    //自定义影响因子
    customOne(){
      this.loading=true;
      this.i=0;this.o=0;this.p=0;
      this.show1=true;this.active1=false;this.show2=true;this.active2=false;this.show3=true;this.active3=false;this.show4=true;this.active4=false;this.show5=true;this.active5=false,this.show6=true;this.active6=false;
      this.isAsc1=false;this.isAsc2=false;this.isAsc3=false
      this.chk1=""
      this.chk4=this.inp1+'-'+this.inp2
      if(this.showSCI==false){
        this.isSci=0
      }else{
        this.isSci=1
      }
    },
    inf(){
      this.sort=this.$route.query.sort
      if(this.sort=="factor-sort_-1"){
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
    //按照影响因子进行升序降序排列
    influenceFactor(){
      this.o++;
      this.show1=true;this.active1=false;this.show2=true;this.active2=false;this.show3=true;this.active3=false;this.show6=true;this.active6=false;
      this.i=0;this.p=0;
      this.isAsc1=false
      this.isAsc3=false
      if(this.o%3==1){
        this.loading=true;
        this.isAsc2=true
        this.show2=false
        this.active2=true
        this.show3=true
        this.active3=false
        this.sort="factor-sort_-1"
        if(this.showSCI==false){
          this.isSci=0
        }else{
          this.isSci=1
        }
      }else if(this.o%3==2){
        this.loading=true;
        this.isAsc2=true
        this.show2=true
        this.active2=false
        this.show3=false
        this.active3=true
        this.sort="factor-sort_1"
        if(this.showSCI==false){
          this.isSci=0
        }else{
          this.isSci=1
        }
      }else if(this.o%3==0){
        this.loading=true;
        this.isAsc2=false
        this.show2=true
        this.active2=false
        this.show3=true
        this.active3=false
        this.sort=""
        if(this.showSCI==false){
          this.isSci=0
        }else{
          this.isSci=1
        }
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
        this.isAsc3=true
        this.show4=false
        this.active4=true
        this.show5=true
        this.active5=false
        this.sort="matching-sort_-1"
        if(this.showSCI==false){
          this.isSci=0
        }else{
          this.isSci=1
        }
      }else if(this.p%3==2){
        this.loading=true;
        this.isAsc3=true
        this.show4=true
        this.active4=false
        this.show5=false
        this.active5=true
        this.sort="matching-sort_1"
        if(this.showSCI==false){
          this.isSci=0
        }else{
          this.isSci=1
        }
      }else if(this.p%3==0){
        this.loading=true;
        this.isAsc3=false
        this.show4=true
        this.active4=false
        this.show5=true
        this.active5=false
        this.sort=""
        if(this.showSCI==false){
          this.isSci=0
        }else{
          this.isSci=1
        }
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
    margin-right: 12.9%;
  }
  .SearchBox>.searchInput>>>.el-input__inner{
    border: none;
    font-size: 13px;
    font-weight: 400;
  }
  .SearchBox>.searchInput>>>div{
    width: 80%;
  }
  .searchInput>span{
    color: #3366cc;
    cursor: pointer;
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
  .SearchHeadTwo>>>.el-switch.is-checked .el-switch__core::after{
    margin-left: -13px;
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
    width:80%;
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
    margin-top: 3px;
  }
  .first1>div>div:nth-child(1)>p:nth-child(4){
    margin-top: -3px;
  }
  .first1>div>div:nth-child(1)>p:nth-child(5){
    margin-top: 20px;
  }
  .first1>div>div:nth-child(1)>p:nth-child(6){
    margin-top: 20px;
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
    margin-top: 5px;padding: 10px 0;
  }
  .issn>div>p:last-child{
    padding: 10px 0;
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
    z-index: 999 ;
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