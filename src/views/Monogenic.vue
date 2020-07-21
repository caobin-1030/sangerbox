<template>
  <div>
    <Header></Header>
    <div v-if="mess" class="mess"><img src="../../public/img/msg.png" alt=""><span>正在导出</span></div>
    <div class="tankuang" v-if="tankuang" @click="downDiscuoption()">
      <div v-loading="loading10"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="f5f5f5" id="view" @click.stop="settingEvent()">
        <img style="width:800px" :src="imgsrc6" alt="">
      </div>
    </div>
    <div class="Rigth">
      <div @click="goGene('#gene-'+i)" v-for="(item,i) of list" :key="i">{{item}}</div>
    </div>
    <div class="Search1" @click="Searcher1()"></div>
    <div class="SearchBackground">
      <div class="SearchBody1">
        <div class="search2">
          <div class="searchBox1">
              <input ref="input" @keyup.13="searcher()" v-model="searchContent" type="text" placeholder="在此输入您搜索的内容" onfocus="this.placeholder=''" onblur="this.placeholder='在此输入您搜索的内容'">
            <div @click="searcher()" class="Search"><span>搜索</span></div>
          </div>
          
        </div>
        <div class="SearchBody">
          <span>寻找基因</span>
          <ul>
            <li><span @click="searchtp53()">TP53</span></li>
            <li><span @click="searchmyc()">MYC</span></li>
            <li><span @click="searchegfr()">egfr</span></li>
            <li><span @click="searchkras()">kras</span></li>
          </ul>
          <div class="SearchBox">
              <input ref="input" @keyup.13="searcher()" v-model="searchContent" type="text" placeholder="在此输入您搜索的内容" onfocus="this.placeholder=''" onblur="this.placeholder='在此输入您搜索的内容'">
            <div @click="searcher()" class="Search"><span>搜索</span></div>
          </div>
          <p class="sousuo"><span class="tougao" style="margin-right:12%;cursor: pointer;" @click="toIdConversion()">GeneID转换</span></p>
        </div>
        <div class="genic">
          <div class="genicTop">
            <div class="gene1">
              <div>
                <p class="title"><span>{{genesDetails.name}} </span><span v-if="genesDetails.geneType!=null">({{genesDetails.geneType}})</span></p>
                <p class="title2">{{genesDetails.desc}}</p>
                <div class="hengxian"></div>
              </div>
              <div><img style="width:400px;height:80px" :src="imgsrc5" alt=""></div>
            </div>
            <p class="bianma">{{genesDetails.summary}}</p>
          </div>
          <div class="genicBootom">
            <p><span v-for="(item,i) of data1" :key="i"><span class="database">{{item.database}}：</span><span @click="toGenenames(item.url)" class="dataname">{{item.name}}</span><span class="xiegang" v-if="i!=data1.length-1"> / </span></span></p>
            <p><img @click="collection(geneId,co1)" :id="geneId" class="shoucang" :src="co1==undefined?shoucang1:co1=='1'?shoucang10:shoucang1" :title="co1==undefined?shoucang1:co1=='1'?shoucang11:shoucang2"></p>
          </div>
        </div>
      </div>
      <div class="SearchContent">
        <div class="Content">
          <div class="bieming" :id="'gene-'+0">
            <p class="uname"><span class="username"></span></p>
            <div>
              <div class="geincbieming">
                <div>
                  <p v-for="(item,i) of data2" :key="i">
                    {{item.name}}
                    <sup @click="toNcbi(item1[1])" :title="item1[0]" v-for="(item1,i) of item.detailJson" :key="i">{{i+1}}</sup>
                  </p>
                </div>
                <div>
                  <p v-for="(item,i) of data3" :key="i">
                    {{item.name}}
                    <sup @click="toNcbi(item1[1])" :title="item1[0]" v-for="(item1,i) of item.detailJson" :key="i">{{i+1}}</sup>
                  </p>
                </div>
                <div style="text-align: right">
                  <img style="height:300px;margin-right:50px;" :src="imgsrc4" alt="">
                </div>
              </div>
              
            </div>
          </div> 
          <div class="kegg" :id="'gene-'+1">
            <p class="uname1"><span class="username1"></span></p>
            <el-tabs v-model="activeName" :tab-position="tabPosition" @tab-click="handleClick" >
              <el-tab-pane label="通路注释" name="kegg" >
                <el-table v-if="gene2KeggMapList!=undefined" height="200" :data="gene2KeggMapList.filter(data => !search1 || data.info.toLowerCase().includes(search1.toLowerCase()))"  border style="width: 100%">
                  <el-table-column  label="PathwayId" width="100">
                    <template slot-scope="scope">
                      <span @click="handleGoods(scope.row)" class="pathway" style="margin:0;cursor: pointer;">{{scope.row.pathwayid}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="oneType" label="Type" width="260">
                  </el-table-column>
                  <el-table-column label="subType" prop="twoType" width="260">
                  </el-table-column>
                  <el-table-column prop="info">
                    <template slot="header" slot-scope="scope">
                      <div class="info">
                        <p>PathwayDesc</p><el-input v-model="search1" size="mini" placeholder="输入关键字搜索"/>
                      </div>
                    </template>
                  </el-table-column>
                </el-table>
                <div v-else>
                  <div style="width:800px;height:300px;text-align: center">
                    <img style="margin-top:100px;height:150px" src="../../public/img/none.png" alt="">
                  </div>
                </div>
              </el-tab-pane>
              <el-tab-pane :disabled="gene2KeggMapList==undefined" label="调控关系" class="tiaokong" name="kegg1" style="height:500px;">
                <div class="tcga" v-loading="loading5"
                element-loading-text="拼命加载中"
                element-loading-spinner="el-icon-loading"
                element-loading-background="f5f5f5" id="view">
                  <div v-if="undata4!=undefined" class="xuezhe">
                    <div id="xue1" :style="{width: '100%', height: '500px'}"></div>
                  </div>
                  <div v-else>
                    <div style="width:800px;height:300px;text-align: center">
                      <img style="margin-top:100px;height:150px" src="../../public/img/none.png" alt="">
                    </div>
                  </div>
                  <div v-if="undata4!=undefined" class="guanxi" >
                    <table v-if="kegg2RelationTwo1.length>0" style="width:100%;  border:1px solid #dcdcdc">
                      <tr>
                        <td>Name1</td>
                        <td>Name2</td>
                        <td>Type</td>
                        <td>PathwayID</td>
                      </tr>
                      <tr v-for="(item,i) of kegg2RelationTwo1[0]" :key="i" @click="RoadVisualInfo(item.name1.split(':')[0],item.name2.split(':')[0],item.pathwayID)">
                        <td>{{item.name1.split(':')[1]}}</td>
                        <td>{{item.name2.split(':')[1]}}</td>
                        <td>{{item.type}}</td>
                        <td>{{item.pathwayID}}</td>
                      </tr>
                    </table>
                  </div>
                </div>
              </el-tab-pane>
              <el-tab-pane :disabled="gene2KeggMapList==undefined" label="表达调控关系" name="kegg3">
                <div class="tcga" v-loading="loading11"
                element-loading-text="拼命加载中"
                element-loading-spinner="el-icon-loading"
                element-loading-background="f5f5f5" id="view">
                  <div v-if="JSON.stringify(undata5)!='{}'" class="tonglu1">
                    <div id="tong11" :style="{width: '800px', height: '500px'}"></div>
                  </div>
                  <div v-else>
                    <div style="width:800px;height:300px;text-align: center">
                      <img style="margin-top:100px;height:150px" src="../../public/img/none.png" alt="">
                    </div>
                  </div>
                  <div class="generight">
                    <p>选择数据集：</p>
                    <el-select v-model="pathway2" filterable placeholder="请选择">
                      <el-option
                        v-for="item in pathwayvalue"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                    <p class="xishu">相关系数方法：</p>
                    <el-select v-model="func" placeholder="请选择">
                      <el-option
                        v-for="item in funcvalue"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                    <p class="xishu"><span>R值：</span><input type="number" class="innp" step="0.1" min="0" v-model="input5"></p>
                    <p class="xishu"><span>P值：</span><input type="number" class="innp" step="0.01" min="0" v-model="input6"></p>
                    <p class="xishu">
                      <el-button  type="primary" @click="Undate5()" size="mini">更新</el-button>
                    </p>
                  </div>
                </div>
              </el-tab-pane>
              <el-tab-pane :disabled="gene2KeggMapList==undefined" label="表达-通路相关性" name="kegg2">
                <div class="tcga" v-loading="loading3"
                element-loading-text="拼命加载中"
                element-loading-spinner="el-icon-loading"
                element-loading-background="f5f5f5" id="view">
                  <div v-if="JSON.stringify(undata2)!='{}'" class="tonglu">
                    <div id="tong1" :style="{width: '800px', height: '500px'}"></div>
                  </div>
                  <div v-else>
                    <div style="width:800px;height:300px;text-align: center">
                      <img style="margin-top:100px;height:150px" src="../../public/img/none.png" alt="">
                    </div>
                  </div>
                  <div class="generight">
                    <p>选择数据集：</p>
                    <el-select v-model="pathway" filterable multiple placeholder="请选择">
                      <el-option
                        v-for="item in pathwayvalue"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                    <p class="xishu">相关系数方法：</p>
                    <el-select v-model="func" placeholder="请选择">
                      <el-option
                        v-for="item in funcvalue"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                    <p class="xishu"><span>R值：</span><input type="number" class="innp" step="0.1" min="0" v-model="input5"></p>
                    <p class="xishu"><span>P值：</span><input type="number" class="innp" step="0.01" min="0" v-model="input6"></p>
                    <p class="xishu">
                      <el-button  type="primary" @click="Undate2()" size="mini">更新</el-button>
                    </p>
                  </div>
                </div>
              </el-tab-pane>
            </el-tabs>
          </div>
          <div class="kegg" :id="'gene-'+2">
            <p class="uname2"><span class="username2"></span></p>
            <el-tabs :tab-position="tabPosition" @tab-click="handleClick2">
              <el-tab-pane label="功能注释">
                <el-table id="pane-kegg" v-if="gene2GoList!=undefined" height="200" :data="gene2GoList.filter(data => !search2 || data.name.toLowerCase().includes(search2.toLowerCase()))"  border style="width: 100%">
                  <el-table-column prop="GOID" label="GOID" width="120">
                  </el-table-column>
                  <el-table-column label="NameSpace" prop="namespace" width="150">
                  </el-table-column>
                  <el-table-column prop="name">
                    <template slot="header" slot-scope="scope">
                      <div class="info">
                        <p>Name</p><el-input v-model="search2" size="mini" placeholder="输入关键字搜索"/>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column prop="refDatabase" label="RrefDataBase" width="150">
                    <template slot-scope="scope">
                      <span @click="handleGoods1(scope.row)" class="pathway" style="margin:0;cursor: pointer;">{{scope.row.refDatabase}}</span>
                    </template>
                  </el-table-column>
                </el-table>
              </el-tab-pane>
              <el-tab-pane label="表达-GO_BP相关性" name="gobp">
                <div class="tcga" v-loading="loading4"
                element-loading-text="拼命加载中"
                element-loading-spinner="el-icon-loading"
                element-loading-background="f5f5f5" id="view">
                  <div v-if="JSON.stringify(undata3)!='{}'" class="biaodabp">
                    <div id="bp1" :style="{width: '800px', height: '500px'}"></div>
                  </div>
                  <div v-else>
                    <div style="width:800px;height:300px;text-align: center">
                      <img style="margin-top:100px;height:150px" src="../../public/img/none.png" alt="">
                    </div>
                  </div>
                  <span id="b" style="display:none">BP</span>
                  <div class="generight">
                    <p>选择数据集：</p>
                    <el-select v-model="pathway1" filterable multiple placeholder="请选择">
                      <el-option
                        v-for="item in pathwayvalue"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                    <p class="xishu">相关系数方法：</p>
                    <el-select v-model="func1" placeholder="请选择">
                      <el-option
                        v-for="item in funcvalue"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                    <p class="xishu"><span>R值：</span><input type="number" class="innp" step="0.1" min="0" v-model="input7"></p>
                    <p class="xishu"><span>P值：</span><input type="number" class="innp" step="0.01" min="0" v-model="input8"></p>
                    <p class="xishu">
                      <el-button  type="primary" @click="Undate3()" size="mini">更新</el-button>
                    </p>
                  </div>
                </div>
              </el-tab-pane>
              <el-tab-pane label="表达-GO_CC相关性" name="gocc">
                <div class="tcga" v-loading="loading4"
                element-loading-text="拼命加载中"
                element-loading-spinner="el-icon-loading"
                element-loading-background="f5f5f5" id="view">
                  <div v-if="JSON.stringify(undata3)!='{}'" class="biaodabp2">
                    <div id="bp2" :style="{width: '800px', height: '500px'}"></div>
                  </div>
                  <div v-else>
                    <div style="width:800px;height:300px;text-align: center">
                      <img style="margin-top:100px;height:150px" src="../../public/img/none.png" alt="">
                    </div>
                  </div>
                  <span id="b" style="display:none">CC</span>
                  <div class="generight">
                    <p>选择数据集：</p>
                    <el-select v-model="pathway1" filterable multiple placeholder="请选择">
                      <el-option
                        v-for="item in pathwayvalue"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                    <p class="xishu">相关系数方法：</p>
                    <el-select v-model="func1" placeholder="请选择">
                      <el-option
                        v-for="item in funcvalue"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                    <p class="xishu"><span>R值：</span><input type="number" class="innp" step="0.1" min="0" v-model="input7"></p>
                    <p class="xishu"><span>P值：</span><input type="number" class="innp" step="0.01" min="0" v-model="input8"></p>
                    <p class="xishu">
                      <el-button  type="primary" @click="Undate3()" size="mini">更新</el-button>
                    </p>
                  </div>
                </div>
              </el-tab-pane>
              <el-tab-pane label="表达-GO_MF相关性" name="gomf">
                <div class="tcga" v-loading="loading4"
                element-loading-text="拼命加载中"
                element-loading-spinner="el-icon-loading"
                element-loading-background="f5f5f5" id="view">
                  <div v-if="JSON.stringify(undata3)!='{}'" class="biaodabp3">
                    <div id="bp3" :style="{width: '800px', height: '500px'}"></div>
                  </div>
                  <div v-else>
                    <div style="width:800px;height:300px;text-align: center">
                      <img style="margin-top:100px;height:150px" src="../../public/img/none.png" alt="">
                    </div>
                  </div>
                  <span id="b" style="display:none">MF</span>
                  <div class="generight">
                    <p>选择数据集：</p>
                    <el-select v-model="pathway1" filterable multiple placeholder="请选择">
                      <el-option
                        v-for="item in pathwayvalue"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                    <p class="xishu">相关系数方法：</p>
                    <el-select v-model="func1" placeholder="请选择">
                      <el-option
                        v-for="item in funcvalue"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                    <p class="xishu"><span>R值：</span><input type="number" class="innp" step="0.1" min="0" v-model="input7"></p>
                    <p class="xishu"><span>P值：</span><input type="number" class="innp" step="0.01" min="0" v-model="input8"></p>
                    <p class="xishu">
                      <el-button  type="primary" @click="Undate3()" size="mini">更新</el-button>
                    </p>
                  </div>
                </div>
              </el-tab-pane>
            </el-tabs>
          </div>
          <div class="kegg" :id="'gene-'+3">
            <p class="uname3"><span class="username3"></span></p>
            <el-tabs :tab-position="tabPosition" @tab-click="handleClick3">
              <el-tab-pane label="TCGA" style="height:360px;">
                <div class="tcga" v-loading="loading1"
                element-loading-text="拼命加载中"
                element-loading-spinner="el-icon-loading"
                element-loading-background="f5f5f5" id="view">
                  <div v-if="JSON.stringify(TC)!='{}'" style="width:800px;height:370px;">
                    <img :src="imgsrc" style="width:800px;height:350px;margin-top:20px;" alt="">
                  </div>
                  <div v-else>
                    <div style="width:800px;height:300px;text-align: center">
                      <img style="margin-top:100px;height:150px" src="../../public/img/none.png" alt="">
                    </div>
                  </div>
                  <div class="generight">
                    <span id="a" style="display:none">F</span>
                    <div class="jianyan">
                      <span>检验方法：</span>
                      <el-radio-group v-model="radio">
                        <el-radio label="T检验">T检验</el-radio>
                        <el-radio label="秩和检验">秩和检验</el-radio>
                      </el-radio-group>
                    </div>
                    <div class="edg">
                      <span>xlabel旋转角度：</span>
                      <el-select v-model="value" placeholder="请选择">
                        <el-option
                          v-for="item in options"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </div>
                    <div class="tuli1">
                      <span>图例位置：</span>
                      <el-select v-model="value1" placeholder="请选择">
                        <el-option
                          v-for="item in options1"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </div>
                    <div class="color1">
                      <span>y轴区间：</span>
                      <input type="number" class="inp" min="0" v-model="input1">-<input class="inp" type="number" min="0" v-model="input2">
                    </div>
                    <div class="color1">
                      <span>Box宽度：</span>
                      <input type="number" max="1" min="0" class="inp" step="0.1" v-model="input">
                    </div>
                    <div class="color2">
                      <div style="width:120px">
                        <span>颜色：</span>
                        <el-color-picker v-model="color"></el-color-picker>
                        <el-color-picker v-model="color1"></el-color-picker>
                      </div>
                      <p style="width:140px;text-align: right">
                        <el-button type="primary" @click="downloadtcga()" size="mini">下载</el-button>
                        <el-button type="primary" @click="Undate()" size="mini">更新</el-button>
                      </p>
                    </div>
                  </div>
                </div>
              </el-tab-pane>
              <el-tab-pane label="CCLE">
                <div class="tcga" v-loading="loading2"
                element-loading-text="拼命加载中"
                element-loading-spinner="el-icon-loading"
                element-loading-background="f5f5f5" id="view">
                  <div v-if="JSON.stringify(GT)!='{}'" style="width:800px;height:370px;">
                    <img :src="imgsrc2" style="width:800px;height:350px;margin-top:20px;" alt="">
                  </div>
                  <div v-else>
                    <div style="width:800px;height:300px;text-align: center">
                      <img style="margin-top:100px;height:150px" src="../../public/img/none.png" alt="">
                    </div>
                  </div>
                  <div class="generight">
                    <div class="jianyan">
                      <span>检验方式：</span>
                      <el-radio-group v-model="radio2">
                        <el-radio label="T">方差分析</el-radio>
                        <el-radio label="F">Kruskal-Wallis</el-radio>
                      </el-radio-group>
                    </div>
                    <div class="jianyan">
                      <span>散点图：</span>
                      <el-radio-group v-model="radio1">
                        <el-radio label="T">显示</el-radio>
                        <el-radio label="F">不显示</el-radio>
                      </el-radio-group>
                    </div>
                    <div class="edg">
                      <span>xlabel旋转角度：</span>
                      <el-select v-model="edg" placeholder="请选择">
                        <el-option
                          v-for="item in options"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </div>
                    <div class="color1">
                      <span>y轴区间：</span>
                      <input type="number" class="inp" min="0" v-model="input3">-<input class="inp" type="number" min="0" v-model="input4">
                    </div>
                    <p style="width:180px;margin-top:20px;">
                      <el-button type="primary" @click="downloadgtex('CCLE')" :disabled="imgsrc2==''" size="mini">下载图片</el-button>
                      <el-button type="primary" @click="Undate1('CCLE')" size="mini">更新</el-button>
                    </p>
                  </div>
                </div>
              </el-tab-pane>
              <el-tab-pane label="GTEx">
                <div class="tcga" v-loading="loading2"
                element-loading-text="拼命加载中"
                element-loading-spinner="el-icon-loading"
                element-loading-background="f5f5f5" id="view">
                  <div v-if="JSON.stringify(GT)!='{}'" style="width:800px;height:370px;">
                    <img :src="imgsrc2" style="width:800px;height:350px;margin-top:20px;" alt="">
                  </div>
                  <div v-else>
                    <div style="width:800px;height:300px;text-align: center">
                      <img style="margin-top:100px;height:150px" src="../../public/img/none.png" alt="">
                    </div>
                  </div>
                  <div class="generight">
                    <div class="jianyan">
                      <span>检验方式：</span>
                      <el-radio-group v-model="radio2">
                        <el-radio label="T">方差分析</el-radio>
                        <el-radio label="F">Kruskal-Wallis</el-radio>
                      </el-radio-group>
                    </div>
                    <div class="jianyan">
                      <span>散点图：</span>
                      <el-radio-group v-model="radio1">
                        <el-radio label="T">显示</el-radio>
                        <el-radio label="F">不显示</el-radio>
                      </el-radio-group>
                    </div>
                    <div class="edg">
                      <span>xlabel旋转角度：</span>
                      <el-select v-model="edg" placeholder="请选择">
                        <el-option
                          v-for="item in options"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </div>
                    <div class="color1">
                      <span>y轴区间：</span>
                      <input type="number" class="inp" min="0" v-model="input3">-<input class="inp" type="number" min="0" v-model="input4">
                    </div>
                    <p style="width:180px;margin-top:20px;">
                      <el-button type="primary" @click="downloadgtex('GTEx')" :disabled="imgsrc2==''" size="mini">下载图片</el-button>
                      <el-button type="primary" @click="Undate1('GTEx')" size="mini">更新</el-button>
                    </p>
                  </div>
                </div>
              </el-tab-pane>
              <el-tab-pane label="TCGA+GTEx" style="height:360px;">
                <div class="tcga" v-loading="loading1"
                element-loading-text="拼命加载中"
                element-loading-spinner="el-icon-loading"
                element-loading-background="f5f5f5" id="view">
                  <div v-if="JSON.stringify(TC)!='{}'" style="width:800px;height:370px;">
                    <img :src="imgsrc" style="width:800px;height:350px;margin-top:20px;" alt="">
                  </div>
                  <div v-else>
                    <div style="width:800px;height:300px;text-align: center">
                      <img style="margin-top:100px;height:150px" src="../../public/img/none.png" alt="">
                    </div>
                  </div>
                  <span id="a" style="display:none">F</span>
                  <div class="generight">
                    <div class="jianyan">
                      <span>检验方法：</span>
                      <el-radio-group v-model="radio">
                        <el-radio label="T检验">T检验</el-radio>
                        <el-radio label="秩和检验">秩和检验</el-radio>
                      </el-radio-group>
                    </div>
                    <div class="edg">
                      <span>xlabel旋转角度：</span>
                      <el-select v-model="value" placeholder="请选择">
                        <el-option
                          v-for="item in options"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </div>
                    <div class="tuli1">
                      <span>图例位置：</span>
                      <el-select v-model="value1" placeholder="请选择">
                        <el-option
                          v-for="item in options1"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </div>
                    <div class="color1">
                      <span>y轴区间：</span>
                      <input type="number" class="inp" min="0" v-model="input1">-<input class="inp" type="number" min="0" v-model="input2">
                    </div>
                    <div class="color1">
                      <span>Box宽度：</span>
                      <input type="number" max="1" min="0" class="inp" step="0.1" v-model="input">
                    </div>
                    <div class="color2">
                      <div style="width:120px">
                        <span>颜色：</span>
                        <el-color-picker v-model="color"></el-color-picker>
                        <el-color-picker v-model="color1"></el-color-picker>
                      </div>
                      <p style="width:140px;text-align: right">
                        <el-button type="primary" @click="downloadtcgt()" size="mini">下载</el-button>
                        <el-button type="primary" @click="Undate()" size="mini">更新</el-button>
                      </p>
                    </div>
                  </div>
                </div>
              </el-tab-pane>
              <el-tab-pane label="DownLoad">
                <div class="download1">
                  <div>
                    <p>下载基因在泛癌中的表达水平：</p>
                    <el-input
                      type="textarea"
                      :rows="5"
                      placeholder="输入为：一行一个基因"
                      v-model="fanai">
                    </el-input>
                  </div>
                  <div>
                    <p>数据类型：</p>
                    <el-radio-group v-model="shujuleixing">
                      <el-radio label="TCGA"></el-radio>
                      <el-radio label="GTEx"></el-radio>
                      <el-radio label="CCLE"></el-radio>
                    </el-radio-group>
                    <div style="margin-top:60px">
                      <el-button type="primary" :disabled="this.fanai==''" @click="fanaidownload()" size="mini">下载</el-button>
                    </div>
                  </div>
                </div>
              </el-tab-pane>
              <el-tab-pane label="相关性分析">
                <div v-loading="loading1"
                element-loading-text="拼命加载中"
                element-loading-spinner="el-icon-loading"
                element-loading-background="f5f5f5" id="view" class="xiangguanxing">
                  <div v-if="JSON.stringify(TC)!='{}'" style="width:800px;">
                    <img :src="imgsrcxiangguan" style="width:800px;margin-top:20px;" alt="">
                  </div>
                  <div v-else>
                    <div style="width:800px;height:300px;text-align: center">
                      <img style="margin-top:100px;height:150px" src="../../public/img/none.png" alt="">
                    </div>
                  </div>
                  <div>
                    <p >请输入基因集：</p>
                    <el-input style="margin-top:10px" type="textarea" :rows="2" placeholder="请输入一行一个基因" v-model="geneji">
                    </el-input>
                    <p class="xishu">肿瘤类型：</p>
                    <el-select v-model="zhongliuleixing" clearable multiple collapse-tags placeholder="请选择">
                      <el-option
                        v-for="item in bianmas"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                    <p class="xishu">方法：</p>
                    <el-select v-model="func"  placeholder="请选择">
                      <el-option
                        v-for="item in funcs"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                    <div class="yansezhi" style="margin-top:10px">
                      <div>
                        <div>
                          <p style="margin-right:7px">最小值：</p>
                          <input type="number" class="innp1" min="-1" max="1" step="0.1" v-model="minp">
                        </div>
                        <div>
                          <p style="margin-right:7px">中间值：</p>
                          <input type="number" class="innp1"  min="-1" max="1" step="0.1" v-model="middlep">
                        </div>
                        <div>
                          <p style="margin-right:7px">最大值：</p>
                          <input type="number" class="innp1" min="-1" max="1" step="0.1" v-model="maxp">
                        </div>
                        <div>
                          <p>最小p值：</p>
                          <input type="number" class="innp1" min="-1" max="1" step="0.1" v-model="minpp">
                        </div>
                      </div>
                      <div>
                        <div class="color21">
                          <p style="margin-right:7px">最小值颜色：</p>
                          <el-color-picker v-model="mincolor"></el-color-picker>
                        </div>
                        <div class="color21">
                          <p style="margin-right:7px">中间值颜色：</p>
                          <el-color-picker v-model="middlecolor"></el-color-picker>
                        </div>
                        <div class="color21">
                          <p style="margin-right:7px">最大值颜色：</p>
                          <el-color-picker v-model="maxcolor"></el-color-picker>
                        </div>
                        <div class="color21">
                          <p>最小p值颜色：</p>
                          <el-color-picker v-model="minpcolor"></el-color-picker>
                        </div>
                      </div>
                    </div>
                    <div>
                      <p style="margin-top:10px">图片宽度：<input type="number" v-model="xiangguanwidth"></p>
                      <p style="margin-top:10px">图片高度：<input type="number" v-model="xiangguanheight"></p>
                    </div>
                    <div class="yanse111">
                      <p style="margin-top:10px;">
                        <el-button type="primary" @click="downloadXG('pdf')" :disabled="imgsrc11==''" size="mini">下载图片</el-button>
                        <el-button type="primary" @click="downloadXG('txt')" :disabled="imgsrc11==''" size="mini">下载文本</el-button>
                        <el-button type="primary" @click="XGUpdate()" size="mini">更新</el-button>
                      </p>
                    </div>
                  </div>
                </div>
              </el-tab-pane>
            </el-tabs>
          </div>
          <div class="kegg" :id="'gene-'+4">
            <p class="uname4"><span class="username4"></span></p>
            <el-tabs :tab-position="tabPosition" @tab-click="handleClick4">
              <el-tab-pane label="TCGA突变模式">
                <div class="tcga" v-loading="loading4"
                element-loading-text="拼命加载中"
                element-loading-spinner="el-icon-loading"
                element-loading-background="f5f5f5" id="view">
                  <div v-if="JSON.stringify(TC)!='{}'" style="width:800px;">
                    <img :src="imgsrc44" style="width:600px;margin-top:20px;" alt="">
                  </div>
                  <div v-else>
                    <div style="width:800px;height:300px;text-align: center">
                      <img style="margin-top:100px;height:150px" src="../../public/img/none.png" alt="">
                    </div>
                  </div>
                  <div class="generight1">
                    <div class="jianyan">
                      <p class="xishu">肿瘤类型：</p>
                      <el-select v-model="bianmamoshi" style="width:100%" placeholder="请选择">
                        <el-option
                          v-for="item in bianmas"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </div>
                    <p style="margin-top:20px;">
                      <el-button type="primary" @click="downloadtubian('dot','pdf')" :disabled="imgsrc4==''" size="mini">下载图片</el-button>
                      <!-- <el-button type="primary" @click="downloadCOX('ROC','txt')" :disabled="imgsrc4==''" size="mini">下载文本</el-button> -->
                      <el-button type="primary" @click="pinciUpdate('dot')" size="mini">更新</el-button>
                    </p>
                  </div>
                </div>
              </el-tab-pane>
              <el-tab-pane label="TCGA突变频次">
                <div class="tcga" v-loading="loading4"
                element-loading-text="拼命加载中"
                element-loading-spinner="el-icon-loading"
                element-loading-background="f5f5f5" id="view">
                  <div v-if="JSON.stringify(TC)!='{}'" style="width:800px">
                    <img :src="imgsrc44" style="width:600px;margin-top:20px;" alt="">
                  </div>
                  <div v-else>
                    <div style="width:800px;height:300px;text-align: center">
                      <img style="margin-top:100px;height:150px" src="../../public/img/none.png" alt="">
                    </div>
                  </div>
                  <div class="generight1">
                    <div class="jianyan">
                      <p class="xishu">肿瘤类型：</p>
                      <el-select v-model="bianmapinci" style="width:100%" placeholder="请选择">
                        <el-option
                          v-for="item in bianmas"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                      <p >请输入基因集：</p>
                      <el-input style="margin-top:10px" type="textarea" :rows="2" placeholder="请输入一行一个基因" v-model="geneji1">
                      </el-input>
                      <div>
                        <p style="margin-top:10px">图片宽度：<input type="number" v-model="tubianwidth"></p>
                        <p style="margin-top:10px">图片高度：<input type="number" v-model="tubianheight"></p>
                      </div>
                    </div>
                    <p style="margin-top:20px;">
                      <el-button type="primary" @click="downloadtubian('count','pdf')" :disabled="imgsrc4==''" size="mini">下载图片</el-button>
                      <!-- <el-button type="primary" @click="downloadCOX('ROC','txt')" :disabled="imgsrc4==''" size="mini">下载文本</el-button> -->
                      <el-button type="primary" @click="pinciUpdate('count')" size="mini">更新</el-button>
                    </p>
                  </div>
                </div>
              </el-tab-pane>
              <el-tab-pane label="DNA修复">
                <div v-loading="loading4"
                element-loading-text="拼命加载中"
                element-loading-spinner="el-icon-loading"
                element-loading-background="f5f5f5" id="view" class="xiangguanxing">
                  <div v-if="JSON.stringify(TC)!='{}'" style="width:800px;">
                    <img :src="imgsrc44" style="width:780px;margin-top:20px;" alt="">
                  </div>
                  <div v-else>
                    <div style="width:800px;height:300px;text-align: center">
                      <img style="margin-top:100px;height:150px" src="../../public/img/none.png" alt="">
                    </div>
                  </div>
                  <div>
                    <p >请输入基因集：</p>
                    <el-input style="margin-top:10px" type="textarea" :rows="2" placeholder="请输入一行一个基因" v-model="geneji4">
                    </el-input>
                    <p class="xishu">肿瘤类型：</p>
                    <el-select v-model="zhongliuleixing4" clearable multiple collapse-tags placeholder="请选择">
                      <el-option
                        v-for="item in bianmas"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                    <p class="xishu">方法：</p>
                    <el-select v-model="func4"  placeholder="请选择">
                      <el-option
                        v-for="item in funcs"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                    <div class="yansezhi" style="margin-top:10px">
                      <div>
                        <div>
                          <p style="margin-right:7px">最小值：</p>
                          <input type="number" class="innp1" min="-1" max="1" step="0.1" v-model="minp4">
                        </div>
                        <div>
                          <p style="margin-right:7px">中间值：</p>
                          <input type="number" class="innp1"  min="-1" max="1" step="0.1" v-model="middlep4">
                        </div>
                        <div>
                          <p style="margin-right:7px">最大值：</p>
                          <input type="number" class="innp1" min="-1" max="1" step="0.1" v-model="maxp4">
                        </div>
                        <div>
                          <p>最小p值：</p>
                          <input type="number" class="innp1" min="-1" max="1" step="0.1" v-model="minpp4">
                        </div>
                      </div>
                      <div>
                        <div class="color21">
                          <p style="margin-right:7px">最小值颜色：</p>
                          <el-color-picker v-model="mincolor4"></el-color-picker>
                        </div>
                        <div class="color21">
                          <p style="margin-right:7px">中间值颜色：</p>
                          <el-color-picker v-model="middlecolor4"></el-color-picker>
                        </div>
                        <div class="color21">
                          <p style="margin-right:7px">最大值颜色：</p>
                          <el-color-picker v-model="maxcolor4"></el-color-picker>
                        </div>
                        <div class="color21">
                          <p>最小p值颜色：</p>
                          <el-color-picker v-model="minpcolor4"></el-color-picker>
                        </div>
                      </div>
                    </div>
                    <div>
                      <p style="margin-top:10px">图片宽度：<input type="number" v-model="xiangguanwidth4"></p>
                      <p style="margin-top:10px">图片高度：<input type="number" v-model="xiangguanheight4"></p>
                    </div>
                    <div class="yanse111">
                      <p style="margin-top:10px;">
                        <el-button type="primary" @click="downloadDNA('pdf')" :disabled="imgsrc44==''" size="mini">下载图片</el-button>
                        <el-button type="primary" @click="downloadDNA('txt')" :disabled="imgsrc44==''" size="mini">下载文本</el-button>
                        <el-button type="primary" @click="DNAUpdate()" size="mini">更新</el-button>
                      </p>
                    </div>
                  </div>
                </div>
              </el-tab-pane>
            </el-tabs>
          </div>
          <div class="kegg" :id="'gene-'+5">
            <p class="uname5"><span class="username5"></span></p>
            <el-tabs :tab-position="tabPosition" @tab-click="handleClick5">
              <el-tab-pane label="甲基转移酶">
                <div v-loading="loading55"
                element-loading-text="拼命加载中"
                element-loading-spinner="el-icon-loading"
                element-loading-background="f5f5f5" id="view" class="xiangguanxing">
                  <div v-if="JSON.stringify(TC)!='{}'" style="width:800px;">
                    <img :src="imgsrc55" style="width:780px;margin-top:20px;" alt="">
                  </div>
                  <div v-else>
                    <div style="width:800px;height:300px;text-align: center">
                      <img style="margin-top:100px;height:150px" src="../../public/img/none.png" alt="">
                    </div>
                  </div>
                  <div>
                    <p >请输入基因集：</p>
                    <el-input style="margin-top:10px" type="textarea" :rows="2" placeholder="请输入一行一个基因" v-model="geneji5">
                    </el-input>
                    <p class="xishu">肿瘤类型：</p>
                    <el-select v-model="zhongliuleixing5" clearable multiple collapse-tags placeholder="请选择">
                      <el-option
                        v-for="item in bianmas"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                    <p class="xishu">方法：</p>
                    <el-select v-model="func5"  placeholder="请选择">
                      <el-option
                        v-for="item in funcs"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                    <div class="yansezhi" style="margin-top:10px">
                      <div>
                        <div>
                          <p style="margin-right:7px">最小值：</p>
                          <input type="number" class="innp1" min="-1" max="1" step="0.1" v-model="minp5">
                        </div>
                        <div>
                          <p style="margin-right:7px">中间值：</p>
                          <input type="number" class="innp1"  min="-1" max="1" step="0.1" v-model="middlep5">
                        </div>
                        <div>
                          <p style="margin-right:7px">最大值：</p>
                          <input type="number" class="innp1" min="-1" max="1" step="0.1" v-model="maxp5">
                        </div>
                        <div>
                          <p>最小p值：</p>
                          <input type="number" class="innp1" min="-1" max="1" step="0.1" v-model="minpp5">
                        </div>
                      </div>
                      <div>
                        <div class="color21">
                          <p style="margin-right:7px">最小值颜色：</p>
                          <el-color-picker v-model="mincolor5"></el-color-picker>
                        </div>
                        <div class="color21">
                          <p style="margin-right:7px">中间值颜色：</p>
                          <el-color-picker v-model="middlecolor5"></el-color-picker>
                        </div>
                        <div class="color21">
                          <p style="margin-right:7px">最大值颜色：</p>
                          <el-color-picker v-model="maxcolor5"></el-color-picker>
                        </div>
                        <div class="color21">
                          <p>最小p值颜色：</p>
                          <el-color-picker v-model="minpcolor5"></el-color-picker>
                        </div>
                      </div>
                    </div>
                    <div>
                      <p style="margin-top:10px">图片宽度：<input type="number" v-model="xiangguanwidth5"></p>
                      <p style="margin-top:10px">图片高度：<input type="number" v-model="xiangguanheight5"></p>
                    </div>
                    <div class="yanse111">
                      <p style="margin-top:10px;">
                        <el-button type="primary" @click="downloadMEI('pdf')" :disabled="imgsrc55==''" size="mini">下载图片</el-button>
                        <el-button type="primary" @click="downloadMEI('txt')" :disabled="imgsrc55==''" size="mini">下载文本</el-button>
                        <el-button type="primary" @click="MEIUpdate()" size="mini">更新</el-button>
                      </p>
                    </div>
                  </div>
                </div>
              </el-tab-pane>
              <el-tab-pane label="启动子甲基化">GTEx</el-tab-pane>
            </el-tabs>
          </div>
          <div class="kegg" :id="'gene-'+6">
            <p class="uname6"><span class="username6"></span></p>
            <el-tabs :tab-position="tabPosition" style="height: 200px;">
              <el-tab-pane label="CCLE">
              </el-tab-pane>
              <el-tab-pane label="GTEx">GTEx</el-tab-pane>
              <el-tab-pane label="TCGA">TCGA</el-tab-pane>
              <el-tab-pane label="TCGA+GTEx">TCGA+GTEx</el-tab-pane>
            </el-tabs>
          </div>
          <div class="kegg" :id="'gene-'+7">
            <p class="uname7"><span class="username7"></span></p>
            <el-tabs :tab-position="tabPosition" style="height: 200px;">
              <el-tab-pane label="CCLE">
              </el-tab-pane>
              <el-tab-pane label="GTEx">GTEx</el-tab-pane>
              <el-tab-pane label="TCGA">TCGA</el-tab-pane>
              <el-tab-pane label="TCGA+GTEx">TCGA+GTEx</el-tab-pane>
            </el-tabs>
          </div>
          <div class="kegg" :id="'gene-'+8">
            <p class="uname8"><span class="username8"></span></p>
            <el-tabs :tab-position="tabPosition" style="height: 200px;">
              <el-tab-pane label="CCLE">
              </el-tab-pane>
              <el-tab-pane label="GTEx">GTEx</el-tab-pane>
              <el-tab-pane label="TCGA">TCGA</el-tab-pane>
              <el-tab-pane label="TCGA+GTEx">TCGA+GTEx</el-tab-pane>
            </el-tabs>
          </div>
          <div class="kegg" :id="'gene-'+9">
            <p class="uname9"><span class="username9"></span></p>
            <el-tabs :tab-position="tabPosition" style="height: 200px;">
              <el-tab-pane label="CCLE">
              </el-tab-pane>
              <el-tab-pane label="GTEx">GTEx</el-tab-pane>
              <el-tab-pane label="TCGA">TCGA</el-tab-pane>
              <el-tab-pane label="TCGA+GTEx">TCGA+GTEx</el-tab-pane>
            </el-tabs>
          </div>
          <div class="kegg" :id="'gene-'+10">
            <p class="uname10"><span class="username10"></span></p>
            <el-tabs :tab-position="tabPosition" @tab-click="handleClick10">
              <el-tab-pane label="MSI">
                <div class="tcga" v-loading="loading10"
                element-loading-text="拼命加载中"
                element-loading-spinner="el-icon-loading"
                element-loading-background="f5f5f5" id="view">
                  <div v-if="JSON.stringify(TC)!='{}'" style="width:800px;">
                    <img :src="imgsrc10" style="width:800px;margin-top:20px;" alt="">
                  </div>
                  <div v-else>
                    <div style="width:800px;height:300px;text-align: center">
                      <img style="margin-top:100px;height:150px" src="../../public/img/none.png" alt="">
                    </div>
                  </div>
                  <div class="generight1">
                    <div class="jianyan">
                      <p class="xishu">肿瘤类型：</p>
                      <el-select v-model="bianmaMSI" clearable style="width:100%" multiple collapse-tags placeholder="请选择">
                        <el-option
                          v-for="item in bianmas"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </div>
                    <div class="jianyan">
                      <p class="xishu">相关性方法：</p>
                      <el-select v-model="func11"  placeholder="请选择">
                        <el-option
                          v-for="item in funcs"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </div>
                    <div class="color211"><p>颜色：</p><el-color-picker v-model="msicolor"></el-color-picker></div>
                    <div>
                      <p style="margin-top:10px">图片宽度：<input type="number" v-model="MSIwidth"></p>
                      <p style="margin-top:10px">图片高度：<input type="number" v-model="MSIheight"></p>
                    </div>
                    <p style="margin-top:20px;">
                      <el-button type="primary" @click="downloadMSI('MSI','pdf')" :disabled="imgsrc11==''" size="mini">下载图片</el-button>
                      <el-button type="primary" @click="downloadMSI('MSI','txt')" :disabled="imgsrc11==''" size="mini">下载文本</el-button>
                      <el-button type="primary" @click="MSIUpdate('MSI')" size="mini">更新</el-button>
                    </p>
                  </div>
                </div>
              </el-tab-pane>
              <el-tab-pane label="新抗原">
                <div class="tcga" v-loading="loading10"
                element-loading-text="拼命加载中"
                element-loading-spinner="el-icon-loading"
                element-loading-background="f5f5f5" id="view">
                  <div v-if="JSON.stringify(TC)!='{}'" style="width:800px;">
                    <img :src="imgsrc10" style="width:800px;margin-top:20px;" alt="">
                  </div>
                  <div v-else>
                    <div style="width:800px;height:300px;text-align: center">
                      <img style="margin-top:100px;height:150px" src="../../public/img/none.png" alt="">
                    </div>
                  </div>
                  <div class="generight1">
                    <div class="jianyan">
                      <p class="xishu">肿瘤类型：</p>
                      <el-select v-model="bianmaMSI" clearable style="width:100%" multiple collapse-tags placeholder="请选择">
                        <el-option
                          v-for="item in bianmas"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </div>
                    <div class="jianyan">
                      <p class="xishu">相关性方法：</p>
                      <el-select v-model="func11"  placeholder="请选择">
                        <el-option
                          v-for="item in funcs"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </div>
                    <div class="color211"><p>颜色：</p><el-color-picker v-model="msicolor"></el-color-picker></div>
                    <div>
                      <p style="margin-top:10px">图片宽度：<input type="number" v-model="MSIwidth"></p>
                      <p style="margin-top:10px">图片高度：<input type="number" v-model="MSIheight"></p>
                    </div>
                    <p style="margin-top:20px;">
                      <el-button type="primary" @click="downloadMSI('Neoantigen','pdf')" :disabled="imgsrc11==''" size="mini">下载图片</el-button>
                      <el-button type="primary" @click="downloadMSI('Neoantigen','txt')" :disabled="imgsrc11==''" size="mini">下载文本</el-button>
                      <el-button type="primary" @click="MSIUpdate('Neoantigen')" size="mini">更新</el-button>
                    </p>
                  </div>
                </div>
              </el-tab-pane>
              <el-tab-pane label="TMB">
                <div class="tcga" v-loading="loading10"
                element-loading-text="拼命加载中"
                element-loading-spinner="el-icon-loading"
                element-loading-background="f5f5f5" id="view">
                  <div v-if="JSON.stringify(TC)!='{}'" style="width:800px;">
                    <img :src="imgsrc10" style="width:800px;margin-top:20px;" alt="">
                  </div>
                  <div v-else>
                    <div style="width:800px;height:300px;text-align: center">
                      <img style="margin-top:100px;height:150px" src="../../public/img/none.png" alt="">
                    </div>
                  </div>
                  <div class="generight1">
                    <div class="jianyan">
                      <p class="xishu">肿瘤类型：</p>
                      <el-select v-model="bianmaMSI" clearable style="width:100%" multiple collapse-tags placeholder="请选择">
                        <el-option
                          v-for="item in bianmas"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </div>
                    <div class="jianyan">
                      <p class="xishu">相关性方法：</p>
                      <el-select v-model="func11"  placeholder="请选择">
                        <el-option
                          v-for="item in funcs"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </div>
                    <div class="color211"><p>颜色：</p><el-color-picker v-model="msicolor"></el-color-picker></div>
                    <div>
                      <p style="margin-top:10px">图片宽度：<input type="number" v-model="MSIwidth"></p>
                      <p style="margin-top:10px">图片高度：<input type="number" v-model="MSIheight"></p>
                    </div>
                    <p style="margin-top:20px;">
                      <el-button type="primary" @click="downloadMSI('TMB','pdf')" :disabled="imgsrc11==''" size="mini">下载图片</el-button>
                      <el-button type="primary" @click="downloadMSI('TMB','txt')" :disabled="imgsrc11==''" size="mini">下载文本</el-button>
                      <el-button type="primary" @click="MSIUpdate('TMB')" size="mini">更新</el-button>
                    </p>
                  </div>
                </div>
              </el-tab-pane>
              <el-tab-pane label="免疫检查点">
                <div v-loading="loading10"
                element-loading-text="拼命加载中"
                element-loading-spinner="el-icon-loading"
                element-loading-background="f5f5f5" id="view" class="xiangguanxing">
                  <div v-if="JSON.stringify(TC)!='{}'" style="width:800px;">
                    <img :src="imgsrc10" style="width:800px;margin-top:20px;" alt="">
                  </div>
                  <div v-else>
                    <div style="width:800px;height:300px;text-align: center">
                      <img style="margin-top:100px;height:150px" src="../../public/img/none.png" alt="">
                    </div>
                  </div>
                  <div>
                    <p class="xishu">肿瘤类型：</p>
                    <el-select v-model="zhongliuleixing10" clearable multiple collapse-tags placeholder="请选择">
                      <el-option
                        v-for="item in bianmas"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                    <p class="xishu">方法：</p>
                    <el-select v-model="func10"  placeholder="请选择">
                      <el-option
                        v-for="item in funcs"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                    <div class="fazhi">
                      <p>P值：<input type="number" class="innp1" min="-1" max="1" step="0.01" v-model="p10"></p>
                      <p>R值：<input type="number" class="innp1" min="-1" max="1" step="0.1" v-model="r10"></p>
                    </div>
                    <div class="yansezhi" style="margin-top:10px">
                      <div>
                        <div>
                          <p style="margin-right:7px">最小值：</p>
                          <input type="number" class="innp1" min="-1" max="1" step="0.1" v-model="minp10">
                        </div>
                        <div>
                          <p style="margin-right:7px">中间值：</p>
                          <input type="number" class="innp1"  min="-1" max="1" step="0.1" v-model="middlep10">
                        </div>
                        <div>
                          <p style="margin-right:7px">最大值：</p>
                          <input type="number" class="innp1" min="-1" max="1" step="0.1" v-model="maxp10">
                        </div>
                        <div>
                          <p>最小p值：</p>
                          <input type="number" class="innp1" min="-1" max="1" step="0.1" v-model="minpp10">
                        </div>
                      </div>
                      <div>
                        <div class="color21">
                          <p style="margin-right:7px">最小值颜色：</p>
                          <el-color-picker v-model="mincolor10"></el-color-picker>
                        </div>
                        <div class="color21">
                          <p style="margin-right:7px">中间值颜色：</p>
                          <el-color-picker v-model="middlecolor10"></el-color-picker>
                        </div>
                        <div class="color21">
                          <p style="margin-right:7px">最大值颜色：</p>
                          <el-color-picker v-model="maxcolor10"></el-color-picker>
                        </div>
                        <div class="color21">
                          <p>最小p值颜色：</p>
                          <el-color-picker v-model="minpcolor10"></el-color-picker>
                        </div>
                      </div>
                    </div>
                    <div>
                      <p style="margin-top:10px">图片宽度：<input type="number" v-model="mianyiwidth10"></p>
                      <p style="margin-top:10px">图片高度：<input type="number" v-model="mianyiheight10"></p>
                    </div>
                    <div class="yanse111">
                      <p style="margin-top:10px;">
                        <el-button type="primary" @click="downloadMY('checkpoints','pdf')" :disabled="imgsrc10==''" size="mini">下载图片</el-button>
                        <el-button type="primary" @click="downloadMY('checkpoints','txt')" :disabled="imgsrc10==''" size="mini">下载文本</el-button>
                        <el-button type="primary" @click="MYUpdate('checkpoints')" size="mini">更新</el-button>
                      </p>
                    </div>
                  </div>
                </div>
              </el-tab-pane>
              <el-tab-pane label="免疫微环境">
                <div v-loading="loading10"
                element-loading-text="拼命加载中"
                element-loading-spinner="el-icon-loading"
                element-loading-background="f5f5f5" id="view" class="xiangguanxing">
                  <div v-if="JSON.stringify(TC)!='{}'" style="width:800px;">
                    <img :src="imgsrc10" style="width:800px;margin-top:20px;" alt="">
                  </div>
                  <div v-else>
                    <div style="width:800px;height:300px;text-align: center">
                      <img style="margin-top:100px;height:150px" src="../../public/img/none.png" alt="">
                    </div>
                  </div>
                  <div>
                    <p class="xishu">肿瘤类型：</p>
                    <el-select v-model="zhongliuleixing10" clearable multiple collapse-tags placeholder="请选择">
                      <el-option
                        v-for="item in bianmas"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                    <p class="xishu">方法：</p>
                    <el-select v-model="func10"  placeholder="请选择">
                      <el-option
                        v-for="item in funcs"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                    <div class="fazhi">
                      <p>P值：<input type="number" class="innp1" min="-1" max="1" step="0.01" v-model="p10"></p>
                      <p>R值：<input type="number" class="innp1" min="-1" max="1" step="0.1" v-model="r10"></p>
                    </div>
                    <div class="yansezhi" style="margin-top:10px">
                      <div>
                        <div>
                          <p style="margin-right:7px">最小值：</p>
                          <input type="number" class="innp1" min="-1" max="1" step="0.1" v-model="minp10">
                        </div>
                        <div>
                          <p style="margin-right:7px">中间值：</p>
                          <input type="number" class="innp1"  min="-1" max="1" step="0.1" v-model="middlep10">
                        </div>
                        <div>
                          <p style="margin-right:7px">最大值：</p>
                          <input type="number" class="innp1" min="-1" max="1" step="0.1" v-model="maxp10">
                        </div>
                        <div>
                          <p>最小p值：</p>
                          <input type="number" class="innp1" min="-1" max="1" step="0.1" v-model="minpp10">
                        </div>
                      </div>
                      <div>
                        <div class="color21">
                          <p style="margin-right:7px">最小值颜色：</p>
                          <el-color-picker v-model="mincolor10"></el-color-picker>
                        </div>
                        <div class="color21">
                          <p style="margin-right:7px">中间值颜色：</p>
                          <el-color-picker v-model="middlecolor10"></el-color-picker>
                        </div>
                        <div class="color21">
                          <p style="margin-right:7px">最大值颜色：</p>
                          <el-color-picker v-model="maxcolor10"></el-color-picker>
                        </div>
                        <div class="color21">
                          <p>最小p值颜色：</p>
                          <el-color-picker v-model="minpcolor10"></el-color-picker>
                        </div>
                      </div>
                    </div>
                    <div>
                      <p style="margin-top:10px">图片宽度：<input type="number" v-model="mianyiwidth10"></p>
                      <p style="margin-top:10px">图片高度：<input type="number" v-model="mianyiheight10"></p>
                    </div>
                    <div class="yanse111">
                      <p style="margin-top:10px;">
                        <el-button type="primary" @click="downloadMY('ESTIMATE','pdf')" :disabled="imgsrc10==''" size="mini">下载图片</el-button>
                        <el-button type="primary" @click="downloadMY('ESTIMATE','txt')" :disabled="imgsrc10==''" size="mini">下载文本</el-button>
                        <el-button type="primary" @click="MYUpdate('ESTIMATE')" size="mini">更新</el-button>
                      </p>
                    </div>
                  </div>
                </div>
              </el-tab-pane>
              <el-tab-pane label="免疫细胞评分">
                <div v-loading="loading10"
                element-loading-text="拼命加载中"
                element-loading-spinner="el-icon-loading"
                element-loading-background="f5f5f5" id="view" class="xiangguanxing">
                  <div v-if="JSON.stringify(TC)!='{}'" style="width:800px;">
                    <img :src="imgsrc10" style="width:800px;margin-top:20px;" alt="">
                  </div>
                  <div v-else>
                    <div style="width:800px;height:300px;text-align: center">
                      <img style="margin-top:100px;height:150px" src="../../public/img/none.png" alt="">
                    </div>
                  </div>
                  <div>
                    <p class="xishu">肿瘤类型：</p>
                    <el-select v-model="zhongliuleixing10" clearable multiple collapse-tags placeholder="请选择">
                      <el-option
                        v-for="item in bianmas"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                    <p class="xishu">方法：</p>
                    <el-select v-model="func10"  placeholder="请选择">
                      <el-option
                        v-for="item in funcs"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                    <el-radio-group v-model="XBPF" style="margin-top:10px;">
                      <el-radio label="Timer">Timer</el-radio>
                      <el-radio label="MCPcounter">MCPcounter</el-radio>
                    </el-radio-group>
                    <div class="fazhi">
                      <p>P值：<input type="number" class="innp1" min="-1" max="1" step="0.01" v-model="p10"></p>
                      <p>R值：<input type="number" class="innp1" min="-1" max="1" step="0.1" v-model="r10"></p>
                    </div>
                    <div class="yansezhi" style="margin-top:10px">
                      <div>
                        <div>
                          <p style="margin-right:7px">最小值：</p>
                          <input type="number" class="innp1" min="-1" max="1" step="0.1" v-model="minp10">
                        </div>
                        <div>
                          <p style="margin-right:7px">中间值：</p>
                          <input type="number" class="innp1"  min="-1" max="1" step="0.1" v-model="middlep10">
                        </div>
                        <div>
                          <p style="margin-right:7px">最大值：</p>
                          <input type="number" class="innp1" min="-1" max="1" step="0.1" v-model="maxp10">
                        </div>
                        <div>
                          <p>最小p值：</p>
                          <input type="number" class="innp1" min="-1" max="1" step="0.1" v-model="minpp10">
                        </div>
                      </div>
                      <div>
                        <div class="color21">
                          <p style="margin-right:7px">最小值颜色：</p>
                          <el-color-picker v-model="mincolor10"></el-color-picker>
                        </div>
                        <div class="color21">
                          <p style="margin-right:7px">中间值颜色：</p>
                          <el-color-picker v-model="middlecolor10"></el-color-picker>
                        </div>
                        <div class="color21">
                          <p style="margin-right:7px">最大值颜色：</p>
                          <el-color-picker v-model="maxcolor10"></el-color-picker>
                        </div>
                        <div class="color21">
                          <p>最小p值颜色：</p>
                          <el-color-picker v-model="minpcolor10"></el-color-picker>
                        </div>
                      </div>
                    </div>
                    <div>
                      <p style="margin-top:10px">图片宽度：<input type="number" v-model="mianyiwidth10"></p>
                      <p style="margin-top:10px">图片高度：<input type="number" v-model="mianyiheight10"></p>
                    </div>
                    <div class="yanse111">
                      <p style="margin-top:10px;">
                        <el-button type="primary" @click="downloadMY('pingfen','pdf')" :disabled="imgsrc10==''" size="mini">下载图片</el-button>
                        <el-button type="primary" @click="downloadMY('pingfen','txt')" :disabled="imgsrc10==''" size="mini">下载文本</el-button>
                        <el-button type="primary" @click="MYUpdate('pingfen')" size="mini">更新</el-button>
                      </p>
                    </div>
                  </div>
                </div>
              </el-tab-pane>
              <el-tab-pane label="免疫途径">
                <div v-loading="loading10"
                element-loading-text="拼命加载中"
                element-loading-spinner="el-icon-loading"
                element-loading-background="f5f5f5" id="view" class="xiangguanxing">
                  <div v-if="JSON.stringify(TC)!='{}'" style="width:800px;">
                    <img :src="imgsrc10" style="width:800px;margin-top:20px;" alt="">
                  </div>
                  <div v-else>
                    <div style="width:800px;height:300px;text-align: center">
                      <img style="margin-top:100px;height:150px" src="../../public/img/none.png" alt="">
                    </div>
                  </div>
                  <div>
                    <p class="xishu">肿瘤类型：</p>
                    <el-select v-model="zhongliuleixing10" clearable multiple collapse-tags placeholder="请选择">
                      <el-option
                        v-for="item in bianmas"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                    <p class="xishu">方法：</p>
                    <el-select v-model="func10"  placeholder="请选择">
                      <el-option
                        v-for="item in funcs"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                    <div class="fazhi">
                      <p>P值：<input type="number" class="innp1" min="-1" max="1" step="0.01" v-model="p10"></p>
                      <p>R值：<input type="number" class="innp1" min="-1" max="1" step="0.1" v-model="r10"></p>
                    </div>
                    <div class="yansezhi" style="margin-top:10px">
                      <div>
                        <div>
                          <p style="margin-right:7px">最小值：</p>
                          <input type="number" class="innp1" min="-1" max="1" step="0.1" v-model="minp10">
                        </div>
                        <div>
                          <p style="margin-right:7px">中间值：</p>
                          <input type="number" class="innp1"  min="-1" max="1" step="0.1" v-model="middlep10">
                        </div>
                        <div>
                          <p style="margin-right:7px">最大值：</p>
                          <input type="number" class="innp1" min="-1" max="1" step="0.1" v-model="maxp10">
                        </div>
                        <div>
                          <p>最小p值：</p>
                          <input type="number" class="innp1" min="-1" max="1" step="0.1" v-model="minpp10">
                        </div>
                      </div>
                      <div>
                        <div class="color21">
                          <p style="margin-right:7px">最小值颜色：</p>
                          <el-color-picker v-model="mincolor10"></el-color-picker>
                        </div>
                        <div class="color21">
                          <p style="margin-right:7px">中间值颜色：</p>
                          <el-color-picker v-model="middlecolor10"></el-color-picker>
                        </div>
                        <div class="color21">
                          <p style="margin-right:7px">最大值颜色：</p>
                          <el-color-picker v-model="maxcolor10"></el-color-picker>
                        </div>
                        <div class="color21">
                          <p>最小p值颜色：</p>
                          <el-color-picker v-model="minpcolor10"></el-color-picker>
                        </div>
                      </div>
                    </div>
                    <div>
                      <p style="margin-top:10px">图片宽度：<input type="number" v-model="mianyiwidth10"></p>
                      <p style="margin-top:10px">图片高度：<input type="number" v-model="mianyiheight10"></p>
                    </div>
                    <div class="yanse111">
                      <p style="margin-top:10px;">
                        <el-button type="primary" @click="downloadMY('PMID28052254','pdf')" :disabled="imgsrc10==''" size="mini">下载图片</el-button>
                        <el-button type="primary" @click="downloadMY('PMID28052254','txt')" :disabled="imgsrc10==''" size="mini">下载文本</el-button>
                        <el-button type="primary" @click="MYUpdate('PMID28052254')" size="mini">更新</el-button>
                      </p>
                    </div>
                  </div>
                </div>
              </el-tab-pane>
            </el-tabs>
          </div>
          <div class="kegg" :id="'gene-'+11">
            <p class="uname11"><span class="username11"></span></p>
            <el-tabs :tab-position="tabPosition" @tab-click="handleClick11">
              <el-tab-pane label="COX">
                <div class="tcga" v-loading="loading12"
                element-loading-text="拼命加载中"
                element-loading-spinner="el-icon-loading"
                element-loading-background="f5f5f5" id="view">
                  <div v-if="JSON.stringify(TC)!='{}'" style="width:800px;">
                    <img :src="imgsrc11" style="width:800px;margin-top:20px;" alt="">
                  </div>
                  <div v-else>
                    <div style="width:800px;height:300px;text-align: center">
                      <img style="margin-top:100px;height:150px" src="../../public/img/none.png" alt="">
                    </div>
                  </div>
                  <div class="generight1">
                    <div class="jianyan">
                      <p class="xishu">肿瘤类型：</p>
                      <el-select v-model="bianma" clearable style="width:100%" multiple collapse-tags placeholder="请选择">
                        <el-option
                          v-for="item in bianmas"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </div>
                    <div class="jianyan">
                      <p class="xishu">预后类型：</p>
                      <el-radio-group v-model="xitong">
                        <el-radio label="OS"></el-radio>
                        <el-radio label="DSS"></el-radio>
                        <el-radio label="DFI"></el-radio>
                        <el-radio label="PFI"></el-radio>
                      </el-radio-group>
                    </div>
                    <p style="margin-top:20px;">
                      <el-button type="primary" @click="downloadCOX('cox','pdf')" :disabled="imgsrc11==''" size="mini">下载图片</el-button>
                      <el-button type="primary" @click="downloadCOX('cox','txt')" :disabled="imgsrc11==''" size="mini">下载文本</el-button>
                      <el-button type="primary" @click="KMUpdate('cox')" size="mini">更新</el-button>
                    </p>
                  </div>
                </div>
              </el-tab-pane>
              <el-tab-pane label="KM">
                <div class="tcga" v-loading="loading12"
                element-loading-text="拼命加载中"
                element-loading-spinner="el-icon-loading"
                element-loading-background="f5f5f5" id="view">
                  <div v-if="JSON.stringify(TC)!='{}'" style="width:800px;">
                    <img :src="imgsrc11" style="width:800px;margin-top:20px;" alt="">
                  </div>
                  <div v-else>
                    <div style="width:800px;height:300px;text-align: center">
                      <img style="margin-top:100px;height:150px" src="../../public/img/none.png" alt="">
                    </div>
                  </div>
                  <div class="generight1">
                    <div class="jianyan">
                      <p class="xishu">肿瘤类型：</p>
                      <el-select v-model="bianmaKM" clearable style="width:100%" placeholder="请选择">
                        <el-option
                          v-for="item in bianmas"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </div>
                    <div class="jianyan">
                      <p class="xishu">预后类型：</p>
                      <el-radio-group v-model="xitong">
                        <el-radio label="OS"></el-radio>
                        <el-radio label="DSS"></el-radio>
                        <el-radio label="DFI"></el-radio>
                        <el-radio label="PFI"></el-radio>
                      </el-radio-group>
                      <p class="xishu"><span>Cutoff-High(%)：</span><input type="number" class="innp" step="1" min="0" max="100" v-model="CutoffHigh"></p>
                      <p class="xishu"><span>Cutoff-Low(%)：</span><input type="number" class="innp" step="1" min="0" max="100" v-model="CutoffLow"></p>
                    </div>
                    <p style="margin-top:20px;">
                      <el-button type="primary" @click="downloadCOX('km','pdf')" :disabled="imgsrc11==''" size="mini">下载图片</el-button>
                      <el-button type="primary" @click="downloadCOX('km','txt')" :disabled="imgsrc11==''" size="mini">下载文本</el-button>
                      <el-button type="primary" @click="KMUpdate('km')" size="mini">更新</el-button>
                    </p>
                  </div>
                </div>
              </el-tab-pane>
              <el-tab-pane label="ROC">
                <div class="tcga" v-loading="loading12"
                element-loading-text="拼命加载中"
                element-loading-spinner="el-icon-loading"
                element-loading-background="f5f5f5" id="view">
                  <div v-if="JSON.stringify(TC)!='{}'" style="width:800px;">
                    <img :src="imgsrc11" style="width:800px;margin-top:20px;" alt="">
                  </div>
                  <div v-else>
                    <div style="width:800px;height:300px;text-align: center">
                      <img style="margin-top:100px;height:150px" src="../../public/img/none.png" alt="">
                    </div>
                  </div>
                  <div class="generight1">
                    <div class="jianyan">
                      <p class="xishu">肿瘤类型：</p>
                      <el-select v-model="bianmaROC" clearable style="width:100%" placeholder="请选择">
                        <el-option
                          v-for="item in bianmas"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </div>
                    <div class="jianyan">
                      <p class="xishu">预后类型：</p>
                      <el-radio-group v-model="xitong">
                        <el-radio label="OS"></el-radio>
                        <el-radio label="DSS"></el-radio>
                        <el-radio label="DFI"></el-radio>
                        <el-radio label="PFI"></el-radio>
                      </el-radio-group>
                    </div>
                    <p style="margin-top:20px;">
                      <el-button type="primary" @click="downloadCOX('roc','pdf')" :disabled="imgsrc11==''" size="mini">下载图片</el-button>
                      <el-button type="primary" @click="downloadCOX('roc','txt')" :disabled="imgsrc11==''" size="mini">下载文本</el-button>
                      <el-button type="primary" @click="KMUpdate('roc')" size="mini">更新</el-button>
                    </p>
                  </div>
                </div>
              </el-tab-pane>
            </el-tabs>
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
export default {
  metaInfo() {
    return {title: this.genesDetails.name + '-基因搜索'} // set a title
  },
  data() {
    return {
      genesDetails:{},searchContent:'',Aliases:[],tabPosition: 'right',Descs1:[],Descs:[],Descs2:[],list:["别名","KEGG","Gene Ontology","Gene Expression","SNV analysis","methylation analysis","miRNA-TF-Gene Network","Predict CeRNA","Protein-Protein network","Gene-drug predict","Gene-Immune Analysis","Gene-KM plotter"],
      search1: '',gene2KeggMapList:[],activeName: 'kegg',num:0,Id:'',f:[],ac:[],guanShow:false,gene2GoList:[],kegg2RelationTwo1:[],
      search2: '',color:'#4285f4',color1:'#ff6b00',radio:'T检验',input1:0,input2:0,input:0.5,
      options:[{value: '0',label: '0'},{value: '15',label: '15'},{value: '30',label: '30'},{value: '45',label: '45'},{value: '75',label: '75'},{value: '90',label: '90'}],value:'45',edg:'45',input3:0,input4:0,radio1:'F',radio2:'F',func:"spearman",func11:"pearson",
      options1:[{value: 'tl',label: '左上角'},{value: 'bl',label: '左下角'},{value: 'tr',label: '右上角'},{value: 'br',label: '右下角'}],value1:'tl',
      m:'T',imgsrc:"",imgsrc2:'',imgsrc3:'',loading1:false,loading2:false,loading3:false,loading4:false,pathway:['ACC'],pathway1:['ACC'],pathway2:'ACC',pathwayvalue:[{value:'ACC',label:'ACC'},{value:'BLCA',label:'BLCA'},{value:'BRCA',label:'BRCA'},{value:'CESC',label:'CESC'},{value:'CHOL',label:'CHOL'},{value:'COAD',label:'COAD'},{value:'DLBC',label:'DLBC'},{value:'ESCA',label:'ESCA'},{value:'GBM',label:'GBM'},{value:'HNSC',label:'HNSC'},{value:'KICH',label:'KICH'},{value:'KIRC',label:'KIRC'},{value:'KIRP',label:'KIRP'},{value:'LAML',label:'LAML'},{value:'LGG',label:'LGG'},{value:'LIHC',label:'LIHC'},{value:'LUAD',label:'LUAD'},{value:'LUSC',label:'LUSC'},{value:'MESO',label:'MESO'},{value:'OV',label:'OV'},{value:'PAAD',label:'PAAD'},{value:'PCPG',label:'PCPG'},{value:'PRAD',label:'PRAD'},{value:'READ',label:'READ'},{value:'SARC',label:'SARC'},{value:'SKCM',label:'SKCM'},{value:'SRAC',label:'SRAC'},{value:'STAD',label:'STAD'},{value:'TGCT',label:'TGCT'},{value:'THCA',label:'THCA'},{value:'THYM',label:'THYM'},{value:'UCEC',label:'UCEC'},{value:'UCS',label:'UCS'},{value:'UVM',label:'UVM'}],TC:{},GT:{},
      funcvalue:[{value:'spearman',label:'spearman'},{value:'kendall',label:'kendall'},{value:'pearson',label:'pearson'}],
      input5:0.1,input6:0.05,nodes:[],links:[],imgsrc4:'',imgsrc5:'',input7:0.1,input8:0.05,nodes1:[],links1:[],undata3:{},undata2:{},loading5:false,undata4:{},
      gene1:'',shoucang1:require('../../public/img/shoucang.png'),shoucang2:'收藏',shoucang10:require('../../public/img/shoucangactive.png'),phone:"",shoucang11:"取消收藏",co1:'',geneId:'',tankuang:false,imgsrc6:'',loading10:false,loading11:false,undata5:'',
      fanai:'',shujuleixing:'GTEx',fanai:'',mess:false,loading12:false,imgsrc11:'',loading4:false,imgsrc44:'',
      bianma:['GBM','OV','LUAD','LUSC','PRAD','UCEC','BLCA','TGCT','ESCA','PAAD','KIRP','LIHC','CESC','SARC','BRCA','THYN','MESO','COAD','STAD','SKCM','CHOL','KIRC','THCA','HNSC','LAML','READ','LGG','DLBC','KICH','UCS','ACC','PCPG','UVM'],yuhou:'OS',bianmaMSI:['GBM','OV','LUAD','LUSC','PRAD','UCEC','BLCA','TGCT','ESCA','PAAD','KIRP','LIHC','CESC','SARC','BRCA','THYN','MESO','COAD','STAD','SKCM','CHOL','KIRC','THCA','HNSC','LAML','READ','LGG','DLBC','KICH','UCS','ACC','PCPG','UVM'],
      bianmas:[{value: 'GBM',label: 'GBM'},{value: 'OV',label: 'OV'},{value: 'LUAD',label: 'LUAD'},{value: 'LUSC',label: 'LUSC'},{value: 'PRAD',label: 'PRAD'},{value: 'UCEC',label: 'UCEC'},{value: 'BLCA',label: 'BLCA'},{value: 'TGCT',label: 'TGCT'},{value: 'ESCA',label: 'ESCA'},{value: 'PAAD',label: 'PAAD'},{value: 'KIRP',label: 'KIRP'},{value: 'LIHC',label: 'LIHC'},{value: 'CESC',label: 'CESC'},{value: 'SARC',label: 'SARC'},{value: 'BRCA',label: 'BRCA'},{value: 'THYN',label: 'THYN'},{value: 'MESO',label: 'MESO'},{value: 'COAD',label: 'COAD'},{value: 'STAD',label: 'STAD'},{value: 'SKCM',label: 'SKCM'},{value: 'CHOL',label: 'CHOL'},{value: 'KIRC',label: 'KIRC'},{value: 'THCA',label: 'THCA'},{value: 'HNSC',label: 'HNSC'},{value: 'LAML',label: 'LAML'},{value: 'READ',label: 'READ'},{value: 'LGG',label: 'LGG'},{value: 'DLBC',label: 'DLBC'},{value: 'KICH',label: 'KICH'},{value: 'UCS',label: 'UCS'},{value: 'ACC',label: 'ACC'},{value: 'PCPG',label: 'PCPG'},{value: 'UVM',label: 'UVM'}],
      xitong:'OS',bianmaKM:'GBM',CutoffHigh:50,CutoffLow:50,bianmaROC:"GBM",geneji:`BTLA
CD200
TNFRSF14
NRP1
LAIR1
TNFSF4
CD244
LAG3
ICOS
CD40LG
CTLA4
CD48
CD28
CD200R1
HAVCR2
ADORA2A
CD276
KIR3DL1
CD80
PDCD1
LGALS9
CD160
TNFSF14
IDO2
ICOSLG
TMIGD2
VTCN1
IDO1
PDCD1LG2
HHLA2
TNFSF18
BTNL2
CD70
TNFSF9
TNFRSF8
CD27
TNFRSF25
VSIR
TNFRSF4
CD40
TNFRSF18
TNFSF15
TIGIT
CD274
CD86
CD44
TNFRSF9`,zhongliuleixing:['GBM','OV','LUAD','LUSC','PRAD','UCEC','BLCA','TGCT','ESCA','PAAD','KIRP','LIHC','CESC','SARC','BRCA','THYN','MESO','COAD','STAD','SKCM','CHOL','KIRC','THCA','HNSC','LAML','READ','LGG','DLBC','KICH','UCS','ACC','PCPG','UVM'],func:'pearson',funcs:[{value: 'pearson',label: 'pearson'},{value: 'kendall',label: 'kendall'},{value: 'spearman',label: 'spearman'}],minp:-1,middlep:0,maxp:1,func1:'pearson',zhongliuleixing10:['GBM','OV','LUAD','LUSC','PRAD','UCEC','BLCA','TGCT','ESCA','PAAD','KIRP','LIHC','CESC','SARC','BRCA','THYN','MESO','COAD','STAD','SKCM','CHOL','KIRC','THCA','HNSC','LAML','READ','LGG','DLBC','KICH','UCS','ACC','PCPG','UVM'],func10:'pearson',minp10:-1,middlep10:0,maxp10:1,mincolor10:'#0000ff',middlecolor10:'#ffffff',maxcolor10:'#ff0000',minpp10:0.001,minpcolor10:'#00ff00',mianyiwidth10:800,mianyiheight10:600,p10:0.05,r10:0.1,XBPF:'Timer',
      mincolor:'#0000ff',middlecolor:'#ffffff',maxcolor:'#ff0000',minpp:0.001,minpcolor:'#00ff00',bianmapinci:'ACC',bianmamoshi:'ACC',imgsrcxiangguan:"",
      geneji1:`BTLA
CD200
TNFRSF14
NRP1
LAIR1
TNFSF4
CD244
LAG3
ICOS
CD40LG
CTLA4
CD48
CD28
CD200R1
HAVCR2
ADORA2A
CD276
KIR3DL1
CD80
PDCD1
LGALS9
CD160
TNFSF14
IDO2
ICOSLG
TMIGD2
VTCN1
IDO1
PDCD1LG2
HHLA2
TNFSF18
BTNL2
CD70
TNFSF9
TNFRSF8
CD27
TNFRSF25
VSIR
TNFRSF4
CD40
TNFRSF18
TNFSF15
TIGIT
CD274
CD86
CD44
TNFRSF9`,
      geneji4:`MLH1
MSH2
MSH6
PMS2
EPCAM`,zhongliuleixing4:['GBM','OV','LUAD','LUSC','PRAD','UCEC','BLCA','TGCT','ESCA','PAAD','KIRP','LIHC','CESC','SARC','BRCA','THYN','MESO','COAD','STAD','SKCM','CHOL','KIRC','THCA','HNSC','LAML','READ','LGG','DLBC','KICH','UCS','ACC','PCPG','UVM'],func4:'pearson',minp4:-1,middlep4:0,maxp4:1,mincolor4:'#0000ff',middlecolor4:'#ffffff',maxcolor4:'#ff0000',minpp4:0.001,minpcolor4:'#00ff00',xiangguanwidth4:800,xiangguanheight4:600,
      loading55:false,imgsrc55:'',geneji5:`DNMT1
DNMT2
DNMT3A
DNMT3B`,zhongliuleixing5:['GBM','OV','LUAD','LUSC','PRAD','UCEC','BLCA','TGCT','ESCA','PAAD','KIRP','LIHC','CESC','SARC','BRCA','THYN','MESO','COAD','STAD','SKCM','CHOL','KIRC','THCA','HNSC','LAML','READ','LGG','DLBC','KICH','UCS','ACC','PCPG','UVM'],func5:'pearson',minp5:-1,middlep5:0,maxp5:1,mincolor5:'#0000ff',middlecolor5:'#ffffff',maxcolor5:'#ff0000',minpp5:0.001,minpcolor5:'#00ff00',xiangguanwidth5:800,xiangguanheight5:600,
      xiangguanwidth:800,xiangguanheight:600,tubianwidth:600,tubianheight:600,loading10:false,imgsrc10:"",msicolor:'#0000ff',MSIwidth:8,MSIheight:6
    
    }
  },
  components:{
    Header,Footer
  },
  created(){
   
  },
  mounted() {
    
  },
  destroyed () {
    
  },
  updated () {
    this.createCytoscape()
    this.tongliguanxi()
    this.tongliguanxi1()
    
    this.bpxiangguan()
    this.bpxiangguan1()
    this.bpxiangguan2()
  },
  beforeUpdate () {
    
    
  },
  beforeDestroy () {
  },
  
  watch: {

  },
  computed: {
    data1: {
      get: function(){
        return this.Aliases; // 在这里把临时对象的值通过计算属性赋值给页面中用到的对象
      }
    },
    data2: {
      get: function(){
        return this.Descs1; // 在这里把临时对象的值通过计算属性赋值给页面中用到的对象
      }
    },
    data3: {
      get: function(){
        return this.Descs2; // 在这里把临时对象的值通过计算属性赋值给页面中用到的对象
      }
    },
    
  },
  activated(){
    this.getRouterData();
    this.Searcher1();
    this.Undate()
    this.existsGene()
    this.pinciUpdate('dot')
    this.KMUpdate('cox')
    this.MSIUpdate('MSI')
    this.MEIUpdate()
  },
  methods: {
    downloadMSI(aa,re){
      this.mess=true
      // var a = this.geneji.split(/[\n,]/g)
      // var s = a.toString()
      this.axios.get(`/pubmed/getTcgaMsiTmbNgenCorByGeneID`,{params:{
        geneId:this.Id,
        c:this.bianmaMSI.toString(),
        m:this.func11,
        p:aa,
        d:this.msicolor.substring(1).toLowerCase(),
        f:re,
        v: this.MSIheight,
        w: this.MSIwidth
      },responseType: 'blob'}).then(result=>{
        if(result.status ==200){
          this.mess=false
          const elink = document.createElement('a')
          const fileName = this.searchContent+'+'+aa+'.'+re
          elink.download = fileName
          elink.style.display = 'none'
          elink.href = URL.createObjectURL(result.data)
          document.body.appendChild(elink)
          elink.click()
          URL.revokeObjectURL(elink.href) // 释放URL 对象
          document.body.removeChild(elink)
        }
      })
    },
    MSIUpdate(aa){
      this.loading10=true
      // var a = this.geneji.split(/[\n,]/g)
      // var s = a.toString()
      this.axios.get(`/pubmed/getTcgaMsiTmbNgenCorByGeneID`,{params:{
        geneId:this.Id,
        c:this.bianmaMSI.toString(),
        m:this.func11,
        p:aa,
        d:this.msicolor.substring(1).toLowerCase(),
        f:'png',
        v: this.MSIheight,
        w: this.MSIwidth
      }}).then(result=>{
        this.TC=result.data
        if(JSON.stringify(this.TC)!='{}' && result.data!=undefined){
          this.imgsrc10=`data:image/png;base64,${result.data.fileBase64}`
        }
        if(result.status==200){
          this.loading10=false
        }
      })
    },
    downloadMY(aa,re){
      var bb=''
      if(aa == 'pingfen'){
        bb = this.XBPF
      }else{
        bb = aa
      }
      this.mess=true
      // var a = this.geneji.split(/[\n,]/g)
      // var s = a.toString()
      this.axios.get(`/pubmed/getTCGAimmucorByGeneID`,{params:{
        geneId:this.Id,
        c:this.zhongliuleixing10.toString(),
        y:bb,
        m:this.func10,
        t:this.p10,
        r:this.r10,
        n:this.minp10,
        d:this.middlep10,
        x:this.maxp10,
        p:this.minpp10,
        l:this.mincolor10.substring(1).toLowerCase(),
        q:this.middlecolor10.substring(1).toLowerCase(),
        z:this.maxcolor10.substring(1).toLowerCase(),
        a:this.minpcolor10.substring(1).toLowerCase(),
        f:re,
        v: this.mianyiheight10,
        w: this.mianyiwidth10
      },responseType: 'blob'}).then(result=>{
        if(result.status ==200){
          this.mess=false
          const elink = document.createElement('a')
          const fileName = this.searchContent+'+'+aa+'.'+re
          elink.download = fileName
          elink.style.display = 'none'
          elink.href = URL.createObjectURL(result.data)
          document.body.appendChild(elink)
          elink.click()
          URL.revokeObjectURL(elink.href) // 释放URL 对象
          document.body.removeChild(elink)
        }
      })
    },
    MYUpdate(aa){
      var bb=''
      if(aa == 'pingfen'){
        bb = this.XBPF
      }else{
        bb = aa
      }
      this.loading10=true
      // var a = this.geneji.split(/[\n,]/g)
      // var s = a.toString()
      this.axios.get(`/pubmed/getTCGAimmucorByGeneID`,{params:{
        geneId:this.Id,
        c:this.zhongliuleixing10.toString(),
        y:bb,
        m:this.func10,
        t:this.p10,
        r:this.r10,
        n:this.minp10,
        d:this.middlep10,
        x:this.maxp10,
        p:this.minpp10,
        l:this.mincolor10.substring(1).toLowerCase(),
        q:this.middlecolor10.substring(1).toLowerCase(),
        z:this.maxcolor10.substring(1).toLowerCase(),
        a:this.minpcolor10.substring(1).toLowerCase(),
        f:'png',
        v: this.mianyiheight10,
        w: this.mianyiwidth10
      }}).then(result=>{
        this.TC=result.data
        if(JSON.stringify(this.TC)!='{}' && result.data!=undefined){
          this.imgsrc10=`data:image/png;base64,${result.data.fileBase64}`
        }
        if(result.status==200){
          this.loading10=false
        }
      })
    },
    downloadXG(re){
      this.mess=true
      // var a = this.geneji.split(/[\n,]/g)
      // var s = a.toString()
      this.axios.get(`/pubmed/getCustomGeneCor`,{params:{
        geneId:this.searchContent.toUpperCase(),
        c:this.zhongliuleixing.toString(),
        j:this.geneji,
        m:this.func,
        n:this.minp,
        d:this.middlep,
        x:this.maxp,
        p:this.minpp,
        l:this.mincolor.substring(1).toLowerCase(),
        q:this.middlecolor.substring(1).toLowerCase(),
        z:this.maxcolor.substring(1).toLowerCase(),
        a:this.minpcolor.substring(1).toLowerCase(),
        f:re,
        v: this.xiangguanheight,
        w: this.xiangguanwidth
      },responseType: 'blob'}).then(result=>{
        if(result.status ==200){
          this.mess=false
          const elink = document.createElement('a')
          const fileName = this.searchContent+'.'+re
          elink.download = fileName
          elink.style.display = 'none'
          elink.href = URL.createObjectURL(result.data)
          document.body.appendChild(elink)
          elink.click()
          URL.revokeObjectURL(elink.href) // 释放URL 对象
          document.body.removeChild(elink)
        }
      })
    },
    XGUpdate(){
      this.loading1=true
      // var a = this.geneji.split(/[\n,]/g)
      // var s = a.toString()
      this.axios.get(`/pubmed/getCustomGeneCor`,{params:{
        geneId:this.searchContent.toUpperCase(),
        c:this.zhongliuleixing.toString(),
        j:this.geneji,
        m:this.func,
        n:this.minp,
        d:this.middlep,
        x:this.maxp,
        p:this.minpp,
        l:this.mincolor.substring(1).toLowerCase(),
        q:this.middlecolor.substring(1).toLowerCase(),
        z:this.maxcolor.substring(1).toLowerCase(),
        a:this.minpcolor.substring(1).toLowerCase(),
        f:'png',
        v: this.xiangguanheight,
        w: this.xiangguanwidth
      }}).then(result=>{
        this.TC=result.data
        if(JSON.stringify(this.TC)!='{}' && result.data!=undefined){
          this.imgsrcxiangguan=`data:image/png;base64,${result.data.fileBase64}`
        }
        if(result.status==200){
          this.loading1=false
        }
      })
    },
    downloadDNA(re){
      this.mess=true
      // var a = this.geneji.split(/[\n,]/g)
      // var s = a.toString()
      this.axios.get(`/pubmed/getCustomGeneCor`,{params:{
        geneId:this.searchContent.toUpperCase(),
        c:this.zhongliuleixing4.toString(),
        j:this.geneji4,
        m:this.func4,
        n:this.minp4,
        d:this.middlep4,
        x:this.maxp4,
        p:this.minpp4,
        l:this.mincolor4.substring(1).toLowerCase(),
        q:this.middlecolor4.substring(1).toLowerCase(),
        z:this.maxcolor4.substring(1).toLowerCase(),
        a:this.minpcolor4.substring(1).toLowerCase(),
        f:re,
        v: this.xiangguanheight4,
        w: this.xiangguanwidth4
      },responseType: 'blob'}).then(result=>{
        if(result.status ==200){
          this.mess=false
          const elink = document.createElement('a')
          const fileName = this.searchContent+'.'+re
          elink.download = fileName
          elink.style.display = 'none'
          elink.href = URL.createObjectURL(result.data)
          document.body.appendChild(elink)
          elink.click()
          URL.revokeObjectURL(elink.href) // 释放URL 对象
          document.body.removeChild(elink)
        }
      })
    },
    DNAUpdate(){
      this.loading4=true
      // var a = this.geneji.split(/[\n,]/g)
      // var s = a.toString()
      this.axios.get(`/pubmed/getCustomGeneCor`,{params:{
        geneId:this.searchContent.toUpperCase(),
        c:this.zhongliuleixing4.toString(),
        j:this.geneji4,
        m:this.func4,
        n:this.minp4,
        d:this.middlep4,
        x:this.maxp4,
        p:this.minpp4,
        l:this.mincolor4.substring(1).toLowerCase(),
        q:this.middlecolor4.substring(1).toLowerCase(),
        z:this.maxcolor4.substring(1).toLowerCase(),
        a:this.minpcolor4.substring(1).toLowerCase(),
        f:'png',
        v: this.xiangguanheight4,
        w: this.xiangguanwidth4
      }}).then(result=>{
        this.TC=result.data
        if(JSON.stringify(this.TC)!='{}' && result.data!=undefined){
          this.imgsrc44=`data:image/png;base64,${result.data.fileBase64}`
        }
        if(result.status==200){
          this.loading4=false
        }
      })
    },
    downloadMEI(re){
      this.mess=true
      // var a = this.geneji.split(/[\n,]/g)
      // var s = a.toString()
      this.axios.get(`/pubmed/getCustomGeneCor`,{params:{
        geneId:this.searchContent.toUpperCase(),
        c:this.zhongliuleixing5.toString(),
        j:this.geneji5,
        m:this.func5,
        n:this.minp5,
        d:this.middlep5,
        x:this.maxp5,
        p:this.minpp5,
        l:this.mincolor5.substring(1).toLowerCase(),
        q:this.middlecolor5.substring(1).toLowerCase(),
        z:this.maxcolor5.substring(1).toLowerCase(),
        a:this.minpcolor5.substring(1).toLowerCase(),
        f:re,
        v: this.xiangguanheight5,
        w: this.xiangguanwidth5
      },responseType: 'blob'}).then(result=>{
        if(result.status ==200){
          this.mess=false
          const elink = document.createElement('a')
          const fileName = this.searchContent+'.'+re
          elink.download = fileName
          elink.style.display = 'none'
          elink.href = URL.createObjectURL(result.data)
          document.body.appendChild(elink)
          elink.click()
          URL.revokeObjectURL(elink.href) // 释放URL 对象
          document.body.removeChild(elink)
        }
      })
    },
    MEIUpdate(){
      this.loading55=true
      // var a = this.geneji.split(/[\n,]/g)
      // var s = a.toString()
      this.axios.get(`/pubmed/getCustomGeneCor`,{params:{
        geneId:this.searchContent.toUpperCase(),
        c:this.zhongliuleixing5.toString(),
        j:this.geneji5,
        m:this.func5,
        n:this.minp5,
        d:this.middlep5,
        x:this.maxp5,
        p:this.minpp5,
        l:this.mincolor5.substring(1).toLowerCase(),
        q:this.middlecolor5.substring(1).toLowerCase(),
        z:this.maxcolor5.substring(1).toLowerCase(),
        a:this.minpcolor5.substring(1).toLowerCase(),
        f:'png',
        v: this.xiangguanheight5,
        w: this.xiangguanwidth5
      }}).then(result=>{
        this.TC=result.data
        if(JSON.stringify(this.TC)!='{}' && result.data!=undefined){
          this.imgsrc55=`data:image/png;base64,${result.data.fileBase64}`
        }
        if(result.status==200){
          this.loading55=false
        }
      })
    },
    downloadtubian(aaaa){
      this.mess=true
      var a = this.geneji.split(/[\n,]/g)
      if(aaaa == 'dot'){
        this.axios.get(`/pubmed/getTCGAMafPlotByGenes`,{params:{
          geneId:this.searchContent.toUpperCase(),
          c:this.bianmamoshi,
          m:aaaa,
          f:'pdf',
          v:'300',
          w:'750'
        },responseType: 'blob'}).then(result=>{
          if(result.status ==200){
            this.mess=false
            const elink = document.createElement('a')
            const fileName = this.searchContent+aaaa+'.pdf'
            elink.download = fileName
            elink.style.display = 'none'
            elink.href = URL.createObjectURL(result.data)
            document.body.appendChild(elink)
            elink.click()
            URL.revokeObjectURL(elink.href) // 释放URL 对象
            document.body.removeChild(elink)
          }
        })
      }else{
        this.axios.get(`/pubmed/getTCGAMafPlotByGenes`,{params:{
          geneId:this.geneji1,
          c:this.bianmapinci,
          m:aaaa,
          f:'pdf',
          v: this.tubianwidth,
          w: this.tubianheight
        },responseType: 'blob'}).then(result=>{
          if(result.status ==200){
            this.mess=false
            const elink = document.createElement('a')
            const fileName = this.searchContent+aaaa+'.pdf'
            elink.download = fileName
            elink.style.display = 'none'
            elink.href = URL.createObjectURL(result.data)
            document.body.appendChild(elink)
            elink.click()
            URL.revokeObjectURL(elink.href) // 释放URL 对象
            document.body.removeChild(elink)
          }
        })
      }
      
    },
    pinciUpdate(aaaa){
      this.loading4=true
      var a = this.geneji.split(/[\n,]/g)
      if(aaaa == 'dot'){
        this.axios.get(`/pubmed/getTCGAMafPlotByGenes`,{params:{
          geneId:this.searchContent.toUpperCase(),
          c:this.bianmamoshi,
          m:aaaa,
          f:'png',
          v:'300',
          w:'750'
        }}).then(result=>{
          this.TC=result.data
          if(JSON.stringify(this.TC)!='{}' && result.data!=undefined){
            this.imgsrc44=`data:image/png;base64,${result.data.fileBase64}`
          }
          if(result.status==200){
            this.loading4=false
          }
        })
      }else{
        this.axios.get(`/pubmed/getTCGAMafPlotByGenes`,{params:{
          geneId:this.geneji1,
          c:this.bianmapinci,
          m:aaaa,
          f:'png',
          v: this.tubianwidth,
          w: this.tubianheight
        }}).then(result=>{
          this.TC=result.data
          if(JSON.stringify(this.TC)!='{}' && result.data!=undefined){
            this.imgsrc44=`data:image/png;base64,${result.data.fileBase64}`
          }
          if(result.status==200){
            this.loading4=false
          }
        })
      }
    },
    fanaidownload(){
      var a = this.fanai.split(/[\n,]/g)
      var s = a.toString()
      this.axios.get(`/pubmed/getGenesGTExInfos`,{params:{
        genesId:s,
        type:this.shujuleixing
      },responseType: 'blob'}).then(result=>{
        const elink = document.createElement('a')
        const fileName = this.shujuleixing+'.txt'
        elink.download = fileName
        elink.style.display = 'none'
        elink.href = URL.createObjectURL(result.data)
        document.body.appendChild(elink)
        elink.click()
        URL.revokeObjectURL(elink.href) // 释放URL 对象
        document.body.removeChild(elink)
      })
    },
    downloadtcgt(){
      this.mess=true
      if(this.radio=='T检验'){
        this.m='T'
      }else{
        this.m='F'
      }
      this.axios.get(`/pubmed/getGenesPlotPancerDitByInfos`, {params:{
        genesId:this.Id,
        g:document.getElementById("a").innerText,
        m:this.m,
        s:this.input,
        u:this.color.substring(1),
        d:this.color1.substring(1),
        l:this.value1,
        a:this.value,
        y:this.input2,
        z:this.input1,
        type:'pdf'
      },responseType: 'blob'}).then(result=>{
        if(result.data!=''){
          this.mess=false
          const elink = document.createElement('a')
          const fileName = this.searchContent+'+TCGA+GTEx'+'.pdf'
          elink.download = fileName
          elink.style.display = 'none'
          elink.href = URL.createObjectURL(result.data)
          document.body.appendChild(elink)
          elink.click()
          URL.revokeObjectURL(elink.href) // 释放URL 对象
          document.body.removeChild(elink)
        }
      })
    },
    downloadtcga(){
      this.mess=true
      if(this.radio=='T检验'){
        this.m='T'
      }else{
        this.m='F'
      }
      this.axios.get(`/pubmed/getGenesPlotPancerDitByInfos`, {params:{
        genesId:this.Id,
        g:document.getElementById("a").innerText,
        m:this.m,
        s:this.input,
        u:this.color.substring(1),
        d:this.color1.substring(1),
        l:this.value1,
        a:this.value,
        y:this.input2,
        z:this.input1,
        type:'pdf'
      },responseType: 'blob'}).then(result=>{
        if(result.status ==200){
          this.mess=false
          const elink = document.createElement('a')
          const fileName = this.searchContent+'+TCGA'+'.pdf'
          elink.download = fileName
          elink.style.display = 'none'
          elink.href = URL.createObjectURL(result.data)
          document.body.appendChild(elink)
          elink.click()
          URL.revokeObjectURL(elink.href) // 释放URL 对象
          document.body.removeChild(elink)
        }
      })
    },
    downloadgtex(re){
      this.mess=true
      this.axios.get(`/pubmed/getGenesPlotPancerTissueByInfos`,{params:{
        genesId:this.Id,
        m:this.radio2,
        a:this.edg,
        s:this.radio1,
        y:this.input3,
        z:this.input4,
        type:'pdf',
        db:re
      },responseType: 'blob'}).then(result=>{
        if(result.status ==200){
          this.mess=false
          const elink = document.createElement('a')
          const fileName = this.searchContent+'+'+re+'.pdf'
          elink.download = fileName
          elink.style.display = 'none'
          elink.href = URL.createObjectURL(result.data)
          document.body.appendChild(elink)
          elink.click()
          URL.revokeObjectURL(elink.href) // 释放URL 对象
          document.body.removeChild(elink)
        }
      })
    },
    toIdConversion(){
      const {href}=this.$router.resolve({
        path: '/IdConversion',
      })
      window.open(href,'_blank')
    },
    RoadVisualInfo(a,b,c){
      this.tankuang=!this.tankuang
      this.loading10=true
      var qs=require('qs');
      this.axios.post(`/pubmed/getGenesRoadVisualInfo/`, qs.stringify({
        genesId:a,
        genesId2:b,
        pathwayid:c
      })).then(result=>{
        if(result.data.status==200){
          this.imgsrc6=`data:image/png;base64,${result.data.res.fileBase64}`
          this.loading10=false
        }
      })
    },
    settingEvent(){},
    downDiscuoption(){
      this.tankuang=false
    },
    existsGene(){
      this.axios.get(`/pubmed/existsGenesCollect`,{params:{
        geneId:this.Id
      }}).then(result=>{
        this.co1=result.data.res.count
      })
    },
    collection(id,phone){
      var qs=require('qs');
      if(phone==undefined || phone.length<=0){
        if($(`#${id}`).attr("src")==require("../../public/img/shoucang.png")){
          this.axios.post(`/pubmed/editGeneCollect`, qs.stringify({
            geneId:id,
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
          this.$axios.post(`/pubmed/editGeneCollect`, qs.stringify({
            geneId:id,
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
          this.axios.post(`/pubmed/editGeneCollect`, qs.stringify({
            geneId:id,
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
          this.$axios.post(`/pubmed/editGeneCollect`, qs.stringify({
          geneId:id,
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
    downloadCOX(re,a){
      this.mess=true
      if(re == 'km'){
        this.axios.get(`/pubmed/getTCGASurvByGeneId`,{params:{
          geneId:this.Id,
          c:this.bianmaKM.toString(),
          m:this.xitong,
          p:re,
          u:this.CutoffHigh,
          d:this.CutoffLow,
          f:a,
          v:400,w:'600'
        },responseType: 'blob'}).then(result=>{
          if(result.status ==200){
            this.mess=false
            const elink = document.createElement('a')
            const fileName = this.searchContent+re+'.'+a
            elink.download = fileName
            elink.style.display = 'none'
            elink.href = URL.createObjectURL(result.data)
            document.body.appendChild(elink)
            elink.click()
            URL.revokeObjectURL(elink.href) // 释放URL 对象
            document.body.removeChild(elink)
          }
        })
      }else if(re == 'cox'){
        this.axios.get(`/pubmed/getTCGASurvByGeneId`,{params:{
          geneId:this.Id,
          c:this.bianma.toString(),
          m:this.xitong,
          p:re,
          f:a,
        },responseType: 'blob'}).then(result=>{
          if(result.status ==200){
            this.mess=false
            const elink = document.createElement('a')
            const fileName = this.searchContent+re+'.'+a
            elink.download = fileName
            elink.style.display = 'none'
            elink.href = URL.createObjectURL(result.data)
            document.body.appendChild(elink)
            elink.click()
            URL.revokeObjectURL(elink.href) // 释放URL 对象
            document.body.removeChild(elink)
          }
        })
      }else if(re == 'roc'){
        this.axios.get(`/pubmed/getTCGASurvByGeneId`,{params:{
          geneId:this.Id,
          c:this.bianmaROC.toString(),
          m:this.xitong,
          p:re,
          f:a,
          v:400,w:'800'
        },responseType: 'blob'}).then(result=>{
          if(result.status ==200){
            this.mess=false
            const elink = document.createElement('a')
            const fileName = this.searchContent+re+'.'+a
            elink.download = fileName
            elink.style.display = 'none'
            elink.href = URL.createObjectURL(result.data)
            document.body.appendChild(elink)
            elink.click()
            URL.revokeObjectURL(elink.href) // 释放URL 对象
            document.body.removeChild(elink)
          }
        })
      }
      
    },
    KMUpdate(re){
      this.loading12=true
      if(re == 'km'){
        this.axios.get(`/pubmed/getTCGASurvByGeneId`,{params:{
          geneId:this.Id,
          c:this.bianmaKM.toString(),
          m:this.xitong,
          p:re,
          u:this.CutoffHigh,
          d:this.CutoffLow,
          f:'png',
          v:400,w:'600'
        }}).then(result=>{
          this.TC=result.data
          if(JSON.stringify(this.TC)!='{}' && result.data!=undefined){
            this.imgsrc11=`data:image/png;base64,${result.data.fileBase64}`
          }
          if(result.status==200){
            this.loading12=false
          }
        })
      }else if(re == 'cox'){
        this.axios.get(`/pubmed/getTCGASurvByGeneId`,{params:{
          geneId:this.Id,
          c:this.bianma.toString(),
          m:this.xitong,
          p:re,
          f:'png',
          v:this.bianma.length*20+100,w:'600'
        }}).then(result=>{
          this.TC=result.data
          if(JSON.stringify(this.TC)!='{}' && result.data!=undefined){
            this.imgsrc11=`data:image/png;base64,${result.data.fileBase64}`
          }
          if(result.status==200){
            this.loading12=false
          }
        })
      }else if(re == 'roc'){
        this.axios.get(`/pubmed/getTCGASurvByGeneId`,{params:{
          geneId:this.Id,
          c:this.bianmaROC.toString(),
          m:this.xitong,
          p:re,
          f:'png',
          v:400,w:'800'
        }}).then(result=>{
          this.TC=result.data
          if(JSON.stringify(this.TC)!='{}' && result.data!=undefined){
            this.imgsrc11=`data:image/png;base64,${result.data.fileBase64}`
          }
          if(result.status==200){
            this.loading12=false
          }
        })
      }
      
    },
    Undate(){
      this.loading1=true
      var qs=require('qs');
      if(this.radio=='T检验'){
        this.m='T'
      }else{
        this.m='F'
      }
      this.axios.post(`/pubmed/getGenesPlotPancerDitByInfo`, qs.stringify({
        genesId:this.Id,
        g:document.getElementById("a").innerText,
        m:this.m,
        s:this.input,
        u:this.color.substring(1),
        d:this.color1.substring(1),
        l:this.value1,
        a:this.value,
        y:this.input2,
        z:this.input1
      })).then(result=>{
        this.TC=result.data.res
        if(JSON.stringify(this.TC)!='{}' && result.data.res!=undefined){
          this.imgsrc=`data:image/png;base64,${result.data.res.fileBase64}`
        }
        if(result.data.status==200){
          this.loading1=false
        }
      })
    },
    Undate1(re){
      this.loading2=true
      var qs=require('qs');
      this.axios.post(`/pubmed/getGenesPlotPancerTissueByInfo`, qs.stringify({
        genesId:this.Id,
        m:this.radio2,
        a:this.edg,
        s:this.radio1,
        y:this.input3,
        z:this.input4,
        db:re
      })).then(result=>{
        this.GT=result.data.res
        if(JSON.stringify(result.data.res)!='{}' && result.data.res!=undefined){
          this.imgsrc2=`data:image/png;base64,${result.data.res.fileBase64}`
        }
        if(result.data.status==200){
          this.loading2=false
        }
        this.loading2=false
      })
    },
    Undate2(){
      this.loading3=true
      this.nodes=[]
      var qs=require('qs');
      this.axios.post(`/pubmed/getGenesCorKEGGPathwya2ExpByInfo`, qs.stringify({
        genesId:this.Id,
        m:this.func,
        s:this.pathway.toString(),
        p:this.input6,
        r:this.input5,
      })).then(result=>{
        this.undata2=result.data.res
        if(JSON.stringify(result.data.res)!='{}'){
          var a=(result.data.res.fileContent).substring(1,result.data.res.fileContent.length-1);
          var b=a.split(',').slice(1,a.length)
          var aa=[]
          var nn={name:this.$route.query.search1}
          var mm=''
          for(var c of b){
            aa=c.split('\t')
            var e={}
            e.Id1=aa[0]
            e.R=aa[1]
            e.P=aa[2]
            e.name=aa[3]
            e.symbolSize=Math.ceil(Math.abs(aa[1])*40)
            mm=Math.floor(Math.abs(Math.log10(aa[2])))
            if(mm>6){
              mm=6
            }
            switch(mm){             
              case 0:
                if(aa[1]>0){
                  e.itemStyle={}
                  e.itemStyle.color= '#2B32B2'
                }else{
                  e.itemStyle={}
                  e.itemStyle.color= '#eff3ff'
                }
              break;
              case 1:
                if(aa[1]>0){
                  e.itemStyle={}
                  e.itemStyle.color= '#1488CC'
                }else{
                  e.itemStyle={}
                  e.itemStyle.color= '#c6dbef'
                }
              break;
              case 2:
                if(aa[1]>0){
                  e.itemStyle={}
                  e.itemStyle.color= '#396afc'
                }else{
                  e.itemStyle={}
                  e.itemStyle.color= '#9ecae1'
                }
              break;
              case 3:
                if(aa[1]>0){
                  e.itemStyle={}
                  e.itemStyle.color= '#2948ff'
                }else{
                  e.itemStyle={}
                  e.itemStyle.color= '#6baed6'
                }
              break;
              case 4:
                if(aa[1]>0){
                  e.itemStyle={}
                  e.itemStyle.color= '#0052D4'
                }else{
                  e.itemStyle={}
                  e.itemStyle.color= '#3182bd'
                }
              break;
              case 5:
                if(aa[1]>0){
                  e.itemStyle={}
                  e.itemStyle.color= '#6FB1FC'
                }else{
                  e.itemStyle={}
                  e.itemStyle.color= '#08519c'
                }
              break;
              case 6:
                if(aa[1]>0){
                  e.itemStyle={}
                  e.itemStyle.color= '#003973'
                }else{
                  e.itemStyle={}
                  e.itemStyle.color= '#0e3076'
                }
              break;
            }
            this.nodes.push(e)
          }
          var compare = function (prop) {
            return function (obj1, obj2) {
              var val1 = obj1[prop];
              var val2 = obj2[prop];if (val1 < val2) {
                return -1;
              } else if (val1 > val2) {
                return 1;
              } else {
                return 0;
              }            
            } 
          }
          this.nodes.sort(compare("symbolSize"))
          this.nodes.unshift(nn)
          for(var ab in this.nodes){
            this.nodes[ab].id=ab
          }
          this.links = JSON.parse(JSON.stringify( this.nodes))
          for(var bb=0;bb<this.links.length;bb++){
            this.links[bb].source=bb
            this.links[bb].target=0
          }
          this.links[0].target=1
        }
        if(result.data.status==200){
          this.loading3=false
        }
      })
    },
    Undate3(){
      this.loading4=true
      this.nodes1=[]
      var qs=require('qs');
      this.axios.post(`/pubmed/getGenesCorGOTerm2ExpByInfo`, qs.stringify({
        genesId:this.Id,
        m:this.func1,
        s:this.pathway1.toString(),
        p:this.input8,
        n:document.getElementById("b").innerText,
        r:this.input7,
      })).then(result=>{
        this.undata3=result.data.res
        // console.log(this.undata3)
        if(JSON.stringify(result.data.res)!='{}'){
          var a=(result.data.res.fileContent).substring(1,result.data.res.fileContent.length-1);
          var b=a.split(',').slice(1,a.length)
          var aa=[]
          var nn={name:this.$route.query.search1}
          var mm=''
          for(var c of b){
            aa=c.split('\t')
            var e={}
            e.Goid=aa[0]
            e.R=aa[1]
            e.P=aa[2]
            e.name=aa[3]
            e.symbolSize=Math.ceil(Math.abs(aa[1])*40)
            mm=Math.floor(Math.abs(Math.log10(aa[2])))
            if(mm>6){
              mm=6
            }
            switch(mm){             
              case 0:
                if(aa[1]>0){
                  e.itemStyle={}
                  e.itemStyle.color= '#2B32B2'
                }else{
                  e.itemStyle={}
                  e.itemStyle.color= '#eff3ff'
                }
              break;
              case 1:
                if(aa[1]>0){
                  e.itemStyle={}
                  e.itemStyle.color= '#1488CC'
                }else{
                  e.itemStyle={}
                  e.itemStyle.color= '#c6dbef'
                }
              break;
              case 2:
                if(aa[1]>0){
                  e.itemStyle={}
                  e.itemStyle.color= '#396afc'
                }else{
                  e.itemStyle={}
                  e.itemStyle.color= '#9ecae1'
                }
              break;
              case 3:
                if(aa[1]>0){
                  e.itemStyle={}
                  e.itemStyle.color= '#2948ff'
                }else{
                  e.itemStyle={}
                  e.itemStyle.color= '#6baed6'
                }
              break;
              case 4:
                if(aa[1]>0){
                  e.itemStyle={}
                  e.itemStyle.color= '#0052D4'
                }else{
                  e.itemStyle={}
                  e.itemStyle.color= '#3182bd'
                }
              break;
              case 5:
                if(aa[1]>0){
                  e.itemStyle={}
                  e.itemStyle.color= '#6FB1FC'
                }else{
                  e.itemStyle={}
                  e.itemStyle.color= '#08519c'
                }
              break;
              case 6:
                if(aa[1]>0){
                  e.itemStyle={}
                  e.itemStyle.color= '#003973'
                }else{
                  e.itemStyle={}
                  e.itemStyle.color= '#0e3076'
                }
              break;
            }
            this.nodes1.push(e)
          }
          var compare = function (prop) {
            return function (obj1, obj2) {
              var val1 = obj1[prop];
              var val2 = obj2[prop];if (val1 < val2) {
                return -1;
              } else if (val1 > val2) {
                return 1;
              } else {
                return 0;
              }            
            } 
          }
          this.nodes1.sort(compare("symbolSize"))
          this.nodes1.unshift(nn)
          for(var ab in this.nodes1){
            this.nodes1[ab].id=ab
          }
          this.links1 = JSON.parse(JSON.stringify( this.nodes1))
          for(var bb=0;bb<this.links1.length;bb++){
            this.links1[bb].source=bb
            this.links1[bb].target=0
          }
          this.links1[0].target=1
        }
        if(result.data.status==200){
          this.loading4=false
        }
      })
    },
    Undate4(){
      this.loading5=true
      this.axios.get(`/pubmed/getGenesRelationInfo`, {
        params:{genesId:this.Id}
      }).then(result=>{
        this.undata4=result.data.res
        if(JSON.stringify(result.data.res)!="{}" && result.data.res!=undefined){
          var host=result.data.res.hostGene
          var join=result.data.res.joinGene
          join.unshift(host)
          for(var a in join){
            join[a].id=a
          }
          this.f=join
          this.f[0].itemStyle={}
          this.f[0].itemStyle.color= '#FF6B00'
          this.ac = JSON.parse(JSON.stringify(join))
          for(var b=1;b<this.ac.length;b++){
            this.ac[b].source=b
            this.ac[b].target=0
          }
          this.ac[0].target=1
        }
        if(result.data.status==200){
          this.loading5=false
        }
      })
    },
    Undate5(){
      this.loading11=true
      this.nodes=[]
      var qs=require('qs');
      this.axios.post(`/pubmed/getGenesCorKEGGGene2ExpByInfo`, qs.stringify({
        genesId:this.Id,
        m:this.func,
        s:this.pathway2,
        p:this.input6,
        r:this.input5,
      })).then(result=>{
        this.undata5=result.data.res
        // console.log(this.undata5)
        if(JSON.stringify(result.data.res)!='{}'){
          var a=(result.data.res.fileContent).substring(1,result.data.res.fileContent.length-1);
          var b=a.split(',').slice(1,a.length)
          var aa=[]
          var nn={name:this.$route.query.search1}
          var mm=''
          for(var c of b){
            aa=c.split('\t')
            var e={}
            e.Id1=aa[0]
            e.R=aa[1]
            e.P=aa[2]
            e.name=aa[3]
            e.symbolSize=Math.ceil(Math.abs(aa[1])*40)
            mm=Math.floor(Math.abs(Math.log10(aa[2])))
            if(mm>6){
              mm=6
            }
            switch(mm){             
              case 0:
                if(aa[1]>0){
                  e.itemStyle={}
                  e.itemStyle.color= '#2B32B2'
                }else{
                  e.itemStyle={}
                  e.itemStyle.color= '#eff3ff'
                }
              break;
              case 1:
                if(aa[1]>0){
                  e.itemStyle={}
                  e.itemStyle.color= '#1488CC'
                }else{
                  e.itemStyle={}
                  e.itemStyle.color= '#c6dbef'
                }
              break;
              case 2:
                if(aa[1]>0){
                  e.itemStyle={}
                  e.itemStyle.color= '#396afc'
                }else{
                  e.itemStyle={}
                  e.itemStyle.color= '#9ecae1'
                }
              break;
              case 3:
                if(aa[1]>0){
                  e.itemStyle={}
                  e.itemStyle.color= '#2948ff'
                }else{
                  e.itemStyle={}
                  e.itemStyle.color= '#6baed6'
                }
              break;
              case 4:
                if(aa[1]>0){
                  e.itemStyle={}
                  e.itemStyle.color= '#0052D4'
                }else{
                  e.itemStyle={}
                  e.itemStyle.color= '#3182bd'
                }
              break;
              case 5:
                if(aa[1]>0){
                  e.itemStyle={}
                  e.itemStyle.color= '#6FB1FC'
                }else{
                  e.itemStyle={}
                  e.itemStyle.color= '#08519c'
                }
              break;
              case 6:
                if(aa[1]>0){
                  e.itemStyle={}
                  e.itemStyle.color= '#003973'
                }else{
                  e.itemStyle={}
                  e.itemStyle.color= '#0e3076'
                }
              break;
            }
            this.nodes.push(e)
          }
          var compare = function (prop) {
            return function (obj1, obj2) {
              var val1 = obj1[prop];
              var val2 = obj2[prop];if (val1 < val2) {
                return -1;
              } else if (val1 > val2) {
                return 1;
              } else {
                return 0;
              }            
            } 
          }
          this.nodes.sort(compare("symbolSize"))
          this.nodes.unshift(nn)
          for(var ab in this.nodes){
            this.nodes[ab].id=ab
          }
          this.links = JSON.parse(JSON.stringify( this.nodes))
          for(var bb=0;bb<this.links.length;bb++){
            this.links[bb].source=bb
            this.links[bb].target=0
          }
          this.links[0].target=1
        }
        if(result.data.status==200){
          this.loading11=false
        }
      })
    },
    bpxiangguan() {
      $('.biaodabp').html('<div id="bp1" style="width:800px; height: 500px"></div>')
      var echarts1 = document.getElementById("bp1");
      // 绘制图表
      if(echarts1){
        let myChart = this.echarts.init(echarts1)
        myChart.clear();
        myChart.setOption({
          tooltip: {
            formatter: function (params) {
              var res='<div><p>R：'+params.data.R+'</p><p>P：'+params.data.P+'</p></div>' 
              return res;
            },
          },
          series: [{
            // edgeSymbol: ['arrow','' ],
            itemStyle: {                
              normal: {
                color:'#4574d1',
                lineStyle: {
                  color: '#99b2e5', //改变折线颜色
                  curveness: 0.3,
                },
                label: {
                  position: 'Right',
                  show: true,
                  textStyle: {
                    color: '#333'
                  }
                },
                nodeStyle: {
                  brushType: 'both',
                  borderColor: 'rgb(255,215,0)',
                  borderWidth: 1
                },
                linkStyle: {
                  normal: {
                    color: 'source',
                    curveness: 0.5,
                  }
                }
              },
            },
            focusNodeAdjacency : true,//是否在鼠标移到节点上的时候突出显示节点以及节点的边和邻接节点
            animation: false,
            name:"",
            type: 'graph',//关系图类型
            layout: 'circular',//引力布局
            circular: {
                rotateLabel: true
            },
            roam: true,//可以拖动
            useWorker: false,
            minRadius: 15,
            maxRadius: 25,
            gravity: 1.1,
            scaling: 1.1,
            data:this.nodes1,
            links:this.links1
          }]         
        })
        myChart.on('click', (param)=>{
          if (param.dataType == 'node' && param.name!=this.genesDetails.name) {
            this.tankuang=!this.tankuang
            this.loading10=true
            var qs=require('qs');
            this.axios.post(`/pubmed/getGenesCorGOTerm2ExpByInfo`, qs.stringify({
              genesId:this.Id,
              m:this.func1,
              s:this.pathway1.toString(),
              p:this.input8,
              n:document.getElementById("b").innerText,
              r:this.input7,
              t:param.data.Goid
            })).then(result=>{
              
              if(result.data.status==200){
                this.imgsrc6=`data:image/png;base64,${result.data.res.fileContent}`
                this.loading10=false
              }
            })
          }
        });
      }
      
    },
    bpxiangguan1() {
      $('.biaodabp2').html('<div id="bp2" style="width:800px; height: 500px"></div>')
      var echarts1 = document.getElementById("bp2");
      // 绘制图表
      if(echarts1){
        let myChart = this.echarts.init(echarts1)
        myChart.clear();
        myChart.setOption({
          tooltip: {
            formatter: function (params) {
              var res='<div><p>R：'+params.data.R+'</p><p>P：'+params.data.P+'</p></div>' 
              return res;
            },
          },
          series: [{
            // edgeSymbol: ['arrow','' ],
            itemStyle: {                
              normal: {
                color:'#4574d1',
                lineStyle: {
                  color: '#99b2e5', //改变折线颜色
                  curveness: 0.3,
                },
                label: {
                  position: 'Right',
                  show: true,
                  textStyle: {
                    color: '#333'
                  }
                },
                nodeStyle: {
                  brushType: 'both',
                  borderColor: 'rgb(255,215,0)',
                  borderWidth: 1
                },
                linkStyle: {
                  normal: {
                    color: 'source',
                    curveness: 0.5,
                  }
                }
              },
            },
            focusNodeAdjacency : true,//是否在鼠标移到节点上的时候突出显示节点以及节点的边和邻接节点
            animation: false,
            name:"",
            type: 'graph',//关系图类型
            layout: 'circular',//引力布局
            circular: {
                rotateLabel: true
            },
            roam: true,//可以拖动
            useWorker: false,
            minRadius: 15,
            maxRadius: 25,
            gravity: 1.1,
            scaling: 1.1,
            data:this.nodes1,
            links:this.links1
          }]         
        })
        myChart.on('click', (param)=>{
          if (param.dataType == 'node' && param.name!=this.genesDetails.name) {
            this.tankuang=!this.tankuang
            this.loading10=true
            var qs=require('qs');
            this.axios.post(`/pubmed/getGenesCorGOTerm2ExpByInfo`, qs.stringify({
              genesId:this.Id,
              m:this.func1,
              s:this.pathway1.toString(),
              p:this.input8,
              n:document.getElementById("b").innerText,
              r:this.input7,
              t:param.data.Goid
            })).then(result=>{
              
              if(result.data.status==200){
                this.imgsrc6=`data:image/png;base64,${result.data.res.fileContent}`
                this.loading10=false
              }
            })
          }
        });
      }
      
    },
    bpxiangguan2() {
      $('.biaodabp3').html('<div id="bp3" style="width:800px; height: 500px"></div>')
      var echarts1 = document.getElementById("bp3");
      // 绘制图表
      if(echarts1){
        let myChart = this.echarts.init(echarts1)
        myChart.clear();
        myChart.setOption({
          tooltip: {
            formatter: function (params) {
              var res='<div><p>R：'+params.data.R+'</p><p>P：'+params.data.P+'</p></div>' 
              return res;
            },
          },
          series: [{
            // edgeSymbol: ['arrow','' ],
            itemStyle: {                
              normal: {
                color:'#4574d1',
                lineStyle: {
                  color: '#99b2e5', //改变折线颜色
                  curveness: 0.3,
                },
                label: {
                  position: 'Right',
                  show: true,
                  textStyle: {
                    color: '#333'
                  }
                },
                nodeStyle: {
                  brushType: 'both',
                  borderColor: 'rgb(255,215,0)',
                  borderWidth: 1
                },
                linkStyle: {
                  normal: {
                    color: 'source',
                    curveness: 0.5,
                  }
                }
              },
            },
            focusNodeAdjacency : true,//是否在鼠标移到节点上的时候突出显示节点以及节点的边和邻接节点
            animation: false,
            name:"",
            type: 'graph',//关系图类型
            layout: 'circular',//引力布局
            circular: {
                rotateLabel: true
            },
            roam: true,//可以拖动
            useWorker: false,
            minRadius: 15,
            maxRadius: 25,
            gravity: 1.1,
            scaling: 1.1,
            data:this.nodes1,
            links:this.links1
          }]         
        })
        myChart.on('click', (param)=>{
          if (param.dataType == 'node' && param.name!=this.genesDetails.name) {
            this.tankuang=!this.tankuang
            this.loading10=true
            var qs=require('qs');
            this.axios.post(`/pubmed/getGenesCorGOTerm2ExpByInfo`, qs.stringify({
              genesId:this.Id,
              m:this.func1,
              s:this.pathway1.toString(),
              p:this.input8,
              n:document.getElementById("b").innerText,
              r:this.input7,
              t:param.data.Goid
            })).then(result=>{
              
              if(result.data.status==200){
                this.imgsrc6=`data:image/png;base64,${result.data.res.fileContent}`
                this.loading10=false
              }
            })
          }
        });
      }
      
    },
    tongliguanxi1() {
      $('.tonglu1').html('<div id="tong11" style="width:800px; height: 500px"></div>')
      var echarts1 = document.getElementById("tong11");
      // 绘制图表
      if(echarts1){
        let myChart = this.echarts.init(echarts1)
        myChart.clear();
        myChart.setOption({
          tooltip: {
            formatter: function (params) {
              var res='<div><p>R：'+params.data.R+'</p><p>P：'+params.data.P+'</p></div>' 
              return res;
            },
          },
          series: [{
            // edgeSymbol: ['arrow','' ],
            itemStyle: {                
              normal: {
                color:'#4574d1',
                lineStyle: {
                  color: '#99b2e5', //改变折线颜色
                  curveness: 0.3,
                },
                label: {
                  position: 'Right',
                  show: true,
                  textStyle: {
                    color: '#333'
                  }
                },
                nodeStyle: {
                  brushType: 'both',
                  borderColor: 'rgb(255,215,0)',
                  borderWidth: 1
                },
                linkStyle: {
                  normal: {
                    color: 'source',
                    curveness: 0.5,
                  }
                }
              },
            },
            focusNodeAdjacency : true,//是否在鼠标移到节点上的时候突出显示节点以及节点的边和邻接节点
            animation: false,
            name:"",
            type: 'graph',//关系图类型
            layout: 'circular',//引力布局
            circular: {
                rotateLabel: true
            },
            roam: true,//可以拖动
            useWorker: false,
            minRadius: 15,
            maxRadius: 25,
            gravity: 1.1,
            scaling: 1.1,
            data:this.nodes,
            links:this.links
          }]         
        })
        // myChart.on('click', (param)=>{
        //   if (param.dataType == 'node' && param.name!=this.genesDetails.name) {
        //     this.tankuang=!this.tankuang
        //     this.loading10=true
        //     var qs=require('qs');
        //     this.axios.post(`/pubmed/getGenesCorKEGGPathwya2ExpByInfo/`, qs.stringify({
        //       genesId:this.Id,
        //       m:this.func,
        //       s:this.pathway2,
        //       p:this.input6,
        //       r:this.input5,
        //       t:param.data.Id1
        //     })).then(result=>{
        //       if(result.data.status==200){
        //         this.imgsrc6=`data:image/png;base64,${result.data.res.fileContent}`
        //         this.loading10=false
        //       }
        //     })
        //   }
        // });
      }
      
    },
    tongliguanxi() {
      $('.tonglu').html('<div id="tong1" style="width:800px; height: 500px"></div>')
      var echarts1 = document.getElementById("tong1");
      // 绘制图表
      if(echarts1){
        let myChart = this.echarts.init(echarts1)
        myChart.clear();
        myChart.setOption({
          tooltip: {
            formatter: function (params) {
              var res='<div><p>R：'+params.data.R+'</p><p>P：'+params.data.P+'</p></div>' 
              return res;
            },
          },
          series: [{
            // edgeSymbol: ['arrow','' ],
            itemStyle: {                
              normal: {
                color:'#4574d1',
                lineStyle: {
                  color: '#99b2e5', //改变折线颜色
                  curveness: 0.3,
                },
                label: {
                  position: 'Right',
                  show: true,
                  textStyle: {
                    color: '#333'
                  }
                },
                nodeStyle: {
                  brushType: 'both',
                  borderColor: 'rgb(255,215,0)',
                  borderWidth: 1
                },
                linkStyle: {
                  normal: {
                    color: 'source',
                    curveness: 0.5,
                  }
                }
              },
            },
            focusNodeAdjacency : true,//是否在鼠标移到节点上的时候突出显示节点以及节点的边和邻接节点
            animation: false,
            name:"",
            type: 'graph',//关系图类型
            layout: 'circular',//引力布局
            circular: {
                rotateLabel: true
            },
            roam: true,//可以拖动
            useWorker: false,
            minRadius: 15,
            maxRadius: 25,
            gravity: 1.1,
            scaling: 1.1,
            data:this.nodes,
            links:this.links
          }]         
        })
        myChart.on('click', (param)=>{
          if (param.dataType == 'node' && param.name!=this.genesDetails.name) {
            this.tankuang=!this.tankuang
            this.loading10=true
            var qs=require('qs');
            this.axios.post(`/pubmed/getGenesCorKEGGPathwya2ExpByInfo/`, qs.stringify({
              genesId:this.Id,
              m:this.func,
              s:this.pathway.toString(),
              p:this.input6,
              r:this.input5,
              t:param.data.Id1
            })).then(result=>{
              if(result.data.status==200){
                this.imgsrc6=`data:image/png;base64,${result.data.res.fileContent}`
                this.loading10=false
              }
            })
          }
        });
      }
      
    },
    createCytoscape() {
      $('.xuezhe').html('<div id="xue1" style="width:100%; height: 500px"></div>')
      var echarts1 = document.getElementById("xue1");
      // 绘制图表
      if(echarts1){
        let myChart = this.echarts.init(echarts1)
        myChart.clear();
        myChart.setOption({
          series: [{
            // edgeSymbol: ['arrow','' ],
            itemStyle: {                
              normal: {
                color:'#4574d1',
                lineStyle: {
                  color: '#99b2e5', //改变折线颜色
                  curveness: 0.3,
                  // opacity:0.2
                },
                label: {
                  position: 'Right',
                  show: true,
                  textStyle: {
                    color: '#333'
                  }
                },
                nodeStyle: {
                  brushType: 'both',
                  borderColor: 'rgb(255,215,0)',
                  borderWidth: 1
                },
                linkStyle: {
                  normal: {
                    color: 'source',
                    curveness: 0.5,
                  }
                }
              },

            },
            focusNodeAdjacency : true,//是否在鼠标移到节点上的时候突出显示节点以及节点的边和邻接节点
            animation: false,
            name:"",
            type: 'graph',//关系图类型
            layout: 'circular',//引力布局
            circular: {
                rotateLabel: true
            },
            roam: true,//可以拖动
            useWorker: false,
            gravity: 1.1,
            scaling: 1.1,
            data:this.f,
            links:this.ac
          }]         
        })
        myChart.on('click', (param)=>{
          if (param.dataType == 'node') {
            const {href}=this.$router.resolve({
              path: '/Monogenic',
              query: {
                search1:`${param.data.name}`,
                Id:`${param.data.geneID}`
              },
            })
            window.open(href,'_blank')
          }else{
            this.$set(this.kegg2RelationTwo1,0,param.data.morePathwayList)
          }
        });
      }
    },
    getRouterData(){
      this.searchContent=this.$route.query.search1
      this.Id=this.$route.query.Id
    },
    handleGoods(a){
      if(this.num==0){
        var url=`https://www.kegg.jp/kegg-bin/show_pathway?${a.pathwayid}`
        window.open(url,'_block')
      }else{
        var url=`https://www.kegg.jp/kegg-bin/show_pathway?${a.pathwayid}+${this.num}`
        window.open(url,'_block')
      }
    },
    handleGoods1(a){
      if(a.refDatabase.slice(0,5)=="PMID:"){
        const {href}=this.$router.resolve({
          path: '/Literature',
          query: {
            Id:a.refDatabase.slice(5,a.refDatabase.length)
          },
        })
        window.open(href,'_blank')
      }
    },
    handleGoods2(a){
      if(this.num==0){
        var url=`https://www.kegg.jp/kegg-bin/show_pathway?${a.pathwayID}`
        window.open(url,'_block')
      }else{
        var url=`https://www.kegg.jp/kegg-bin/show_pathway?${a.pathwayID}+${this.num}`
        window.open(url,'_block')
      }
    },
    handleClick(tab, event){
      if(tab.name == 'kegg1'){
        this.isActive=true
        this.Undate4()
      }else if(tab.name =='kegg2'){
        this.Undate2()
      }else if(tab.name =='kegg3'){
        this.Undate5()
      }
    },
    handleClick2(tab, even){
      if(tab.name == 'gobp'){
        document.getElementById("b").innerText="BP"
        this.Undate3()
      }else if(tab.name == 'gocc'){
        document.getElementById("b").innerText="CC"
        this.Undate3()
      }else if(tab.name == 'gomf'){
        document.getElementById("b").innerText="MF"
        this.Undate3()
      }
    },
    handleClick3(tab, event){
      if(tab.label == 'TCGA+GTEx'){
        document.getElementById("a").innerText="T"
        this.Undate()
      }else if(tab.label == 'TCGA'){
        document.getElementById("a").innerText="F"
        this.Undate()
      }else if(tab.label == 'GTEx'){
        this.Undate1('GTEx')
      }else if(tab.label == 'CCLE'){
        this.Undate1('CCLE')
      }else if(tab.label == '相关性分析'){
        this.XGUpdate()
      }
    },
    handleClick4(tab, event){
      if(tab.label == 'TCGA突变频次'){
        this.pinciUpdate('count')
      }else if(tab.label == 'TCGA突变模式'){
        this.pinciUpdate('dot')
      }else if(tab.label == 'DNA修复'){
        this.DNAUpdate()
      }
    },
    handleClick5(tab, event){
      if(tab.label == '甲基转移酶'){
        this.MEIUpdate()
      }else if(tab.label == '启动子甲基化'){
      }
    },
    handleClick11(tab, event){
      if(tab.label == 'COX'){
        this.KMUpdate('cox')
      }else if(tab.label == 'KM'){
        this.KMUpdate('km')
      }else if(tab.label == 'ROC'){
        this.KMUpdate('roc')
      }
    },
    handleClick10(tab, event){
      if(tab.label == 'MSI'){
        this.MSIUpdate('MSI')
      }else if(tab.label == '新抗原'){
        this.MSIUpdate('Neoantigen')
      }else if(tab.label == 'TMB'){
        this.MSIUpdate('TMB')
      }else if(tab.label == '免疫检查点'){
        this.MYUpdate('checkpoints')
      }else if(tab.label == '免疫微环境'){
        this.MYUpdate('ESTIMATE')
      }else if(tab.label == '免疫细胞评分'){
        this.MYUpdate('pingfen')
      }else if(tab.label == '免疫途径'){
        this.MYUpdate('PMID28052254')
      }
    },
    goGene(selector){
      var gene = this.$el.querySelector(selector)
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop 
      if(scrollTop<=90){
        var sc=gene.offsetTop-180
      }else{
        var sc=gene.offsetTop-90
      }
      
      window.scrollTo({
        top: sc,
        behavior: 'smooth' // 平滑滚动
      })
    },
    toNcbi(url){
      window.open(url,'_block')
    },
    toGenenames(url){
      window.open(url,'_block')
    },
    searchkras(){
      this.searchContent='kras'
      this.searcher()
    },
    searchegfr(){
      this.searchContent='egfr'
      this.searcher()
    },
    searchmyc(){
      this.searchContent='myc'
      this.searcher()
    },
    searchtp53(){
      this.searchContent='tp53'
      this.searcher()
    },
    Searcher1(){
      var qs=require('qs');
      this.axios.get(`/pubmed/getGenesInfo`, {
        params:{genesId:this.Id}
      }).then(result=>{
        this.gene1=result.data.res
        this.geneId=this.gene1.genesDetails.geneID
        if(result.data.res!=undefined && result.data.res.genesDetails!=undefined){
          this.genesDetails=result.data.res.genesDetails
          this.Aliases=result.data.res.genesDetails.gene2AliasesList
          
          if(this.Aliases==undefined){
            this.num=0
          }else{
            this.num=this.Aliases[1].name
          }
          this.Descs=result.data.res.genesDetails.gene2DescsList
          if(this.Descs!=undefined){
            this.Descs1=this.Descs.slice(1,9)
            this.Descs2=this.Descs.slice(9,17)
          }
          if(this.genesDetails.imgRstBase64!=undefined){
            this.imgsrc4=`data:image/png;base64,${this.genesDetails.imgRstBase64}`
          }else{
            this.imgsrc4=require('../../public/img/none.png')
          }
          
          this.imgsrc5=`data:image/png;base64,${this.genesDetails.imgBase64[0]}`
        }
        if(result.data.status==200){
          this.loading=false;
        }
      })
      this.axios.get(`/pubmed/getGenesKEGGInfo`, {
        params:{genesId:this.Id}
      }).then(result=>{
        if(JSON.stringify(result.data.res.genesDetails)!="{}" && result.data.res.genesDetails!=undefined){
          this.gene2KeggMapList=result.data.res.genesDetails
        }else{
          this.gene2KeggMapList=[]
        }
        if(result.data.status==200){
          this.loading=false;
        }
      })
      
      this.axios.get(`/pubmed/getGenesGoInfo`, {
        params:{genesId:this.Id}
      }).then(result=>{
        if(JSON.stringify(result.data.res.genesDetails)!="{}" && result.data.res.genesDetails!=undefined){
          this.gene2GoList=result.data.res.genesDetails.gene2GoList
        }else{
          this.gene2GoList=[]
        }
        if(result.data.status==200){
          this.loading=false;
        }
      })
      
    },
    searcher(){
      var qs=require('qs');
      this.axios.post(`/pubmed/searchGenesInfo`, qs.stringify({
        query:this.searchContent,
      })).then(result=>{
        if(JSON.stringify(result.data.res)!="{}"){
          this.genesList=result.data.res.genesList.searchData
          if(this.genesList.length==1){
            const {href}=this.$router.resolve({
              path: '/Monogenic',
              query: {
                search1:`${this.searchContent}`,
                Id:`${this.genesList[0].geneID}`
              },
            })
            window.open(href,'_self')
          }else{
            const {href}=this.$router.resolve({
              path: '/Gene',
              query: {
                search1:`${this.searchContent}`,
              },
            })
            window.open(href,'_blank')
          }
        }else{
          this.genesList=[]
        }
        if(result.data.status==200){
          this.loading=false;
        }
      })
    }
  },
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
    .Content{
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
    height: 140px;
    margin: 39px auto 0;
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
  }
  .SearchBody>p>span:nth-child(2){
    margin-left: 15px;
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
    cursor: pointer;
    width: 28%
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
    margin-left: 17%;
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
    width: 60px;
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
  }
  .SearchBox>input{
    display: inline-block;
    width:80%;
    height:19px;
    font-size:12px;
    font-family:Source Han Sans CN;
    font-weight:400;
    color:rgba(183,183,183,1);
    border: none;
    margin-top: 13px;
    margin-left: 30px;
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
    color:rgba(153,153,153,1);
  } 
  input:-moz-placeholder { 
    /* Mozilla Firefox 4 to 18 */ 
    font-size:12px;
    font-family:Source Han Sans CN;
    font-weight:bold;
    color:rgba(153,153,153,1);
  } 
  input::-moz-placeholder { 
    /* Mozilla Firefox 19+ */ 
    font-size:12px;
    font-family:Source Han Sans CN;
    font-weight:bold;
    color:rgba(153,153,153,1);
  } 
  input:-ms-input-placeholder { 
    /* Internet Explorer 10+ */ 
    font-size:12px;
    font-family:Source Han Sans CN;
    font-weight:bold;
    color:rgba(153,153,153,1);
  }
  .genic{
    width: 1200px;
    background: #fff;
    margin-bottom: 20px;
    padding-right: 20px;
    box-shadow:0px 5px 5px #d5d5e6;/*下边阴影*/ 
                                                   
  }
  .genicTop{
    border-bottom: 2px solid #dcdcdc;
    margin-left: 20px;
    overflow: hidden;
    padding-bottom: 12px;
  }
  #pane-kegg{
    margin-top: 20px;
  }
  .title{
    font-family: 'DIN Bold', 'DIN';
    font-weight: 700;
    font-style: normal;
    font-size: 30px;
    color: #3D5EB5;
    margin-bottom: 5px;
    line-height: 48px;
    margin-top: 10px;
  }
  .title2{
    font-family: 'DIN';
    font-weight: 500;
    font-style: normal;
    color: #3D5EB5;
    margin-bottom: 15px;
  }
  .hengxian{
    background: #3D5EB5;
    height: 2px;
    width: 40px;
  }
  .bianma{
    font-family: 'DIN';
    font-weight: 500;
    font-style: normal;
    font-size: 14px;
    margin-top: 12px;
  }
  .genicBootom{
    display: flex;
    flex-direction: row;
    margin-left: 20px;
    line-height: 40px;
  }
  .genicBootom>p:nth-child(1){
    width: 70%;
    margin: 0;
  }
  .genicBootom>p:nth-child(2){
    width: 30%;
    margin: 0;
  }
  .genicBootom>p:last-child{
    text-align: right;
  }
  .genicBootom>p:last-child>img{
    margin-right: 20px;
    cursor: pointer;
  }
  .SearchContent{
    background: #fff;
  }
  .Content{
    width: 100%;
    margin: 0 auto;
    overflow: hidden;
  }
  .uname{
    border-bottom: 1px solid #304D99;
  }
  .username{
    display: block;
    width: 130px;
    position: relative;
    margin-top: 30px;
    border-bottom:30px solid #3366CC; 
    border-left:0px solid transparent;
    border-right:30px solid transparent;
  }
  .username::after{
    position: absolute;
    top: 5px;left: 15px;
    content: "丨 别名";
    color: #fff;
    z-index: 999;
  }
  .uname1{
    border-bottom: 1px solid #304D99;
  }
  .username1{
    display: block;
    width: 130px;
    position: relative;
    margin-top: 30px;
    border-bottom:30px solid #3366CC; 
    border-left:0px solid transparent;
    border-right:30px solid transparent;
  }
  .username1::after{
    position: absolute;
    top: 5px;left: 15px;
    content: "丨 KEGG";
    color: #fff;
    z-index: 999;
  }
  .uname2{
    border-bottom: 1px solid #304D99;
  }
  .username2{
    display: block;
    width: 170px;
    position: relative;
    margin-top: 30px;
    border-bottom:30px solid #3366CC; 
    border-left:0px solid transparent;
    border-right:30px solid transparent;
  }
  .username2::after{
    position: absolute;
    top: 5px;left: 15px;
    content: "丨Gene Ontology";
    color: #fff;
    z-index: 999;
  }
  .uname3{
    border-bottom: 1px solid #304D99;
  }
  .username3{
    display: block;
    width: 170px;
    position: relative;
    margin-top: 30px;
    border-bottom:30px solid #3366CC; 
    border-left:0px solid transparent;
    border-right:30px solid transparent;
  }
  .username3::after{
    position: absolute;
    top: 5px;left: 15px;
    content: "丨Gene Expression";
    color: #fff;
    z-index: 999;
  }
  .uname4{
    border-bottom: 1px solid #304D99;
  }
  .username4{
    display: block;
    width: 170px;
    position: relative;
    margin-top: 30px;
    border-bottom:30px solid #3366CC; 
    border-left:0px solid transparent;
    border-right:30px solid transparent;
  }
  .username4::after{
    position: absolute;
    top: 5px;left: 15px;
    content: "丨SNV analysis";
    color: #fff;
    z-index: 999;
  }
  .uname5{
    border-bottom: 1px solid #304D99;
  }
  .username5{
    display: block;
    width: 200px;
    position: relative;
    margin-top: 30px;
    border-bottom:30px solid #3366CC; 
    border-left:0px solid transparent;
    border-right:30px solid transparent;
  }
  .username5::after{
    position: absolute;
    top: 5px;left: 15px;
    content: "丨methylation analysis";
    color: #fff;
    z-index: 999;
  }
  .uname6{
    border-bottom: 1px solid #304D99;
  }
  .username6{
    display: block;
    width: 220px;
    position: relative;
    margin-top: 30px;
    border-bottom:30px solid #3366CC; 
    border-left:0px solid transparent;
    border-right:30px solid transparent;
  }
  .username6::after{
    position: absolute;
    top: 5px;left: 15px;
    content: "丨miRNA-TF-Gene Network";
    color: #fff;
    z-index: 999;
  }
  .uname7{
    border-bottom: 1px solid #304D99;
  }
  .username7{
    display: block;
    width: 160px;
    position: relative;
    margin-top: 30px;
    border-bottom:30px solid #3366CC; 
    border-left:0px solid transparent;
    border-right:30px solid transparent;
  }
  .username7::after{
    position: absolute;
    top: 5px;left: 15px;
    content: "丨Predict CeRNA";
    color: #fff;
    z-index: 999;
  }
  .uname8{
    border-bottom: 1px solid #304D99;
  }
  .username8{
    display: block;
    width: 220px;
    position: relative;
    margin-top: 30px;
    border-bottom:30px solid #3366CC; 
    border-left:0px solid transparent;
    border-right:30px solid transparent;
  }
  .username8::after{
    position: absolute;
    top: 5px;left: 15px;
    content: "丨Protein-Protein network";
    color: #fff;
    z-index: 999;
  }
  .uname9{
    border-bottom: 1px solid #304D99;
  }
  .username9{
    display: block;
    width: 200px;
    position: relative;
    margin-top: 30px;
    border-bottom:30px solid #3366CC; 
    border-left:0px solid transparent;
    border-right:30px solid transparent;
  }
  .username9::after{
    position: absolute;
    top: 5px;left: 15px;
    content: "丨Gene-drug predict";
    color: #fff;
    z-index: 999;
  }
  .uname10{
    border-bottom: 1px solid #304D99;
  }
  .username10{
    display: block;
    width: 220px;
    position: relative;
    margin-top: 30px;
    border-bottom:30px solid #3366CC; 
    border-left:0px solid transparent;
    border-right:30px solid transparent;
  }
  .username10::after{
    position: absolute;
    top: 5px;left: 15px;
    content: "丨Gene-Immune Analysis";
    color: #fff;
    z-index: 999;
  }
  .uname11{
    border-bottom: 1px solid #304D99;
  }
  .username11{
    display: block;
    width: 180px;
    position: relative;
    margin-top: 30px;
    border-bottom:30px solid #3366CC; 
    border-left:0px solid transparent;
    border-right:30px solid transparent;
  }
  .username11::after{
    position: absolute;
    top: 5px;left: 15px;
    content: "丨Gene-KM plotter";
    color: #fff;
    z-index: 999;
  }
  .title3{
    color: #FF6B00
  }
  .geincbieming{
    display: flex;
    flex-direction: row;
    margin-top: 20px;
    min-height: 200px;
    justify-content: space-between

  }
  .geincbieming>div:nth-child(1){
    border-left: 1px solid #333;
    width: 350px;
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  .geincbieming>div:nth-child(1)>p{
    margin: 0;
    line-height: 25px;
    margin-left: 20px;
  }
  .geincbieming>div:nth-child(2){
    border-left: 1px solid #333;
    width: 350px;
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  .geincbieming>div:nth-child(3){
    width: 500px
  }
  .geincbieming>div:nth-child(2)>p{
    margin: 0;
    line-height: 25px;
    margin-left: 20px;
  }
  .title4{
    color: #FF6B00;
    margin-top: 20px;
  }
  .outside{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 60%; 
  }
  .title5{
    color: #FF6B00;
    margin-top: 20px;
  }
  .gene1{
    display: flex;flex-direction: row;
    justify-content: space-between
  }
  .gene1>div:last-child>img{
    width: 540px;
    margin-top: 10px;
  }
  .database{
    font-family: 'DIN Bold', 'DIN';
    font-weight: 700;
    font-style: normal;
    font-size: 12px;
  }
  .xiegang{
    margin: 0 5px;  
  }
  .dataname:hover{
    color: #3366CC;
    cursor: pointer;
  }
  .Rigth{
    position: fixed;
    right: 0;
    top: 25%;
  }
  sup{
    margin: 0 3px;
  }
  sup:hover{
    color: #3366CC;
    cursor: pointer;
  }
  .Rigth>div{
    width: 220px;
    height: 35px;
    line-height: 35px;
    background:#3366CC;
    margin: 5px 0;
    color: #fff;
    font-size: 16px;
    text-align: left;
    padding-left: 30px;
    cursor: pointer;
  }
  .Rigth>div:hover{
    /* transition: all 1s; */
    cursor: pointer;
    background: #304D99;
  }
  .Rigth{
    margin-right: -160px;
    transition: all 0.3s;
    text-align: left;
  }
  .Rigth:hover{
    margin-right: 0px;
    transition: all 0.3s;
  }
  .kegg>>>.el-table td,.kegg>>>.el-table th{
    padding: 0;
    
  }
  .pathway:hover{
    color: #3366CC;
    cursor: pointer;
  }
  .info{
    display: flex;
    flex-direction: row;
    line-height: 40px;
  }
  .info>p{
    margin: 0;
    margin-right: 20px;
  }
  .kegg>>>.el-table--scrollable-y .kegg>>>.el-table__body-wrapper{
    height: 164px;
  }
  .guanxi{
    display: flex;
    flex-direction: row;
    overflow: auto;
    height:350px;
    margin-top: 100px;
  }
  .guanxi>table>tr{
    cursor: pointer;
  }
  .xuezhe{
    width: 65%;
    float: left;
  }
  table tr td{
    border:1px solid #dcdcdc;
  }
  .guanxi>table>tr>td{
    padding: 10px;
  }
  .tiaokong{
    overflow: hidden;
  }
  .tcga{
    display: flex;
    flex-direction: row;
  }
  .tcga>>>.el-color-picker__trigger{
    width: 30px;
    height: 30px;
  }
  .color1{
    line-height: 40px;
  }
  .color2{
    display: flex;
    flex-direction: row;
    line-height: 40px;
  }
  .color2>div:first-child{
    line-height: 40px;
    vertical-align: middle;
  }
  .color2>>>.el-color-picker{
    height: 30px;
    vertical-align: middle;
    line-height: 40px;
  }
  .edg{
    display: flex;
    flex-direction: row;
    line-height: 40px;
  }
  .edg>>>.el-select{
    line-height: 40px;
    width: 120px;
    height: 20px;
  }
  .edg>>>.el-input__inner{
    height: 25px;
  }
  .tuli1{
    line-height: 40px;
  }
  .tuli1>>>.el-select{
    line-height: 40px;
    width: 120px;
    height: 20px;
  }
  .tuli1>>>.el-input__inner{
    height: 25px;
  }
  .jianyan>>>.el-radio{
    line-height: 40px;
    margin-right: 10px;
  }
  .generight1{
    width: 280px;
    margin-top: 20px;
    margin-left: 20px;
  }
  .generight1>>>.el-button--primary{
    background: #3366cc;
    border-color: #3366CC;
  }
  .yanse111>>>.el-button--primary{
    background: #3366cc;
    border-color: #3366CC;
  }
  .generight{
    width: 240px;
    margin-top: 20px;
    margin-left: 20px;
  }
  .generight>>>.el-button--primary{
    background: #3366cc;
    border-color: #3366CC;
  }
  .kegg>>>.el-tabs__active-bar{
    background-color:#FF6B00
  }
  .kegg>>>.el-tabs__item.is-active{
    color: #FF6B00
  }
  .kegg>>>.el-tabs__item:hover{
    color: #FF6B00;
    
  }
  .jianyan>>>.el-radio__input.is-checked .el-radio__inner{
    background: #3366cc;
    border-color: #3366CC;
  }
  .jianyan>>>.el-radio__input.is-checked+.el-radio__label{
    color: #3366CC;
  }
  .innp{
    width: 60px;
    height: 20px;
    margin: 0 3px;
    margin-top: 12px;
  }
  .innp1{
    width: 60px;
    height: 20px;
    margin: 0 3px;
    margin-top: 6px;
  }
  .inp{
    width: 40px;
    height: 20px;
    margin: 0 3px;
    margin-top: 12px;
  }
  .xishu{
    line-height: 40px;
  }
  .tankuang{
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    text-align: center;
    background: rgba(153,153,153,.4);
    z-index:88888;
    margin: 0 auto;
    
  }
  .tankuang>div{
    width: 800px;min-height: 600px;
    position: absolute;
    top: 50%;
    left: 30%;
    transform: translate(0, -50%);
    background: #fff;
    z-index: 99999;text-align: right
  }
  .sousuo{
    text-align: right;
  }
  .download1{
    display: flex;
    flex-direction: row;
    margin-top: 20px;
  }
  .download1>div{
    width: 50%;
  }
  .download1>div>p{
    font-size: 16px;
    margin-bottom: 10px;
  }
  .download1>div:nth-child(1){
    margin-right: 20px;
  }
  .download1>div:nth-child(2)>div>>>.el-button--primary{
    background: #3366cc;
    border-color: #3366CC;
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
  .tcga{
    margin-bottom: 20px;
  }
  .xiangguanxing{
    display: flex;
    flex-direction: row;
    margin-top: 20px;
  }
  .xiangguanxing>div:nth-child(1){
    width: 75%;
  }
  .xiangguanxing>div:nth-child(2){
    width: 25%;
  }
  .yansezhi{
    display: flex;
    flex-direction: row;
  }
  .yansezhi>div{
    width: 50%;
  }
  .yansezhi>div>div{
    display: flex;
    flex-direction: row;
    line-height: 30px;
  }
  .color21>>>.el-color-picker {
    height: 30px;
    vertical-align: middle;
    line-height: 30px;
  }
  .color21>>>.el-color-picker__trigger {
    width: 30px;
    height: 30px;
  }
  .color211{
    display: flex;
    flex-direction: row;
    line-height: 30px;
    margin-top: 10px;
  }
  .color211>>>.el-color-picker {
    height: 30px;
    vertical-align: middle;
    line-height: 30px;
  }
  .color211>>>.el-color-picker__trigger {
    width: 30px;
    height: 30px;
  }
  .fazhi {
    display: flex;
    flex-direction: row;
    margin-top: 10px;
  }
  .fazhi>p {
    width: 50%;
  }
</style>