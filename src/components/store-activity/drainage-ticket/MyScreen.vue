<!--外部券/我的卡位-->
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
          label="服务周期">
        </el-table-column>
        <el-table-column
          prop="account"
          label="店铺名称">
        </el-table-column>
        <el-table-column
          prop="cost"
          label="购买商户">
        </el-table-column>
        <el-table-column
          prop="time"
          label="状态">
        </el-table-column>
        <el-table-column label="操作">
          <template scope="scope">
            <el-button
              class="pop-my-button"
              size="small"
              v-if="isAcitive != 1"
              @click="handleEdit(scope.$index, scope.row)">查看</el-button>
            <el-button
               class="pop-my-button"
              size="small"
              @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button
              class="pop-my-button"
              size="small"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @current-change="handleCurrentChange"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="5"
        layout="total, prev, pager, next,sizes,jumper"
        :total="99"
        class="foot_nav">
      </el-pagination>
    </div>
    <!--弹出框-->
    <el-dialog
      title="添加卡位"
      :visible.sync="dialogVisible"
      size="tiny"
      :before-close="handleClose">
      <div class="pop-dilog">
        <p><span>门店选择:</span><span>请选择门店</span></p>
        <p><span>卡位名称:</span><el-input class="pop-elinput"  placeholder="请输入内容" size="small"></el-input></p>
        <p><span>卡位收费:</span><el-input class="pop-elinput-small" placeholder="请输入内容" size="small"></el-input><span>元/天</span></p>
      </div>
      <span slot="footer" class="dialog-footer">
    <!--<el-button @click="dialogVisible = false">取 消</el-button>-->
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data(){
      return{
        dialogVisible: false,
        isAcitive:'1',
        tableData1:[
          {isActive:true,date: "动感地带", uid: '2017/5/23-2017/5/30', account: '动感地带', time: '发券',cost:'10.00(元)/天'},
          {isActive:'1',date: "动感地带", uid: '2017/5/23-2017/5/30', account: '动感地带', time: '发券',cost:'10.00(元)/天'},
          {isActive:'1',date: "动感地带", uid: '2017/5/23-2017/5/30', account: '动感地带', time: '发券',cost:'10.00(元)/天'},
          {isActive:'1',date: "动感地带", uid: '2017/5/23-2017/5/30', account: '动感地带', time: '发券',cost:'10.00(元)/天'},
          {isActive:'1',date: "动感地带", uid: '2017/5/23-2017/5/30', account: '动感地带', time: '发券',cost:'10.00(元)/天'}
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
        this.dialogVisible = true
      },
      handleDelete:function () {

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
  .pop-dilog{
    /*outline:1px solid red;*/
  }
  .pop-dilog>p{
    display: flex;
    height: 30px;
    line-height:30px;
    margin-left: 120px;
  }
  .pop-dilog>p:nth-child(1)>span:nth-child(2){
    color: #20a0ff;
    margin-left: 5px;
  }
  .pop-dilog>p:nth-child(1)>span:nth-child(2):hover{
    cursor: pointer;
  }
  .pop-dilog>p:nth-child(2){
    margin-top: 10px;
  }
  .pop-dilog>p:nth-child(3){
    margin-top: 10px;
  }
  .pop-dilog>p:nth-child(3)>span:nth-child(3){
    color: #f4333c;
  }
  .pop-elinput{
    display: inline-block;
    width:180px;
    margin-left: 5px;
  }
  .pop-elinput-small{
    display: inline-block;
    width:100px;
    margin-left: 5px;
  }
</style>
