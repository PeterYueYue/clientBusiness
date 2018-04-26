<!--创建券活动/创建券活动-->
<!--活动营销/单品营销-->
<template>
  <div class="zjmain">
    <div class="kawei_ticket_show">
      <div class="div1">
        <img class="img1" src="../../../assets/manjianimg.jpg" alt="">
        <p class="g_name">商券通满减券</p>
        <img class="g_img" :src="this.form.goodsimgurl" alt="">
        <section class="g_div1">
          <span class="g_title">消费满 {{form.hMoney}} 元 , 可减</span><br>
          <span class="g_des">{{form.cMoney}} 元</span>
        </section>
        <section class="g_div2">
          <span class="g_title">有效期</span><br>
          <span v-if="radios == 1" class="g_des">领取后 {{form.numberq}} 日有效</span>
          <span v-if="radios == 2" class="g_des">{{dataa}} 至 {{datab}}</span>
        </section>
      </div>
    </div>
    <div class="ticket_rule bottom_margin_200">
      <span class="ticket_title_all">活动内容</span>
      <el-form ref="form" :model="form" label-width="140px">
        <el-form-item class="ticket_title" label="活动标题 :">
          <el-input :maxlength=maxlength30 size="small" v-model="form.name" placeholder="请输入活动标题"></el-input>
        </el-form-item>
        <el-form-item label="类型 :">
          <span>满减券</span>
        </el-form-item>
        <el-form-item class="ticket_number" label="发放规则 :">
          <span>消费满 </span>
          <el-input class="width_90" size="small" type="number" placeholder="输入金额" v-model="form.mMoney"></el-input>
          <span> 元 , 发放该卡券 </span>
        </el-form-item>
        <el-form-item class="ticket_number" label="核销条件 :">
          <span>消费满 </span>
          <el-input class="width_90" size="small" type="number" placeholder="输入金额" v-model="form.hMoney"></el-input>
          <span> 元 , 可使用该卡券 </span>
        </el-form-item>
        <el-form-item class="ticket_number" label="满减金额 :">
          <el-input class="width_90" size="small" type="number" placeholder="输入金额" v-model="form.cMoney"></el-input>
          <span> 元 </span>
        </el-form-item>
        <el-form-item class="add_goods_img" label="海报背景 : ">
          <el-upload
            class="avatar-uploader"
            action="/coupons/front/file!fileUpload.action"
            :data="shopid"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="适用门店 :">
          <div>
            <span v-if="shopsnumber">已选择{{shopsnumber}}家门店</span>
            <!--<el-button v-if="this.shopsnumber" type="text" @click="dialogVisible_queryshops = true">点击查看</el-button>-->
            <el-button v-if="this.shopsnumber" type="text" @click="againchooseshop">重新选择</el-button>
            <el-button v-if="!this.shopsnumber" type="text" @click="dialogVisible_queryshops = true">选择门店</el-button>
          </div>
        </el-form-item>
        <el-form-item class="ticket_number" label="发券数量 :">
          <input class="set_input width_80" onkeyup="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}"
	onafterpaste="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'0')}else{this.value=this.value.replace(/\D/g,'')}" v-model="form.number" type="text" placeholder="输入数量"/>
        </el-form-item>

        <el-form-item class="goodsdes" label="活动介绍 : ">
          <el-input
            type="textarea"
            :rows="4"
            resize='none'
            placeholder="请输入内容"
            v-model="form.text">
          </el-input>
        </el-form-item>
        <!--选择适用门店弹窗-->
        <el-dialog
          title="选择适用门店"
          v-model="dialogVisible_queryshops"
          size="small"
          top="20%">
          <div class="kinds_main">
            <div class="shopkinds_list">
              <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选
              </el-checkbox>
              <el-checkbox-group v-model="checkedshops" @change="handleCheckedCitiesChange">
                <div class="check_divbox" v-for="item in Objects">
                  <el-checkbox :label="item.shopId" :key="item.shopId">{{item.shopName}}</el-checkbox>
                </div>
              </el-checkbox-group>
            </div>
          </div>
          <span slot="footer" class="dialog-footer">
             <el-button type="primary" @click="queryshops_btn">确 定</el-button>
             <el-button @click="dialogVisible_queryshops = false">取 消</el-button>
          </span>
        </el-dialog>

      </el-form>
      <span class="ticket_title_all ">规则设置</span>

      <el-form ref="form" :model="form" label-width="140px">
        <el-form-item label="发券时间 :">
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
                <el-button type="danger" v-if="index != 0" @click.prevent="removeDomain1(time)">删除</el-button>

              </div>
              <el-button type="primary" v-if="times1.length < 5" @click="addDomain1">新增</el-button>
            </div>
          </div>

        </el-form-item>
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
          <div v-if="this.form.limitselectvalue == 1">
            <el-input class="width_90" size="small" v-model="form.number1" placeholder="请输入"></el-input>
            <span>张/人</span>
          </div>
        </el-form-item>
        <el-form-item class="ticket_limit" label="每日领取限制 :">
          <el-select v-model="form.datelimitselectvalue" placeholder="请选择" size="small">
            <el-option
              v-for="item in datelimitselectdata"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <br>
          <div v-if="this.form.datelimitselectvalue == 1">
            <el-input class="width_90" size="small" v-model="form.number2" placeholder="请输入"></el-input>
            张/人/天
          </div>

        </el-form-item>

        <el-form-item class="ticket_number" label="券有效期 :">
          <el-radio class="radio" v-model="radios" label="1">领取后</el-radio>
          <input class="set_input width_80" onkeyup="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}"
	onafterpaste="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'0')}else{this.value=this.value.replace(/\D/g,'')}" type="text" placeholder="天数" v-model="form.numberq"/>
          <span> 日有效</span>
          <br>
          <el-radio class="radio" v-model="radios" label="2">指定时间</el-radio>
          <el-date-picker
            v-model="value7"
            type="daterange"
            align="right"
            size="small"
            :editable="editable"
            @change="datachange"
            placeholder="选择日期范围"
            :picker-options="pickerOptions1">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button class="bottom_button bott_20_20" size="small" type="primary" :disabled="disabled" @click="submit">
            提 交
          </el-button>
        </el-form-item>

      </el-form>
    </div>
  </div>
</template>

<script>
    import {
        formatTimestamp,
        formateDate,
        formDateSecond,
        formDateSecond59,
        unique
    } from '../../../api/CommonMethods'
    import {
        queryLogin,
        weekDispose,
        DateLong
    } from '../../../api/CommonMethods'
    import {
        ipAddress
    } from '../../../service'

    export default {
        data() {
            return {
                maxlength30:30,
                editable: false,
                dataa: '',
                datab: '',
                pickerOptions1: {
                    shortcuts: [{
                        text: '最近一周',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近一个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近三个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                            picker.$emit('pick', [start, end]);
                        }
                    }]
                },
                value7: '',
                radios: '1',
                imageUrl: '',
                shopid: {
                    id: ''
                },
                times: [{
                    value: [new Date(2017, 9, 10, 0, 0, 0), new Date(2017, 9, 10, 23, 59, 59)]
                }],
                times1: [{
                    value: [new Date(2017, 9, 10, 0, 0, 0), new Date(2017, 9, 10, 23, 59, 59)]
                }],
                checkList: ["星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日"],
                checkList1: ["星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日"],
                loading: false,
                disabled: false,
                errorMessage: '',
                food: {
                    name: '',
                    priceTop: '',
                    priceBot: ''
                },
                moneySpread: '',
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
                multipleSelectionLength: '',
                startTime: '****-**-**',
                endTime: '****-**-**',
                time: '',
                money: '0',
                showList: [],
                form: {
                    goodsimgurl: require('../../../assets/login_bg.jpg'),
                    numberq: '',
                    text: '',
                    cMoney: '',
                    hMoney: '',
                    mMoney: '',
                    numbers: '45',
                    name: '',
                    radio: '',
                    saletype: '',
                    startprice: '',
                    endprice: '',
                    shop: '门店1',
                    number: '',
                    time: '',
                    timelimitselectvalue: '2',
                    detallimitselectvalue: '2',
                    limitselectvalue: '2',
                    datelimitselectvalue: '2',
                    number1: '',
                    number2: '',
                    limittime: '',
                    code_radio: '1',
                    needcode: '',
                    ways: []
                },
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
                tableData: [],
                multipleSelection: [],
                multipleSelectionshow: [],
                goodslist: [],
                value1: '',
                hhddatas2: [],
                Objects: [],
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

                DVlue: '',
                choose_goods: false,
                checkgoodslist: false,
                dialogVisible_queryshops: false,
                data: {},
                voucher_start_time: '',
                voucher_end_time: '',
                arr: [],
                newarr: [],
                tableDatas: []
            }
        },
        mounted: function() {
            queryLogin();
            let data = this.qs.stringify({
                pageNumber: '1',
                pageSize: '10000'
            });
            this.getStoreList(data);
            this.cookie();
        },
        methods: {
            datachange() {
                this.dataa = formateDate(this.value7[0]);
                this.datab = formateDate(this.value7[1]);
            },
            //上传图片成功之后
            handleAvatarSuccess(response, file, fileList) {
                if (response.error == 0) {
                    this.imageUrl = file.url;
                    this.$message.success('上传成功!');
                    this.form.goodsimgurl = response.url;
                } else if (response.error == 1) {
                    this.$message.error('上传失败,请重新上传!');
                }
            },
            beforeAvatarUpload(file) {
                this.$message('正在上传海报背景!');
            },
            cookie() {
                function getCookie(cookieName) {
                    var strCookie = document.cookie;
                    var arrCookie = strCookie.split("; ");
                    for (var i = 0; i < arrCookie.length; i++) {
                        var arr = arrCookie[i].split("=");
                        if (cookieName == arr[0]) {
                            return arr[1];
                        }
                    }
                    return "";
                }
                var user_id = getCookie("ENTITY_ID");
                this.shopid.id = user_id;
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
            clickShop: function(data) {
                this.newarr.push(data);
                this.multipleSelection = this.unique(this.newarr);
            },
            unique: function(a) {
                let res = [];
                for (let i = 0, len = a.length; i < len; i++) {
                    let item = a[i];
                    (res.indexOf(item) === -1) && res.push(item)
                }
                return res
            },
            deleteShop: function(msg) {
                for (let i = 0; i < this.multipleSelection.length; i++) {
                    if (this.multipleSelection[i].id == msg.id) {
                        this.multipleSelection.splice(i, 1);
                        this.newarr.splice(0, this.newarr.length);
                        break;
                    }
                }
            },
            //提交
            submit: function() {
                //活动标题
                if (this.form.name) {
                    this.data.name = this.form.name;
                }
                //满减金额发券
                if (this.form.mMoney) {
                    this.data.sendLeast = this.form.mMoney;
                }
                //核销条件
                if (this.form.hMoney) {
                    this.data.verfyLeast = this.form.hMoney;
                }
                //满减金额
                if (this.form.cMoney) {
                    this.data.money = this.form.cMoney;
                }
                //门店选择
                this.data.shopInfoIds = this.checkedshops.join();
                //发券数量
                if (this.form.number) {
                    this.data.quantity = this.form.number;
                }
                //活动介绍
                if (this.form.text) {
                    this.data.useDesc = this.form.text;
                }
                //发券时间
                if (this.time) {
                    this.data.sendBeginTime = this.startTime;
                    this.data.sendEndTime = this.endTime;
                }
                //核销时间
                if (this.form.detallimitselectvalue == 1) {
                    this.data.verifyWeekLimit = weekDispose(this.checkList1);
                    this.data.verifyTimeLimit = DateLong(this.times1);
                    this.data.isVerifyLimit = 1;
                } else if (this.form.detallimitselectvalue == 2) {
                    this.data.isVerifyLimit = 0;
                }
                //领取限制
                if (this.form.limitselectvalue == 1) {
                    this.data.pickLimitTotal = this.form.number1;
                }
                //每日领取限制
                if (this.form.datelimitselectvalue == 1) {
                    this.data.pickLimitNumDay = this.form.number2;
                }
                //会员背景
                if (this.form.goodsimgurl) {
                    this.data.strip = this.form.goodsimgurl;
                }
                //券有效期
                if (this.radios == 1) {
                    this.data.verifyDateType = 1;
                    this.data.verfyToDay = this.form.numberq;
                } else if (this.radios == 2) {
                    this.data.verifyDateType = 0;
                    if (this.value7) {
                        let startTimes = formateDate(this.value7[0]);
                        let endTimes = formateDate(this.value7[1]);
                        this.data.verfyBeginTime = startTimes;
                        this.data.verfyEndTime = endTimes;
                    }
                }
                let message = this.qs.stringify(this.data);
                this.$http.post(`${ipAddress}/front/ali_pass!saveAliPass.action`, message)
                    .then(res => {
                        if (res.data.errorCode == 10000) {
                            this.$message.success('创建成功!');
                            this.$router.push({
                                path: '/couponsActList'
                            });
                        } else if (res.data.errorCode == 30005) {
                            window.location.href = 'http://b.tingzhijun.com/merchant';
                        } else {
                            this.$message.error(res.data.message);
                        }
                    });
            },
            setTime: function() {
                this.$router.push('/insideticketList')
            },
            choice: function() {
            },
            //分类查询商品
            clickkinds(id) {
                queryLogin();
                this.choosekinds = id;
                let data = this.qs.stringify({
                    pageNumber: '1',
                    pageSize: '10000',
                    goodsCategoryId: id
                });
                this.$http.post(`${ipAddress}/front/goods!getGoodsPager.action`, data)
                    .then(res => {
                        this.tableData = res.data.content.resultList;
                    })
            },
            handleCheckAllChange(event) {
                this.hhddatas2 = [];
                for (var i = 0; i < this.Objects.length; i++) {
                    this.hhddatas2.push(this.Objects[i].shopId);
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
            //查看商品
            checkselectGood() {
                this.checkgoodslist = true;
            },
            // 重新选择
            againselectGood() {
                this.choose_goods = true;
            },
            //选择商品
            selectGood() {
                this.choose_goods = true;
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            // 优惠方式,绑定数据
            changeInput: function() {
                if (this.form.radio == 1) {
                    this.money = this.form.saletype;
                } else if (this.form.radio == 2) {
                    this.money = this.form.startprice - this.form.endprice;
                    this.moneySpread = this.form.startprice - this.form.endprice;
                }
            },
            changeTime: function() {
                if (this.time[0]) {
                    this.startTime = formateDate(this.time[0]);
                    this.endTime = formateDate(this.time[1]);
                    this.sTime = formatTimestamp(this.time[0]);
                    this.eTime = formatTimestamp(this.time[1]);
                    this.DVlue = this.eTime - this.sTime;
                    if (this.DVlue > 7776000) {
                        this.$message.warning('时间不可以超过三个月,请重新选择!');
                    }
                    this.voucher_start_time = formDateSecond(this.time[0]);
                    this.voucher_end_time = formDateSecond59(this.time[1]);
                }
            },
            //   确定按钮
            choosegoodstruebut: function() {
                this.choose_goods = false;
                this.multipleSelectionLength = this.multipleSelection.length;
            },
            selectGood: function() {
                this.choose_goods = true;
            },
            selectChange: function() {
                //        alert(this.form.limitselectvalue);
            },
            getStoreList: function(data) {
                queryLogin();
                //        获取门店列表
                this.$http.post(`${ipAddress}/front/shop_info!getShopInfoPager.action`, data)
                    .then(res => {
                        this.Objects = res.data.content.resultList;
                    });
                //获取商品分类
                this.$http.post(`${ipAddress}/front/goods_category!getGoodsCategoryPager.action`, data)
                    .then(res => {
                        this.goodslist = res.data.content.resultList;
                    });
            }

        },
        created: function() {
            var curRouter = this.$router.currentRoute;
            this.$store.commit("dealData", {
                path: curRouter.path,
                name: curRouter.meta.name
            });
        }
    }
</script>

<style>
    .neiform {
        display: inline-block;
    }
    
    .viltop {
        vertical-align: top;
    }
    
    .neiform .el-form-item__label {
        color: #333;
    }
    /*.neiform .el-button+.el-button{
    margin-left: 0;
  }*/
    
    .neiform .el-input__inner {
        height: 30px !important;
    }
    
    .neiform .el-button {
        /*height: 30px;
        line-height: 30px;
        padding: 0 10px;
        vertical-align: bottom;*/
    }
    
    .neiform .margin_b_20 {
        margin-bottom: 10px;
    }
    
    .el-form-item__content {
        line-height: 30px;
    }
    
    .bgf4f4f4 {
        /*width: 495px;*/
        display: inline-block;
        padding: 10px;
        border: 10px solid #f4f4f4;
        border-radius: 10px;
        margin-top: 6px;
        background-color: #ffffff;
    }
    
    .g_name {
        font-size: 14px;
        position: absolute;
        top: 114px;
        text-align: center;
        width: 100%;
    }
    
    .g_img {
        height: 46px;
        width: 202px;
        position: absolute;
        top: 138px;
        left: 21px;
    }
    
    .g_div1 {
        position: absolute;
        top: 180px;
        padding-left: 5px;
        left: 20px;
        width: 200px;
        height: 45px;
        border-bottom: 1px solid #ddd;
    }
    
    .g_title {
        font-size: 12px;
        color: #888;
    }
    
    .g_des {
        font-size: 13px;
    }
    
    .bott_20_20 {
        margin: 10px 0 20px 0;
    }
    
    .g_div2 {
        padding-left: 5px;
        position: absolute;
        top: 225px;
        left: 20px;
    }
    
    .width_80 {
        width: 70px;
    }
</style>