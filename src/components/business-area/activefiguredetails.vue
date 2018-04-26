<!--单品券列表/商圈代金券/查看详情-->
<template>
  <div class="main">
    <div class="juzhong">
      <span class="ticket_title_all margin_b_10">积分抵现活动</span>
      <el-form ref="form" :model="form" label-width="120px">
        <el-form-item class="ticket_title" label="活动名称 :">
          <span>{{form.pointName}}</span>
        </el-form-item>
        <el-form-item label="活动规则 :">
          <span>{{form.cost}} 积分  可抵扣 {{form.gain}}元</span>
        </el-form-item>
        <el-form-item label="活动时间 :">
          <span>{{form.startDate}}至{{form.endDate}}</span>
        </el-form-item>
        <el-form-item class="code_shop" label="适用门店 :">
          <span>已选 {{form.shopNum}} 家门店&#X3000;</span>
          <el-button type="text" @click="dialogVisible_shopslist = true">点击查看</el-button>
        </el-form-item>
        <el-dialog
          title="适用门店列表"
          v-model="dialogVisible_shopslist"
          size="tiny"
          top="20%">
          <p v-for="item in shops">{{item.shopName}}</p>
          <span slot="footer" class="dialog-footer">
                      <el-button type="primary" @click="dialogVisible_shopslist = false">确 定</el-button>
                      <el-button @click="dialogVisible_shopslist = false">取 消</el-button>
                  </span>
        </el-dialog>
        <el-form-item label="活动备注 :">
          <span class="details_des">{{form.memo}}</span>
        </el-form-item>
        <el-form-item>
          <el-button class="bottom_button" @click="back" size="small">返 回</el-button>
        </el-form-item>
      </el-form>

    </div>
  </div>
</template>
<script>
  import {ipAddress} from '../../service'
  export default {
    data() {
      return {
        shopPiontId: '',
        shops: [],
        dialogVisible_shopslist: false,
        form: {}
      }
    },
    mounted:function () {
    let data=this.qs.stringify({
      shopPiontId:this.shopPiontId
    });
      this.$http.post(`${ipAddress}/front/circle_point!lookDetails.action`,data)
        .then(res=>{
          if(res.data.errorCode == "30005"){
            window.location.href='http://b.tingzhijun.com/merchant';
          }
          this.form=res.data.content;
          this.shops=res.data.content.list;
        })
    },
    created: function () {
      let id = this.$route.query.id;
      this.shopPiontId = id;
      let curRouter = this.$router.currentRoute;
      this.$store.commit("dealData", {
        path: curRouter.path,
        name: curRouter.meta.name
      });
    },
    methods: {
      back() {
        this.$router.go(-1);
      }
    }
  }
</script>

<style>
  .margin_b_10 {
    margin-bottom: 20px;
  }

  .juzhong {
    width: 450px;
    margin: 20px auto;
  }

  .details_des {
    display: inline-block;
    width: 300px;
  }

  .dialog_goodslist .el-table__body-wrapper {
    height: 280px;
  }
</style>
