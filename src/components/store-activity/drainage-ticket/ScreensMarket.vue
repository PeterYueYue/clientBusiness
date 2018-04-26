<!--外部券/卡位市场-->
<template>
  <div class="pop-already-main ">
    <div class="pop-already-top">
      <el-input  size="small" class="pop-already-input" placeholder="请输入店铺名称"></el-input>
      <el-button type="primary" size="small" class="query_button">搜 索</el-button>
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
        <el-table-column label="操作">
          <template scope="scope">
            <el-button
              class="pop-my-button"
              size="small"
              @click="handleEdit(scope.$index, scope.row)">购买</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @current-change="handleCurrentChange"
        :page-size="5"
        layout="total, prev, pager, next,jumper"
        :total="99"
        class="foot_nav">
      </el-pagination>
    </div>
  </div>
</template>

<script>

  export default {
    data(){
      return{
        tableData1:[
          {date: "动感地带", uid: '2017/5/23-2017/5/30', account: '动感地带', time: '发券',cost:'10.00(元)/天'},
          {date: "动感地带", uid: '2017/5/23-2017/5/30', account: '动感地带', time: '发券',cost:'10.00(元)/天'},
          {date: "动感地带", uid: '2017/5/23-2017/5/30', account: '动感地带', time: '发券',cost:'10.00(元)/天'},
          {date: "动感地带", uid: '2017/5/23-2017/5/30', account: '动感地带', time: '发券',cost:'10.00(元)/天'},
          {date: "动感地带", uid: '2017/5/23-2017/5/30', account: '动感地带', time: '发券',cost:'10.00(元)/天'}
        ]
      }
    },
    created: function () {
      var curRouter = this.$router.currentRoute;
      this.$store.commit("dealData", {
        path: curRouter.path,
        name: curRouter.meta.name
      });
    },
    methods: {
      handleCurrentChange(val) {
      },
      handleEdit:function () {
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

  .pop-already-top {
    margin: 16px 16px;
  }

  .pop-already-table {
    margin: 16px 16px;
  }
  .pop-my-button{
    border:none;
    background-color: rgba(1,2,2,0)!important;
    color: #00abea;
  }
</style>
