<!--店铺账单/交易汇总-->
<template>
  <div class="tab_main">
    <div class="tab_header">
        <el-button class="f_r"  @click="exportReport" size="small" type="primary">Excel报表导出</el-button>
      <div class="block pop-d-block">
          
        <span class=" line_height_30 font14">门店选择 :&nbsp;</span>
        <el-select v-model="selectvalue" placeholder="请选择" size="small" class=" margin_r_10">
          <el-option
            v-for="item in selectdata"
            :key="item.shopId"
            :label="item.shopName"
            :value="item.shopId">
          </el-option>
         </el-select>
        <span class="demonstration">交易时间 :&nbsp;</span>
        <el-date-picker
          v-model="value3"
          type="daterange"
          :editable="editable"
          size="small"
          placeholder="选择时间范围"
          :picker-options="pickerOptions2">
        </el-date-picker>
      </div>
      <!--<div class="pop-button">-->
        <el-button type="primary" size="small" class="query_button" @click="query">搜 索</el-button>
        <!--<el-button size="small" class="query_button">重 置</el-button>-->
        <!--<button v-if="onece == '1'" @click="packup" class="pop-icon">收起-->
        <!--<svg class="icon" aria-hidden="true">-->
        <!--<use xlink:href="#icon-shangsheng"></use>-->
        <!--</svg>-->
        <!--</button>-->
        <!--<button v-if="onece != '1'" @click="packto" class="pop-icon">展开-->
        <!--<svg class="icon" aria-hidden="true">-->
        <!--<use xlink:href="#icon-xiajiang"></use>-->
        <!--</svg>-->
        <!--</button>-->
      <!--</div>-->


    </div>
    <!--可选参数-->
    <!--<div class="pop-optional" v-bind:class="{disappear : onece == '2'}">-->
    <!--<label>终端号:</label><input type="text">-->
    <!--<label>操作员:</label><input type="text">-->
    <!--<label>交易状态:</label><input type="text">-->
    <!--</div>-->

    <div class="tab_list summary_set_height">
      <div class="tongjidiv">
        <span>订单总额:</span>
        <span>{{pageTotalAmount}}</span>
        <span>元</span>
        <span class="margin_l_20">商家实收:</span>
        <span>{{pageTotalReceipt}}</span>
        <span>元</span>
      </div>
      <div class="block">
        <el-table
          :data="tableData2"
          style="width: 100%">
          <el-table-column
            prop="shopName"
            label="门店"
            width="120">
          </el-table-column>
          <el-table-column
            prop="receiptAmount"
            label="商户实收">
          </el-table-column>
          <el-table-column
            label="商家优惠">
            <template scope="scope">
              <div>
                <span class="width60">积分优惠 :</span>
                <span class="f_l">{{ scope.row.integralDiscount}}</span>
              </div>
              <div>
                <span class="width60">券 &nbsp优&nbsp 惠 :</span>
                <span class="f_l">{{ scope.row.voucherDiscount}}</span>
              </div>
            </template>
</el-table-column>
<el-table-column prop="refundAmount" label="退款金额">
</el-table-column>
<el-table-column prop="totalAmount" label="订单金额(元)">
</el-table-column>
<el-table-column prop="totalCount" label="订单笔数">
</el-table-column>
</el-table>
<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-size="10" layout="total, prev, pager, next,jumper" :total="pageCount" class="foot_nav">
</el-pagination>
</div>

</div>


</div>
</template>

<script>
    import './summart-sheet.css'
    import {
        formateDate
    } from '../../../api/CommonMethods'
    import {
        queryLogin
    } from '../../../api/CommonMethods'
    import {
        ipAddress
    } from '../../../service'
    export default {
        data() {
            return {
                editable: false,
                pageTotalReceipt: '0.00',
                pageCount: 0,
                pageTotalAmount: '0.00',
                data: {
                    beginTime: '',
                    endTime: '',
                    pageNumber: '1',
                    pageSize: '10'
                },
                //展开收起默认参数
                onece: '2',
                //时间选择
                value3: '',
                //下拉选择
                selectdata: [],
                selectvalue: '',
                tableData2: [],
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
            this.getShop();
            queryLogin();
        },
        methods: {
            //Excel报表导出
            exportReport(){
                queryLogin();
                if (this.value3[0]) {
                    this.data.beginTime = formateDate(this.value3[0]);
                    this.data.endTime = formateDate(this.value3[1]);
                    var excelurl = 'http://b.tingzhijun.com/coupons/front/payment!exportSummaryPayment.action?beginTime=' + this.data.beginTime + '&endTime=' + this.data.endTime + '&pageNumber=1&pageSize=10000' + '&shopInfoId=' + this.selectvalue;
                    window.location.href = excelurl;
                } else {
                    this.$message("请选择时间范围!")
                }
                
            },
            packup: function() {
                this.onece = '2'
            },
            packto: function() {
                this.onece = '1'
            },
            handleSizeChange(val) {
            },
            ViewDetails(index) {
            },
            handleCurrentChange(val) {
                this.data.pageNumber = val;
                this.getList(this.data);
            },
            query: function() {
                queryLogin();
                if (this.value3[0]) {
                    this.data.beginTime = formateDate(this.value3[0]);
                    this.data.endTime = formateDate(this.value3[1]);
                } else {
                    this.$message("请选择时间范围!")
                }

                this.data.shopInfoId=this.selectvalue;
                let message = this.qs.stringify(this.data);
                this.getList(message);
            },
            getList: function(data) {
                queryLogin();
                this.$http.post(`${ipAddress}/front/payment!getPaymentSummary.action`, data)
                    .then(res => {
                        this.pageCount = res.data.content.pageCount;
                        this.tableData2 = res.data.content.resultList;
                        // 订单金额汇总
                        this.pageTotalAmount = res.data.content.pageTotalAmount;
                        this.pageTotalReceipt = res.data.content.pageTotalReceipt
                    })
            },
            //获取门店
            getShop: function() {
                queryLogin();
                this.$http.get(`${ipAddress}/front/shop_info!getAllShopList.action`)
                    .then(res => {
                        // this.selectvalue=res.data.content.resultList[0].shopId;
                        let data = res.data.content.resultList;
                        data.unshift({
                            shopId: '',
                            shopName: '全部门店'
                        });
                        this.selectdata = res.data.content.resultList;
                    })
            }
        }
    }
</script>

<style>
    .margin_l_20 {
        margin-left: 20px;
    }
</style>