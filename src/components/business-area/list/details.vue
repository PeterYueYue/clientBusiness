<!--单品券列表/点击查看单品券详细信息-->
<template>
  <div class="main">
    <div class="ticket_show">
      <div>
        <img src="../../../assets/images/ticket.png" alt="">
        <span v-if="form.voucherType == '减至券'">{{form.amount.toFixed(2)}}元</span>
        <span v-if="form.voucherType == '代金券'">{{form.amount.toFixed(2)}}元</span>
        <p>活动时间:{{form.pickStartDate}}至{{form.pickEndDate}}</p>
      </div>

    </div>
    <div class="ticket_rule">
      <span class="ticket_title_all">活动内容</span>
      <el-form ref="form" :model="form" label-width="140px">
        <el-form-item class="ticket_title" label="标题 :">
          <span>{{form.activeTitle}}</span>
        </el-form-item>
        <el-form-item class="ticket_downtype" label="优惠方式 :">
          <div v-if="form.voucherType == '减至券'">
            <span>减到固定金额</span>
            <br>
            <span>商品原价 {{form.oldPrice}} 元,减到 {{(form.oldPrice - form.amount).toFixed(2)}} 元</span>
            <span class="ticket_tip">优惠价即为用户需付款金额。例如:原价10元，优惠价2元，用户仅需付2元</span>
          </div>
          <div v-if="form.voucherType == '代金券'">
            <span>立减</span>
            <span>{{form.amount.toFixed(2)}} 元</span>
          </div>
        </el-form-item>
        <el-form-item class="code_shop" label="适用门店 :">
          <span>已选 {{form.shopAmount}} 家门店&#X3000;</span>
          <el-button type="text" @click="dialogVisible_shopslist = true">点击查看</el-button>
          <el-dialog
            title="适用门店列表"
            v-model="dialogVisible_shopslist"
            size="tiny"
            top="20%">
            <p v-for="item in shops">{{item.name}}</p>
            <span slot="footer" class="dialog-footer">
                      <el-button type="primary" @click="dialogVisible_shopslist = false">确 定</el-button>
                      <el-button @click="dialogVisible_shopslist = false">取 消</el-button>
                  </span>
          </el-dialog>
        </el-form-item>
        <el-form-item class="ticket_number" label="数量 :">
          <span v-if="form.quantity==0">不限制</span>
          <span v-if="form.quantity!=0">{{form.quantity}}</span>
        </el-form-item>
        <el-form-item label="活动时间 :">
          <span>{{form.pickStartDate}}-{{form.pickEndDate}}</span>
        </el-form-item>
        <el-form-item label="适用商品 :">
          <span>已选 {{form.productAmount}} 种商品&#X3000;</span>
          <el-button type="text" @click=" dialogVisible_goodslist = true">点击查看</el-button>
        </el-form-item>
        <el-form-item class="ticket_number" label="券有效期 :">
          <span>领取后 {{form.validToDay}} 日内有效</span>
        </el-form-item>
        <el-dialog
          class="dialog_goodslist"
          title="适用商品列表"
          v-model="dialogVisible_goodslist"
          size="small"
          top="15%">
          <el-table
            :data="tableData"
            style="width: 100%">
            <el-table-column
              type="index"
              label="商品序号"
              width="120">
            </el-table-column>
            <el-table-column
              prop="category"
              label="商品名称">
            </el-table-column>
            <el-table-column
              prop="name"
              label="商品分类">
            </el-table-column>
            <el-table-column
              prop="price"
              label="商品价格">
            </el-table-column>
          </el-table>
          <span slot="footer" class="dialog-footer">
                      <el-button type="primary" @click="dialogVisible_goodslist = false">确 定</el-button>
                      <el-button @click=" dialogVisible_goodslist = false">取 消</el-button>
                  </span>
        </el-dialog>
      </el-form>
      <span class="ticket_title_all">规则设置</span>
      <el-form ref="form" :model="form" label-width="140px">
        <el-form-item class="ticket_title" label="领取限制 :">
          <span v-if="form.pickLimitNum == 9999">不限制</span>
          <span v-if="form.pickLimitNum != 9999">{{form.pickLimitNum}}</span>
        </el-form-item>
        <el-form-item class="ticket_downtype" label="每日领取限制 :">
          <span v-if="form.pickLimitTotal == 9999">不限制</span>
          <span v-if="form.pickLimitTotal != 9999">{{form.pickLimitTotal}}</span>
        </el-form-item>
        <el-form-item label="是否需要积分兑换 :">
          <span v-if="form.bindingPoint != 0">是</span>
          <span v-if="form.bindingPoint == 0">否</span>
        </el-form-item>
        <el-form-item v-if="form.bindingPoint != 0" label="兑换所需积分 :">
          <span>{{form.bindingPoint}} 积分</span>
        </el-form-item>
        <el-form-item v-if="form.bindingPoint == 0" class="setways" label="投放渠道 :">

          <div v-for="item in waysdata">
            <span class="margin_r_10">{{item}}</span>
            <a :href="form.url"  v-if="item == '二维码投放'" target="_blank">点击打开二维码</a>
            <span v-if="item == '短连接投放'">{{form.shortLinkurl}}</span>
          </div>
        </el-form-item>
        <el-form-item  label="领券时间 :">
            <span v-if="form.exchange_time == ''">不限制</span>
            <span v-if="form.exchange_time != ''">每 {{form.exchange_week}} {{form.exchange_time}} 可领取</span>
            
        </el-form-item>
        <el-form-item  label="核销时间 :">
            <span v-if="form.use_week == ''">不限制</span>
            <span v-if="form.use_week != ''">每 {{form.use_week}} {{form.use_time}} 可核销</span>
        </el-form-item>
        <el-form-item>
          <el-button class="bottom_button" @click="back" size="small">返 回</el-button>
          <el-button class="bottom_button" @click="dialogVisible_xiajiasure = true" size="small" type="primary" v-if="form.offlineState == 0">
            下 架
          </el-button>
        </el-form-item>
        <el-dialog
          title="提示"
          v-model="dialogVisible_xiajiasure"
          size="tiny"
          top="35%">
          <p style="text-align: center;">下架后活动将立即结束,已发出的券在有效期内依然可以使用,是否继续?</p>
          <span slot="footer" class="dialog-footer">
                      <el-button type="primary" @click="soldOut">确 定</el-button>
                      <el-button @click="dialogVisible_xiajiasure = false">取 消</el-button>
                  </span>
        </el-dialog>
      </el-form>
    </div>
  </div>
</template>

<script>
  import {ipAddress} from '../../../service'
  export default {
    data() {
      return {
        waysdata:[],
        wayskinds:'',
        isFlag: 0,
        dialogVisible_xiajiasure: false,
        camp_id: '',
        tableData: [],
        shops: [],
        dialogVisible_xiajia: false,
        dialogVisible_goodslist: false,
        dialogVisible_shopslist: false,
        form: {}
      }
    },
    mounted: function () {
      let data = this.qs.stringify({
        id: this.camp_id
      });
      this.$http.post(`${ipAddress}/front/inner_voucher!getDetailById.action`, data)
        .then(res => {
          if(res.data.errorCode == "30005"){
            window.location.href='http://b.tingzhijun.com/merchant';
          }
          this.form = res.data.content;
          this.tableData=res.data.content.goods;
          this.shops=res.data.content.stores;
          this.wayskinds=res.data.content.publishChannels;
          this.waysdata = res.data.content.publishChannels.split(",");
        })
    },
    created: function () {
      let id = this.$route.query.id;
      this.camp_id = id;
      let curRouter = this.$router.currentRoute;
      this.$store.commit("dealData", {
        path: curRouter.path,
        name: curRouter.meta.name
      });
    },
    methods: {
      back() {
        window.history.back();
      },
      soldOut: function () {
        this.dialogVisible_xiajiasure = false;
        let data = this.qs.stringify({
          camp_id: this.form.activeId
        });
        this.$http.post(`${ipAddress}/front/inner_voucher!offline.action`, data)
          .then(res => {
            if(res.data.errorCode == "30005"){
              window.location.href='http://b.tingzhijun.com/merchant';
            }
            if(res.data.status == "success"){
              this.$message.success("下架成功!");
              this.$router.push('/stampsList');
            }else if(res.data.status == "error"){
              this.$message.error("下架失败!")
            }
          })
      }
    }
  }
</script>

<style>
  .dialog_goodslist .el-table__body-wrapper {
    height: 280px;
  }
</style>
