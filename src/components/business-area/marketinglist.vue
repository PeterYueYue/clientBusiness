<!--店铺商圈/营销流水-->
<template>
  <div class="tab_main">
    <div class="tab_header">
        <el-button class="f_r"  @click="exportReport" size="small" type="primary">Excel报表导出</el-button>
      <span class=" line_height_30">门店选择 :&nbsp;</span>
      <el-select v-model="storeValue" placeholder="请选择" size="small" class=" margin_r_10">
        <el-option
          v-for="item in selectdata"
          :key="item.shopId"
          :label="item.shopName"
          :value="item.shopId">
        </el-option>
      </el-select>
      <span class="demonstration">交易日期:</span>
      <el-date-picker
        v-model="timeValue"
        size="small"
        :editable="editable"
        type="daterange"
        :picker-options="pickerOptions2"
        placeholder="选择时间范围">
      </el-date-picker>
      <el-button class="query_button" type="primary" size="small" @click="searchMessage">搜 索</el-button>
      <el-button size="small" class="query_button" @click="reset">重 置</el-button>
      <button v-if="onece == '1'" @click="packup" class="pop-icon">收起
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-shangsheng"></use>
        </svg>
      </button>
      <button v-if="onece != '1'" @click="packto" class="pop-icon">展开
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-xiajiang"></use>
        </svg>
      </button>


      <div class="pop-optional pop-v-optional" v-bind:class="{disappear : onece == '2'}">
        <span class="pop-states">终端号:</span>
        <el-select v-model="terminalValue" placeholder="请选择" size="small" class="pop-state-select">
          <el-option
            v-for="item in terminal"
            :key="item.id"
            size="small"
            :label="item.number"
            :value="item.id">
          </el-option>
        </el-select>
        <span class="pop-state">操作员:</span>
        <el-select v-model="cashierValue" placeholder="请选择" size="small" class="pop-state-select">
          <el-option
            v-for="item in cashier"
            :key="item.id"
            size="small"
            :label="item.realname"
            :value="item.id">
          </el-option>
        </el-select>
      </div>
    </div>

    <div class="tab_list">
      <div class="block">
        <el-table
          :data="tableData"
          style="width: 100%">
          <el-table-column
            label="交易时间"
            width="75">
            <template scope="scope">
              <p>{{scope.row.createDate}}</p>
            </template>
</el-table-column>
<el-table-column label="订单号/交易号" min-width="260">
    <template scope="scope">
              <div>
                <span class="width60">订单号 :</span>
                <span class="f_l">{{scope.row.paymentSn}}</span>
              </div>
              <div>
                <span class="width60">交易号 :</span>
                <span class="f_l">{{scope.row.tradeNo}}</span>
              </div>
            </template>
</el-table-column>
<el-table-column prop="payType" label="支付方式" min-width="100">
</el-table-column>
<el-table-column label="订单金额" min-width="100">
    <template scope="scope">
              <div>
                <span class="width60">订单金额 :</span>
                <span class="f_l">{{ scope.row.totalAmount}}</span>
              </div>
              <div>
                <span class="width60">实收 :</span>
                <span class="f_l">{{ scope.row.receiptAmount}}</span>
              </div>
              <div>
                <span class="width60">优惠 :</span>
                <span class="f_l">{{ scope.row.allPreferential}}</span>
              </div>
            </template>

</el-table-column>
<el-table-column min-width="100" label="优惠方式">
    <template scope="scope">
              <div>
                <span class="width60">积分优惠 :</span>
                <span class="f_l">{{ scope.row.integralDiscount}}</span>
              </div>
              <div>
                <span class="width60">券优惠 :</span>
                <span class="f_l">{{ scope.row.voucherDiscount}}</span>
              </div>
            </template>
</el-table-column>
<el-table-column label="门店/终端/收银员" min-width="280">
    <template scope="scope">
              <div>
                <span class="width60">收银员 :</span>
                <span class="text-a f_l">{{ scope.row.realname}}</span>
              </div>
              <div>
                <span class="width60">终端 :</span>
                <span class="text-a f_l">{{ scope.row.terminalNum}}</span>
              </div>
              <div>
                <span class="width60">门店 :</span>
                <span class="text-a f_l">{{ scope.row.shopName}}</span>
              </div>
            </template>
</el-table-column>
</el-table>
<el-pagination @current-change="handleCurrentChange" :page-size="10" layout="total, prev, pager, next,jumper" :total="pageSize" class="foot_nav">
</el-pagination>
</div>
</div>
</div>
</template>
<script>
    import {
        formateDate
    } from '../../api/CommonMethods'
    import {
        queryLogin
    } from '../../api/CommonMethods'
    import {
        ipAddress
    } from '../../service'
    export default {
        data() {
            return {
                editable: false,
                //        收银员
                cashier: [{
                    realname: '全部',
                    id: ''
                }],
                cashierValue: '',
                //        终端
                terminal: [{
                    number: '全部',
                    id: ''
                }],
                terminalValue: '',

                pageSize: 0,
                data: {
                    page: '1',
                    count: '10'
                },
                timeValue: '',

                storeValue: '',
                onece: '2',
                tableData: [],
                selectdata: [{
                    shopId: '',
                    shopName: '全部门店'
                }],
                selectvalue: '',
                // 日期选择快捷建
                pickerOptions2: {
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
            }
        },
        created: function() {
            let curRouter = this.$router.currentRoute;
            this.$store.commit("dealData", {
                path: curRouter.path,
                name: curRouter.meta.name
            });
        },
        mounted: function() {
            this.startdata();
        },
        methods: {
            //Excel报表导出
            exportReport(){
                if (this.timeValue[0]) {
                    this.data.startTime = formateDate(this.timeValue[0]);
                    this.data.endTime = formateDate(this.timeValue[1]);
                    this.data.shopid = this.storeValue;
                    var excelurl = 'http://b.tingzhijun.com/coupons/front/payment!exportMarketing.action?startTime=' + this.data.startTime + '&endTime=' + this.data.endTime + '&page=1&count=10000' + '&shopid=' + this.data.shopid + '&terminalNum=' + this.terminalValue + '&cashierId=' + this.cashierValue;
                    window.location.href = excelurl;
                } else {
                    this.$message.warning('请选择时间范围!');
                }
            },
            startdata() {
                //      商铺列表
                this.$http.get(`${ipAddress}/front/shop_info!getAllShopList.action`)
                    .then(res => {
                        var downdata = res.data.content.resultList;
                        this.selectdata = this.selectdata.concat(downdata);
                        // this.storeValue = res.data.content.resultList[0].shopId;
                    });
                //      终端号
                let data = this.qs.stringify({
                    pageNumber: '1',
                    pageSize: '1000'
                });
                this.$http.post(`${ipAddress}/front/terminal!getTerminalPager.action`, data)
                    .then(res => {
                        var downdata = res.data.content.resultList;
                        this.terminal = this.terminal.concat(downdata);
                    })
                    //      收银员
                let message = this.qs.stringify({
                    pageNumber: '1',
                    pageSize: '1000'
                });
                this.$http.post(`${ipAddress}/front/cashier!getCashierPager.action`, message)
                    .then(res => {
                        var downdata = res.data.content.resultList;
                        this.cashier = this.cashier.concat(downdata);
                    })
            },
            reset: function() {
                //        alert('xxx');
                this.timeValue = [];
                this.terminalValue = '';
                this.cashierValue = '';
                this.tradingStatusValue = ''
            },
            handleCurrentChange(val) {
                this.data.page = val;
                if (this.timeValue[0]) {
                    this.data.startTime = formateDate(this.timeValue[0]);
                    this.data.endTime = formateDate(this.timeValue[1]);
                } else {
                    this.$message.warning('请选择时间范围!');
                }
                this.data.shopid = this.storeValue;
                let datas = this.qs.stringify(this.data);
                this.getList(datas)
            },
            packup: function() {
                this.onece = '2'
            },
            packto: function() {
                this.onece = '1'
            },
            searchMessage: function() {
                if (this.timeValue[0]) {
                    this.data.startTime = formateDate(this.timeValue[0]);
                    this.data.endTime = formateDate(this.timeValue[1]);
                    this.data.shopid = this.storeValue;
                } else {
                    this.$message.warning('请选择时间范围!');
                }
                if (this.terminalValue) {
                    this.data.terminalNum = this.terminalValue;
                }
                if (this.cashierValue) {
                    this.data.cashierId = this.cashierValue;
                }
                if (this.tradingStatusValue) {
                    this.data.paymentStatus = this.tradingStatusValue;
                }
                let datas = this.qs.stringify(this.data);
                this.getList(datas);

            },
            getList: function(data) {
                this.$http.post(`${ipAddress}/front/payment!marketingList.action`, data)
                    .then(res => {
                        this.tableData = res.data.content.list;
                        this.pageSize = res.data.content.num;
                    })
            }
        }
    }
</script>

<style>
    .line_height_30 {
        line-height: 30px;
    }
</style>