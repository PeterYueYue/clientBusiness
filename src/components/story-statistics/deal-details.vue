<!--店铺账单/交易明细-->
<template>
  <div class="tab_main">
    <div class="tab_header">
      <el-button class="f_r"  @click="exportReport" size="small" type="primary">Excel报表导出</el-button>
      <span class=" line_height_30 font14">门店选择 :&nbsp;</span>
      <el-select v-model="querydata.shopInfoId" placeholder="请选择"  size="small"  class="el-select  margin_r_10">
        <el-option
          v-for="item in shopselectdata"
          :key="item.shopId"
          size="small"
          :label="item.shopName"
          :value="item.shopId">
        </el-option>
      </el-select>
      <span>交易时间 :&nbsp;</span>
      <el-date-picker
        size="small"
        v-model="timedata"
        :editable="editable"
        type="daterange"
        placeholder="选择日期范围"
        :picker-options="pickerOptions2">
      </el-date-picker>
      <el-button class="query_button" @click="querylist" size="small" type="primary">搜 索</el-button>
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
        <el-select v-model="querydata.paymentStatus" placeholder="请选择" size="small"  class="pop-state-select">
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
            prop="createDate"
            min-width="90">
            <template scope="scope">
                <p>{{scope.row.createDate}}</p>
                <p>{{scope.row.createTime}}</p>
            </template>
</el-table-column>
<el-table-column prop="ordernumber" label="订单号/交易号" min-width="260">
    <template scope="scope">
              <div>
                <span class="width60">订单号 : </span>
                <span class="f_l">{{scope.row.paymentSn}}</span>
              </div>
              <div>
                <span class="width60">交易号 : </span>
                <span class="f_l">{{scope.row.tradeNo}}</span>
              </div>
            </template>
</el-table-column>
<el-table-column prop="payType" label="付款方式">
</el-table-column>
<el-table-column prop="ordersum" label="订单金额(元)" min-width="140">
    <template scope="scope">
              <div>
                <span class="width60">订单金额 : </span>
                <span class="f_l">{{ scope.row.totalAmount}}</span>
              </div>
              <div>
                <span class="width60">实收 : </span>
                <span class="f_l">{{ scope.row.receiptAmount}}</span>
              </div>
              <div>
                <span class="width60">优惠 : </span>
                <span class="f_l">{{ scope.row.discountAmount}}</span>
              </div>
            </template>
</el-table-column>
<el-table-column prop="style" label="优惠方式" min-width="130">
    <template scope="scope">
              <div>
                <span class="width60">积分优惠 : </span>
                <span class="f_l">{{ scope.row.integralDiscount}}</span>
              </div>
              <div>
                <span class="width60">券优惠 : </span>
                <span class="f_l">{{ scope.row.voucherDiscount}}</span>
              </div>
            </template>
</el-table-column>
<el-table-column prop="tradeStatus" min-width="60" label="状态">
</el-table-column>
<el-table-column prop="detail" label="门店/终端/收银员" min-width="160">
    <template scope="scope">
              <div>
                <span class="width60">收银员 : </span>
                <span class="width100 f_l">{{ scope.row.cashierNum}}</span>
              </div>
              <div>
                <span class="width60">终端 : </span>
                <span class="width100 f_l">{{ scope.row.terminalNum}}</span>
              </div>
              <div>
                <span class="width60">门店 : </span>
                <span class="width100 f_l">{{ scope.row.shopName}}</span>
              </div>
            </template>
</el-table-column>
</el-table>
<el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="10" layout="total, prev, pager, next,jumper" :total="totalCount" class="foot_nav">
</el-pagination>
</div>
</div>
</div>
</template>

<script>
    import { queryLogin } from '../../api/CommonMethods'
    import { ipAddress } from '../../service'
    import { formateDate } from '../../api/CommonMethods'
    export default {
        data() {
            return {
                editable: false,
                currentPage: 1,
                timedata: [],
                // 搜索条件，要传的参
                querydata: {

                    pageNumber: '1',
                    pageSize: '10',
                    shopInfoId: '',
                    beginDate: '',
                    terminalId: '',
                    endDate: '',
                    cashierId: '',
                    paymentStatus: ''
                },
                totalCount: 0,
                onece: '2',
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
                selectdata: [{
                    value: '',
                    label: '全部'
                }, {
                    value: '3',
                    label: '交易失败'
                }, {
                    value: '0',
                    label: '支付成功'
                }],
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
                    var excelurl='http://b.tingzhijun.com/coupons/front/payment!exportPayment.action?beginDate=' + this.querydata.beginDate + '&endDate=' + this.querydata.endDate + '&pageNumber=1&pageSize=10000' + '&shopid=' + this.querydata.shopInfoId + '&terminalId=' + this.querydata.terminalId + '&cashierId=' + this.querydata.cashierId + '&paymentStatus=' + this.querydata.paymentStatus
                    window.location.href = excelurl;
                } else {
                    this.$message("请选择日期范围!")
                }
            },
            // 查询
            querylist() {
                queryLogin();
                if (this.timedata[0]) {
                    this.querydata.beginDate = formateDate(this.timedata[0]);
                    this.querydata.endDate = formateDate(this.timedata[1]);
                    let query_data = this.qs.stringify(this.querydata);
                    this.getList(query_data);
                } else {
                    this.$message("请选择日期范围!")
                }
            },
            // 获取终端编号
            getcajasList(data) {
                queryLogin();
                this.$http.post(`${ipAddress}/front/terminal!getTerminalPager.action`, data)
                    .then(res=> {
                        var downdata = res.data.content.resultList;
                        this.Cajasselectdata = this.Cajasselectdata.concat(downdata);
                    })
            },
            // 获取操作员号
            getcashierList(data) {
                queryLogin();
                this.$http.post(`${ipAddress}/front/cashier!getCashierPager.action`, data)
                    .then(res=> {
                        var downdata = res.data.content.resultList;
                        this.cashierselectdata = this.cashierselectdata.concat(downdata);
                    })
            },
            // 获取门店列表数据
            getshopList(data) {
                queryLogin();
                this.$http.post(`${ipAddress}/front/shop_info!getShopInfoPager.action`, data)
                    .then(res=> {
                        var downdata = res.data.content.resultList;
                        this.shopselectdata = this.shopselectdata.concat(downdata);
                        //获取交易明细列表
                        // let listdata=this.qs.stringify(this.querydata);
                        // this.getList(listdata);
                    })
            },
            // 重置搜索条件
            clearquerydata() {
                queryLogin();
                this.querydata.shopInfoId = '';
                this.timedata = [];
                this.querydata.cashierId = '';
                this.querydata.terminalId = '';
                this.querydata.paymentStatus = '';
            },
            // 获取列表数据
            getList(data) {
                queryLogin();
                this.$http.post(`${ipAddress}/front/payment!getPaymentPager.action`, data)
                    .then(res=>{
                        this.totalCount = res.data.content.totalCount;
                        this.tableData = res.data.content.resultList;
                    })
            },
            handleCurrentChange(val) {
                queryLogin();
                this.querydata.pageNumber = val;
                let data = this.qs.stringify(this.querydata);
                this.getList(data);
            },
            packup: function() {
                this.onece = '2'
            },
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
    .pop-v-optional {
        margin-top: 10px;
    }
    
    .disappear {
        display: none;
    }
    
    .el-table {
        font-size: 12px !important;
    }
    
    .width60 {
        float: left;
        width: 60px;
        text-align: right;
    }
    
    .width100 {
        width: 100px;
        text-overflow: ellipsis;
        text-align: left;
    }
</style>