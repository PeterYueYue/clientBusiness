<!--账单流水-->
<template>
    <div class="busarea_active_main">
        <div class="tab_header">
            <div class="time_choose_s" style="margin-bottom: 10px;">
                <span class="line_height_30 font14">下单时间 : </span>
                <el-date-picker
                    v-model="order_time"
                    type="datetimerange"
                    size="small"
                    placeholder="选择时间范围">
                </el-date-picker>
                <div class="choose_list">
                    <div :class="{click_active : choosebtn == 1}" @click="click_choose(1)">今日</div>
                    <div :class="{click_active : choosebtn == 2}" @click="click_choose(2)">昨日</div>
                    <div :class="{click_active : choosebtn == 3}" @click="click_choose(3)">近7天</div>
                </div>
                
            </div>
            <span class="line_height_30 font14">订单号 : </span>
            <el-input placeholder="请填写订单号" size="small" class="width_160"></el-input>
            <span class="line_height_30 font14">&#X3000;门店选择 : </span>
            <el-select v-model="activetypevalue" placeholder="请选择活动类型" size="small" class=" margin_r_10">
                <el-option 
                    v-for="item in activetypedata" 
                    :key="item.activeId" 
                    :label="item.activeName" 
                    :value="item.activeId">
                </el-option>
            </el-select>
            <el-button type="primary" size="small" class="query_button" @click="querydata">查 询</el-button>
            <el-button size="small" class="query_button" @click="cleardata">清 除</el-button>
        </div>
        <div class="tab_list">
            <div class="block">
                <el-table
                    :data="tableData">
                    <el-table-column
                        prop="data1"
                        label="订单号">
                    </el-table-column>
                    <el-table-column
                        prop="data2"
                        label="下单时间">
                    </el-table-column>
                    <el-table-column
                        prop="data3"
                        label="订单金额 (元)">
                    </el-table-column>
                    <el-table-column
                        prop="data4"
                        label="实收金额 (元)">
                    </el-table-column>
                    <el-table-column
                        prop="data5"
                        label="订单优惠">
                        <template scope="scope">
                            <div>
                                <div>
                                    <span>会员优惠 : </span>
                                    <span>{{scope.row.data5}}</span>
                                </div>
                                <div>
                                    <span>&#X3000;券优惠 : </span>
                                    <span>{{scope.row.data9}}</span>
                                </div>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="data6"
                        label="会员姓名">
                    </el-table-column>
                    <el-table-column
                        prop="data7"
                        label="桌号">
                    </el-table-column>
                    <el-table-column
                        prop="data8"
                        label="门店">
                    </el-table-column>
                </el-table>
                <el-pagination
                    @current-change="handleCurrentChange"
                    :page-size="10"
                    layout="total, prev, pager, next,jumper"
                    :total="dataLength"
                    class="foot_nav">
                </el-pagination>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                activetypevalue:'',
                activetypedata:[],
                choosebtn:1,
                order_time:'',
                tableData:[
                    {data1:'324451211411123',data2:'2017-09-23 11:23',data3:'100.00',data4:'200.98',data5:'20.00',data6:'会员2',data7:'桌号',data8:'门店2',data9:'55.00'},
                    {data1:'324451211411123',data2:'2017-09-23 11:23',data3:'100.00',data4:'200.98',data5:'20.00',data6:'会员2',data7:'桌号',data8:'门店2',data9:'55.00'},
                    {data1:'324451211411123',data2:'2017-09-23 11:23',data3:'100.00',data4:'200.98',data5:'20.00',data6:'会员2',data7:'桌号',data8:'门店2',data9:'55.00'},
                    {data1:'324451211411123',data2:'2017-09-23 11:23',data3:'100.00',data4:'200.98',data5:'20.00',data6:'会员2',data7:'桌号',data8:'门店2',data9:'55.00'},
                    {data1:'324451211411123',data2:'2017-09-23 11:23',data3:'100.00',data4:'200.98',data5:'20.00',data6:'会员2',data7:'桌号',data8:'门店2',data9:'55.00'},
                    {data1:'324451211411123',data2:'2017-09-23 11:23',data3:'100.00',data4:'200.98',data5:'20.00',data6:'会员2',data7:'桌号',data8:'门店2',data9:'55.00'},
                ],
                dataLength:86,
            }
        },
        mounted: function () {

        },
        methods: {
            cleardata(){

            },
            querydata(){

            },
            click_choose(i){
                this.choosebtn = i;
            },
            handleCurrentChange(val){

            }
        },
        created: function () {
            let curRouter = this.$router.currentRoute;
            this.$store.commit("dealData", {
                path: curRouter.path,
                name: curRouter.meta.name
            });
        }
    }
</script>

<style>
    .click_active{
        background: #20a0ff;
        color:#fff;
        border-radius: 4px;
    }
    .choose_list{
        display: inline-block;
    }
    .choose_list div{
        display: inline-block;
        width: 60px;
        height: 28px;
        text-align: center;
        font-size: 14px;
        line-height: 28px;
        cursor: pointer;
        margin-left:8px;
    }
    .time_choose_s .el-input {
        width: 320px !important;
    }
</style>