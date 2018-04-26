<template>
  <div id="app">
    <div class="nav">
      <div class="left">
        <img class="logo" src="./assets/logo_1.png" alt="">
        <div class="nav_main">
            <el-menu :default-active="menu_start" :router=routertrue :unique-opened=uniqueopenedtrue class="el-menu-vertical-demo" @open="TabhandleOpen" @close="TabhandleClose" theme="dark">
                <el-menu-item index="/">
                  <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-shouye"></use>
                  </svg>
                  数据看板
                </el-menu-item>
                <el-submenu index="2">
                    <template slot="title">
                      <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-dianpuguanli"></use>
                      </svg>
                      店铺管理
                    </template>
                    <el-menu-item index="/shop">店铺列表</el-menu-item>
                    <el-menu-item index="/foodorder" v-if="isshowmenu">扫码点餐(测试账号可见)</el-menu-item>
                    <!--<el-menu-item index="/foodorder">扫码点餐</el-menu-item>-->
                    <el-menu-item index="/goodstool">商品管理</el-menu-item>
                    <el-menu-item index="/cajas">收银终端管理</el-menu-item>
                    <el-menu-item index="/cashier">收银员管理</el-menu-item>
                    <el-menu-item index="/printer" v-if="isshowmenu">打印机管理(测试账号可见)</el-menu-item>
                </el-submenu>
                <el-submenu index="3">
                    <template slot="title">
                      <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-huodong"></use>
                      </svg>
                      营销活动
                    </template>
                    <el-menu-item index="/active">券活动创建</el-menu-item>
                    <el-menu-item index="/activeDetailsList">券活动列表</el-menu-item>
                    <!--<el-menu-item index="/redPacket">现金红包</el-menu-item>-->
                </el-submenu>
                <el-submenu index="4">
                    <template slot="title">
                      <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-huiyuan2"></use>
                      </svg>
                      会员营销
                    </template>
                    <el-menu-item index="/member">会员列表</el-menu-item>
                    <el-menu-item index="/membercard">会员卡管理</el-menu-item>
                </el-submenu>
                <el-submenu index="5">
                    <template slot="title">
                      <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-qiaquan1"></use>
                      </svg>
                      引流券
                    </template>
                    <el-menu-item index="/creatactive">引流券创建</el-menu-item>
                    <el-menu-item index="/mycards">我的引流券</el-menu-item>
                    <el-menu-item index="/cardshopList">引流券市场</el-menu-item>
                </el-submenu>
                <el-submenu index="6">
                    <template slot="title">
                      <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-caiwu"></use>
                      </svg>
                      店铺账单
                    </template>
                    <el-menu-item index="/dealdetails">交易明细</el-menu-item>
                    <el-menu-item index="/refunddetails">退款明细</el-menu-item>
                    <el-menu-item index="/summarysheet">交易汇总</el-menu-item>
                </el-submenu>
                <el-submenu index="7">
                    <template slot="title">
                      <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-Group___"></use>
                      </svg>
                      店铺-商圈
                    </template>
                    <el-menu-item index="/list">商圈活动列表</el-menu-item>
                    <el-menu-item index="/marketinglist">营销流水</el-menu-item>
                    <el-menu-item index="/arealist">商圈列表</el-menu-item>
                </el-submenu>
            </el-menu>
        </div>
    </div>
</div>
<div class="header">
    <div class="header-mes">
        <div @click="handleOpen">
            <el-badge :value="messageNum" class="item zj-backlog" @click="handleOpen(value)">
                <img src="./assets/message_logo.png" class="message_logo">
                <span style="line-height:30px;float:right;">通知</span>
            </el-badge>
        </div>
        <!--<div style="height: 100%;"  v-on:mouseenter="informshow"  v-on:mouseleave="overinformshow">
            <div style="margin-top: 16px;">
                <el-badge :value="messageNum" class="item zj-backlog">
                    <img src="./assets/message_logo.png" class="message_logo">
                    <span style="line-height:30px;float:right;">通知</span>
                </el-badge>
            </div>
            <div class="pop-count width_pop" v-if="isinformshow == true">
                <span>暂无通知</span>
                <span @click="kucunClick()">有3个商品库存不足</span>
                <span @click="handleOpen()">有555个商圈活动邀约待确认</span>
            </div>
        </div>-->
        
        <div style="height: 100%;" v-on:mouseenter="overClis"  v-on:mouseleave="overCount">
            <!--</div>-->
            <div style="padding-top: 16px;" class="user-img" >
                <img alt="" class='message_logo' src="./assets/user_logo.png" />
                <span style="line-height: 30px;float: right;">{{name}}</span>
            </div>
            <!--<a class="pop-counts" v-on:mouseenter="overClis"  v-on:mouseleave="overCount"><span class="pop-counts">{{name}}</span></a>-->
            <div class="pop-count " v-if="show == true">
                <span class="border_b_1" @click="setWxPay">微信支付配置</span>
                <span @click="quit_btn">退出登录</span>
            </div>
        </div>
        

    </div>
</div>
<div class="page">
    <el-breadcrumb separator="/" id="page">
        <template v-for="(item,index) in breadcrumbList">
          <el-breadcrumb-item :to="{path: item.path}">{{item.name}}</el-breadcrumb-item>
        </template>
    </el-breadcrumb>

    <!--<transition name="el-fade-in-linear" mode="out-in">-->
    <router-view></router-view>
    <!--</transition>-->
</div>

<!--退出登录弹窗-->
<el-dialog title="退出登录" v-model="tuichu_dialog" size="tiny" top="35%" :before-close="handleClose">
    <p class="text_center">确认退出登录吗?</p>
    <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="quit">确 定</el-button>
        <el-button @click="tuichu_dialog = false">取 消</el-button>
       </span>
</el-dialog>
<!--通知弹窗-->
<el-dialog class="message_dialog_title" title="通知 : 您有以下活动通知,请及时操作! 如有疑问请联系活动创建方" v-model="tongzhi_dialog" size="large">
    <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="create_date" label="通知时间" width="180">
        </el-table-column>
        <el-table-column prop="circleName" label="活动邀约方" width="180">
        </el-table-column>
        <el-table-column prop="mobile" label="联系电话">
        </el-table-column>
        <el-table-column prop="voucherName" label="活动标题">
        </el-table-column>
        <el-table-column prop="shopName" label="适用门店">
        </el-table-column>
        <el-table-column prop="date" label="活动时间">
        </el-table-column>
        <el-table-column class="bug_78_night" prop="address" label="操作">
            <template scope="scope">
            <el-button @click="activetrue(scope.row.voucher_id,1)" type="text" size="small">同意</el-button>
            <span> |</span>
            <el-button @click="activefalse(scope.row.voucher_id,2)" type="text" size="small" class="colo_red">拒绝
            </el-button>
          </template>
        </el-table-column>
    </el-table>
    <span slot="footer" class="dialog-footer">
          <!--<el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>-->
        </span>
</el-dialog>

<!--商品库存不足弹窗-->
<el-dialog  title="库存提醒" v-model="kucun_dialog" size="small">
    <el-table :data="tableData" style="width: 100%">
        <el-table-column
            type="index"
            width="100"
            label="序号">
        </el-table-column>
        <el-table-column prop="circleName" label="商品名称">
        </el-table-column>
        <el-table-column prop="mobile" label="价格">
        </el-table-column>
        <el-table-column prop="voucherName" label="数量">
        </el-table-column>
    </el-table>
    <span slot="footer" class="dialog-footer">
          <!--<el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>-->
        </span>
</el-dialog>

<el-dialog v-model="rules_dialog" title="活动协议说明" size="large">
    <div class="active_rules">

    </div>
    <el-checkbox v-model="checked">我已阅读并同意活动协议条款</el-checkbox>

    <span slot="footer" class="dialog-footer">
          <el-button @click="rules_dialog = false">取 消</el-button>
          <el-button type="primary" :disabled=!this.checked @click="open_mima">确 定</el-button>
        </span>
</el-dialog>
<el-dialog v-model="falseactivedialog" title="提示" size="tiny">
    <p class="false_tip">是否确认拒绝该活动邀请?拒绝后将不再显示该条信息</p>

    <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="false_active">确 定</el-button>
          <el-button @click="falseactivedialog = false">取 消</el-button>

        </span>
</el-dialog>
<el-dialog top="30%" title="确认" v-model="open_mima_dialog" size="tiny" class="ture_mima">
    <div style="text-align: center;">
        <span class="super_title">超级密码 : </span>
        <el-input class="super_input" v-model="mima_input" type="password" placeholder="请输入超级密码"></el-input>
    </div>


    <span slot="footer" class="dialog-footer">
          <el-button @click="open_mima_dialog = false">取 消</el-button>
          <el-button type="primary" @click="true_btn">确 定</el-button>
        </span>
</el-dialog>
<!--微信支付配置-->
<el-dialog top="20%" title="微信支付配置" v-model="wxpay_dialog" size="tiny">
    <el-form class="wxpayset_form" :rules="rules" ref="payset_form" :model="payset_form" label-width="120px">
        <el-form-item label="微信商户号 : " prop="wxMchId">
            <el-input size="small" v-model="payset_form.wxMchId" placeholder="请输入微信商户号"></el-input>
        </el-form-item>
        <el-form-item label="AppId : ">
            <el-input size="small" v-model="payset_form.wxAppId" placeholder="请输入AppId"></el-input>
        </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
          <el-button @click="wxpay_dialog = false">取 消</el-button>
          <el-button type="primary" @click="wxpaysettrue_btn">提 交</el-button>
        </span>
</el-dialog>
<!--遮盖层-->
<div class="disabled_box" :class='{displaynone:isShow == true}'></div>
</div>

</template>

<script>
    import {
        ipAddress
    } from './service';

    export default {
        name: 'app',
        computed: {
            breadcrumbList: function() {
                return this.$store.state.breadcrumbList;
            }
        },
        data() {
            return {
                uniqueopenedtrue:true,
                routertrue:true,
                isshowmenu:false,
                rules: {
                    wxMchId: [{
                        required: true,
                        message: '请输入微信商户号',
                        trigger: 'blur'
                    },]
                },
                payset_form: {
                    wxMchId: '',
                    wxAppId: ''
                },
                menu_start: '/home',
                isShow: true,
                isinformshow:false,
                falseactivedialog: false,
                open_mima_dialog: false,
                kucun_dialog:false,
                rules_dialog: false,
                tongzhi_dialog: false,
                wxpay_dialog: false,
                mima_input: '',
                checked: false,
                tableData: '',
                messageNum: '',
                numberValue: '',
                tuichu_dialog: false,
                show: false,
                name: '',
                reject: '',
                agree: '',
                shopId: ''
            }
        },
        mounted: function() {
            this.logintest();
            this.messageNumber();
            // let cookie_message = document.cookie.split(";")[0].split("=")[1];
            let cookie_message=sessionStorage.getItem('users');
            // let cookie_message = this.getcookie("MERCHANT_NAME");
            this.name = cookie_message;
            this.loginshowmenu();
            this.routerChange();
        },
        watch: {
            "$route": "routerChange"
        },
        methods: {
            //模拟登陆
            logintest(){
                let login = this.qs.stringify({
                    // 'moblie':'17775303130',
                    // 'password':'123456',
                    'mobile': '18603814730',
                    'password': '123456',
                    // 'mobile': '13523448667',
                    // 'password': 'sqt',
                    // 'mobile':'18221721672',
                    // 'password': '123456',
                    // 'mobile': '13636304147',
                    // 'password': '123456',
                });
                this.$http.post('/front/merchant!login.action', login)
                .then( res => {
                    console.log(res.data.message);
                });
            },
            //根据不同账号展示不同目录
            loginshowmenu(){
                if(this.name == '13523448667'){
                    this.isshowmenu = true;
                }
            },
            wxpaysettrue_btn() {
                this.$refs['payset_form'].validate((valid) => {
                    if (valid) {
                        let data = this.qs.stringify(this.payset_form);
                        this.$http.post(`${ipAddress}/front/merchant!setWxConfig.action`, data)
                            .then(res => {
                                if (res.data.status == "success") {
                                    this.$message.success("微信支付配置成功!")
                                    this.wxpay_dialog = false;
                                } else {
                                    this.$message.error(res.data.message);
                                }
                            })
                    }
                })
            },
            //导航
            TabhandleOpen(key, keyPath) {
            },
            TabhandleClose(key, keyPath) {
            },
            //路由改变时
            routerChange() {
                    // this.menu_start = this.$route.path;
                    if (this.$route.path == "/goodstool" || this.$route.path == "/add" || this.$route.path == "/goodscheck" || this.$route.path == "/compile") {
                        this.menu_start = "/goodstool";
                    }
                    if (this.$route.path == "/stampsList" || this.$route.path == "/voucherLists" || this.$route.path == "/integralList" || this.$route.path == "/details" || this.$route.path == "/activefiguredetails") {
                        this.menu_start = "/list";
                    }
                    if (this.$route.path == "/insideticket" || this.$route.path == "/chitCreation") {
                        this.menu_start = "/active";
                    }
                    if (this.$route.path == "/insideticketList" || this.$route.path == "/voucherList" || this.$route.path == "/viewdetails" || this.$route.path == "/VoucherList_viewdetails") {
                        this.menu_start = "/activeDetailsList";
                    }
                    if (this.$route.path == "/createcoupons" || this.$route.path == "/couponsActList") {
                        this.menu_start = "/creatactive";
                    }
                    if (this.$route.path == "/mysendcard" || this.$route.path == "/myputcard") {
                        this.menu_start = "/mycards";
                    }
                    if (this.$route.path == "/packettype" || this.$route.path == "/packetactivelist" || this.$route.path == "/payreturn" || this.$route.path == "/pointgive" || this.$route.path == "/packetnumberdetail") {
                        this.menu_start = "/redPacket";
                    }
                    if(this.$route.path == "/tablesManagement" || this.$route.path == "/orderManagement" || this.$route.path == "/billStatistics" || this.$route.path == "/activitySettings"){
                        this.menu_start = "/foodorder";
                    }
            },
            false_active() {
                let data = this.qs.stringify({
                    voucherStatus: this.reject,
                    agencyId: this.shopId
                });
                this.$http.post(`${ipAddress}/front/inner_voucher!agreeInnerVoucher.action`, data)
                    .then(res => {
                        if (res.data.errorCode == 10000) {
                            this.falseactivedialog = false;
                            this.messageNumber();
                            this.handleOpen();
                        }
                    })
            },
            //确定按钮提交
            true_btn() {
                let message = this.qs.stringify({
                    payPassword: this.mima_input
                });
                this.$http.post(`${ipAddress}/front/merchant!isPaymentPsw.action`, message)
                    .then(res => {
                        if (res.data.errorCode == 10000) {
                            this.refues();
                            this.messageNumber();
                        } else if (res.data.errorCode == 30005) {
                            window.location.href = 'http://b.tingzhijun.com/merchant';
                        } else {
                            this.$message.error('超级密码错误!');
                        }
                    })
            },
            //密码正确后提交的确认
            refues: function() {
                this.isShow = false;
                this.$message("提交中，请稍后!");
                let data = this.qs.stringify({
                    voucherStatus: this.agree,
                    agencyId: this.shopId
                });
                this.$http.post(`${ipAddress}/front/inner_voucher!getAgencyDetail.action`, data)
                    .then(res => {
                        this.isShow = true;
                        this.open_mima_dialog = false;
                        this.rules_dialog = false;
                        this.messageNumber();
                        this.handleOpen();
                        this.$message.success(res.data.message);
                    })
            },
            //拒绝
            activefalse(id, data) {
                this.shopId = id;
                this.reject = data;
                this.falseactivedialog = true;
            },
            open_mima() {
                this.open_mima_dialog = true;
                this.mima_input = '';
            },
            //同意
            activetrue(id, data) {
                this.checked = false;
                this.shopId = id;
                this.agree = data;
                this.rules_dialog = true;
            },
            messageNumber: function() {
                this.$http.post(`${ipAddress}/front/merchant!getAgencyCount.action`)
                    .then(res => {
                        if (res.data.errorCode == 30005) {
                            window.location.href = 'http://b.tingzhijun.com/merchant';
                        } else {
                            this.messageNum = res.data.content;
                        }

                    })
            },
            handleClose: function() {
                this.tuichu_dialog = false;
                this.dialogVisible = false;
            },
            //点击库存不知消息
            kucunClick:function(){
                this.kucun_dialog = true
            },
            //      获取列表
            handleOpen: function() {
                this.tongzhi_dialog = true;
                this.$http.get(`${ipAddress}/front/inner_voucher!getAgencyList.action`)
                    .then(res => {
                        this.tableData = res.data.content;
                    })
            },
            getcookie: function(cookieName) {
                var strCookie = document.cookie;
                var arrCookie = strCookie.split("; ");
                for (var i = 0; i < arrCookie.length; i++) {
                    var arr = arrCookie[i].split("=");
                    if (cookieName == arr[0]) {
                        return arr[1];
                    }
                }
                return "";
            },
            informshow:function(){
                this.isinformshow = true
            },
            overinformshow:function(){
                this.isinformshow = false
            },
            overClis: function() {
                this.show = true
            },
            overCount: function() {
                this.show = false
            },
            //微信支付配置
            setWxPay: function() {
                this.wxpay_dialog = true;
                this.getwxpayset();
            },
            //获取微信支付配置
            getwxpayset() {
                this.$http.get(`${ipAddress}/front/merchant!getWxConfig.action`)
                    .then(res => {
                        if (res.data.status == "success") {
                            if (res.data.content.wxAppId) {
                                this.payset_form.wxAppId = res.data.content.wxAppId;
                            }
                            if (res.data.content.wxMchId) {
                                this.payset_form.wxMchId = res.data.content.wxMchId;
                            }
                        } else {
                            this.$message.error(res.data.message);
                        }
                    });
            },
            //退出登录
            quit_btn: function() {
                this.tuichu_dialog = true;
            },
            quit: function() {
                this.tuichu_dialog = false;
                this.$http.get(`${ipAddress}/front/merchant!logout.action`)
                    .then(res => {
                        localStorage.clear();
                        if (res.status == 200) {
                            window.location = '../index.html';
                        }
                    });
            }
        }

    }
</script>
<style>
    .false_tip {
        padding: 10px 0;
        text-align: center;
    }

    .super_input {
        width: 260px;
    }

    .super_title {
        font-size: 14px;
    }

    .active_rules {
        height: 400px;
        background-color: #fff;
        margin-bottom: 20px;
    }

    .colo_red {
        color: red !important;
    }

    .zj-backlog {
        position: relative;
        height: 30px;
        line-height: 35px;
        margin-right: 30px;
    }

    .zj-backlog:hover {
        cursor: pointer;
    }

    .nav_main .icon {
        font-size: 14px;
        margin-right: 4px;
    }

    .el-breadcrumb {
        float: left;
    }

    .nav a {
        text-decoration: none;
    }

    .nav a:link {
        color: #999999
    }
    /* 未访问的链接 */

    .nav a:visited {
        color: #999999
    }
    /* 已访问的链接 */

    .nav a:hover {
        color: #999999
    }
    /* 当有鼠标悬停在链接上 */

    .nav a:active {
        color: #999999
    }
    /* 被选择的链接 */

    .nav a:active {
        text-decoration: none;
    }

    .addw {
        -webkit-transition: all 0.3s ease-in-out;
        -moz-transition: all 0.3s ease-in-out;
        transition: all 0.3s ease-in-out;
    }

    .addup {
        -webkit-transform: rotate(180deg);
        -moz-transform: rotate(180deg);
        -ms-transform: rotate(180deg);
        transform: rotate(180deg)
    }

    .adddown {
        -webkit-transform: rotate(0deg);
        -moz-transform: rotate(0deg);
        -ms-transform: rotate(0deg);
        transform: rotate(0deg)
    }

    .title img {
        margin-right: 8px;
        width: 14px;
    }

    .title .down {
        width: 12px;
        position: absolute;
        top: 18px;
        right: 10px;
    }

    #app {
        min-width: 1224px;
        width: 100%;
        margin: 0px auto;
    }

    .logo {
        width: 166px;
        height: 32px;
        padding: 35px 29px 15px 29px;
        background-color: rgba(63, 63, 63, 1);
    }

    .nav {
        font-size: 0;
        width: 224px;
        float: left;
    }

    .message_logo {
        display: inline-block;
        width: 26px;
        height: 26px;
        margin-right: 4px;
    }

    .page {
        width: calc(100% - 224px);
        height: calc(100% - 65px);
        background-color: #f5f5f5;
        float: left;
    }

    #page {
        position: absolute;
        top: 22px;
        left: 250px;
        font-size: 16px;
    }

    .list {
        display: none;
        cursor: pointer;
        font-size: 13px;
    }

    .list ul {
        margin: 0;
        padding: 0;
    }

    .list li {
        height: 34px;
        line-height: 34px;
        list-style: none;
        color: #999999;
        font-size: 12px;
        padding-left: 54px;
    }

    .list li:hover {
        background-color: #333333 !important;
    }

    .left {
        -ms-overflow-style: none;
        overflow: -moz-scrollbars-none;
        overflow: auto;
        background-color: rgb(63, 63, 63);
        width: 224px;
        color: #000000;
        font-size: 12px;
        height: 100%;
    }

    .left::-webkit-scrollbar {
        display: none
    }

    .nav_main {
        width: 224px;
    }

    .title {
        position: relative;
        height: 42px;
        line-height: 42px;
        color: #999999;
        font-size: 12px;
    }

    .title:hover {
        background-color: #333333;
    }

    .title span {
        display: flex;
        align-items: center;
        margin-left: 20px;
    }

    .aa {
        height: 34px;
        line-height: 34px;
        color: #999999;
    }

    .header {
        height: 64px;
        width: calc(100% - 224px);
        float: left;
        border-bottom: 1px solid #eeeeee;
    }

    .header .header-mes .help-img {
        height: 12px;
        margin-right: 6px;
    }

    .header .header-mes {
        float: right;
        display: flex;
        align-items: center;
        height: 64px;
    }

    .header .header-mes span {
        font-weight: 400;
        font-style: normal;
        color: #666666;
        font-size: 14px;
        margin-right: 30px;
    }

    .zj-backlog span {
        font-size: 14px !important;
        margin: 0 !important;
        color: #333333 !important;
    }

    .header .header-mes .user-img {
        /*width: 26px;*/
        height: 26px;
        margin-bottom: 4px;
        margin-right: 10px;
    }

    .header .header-mes .user-img img {
        width: 26px;
        height: 26px;
    }

    .pop-count {
        width: 106px;
        height: 80px;
        position: absolute;
        top: 60px;
        right: 20px;
        background-color: white;
        z-index: 100;
        -webkit-box-shadow: 0px 0px 4px 2px #bfcbd9;
        -moz-box-shadow: 0px 0px 4px 2px #bfcbd9;
        box-shadow: 0px 0px 4px 2px #bfcbd9;
    }

    .pop-count>span {
        text-align: center;
        display: inline-block;
        width: 96px;
        line-height: 40px;
        height: 40px;
        z-index: 100;
        margin: 0 !important;
    }
    .pop-count>span:hover{
        background-color:#20a0ff; 
        color: #fff;
    }

    .border_b_1 {
        border-bottom: 1px solid #ddd;
    }

    .message_dialog_title .el-dialog__title {
        font-size: 16px;
        color: #ff5b05;
        font-weight: 500;
    }

    .pop-count span {
        line-height: 40px;
    }

    .wxpayset_form .el-input {
        width: 300px;
    }

    .list_last {
        margin-bottom: 150px;
    }

    #bg_start {
        background-color: rgb(0, 160, 232);
        color: rgb(255, 255, 255);
    }

    .disabled_box {
        position: fixed;
        z-index: 3000;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: #000000;
        opacity: 0.2;
        display: block;
    }

    .displaynone {
        display: none;
    }

    .white_page {
        margin: 16px 0 0 16px;
        background-color: white;
        float: left;
    }
    .width_pop{
        right: 70px;
        height: auto;
        width: 180px;
    }
    .width_pop span{
        width: 170px;
        border-bottom: 1px solid #ddd;
    }
    .width_pop span:last-of-type{
        border-bottom: none;
    }
    .pop-count{
        height: auto;
    }
    .pop-count span{
        line-height: 36px;
        font-size: 12px !important;
        text-align: left;
        padding-left: 10px;
        height: 36px;
    }
</style>
