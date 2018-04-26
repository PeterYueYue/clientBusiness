<!--外部券/卡位流水-->
<template>
  <div class="pop-already-main ">
    <div class="pop-already-top">
        <span class="demonstration font14">交易日期:</span>
        <el-date-picker
          v-model="value7"
          type="daterange"
          :editable="editable"
          align="right"
          size="small"
          placeholder="选择日期范围"
          :picker-options="pickerOptions2">
        </el-date-picker>
      <el-select v-model="value" class="pop-select" placeholder="请选择"  size="small" >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-button type="primary" size="small" class="query_button">搜 索</el-button>
    </div>
    <div class="pop-already-head">
        <span>交易总额:</span><span>5000.00</span><span>元</span>
    </div>
    <div class="pop-already-table">
      <el-table
        :data="tableData1"
        style="width: 100%">
        <el-table-column
          prop="date"
          label="卡位名称"
          width="120">
        </el-table-column>
        <el-table-column
          prop="uid"
          label="店铺名称">
        </el-table-column>
        <el-table-column
          prop="account"
          label="行业类型">
        </el-table-column>
        <el-table-column
          prop="cost"
          label="服务费用">
        </el-table-column>
        <el-table-column
          prop="cost"
          label="操作">
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="5"
        layout="total, prev, pager, next,sizes,jumper"
        :total="99"
        class="foot_nav">
      </el-pagination>
    </div>
  </div>
</template>

<script>
    export default {
        data() {
            return {
                editable: false,
                tableData1: [{
                    date: "动感地带",
                    uid: '2017/5/23-2017/5/30',
                    account: '动感地带',
                    time: '发券',
                    cost: '10.00(元)/天'
                }, {
                    date: "动感地带",
                    uid: '2017/5/23-2017/5/30',
                    account: '动感地带',
                    time: '发券',
                    cost: '10.00(元)/天'
                }, {
                    date: "动感地带",
                    uid: '2017/5/23-2017/5/30',
                    account: '动感地带',
                    time: '发券',
                    cost: '10.00(元)/天'
                }, {
                    date: "动感地带",
                    uid: '2017/5/23-2017/5/30',
                    account: '动感地带',
                    time: '发券',
                    cost: '10.00(元)/天'
                }, {
                    date: "动感地带",
                    uid: '2017/5/23-2017/5/30',
                    account: '动感地带',
                    time: '发券',
                    cost: '10.00(元)/天'
                }],
                options: [{
                    value: '选项1',
                    label: '黄金糕'
                }, {
                    value: '选项2',
                    label: '双皮奶'
                }, {
                    value: '选项3',
                    label: '蚵仔煎'
                }, {
                    value: '选项4',
                    label: '龙须面'
                }, {
                    value: '选项5',
                    label: '北京烤鸭'
                }],
                value: '',
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
                value7: ''
            }
        },
        created: function() {
            var curRouter = this.$router.currentRoute;
            this.$store.commit("dealData", {
                path: curRouter.path,
                name: curRouter.meta.name
            });
        },
        methods: {
            handleSizeChange(val) {
            },
            handleCurrentChange(val) {
            },
            handleEdit: function() {

            }
        }
    }
</script>

<style scoped>
    .pop-already-main {
        width: 100%;
    }
    
    .pop-already-input {
        width: 320px;
        height: 30px;
    }
    
    .pop-already-top,
    .pop-already-table,
    .pop-already-head {
        margin: 16px 16px;
    }
    
    .pop-already-head>span:nth-child(1),
    .pop-already-head>span:nth-child(3) {
        font-size: 20px;
    }
    
    .pop-already-head>span:nth-child(2) {
        font-size: 24px;
        color: #f4333c;
    }
    
    .pop-select {
        float: right;
        /*outline:1px solid red;*/
    }
</style>