<template>
  <div>
    <Header/>
    <el-dialog title="日志详情" :visible.sync="dialogVisible" width="40%" @close="dialogClose">
      <el-form label-width="100px">
        <el-form-item label="工具名称:">{{logInfo.toolName}}</el-form-item>
        <el-form-item label="手机号:">{{logInfo.phone}}</el-form-item>
        <el-form-item label="cmd:">{{logInfo.cmd}}</el-form-item>
        <el-form-item label="log信息:">
          <div style="width:100%;height:300px;overflow-y: scroll;">
            <table v-if="logInfo.log.split(/\n/g).length>1">
              <tr v-for="(item,i) of logInfo.log.split(/\n/g)" :key="i">
                <td  v-for="(item1,n) of item.split(/\t/g)" :key="n">{{item1}}</td>
              </tr>
            </table>
          </div>
          
        </el-form-item>
      </el-form>
    </el-dialog>
    <div class="tankuangyidong" v-show="tankuangyidong" @click="tankuangyidong=false">
      <div class="yidong" @click.stop="settingEvent()">
        <p>当前文件位置：{{msg111.url}}</p>
        <div>
          <span>选择文件路径：</span>
          <el-select v-model="wenjianlujing" filterable placeholder="请选择文件路径">
            <el-option
              v-for="item in wenjianlujings"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="footer">
          <el-button @click="tankuangyidong=false" size="small">取消</el-button>
          <el-button @click="moves()" size="small" type="primary">确定</el-button>
        </div>
      </div>
    </div>
    <div class="tankuangphone" v-show="tankuangphone" @click="downDiscuoption2">
      <div v-loading="loading12"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="f5f5f5" id="view" class="phone23" @click.stop="settingEvent()">
        <p>绑定手机号</p>
        <p>请输入手机号：</p>
        <el-input v-model="Phone123" placeholder="请输入内容"></el-input>
        <p v-if="show1" class="hong">手机号格式不正确</p>
        <p class="duanxin">
          <el-input v-model="duanxin12" placeholder="验证码"></el-input>
          <el-button type="primary" @click="send()"><span v-show='countshow' id="duanxin45">发送验证码</span><span v-show='!countshow'>{{count}}</span></el-button>
        </p>
      </div>
    </div>
    <div class="tankuangemail" v-show="tankuangemail" @click="downDiscuoption3">
      <div v-loading="loading13"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="f5f5f5" id="view" class="phone23" @click.stop="settingEvent()">
        <p>绑定邮箱</p>
        <p>请输入邮箱：</p>
        <el-input v-model="Email123" placeholder="请输入邮箱"></el-input>
        <p v-if="show11" class="hong">邮箱格式不正确</p>
        <p class="duanxin">
          <el-input v-model="email11" placeholder="验证码"></el-input>
          <el-button type="primary" id="email" @click="sendemail()"><span v-show='countshow1' id="duanxin45">发送验证码</span><span v-show='!countshow1'>{{count1}}</span></el-button>
        </p>
        <p v-if="codeR" class="hong">验证码错误</p>
        <p class="bangding1111">
          <el-button type="primary" @click="bingemail()">绑定</el-button>
        </p>
      </div>
    </div>
    <div class="tankuangweixin" v-show="tankuangweixin" @click="downDiscuoption1">
      <div v-loading="loading11"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="f5f5f5" id="view" @click.stop="settingEvent()">
        <div class="WechatSignin col-md-5">
          <div id="login_container">
          </div>
        </div>
      </div>
    </div>
    <div class="tankuang" v-if="tankuang" @click="downDiscuoption()">
      <div v-loading="loading10"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="f5f5f5" id="view" @click.stop="settingEvent()">
        <p>数据详情</p>
        <p v-if="datas1.split(/\n/g).length<=1">{{datas1}}</p>
        <img v-if="contenttype=='img'" class="yulanimg" :src="img1" alt="">
        <div class="biaogetankuang" v-if="contenttype!='img' && datas1.split(/\n/g).length>1 && contenttype!='pdf'">
          <table v-if="datas1.split(/\n/g).length>1">
            <tr v-for="(item,i) of datas1.split(/\n/g)" :key="i">
              <td  v-for="(item1,n) of item.split(/\t/g)" :key="n">{{item1}}</td>
            </tr>
          </table>
        </div>
        <p class="xiazai111">
          <span style="margin-right:20px;cursor: pointer;" v-if="rowurl.substring(rowurl.lastIndexOf('.')+1)=='log'" @click="tooutbox">站内信求助</span>
          <el-popover placement="bottom" style="margin-right:20px;" width="130" trigger="click">
            <img width="130px" v-if="isVip>0" src="../../public/img/kefu.png" alt="">
            <span v-if="isVip<0">请开通高级会员</span>
            <span slot="reference"  class="weixin" style="cursor: pointer;">微信求助</span>
          </el-popover>
          <el-button type="primary" v-if="rowurl!='log'" @click="xizai1(rowname)" round>下载</el-button>
        </p>
      </div>
    </div>
    <div v-if="mess" class="mess"><img src="../../public/img/msg.png" alt=""><span>正在导出<span v-if="jindu!=null">{{jindu}}%</span></span></div>
    <div class="personal">
      <div>
        <div class="personalContent">
          <div class="contentLeft">
            <div>
              <div class="leftHeader">
                <div><span>个人首页</span></div><img src="../../public/img/edit.png" alt="">
              </div>
              <div class="leftContent">
                <span><img src="../../public/img/logo5.png" alt=""></span>
                <p>生信小能手</p>
                <p>生物信息工程师</p>
                <p>杭州慕谷基因科技有限公司</p>
                <div class="order">
                  <div>
                    <p>待支付订单</p>
                    <span>0</span>
                  </div>
                  <div>
                    <p>桑格订单</p>
                    <span>0</span>
                  </div>
                  <div>
                    <p>快速生信分析</p>
                    <span>{{realTime}}</span>
                  </div>
                  <div>
                    <p>后台分析</p>
                    <span>{{backStage}}</span>
                  </div>
                </div>
              </div>
              <div class="leftFooter">
                <p>热词搜索</p>
                <div>
                  <el-button type="primary" round size="mini">TCGA</el-button>
                  <el-button type="primary" round size="mini">TP53</el-button>
                  <!-- <el-button type="primary" round size="mini">PCR</el-button>
                  <el-button type="primary" round size="mini">GCPR</el-button>
                  <el-button type="primary" round size="mini">GCP</el-button> -->
                </div>
                <!-- <el-button type="primary" round size="mini">GCPRJ</el-button>
                <el-button type="primary" round size="mini">GCPR</el-button>
                <el-button type="primary" round size="mini">GCPJ</el-button>
                <el-button type="primary" round size="mini">GCPRJ</el-button> -->
              </div>
              <div class="geren">
                <div class="gerentop">
                  <img src="../../public/img/geren.png" alt="">
                  <span>个人信息</span>
                </div>
                <div class="xingming">
                  <p>
                    <span class="right10">姓名:</span><span>{{gerenxin.username}}</span>
                  </p>
                  <p><span class="right10">性别:</span><span>{{gerenxin.sex}}</span></p>
                </div>
                <div class="shoujihao">
                  <p><span class="right10">手机号:</span><span v-if="gerenxin.mobile!=null && gerenxin.mobile!=''">{{gerenxin.mobile}}</span><span v-else class="bangding" >请绑定<span @click="phone1">手机号</span></span></p>
                </div>
                <div class="shoujihao">
                  <p><span class="right10">通讯地址:</span><span>{{gerenxin.address}}</span></p>
                </div>
                <div class="shoujihao">
                  <p><span class="right10">微信:</span><span v-if="gerenxin.nickname!=null && gerenxin.nickname!=''">{{gerenxin.nickname}}</span><span v-else class="bangding">请绑定<span @click="weixin1">微信</span></span></p>
                </div>
                <div class="shoujihao">
                  <p><span class="right10">邮箱:</span><span v-if="gerenxin.email!=null && gerenxin.email!=''">{{gerenxin.email}}</span><span v-else class="bangding">请绑定<span  @click="email1">邮箱</span></span></p>
                </div>
              </div>
            </div>
          </div>
          <div class="contentRight">
            <div>
              <ul>
                <li>
                  <el-dropdown trigger="click">
                    <span class="el-dropdown-link">
                     数据中心<i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item @click.native="date1()">我的数据</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </li>
                <li>
                  <el-dropdown trigger="click">
                    <span class="el-dropdown-link">
                      <el-badge :is-dot='downrenwu' class="item">任务中心</el-badge><i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item @click.native="task1()"><el-badge :is-dot='downrenwu' class="item">我的任务</el-badge></el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </li>
                <li>
                  <el-dropdown trigger="click">
                    <span class="el-dropdown-link">
                      收藏与评论<i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item @click.native="literature1()">文献收藏</el-dropdown-item>
                      <el-dropdown-item @click.native="journal1()">期刊收藏</el-dropdown-item>
                      <el-dropdown-item @click.native="gene1()">基因收藏</el-dropdown-item>
                      <el-dropdown-item @click.native="info1()">数据收藏</el-dropdown-item>
                      <el-dropdown-item @click.native="tools()">工具收藏</el-dropdown-item>
                      <el-dropdown-item @click.native="literaturepinglun1()">文献评论</el-dropdown-item>
                      <el-dropdown-item @click.native="journalpinglun1()">期刊评论</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </li>
                <li>
                  <el-dropdown trigger="click">
                    <span class="el-dropdown-link">
                      会员中心<i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item @click.native="Vip()">会员中心</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </li>
                <li>
                  <el-dropdown trigger="click">
                    <span class="el-dropdown-link">
                      优惠券<i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item @click.native="Discount()">优惠券</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </li>
                <li>
                  <el-dropdown trigger="click">
                    <span class="el-dropdown-link">
                      <el-badge :is-dot='zhannei' class="item">站内信</el-badge><i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item @click.native="Outbox()">写邮件</el-dropdown-item>
                      <el-dropdown-item @click.native="Inbox()"><el-badge :is-dot='zhannei' class="item">收件箱</el-badge></el-dropdown-item>
                      <el-dropdown-item @click.native="Send()">已发送</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </li>
                <!-- <li>
                  <el-dropdown trigger="click">
                    <span class="el-dropdown-link">
                      账号详情<i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item @click.native="Safety1()">安全中心</el-dropdown-item>
                      <el-dropdown-item @click.native="data1()">我的资料</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </li> -->
              </ul>
              <div class="rightContent">
                <div class="mokuai" :class="{active1:shows=='Safety'}">
                  <div><span>安全中心</span></div>
                  <ul>
                    <li>
                      <div>
                        <img src="../../public/img/correct.png" alt="">
                        <div>
                          <span>登录密码</span><br>
                          <span>请妥善保管您的账户密码，建议定期修改以保护账户安全。</span>
                        </div>
                      </div>
                      <div><span>修改</span></div>
                    </li>
                    <li>
                      <div>
                        <img src="../../public/img/correct.png" alt="">
                        <div>
                          <span>手机绑定</span><br>
                          <span>您验证的手机：{{phone}} 若丢失或停用，请立即联系客服。</span>
                        </div>
                      </div>
                      <div><span>修改</span></div>
                    </li>
                    <li>
                      <div>
                        <img src="../../public/img/error.png" alt="">
                        <div>
                          <span>邮箱验证</span><br>
                          <span>您目前还没有绑定邮箱</span>
                        </div>
                      </div>
                      <div><span>修改</span></div>
                    </li>
                    <li>
                      <div>
                        <img src="../../public/img/error.png" alt="">
                        <div>
                          <span>微信绑定</span><br>
                          <span>您目前还没有绑定微信</span>
                        </div>
                      </div>
                      <div><span>修改</span></div>
                    </li>
                  </ul>
                </div>
                <div class="mokuai1" style="display:none" :class="{active1:shows=='data'}">
                  <div>
                    <span>我的资料</span><button><span>修改</span></button>
                  </div>
                  <p>姓名: <span>硬核生物信息数据</span></p>
                  <p>职称: <span>博士</span></p>
                  <p>职业: <span>生物信息工程师</span></p>
                  <p>单位: <span>上海其明信息技术有限公司</span></p>
                </div>
                <div :class="{active1:shows=='date'}" class="mokuai">
                  <div>
                    <span>我的数据</span>
                  </div>
                  <div>
                    <div style="margin-bottom:10px;" class="search1">
                      <p>当前位置：<span id="dir">{{dir}}</span></p>
                      <div>
                        <el-input v-model="search" placeholder="请输入搜索内容"></el-input>
                        <button @click="Search">搜索</button>
                      </div>
                    </div>
                    
                    <div class="top1">
                      <div>
                        <el-button @click="toshang(dir)" :disabled="fanhui" size="mini"><i class="el-icon-back"></i>返回上级</el-button>
                        <el-button @click="shuaxin(dir)" id="shuaxin" size="mini"><i class="el-icon-refresh-right"></i>刷新</el-button>
                        <el-button @click="xinjian(dir)" size="mini"><i class="el-icon-plus"></i>新建文件夹</el-button>
                      </div>
                      <div>
                        <el-upload
                          class="upload-demo"
                          :action="action"
                          :on-preview="handlePreview"
                          :on-remove="handleRemove"
                          :before-upload="beforeupload"
                          :on-success="success"
                          :on-error='error'
                          multiple
                          :data="datadir"
                          :headers="header"
                          name="file"
                          :on-exceed="handleExceed"
                          :file-list="fileList">
                          <el-button size="mini"><i class="el-icon-top"></i>上传文件</el-button>
                        </el-upload>
                      </div>
                      <p>存储空间：{{msg}}</p>
                    </div>
                  </div>
                  <div v-loading="loading"
                    element-loading-text="拼命加载中"
                    element-loading-spinner="el-icon-loading"
                    element-loading-background="f5f5f5">
                    <el-table :data="fileslist" style="width: 100%" @sort-change='sortChange' @selection-change="handleSelectionChange">
                      <!-- <el-table-column
                        type="selection"
                        width="55">
                      </el-table-column> -->
                      <el-table-column label="名称" prop="name" sortable='custom' width="330" >
                        <template slot-scope="scope">
                          <img style="margin-right:5px;" :src="scope.row.type=='dir'?wenjianjia:wenjian" alt="">
                          <span @click="handleGoods(scope.row)" class="pathway" style="margin:0;cursor: pointer;">{{scope.row.name}}</span>
                          <!-- <el-input v-if="" v-model="scope.row.name" placeholder="请输入内容"></el-input> -->
                        </template>
                      </el-table-column>
                      <el-table-column label="修改日期" prop="updateTime" sortable='custom' width="160">
                        <template slot-scope="scope">
                          <span class="pathway" style="margin:0;cursor: pointer;">{{scope.row.updateTime}}</span>
                        </template>
                      </el-table-column>
                      <el-table-column label="大小" prop="size" sortable='custom' width="80">
                        <template slot-scope="scope">
                          <span class="pathway" style="margin:0;cursor: pointer;">{{scope.row.size}}</span>
                        </template>
                      </el-table-column>
                      <el-table-column
                        fixed="right"
                        label="操作"
                        width="120">
                        <template slot-scope="scope">
                          <el-button @click="" v-if="scope.row.name=='tools'" type="text" size="small">我上传的工具</el-button>
                          <el-button @click="openUploads(scope.row)" v-if="scope.row.name=='uploads'" type="text" size="small">我上传的数据</el-button>
                          <el-button @click="download(scope)" :ref="scope.row.url.split('/')[1]" :disabled='scope.row.type+scope.row.size+scope.$index == aid' v-if="scope.row.name!='uploads' && scope.row.name!='tools'" :title="scope.row.type=='dir'?'压缩':'下载'" circle size="small">
                            <div class="loading1" v-if="scope.row.type+scope.row.size+scope.$index == aid">
                              <svg viewBox="25 25 50 50" class="circular"> 
                                <circle cx='50' cy='50' r='20' fill='none' class="path"></circle>
                              </svg>
                            </div>
                            <div v-else>
                              <img src="../../public/img/coms1.png" v-show="scope.row.type=='dir'" style="width:12px" alt="">
                              <img src="../../public/img/down.png" v-show="scope.row.type!='dir'" style="width:12px" alt="">
                            </div>
                            
                          </el-button>
                          <el-popover
                          style="margin-left:10px"
                            v-if="scope.row.name!='uploads' && scope.row.name!='tools'"
                            placement="right"
                            title="操作"
                            width="200"
                            trigger="hover">
                            <el-button @click="chongmingming(scope.row)" type="text" size="small">重命名</el-button>
                            <el-button @click="delete1(scope.row)" type="text" size="small">删除</el-button>
                            <el-button @click="move(scope.row)" type="text" size="small">移动</el-button>
                            <el-button  size="small" slot="reference" circle><img src="../../public/img/more.png" alt=""></el-button>
                          </el-popover>
                        </template>
                      </el-table-column>
                    </el-table>
                    <el-pagination
                    style="margin-top:10px"
                      @current-change="handleCurrentChange"
                      @size-change="handleSizeChange"
                      :current-page.sync="currentPage"
                      layout="total, sizes, prev, pager, next, jumper" 
                      :page-sizes="[20, 30, 50, 80]"
                      :page-size="pagesize"
                      :total="all">
                    </el-pagination>
                    <!-- <context-button v-if="menuVisible" @foo="foo" ref="contextbutton" @handleOne="handleOne" @handleTwo="handleTwo" @handleThree="handleThree"></context-button> -->
                  </div>
                </div>
                <div class="mokuai" :class="{active1:shows=='task'}">
                  <div>
                    <span>我的任务</span>
                  </div>
                  <div v-if="tackList.length>0">
                    <table class="renwu22">
                      <tr>
                        <td></td>
                        <td></td>
                        <td>创建时间</td>
                        <td>运行时间</td>
                        <td>完成时间</td>
                        <td>总耗时(秒)</td>
                        <td>操作</td>
                      </tr>
                      <tr v-for="(item,i) of tackList" :key="i">
                        <td><span class="pathway" :style="item.status==0?{color:'#FF6B00'}:item.status==1?{color:'#3366cc'}:item.status==200?{color:'#00be06'}:item.status==500?{color:'#ff0000'}:item.status==404?{color:'#ff0000'}:''">{{item.status==0?'等待运行':item.status==1?'正在运行':item.status==100?'运行暂停':item.status==200?'运行成功':item.status==500?'运行错误':item.status==404?'运行错误':''}}</span></td>
                        <td style="word-wrap:break-word;word-break:break-all;">
                          <p style="color:#333;width:230px">{{item.desc}}</p>
                          <p @click="toDate(item)" class="ho" style="font-size:12px;color:#666;width:230px">{{item.status==200?item.successFilePath:item.status==500?item.errorFilePath:item.status==404?'运行错误,请检查磁盘空间':''}}</p>
                        </td>
                        <td v-if="item.createTime!=undefined || item.createTime!=null">
                          <p style="font-size:12px">{{item.createTime.split(" ")[0]}}</p>
                          <p style="font-size:12px">{{item.createTime.split(" ")[1]}}</p>
                        </td>
                        <td v-else></td>
                        <td v-if="item.runTime!=undefined || item.runTime!=null">
                          <p v-if="item.status!=0" style="font-size:12px">{{item.runTime.split(" ")[0]}}</p>
                          <p v-if="item.status!=0" style="font-size:12px">{{item.runTime.split(" ")[1]}}</p>
                        </td>
                        <td v-else></td>
                        <td v-if="item.updateTime!=undefined || item.updateTime!=null">
                          <p v-if="item.status==200 || item.status==500 || item.status==404" style="font-size:12px">{{item.updateTime.split(" ")[0]}}</p>
                          <p v-if="item.status==200 || item.status==500 || item.status==404"  style="font-size:12px">{{item.updateTime.split(" ")[1]}}</p>
                        </td>
                        <td v-else>
                        </td>
                        <td>
                          <p v-if="item.status==200 || item.status==500" style="font-size:12px">{{item.totalTime}}</p>
                        </td>
                        <td>
                          <span v-if="item.status==100 || item.status==1" class="shanchu" @click="endRun(item)">终止运行</span>
                          <span v-if="item.status==200 || item.status==500 || item.status==404" class="shanchu" @click="shanchu(item)">删除</span>
                          <span v-if="item.status==200 || item.status==500 || item.status==404" class="shanchu" style="margin-left:5px;" @click="rizhi(item)">日志</span>
                          <!-- <el-button @click="download1(item)" icon="el-icon-download" title="下载" circle size="small"></el-button>
                          <el-popover style="margin-left:10px" 
                            placement="right"
                            title="操作"
                            width="200"
                            trigger="hover">
                            <p style="width:125px;"><span class="shanchu" style="margin-right:5px;" @click="yunxing(item)">重新运行</span><span class="shanchu" @click="shanchu(item)">删除</span><span class="shanchu" style="margin-left:5px;" @click="rizhi(item)">日志</span></p>
                            <el-button  size="small" slot="reference" circle><img src="../../public/img/more.png" alt=""></el-button>
                          </el-popover> -->
                          
                        </td>
                      </tr>
                    </table>
                  </div>
                  <div v-if="tackList.length==0"><p>暂时没有任务</p></div>
                </div>
                <div class="mokuai" :class="{active1:shows=='literature'}">
                  <div>
                    <span>文献收藏</span>
                    <span><img src="../../public/img/analysisactive.png" style="width:16px" alt=""></span>
                  </div>
                  <div class="wenxian" :id="item.PMID" v-for="(item,i) of articleList" :key="i">
                    <div>
                      <p>
                        <img style="cursor: pointer;" @click="collection(item.PMID)" src="../../public/img/shoucangactive.png" alt="">
                        <span>PMID：</span>
                        <span class="ho" @click="toLiterature(item.PMID)">{{item.PMID}}</span>
                        <span>杂志名称：</span>
                        <span>{{item.jourcache.isoAbbr}}</span>
                        <span>影响因子：</span>
                        <span>{{item.jourcache.ifs}}</span>
                      </p>
                      <p>{{item.createTime}}</p>
                    </div>
                    <div>
                      <p class="ho" @click="toLiterature(item.PMID)" v-html="item.title"></p>
                    </div>
                  </div>
                </div>
                <div class="mokuai" :class="{active1:shows=='journal'}">
                  <div>
                    <span>期刊收藏</span>
                  </div>
                  <div class="wenxian" id="item.nlmId" v-for="(item,i) of jourcacheList" :key="i">
                    <div>
                      <p>
                        <img @click="collection1(item.nlmId)" src="../../public/img/shoucangactive.png" alt="">
                        <span>nlmId：</span>
                        <span class="ho" @click="toJournal(item.nlmId,item.course)">{{item.nlmId}}</span>
                      </p>
                      <p>{{item.createTime}}</p>
                    </div>
                    <div>
                      <p class="ho" @click="toJournal(item.nlmId,item.course)" v-html="item.title"></p>
                    </div>
                  </div>
                </div>
                <div class="mokuai" :class="{active1:shows=='gene'}">
                  <div>
                    <span>基因收藏</span>
                  </div>
                  <div class="wenxian" :id="item.geneID" v-for="(item,i) of geneList" :key="i">
                    <div>
                      <p>
                        <img @click="collection2(item.geneID)" src="../../public/img/shoucangactive.png" alt="">
                        <span>基因名称：</span>
                        <span class="ho" @click="toMonogenic(item.geneID,item.name)">{{item.name}}</span>
                      </p>
                      <p>{{item.createTime}}</p>
                    </div>
                    <div>
                      <!-- <p>Long-term safety outcomes of prekallikrein (Fletcher factor) deficiency: A systematic literature review of case reports.Long-term safety outcomes of prekallikrein (Fletcher factor) deficiency: A systematic literature review of case reports.</p> -->
                    </div>
                  </div>
                </div>
                <div class="mokuai" :class="{active1:shows=='info'}">
                  <div>
                    <span>数据收藏</span>
                  </div>
                  <div class="wenxian" :id="item.accession" v-for="(item,i) of geoList" :key="i">
                    <div>
                      <p>
                        <img @click="collection3(item.accession)" src="../../public/img/shoucangactive.png" alt="">
                        <span>数据集名称：</span>
                        <span class="ho" @click="toInfo(item.accession)" >{{item.accession}}</span>
                      </p>
                      <p>{{item.createTime}}</p>
                    </div>
                    <div>
                      <p class="ho" @click="toInfo(item.accession)" v-html="item.title"></p>
                    </div>
                  </div>
                </div>
                <div class="mokuai" :class="{active1:shows=='tools'}">
                  <div>
                    <span>工具收藏</span>
                  </div>
                  <div class="wenxian" :id="item.id" v-for="(item,i) of toolsList" :key="i">
                    <div>
                      <p>
                        <img @click="collection4(item.id)" style="cursor: pointer;" src="../../public/img/shoucangactive.png" alt="">
                        <span>工具名称：</span>
                        <span class="ho" @click="toAllTools(item.id)" >{{item.title}}</span>
                      </p>
                      <p>{{item.creatTime}}</p>
                    </div>
                    <div>
                      <p class="ho" @click="toAllTools(item.id)" v-html="item.description"></p>
                    </div>
                  </div>
                </div>
                <div class="mokuai" :class="{active1:shows=='literaturepinglun'}">
                  <div>
                    <span>文献评论</span>
                  </div>
                  <div class="wenxian" v-for="(item,i) of articleUserCommentList" :key="i">
                    <div>
                      <p>
                        <img v-if="item.isReadAll==1" src="../../public/img/bukejian.png" alt="">
                        <img v-if="item.isReadAll==0" src="../../public/img/kejian.png" alt="">
                        <span>PMID：</span>
                        <span class="ho" @click="toLiterature(item.pmid)">{{item.pmid}}</span>
                        <span>杂志名称：</span>
                        <span>{{item.jourcache.isoAbbr}}</span>
                        <span>影响因子：</span>
                        <span>{{item.jourcache.ifs}}</span>
                      </p>
                      <p>{{item.createTime}}</p>
                    </div>
                    <p class="ho" @click="toLiterature(item.pmid)" style="margin-top:10px;">{{item.articTitle}}</p>
                    <div style="border-left:1px solid #999;padding-left:20px;margin-top:10px;">
                      <p style="color:#666;margin-bottom:10px;">{{item.title}}</p>
                      <el-button type="primary" v-for="(it,n) of item.label" :key="n" round size="mini">{{it}}</el-button>
                    </div>
                  </div>
                </div>
                <div class="mokuai" :class="{active1:shows=='journalpinglun'}">
                  <div>
                    <span>期刊评论</span>
                  </div>
                  <div class="wenxian" v-for="(item,i) of jourcacheUserCommentList" :key="i">
                    <div>
                      <p>
                        <img v-if="item.isReadAll==1" src="../../public/img/bukejian.png" alt="">
                        <img v-if="item.isReadAll==0" src="../../public/img/kejian.png" alt="">
                        <span style="font-weight: 500" v-for="(it,n) of item.label" :key="n">{{it}}</span>
                      </p>
                      <p>{{item.createTime}}</p>
                    </div>
                    <p class="ho" @click="toJournal(item.nlmId,item.course)" style="margin-top:10px;">{{item.jourcacheTitle}}</p>
                    <div style="border-left:1px solid #999;padding-left:20px;margin-top:10px;">
                      <p style="color:#666">{{item.title}}</p>
                    </div>
                  </div>
                </div>
                <div class="mokuai" :class="{active1:shows=='coupon'}">
                  <div class="coupon">
                    <span>优惠券</span>
                  </div>
                  <div>
                    <div class="exchange">
                      <el-input type="text" v-model="exchange" @keyup.13="Exchange1()" placeholder="请输入兑换码"></el-input>
                      <el-button plain style='margin-left:10px' @click="Exchange1">兑换</el-button>
                    </div>
                    <div class="youhuiquans" v-if="discounts!=null?discounts.length>0?true:false:false">
                      <div class="youhuiquan" v-for="(item,i) of discounts" :key="i">
                        <p>SangerBox云平台</p>
                        <p style="text-align:left"><span style="font-size: 24px;vertical-align: 70%	;">￥</span><span style="font-size: 60px;font-weight: 600;">{{item.couponMount}}</span></p>
                        <p :title="item.couponName">{{item.couponName}}</p>
                        <p>{{item.validitTime}} 到期</p>
                      </div>
                    </div>
                    <div v-else style="text-align:center;margin-top:20px">暂无优惠券</div>
                  </div>
                </div>
                <div class="mokuai" :class="{active1:shows=='vip'}">
                  <div class="coupon" >
                    <span>您当前的权益：内存空间 {{maxRam.maxRam}} GB 存储空间 {{maxRam.maxSize}} GB</span>
                    <p><span style="color:#FF6B00;margin-right:20px" class="cu" @click="toAddcun('1')">>>增加存储空间</span><span class="cu" style="color:#FF6B00" @click="toAddcun('2')">>>增加内存空间</span> </p>
                  </div>
                  <div class="quanyi" v-if="getUserMember!=null">
                    <span>{{getUserMember.name}}</span>
                    <span>您的会员权益到期时间：<span>{{getUserMember.volTime.split(' ')[0]}}</span></span>
                  </div>
                  <div>
                    <el-table
                      :data="Vipdata"
                      border
                      :cell-style="{'text-align':'center'}"
                      :header-cell-style="headercellstyle"
                      style="width: 100%;margin-bottom:20px">
                      <el-table-column
                        prop="resources"
                        label=""
                        width="180">
                      </el-table-column>
                      <el-table-column
                        prop="ordinary"
                        label="普通用户">
                      </el-table-column>
                      <el-table-column
                        prop="primary"
                        label="无忧初级版">
                      </el-table-column>
                      <el-table-column
                        prop="intermediate"
                        label="无忧中级版">
                      </el-table-column>
                      <el-table-column
                        prop="advanced"
                        label="无忧高级版">
                      </el-table-column>
                      <el-table-column
                        prop="supers"
                        label="超级用户">
                      </el-table-column>
                    </el-table>
                  </div>
                  <div class="fangshi">
                    <span>会员购买方式：</span>
                  </div>
                  <div class="vip1">
                    <div>
                      <span class="title111">产品选择：</span>
                      <el-radio-group v-model="product" @change="vipchange">
                          <el-radio label="0" :disabled='TCdisabled>=1'>套餐1--无忧初级版</el-radio>
                          <el-radio label="1" :disabled='TCdisabled>=2'>套餐2--无忧中级版</el-radio>
                          <el-radio label="2" :disabled='TCdisabled>=3'>套餐3--无忧高级版</el-radio>
                          <el-radio label="3" :disabled='TCdisabled>=4'>套餐4--超级用户</el-radio>
                        
                      </el-radio-group>
                    </div>
                    <div class="shijian">
                      <span class="title111">时间选择：</span>
                      <div class="timers">
                        <button class="timer" :class="{'active':timers==1,'cus':mounth1>1}" :disabled="mounth1>1" @click="mounth(1)">
                          <p>1个月</p>
                          <p>￥{{product!=3?vip111.a:"N/A"}}</p>
                          <img src="../../public/img/dui.png" v-if="timers==1" alt="">
                        </button>
                        <button class="timer" :class="{'active':timers==3,'cus':mounth1>3}" :disabled="mounth1>3" @click="mounth(3)">
                          <p>1季度</p>
                          <p>￥{{product!=3?vip111.a*3:"N/A"}}</p>
                          <img src="../../public/img/dui.png" v-if="timers==3" alt="">
                        </button>
                        <button class="timer" :class="{'active':timers==6,'cus':mounth1>6}" :disabled="mounth1>6" @click="mounth(6)">
                          <p>半年</p>
                          <p>￥{{product!=3?vip111.a*6:"N/A"}}</p>
                          <img src="../../public/img/dui.png" v-if="timers==6" alt="">
                        </button>
                        <button class="timer" :class="{'active':timers==12,'cus':mounth1>12}" :disabled="mounth1>12" @click="mounth(12)">
                          <p>1年</p>
                          <p>￥{{vip111.a*10}}</p>
                          <img src="../../public/img/dui.png" v-if="timers==12" alt="">
                        </button>
                      </div>
                    </div>
                  </div>
                  <div>
                    <p>实际金额：<span style="color:#FF6B00;margin-left:15px">￥{{vip111.mount}}</span></p>
                    <div style="margin-top:10px;display: flex;flex-direction: row;justify-content: space-between;">
                      <p><span class="weixin">微信支付：</span><img v-if="vip111!=''" style="width:150px;margin-left:10px" :src="'data:image/png;base64,'+vip111.img" alt=""></p>
                      <p style="margin-right:30px;"><el-popover placement="bottom" width="130" trigger="hover">
                        <img width="130px" src="../../public/img/qiye.png" alt="">
                        <span  slot="reference" class="weixin" style="cursor: pointer;">咨询开取发票</span></el-popover>
                      </p>
                    </div>
                  </div>
                  <div class="fangshi" style="margin-top:30px">
                    <span>温馨提示：</span>
                  </div>
                  <div class="tishi">
                    <p>1、开通VIP会员之后可以退款吗?</p>
                    <p>VIP会员服务为虚拟服务,购买成功后立即生效,暂不接受退款,敬请谅解。</p>
                    <p>2、VIP会员价格会变化吗?</p>
                    <p>随着新增功能服务和课程的增加,我们的VIP价格也会随之浮动,已开通的VIP会员权益无影响。</p>
                  </div>
                </div>
                <div class="mokuai" :class="{active1:shows=='outbox'}">
                  <div class="coupon" >
                    <span style="font-family:Source Han Sans CN;font-weight:600;">发件箱：</span>
                  </div>
                  <div class="fajian">
                    <div class="showjianren">
                      <span style="font-family:Source Han Sans CN;font-weight:600;">收件人：</span><input v-show="isDate" placeholder="请输入收件人手机号" v-model="sjr" type="text"><span v-show="!isDate">SangerBox助手</span>
                    </div>
                    <div class="showjianren">
                      <span style="font-family:Source Han Sans CN;font-weight:600;margin-right:14px">标题：</span><input placeholder="请输入标题" v-model="title" type="text">
                    </div>
                    <div >
                      <p style="line-height:30px;font-family:Source Han Sans CN;font-weight:600;">内容：</p>
                      <Ue v-on:catchData="catchData" :content='con'/>
                      <el-button style="margin-top:20px;background:#3366cc;color:#fff" @click="sendEmail">发送</el-button>
                    </div>
                  </div>
                </div>
                <div class="mokuai" :class="{active1:shows=='inbox'}">
                  <div class="coupon" >
                    <span style="font-family:Source Han Sans CN;font-weight:600;">收件箱</span>
                  </div>
                  <div class="inbox111">
                    <el-table @row-click="toemaildetails" v-if="tableData.length>0" :data="tableData" style="width: 100%" >
                      <el-table-column fixed label="发件人" width="150">
                        <template slot-scope="scope">
                          <span class="yihang" :style="{fontWeight:(scope.row.isRead==0?'600':'500')}">
                              {{scope.row.msgFrom=='13456826965'?'SangerBox客服':scope.row.msgFrom}}
                          </span>
                        </template>
                      </el-table-column>
                      <el-table-column  label="主题" width="460">
                        <template slot-scope="scope">
                          <span class="yihang" :style="{fontWeight:(scope.row.isRead==0?'600':'500')}" :title="scope.row.subject">
                              {{scope.row.subject}}
                          </span>
                        </template>
                      </el-table-column>
                      <el-table-column label="时间" width="90">
                        <template slot-scope="scope">
                          <span class="yihang" :style="{fontWeight:(scope.row.isRead==0?'600':'500')}" style="display: inline-block;white-space: nowrap;word-break: keep-all;">
                              {{scope.row.createTime}}
                          </span>
                        </template>
                      </el-table-column>
                    </el-table>
                    <el-pagination style="margin-top:10px"
                      @current-change="inboxhandleCurrentChange"
                      :current-page.sync="inboxcurrentPage"
                      layout="total, prev, pager, next" 
                      :page-size="20"
                      :total="inboxall">
                    </el-pagination>
                  </div>
                </div>
                <div class="mokuai" :class="{active1:shows=='emaildetails'}">
                  <div class="coupon" >
                    <span style="font-family:Source Han Sans CN;font-weight:600;">邮件详情：</span>
                  </div>
                  <div v-if="emailinfo!=null">
                    <div class="showjianren">
                      <span style="font-family:Source Han Sans CN;font-weight:600;">发件人：{{emailinfo.msgFrom=='13456826965'?'SangerBox客服':emailinfo.msgFrom}}</span>
                    </div>
                    <div class="showjianren">
                      <span style="font-family:Source Han Sans CN;font-weight:600;margin-right:14px">收件人：{{emailinfo.msgTo=='13456826965'?'SangerBox客服':emailinfo.msgTo}}</span>
                    </div>
                    <div class="">
                      <span style="font-family:Source Han Sans CN;margin-right:14px;word-wrap:break-word;line-height:14px">主题：<span>{{emailinfo.subject}}</span></span>
                    </div>
                    <p style="margin-top: 20px;">时间：{{emailinfo.createTime}}</p>
                    <div class="emailContent" style="word-wrap:break-word;" @click="showLog(emailinfo.msg)" v-html="emailinfo.msg">
                    </div>
                    <el-button v-if="ziji" style="margin-top:20px;background:#3366cc;color:#fff" @click="tooutbox">回复</el-button>
                    <el-button style="margin-top:20px;background:#3366cc;color:#fff" @click="toback">返回</el-button>
                  </div>
                </div>
                <div class="mokuai" :class="{active1:shows=='send'}">
                  <div class="coupon" >
                    <span style="font-family:Source Han Sans CN;font-weight:600;">已发送</span>
                  </div>
                  <div class="inbox111">
                    <el-table @row-click="sendtoemaildetails" v-if="sendtableData.length>0" :data="sendtableData" style="width: 100%" >
                      <el-table-column fixed label="收件人" width="150">
                        <template slot-scope="scope">
                          <span class="yihang">
                              {{scope.row.msgTo=='13456826965'?'SangerBox客服':scope.row.msgTo}}
                          </span>
                        </template>
                      </el-table-column>
                      <el-table-column  label="主题" width="460">
                        <template slot-scope="scope">
                          <span class="yihang">
                              {{scope.row.subject}}
                          </span>
                        </template>
                      </el-table-column>
                      <el-table-column label="时间" width="90">
                        <template slot-scope="scope">
                          <span class="yihang" style="display: inline-block;white-space: nowrap;word-break: keep-all;">
                              {{scope.row.createTime}}
                          </span>
                        </template>
                      </el-table-column>
                    </el-table>
                  </div>
                  <el-pagination style="margin-top:10px"
                    @current-change="sendhandleCurrentChange"
                    :current-page.sync="sendcurrentPage"
                    layout="total, prev, pager, next" 
                    :page-size="20"
                    :total="sendall">
                  </el-pagination>
                </div>
                <Addcun class="mokuai" ref="addCuncom" :fn="backVip" v-if="shows=='addcun'" :class="{active1:shows=='addcun'}"/>
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
import Addcun from '../components/personalComponents/addcun'

import contextButton from '../components/contextButton'
import { pako_ungzip } from '../../public/js/indexof'
import { geturl } from '../../public/js/status'
import Ue from '../components/ue'
export default {
  metaInfo() {
    return {title:'SangerBox个人中心'} // set a title
  },
  data() {
    return {
      literature:false,journal:false,gene:false,info:false,literaturepinglun:false,journalpinglun:false,articleList:[],jourcacheList:[],geneList:[],geoList:[],articTitle:[],articleUserCommentList:[],jourcacheUserCommentList:[],Safety:false,data:false,task:false,tackList:[],date:true,dir:"/",fileList: [],fileslist:[],multipleSelection: [],header:{'Authorization': localStorage.getItem('authorization')},datadir:{dir:'/'},menuVisible: false,fanhui:true,mingcheng:'',wenjianjia:require('../../public/img/wenjian.png'),wenjian:require('../../public/img/wenjian1.png'),msg:'',mess:false,gerenxin:{},
      tankuang:false,loading10:false,datas1:'',rowurl:'',rowname:'',loading11:false,tankuangweixin:false,tankuangphone:false,loading12:false,Phone123:'',duanxin12:'',show1:false,countshow:false,count:'',img1:"",contenttype:'',loading:false,xiazaidisabled:false,tankuangemail:false,loading13:false,Email123:'',show11:false,email11:'',count1:'',countshow1:true,codeR:false,tool:false,toolsList:[],realTime:0,backStage:0,
      currentPage:1,pagesize:20,all:null,Sort:'',wenjianlujing:'',wenjianlujings:[],loading20:false,tankuangyidong:false,msg111:'',action:'',
      vip:false,inboxcurrentPage:1,inboxall:40,sendcurrentPage:1,sendall:40,jindu:null,detail:'',aid:null,Vipdata:[],
      exchange:'',discounts:null,product:'0',timers:1,vip111:'',getUserMember:null,TCdisabled:0,mounth1:1,r:0,search:'',shows:'date',sjr:'',title:'',con:'',tableData:[],dataContent:'',downrenwu:true,emailinfo:null,zhannei:true,sendtableData:[],ziji:true,isDate:true,isVip:0,type111:'',dialogVisible:false,logInfo:{toolName:'',phone:'',cmd:'',log:''},
      maxRam:{}
    }
  },
  created() {
    this.phone=localStorage.getItem('phone')
    
  },
  mounted() {
    
  },
  components:{
    Header,Footer,contextButton,Ue,Addcun
  },
  watch: {
    
    dir(val){
      if(val=="/"){
        this.fanhui=true
      }else{
        this.fanhui=false
      }
      this.datadir.dir=this.dir
    }
  },
  computed: {
  },
  activated() {
    if(localStorage.getItem('download')!=null && localStorage.getItem('download')>0){
      this.downrenwu=true
    }else{
      this.downrenwu=false
    }
    if(localStorage.getItem('zhannei')!=null && localStorage.getItem('zhannei')>0){
      this.zhannei=true
    }else{
      this.zhannei=false
    }
    this.getRouterData()
    this.axios.get(`/user/getUserInfo`).then(result=>{
      this.gerenxin=result.data.datas
      if(this.gerenxin!=undefined || this.gerenxin!=null){
        this.isVip=result.data.datas.isVip
        localStorage.setItem('isvip',result.data.datas.isVip)
      }
    })
    this.axios.get(`/tools/getMyUseTool`).then(result=>{
      if(result.data.data!=null && result.data.data!=undefined){
        this.realTime=result.data.data['0']
        this.backStage=result.data.data['1']
      }
    })
    this.action=geturl()+'/files/uploadUserFile'
    
  },
  methods: {
    showLog(msg){
      if(localStorage.getItem('mobile')=='13456826965' || localStorage.getItem('mobile')=='13777421877'){
        var qs=require('qs');
        this.axios.post(`/tools/lookUserLogInfo`, qs.stringify({
          id:msg
        })).then(result=>{
          if(result.data.code==200){
            this.dialogVisible=true
            this.logInfo=result.data.data
          }else{
            this.$message({
              message:'log不存在',
              type:'warning'
            })
          }
          console.log(result)
        })
      }
      
    },
    dialogClose(){
      this.dialogVisible=false
    },
    headercellstyle(row){
      if(row.columnIndex==1){
        return {
          backgroundColor:"#2C95E1",
          textAlign:'center',
          color:'#fff'
        }
      }else if(row.columnIndex==2 || row.columnIndex==3 || row.columnIndex==4){
        return {
          backgroundColor:"#3366CC",
          textAlign:'center',
          color:'#fff'
        }
      }else if(row.columnIndex==5){
        return {
          backgroundColor:"#FF6B00",
          textAlign:'center',
          color:'#fff'
        }
      }
    },
    toback(){
      if(this.type111=='send'){
        this.Send()
      }else{
        this.Inbox()
      }
    },
    tooutbox(){
      this.Outbox(this.$route.query.type,this.datas1)
    },
    sendtoemaildetails(row, event, column){
      this.ziji=false
      this.$router.push({path:'/Personal',query:{type:'emaildetails',id:row.id}}); 
      this.shows='emaildetails'
      this.axios.get('/user/getMsg',{params:{id:row.id}}).then(result=>{
        this.emailinfo=result.data.datas
      })
    },
    toemaildetails(row, event, column){
      this.ziji=true
      this.type111=this.$route.query.type
      this.$router.push({path:'/Personal',query:{type:'emaildetails',id:row.id}}); 
      this.shows='emaildetails'
      this.axios.get('/user/getMsg',{params:{id:row.id}}).then(result=>{
        this.emailinfo=result.data.datas
      })
    },
    sendEmail(){
      if(this.sjr!='' && this.title!='' && this.dataContent!=''){
        var qs=require('qs');
        this.$axios.post(`/user/sendMsg`, qs.stringify({
          to:this.sjr.toLowerCase()=='sangerbox助手'?'13456826965':this.sjr,
          subject:this.title,
          msg:this.dataContent
        })).then(result=>{
          if(result.data.resp_code==0){
            this.Inbox()
          }
        })
      }else{
        this.$message.error('收件人，主题，内容都不能为空');
      }
    },
    beforeupload(file){
      var p=new RegExp(/^[a-z0-9A-Z_]+$/)
      if(p.test(file.name.substr(0,file.name.lastIndexOf(".")))==false){
        this.$message({
          message: '文件名格式错误，只能用字母、数字或下划线命名！',
          type: 'warning'
        });
        return false;
      }
    },
    Search(){
      this.loading=true
      this.axios.get(`/files/listUserFile`,{params:{
        dir:this.dir,
        page:1,
        total:this.pagesize,
        sort:this.Sort,
        keyword:this.search
      }}).then(result=>{
        if(result.data.data!=undefined){
          this.fileslist=result.data.data.datas
          this.all=result.data.data.all
          this.loading=false
        }
      })
    },
    vipchange(){
      this.mounth1=1
      this.timers=1
      if(this.getUserMember!=null){
        if(this.getUserMember.name=='无忧中级版'){
          var c = 1
        }else if(this.getUserMember.name=='无忧高级版'){
          var c = 2
        }else if(this.getUserMember.name=='超级用户'){
          var c = 3
        }else if(this.getUserMember.name=='无忧初级版'){
          var c = 0
        }
        if(c!=this.product){
          var b = this.vip111.day/30
          if(b<=1){
            this.mounth1=1
            this.timers=1
          }else if(b<=3){
            this.mounth1=3
            this.timers=3
          }else if(b<=6){
            this.mounth1=6
            this.timers=6
          }else if(b<=12){
            this.mounth1=12
            this.timers=12
          } 
        }else{
          this.timers=1
          this.mounth1=1
        }
      }
      if(this.product==0){
        // var a = '87459b98ba0d47b3961503cbc2011b65'
        var a = 'eadd72555fb04ab7942b39131db1ae3e'
      }else if(this.product==1){
        // var a = 'eadd72555fb04ab7942b39131db1ae3e'
        var a = 'c3e18ea588b944b0810fa5fddcc2ebdd'
      }else if(this.product==2){
        // var a = 'c3e18ea588b944b0810fa5fddcc2ebdd'
        var a = '3e5d20ae3da94333bdd8f6015ff91933'
      }else if(this.product==3){
        var a = '9e8ba30f9e554cfba844c32a29ccfcbf'
        // var a = '3e5d20ae3da94333bdd8f6015ff91933'
        this.mounth1=12
        this.timers=12
      }
      this.axios.get(`/pay/getPayInfo`,{
        params:{
          goodId:a,
          month:this.timers}
      }).then(result=>{
        if(result.data.data!=null){
          this.vip111=result.data.data
        }
      })
    },
    mounth(a){
      this.timers=a
      
      if(this.product==0){
        // var a = '87459b98ba0d47b3961503cbc2011b65'
        var a = 'eadd72555fb04ab7942b39131db1ae3e'
      }else if(this.product==1){
        // var a = 'eadd72555fb04ab7942b39131db1ae3e'
        var a = 'c3e18ea588b944b0810fa5fddcc2ebdd'
      }else if(this.product==2){
        // var a = 'c3e18ea588b944b0810fa5fddcc2ebdd'
        var a = '3e5d20ae3da94333bdd8f6015ff91933'
      }else if(this.product==3){
        var a = '9e8ba30f9e554cfba844c32a29ccfcbf'
        // var a = '3e5d20ae3da94333bdd8f6015ff91933
      }
      this.axios.get(`/pay/getPayInfo`,{
        params:{
          goodId:a,
          month:this.timers}
      }).then(result=>{
        if(result.data.data!=null){
          this.vip111=result.data.data
        }
      })
    },
    Exchange1(){
      this.axios.get('/pay/getPayCoupon',{
        params:{uuid:this.exchange}
      }).then(result=>{
        if(result.data.code==0){
          this.$message({
            message: result.data.msg,
            type: 'success'
          });
          this.axios.get('/pay/getCouponInfo').then(result=>{
            if(result.data.data!=null){
              this.discounts=result.data.data
            }
          })
        }else if(result.data.code==1){
          this.$message({
            message: result.data.msg,
            type: 'warning'
          });
        }
      })
      
    },
    toDate(a){
      if(a.status==200){
        if(a.successFilePath.substr(0,a.successFilePath.lastIndexOf("."))==''){
          this.$router.push({path:'/Personal',query:{type:'date'}}); 
          this.$store.commit('addup')
          this.date1()
          this.dir=a.successFilePath
          this.shuaxin()
        }
        if(a.successFilePath.substr(a.successFilePath.lastIndexOf(".")+1)=='txt' || a.successFilePath.substr(a.successFilePath.lastIndexOf(".")+1)=='log'){
          this.$router.push({path:'/Personal',query:{type:'date'}}); 
          this.$store.commit('addup')
          this.date1()
          this.dir='/'
          this.shuaxin()
        }
      }else{
        if(a.errorFilePath.substr(0,a.errorFilePath.lastIndexOf("."))==''){
          this.$router.push({path:'/Personal',query:{type:'date'}}); 
          this.$store.commit('addup')
          this.date1()
          this.dir=a.errorFilePath
          this.shuaxin()
        }
        if(a.errorFilePath.substr(a.errorFilePath.lastIndexOf(".")+1)=='txt' || a.errorFilePath.substr(a.errorFilePath.lastIndexOf(".")+1)=='log'){
          this.$router.push({path:'/Personal',query:{type:'date'}}); 
          this.$store.commit('addup')
          this.date1()
          this.dir='/'
          this.shuaxin()
        }
      }
    },
    moves(){
      if(this.wenjianlujing!=''){
        this.axios.get(`/files/moveFile`,{
          params:{
            file:this.msg111.url,
            to:this.wenjianlujing
          }
        }).then(result=>{
          if(result.data.code==200){
            this.$message({
              message: '文件移动成功',
              type: 'success'
            });
            this.tankuangyidong=false
          }else{
            this.$message({
              message: '文件移动失败',
              type: 'warning'
            });
            this.tankuangyidong=false
          }
        })
      }else{
        this.$message({
          message: '选择的路径不能为空',
          type: 'warning'
        });
      }
    },
    handleClose(){

    },
    sortChange(column, prop, order){
      if(column.order=='ascending' && column.prop=='name'){
        this.Sort='name_asc'
      }else if(column.order=='descending' && column.prop=='name'){
        this.Sort='name_desc'
      }else if(column.order=='ascending' && column.prop=='updateTime'){
        this.Sort='updateTime_asc'
      }else if(column.order=='descending' && column.prop=='updateTime'){
        this.Sort='updateTime_desc'
      }else if(column.order=='ascending' && column.prop=='size'){
        this.Sort='size_asc'
      }else if(column.order=='descending' && column.prop=='size'){
        this.Sort='size_desc'
      }else{
        this.Sort=''
      }
      this.loading=true
      this.axios.get(`/files/listUserFile`,{params:{
        dir:this.dir,
        page:1,
        total:this.pagesize,
        sort:this.Sort,
        keyword:this.search
      }}).then(result=>{
        this.msg=result.data.msg
        var file111=result.data.data.datas
        this.all=result.data.data.all
        if(result.data.data.datas!=undefined){
          for(var a in file111){
            if(file111[a].name=='uploads'){
              file111.unshift(file111.splice(a,1)[0])
              if(file111[a].name=='tools'){
                file111.unshift(file111.splice(a,1)[0])
              }
            }
          }
          this.fileslist=file111
          this.loading=false
        }
      })
    },
    handleSizeChange(val){
      this.pagesize=val
    },
    handleCurrentChange(currentPage){
      this.loading=true
      this.axios.get(`/files/listUserFile`,{params:{
        dir:this.dir,
        page:currentPage,
        total:this.pagesize,
        sort:this.Sort,
        keyword:this.search
      }}).then(result=>{
        this.msg=result.data.msg
        var file111=result.data.data.datas
        this.all=result.data.data.all
        if(result.data.data.datas!=undefined){
          for(var a in file111){
            if(file111[a].name=='uploads'){
              file111.unshift(file111.splice(a,1)[0])
              if(file111[a].name=='tools'){
                file111.unshift(file111.splice(a,1)[0])
              }
            }
          }
          this.fileslist=file111
          this.loading=false
        }
      })
    },
    inboxhandleCurrentChange(currentPage){
      this.inboxcurrentPage=currentPage
      this.Inbox()
    },
    sendhandleCurrentChange(currentPage){
      this.sendcurrentPage=currentPage
      this.Send()
    },
    getRouterData(){
      switch (this.$route.query.type) {
        case 'task':
          this.task1()
          break;
        case 'Safety':
          this.Safety1()
          break;
        case 'data':
          this.data1()
          break;
        case 'literature':
          this.literature1()
          break;
        case 'journal':
          this.journal1()
          break;
        case 'gene':
          this.gene1()
          break;
        case 'info':
          this.info1()
          break;
        case 'tools':
          this.tools()
          break;
        case 'literaturepinglun':
          this.literaturepinglun1()
          break;
        case 'journalpinglun':
          this.journalpinglun1()
          break;
        case 'date':
          this.date1()
          break;
        case 'coupon':
          this.Discount()
          break;
        case 'vip':
          this.Vip()
          break;
        case 'outbox':
          this.Outbox()
          break;
        case 'inbox':
          this.Inbox()
          break;
        case 'send':
          this.Send()
          break;
        case 'emaildetails':
          this.Emaildetails()
      }
    },
    rizhi(a){
      this.contenttype='text'
      this.datas1=a.log
      this.rowurl='log'
      this.rowname=''
      this.tankuang=true
    },
    error(err, file, fileList){
      // console.log(err)
    },
    bingemail(){
      var qs=require('qs');
      this.axios.post("/user/bindEmail",
        qs.stringify({
          'email':this.Email123,
          'code':this.email11
        })
      ).then(res =>{
        if(res.data.resp_code==0 && res.data.resp_msg=='success'){
          this.$message({
            message: '绑定成功！',
            type: 'success'
          });
          this.tankuangemail=false
          this.axios.get(`/user/getUserInfo`).then(result=>{
            this.gerenxin=result.data.datas
          })
        }else{
          this.$message.error('绑定失败！');
        }
      })
    },
    sendemail(){
      //验证邮箱格式是否正确
      if (!(/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(this.Email123))) {
        this.codeR=false
        this.show11=true
      } else if (this.Email123 == "" || !this.Email123) {
        this.codeR=false
        this.show11=true
      } else{
        this.codeR=false
        this.show11=false
        var qs=require('qs');
        const TIME_COUNT = 120;
        if (!this.timer) {
          this.count1 = TIME_COUNT;
          this.countshow1 = false;
          //使得按钮不可用
          this.isAble=true
          document.getElementById('email').style.cursor = 'not-allowed'
          this.timer = setInterval(() => {
          if (this.count1 > 0 && this.count1 <= TIME_COUNT) {
            this.count1--;
          } else {
            this.countshow1 = true;
            //按钮可用
            //清楚计时器
            this.isAble=false
            document.getElementById('email').style.cursor = 'pointer'
            clearInterval(this.timer);
            this.timer = null;
            }
          }, 1000)
        }
        this.axios.post("/user/getEmailCode",
          qs.stringify({
            'email':this.Email123
          })
        ).then(res =>{
          if(res.resp_msg=='parm_error' && res.resp_code==1){
            this.$message({
              message: '邮箱不存在',
              type: 'warning'
            });
          }else{
          }
          
        })
      }
    },
    send(){
      if (!(/^1[03456789]\d{9}$/.test(this.Phone123))) {
        this.show1=true
      } else if (this.Phone123 == "" || !this.Phone123) {
        this.show1=true
      }else{
        this.show1=false
        var qs=require('qs');
        this.axios.post(
          "/user/addMobile",
          qs.stringify({
            "user":this.phone
          })
          ).then(res =>{
            if(res.data.resp_code==1){
              //发送验证码有60秒的控制时间
              const TIME_COUNT = 60;
              if (!this.timer) {
                this.count = TIME_COUNT;
                this.countshow = false;
                //使得按钮不可用
                this.isAble=true
                document.getElementById('phone').style.cursor = 'not-allowed'
                this.timer = setInterval(() => {
                if (this.count > 0 && this.count <= TIME_COUNT) {
                  this.count--;
                } else {
                  this.countshow = true;
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
          }
        )
      }
    },
    phone1(){
      this.tankuangphone=true
    },
    email1(){
      this.tankuangemail=true
    },
    downDiscuoption2(){
      this.tankuangphone=false
    },
    downDiscuoption3(){
      this.tankuangemail=false
    },
    weixin1(){
      this.tankuangweixin=true
      window.WxLogin({
        self_redirect:true,
        id:"login_container",
        appid: "wx214d2ccc7c0b3d3b",
        scope: "snsapi_login",
        redirect_uri: "http%3a%2f%2fsangerbox.com%2fbindWeChat",
        state: localStorage.getItem('authorization'),
        style: "white",
        href: "data:text/css;base64,DQouc3RhdHVzX2ljb24ge2Rpc3BsYXk6IG5vbmU7fQ0KLmltcG93ZXJCb3ggLnN0YXR1cyB7dGV4dC1hbGlnbjogY2VudGVyO30gDQpib2R5e2NvbG9yOiBibGFjazt9DQouaW1wb3dlckJveCAucXJjb2Rlew0KICBib3JkZXI6IG5vbmUgIWltcG9ydGFudDsNCn0NCi5pbmZvew0KICB3aWR0aDogMjUwcHggIWltcG9ydGFudDsNCiAgbWFyZ2luLXRvcDogMjBweCAhaW1wb3J0YW50Ow0KfQ0KLmltcG93ZXJCb3ggLnN0YXR1c3sNCiAgcGFkZGluZzogMDsNCn0NCg=="
      });
    },
    downDiscuoption1(){
      this.tankuangweixin=false
    },
    yunxing(a){
      if(a.projectType=="pubmed"){
        this.axios.get(`/pubmed/repeatUserRabbitTack`,{params:{
          id:a.id
        }}).then(result=>{
          if(result.status==200){
            this.axios.get(`/pubmed/getUserRabbitTackInfo`).then(result=>{
            if(result.data.res.tackList!=undefined){
              this.tackList=result.data.res.tackList
            }
          })
          }
        })
      }else{
        this.axios.get(`/tools/reRunTool`,{params:{
          id:a.id
        }}).then(result=>{
          if(result.status==200){
            this.axios.get(`/pubmed/getUserRabbitTackInfo`).then(result=>{
              if(result.data.res.tackList!=undefined){
                this.tackList=result.data.res.tackList
              }
            })
          }
        })
      }
    },
    settingEvent(){},
    downDiscuoption(){
      this.tankuang=false
    },
    endRun(item){
      this.$confirm('确认终止运行?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.axios.get(`/tools/stopRunTool`,{params:{
          id:item.id
        }}).then(result=>{
          console.log(result.data)
          if(result.data.code==200){
            console.log(1111)
            this.axios.get(`/pubmed/getUserRabbitTackInfo`).then(result=>{
              if(result.data.res.tackList!=undefined){
                this.tackList=result.data.res.tackList
              }
            })
          }
        })
      }).catch(() => {        
      });
      
    },
    shanchu(item){
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.axios.get(`/pubmed/delUserRabbitTackInfo`,{params:{
          id:item.id
        }}).then(result=>{
          if(result.data.status==200){
            this.axios.get(`/pubmed/getUserRabbitTackInfo`).then(result=>{
              if(result.data.res.tackList!=undefined){
                this.tackList=result.data.res.tackList
              }
            })
          }
        })
      }).catch(() => {       
      });
    },
    xizai1(name){
      this.axios.get('/files/downUserFile',{params:{dir:this.rowurl}}).then(result=>{
        window.open(result.data)
      })
    },
    openUploads(row){
      this.axios.get(`/files/listUserFile`,{params:{
        dir:`${row.url}`,
        page:1,
        total:this.pagesize,
        sort:this.Sort
      }}).then(result=>{
        if(result.data.data!=undefined){
          this.dir=row.url
          this.fileslist=result.data.data.datas
        this.all=result.data.data.all
        }
      })
    },
    handleGoods(row){
      if(row.type=="dir"){
        this.loading=true
        this.axios.get(`/files/listUserFile`,{params:{
          dir:`${row.url}`,
          page:1,
          total:this.pagesize,
          sort:this.Sort,
          keyword:''
        }}).then(result=>{
          if(result.data.data!=undefined){
            this.dir=row.url
            this.fileslist=result.data.data.datas
            this.all=result.data.data.all
            this.loading=false
          }
        })
      }else{
        this.axios.get(`/files/lookUserFile`,{params:{
          dir:`${row.url}`
        }}).then((response)=>{
          if(response.headers["content-type"]=='image/png;charset=UTF-8' || response.headers["content-type"]=='image/jpeg;charset=UTF-8'){
            this.contenttype='img'
            this.img1=`data:image/png;base64,${response.data}`
            this.datas1=''
            this.rowurl=row.url
            this.rowname=row.name
            this.tankuang=true
          }else if(response.headers["content-type"]=='application/pdf;charset=UTF-8'){
            this.contenttype='pdf'
            const {href} =this.$router.resolve({
              path: '/pdf',
              query:{
                url:response.data
              },
            })
            window.open(href, '_blank')
          }else{
            this.contenttype='text'
            this.datas1=response.data.toString()
            console.log(this.datas1.split(/\n/g))
            this.rowurl=row.url
            this.rowname=row.name
            this.tankuang=true
          }
          
        })
      }
    },
    xinjian(dir){
      this.loading=true
      this.$prompt('请输入名称', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      }).then(({ value }) => {
        if(value.indexOf(' ')!=-1 || value.indexOf('\\')!=-1){
          this.$message({
            message: '文件夹名不能用空格和\\命名',
            type: 'warning'
          });
        }else{
          this.axios.get(`/files/addDirUserFile`,{params:{
            dir:`${dir}`,
            newName:value
          }}).then(result=>{
            $("#shuaxin").click()
            this.loading=false
          })
        }
      }).catch(() => {});
    },
    download(b){
      if(b.row.type=="dir"){
        this.aid=b.row.type+b.row.size+b.$index
        var qs=require('qs');
        this.$axios.post(`/tools/zipToolFile`, qs.stringify({
          dir:b.row.url,
        })).then(result=>{
          this.aid=null
        })
      }else{
        this.aid=b.row.type+b.row.size+b.$index
        this.axios.get('/files/downUserFile',{params:{dir:b.row.url}}).then(result=>{
          this.aid=null
          if(result.data.substring(0,4)!='Json'){
            window.open(result.data)
          }
        })
        
      }
    },
    toshang(dir){
      this.loading=true
      this.dir = this.dir.length>1? this.dir.substring(0, this.dir.lastIndexOf('/'))==""?this.dir="/":this.dir.substring(0, this.dir.lastIndexOf('/')):this.dir.substring(0, this.dir.lastIndexOf('/')+1)
      this.axios.get(`/files/listUserFile`,{params:{
        dir:`${this.dir}`,
        page:1,
        total:this.pagesize,
        sort:this.Sort,
        keyword:''
      }}).then(result=>{
        this.msg=result.data.msg
        var file111=result.data.data.datas
        this.all=result.data.data.all
        if(result.data.data.datas!=undefined){
          for(var a in file111){
            if(file111[a].name=='uploads'){
              file111.unshift(file111.splice(a,1)[0])
              if(file111[a].name=='tools'){
                file111.unshift(file111.splice(a,1)[0])
              }
            }
          }
          this.fileslist=file111
          this.loading=false
        }
      })
    },
    success(response, file, fileList){
      if(response.msg=='个人空间不足，请扩容'){
        this.$message({
          message: '个人空间不足，请扩容',
          type: 'warning'
        })
      }else if(response.msg=='上传失败，请检查文件名'){
        this.$message({
          message: '上传失败，文件名已存在',
          type: 'warning'
        })
      }else{
        this.$message({
          message: '上传成功',
          type: 'success'
        });
        this.shuaxin(this.dir)
      }
    },
    shuaxin(dir){
      this.loading=true
      this.axios.get(`/files/listUserFile`,{params:{
        dir:`${this.dir}`,
        page:this.currentPage,
        total:this.pagesize,
        sort:this.Sort,
        keyword:this.search
      }}).then(result=>{
        this.msg=result.data.msg
        var file111=result.data.data.datas
        this.all=result.data.data.all
        if(result.data.data.datas!=undefined){
          for(var a in file111){
            if(file111[a].name=='uploads'){
              file111.unshift(file111.splice(a,1)[0])
              if(file111[a].name=='tools'){
                file111.unshift(file111.splice(a,1)[0])
              }
            }
          }
          this.fileslist=file111
          this.loading=false
        }
      })
    },
    handledbClick(row, column, event) {
      // console.log(row)
      
    },
    chongmingming(a){
      this.$prompt('请输入名称', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputValue:a.name
      }).then(({ value }) => {
        if(value.indexOf(' ')!=-1 || value.indexOf('\\')!=-1){
          this.$message({
            message: '文件夹名不能用空格和\\命名',
            type: 'warning'
          });
        }else{
          this.axios.get(`/files/renameUserFile`,{params:{
            dir:`${a.url}`,
            newName:value
          }}).then(result=>{
            $("#shuaxin").click()
          })
        }
      }).catch(() => {});
        
    },
    move(a) {
      this.axios.get(`/files/getAllUserFile`,{
        params:{type:"folder"}
      }).then(result=>{
        if(result.data.data!=undefined){
          var fliselists=JSON.parse(pako_ungzip(result.data.data))
          var bbb=[]
          for(var aa in fliselists){
            var cc={}
            cc.value=fliselists[aa]
            cc.label=fliselists[aa]
            bbb.push(cc)
          }
          this.wenjianlujings=bbb
        }
      })
      this.tankuangyidong=true
      this.msg111=a
    },
    delete1(a){
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.axios.get(`/files/delUserFile`,{params:{
          dir:`${a.url}`
        }}).then(result=>{
          this.shuaxin(this.dir)
          if(result.data.code=='500'){
            this.$message({
              message: '删除失败',
              type: 'warning'
            });
          }
        })
      }).catch(() => {       
      });
      
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleRemove(file, fileList) {
      // console.log(file, fileList);
    },
    handlePreview(file) {
      // console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 3000 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${ file.name }？`);
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
    toMonogenic(a,b){
      const {href}=this.$router.resolve({
        path: '/Monogenic',
        query: {
          search1:b,
          Id:a
        },
      })
      window.open(href,'_blank')
    },
    collection1(id){
      var qs=require('qs');
      this.$axios.post(`/pubmed/editJourcacheCollect`, qs.stringify({
        nlmId:id,
        isCollect:0
      })).then(result=>{
        if(result.data.res.count>0){
          document.getElementById(`${id}`).style.display="none"
        }
      }).catch(error=>{
        if(error){
          throw error
        }
      })
    },
    collection2(id){
      var qs=require('qs');
      this.$axios.post(`/pubmed/editGeneCollect`, qs.stringify({
        geneId:id,
        isCollect:0
      })).then(result=>{
        if(result.data.res.count>0){
          document.getElementById(`${id}`).style.display="none"
        }
      }).catch(error=>{
        if(error){
          throw error
        }
      })
    },
    collection3(id){
      var qs=require('qs');
      this.$axios.post(`/pubmed/editGeoCollect`, qs.stringify({
        accession:id,
        isCollect:0
      })).then(result=>{
        if(result.data.res.count>0){
          document.getElementById(`${id}`).style.display="none"
        }
      }).catch(error=>{
        if(error){
          throw error
        }
      })
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
    toAllTools(id){
      const {href} =this.$router.resolve({
        path: '/AllTools',
        query:{
          tool_id:id
        }
      })
      window.open(href, '_blank')
    },
    collection(id){
      var qs=require('qs');
      this.$axios.post(`/pubmed/editArticleCollect`, qs.stringify({
        pmid:id,
        isCollect:0
      })).then(result=>{
        if(result.data.res.count>0){
          document.getElementById(`${id}`).style.display="none"
        }
      }).catch(error=>{
        if(error){
          throw error
        }
      })
    },
    collection4(id){
      var qs=require('qs');
      this.axios.post(`/tools/editToolCollect`, qs.stringify({
        id:id,
        isCollect:'0'
      })).then(result=>{
        if(result.data.code=='200'){
          document.getElementById(`${id}`).style.display="none"
        }
      }).catch(error=>{
        if(error){
          throw error
        }
      })
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
    date1(){
      this.$router.push({path:'/Personal',query:{type:'date'}}); 
      this.loading=true
      this.shows='date'
      this.axios.get(`/files/listUserFile`,{params:{
        dir:this.dir,
        page:1,
        total:this.pagesize,
        sort:this.Sort
      }}).then(result=>{
        this.msg=result.data.msg
        var file111=result.data.data.datas
        this.all=result.data.data.all
        if(result.data.data.datas!=undefined){
          for(var a in file111){
            if(file111[a].name=='uploads'){
              file111.unshift(file111.splice(a,1)[0])
              if(file111[a].name=='tools'){
                file111.unshift(file111.splice(a,1)[0])
              }
            }
          }
          this.fileslist=file111
          this.loading=false
        }
      })
    },
    task1(){
      this.$router.push({path:'/Personal',query:{type:'task'}}); 
      this.shows='task'
      this.$store.commit('addup')
      this.axios.get(`/pubmed/getUserRabbitTackInfo`).then(result=>{
        if(result.data.res.tackList!=undefined){
          this.tackList=result.data.res.tackList
        }
      })
    },
    Safety1(){
      this.$router.push({path:'/Personal',query:{type:'Safety'}}); 
      this.shows='Safety'
    },
    data1(){
      this.$router.push({path:'/Personal',query:{type:'data'}}); 
      this.shows='data'
    },
    literature1(){
      this.$router.push({path:'/Personal',query:{type:'literature'}}); 
      this.shows='literature'
      this.axios.get(`/pubmed/getArticleUserCollects`).then(result=>{console.log(result)
        if(result.data.res!=undefined){
          this.articleList=result.data.res.articleList
        }
      })
    },
    journal1(){
      this.$router.push({path:'/Personal',query:{type:'journal'}}); 
      this.shows='journal'
      this.axios.get(`/pubmed/getJourcacheUserCollects`).then(result=>{
        if(result.data.res.jourcacheList!=undefined){
          this.jourcacheList=result.data.res.jourcacheList
        }
      })
      
    },
    gene1(){
      this.$router.push({path:'/Personal',query:{type:'gene'}}); 
      this.shows='gene'
      this.axios.get(`/pubmed/getGenesUserCollects`).then(result=>{
        if(result.data.res.geneList!=undefined){
          this.geneList=result.data.res.geneList
        }
      })
      
    },
    info1(){
      this.$router.push({path:'/Personal',query:{type:'info'}}); 
      this.shows='info'
      this.axios.get(`/pubmed/getGeoUserCollects`).then(result=>{
        if(result.data.res.geoList!=undefined){
          this.geoList=result.data.res.geoList
        }
      })
    },
    tools(){
      this.$router.push({path:'/Personal',query:{type:'tools'}}); 
      this.shows='tools'
      this.axios.get(`/tools/getMyCollectTool`).then(result=>{
        if(result.data.data!=undefined && result.data.data!=null){
          this.toolsList=result.data.data
        }
      })
      
    },
    literaturepinglun1(){
      this.$router.push({path:'/Personal',query:{type:'literaturepinglun'}}); 
      this.shows='literaturepinglun'
      this.axios.get(`/pubmed/getArticleUserComments`).then(result=>{
        if(result.data.res.articleUserCommentList!=undefined){
          this.articleUserCommentList=result.data.res.articleUserCommentList
        }
      })
    },
    journalpinglun1(){
      this.$router.push({path:'/Personal',query:{type:'journalpinglun'}}); 
      this.shows='journalpinglun'
      this.axios.get(`/pubmed/getJourcacheUserComments`).then(result=>{
        if(result.data.res.jourcacheUserCommentList!=undefined){
          this.jourcacheUserCommentList=result.data.res.jourcacheUserCommentList
        }
      })
    },
    Discount(){
      this.$router.push({path:'/Personal',query:{type:'coupon'}}); 
      this.shows='coupon'
      this.axios.get('/pay/getCouponInfo').then(result=>{
        if(result.data.data!=null){
          this.discounts=result.data.data
        }
      })
    },
    Outbox(q,a){
      console.log(1)
      this.$router.push({path:'/Personal',query:{type:'outbox'}}); 
      this.shows='outbox';
      this.sjr='';
      this.title='';
      this.dataContent='';
      this.isDate=true;
      this.con="";
      if(q=='date' || q=='task'){
        this.tankuang=false
        this.isDate=false
        this.sjr='13456826965'
        this.con=a
      }
      if(q=='emaildetails'){
        this.sjr=this.emailinfo.msgFrom
        this.title='回复:'+this.emailinfo.subject
      }
    },
    Inbox(){
      this.$router.push({path:'/Personal',query:{type:'inbox'}}); 
      this.shows='inbox'
      this.axios.get('/user/getMsgAll',{params:{page:this.inboxcurrentPage}}).then(result=>{
        if(result.data!=null){
          this.tableData=result.data.datas
          this.inboxall=parseInt(result.data.resp_msg)
        }
      })
      this.$store.commit('zhanneiaddup')
    },
    Send(){
      this.$router.push({path:'/Personal',query:{type:'send'}}); 
      this.shows='send'
      this.axios.get('/user/getSendMsgAll',{params:{page:this.sendcurrentPage}}).then(result=>{
        if(result.data!=null){
          this.sendtableData=result.data.datas
          this.sendall=parseInt(result.data.resp_msg)
        }
      })
    },
    Emaildetails(){
      this.$router.push({path:'/Personal',query:{type:'emaildetails',id:this.$route.query.id}}); 
      this.shows='emaildetails'
      this.axios.get('/user/getMsg',{params:{id:this.$route.query.id}}).then(result=>{
        this.emailinfo=result.data.datas
      })
    },
    toAddcun(i){
      this.shows='addcun'
    },
    backVip(){
      console.log(1)
      this.shows='vip'
    },
    Vip(){
      this.$router.push({path:'/Personal',query:{type:'vip'}}); 
      this.shows='vip'
      this.axios.get(`/user/getMemberWebInfo`).then(result=>{
        if(result.data.datas){
          result.data.datas.splice(0,1)
          this.Vipdata=result.data.datas
        }
      })
      this.axios.get(`/files/getTotalSpace`).then(result=>{
        if(result.data.data!=null){
          this.maxRam=result.data.data
        }
      })
      this.axios.get(`/user/getUserMember`).then(result=>{
        this.getUserMember=result.data.datas
        if(this.getUserMember!=null){
          if(this.getUserMember.name=='无忧中级版'){
            this.TCdisabled=1
            this.product='1'
            this.timers=1
          }else if(this.getUserMember.name=='无忧高级版'){
            this.TCdisabled=2
            this.product='2'
            this.timers=1
          }else if(this.getUserMember.name=='超级用户'){
            this.TCdisabled=3
            this.product='3'
            this.timers=12
            this.mounth1=12
          }else if(this.getUserMember.name=='无忧初级版'){
            this.TCdisabled=0
            this.product='0'
            this.timers=1
          }
        }
        if(this.product==0){
          // var a = '87459b98ba0d47b3961503cbc2011b65'
          var a = 'eadd72555fb04ab7942b39131db1ae3e'
        }else if(this.product==1){
          // var a = 'eadd72555fb04ab7942b39131db1ae3e'
          var a = 'c3e18ea588b944b0810fa5fddcc2ebdd'
        }else if(this.product==2){
          // var a = 'c3e18ea588b944b0810fa5fddcc2ebdd'
          var a = '3e5d20ae3da94333bdd8f6015ff91933'
        }else if(this.product==3){
          var a = '9e8ba30f9e554cfba844c32a29ccfcbf'
          // var a = '3e5d20ae3da94333bdd8f6015ff91933'
        }
        this.axios.get(`/pay/getPayInfo`,{
          params:{
            goodId:a,
            month:this.timers}
        }).then(result=>{
          if(result.data.data!=null){
            this.vip111=result.data.data
          }
        })
      })
    },
    catchData(data){
      this.dataContent=data
    },
  }
}
</script>
<style scoped>
  @media screen and (min-width:1200px){
    .personalContent{
      width: 1200px !important;
    }
  }
  @media screen and (max-width:992px){
    .personalContent{
      flex-direction: column !important;
    }
    .contentLeft{
      width: 100% !important
    }
    .contentLeft>div{
      width: 50% !important;
      margin: 0 auto!important;
    }
    .contentRight{
      width: 100% !important;
    }
    .contentRight>div{
      width: 65% !important;
      margin: 0 auto!important;
    }
  }
  @media screen and (max-width:768px){
    .contentRight>div{
      width: 100% !important;
      margin: 0 auto!important;
    }
    .contentLeft>div{
      width: 100% !important;
      margin: 0 auto!important;
    }
  }
  .personal{
    background: #E7EDF9;
    width:100%;
    overflow: hidden;
  }
  .personal>div{
    width: 100%;
    margin: 20px 0;
    background:#fff;
  }
  .personalContent{
    width: 100%;
    background: #E7EDF9;
    display: flex;
    flex-direction: row;
    margin: 0 auto;
  }
  .contentLeft{
    width: 35%;
    margin-right: 20px;
    background:#fff;
  }
  .contentLeft>div{
    padding: 20px;
    box-sizing: border-box;
  }
  .leftHeader{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .leftHeader>div{
    width:72px;
    height:22px;
    background:rgba(65,89,247,1);
    border-radius:11px;
    line-height: 22px;
    text-align: center;
  }
  .leftHeader>div>span{
    font-size: 12px;
    color: #fff;
  }
  .leftHeader>img{
    width: 16px;
    height: 16px;
  }
  .leftContent{
    text-align: center;
    margin-top: 50px;
    border-bottom: 1px solid #F5F5F5;
  }
  .leftContent>span{
    display: inline-block;
    width: 90px;
    height: 90px;
    border-radius:50%;
    background:rgba(65,89,247,1);
  }
  .leftContent>span>img{
    width: 90px;
  }
  .leftContent>p:nth-child(2){
    font-size:16px;
    font-family:Source Han Sans CN;
    font-weight:500;
    color:rgba(51,51,51,1);
    margin-top: 20px;
  }
  .leftContent>p:nth-child(3){
    font-size:14px;
    font-family:Source Han Sans CN;
    font-weight:400;
    color:rgba(128,128,128,1);
    margin-top: 10px;
  }
  .leftContent>p:nth-child(4){
    font-size:14px;
    font-family:Source Han Sans CN;
    font-weight:400;
    color:rgba(128,128,128,1);
    margin-top: 10px;
  }
  .order{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 30px;
    text-align: center;
    margin-bottom: 15px;
  }
  .order>div>p{
    font-size:14px;
    font-family:Source Han Sans CN;
    font-weight:500;
    color:rgba(51,51,51,1);
  }
  .order>div>span{
    font-size:14px;
    font-family:Source Han Sans CN;
    font-weight:400;
    color:rgba(51,51,51,1);
  }
  .leftFooter{
    margin-top: 15px;
    margin-bottom: 20px;
  }
  .leftFooter>p{
    font-size:14px;
    font-family:Source Han Sans CN;
    font-weight:400;
    color:rgba(51,51,51,1);
  }
  .leftFooter>button{
    margin:10px 5px;
  }
  .contentRight{
    width: 65%;
    background:#fff;
    padding: 20px;
    padding-left: 40px;
    box-sizing: border-box;
  }
  .contentRight>div>ul{
    display: flex;
    flex-direction: row;
    margin-bottom: 30px;
    border-bottom: 1px solid #f5f5f5;
    padding-bottom: 20px;
  }
  .contentRight>div>ul>li{
    margin-right: 3%;
  }
  .el-dropdown{
    font-size:14px;
    font-family:Source Han Sans CN;
    font-weight:400;
    color:rgba(153,153,153,1);
  }
  .mokuai {
    display: none;
  }
  .mokuai>div:nth-child(1){
    font-size:14px;
    font-family:Source Han Sans CN;
    font-weight:400;
    color:rgba(51,51,51,1);
    margin-bottom: 20px;
    margin-left: -40px;
    border-left: 2px solid #4159F7;
  }
  .mokuai>div:nth-child(1)>span{
    margin-left: 40px;
  }
  .mokuai>ul>li{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 50px 0;
  }
  .mokuai>ul>li>div:first-child>img{
    width: 36px;
    vertical-align: middle;
  }
  .mokuai>ul>li>div:first-child>div{
    display: inline-block;
    vertical-align: middle;
    margin-left: 15px;
  }
  .mokuai>ul>li>div:last-child{
    width:60px;
    height:28px;
    background:rgba(245,245,245,1);
    border-radius:14px;
    text-align: center;
    line-height: 28px;
    color: #999999;
    margin-top: 5px;
  }
  .mokuai>ul>li>div:last-child:hover{
    background:rgba(65,89,247,1);
    color: #fff;
    cursor: pointer;
  }
  .mokuai>div:nth-child(1){
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .mokuai1>div{
    margin-left: -40px;
    border-left: 2px solid #4159F7;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    line-height: 28px;
    margin-bottom: 20px;
  }
  .mokuai1>div>span{
    margin: 0;
    margin-left: 40px;
    font-size:14px;
    font-family:Source Han Sans CN;
    font-weight:600;
    color:rgba(51,51,51,1);
  }
  .mokuai1>div>button{
    width:60px;
    height:28px;
    background:rgba(65,89,247,1);
    border-radius:14px;
    text-align: center;
    line-height: 28px;
    border: none;
  }
  .mokuai1>div>button>span{
    color: #fff;
    font-size: 14px;
  }
  .mokuai1>p{
    font-size:14px;
    font-family:Source Han Sans CN;
    font-weight:400;
    color:rgba(51,51,51,1);
    line-height: 30px;
  }
  .mokuai1>p>span{
    font-size:12px;
    font-family:Source Han Sans CN;
    font-weight:400;
    color:rgba(153,153,153,1);
  }
  .wenxian{
    margin-bottom: 10px;
    font-weight: 400;
  }
  .wenxian>div:nth-child(1){
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .wenxian>div:nth-child(1)>p>img{
    vertical-align: middle;
    margin-right: 5px;
  }
  .wenxian>div:nth-child(1)>p>span{
    vertical-align: middle;
    margin: 0 5px;
  }
  .wenxian>div:nth-child(2)>p{
    font-size: 13px;
    margin-top: 10px;
  }
  .ho:hover{
    color: #3366cc;
    text-decoration: underline;
    cursor: pointer;
    
  }
  .top1{
    display: flex;
    flex-direction: row;
    padding-top: 10px; 
    border-top: 1px solid #dcdcdc;
  }
  .top1>p:last-child{
    width: 250px;
    line-height: 28px;
    text-align: right;
  }
  .top1>div>button{
    margin: 0 5px;
  }
  .top1>div:nth-child(2){
    width: 142px;
    margin-left: 10px;
  }
  .top1>>>.el-upload__input{
    display: none;
  }
  /* .top1>>>.el-upload-list{
    display: none
  }
  .top1>>>.el-upload-list--text{
    display: none
  } */
  .renwu22{
    width: 100%;
  }
  .renwu22>tr>td{
    padding: 10px 3px;
  }
  .sup1{
    background-color: #f56c6c;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    color: #fff;
    display: inline-block;
    font-size: 12px;
    text-align: center;
    white-space: nowrap;
    border: 1px solid #fff;
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
    z-index: 10101 ;
  }
  .shanchu{
    cursor: pointer;
    color: #3366cc;
  }
  .geren{
    margin-top: 10px;
    border-top: 1px solid #f5f5f5;
    color: #999999
  }
  .gerentop{
    margin-top: 10px;
    display: flex;
    flex-direction: row;
    line-height: 25px;
  }
  .gerentop>img{
    width: 25px;
    height: 25px;
  }
  .gerentop>span{
    font-size: 14px;
    margin-left: 20px;
    color: #000;
  }
  .xingming{
    display: flex;
    flex-direction: row;
    margin-top: 20px;
  }
  .xingming>p{
    width: 50%;
  }
  .shoujihao{
    margin-top: 10px;
  }
  .right10{
    margin-right: 10px;
  }
  .bangding>span{
    color:#3366cc;
    cursor: pointer;
  }
  .tankuang{
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(153,153,153,.4);
    z-index:2000;
    margin: 0 auto;
  }
  .tankuang>div{
    width: 800px;
    position: absolute;
    top: 50%;
    left: 30%;
    transform: translate(0, -50%);
    background: #fff;
    z-index: 99999;
    padding: 20px;
  }
  .tankuang>div>p:nth-child(1){
    text-align: center;
    font-size: 24px;
    font-weight: 500;
  }
  .tankuang>div>p:nth-child(2){
    width: 100%;
    text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 19;
    -webkit-box-orient: vertical;
  }
  .tankuangweixin{
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(153,153,153,.4);
    z-index:88888;
    margin: 0 auto;
  }
  .tankuangweixin>div{
    width: 350px;
    position: absolute;
    top: 50%;
    left: 40%;
    transform: translate(0, -50%);
    background: #fff;
    z-index: 99999;
    padding: 20px;
  }
  .tankuangphone{
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(153,153,153,.4);
    z-index:88888;
    margin: 0 auto;
  }
  .hong{
    color: red;
  }
  .tankuangphone>div{
    width: 350px;
    position: absolute;
    top: 50%;
    left: 40%;
    transform: translate(0, -50%);
    background: #fff;
    z-index: 99999;
    padding: 20px;
  }
  .tankuangyidong{
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(153,153,153,.4);
    z-index:8888;
    margin: 0 auto;
  }
  .hong{
    color: red;
  }
  .tankuangyidong>div{
    border-radius: 5px;
    width: 400px;
    position: absolute;
    top: 50%;
    left: 40%;
    transform: translate(0, -50%);
    background: #fff;
    z-index: 8889;
    padding: 20px;
  }
  .tankuangemail{
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(153,153,153,.4);
    z-index:88888;
    margin: 0 auto;
  }
  .hong{
    color: red;
  }
  .tankuangemail>div{
    width: 350px;
    position: absolute;
    top: 50%;
    left: 40%;
    transform: translate(0, -50%);
    background: #fff;
    z-index: 99999;
    padding: 20px;
  }
  .xiazai111{
    text-align: right;
    margin-top: 20px;
    line-height: 40px;
  }
  .WechatSignin{
    width: 330px;
    background: #fff;
    padding: 10px;
    margin: 0 auto;
    border-radius: 4px;
  }
  .WechatSignin>p:first-child{
    font-size:26px;
    font-family:Source Han Sans CN;
    font-weight:bold;
    color:rgba(51,51,51,1);
    text-align: center;
  }
  .title{
    font-size: 18px;
  }
  .phone23>p:nth-child(1){
    text-align: center;
    font-size: 20px;
  }
  .duanxin{
    display: flex;
    flex-direction: row;
    margin-top: 10px;
  }
  .tankuang>div>div>table tr td{
    border:1px solid #dcdcdc;
  }
  .tankuang>div>div>table{
    table-layout:fixed;
  }
  .tankuang>div>div>table>tr>td{
    padding: 5px;
    word-break: keep-all;white-space:nowrap;
  }
  .tankuang>div>div{
    width:100%;overflow-x:scroll
  }
  .yulanimg{
    max-width: 760px;cursor:pointer
  }
  #Figs{
    cursor: pointer;
  }
  .bangding1111{
    margin-top: 10px;
    text-align: right;
  }
  .duanxin>>>.el-button{
    width: 112px;
  }
  .biaogetankuang{
    max-height: 500px;
  }
  .yidong>div{
    display: flex;
    flex-direction: row;
    line-height: 30px;
    margin-top: 20px;
  }
  .footer{
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    text-align: right;
  }
  .footer>.el-button:nth-child(1){
    margin-right: 10px;
  }
  .coupon{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .coupon>>>.el-input__inner{
    height: 24px;
    line-height: 24px;
  }
  .coupon>>>.el-input__icon{
    line-height: 24px;
  }
  .exchange{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }
  .youhuiquans{
    display: flex;
    flex-direction: row;
    margin-top: 20px;color: #fff;
  }
  .youhuiquan{
    width: 25%;
    height: 180px;
    background-image: url( '../../public/img/backimg1.png');
    text-align: center;
    border-radius: 10px;
    margin-right: 10px;
    padding:  20px 13px;
    font-family: 'Source Han Sans CN';
  }
  .youhuiquan>p:nth-child(1){
    font-weight: 600;
    font-size: 13px;
  }
  .youhuiquan>p:nth-child(3){
    font-size: 16px;
    text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    width: 120px;
    font-weight: 600;
    margin: 0 auto;
  }
  .youhuiquan>p:nth-child(4){
    margin-top: 10px;
    font-size: 12px;
  }
  .vip1>>>.el-radio__input.is-checked .el-radio__inner{
    border-color: #3366cc;
    background: #3366cc;
  }
  .vip1>>>.el-radio__label {
    padding-left: 8px!important;
  }
  .vip1>>>.el-radio__input.is-checked+.el-radio__label{
    color: #3366cc;
  }
  .title111{
    color: #666;
    margin-bottom: 10px;
    margin-right: 20px;
  }
  .timers{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 610px;
  }
  .timer{
    margin-right: 10px;
    width: 140px;
    height: 100px;
    background: #fff;
    border: 1px solid #999999;cursor: pointer;
    position: relative;
    text-align: center;
    font-family: 'Source Han Sans CN';
    color: #333;
  }
  .timer>p:nth-child(1){
    font-size: 36px;
    margin-top: 10px;
  }
  .timer>p:nth-child(2){
    font-size: 20px;
  }
  .timer>img{
    position: absolute;
    bottom: 0;
    right: 0;
  }
  .active{
    border:1px solid #3366cc;
  }
  .shijian{
    margin-top: 20px;
    display: flex;
    flex-direction: row;
  }
  .shijian>span{
    line-height: 100px;
  }
  .fangshi{
    font-size:14px;
    font-family:Source Han Sans CN;
    font-weight:400;
    color:rgba(51,51,51,1);
    margin-bottom: 20px;
    margin-left: -40px;
    border-left: 2px solid #4159F7;
  }
  .fangshi>span{
    margin-left: 40px;
  }
  .vip1>>>.el-radio-group{
    width:610px;
    line-height: 30px;
    display: flex;justify-content: space-between;
  }
  .vip1>>>.el-radio{
    margin-bottom: 0;
  }
  .vip1>div:nth-child(1){
    display: flex;
    flex-direction: row;
  }
  .weixin{
    vertical-align: top;
  }
  .quanyi{
    width: 100%;
    height: 80px;
    line-height: 80px;
    background: #E7EDF9;
    margin-bottom: 20px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 0 20px;
  }
  .quanyi>span:nth-child(1){
    font-size:24px;
    font-family:Source Han Sans CN;
    font-weight:400;
    color:rgba(51,102,204,1);
  }
  .quanyi>span:nth-child(2){
    font-size:16px;
    font-family:Source Han Sans CN;
    font-weight:400;
    color:rgba(102,102,102,1);
  }
  .quanyi>span:nth-child(2)>span{
    font-size:16px;
    font-family:Source Han Sans CN;
    font-weight:400;
    color:rgba(255,108,1,1);
  }
  .cus{
    cursor: not-allowed;
    color: #C0C4CC;
    border-color: #C0C4CC;
  }
  .search1{
    display: flex;
    flex-direction: row;
    justify-content:space-between;
    line-height: 30px;
  }
  .search1>div{
    width: 50%;
    display: flex;
    flex-direction: row;
    justify-content:space-between;
  }
  .search1>div>.el-input{
    width: 80%;
    margin-right: 10px;
  }
  .search1>div>button{
    background: #3366cc;
    border: 1px solid #3366cc;
    color: #FFF;
    border-radius: 5px;
  }
  .search1>>>.el-input__inner{
    height: 30px;
    line-height: 30px;
  }
  .active1{
    display: block!important;
  }
  .showjianren{
    width: 100%;
    border-bottom: 1px solid #EBEEF5;
    line-height: 40px;
  }
  .showjianren>input{
    border: none;
    width: 90%;
  }
  .showjianren>input:focus{
    outline: none;
  }
  .inbox111>>>.el-table td, .inbox111>>>.el-table th{
    padding: 5px 0;
  }
  .emailContent{
    width: 100%;
    min-height: 250px;
    border:1px solid rgba(235,238,245,1);
    margin-top: 20px;
  }
  .yihang{
    text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }
  .loading1 .path{
    animation: loading-dash 1.5s ease-in-out infinite;
    stroke-dasharray: 90,150;
    stroke-dashoffset: 0;
    stroke-width: 2;
    stroke: #409eff;
    stroke-linecap: round;
  }
  .loading1 .circular {
    height: 16px;
    width: 16px;
    animation: loading-rotate 2s linear infinite;
  }
  .tishi>p:nth-child(2n+1){
    font-size: 16px;
    color: #666;
    font-weight: 600;
    line-height: 28px;
  }
  .tishi>p:nth-child(2n){
    font-size: 16px;
    color: #999;
    line-height: 28px;
  }
  .cu{
    cursor: pointer;
  }
</style>