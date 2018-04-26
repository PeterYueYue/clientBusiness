<!--代金券创建s-->
<!--活动营销/单品营销-->
<template>
  <div class="zjmain">
    <div class="ticket_show">
      <div>
        <img src="../../../assets/images/ticket.png" alt="无法显示">
        <span>{{money}}元</span>
        <p>活动时间:{{startTime}}至{{endTime}}</p>
      </div>
    </div>
    <div class="ticket_rule ">
      <span class="ticket_title_all">活动内容</span>
      <el-form ref="form" :model="form" label-width="140px">
        <el-form-item class="ticket_title" label="标题 :">
          <el-input size="small"  :maxlength="32" v-model="form.name" placeholder="请输入商品名称"></el-input>
          <span class="ticket_tip">请输入商品名称,无需输入"代金券""打折券"等字样</span>
        </el-form-item>
        <el-form-item label="券面额 :">
          <el-input class="width_90"  type="number" @blur="parValue" size="small" v-model="money" placeholder="请输入"></el-input> 元
        </el-form-item>
        <el-form-item label="券Logo :">
          <el-upload
            class="avatar-uploader"
            action="/front/file!fileUpload.action"
            :data="shopid"
            :show-file-list="false"
            :on-success="bgonsuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="imageUrltobg" :src="imageUrltobg" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <span class="ticket_tip ">备注 : 5M以内，格式：png、jpg； 不得有圆角，不得拉伸变形;</span>
        </el-form-item>
        <el-form-item label="适用门店 :">
          <div>
            <span v-if="shopsnumber">已选择{{shopsnumber}}家门店</span>
            <el-button v-if="this.shopsnumber" type="text" @click="againchooseshop">重新选择</el-button>
            <el-button v-if="!this.shopsnumber" type="text" @click="dialogVisible_queryshops = true">选择门店</el-button>
          </div>
        </el-form-item>
        <el-form-item class="ticket_number" label="发券数量 :">
          <el-input class="width_90"  type="number" @blur="gbQuantity" size="small" v-model="form.number" placeholder="输入数量"></el-input>
        </el-form-item>
        <el-form-item label="活动时间 :">
          <div class="block">
            <el-date-picker
              v-model="time"
              type="daterange"
              :editable="editable"
              align="right"
              size="small"
              placeholder="选择日期范围"
              @change="changeTime"
              :picker-options="pickerOptions2">
            </el-date-picker>
          </div>
        </el-form-item>
        <el-form-item class="ticket_limit" label="使用条件 :">
          <el-select v-model="form.uselimitselectvalue" placeholder="请选择" size="small">
            <el-option
              v-for="item in limitselectdata"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <br>
          <div v-if="this.form.uselimitselectvalue == 1">
              <span>消费满 </span>
            <el-input class="width_90" size="small" type="number" @blur="isHaveAccessTo"  placeholder="请输入" v-model="numberX"></el-input>
            <span> 元可用</span>
          </div>
        </el-form-item>
        <el-form-item class="ticket_number" label="有效期 :">
          <span>券领取后 </span><el-input class="width_60" @blur="periodOfValidity" size="small" v-model="validday" type="number" placeholder="输入天数"></el-input><span> 天有效</span>
        </el-form-item>
        <!--选择适用门店弹窗-->
        <el-dialog
          title="选择适用门店"
          v-model="dialogVisible_queryshops"
          size="small"
          top="20%">
          <div class="kinds_main">
            <div class="shopkinds_list">
              <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
              <el-checkbox-group v-model="checkedshops" @change="handleCheckedCitiesChange">
                <div class="check_divbox" v-for="item in Objects">
                  <el-checkbox  :label="item.shopId" :key="item.shopId">{{item.shopName}}</el-checkbox>
                </div>
              </el-checkbox-group>
            </div>
          </div>
          <span slot="footer" class="dialog-footer">
             <el-button @click="dialogVisible_queryshops = false">取 消</el-button>
             <el-button type="primary" @click="queryshops_btn">确 定</el-button>
          </span>
        </el-dialog>
      </el-form>
      <span class="ticket_title_all ">规则设置</span>
      <el-form ref="form" :model="form" label-width="140px">
        <el-form-item class="ticket_limit" label="领取限制 :">
          <el-select v-model="form.limitselectvalue" placeholder="请选择" size="small" @change="selectChange">
            <el-option
              v-for="item in limitselectdata"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <br>
          <div v-if="this.form.limitselectvalue == 1" >
            <el-input class="width_90" size="small" @blur="requisitionRestrictions" type="number" v-model="form.number1" placeholder="请输入" ></el-input>
            <span>张/人</span>
          </div>
        </el-form-item>
        <el-form-item class="ticket_limit" label="每日领取限制 :">
          <el-select v-model="form.datelimitselectvalue" placeholder="请选择" size="small"  @change="everyselectChcange" >
            <el-option
              v-for="item in datelimitselectdata"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <br>
          <div v-if="this.form.datelimitselectvalue == 1">
            <el-input class="width_90" size="small" @blur="everyRequisitionRestrictions" type="number"  v-model="form.number2" placeholder="请输入"></el-input>
            张/人/天
          </div>
        </el-form-item>
        <el-form-item label="是否需要积分兑换 :">
            <el-radio-group @change="radiochange" v-model="form.code_radio">
                <el-radio :label="1">是</el-radio>
                <el-radio :label="2">否</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item v-if="form.code_radio == 1" label="兑换所需积分 :">
          <el-input class="width_90" size="small" v-model="form.needcode" placeholder="积分"></el-input>
        </el-form-item>
        <el-form-item v-if="form.code_radio == 2"  class="setways" label="投放渠道 :">
          <el-select v-model="form.ways" multiple placeholder="请选择">
            <el-option
              v-for="item in wayskinds"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="form.code_radio == 1" class="ticket_limit" label="领券时间 :">
          <el-select v-model="form.timelimitselectvalue" placeholder="请选择" size="small">
            <el-option
              v-for="item in timelimitselectdata"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <br>
          <div class="bgf4f4f4" v-if="this.form.timelimitselectvalue == 1">
            <el-checkbox-group v-model="checkList">
              <el-checkbox label="星期一"></el-checkbox>
              <el-checkbox label="星期二"></el-checkbox>
              <el-checkbox label="星期三"></el-checkbox>
              <el-checkbox label="星期四"></el-checkbox>
              <el-checkbox label="星期五"></el-checkbox>
              <el-checkbox label="星期六"></el-checkbox>
              <el-checkbox label="星期日"></el-checkbox>
            </el-checkbox-group>
            <span class="viltop">指定时段</span>
            <div class="neiform">
                <div v-for="(time,index) in times" class="margin_b_20">
                        <el-time-picker
                            is-range
                            v-model="time.value"
                            :editable="editable"
                            placeholder="选择时间范围">
                        </el-time-picker>
                        <el-button type="danger" size="small" v-if="index != 0" @click.prevent="removeDomain(time)">删除</el-button>
                    </div>
                    <el-button type="primary" size="small" v-if="times.length < 5" @click="addDomain">新增</el-button>
            </div>
          </div>
        </el-form-item>
        <el-form-item class="ticket_limit" label="核销时间 :">
          <el-select v-model="form.detallimitselectvalue" placeholder="请选择" size="small">
            <el-option
              v-for="item in detallimitselectdata"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <br>
          <div class="bgf4f4f4" v-if="this.form.detallimitselectvalue == 1">
            <el-checkbox-group v-model="checkList1">
              <el-checkbox label="星期一"></el-checkbox>
              <el-checkbox label="星期二"></el-checkbox>
              <el-checkbox label="星期三"></el-checkbox>
              <el-checkbox label="星期四"></el-checkbox>
              <el-checkbox label="星期五"></el-checkbox>
              <el-checkbox label="星期六"></el-checkbox>
              <el-checkbox label="星期日"></el-checkbox>
            </el-checkbox-group>
            <span class="viltop">指定时段</span>
            <div class="neiform">
                <div v-for="(time,index) in times1" class="margin_b_20">
                        <el-time-picker
                            is-range
                            v-model="time.value"
                            :editable="editable"
                            placeholder="选择时间范围">
                        </el-time-picker>
                        <el-button type="danger" size="small" v-if="index != 0" @click.prevent="removeDomain1(time)">删除</el-button>
                    </div>
                    <el-button type="primary" size="small" v-if="times1.length < 5" @click="addDomain1">新增</el-button>
                </div>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button class="bottom_button bottom_margin_100" size="small" type="primary" :disabled="disabled" @click="saveGold">提 交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
    import {
        formateDate,
        formDateSecond,
        formDateSecond59,
        weekDispose,
        DateLong
    } from '../../../api/CommonMethods';
    import {
        queryLogin
    } from '../../../api/CommonMethods';
    import {
        ipAddress
    } from '../../../service';
    export default {
        data() {
            return {
                isVipcard:'',
                bgUrl:'',
                bgId:'',
                imageUrltobg: '',
                shopid:{id:''},
                editable: false,
                times: [{
                    value: [new Date(2017, 9, 10, 0, 0, 0), new Date(2017, 9, 10, 23, 59, 59)]
                }],
                times1: [{
                    value: [new Date(2017, 9, 10, 0, 0, 0), new Date(2017, 9, 10, 23, 59, 59)]
                }],
                checkList: ["星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日"],
                checkList1: ["星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日"],

                disabled: false,
                numberX: '',
                validday:'45',
                choosekinds: '',
                wayskinds: [{
                        value: 'QR_CODE',
                        label: '二维码'
                    }, {
                        value: 'SHORT_LINK',
                        label: '短链接'
                    }, {
                        value: 'SHOP_DETAIL',
                        label: '店铺主页'
                    },
                    //          {value: 'PAYMENT_RESULT',label: '支付成功页'},
                    //          {value: 'URL_WITH_TOKEN',label: '口令送'},
                ],
                isIndeterminate: true,
                checkAll: false,
                checkedshops: [],
                shopsnumber: '',
                startTime: '****-**-**',
                endTime: '****-**-**',
                time: '',
                money: '',
                showList: [],
                form: {
                    name: '',
                    shop: '门店1',
                    number: '9999',
                    time: '',
                    limitselectvalue: '2',
                    timelimitselectvalue: '2',
                    detallimitselectvalue: '2',
                    datelimitselectvalue: '2',
                    uselimitselectvalue: '2',
                    number1: '',
                    number2: '',
                    limittime: '',
                    code_radio: 2,
                    needcode: '',
                    ways: [],
                },
                messageData: {},
                timelimitselectdata: [{
                    value: '1',
                    label: '限制'
                }, {
                    value: '2',
                    label: '不限制'
                }, ],
                detallimitselectdata: [{
                    value: '1',
                    label: '限制'
                }, {
                    value: '2',
                    label: '不限制'
                }, ],
                limitselectdata: [{
                    value: '1',
                    label: '限制'
                }, {
                    value: '2',
                    label: '不限制'
                }, ],
                datelimitselectdata: [{
                    value: '1',
                    label: '限制'
                }, {
                    value: '2',
                    label: '不限制'
                }, ],
                hhddatas2: [],
                Objects: '',
                pickerOptions2: {
                    shortcuts: [{
                        text: '一周',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '一个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '三个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                            picker.$emit('pick', [start, end]);
                        }
                    }]
                },
                choose_goods: false,
                dialogVisible_queryshops: false
            }
        },
        mounted: function() {
            //门店
            let data = this.qs.stringify({
                pageNumber: 1,
                pageSize: 10000
            });
            this.$http.post(`${ipAddress}/front/shop_info!getShopInfoPager.action`, data)
                .then(res => {
                    this.Objects = res.data.content.resultList;
                })
            //获取上传图片所需的id
            this.cookie();
            this.getIsVipcard();
        },
        methods: {

//校正输入框数字格式
            parValue(){  //券面额
                this.money = Number(this.money);
                this.money = Math.abs(this.money);
                this.money = this.money.toFixed(2);
                if(this.money == "0.00"){
                    this.money = ''
                }
            },
            gbQuantity(){   //发放数量
                this.form.number = Number(this.form.number);
                this.form.number = Math.abs(this.form.number);
                this.form.number = parseInt(this.form.number)
                if(this.form.number == "0.00"){
                    this.form.number = ''
                }
            },
            isHaveAccessTo(){ //使用条件
                this.numberX = Number(this.numberX);
                this.numberX = Math.abs(this.numberX);
                this.numberX = parseInt(this.numberX)
                if(this.numberX == "0.00"){
                    this.numberX = ''
                }
            },
            periodOfValidity(){ //有效期
                this.form.numbers = Number(this.form.numbers);
                this.form.numbers = parseInt(this.form.numbers);
                this.form.numbers = Math.abs(this.form.numbers);
                if(this.form.numbers == "0.00"){
                    this.form.numbers = ''
                }
            },
            requisitionRestrictions(){  //领取限制
                this.form.number1 = Number(this.form.number1);
                this.form.number1 = parseInt(this.form.number1);
                this.form.number1 = Math.abs(this.form.number1);
                if(this.form.number1 == "0.00"){
                    this.form.number1 = ''
                }
            },
            everyRequisitionRestrictions(){
                this.form.number2 = Number(this.form.number2);
                this.form.number2 = parseInt(this.form.number2);
                this.form.number2 = Math.abs(this.form.number2);
                if(this.form.number2 == "0.00"){
                    this.form.number2 = ''
                }
            },
            radiochange(){
                if(this.isVipcard == 'error'){
                    this.$message.warning("设置积分兑换请先设置店铺会员卡");
                    this.form.code_radio = 2;
                }
            },
            //是否有会员卡
            getIsVipcard(){
                this.$http.post(`${ipAddress}/front/card_template!getTemplateByMerchant.action`)
                    .then(res => {
                        this.isVipcard = res.data.status;
                    });
            },
            beforeAvatarUpload(file) {
                this.$message('正在上传券Logo!');
            },
            bgonsuccess(response, file, fileList) {
                if (response.error == 0) {
                    this.$message.success('上传券Logo成功!');
                    this.imageUrltobg = URL.createObjectURL(file.raw);
                    this.bgUrl = response.url;
                    this.bgId = response.imageId;
                    }
                else if(response.error == 1){
                    this.$message.error(response.message);
                }
            },
            cookie(){
                function getCookie(cookieName) {
                    var strCookie = document.cookie;
                    var arrCookie = strCookie.split("; ");
                    for(var i = 0; i < arrCookie.length; i++){
                        var arr = arrCookie[i].split("=");
                        if(cookieName == arr[0]){
                            return arr[1];
                        }
                    }
                    return "";
                }
                var user_id  = getCookie("ENTITY_ID");
                this.shopid.id = user_id ;
            },
            //领券时间3个函数(添加,删除,处理)
            addDomain() {
                this.times.push({
                    value: [new Date(2017, 9, 10, 0, 0, 0), new Date(2017, 9, 10, 23, 59, 59)]
                })
            },
            removeDomain(time) {
                var index = this.times.indexOf(time)
                if (index !== -1) {
                    this.times.splice(index, 1)
                }
            },
            //核销时间3个函数(添加,删除,处理)
            addDomain1() {
                this.times1.push({
                    value: [new Date(2017, 9, 10, 0, 0, 0), new Date(2017, 9, 10, 23, 59, 59)]
                })
            },
            removeDomain1(time) {
                var index = this.times1.indexOf(time)
                if (index !== -1) {
                    this.times1.splice(index, 1)
                }
            },
            saveGold: function() {
                this.disabled = true;
                this.messageData.name = this.form.name;
                if(this.bgUrl){
                    this.messageData.logoUrl = this.bgUrl;
                    this.messageData.voucher_logo = this.bgId;
                }else{
                    this.$message.error('请上传券Logo');
                    return;
                }
                this.messageData.voucher_worth_value = this.money;
                if (this.checkedshopstrue) {
                    this.messageData.suit_shops = this.checkedshopstrue.join();
                    this.messageData.voucher_suit_shops = this.checkedshopstrue.join();
                }
                this.messageData.quantity = this.form.number;
                this.messageData.start_time = this.firstTime;
                this.messageData.end_time = this.lastTime;
                this.messageData.relative_time = this.validday;
                if (this.form.uselimitselectvalue == 1) {
                    this.messageData.send_rule_min_cost = this.numberX;
                } else if (this.form.uselimitselectvalue == 2) {
                    this.messageData.send_rule_min_cost = '0';
                }
                //领取限制
                if (this.form.limitselectvalue == 1) {
                    this.messageData.user_win_count = this.form.number1;
                } else if (this.form.limitselectvalue == 2) {
                    this.messageData.user_win_count = '9999';
                }
                //每日领取限制
                if (this.form.datelimitselectvalue == 1) {
                    this.messageData.user_win_frequency = this.form.number2;
                } else if (this.form.datelimitselectvalue == 2) {
                    this.messageData.user_win_frequency = '9999';
                }
                //是否需要积分兑换
                if (this.form.code_radio == 1) {
                    this.messageData.binding_point = this.form.needcode;
                    delete this.messageData['publish_channels_type'];
                } else if (this.form.code_radio == 2) {
                    this.messageData.publish_channels_type = this.form.ways.join();
                    delete this.messageData['binding_point'];
                }
                //领取时间限制
                if (this.form.timelimitselectvalue == 1) {
                    let arrs = weekDispose(this.checkList);
                    this.messageData.use_week = arrs;
                    let useTime = DateLong(this.times);
                    this.messageData.use_time = useTime;

                }
                //核销时间
                if (this.form.detallimitselectvalue == 1) {
                    let arrs = weekDispose(this.checkList1);
                    this.messageData.exchange_week = arrs;
                    let useTime = DateLong(this.times1);
                    this.messageData.exchange_time = useTime;
                }
                let data = this.qs.stringify(this.messageData);
                this.$message("正在创建,请稍等！");
                this.$http.post(`${ipAddress}/front/inner_voucher!createInnerVoucher.action`, data)
                    .then(res => {
                        this.disabled = false;
                        if (res.data.errorCode == 30005) {
                            window.location.href = 'http://b.tingzhijun.com/merchant';
                        } else if (res.data.errorCode == 10000) {
                            this.$message.success("创建成功！");
                            this.$router.push({
                                path: '/voucherList'
                            });
                        } else {
                            this.$message.error(res.data.message);
                        }
                    })
            },
            handleCheckAllChange(event) {
                this.hhddatas2 = [];
                for (var i = 0; i < this.Objects.length; i++) {
                    this.hhddatas2.push(this.Objects[i].id);
                }
                this.checkedshops = event.target.checked ? this.hhddatas2 : [];
                this.isIndeterminate = false;
            },
            handleCheckedCitiesChange(value) {
                let checkedCount = value.length;
                this.checkAll = checkedCount === this.Objects.length;
                this.isIndeterminate = checkedCount > 0 && checkedCount < this.hhddatas2.length;
            },
            againchooseshop() {
                this.dialogVisible_queryshops = true;
                this.checkedshops = this.checkedshopstrue;
            },
            // 上架门店确定
            queryshops_btn() {
                this.dialogVisible_queryshops = false;
                this.checkedshopstrue = this.checkedshops;
                this.shopsnumber = this.checkedshopstrue.length;
            },
            changeTime: function() {
                this.startTime = formateDate(this.time[0]);
                this.endTime = formateDate(this.time[1]);
                this.firstTime = formDateSecond(this.time[0]);
                this.lastTime = formDateSecond59(this.time[1]);
            },
            selectChange: function() {

                if(this.form.limitselectvalue == 2){
                    this.form.number1 = ''
                }
            },
            everyselectChcange(){
                if(this.form.datelimitselectvalue == 2){
                    this.form.number2 = ''
                }
            },

        },
        created: function() {
            let curRouter = this.$router.currentRoute;
            this.$store.commit("dealData", {
                path: curRouter.path,
                name: curRouter.meta.name
            });
        }
    }
</script>

<style>
    .zjmain {
        width: 100%;
        height: calc(100% - 52px);
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        overflow-y: scroll;
        margin-bottom: 0px;
        background-color: white;
    }
    
    .ticket_title_all {
        display: inline-block;
        margin-top: 10px;
        padding-left: 8px;
        font-size: 14px !important;
        border-left: 10px solid #00a0e9;
    }
    
    .ticket_show div {
        display: inline-block;
        height: 470px;
        width: 240px;
        margin-top: 100px;
        position: relative;
    }
    
    .kawei_ticket_show .div1 {
        display: inline-block;
        height: 490px;
        width: 250px;
        margin-top: 100px;
        position: relative;
    }
    
    .ticket_show div img {
        height: 470px;
        width: 240px;
        display: inline-block;
        position: absolute;
        top: 0;
        z-index: 10;
    }
    
    .kawei_ticket_show .div1 .img1 {
        height: 490px;
        width: 250px;
        display: inline-block;
        position: absolute;
        top: 0;
    }
    
    .ticket_show div span {
        display: inline-block;
        position: absolute;
        width: 100px;
        top: 150px;
        left: 65px;
        text-align: center;
        z-index: 50;
        font-size: 20px;
    }
    
    .ticket_show div p {
        display: inline-block;
        width: 200px;
        text-align: center;
        position: absolute;
        font-size: 12px;
        top: 185px;
        left: 16px;
        z-index: 60;
    }
    
    .ticket_tip {
        line-height: 20px;
        display: block;
        color: #888;
        font-size: 12px;
    }
    
    .ticket_rule {
        margin-top: 26px;
        float: left;
        width: 60%;
    }
    
    .ticket_rule .el-form {
        margin-top: 20px;
    }
    
    .ticket_title .el-input {
        width: 260px;
    }
    
    .width_90 {
        width: 90px !important;
    }
    
    .choose_goods_main {
        height: 500px;
    }
    
    .choose_goods_main .main_left {
        width: 240px;
        float: left;
        height: 100%;
    }
    
    .choose_goods_main .main_left .left_box {
        height: 100%;
        margin: 10px;
    }
    
    .choose_goods_main .main_left .left_box .box_title {
        height: 40px;
        background-color: #00a0e9;
        border-top-left-radius: 4px;
        border-top-right-radius: 4px;
    }
    
    .box_title span {
        line-height: 40px;
        color: white;
        margin-left: 14px;
    }
    
    .choose_goods_main .main_left .left_box .box_list {
        height: calc(100% - 50px);
        -ms-overflow-style: none;
        overflow: -moz-scrollbars-none;
        overflow: auto;
        border: 1px solid #dddddd;
    }
    
    .box_list .list {
        display: block;
        padding: 5px 10px;
        margin: 0px;
    }
    
    .choose_goods_main .main_left .left_box .box_list::-webkit-scrollbar {
        display: none;
    }
    
    .choose_goods_main .main_right {
        float: left;
        width: calc(100% - 260px);
        height: 100%;
    }
    
    .main_right .right_query_input {
        width: 160px;
        margin-right: 30px;
    }
    
    .main_right .right_title_input {
        width: 50px;
    }
    
    .right_box {
        margin: 10px;
    }
    
    .right_box_title {
        margin: 10px 0;
    }
    
    .right_box .el-table__body-wrapper {
        height: 385px;
    }
    
    .setways .el-select,
    .setways .el-select .el-input {
        width: 260px;
    }
    
    .bottom_margin_200 {
        /*margin-bottom: 200px;*/
    }
    
    .shopkinds_list {
        overflow: auto;
        height: 200px;
        background-color: rgba(221, 221, 221, 0.5);
        border-radius: 4px;
    }
    
    .shopkinds_list .check_divbox {
        margin: 6px 6px 0 6px;
        width: 165px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: inline-block;
    }
    
    .check_choose_list .el-table__body-wrapper {
        height: 385px;
    }
    
    .check_choose_list {
        margin-bottom: 30px;
    }
    .width_60{
        width: 60px;
    }
</style>