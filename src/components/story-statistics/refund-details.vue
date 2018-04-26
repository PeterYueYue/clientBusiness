<!--店铺账单/退款明细-->
<template>
  <div class="tab_main">
    <div class="tab_header">
        <el-button class="f_r"  @click="exportReport" size="small" type="primary">Excel报表导出</el-button>
      <span class="line_height_30 font14">门店选择 :&nbsp;</span>
      <el-select v-model="querydata.shopInfoId" placeholder="请选择" size="small" class="margin_r_10">
        <el-option
          v-for="item in shopselectdata"
          :key="item.shopId"
          :label="item.shopName"
          :value="item.shopId">
        </el-option>
      </el-select>
      <span>退款时间 :&nbsp;</span>
      <el-date-picker
        size="small"
        v-model="timedata"
        type="daterange"
        :editable="editable"
        placeholder="选择日期范围"
        :picker-options="pickerOptions2">
      </el-date-picker>
      <el-button class="query_button" @click="getList()" size="small" type="primary">搜 索</el-button>
      <el-button size="small" @click="clearquerydata" class="query_button">重 置</el-button>
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
        <el-select v-model="querydata.terminalId" placeholder="请选择" size="small"  class="pop-state-select">
          <el-option
            v-for="item in Cajasselectdata"
            :key="item.id"
            size="small"
            :label="item.number"
            :value="item.id">
          </el-option>
        </el-select>
        <span class="pop-state">收银员:</span>
        <el-select v-model="querydata.cashierId" placeholder="请选择" size="small"  class="pop-state-select">
          <el-option
            v-for="item in cashierselectdata"
            :key="item.id"
            size="small"
            :label="item.realname"
            :value="item.id">
          </el-option>
        </el-select>
        <span class="pop-state">交易状态:</span>
        <el-select v-model="querydata.refundStatus" placeholder="请选择" size="small"  class="pop-state-select">
          <el-option
            v-for="item in selectdata"
            :key="item.value"
            size="small"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
    </div>
    <div class="tab_list_down">
      <div class="block">
        <el-table
          :data="tableData"
          style="width: 100%">
          <el-table-column
            label="交易时间"
            min-width="90">
              <template scope="scope">
              <p>{{scope.row.createDate}}</p>
                <p>{{scope.row.createTime}}</p>
            </template>
</el-table-column>
<el-table-column prop="ordernumber" label="订单号/退款请求号" min-width="260">
    <template scope="scope">
              <div>
                <span class="width60">订单号 : </span>
                <span class="f_l">{{scope.row.paymentSn}}</span><br>
              </div>
              <div>
                <span class="width60">交易号 : </span>
                <span class="f_l">{{scope.row.tradeNo}}</span>
              </div>
            </template>
</el-table-column>
<el-table-column prop="refundType" label="退款方式">
</el-table-column>
<el-table-column prop="refundAmount" label="退款金额(元)">
</el-table-column>
<el-table-column prop="refundStatus" label="状态">
</el-table-column>
<el-table-column prop="detail" label="门店/终端/收银员" min-width="180">
    <template scope="scope">
              <div>
                <span class="width60">收银员 : </span>
                <span class="f_l text-a">{{ scope.row.cashierNum}}</span>
              </div>
              <div>
                <span class="width60">终端 : </span>
                <span class="f_l text-a">{{ scope.row.terminalNum}}</span>
              </div>
              <div>
                <span class="width60">门店 : </span>
                <span class="f_l text-a">{{ scope.row.shopName}}</span>
              </div>
            </template>
</el-table-column>
</el-table>
<el-pagination @current-change="handleCurrentChange" :page-size="10" layout="total, prev, pager, next,jumper" :total="totalCount" class="foot_nav">
</el-pagination>
</div>
</div>
</div>
</template>

<script>
    import {
        queryLogin,
        formateDate
    } from '../../api/CommonMethods'
    import {
        ipAddress
    } from '../../service'

    export default {
        data() {
            return {
                editable: false,
                totalCount: 0,
                querydata: {
                    pageNumber: '1',
                    pageSize: '10',
                    shopInfoId: '',
                    beginDate: '',
                    terminalId: '',
                    endDate: '',
                    cashierId: '',
                    refundStatus: ''
                },
                shopselectdata: [{
                    shopName: '全部门店',
                    shopId: ''
                }],
                Cajasselectdata: [{
                    number: '全部',
                    id: ''
                }],
                cashierselectdata: [{
                    realname: '全部',
                    id: ""
                }],
                value: '',
                onece: '2',
                selectdata: [{
                    value: '0',
                    label: '未退款'
                }, {
                    value: '1',
                    label: '退款成功'
                }, {
                    value: '2',
                    label: '退款失败'
                }],
                selectvalue: '1',
                tableData: [],
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
                timedata: [],
            }
        },
        mounted: function() {
            queryLogin();
            // 加载名店并第一次加载数据
            let shopdata = this.qs.stringify({
                pageNumber: '1',
                pageSize: '10000'
            });
            this.getshopList(shopdata);
            // 获取收银终端编号
            let cajasdata = this.qs.stringify({
                pageNumber: '1',
                pageSize: '10000'
            });
            this.getcajasList(cajasdata);
            // 获取操作员号
            let cashierdata = this.qs.stringify({
                pageNumber: '1',
                pageSize: '10000'
            });
            this.getcashierList(cashierdata);
        },
        methods: {
            //excel报表导出
            exportReport(){
                queryLogin();
                if (this.timedata[0]) {
                    this.querydata.beginDate = formateDate(this.timedata[0]);
                    this.querydata.endDate = formateDate(this.timedata[1]);
                    var excelurl = 'http://b.tingzhijun.com/coupons/front/refund_payment!exportExcel.action?beginDate=' + this.querydata.beginDate + '&endDate=' + this.querydata.endDate + '&shopid=' + this.querydata.shopInfoId + '&terminalId=' + this.querydata.terminalId + '&cashierId=' + this.querydata.cashierId + '&refundStatus=' + this.querydata.refundStatus +  '&pageNumber=1&pageSize=10000'
                    window.location.href = excelurl;
                 } else {
                    this.$message("请选择日期范围!")
                }
            },
            //重置
            clearquerydata() {
                queryLogin();
                this.querydata.shopInfoId = '';
                this.timedata = [];
                this.querydata.cashierId = '';
                this.querydata.terminalId = '';
                this.querydata.paymentStatus = '';
                this.querydata.refundStatus = "";
            },
            //获取门店列表
            getshopList(data) {
                queryLogin();
                this.$http.post(`${ipAddress}/front/shop_info!getShopInfoPager.action`, data)
                    .then(res=> {
                        var downdata = res.data.content.resultList;
                        this.shopselectdata = this.shopselectdata.concat(downdata);
                        // this.querydata.shopInfoId = res.data.content.resultList[0].shopId;
                        //获取交易明细列表
                        // this.getList();
                    })
            },
            //获取终端号
            getcajasList(data) {
                queryLogin();
                this.$http.post(`${ipAddress}/front/terminal!getTerminalPager.action`, data)
                    .then(res=> {
                        var downdata = res.data.content.resultList;
                        this.Cajasselectdata = this.Cajasselectdata.concat(downdata);
                    })
            },
            //获取收银员
            getcashierList(data) {
                queryLogin();
                this.$http.post(`${ipAddress}/front/cashier!getCashierPager.action`, data)
                    .then(res=> {
                        var downdata = res.data.content.resultList;
                        this.cashierselectdata = this.cashierselectdata.concat(downdata);
                    })
            },
            //获取退款明细列表数据
            getList() {
                queryLogin();
                if (this.timedata[0]) {
                    this.querydata.beginDate = formateDate(this.timedata[0])
                    this.querydata.endDate = formateDate(this.timedata[1])
                } else {
                    this.$message("请选择日期范围!")
                }
                let data = this.qs.stringify(this.querydata);
                this.$http.post(`${ipAddress}/front/refund_payment!getRefundPaymentPager.action`, data)
                    .then(res=> {
                        this.tableData = res.data.content.resultList;
                        this.totalCount = res.data.content.totalCount;
                    })
            },
            //页码改变时
            handleCurrentChange(val) {
                this.querydata.pageNumber = val;
                this.getList();
            },
            //展开
            packup: function() {
                this.onece = '2'
            },
            //收起
            packto: function() {
                this.onece = '1'
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
    .text-a{
        text-align: left;
        width: 100px;
    }
</style>